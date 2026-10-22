//! Local trust for system updates: one operator-registered public key and an
//! offline bundle upload, so a device can be updated without the release
//! channel or an SD-card reflash.

use axum::{
    Extension, Json,
    extract::{Multipart, State},
    response::IntoResponse,
};
use base64::{Engine as _, engine::general_purpose::STANDARD};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{
    fs,
    os::unix::fs::PermissionsExt,
    path::{Path, PathBuf},
};
use tokio::{fs as tokio_fs, io::AsyncWriteExt};

use super::*;
use crate::{
    auth::compat_crypto::decode_frontend_password, fsutil::write_0600_atomic,
    http::middleware::CurrentSession, system::audit,
};

pub const LOCAL_KEY_ID: &str = "local";
const PEM_BEGIN: &str = "-----BEGIN PUBLIC KEY-----";
const PEM_END: &str = "-----END PUBLIC KEY-----";
const MAX_LOCAL_KEY_BYTES: usize = 8 * 1024;
const MAX_UPLOAD_METADATA_BYTES: usize = 64 * 1024;
const MAX_UPLOAD_SIGNATURE_BYTES: usize = 16 * 1024;
const UPLOAD_PART_NAME: &str = "upload.part";

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalKeyRsp {
    pub configured: bool,
    pub fingerprint: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SetLocalKeyReq {
    pub password: String,
    pub public_key: String,
}

#[derive(Debug, Deserialize)]
pub struct RemoveLocalKeyReq {
    pub password: String,
}

pub async fn get_local_key(State(state): State<AppState>) -> Result<impl IntoResponse> {
    let path = state.config.paths.system_update_local_public_key.clone();
    let rsp = task::spawn_blocking(move || read_local_key_info(&path))
        .await
        .map_err(|err| AppError::Internal(format!("local key task failed: {err}")))??;
    Ok(Json(ApiResponse::ok(rsp)))
}

pub async fn set_local_key(
    State(state): State<AppState>,
    Extension(CurrentSession(session)): Extension<CurrentSession>,
    Json(req): Json<SetLocalKeyReq>,
) -> Result<impl IntoResponse> {
    verify_password(&state, &session.username, &req.password)?;
    let der = parse_public_key_pem(&req.public_key)?;
    check_public_key_with_openssl(&req.public_key).await?;

    let path = state.config.paths.system_update_local_public_key.clone();
    let pem = normalized_pem(&der);
    let rsp = task::spawn_blocking(move || {
        write_0600_atomic(&path, pem.as_bytes())?;
        read_local_key_info(&path)
    })
    .await
    .map_err(|err| AppError::Internal(format!("local key task failed: {err}")))??;

    audit::system_update_local_key_set(&session.username);
    Ok(Json(ApiResponse::ok(rsp)))
}

pub async fn remove_local_key(
    State(state): State<AppState>,
    Extension(CurrentSession(session)): Extension<CurrentSession>,
    Json(req): Json<RemoveLocalKeyReq>,
) -> Result<impl IntoResponse> {
    verify_password(&state, &session.username, &req.password)?;
    let path = state.config.paths.system_update_local_public_key.clone();
    task::spawn_blocking(move || remove_file_if_exists(&path))
        .await
        .map_err(|err| AppError::Internal(format!("local key task failed: {err}")))??;

    audit::system_update_local_key_removed(&session.username);
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

/// Stage a system bundle uploaded from the browser.
///
/// Multipart fields: `metadata` (system-latest.json), `signature` (its
/// detached signature, absent for unsigned metadata) and `file` (the archive).
/// The staged result is installed through the normal install route.
pub async fn upload(
    State(state): State<AppState>,
    Extension(CurrentSession(session)): Extension<CurrentSession>,
    mut multipart: Multipart,
) -> Result<impl IntoResponse> {
    if system_firewall::paranoid_mode_enabled() {
        return Err(AppError::BadRequest(
            system_firewall::paranoid_blocked_message().to_string(),
        ));
    }
    crate::api::storage::ensure_writable(&state.config.paths.update_cache_dir)?;
    let guard = acquire_update_lock()?;
    let config = Config::read().unwrap_or_else(|err| {
        tracing::warn!(error = %err, "failed to refresh config before system update upload");
        (*state.config).clone()
    });
    let current = read_current_system_version();
    let stage_dir = system_stage_dir(&state.config.paths.update_cache_dir);

    let prepare_dir = stage_dir.clone();
    run_blocking_system_update("prepare system update staging", move || {
        prepare_stage_dir(&prepare_dir)
    })
    .await?;

    let staged = stage_upload(
        &config,
        &current,
        &stage_dir,
        &mut multipart,
        guard,
        &session.username,
    )
    .await;
    match staged {
        Ok(rsp) => {
            let _ = remove_update_progress(&stage_dir);
            Ok(Json(ApiResponse::ok(rsp)))
        }
        Err(err) => {
            let _ = remove_dir_if_exists(&stage_dir);
            Err(err)
        }
    }
}

async fn stage_upload(
    config: &Config,
    current: &SystemVersion,
    stage_dir: &Path,
    multipart: &mut Multipart,
    guard: UpdateGuard,
    username: &str,
) -> Result<SystemDownloadRsp> {
    let parts = receive_upload(stage_dir, multipart).await?;

    let latest: SystemLatest = serde_json::from_slice(&parts.metadata)
        .map_err(|err| AppError::BadRequest(format!("invalid system-latest.json: {err}")))?;
    validate_latest_system(&latest)?;
    let signer = authorize_upload(config, &parts, &latest).await?;

    enforce_required_application_version(&latest)?;
    if latest.target != current.target {
        return Err(AppError::BadRequest(format!(
            "system update target mismatch: device {}, bundle {}",
            current.target, latest.target
        )));
    }
    // Local and unsigned builds may repeat or lower a version; release-key
    // bundles keep the forward-only rule.
    if !matches!(
        signer.as_str(),
        LOCAL_KEY_ID | SYSTEM_UPDATE_UNSIGNED_ALGORITHM
    ) && !system_update_is_newer(current, &latest)
    {
        return Err(AppError::BadRequest(format!(
            "no newer system update: current {}, bundle {}",
            current.version, latest.version
        )));
    }

    let archive = stage_dir.join(&latest.name);
    fs::rename(&parts.archive, &archive)?;

    let stage_dir = stage_dir.to_path_buf();
    let record_latest = latest.clone();
    let record_signer = signer.clone();
    let staged = run_blocking_system_update_with_guard(
        "verify and stage uploaded system update",
        guard,
        move || {
            let archive = stage_dir.join(&record_latest.name);
            verify_system_archive(&archive, &record_latest)?;
            let manifest = extract_and_verify_system_bundle(&archive, &stage_dir, &record_latest)?;
            let record = SystemStageRecord {
                staged_at: now_unix_seconds(),
                latest: record_latest,
                manifest,
                signer: Some(record_signer),
            };
            write_stage_record(&stage_dir, &record)?;
            Ok(staged_summary(&record))
        },
    )
    .await?;

    audit::system_update_uploaded(username, &signer, &latest.version);
    Ok(SystemDownloadRsp {
        current: current.clone(),
        latest,
        staged,
    })
}

struct UploadParts {
    archive: PathBuf,
    metadata: Vec<u8>,
    signature: Option<Vec<u8>>,
}

async fn receive_upload(stage_dir: &Path, multipart: &mut Multipart) -> Result<UploadParts> {
    let mut archive = None;
    let mut metadata = None;
    let mut signature = None;

    while let Some(mut field) = multipart
        .next_field()
        .await
        .map_err(|err| AppError::BadRequest(format!("invalid multipart data: {err}")))?
    {
        match field.name() {
            Some("metadata") => {
                metadata = Some(read_small_field(&mut field, MAX_UPLOAD_METADATA_BYTES).await?);
            }
            Some("signature") => {
                signature = Some(read_small_field(&mut field, MAX_UPLOAD_SIGNATURE_BYTES).await?);
            }
            Some("file") => {
                let target = stage_dir.join(UPLOAD_PART_NAME);
                let mut file = tokio_fs::File::create(&target).await?;
                let mut written = 0_u64;
                while let Some(chunk) = field
                    .chunk()
                    .await
                    .map_err(|err| AppError::BadRequest(format!("invalid multipart data: {err}")))?
                {
                    written = written.saturating_add(chunk.len() as u64);
                    if written > MAX_SYSTEM_UPDATE_BYTES {
                        return Err(AppError::BadRequest(
                            "system update archive is too large".to_string(),
                        ));
                    }
                    file.write_all(&chunk).await?;
                }
                file.sync_all().await?;
                if written == 0 {
                    return Err(AppError::BadRequest(
                        "empty system update archive".to_string(),
                    ));
                }
                archive = Some(target);
            }
            _ => {}
        }
    }

    Ok(UploadParts {
        archive: archive
            .ok_or_else(|| AppError::BadRequest("no system update archive uploaded".to_string()))?,
        metadata: metadata
            .filter(|data| !data.is_empty())
            .ok_or_else(|| AppError::BadRequest("missing system update metadata".to_string()))?,
        signature: signature.filter(|data| !data.is_empty()),
    })
}

async fn read_small_field(
    field: &mut axum::extract::multipart::Field<'_>,
    limit: usize,
) -> Result<Vec<u8>> {
    let mut data = Vec::new();
    while let Some(chunk) = field
        .chunk()
        .await
        .map_err(|err| AppError::BadRequest(format!("invalid multipart data: {err}")))?
    {
        if data.len() + chunk.len() > limit {
            return Err(AppError::BadRequest(
                "uploaded metadata field is too large".to_string(),
            ));
        }
        data.extend_from_slice(&chunk);
    }
    Ok(data)
}

/// Check who vouches for the uploaded metadata; returns the signer label.
async fn authorize_upload(
    config: &Config,
    parts: &UploadParts,
    latest: &SystemLatest,
) -> Result<String> {
    if system_metadata_is_unsigned(latest) {
        if !config.security.allow_unsigned_updates {
            return Err(AppError::BadRequest(
                "unsigned system update metadata is not allowed".to_string(),
            ));
        }
        tracing::warn!(version = %latest.version, "accepting unsigned uploaded system update");
        return Ok(SYSTEM_UPDATE_UNSIGNED_ALGORITHM.to_string());
    }

    let signature = parts
        .signature
        .as_deref()
        .ok_or_else(|| AppError::BadRequest("missing system update signature".to_string()))?;
    let key_id = latest.signature_key_id.as_str();
    let public_key = if key_id == LOCAL_KEY_ID {
        local_public_key_path(&config.paths.system_update_local_public_key)?
    } else {
        resolve_update_public_key(&config.paths.system_update_public_key, key_id)?
    };
    verify_system_metadata_signature(&parts.metadata, signature, &public_key).await?;
    Ok(key_id.to_string())
}

fn local_public_key_path(path: &Path) -> Result<PathBuf> {
    let metadata = fs::symlink_metadata(path).map_err(|_| {
        AppError::BadRequest("no local update key is registered on this device".to_string())
    })?;
    if !metadata.file_type().is_file() || metadata.permissions().mode() & 0o022 != 0 {
        return Err(AppError::Config(
            "local update key must be a regular, non-writable-by-group-or-other file".to_string(),
        ));
    }
    Ok(path.to_path_buf())
}

fn read_local_key_info(path: &Path) -> Result<LocalKeyRsp> {
    let path = match local_public_key_path(path) {
        Ok(path) => path,
        Err(_) => {
            return Ok(LocalKeyRsp {
                configured: false,
                fingerprint: None,
            });
        }
    };
    let pem = fs::read_to_string(&path)?;
    let fingerprint = parse_public_key_pem(&pem).ok().map(|der| fingerprint(&der));
    Ok(LocalKeyRsp {
        configured: true,
        fingerprint,
    })
}

fn fingerprint(der: &[u8]) -> String {
    Sha256::digest(der)
        .iter()
        .map(|byte| format!("{byte:02x}"))
        .collect::<Vec<_>>()
        .join(":")
}

/// Accept exactly one `PUBLIC KEY` PEM block and return its DER bytes.
fn parse_public_key_pem(pem: &str) -> Result<Vec<u8>> {
    let invalid = || AppError::BadRequest("invalid public key".to_string());
    if pem.len() > MAX_LOCAL_KEY_BYTES {
        return Err(invalid());
    }
    let lines: Vec<&str> = pem
        .lines()
        .map(str::trim)
        .filter(|l| !l.is_empty())
        .collect();
    if lines.len() < 3 || lines[0] != PEM_BEGIN || lines[lines.len() - 1] != PEM_END {
        return Err(invalid());
    }
    let body: String = lines[1..lines.len() - 1].concat();
    if !body
        .bytes()
        .all(|b| b.is_ascii_alphanumeric() || matches!(b, b'+' | b'/' | b'='))
    {
        return Err(invalid());
    }
    let der = STANDARD.decode(body).map_err(|_| invalid())?;
    if !(64..=2048).contains(&der.len()) {
        return Err(invalid());
    }
    Ok(der)
}

fn normalized_pem(der: &[u8]) -> String {
    let encoded = STANDARD.encode(der);
    let mut pem = format!("{PEM_BEGIN}\n");
    for chunk in encoded.as_bytes().chunks(64) {
        pem.push_str(std::str::from_utf8(chunk).unwrap_or_default());
        pem.push('\n');
    }
    pem.push_str(PEM_END);
    pem.push('\n');
    pem
}

async fn check_public_key_with_openssl(pem: &str) -> Result<()> {
    let path = temp_verify_path("localkey")?;
    let result = async {
        write_verify_temp_file(&path, pem.as_bytes())?;
        let output = run_allowed(
            AllowedCommand::OpenSsl,
            ["pkey", "-pubin", "-noout", "-in", path_arg(&path)?],
            METADATA_TIMEOUT,
        )
        .await?;
        if output.status == 0 {
            Ok(())
        } else {
            Err(AppError::BadRequest("invalid public key".to_string()))
        }
    }
    .await;
    let _ = remove_file_if_exists(&path);
    result
}

fn verify_password(state: &AppState, username: &str, password: &str) -> Result<()> {
    let password = decode_frontend_password(password)?;
    if !state.accounts.verify(username, &password)? {
        return Err(AppError::InvalidCredentials);
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    const KEY: &str = "-----BEGIN PUBLIC KEY-----\n\
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEq7aF5pQ3Z0m1b0v2eB9mYk4Qw3xV\n\
8m1sH0cJ5uD2oQ7r3n6yT4lK9aXb1pZfE8wGhVjNc2RtUiOs5dAeLxY7gQ==\n\
-----END PUBLIC KEY-----\n";

    #[test]
    fn pem_parsing_accepts_one_public_key_block() {
        let der = parse_public_key_pem(KEY).unwrap();
        let again = parse_public_key_pem(&normalized_pem(&der)).unwrap();
        assert_eq!(der, again);
    }

    #[test]
    fn pem_parsing_rejects_other_blocks_and_garbage() {
        assert!(parse_public_key_pem("").is_err());
        assert!(parse_public_key_pem(&KEY.replace("PUBLIC KEY", "PRIVATE KEY")).is_err());
        assert!(parse_public_key_pem(&KEY.replace("MFkw", "MF!w")).is_err());
        assert!(parse_public_key_pem(&"A".repeat(MAX_LOCAL_KEY_BYTES + 1)).is_err());
    }

    #[test]
    fn fingerprint_is_colon_separated_sha256() {
        let value = fingerprint(b"abc");
        assert_eq!(value.split(':').count(), 32);
    }
}

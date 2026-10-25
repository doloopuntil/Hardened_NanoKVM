//! Signed application bundle upload: one tar holding `latest.json`, its detached
//! signature and the kvmapp archive, checked against the same keys as the system bundle.

use axum::{
    Extension, Json,
    extract::{Multipart, Query, State},
    http::{HeaderMap, header},
    response::IntoResponse,
};

use super::*;
use crate::{
    api::system_update::local::{LOCAL_KEY_ID, ensure_free_space, local_public_key_path},
    http::middleware::CurrentSession,
    system::audit,
};

const UPLOAD_PART_NAME: &str = "upload.part";
const UPLOAD_ARCHIVE_NAME: &str = "upload-archive.part";
const METADATA_NAME: &str = "latest.json";
const SIGNATURE_NAME: &str = "latest.json.sig";
const MAX_UPLOAD_METADATA_BYTES: usize = 64 * 1024;
const MAX_UPLOAD_SIGNATURE_BYTES: usize = 16 * 1024;
const BUNDLE_OVERHEAD_BYTES: u64 = 1024 * 1024;
const FREE_SPACE_MARGIN: u64 = 64 * 1024 * 1024;

#[derive(Debug, Deserialize)]
pub struct UploadCheckQuery {
    size: Option<u64>,
}

/// Runs the checks the upload makes before it reads any data, so the browser can
/// refuse a file with a readable message.
pub async fn upload_check(
    State(state): State<AppState>,
    Query(query): Query<UploadCheckQuery>,
) -> Result<impl IntoResponse> {
    let cache_dir = application_update_cache_dir(&state.config.paths.update_cache_dir);
    crate::api::storage::ensure_writable(&state.config.paths.update_cache_dir)?;
    if UPDATE_LOCK.lock().map(|busy| *busy).unwrap_or(false) {
        return Err(AppError::Conflict("update already in progress".to_string()));
    }
    if let Some(len) = query.size {
        ensure_free_space(&cache_dir, upload_space_needed(len))?;
    }
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

// The bundle, the archive unpacked from it and the extracted tree exist together.
fn upload_space_needed(len: u64) -> u64 {
    len.saturating_mul(3).saturating_add(FREE_SPACE_MARGIN)
}

/// Verify an application bundle uploaded from the browser, install it and restart.
pub async fn upload(
    State(state): State<AppState>,
    Extension(CurrentSession(session)): Extension<CurrentSession>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> Result<Json<ApiResponse<()>>> {
    crate::api::storage::ensure_writable(&state.config.paths.update_cache_dir)?;
    let _guard = acquire_update_lock()?;
    let config = crate::config::Config::read().unwrap_or_else(|err| {
        tracing::warn!(error = %err, "failed to refresh config before application update upload");
        (*state.config).clone()
    });
    let cache_dir = application_update_cache_dir(&state.config.paths.update_cache_dir);
    prepare_cache_dir(&cache_dir)?;

    let upload_len = headers
        .get(header::CONTENT_LENGTH)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.parse::<u64>().ok());
    let staged = stage_upload(
        &config,
        &cache_dir,
        &mut multipart,
        upload_len,
        &session.username,
    )
    .await;
    let installed = match staged {
        Ok(archive) => install_package_blocking(archive, cache_dir.clone()).await,
        Err(err) => Err(err),
    };
    let _ = remove_dir_if_exists(&cache_dir);
    installed?;
    restart_nanokvm_after_response();

    Ok(Json(ApiResponse::<()>::ok_empty()))
}

async fn stage_upload(
    config: &crate::config::Config,
    cache_dir: &Path,
    multipart: &mut Multipart,
    upload_len: Option<u64>,
    username: &str,
) -> Result<PathBuf> {
    if let Some(len) = upload_len {
        ensure_free_space(cache_dir, upload_space_needed(len))?;
    }
    let parts = receive_upload(cache_dir, multipart).await?;

    let latest: LatestRelease = serde_json::from_slice(&parts.metadata)
        .map_err(|err| AppError::BadRequest(format!("invalid {METADATA_NAME}: {err}")))?;
    validate_latest_fields(&latest)?;
    let signer = authorize_upload(config, &parts, &latest).await?;

    // Local and unsigned builds may repeat or lower a version; release-key bundles
    // keep the forward-only rule.
    if !matches!(
        signer.as_str(),
        LOCAL_KEY_ID | APP_UPDATE_UNSIGNED_ALGORITHM
    ) {
        let current = current_app_version();
        if compare_application_versions(&latest.version, &current)
            != Some(std::cmp::Ordering::Greater)
        {
            return Err(AppError::BadRequest(format!(
                "no newer application update: current {current}, bundle {}",
                latest.version
            )));
        }
    }

    let archive = cache_dir.join(&latest.name);
    fs::rename(&parts.archive, &archive)?;
    let checked = archive.clone();
    let expected = latest.clone();
    tokio::task::spawn_blocking(move || {
        let size = fs::metadata(&checked)?.len();
        if size != expected.size {
            return Err(AppError::BadRequest(format!(
                "update archive size mismatch: got {size}, expected {}",
                expected.size
            )));
        }
        verify_sha512(&checked, &expected.sha512)
    })
    .await
    .map_err(|err| AppError::Internal(format!("update verify task failed: {err}")))??;

    audit::application_update_uploaded(username, &signer, &latest.version);
    Ok(archive)
}

struct UploadParts {
    archive: PathBuf,
    metadata: Vec<u8>,
    signature: Option<Vec<u8>>,
}

async fn receive_upload(cache_dir: &Path, multipart: &mut Multipart) -> Result<UploadParts> {
    let mut bundle = None;

    while let Some(mut field) = multipart
        .next_field()
        .await
        .map_err(|err| AppError::BadRequest(format!("invalid multipart data: {err}")))?
    {
        if field.name() != Some("file") {
            continue;
        }
        let target = cache_dir.join(UPLOAD_PART_NAME);
        let mut file = tokio_fs::File::create(&target).await?;
        let mut written = 0_u64;
        while let Some(chunk) = field
            .chunk()
            .await
            .map_err(|err| AppError::BadRequest(format!("invalid multipart data: {err}")))?
        {
            written = written.saturating_add(chunk.len() as u64);
            if written > MAX_UPDATE_BYTES + BUNDLE_OVERHEAD_BYTES {
                return Err(AppError::BadRequest(
                    "application update bundle is too large".to_string(),
                ));
            }
            file.write_all(&chunk).await?;
        }
        file.sync_all().await?;
        if written == 0 {
            return Err(AppError::BadRequest(
                "empty application update bundle".to_string(),
            ));
        }
        bundle = Some(target);
    }

    let bundle = bundle
        .ok_or_else(|| AppError::BadRequest("no application update bundle uploaded".to_string()))?;
    let cache_dir = cache_dir.to_path_buf();
    tokio::task::spawn_blocking(move || {
        let parts = unwrap_bundle(&bundle, &cache_dir);
        let _ = fs::remove_file(&bundle);
        parts
    })
    .await
    .map_err(|err| AppError::Internal(format!("bundle unwrap task failed: {err}")))?
}

/// Unpack the outer bundle: `latest.json`, an optional `latest.json.sig` and exactly one
/// application archive. Nothing else is accepted, and entry names are matched exactly,
/// never joined into a path.
fn unwrap_bundle(bundle: &Path, cache_dir: &Path) -> Result<UploadParts> {
    let mut magic = [0_u8; 2];
    fs::File::open(bundle)?.read_exact(&mut magic)?;
    let file = fs::File::open(bundle)?;
    let reader: Box<dyn Read> = if magic == [0x1f, 0x8b] {
        Box::new(flate2::read::GzDecoder::new(file))
    } else {
        Box::new(file)
    };

    let invalid =
        |err: io::Error| AppError::BadRequest(format!("invalid application update bundle: {err}"));
    let mut metadata = None;
    let mut signature = None;
    let mut archive = None;
    let mut tar = tar::Archive::new(reader);
    for entry in tar.entries().map_err(invalid)? {
        let mut entry = entry.map_err(invalid)?;
        if !entry.header().entry_type().is_file() {
            return Err(AppError::BadRequest(
                "application update bundle may hold regular files only".to_string(),
            ));
        }
        let name = entry
            .path()
            .ok()
            .and_then(|path| {
                path.to_str()
                    .map(|name| name.trim_start_matches("./").to_string())
            })
            .ok_or_else(|| {
                AppError::BadRequest("invalid application update bundle entry".to_string())
            })?;
        match name.as_str() {
            METADATA_NAME => {
                metadata = Some(read_bounded(&mut entry, MAX_UPLOAD_METADATA_BYTES, &name)?);
            }
            SIGNATURE_NAME => {
                signature = Some(read_bounded(&mut entry, MAX_UPLOAD_SIGNATURE_BYTES, &name)?);
            }
            _ if archive.is_none() && validate_update_filename(&name).is_ok() => {
                let target = cache_dir.join(UPLOAD_ARCHIVE_NAME);
                let mut out = fs::File::create(&target)?;
                let copied = io::copy(&mut (&mut entry).take(MAX_UPDATE_BYTES + 1), &mut out)?;
                if copied == 0 || copied > MAX_UPDATE_BYTES {
                    return Err(AppError::BadRequest(
                        "invalid application update archive size".to_string(),
                    ));
                }
                out.sync_all()?;
                archive = Some(target);
            }
            _ => {
                return Err(AppError::BadRequest(format!(
                    "unexpected entry in application update bundle: {name}"
                )));
            }
        }
    }

    Ok(UploadParts {
        archive: archive.ok_or_else(|| {
            AppError::BadRequest("bundle holds no application archive".to_string())
        })?,
        metadata: metadata
            .filter(|data| !data.is_empty())
            .ok_or_else(|| AppError::BadRequest(format!("bundle holds no {METADATA_NAME}")))?,
        signature: signature.filter(|data| !data.is_empty()),
    })
}

fn read_bounded(reader: &mut impl Read, limit: usize, name: &str) -> Result<Vec<u8>> {
    let mut data = Vec::new();
    reader
        .take(limit as u64 + 1)
        .read_to_end(&mut data)
        .map_err(|err| AppError::BadRequest(format!("invalid application update bundle: {err}")))?;
    if data.len() > limit {
        return Err(AppError::BadRequest(format!(
            "{name} in the application update bundle is too large"
        )));
    }
    Ok(data)
}

/// Check who vouches for the uploaded metadata; returns the signer label.
async fn authorize_upload(
    config: &crate::config::Config,
    parts: &UploadParts,
    latest: &LatestRelease,
) -> Result<String> {
    if app_metadata_is_unsigned(latest) {
        if !config.security.allow_unsigned_updates {
            return Err(AppError::BadRequest(
                "unsigned application update metadata is not allowed".to_string(),
            ));
        }
        tracing::warn!(version = %latest.version, "accepting unsigned uploaded application update");
        return Ok(APP_UPDATE_UNSIGNED_ALGORITHM.to_string());
    }

    if latest.signature_algorithm != APP_UPDATE_SIGNATURE_ALGORITHM {
        return Err(AppError::BadRequest(
            "unsupported application update metadata signature algorithm".to_string(),
        ));
    }
    let signature = parts
        .signature
        .as_deref()
        .ok_or_else(|| AppError::BadRequest("missing application update signature".to_string()))?;
    let key_id = latest.signature_key_id.as_str();
    let public_key = if key_id == LOCAL_KEY_ID {
        local_public_key_path(&config.paths.system_update_local_public_key)?
    } else {
        resolve_update_public_key(&config.paths.system_update_public_key, key_id)?
    };
    verify_app_metadata_signature(&parts.metadata, signature, &public_key).await?;
    Ok(key_id.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn bundle(entries: &[(&str, &[u8])]) -> tempfile::TempDir {
        let dir = tempfile::tempdir().unwrap();
        let mut builder = tar::Builder::new(Vec::new());
        for (name, data) in entries {
            let mut header = tar::Header::new_gnu();
            header.set_size(data.len() as u64);
            header.set_mode(0o644);
            header.set_cksum();
            builder.append_data(&mut header, name, *data).unwrap();
        }
        fs::write(dir.path().join("bundle.tar"), builder.into_inner().unwrap()).unwrap();
        dir
    }

    #[test]
    fn unwraps_metadata_signature_and_archive() {
        let dir = bundle(&[
            ("latest.json", b"{}"),
            ("latest.json.sig", b"sig"),
            ("hardened-nanokvm-kvmapp-2.1.0.tar.gz", b"archive"),
        ]);
        let parts = unwrap_bundle(&dir.path().join("bundle.tar"), dir.path()).unwrap();
        assert_eq!(parts.metadata, b"{}");
        assert_eq!(parts.signature.as_deref(), Some(&b"sig"[..]));
        assert_eq!(fs::read(parts.archive).unwrap(), b"archive");
    }

    #[test]
    fn rejects_unexpected_entries() {
        let dir = bundle(&[
            ("latest.json", b"{}"),
            ("hardened-nanokvm-kvmapp-2.1.0.tar.gz", b"archive"),
            ("extra.sh", b"#!/bin/sh"),
        ]);
        assert!(unwrap_bundle(&dir.path().join("bundle.tar"), dir.path()).is_err());
    }

    #[test]
    fn rejects_a_bundle_without_metadata() {
        let dir = bundle(&[("hardened-nanokvm-kvmapp-2.1.0.tar.gz", b"archive")]);
        assert!(unwrap_bundle(&dir.path().join("bundle.tar"), dir.path()).is_err());
    }

    #[test]
    fn plans_space_for_three_copies() {
        assert_eq!(upload_space_needed(10), 30 + FREE_SPACE_MARGIN);
    }
}

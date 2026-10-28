//! Switching between HTTP and HTTPS with a way back.
//!
//! The server picks its protocol when it starts, so a switch writes the new config and restarts
//! the service. The previous settings are kept in a marker file until a signed-in browser confirms
//! the new address works; a server that finds the marker at startup counts down and puts the
//! previous settings back if nobody confirms. A change of certificate uses the same marker, with
//! the way back for the certificate; undoing it swaps the certificate and needs no restart.

use axum::{Json, response::IntoResponse};
use serde::{Deserialize, Serialize};
use std::{
    fs,
    path::Path,
    sync::Mutex,
    time::{Duration, Instant},
};

use crate::{
    AppError, Result,
    api::{application::restart_nanokvm_after_response, system_firewall},
    config::Config,
    error::ApiResponse,
    fsutil::write_0600_atomic,
    http::{cert_manager, tls},
};

const PENDING_FILE: &str = "/etc/kvm/tls-pending.json";
const TLS_CERT_FILE: &str = "/etc/kvm/server.crt";
const TLS_KEY_FILE: &str = "/etc/kvm/server.key";
// Long enough to sign in at the new address, including a browser's certificate warning.
const CONFIRM_WINDOW: Duration = Duration::from_secs(180);

static DEADLINE: Mutex<Option<Instant>> = Mutex::new(None);

/// What to put back when the new protocol is not confirmed.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Pending {
    previous_proto: String,
    previous_crt: String,
    previous_key: String,
    /// Turning HTTPS off forces the Moderate firewall mode; this is the mode to restore.
    previous_firewall_mode: Option<String>,
    /// Set when the change is a new certificate rather than a protocol.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    cert: Option<CertUndo>,
}

/// What puts the previous certificate back.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CertUndo {
    pub settings: cert_manager::Settings,
    /// The managed certificate file as it was, if there was one.
    pub backup: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PendingRsp {
    pub pending: bool,
    pub seconds_left: u64,
    /// The change is a new certificate, not a protocol.
    pub certificate: bool,
}

impl Pending {
    fn capture(config: &Config) -> Self {
        Self {
            previous_proto: config.proto.clone(),
            previous_crt: config.cert.crt.clone(),
            previous_key: config.cert.key.clone(),
            previous_firewall_mode: None,
            cert: None,
        }
    }

    fn restore(&self, config: &mut Config) {
        config.proto = self.previous_proto.clone();
        config.cert.crt = self.previous_crt.clone();
        config.cert.key = self.previous_key.clone();
    }
}

fn read_pending(path: &Path) -> Option<Pending> {
    serde_json::from_slice(&fs::read(path).ok()?).ok()
}

fn write_pending(path: &Path, pending: &Pending) -> Result<()> {
    let data = serde_json::to_vec(pending)
        .map_err(|err| AppError::Internal(format!("failed to encode the pending switch: {err}")))?;
    write_0600_atomic(path, &data)
}

/// Switch the protocol: keep the way back, write the new config and restart the server.
pub async fn apply(enable: bool) -> Result<()> {
    let pending_path = Path::new(PENDING_FILE);
    if pending_path.exists() {
        return Err(AppError::Conflict(
            "confirm or revert the pending protocol change first".to_string(),
        ));
    }

    let mut config = Config::read()?;
    let mut pending = Pending::capture(&config);
    if enable {
        tls::generate_self_signed_cert(TLS_CERT_FILE, TLS_KEY_FILE)?;
        config.proto = "https".to_string();
        config.cert.crt = TLS_CERT_FILE.to_string();
        config.cert.key = TLS_KEY_FILE.to_string();
    } else {
        pending.previous_firewall_mode = Some(system_firewall::configured_mode());
        system_firewall::force_moderate_mode().await?;
        config.proto = "http".to_string();
    }

    write_pending(pending_path, &pending)?;
    if let Err(err) = config.write() {
        let _ = fs::remove_file(pending_path);
        return Err(err);
    }
    // the firewall rules read the protocol
    if enable && let Err(err) = system_firewall::apply_firewall().await {
        tracing::warn!(error = %err, "failed to reapply the firewall for the new protocol");
    }

    start_countdown(CONFIRM_WINDOW);
    restart_nanokvm_after_response();
    Ok(())
}

/// Keep the way back to the previous certificate until a signed-in browser confirms the new one.
/// `config` must already point at the new certificate files.
pub(crate) fn begin_cert_change(previous: &Config, undo: CertUndo) -> Result<()> {
    let pending_path = Path::new(PENDING_FILE);
    if pending_path.exists() {
        return Err(AppError::Conflict(
            "confirm or revert the pending change first".to_string(),
        ));
    }
    let mut pending = Pending::capture(previous);
    pending.cert = Some(undo);
    write_pending(pending_path, &pending)?;
    start_countdown(CONFIRM_WINDOW);
    Ok(())
}

/// Whether a protocol or certificate change waits for confirmation.
pub(crate) fn is_pending() -> bool {
    Path::new(PENDING_FILE).exists()
}

/// A server that starts with a pending switch gives the browser the window to confirm it.
pub fn resume_at_startup() {
    if Path::new(PENDING_FILE).exists() {
        tracing::warn!("a protocol change waits for confirmation");
        start_countdown(CONFIRM_WINDOW);
    }
}

fn start_countdown(window: Duration) {
    let deadline = Instant::now() + window;
    *DEADLINE.lock().unwrap_or_else(|err| err.into_inner()) = Some(deadline);

    tokio::spawn(async move {
        tokio::time::sleep(window).await;
        if Path::new(PENDING_FILE).exists()
            && let Err(err) = revert().await
        {
            tracing::error!(error = %err, "failed to revert the unconfirmed protocol change");
        }
    });
}

/// Put the previous protocol back and restart the server.
async fn revert() -> Result<()> {
    let pending_path = Path::new(PENDING_FILE);
    let pending = read_pending(pending_path)
        .ok_or_else(|| AppError::NotFound("no protocol change is waiting".to_string()))?;

    if let Some(undo) = &pending.cert {
        revert_cert(&pending, undo)?;
        let mut config = Config::read()?;
        pending.restore(&mut config);
        config.write()?;
        fs::remove_file(pending_path)?;
        *DEADLINE.lock().unwrap_or_else(|err| err.into_inner()) = None;
        tracing::warn!("reverted the unconfirmed certificate change");
        return Ok(());
    }

    let mut config = Config::read()?;
    pending.restore(&mut config);
    config.write()?;
    if let Some(mode) = &pending.previous_firewall_mode
        && let Err(err) = system_firewall::restore_mode(mode).await
    {
        tracing::warn!(error = %err, "failed to restore the firewall mode");
    }

    fs::remove_file(pending_path)?;
    *DEADLINE.lock().unwrap_or_else(|err| err.into_inner()) = None;
    tracing::warn!("reverted the unconfirmed protocol change");
    restart_nanokvm_after_response();
    Ok(())
}

/// Put the previous certificate back for new connections; the server keeps running.
fn revert_cert(pending: &Pending, undo: &CertUndo) -> Result<()> {
    if let Some(backup) = &undo.backup {
        fs::rename(backup, crate::http::cert_store::MANAGED_PEM)?;
    }
    cert_manager::write_settings(&undo.settings)?;
    let resolver = cert_manager::resolver()
        .ok_or_else(|| AppError::Conflict("the HTTPS server is not running".to_string()))?;
    resolver.reload(&pending.previous_crt, &pending.previous_key)
}

pub async fn get_pending() -> Result<impl IntoResponse> {
    let marker = read_pending(Path::new(PENDING_FILE));
    let pending = Path::new(PENDING_FILE).exists();
    let certificate = marker.is_some_and(|marker| marker.cert.is_some());
    let seconds_left = DEADLINE
        .lock()
        .unwrap_or_else(|err| err.into_inner())
        .map(|deadline| deadline.saturating_duration_since(Instant::now()).as_secs())
        .unwrap_or(CONFIRM_WINDOW.as_secs());

    Ok(Json(ApiResponse::ok(PendingRsp {
        pending,
        seconds_left: if pending { seconds_left } else { 0 },
        certificate,
    })))
}

/// The new address works: keep the new protocol.
pub async fn confirm() -> Result<Json<ApiResponse<()>>> {
    if let Some(Pending {
        cert: Some(undo), ..
    }) = read_pending(Path::new(PENDING_FILE))
        && let Some(backup) = undo.backup
    {
        let _ = fs::remove_file(backup);
    }
    match fs::remove_file(PENDING_FILE) {
        Ok(()) => {}
        Err(err) if err.kind() == std::io::ErrorKind::NotFound => {}
        Err(err) => return Err(err.into()),
    }
    *DEADLINE.lock().unwrap_or_else(|err| err.into_inner()) = None;
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

/// Go back to the previous protocol now.
pub async fn revert_now() -> Result<Json<ApiResponse<()>>> {
    revert().await?;
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn the_previous_settings_come_back() {
        let mut config = Config {
            proto: "https".to_string(),
            ..Config::default()
        };
        config.cert.crt = "/etc/kvm/old.crt".to_string();
        config.cert.key = "/etc/kvm/old.key".to_string();
        let pending = Pending::capture(&config);

        config.proto = "http".to_string();
        config.cert.crt = "/etc/kvm/other.crt".to_string();
        pending.restore(&mut config);

        assert_eq!(config.proto, "https");
        assert_eq!(config.cert.crt, "/etc/kvm/old.crt");
        assert_eq!(config.cert.key, "/etc/kvm/old.key");
    }

    #[test]
    fn a_marker_from_before_certificate_changes_still_reads() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("tls-pending.json");
        fs::write(
            &path,
            r#"{"previousProto":"http","previousCrt":"a","previousKey":"b","previousFirewallMode":null}"#,
        )
        .unwrap();
        let pending = read_pending(&path).unwrap();
        assert_eq!(pending.previous_proto, "http");
        assert_eq!(pending.cert, None);
    }

    #[test]
    fn the_marker_round_trips_and_a_broken_one_reads_as_none() {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("tls-pending.json");
        assert_eq!(read_pending(&path), None);

        let pending = Pending {
            previous_proto: "https".to_string(),
            previous_crt: "/a".to_string(),
            previous_key: "/b".to_string(),
            previous_firewall_mode: Some("paranoid".to_string()),
            cert: Some(CertUndo {
                settings: cert_manager::Settings::default(),
                backup: Some("/etc/kvm/certs/managed.pem.prev".to_string()),
            }),
        };
        write_pending(&path, &pending).unwrap();
        assert_eq!(read_pending(&path), Some(pending));

        fs::write(&path, "not json").unwrap();
        assert_eq!(read_pending(&path), None);
    }
}

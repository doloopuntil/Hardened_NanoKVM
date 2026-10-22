//! Boot-time CPU clock profile: the standard or the overdrive `fip.bin`.
//!
//! The FSBL in `fip.bin` sets the clocks, so switching profiles means copying one of two
//! prebuilt images over `/boot/fip.bin`. The flag file is the source of truth; the server
//! reconciles `fip.bin` with it at startup, which also restores the choice after a system
//! update replaced the images.

use std::{
    fs::{self, File, OpenOptions},
    io::Write,
    path::{Path, PathBuf},
};

use axum::{Json, response::IntoResponse};
use serde::{Deserialize, Serialize};
use tokio::task;
use tracing::{info, warn};

use crate::{AppError, Result, error::ApiResponse};

const BOOT_DIR: &str = "/boot";
const ACTIVE_IMAGE: &str = "fip.bin";
const STANDARD_IMAGE: &str = "fip.std.bin";
const OVERDRIVE_IMAGE: &str = "fip.od.bin";
const OVERDRIVE_FLAG: &str = "cpu.overdrive";

#[derive(Debug, Serialize)]
pub struct OverdriveRsp {
    available: bool,
    enabled: bool,
    active: bool,
}

#[derive(Debug, Deserialize)]
pub struct SetOverdriveReq {
    enabled: bool,
}

pub async fn get_overdrive() -> Result<impl IntoResponse> {
    let rsp = task::spawn_blocking(|| status(Path::new(BOOT_DIR)))
        .await
        .map_err(|err| AppError::Internal(err.to_string()))??;
    Ok(Json(ApiResponse::ok(rsp)))
}

pub async fn set_overdrive(Json(req): Json<SetOverdriveReq>) -> Result<impl IntoResponse> {
    task::spawn_blocking(move || set_enabled(Path::new(BOOT_DIR), req.enabled))
        .await
        .map_err(|err| AppError::Internal(err.to_string()))??;
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

/// Make `fip.bin` match the flag. Runs once at startup; a no-op on images without both variants.
pub fn reconcile_at_startup() {
    task::spawn_blocking(|| match reconcile(Path::new(BOOT_DIR)) {
        Ok(true) => {
            info!("restored the CPU clock profile in /boot/fip.bin; it applies after a reboot")
        }
        Ok(false) => {}
        Err(err) => warn!(error = %err, "failed to reconcile the CPU clock profile"),
    });
}

fn status(boot: &Path) -> Result<OverdriveRsp> {
    let available = variants_present(boot);
    let enabled = boot.join(OVERDRIVE_FLAG).exists();
    let active = available && same_content(&boot.join(ACTIVE_IMAGE), &boot.join(OVERDRIVE_IMAGE))?;
    Ok(OverdriveRsp {
        available,
        enabled,
        active,
    })
}

fn set_enabled(boot: &Path, enabled: bool) -> Result<()> {
    if !variants_present(boot) {
        return Err(AppError::Unsupported(
            "this image has no CPU clock variants".to_string(),
        ));
    }
    let flag = boot.join(OVERDRIVE_FLAG);
    // Flag first: if the copy below is cut short, the next startup finishes it.
    if enabled {
        write_synced(&flag, b"")?;
    } else if let Err(err) = fs::remove_file(&flag)
        && err.kind() != std::io::ErrorKind::NotFound
    {
        return Err(err.into());
    }
    reconcile(boot)?;
    sync_boot();
    Ok(())
}

fn reconcile(boot: &Path) -> Result<bool> {
    if !variants_present(boot) {
        return Ok(false);
    }
    let wanted = if boot.join(OVERDRIVE_FLAG).exists() {
        OVERDRIVE_IMAGE
    } else {
        STANDARD_IMAGE
    };
    let source = boot.join(wanted);
    let active = boot.join(ACTIVE_IMAGE);
    if same_content(&active, &source)? {
        return Ok(false);
    }
    replace_verified(&source, &active)?;
    Ok(true)
}

fn variants_present(boot: &Path) -> bool {
    boot.join(STANDARD_IMAGE).is_file() && boot.join(OVERDRIVE_IMAGE).is_file()
}

fn same_content(a: &Path, b: &Path) -> Result<bool> {
    match (fs::read(a), fs::read(b)) {
        (Ok(a), Ok(b)) => Ok(a == b),
        (Err(err), _) | (_, Err(err)) if err.kind() == std::io::ErrorKind::NotFound => Ok(false),
        (Err(err), _) | (_, Err(err)) => Err(err.into()),
    }
}

// Copy to a temp file, read it back, and only then rename: a bad copy must never become the
// image the boot ROM loads.
fn replace_verified(source: &Path, target: &Path) -> Result<()> {
    let data = fs::read(source)?;
    if data.is_empty() {
        return Err(AppError::Internal(format!("{} is empty", source.display())));
    }
    let tmp: PathBuf = target.with_file_name(format!(".{ACTIVE_IMAGE}.tmp"));
    write_synced(&tmp, &data)?;
    if fs::read(&tmp)? != data {
        let _ = fs::remove_file(&tmp);
        return Err(AppError::Internal(
            "copied boot image does not match its source".to_string(),
        ));
    }
    fs::rename(&tmp, target).inspect_err(|_| {
        let _ = fs::remove_file(&tmp);
    })?;
    Ok(())
}

fn write_synced(path: &Path, data: &[u8]) -> Result<()> {
    let mut file: File = OpenOptions::new()
        .create(true)
        .truncate(true)
        .write(true)
        .open(path)?;
    file.write_all(data)?;
    file.sync_all()?;
    Ok(())
}

fn sync_boot() {
    // /boot is FAT and the device may be reset right after.
    // SAFETY: sync() takes no arguments and has no failure mode.
    unsafe { nix::libc::sync() };
}

#[cfg(test)]
mod tests {
    use super::*;

    fn boot_dir(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(format!("cpu-clock-{name}-{}", std::process::id()));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        dir
    }

    fn with_variants(dir: &Path) {
        fs::write(dir.join(ACTIVE_IMAGE), b"std").unwrap();
        fs::write(dir.join(STANDARD_IMAGE), b"std").unwrap();
        fs::write(dir.join(OVERDRIVE_IMAGE), b"od").unwrap();
    }

    #[test]
    fn toggle_swaps_the_active_image() {
        let dir = boot_dir("toggle");
        with_variants(&dir);

        set_enabled(&dir, true).unwrap();
        assert_eq!(fs::read(dir.join(ACTIVE_IMAGE)).unwrap(), b"od");
        let rsp = status(&dir).unwrap();
        assert!(rsp.available && rsp.enabled && rsp.active);

        set_enabled(&dir, false).unwrap();
        assert_eq!(fs::read(dir.join(ACTIVE_IMAGE)).unwrap(), b"std");
        assert!(!dir.join(OVERDRIVE_FLAG).exists());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn reconcile_restores_the_flag_after_an_update() {
        let dir = boot_dir("reconcile");
        with_variants(&dir);
        fs::write(dir.join(OVERDRIVE_FLAG), b"").unwrap();

        assert!(reconcile(&dir).unwrap());
        assert_eq!(fs::read(dir.join(ACTIVE_IMAGE)).unwrap(), b"od");
        assert!(!reconcile(&dir).unwrap());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn images_without_variants_are_left_alone() {
        let dir = boot_dir("legacy");
        fs::write(dir.join(ACTIVE_IMAGE), b"old").unwrap();
        fs::write(dir.join(OVERDRIVE_FLAG), b"").unwrap();

        assert!(!reconcile(&dir).unwrap());
        assert!(!status(&dir).unwrap().available);
        assert!(set_enabled(&dir, true).is_err());
        assert_eq!(fs::read(dir.join(ACTIVE_IMAGE)).unwrap(), b"old");
        let _ = fs::remove_dir_all(&dir);
    }
}

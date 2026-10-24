//! The SoC hardware watchdog (`S02watchdog`): a switch and the reason for the last restart.
//!
//! The flag file `/boot/disable_watchdog` is the source of truth for the next boot; the init
//! script is started or stopped right away so the switch needs no reboot.

use std::{
    fs::{self, File},
    path::{Path, PathBuf},
    time::Duration,
};

use axum::{Json, response::IntoResponse};
use serde::{Deserialize, Serialize};
use tokio::task;

use crate::{
    AppError, Result,
    error::ApiResponse,
    system::command::{AllowedCommand, run_allowed},
};

const DISABLE_FLAG: &str = "/boot/disable_watchdog";
const DEVICE: &str = "/dev/watchdog";
const INIT_SCRIPT: &str = "/etc/init.d/S02watchdog";
const PID_FILE: &str = "/var/run/kvm-watchdog.pid";
const REASON_FILE: &str = "/tmp/boot-reason";
const REASONS: [&str; 5] = ["power-on", "restart", "watchdog", "overheat", "unknown"];

struct Paths {
    flag: PathBuf,
    device: PathBuf,
    init_script: PathBuf,
    pid_file: PathBuf,
    reason_file: PathBuf,
}

impl Paths {
    fn device() -> Self {
        Self {
            flag: DISABLE_FLAG.into(),
            device: DEVICE.into(),
            init_script: INIT_SCRIPT.into(),
            pid_file: PID_FILE.into(),
            reason_file: REASON_FILE.into(),
        }
    }
}

#[derive(Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct WatchdogRsp {
    available: bool,
    enabled: bool,
    running: bool,
    /// One of `power-on`, `restart`, `watchdog`, `overheat`, `unknown`.
    last_restart: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct SetWatchdogReq {
    enabled: bool,
}

pub async fn get_watchdog() -> Result<impl IntoResponse> {
    let rsp = task::spawn_blocking(|| status(&Paths::device()))
        .await
        .map_err(|err| AppError::Internal(err.to_string()))?;
    Ok(Json(ApiResponse::ok(rsp)))
}

pub async fn set_watchdog(Json(req): Json<SetWatchdogReq>) -> Result<impl IntoResponse> {
    task::spawn_blocking(move || set_flag(&Paths::device(), req.enabled))
        .await
        .map_err(|err| AppError::Internal(err.to_string()))??;

    let action = if req.enabled { "start" } else { "stop" };
    let output = run_allowed(
        AllowedCommand::ServiceWatchdog,
        [action],
        Duration::from_secs(8),
    )
    .await?;
    if output.status != 0 {
        return Err(AppError::Internal(format!(
            "failed to {action} the hardware watchdog"
        )));
    }
    Ok(Json(ApiResponse::<()>::ok_empty()))
}

fn status(paths: &Paths) -> WatchdogRsp {
    WatchdogRsp {
        available: paths.device.exists() && paths.init_script.is_file(),
        enabled: !paths.flag.exists(),
        running: is_running(&paths.pid_file),
        last_restart: last_restart(&paths.reason_file),
    }
}

fn is_running(pid_file: &Path) -> bool {
    fs::read_to_string(pid_file)
        .ok()
        .and_then(|text| text.trim().parse::<u32>().ok())
        .is_some_and(|pid| Path::new(&format!("/proc/{pid}")).exists())
}

fn last_restart(reason_file: &Path) -> Option<String> {
    let text = fs::read_to_string(reason_file).ok()?;
    let reason = text.trim();
    REASONS.contains(&reason).then(|| reason.to_string())
}

// The flag outlives a reboot; /boot is FAT, so it is synced right away.
fn set_flag(paths: &Paths, enabled: bool) -> Result<()> {
    if !paths.init_script.is_file() {
        return Err(AppError::Unsupported(
            "this image has no hardware watchdog".to_string(),
        ));
    }
    if enabled {
        if let Err(err) = fs::remove_file(&paths.flag)
            && err.kind() != std::io::ErrorKind::NotFound
        {
            return Err(err.into());
        }
    } else {
        File::create(&paths.flag)?.sync_all()?;
    }
    // SAFETY: sync() takes no arguments and has no failure mode.
    unsafe { nix::libc::sync() };
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn paths(name: &str) -> Paths {
        let dir = std::env::temp_dir().join(format!("watchdog-{name}-{}", std::process::id()));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        Paths {
            flag: dir.join("disable_watchdog"),
            device: dir.join("watchdog"),
            init_script: dir.join("S02watchdog"),
            pid_file: dir.join("watchdog.pid"),
            reason_file: dir.join("boot-reason"),
        }
    }

    fn cleanup(paths: &Paths) {
        let _ = fs::remove_dir_all(paths.flag.parent().unwrap());
    }

    #[test]
    fn an_image_without_the_script_is_unavailable() {
        let paths = paths("none");
        let rsp = status(&paths);
        assert!(!rsp.available && rsp.enabled && !rsp.running);
        assert!(set_flag(&paths, false).is_err());
        cleanup(&paths);
    }

    #[test]
    fn the_flag_turns_the_watchdog_off_and_on() {
        let paths = paths("flag");
        fs::write(&paths.device, b"").unwrap();
        fs::write(&paths.init_script, b"#!/bin/sh\n").unwrap();
        assert!(status(&paths).available);

        set_flag(&paths, false).unwrap();
        assert!(!status(&paths).enabled);
        set_flag(&paths, true).unwrap();
        assert!(status(&paths).enabled);
        // turning it on again changes nothing
        set_flag(&paths, true).unwrap();
        cleanup(&paths);
    }

    #[test]
    fn running_means_the_pid_in_the_file_is_alive() {
        let paths = paths("pid");
        assert!(!is_running(&paths.pid_file));
        fs::write(&paths.pid_file, format!("{}\n", std::process::id())).unwrap();
        assert!(is_running(&paths.pid_file));
        fs::write(&paths.pid_file, "4294967295\n").unwrap();
        assert!(!is_running(&paths.pid_file));
        fs::write(&paths.pid_file, "x").unwrap();
        assert!(!is_running(&paths.pid_file));
        cleanup(&paths);
    }

    #[test]
    fn the_last_restart_is_one_of_the_known_reasons() {
        let paths = paths("reason");
        assert_eq!(last_restart(&paths.reason_file), None);
        fs::write(&paths.reason_file, "watchdog\n").unwrap();
        assert_eq!(last_restart(&paths.reason_file), Some("watchdog".into()));
        fs::write(&paths.reason_file, "something else\n").unwrap();
        assert_eq!(last_restart(&paths.reason_file), None);
        cleanup(&paths);
    }
}

//! Live device readings for Settings > System > Monitor.

use std::{
    fs,
    sync::Mutex,
    time::{Duration, Instant},
};

use axum::{Json, response::IntoResponse};
use nix::sys::statvfs::statvfs;
use serde::Serialize;
use tokio::task;

use crate::{AppError, Result, error::ApiResponse};

const MEMINFO_FILE: &str = "/proc/meminfo";
const THERMAL_FILE: &str = "/sys/class/thermal/thermal_zone0/temp";
const CLK_SUMMARY_FILE: &str = "/sys/kernel/debug/clk/clk_summary";
const CPU_CLOCK: &str = "clk_c906_0";
const VIDEO_CLOCK: &str = "clk_vc_src0";
// The FSBL fixes the clocks until the next boot, so the debugfs table is read once. A failed
// read is retried after this pause.
const CLOCK_RETRY: Duration = Duration::from_secs(10);
// The standard-clock C906 runs at 850 MHz; anything above it is the overdrive table.
const STANDARD_CPU_MHZ: u64 = 850;

static CLOCK_CACHE: Mutex<Option<(Instant, Clocks)>> = Mutex::new(None);

#[derive(Debug, Clone, Copy, Default, PartialEq)]
struct Clocks {
    cpu_mhz: Option<u64>,
    video_mhz: Option<u64>,
}

impl Clocks {
    fn is_complete(&self) -> bool {
        self.cpu_mhz.is_some() && self.video_mhz.is_some()
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MonitorRsp {
    cpu_mhz: Option<u64>,
    video_mhz: Option<u64>,
    overdrive: bool,
    temperature_c: Option<f64>,
    memory: Option<Memory>,
    disks: Vec<Disk>,
}

#[derive(Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct Memory {
    total_kb: u64,
    used_kb: u64,
    swap_total_kb: u64,
    swap_used_kb: u64,
}

#[derive(Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct Disk {
    mount: &'static str,
    total_bytes: u64,
    used_bytes: u64,
}

pub async fn get_monitor() -> Result<impl IntoResponse> {
    let rsp = task::spawn_blocking(snapshot)
        .await
        .map_err(|err| AppError::Internal(err.to_string()))?;
    Ok(Json(ApiResponse::ok(rsp)))
}

fn snapshot() -> MonitorRsp {
    let clocks = cached_clocks();
    MonitorRsp {
        cpu_mhz: clocks.cpu_mhz,
        video_mhz: clocks.video_mhz,
        overdrive: clocks.cpu_mhz.is_some_and(|mhz| mhz > STANDARD_CPU_MHZ),
        temperature_c: fs::read_to_string(THERMAL_FILE)
            .ok()
            .and_then(|text| parse_temperature(&text)),
        memory: fs::read_to_string(MEMINFO_FILE)
            .ok()
            .and_then(|text| parse_meminfo(&text)),
        disks: ["/", "/data"].iter().filter_map(|m| disk(m)).collect(),
    }
}

fn cached_clocks() -> Clocks {
    let mut cache = CLOCK_CACHE.lock().unwrap_or_else(|err| err.into_inner());
    if let Some((at, clocks)) = *cache
        && (clocks.is_complete() || at.elapsed() < CLOCK_RETRY)
    {
        return clocks;
    }
    let clocks = fs::read_to_string(CLK_SUMMARY_FILE)
        .map(|text| parse_clocks(&text))
        .unwrap_or_default();
    *cache = Some((Instant::now(), clocks));
    clocks
}

fn disk(mount: &'static str) -> Option<Disk> {
    let stat = statvfs(mount).ok()?;
    let unit = stat.fragment_size() as u64;
    let used = (stat.blocks() - stat.blocks_free()) as u64 * unit;
    // like df, the total counts what a normal user can use, so used + available
    let total = used + stat.blocks_available() as u64 * unit;
    (total > 0).then_some(Disk {
        mount,
        total_bytes: total,
        used_bytes: used,
    })
}

// millidegrees Celsius, one line
fn parse_temperature(text: &str) -> Option<f64> {
    let milli: i64 = text.trim().parse().ok()?;
    Some(milli as f64 / 1000.0)
}

fn meminfo_kb(text: &str, key: &str) -> Option<u64> {
    text.lines()
        .find_map(|line| line.strip_prefix(key)?.strip_prefix(':'))
        .and_then(|rest| rest.split_whitespace().next())
        .and_then(|value| value.parse().ok())
}

fn parse_meminfo(text: &str) -> Option<Memory> {
    let total = meminfo_kb(text, "MemTotal")?;
    let available = meminfo_kb(text, "MemAvailable").or_else(|| {
        Some(
            meminfo_kb(text, "MemFree")?
                + meminfo_kb(text, "Buffers").unwrap_or(0)
                + meminfo_kb(text, "Cached").unwrap_or(0),
        )
    })?;
    let swap_total = meminfo_kb(text, "SwapTotal").unwrap_or(0);
    let swap_free = meminfo_kb(text, "SwapFree").unwrap_or(0);
    Some(Memory {
        total_kb: total,
        used_kb: total.saturating_sub(available),
        swap_total_kb: swap_total,
        swap_used_kb: swap_total.saturating_sub(swap_free),
    })
}

// columns: name, enable, prepare, protect, rate (Hz), ...
fn parse_clocks(text: &str) -> Clocks {
    let rate_mhz = |name: &str| {
        text.lines().find_map(|line| {
            let mut fields = line.split_whitespace();
            if fields.next()? != name {
                return None;
            }
            let hz: u64 = fields.nth(3)?.parse().ok()?;
            Some(hz / 1_000_000)
        })
    };
    Clocks {
        cpu_mhz: rate_mhz(CPU_CLOCK),
        video_mhz: rate_mhz(VIDEO_CLOCK),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn temperature_is_millidegrees() {
        assert_eq!(parse_temperature("54583\n"), Some(54.583));
        assert_eq!(parse_temperature("hot"), None);
    }

    #[test]
    fn meminfo_uses_available_memory() {
        let text = "MemTotal:  262144 kB\nMemFree:  10000 kB\nMemAvailable: 150000 kB\nSwapTotal: 262144 kB\nSwapFree: 200000 kB\n";
        assert_eq!(
            parse_meminfo(text),
            Some(Memory {
                total_kb: 262144,
                used_kb: 112144,
                swap_total_kb: 262144,
                swap_used_kb: 62144,
            })
        );
    }

    #[test]
    fn meminfo_without_available_falls_back_to_free_buffers_cache() {
        let text = "MemTotal: 1000 kB\nMemFree: 100 kB\nBuffers: 50 kB\nCached: 150 kB\n";
        let memory = parse_meminfo(text).unwrap();
        assert_eq!(memory.used_kb, 700);
        assert_eq!(memory.swap_total_kb, 0);
    }

    #[test]
    fn clocks_are_read_by_name_from_the_summary() {
        let text = "    clk_xtal_a53                      1        1        0    25000000          0     0  50000\n          clk_vc_src0            491039   491039        0   515000000          0     0  50000\n          clk_vc_src01                0        0        0  1030000000          0     0  50000\n       clk_c906_0                     1        1        0  1050000000          0     0  50000\n";
        assert_eq!(
            parse_clocks(text),
            Clocks {
                cpu_mhz: Some(1050),
                video_mhz: Some(515),
            }
        );
        assert_eq!(parse_clocks(""), Clocks::default());
    }
}

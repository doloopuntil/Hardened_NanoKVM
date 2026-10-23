//! Live device readings for Settings > System > Monitor.

use std::{
    collections::VecDeque,
    fs,
    sync::{Mutex, OnceLock},
    thread,
    time::{Duration, Instant, SystemTime, UNIX_EPOCH},
};

use axum::{Json, extract::Query, response::IntoResponse};
use nix::sys::statvfs::statvfs;
use serde::{Deserialize, Serialize};
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

// One reading a second, five minutes kept: what the graphs on the Monitor page show.
const SAMPLE_INTERVAL: Duration = Duration::from_secs(1);
const HISTORY_LEN: usize = 300;

static CLOCK_CACHE: Mutex<Option<(Instant, Clocks)>> = Mutex::new(None);
static HISTORY: Mutex<History> = Mutex::new(History::new());
static EPOCH: OnceLock<u64> = OnceLock::new();

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

#[derive(Debug, Deserialize)]
pub struct MonitorQuery {
    /// The newest sample the page already has.
    since: Option<u64>,
    /// The `epoch` of the response that sample came from.
    epoch: Option<u64>,
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
    /// Start time of this server run; samples of another run are not comparable.
    epoch: u64,
    latest_seq: u64,
    samples: Vec<Sample>,
}

#[derive(Debug, Clone, Copy, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
struct Sample {
    seq: u64,
    temperature_c: Option<f64>,
    memory_percent: Option<f64>,
}

/// The last `HISTORY_LEN` samples, numbered from 1.
struct History {
    next_seq: u64,
    samples: VecDeque<Sample>,
}

impl History {
    const fn new() -> Self {
        Self {
            next_seq: 1,
            samples: VecDeque::new(),
        }
    }

    fn push(&mut self, temperature_c: Option<f64>, memory_percent: Option<f64>) {
        if self.samples.len() == HISTORY_LEN {
            self.samples.pop_front();
        }
        self.samples.push_back(Sample {
            seq: self.next_seq,
            temperature_c,
            memory_percent,
        });
        self.next_seq += 1;
    }

    fn latest_seq(&self) -> u64 {
        self.next_seq - 1
    }

    /// Samples newer than `since`, or all of them when the page has none, is ahead of this
    /// server (it restarted), or asks about another run.
    fn since(&self, since: Option<u64>, same_run: bool) -> Vec<Sample> {
        match since {
            Some(seq) if same_run && seq <= self.latest_seq() => self
                .samples
                .iter()
                .filter(|sample| sample.seq > seq)
                .copied()
                .collect(),
            _ => self.samples.iter().copied().collect(),
        }
    }
}

fn epoch() -> u64 {
    *EPOCH.get_or_init(|| {
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|elapsed| elapsed.as_millis() as u64)
            .unwrap_or(0)
    })
}

/// Starts the thread that keeps the history; a thread of its own, so it never waits on the
/// one worker the runtime has.
pub fn start_sampler() {
    epoch();
    let spawned = thread::Builder::new()
        .name("monitor-sampler".to_string())
        .spawn(|| {
            loop {
                record_sample();
                thread::sleep(SAMPLE_INTERVAL);
            }
        });
    if let Err(err) = spawned {
        tracing::warn!(error = %err, "failed to start the monitor sampler");
    }
}

fn record_sample() {
    let temperature_c = fs::read_to_string(THERMAL_FILE)
        .ok()
        .and_then(|text| parse_temperature(&text))
        .map(round_tenth);
    let memory_percent = fs::read_to_string(MEMINFO_FILE)
        .ok()
        .and_then(|text| parse_meminfo(&text))
        .filter(|memory| memory.total_kb > 0)
        .map(|memory| round_tenth(memory.used_kb as f64 * 100.0 / memory.total_kb as f64));
    HISTORY
        .lock()
        .unwrap_or_else(|err| err.into_inner())
        .push(temperature_c, memory_percent);
}

fn round_tenth(value: f64) -> f64 {
    (value * 10.0).round() / 10.0
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

pub async fn get_monitor(Query(query): Query<MonitorQuery>) -> Result<impl IntoResponse> {
    let rsp = task::spawn_blocking(move || snapshot(&query))
        .await
        .map_err(|err| AppError::Internal(err.to_string()))?;
    Ok(Json(ApiResponse::ok(rsp)))
}

fn snapshot(query: &MonitorQuery) -> MonitorRsp {
    let clocks = cached_clocks();
    let (latest_seq, samples) = {
        let history = HISTORY.lock().unwrap_or_else(|err| err.into_inner());
        let same_run = query.epoch.is_none_or(|run| run == epoch());
        (history.latest_seq(), history.since(query.since, same_run))
    };
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
        epoch: epoch(),
        latest_seq,
        samples,
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

    fn filled(count: u64) -> History {
        let mut history = History::new();
        for i in 0..count {
            history.push(Some(i as f64), None);
        }
        history
    }

    #[test]
    fn history_keeps_the_last_five_minutes() {
        let history = filled(HISTORY_LEN as u64 + 20);
        assert_eq!(history.samples.len(), HISTORY_LEN);
        assert_eq!(history.samples.front().unwrap().seq, 21);
        assert_eq!(history.latest_seq(), HISTORY_LEN as u64 + 20);
    }

    #[test]
    fn a_page_without_samples_gets_them_all() {
        let history = filled(5);
        assert_eq!(history.since(None, true).len(), 5);
        assert_eq!(history.since(Some(5), true).len(), 0);
        let newer: Vec<u64> = history.since(Some(3), true).iter().map(|s| s.seq).collect();
        assert_eq!(newer, vec![4, 5]);
    }

    #[test]
    fn a_restarted_server_or_run_gets_everything_again() {
        let history = filled(5);
        // the page remembers 40, the server only has 5: it restarted
        assert_eq!(history.since(Some(40), true).len(), 5);
        // the page asks about another run of the server
        assert_eq!(history.since(Some(3), false).len(), 5);
    }

    #[test]
    fn readings_are_rounded_to_a_tenth() {
        assert_eq!(round_tenth(54.583), 54.6);
        assert_eq!(round_tenth(42.04), 42.0);
    }

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

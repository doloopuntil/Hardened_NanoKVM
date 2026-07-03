use nix::{ifaddrs::getifaddrs, net::if_::InterfaceFlags};
use serde::Serialize;
use std::{
    collections::{BTreeMap, BTreeSet},
    env, fs, io,
    path::Path,
    process, thread,
    time::{Duration, SystemTime, UNIX_EPOCH},
};

const OUTPUT_PATH: &str = "/tmp/nanokvm-hwmon-state.json";
const DEFAULT_INTERVAL_SECS: u64 = 5;
const KNOWN_INTERFACES: &[&str] = &["eth0", "wlan0", "usb0", "tailscale0", "lo"];

#[derive(Debug, Serialize)]
struct Snapshot {
    schema: &'static str,
    generated_at_unix_ms: u128,
    interfaces: BTreeMap<String, InterfaceSnapshot>,
    usb: UsbSnapshot,
    hdmi: HdmiSnapshot,
    stream: StreamSnapshot,
    markers: MarkerSnapshot,
}

#[derive(Debug, Default, Serialize)]
struct InterfaceSnapshot {
    exists: bool,
    flags_up: bool,
    flags_running: bool,
    operstate: Option<String>,
    carrier: Option<String>,
    mac: Option<String>,
    ipv4: Vec<String>,
    ipv6: Vec<String>,
}

#[derive(Debug, Serialize)]
struct UsbSnapshot {
    udc_state: Option<String>,
    hid_enabled: bool,
    mass_storage_enabled: bool,
    rndis_enabled: bool,
}

#[derive(Debug, Serialize)]
struct HdmiSnapshot {
    active: Option<bool>,
    vi_fps: Option<String>,
    vi_dbg_line: Option<String>,
    width: Option<u32>,
    height: Option<u32>,
}

#[derive(Debug, Serialize)]
struct StreamSnapshot {
    #[serde(rename = "type")]
    stream_type: Option<String>,
    now_fps: Option<u32>,
    fps: Option<u32>,
    qlty: Option<u32>,
    gop: Option<u32>,
    res: Option<u32>,
    state: Option<u32>,
    width: Option<u32>,
    height: Option<u32>,
}

#[derive(Debug, Serialize)]
struct MarkerSnapshot {
    oled_exists: bool,
    frame_detect_marker: bool,
    watchdog_enabled: bool,
    watchdog_temp: bool,
    wifi_exists: bool,
    wifi_ap_mode: bool,
    h264_safe_mode: bool,
}

fn main() {
    let once = env::args().any(|arg| arg == "--once");
    let interval = env::var("NANOKVM_HWMON_INTERVAL_SECS")
        .ok()
        .and_then(|value| value.parse::<u64>().ok())
        .map(|value| value.clamp(1, 300))
        .unwrap_or(DEFAULT_INTERVAL_SECS);

    loop {
        if let Err(err) = write_snapshot(OUTPUT_PATH) {
            eprintln!("failed to write hwmon snapshot: {err}");
        }
        if once {
            break;
        }
        thread::sleep(Duration::from_secs(interval));
    }
}

fn write_snapshot(path: &str) -> io::Result<()> {
    let snapshot = collect_snapshot();
    let data = serde_json::to_vec_pretty(&snapshot)
        .map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err))?;
    let tmp_path = format!("{path}.{}.tmp", process::id());
    fs::write(&tmp_path, data)?;
    fs::rename(tmp_path, path)?;
    Ok(())
}

fn collect_snapshot() -> Snapshot {
    Snapshot {
        schema: "nanokvm-hwmon/v1",
        generated_at_unix_ms: unix_ms(),
        interfaces: collect_interfaces(),
        usb: collect_usb(),
        hdmi: collect_hdmi(),
        stream: collect_stream(),
        markers: collect_markers(),
    }
}

fn unix_ms() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis()
}

fn collect_interfaces() -> BTreeMap<String, InterfaceSnapshot> {
    let mut names = BTreeSet::new();
    for name in KNOWN_INTERFACES {
        names.insert((*name).to_string());
    }
    if let Ok(entries) = fs::read_dir("/sys/class/net") {
        for entry in entries.flatten() {
            if let Some(name) = entry.file_name().to_str() {
                names.insert(name.to_string());
            }
        }
    }

    let mut interfaces = BTreeMap::new();
    for name in names {
        let sysfs = Path::new("/sys/class/net").join(&name);
        interfaces.insert(
            name.clone(),
            InterfaceSnapshot {
                exists: sysfs.exists(),
                operstate: read_trimmed(sysfs.join("operstate")),
                carrier: read_trimmed(sysfs.join("carrier")),
                mac: read_trimmed(sysfs.join("address")),
                ..InterfaceSnapshot::default()
            },
        );
    }

    if let Ok(addrs) = getifaddrs() {
        for iface in addrs {
            let entry = interfaces.entry(iface.interface_name.clone()).or_default();
            entry.exists = true;
            entry.flags_up |= iface.flags.contains(InterfaceFlags::IFF_UP);
            entry.flags_running |= iface.flags.contains(InterfaceFlags::IFF_RUNNING);

            let Some(address) = iface.address else {
                continue;
            };
            if let Some(ipv4) = address.as_sockaddr_in().map(|addr| addr.ip()) {
                push_unique(&mut entry.ipv4, ipv4.to_string());
            } else if let Some(ipv6) = address.as_sockaddr_in6().map(|addr| addr.ip()) {
                push_unique(&mut entry.ipv6, ipv6.to_string());
            }
        }
    }

    interfaces
}

fn collect_usb() -> UsbSnapshot {
    let config = Path::new("/sys/kernel/config/usb_gadget/g0/configs/c.1");
    let entries = dir_names(config);
    UsbSnapshot {
        udc_state: read_trimmed("/sys/class/udc/4340000.usb/state"),
        hid_enabled: entries.iter().any(|name| name.starts_with("hid.")),
        mass_storage_enabled: entries.iter().any(|name| name == "mass_storage.disk0"),
        rndis_enabled: entries.iter().any(|name| name == "rndis.usb0"),
    }
}

fn collect_hdmi() -> HdmiSnapshot {
    let vi_dbg = fs::read_to_string("/proc/cvitek/vi_dbg").ok();
    let vi_dbg_line = vi_dbg
        .as_deref()
        .and_then(|content| content.lines().find(|line| line.contains("VIFPS")))
        .map(str::trim)
        .map(str::to_string);
    let vi_fps = vi_dbg_line.as_deref().and_then(parse_vi_fps);
    let active = vi_fps
        .as_deref()
        .and_then(|value| value.parse::<f64>().ok())
        .map(|fps| fps > 0.0);

    HdmiSnapshot {
        active,
        vi_fps,
        vi_dbg_line,
        width: read_u32("/kvmapp/kvm/width"),
        height: read_u32("/kvmapp/kvm/height"),
    }
}

fn collect_stream() -> StreamSnapshot {
    StreamSnapshot {
        stream_type: read_trimmed("/kvmapp/kvm/type"),
        now_fps: read_u32("/kvmapp/kvm/now_fps"),
        fps: read_u32("/kvmapp/kvm/fps"),
        qlty: read_u32("/kvmapp/kvm/qlty"),
        gop: read_u32("/kvmapp/kvm/gop"),
        res: read_u32("/kvmapp/kvm/res"),
        state: read_u32("/kvmapp/kvm/state"),
        width: read_u32("/kvmapp/kvm/width"),
        height: read_u32("/kvmapp/kvm/height"),
    }
}

fn collect_markers() -> MarkerSnapshot {
    MarkerSnapshot {
        oled_exists: Path::new("/etc/kvm/oled_exist").exists(),
        frame_detect_marker: Path::new("/etc/kvm/frame_detact").exists(),
        watchdog_enabled: Path::new("/etc/kvm/watchdog").exists(),
        watchdog_temp: Path::new("/tmp/watchdog").exists(),
        wifi_exists: Path::new("/etc/kvm/wifi_exist").exists(),
        wifi_ap_mode: Path::new("/tmp/wifiap").exists(),
        h264_safe_mode: Path::new("/etc/kvm/h264_safe_mode").exists(),
    }
}

fn parse_vi_fps(line: &str) -> Option<String> {
    line.split_whitespace().nth(2).map(str::to_string)
}

fn read_trimmed<P: AsRef<Path>>(path: P) -> Option<String> {
    let value = fs::read_to_string(path).ok()?;
    let value = value.trim().to_string();
    if value.is_empty() { None } else { Some(value) }
}

fn read_u32(path: &str) -> Option<u32> {
    read_trimmed(path)?.parse().ok()
}

fn dir_names(path: &Path) -> Vec<String> {
    fs::read_dir(path)
        .ok()
        .into_iter()
        .flat_map(|entries| entries.flatten())
        .filter_map(|entry| entry.file_name().to_str().map(str::to_string))
        .collect()
}

fn push_unique(values: &mut Vec<String>, value: String) {
    if !values.contains(&value) {
        values.push(value);
    }
}

#[cfg(test)]
mod tests {
    use super::parse_vi_fps;

    #[test]
    fn parses_vi_fps_from_vendor_line() {
        assert_eq!(parse_vi_fps("VIFPS\t\t\t:  60"), Some("60".to_string()));
        assert_eq!(parse_vi_fps("VIFPS : 59.94"), Some("59.94".to_string()));
        assert_eq!(parse_vi_fps("too-short"), None);
    }
}

---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-24
source: kvmapp/system/init.d/
---

# Init scripts

The scripts live in `kvmapp/system/init.d/` and are installed to `/etc/init.d/`.
BusyBox init runs them in name order at boot. The server controls services only
through these scripts, never by starting daemons itself.

| Script | Does |
| --- | --- |
| `S00kmod` | Loads the SG2002 kernel modules (video, encoder, I2C, …). |
| `S01fs` | Mounts and prepares the data partition; keeps `/data` read-only while the virtual disk shares it. Grows the root filesystem into its partition at every boot. A root filesystem flagged with errors, which blocks that growth, is checked with `e2fsck` first; the RTC register `RTC_INFO2` limits this to one attempt per power cycle. |
| `S01syslogd`, `S02klogd` | System and kernel logging, to the tmpfs buffer and optionally to remote syslog. |
| `S02watchdog` | Arms the SoC hardware watchdog (60 s timeout, fed every 10 s) and sets `kernel.panic=10`, so a hung or panicked system restarts by itself. Records why the chip last restarted in `/tmp/boot-reason`. `/boot/disable_watchdog` turns it off and disarms the timer the FSBL started. The raw system update stops it before writing the partitions. |
| `S03usbdev` | Builds the USB gadget: keyboard, mice, mass storage, network. Hands over to `S03usbhid` when `/boot/usb.hidonly` exists. |
| `S03usbhid` | The HID-only gadget: keyboard and mice only. |
| `S15kvmhwd` | Board GPIO and hardware setup (OLED reset, ATX pins). |
| `S30eth` | Wired network: DHCP or static IPv4, fixed DNS servers, IPv6 modes, MAC derived from the chip ID. |
| `S30wifi` | Wi-Fi client or access-point mode. |
| `S40firewall` | Applies the firewall mode from `/etc/kvm/firewall.json`, including the WireGuard rules. See [Firewall modes](../guide/firewall.md). |
| `S45wireguard` | Brings up `wg0` from `/etc/kvm/wireguard/` and runs the endpoint watcher. See [WireGuard](../guide/wireguard.md). |
| `S49ntp` | Sets the clock with NTP at boot and keeps it in sync. |
| `S50avahi-daemon` | mDNS, when enabled. |
| `S50ssdpd` | SSDP discovery. |
| `S50sshd` | SSH, unless `/etc/kvm/ssh_stop` exists. |
| `S95nanokvm` | Starts the Rust server (`/kvmapp/server/NanoKVM-Server`), restores configuration after a system update, runs the health watchdog and the boot watchdog that confirms or rolls back a system update. |
| `S96picoclaw` | The PicoClaw agent, when installed. |
| `S98tailscaled` | Tailscale, when installed and enabled. |

## Rules for changing them

- `S95nanokvm`, the kvmapp package (`buildroot-external/.../hardened-nanokvm-kvmapp.mk`)
  and `main.rs` each list the boot scripts. A new script must be added to all
  three.
- Scripts that read server-written files (`S40firewall`, `S45wireguard`) parse
  them with `sed`; the server validates every value it writes, so keep those
  files one `Key=value` per line.

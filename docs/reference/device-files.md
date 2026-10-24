---
status: current
applies-to: system 0.4.0 / app 2.1.0
last-checked: 2026-10-24
source: constants in server-rust/src and kvmapp/system/init.d
---

# Files on the device

Where the NanoKVM keeps its state. Change these through the web UI where one
exists: the server validates what it writes, and several init scripts parse these
files with `sed`.

## SD card layout

| Partition | Mounted at | Holds |
| --- | --- | --- |
| `/dev/mmcblk0p1` (VFAT) | `/boot` | Boot files (`fip.bin`, `fip.std.bin`, `fip.od.bin`, `boot.sd`) and boot-time flags. |
| `/dev/mmcblk0p2` (ext4) | `/` | Buildroot root filesystem, `/etc/kvm`, `/kvmapp`. |
| data partition | `/data` | Disk images, the update cache, logs of system updates. |

A system update rewrites the first two; `/data` and the saved `/etc/kvm` survive.

## `/etc/kvm`: configuration

| Path | Holds |
| --- | --- |
| `server.yaml` | Server configuration ([reference](config.md)). |
| `pwd` | The account: user name, password hash, TOTP secret and backup-code hashes. |
| `session_secret` | Per-device session signing secret, generated on first start. |
| `server.crt`, `server.key` | TLS certificate and key. |
| `firewall.json` | Firewall mode. |
| `wireguard/kvm.conf`, `wireguard/private.key` | WireGuard settings and private key (0600). |
| `network/dns.mode`, `network/dns.servers` | DNS mode (`dhcp`/`manual`) and fixed DNS servers. |
| `time.json` | NTP servers and time zone. |
| `syslog.json` | Remote syslog and log buffer settings. |
| `system-update-signing.pub.pem` | Key that update metadata must be signed with. |
| `system-version.json` | Installed system version. |
| `system-update-*.json`, `system-update-rollback.sh` | Pending system update, backup, boot-good marker and rollback script. |
| `ssh_stop` | Present when SSH is turned off. |
| `hdmi_disable`, `hdmi_idle_timeout`, `h264_safe_mode` | Video capture settings. |
| `oled_sleep` | OLED timeout. |
| `mouse-jiggler`, `shortcuts.json`, `leader-key` | Input settings. |
| `web-title` | Browser tab title. |
| `scripts/`, `autostart/` | Uploaded user scripts and autostart scripts. |
| `cache/wol` | Saved Wake-on-LAN MAC addresses. |
| `GOMEMLIMIT` | Tailscale memory limit. |
| `wifi.ssid`, `wifi.pass` | Wi-Fi credentials. |
| `hw`, `oled_exist`, `wifi_exist` | Board detection written at boot (`alpha`, `beta`, `pcie`; OLED and Wi-Fi present). |
| `.picoclaw_internal_token` | Token PicoClaw uses to call the server's internal routes. |

## `/boot`: flags read before the root filesystem is up

| Path | Holds |
| --- | --- |
| `hostname` | Host name, copied to `/etc/hostname`. |
| `usb.hidonly` | HID-only mode. |
| `usb.disk0`, `usb.rndis0` | Virtual disk and virtual network on. |
| `usb.wakeup`, `usb.notwakeup` | USB wakeup setting. |
| `eth.nodhcp` | Static IPv4 configuration. |
| `eth.ipv6.mode`, `eth.ipv6` | IPv6 mode and static address. |
| `resolv.conf` | Fixed DNS servers. |
| `ver` | Base image version. |
| `cpu.overdrive` | Clock overdrive chosen. The server keeps `fip.bin` equal to `fip.od.bin` while it exists, and to `fip.std.bin` otherwise. |
| `disable_watchdog` | Leave the hardware watchdog off (`S02watchdog`). A system update keeps it. |
| `cpu.overdrive.keep` | Keep the overdrive choice across system updates. Without it the update script drops `cpu.overdrive`, so the device returns to the standard clocks. |

## Elsewhere

| Path | Holds |
| --- | --- |
| `/kvmapp/` | The application: `server/NanoKVM-Server`, `server/web/`, `server/dl_lib/` (native libraries), `system/init.d/`, `system/keys/`, `version`. Replaced by an application update. |
| `/kvmapp/kvm/` | Runtime state shared with the native video code (resolution, frame rate, quality, Wi-Fi state). |
| `/data/.hardened-kvmcache/` | Downloaded and staged updates. |
| `/root/.picoclaw/` | PicoClaw configuration, `.security.yml` with the model API key, and `workspace/sessions/`. |
| `/root/.tailscale/` | Tailscale state. |
| `/tmp/hardened-syslog/messages` | Local log buffer (tmpfs, lost on reboot). |
| `/tmp/nanokvm-server.log`, `/tmp/picoclaw.log` | Server and PicoClaw logs. |
| `/tmp/hardened-firewall-pending.json` | A firewall change waiting for confirmation. |

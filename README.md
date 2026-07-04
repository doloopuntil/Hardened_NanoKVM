# Hardened NanoKVM

<p align="center">
  <img src="web/public/hardened-logo.png" alt="Hardened NanoKVM logo" width="720">
</p>

<div align="center">
  <br>
  <img src="https://wiki.sipeed.com/hardware/assets/NanoKVM/introduce/NanoKVM_3.png" alt="NanoKVM" style="margin: 20px 0;">
  <h3>
    <a href="https://wiki.sipeed.com/hardware/en/kvm/NanoKVM/introduction.html">🚀 Quick Start</a>
     |
    <a href="https://cn.dl.sipeed.com/shareURL/KVM/nanoKVM">🛠️ Hardware Details</a>
     |
    <a href="https://github.com/woffko/Hardened_NanoKVM/releases/latest">💾 Hardened Releases</a>
  </h3>
  <br>
</div>

## Hardened NanoKVM

Hardened NanoKVM is a beta security-focused fork of Sipeed NanoKVM. It ships a
Rust web backend while keeping the existing NanoKVM hardware, web UI, native
video pipeline, and service layout.

The project goal is not to rewrite the whole firmware. The Rust backend remains
a drop-in `NanoKVM-Server` and continues to use the existing `kvm_system`,
`libkvm.so`, USB gadget setup, Maix multimedia stack, and frontend. Native
runtime libraries used by the Rust backend live under `server-rust/native/`.

The web UI currently brands this fork as **Hardened NanoKVM**. The current
published GitHub application release is **2.0.29 RC7**.

The current published application release is available from the `woffko` fork at
[`hardened-rust-rc7`](https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc7).

The latest raw system-update and SD-card artifacts are the **0.2.21-raw.1**
RC7 builds. The system-update channel metadata points to the companion
`hardened-system-0.2.21-raw.1` tag because deployed devices trust raw-system
downloads from `hardened-system-*` release URLs. Those artifacts use
the Buildroot `2023.11.2` base label with the `Buildroot 2023.11.3 package
backports` security-backport baseline.

## Current Highlights

Hardened NanoKVM keeps the upstream hardware stack and web UI shape, but changes
the security, update, and administration model substantially:

- **Rust web backend:** shipped artifacts run the Hardened Rust
  `NanoKVM-Server` with the existing native video and hardware stack.
- **Hardened login and sessions:** first-boot account setup, per-device session
  secret, CSRF binding, Origin checks, login rate limiting/lockout, explicit
  session revocation, Argon2id for new passwords, and compatibility with
  existing bcrypt password files.
- **Safer terminal access:** the web terminal is guarded by the authenticated
  web session instead of being merely hidden by a toolbar toggle.
- **Signed application updates:** GitHub-hosted app updates use signed
  `latest.json` metadata, sha512 archive verification, source URL validation,
  safe extraction, and package validation before installation.
- **Guarded raw system updates:** separate system-update channel metadata,
  staged download/verify, raw SD partition writer, first-boot configuration
  restore, automatic boot-good confirmation, manual rollback hooks, and
  boot-watchdog rollback support.
- **System settings in GUI:** added System Log, remote UDP syslog forwarding,
  local tmpfs log viewing, Time/NTP/timezone controls, and Firewall controls.
- **Mobile view:** narrow phone screens get a mobile-focused settings/menu/KVM
  view with reachable submenus, native mobile keyboard controls, the separate
  on-screen HID keyboard, TouchSync pointer control, and automatic KVM screen
  fitting. This mobile view is a Hardened fork addition and is not present in
  the original NanoKVM project.
- **Managed firewall modes:** Moderate is the default local-only profile:
  baseline services remain reachable, but new inbound connections are accepted
  only from private IPv4, IPv4 link-local/loopback, IPv6 ULA, IPv6 link-local,
  and IPv6 loopback source ranges. Baseline remains available as an open
  compatibility profile. Restricted keeps HTTPS/SSH access local-only while
  preserving needed outbound DNS/NTP/syslog/update traffic; H.264 WebRTC is
  disabled in both Restricted and Paranoid. Paranoid leaves only local-only
  HTTPS and blocks online updates intentionally.
- **HTTPS/firewall recovery:** disabling HTTPS forces firewall mode back to
  Moderate so HTTP access is not stranded behind HTTPS-only rules while still
  keeping public source ranges blocked.
- **Video pipeline stability:** H.264 Direct/WebRTC mode selection is persisted
  across reloads, HTTP/HTTPS toggles now warn and reboot the device instead of
  partially restarting the video stack, and the UI redirects to the new
  protocol after the reboot window.
- **Network hardening and control:** full wired DHCP/manual IP/DNS editing,
  stable `eth0` MAC persistence, explicit IPv6 Disabled/SLAAC/DHCPv6/Manual
  modes, and DHCPv6 client integration where available.
- **Lower video CPU load path:** H.264 Direct is the preferred low-CPU mode when
  HTTPS and WebCodecs are available; MJPEG remains as fallback.
- **Input reliability fixes:** queued HID writes, paste support, shortcut
  handling, HID reset/recovery, mouse jiggler support, mobile TouchSync pointer
  mode, and relative pointer sensitivity controls in the Rust path.
- **Device fixes from testing:** wrong-password errors, resolution changes,
  OLED timers of 5 minutes and higher, browser auth-state recovery after
  protocol/IP changes, and update reboot/restore edge cases were fixed.
- **Hardened branding and observability:** login/toolbar/About branding, login
  screen version from the local `/kvmapp/version`, device uptime, and web login
  audit events in syslog.

## Current Status

This fork is usable for active device testing, but it is not a finished firmware
release. The current development flow is to run the Rust backend on a real
NanoKVM device and harden one subsystem at a time.

| Area | Status |
| --- | --- |
| Rust backend | Runs on the device as a replacement `NanoKVM-Server`. |
| Web UI | Existing React UI is retained with Hardened branding and System settings pages. |
| HTTPS | Implemented in Rust with HTTP-to-HTTPS redirect and existing cert config support. |
| Authentication | First-boot web account setup, Rust sessions, CSRF protection, Origin checks, rate limiting, security headers, Argon2id for new passwords, legacy bcrypt verification. |
| Video | H.264 Direct is the preferred low-CPU mode and is verified on hardware. MJPEG remains available as a fallback. H.264 WebRTC is available in Baseline/Moderate modes, but is disabled by Restricted/Paranoid firewall policy. |
| HID | Keyboard/mouse websocket, queued HID writes, paste, shortcuts, HID mode, reset, and mouse jiggler are implemented. |
| Device settings | Hostname, web title, GPIO/ATX, OLED, HDMI, SSH, mDNS, swap, memory limit, TLS toggle, reboot, scripts, and autostart have Rust endpoints. |
| Storage | ISO/IMG listing, upload, mount, delete, and CD-ROM/mass-storage mode are implemented with path validation. Mount changes use LUN eject/insert; switching between CD-ROM and mass-storage mode also reconnects the USB gadget so BIOS/boot menus rescan the device type. A confirmed USB reconnect fallback remains available when a host does not notice media changes. Remote ISO download exists behind a disabled-by-default safety toggle and validates URL, filename, size, destination, and ISO format. Completed downloads now reset the picker state and refresh the virtual-media image list without logout. |
| Network | WOL, full wired DHCP/manual IP/DNS settings, explicit IPv6 Disabled/SLAAC/DHCPv6/Manual controls, Wi-Fi status/connect/AP verification, and Tailscale lifecycle endpoints are implemented. |
| Updates | Online/offline `kvmapp` updates are implemented through GitHub Releases with signed `latest.json` metadata and sha512 archive verification. Current published app channel: `2.0.29 RC7`. |
| SD image | Latest published SD image is the RC7 `2.0.29` / `0.2.21-raw.1` image, built by patching a trusted NanoKVM Rev1.4.2/vendor SDK base image with Hardened `kvmapp`. The RC7 payload was smoke-tested on a NanoKVM Cube. `make vendor-sdk` bootstraps the pinned Sipeed SDK for future reproducible base-system builds. |
| System updates | Separate GitHub channel metadata, signed metadata enforcement, staging download/verify, guarded raw install, first-boot root configuration restore, automatic boot-good confirmation, manual rollback, and boot-watchdog rollback are implemented. Current raw channel: `0.2.21-raw.1`, built from the RC7 `2.0.29` SD rootfs. Raw full-rootfs updates are lab-only; current raw payloads are stored gzip-compressed and streamed to the SD-card block devices during install. The current raw/SD image reports Buildroot `2023.11.2` with security backport level `Buildroot 2023.11.3 package backports`; deeper kernel/rootfs security payloads are still pending. |

## How Updates Work

Hardened NanoKVM has two separate update paths. They are intentionally split
because the application can usually be replaced safely, while system updates
write raw SD-card partitions and can make the device unbootable if interrupted
or if the wrong image is installed.

### Application Updates

Application updates replace only the Hardened `kvmapp` payload:

- Rust backend binaries: `/kvmapp/server/NanoKVM-Server` and
  `/kvmapp/backends/NanoKVM-Server.rust`.
- Web UI assets under `/kvmapp/server/web`.
- Hardened helper scripts, init scripts, keys, version files, and app-side
  configuration defaults shipped in `kvmapp`.

They do not rewrite the boot partition, rootfs partition, kernel, bootloader, or
base Buildroot system. This is the normal update path for backend fixes, UI
fixes, auth/session changes, H.264/HID/storage/network endpoint changes, and
branding.

The GUI checks GitHub Releases in the `woffko/Hardened_NanoKVM` fork. Stable
application metadata is published as `latest.json` on the latest release, for
example:

```text
https://github.com/woffko/Hardened_NanoKVM/releases/latest/download/latest.json
```

The metadata points to a versioned app archive such as
`hardened-nanokvm-kvmapp-2.0.29.tar.gz` on the `hardened-rust-rc7` release tag.
The device verifies signed metadata and the archive sha512 before
installing. The preview toggle uses the `hardened-rust-preview` channel
metadata, but it still installs the versioned archive named by that metadata.

Offline application updates use the same archive format, but the archive is
uploaded from the browser instead of downloaded from GitHub.

### Raw System Updates

Raw system updates are different. They are full partition-image updates for the
SD card and currently target the NanoKVM SD layout:

- raw rootfs image for `/dev/mmcblk0p2`, currently stored as
  `payload/images/rootfs.sd.gz`;
- raw boot image for `/dev/mmcblk0p1`, currently stored as
  `payload/images/boot.vfat.gz`;
- metadata describing the target board, expected image hashes, base image,
  kernel string, required free space, and source commit.

These updates can change the base Buildroot rootfs, boot files, kernel-side
payloads, bundled `kvmapp`, init scripts installed in rootfs, and system
version metadata. They are intended for system/security work that cannot be
done by replacing `kvmapp` alone.

Because raw updates write SD-card partitions, the GUI keeps them behind an
explicit **Allow raw system updates** switch on the Check for Updates screen.
Enabling it means the device may require SD-card reflash recovery if the update
is interrupted or the image is bad.

System update metadata is published through a stable channel release:

```text
https://github.com/woffko/Hardened_NanoKVM/releases/download/hardened-system-stable/system-latest.json
```

That channel metadata points to a versioned raw-system tag such as
`hardened-system-0.2.21-raw.1`, which contains:

- `hardened-nanokvm-system-<version>.tar.gz`;
- `system-latest.json` and signature files;
- matching SD-card image artifacts for manual flashing or recovery;
- the matching application archive for traceability.

The device downloads the raw archive into `/data/.hardened-kvmcache`, verifies
the signed metadata and payload shape, stages the update, and then runs the
guarded install step. For current raw releases, the rootfs and boot images stay
gzip-compressed while staged and are streamed directly to `/dev/mmcblk0p2` and
`/dev/mmcblk0p1` during install. After raw writes, the updater requests reboot
through kernel sysrq so it does not depend on the overwritten live rootfs.
Preserved root configuration is restored on the first boot from the new rootfs,
before SSH and the web backend start. Once backend health is good, the
boot-watchdog automatically confirms the system update and clears the pending
state.

### Current Published Channels

The channels can intentionally move independently:

- Application stable/latest: `2.0.29 RC7`, tag `hardened-rust-rc7`.
- Application preview: `hardened-rust-preview`, when populated, points to a
  versioned application archive independently from the stable latest release.
- Raw system stable: `0.2.21-raw.1`, published on companion tag
  `hardened-system-0.2.21-raw.1` and advertised through the
  `hardened-system-stable` channel metadata. The `hardened-rust-rc7` release
  carries the matching raw bundle and SD-card image.
- Raw system preview: `hardened-system-preview`, currently points to the same
  raw metadata as stable.
- Latest published SD image: RC7 `2.0.29`, matching raw system
  `0.2.21-raw.1`.

The RC7 `2.0.29` application, raw system update, and SD image were rebuilt
together and smoke-tested on a NanoKVM Cube. RC7 adds the Hardened mobile view,
including mobile settings navigation, mobile menu submenus, mobile virtual
keyboard handling, and automatic KVM screen fitting for narrow phone screens.
The raw rootfs also keeps the RC6 security baseline: no web/API password reset
path, Rust-side `kvm_system` watchdog/network responsibilities, USB
mass-storage image validation for virtual media, startup NTP sync, H.264 WebRTC
HDMI hotplug recovery, opt-in USB HID wake-on-write, compressed raw-update
support, setting-preserving raw install, IPv6 controls, DHCPv6 client, browser
auth-state recovery, deferred first-boot root configuration restore, automatic
post-boot confirm, and sysrq reboot after raw partition writes. The GUI
separates system-update metadata into System update version, Base image,
Buildroot release, and Security backport level to avoid confusing the raw
channel version with the base Buildroot version.

### Which Update Should Be Used?

Use an application update for normal Hardened backend and UI changes. It is the
preferred path for routine testing.

Use a raw system update only when the change must modify the base SD-card
system: boot/rootfs contents, kernel-side payloads, rootfs-installed init
scripts, or a full system security image. Keep a recovery SD-card image
available before testing raw updates.

The channels publish both update paths, but they do not have to advance at the
same time. A test device should normally install the latest app update first,
then install a raw system update only when the raw channel offers a newer system
payload and SD-card recovery is available.

For full SD-card recovery or first-time flashing, use
[docs/sd-card-flashing.md](docs/sd-card-flashing.md). It covers Windows with
Balena Etcher plus Linux, macOS, and FreeBSD command-line workflows.

## What This Fork Adds

- Added `server-rust/`, a Rust backend that preserves the existing API envelope
  and device runtime layout.
- Added hardened auth/session handling: generated per-device secret, CSRF token
  binding, Origin checks, login lockout, explicit session revocation, and safer
  password storage.
- Added browser auth-state recovery for IP/protocol changes: if the HttpOnly
  session cookie is still valid but the JS-readable CSRF cookie is missing, the
  web UI restores CSRF state through `/api/auth/account` instead of returning
  immediately to the login screen.
- Added a first-boot setup screen for new SD-card flashes. If `/etc/kvm/pwd`
  does not exist, the web UI requires creating the first administrator account
  before normal login is available. Lost credentials are recovered by reflashing
  the SD card.
- Added Rust implementations for the main browser workflows: login, static UI,
  MJPEG, H.264 Direct, H.264 WebRTC signaling, HID, terminal, storage, network,
  Tailscale, scripts, and many VM settings routes.
- Added full wired network editing from the web UI. Manual mode persists IP,
  subnet mask, router, and DNS through the existing `S30eth` boot path and
  keeps a stable `eth0` MAC in `/boot/eth.mac` so DHCP leases survive reboot.
- Added shared video fanout for MJPEG and H.264 Direct, so multiple viewers do
  not multiply native capture reads. The web UI now defaults new sessions to
  H.264 Direct when HTTPS and WebCodecs are available, otherwise to H.264.
- Added safer file and command handling for script upload/run, autostart files,
  ISO upload and remote download, storage image paths, GitHub update archives,
  and privileged shell calls.
- Added guarded remote ISO download by URL, disabled by default and controlled
  from Settings > Appearance. Completed downloads now clear the active
  filename, show completion state, and refresh the virtual-media image list
  without requiring logout.
- Added package validation so application and SD-card artifacts contain only
  the expected Hardened runtime layout.
- Added device uptime to About and a Settings > Device session lock selector
  for 5, 15, 30, and 60 minute sessions.
- Fixed OLED sleep timers of 5 minutes and higher by rebuilding `kvm_system`
  with 32-bit sleep timeout parsing instead of the overflowing 8-bit helper
  value.
- Added signed application update metadata verification for `latest.json`.
- Added persistent Rust backend binary under `/kvmapp/backends/NanoKVM-Server.rust`.
- Made `S95nanokvm` startup idempotent for testing: stale `S95nanokvm.*`
  backup scripts are removed from boot autostart, existing runtime processes
  are stopped before copy/start, stale web backup directories are removed from
  `/kvmapp/server`, and HTTPS port 443 is explicitly allowed.
- Updated branding: login screen, toolbar, and About page identify the Hardened
  build, and the login screen and toolbar use the Hardened NanoKVM wordmark.

## Rust Backend Health

When the Rust backend is active,
`GET /api/health` returns:

```json
{"code":0,"msg":"success","data":{"backend":"rust","phase":"skeleton","status":"ok"}}
```

## Still Not Finished

- Full API parity is not complete. Some routes are implemented for compatibility
  but still need deeper behavior and edge-case testing.
- H.264 WebRTC needs more browser/ICE stress testing across reconnects and
  browser variants in Baseline/Moderate firewall modes. Restricted/Paranoid
  intentionally disable it. H.264 Direct has been verified against the Rust
  backend on hardware.
- Online update checks read Hardened release metadata from
  `github.com/woffko/Hardened_NanoKVM` and install versioned release archives
  after signed metadata and payload hash verification.
- GUI system updates for kernel/rootfs security backports can stage, verify,
  install, confirm boot-good, manually roll back system bundles, and
  automatically roll back a pending update after a bad boot. Real kernel/rootfs
  payloads are still pending. Current raw full-rootfs releases are built from
  validated Hardened SD images.
- Remote ISO download remains disabled by default and needs a final production
  policy before it should be treated as generally safe.
- First-boot/account setup is implemented for Rust/Hardened images. Existing
  test devices can keep their current account file; new default `admin/admin`
  bootstrap is disabled unless explicitly enabled for isolated compatibility
  testing.
- The repository does not yet ship a verified full boot/rootfs image from SDK
  sources. `make vendor-sdk` bootstraps the pinned Sipeed/LicheeRV Nano SDK
  checkout for stock-image work, while the current SD-card image flow patches a
  trusted upstream NanoKVM base image.
- API inventory, recovery docs, rollback docs, and long-run test reports still
  need to be kept in sync with active device testing.

## 🌟 What is NanoKVM?

NanoKVM is a series of compact, open-source IP-KVM devices based on the LicheeRV Nano (RISC-V). It lets you remotely access and control computers as if you were sitting in front of them, making it useful for servers, embedded systems, and other headless machines.

## 📦 Product Family

Choose the NanoKVM model that best fits your deployment:

- **NanoKVM-Cube Lite:** A barebones kit for DIY users and bulk deployments.
- **NanoKVM-Cube Full:** A ready-to-use kit with a case, accessories, and a pre-flashed system SD card.
- **NanoKVM-PCIe:** A PCIe-bracket form factor for internal chassis mounting. It draws power from the PCIe slot and supports optional Wi-Fi and PoE.
- **[NanoKVM-Pro](https://github.com/sipeed/NanoKVM-Pro):** A higher-performance version with major upgrades:
  - **Resolution:** Up to **4K@30fps / 2K@60fps**.
  - **Network:** **1Gbps Ethernet + PoE + Wi-Fi 6**, upgraded from 100Mbps Ethernet.
  - **Latency:** Hardware-accelerated encoding reduces latency from 100-150ms to **50-100ms**.

<div align="center">
  <img src="https://cdn.sipeed.com/public/nanokvm-products-v2.jpg" alt="NanoKVM Product Family" width="100%" style="margin: 20px 0;">
</div>

> If you are looking for a USB-based KVM solution, check out [NanoKVM-USB](https://github.com/sipeed/NanoKVM-USB).

## 🛠️ Technical Specifications

| Feature            | NanoKVM-Pro                           | NanoKVM (Cube/PCIe)               | GxxKVM                             | JxxKVM                              |
| ------------------ | ------------------------------------- | --------------------------------- | ---------------------------------- | ----------------------------------- |
| Core               | AX630C 2xA53 1.2G                     | SG2002 1xC906 1.0G                | RV1126 4xA7 1.5G                   | RV1106 1xA7 1.2G                    |
| Memory & Storage   | 1G LPDDR4X + 32G eMMC                 | 256M DDR3 + 32G microSD           | 1G DDR3 + 8G eMMC                  | 256M DDR3 + 16G eMMC                |
| System             | NanoKVM / PiKVM                       | NanoKVM                           | GxxKVM                             | JxxKVM                              |
| Resolution         | 4K@30fps / 2K@60fps                   | 1080P@60fps                       | 4K@30fps / 2K@60fps                | 1080P@60fps                         |
| HDMI Loopout       | 4K loopout                            | —                                 | —                                  | —                                   |
| Video Encoding     | MJPEG / H.264 / H.265                 | MJPEG / H.264                     | MJPEG / H.264                      | MJPEG / H.264                       |
| Audio Transmit     | ✓                                     | —                                 | ✓                                  | —                                   |
| UEFI / BIOS        | ✓                                     | ✓                                 | ✓                                  | ✓                                   |
| Emulated USB Keyboard & Mouse | ✓                          | ✓                                 | ✓                                  | ✓                                   |
| Emulated USB ISO   | ✓                                     | ✓                                 | ✓                                  | ✓                                   |
| IPMI               | ✓                                     | ✓                                 | ✓                                  | —                                   |
| Wake-on-LAN        | ✓                                     | ✓                                 | ✓                                  | ✓                                   |
| Web Terminal       | ✓                                     | ✓                                 | ✓                                  | ✓                                   |
| Serial Terminal    | 2 channels                            | 2 channels                        | —                                  | 1 channel                           |
| Custom Scripts     | ✓                                     | ✓                                 | —                                  | —                                   |
| Storage            | 32G eMMC 300MB/s                      | 32G MicroSD 12MB/s                | 8G eMMC 120MB/s                    | 8G eMMC 60MB/s                      |
| Ethernet           | 1000M                                 | 100M                              | 1000M                              | 100M                                |
| PoE                | Optional                              | Optional                          | —                                  | —                                   |
| Wi-Fi              | Optional Wi-Fi 6                      | Optional Wi-Fi 6                  | —                                  | —                                   |
| ATX Power Control  | ✓                                     | ✓                                 | Extra $15                          | Extra $10                           |
| Display            | 1.47" 320x172 LCD / 0.96" 128x64 OLED | 0.96" 128x64 OLED                 | —                                  | 1.68" 280x240                       |
| More Features      | Sync LED Strip / Smart Assistant      | —                                 | —                                  | —                                   |
| Power Consumption  | 0.6A@5V                               | 0.2A@5V                           | 0.4A@5V                            | 0.2A@5V                             |
| Power Input        | USB-C or PoE                          | USB-C                             | USB-C                              | USB-C                               |
| Dimensions         | 65x65x26mm                            | 40x36x36mm                        | 80x60x17.5mm                       | 60x43x(24~31)mm                     |

## 📂 Project Structure

```text
├── kvmapp          # APP update package
│   ├── jpg_stream  # Legacy support for direct updates from older versions
│   ├── kvm_new_app # Triggers components for kvm_system updates
│   ├── kvm_system  # Core KVM application
│   ├── server      # Front-end and back-end integration
│   └── system      # Essential system components
├── web             # NanoKVM Front-end (UI)
├── server-rust     # Hardened Rust backend replacement and native runtime assets
├── scripts/nanokvm # Device-side helper scripts used while testing this fork
├── docs            # Public build, update, release, and security notes
├── support         # Auxiliary modules (Image subsystem, status, updates, OLED, HID, etc.)
├── ...
```

## 💻 Development

Start with the guide that matches the part of NanoKVM you want to work on:

- **System support modules:** Build and update the low-level hardware support components in [support/sg2002/README.md](support/sg2002/README.md).
- **Hardened Rust backend:** Build, package, and test the Rust replacement in [docs/rust-backend.md](docs/rust-backend.md). Native runtime assets are kept in [server-rust/native/](server-rust/native/).
- **System update plan:** Track planned GUI system updates for vendor-kernel security backports in [docs/system-update-plan.md](docs/system-update-plan.md).
- **System update releases:** Package future kernel/rootfs update bundles for GitHub-hosted channels with [docs/system-update-github-releases.md](docs/system-update-github-releases.md).
- **SD-card flashing:** Prepare recovery or first-boot media on Windows, Linux, macOS, and FreeBSD with [docs/sd-card-flashing.md](docs/sd-card-flashing.md).
- **Release channels:** Current visible release/channel policy is documented in [docs/release-archive.md](docs/release-archive.md).
- **Vendor SDK build path:** Bootstrap and validate the Sipeed/LicheeRV Nano SDK for future full base-system images in [docs/vendor-sdk-build.md](docs/vendor-sdk-build.md).
- **New Buildroot study:** Track feasibility of newer SDK/newer Buildroot sysupgrade images in [docs/new-buildroot-sysupgrade-study.md](docs/new-buildroot-sysupgrade-study.md).
- **Buildroot 2023 security backports:** Evaluate critical userspace backports for the proven vendor SDK baseline in [docs/buildroot-2023-security-backport-plan.md](docs/buildroot-2023-security-backport-plan.md).
- **Security status:** Review hardening scope and remaining risk in [docs/security-risk-inventory.md](docs/security-risk-inventory.md).
- **Frontend UI:** Develop, lint, and build the React interface in [web/README.md](web/README.md).

> Backend compilation and runtime validation require the target toolchain or a NanoKVM device. See the module-specific guides above for the latest development workflow.

## 🔩 Hardware Platform (NanoKVM Cube/PCIe)

NanoKVM is based on Sipeed [LicheeRV Nano](https://wiki.sipeed.com/hardware/zh/lichee/RV_Nano/1_intro.html). You can find specifications, schematics, and dimensional drawings in the [download station](https://dl.sipeed.com/shareURL/LICHEE/LicheeRV_Nano).

The NanoKVM Cube/PCIe hardware is built from these components:

- **NanoKVM Lite:** LicheeRV Nano plus the HDMI-to-CSI board.
- **NanoKVM Full:** NanoKVM Lite plus the NanoKVM-A/B boards and enclosure.
- **HDMI-to-CSI board:** Converts the HDMI input signal.
- **NanoKVM-A board:** Provides OLED, ATX control output through USB-C, auxiliary power, and physical ATX power/reset buttons.
- **NanoKVM-B board:** Connects NanoKVM-A to the host computer's ATX pins for remote power control.

The NanoKVM image is built with the LicheeRV Nano SDK and MaixCDK. It is intended for NanoKVM hardware and is not a general-purpose KVM software package for other LicheeRV Nano or SG2002 products. If you want to build an HDMI input application on LicheeRV Nano or MaixCam, please contact us for technical support.

> Note: Of the 256MB memory on SG2002, 158MB is currently allocated to the multimedia subsystem for video capture and processing.

- [NanoKVM-A Schematic](https://cn.dl.sipeed.com/fileList/KVM/nanoKVM/HDK/02_Schematic/SCH_RV_Nano_KVM_A_30111.pdf)
- [NanoKVM-B Schematic](https://cn.dl.sipeed.com/fileList/KVM/nanoKVM/HDK/02_Schematic/SCH_RV_Nano_KVM_B_30131.pdf)
- [NanoKVM-PCIe Schematic](https://cn.dl.sipeed.com/fileList/KVM/KVM_PCIE/HDK/01_Schematic/SCH_nanoKVM_PCIE_3105D_2025-12-19.pdf)
- [NanoKVM image](https://github.com/sipeed/NanoKVM/releases/tag/NanoKVM)

<div align="center">
  <img src="https://wiki.sipeed.com/hardware/zh/kvm/assets/NanoKVM/1_intro/NanoKVM_2.jpg" alt="NanoKVM PCB Pinout" width="80%" style="margin: 20px 0;">
</div>

## 🤝 Contributing

We welcome contributions. To get started:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

Please keep your pull requests small and focused to facilitate easier review and merging.

> 🎁 **Contributors who submit high-quality Pull Requests may receive a NanoKVM Cube, PCIe, or Pro as a token of our appreciation!**

## 🛒 Where to Buy

- [AliExpress (global, except USA and Russia)](https://www.aliexpress.com/item/1005007369816019.html)
- [Taobao](https://item.taobao.com/item.htm?id=811206560480)
- [Preorder for other regions](https://sipeed.com/nanokvm)

## 💬 Community & Support

- [Discord](https://discord.gg/V4sAZ9XWpN)
- QQ group: 703230713
- Email: [support@sipeed.com](mailto:support@sipeed.com)
- [FAQ](https://wiki.sipeed.com/hardware/en/kvm/NanoKVM/faq.html)

## 📜 License

This project is licensed under the GPL-3.0 License. See [LICENSE](LICENSE) for details.

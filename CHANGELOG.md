# Changelog

## Hardened NanoKVM 2.0.27 RC5 (2026-07-03)

Application-only release candidate. The raw system-update and SD-card channels
remain on the tested RC4 `0.2.18-raw.1` baseline.

### Changed

* Moved NanoKVM native runtime libraries and the `kvm_vision.h` ABI header into
  `server-rust/native/`; release packages still install the libraries under
  `/kvmapp/server/dl_lib` for runtime compatibility.
* Removed unused builder and packaging paths from the repository.
* Strengthened package/rootfs validation for stale backend artifacts.
* Simplified System settings confirmation flows:
  * Network now has one Apply action for IPv4, DNS, and IPv6 changes.
  * Firewall mode cards now select a mode, and one Apply action performs the
    change with the existing guarded confirmations where needed.

### Verified

* Rust backend tests, frontend build, linked RISC-V build, and release package
  validation passed locally.
* The app package was installed and smoke-tested on NanoKVM hardware.

## Hardened NanoKVM 2.0.26 RC4 (2026-07-02)

Current full raw/SD baseline with app `2.0.26`, raw system-update
`0.2.18-raw.1`, and matching SD-card image.

### Changed

* Added Moderate as the default managed firewall mode.
* Moderate, Restricted, and Paranoid firewall modes now accept new inbound
  connections only from local-use ranges:
  * IPv4 private: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`;
  * IPv4 link-local and loopback: `169.254.0.0/16`, `127.0.0.0/8`;
  * IPv6 ULA, link-local, and loopback: `fc00::/7`, `fe80::/10`, `::1/128`.
* Refined the Firewall mode selection UI.
* Fixed ISO upload/download completion state and refreshed the virtual-media
  image list after downloads complete.
* Kept the raw/SD line on the Buildroot `2023.11.3 package backports`
  security-backport baseline.

## Hardened NanoKVM 2.0.25 RC3 (2026-07-01)

Previous full app/raw/SD release candidate.

### Changed

* Kept the tested video path while preserving selected video mode and
  Appearance display mode across updates.
* Fixed the login-screen firmware version display.
* Refined the System > Network IPv4/DNS layout.
* Published matching raw system-update and SD-card artifacts for
  `0.2.17-raw.1`.

## Hardened NanoKVM 2.0.21 RC2 (2026-07-01)

Application release candidate focused on System settings organization.

### Changed

* Moved Network settings under Settings > System.
* Updated Restricted firewall and WebRTC DNS text.
* Verified app-only update behavior on hardware.

## Hardened NanoKVM 2.0.20 RC1 (2026-07-01)

Application release candidate that introduced the System settings area.

### Added

* System Log with local tmpfs log viewing and optional UDP remote syslog.
* Time, timezone, and NTP controls.
* Managed Firewall controls with Baseline, Moderate, Restricted, and Paranoid
  modes.
* HTTPS/firewall recovery behavior for TLS changes.

## Notes

The current release channels and supported installation paths are documented in
`README.md`, `docs/rust-backend.md`, and
`docs/system-update-github-releases.md`.

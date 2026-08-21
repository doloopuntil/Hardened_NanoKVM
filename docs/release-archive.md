# Release Channels

This file lists the release entries that should remain visible because current
devices or update metadata depend on them. Superseded RCs can be removed from
GitHub Releases after their historical notes are kept in `CHANGELOG.md`.

## Current App Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-system-0.3.0-raw.10` | Current combined RC11 | One GitHub latest release carrying app `2.0.40`, raw system `0.3.0-raw.10`, and the Buildroot `2026.05.1` SD image. Existing devices must update app first and raw second. The system-prefixed tag is required by deployed raw URL validation. |
| `hardened-rust-rc10` | Current app-only RC | App `2.0.34` for the RC9 system baseline. Remediates the native C/C++ audit, fixes MaixCDK sensor-enum compatibility for clean LT6911 builds, and packages rebuilt `libkvm`, `libkvm_mmf`, and `kvm_system`. Reboot, MJPEG, H.264 Direct, and controlled stop/start passed on `10.0.87.133`. |
| `hardened-rust-rc9.1` | Previous app-only RC | App `2.0.33` for the RC9 system baseline. Adds post-RC9 browser-window auto-fit for the KVM screen and aligns Appearance segmented controls. Tested on NanoKVM Cube devices `10.0.87.133` and `10.0.87.132`. |
| `hardened-rust-rc9` | Current full raw/SD RC | App `2.0.32` with matching raw system `0.2.23-raw.1` and SD-card image. Carries the RC8 mobile/tablet baseline plus post-RC8 mobile Settings segmented-control fixes. Tested on NanoKVM Cube devices. |
| `hardened-rust-rc8` | Previous full raw/SD RC | App `2.0.31` with matching raw system `0.2.22-raw.1` and SD-card image. Extends the Hardened mobile view to touch tablets, adds forced Mobile view, keeps TouchSync as the mobile default, and carries the RC7/RC7.1 mobile KVM fixes into a full baseline. Tested on NanoKVM Cube. |
| `hardened-rust-rc7.1` | Previous app-only RC | App `2.0.30` for the RC7 system baseline. Adds mobile KVM pinch-to-zoom and touch-drag panning for scaled video surfaces. Tested on NanoKVM Cube. |
| `hardened-rust-rc7` | Previous full raw/SD RC | App `2.0.29` with matching raw system `0.2.21-raw.1` and SD-card image. Adds the Hardened mobile view for phone screens, mobile settings/menu handling, mobile keyboard handling, and automatic KVM screen fitting. Smoke-tested on NanoKVM Cube. |
| `hardened-rust-preview` | App preview channel | Mutable channel release that carries preview `latest.json` metadata. Keep while preview application updates are supported. |

## Current Raw/System Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-system-0.3.0-raw.10` | Current preview raw-system target and combined RC11 | Raw/SD candidate paired with app `2.0.40`. Advertised by `hardened-system-preview`; stable remains on the previous baseline. |
| `hardened-system-0.2.23-raw.1` | Current raw-system target | Raw system-update bundle and release notes trusted by deployed devices. |
| `hardened-system-stable` | Raw stable channel | Mutable channel release that carries stable `system-latest.json` metadata. |
| `hardened-system-preview` | Raw preview channel | Mutable channel release that carries preview `system-latest.json` metadata. |
| `hardened-system-0.2.22-raw.1` | Previous raw-system target | Companion raw-system release for RC8. |
| `hardened-system-0.2.21-raw.1` | Previous raw-system target | Companion raw-system release for RC7. |
| `hardened-rust-rc6` | Previous full raw/SD RC | App `2.0.28` with matching raw system `0.2.20-raw.1` and SD-card image. Includes removal of password reset, Rust-side watchdog/network state migration, mass-storage image validation, startup NTP sync, WebRTC keyframe recovery, and opt-in USB HID wake-on-write. |
| `hardened-system-0.2.20-raw.1` | Previous raw-system target | Companion raw-system release for RC6. |

## Historical Releases

Older RC and beta releases are described in `CHANGELOG.md`. They no longer need
separate visible GitHub Release entries once RC9 and the channel metadata are
published, because deployed devices follow the current app release plus
`hardened-system-stable`/`hardened-system-preview` metadata.

## Cleanup Rules

1. Keep channel releases, the current app release, and the current raw/SD
   baseline release.
2. Keep the previous full raw/SD release only while it is useful as a recovery
   fallback or comparison point.
3. Do not delete git tags unless a separate repository-history cleanup is
   explicitly requested.
4. Before hiding an old GitHub Release entry, verify current app and raw channel
   metadata signatures.

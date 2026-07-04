# Release Channels

This file lists the release entries that should remain visible because current
devices or update metadata depend on them. Superseded RCs can be removed from
GitHub Releases after their historical notes are kept in `CHANGELOG.md`.

## Current App Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-rust-rc7` | Current full raw/SD RC | App `2.0.29` with matching raw system `0.2.21-raw.1` and SD-card image. Adds the Hardened mobile view for phone screens, mobile settings/menu handling, mobile keyboard handling, and automatic KVM screen fitting. Smoke-tested on NanoKVM Cube. |
| `hardened-rust-preview` | App preview channel | Mutable channel release that carries preview `latest.json` metadata. Keep while preview application updates are supported. |

## Current Raw/System Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-system-0.2.21-raw.1` | Current raw-system target | Raw system-update bundle and release notes trusted by deployed devices. |
| `hardened-system-stable` | Raw stable channel | Mutable channel release that carries stable `system-latest.json` metadata. |
| `hardened-system-preview` | Raw preview channel | Mutable channel release that carries preview `system-latest.json` metadata. |
| `hardened-rust-rc6` | Previous full raw/SD RC | App `2.0.28` with matching raw system `0.2.20-raw.1` and SD-card image. Includes removal of password reset, Rust-side watchdog/network state migration, mass-storage image validation, startup NTP sync, WebRTC keyframe recovery, and opt-in USB HID wake-on-write. |
| `hardened-system-0.2.20-raw.1` | Previous raw-system target | Companion raw-system release for RC6. |

## Historical Releases

Older RC and beta releases are described in `CHANGELOG.md`. They no longer need
separate visible GitHub Release entries once RC7 and the channel metadata are
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

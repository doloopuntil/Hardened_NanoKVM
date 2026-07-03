# Release Channels

This file lists the release entries that should remain visible because current
devices or update metadata depend on them.

## Current App Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-rust-rc5` | Current full raw/SD RC | App `2.0.27` with matching raw system `0.2.19-raw.1` and SD-card image. Includes repository cleanup, native runtime assets under `server-rust/native/`, stronger package validation, simplified System settings save/Firewall confirmation flows, and fixed System section header behavior. |
| `hardened-rust-preview` | App preview channel | Mutable channel release that carries preview `latest.json` metadata. Keep while preview application updates are supported. |

## Current Raw/System Channel

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-system-0.2.19-raw.1` | Current raw-system target | Raw system-update bundle and release notes trusted by deployed devices. |
| `hardened-system-stable` | Raw stable channel | Mutable channel release that carries stable `system-latest.json` metadata. |
| `hardened-system-preview` | Raw preview channel | Mutable channel release that carries preview `system-latest.json` metadata. |
| `hardened-rust-rc4` | Previous full raw/SD RC | App `2.0.26` with matching raw system `0.2.18-raw.1` and SD-card image. |
| `hardened-system-0.2.18-raw.1` | Previous raw-system target | Companion raw-system release for RC4. |

## Previous Visible RC

| Tag | Purpose | Notes |
| --- | --- | --- |
| `hardened-rust-rc3` | Older full raw/SD RC | App `2.0.25` with raw system `0.2.17-raw.1` and matching SD-card image. Keep only if a previous full recovery image should remain easy to find. |
| `hardened-system-0.2.17-raw.1` | Previous raw-system target | Companion raw-system release for RC3. |

## Cleanup Rules

1. Keep channel releases, the current app release, and the current raw/SD
   baseline release.
2. Keep the previous full raw/SD release only while it is useful as a recovery
   fallback.
3. Do not delete git tags unless a separate repository-history cleanup is
   explicitly requested.
4. Before hiding an old GitHub Release entry, verify current app and raw channel
   metadata signatures.

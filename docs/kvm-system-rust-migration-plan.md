# kvm_system Rust Migration Plan

This plan moves only the parts of `kvm_system` that are already duplicated by the
Rust backend or init scripts, then migrates the remaining hardware-facing code in
small reversible slices. The target validation device is 133.

## Goals

- Reduce runtime duplication between `kvm_system`, `S95nanokvm`, and the Rust
  backend.
- Keep video capture, OLED, button handling, Wi-Fi provisioning, and HDMI
  detection working during every intermediate step.
- Keep C/C++ code for hardware-facing areas when rewriting it would add risk
  without closing a concrete security, reliability, or maintenance problem.
- Use the legacy implementation only as a temporary fallback for the specific
  slices being replaced by Rust while the migration branch is tested on 133.
- Before release, remove only the C/C++ code paths, packaging hooks, and runtime
  ownership for responsibilities that Rust has taken over and validated.
- Push each validated slice to `feature/rust-kvm-system-migration` so the branch
  remains reviewable and deployable.

## Non-Goals

- Do not rewrite the whole C++ helper in one pass.
- Do not rewrite hardware-facing C/C++ code only for language uniformity.
- Do not move OLED drawing, input event handling, or LT6911 I2C writes first.
  Those are hardware-facing and should stay behind shadow-mode checks.
- Do not restart or replace the video pipeline unnecessarily during app-only
  updates.

## Current Responsibilities

| Area | Current owner | Existing overlap |
| --- | --- | --- |
| Boot/app migration markers `kvm_new_app` and `kvm_new_img` | `system_init.cpp` | `S95nanokvm`, `S01fs`, Rust app/system update code |
| Init script installation | `system_init.cpp` | `S95nanokvm::install_boot_scripts`, Rust `install_runtime_boot_scripts` |
| `/kvmapp/kvm/*` stream state defaults | `system_init.cpp` | `S95nanokvm::ensure_kvm_state_files`, Rust stream API |
| Rust server runtime staging/restart | `system_init.cpp` | `S95nanokvm::start_server_runtime`, `restart-server` |
| DNS bootstrap | `new_img_init()` | Rust network API and `S01fs` preserved config restore |
| Wi-Fi API-triggered reconnect | `system_ctrl.cpp` | Rust network API writes the request files, `S30wifi` performs the actual service change |
| Wi-Fi AP provisioning via OLED/button | `system_ctrl.cpp`, OLED UI | No complete Rust replacement yet |
| OLED existence and display | `oled_ctrl.cpp`, `oled_ui.cpp` | Rust VM API only reads/writes OLED settings |
| Button handling | `main.cpp` | No Rust replacement yet |
| Passive status polling | `system_state.cpp` | Partial overlap with Rust network/stream APIs |
| HDMI/LT6911 resolution probing | `hdmi.cpp` | No complete Rust replacement yet |

## Migration Strategy

### Phase 0: Safety Baseline

Already done on the source branch:

- Removed BOOT long-press password reset.
- Kept long-press behavior for OLED page switching and Wi-Fi restart only.

Required check on 133:

- Boot, login, SSH as expected.
- Long press no longer resets root/web credentials.
- OLED page switching and Wi-Fi restart behavior still work.

### Phase 1: Remove Init and Update Duplication

Move one-time migration work out of C++ and into boot/update scripts where it
belongs.

Steps:

1. Add or confirm init-script installation in one place only:
   `S95nanokvm::install_boot_scripts` plus Rust startup repair.
2. Move missing `new_app_init()` work into init/update flow:
   - `update-nanokvm.py` permission/placement if still required.
   - stale service cleanup for vendor-only scripts.
   - stale `/kvmapp/jpg_stream` and old stream helper cleanup.
   - `soph_mipi_rx.ko` compatibility handling if still required for supported
     images.
3. Remove server restart/staging from `new_app_init()`. `S95nanokvm` already owns
   runtime staging and `restart-server`.
4. Make `kvm_system` ignore or only clear `kvm_new_app` after the new owner has
   completed migration.
5. Remove `new_img_init()` hardcoded DNS rewrite after confirming image bootstrap
   and Rust DNS settings cover it.

Validation on 133:

- Fresh app update boots without `kvm_system` doing script copies.
- `/etc/init.d` contains the expected Hardened scripts and no stale vendor-only
  scripts.
- `/kvmapp/kvm/type`, `fps`, `qlty`, `res`, `gop`, `state`, `width`, `height`
  are initialized by `S95nanokvm`.
- Web login, video stream, ISO mount/download, virtual disk list, firewall, DNS,
  NTP, and Tailscale status still work.
- `/tmp/kvm_system.log`, `/tmp/nanokvm-server.log`, and update logs contain no
  crash loop or repeated migration work.

### Phase 2: Add Rust Shadow Hardware Monitor

Add a small Rust binary, for example `nanokvm-hwmon`, but do not let it control
hardware yet.

Initial shadow responsibilities:

- Read network interface state through `nix`/netlink-compatible APIs.
- Read `/kvmapp/kvm/*` stream state with the same semantics used by the OLED.
- Read USB gadget state from sysfs.
- Read HDMI capture status from `/proc/cvitek/vi_dbg`.
- Write a debug snapshot such as `/tmp/nanokvm-hwmon-state.json`.

Do not:

- Touch I2C.
- Draw to OLED.
- Read `/dev/input/event0` exclusively.
- Restart services.

Validation on 133:

- Run C++ `kvm_system` and Rust `nanokvm-hwmon` side by side.
- Compare Rust snapshot against visible OLED state and existing files.
- Confirm no video stream regression for at least 15 minutes.
- Confirm CPU/RAM/write rate is acceptable.

### Phase 3: Move Passive State Ownership

Once shadow output is stable, let Rust own passive status files and state
normalization while C++ keeps OLED rendering.

Steps:

1. Keep C++ OLED drawing but read normalized state from Rust-generated files or a
   small JSON/state file.
2. Stop duplicated ping/route checks in C++ when Rust state is enabled.
3. Preserve a feature flag, for example `/etc/kvm/rust_hwmon_enabled`, to fall
   back to legacy behavior without reflashing.

Validation on 133:

- Toggle the feature flag and restart only the helper service.
- Confirm OLED shows correct Ethernet, Wi-Fi, USB, HDMI, stream type, FPS, and
  resolution.
- Confirm no increase in SD-card writes from status polling.

### Phase 4: Move Safe Control Actions

Move service-control actions that are already shell-based and recoverable:

- API-triggered Wi-Fi reconnect marker handling.
- Optional AP provisioning state machine, only after preserving OLED/button UX.
- Watchdog temp marker creation/removal if still needed.

Validation on 133:

- Configure Wi-Fi from web UI and OLED AP flow.
- Verify `S30wifi restart` and `S30wifi ap` paths.
- Verify failure recovery returns to the expected OLED page/state.

### Phase 5: Evaluate Hardware I/O Last

Only after earlier phases are stable, decide whether each hardware-facing area
should move to Rust or remain as a smaller C/C++ helper.

Move to Rust only when it closes a real issue:

- LT6911 resolution reads/writes using Linux I2C APIs.
- Button handling from `/dev/input/event0`.
- OLED detection and drawing.

Keep in C/C++ when it is already small, isolated, hardware-specific, and safer to
leave alone. If Rust takes over any of these responsibilities, remove the
corresponding C/C++ implementation and startup path after the Rust implementation
passes the 133 checklist.

Validation on 133:

- HDMI hotplug and resolution changes update `/kvmapp/kvm/width` and `height`.
- OLED works across boot, sleep, wake, page switching, and Wi-Fi provisioning.
- Button short/long press behavior matches legacy behavior.
- No `kvm_system` replacement segfaults or busy loops.

## Build and Packaging Plan

1. Keep the existing C/C++ packaging path for responsibilities that still live in
   C/C++.
2. Add Rust helper packaging next to the Rust backend, not inside the web server
   binary, so helper crashes do not take down the HTTP/API service.
3. Update `scripts/package-rust-kvmapp.sh` and image validation only after the
   helper exists.
4. Update `S95nanokvm` to start the Rust helper in shadow mode while continuing
   to start the remaining C/C++ helper.
5. Promote by feature flag first, then by default.
6. Before release, remove replaced legacy code paths from:
   - `S95nanokvm` startup and service ownership.
   - `scripts/package-rust-kvmapp.sh` restoration from the base rootfs.
   - image/rootfs validation requirements.
   - user-facing and maintainer documentation.

## 133 Test Checklist

Run after each functional slice:

- `ps` shows the expected helper/server processes.
- `/api/health` returns OK over the configured protocol.
- Live video stream opens and keeps updating.
- Web UI login, settings, firewall, time/NTP, network, storage, and virtual media
  still work.
- OLED displays IP/status/resolution and responds to button input.
- `/tmp/kvm_system.log`, `/tmp/nanokvm-server.log`, and system update logs have
  no new crash loops.
- `dmesg` has no new USB/video/I2C errors.
- SD write activity remains low during idle observation.

## Rollback

- During branch testing, keep legacy behavior only for the slices being migrated
  until the Rust helper passes the 133 checklist.
- During branch testing, gate Rust replacement behavior with files under
  `/etc/kvm`.
- If video or OLED regresses on 133, revert only the latest slice on
  `feature/rust-kvm-system-migration` and keep prior validated commits.
- After release, rollback is a normal app/system downgrade to the previous
  release. The shipped image should not contain duplicate ownership for the same
  responsibility.

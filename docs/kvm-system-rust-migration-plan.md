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
| Boot/app migration markers `kvm_new_app` and `kvm_new_img` | `S95nanokvm`; C++ only clears stale markers if reached | `S95nanokvm`, `S01fs`, Rust app/system update code |
| Init script installation | `S95nanokvm::install_boot_scripts` | Rust startup repair |
| `/kvmapp/kvm/*` stream state defaults | `S95nanokvm::ensure_kvm_state_files` | Rust stream API |
| Rust server runtime staging/restart | `S95nanokvm::start_server_runtime`, `restart-server` | Rust app update restart hook |
| DNS bootstrap | Rust network API and `S01fs` preserved config restore | `S95nanokvm` clears old marker |
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

Completed slices:

1. `S95nanokvm` owns init-script installation, runtime staging, runtime restart,
   state-file defaults, legacy app artifact cleanup, `kvm_new_img` cleanup, and
   legacy `kvm_new_app` handling.
2. Rust app update validation rejects archives that try to reintroduce
   `kvm_new_app`, `kvm_new_img`, `jpg_stream`, or `kvm_system/kvm_stream`.
3. `new_img_init()` no longer writes hardcoded DNS defaults.
4. `new_app_init()` no longer copies scripts, restarts `NanoKVM-Server`, or
   reboots the device. If reached, it only clears the stale marker.
5. Legacy `soph_mipi_rx.ko` compatibility repair moved to `S95nanokvm`, gated by
   the old `kvm_new_app` marker and executed before runtime starts.

Remaining slices:

1. Decide whether API-triggered Wi-Fi reconnect should stay in the OLED helper
   until the Rust hardware monitor exists. Current low-risk choice is to leave it
   in C++ because it shares state with the OLED Wi-Fi provisioning flow.
2. Add Rust shadow hardware monitor for passive state observation only.
3. After shadow validation, move passive polling/state normalization out of C++
   while keeping OLED/button/I2C rendering and control in C++.

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

Initial slice:

- `server-rust/src/bin/nanokvm-hwmon.rs` writes
  `/tmp/nanokvm-hwmon-state.json`.
- `S95nanokvm` starts and stops the helper as a separate shadow process when the
  binary exists at `/kvmapp/hwmon/nanokvm-hwmon`.
- Packaging and rootfs validation require the helper so test images and app
  archives do not silently omit the shadow observer.
- The helper reads only sysfs/proc and `/kvmapp/kvm/*`; it does not change device
  state.

Validated on 133:

- `S95nanokvm` starts `nanokvm-hwmon` after a 20 second delay so it does not
  read `/proc/cvitek/vi_dbg` during video stack startup.
- `S95nanokvm stop_runtime` now stops `NanoKVM-Server` before `kvm_system`; this
  avoids killing the vendor helper while the Rust backend may still be reading
  frames through libkvm.
- Remote syslog forwarding was enabled with local `-L` logging preserved.
- Controlled `S95nanokvm restart` kept `/api/health` OK, started `kvm_system`,
  `NanoKVM-Server`, and `nanokvm-hwmon`, produced a valid snapshot, and kept
  MJPEG streaming.
- Ten post-restart observation cycles kept health OK, all expected PIDs alive,
  and no `segfault`, `signal 11`, `panic`, or `oops` in `dmesg`.

Validation on 133:

- Run C++ `kvm_system` and Rust `nanokvm-hwmon` side by side.
- Compare Rust snapshot against visible OLED state and existing files.
- Confirm no video stream regression for at least 15 minutes.
- Confirm CPU/RAM/write rate is acceptable.
- Keep `/tmp/hardened-syslog/messages` active during restart tests and enable
  remote syslog for any test that may require post-reboot failure evidence.

### Phase 2.5: Remove Legacy C++ Reboot Watchdog

The old `kvm_system` software watchdog watched `/etc/kvm/watchdog`,
`/tmp/watchdog`, and `/tmp/nanokvm_wd`; when it decided the vision service was
not feeding the marker, it rebooted the entire device from C++.

Completed slice:

- Removed the C++ reboot loop from `main.cpp`.
- Removed C++ ownership of `/tmp/watchdog` cleanup and `/tmp/nanokvm_wd`
  checking.
- Kept `S95nanokvm` as the runtime recovery owner; it health-checks the Rust
  backend and restarts `NanoKVM-Server` in MJPEG safe mode instead of performing
  an opaque full-device reboot.

Validated on 133:

- Built `kvm_system` with the MaixCDK CMake build tree.
- Installed hash
  `850bdc5e76fa240edf75b684f3d7021eb960e3b9d6c903efa09badb421da8332`.
- Restarted `S95nanokvm`; `/api/health` stayed OK, `nanokvm-hwmon` restarted
  after its delay, and MJPEG returned data.
- Created `/tmp/watchdog` with `/tmp/nanokvm_wd` absent for 18 seconds; the
  device did not reboot, expected processes stayed alive, and both markers were
  removed after the test.

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
5. When C/C++ helper source changes, package from the freshly built helper
   (`support/sg2002/kvm_system/build/kvm_system` or explicit
   `KVM_SYSTEM_SOURCE`) and fail instead of silently restoring an older helper
   from the base rootfs.
6. Promote by feature flag first, then by default.
7. Before release, remove replaced legacy code paths from:
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

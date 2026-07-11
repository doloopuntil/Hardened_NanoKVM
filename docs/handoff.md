# Hardened NanoKVM Developer Handoff

Last updated: 2026-07-11

This document is the current takeover guide. Detailed chronological release and
device-recovery history was intentionally removed from the handoff and remains
available in:

- [`release-archive.md`](release-archive.md);
- [`current-sysupgrade-build-trace.md`](current-sysupgrade-build-trace.md);
- [`kvm-system-rust-migration-plan.md`](kvm-system-rust-migration-plan.md).

## Repository And GitHub State

- Local checkout: `/home/w0w/Hardened_NanoKVM-new-buildroot`.
- GitHub repository: `woffko/Hardened_NanoKVM`.
- GitHub default branch: `main`.
- Local release branch: `rc8-main-sync`, tracking `origin/main`.
- `feature/rust-kvm-system-migration` is historical. Its validated work is in
  `main`; do not continue release work from that branch.
- Current source/application version: `2.0.34` (`kvmapp/version`).
- Current latest application release: `2.0.34 RC10`, tag
  `hardened-rust-rc10`.
- Current full raw/SD baseline: RC9 app `2.0.32`, raw system
  `0.2.23-raw.1`, tags `hardened-rust-rc9` and
  `hardened-system-0.2.23-raw.1`.
- GitHub Pages RC9 update: `gh-pages` commit `ad91ef6`.
- GitHub CLI is authenticated as `woffko`. The current PAT can manage normal
  repository/release operations but the Dependabot alerts API still returns
  HTTP 403. `Cargo.lock` contains the patched `anyhow 1.0.103`.

Current release artifacts and SHA-256 values:

| Artifact                                              | SHA-256                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------ |
| `hardened-nanokvm-kvmapp-2.0.34.tar.gz`               | `1d3d6d9c3bbed437ea2e035c955045ba19750d75dbab10971a86cb314bde6fa7` |
| RC9 raw `hardened-nanokvm-system-0.2.23-raw.1.tar.gz` | `d7d50d279619f5a964c7367a3cd506385a423c1751c79220e6dc03ab5ca4b458` |
| RC9 SD image `.img.xz`                                | `52b5b65886d977c1360b7d788169f6559f7e42d6794bc30d444469121c576b83` |

RC10 is app-only. It does not change raw/system metadata or the SD image.
GitHub tag `hardened-rust-rc10` was published from
`26a2986d3080cb95557f06fde437c1de6189f491` as the latest release; its
signed application metadata has SHA-256
`d12c6aa8da087deaed3a9865d984afc6f140b9e9d12856427a89c614050a62f3` and
the detached signature has SHA-256
`f5913ae509672fd16c62468be71c251c8d08ff38978b2116a3434aed6a06c500`.
The mutable `hardened-rust-preview` channel points to those same verified
metadata bytes. Both public GitHub channels were downloaded after publication,
matched the release build, and verified with the bundled signing public key.

## Current Architecture

- The shipped web backend is Rust from `server-rust/`, installed as
  `/kvmapp/server/NanoKVM-Server`.
- Rust is the only supported web backend in the current project.
  Package/rootfs validation rejects stale alternate-backend artifacts.
- Rust still calls the native C ABI in `libkvm.so`; the video pipeline and
  CVI/MMF integration remain C/C++ in:
  - `support/sg2002/additional/kvm/`;
  - `support/sg2002/additional/kvm_mmf/`;
  - `support/sg2002/additional/vision/`;
  - `support/sg2002/additional/peripheral/`.
- Native runtime libraries are packaged from `server-rust/native/dl_lib` to
  `/kvmapp/server/dl_lib`.
- `kvm_system` remains a C++ helper for OLED drawing, button input, Wi-Fi OLED/AP
  provisioning, and hardware-compatible fallback behavior. It is not the web
  backend.
- `nanokvm-hwmon` supplies Rust-normalized passive USB, HDMI, stream, and
  network state. `S95nanokvm` enables Rust snapshot consumption by default when
  the helper is packaged.
- C++ passive readers can still act as compatibility fallback when the hwmon
  marker/snapshot is absent, stale, or malformed. Normal authenticated Wi-Fi
  reconnect is Rust/init-owned, but positive Wi-Fi and OLED AP provisioning
  still need validation on hardware with `wlan0`.
- `S95nanokvm` owns runtime staging/start/stop, old app/image marker cleanup,
  init compatibility repair, and delayed hwmon startup.
- In-place root/web password reset was removed. Lost credentials require SD
  reflash/recovery rather than a network reset endpoint.

## Native C/C++ Audit

The 2026-07-11 review found native defects in the production video path and
retained helper. The current working tree addresses the complete finding list;
the original findings, code references, repair summary, and remaining hardware
coverage are in
[`native-code-audit.md`](native-code-audit.md).

Highest-priority findings (now addressed in the working tree):

1. HDMI detection can run `cam->restart()` concurrently with frame reads,
   deleting the camera implementation while it is in use.
2. `kvmv_deinit()` destroys the mutex and MMF/camera state without stopping and
   joining its internal threads.
3. H.264 VENC error paths contain dangling `pstPack` state, leaks, invalid
   release ordering, and possible double-free behavior.
4. `free_all_kvmv_data()` has a definite one-element out-of-bounds access.
5. Several HDMI/resolution readers overflow or read past fixed stack arrays.
6. NV21 H.264 stride copying uses `stride * h` instead of the loop row and
   corrupts frames when stride differs from width.
7. Automatic resolution detection busy-loops indefinitely with no HDMI signal.
8. Active LT6911 I2C reads dereference `nullptr` after transient I2C failures.
9. JPEG/H.264 output allocation and encoder failure results are not checked.
10. Retained `kvm_system` has shared-state races, button/OLED bugs, QR leaks,
    and an every-poll Wi-Fi status write that causes unnecessary SD activity.

Remediation status:

- all 26 recorded findings have source fixes in the current working tree;
- native libraries and `kvm_system` rebuild successfully with the target
  RISC-V toolchain, and the linked Rust package passes all 153 tests;
- the rebuilt libraries were deployed to `10.0.87.133` and passed full reboot,
  authenticated MJPEG, H.264 Direct, and controlled backend stop/start tests;
- a stale vendor sensor-name table was also synchronized with the current
  MaixCDK enum; without that compatibility fix, a clean rebuild selects the
  wrong numeric sensor ID for LT6911 even though the log prints its name;
- HDMI hotplug/resolution-change stress, physical OLED/button coverage, and a
  long-running dmesg/syslog soak remain before a release;
- `10.0.87.132` was not used.

## Test Devices

### Primary native test device: `10.0.87.133`

- Model used for validation: NanoKVM Cube.
- Hostname: `secondary`.
- Static network: `10.0.87.133/24`, gateway and DNS `10.0.87.5`.
- Web login used in current lab: `admin` / `admin1234`.
- SSH login used in recent lab checks: `root` / `admin1234`.
- HTTPS uses a local/self-signed certificate; automation must ignore the
  certificate warning explicitly.
- This is the required target for native C/C++, HDMI, MMF, virtual-media, OLED,
  and button validation.
- Read-only check on 2026-07-11: HTTPS health reported the Rust backend, app
  version was `2.0.32`, SSH login succeeded, and installed system version was
  `0.2.19-raw.1` on base `2026-06-29-12-08-d88d58.img`.
- The user may install an older/full app update while development is in
  progress. Before every test, verify `/kvmapp/version`, `/api/health`, the
  running backend path, and deployed file hashes. Re-deploy the current test
  build if the device was updated.

### Secondary device: `10.0.87.132`

- Model used for validation: NanoKVM Cube.
- Hostname: `primary`.
- Static network: `10.0.87.132/24`, gateway and DNS `10.0.87.5`.
- Web login used in current lab: `admin` / `admin1234`.
- SSH login used in recent lab checks: `root` / `admin1234`.
- It was used for release/UI comparison and raw-update work. Do not use it for
  native video/MMF experiments unless the user explicitly requests it.
- Read-only check on 2026-07-11: HTTPS health reported the Rust backend, app
  version was `2.0.32`, SSH login succeeded, and installed system version was
  `0.2.15-raw.1` on base `2026-06-29-12-08-d88d58.img`.
- Last recorded Tailscale state was `notLogin` with no assigned account/IP. A
  real peer test remains pending and that state should be rechecked before
  relying on it.

## Device Deployment Rules

### SSH and archive extraction

- Local `sshpass`: `/home/w0w/.local/bin/sshpass`.
- NanoKVM BusyBox `tar` does not support GNU `-z` and `tar -a` is not a
  reliable replacement for extraction.
- Extract a gzip app archive on-device with:

  ```sh
  gzip -dc package.tar.gz | tar -C /target -xf -
  ```

- For web-only test deploys, use an uncompressed tar:

  ```sh
  tar -cf web.tar -C web/dist .
  busybox tar -xf /tmp/web.tar -C /target/web
  ```

- Remove old `/tmp/nanokvm-web-*.tar` files before large web deploys. Device
  tmpfs has filled during previous iterations.
- Do not leave a required command/session running when handing work back.

### Rust/native build

Do not deploy a plain Rust cross-build for video testing. It can start but fail
with `Dynamic loading not supported` and leave the stream unusable. Build the
linked RISC-V backend:

```sh
server-rust/scripts/build-linked-libkvm.sh
```

If the local sysroot is unavailable, point `NANOKVM_SYSROOT_LIB` at a verified
NanoKVM runtime library directory as described in
[`rust-backend.md`](rust-backend.md).

Cargo does not rebuild `libkvm`/`libkvm_mmf`. For native source changes, use the
MaixCDK `support/sg2002/build` flow, copy the resulting `dl_lib` output into
`server-rust/native/dl_lib`, then build/package the linked Rust server. The
helper currently hard-codes `NanoKVM_PATH=~/NanoKVM`; change it to this checkout
before building. Full commands and the `update_lib` false-failure exit-status
warning are in [`build-notes.md`](build-notes.md).

Useful host checks:

```sh
cargo test --manifest-path server-rust/Cargo.toml
make web-app
server-rust/scripts/build-linked-libkvm.sh
scripts/validate-nanokvm-rootfs.sh <rootfs>
```

### Runtime restart caution

- Prefer a full clean reboot after changing native MMF/libkvm code.
- Repeated backend restarts have previously left CVI/ION/VB resources allocated
  and caused `already inited`, `fail to allocate ion memory`, and invalid-buffer
  errors.
- The linked Rust shutdown path calls `kvmv_deinit()`. The current native
  implementation stops and joins its workers before camera/MMF teardown; a
  controlled stop/start passed on `10.0.87.133`.
- Keep remote syslog enabled during native work so evidence survives a device
  hang/reboot.

## Logs And Diagnostics

- Local unified syslog: `/tmp/hardened-syslog/messages` in RAM.
- Rust backend log: `/tmp/nanokvm-server.log`.
- `kvm_system` test log when redirected: `/tmp/kvm_system.log`.
- Raw update log: `/data/hardened-system-raw-update.log`.
- Remote syslog receiver previously configured by the user:
  `10.0.77.177:514` over UDP.
- System Log API:
  - unified local stream: `/api/system-log/messages?kind=system`;
  - backend debug stream: `kind=backend`;
  - current kernel ring buffer: `kind=kernel`.
- Local syslog is intentionally tmpfs-only to avoid SD writes. Use remote
  syslog for crashes that may require power cycling.
- For native stability tests, inspect `dmesg` and syslog for at least:
  `oops`, `panic`, `segfault`, `module_put`, `fail to allocate ion`,
  `Invalid buffer`, `already inited`, VPSS errors, and VENC errors.

## Important Hardware Decisions

### USB HID and configfs

- USB wake-on-write is opt-in through `/boot/usb.wakeup`; explicit
  `/boot/usb.notwakeup` wins if both flags exist.
- The GUI Device page exposes the same setting through
  `GET/POST /api/hid/usb-wakeup`.
- Do not detach UDC and unlink/relink live HID configfs functions to change BIOS
  subclass or wakeup behavior. A live test on 133 caused a kernel oops in
  `tokio-rt-worker`/`module_put`.
- `/boot/BIOS` subclass testing broke normal keyboard behavior and was rolled
  back. Any future BIOS compatibility experiment must be applied at clean boot,
  not through live configfs topology changes.
- If keyboard input stops, first use the existing reset/HID recovery path and
  inspect configfs/UDC state. Do not immediately rebuild the gadget live.

### Virtual media

- Normal same-type media changes should eject the removable LUN by clearing
  `lun.0/file`, update `ro`/`cdrom`/`inquiry_string`, then insert the new file.
- Switching CD-ROM versus mass-storage type reconnects the USB gadget because
  many BIOS/boot menus cache the previous LUN type.
- `.iso` may be mounted as CD-ROM or mass storage for hybrid media.
- `.img` is mass-storage only and must pass MBR/GPT, FAT/exFAT superfloppy, or
  supported raw filesystem signature validation.
- Image listing is not filtered by selected mount type; uploaded media must
  remain visible without logout.
- Browser upload supports cancel/failure status and image-list refresh. Verify
  this behavior after backend/frontend changes because it has regressed before.

### HDMI/video

- WebRTC hotplug recovery handles RTCP PLI/FIR and temporarily requests a short
  GOP/keyframe. The user confirmed the original black-screen hotplug symptom was
  fixed on 133.
- Restricted and Paranoid firewall modes intentionally disable H.264 WebRTC.
  H.264 Direct and MJPEG remain the supported restrictive-mode paths.
- The resolution choices in the web video menu are capture/encoder output
  sizes, not EDID/remote-host display-mode changes. A low capture size can crop
  or scale a larger HDMI input; do not compensate with TouchSync coordinate
  calibration.

## Current Product Behavior

### Firewall

- `moderate` is the default.
- Moderate, Restricted, and Paranoid accept new inbound connections only from:
  - IPv4 RFC1918 `10/8`, `172.16/12`, `192.168/16`;
  - IPv4 link-local `169.254/16` and loopback `127/8`;
  - IPv6 ULA `fc00::/7`, link-local `fe80::/10`, and loopback `::1/128`.
- Baseline remains the open compatibility profile.
- Restricted permits local HTTPS/SSH and required outbound services but no
  WebRTC UDP.
- Paranoid permits local HTTPS only and intentionally blocks online updates.
- Restricted and Paranoid require working HTTPS before activation.

### Time and NTP

- `S49ntp` rebuilds `/etc/ntp.conf` from `/etc/kvm/time.json`, performs a
  one-shot `ntpdate -u` against the first configured server, then starts
  `ntpd`.
- The device correctly uses configured server `10.0.87.5`, but the last direct
  test received `no server suitable for synchronization found`. That was a
  server-side NTP suitability/configuration issue, not failure to consume the
  GUI setting.

### Mobile/tablet UI

- Mobile view is a Hardened addition, not present in the original project.
- Phones and touch tablets use TouchSync, a local cursor overlay, native mobile
  keyboard button, separate on-screen HID keyboard, auto-fit, pinch-to-zoom,
  and touch-drag panning.
- Appearance can force Mobile view in the current browser through
  `nano-kvm-layout-mode` localStorage state.
- At 100% scale, the KVM screen auto-fits the browser window on desktop and
  touch layouts. Higher manual scales remain scrollable/pannable.
- Do not reintroduce the old Trackpad/Direct mobile selector; TouchSync is the
  current default mobile pointer model.

### Authentication and sessions

- Login creates an in-memory server session plus HttpOnly `nano-kvm-token`
  cookie. Closing a tab/browser does not log out by itself.
- Logout clears the cookie/server session; session timeout expires it; backend
  restart clears the in-memory session map.
- Product images do not use `admin/admin` default bootstrap. Fresh images use
  first-account setup.

## Current Verification Baseline

- RC9 release checks passed locally: Rust tests, web production build, linked
  RISC-V build, package/rootfs validation, signed metadata verification, raw
  manifest checks, checksums, and SD image xz integrity.
- The post-RC9 fit/alignment changes that became RC9.1 were installed as a test
  payload on both 133 and 132.
- Playwright against both devices passed desktop `1200x800` and phone
  `393x873` checks for KVM fit and Appearance control alignment with no page
  errors.
- `/api/health` returned the Rust backend on both devices during that check.
- Those web-only checks reported application version `2.0.32` on-device; do
  not assume RC9.1 was installed on either device without rechecking.
- The native C/C++ audit findings have source fixes. Rebuilt native libraries
  passed full reboot, MJPEG, H.264 Direct, and controlled backend stop/start on
  `10.0.87.133`; `10.0.87.132` was not used for native testing.

## Immediate Next Work

1. Stress repeated HDMI hotplug and resolution changes on 133.
2. Exercise physical OLED/button behavior and Wi-Fi provisioning hardware.
3. Run a long dmesg/syslog soak and fault-injection coverage for vendor errors.
4. Validate positive Wi-Fi reconnect and OLED AP provisioning on a device with
   `wlan0`; 133 cannot currently validate that path.
5. Recheck Tailscale login and perform a real peer connection only after the
   selected test device is logged into a tailnet.

## Documentation Map

- Release/user overview: [`../README.md`](../README.md)
- Changelog: [`../CHANGELOG.md`](../CHANGELOG.md)
- Rust backend status/build: [`rust-backend.md`](rust-backend.md)
- Native audit: [`native-code-audit.md`](native-code-audit.md)
- Security inventory: [`security-risk-inventory.md`](security-risk-inventory.md)
- API inventory: [`backend-api-inventory.md`](backend-api-inventory.md)
- Migration strategy/history: [`kvm-system-rust-migration-plan.md`](kvm-system-rust-migration-plan.md)
- Build/device operations: [`build-notes.md`](build-notes.md)
- SD flashing: [`sd-card-flashing.md`](sd-card-flashing.md)
- Release history: [`release-archive.md`](release-archive.md)
- Raw/system update chronology: [`current-sysupgrade-build-trace.md`](current-sysupgrade-build-trace.md)

## Handoff Safety

- Keep code edits narrowly scoped; the worktree may contain user changes.
- Before a device write, verify the target IP and current installed version.
- Use 133 for native migration/audit fixes unless the user directs otherwise.
- Do not perform live HID configfs topology changes.
- Do not use GNU-only `tar` flags on NanoKVM BusyBox.
- Do not push a release or change update-channel metadata without an explicit
  user request.
- When publishing ordinary source/docs changes, verify the diff, stage only the
  intended files, and push the current commit to GitHub `main`.

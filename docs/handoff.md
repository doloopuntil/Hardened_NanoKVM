# Hardened NanoKVM Handoff

Last updated: 2026-07-11

## Repository State

- Local repo: `/home/w0w/Hardened_NanoKVM-new-buildroot`
- GitHub repo: `woffko/Hardened_NanoKVM`
- Active release branch: `feature/rust-kvm-system-migration`; GitHub default
  branch `main` now includes RC9 release commit `ec68dd4`.
- Current source/test app version: `2.0.32`
- Current published app release: `2.0.32 RC9` on tag `hardened-rust-rc9`.
- Current published raw/system channel: `0.2.23-raw.1` on companion tag
  `hardened-system-0.2.23-raw.1`; stable and preview channel metadata both
  point there.
- Latest full release build/test: RC9 app archive, raw bundle, and SD image were
  built from release commit `ec68dd4`; Rust tests, web build, linked RISC-V
  build, metadata signature verification, rootfs validation, xz integrity, raw
  manifest inspection, and checksums passed locally. Live GitHub
  `latest.json`, `hardened-rust-preview/latest.json`,
  `hardened-system-stable/system-latest.json`, and
  `hardened-system-preview/system-latest.json` were downloaded after publish;
  app and system stable signatures verified OK.
- RC9 key artifact SHA256:
  - app archive `hardened-nanokvm-kvmapp-2.0.32.tar.gz`:
    `2710c47cccb2db8e7016d56850de72bbb6ef877230b5f47c26f3edb4428b5650`;
  - app metadata `latest.json`:
    `b5ac84a95075321d11b731e05c3563c473193472952b4e077a2916384ea3ad82`;
  - raw system archive `hardened-nanokvm-system-0.2.23-raw.1.tar.gz`:
    `d7d50d279619f5a964c7367a3cd506385a423c1751c79220e6dc03ab5ca4b458`;
  - system metadata `system-latest.json`:
    `da6c4df02bccfd441ec31792eaf26eab46be5ed00afce8e72e645e15099089e0`;
  - compressed SD image
    `Hardened_NanoKVM_RC9_2_0_32_buildroot_2023_11_2_security_backports_Rev1_4_2_rust.img.xz`:
    `52b5b65886d977c1360b7d788169f6559f7e42d6794bc30d444469121c576b83`.
- GitHub Pages was updated for RC9 on `gh-pages` commit `ad91ef6`.
- Latest app-only release before RC9: RC7.1 / `2.0.30` packaged the post-RC7
  mobile KVM pinch-to-zoom and touch-drag panning fixes only; RC8 folded those
  fixes plus tablet/forced-mobile layout work into the full raw/SD baseline,
  and RC9 carries the post-RC8 Settings segmented-control fixes.
- Latest local hardware test: post-RC8 Settings mobile/tablet web builds were
  installed and checked on NanoKVM Cube devices `10.0.87.133` and
  `10.0.87.132`; final full RC9 image has not been raw-installed on hardware
  before publishing unless noted later in this file.
- Post-RC9 web fit/alignment check on `10.0.87.133` and `10.0.87.132`
  (2026-07-11): the Appearance page `Interface layout` and `Display Mode`
  segmented controls now use matching fixed desktop widths and full-width mobile
  layout, so their right edges and label centers line up. KVM screen fitting now
  applies to desktop/tablet/browser windows too: at `100%` scale, the rendered
  `#screen` is sized to fit inside `[data-kvm-screen-scroll]`, while higher
  manual scale values still produce scrollable/pannable content. Built
  `web/dist`, packaged
  `build/artifacts/hardened-nanokvm-kvmapp-2.0.32-fit-align.tar.gz`
  (`sha256=76220e9169ff9f236680f91447d39dff625b8732734b592fb6c911d120ea37ba`),
  and installed it on both devices through the authenticated offline app-update
  API because SSH password auth was not accepted during this session. Installed
  HTTPS `index.html` SHA-256 on both devices:
  `1f5de8f50923ac0750a021ff1c696559eac5c3bd9b361af81dbc8b887333876f`;
  `/api/health` returned Rust backend OK and `/api/application/current-version`
  returned `2.0.32` on both. Playwright device check
  `/tmp/nanokvm-fit-align-check.mjs` passed desktop `1200x800` and phone
  `393x873` on both devices: screen width/height fit the container, both
  Appearance segmented controls had matching `left`/`width`, and no page errors
  were reported. Screenshots and report are under
  `/tmp/nanokvm-fit-align-check`.
- GitHub Releases cleanup after RC9: keep RC9, RC8, RC7.1/RC7, RC6, their
  raw-system companion releases, and the app/system stable/preview channel
  releases unless a separate cleanup is requested. Older beta/RC release
  entries can remain deleted; git tags should be left intact.
- Post-RC7 and RC8 mobile UI work:
  - mobile top bar has a dedicated local-device keyboard button; it focuses a
    hidden textarea so Android/mobile browsers show their native soft keyboard;
  - the previous HID on-screen keyboard remains available as a separate
    `On-screen keyboard` menu item;
  - mobile runtime now uses `TouchSync`: relative touch movement on the full
    KVM surface with absolute HID output and a drawn local cursor overlay. The
    old mobile Trackpad/Direct selector was removed from the mobile menu; the
    menu now shows TouchSync status plus wheel direction/speed and Reset HID;
  - TouchSync resets its internal absolute HID position to screen center when
    `resolutionAtom` changes and the local cursor overlay observes `#screen`
    resize/remount events. This targets Android/local cursor desync seen after
    switching to 640x480;
  - absolute HID coordinates are clamped to the descriptor range `0..32767`,
    and desktop relative movement keeps a `Pointer speed` control to reduce
    drift from host-side mouse acceleration;
  - the KVM panel now exposes a shared `kvm-pointer-surface`; desktop relative
    mode and mobile TouchSync input listen on the full black KVM surface
    instead of only the rendered `#screen` media element, so unused
    letterbox/pillarbox areas can be used as a touchpad when the mobile
    keyboard is closed;
  - mobile touch/pen input now shows a drawn local cursor overlay above the KVM
    surface. This is not the Android system cursor, which Chrome does not
    expose for touch input; it is a web overlay below menus/keyboards so touch
    position is visible while controlling the remote cursor.
  - mobile KVM pinch gestures now change only the KVM video scale rather than
    browser page zoom, and one-finger TouchSync drag also pans the scaled video
    viewport so zoomed screens remain reachable on narrow phones.
  - Do not calibrate absolute HID coordinates to compensate for the 640x480
    menu mode. That setting is a NanoKVM capture/encoder resolution and can
    crop/zoom a higher-resolution HDMI input rather than changing the remote
    host desktop resolution. Cursor divergence in that state is a viewport
    mismatch, not a TouchSync scaling bug. The temporary object-fit geometry
    helper and the `0.75` 480-mode X calibration were reverted; use native
    remote-host resolution changes or relative mouse mode if a cropped capture
    mode is required.
  - virtual CD/DVD/mass-storage mount changes now eject and insert the
    removable mass-storage LUN, allow `.iso` images in either CD-ROM or mass
    storage mode for hybrid ISO media, keep `.img` limited to mass-storage mode,
    and reconnect the USB gadget automatically when the mode changes between
    CD-ROM and mass storage so BIOS/boot menus rescan the device type;
    `/api/storage/usb/reconnect` and the Images menu button remain as a
    confirmed compatibility fallback when a host misses a media change;
  - Images menu no longer filters the file list by the currently selected
    mount mode, so `.iso` and `.img` files stay visible after upload. Mounting
    an ISO uses the user's selected CD-ROM/Mass Storage mode; mounting an IMG
    always uses Mass Storage.
  - local verification for the latest TouchSync/i18n pass: i18n audit script
    reported complete locale key coverage with no fresh English fallback leaks,
    all flattened locale values are strings, `npm run build` in `web` passed,
    and `cargo check --manifest-path server-rust/Cargo.toml` passed.
  - Post-RC8 Settings mobile/tablet Playwright pass (2026-07-10):
    fixed clipped AntD segmented labels in Appearance (`Mobile view` and
    `Always visible`) by allowing mobile Settings segmented labels to wrap and
    giving the two Appearance segmented controls stable minimum widths.
    Built `web/dist`, deployed web-only archive to both NanoKVM devices
    `10.0.87.133` and `10.0.87.132` using an uncompressed tar, and installed it
    into `/kvmapp/server/web` plus `/tmp/server/web`. Installed
    `index.html` SHA-256 on both devices:
    `ecaf85d0ebe5768b9b2dac8c9563cbac294673555f16a80e06d4d6e5bfe06cc2`.
    `/api/health` stayed OK with Rust backend on both devices. Playwright
    against real HTTPS devices passed phone `393x873` and tablet `1024x768`
    Settings Appearance/System/Firewall smoke checks with no page errors; the
    only console noise was the expected pre-login `401 Unauthorized`, and
    failed requests were navigation aborts from the login transition. Report and
    screenshots were written under `/tmp/nanokvm-playwright-device`.
    Follow-up after visual review: the initial fix removed ellipsis but left
    AntD segmented labels top-aligned. Added flex centering for
    `settings-segmented-wrap-labels` and redeployed web-only builds to
    `10.0.87.133` and `10.0.87.132`; new installed `index.html` SHA-256 on both
    devices is
    `4b2fed17e59fa4938f0a12936413f22223c72f74817fb1375ef752690d61467d`.
    Repeat Playwright screenshots confirmed centered `Auto`, `Mobile view`,
    `Auto hide`, and `Always visible` labels on phone and tablet layouts.
  - Device 133 hotfix deploy after RC7: RISC-V backend SHA-256
    `bb6f0465cbbd8eb057189fbad556b2d9d6ea684371048ba0d7ec193d73ea8af4`
    and web `index.html` SHA-256
    `68fde6ba59d5abc762126d85f7d620ada597fe026883421a5dff2a02f1722eeb`
    were installed to `/kvmapp/server` and staged to `/tmp/server`.
    `/api/health` returned OK, `/api/storage/image` returned both
    `/data/kali-linux-2024.2-live-amd64.iso` and
    `/data/memtest86-pro-usb.img`, `/api/download/image/status` returned
    `idle`, and no image was mounted at verification time.
  - Device 133 web-only trackpad deploy after the ISO visibility fix: web
    `index.html` SHA-256
    `65ef06e8b9598bb5b954debe69de588e1611b73d96ff24e9d7fbcdec6e1068e1`
    is installed in both `/kvmapp/server/web` and `/tmp/server/web`;
    `/api/health` returned OK after deployment.
  - Follow-up mobile Trackpad deploy on 133: Trackpad input was switched from
    legacy `touch*` handlers to Pointer Events with pointer capture on the full
    `kvm-pointer-surface`, preserving tap, long-press right click, and
    two-finger scroll. New web `index.html` SHA-256 is
    `efd8ad9dc3e50c580725fa42d52ebaa8400698418c233ea76c9a0b6292f41246`;
    `/api/health` returned OK after deployment.
  - Follow-up mobile mouse/scale deploy on 133: relative desktop mode and
    mobile Trackpad now multiply movement by the remote-resolution/rendered-size
    ratio, mobile screen scaling uses real layout dimensions with scrollable
    containers instead of transform-only scaling, absolute/direct touch pans the
    scroll container near edges, and mobile popover menus close after selecting
    leaf items. New web `index.html` SHA-256 is
    `ac3638f6f403262eb2d28079b58604466a08db0c17b57b1dc6d6feb8060dedbd`;
    `/api/health` returned OK after deployment.
  - Follow-up mouse speed/pan fix on 133: relative/Trackpad movement scaling no
    longer shrinks when the UI zoom is increased; it uses the remote resolution
    with fractional movement accumulation. Absolute/direct edge panning was
    inverted to match touch-drag expectations. New web `index.html` SHA-256 is
    `10eee92dcad6465a9a763f7af1eed8fe991a339fbbc73ac325f5cd7d22a7b010`;
    `/api/health` returned OK after deployment.
  - Follow-up x8 speed/slider deploy on 133: relative/Trackpad movement now uses
    a fixed base multiplier of `8x`, `Pointer speed` defaults to `1x` and its
    slider range is `25%..800%`, and absolute/direct edge panning was returned
    to browser scroll semantics (`scrollLeft` increases near the right edge).
    Initial runtime extraction hit `/tmp` full because old web tar files were
    left in tmpfs; `/tmp/nanokvm-web-*.tar` was removed and `/tmp/server/web`
    was reinstalled cleanly from `/data/nanokvm-web-x8-pan-fix.tar`. New web
    `index.html` SHA-256 is
    `fb767f9e1bfc29e9dc7bfe6d4993fc97867b27aed96d644a063fdae8c37a0ea0`;
    `/api/health` returned OK after deployment.
  - Follow-up no-pan test deploy on 133: absolute/direct auto-pan calls were
    disabled while keeping the `8x` relative/Trackpad speed and `25%..800%`
    pointer speed slider. Installed cleanly from `/data/nanokvm-web-no-pan.tar`
    into both `/tmp/server/web` and `/kvmapp/server/web`. New web `index.html`
    SHA-256 is
    `d8ff46d72d9f6beffc14e659f3ddead9423aabf357a3a7f3f2c0948693ae30aa`;
    `/api/health` returned OK after deployment.
  - Follow-up mobile cursor overlay deploy on 133: web-only build installed
    from `/data/nanokvm-web-mobile-cursor.tar` into both `/tmp/server/web` and
    `/kvmapp/server/web`. New web `index.html` SHA-256 is
    `7b9693effff8d6f5dfd5686a14071e29cc0c4cbd51ce967efb97776988037312`;
    HTTPS `/` returned bundle `/assets/index-CckPm-xR.js`, the downloaded
    `index.html` matched the hash, and `/api/health` returned OK.
  - Follow-up tablet/touch-layout deploy on 133: frontend breakpoints were
    unified through `useIsTouchLayout`, so narrow screens and touch tablets up
    to 1366px use the same mobile/touch behavior for the top menu, submenus,
    local mobile keyboard button, TouchSync mouse menu/runtime, virtual
    keyboard layout, settings modal, Picoclaw overlay, and mobile screen
    fitting. Web-only build installed from
    `/data/nanokvm-web-tablet-touch-layout.tar` into both `/tmp/server/web` and
    `/kvmapp/server/web`; no GitHub release was created. New web `index.html`
    SHA-256 is
    `9e949699e69dd1372811248e91e477fd9d0cc17c448bf888d24c8ef67cdd4d54`;
    `/assets/index-DFmBMgXs.js` and `/assets/desktop-CaqnkAsx.js` returned
    HTTP 200, `/api/health` returned OK, and NanoKVM server/kvm_system
    processes stayed running.
  - Follow-up force-mobile-layout deploy on 133: Appearance > Display now has
    a local `Interface layout` selector with `Auto` and `Mobile view`. The
    value is stored in browser localStorage as `nano-kvm-layout-mode` and feeds
    the shared `useIsTouchLayout` hook through `layoutModeAtom`, so changing it
    immediately switches menus, settings, TouchSync, keyboard layout, and
    screen fitting on that browser. New strings were added to English/Russian
    base locales and localized through `locale-extras` for the other supported
    UI languages. Web-only build installed from
    `/data/nanokvm-web-force-mobile-layout.tar` into both `/tmp/server/web` and
    `/kvmapp/server/web`; no GitHub release was created. New web `index.html`
    SHA-256 is
    `fa368e16c745dca33af33227849366a08c5e5a03f7466088bedf21a6df65beff`;
    `/assets/index-Brs7kxcs.js` and `/assets/desktop-D0PIJqXX.js` returned
    HTTP 200, `/api/health` returned OK, and NanoKVM server/kvm_system
    processes stayed running.
- Auth/session note: web login issues an in-memory server session and a
  `nano-kvm-token` HttpOnly cookie with `Max-Age` equal to the configured
  session lock duration. Closing a browser tab/window does not necessarily log
  out; logout clears the cookie and server session, timeout expires it, and a
  backend restart drops the in-memory session map.
- Public default branch `main` was updated after RC7 with docs commit
  `8f4b88a` and merge commit `2b050b8`, so GitHub's default README/source tree
  now includes the RC7 code/docs while the release tags still point at
  `6961b9e`.
- Tailscale on `10.0.87.132` still reports `state=notLogin`, empty IP/account;
  a real Tailscale peer test remains blocked until the device is logged in.
- Previous raw/system baseline: app `2.0.19` and raw system update
  `0.2.15-raw.1` were built, published, and live-validated on `10.0.87.132`
  after fixing two raw-update issues:
  - root configuration restore must be deferred to first boot because the live
    rootfs cannot be mounted again while it is `/`;
  - reboot after raw writes must use kernel sysrq because the live rootfs has
    already been overwritten.
- Recent published app commits when this handoff was updated:
  - `7a262b2 Use reboot for TLS protocol changes`
  - `b220389 Stabilize video mode switching`
  - `1802d20 Move Network settings under System`
- Published `2.0.25 RC3` fixes three regressions found after `2.0.24`:
  - saved video mode was being reset to MJPEG on desktop startup;
  - Appearance menu display mode could fall back to auto-hide after update;
  - the login screen displayed the stale static `beta 2.0.4` version.
- The app fix adds public `GET /api/application/current-version`, keeps the
  login screen on local `/kvmapp/version`, normalizes legacy menu display-mode
  values, and preserves valid `mjpeg`/`h264`/`direct` selections.
- Do not publish this handoff file unless it has been reviewed for operational
  notes and secrets. Public commits should stage only release-safe docs/code.

## Device Operational Notes

- NanoKVM BusyBox `tar` on the lab devices does not support GNU `-z`, and
  `tar -a` is not reliable for extracting `.tar.gz` app packages there. Use the
  explicit gzip pipe instead:
  - extract: `gzip -dc package.tar.gz | tar -C /target -xf -`;
  - for web-only/test deploys, an uncompressed archive also works reliably:
    `tar -cf web.tar -C web/dist .` locally, then
    `busybox tar -xf /tmp/web.tar -C /target/web`;
  - backup: `tar -C / -cf - kvmapp | gzip -c > /root/backup.tar.gz`.
- For 133 SSH automation in this WSL, system `sshpass` was not installed and
  `sudo apt-get install sshpass` needs an interactive sudo password. A temporary
  local copy was unpacked under `/tmp/sshpass-local/root/usr/bin/sshpass`.
- NTP startup fix validated on `10.0.87.133`: `S49ntp` now rebuilds
  `/etc/ntp.conf` from `/etc/kvm/time.json` and runs a one-shot
  `ntpdate -u <first configured server>` before starting `ntpd`. The Rust time
  settings API now waits long enough for that service restart path, so GUI
  saving no longer returns a false `command timed out` while the config is
  already written. Validation notes:
  - temporary pool-server test stepped the clock from a forced 2020 date back to
    2026 at service start (`ntpdate` offset about `+205177289s`);
  - authenticated `POST /api/system/time` with configured server `10.0.87.5`
    returned `code:0` in about 8 seconds on 133;
  - `10.0.87.5` itself still returns
    `no server suitable for synchronization found`, so the code uses the GUI
    config correctly but that server must be fixed separately before it can
    actually sync time.
- WebRTC HDMI hotplug fix validated by user on `10.0.87.133`: the provided
  remote syslog HTML showed LT6911 HDMI interrupts followed by VPSS no-buffer
  messages. Root cause was that Rust WebRTC read RTCP but ignored PLI/FIR
  keyframe requests, so the browser H.264 decoder could stay black until a
  codec toggle forced a new stream. The fix handles RTCP PLI/FIR, briefly
  forces H.264 GOP=1 to request a keyframe, and asks for a keyframe instead of
  immediately falling back to MJPEG on transient no-frame results.
- USB wakeup spam fix validated on `10.0.87.133`: kernel log spam was
  `configfs-gadget gadget: usb_gadget_wakeup` paired with
  `dwc2 4340000.usb: wakeup: signalling skipped: is not allowed by host`. The
  Hardened default is now opt-in via `/boot/usb.wakeup`; `/boot/usb.notwakeup`
  remains an explicit disable flag and wins if both files exist. GUI Device now
  has a `USB Wakeup` toggle backed by `GET/POST /api/hid/usb-wakeup`. Live
  application writes `wakeup_on_write` directly. If the kernel reports `EBUSY`,
  the API now logs the change as deferred and deliberately avoids UDC detach or
  HID configfs unlink/relink on a running device. Final 133 validation with
  backend hash
  `cad88ed6c1b6d153d80819c0e6a0d3bd97a853e8eb3622cda8045abe935d1a08`:
  enable API changed all HID `wakeup_on_write` files to `1`, disable changed
  them back to `0`, left `/boot/usb.notwakeup`, and the wakeup log count stayed
  `441 -> 441` after a zero HID write.
- Pre-boot keyboard compatibility test on `10.0.87.133`: `/boot/BIOS` was
  briefly created and applied live by detaching UDC, unlinking HID functions,
  setting `hid.GS0/GS1/GS2/subclass` to `1`, relinking functions, and
  reattaching UDC. This broke normal keyboard operation and produced a kernel
  oops in `tokio-rt-worker`/`module_put` during the configfs manipulation. The
  test was rolled back immediately: `/boot/BIOS` removed, all HID subclasses
  restored to `0`, UDC reattached, and zero HID reports sent to release keys.
  Do not repeat live HID subclass relinking or live UDC detach/relink on a
  running device; use a clean boot/reboot test path if BIOS subclass
  compatibility needs more testing.
- Virtual-media safety note: normal same-type ISO/IMG mount/unmount should avoid
  UDC detach/reattach. Use LUN eject (`lun.0/file` empty), update
  `ro`/`cdrom`/`inquiry_string`, then write the new backing file. If the host
  returns busy, report that the user must eject/unmount media on the host.
  Reconnect the USB gadget automatically when switching the media type between
  CD-ROM and mass storage because many BIOS/boot menus cache the previous LUN
  type. Keep full USB reconnect as a manual fallback for other missed media
  changes.
- HID keyboard recovery note from `10.0.87.133`: after earlier virtual-media
  USB reconnects the gadget could remain `state=configured` with HID functions
  still linked, but writes to `/dev/hidg0`/`hidg1`/`hidg2` failed with
  `ENXIO` (`No such device or address`). A plain `/etc/init.d/S03usbdev restart`
  restored zero-report writes immediately. The Rust fix closes cached HID file
  descriptors before storage-triggered USB gadget resets, keeps the UDC
  detached for 1 second like `S03usbdev restart`, and treats HID `ENXIO` or
  `ENODEV` as a recovery condition even when UDC state still says
  `configured`. Do not use live configfs HID relinking for this; it previously
  caused a kernel oops.
- Image upload UI note from `10.0.87.133`: a browser-side ISO upload could leave
  the menu stuck at an unchanged percentage because the old UI used `fetch`
  without upload progress, cancellation, or stalled-transfer detection. The
  current web UI uses `XMLHttpRequest` for local image uploads so it can show
  browser upload progress, abort an active upload with a visible Cancel button,
  and mark the transfer failed if progress does not move for 90 seconds. A
  stale hidden temp file from the interrupted upload was found at
  `/data/.debian-12.2.0-amd64-DVD-1.iso.k_vIwgtxjqht.upload` and removed. The
  device had also been updated by the user, so manual test installs were reset;
  reinstalled backend hash
  `06448be23e5b55f038df01b86bcc07ac2c83b79012b024107ff04ee5b06a6a8f` and web
  `index.html` hash
  `3fe10048cb59074f7e568c14d22f2ef2a7ae6d2d71b7a58661d6f4466b9ebb0b` to both
  `/kvmapp/server` and `/tmp/server`. `/api/health` returned OK and the served
  `/` hash matched the new web hash. Backend stale-marker validation on 133:
  an artificial old `/tmp/.download_in_progress` containing
  `debian-12.2.0-amd64-DVD-1.iso;21.28%` returned
  `status=failed,file=debian-12.2.0-amd64-DVD-1.iso,percentage=21.28%`, removed
  the marker, and the next status call returned `idle`.
- Current 133 diagnosis for WinPE ISO visibility:
  - after the user switched USB disk -> ISO and initially selected Mass Storage,
    current sysfs state was already corrected to
    `file=/data/WinPE-2016_xlx-final.iso`, `cdrom=1`, `ro=1`,
    `inquiry=NanoKVM USB CD/DVD-ROM  0520`, `UDC=4340000.usb`,
    `state=configured`;
  - `/api/storage/usb/reconnect` returned success and `dmesg` showed
    `dwc2 4340000.usb: bound driver configfs-gadget` and
    `new device is high-speed` with no new `oops`, `panic`, `segfault`, or
    `module_put`;
  - the ISO has ISO9660 `CD001` and an El Torito boot record, plus strings such
    as `bootmgr`, `boot.sdi`, and `etfsboot.com`; no obvious `EFI` boot string
    appeared in the quick string scan, so it may be legacy-BIOS bootable but not
    necessarily UEFI-bootable.
- Current 133 validation for the virtual-media and mouse-control slice:
  - installed linked backend hash
    `8cf5643b73580500e7184071fd465a988cda7766094dc977fac9c4ae82d32616` to
    `/kvmapp/server/NanoKVM-Server` and `/tmp/server/NanoKVM-Server`;
  - installed web `index.html` hash
    `b20621ba89acd7df803f12d68d756e8bbb0da0c900c0c30946e519cd855eb5a5` to
    `/kvmapp/server/web` and `/tmp/server/web`;
  - `/api/health` returned OK after `S95nanokvm restart-server`;
  - mounted `/data/hardened-lun-test.img` through `/api/storage/image/mount`:
    `file=/data/hardened-lun-test.img`, `cdrom=0`, `ro=0`;
  - switched to `/data/hardened-lun-test.iso` with `cdrom=true`:
    `file=/data/hardened-lun-test.iso`, `cdrom=1`, `ro=1`,
    `inquiry=NanoKVM USB CD/DVD-ROM  0520`;
  - switched back to `.img`: `cdrom=0`, `ro=0`,
    `inquiry=NanoKVM USB Mass Storage0520`;
  - unmounted back to default `/dev/mmcblk0p3`; authenticated API returned
    `mounted.file=""` and `cdrom=0`;
  - manual `/api/storage/usb/reconnect` fallback returned success, UDC state was
    `configured`, `/dev/hidg0`/`hidg1`/`hidg2` existed, zero HID writes to
    keyboard/mouse/touchpad returned `rc=0`, a WebSocket release-key report
    through `/api/ws` connected and closed cleanly, and `/api/health` stayed
    OK;
  - `dmesg | wc -l` stayed `450` across the mount/unmount/reconnect checks and
    no new `oops`, `panic`, `segfault`, or `module_put` line appeared.
- Current firewall/WebRTC policy change: Restricted no longer opens WebRTC/ICE
  UDP ports and Paranoid remains WebRTC-closed. The Rust backend rejects
  `/api/stream/h264` while Restricted or Paranoid is effective, and the Video
  Mode menu disables H.264 WebRTC in those modes. Documentation and i18n strings
  were updated for all supported languages so Restricted is described as
  local-only HTTPS/SSH plus needed outbound DNS/NTP/syslog/update traffic, with
  WebRTC blocked.
- Current 133 validation for the firewall/WebRTC/configfs-safe HID slice:
  - installed linked backend hash
    `992e59558557ad0749d31b3821815f8871f65ea2410d9c491d9e02bd80aaa34f` to
    `/kvmapp/server/NanoKVM-Server` and `/tmp/server/NanoKVM-Server`;
  - installed `S40firewall` hash
    `20537284872e58ea6cad528fc3d5b4af6b4e8c03073b1cb15cae04c97c97d1ec`;
  - installed web `index.html` hash
    `3f9d0373a2f6beb55fbcacb9620f7c240ee45a6e0f69a6ad7b84539e1d63845b`;
  - `/api/health` returned OK over HTTPS;
  - `/api/system/firewall` reported `config.mode=restricted`,
    `effectiveMode=restricted`, and `webrtcBlocked=true`;
  - `iptables-save`/`ip6tables-save` rules had no `3478`, `19302`, `49152`, or
    WebRTC UDP allow range;
  - authenticated WebSocket upgrade to `/api/stream/h264` returned `403` with
    `H.264 WebRTC is disabled in Restricted and Paranoid Firewall modes`;
  - backend log showed H.264 Direct first-frame read after restart; dmesg tail
    had no new `oops`, `panic`, `segfault`, `module_put`, or `tokio` crash line.
- `S01syslogd` must keep a local tmpfs syslog target even before the web UI
  writes `/etc/default/syslogd`. On 133 the pre-fix process was only
  `/sbin/syslogd -n`, so `/tmp/hardened-syslog/messages` did not exist. The
  fixed default is
  `/sbin/syslogd -n -O /tmp/hardened-syslog/messages -s 200 -b 1 -l 8`.
  Keep persistent/post-reboot evidence on a remote syslog server; the local file
  is intentionally RAM-only to avoid SD-card writes.

Detailed chronological build/update notes are in
[`docs/current-sysupgrade-build-trace.md`](current-sysupgrade-build-trace.md).

## Current Branch Snapshot: kvm_system Rust Migration

- Active migration branch:
  `feature/rust-kvm-system-migration`.
- Pushed commits on this branch after password-reset removal:
  - `1ba5904 Plan kvm_system Rust migration`;
  - `6fd6264 Move legacy app cleanup into S95`;
  - `1754346 Stop legacy DNS rewrite on new image marker`;
  - `45e5da6 Reject legacy app migration artifacts`;
  - `e3614ef Bump anyhow to 1.0.103`;
  - `9bd5e9e Move legacy app marker handling into S95`;
  - `a4636c0 Migrate kvm_system watchdog state to Rust-side services`;
  - `95be68c Allow validated mass storage image uploads`.
- Pushed virtual-media upload fix:
  - local upload now accepts `.iso` and `.img`; remote URL download remains
    ISO-only;
  - `.iso` still requires ISO9660 `CD001` at the primary volume descriptor;
  - `.img` must validate as a mass-storage image: MBR/GPT, FAT/exFAT
    superfloppy, or raw ext/XFS/Btrfs filesystem signatures. Random data is
    rejected even if the extension is `.img`;
  - frontend file picker now accepts `.iso,.img`, local upload status says
    `Uploading`, and the old `No ISO` prompt is overridden as `No image`/local
    equivalents in `locale-extras`;
  - local checks passed:
    `cargo fmt --manifest-path server-rust/Cargo.toml --check`,
    `cargo test --manifest-path server-rust/Cargo.toml api::download::tests`
    (12 tests),
    `cargo test --manifest-path server-rust/Cargo.toml api::storage::tests`
    (5 tests),
    `corepack pnpm --dir web exec prettier --check ...`, and
    `corepack pnpm --dir web build`;
  - RISC-V linked backend built with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib server-rust/scripts/build-linked-libkvm.sh`;
  - deployed to 133 with backend hash
    `14b65f46a4ba74c2a000aa6e100a730149fe305b0d5a1c20163c4f295e12f64a`
    for both `/kvmapp/server/NanoKVM-Server` and
    `/tmp/server/NanoKVM-Server`;
  - 133 HTTPS API validation:
    valid MBR `/tmp/hardened-upload-test.img` uploaded successfully and
    appeared as `/data/hardened-upload-test.img`; invalid
    `/tmp/hardened-upload-bad.img` returned
    `file is not a valid ISO or mass storage image`; cleanup through
    `/api/storage/image/delete` succeeded and `/api/storage/image` returned an
    empty list.
- Migration scope is minimal-risk, not a full C/C++ rewrite. Keep C/C++ for
  hardware-facing OLED/button/LT6911/I2C code unless moving a specific
  responsibility to Rust closes a real security, reliability, or maintenance
  issue. Remove only the old C/C++ paths whose responsibilities are replaced by
  Rust/init and validated.
- `docs/kvm-system-rust-migration-plan.md` captures the staged plan. It says the
  old implementation is only a temporary fallback for slices being migrated; the
  final shipped image should not have duplicate owners for the same
  responsibility.
- First cleanup slice:
  - removed tracked legacy `kvmapp/jpg_stream/*` and empty
    `kvmapp/kvm_system/kvm_stream`;
  - moved stale app/vendor cleanup into `S95nanokvm`;
  - made app packaging and rootfs validation reject those legacy artifacts.
- DNS/new-image slice:
  - `S95nanokvm` removes `/kvmapp/kvm_new_img` before starting `kvm_system`;
  - C++ `build_complete_resolv()` no longer overwrites `/etc/resolv.conf` with
    public DNS defaults;
  - on 133, a forced `/kvmapp/kvm_new_img` marker was removed on restart and
    video recovered after clean reboot.
- App-update validation slice:
  - Rust backend now rejects update archives containing `kvm_new_app`,
    `kvm_new_img`, `jpg_stream`, or `kvm_system/kvm_stream`;
  - unit tests passed:
    `cargo test --manifest-path server-rust/Cargo.toml api::application::tests`;
  - 133 rejected a deliberately bad offline app archive with
    `code=-1` and message
    `update archive contains forbidden legacy app migration artifact: kvm_new_app`;
  - after rejection, `/kvmapp/version` stayed `2.0.27`, marker was absent, PIDs
    stayed live, and MJPEG stream returned about 33 MiB in 5 seconds.
- `new_app_init()` migration slice:
  - `S95nanokvm` now owns legacy `/kvmapp/kvm_new_app` handling before runtime
    start, including `soph_saradc` cleanup and `soph_mipi_rx.ko` compatibility
    repair gated by the old marker;
  - C++ `new_app_init()` no longer copies init scripts, updates kernel modules,
    restarts `NanoKVM-Server`, or reboots. If reached, it logs and removes only
    the stale marker;
  - package, SD-image, and rootfs validation now strip/reject `kvm_new_app` and
    `kvm_new_img`, not only `jpg_stream` and `kvm_stream`;
  - local package test caught an ignored local `kvmapp/kvm_new_app` marker; after
    fixing packaging, the test archive had no legacy markers;
  - deployed to 133 with hashes:
    `/kvmapp/system/init.d/S95nanokvm`
    `f8c2872e96d94a7ee2a0246c39f6ac1117b35f75738da6bd5063b715e688a3fb`,
    `/kvmapp/kvm_system/kvm_system`
    `222254a4da2575beb9b32c78a502ea5b06e9e12cf53a5cf2934f5e01d3b26f67`,
    `/kvmapp/server/NanoKVM-Server`
    `38499fb371f6ebd9ad7bdc54856fdcf58772d2c6949707df47e2cdab2b065aa2`;
  - 133 checks after normal restart: `/api/health` OK, `kvm_system` and
    `NanoKVM-Server` running, no `kvm_new_app`/`kvm_new_img` markers, MJPEG
    stream returned about 39 MiB in 8 seconds;
  - 133 forced-marker check: touched `/kvmapp/kvm_new_app`, restarted
    `S95nanokvm`, marker was removed by `S95`, `soph_mipi_rx.ko` hash matched the
    bundled module (`69be7eeded3777f750480a5dd5a1aa26`), health stayed OK, and
    MJPEG stream returned about 51 MiB in 8 seconds;
  - `dmesg` grep after the checks found no `segfault`, `signal 11`, `panic`, or
    `oops`.
- 133 installed test state after clean reboot:
  - `/kvmapp/server/NanoKVM-Server` hash
    `38499fb371f6ebd9ad7bdc54856fdcf58772d2c6949707df47e2cdab2b065aa2`;
  - `/kvmapp/system/init.d/S95nanokvm` hash
    `58c9561b723408ed8c306d9f4261280fb72e4cce95dcd653b89e07b91db224c`;
  - `/kvmapp/kvm_system/kvm_system` hash
    `6a91a9ab80d583162fc7a9234803fd6f18c5e72eadfe94bd016f989ff143b854`;
  - final clean-boot MJPEG stream check returned about 52 MiB in 8 seconds.
- Important build note: do not deploy a plain
  `cargo build --target riscv64gc-unknown-linux-musl` backend to the device. It
  starts but logs `Dynamic loading not supported` for libkvm and breaks stream.
  Use:
  `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib server-rust/scripts/build-linked-libkvm.sh`.
- During testing a non-linked backend and repeated `restart-server` calls wedged
  the video pipeline (`mjpeg frame unavailable result=-1 bytes=0`). Recovery was
  a full device reboot. After reboot with the linked backend, stream worked.
- Phase 2 shadow hwmon local/unpushed test on 133:
  - first install plus `S95nanokvm restart` started `kvm_system`,
    `NanoKVM-Server`, and `nanokvm-hwmon`, and the helper wrote a valid snapshot;
  - the first MJPEG smoke immediately after that restart returned `HTTP 200` but
    `0 bytes` in 8 seconds, then the device stopped answering HTTP/SSH/ping on
    known addresses;
  - logs from that incident were not recoverable because only tmpfs logs existed
    before the manual reboot;
  - after the user manually rebooted 133 with the same files installed, health,
    SSH, hwmon snapshots, `dmesg`, and MJPEG stayed stable through repeated
    checks.
- Syslog-default follow-up on 133:
  - installed updated `S01syslogd` hash
    `b1604a279dd30abe5c264fef4690b22ee70fa7f739105054aedf70bd0dc20730` and
    updated `S95nanokvm` hash first
    `9faecb5ae6d841b3a07a392878c8525fb309682b92277d1191098dd0a4ad1524`, then
    `5baa20cbdadbdeb7a6082442d0075271df6ac0f19f17b256b778ac7bd2b22dc0`
    into `/kvmapp/system/init.d` and `/etc/init.d`;
  - restarted only `S01syslogd`, not `S95nanokvm`;
  - `logger -t nanokvm-runtime codex-syslog-default-test-20260703` appeared in
    `/tmp/hardened-syslog/messages`;
  - `/api/health` stayed OK, `kvm_system`, `NanoKVM-Server`, and
    `nanokvm-hwmon` stayed running, and authenticated MJPEG returned
    `10,941,298` bytes in 8 seconds before the expected curl timeout;
  - `dmesg` grep found no `segfault`, `signal 11`, `panic`, or `oops`.
- Phase 2 restart-path validation on 133:
  - `/etc/kvm/syslog.json` already had remote syslog enabled for
    `10.0.77.177:514`; `/etc/default/syslogd` was restored to match it with
    `-O /tmp/hardened-syslog/messages ... -R 10.0.77.177:514 -L`;
  - `S95nanokvm` now stops `NanoKVM-Server` before `kvm_system` and starts
    `nanokvm-hwmon` after a 20 second delay;
  - controlled `S95nanokvm restart` succeeded: health OK, `kvm_system`,
    `NanoKVM-Server`, and `nanokvm-hwmon` alive, hwmon snapshot active
    (`vi_fps=60`, stream `mjpeg`, state `1`);
  - authenticated MJPEG returned `11,820,526` bytes in 8 seconds after restart;
  - ten post-restart observation cycles kept health OK, all expected PIDs alive,
    and `dmesg` grep found no `segfault`, `signal 11`, `panic`, or `oops`.
- C++ legacy reboot-watchdog removal slice on 133:
  - removed `kvm_system` ownership of `/etc/kvm/watchdog`, `/tmp/watchdog`, and
    `/tmp/nanokvm_wd`; runtime recovery is now owned by `S95nanokvm`;
  - local CMake/MaixCDK build passed after adding a temporary `/tmp` `python`
    shim to `python3` for the generated `copy_assets.py` step;
  - installed `/kvmapp/kvm_system/kvm_system` hash
    `850bdc5e76fa240edf75b684f3d7021eb960e3b9d6c903efa09badb421da8332`;
  - after `S95nanokvm restart`, `/tmp/kvm_system/kvm_system` had the same hash,
    `/api/health` stayed OK, hwmon restarted, and authenticated MJPEG returned
    `11,722,800` bytes in 8 seconds;
  - test-created `/tmp/watchdog` with `/tmp/nanokvm_wd` absent for 18 seconds;
    the device did not reboot, expected processes stayed alive, and the markers
    were removed after the test.
- C++ marker-handler cleanup slice:
  - remove the remaining C++ `kvm_new_img` and `kvm_new_app` marker handlers from
    `system_init.cpp` and `main.cpp`;
  - keep `S95nanokvm` as the only owner for legacy app/image marker cleanup;
  - this does not touch OLED/button/LT6911/I2C hardware loops;
  - local C++ build produced hash
    `095cb6507ab14c8e0e73092deeeb7025057e33b0be9ae3ce887aaa1da3cf0cdb`;
  - initial 133 attempt failed because the old Rust backend did not reliably
    deinitialize libkvm on restart; see the remote syslog note below;
  - after fixed backend commit `67f42db`, reinstalled the cleanup helper on 133
    and rebooted;
  - clean boot verified `/tmp/kvm_system/kvm_system` hash `095cb...`, fixed
    backend hash `126bc...`, health OK, and MJPEG returned about `52.4 MiB` in
    8 seconds;
  - forced both `/kvmapp/kvm_new_app` and `/kvmapp/kvm_new_img`, restarted
    `S95nanokvm`, and syslog showed S95 handling/removing both markers before
    runtime start;
  - post-marker-restart MJPEG returned about `50.7 MiB` in 8 seconds;
  - five observation cycles outside sandbox kept health OK, PIDs stable, and no
    new `fail to allocate ion`, `Invalid buffer`, `segfault`, `signal 11`,
    `panic`, or `oops`.
- Remote syslog CSV from `D:\compiled\nano\all_2026-7-3-19_8_48.csv` indicates
  the 133 failure was the vendor video stack exhausting CVI/ION carveout, not a
  userspace segfault:
  - after runtime restart, kernel logged `VPSS` / `VENC` job init failures
    (`already inited`) and `vb has already inited`;
  - on the MJPEG smoke request, kernel logged `fail to allocate ion memory`
    for `0x900000`, `Invalid buffer to free! address=0x0`, and
    `carveout heap size:78643200 bytes, used:75366400 bytes`, `usage rate:96%`;
  - this aligns with Rust backend relying on `Drop` for static `KvmVision`,
    which is not a reliable process shutdown path, especially under `SIGTERM`;
  - fixed by adding an explicit backend signal handler that calls
    `kvm::shutdown()` / `kvmv_deinit()` before process exit, and MJPEG producer
    backs off on empty/error frames instead of calling `libkvm` at FPS rate.
- Backend shutdown/MJPEG backoff fix:
  - pushed commit `67f42db Deinitialize libkvm on backend shutdown`;
  - full `cargo test --manifest-path server-rust/Cargo.toml` passed:
    133 lib tests, 1 hwmon bin test, 2 main bin tests;
  - linked RISC-V backend built with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib`;
    installed binary hash on 133:
    `126bcf37b885266696b725c570e662a08a7ba26c274a5e11a23e43dc368e49eb`;
  - 133 was recovered by installing the fixed backend and rolling `kvm_system`
    back to validated hash
    `850bdc5e76fa240edf75b684f3d7021eb960e3b9d6c903efa09badb421da8332`, then
    rebooting;
  - clean-start MJPEG returned about `52.6 MiB` in 8 seconds;
  - controlled `S95nanokvm restart` with the fixed backend kept health OK and
    post-restart MJPEG returned about `51.6 MiB` in 8 seconds;
  - five observation cycles outside sandbox kept health OK, PIDs
    `NanoKVM-Server`, `kvm_system`, and `nanokvm-hwmon` stable, and no new
    `fail to allocate ion`, `Invalid buffer`, `segfault`, `signal 11`,
    `panic`, or `oops`;
  - kernel still logs `vb has already inited` around runtime restart, so avoid
    treating that line alone as fatal; the fatal symptom was the later VENC/ION
    allocation failure.
- Phase 3 passive Rust snapshot consumption slice:
  - C++ `kvm_system` now reads passive USB/HDMI/stream display state from
    `/tmp/nanokvm-hwmon-state.json` only when `/etc/kvm/rust_hwmon_enabled`
    exists; stale/missing/bad snapshots fall back to the old direct C++ reads;
  - migrated fields in this slice: USB UDC state, HID/mass-storage/RNDIS flags,
    HDMI active state, stream type, FPS, quality bucket, width, and height;
  - not migrated yet: Ethernet/Wi-Fi route/ping logic, OLED drawing, button
    handling, Wi-Fi AP provisioning, LT6911/I2C hardware code;
  - local C++ build hash:
    `23bf1be4549ee4d8d550819bf7e3e75c15f6b07a2173fb09ddcac1a48583f4a5`;
  - installed on 133 at `/kvmapp/kvm_system/kvm_system`, with previous test
    helpers backed up as `/kvmapp/kvm_system/kvm_system.pre-rusthwmon` and
    `/kvmapp/kvm_system/kvm_system.pre-rusthwmon-flush`;
  - 133 fallback check with flag absent: health OK; authenticated MJPEG returned
    about `53.7 MiB` in 8 seconds;
  - 133 active check with `/etc/kvm/rust_hwmon_enabled` present:
    `/tmp/kvm_system.log` showed `Rust hwmon passive state active`, then a short
    `fallback` during delayed hwmon restart, then `active` after the fresh
    snapshot;
  - active snapshot reported USB `configured`, HDMI active `vi_fps=60`, stream
    `mjpeg`, width `1920`, height `1080`;
  - final authenticated MJPEG returned about `54.0 MiB` in 8 seconds;
  - final state: `/tmp/kvm_system/kvm_system` hash `23bf1b...`,
    `NanoKVM-Server`, `kvm_system`, and `nanokvm-hwmon` alive, feature flag
    left enabled on 133 for ongoing soak, snapshot fresh;
  - final `dmesg` grep found no new `segfault`, `signal 11`, `panic`, `oops`,
    `fail to allocate ion`, or `invalid buffer`.
- Phase 3.2 network shadow snapshot slice:
  - Rust `nanokvm-hwmon` now writes a `network` section with normalized
    `eth0`, `wlan0`, `usb0`, and `tailscale0` state;
  - fields include existence, `UP`/`RUNNING`, carrier, route-state code/label,
    primary IPv4/IPv6, default IPv4/IPv6 route booleans, and gateway addresses;
  - default routes are parsed from `/proc/net/route` and
    `/proc/net/ipv6_route`; service/loopback IPv6 default routes with gateway
    `::` are filtered so the snapshot matches `ip -6 route show default`;
  - this is shadow-only: no ping, no Wi-Fi state writes, no C++ network cutover
    yet;
  - local tests passed:
    `cargo fmt --manifest-path server-rust/Cargo.toml --check` and
    `cargo test --manifest-path server-rust/Cargo.toml --bin nanokvm-hwmon`
    (`6 passed`);
  - direct cross-build with Maix GCC failed because the current Rust target emits
    ISA extensions old Maix `ld` does not understand; use the project wrapper:
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib server-rust/scripts/build-linked-libkvm.sh --bin nanokvm-hwmon`;
  - installed on 133 at `/kvmapp/hwmon/nanokvm-hwmon`, old helper backed up as
    `/kvmapp/hwmon/nanokvm-hwmon.pre-network-shadow`;
  - final installed helper hash:
    `27526584abb321568ac96090016209553281cc80f7a7dba52b7f400b392d3994`;
  - 133 validation: snapshot reports `eth0` routed via IPv4 gateway `10.0.87.5`
    and IPv6 gateway `fe80::9`, `usb0` addressed with no default route,
    `wlan0` and `tailscale0` missing; this matched `ip route` and
    `ip -6 route show default`;
  - health remained OK, `kvm_system`, `NanoKVM-Server`, and `nanokvm-hwmon`
    stayed alive, and authenticated MJPEG returned about `57.1 MiB` in 8
    seconds.
- Phase 3.3 Ethernet state cutover slice:
  - C++ `kvm_system` now consumes `network.interfaces.eth0` from
    `/tmp/nanokvm-hwmon-state.json` when `/etc/kvm/rust_hwmon_enabled` exists;
  - consumed fields are `route_state`, `primary_ipv4`, and
    `default_ipv4_gateway`, copied into the existing `kvm_sys_state.eth_*`
    fields used by OLED/status output;
  - when the Rust snapshot is accepted, `kvm_update_eth_state()` returns before
    the legacy NIC/IP/ping path, so old `ping -I eth0` route probes are not
    duplicated;
  - fallback remains active if the feature flag is absent, the snapshot is
    stale/malformed, or the `eth0` network object cannot be parsed;
  - local C++ build passed and produced hash
    `babd800f61789a12a6166d0cb3ca7224b6972865d7c24b1e19ab6451626545c0`;
  - installed on 133 at `/kvmapp/kvm_system/kvm_system`, previous helper backed
    up as `/kvmapp/kvm_system/kvm_system.pre-rust-eth-snapshot`;
  - after `S95nanokvm restart`, processes were alive:
    `/tmp/kvm_system/kvm_system`, `/tmp/server/NanoKVM-Server`, and
    `/kvmapp/hwmon/nanokvm-hwmon`;
  - active snapshot reported `eth0 route_state=3`, primary IPv4
    `10.0.87.133`, default IPv4 gateway `10.0.87.5`, and IPv6 gateway
    `fe80::9`;
  - five-second process sampling showed no `ping -I eth0`;
  - authenticated MJPEG returned about `53.1 MiB` in 8 seconds before expected
    curl timeout;
  - `dmesg` grep found no new `segfault`, `signal 11`, `panic`, `oops`,
    `fail to allocate ion`, or `invalid buffer`.
- Phase 4.1 authenticated Wi-Fi connect ownership slice:
  - Rust `connect_wifi` now owns the normal authenticated web/API path:
    write `/etc/kvm/wifi.ssid` and `/etc/kvm/wifi.pass`, remove any stale
    `/kvmapp/kvm/wifi_try_connect`, and run `/etc/init.d/S30wifi restart`
    through the allowlisted command wrapper;
  - AP setup `connect_wifi_no_auth` still writes `/kvmapp/kvm/wifi_try_connect`
    for the C++ OLED/AP state machine, so setup-screen transitions are not
    changed by this slice;
  - local tests passed:
    `cargo fmt --manifest-path server-rust/Cargo.toml --check`,
    `cargo test --manifest-path server-rust/Cargo.toml api::network::tests`,
    and full `cargo test --manifest-path server-rust/Cargo.toml`;
  - linked backend built with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib server-rust/scripts/build-linked-libkvm.sh`;
  - installed on 133 at `/kvmapp/server/NanoKVM-Server`, previous backend backed
    up as `/kvmapp/server/NanoKVM-Server.pre-wifi-rust-restart`;
  - installed backend hash:
    `fce9ba421303eb8a5baa4d6114b08c7ee95355fc256bc2fe04d4d518700c2283`;
  - `S95nanokvm restart-server` brought up `/tmp/server/NanoKVM-Server` with the
    same hash while existing `kvm_system` and `nanokvm-hwmon` stayed alive;
  - health OK, `/api/network/wifi` reported `supported=false` on 133, and
    authenticated POST with CSRF to `/api/network/wifi/connect` returned
    `{"code":-1,"msg":"wifi is not supported"}`;
  - after that negative-path check, `/etc/kvm/wifi_exist`,
    `/kvmapp/kvm/wifi_try_connect`, `/etc/kvm/wifi.ssid`, and
    `/etc/kvm/wifi.pass` were absent; no Wi-Fi restart processes were running;
  - authenticated MJPEG returned about `52.7 MiB` in 8 seconds before expected
    curl timeout;
  - `dmesg` grep found no new `segfault`, `signal 11`, `panic`, `oops`,
    `fail to allocate ion`, or `invalid buffer`;
  - positive Wi-Fi reconnect and OLED AP flow still need a device with `wlan0`;
    133 cannot validate that path.
- Phase 5 retained C++ hardware hardening / Rust hwmon default-on slice:
  - decision: OLED drawing, button handling, OLED Wi-Fi AP provisioning state,
    and LT6911/I2C HDMI handling stay in C/C++ for now; do not rewrite them
    purely for language uniformity;
  - C++ hardening fixes applied:
    bounded IP/gateway copy helpers, no out-of-bounds route newline trimming,
    IPv4 validation before legacy fallback `ping`, direct file writes for AP
    SSID/password instead of shell `echo`, `popen`/`fopen` failure handling in
    Wi-Fi/AP/HDMI/USB/stream fallback readers, concrete HID configfs checks
    instead of `access("hid.GS*")`, and safe OLED IP-change pointer handling;
  - `S95nanokvm` now creates `/etc/kvm/rust_hwmon_enabled` by default whenever
    `/kvmapp/hwmon/nanokvm-hwmon` exists, so Rust passive/ethernet snapshot
    consumption is default-on for packaged builds;
  - local checks passed:
    `sh -n kvmapp/system/init.d/S95nanokvm`,
    `git diff --check`, and MaixCDK C++ build;
  - built `kvm_system` hash:
    `72565ccddb21c9661a5e566bdc6e288e1d44171b5a258ca7b26dca4592fc6a6f`;
  - `S95nanokvm` hash:
    `dd949fb6c87ed3c6c41ad1f7baa0446491be015c629718c8a665cfbe0566aadc`;
  - installed both on 133, backed up previous helper as
    `/kvmapp/kvm_system/kvm_system.pre-cxx-hardening` and previous init scripts
    as `*.pre-rust-hwmon-default`;
  - deleted `/etc/kvm/rust_hwmon_enabled` before restart; `S95nanokvm restart`
    recreated it before starting `/tmp/kvm_system/kvm_system`;
  - after the delayed hwmon start, hashes matched installed binaries,
    `kvm_system`, `NanoKVM-Server`, and `nanokvm-hwmon` were alive, snapshot was
    fresh, `eth0 route_state=3`, and no `ping -I eth0` appeared in a five-second
    process sample;
  - authenticated `/api/health` OK and MJPEG returned about `57.5 MiB` in 8
    seconds before expected curl timeout;
  - `dmesg` grep found no new `segfault`, `signal 11`, `panic`, `oops`,
    `fail to allocate ion`, or `invalid buffer`;
  - remaining manual checks for this branch: OLED page/button behavior, HDMI
    hotplug/resolution display, positive Wi-Fi reconnect, and OLED AP
    provisioning on a device with `wlan0`.
- GitHub push warning `dependabot/19` could not be read through the current PAT
  (`403 Resource not accessible by personal access token`). Local audit pointed
  to Rust `anyhow 1.0.102`, advisory `RUSTSEC-2026-0190` / unsound
  `Error::downcast_mut()`, patched in `anyhow >=1.0.103`. `Cargo.lock` was
  updated to `anyhow 1.0.103`; `cargo audit` is now clean. Frontend
  `pnpm audit --audit-level moderate` was clean.
- 2026-07-03 recheck: local `gh auth status` reports no logged-in GitHub host,
  and the available GitHub connector exposes repo/issue/PR tools but not
  Dependabot alerts. `cargo audit` on a fresh `origin/main` worktree still
  reports only `anyhow 1.0.102` / `RUSTSEC-2026-0190`; current migration branch
  `cargo audit` is clean. `corepack pnpm audit --audit-level moderate` is clean
  for both `origin/main` and the migration branch.

## Latest Status Snapshot: RC5 Published And Raw Update Visible

- Full RC5 app/raw/SD release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc5`.
- GitHub latest release is `hardened-rust-rc5`, release name
  `Hardened NanoKVM 2.0.27 RC5`, `draft=false`, `prerelease=false`, target
  commit `36ee46d13d067f5c0b91ef8a28a70db8f30aec51`.
- Companion raw-system release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-0.2.19-raw.1`.
- Stable/preview raw channel metadata now points to `0.2.19-raw.1`; app
  preview metadata also points to the `2.0.27` app archive on
  `hardened-rust-rc5`.
- Downloaded GitHub metadata signatures verified OK after publish for:
  `releases/latest/download/latest.json`,
  `hardened-rust-preview/latest.json`,
  `hardened-system-stable/system-latest.json`, and
  `hardened-system-preview/system-latest.json`.
- Final local artifact hashes:
  - app archive:
    `dfc7c19fbdc2264b1df576f8b41ee10e99e0e03b5867fa028d76f3510865cde5`;
  - raw system archive:
    `bbc1c37a3df16ffafbd2e16da810e18fdd0dadff00c4b3776ac535744d1d6794`;
  - SD `.img.xz`:
    `23b76e03565aad122a8304cc97e989ac6453ac963b527ab419611e5e2a147984`.
- Public docs/code commits pushed:
  - `2c69cf4 Prepare full Hardened NanoKVM RC5 release`;
  - `36ee46d Lower raw update staging free-space default`.
- RC5 RAW manifest uses `required_free_bytes=671088640`, not the old 2 GiB
  staging default.

## Previous Status Snapshot: RC4 Published And Raw Update Visible

- Full RC4 app/raw/SD release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc4`.
- GitHub latest release is `hardened-rust-rc4`, release name
  `Hardened NanoKVM 2.0.26 RC4`, `draft=false`, `prerelease=false`.
- Companion raw-system release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-0.2.18-raw.1`.
- Stable/preview raw channel metadata now points to `0.2.18-raw.1`; app
  preview metadata also points to the `2.0.26` app archive on
  `hardened-rust-rc4`.
- Downloaded GitHub metadata signatures verified OK after publish for:
  `releases/latest/download/latest.json`,
  `hardened-rust-preview/latest.json`,
  `hardened-system-stable/system-latest.json`, and
  `hardened-system-preview/system-latest.json`.
- Final local artifact hashes:
  - app archive:
    `c1055a527e721fd88deaac396f4d814dd31905df372853ea79ec4d8c65319bf2`;
  - raw system archive:
    `5a466dee78c758dd143b150eba7c869a6db82aed4f5997630d5742ec37482d6a`;
  - SD `.img.xz`:
    `1a55fabd741c5766b61d2d6c6a2f0917e09f60ede0243ae6f9e34d8d999c146f`.
- Public docs/code commit pushed:
  `ba59e654576799a6347ba0691b79f3cb2a9e611d`
  (`Prepare Hardened NanoKVM RC4`) on branch
  `feature/new-buildroot-sysupgrade-lab`.

## Previous Status Snapshot: RC3 Published And Raw Update Visible

- Full RC3 app/raw/SD release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc3`.
- GitHub latest release is still `hardened-rust-rc3`, release name
  `Hardened NanoKVM 2.0.25 RC3`, `draft=false`, `prerelease=false`.
- Companion raw-system release is published:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-0.2.17-raw.1`.
- Reason for the companion raw-system tag: the deployed device backend trusts
  raw archive URLs and release-note URLs only under the `hardened-system-*`
  release namespace. Initial RC3 channel metadata pointed raw URLs at
  `hardened-rust-rc3`; device `.133` downloaded metadata but rejected it with
  `bad request: untrusted system update URL`. Metadata was regenerated and
  re-signed to point at `hardened-system-0.2.17-raw.1`.
- Stable and preview raw channel releases now carry the regenerated
  `system-latest.json`, `system-latest.json.sha256`,
  `system-latest.json.sig`, and `system-latest.json.sig.base64`.
- RC3 release assets were also updated so its `system-latest.*` files contain
  the trusted companion `hardened-system-0.2.17-raw.1` URLs.
- Device `10.0.87.133` final API check:
  - `/api/application/version`: current `2.0.25`, latest `2.0.25`;
  - `/api/system-update/version`: current `0.2.15-raw.1`;
  - `/api/system-update/check`: latest `0.2.17-raw.1`,
    `updateAvailable=true`, `error=null`;
  - `/api/system-update/raw-enabled`: `enabled=true`.
- Important artifact hashes:
  - app archive `hardened-nanokvm-kvmapp-2.0.25.tar.gz`:
    `8e381f3b7714078aff2620516f015af88e91b437e30f47ace498b52feb2aaef5`;
  - raw bundle `hardened-nanokvm-system-0.2.17-raw.1.tar.gz`:
    `2356fb7ebb283ecfa6199da29b15e0a5e245764787b3e775fce7603de74e2176`;
  - SD image `.img.xz`:
    `667c28aba1715b2367d159ff9eb9bb9641b69f414d5b290f1e96b4452c551e9e`.
- Size note for future context: SD `.img.xz` and raw update bundle differ in
  size because they are different containers. The SD asset is the full card
  image compressed as one `xz` stream; the raw bundle is a `tar.gz` containing
  separately gzip-compressed boot/rootfs partition payloads plus manifest and
  archive overhead.
- GitHub Pages is published at
  `https://woffko.github.io/Hardened_NanoKVM/`; the visible page no longer
  references `hardened-logo`, but the repo logo asset itself was not removed.
- Google site verification meta remains on the page:
  `8S4VCTY99VqIJ3lK7OZJqoMgtbUIvAi5t5Wkb0em4ek`.
- Public docs on `main` are updated:
  - `711a7c7 Update public docs for RC3 release`;
  - `502c27f Document RC3 system update channel target`.
- Release branch docs/code are updated and pushed:
  - `b2c430d Prepare Hardened NanoKVM RC3 release`;
  - `02efeda Document RC3 system update channel target`.
- `gh-pages` was updated and pushed:
  - `d00c051 Update RC3 project page`.
- Working tree status after this handoff update:
  - `/home/w0w/Hardened_NanoKVM-new-buildroot`: only `docs/handoff.md` should
    be dirty and local-only;
  - `/home/w0w/Hardened_NanoKVM-main`: clean on `main`;
  - `/tmp/hardened-nanokvm-gh-pages`: clean on `gh-pages`.
- Do not stage or push this handoff without review. It is intentionally a local
  operational note.

### RC1 Release Work: App 2.0.20 System Settings

- Source version bumped to `2.0.20`; RC1 release tag is
  `hardened-rust-rc1`.
- Added top-level `Settings > System`; `System Log` now lives inside it as a
  subsection.
- Implemented `Settings > System > System Log`:
  - UDP remote syslog forwarding via BusyBox `syslogd -R`;
  - a single `System Log` viewer backed by `/tmp/hardened-syslog/messages`
    (`tmpfs`, no steady SD-card writes);
  - configurable priority, RAM buffer size, rotations, compact output,
    timestamp stripping, and klogd console level;
  - `Send test log` action.
- Added backend APIs:
  - `GET/POST /api/system-log/config`;
  - `GET /api/system-log/messages?kind=system&lines=...`;
  - hidden/debug API support remains for `kind=kernel` and `kind=backend`,
    but those tabs were removed from the GUI because klogd already mirrors
    kernel messages into syslog and the separate views looked redundant;
  - `POST /api/system-log/test`.
- Added web-login audit entries to syslog through `/dev/log`:
  - success;
  - invalid credentials;
  - lockout/locked attempts.
- Added managed `/kvmapp/system/init.d/S01syslogd` and `S02klogd`; `S95nanokvm`
  now installs them into `/etc/init.d` during app startup/update.
- Implemented `Settings > System > Time`:
  - `GET/POST /api/system/time`;
  - `POST /api/system/time/sync`;
  - timezone selection from `/usr/share/zoneinfo`;
  - NTP enable/disable;
  - editable NTP server list with detected-router and `pool.ntp.org` defaults;
  - manual `ntpdate -u` sync.
- NTP remains enabled by default and uses public `0.pool.ntp.org` through
  `3.pool.ntp.org` unless changed by the user. Device check on `10.0.87.132`
  confirmed the existing `/etc/ntp.conf` was already using those pool servers.
- Added managed `/kvmapp/system/init.d/S49ntp`; it reads
  `/etc/kvm/time.json` and persists the NTP enabled/disabled state across
  reboot. Both `S95nanokvm` and the Rust backend runtime boot-script installer
  now include `S49ntp`.
- Implemented `Settings > System > Firewall`:
  - `GET /api/system/firewall`;
  - `POST /api/system/firewall`;
  - `POST /api/system/firewall/confirm`;
  - read-only rules viewer for `iptables-save`, `ip6tables-save`, and
    `nft list ruleset`;
  - managed `baseline` mode that preserves the current NanoKVM allow rules
    without source-range filtering;
  - default `moderate` mode that preserves baseline services but allows new
    inbound connections only from private IPv4, IPv4 link-local/loopback, IPv6
    ULA, IPv6 link-local, and IPv6 loopback source ranges;
  - guarded `restricted` mode that allows HTTPS, SSH, NTP, remote syslog,
    DHCP, established connections, and essential IPv6 control traffic;
  - guarded `paranoid` mode that is available only after HTTPS is enabled and
    a local HTTPS health check passes.
- Added managed `/kvmapp/system/init.d/S40firewall`; `S95nanokvm` no longer
  hardcodes iptables/ip6tables setup and now installs/runs `S40firewall`.
- While Paranoid mode is active, application and system online updates report
  that GitHub updates are blocked by the firewall instead of trying outbound
  network access. Offline application updates remain available.
- Local verification already run:
  - `cargo test --manifest-path server-rust/Cargo.toml system_log`;
  - `cargo test --manifest-path server-rust/Cargo.toml audit`;
  - `cargo test --manifest-path server-rust/Cargo.toml`;
  - `corepack pnpm --dir web build`;
  - `sh -n kvmapp/system/init.d/S01syslogd`;
  - `sh -n kvmapp/system/init.d/S02klogd`.
- Local verification after adding time controls:
  - `cargo test` from `server-rust/`;
  - `corepack pnpm build` from `web/`;
  - `sh -n kvmapp/system/init.d/S49ntp`.
- Local verification after adding firewall controls:
  - `cargo fmt`;
  - `cargo test` from `server-rust/`;
  - `corepack pnpm build` from `web/`;
  - `sh -n kvmapp/system/init.d/S40firewall`;
  - `git diff --check`.
- Device validation after adding time controls on `10.0.87.132`:
  - built RISC-V linked backend with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib`;
  - packaged and manually installed
    `build/artifacts/nanokvm-kvmapp-rust-2.0.20-system-time.tar`;
  - `/kvmapp/version` reports `2.0.20`;
  - `/api/health` reports Rust backend OK over HTTP;
  - `GET /api/system/time` reports NTP enabled, timezone `Etc/UTC`, servers
    `0.pool.ntp.org` through `3.pool.ntp.org`, detected gateway `10.0.87.5`,
    and includes `Europe/Tallinn` in timezone options;
  - disabling NTP through `POST /api/system/time` stopped `ntpd` and persisted
    `"ntpEnabled": false` in `/etc/kvm/time.json`;
  - enabling NTP through `POST /api/system/time` restarted `ntpd`;
  - changing timezone to `Europe/Tallinn` updated API current time to `EEST`;
  - timezone was restored to `Etc/UTC`, NTP was restored to enabled, and
    `ntpd` was confirmed running as `/usr/sbin/ntpd -g -p /var/run/ntpd.pid`.
- Device firewall validation on `10.0.87.132`:
  - built RISC-V linked backend with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib`;
  - packaged `build/artifacts/nanokvm-kvmapp-rust-2.0.20-firewall.tar.gz`;
  - manually installed it on the device after cleaning stale overlaid
    `/kvmapp/server` assets from an earlier manual tar-over install;
  - `/kvmapp/version` reports `2.0.20`;
  - `/api/health` reports Rust backend OK over HTTP;
  - `GET /api/system/firewall` from the device reports
    `effectiveMode=baseline`, `paranoidActive=false`,
    `paranoidAvailable=false`, `httpsEnabled=false`, and
    `preferred=iptables-legacy`;
  - `POST /api/system/firewall {"mode":"paranoid"}` is rejected with
    `enable HTTPS before enabling Paranoid Firewall mode`, as expected on this
    HTTP-only device;
  - baseline IPv4/IPv6 rules are active and policies remain `ACCEPT`.
- Follow-up firewall UX fix:
  - after live Paranoid testing, the GUI did not make the exit path obvious;
  - `.132` was restored through HTTPS API to `mode=baseline`,
    `paranoidActive=false`;
  - firewall GUI now shows a persistent **Disable Paranoid** action in the red
    Paranoid alert and a dedicated mode button whenever Paranoid is configured
    or active.
- Added Restricted Firewall mode:
  - available only with HTTPS enabled and locally healthy;
  - permits inbound HTTPS, outbound HTTPS, inbound SSH, outbound DNS, outbound
    NTP UDP/123, outbound remote syslog UDP on `/etc/kvm/syslog.json`
    `remotePort` (default 514), STUN UDP/3478 and UDP/19302, WebRTC/ICE UDP
    dynamic ports, DHCP, established connections, and essential IPv6 control
    traffic;
  - does not trigger the online-update blocked warning because outbound HTTPS
    remains available.
- Live-validated Restricted mode on `10.0.87.132`:
  - installed rebuilt app `2.0.20`;
  - enabled `mode=restricted`;
  - verified `effectiveMode=restricted`, `restrictedActive=true`,
    `paranoidActive=false`;
  - verified SSH and HTTPS stayed reachable;
  - verified IPv4/IPv6 policies became `DROP` with allowlist rules for 443,
    22, UDP/123, UDP/514, DHCP, established traffic, loopback, and IPv6
    control traffic;
  - restored `.132` to `mode=baseline` after the test.
- HTTPS/firewall follow-up:
  - disabling HTTPS now resets firewall mode to `moderate` before the backend
    restart, so HTTP access is not left behind HTTPS-only rules while public
    source ranges stay blocked;
  - TLS toggles now call `/etc/init.d/S95nanokvm restart-server`, which restarts
    only `NanoKVM-Server` and leaves `kvm_system` running;
  - live validation on `10.0.87.132` started from `mode=restricted` and
    `proto=https`;
  - previous validation on this older build changed `/etc/kvm/firewall.json` to
    `{"mode":"baseline"}`,
    changed `server.yaml` to `proto: http`, and HTTP health passed;
  - enabling HTTPS changed `server.yaml` back to `proto: https` and HTTPS
    health passed;
  - `kvm_system` stayed on PID `1638` through both TLS toggles.
- Moderate firewall mode validation on `10.0.87.132` (2026-07-02):
  - built linked RISC-V backend with
    `NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib`;
  - packaged and installed
    `build/artifacts/nanokvm-kvmapp-rust-firewall-moderate-test.tar.gz`;
  - device backup was written to
    `/data/codex-backups/kvmapp-firewall-moderate-before-20260702-095231.tar`;
  - `/kvmapp/version` reports `2.0.25-firewall-moderate`;
  - HTTPS `/api/health` reports Rust backend OK;
  - `POST /api/system/firewall {"mode":"moderate"}` returned
    `effectiveMode=moderate`, `moderateActive=true`,
    `restrictedActive=false`, `paranoidActive=false`;
  - final `/etc/init.d/S40firewall status` reports
    `mode=moderate effective=moderate https=enabled`;
  - IPv4 filter policy is `INPUT DROP`, `FORWARD DROP`, `OUTPUT ACCEPT`; new
    inbound connections are accepted only from `10.0.0.0/8`,
    `172.16.0.0/12`, `192.168.0.0/16`, and `169.254.0.0/16`, with loopback
    accepted only through `lo`;
  - IPv6 filter policy is `INPUT DROP`, `FORWARD DROP`, `OUTPUT ACCEPT`; new
    inbound connections are accepted only from `fc00::/7` and `fe80::/10`,
    with `::1/128` accepted only through `lo`;
  - local SSH and HTTPS from the `10.0.87.0/24` network remained reachable;
  - Tailscale daemon is installed and `tailscale netcheck` succeeds, but the
    node is not logged in: `tailscale status` reports `Logged out` and
    `tailscale ip` reports `NeedsLogin`, so real peer connectivity could not be
    validated without completing Tailscale login.
- Device validation on `10.0.87.132`:
  - manually installed `build/artifacts/nanokvm-kvmapp-rust-2.0.20.tar`;
  - `/kvmapp/version` reports `2.0.20`;
  - `/api/health` reports Rust backend OK over HTTP;
  - `POST /api/system-log/config` applied tmpfs logging;
  - `syslogd` runs as
    `/sbin/syslogd -n -O /tmp/hardened-syslog/messages -s 200 -b 1 -l 8`;
  - `klogd` runs as `/sbin/klogd -n -c 7`;
  - `POST /api/system-log/test` appears in the system log;
  - `GET /api/system-log/messages?kind=kernel` returns `dmesg` output;
  - invalid and successful web logins appear as `hardened-nanokvm-auth`
    syslog events.
- Follow-up validation before simplifying the viewer:
  - rebuilt linked RISC-V backend and reinstalled the `2.0.20` package on
    `10.0.87.132`;
  - `/api/system-log/messages?kind=backend` returns
    `/tmp/nanokvm-server.log`;
  - `/api/system-log/messages?kind=system` returns the tmpfs syslog tail and
    includes web login audit entries;
  - `/api/system-log/messages?kind=kernel` returns current `dmesg` ring-buffer
    output.
- Latest GUI change: removed the separate `Kernel (dmesg)` and `Backend` tabs;
  the visible viewer now shows only the unified tmpfs syslog stream.
- Observed follow-up: `/etc/inittab` respawns a `getty` for missing
  `/dev/ttyGS0`, producing repeated `auth.err getty[...]` entries. It is
  unrelated to the new syslog feature but should be cleaned before enabling
  remote syslog broadly.
- Still pending after app RC1:
  - publish a matching raw/SD image only when system-image changes are required
    or the user explicitly asks for a full system-image RC.

## Latest Releases

### App Release

- Current published app release: `2.0.25 RC3`
- Current source/test version: `2.0.25`
- GitHub tag:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc3`
- Artifact:
  `build/artifacts/hardened-nanokvm-kvmapp-2.0.25.tar.gz`
- SHA256:
  `8e381f3b7714078aff2620516f015af88e91b437e30f47ace498b52feb2aaef5`
- Includes the System settings navigation cleanup, Network moved under
  `Settings > System > Network`, protocol changes handled through a warned
  device reboot plus delayed redirect, the saved-video-mode fix, Appearance
  display-mode preservation, login firmware-version fix, Network/DNS layout
  cleanup, IPv6 DNS validation, and the expanded language set.
- `latest.json` metadata signature was verified locally and after downloading
  from GitHub. Public latest URL:
  `https://github.com/woffko/Hardened_NanoKVM/releases/latest/download/latest.json`.

### Raw System Release

- Current raw system channel: `0.2.17-raw.1`
- Companion GitHub tag used by device update metadata:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-0.2.17-raw.1`
- Full RC3 GitHub tag also carries a matching copy:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-rc3`
- Stable channel tag:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-stable`
- Preview channel tag:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-preview`
- Artifact:
  `build/system-updates/hardened-nanokvm-system-0.2.17-raw.1.tar.gz`
- SHA256:
  `2356fb7ebb283ecfa6199da29b15e0a5e245764787b3e775fce7603de74e2176`
- Built from the RC3 `2.0.25` SD rootfs. Raw payload manifest source commit:
  `b2c430d`.
- Base image: `2026-06-29-12-08-d88d58.img`.
- Kernel string: `5.10.4-tag-`.
- Buildroot release shown by the rootfs: `2023.11.2`.
- Security backport level: `Buildroot 2023.11.3 package backports`.
- Raw payloads are staged as `images/rootfs.sd.gz` and `images/boot.vfat.gz`;
  manifest `required_free_bytes` is `671088640` bytes instead of the old 2 GiB
  lab value.
- `system-latest.json` metadata signature was verified locally and after
  downloading from GitHub.
- Published on GitHub and verified through `hardened-system-stable` and
  `hardened-system-preview` metadata.
- Verified on `10.0.87.133` from the device API:
  `/api/system-update/check` reports current `0.2.15-raw.1`, latest
  `0.2.17-raw.1`, `updateAvailable=true`, and `error=null`.

### SD Image

- Latest SD image built: RC3 `2.0.25` / raw `0.2.17-raw.1`
- File name:
  `Hardened_NanoKVM_RC3_2_0_25_buildroot_2023_11_2_security_backports_Rev1_4_2_rust.img.xz`
- SHA256:
  `667c28aba1715b2367d159ff9eb9bb9641b69f414d5b290f1e96b4452c551e9e`

### Release Cleanup

- Preserve release history in `docs/release-archive.md`.
- Keep GitHub channel releases:
  - `hardened-rust-preview`
  - `hardened-system-preview`
  - `hardened-system-stable`
- Keep current visible releases:
  - `hardened-rust-rc3`
  - `hardened-system-0.2.17-raw.1`
  - `hardened-rust-rc1`
  - `hardened-rust-beta-2.0.19`
  - `hardened-system-0.2.15-raw.1`
- Keep `hardened-rust-beta-1.0.5` as the first Rust-only security beta
  milestone unless the user later asks for stricter cleanup.
- Delete only obsolete GitHub release entries/assets, not git tags.

### Historical Raw Reboot Fix Context

- Live device: `10.0.87.132`.
- User installed raw `0.2.11-raw.1` from the GUI.
- During install, ICMP stayed alive for a while but HTTP/HTTPS/SSH were closed
  because the raw writer had already stopped runtime services.
- No automatic reboot happened. The user power-cycled the device manually.
- After manual power-cycle, the device booted and the user confirmed the update
  in the GUI.
- Verified on device after power-cycle:
  - `/kvmapp/version`: `2.0.15`;
  - `/etc/kvm/system-version.json`: `0.2.11-raw.1`;
  - `/data` mounted from `/dev/mmcblk0p3`;
  - `/etc/kvm/system-update-boot-good.json` confirms healthy boot.
- `/data/hardened-system-raw-update.log` root cause:
  - writer stopped services;
  - preserved config;
  - remounted rootfs read-only;
  - started `streaming compressed ROOTFS to /dev/mmcblk0p2`;
  - then emitted repeated `Segmentation fault`;
  - it never logged `ROOTFS image write finished`,
    `raw system image update finished; rebooting`, or boot image write.
- Confirmed secondary symptom: `/dev/mmcblk0p1` SHA256 did not match the
  manifest boot image hash, so boot was not rewritten.
- Likely root cause: the writer copied BusyBox to `/tmp`, but BusyBox is
  dynamically linked and still used musl loader/libc from the rootfs being
  overwritten. After `/dev/mmcblk0p2` changed, later tool invocations crashed.
- Additional issue: preserve state was under `/tmp` and copying large optional
  files such as `/usr/sbin/tailscaled` could hit tmpfs space limits.
- Fixed in app `2.0.16`:
  - copy BusyBox, musl loader, and libc into
    `/tmp/hardened-system-raw-update`;
  - launch the writer through the copied loader with
    `--library-path /tmp/hardened-system-raw-update`;
  - keep preserved boot/rootfs config under the staging directory on `/data`,
    not under `/tmp`.

### 2026-07-01 Raw Update Status

- App `2.0.17` fixed raw staging on `/data` by avoiding forced `sync_all()` on
  large archive members.
- Raw `0.2.13-raw.1` installed on `10.0.87.132`, wrote rootfs/boot, and
  rebooted, but its writer tried to mount `/dev/mmcblk0p2` for restore while
  the old rootfs was still `/`. Log symptom:
  `mount ... /tmp/hardened-root-preserve-mount failed: Resource busy`.
- App `2.0.18` / raw `0.2.14-raw.1` deferred root restore to `S01fs` on first
  boot and added automatic confirm after backend health succeeds.
- Live `0.2.14-raw.1` validation on `10.0.87.132`:
  - `/kvmapp/version`: `2.0.18`;
  - `/etc/kvm/system-version.json`: `0.2.14-raw.1`;
  - `/data/hardened-system-raw-update.log` contained
    `restoring preserved root configuration after raw system update boot` and
    `preserved root configuration restore finished`;
  - `/tmp/system-update-watchdog.log` contained
    `pending system update auto-confirmed`.
- Minor restore bug found in that same log: preserved root-level files such as
  `/device_key` used an empty destination directory and logged
  `failed to create restore directory for /device_key`.
- App `2.0.19` / raw `0.2.15-raw.1` fixes the `/device_key` restore path and
  changes post-write reboot to kernel sysrq (`s`, `u`, `b`) instead of relying
  on launching `reboot` from the already overwritten live rootfs.
- `10.0.87.132` was updated to app `2.0.19`, staged raw `0.2.15-raw.1`, and
  completed raw install with backup id `raw-1782880745`.
- Final `10.0.87.132` state:
  - `/kvmapp/version`: `2.0.19`;
  - `/etc/kvm/system-version.json`: `0.2.15-raw.1`;
  - `/api/system-update/status`: `staged=null`, `pending=null`,
    `progress=null`;
  - `/data/hardened-system-raw-update.log` showed rootfs/boot writes,
    deferred root restore, and first-boot preserve restore without the old
    `/device_key` restore-directory error;
  - `/tmp/system-update-watchdog.log` showed
    `pending system update auto-confirmed`.
- Do not touch `10.0.87.133`; the user was manually testing that device.

## Device State

### `10.0.87.132`

- Web: `admin/admin1234`
- Static IPv4 was set through `/boot/eth.nodhcp`:
  `10.0.87.132/24 10.0.87.5`; DNS is `10.0.87.5`.
- Previously appeared as DHCP `10.0.87.55`.
- Last verified before compressed raw update test:
  - `/api/health`: OK
  - `/api/application/version`: `current=2.0.11`, latest app channel now
    `2.0.12`
  - `/api/system-update/check`: `current=0.2.5-raw.1`,
    latest raw channel now `0.2.8-raw.1`, `updateAvailable=true`
  - first raw download of `0.2.7-raw.1` failed before install because the
    uncompressed staged rootfs exhausted rootfs space; only
    `/data/.hardened-kvmcache/system-update` was removed afterward.
  - raw install has not been started yet for `0.2.8-raw.1`.

Root cause of login loop:

- backend session was valid;
- frontend only checked JS-readable `nano-kvm-csrf`;
- after IP/protocol/browser-state changes, CSRF cookie could be missing while
  HttpOnly session cookie was still valid;
- fixed by recovering CSRF from `GET /api/auth/account`.

### `10.0.87.133`

- Web: `admin/admin1234`
- Static IPv4 was set through `/boot/eth.nodhcp`:
  `10.0.87.133/24 10.0.87.5`; DNS is `10.0.87.5`.
- Previously appeared as DHCP `10.0.87.42`.
- First account setup was required and was completed as `admin/admin1234`.
- Last verified before compressed raw update test:
  - `/api/health`: OK
  - `/api/application/version`: `current=2.0.11`, latest app channel now
    `2.0.12`
  - `/api/system-update/check`: `current=0.2.5-raw.1`,
    latest raw channel now `0.2.8-raw.1`, `updateAvailable=true`
  - raw install has not been started yet.

## Important Implementation Notes

- App updates replace `/kvmapp` only.
- Raw system updates write SD-card boot/rootfs partitions and are lab-only.
- Raw system updates must be launched only from app `2.0.12` or newer for
  compressed raw payloads. Older `2.0.11` app updaters preserve settings but do
  not understand `images/rootfs.sd.gz`.
- Raw system updates must be launched only from app `2.0.11` or newer. Older
  app updaters write the raw boot/rootfs images without restoring user
  settings.
- Do not delete GitHub channel releases:
  - `hardened-rust-preview`
  - `hardened-system-preview`
  - `hardened-system-stable`
- GUI update checks depend on those channel tags/assets.
- README now has a dedicated `How Updates Work` section describing app updates
  versus raw system updates.
- Security and backend docs should describe the Go backend as historical
  upstream/reference context only. Current release artifacts are Rust-only and
  validators reject legacy Go backend files and backend-switch scripts.

## Latest Fixes In Code

### `2.0.12`

- Raw system manifests now support gzip-compressed raw partition payloads:
  `images/rootfs.sd.gz` and `images/boot.vfat.gz`.
- Raw updater validates compressed payloads with `gzip -t` and streams
  `gzip -dc` directly to `/dev/mmcblk0p2` and `/dev/mmcblk0p1`.
- Raw bundle builder emits uncompressed image size/hash plus compressed
  stored size/hash fields.
- This fixes the observed `No space left on device` staging failure on
  `10.0.87.132` where `/data` was not mounted separately and rootfs had only
  about 698 MiB free after cleaning the failed staging cache.
- Local validation:
  - `sh -n scripts/create-raw-system-update-bundle.sh`
  - `cargo fmt`
  - `cargo test` in `server-rust` passed: 116 lib tests and 2 main tests.

### `2.0.11`

- Raw updater now preserves user configuration before raw partition writes and
  restores it onto the new boot/rootfs before reboot.
- Preserved boot files include static IPv4/DNS, IPv6 mode/config, stable MAC,
  hostname prefix/name, USB gadget flags, Wi-Fi seed files, SSH one-shot flag,
  and custom logo.
- Preserved rootfs state includes `/etc/kvm` user settings, web account,
  session secret, TLS certificate/key, terminal/session config, root/web
  password files, SSH host keys, hostname/machine-id, `device_key`,
  Tailscale/PicoClaw state, and installed optional Tailscale/PicoClaw runtime
  binaries/init scripts.
- The updater deliberately does not restore old sysupgrade state files such as
  `system-version.json`, `system-update-pending.json`, rollback markers, or the
  system-update public key. The new rootfs must keep its own version/key files
  so the device reports the new system version after reboot.
- Regression test added:
  `raw_image_updater_preserves_user_configuration`.
- Local validation:
  - `cargo fmt`
  - `cargo test` in `server-rust` passed: 116 tests.

### Current Live Issue: `2.0.9` / `0.2.5-raw.1`

- Published app `2.0.9` and raw system `0.2.5-raw.1` should be treated as
  broken until superseded.
- Observed after raw update:
  - devices still boot and get SSH;
  - web UI does not answer because `NanoKVM-Server` starts before the vendor
    CVI hardware modules are loaded;
  - `/tmp/nanokvm-server.log` shows missing `/dev/cvi-sys`, `/dev/cvi-base`,
    and `/proc/cvitek/vb`;
  - `/etc/init.d` in the raw image only contained the Hardened overrides
    `S03usbdev`, `S30eth`, and `S95nanokvm`.
- Root cause:
  - raw/SD build only installed three init scripts into `/etc/init.d`;
  - original stock rootfs has required hardware boot scripts such as
    `S00kmod`, `S01fs`, and `S15kvmhwd`;
  - without those scripts, Sophgo/CVI modules and hardware detection do not run.
- Upstream/stock comparison:
  - `/kvmapp/system/init.d` contains `S03usbhid`;
  - stock `/etc/init.d` does not include `S03usbhid`;
  - therefore `S03usbhid` must remain available as an alternate HID-only mode
    script but must not be auto-installed into `/etc/init.d`.
- Device notes:
  - `10.0.87.48`: reachable by SSH as `root/root`; manual
    `/kvmapp/system/init.d/S00kmod start` plus `/etc/init.d/S95nanokvm restart`
    restored HTTP for the current boot.
  - `10.0.87.60`: reachable by SSH as `root/root` and shows the same missing
    init script symptom; still needs the same temporary boot-script repair.
- Required fix:
  - define a stock-compatible boot-safe init script list;
  - install `S00kmod`, `S01fs`, `S03usbdev`, `S15kvmhwd`, `S30eth`,
    `S30wifi`, `S50avahi-daemon`, `S50sshd`, `S80dnsmasq`, and
    `S95nanokvm`;
  - leave base-rootfs services such as `S50ssdpd` to the base image unless a
    later change deliberately replaces them;
  - keep optional Hardened scripts `S96picoclaw` and `S98tailscaled` available
    only if they are intentionally installed as services;
  - do not auto-install `S03usbhid`;
  - update SD/raw builder, runtime self-healing sync, and rootfs validator;
  - publish a replacement app/raw/SD release and mark `2.0.9` as broken or
    prerelease on GitHub rather than leaving it as a normal latest release.

### `2.0.9`

- Adds explicit IPv6 controls under Settings > Network:
  - Disabled;
  - SLAAC;
  - DHCPv6;
  - Manual IPv6 address/prefix/router.
- IPv6 defaults to Disabled when `/boot/eth.ipv6.mode` is missing.
- `S30eth` applies IPv6 separately from IPv4 and uses `ip -4 addr flush` so
  IPv6 settings do not erase IPv4 state and vice versa.
- A bundled BusyBox `udhcpc6` client was added at
  `/kvmapp/system/bin/udhcpc6`.
- DHCPv6 uses `/kvmapp/system/network/udhcpc6.script`, a Hardened hook that
  only manages IPv6/DNS and does not call the stock `udhcpc` script that resets
  `eth0` to `0.0.0.0`.
- Backend route: `GET/POST /api/network/ipv6`.
- GUI shows an Apply button for `needs-apply`, e.g. when desired mode is
  Disabled but IPv6 is still active after an app update.
- Local checks passed:
  - `sh -n kvmapp/system/init.d/S30eth`
  - `sh -n kvmapp/system/init.d/S95nanokvm`
  - `sh -n kvmapp/system/network/udhcpc6.script`
  - `cargo fmt --manifest-path server-rust/Cargo.toml`
  - `cargo check --manifest-path server-rust/Cargo.toml`
  - `corepack pnpm --dir web exec tsc --noEmit`
- Device `10.0.87.132` was tested before the DHCPv6 hook fix. The stock
  DHCPv6 script reset IPv4 and made the device unreachable by HTTP/SSH. After
  the local fix, repeat device validation only after the user restores/reboots
  the device.

### `2.0.8`

- Root cause: `kvm_system` parsed `/etc/kvm/oled_sleep` into `uint8_t`, so UI
  values of 300 seconds and higher overflowed before the sleep comparison.
- Source fix is in `support/sg2002/kvm_system/main/lib/oled_ui/oled_ui.cpp`
  and `support/sg2002/kvm_system/main/include/config.h`: OLED sleep is now
  parsed into a 32-bit value, the input buffer is terminated, and values above
  one day fall back to the default.
- Local MaixCDK build now produces
  `support/sg2002/kvm_system/dist/kvm_system_release/kvm_system`.
- Package `build/artifacts/hardened-nanokvm-kvmapp-2.0.8.tar.gz` was built
  with `KVM_SYSTEM_SOURCE` pointing at that rebuilt helper.

### `2.0.7`

- `server-rust/src/api/account.rs`
  - `GET /api/auth/account` returns `csrfToken` and `expiresAt`.
- `web/src/components/auth.tsx`
  - `ProtectedRoute` tries `/api/auth/account` before redirecting to login
    when CSRF cookie is missing.
- `web/src/lib/cookie.ts`
  - CSRF cookie is set/removed with explicit path `/` and `SameSite=Lax`.

### `2.0.6`

- HTML shell responses now include `Cache-Control: no-store, max-age=0`.
- Manual network Apply schedules redirect before waiting for the POST to finish.

### `2.0.5`

- Full Manual wired IP/subnet/router/DNS editing.
- Static network state persisted in `/boot/eth.nodhcp`.
- Stable wired `eth0` MAC persisted in `/boot/eth.mac`.

## Suggested Next Steps

1. Clean obsolete/internal/broken GitHub release entries after confirming this
   archive is pushed.
2. Test app `2.0.15` and raw `0.2.11-raw.1` on one device before moving more
   devices to the raw channel.
3. Do not retry raw install from `0.2.10-raw.1`; it lacks the idempotent
   `/data` init guard and `/etc/kvm.disk0` preservation.
4. Validate IPv6 Disabled, SLAAC, DHCPv6, and Manual modes on hardware after a
   device is on a known-good image.

## 2026-06-30: 2.0.14 / 0.2.10 Raw Update Lab State

Current branch:

- `feature/new-buildroot-sysupgrade-lab`
- latest pushed commit: `7891449 Harden raw system update staging`

Implemented and pushed:

- app `2.0.14`;
- raw system update `0.2.10-raw.1`;
- SD image
  `Hardened_NanoKVM_beta_2_0_14_buildroot_2023_11_2_security_datafix_Rev1_4_2_rust.img.xz`.

Important fix details:

- Raw install now refuses to start if the staged payload directory is on the
  root filesystem. On these devices `/data` must be mounted from
  `/dev/mmcblk0p3`; staging on `/dev/mmcblk0p2` is unsafe because rootfs would
  be read while it is being overwritten.
- `S01fs` now mounts `/dev/mmcblk0p3` on `/data` with explicit `exfat` and
  retries. First-time `mkfs.exfat` is no longer launched in the background.
- Raw writer status now marks a stopped raw writer as failed instead of leaving
  an indefinite stale reboot-required state.
- Raw writer stops more runtime services before the rootfs read-only remount
  attempt and reboots cleanly on pre-write failure after services were stopped.

Build note:

- Do not run `make rust-kvmapp` without `RUST_TARGET`; it builds an x86-64 host
  binary and causes `Exec format error` on NanoKVM.
- In this checkout, `server-rust/sysroot/lib` is missing. The working RISC-V
  build command used for `2.0.14` was:

```sh
NANOKVM_SYSROOT_LIB=/home/w0w/Hardened_NanoKVM/server-rust/sysroot/lib \
  server-rust/scripts/build-linked-libkvm.sh
RUST_TARGET=riscv64gc-unknown-linux-musl \
  APP_VERSION=2.0.14 \
  scripts/package-rust-kvmapp.sh
```

Published artifacts:

- App release:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-rust-beta-2.0.14`
- Raw system release:
  `https://github.com/woffko/Hardened_NanoKVM/releases/tag/hardened-system-0.2.10-raw.1`
- System stable channel now reports `0.2.10-raw.1`.
- `.132` device confirmed it could query GitHub and see latest
  `0.2.10-raw.1`.

Device `10.0.87.132` before raw install:

- app manually restored to correct RISC-V `2.0.14`;
- `/data` mounted from `/dev/mmcblk0p3`;
- rootfs free space about 698 MiB;
- `/data` free space about 20.7 GiB;
- system status clean: no staged, pending, or progress before downloading
  `0.2.10`.

Raw update attempt on `10.0.87.132`:

- download/stage of `0.2.10-raw.1` succeeded;
- staged cache was about 541 MiB on `/data` p3;
- install endpoint returned HTTP 200 with pending `raw-1782829729`;
- device then dropped SSH/HTTP, later responded to ICMP at `10.0.87.132`, but
  ports 22 and 80 remained refused for several minutes.

Current blocker:

- `10.0.87.132` appears to boot far enough for network/ICMP, but SSH and web do
  not start after raw `0.2.10` install.
- No SSH access is currently available, so next diagnosis likely needs physical
  SD-card inspection or another device/serial path.
- Most likely areas to inspect on the written card:
  - `/etc/init.d/S01fs`, `/etc/init.d/S50sshd`, `/etc/init.d/S95nanokvm`;
  - `/etc/kvm` preserved state, especially SSH stop flags and raw pending files;
  - `/data` p3 contents and whether it mounts during boot;
  - `/tmp` logs are unavailable after reboot, so inspect persistent files only.

Follow-up source fix:

- commit `c2ee893 Make raw data partition handling idempotent`;
- app version bumped to `2.0.15`;
- `S01fs` now creates/formats p3 only when `/dev/mmcblk0p3` is actually absent;
- if `/dev/mmcblk0p3` already exists, `S01fs` only restores
  `/etc/kvm.disk0` and mounts `/data`;
- raw updater now preserves/restores `/etc/kvm.disk0`;
- validation:
  - `sh -n kvmapp/system/init.d/S01fs`: passed;
  - `cargo fmt --manifest-path server-rust/Cargo.toml`: passed;
  - `cargo test --manifest-path server-rust/Cargo.toml`: passed, 116 lib tests
    plus 2 main tests.

Device recovery after the `0.2.10-raw.1` attempt:

- `10.0.87.132` reappeared through DHCP as `10.0.87.44`.
- The device was first-setup only; web login returned
  `password setup required`, so the account was recreated as
  `admin/admin1234`.
- Scripts API diagnostics showed:
  - app `2.0.14`;
  - system `0.2.10-raw.1`;
  - hostname `kvm-48ad`;
  - `/boot/eth.nodhcp` empty;
  - `/data` mounted from p3, but `/tmp/data-mount.log` showed p3 had been
    formatted during boot;
  - SSH was disabled, but `/etc/init.d/S50sshd permanent_on` from a script
    started it successfully.
- App `2.0.15` was manually copied to `/kvmapp`; `S01fs`, `S30eth`, and
  `S95nanokvm` were copied to `/etc/init.d`.
- Static network was restored:
  - `/boot/eth.nodhcp`: `10.0.87.132/24 10.0.87.5`;
  - DNS mode manual with server `10.0.87.5`.
- Final verified state:
  - HTTP `/api/health`: OK, Rust backend;
  - web login `admin/admin1234`: OK;
  - `/api/application/version`: current `2.0.15`, latest `2.0.14`
    at the time of manual repair, before `2.0.15` was published;
  - `/api/system-update/status`: current `0.2.10-raw.1`, no staged/pending
    update;
  - `/api/vm/ssh`: enabled;
  - `/api/network/dns`: `10.0.87.132/24`, gateway/DNS `10.0.87.5`.
- Second device search was paused by request until after this recovery.

Second device recovery:

- `10.0.87.133` later reappeared on the network with ICMP, SSH 22, and HTTP
  80 available; HTTPS 443 was closed.
- `/api/health` returned the Rust backend status.
- Web login `admin/admin1234` worked.
- Initial state:
  - app `2.0.13`;
  - system `0.2.5-raw.1`;
  - static network already set to `10.0.87.133/24`, gateway/DNS
    `10.0.87.5`;
  - SSH enabled;
  - raw system updates disabled.
- Local `build/artifacts/hardened-nanokvm-kvmapp-2.0.15.tar.gz` was copied to
  `/tmp` and installed manually.
- BusyBox `tar` on this image does not support `-z`, and `tar -a` reported
  invalid tar magic for the gzip archive; use:
  `gzip -dc archive.tar.gz | tar -xf - -C DEST`.
- `/kvmapp` was replaced with `2.0.15`; fixed `S01fs`, `S30eth`, and
  `S95nanokvm` were copied to `/etc/init.d`.
- Static network was restored/confirmed:
  - `/boot/eth.nodhcp`: `10.0.87.133/24 10.0.87.5`;
  - DNS mode manual with server `10.0.87.5`.
- Device was rebooted once; it dropped off the network briefly and returned on
  `10.0.87.133`.
- Final verified state:
  - HTTP `/api/health`: OK, Rust backend;
  - web login `admin/admin1234`: OK;
  - `/api/application/version`: current `2.0.15`, latest `2.0.14`
    at the time of manual repair, before `2.0.15` was published;
  - `/api/system-update/status`: current `0.2.5-raw.1`, boot health healthy;
  - `/api/vm/ssh`: enabled;
  - `/api/network/dns`: static `10.0.87.133/24`, gateway/DNS `10.0.87.5`;
  - `/data` mounted from `/dev/mmcblk0p3`;
  - installed `S01fs` is idempotent and does not create/format p3 when
    `/dev/mmcblk0p3` already exists.

Mobile pointer follow-up on device 133:

- Web-only build deployed to `10.0.87.133` after disabling mobile
  auto-panning and correcting the relative pointer speed handling.
- Deployed `index.html` sha256:
  `c7fdbdc9ca341a7c0358e513ff17c8556494ebb82a25c54c1a864dce0e1d2366`.
- Bundle in use from HTTPS: `/assets/index-B4LzCy0B.js`.
- Relative/trackpad pointer sensitivity now defaults to `1x`; the UI slider
  still allows `0.25x` to `8x`.
- Large relative mouse deltas are split into small HID movement packets in both
  desktop relative mode and mobile trackpad mode, so high sensitivity should no
  longer send one huge movement report that looks like a coarse jump.
- Mobile absolute-mode screen auto-panning remains disabled for this test,
  because the previous direction felt inverted on Android.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html` and `/kvmapp/server/web/index.html` on 133
    match the local sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile pointer smoothing follow-up:

- Checked PiKVM mouse handling in `pikvm/kvmd`:
  - `web/share/js/kvm/mouse.js` stores relative deltas and sends them on a
    configurable `hid.mouse.rate` timer, default `10 ms`;
  - each relative delta is clamped to the HID signed-byte range `-127..127`;
  - with `hid.mouse.squash` enabled, PiKVM sends a delta list and the backend
    squashes adjacent deltas without exceeding `-127..127`;
  - backend validation uses `MouseDelta.MIN=-127` and `MouseDelta.MAX=127`.
- Applied a NanoKVM-safe variant instead of the previous immediate packet burst:
  - relative desktop and mobile trackpad movement now accumulate fractional and
    boosted deltas;
  - each outgoing HID movement report is clamped to `16 px` per axis;
  - remaining movement drains on an `8 ms` timer while movement continues;
  - mobile trackpad clears the remaining accumulator on gesture end/cancel so
    the cursor does not continue moving after the finger is lifted.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `64690c0419ed5aa6e8313d69d283574549ad0a8f76684690044a9e17e0ae3e35`.
- Bundle in use from HTTPS: `/assets/index-D-FCKp3d.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile TouchSync resolution/i18n follow-up:

- TouchSync now resets the mobile absolute HID position to center when the
  configured resolution changes, releases any pending long-press button state,
  and re-centers the drawn mobile cursor overlay. This is intended to avoid the
  Android/local cursor and remote cursor diverging after switching to 640x480.
- The mobile cursor overlay now observes `#screen` resize/remount events with
  `ResizeObserver`/`MutationObserver`, so it resyncs when the video element is
  recreated or resized without a browser viewport resize.
- Locale audit was completed across all shipped locales after `locale-extras`
  is applied. Missing Hardened strings for mobile keyboard/TouchSync, USB
  wakeup, USB reconnect, upload/download states, first setup/recovery,
  terminal unlock/session lock, and system/raw update UI were translated. The
  audit reported complete key coverage and no fresh English fallback leaks for
  the current mobile/download/USB/system strings.
- Web-only build deployed to `10.0.87.133` from
  `/data/nanokvm-web-touchsync-i18n.tar` into both `/tmp/server/web` and
  `/kvmapp/server/web`.
- Deployed `index.html` sha256:
  `b44170fe45a7bbc0a635bfc3e10a3baab8838733a2589e4c3337a5e72d99c77c`.
- Bundle in use from HTTPS: `/assets/index-BO1rA_Rl.js`;
  stylesheet `/assets/index-C4f66605.css`.
- Verification performed:
  - i18n audit script: complete key coverage, no current English fallback leaks;
  - locale value audit: all flattened locale values are strings;
  - `npm run build` in `web`: passed;
  - `cargo check --manifest-path server-rust/Cargo.toml`: passed;
  - `/tmp/server/web/index.html` and `/kvmapp/server/web/index.html` match the
    sha256 above;
  - `https://10.0.87.133/` serves `/assets/index-BO1rA_Rl.js`;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile pointer smoothing adjustment after device test:

- User reported movement was better but still not smooth enough.
- Reduced the pointer sensitivity slider maximum from `8x` (`800`) back to
  `2x` (`200`).
- `localStorage` loader/setter now clamps previously stored high sensitivity
  values to `2x`, so existing browsers that saved `8x` will not keep using it.
- Reduced the maximum relative HID movement report from `16 px` to `8 px` per
  axis to reduce host-side mouse acceleration jumps.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `1737b164a2ca3e7177d6e8315c18191a554fa807664265985763fcfbb8449f1f`.
- Bundle in use from HTTPS: `/assets/index-3Rlqqm76.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile cursor overlay follow-up:

- Android/Chrome does not expose a normal system cursor for finger touch input,
  so the mobile UI now draws its own local cursor overlay above
  `#kvm-pointer-surface`.
- The overlay follows touch/pen input, ignores physical mouse input, hides after
  about `900 ms`, and sits below menus/virtual keyboards (`z-index: 900`) so it
  does not block the UI.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `7b9693effff8d6f5dfd5686a14071e29cc0c4cbd51ce967efb97776988037312`.
- Bundle in use from HTTPS: `/assets/index-CckPm-xR.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile cursor/trackpad smarter follow-up:

- Reworked the mobile cursor overlay so it no longer listens to raw touch
  position on the whole `kvm-pointer-surface`.
- Direct-touch/absolute mode now publishes the same normalized screen
  coordinates that are sent to absolute HID, so the overlay is clamped to the
  actual `#screen` rectangle.
- Trackpad/relative mode now keeps a synthetic remote cursor position and moves
  the overlay by the same intended remote deltas that are sent to relative HID.
  This is still an estimate because host mouse acceleration and video latency
  can drift, but it is no longer just the finger position.
- Mobile Trackpad movement now scales finger deltas by
  `remote_resolution / rendered_screen_size` with an upper cap of `8x`, so a
  high-resolution remote screen compressed onto a phone does not feel
  underdriven. HID reports are still clamped to small packets, and the drain
  timer was shortened from `8 ms` to `4 ms`.
- Pointer coalescing is used when Chrome provides coalesced touch pointer
  events, reducing coarse movement jumps from low-frequency touchmove delivery.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `2adf6d5bfea15e8202fbac75fa8a55d321309dfc2418977ebf6b9c6578f79f49`.
- Bundle in use from HTTPS: `/assets/index-B80_9xPg.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile trackpad Chrome Android cancellation follow-up:

- User reported that in Chrome Android the local cursor appeared, disappeared
  during an active finger drag, and the remote cursor only moved in short bursts
  until the finger was moved again.
- Likely cause is Chrome cancelling the pointer stream when the nearest
  overflow scroll container handles the gesture as page/screen panning.
- Trackpad mode now installs `pointermove`/`pointerup`/`pointercancel`
  listeners on `window`, treats `lostpointercapture` as non-fatal, and applies
  `touch-action: none`, `overscroll-behavior: contain`, and `user-select: none`
  to the shared pointer surface, actual `#screen`, and the
  `[data-kvm-screen-scroll]` container for the lifetime of trackpad mode.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `f66191a7979bd1fa7bc0645de88f2289ea5b5505a6e6be836fdc22c20f594caf`.
- Bundle in use from HTTPS: `/assets/index-DyrIdmQ1.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile direct-touch offset follow-up:

- User confirmed direct touch is smooth and synchronized, but the touched cursor
  is hidden under the finger while Trackpad prediction can drift from the real
  host cursor.
- Direct-touch mobile touch coordinates now use a visible cursor point offset
  `72 px` above the finger. The absolute HID report and local overlay both use
  this offset/clamped point, so the remote cursor remains synchronized with the
  visible mobile cursor while staying out from under the finger.
- Desktop mouse absolute handling is unchanged.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `23917d2968c494ec1278d3f376391029d354bbfded22b9f766d64f1d26e14187`.
- Bundle in use from HTTPS: `/assets/index-BOuSxCFS.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile absolute-relative pointer follow-up:

- User confirmed the previous hybrid moved smoothly, but requested that lifting
  and touching elsewhere must keep the cursor at the last remote position
  instead of warping to the new touch point.
- Mobile direct-touch now behaves as relative input with absolute HID output:
  touch start only shows the saved cursor position, finger movement updates the
  saved cursor by screen-relative deltas, and taps click at the current saved
  cursor position. The remote still receives absolute HID coordinates, so the
  remote cursor remains synchronized without trackpad-style relative HID drift.
- Mobile movement no longer sends left-button-down while moving; it moves the
  cursor only. Tap still sends left click, long-press still sends right click.
- The local mobile cursor icon was reduced from `30 px` to `22 px`.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `e39e3360149649368e5aecf1089e7d2fdd3aa7c97dd50f9216fa00c1aa1a9926`.
- Bundle in use from HTTPS: `/assets/index-CAEPK0vF.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile direct surface-touch follow-up:

- Mobile direct touch absolute-relative mode now captures touch gestures on the
  full `#kvm-pointer-surface` instead of only the rendered `#screen`.
- Desktop mouse absolute handling remains bound to `#screen`.
- Relative touch movement is still scaled by the actual `#screen` rectangle, so
  dragging through black letterbox/pillarbox areas continues moving the saved
  remote cursor without changing pointer speed.
- The touch surface, `#screen`, and `[data-kvm-screen-scroll]` container all get
  temporary `touch-action: none`, `overscroll-behavior: contain`, and
  `user-select: none` while the component is active, matching the Trackpad
  Chrome Android cancellation guard.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `d41b709b9f9726d76711d0957264408b26865900460aa8dad848d71983dc29d2`.
- Bundle in use from HTTPS: `/assets/index-vRa0JNnz.js`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

Mobile TouchSync menu/default follow-up:

- The working mobile hybrid pointer mode is now named `TouchSync`.
- Mobile runtime always uses TouchSync (`Absolute` with relative touch input and
  absolute HID output plus the mobile cursor overlay). Old saved
  `nano-kvm-mobile-pointer-mode=trackpad` values are ignored because the mobile
  runtime no longer reads that selector.
- Mobile Mouse menu no longer shows cursor style, desktop mouse mode, Trackpad
  vs Direct touch selection, pointer sensitivity, or HID-Only mode. It shows
  the TouchSync status/description, wheel direction, wheel speed, and Reset HID.
- Desktop Mouse menu keeps cursor style, desktop mouse mode, pointer speed,
  wheel settings, HID-Only mode, and Reset HID.
- Web-only build deployed to `10.0.87.133`.
- Deployed `index.html` sha256:
  `2c4e92d852e69f0c33540d376511c8090ad70f4be3fd0c844ef6f612b2965bde`.
- Bundle in use from HTTPS: `/assets/index-BzqYgh36.js`;
  stylesheet `/assets/index-C4f66605.css`.
- Verification performed:
  - `npm run build` in `web`: passed;
  - `git diff --check`: passed;
  - `/tmp/server/web/index.html`, `/kvmapp/server/web/index.html`, and HTTPS
    response from `https://10.0.87.133/` match the sha256 above;
  - `https://10.0.87.133/api/health`: OK, Rust backend.

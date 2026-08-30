# Raw.9 Physical Acceptance Checklist

Status: partial physical evidence for the historical raw.9 candidate. The
automated raw.10 candidate supersedes it, but the still-deferred physical gates
remain open; this checklist does not authorize a release.

Candidate under test:

- device: test-only NanoKVM Cube `10.0.87.133`;
- system: `0.3.0-raw.9`;
- application: `2.0.39`;
- userspace: Buildroot `2026.05.1`;
- kernel: retained vendor `5.10.4-tag-`;
- signed raw-update SHA-256:
  `86af33de11c4bcd04f9be144af1ae246def645a3b67d8b46c2ed38cc3387d3de`;
- SD image SHA-256:
  `3f16bff48d6facba940f1669edadcbd6b0666a5459e28847532df584e3d8b80c`.

## Safety Boundaries

- Do not unlink/relink HID functions or detach the UDC on a live system.
- Do not create or remove `/boot/BIOS` while the gadget is live. Any BIOS-mode
  trial must start from a clean power cycle and restore normal mode the same
  way.
- Do not actuate ATX power/reset GPIO without separate explicit authorization.
- Do not perform power-loss or destructive recovery tests on the accepted test
  card. Use separately identified sacrificial media with a verified backup.
- Use only non-secret sample text for keyboard/paste tests.
- Keep remote syslog `10.0.77.177:514/UDP` active during tests that may hang or
  reboot the device.

## Gate A: Physical HDMI Hotplug And Source Modes

1. Record a clean core preflight and confirm live 1920x1080 MJPEG and H.264.
2. Unplug the physical HDMI source cable for 30 seconds.
3. Confirm the web/API stays responsive and reports loss of input without a
   backend restart, CPU runaway, or kernel alert.
4. Reconnect the same source and confirm automatic MJPEG and H.264 recovery.
5. Change the physical source output through at least:
   - 1920x1080 at 60 Hz;
   - 1280x720 at 60 Hz;
   - one non-HD television/PC mode supported by the source.
6. After every source-mode change, confirm auto-resolution reports the new
   input and both stream types produce data.
7. Run the core/native postflight and inspect dmesg/remote syslog for:
   `oops`, `panic`, `segfault`, `module_put`, `already inited`, ION/VB/VPSS/VENC
   allocation failures, invalid buffers, and module-version errors.

Required evidence:

| Item | Result | Evidence |
| --- | --- | --- |
| Cable removal keeps API healthy | passed | `physical-hdmi-unplugged-10.0.87.133-20260821T090016Z/` |
| Cable reconnect restores MJPEG | passed | `physical-hdmi-replugged-10.0.87.133-20260821T090130Z/` |
| Cable reconnect restores H.264 | passed | `physical-hdmi-replugged-10.0.87.133-20260821T090130Z/` |
| 1080p physical baseline | passed | `physical-hdmi-baseline-10.0.87.133-20260821T085857Z/` |
| 720p source-mode change | not applicable | Current physical source does not expose selectable output modes. |
| Additional physical mode | not applicable | Current physical source does not expose selectable output modes. |
| Final kernel/syslog gate | passed | `postflight-0.3.0-raw.9-10.0.87.133-20260821T090308Z/` and `native-audit-10.0.87.133-20260821T090337Z/` |

## Gate B: Visible Keyboard, Mouse, And Paste

Use a disposable editor or firmware setup field on the controlled target host.
Do not test in a shell, password field, or application with destructive
shortcuts.

1. Type a known non-secret mixed sample containing lower/upper case, digits,
   punctuation, Enter, Backspace, arrows, and modifiers.
2. Test paste with a non-secret one-line sample and confirm exact characters.
3. Confirm relative mouse movement, both primary buttons, wheel, and drag.
4. Confirm absolute-pointer mode maps all four display corners and center.
5. Return HID mode to `normal` and confirm the web setting agrees.

Required evidence:

| Item | Result | Evidence |
| --- | --- | --- |
| Keyboard sample exact | passed | User confirmed manual NanoKVM UI input is correct. Scripted `keyboard.type()` result was invalid because it omitted explicit Shift and reused text left by the first attempt. |
| Paste sample exact | passed | User confirmed exact `Paste-RAW9-OK`; `/api/hid/paste` completed in 365 ms without Enter. Evidence: `physical-paste-10.0.87.133-20260821T093654Z/`. |
| Relative mouse | deferred | Current target exposes only a text console; retest later on a GUI target with a visible pointer. |
| Absolute mouse | deferred | Current target exposes only a text console; retest later on a GUI target with a visible pointer. |
| HID mode restored | passed | API and automated USB/postflight gates report `normal`. |

Manual keyboard input was reported as slow only while MJPEG was active. The
final endurance measured roughly 20-21 Mbit/s of MJPEG payload versus about
1.6 Mbit/s for H.264, so this is recorded as a stream-performance boundary,
not keyboard corruption or switch bounce.

## Gate C: Host-Side USB Enumeration

1. On the physically connected host, capture USB identity and functions before
   the test using Device Manager, `lsusb`, or the platform equivalent.
2. Confirm the expected HID interfaces enumerate and remain usable.
3. Confirm RNDIS/USB network enumeration and host-side link state.
4. Mount a disposable virtual-media image, confirm host-side block-device
   enumeration/read access, then eject it from the NanoKVM UI.
5. Confirm the block device disappears and the normal gadget topology remains.
6. Reboot the target host once and confirm HID is usable during the normal boot
   path. BIOS/UEFI behavior remains a separate clean-boot experiment.

Required evidence:

| Item | Result | Evidence |
| --- | --- | --- |
| Host sees expected USB identity | passed | Target-screen capture shows Sipeed NanoKVM enumeration across disconnect/reconnect cycles. |
| HID interfaces enumerate | passed | Target kernel log visibly shows Sipeed NanoKVM keyboard and mouse HID interfaces. |
| RNDIS enumerates and links | passed | Target log visibly shows `rndis_host`, interface creation/rename; user confirmed network operation. |
| Virtual media appears/ejects | passed | Target log visibly shows NanoKVM USB Mass Storage, `sda`/partitions, capacity changes, and disconnect/reconnect; user confirmed correct behavior. |
| Host reboot behavior | pending | |
| BIOS/UEFI behavior, if authorized | deferred | Requires a separate clean-boot experiment. |

Host-side visual evidence:
`physical-host-screen-10.0.87.133-20260821T094557Z/target-screen.png`.

## Gate D: OLED And Physical Button

1. Confirm the OLED visibly initializes after a clean NanoKVM reboot.
2. Confirm displayed IP/network state matches the active device state.
3. Exercise only documented non-ATX button interactions and record visible
   transitions.
4. Confirm the OLED and button remain responsive after the final test.

Required evidence:

| Item | Result | Evidence |
| --- | --- | --- |
| OLED boot display | pending | |
| OLED network state | pending | |
| Non-ATX button behavior | pending | |
| OLED/button postflight | pending | |

ATX power/reset actuation is not included in this gate.

## Gate E: Sacrificial-Media Recovery And Power Loss

Prerequisites:

- separately identified sacrificial SD card;
- verified compressed image backup and SHA-256;
- known-good card reader and host recovery path;
- explicit authorization for destructive writes and controlled power cuts.

Required drills:

1. Flash the full raw.9 SD image to sacrificial media and boot it.
2. Complete first-account setup, HTTPS/SSH, video, USB, and persistence smoke.
3. Reflash the accepted image from the documented host recovery path.
4. Test interruption during update download/staging; the installed system must
   remain bootable.
5. Test interruption during raw partition writing only with an agreed recovery
   procedure and immediate access to the card reader.
6. Recover by full reflash and repeat the core boot gate.

| Item | Result | Evidence |
| --- | --- | --- |
| Fresh SD boot/setup | pending | |
| Host full-reflash recovery | pending | |
| Staging interruption | pending | |
| Raw-write interruption | pending | |
| Recovery after interruption | pending | |

## Gate F: Release Preconditions

- Obtain a redistribution grant for the vendor firmware, sysroot, middleware,
  modules, and runtime binaries currently marked `PROPRIETARY`/`NOASSERTION`.
- Review the intended dirty-worktree changes and exclude machine-local files,
  generated build outputs, test secrets, and unrelated user changes.
- Commit the reviewed source on `latestbuilroot` only with explicit authority.
- Perform a clean independent rebuild from the reviewed commit and compare the
  complete manifest and expected reproducibility boundaries.
- Publish only after explicit release authorization and after documenting any
  intentionally non-reproducible filesystem/boot-image fields.

## Completion Rule

Raw.9 is eligible for a preview-release decision only when every applicable
row above has concrete evidence, all non-applicable rows include a reason, and
the licensing and clean-rebuild gates are complete. Automated raw.9 evidence
alone is not sufficient.

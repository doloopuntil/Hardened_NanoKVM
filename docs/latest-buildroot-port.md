# Latest Buildroot Port Probe

Status: experimental only. This work must not produce a release, a raw system
update, or a flashable image until the hardware acceptance matrix is complete.

## Scope

The `latestbuilroot` branch probes an official Buildroot port while preserving
the known NanoKVM vendor bootloader, Linux `5.10.4` tree, SG2002 device support,
MMF/VENC stack, and SD-card layout as explicit porting inputs. It is not a
drop-in replacement for the Sipeed SDK.

The selected upstream baseline is the latest stable Buildroot release available
when this probe started:

- version: `2026.05.1`;
- source: `https://buildroot.org/downloads/buildroot-2026.05.1.tar.xz`;
- locally retrieved archive SHA-256:
  `ae7f706f087b9ae9083a10a587368dfbf53103c28bf81c2d690198dc4090cb58`.

The Buildroot `2026.08-rc1` release is deliberately not used.

## Tracked Port Foundation

The branch contains `buildroot-external/hardened-sg2002`, a real Buildroot
external tree rather than an untracked local SDK edit. It currently provides:

- the `hardened_sg2002_licheervnano_defconfig` configuration-only target;
- a minimal reviewed overlay and a BusyBox fragment that disable legacy HTTP,
  Telnet, and FTP daemons;
- hash-pinned packages for the SG2002 codec firmware, AIC8800 firmware, and a
  deliberately ABI-gated CVITEK musl runtime sysroot;
- a local Buildroot package for the already-built Hardened NanoKVM application
  payload, init scripts, sensor configuration, and `/data` mount contract;
- a generated, non-redistributable vendor runtime package containing only
  `/mnt/system` and the SHA-256-pinned OpenCV/protobuf closure missing from the
  application payload, plus the two SHA-256-pinned vendor musl loader names
  and matching private GCC/OpenMP runtime required by the current
  backend/helper binaries. The older vendor zlib is deliberately excluded;
  the backend resolves Buildroot's maintained system zlib instead. The three
  media modules come from the hardware-accepted source-built staging
  `vendor-runtime-source-media-v1`, not the older extracted vendor binaries;
- `manifest/vendor-inputs.json`, which records the vendor inputs, immutable
  revisions, archive hashes, intended install paths, and unresolved license or
  BSP status.

Configure it without building an image:

```sh
make latest-buildroot-sg2002-configure
```

The defconfig deliberately selects no vendor kernel, U-Boot, MMF/VENC runtime,
or SD image layout. A successful configuration proves only that the tracked
external tree is structurally valid against Buildroot `2026.05.1`.

Build the same non-bootable rootfs probe only after satisfying the host tool
dependencies:

```sh
BUILDROOT_PORT_HOST_DEPS=/path/to/host-deps \
HARDENED_SG2002_VENDOR_SDK_DIR=/path/to/LicheeRV-Nano-Build \
  make latest-buildroot-sg2002-rootfs
```

The security-maintenance source is prepared from the hash-pinned upstream
archive plus the tracked recipe patch series before configuring:

```sh
make latest-buildroot-security-source
make latest-buildroot-sg2002-configure
make test-latest-buildroot-security-policy
```

The preparation step refuses a changed archive, changed patches, an unknown
existing source directory, or any patch application requiring fuzz.

The result is a Buildroot ext4 rootfs input, not a NanoKVM SD image. It must
not be installed on a device. The target runs in a sanitised Linux-only `PATH`
because Buildroot rejects WSL path entries that contain spaces.

After that rootfs and Buildroot's host `genimage` tool are present, assemble a
candidate SD image with the pinned vendor `fip.bin` and `boot.sd`:

```sh
HARDENED_SG2002_VENDOR_SDK_DIR=/path/to/LicheeRV-Nano-Build \
  make latest-buildroot-sg2002-sd-image
```

The assembler first runs `validate-latest-buildroot-sg2002-rootfs.sh`, then
reproduces the vendor MBR layout: a 16 MiB FAT boot partition
with `fip.bin` and `boot.sd`, followed by the 1.5 GiB Buildroot rootfs
partition. Validation requires the Hardened payload, vendor module/media
runtime, complete native dependency closure, runtime services, and Buildroot
`2026.05.1`; it also rejects Python, FFmpeg, dnsmasq, an unlocked root account,
and a private app-local zlib. The resulting image is still
restricted to an explicitly authorized recoverable-media boot test and is not
a raw-update or release authorization.

After a boot-tested SD candidate passes the hardware matrix, package a signed
preview raw update for the existing p1/p2 updater:

```sh
SYSTEM_UPDATE_SIGNING_KEY=/path/to/release-key.pem \
  make latest-buildroot-sg2002-raw-update
```

The packager refuses unsigned output and existing output directories. It
strictly validates the rootfs before and after partition extraction, creates a
gzip-streamable raw bundle, signs `system-latest.json`, and verifies the
signature against the selected public key bundled in the application. Format-2
metadata for raw.11 requires app `2.0.41` or newer. It does not publish or
install the resulting `0.3.0-raw.11` preview artifacts.

## Reproducible Probe

The isolated source tree is intentionally ignored under `build/latestbuildroot`.
It never replaces `build/vendor` and does not alter the vendor SDK.

```sh
make latest-buildroot-bootstrap
LICHEERV_NANO_SDK_DIR=/path/to/LicheeRV-Nano-Build \
  make latest-buildroot-config-probe
```

The second command copies the legacy vendor `.config` into a new output
directory, runs `olddefconfig`, and saves a minimal defconfig only when no
upstream legacy options remain. It does not invoke an image build or flash a
device.

## First Result: 2026-08-20

The vendor `2023.11.2` configuration parses through the Buildroot `2026.05.1`
Kconfig engine, but its first conversion exposes five explicit upstream legacy
decisions:

| Legacy setting | Porting decision required |
| --- | --- |
| `BR2_PACKAGE_EXPECT` | Package was removed as unmaintained; prove it is unused before removing it. |
| `BR2_PACKAGE_RAMSPEED` | Package was removed as unmaintained; it is a benchmark and is not a NanoKVM runtime dependency. |
| `BR2_PACKAGE_ALSA_LIB_ALISP` | ALSA removed this feature; confirm no vendor binary requires it. |
| `BR2_GDB_VERSION_13` | Select the supported current GDB version, then confirm target debugging still works. |
| `BR2_PACKAGE_IPMITOOL_PEN_REG_URI` | Replace the custom registry download with the upstream `iana-assignment` mechanism or a reviewed rootfs asset. |

For the isolated compatibility experiment only, clearing those five settings
allowed `olddefconfig` and `savedefconfig` to complete. This is not approval to
remove them from a release image; the result only proves that the Kconfig
migration can proceed after explicit choices.

More importantly, these enabled vendor-specific settings have no counterpart
in stock Buildroot `2026.05.1`:

- `BR2_PACKAGE_CVITEK_RISCV64_MUSL_SYSROOT`;
- `BR2_PACKAGE_SG2002_CODEC_FIRMWARE`;
- `BR2_PACKAGE_TPUDEMO_SG200X`;
- `BR2_PACKAGE_AIC8800_SDIO_FIRMWARE`;
- `BR2_PACKAGE_AXP2101` and `BR2_PACKAGE_LCDTEST`.

The legacy configuration also refers to the vendor-only rootfs overlay and
BusyBox fragment under `board/cvitek/SG200X`. Stock Buildroot has neither those
paths nor the SG2002 firmware and multimedia packages. This confirms that the
project is a board port, not an SDK tarball upgrade.

## First Rootfs Build Result: 2026-08-20

The initial current-Buildroot toolchain/rootfs probe completed successfully:

- ext4 rootfs SHA-256:
  `a2b77116568df79d71c5fbea955991236ee974fc21384b79cf6ca268344690d2`;
- rootfs tar SHA-256:
  `7de1af7be2f5d15bdae7efa231cf7afc2ea675adeb6937597f21a3abcbb08c52`;
- `/usr/lib/os-release` reports Buildroot `2026.05.1`.

That first output is intentionally disposable: the initial defconfig selected
Linux `7.0.11` userspace headers and did not include the complete NanoKVM
runtime. The runtime candidate defconfig now pins the supported `5.10.x`
headers stream (currently `5.10.258` in Buildroot `2026.05.1`), enables the
Hardened application and required services, and carries a self-consistent
private vendor ABI closure. The vendor kernel itself remains `5.10.4` and is
not presented as security-current. Its verified lineage, stable-series overlap,
configuration gaps, and staged rebuild/merge/device plan are maintained in
[`vendor-kernel-5.10-security-plan.md`](vendor-kernel-5.10-security-plan.md).

## First Hardware Raw-Update Result: 2026-08-20

The signed `0.3.0-raw.1` candidate was installed on the test-only NanoKVM Cube
at `10.0.87.133` after first proving the same updater path with the published
`0.2.23-raw.1` control release. The candidate completed raw p2/p1 writes and
booted with:

- system version `0.3.0-raw.1`;
- Buildroot userspace `2026.05.1`;
- Hardened application `2.0.34`;
- retained vendor kernel `5.10.4-tag-`;
- root, boot, and data mounts on `/dev/mmcblk0p2`, `p1`, and `p3`;
- working HTTP login, HDMI/video output, authenticated API, and native runtime;
- a cleared raw-update marker, a present boot-good marker, raw updates disabled,
  all critical media modules loaded, and no detected kernel oops/panic/BUG.

The first hardware boot also exposed release-blocking port defects:

1. Consecutive raw updates reused `root-restore-done`, causing the second boot
   to skip its preserved `/etc` restore. The preserved payload contained the
   previous hostname, HTTPS configuration, SSH files, and account state, but
   the candidate retained its defaults. The generated updater now removes the
   stale marker before every preservation pass, with a Rust regression test.
2. Stock OpenSSH defaulted to `PermitRootLogin prohibit-password`. The NanoKVM
   account workflow correctly set both web and root password hashes, but sshd
   still rejected root password login. The test device was repaired only after
   explicit authorization. The board overlay now states the intended managed
   root policy and rejects empty passwords; the rootfs validator enforces it.
3. `/usr/bin/curl`, `/usr/bin/openssl`, and the CA bundle were absent, so the
   Rust system-update check failed with `ENOENT` even though gateway and DNS
   resolution worked. The replacement defconfig selects the curl binary,
   OpenSSL binary, CA certificates, and only the required HTTP/TLS protocol
   surface. The validator requires all three artifacts.
4. Native processes launched through a private musl loader do not reliably
   match `pidof NanoKVM-Server` or `pidof kvm_system`. Device acceptance now
   checks the backend PID file and `/proc/*/cmdline` instead.
5. Buildroot target finalization rewrote the retained RISC-V v0p7
   `kvm_system` with its newer `strip` and `patchelf`. The resulting ELF had
   invalid version metadata, altered dependency names, and loader relocation
   failures, so the helper never ran although the backend and video streams
   remained healthy. The helper is now linked without RPATH, excluded from
   Buildroot stripping, and the rootfs validator requires the final image copy
   to be byte-identical to the reviewed staging binary before accepting it.

These fixes require a replacement raw candidate and a repeated restoration,
online-update, SSH, native-runtime, video, and reboot acceptance cycle. The
successful first boot does not authorize publishing `0.3.0-raw.1`.

## Automated Raw.6 Acceptance: 2026-08-21

The final unpublished automated-test candidate is `0.3.0-raw.6` with
Buildroot `2026.05.1`, Hardened application `2.0.36`, and the retained vendor
kernel `5.10.4-tag-`. Its local test artifacts are:

- signed raw-update archive SHA-256:
  `9260b9c848dca2e43b99cfb8d10d728b123af8b144124b6d0332b2ce3c7071bc`;
- full SD image SHA-256:
  `7e3e5e42a4d4985ddffd7fbd7436dc948992a9988143da15d39a9a8f1bbb6bc1`;
- rootfs ext4 SHA-256:
  `0aacc6d8f21104edcc57a71cfe6c96cb2b513c956465a4e4c5262dbc3443f386`;
- rootfs tar SHA-256:
  `c56fbea9c887f4e32c9e1118722f3718e5fa5160cb1626ae3ea83e5735514c49`;
- Buildroot-finalized Rust backend SHA-256:
  `81576f15ac0ab8acb188be1c84bd227f691050c5f9f4f7a08ade34b85902ffdb`;
- retained clean `kvm_system` SHA-256:
  `f919c1b6ec1bf175d4d32b72f5ff666729422af6b2e34d23f0aa37c5193d32ef`.

The signed archive was installed through the stock system-update API on the
test-only Cube. Configuration restoration, HTTPS, SSH, boot-good, update
checks, one exact helper process plus matching PID file, native loader closure,
and kernel-log gates passed. Five subsequent reboot cycles preserved the exact
backend/helper hashes, UDC `configured` state, empty removable LUN, and zero
detected kernel alerts.

Additional completed automated gates are:

- MJPEG and H.264 Direct at 1920x1080, 1280x720, 800x600, 640x480, and auto;
- four HDMI reset cycles during an active MJPEG stream, HDMI disable/enable,
  and controlled full-runtime restart;
- HID WebSocket heartbeat and zero keyboard/relative/absolute mouse reports;
- FAT image upload, mass-storage mount/eject/delete, RNDIS presence, and
  unchanged USB configfs topology;
- read-only OLED, I2C, LT6911, GPIO LED, hwmon snapshot, input, LED class,
  software watchdog, and hardware watchdog inventory;
- independent backend and `kvm_system` SIGKILL recovery without changing UDC;
- fresh-browser UI login, protected root, terminal/password routes,
  back/forward navigation, live 1920x1080 video, and zero page/console/network
  errors;
- 153 Rust tests, TypeScript/Vite production build, ESLint with zero errors,
  shell/CJS/JSON syntax checks, `cargo fmt --check`, signed metadata/rootfs
  validation, `pnpm audit` with no known vulnerabilities, and `cargo audit`
  with no RustSec vulnerabilities. `spin 0.9.8`, selected by `multer 3.1`,
  remains a yanked-package warning without a published RustSec advisory.

This still does **not** authorize a release. The remaining gates require human
or external evidence:

- physical HDMI cable hotplug and source display-mode changes;
- visible keyboard, mouse, paste, host-side RNDIS/virtual-media enumeration,
  and host reboot/BIOS behavior; ACM is absent from the selected gadget;
- visible OLED/button behavior and explicitly authorized GPIO/ATX actuation;
- full SD reflash/recovery and power-loss testing on sacrificial media;
- a distribution grant for vendor firmware, sysroot, middleware, modules, and
  runtime binaries. GitHub reports `NOASSERTION`, and the pinned repository
  roots contain no LICENSE, COPYING, or NOTICE file, so these inputs are marked
  `PROPRIETARY` with redistribution disabled;
- a reviewed commit and clean independent rebuild. The current working tree is
  intentionally uncommitted, so raw.6 metadata still reports the stale base
  commit `9ba0ae5` and is not release-grade provenance.

## Automated Raw.7 Acceptance: 2026-08-21

The signed `0.3.0-raw.7` candidate moves the complete accepted media-module
set into the Buildroot image, packages the idempotent static-DNS init fix, and
updates the application payload to `2.0.37`. It retains Buildroot `2026.05.1`
and vendor kernel `5.10.4-tag-`.

Local artifacts:

- raw-update archive SHA-256:
  `88f9c28aebf9a6f9a72cf47f171487f2dee9c7ab48eaeaed37e554759363cedf`;
- full SD image SHA-256:
  `fccc8caa0103bc08c4579c8567217c8d7b5655ebf2d98ca97de58d15b20ff557`;
- Buildroot rootfs ext4 SHA-256:
  `8fe3b1edc34984c97357fbea013732742d1955cd70fa1332e80642f2ceb61749`;
- Buildroot rootfs tar SHA-256:
  `677841e936f773c0e9f0af83e95f4330c7a6d0a30d3a68e0e366b87d8ce4bb36`;
- signed metadata SHA-256:
  `acb3184e9b4cc5b7ebf0a3de9ddcee78ce00c28744d3cbf763e7d25f4a753ce1`;
- metadata signature SHA-256:
  `4b83bf924a6b7fb7e03ba18b71f10ec7bdab93d8886442b390aea71dfbe5dcf5`.

The source-built modules embedded in the installed image are:

- `soph_vcodec.ko`:
  `0f0927cd796275f2241e8914b3efa57b124b8cc2aabc087ee899a56346a5c2be`;
- `soph_jpeg.ko`:
  `eacf2af2c75c23816af129843912f5072c9cb81d44434d563ceb449ee2899666`;
- `soph_vc_driver.ko`:
  `cc543c2a1b25c63c0372d7a687643605b1d07a5624403e3cf7d74b52ecadecf5`.

The stock system-update API installed raw.7 from raw.6 on the test-only Cube.
The install evidence is under
`build/latestbuildroot/device-tests/install-0.3.0-raw.7-10.0.87.133-20260821T042114Z/`.
It proves preserved HTTPS/hostname/account state, refreshed root-restore marker,
boot-good, cleared pending marker, disabled raw-update toggle, exact module and
helper hashes, all three media modules loaded, update checks, DNS `6/6` unique,
and zero kernel/module alerts.

The sequential automated regression report is
`build/latestbuildroot/device-tests/raw7-regression-suite-10.0.87.133-20260821T042959Z/report.txt`.
It passed independent core/native/browser checks, MJPEG and H.264 at all five
resolution modes, four HDMI resets, HDMI disable/enable, controlled runtime
restart, safe HID/virtual-media testing, read-only peripheral inventory,
watchdog recovery, five reboot cycles, and a final independent core check.

The additional 30-minute endurance report is
`build/latestbuildroot/device-tests/stream-endurance-30m-10.0.87.133-20260821T044447Z/report.txt`.
Across 38 alternating MJPEG/H.264 cycles it received 5,397 MJPEG frames
(1,867,060,410 bytes) and 22,792 H.264 packets (150,370,535 bytes). The backend,
helper, and module state remained stable and the targeted dmesg/local-syslog
alert counts stayed at zero.

The network state is internally consistent and recorded in
`build/latestbuildroot/device-tests/network-audit-10.0.87.133-20260821T044243Z/`.
Static IPv4 is `10.0.87.133/24` via `10.0.87.5`; DNS is manual and inherited
from the preserved legacy `/boot/resolv.conf`, with the same six unique
servers exposed by the API and active resolver. IPv6 SLAAC is active.

The endurance audit also exposed a raw-update persistence defect: the updater
preserved `/etc/kvm/syslog.json` through the `/etc/kvm` tree, but did not
preserve the generated `/etc/default/syslogd` and `/etc/default/klogd` files.
After a raw update this could leave the API reporting remote logging enabled
while BusyBox `syslogd` starts local-only. The working tree now preserves and
restores both derived files, fixes their permissions, validates the first-boot
restore script in the final rootfs, and passes all 153 Rust tests. Live
raw-update verification is pending explicit authorization to forward test logs
to the previously recorded external receiver `10.0.77.177:514`.

Raw.7 remains unpublished and is not release-authorized. Physical HDMI cable
hotplug/source-mode changes, visible host-side HID/RNDIS/media checks,
OLED/button/authorized ATX tests, sacrificial-media recovery/power-loss tests,
vendor redistribution permission, reviewed commits, and a clean independent
rebuild remain open.

### Local Raw.8 Syslog-Persistence Candidate

The remote-syslog persistence fix is packaged locally as application `2.0.38`
and system `0.3.0-raw.8`. It has not been installed on a device. Local hashes:

- application archive:
  `b0fac3a5fdd1276a87ba1f6fd9671bb0a5c1925cc30ea1ead68b40dbdb9ce9c7`;
- linked application backend before Buildroot finalization:
  `bc14a6daf0e247c857084f66c5f7293ab68cd58c97d4219bc6feb85cc17b2607`;
- Buildroot-finalized backend:
  `fd2fcaac05c6dcb5aee14f49fd86b8145f372692449e54b2ab29fb8f17f3d487`;
- rootfs ext4:
  `385839414e573481e42f72b8b4a2688a988d6e376d7ee532dfe2db1fbd8d096d`;
- rootfs tar:
  `4b4ddf8ad9cdb9db1365752d32563c986dd3cb0cb605af78ca21c0547791aae7`;
- signed raw-update archive:
  `c39541451f794ce159085a2fcb3744fcaad93df8a830fe4f1390ad18ed36394f`;
- full SD image:
  `3044b4d3b5c973f3f3bada75386768baefaf6972820c9ea42f23b583c81c9143`;
- metadata and signature:
  `945193975793a504b5f42bce50add758b9590c5a42d31f69bcbb7c0193682633`
  and
  `54abb2aef886b9580ef8e966d35a5ae7e422487d355e642b86d87839faf33a5e`.

Both rootfs validators, signed-metadata verification, all 153 Rust tests,
`cargo fmt --check`, and shell/Node syntax checks pass. The final rootfs
validator requires the first-boot `S01fs` restore path to carry both
`etc/default/syslogd` and `etc/default/klogd`. Live verification is deliberately
paused until explicit authorization is provided for UDP log forwarding from
the test device to `10.0.77.177:514`.

## Automated Raw.9 Acceptance: 2026-08-21

Raw.8 proved the syslog-default preservation fix on hardware: the API config,
`/etc/default/syslogd`, `/etc/default/klogd`, and live BusyBox command line with
`-R 10.0.77.177:514 -L` all survived the raw update. The expanded video gate
then exposed a second defect during a controlled runtime restart: dmesg
reported VB and VENC `already inited` errors even though MJPEG and H.264
recovered.

The cause was an unbalanced MMF shutdown reference count. The camera held one
MMF reference and an active JPEG encoder held another; process shutdown called
ordinary `mmf_deinit()`, changed the count from two to one, and skipped actual
vendor teardown. `kvmv_deinit()` now stops and joins its workers, closes the
camera, then calls `mmf_try_deinit(true)` so process exit tears down the full
VB/VENC/MMF stack. An app-only `2.0.39` hardware trial proved the fix with the
same resolution/reset/restart soak, zero expanded dmesg alerts, the complete
automated suite, and five reboot cycles.

The final full candidate is Buildroot `2026.05.1`, system `0.3.0-raw.9`, app
`2.0.39`, and vendor kernel `5.10.4-tag-`. Local artifacts:

- application archive:
  `d553c7765312bfb311bb318585df1869826bb2b335ec21f5742bf44df29b59ad`;
- rootfs ext4:
  `f8126cccca385e4c64e97c137e006641befc5d0c27cebc4c505ee0b54c96f61d`;
- rootfs tar:
  `7121d4d7d66837fb601ebe5211dac2efcbc1216dfd3c813364618693b75cdea9`;
- signed raw-update archive:
  `86af33de11c4bcd04f9be144af1ae246def645a3b67d8b46c2ed38cc3387d3de`;
- full SD image:
  `3f16bff48d6facba940f1669edadcbd6b0666a5459e28847532df584e3d8b80c`;
- metadata and signature:
  `1200089bd5f1434f9ea7c383b00f43c3616c56e94fe909ed867f3e28bcb117fe`
  and
  `cdf6b8be4305bc2b9c79211bc8ba96d7310bfb9f014684939dcac50f3c2ae2d7`.

Final native hashes enforced by the image validator and device tests:

- Buildroot-finalized backend:
  `fd2fcaac05c6dcb5aee14f49fd86b8145f372692449e54b2ab29fb8f17f3d487`;
- Buildroot-finalized `libkvm.so`:
  `387f1c7f54fb67ecc0eafa961946eef7972022a92ad443fb68c3d88ef6d2f24f`;
- `libkvm_mmf.so`:
  `be269c595b454930abeb9bb05eb67ec708894eb2df1650c4d99ee1162e1e3f2d`;
- `kvm_system`:
  `f919c1b6ec1bf175d4d32b72f5ff666729422af6b2e34d23f0aa37c5193d32ef`.

Raw.9 install evidence is under
`build/latestbuildroot/device-tests/install-0.3.0-raw.9-10.0.87.133-20260821T073822Z/`.
It proves configuration restoration, remote-syslog preservation, exact native
and module hashes, boot-good, cleared pending state, DNS uniqueness, and zero
kernel/module alerts.

The complete regression evidence is
`build/latestbuildroot/device-tests/raw9-regression-suite-10.0.87.133-20260821T074458Z/report.txt`.
It passed independent core/network/remote-syslog/native/browser gates, all
resolution modes, HDMI resets and disable/enable, clean controlled restart,
safe HID/virtual-media testing, peripheral inventory, watchdog recovery, five
reboot cycles with exact native hashes, and a final core gate.

The final 30-minute endurance evidence is
`build/latestbuildroot/device-tests/stream-endurance-30m-10.0.87.133-20260821T075508Z/report.txt`.
Across 36 alternating cycles it received 5,247 MJPEG frames (1,816,012,995
bytes) and 22,249 H.264 packets (147,354,105 bytes). Backend/helper/module
state remained stable; expanded dmesg and local-syslog alert counts stayed
zero, and remote syslog remained configured.

The SG2002 build helper was also made project-relative, taught to locate the
installed MaixCDK and a Python 3 shim, and changed to propagate real build
failures rather than reporting success after compilation or packaging errors.

Raw.9 remains unpublished. Remaining release gates are physical HDMI cable
hotplug/source-mode changes, visible host-side keyboard/mouse/paste and
RNDIS/media/BIOS checks, visible OLED/button and explicitly authorized ATX
tests, sacrificial-media reflash/recovery and power-loss testing, vendor
redistribution permission, reviewed commits, and a clean independent rebuild.
The evidence procedure and safety boundaries are tracked in
[`raw9-physical-acceptance-checklist.md`](raw9-physical-acceptance-checklist.md).

The physical cable unplug/replug portion subsequently passed on
`10.0.87.133`: hwmon changed from active 60 FPS to inactive 0 FPS while the
API/backend/helper stayed healthy, then returned to active 60 FPS with live
MJPEG and H.264 after reconnect. Expanded dmesg and local-syslog alerts stayed
at zero. Physical source-mode switching was marked not applicable because the
current source exposes no selectable output modes.

Visible manual keyboard input through the NanoKVM UI was also confirmed
correct. Input felt slow only with MJPEG active; the measured MJPEG payload was
roughly an order of magnitude larger than H.264, so this is tracked as expected
device/stream contention rather than HID corruption. The first scripted text
attempt was discarded because Playwright `keyboard.type()` did not generate
explicit Shift reports and appended to text left by an earlier partial attempt.

The physical paste gate also passed: the target visibly received the exact
non-secret `Paste-RAW9-OK` sample, with no Enter report, and the authenticated
paste API completed in 365 ms. Visible mouse testing is deferred until a GUI
target with a pointer is connected.

Host-side USB enumeration was then visually confirmed from the captured target
console. The kernel log shows Sipeed NanoKVM keyboard and mouse HID interfaces,
RNDIS enumeration and interface rename, NanoKVM USB Mass Storage, `sda` and
partition appearance, backing-capacity changes, and disconnect/reconnect
cycles. The user confirmed disk, network, and USB behavior was correct. The
evidence image is under
`build/latestbuildroot/device-tests/physical-host-screen-10.0.87.133-20260821T094557Z/`.
Host reboot and clean-boot BIOS/UEFI behavior remain separate gates.

## H.264 Direct Mode-Resume Defect And Raw.10

After the raw.9 automated and physical checks, a real browser session exposed
a distinct stream-lifecycle defect. An already-open H.264 Direct WebSocket
stopped receiving data when another client selected global MJPEG mode. WebRTC
continued to work, and switching from WebRTC back to Direct appeared to repair
the stream only because the UI mounted a new Direct connection.

The Direct producer previously returned whenever the global mode was not H.264,
while its WebSocket handler remained open waiting on a fanout that no longer had
a producer. The producer now waits while MJPEG is selected and resumes capture
when global H.264 mode returns; a real capture-disable condition still stops it.
The unit test `h264_direct_waits_for_global_mode_and_resumes_on_same_socket`
covers the state decision.

An app-only `2.0.40` deployment on `10.0.87.133` then exercised one unchanged
WebSocket across H.264 -> MJPEG -> H.264. It received 157 initial packets
(740,840 bytes), remained open during MJPEG, and resumed with 181 packets
(714,819 bytes), without reconnecting or using the WebRTC workaround. Evidence:
`build/latestbuildroot/device-tests/h264-direct-resume-10.0.87.133-20260821T103415Z/report.txt`.

System `0.3.0-raw.10` packages app `2.0.40`, so this correction is included in a
complete signed raw image. The candidate is installed on `10.0.87.133` and all
automated acceptance gates pass.

The source-level preflight for raw.10 passes all 154 Rust tests,
`cargo fmt --check`, the TypeScript/Vite production build, and ESLint with zero
errors (29 pre-existing warnings). The offline RustSec database reports no
vulnerabilities; `spin 0.9.8` remains the single allowed yanked-package warning.
The production dependency audit reports no known pnpm vulnerabilities.

Pre-publication raw.10 lab artifacts:

- application archive:
  `22dacfdb7627f0914cae201e53d353d96d12b9aa7d01d8f4c4ff9f68c9857ba3`;
- Buildroot rootfs ext4:
  `0076f77cc71e788bdfb5ee584bdf19e66e14ce57b90d13a0631caa84f0295816`;
- Buildroot rootfs tar:
  `3be6fea121e8156da42071def3cd07a7f090ab6a7d23f261d83aff5fbffda1cf`;
- full SD image:
  `7150f0c8a6b6aae82a09b68e1896189727e321175e0ca74aaf67311aa65e1333`;
- signed raw-update archive:
  `bc01de0bc47de1a07fd931a7a50ecfbaf2b0848fa5588b386990daae0ec0314a`;
- metadata and detached signature:
  `966f494430b9d64f8018de5c01435f27cc5ce158e59fbf9b61aabbad1f4a9666`
  and
  `a05877a9787966727586a8c81cc359931dc9985d1c01527233dbae8bd3ac2afd`.

The raw archive manifest matches both stored payloads. Its normalized rootfs
payload has SHA-256
`b6893a809da2ffc09117584af66f86176c7987b0955669e74e7031d9bbf80868`
and compressed SHA-256
`916f3d57314176c50cf6561e5cb660295e29fbb2d30c3964198fdbf61e99f906`.
It differs from the SD rootfs because the bundle builder writes final fstab and
system-version metadata into a copied image, then validates the copy again.

Installation evidence:
`build/latestbuildroot/device-tests/install-0.3.0-raw.10-10.0.87.133-20260821T112040Z/`.
It proves restored HTTPS/SSH/hostname, remote syslog, unique DNS, exact native
and media-module hashes, boot-good, and cleared pending state.

The complete regression evidence is
`build/latestbuildroot/device-tests/raw10-regression-suite-10.0.87.133-20260821T112727Z/report.txt`.
Every core, network, remote-syslog, native, browser, same-WebSocket H.264,
stream, safe USB, peripheral, watchdog, five-reboot, and final-core gate passed.
The H.264 proof kept one WebSocket open, received 154 initial packets, waited
through MJPEG, and resumed with 188 packets without a WebRTC workaround.

Final endurance evidence:
`build/latestbuildroot/device-tests/stream-endurance-30m-10.0.87.133-20260821T113812Z/report.txt`.
Across 37 cycles it received 5,510 MJPEG frames (1,852,365,205 bytes) and
22,752 H.264 packets (151,228,894 bytes). Backend PID, helper count, media
modules, remote syslog, and zero dmesg/local-syslog alerts were identical at
the beginning and end.

Raw.10 was published on 2026-08-21 as combined RC11 with app `2.0.40` on tag
`hardened-system-0.3.0-raw.10`, targeting release commit `3cca4d8`. The final
published app archive SHA-256 is
`85e6aa195ccf7274203462a0488c9e251c567a523519fd50d4973eb60ddd65d5`;
the raw archive is
`e4d19f42305de9a3666ef7afb0a15000a857b742cfa58800037884c201c693db`;
and the compressed/uncompressed SD-image hashes are
`96e44ee8eb482ba2609348164b8c80ac1b94a1c1152db328331fba799d5e0632`
and
`2bfb0b2000786a6860f069b235fe6026fc8e77f7132f0f72e284e725246cb92e`.
The final raw payload uses normalized rootfs SHA-256
`400c7caf9a0b6096a82c53d5159970c57e57813adbc284c0a1c77ce853bb3110`
and compressed SHA-256
`a8b24b938e52db9a82f577c916ad9b7bb35b4fc2628aa18fac843633e284211d`.

All 16 assets were downloaded from GitHub after publication and passed
`SHA256SUMS`; both application and system metadata signatures verified. App
latest/preview now advertise `2.0.40`, system preview advertises
`0.3.0-raw.10`, and system stable intentionally remains `0.2.23-raw.1`.
Deferred visible mouse, host reboot/BIOS, OLED/button, separately authorized
ATX, and controlled power-loss coverage remain documented follow-up limits;
RC11 does not claim those gates passed. Vendor components with `NOASSERTION`
metadata remain explicitly documented in the release and input manifest.

## Inputs Already Available

The current vendor SDK is a usable source inventory, but is intentionally kept
outside the tracked project tree. It provides the following porting inputs:

| Area | Available source or artifact | Port use |
| --- | --- | --- |
| Boot chain | `u-boot-2021.10`, the vendor image scripts, and known-good `boot.sd` artifacts | Recreate the current boot partition and boot contract before changing it. |
| Kernel and board support | Vendor `linux_5.10` tree, SG2002 board configuration, modules, DTS inputs, `osdrv`, and `middleware` | Keep as a pinned vendor kernel/BSP in the first port; do not rebase it with the userspace migration. |
| Media | SG2002 codec firmware, middleware/MMF/VENC libraries, LT6911 configuration, `libkvm.so`, and `libkvm_mmf.so` | Build a complete ABI and firmware manifest before selecting the Buildroot libc/toolchain. |
| Rootfs behavior | `board/cvitek/SG200X` overlay, BusyBox fragment, init files, SSH configuration, console handling, and vendor environment setup | Move only reviewed files into a tracked external board tree; do not copy the whole overlay blindly. |
| Firmware and utilities | Vendor package recipes for codec firmware, AIC8800 Wi-Fi firmware, AXP2101, LCD utilities, TPU demos, and the CVITEK musl sysroot | Repackage with fixed sources, hashes, licenses, install paths, and an explicit decision for every item. |
| Hardened runtime | Rust backend, `kvm_system`, `libkvm`, `libkvm_mmf`, web assets, rootfs validator, and signed system-update tooling | Integrate only after the stock port passes hardware gates. |
| Reference media | Stock `boot.sd`, `rootfs.sd`, `upgrade.zip`, and known-good SD images | Use for partition, file, module, and ABI comparison only; never overwrite the only recovery media. |

The native runtime is the most restrictive input. `libkvm.so` requires the
vendor OpenCV, CVI ISP, AE/AF/AWB, MMF/VENC/VDEC/VPU, and C++ runtime libraries.
It also currently carries a build-directory RPATH. The new rootfs therefore
needs a dependency-closure and loader-path audit before it can start the Rust
backend. A package-version upgrade is not enough.

## What Is Missing

| Missing deliverable | Why it blocks a real image | Required evidence before it is considered complete |
| --- | --- | --- |
| Tracked `BR2_EXTERNAL` board tree | Stock Buildroot has no SG2002 board, overlay, firmware packages, or image layout. | A clean checkout can run `make BR2_EXTERNAL=... <board>_defconfig` without vendor-tree paths. |
| Source and license manifest | Several vendor recipes fetch Git commits or copy local source trees; some have no Buildroot hash file. | Every external package has a source URI, immutable revision, SHA-256/SHA-512, license, license file, and redistribution decision. |
| Toolchain and libc decision | MMF/VENC and other vendor binaries are dynamically linked against the existing musl/C++ ABI. A new libc can fail at load time or subtly at runtime. | A device-side loader test resolves every `DT_NEEDED` library and starts representative vendor binaries without fallback paths. |
| Kernel/DTS/modules package | The current kernel is built outside Buildroot and is tied to the SG2002 media and USB drivers. | Reproducible kernel, DTS, module, and firmware manifest plus boot of the vendor kernel with the new rootfs. |
| Boot/image layout integration | The existing SD image, raw updater, and recovery process depend on exact boot/rootfs/data layout and vendor metadata. | Partition table, boot files, image sizes, and recovery write procedure match the reference media. |
| MMF/VENC/LT6911 integration | Stock Buildroot has no CVI middleware, reserved-memory setup, sensor bridge configuration, or codec firmware package. | HDMI lock, MJPEG, H.264 Direct, restart, and resolution-change tests pass on hardware. |
| USB gadget integration | HID, RNDIS/ACM, and mass-storage behavior depends on kernel configfs, init ordering, and device-specific scripts. | Keyboard, mouse, paste, serial console, network gadget, and virtual media work across reconnect and reboot tests. |
| Rootfs service port | The vendor overlay sets init, environment, SSH, mDNS, console, and application paths. It is not yet audited for least privilege or current service assumptions. | A tracked reviewed overlay passes boot, SSH, network, time, logging, and persistence tests without obsolete vendor services. |
| Security baseline | Current SDK settings enable legacy OpenSSL algorithms and excess curl/FFmpeg/Python surface. A direct config carry-forward would preserve those risks. | Package/CVE review, disabled weak crypto/protocols, and a documented exception for every retained legacy component. |
| Production update/recovery design | Raw partition updates are lab-only and do not yet provide partition-aware power-loss rollback. | Recovery drill on sacrificial SD media and a signed update/rollback procedure validated independently from the stable channel. |

## Migration Plan And Gates

Every phase has a stop condition. Passing a phase authorizes only the next
phase; it does not authorize a release, a raw update, or a device flash.

| Phase | Work | Missing input resolved | Exit gate |
| --- | --- | --- | --- |
| 0. Freeze the reference | Record hashes of stock boot/rootfs images, partition table, kernel config, DTS, modules, firmware, running services, dynamic libraries, and device nodes. Record the vendor SDK and host-tools commits. | An auditable baseline for regression comparison. | Two independent inventories agree on the partition layout and critical runtime files. |
| 1. Create `BR2_EXTERNAL` | Add a tracked SG2002 external tree with board defconfig, reviewed rootfs overlay, BusyBox fragment, package Config.in files, image definitions, and a source manifest. | Portable project ownership of board configuration. | A fresh checkout configures without an absolute path or an untracked vendor board directory. |
| 2. Choose the ABI path | Compare two designs: retain the vendor musl ABI for vendor binaries, or rebuild the full CVI media stack with the new toolchain. Start with the former unless the loader proof fails. | Toolchain/libc compatibility decision. | `readelf` and on-device loader tests prove all `DT_NEEDED` entries of `libkvm`, `libkvm_mmf`, and `kvm_system` resolve. |
| 3. Package BSP inputs | Package or import the vendor kernel, U-Boot inputs, DTS, modules, SG2002 codec firmware, AIC8800 firmware, CVI middleware, and LT6911 assets with immutable provenance. | BSP and firmware closure. | Buildroot can create a rootfs plus a boot artifact without copying opaque files from a developer machine. |
| 4. Build a minimal rootfs | Build BusyBox/init, SSH, network, certificates, logging, and only the vendor runtime libraries required for a boot-to-shell proof. Do not add the Hardened application yet. | Basic userland boot. | Sacrificial SD boot reaches a local shell and SSH; `/data` mounts; no media or USB regression is accepted as a pass. |
| 5. Port board services | Recreate environment setup, device nodes, mDNS, Wi-Fi provisioning, time, syslog, TLS, account bootstrap, and the narrow privileged-helper contract. Remove unused Python/FFmpeg/tools rather than porting them by default. | Service and persistence parity. | Five reboot cycles preserve expected settings and show no init/service failures. |
| 6. Prove hardware planes | Bring up HDMI/LT6911, MMF/VENC, HID/configfs, RNDIS/ACM, virtual media, OLED/button, GPIO/ATX, and network separately. | Hardware feature parity. | The complete hardware matrix below passes before application injection. |
| 7. Integrate Hardened runtime | Build and inject the Rust server, web assets, native libraries, and `kvm_system` using the selected sysroot. Remove build-time RPATHs and capture the final dynamic dependency closure. | Application compatibility. | Authenticated web UI, MJPEG, H.264 Direct, terminal, HID, paste, TLS toggle, and controlled restart pass. |
| 8. Apply security baseline | Update network-facing and parser packages, disable SSLv3/weak algorithms and unused curl protocols, remove unused Python/FFmpeg components, and generate package/CVE SBOM data. Keep the kernel CVE set separate from the first userspace port. | Measurable security improvement. | Security review records every retained exception and the rootfs validator confirms the intended package/runtime set. |
| 9. Design update/recovery | Produce a signed experimental image only after device proof. Exercise power-loss-safe recovery from external SD media before considering raw partition updates. | Safe deployment path. | Install, failed-boot recovery, manual rollback, and SD-card restoration are demonstrated on sacrificial media. |
| 10. Release candidate | Build reproducibly from a clean host, compare artifact manifests with the reference, publish only a signed preview release, and soak-test before any stable move. | Release readiness. | Independent rebuild hashes, test evidence, and explicit approval for the release scope. |

## Hardware Acceptance Matrix

The following matrix is mandatory for phases 4 through 10. A web page loading
is not a successful base-system migration.

| Plane | Required checks |
| --- | --- |
| Boot and storage | Bootloader, kernel command line, rootfs mount, `/data` persistence, filesystem repair path, five reboots, and manual SD recovery. |
| Network and security | Ethernet, DHCP/static IPv4/IPv6, DNS, NTP, mDNS, SSH keys/password policy, HTTPS certificate lifecycle, firewall modes, and signed update download verification. |
| Video | LT6911 hotplug, EDID, resolution changes, MJPEG, H.264 Direct/WebSocket, encoder restart, capture restart, and long video soak with dmesg review. |
| USB and input | Keyboard, mouse, paste, HID reconnect, serial console, RNDIS/ACM, virtual CD-ROM/mass storage, and host reboot/BIOS behavior. Do not live-relink HID configfs: it previously caused a kernel oops. |
| Device control | OLED, button, LEDs, GPIO/ATX, fan/sensor interfaces, watchdog, and Wi-Fi provisioning where fitted. |
| Application | First-boot setup, login/lockout/CSRF, terminal, virtual media, service stop/start, Rust/native ABI loading, and system/application update status. |
| Recovery | Corrupt metadata rejection, failed service health check, manual rollback, failed-boot behavior, raw-update refusal unless lab mode is explicit, and full SD reflash. |

Use NanoKVM Cube `10.0.87.133` only after a sacrificial/recoverable SD-card
setup is ready. Do not use it for the first unbooted rootfs experiment.

## Security Workstream During The Port

The port must not delay the immediate security path:

1. Keep the stable `2023.11.2` vendor SDK route for curated, tested userspace
   backports while the board port is incomplete.
2. Treat OpenSSH, OpenSSL, curl, BusyBox, archive/XML parsers, and certificates
   as the first package families to review in the new rootfs.
3. Explicitly remove or justify vendor settings that enable SSLv3, weak ciphers,
   RC2/RC4/MD2/MD4, dynamic engines, and unnecessary curl protocols.
4. Start the port with the smallest runtime set: the Rust path does not justify
   automatically carrying the legacy Python web stack or all FFmpeg parsers and
   protocols.
5. Track kernel CVEs against the retained `5.10.4` vendor tree as a separate
   compatibility-sensitive patch queue. Do not claim that a newer Buildroot
   userspace fixes the kernel.

The local web lockfile now resolves the audited dependency graph without known
vulnerabilities, including compatible legacy/modern `brace-expansion` lines,
React Router `7.18.2`, and current patched PostCSS/nanoid/js-yaml releases.
GitHub alert state may remain stale until these uncommitted changes are reviewed
and pushed; it must be checked again before publication.

## Branch And Release Rules

- `latestbuilroot` is an engineering branch, not a release branch.
- Do not move `hardened-system-stable`, `hardened-rust-preview`, or the app
  latest release from this branch.
- Keep all probe output under ignored `build/latestbuildroot`; commit only
  scripts, external-board source, manifests, tests, and evidence documents.
- Every copied vendor asset needs provenance and a licensing decision before it
  enters the tracked project.
- Every boot attempt needs an SD-card recovery path and a record of the exact
  source commits, image hashes, and observed result.

The safe near-term security release remains a curated userspace backport on the
proven vendor SDK. The official-Buildroot port is the longer-term route to
remove the unmaintained base-system backlog.

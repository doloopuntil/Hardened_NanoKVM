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

The main repository also has open Dependabot alerts for web build dependencies.
They are outside the base-system port, but must be remediated in parallel rather
than being hidden by this branch.

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

# SG2002 Recovery-SD Image: CI Rebuild and raw.12 Elimination

`.github/workflows/build-sg2002-image.yml` rebuilds the SG2002 recovery-SD
image from scratch on `ubuntu-latest`: the vendor SDK, a from-scratch
Buildroot toolchain, the hardened Linux 5.10.265 kernel and every kernel
module, the `kvmapp` application bridge, and the final rootfs/boot/recovery
images. `workflow_dispatch` only -- it is multi-hour and disk-heavy, not run
on every push.

## Why this exists

The originally published `hardened-system-0.3.0-raw.12` release (and the
system-image releases before it) were built locally by the maintainer and
never had a CI job behind them -- `woffko/Hardened_NanoKVM` ships the build
scripts but no workflow invokes them (confirmed: its only workflow is an
unrelated issue-tracker webhook). Fixing the two missing CLI tools
(`nano`, `wg`) that started this work could have meant just patching the
published image. Instead, the goal became rebuilding the whole system from
source in CI so a result can be checked, not just claimed -- if this project
ever proposes an upstream PR, a maintainer should be able to see the
rebuild run clean rather than trust it blindly.

That goal only has teeth if the CI rebuild doesn't quietly lean on the
thing it's supposed to replace. This document tracks how much of the
pipeline still depends on the published raw.12 archive, and what closed
each dependency.

## Pipeline shape

Two jobs:

- **`vendor-sdk`** -- bootstraps the pinned `sipeed/LicheeRV-Nano-Build`
  vendor SDK (`make vendor-sdk`) and builds its stock image
  (`make vendor-sdk-stock`). Isolated because it's the single most
  expensive, most fragile stage (~14 GiB, long compile) and rarely changes
  once cached; a failure or timeout in the second job should never force
  redoing this one. Its entire output (`build/vendor`, including the stock
  build's `install/soc_sg2002_licheervnano_sd/rawimages/rootfs.sd`) is
  cached under `actions/cache`, keyed on the pinned SDK commit.
- **`build-image`** (`needs: vendor-sdk`) -- everything else: Buildroot
  bootstrap, the `kvmapp` Rust bridge, the hardened kernel rebuild, all 57
  kernel modules, rootfs assembly, boot FIT image, and the final recovery-SD
  image. Restores the same vendor-SDK cache (hard failure if it's missing --
  no silent redundant rebuild) plus separate caches for the Buildroot
  release tarball and its package-download directory.

Both jobs run in a `sg2002-image-build` concurrency group
(`cancel-in-progress: false`): dispatches queue rather than race, and a
new dispatch only ever cancels a run still waiting in that queue, never one
already executing.

## raw.12 dependency status

Everything below refers to the *published* `hardened-nanokvm-system-0.3.0-raw.12.tar.gz`
system archive specifically (`RAW12_SYSTEM_ARCHIVE_URL`) -- not the separate
`kvmapp` app-package archive, which retains one deliberate exception (see
"Explicitly out of scope" below).

### Closed

| Content | How it's sourced now | Evidence |
| --- | --- | --- |
| All 57 kernel modules (24 in-tree, 30 external, 3 media) | Rebuilt from source: in-tree modules from this pipeline's own kernel build; 30 external CVITEK/WiFi/BT/touch modules from the vendor SDK's `osdrv` tree; 3 media modules from a 3-stage chain across the vendor SDK and public `sophgo/osdrv` at two pinned commits | `support/sg2002/kernel/5.10.265/manifests/external-modules.txt`; workflow steps "Rebuild external CVITEK kernel modules from source" through "Substitute freshly-built modules into the runtime staging dir" |
| `libkvm.so` / `libkvm_mmf.so` | Always built in-repo from `server-rust/native` sources; never depended on raw.12 | `scripts/package-rust-kvmapp.sh` |
| 4 OpenCV modules (`core`/`highgui`/`imgcodecs`/`imgproc`) | Sourced from `sipeed/NanoKVM` upstream (GPL-3.0), verified near-byte-identical (same MaixCDK toolchain build) | workflow step "Source OpenCV core/highgui/imgcodecs/imgproc from upstream"; `server-rust/native/README.md` |
| 6 OpenCV/protobuf modules (`video`/`dnn`/`calib3d`/`features2d`/`flann`/`protobuf`) | Deleted entirely -- proven via exhaustive symbol-table analysis that `libkvm.so` calls nothing from them, after a `patchelf --remove-needed` patch | `server-rust/native/README.md` ("libkvm.so: removed video NEEDED entry") |
| `/mnt/system/usr/bin` (49 CVITEK sample/test binaries) | Deleted entirely -- no static or `dlopen()` reference anywhere in tracked source | `server-rust/native/README.md` ("/mnt/system/usr") |
| `/mnt/system/usr/lib` minus one file (32 files incl. `3rd/`) | Deleted entirely -- proven redundant against `dl_lib`'s search-path priority | same |
| ~32 CVI/ISP/audio middleware libraries in `dl_lib` (`libcvi_*`, `libisp*`, `libae`/`af`/`awb`, `libaac*`, `libcli.so`, `libini.so`, etc.) | Already checked into `server-rust/native/dl_lib` since before this fork tracked raw.12 at all; diffed byte-for-byte against raw.12 and confirmed identical; the CI pipeline no longer extracts them from raw.12 | `server-rust/native/README.md` ("dl_lib's CVI/ISP/audio middleware") |
| `libc.so` + 4 GCC runtime libs (`libstdc++.so.6.0.28`, `libgcc_s.so.1`, `libgomp.so.1.0.0`, `libatomic.so.1.2.0`) | Sourced from this pipeline's own `vendor-sdk-stock` build instead -- verified byte-identical on a real run | workflow step "Source libc.so, GCC runtime, and T-Head loaders from our own vendor-sdk-stock build"; `server-rust/native/README.md` |
| 2 T-Head musl loaders (`ld-musl-riscv64xthead.so.1`, `ld-musl-riscv64v0p7_xthead.so.1`) | Same as above -- byte-identical to `vendor-sdk-stock`'s own copies | same |

### Still raw.12-sourced: one file

**`libsns_lt6911.so`** -- the sensor plugin for the LT6911 HDMI bridge, this
device's one real sensor (every other `libsns_*.so` in the vendor tree is
for a sensor this hardware doesn't have). Checked against every source this
investigation found:

- Not in `sipeed/LicheeRV-Nano-Build`'s public source at all -- not in
  `build/sensors/sensor_list.json` (LT6911 is a bridge chip, not one of the
  ~50 standard CVITEK-supported image sensors), not under `middleware` or
  `osdrv`.
- Present in Sipeed's own base SD-card image
  (`sipeed/NanoKVM` release tag `NanoKVM`,
  `20240702_NanoKVM_Rev1_0_0.img.xz`) at the same path and size, but **not**
  byte-identical -- 1,889 of 14,568 bytes differ, a different vendor-SDK
  build, not a drop-in replacement.
- Present in this pipeline's own `vendor-sdk-stock` build, but also **not**
  byte-identical -- 2,100 of 14,568 bytes differ.

It's a proprietary blob with no public build path, present in every device
image checked but never with matching bytes to raw.12's copy. If this work
moves toward an upstream PR, this is the one deliberate, documented
exception -- not an oversight.

### Explicitly out of scope: `kvm_system`

`kvm_system` is sourced from the published `kvmapp` **app-package** archive
(`hardened-nanokvm-kvmapp-2.0.42.tar.gz`), a separate artifact from the
raw.12 system archive this document tracks. This is deliberate, not a gap in
this effort: the Hardened NanoKVM maintainer applied 26 real hardening
findings to `kvm_system` and did a one-time rebuild, so upstream's own
unpatched binary is a genuinely different build (confirmed by hash/size
mismatch), not an interchangeable source. Rebuilding it from source needs
the separate MaixCDK toolchain, out of scope for this pipeline. This mirrors
how `sipeed/NanoKVM`'s own release pipeline works: their `package.yml`
rebuilds `kvm_system` via MaixCDK as part of `make release-build`, but there
is no standalone "rebuild kvm_system" workflow to reuse, and no CI in
`woffko/Hardened_NanoKVM` to compare against either way.

### One remaining structural thread (not a content dependency)

The kernel module *paths* -- not content, which is fully overwritten by the
from-source rebuilds -- still come from raw.12's own `system/ko/` tree,
purely so the pipeline knows where each rebuilt `.ko` belongs (8 of the 57
nest under `3rd/`). Since the full manifest is already tracked in
`support/sg2002/kernel/5.10.265/manifests/external-modules.txt`, this could
be replaced with a static manifest instead of extracting the tree from
raw.12 -- low effort, not yet done, flagged here rather than left silent.

## Verification methodology

Every claim above is backed by one of:

- **Byte-for-byte comparison** (`cmp`/`sha256sum`) between a candidate
  source and raw.12's shipped copy, not just matching filenames/sizes.
- **Exhaustive symbol-table analysis** (`readelf --dyn-syms`) for the
  `libkvm.so` OpenCV dependency removal, checking every undefined symbol
  against every candidate export set.
- **`dlopen()` reference search** across every native binary and every
  tracked script, for content removed on the basis of "nothing references
  it."
- **SHA-256 pinning** throughout the workflow and in
  `scripts/validate-latest-buildroot-sg2002-rootfs.sh`, which re-checks
  final image content against pinned hashes regardless of which step
  produced it.

Dead ends are documented, not silently dropped: the public
`sophgo/host-tools` cross-toolchain repo was tried for both the loaders and
`libc.so` before `vendor-sdk-stock` was tried -- it's a generic
cross-toolchain build (unstripped, wrong size), not the vendor's on-device
runtime build, and that negative result is recorded in
`server-rust/native/README.md` alongside the positive ones so it isn't
re-attempted.

## Related documents

- [`server-rust/native/README.md`](../server-rust/native/README.md) -- the
  detailed per-file evidence this document summarizes.
- [`vendor-sdk-build.md`](vendor-sdk-build.md) -- how `make vendor-sdk-stock`
  itself works and what it produces.
- [`latest-buildroot-port.md`](latest-buildroot-port.md) -- a separate,
  earlier effort: the historical hardware-acceptance log for porting to
  official Buildroot with physical device testing (raw.1 through raw.10).
  This document's CI-rebuild work is downstream of that port already having
  landed as raw.11/raw.12; it does not repeat that acceptance testing.

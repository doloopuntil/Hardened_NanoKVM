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
| `libc.so` + 4 GCC runtime libs (`libstdc++.so.6.0.28`, `libgcc_s.so.1`, `libgomp.so.1.0.0`, `libatomic.so.1.2.0`) | Sourced from this pipeline's own `vendor-sdk-stock` build instead -- verified byte-identical on a real run | workflow step "Source the remaining runtime files from our own vendor-sdk-stock build"; `server-rust/native/README.md` |
| 2 T-Head musl loaders (`ld-musl-riscv64xthead.so.1`, `ld-musl-riscv64v0p7_xthead.so.1`) | Same as above -- byte-identical to `vendor-sdk-stock`'s own copies | same |
| `libsns_lt6911.so` (LT6911 HDMI sensor plugin) | Sourced from `vendor-sdk-stock` too. Its bytes aren't identical, but the difference is fully traced: real checked-in C source exists in the pinned vendor SDK commit (`middleware/v2/component/isp/sensor/cv182x/lontium_lt6911/`, `sg200x` symlinked to `cv182x`) -- an earlier search missed it to a truncated GitHub API response. Every string in the compiled output is identical except the compiler's embedded `__FILE__` build path (raw.12 was built on the maintainer's own machine, `/home/w0w/...`; this pipeline builds in a GitHub Actions runner). Same source, same logic, different debug string, never dereferenced as a real path | `server-rust/native/README.md` ("libc.so, GCC runtime, loaders, and libsns_lt6911.so") |

**No file shipped in the final image still comes from raw.12.** The
kernel/rootfs closure work, the `dl_lib` middleware closure, and this last
round together account for every file the pipeline ever pulled from it.

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

## External dependency audit

Closing raw.12 could have quietly traded one external dependency for
another unnecessary one. Auditing every non-raw.12 external fetch this
pipeline makes, against whether the already-cloned vendor SDK could have
supplied the same content instead:

| External source | What it provides | Redundant with the vendor SDK? |
| --- | --- | --- |
| `sophgo/host-tools` | The actual riscv64 cross-compiler toolchain, used to build the kernel and every kernel module | No -- this is the compiler itself; a prebuilt rootfs can't substitute for a toolchain. Confirmed by grepping every script that references it: all of them use `TOOLCHAIN_BIN=.../host-tools/gcc/riscv64-linux-musl-x86_64/bin` to invoke `gcc`/`ld`/`strip` directly. |
| `sipeed/NanoKVM` upstream | 4 OpenCV modules (`core`/`highgui`/`imgcodecs`/`imgproc`) | No -- confirmed by reading `scripts/prepare-latest-buildroot-sg2002-vendor-runtime.sh`, the historical script that originally extracted content from `vendor-sdk-stock`'s own rootfs: its own OpenCV set is `video`/`dnn`/`calib3d`/`features2d`/`flann`/`protobuf` at `/usr/lib/` -- exactly the 6 modules already proven unused and deleted, not the 4 this pipeline needs. `vendor-sdk-stock` never had the right OpenCV variant. |
| `sophgo/osdrv` (public, 2 pinned commits) | `soph_jpeg.ko` and `soph_vc_driver.ko` media modules | No -- already established when the kernel-module rebuild work closed this gap: the vendor SDK's own bundled `osdrv` predates compat fixes these two modules need. |
| `git.kernel.org` stable tree | Real upstream Linux 5.10.265 fixes for the kernel rehydration | Not applicable -- the whole point is pulling genuine upstream fixes the vendor's own kernel snapshot doesn't have. |
| `buildroot.org` | The Buildroot release tarball itself | Not applicable -- an unrelated upstream project, not vendor SDK content. |

One narrower finding, not a new external dependency: `build-linked-libkvm.sh`
links `libkvm.so` against `sophgo/host-tools`' own `libc.so`/`libgcc_s.so.1`
sysroot copies (fetched early, before `vendor-sdk-stock`'s equivalents are
extracted later in the same job) -- the same files independently confirmed
elsewhere in this pipeline to *not* be the on-device runtime build. This has
always worked in practice (linking only needs matching symbol tables, not
byte-identical content), and doesn't add or remove an external repo either
way since `host-tools` is fetched regardless for the compiler. It's a
loose end worth tightening for consistency -- using `vendor-sdk-stock`'s
now-verified copies for linking too -- but not yet done, since it would mean
reordering when that extraction step runs.

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

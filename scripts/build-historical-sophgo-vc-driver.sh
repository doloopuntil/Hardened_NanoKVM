#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
VENDOR_SDK_DIR="${HARDENED_SG2002_VENDOR_SDK_DIR:-/home/w0w/Hardened_NanoKVM/build/vendor/LicheeRV-Nano-Build}"
SOURCE_REPO="${SOPHGO_OSDRV_SOURCE_DIR:-$ROOT_DIR/build/latestbuildroot/sophgo-osdrv-aa542c41df94f7bc656cb740f6622a5dca7dc403}"
SOURCE_COMMIT="5ed7cc28daf7194885d87df2aa534a27a1956c70"
KERNEL_DIR="${HISTORICAL_VC_KERNEL_DIR:-$ROOT_DIR/build/latestbuildroot/kernel-baseline-5.10.4-v2}"
MINIMAL_VCODEC_DIR="${HISTORICAL_VC_VCODEC_DIR:-$ROOT_DIR/build/latestbuildroot/minimal-vendor-vcodec-5.10.4-v2/work/osdrv/interdrv/v2/vcodec}"
SOURCE_JPEG_DIR="${HISTORICAL_VC_JPEG_DIR:-$ROOT_DIR/build/latestbuildroot/sophgo-media-modules-5.10.4-v2/osdrv/interdrv/jpeg}"
OUTPUT_DIR="${HISTORICAL_VC_OUTPUT_DIR:-$ROOT_DIR/build/latestbuildroot/historical-sophgo-vc-5.10.4-v2}"
WORKTREE_DIR="$OUTPUT_DIR/osdrv"
ARTIFACT_DIR="$OUTPUT_DIR/artifacts"
REPORT_DIR="$OUTPUT_DIR/report"
PATCH_FILE="$ROOT_DIR/buildroot-external/hardened-sg2002/board/sg2002/kernel/patches/sophgo-osdrv-v2-vc-legacy-module-name.patch"
TOOLCHAIN_BIN="$VENDOR_SDK_DIR/host-tools/gcc/riscv64-linux-musl-x86_64/bin"
OLD_OSDRV="$VENDOR_SDK_DIR/osdrv/interdrv/v2"
OLD_MODULE="$VENDOR_SDK_DIR/install/soc_sg2002_licheervnano_sd/rootfs/mnt/system/ko/soph_vc_driver.ko"

require_file() {
    if [ ! -f "$1" ]; then
        echo "required file is missing: $1" >&2
        exit 1
    fi
}

require_dir() {
    if [ ! -d "$1" ]; then
        echo "required directory is missing: $1" >&2
        exit 1
    fi
}

for command_name in comm git make modinfo sha256sum sort; do
    if ! command -v "$command_name" >/dev/null 2>&1; then
        echo "required command is missing: $command_name" >&2
        exit 1
    fi
done

require_dir "$SOURCE_REPO"
require_dir "$KERNEL_DIR"
require_file "$PATCH_FILE"
require_file "$MINIMAL_VCODEC_DIR/Module.symvers"
require_file "$SOURCE_JPEG_DIR/Module.symvers"
require_file "$OLD_OSDRV/base/Module.symvers"
require_file "$OLD_OSDRV/sys/Module.symvers"
require_file "$OLD_MODULE"
require_file "$TOOLCHAIN_BIN/riscv64-unknown-linux-musl-gcc"

if [ -e "$OUTPUT_DIR" ]; then
    echo "refusing to reuse historical VC output: $OUTPUT_DIR" >&2
    exit 1
fi

mkdir -p "$OUTPUT_DIR" "$ARTIFACT_DIR" "$REPORT_DIR"
git -C "$SOURCE_REPO" worktree add --detach "$WORKTREE_DIR" "$SOURCE_COMMIT"
git -C "$WORKTREE_DIR" apply --check "$PATCH_FILE"
git -C "$WORKTREE_DIR" apply "$PATCH_FILE"

INTERDRV="$WORKTREE_DIR/interdrv/v2"
cp "$OLD_OSDRV/base/Module.symvers" "$INTERDRV/base/Module.symvers"
cp "$OLD_OSDRV/sys/Module.symvers" "$INTERDRV/sys/Module.symvers"
cp "$MINIMAL_VCODEC_DIR/Module.symvers" "$INTERDRV/vcodec/Module.symvers"
cp "$SOURCE_JPEG_DIR/Module.symvers" "$INTERDRV/jpeg/Module.symvers"

export PATH="$TOOLCHAIN_BIN:/usr/sbin:/usr/bin:/sbin:/bin"
MODULE_DIR="$INTERDRV/cvi_vc_drv"
make -C "$MODULE_DIR" \
    PWD="$MODULE_DIR" \
    KERNEL_DIR="$KERNEL_DIR" \
    ARCH=riscv \
    CROSS_COMPILE=riscv64-unknown-linux-musl- \
    CVIARCH_L=cv181x \
    SDK_VER=musl_riscv64 \
    all

NEW_MODULE="$MODULE_DIR/soph_vc_driver.ko"
require_file "$NEW_MODULE"
cp "$NEW_MODULE" "$ARTIFACT_DIR/soph_vc_driver.ko"

kernel_release="$(sed -n 's/^#define UTS_RELEASE "\(.*\)"$/\1/p' "$KERNEL_DIR/include/generated/utsrelease.h")"
if [ "$(modinfo -F name "$NEW_MODULE")" != "soph_vc_driver" ]; then
    echo "historical VC module name mismatch" >&2
    exit 1
fi
if [ "$(modinfo -F depends "$NEW_MODULE")" != "soph_jpeg,soph_vcodec,soph_base,soph_sys" ]; then
    echo "historical VC dependency set mismatch" >&2
    exit 1
fi
case "$(modinfo -F vermagic "$NEW_MODULE")" in
    "$kernel_release "*) ;;
    *) echo "historical VC vermagic mismatch" >&2; exit 1 ;;
esac
if modinfo -F parm "$NEW_MODULE" | grep -q '^rcHierarchy:'; then
    echo "historical VC unexpectedly contains late rcHierarchy parameter" >&2
    exit 1
fi

modinfo -F parm "$OLD_MODULE" | sort -u >"$REPORT_DIR/old-params.txt"
modinfo -F parm "$NEW_MODULE" | sort -u >"$REPORT_DIR/new-params.txt"
comm -23 "$REPORT_DIR/old-params.txt" "$REPORT_DIR/new-params.txt" \
    >"$REPORT_DIR/missing-old-params.txt"
if [ -s "$REPORT_DIR/missing-old-params.txt" ]; then
    echo "historical VC dropped old module parameters" >&2
    exit 1
fi

sha256sum "$PATCH_FILE" >"$REPORT_DIR/patch-sha256.txt"
sha256sum "$OLD_MODULE" "$ARTIFACT_DIR/soph_vc_driver.ko" \
    >"$REPORT_DIR/module-sha256.txt"
modinfo "$ARTIFACT_DIR/soph_vc_driver.ko" >"$REPORT_DIR/modinfo.txt"

cat >"$REPORT_DIR/summary.md" <<EOF
# Historical SOPHGO VC driver compatibility build

- source commit: \`$SOURCE_COMMIT\` (2024-05-27)
- target kernel release: \`$kernel_release\`
- module name: \`soph_vc_driver\`
- dependencies: \`soph_jpeg,soph_vcodec,soph_base,soph_sys\`
- dropped old module parameters: **0**
- late \`rcHierarchy\` parameter: **absent**

This is the earliest available public VC source snapshot. It predates the
kernel-level vcodec mutex/common-memory API used by later releases and is built
against the accepted vcodec/JPEG symbol contracts. Runtime compatibility still
requires a rollback-guarded H.264 device soak.
EOF

cat "$REPORT_DIR/summary.md"
echo "historical SOPHGO VC report: $REPORT_DIR/summary.md"

#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
VENDOR_SDK_DIR="${HARDENED_SG2002_VENDOR_SDK_DIR:-/home/w0w/Hardened_NanoKVM/build/vendor/LicheeRV-Nano-Build}"
VENDOR_COMMIT="d88d58feca49ef15f4cc7bd1f27dbf17dc25f85e"
KERNEL_DIR="${MINIMAL_VCODEC_KERNEL_DIR:-$ROOT_DIR/build/latestbuildroot/kernel-baseline-5.10.4-v2}"
OUTPUT_DIR="${MINIMAL_VCODEC_OUTPUT_DIR:-$ROOT_DIR/build/latestbuildroot/minimal-vendor-vcodec-5.10.4-v2}"
WORK_DIR="$OUTPUT_DIR/work"
ARTIFACT_DIR="$OUTPUT_DIR/artifacts"
REPORT_DIR="$OUTPUT_DIR/report"
SOURCE_ARCHIVE="$OUTPUT_DIR/vendor-vcodec-source.tar"
PATCH_FILE="$ROOT_DIR/buildroot-external/hardened-sg2002/board/sg2002/kernel/patches/vendor-vcodec-open-vc-compat.patch"
TOOLCHAIN_BIN="$VENDOR_SDK_DIR/host-tools/gcc/riscv64-linux-musl-x86_64/bin"
OLD_MODULE="$VENDOR_SDK_DIR/install/soc_sg2002_licheervnano_sd/rootfs/mnt/system/ko/soph_vcodec.ko"
OLD_SYMVERS="$VENDOR_SDK_DIR/osdrv/interdrv/v2/vcodec/Module.symvers"
EXTRA_KCFLAGS="${MINIMAL_VCODEC_KCFLAGS:-}"

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

for command_name in comm git make modinfo patch sha256sum sort tar; do
    if ! command -v "$command_name" >/dev/null 2>&1; then
        echo "required command is missing: $command_name" >&2
        exit 1
    fi
done

require_dir "$VENDOR_SDK_DIR/.git"
require_dir "$KERNEL_DIR"
require_file "$PATCH_FILE"
require_file "$OLD_MODULE"
require_file "$OLD_SYMVERS"
require_file "$KERNEL_DIR/include/generated/utsrelease.h"
require_file "$TOOLCHAIN_BIN/riscv64-unknown-linux-musl-gcc"

if [ -e "$OUTPUT_DIR" ]; then
    echo "refusing to reuse minimal vcodec output: $OUTPUT_DIR" >&2
    exit 1
fi

actual_vendor_commit="$(git -C "$VENDOR_SDK_DIR" rev-parse HEAD)"
if [ "$actual_vendor_commit" != "$VENDOR_COMMIT" ]; then
    echo "unexpected vendor SDK commit: $actual_vendor_commit" >&2
    exit 1
fi

mkdir -p "$WORK_DIR" "$ARTIFACT_DIR" "$REPORT_DIR"
git -C "$VENDOR_SDK_DIR" archive --format=tar --output="$SOURCE_ARCHIVE" HEAD \
    osdrv/interdrv/v2/Makefile.interdrv.param \
    osdrv/interdrv/v2/include \
    osdrv/interdrv/v2/vcodec
tar -xf "$SOURCE_ARCHIVE" -C "$WORK_DIR"
patch --directory="$WORK_DIR" --strip=1 --forward --dry-run --input="$PATCH_FILE"
patch --directory="$WORK_DIR" --strip=1 --forward --input="$PATCH_FILE"

PATCHED_SOURCE="$WORK_DIR/osdrv/interdrv/v2/vcodec/cvi_vcodec.c"
grep -q '^static DEFINE_MUTEX(vcodec_mutex);$' "$PATCHED_SOURCE"
grep -q '^void vpu_set_common_memory(unsigned long core, vpudrv_buffer_t \*p_vdb)$' "$PATCHED_SOURCE"

export PATH="$TOOLCHAIN_BIN:/usr/sbin:/usr/bin:/sbin:/bin"
export ARCH=riscv
export CROSS_COMPILE=riscv64-unknown-linux-musl-
export CHIP_CODE=mars

MODULE_DIR="$WORK_DIR/osdrv/interdrv/v2/vcodec"
make -C "$MODULE_DIR" \
    PWD="$MODULE_DIR" \
    KERNEL_DIR="$KERNEL_DIR" \
    ARCH="$ARCH" \
    CROSS_COMPILE="$CROSS_COMPILE" \
    CHIP_CODE="$CHIP_CODE" \
    KCFLAGS="$EXTRA_KCFLAGS" \
    all

NEW_MODULE="$MODULE_DIR/soph_vcodec.ko"
NEW_SYMVERS="$MODULE_DIR/Module.symvers"
require_file "$NEW_MODULE"
require_file "$NEW_SYMVERS"
cp "$NEW_MODULE" "$ARTIFACT_DIR/soph_vcodec.ko"

kernel_release="$(sed -n 's/^#define UTS_RELEASE "\(.*\)"$/\1/p' "$KERNEL_DIR/include/generated/utsrelease.h")"
if [ "$(modinfo -F name "$NEW_MODULE")" != "soph_vcodec" ]; then
    echo "minimal vcodec module name mismatch" >&2
    exit 1
fi
case "$(modinfo -F vermagic "$NEW_MODULE")" in
    "$kernel_release "*) ;;
    *) echo "minimal vcodec vermagic mismatch" >&2; exit 1 ;;
esac

awk '{print $2}' "$OLD_SYMVERS" | sort -u >"$REPORT_DIR/old-exports.txt"
awk '{print $2}' "$NEW_SYMVERS" | sort -u >"$REPORT_DIR/new-exports.txt"
comm -23 "$REPORT_DIR/old-exports.txt" "$REPORT_DIR/new-exports.txt" \
    >"$REPORT_DIR/missing-old-exports.txt"
comm -13 "$REPORT_DIR/old-exports.txt" "$REPORT_DIR/new-exports.txt" \
    >"$REPORT_DIR/new-only-exports.txt"

if [ -s "$REPORT_DIR/missing-old-exports.txt" ]; then
    echo "minimal vcodec dropped existing exports" >&2
    exit 1
fi

cat >"$REPORT_DIR/expected-new-exports.txt" <<'EOF'
vcodec_is_locked
vcodec_lock
vcodec_trylock
vcodec_unlock
vpu_set_common_memory
EOF
if ! cmp -s "$REPORT_DIR/expected-new-exports.txt" "$REPORT_DIR/new-only-exports.txt"; then
    echo "minimal vcodec export delta is unexpected" >&2
    exit 1
fi

sha256sum "$PATCH_FILE" >"$REPORT_DIR/patch-sha256.txt"
sha256sum "$OLD_MODULE" "$ARTIFACT_DIR/soph_vcodec.ko" \
    >"$REPORT_DIR/module-sha256.txt"
modinfo "$OLD_MODULE" >"$REPORT_DIR/old-modinfo.txt"
modinfo "$ARTIFACT_DIR/soph_vcodec.ko" >"$REPORT_DIR/new-modinfo.txt"

cat >"$REPORT_DIR/summary.md" <<EOF
# Minimal vendor vcodec compatibility build

- vendor SDK commit: \`$VENDOR_COMMIT\`
- target kernel release: \`$kernel_release\`
- base: the device-proven Sipeed \`soph_vcodec\` source
- retained exports: **$(wc -l < "$REPORT_DIR/old-exports.txt")**
- added exports: **5**
- dropped exports: **0**
- added API: \`vcodec_lock\`, \`vcodec_unlock\`, \`vcodec_trylock\`,
  \`vcodec_is_locked\`, and \`vpu_set_common_memory\`

The module deliberately omits the later SOPHGO IRQ, suspend/resume, register,
and common-memory-array rewrite because those unrelated changes are outside
this bounded compatibility patch. Runtime safety still requires a correctly
armed rollback-guarded reboot and video soak.
EOF

cat "$REPORT_DIR/summary.md"
echo "minimal vendor vcodec report: $REPORT_DIR/summary.md"

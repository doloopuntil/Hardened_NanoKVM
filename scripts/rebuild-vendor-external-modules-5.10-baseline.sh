#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
VENDOR_SDK_DIR="${HARDENED_SG2002_VENDOR_SDK_DIR:-/home/w0w/Hardened_NanoKVM/build/vendor/LicheeRV-Nano-Build}"
KERNEL_BASELINE_DIR="${KERNEL_BASELINE_OUTPUT_DIR:-$ROOT_DIR/build/latestbuildroot/kernel-baseline-5.10.4-v2}"
MODULE_PROVENANCE_DIR="${MODULE_PROVENANCE_DIR:-$ROOT_DIR/build/latestbuildroot/module-provenance-raw10-v5}"
RUNTIME_MODULE_DIR="${VENDOR_MODULE_SOURCE_DIR:-$ROOT_DIR/build/latestbuildroot/vendor-runtime-source-media-v1/system/ko}"
OUTPUT_DIR="${EXTERNAL_MODULE_BASELINE_OUTPUT_DIR:-$ROOT_DIR/build/latestbuildroot/external-modules-5.10.4-v3}"
SOURCE_DIR="$OUTPUT_DIR/osdrv"
BUILD_CONFIG_DIR="$OUTPUT_DIR/build-config"
INSTALL_DIR="$OUTPUT_DIR/install"
ARTIFACT_DIR="$OUTPUT_DIR/artifacts"
REPORT_DIR="$OUTPUT_DIR/report"
TOOLCHAIN_BIN="$VENDOR_SDK_DIR/host-tools/gcc/riscv64-linux-musl-x86_64/bin"
TOOLCHAIN_PREFIX="$TOOLCHAIN_BIN/riscv64-unknown-linux-musl-"
STRIP="${TOOLCHAIN_PREFIX}strip"
PROVENANCE_MANIFEST="$MODULE_PROVENANCE_DIR/report/module-provenance.tsv"
REFERENCE_OSDRV_PATH="$VENDOR_SDK_DIR/osdrv"
REFERENCE_SOURCE_DATE_EPOCH="1782670640"

require_command() {
	command -v "$1" >/dev/null 2>&1 || {
		echo "required command is missing: $1" >&2
		exit 1
	}
}

for command in make modinfo rsync sha256sum sort
do
	require_command "$command"
done

for path in \
	"$VENDOR_SDK_DIR/osdrv" \
	"$VENDOR_SDK_DIR/build/.config" \
	"$KERNEL_BASELINE_DIR/.config" \
	"$KERNEL_BASELINE_DIR/Module.symvers" \
	"$KERNEL_BASELINE_DIR/arch/riscv/boot/Image" \
	"$KERNEL_BASELINE_DIR/vmlinux" \
	"$RUNTIME_MODULE_DIR" \
	"$PROVENANCE_MANIFEST" \
	"${TOOLCHAIN_PREFIX}gcc" \
	"$STRIP"
do
	[ -e "$path" ] || {
		echo "required external-module rebuild input is missing: $path" >&2
		exit 1
	}
done

if [ -e "$OUTPUT_DIR" ]; then
	echo "refusing to overwrite external-module baseline output: $OUTPUT_DIR" >&2
	exit 1
fi

mkdir -p "$SOURCE_DIR" "$BUILD_CONFIG_DIR" "$INSTALL_DIR/3rd" "$ARTIFACT_DIR" "$REPORT_DIR"
cp "$VENDOR_SDK_DIR/build/.config" "$BUILD_CONFIG_DIR/.config"

rsync -a \
	--exclude='*.o' \
	--exclude='*.ko' \
	--exclude='*.mod' \
	--exclude='*.mod.c' \
	--exclude='*.cmd' \
	--exclude='Module.symvers' \
	--exclude='modules.order' \
	"$VENDOR_SDK_DIR/osdrv/" "$SOURCE_DIR/"

sha256sum \
	"$KERNEL_BASELINE_DIR/.config" \
	"$KERNEL_BASELINE_DIR/Module.symvers" \
	"$KERNEL_BASELINE_DIR/arch/riscv/boot/Image" \
	"$KERNEL_BASELINE_DIR/vmlinux" > "$REPORT_DIR/kernel-input-before.sha256"

TARGETS=(
	sys base pwm rtc wdt tpu mon clock_cooling saradc wiegand
	vi snsr_i2c cif vpss dwa rgn vo rtos_cmdqu fast_image ive fb
	wireless tp wiegand-gpio
)

(
	cd "$SOURCE_DIR"
	for target in "${TARGETS[@]}"
	do
		env -i \
			HOME="${HOME:-/home/w0w}" \
			USER="${USER:-w0w}" \
			LOGNAME="${LOGNAME:-${USER:-w0w}}" \
			SHELL=/bin/bash \
			PATH="$TOOLCHAIN_BIN:/usr/bin:/bin" \
			PWD="$SOURCE_DIR" \
			TZ=UTC \
			SOURCE_DATE_EPOCH="$REFERENCE_SOURCE_DATE_EPOCH" \
			BUILD_PATH="$BUILD_CONFIG_DIR" \
			CHIP_ARCH=SG200X \
			CHIP_CODE=MARS \
			MW_VER=v2 \
			ARCH=riscv \
			CROSS_COMPILE="${TOOLCHAIN_PREFIX}" \
			KCFLAGS="-fmacro-prefix-map=$SOURCE_DIR=$REFERENCE_OSDRV_PATH" \
			make KERNEL_DIR="$KERNEL_BASELINE_DIR" \
				INSTALL_DIR="$INSTALL_DIR" "$target"
	done
)

sha256sum \
	"$KERNEL_BASELINE_DIR/.config" \
	"$KERNEL_BASELINE_DIR/Module.symvers" \
	"$KERNEL_BASELINE_DIR/arch/riscv/boot/Image" \
	"$KERNEL_BASELINE_DIR/vmlinux" > "$REPORT_DIR/kernel-input-after.sha256"
cmp -s "$REPORT_DIR/kernel-input-before.sha256" "$REPORT_DIR/kernel-input-after.sha256" || {
	echo "external-module build modified clean kernel baseline inputs" >&2
	exit 1
}

EXPECTED_LIST="$REPORT_DIR/expected-modules.txt"
BUILT_LIST="$REPORT_DIR/built-modules.txt"
awk -F '\t' 'NR > 1 && $2 == "retained-vendor-module" {print $1}' \
	"$PROVENANCE_MANIFEST" | LC_ALL=C sort > "$EXPECTED_LIST"
find "$INSTALL_DIR" -type f -name '*.ko' -printf '%P\n' | LC_ALL=C sort > "$BUILT_LIST"
cmp -s "$EXPECTED_LIST" "$BUILT_LIST" || {
	echo "rebuilt external-module inventory differs from accepted retained inventory" >&2
	diff -u "$EXPECTED_LIST" "$BUILT_LIST" >&2 || true
	exit 1
}

MANIFEST="$REPORT_DIR/rebuild-comparison.tsv"
printf 'module\taccepted_sha256\tbuilt_sha256\tpackaged_sha256\tvermagic\tsrcversion\tstatus\n' > "$MANIFEST"

total=0
matches=0
mismatches=0
while IFS= read -r relative
do
	total=$((total + 1))
	built="$INSTALL_DIR/$relative"
	accepted="$RUNTIME_MODULE_DIR/$relative"
	[ -f "$built" ]
	[ -f "$accepted" ]

	artifact="$ARTIFACT_DIR/$relative"
	mkdir -p "$(dirname "$artifact")"
	cp "$built" "$artifact"
	built_sha256="$(sha256sum "$artifact" | awk '{print $1}')"
	"$STRIP" --strip-unneeded "$artifact"
	packaged_sha256="$(sha256sum "$artifact" | awk '{print $1}')"
	accepted_sha256="$(sha256sum "$accepted" | awk '{print $1}')"
	vermagic="$(modinfo -F vermagic "$artifact" 2>/dev/null | tr '\r\n' ' ')"
	srcversion="$(modinfo -F srcversion "$artifact" 2>/dev/null | tr '\r\n' ' ')"

	if [ "$packaged_sha256" = "$accepted_sha256" ]; then
		status=match
		matches=$((matches + 1))
	else
		status=mismatch
		mismatches=$((mismatches + 1))
	fi
	printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\n' \
		"$relative" "$accepted_sha256" "$built_sha256" "$packaged_sha256" \
		"$vermagic" "$srcversion" "$status" >> "$MANIFEST"
done < "$EXPECTED_LIST"

find "$ARTIFACT_DIR" -type f -exec touch -d '@0' {} +
sha256sum "$MANIFEST" > "$REPORT_DIR/SHA256SUMS"

cat > "$REPORT_DIR/summary.md" <<EOF
# Vendor external-module clean baseline rebuild

- pinned kernel baseline: \`$KERNEL_BASELINE_DIR\`
- isolated osdrv source: \`$SOURCE_DIR\`
- expected/rebuilt retained modules: **$total/$total**
- packaged byte matches: **$matches**
- packaged mismatches: **$mismatches**
- kernel baseline input mutation: **none**

The build uses the pinned board config, Xuantie GCC/binutils, SG200X/MARS
middleware settings, and the clean byte-exact kernel output. Every candidate is
normalized with the same pinned \`strip --strip-unneeded\` packaging transform
before comparison with the accepted raw.10 module. The original osdrv source
prefix and compile-time macros are reproduced with \`-fmacro-prefix-map\` and
the recorded source-date epoch; this changes only build metadata embedded by
\`__FILE__\`, \`__DATE__\`, and \`__TIME__\`.
EOF

cat "$REPORT_DIR/summary.md"
if [ "$mismatches" -ne 0 ]; then
	echo "external-module rebuild produced $mismatches mismatches" >&2
	exit 2
fi
printf 'external-module baseline report: %s\n' "$REPORT_DIR/summary.md"

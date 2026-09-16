#!/usr/bin/env bash
set -euo pipefail

# Extracts one file from this pipeline's own vendor-sdk-stock rootfs.sd
# (make vendor-sdk-stock, already built and cached by the vendor-sdk CI
# job -- the real on-device NanoKVM image, not a generic toolchain
# package). Tries each candidate path in order, stopping at the first
# that exists: none of these files live under /kvmapp/ in a stock
# (no-app) image, so the exact path varies. See server-rust/native/README.md.

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
VENDOR_SDK_DIR="${HARDENED_SG2002_VENDOR_SDK_DIR:-$ROOT_DIR/build/vendor/LicheeRV-Nano-Build}"
STOCK_ROOTFS="$VENDOR_SDK_DIR/install/soc_sg2002_licheervnano_sd/rawimages/rootfs.sd"

if [ "$#" -lt 2 ]; then
	echo "usage: $0 <dest> <candidate-path> [candidate-path...]" >&2
	exit 1
fi

DEST="$1"
shift

[ -s "$STOCK_ROOTFS" ] || {
	echo "vendor-sdk-stock rootfs.sd not found: $STOCK_ROOTFS" >&2
	exit 1
}

mkdir -p "$(dirname "$DEST")"
for candidate in "$@"; do
	rm -f "$DEST"
	if debugfs -R "dump $candidate $DEST" "$STOCK_ROOTFS" >/dev/null 2>&1 && [ -s "$DEST" ]; then
		echo "$(basename "$DEST") <- $candidate"
		exit 0
	fi
done

rm -f "$DEST"
echo "$(basename "$DEST") not found in vendor-sdk-stock at any probed path" >&2
exit 1

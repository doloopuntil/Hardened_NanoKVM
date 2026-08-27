#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
RC12_RUN_ROOT="${RC12_RUN_ROOT:-$ROOT_DIR/build/latestbuildroot/kernel-5.10.265-rc12-release-a}"
SECURITY_PATCH_LEVEL="${RC12_SECURITY_PATCH_LEVEL:-Buildroot 2026.05.1 security maintenance Linux 5.10.265 SG2002 vendor port}"
SD_IMAGE="$RC12_RUN_ROOT/recovery/assembly/images/hardened-sg2002-port.img"
BUILD_COMMIT_FILE="$RC12_RUN_ROOT/_reports/outer-commit.txt"
RAW_OUTPUT_ROOT="${RC12_RAW_OUTPUT_ROOT:-$ROOT_DIR/build/latestbuildroot/raw-system-update-0.3.0-raw.12}"

[ -f "$SD_IMAGE" ] || {
	echo "missing accepted RC12 SD image: $SD_IMAGE" >&2
	exit 1
}
[ -f "$BUILD_COMMIT_FILE" ] || {
	echo "missing RC12 build commit evidence: $BUILD_COMMIT_FILE" >&2
	exit 1
}
BUILD_COMMIT="$(cat "$BUILD_COMMIT_FILE")"
git -C "$ROOT_DIR" cat-file -e "$BUILD_COMMIT^{commit}"

HARDENED_SG2002_SYSTEM_VERSION=0.3.0-raw.12 \
HARDENED_SG2002_SYSTEM_TAG=hardened-system-0.3.0-raw.12 \
HARDENED_SG2002_SYSTEM_TARGET=sg2002-licheervnano-sd \
HARDENED_SG2002_KERNEL_VERSION=5.10.265-tag- \
HARDENED_SG2002_SECURITY_PATCH_LEVEL="$SECURITY_PATCH_LEVEL" \
HARDENED_SG2002_ROOTFS_SECURITY_PATCH_LEVEL="$SECURITY_PATCH_LEVEL" \
HARDENED_SG2002_SD_IMAGE="$SD_IMAGE" \
HARDENED_SG2002_RAW_IMAGES_DIR="$RAW_OUTPUT_ROOT/images" \
HARDENED_SG2002_RAW_UPDATE_OUT="$RAW_OUTPUT_ROOT/artifacts" \
EXPECTED_KVMAPP_VERSION=2.0.41 \
SYSTEM_UPDATE_REQUIRED_APP_VERSION=2.0.41 \
	SYSTEM_UPDATE_SOURCE_COMMIT="$BUILD_COMMIT" \
	exec "$ROOT_DIR/scripts/package-latest-buildroot-sg2002-raw-update.sh"

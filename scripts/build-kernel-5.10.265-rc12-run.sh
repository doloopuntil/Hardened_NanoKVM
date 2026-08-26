#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
EXPECTED_SYSTEM_VERSION="${EXPECTED_SYSTEM_VERSION:-0.3.0-raw.12}"
EXPECTED_KVMAPP_VERSION="${EXPECTED_KVMAPP_VERSION:-2.0.41}"
EXPECTED_KERNEL_RELEASE="${EXPECTED_KERNEL_RELEASE:-5.10.265-tag-}"
EXPECTED_SECURITY_PATCH_LEVEL="${EXPECTED_SECURITY_PATCH_LEVEL:-Buildroot 2026.05.1 security maintenance Linux 5.10.265 SG2002 vendor port}"
KERNEL_5_10_265_CONFIG_FRAGMENT="${KERNEL_5_10_265_CONFIG_FRAGMENT:-$ROOT_DIR/support/sg2002/kernel/5.10.265/configs/phase3-04-init-on-alloc.config}"

[ -f "$KERNEL_5_10_265_CONFIG_FRAGMENT" ] || {
	echo "missing accepted RC12 kernel fragment: $KERNEL_5_10_265_CONFIG_FRAGMENT" >&2
	exit 1
}
[ "$EXPECTED_SYSTEM_VERSION" = 0.3.0-raw.12 ] || {
	echo "RC12 build requires system 0.3.0-raw.12" >&2
	exit 1
}
[ "$EXPECTED_KVMAPP_VERSION" = 2.0.41 ] || {
	echo "RC12 build requires application 2.0.41" >&2
	exit 1
}
[ "$EXPECTED_KERNEL_RELEASE" = 5.10.265-tag- ] || {
	echo "RC12 build requires kernel 5.10.265-tag-" >&2
	exit 1
}

export EXPECTED_SYSTEM_VERSION
export EXPECTED_KVMAPP_VERSION
export EXPECTED_KERNEL_RELEASE
export EXPECTED_SECURITY_PATCH_LEVEL
export KERNEL_5_10_265_CONFIG_FRAGMENT
exec "$ROOT_DIR/scripts/build-kernel-5.10.265-repro-run.sh"

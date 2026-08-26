#!/bin/sh
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
BASE_VERIFIER="${RC12_BASE_VERIFIER:-$SCRIPT_DIR/verify-kernel-slab-random-only-device.sh}"
EXPECTED_BOOT_SHA256=a296fd70af3a965d105512b67254db9d7d08998b14632bfea194e2208e02b9aa
EXPECTED_SECURITY_PATCH_LEVEL='Buildroot 2026.05.1 security maintenance Linux 5.10.265 SG2002 vendor port'

fail() {
	echo "FAIL: $*" >&2
	exit 1
}

[ -f "$BASE_VERIFIER" ] || fail "base device verifier is missing"
[ "$(sha256sum /boot/boot.sd | awk '{print $1}')" = "$EXPECTED_BOOT_SHA256" ] || \
	fail "running boot FIT is not the selected RC12 artifact"
grep -Fq '"version": "0.3.0-raw.12"' /etc/kvm/system-version.json || \
	fail "RC12 system version metadata is missing"
grep -Fq '"kernel_version": "5.10.265-tag-"' /etc/kvm/system-version.json || \
	fail "RC12 kernel metadata is missing"
grep -Fq "\"security_patch_level\": \"$EXPECTED_SECURITY_PATCH_LEVEL\"" \
	/etc/kvm/system-version.json || fail "RC12 security patch metadata is missing"

printf 'RC12_BOOT_SHA256=%s\n' "$EXPECTED_BOOT_SHA256"
printf 'RC12_SYSTEM_METADATA=exact\n'
EXPECTED_KERNEL_RELEASE=5.10.265-tag- \
EXPECTED_SYSTEM_VERSION=0.3.0-raw.12 \
EXPECTED_APP_VERSION=2.0.41 \
EXPECTED_CONFIG_SHA256=845714bfa1ab3d03ef356eb9896ad0198460aa9cd2a6d0cdb0021a5d639a9a6d \
EXPECTED_PROVENANCE_SHA256=5158d92465e17ebdea692f3e2569a7efefc829881f4f01e9503627e76b730886 \
EXPECTED_MODULE_SET_SHA256=bcc0f878699001f5e06249598ad6744d157d26cd89cb345e769eeff38cdcc961 \
EXPECTED_ROOTFS_COMMIT=34cb2cb \
EXPECTED_OS_RELEASE_SHA256=a708712c47b90a40a2e51fa77654f32ea02e3ae085fd7e43c6401ecbc5fb4cff \
EXPECTED_CURL_SHA256=6d4bb755011baec020cf7aedbd0d55659a0c826d4f78915a9cb63945195f9a3d \
EXPECTED_UDEVD_SHA256=02f7c48ad2cb44fb60637326c9627d15dc93b406d862539fa349a87352571ef8 \
EXPECTED_LIBCURL_SHA256=212fa3f5a4c6dec0972bf1495fafd5ca93eec3af6bb6bb6b9e71af9f143d474d \
EXPECTED_INIT_ON_ALLOC=on \
EXPECTED_INIT_ON_FREE=off \
	exec "$BASE_VERIFIER"

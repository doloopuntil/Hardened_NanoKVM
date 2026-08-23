#!/bin/sh
set -eu

EXPECTED_KERNEL_RELEASE="${EXPECTED_KERNEL_RELEASE:-5.10.265-tag-}"
EXPECTED_SYSTEM_VERSION="${EXPECTED_SYSTEM_VERSION:-0.3.0-raw.11}"
EXPECTED_APP_VERSION="${EXPECTED_APP_VERSION:-2.0.41}"
DMESG_ALERT_PATTERN='oops|panic|segfault|BUG:|Unknown symbol|disagrees about version|invalid module format|hung task|rcu.*stall'

fail() {
	echo "FAIL: $*" >&2
	exit 1
}

[ "$(id -u)" = 0 ] || fail "device verifier must run as root"
[ "$(uname -r)" = "$EXPECTED_KERNEL_RELEASE" ] || fail "unexpected kernel release"
[ "$(cat /kvmapp/version)" = "$EXPECTED_APP_VERSION" ] || fail "unexpected app version"

system_version="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
	/etc/kvm/system-version.json | head -n 1)"
[ "$system_version" = "$EXPECTED_SYSTEM_VERSION" ] || fail "unexpected system version"

[ "$(cat /proc/sys/kernel/dmesg_restrict)" = 1 ] || \
	fail "kernel.dmesg_restrict is not enabled"
dmesg >/dev/null 2>&1 || fail "root can no longer read the kernel log"

unprivileged_error="/tmp/hardened-dmesg-unprivileged.$$.err"
trap 'rm -f "$unprivileged_error"' EXIT INT TERM
if su -s /bin/sh nobody -c 'dmesg >/dev/null' 2>"$unprivileged_error"; then
	fail "unprivileged dmesg unexpectedly succeeded"
fi
grep -Eqi 'not permitted|permission denied' "$unprivileged_error" || \
	fail "unprivileged dmesg failed without a permission error"

module_count="$(find /mnt/system/ko -type f -name '*.ko' | wc -l)"
[ "$module_count" -eq 57 ] || fail "packaged runtime module inventory is not 57"
for module in soph_sys soph_base soph_vi soph_vcodec soph_jpeg soph_vc_driver
do
	grep -q "^$module " /proc/modules || fail "required module is not loaded: $module"
done

awk '$2 == "/" && $4 ~ /(^|,)rw(,|$)/ { found=1 } END { exit !found }' /proc/mounts || \
	fail "root filesystem is not mounted read-write"
awk '$2 == "/boot" && $4 ~ /(^|,)rw(,|$)/ { found=1 } END { exit !found }' /proc/mounts || \
	fail "boot filesystem is not mounted read-write"
awk '$2 == "/data" && $4 ~ /(^|,)rw(,|$)/ { found=1 } END { exit !found }' /proc/mounts || \
	fail "data filesystem is not mounted read-write"
[ -e /sys/class/net/eth0 ] || fail "Ethernet interface is missing"

dmesg_alerts="$(dmesg | grep -Eic "$DMESG_ALERT_PATTERN" || true)"
[ "$dmesg_alerts" -eq 0 ] || fail "kernel log contains $dmesg_alerts alert lines"

printf 'KERNEL=%s\n' "$(uname -r)"
printf 'DMESG_RESTRICT=%s\n' "$(cat /proc/sys/kernel/dmesg_restrict)"
printf 'ROOT_DMESG=ok\n'
printf 'UNPRIVILEGED_DMESG=denied\n'
printf 'MODULES=%s\n' "$module_count"
printf 'DMESG_ALERTS=%s\n' "$dmesg_alerts"
printf 'SUCCESS: Phase 3 dmesg restriction device gate passed\n'

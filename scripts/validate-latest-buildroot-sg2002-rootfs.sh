#!/bin/sh
set -eu

usage() {
	echo "usage: $0 <rootfs.ext4>" >&2
	exit 1
}

die() {
	echo "error: $*" >&2
	exit 1
}

[ "$#" -eq 1 ] || usage

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
IMAGE="$1"
EXPECTED_BUILDROOT_VERSION="${EXPECTED_BUILDROOT_VERSION:-2026.05.1}"
EXPECTED_KVMAPP_VERSION="${EXPECTED_KVMAPP_VERSION:-2.0.40}"
EXPECTED_SYSTEM_VERSION="${EXPECTED_SYSTEM_VERSION:-0.3.0-raw.10}"

[ -f "$IMAGE" ] || die "rootfs image does not exist: $IMAGE"
command -v debugfs >/dev/null 2>&1 || die "debugfs is required"

EXPECTED_BACKEND=rust \
EXPECTED_KVMAPP_VERSION="$EXPECTED_KVMAPP_VERSION" \
	"$ROOT/scripts/validate-nanokvm-rootfs.sh" "$IMAGE" >/dev/null

debugfs_stat() {
	LC_ALL=C debugfs -R "stat $1" "$IMAGE" 2>&1 || true
}

require_path() {
	output="$(debugfs_stat "$1")"
	case "$output" in
		*"File not found"* | *"not found by ext2_lookup"* | *"No such file or directory"*)
			die "missing required path: $1"
			;;
	esac
}

reject_path() {
	output="$(debugfs_stat "$1")"
	case "$output" in
		*"File not found"* | *"not found by ext2_lookup"* | *"No such file or directory"*)
			return 0
			;;
	esac
	die "forbidden path exists: $1"
}

verify_sha256() {
	path="$1"
	expected="$2"
	name="$3"
	dest="$TMP_DIR/$name"
	debugfs -R "dump $path $dest" "$IMAGE" >/dev/null 2>&1 || \
		die "could not extract $path for hashing"
	actual="$(sha256sum "$dest" | awk '{print $1}')"
	[ "$actual" = "$expected" ] || \
		die "unexpected SHA-256 for $path: $actual"
}

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/nanokvm-latest-buildroot-validate.XXXXXX")"
trap 'rm -rf "$TMP_DIR"' EXIT INT TERM

for path in \
	/mnt/system/ko/soph_sys.ko \
	/mnt/system/ko/soph_mipi_rx.ko \
		/mnt/system/ko/soph_vcodec.ko \
		/mnt/system/ko/soph_jpeg.ko \
		/mnt/system/ko/soph_vc_driver.ko \
		/mnt/system/ko/hardened-source-media-provenance.txt \
	/mnt/system/ko/soph_vi.ko \
	/mnt/system/ko/soph_vpss.ko \
	/mnt/system/usr/lib/libsns_lt6911.so \
	/lib/ld-musl-riscv64xthead.so.1 \
	/lib/ld-musl-riscv64v0p7_xthead.so.1 \
	/etc/kvm/system-version.json \
	/etc/ssh/sshd_config \
	/etc/ssl/certs/ca-certificates.crt \
	/kvmapp/server/dl_lib/libopencv_video.so.409 \
	/kvmapp/server/dl_lib/libopencv_dnn.so.409 \
	/kvmapp/server/dl_lib/libopencv_calib3d.so.409 \
	/kvmapp/server/dl_lib/libopencv_features2d.so.409 \
	/kvmapp/server/dl_lib/libopencv_flann.so.409 \
	/kvmapp/server/dl_lib/libprotobuf.so.32 \
	/kvmapp/server/dl_lib/libstdc++.so.6 \
	/kvmapp/server/dl_lib/libgcc_s.so.1 \
	/kvmapp/server/dl_lib/libgomp.so.1 \
	/kvmapp/server/dl_lib/libatomic.so.1 \
	/kvmapp/server/dl_lib/libz.so.1 \
	/kvmapp/server/dl_lib/libc.so \
	/usr/lib/libgomp.so.1 \
	/usr/lib/libatomic.so.1 \
	/usr/lib/libstdc++.so.6 \
	/usr/lib/libgcc_s.so.1 \
	/usr/lib/libz.so.1 \
	/usr/sbin/sshd \
	/usr/sbin/avahi-daemon \
	/usr/sbin/dnsmasq \
	/usr/sbin/hostapd \
	/usr/sbin/wpa_supplicant \
	/usr/sbin/wpa_passphrase \
	/usr/bin/curl \
	/usr/bin/openssl \
	/usr/bin/ntpdate \
	/usr/sbin/parted \
	/usr/sbin/mkfs.exfat \
	/usr/sbin/resize2fs
do
	require_path "$path"
done

reject_path /usr/bin/python
reject_path /usr/bin/python3
reject_path /usr/bin/ffmpeg
reject_path /usr/bin/ffprobe

verify_sha256 /kvmapp/server/dl_lib/libopencv_video.so.4.9.0 \
	4bda8c165e9e53090cdc783a826c8c61a81ccff3a022bef5f7243a95596f52c7 opencv-video
verify_sha256 /kvmapp/server/dl_lib/libopencv_dnn.so.4.9.0 \
	3d2ae102eb4a2d2eb2e109ba23015d761ad43cf9299fdbc427e02c52377bfc79 opencv-dnn
verify_sha256 /kvmapp/server/dl_lib/libopencv_calib3d.so.4.9.0 \
	119f69d7bb3c5fd033689e87faeaa37c75547a226dde150fadf01ded04e85466 opencv-calib3d
verify_sha256 /kvmapp/server/dl_lib/libopencv_features2d.so.4.9.0 \
	f620d5466f0bd241ce70ed34d3bca07a4dc666a2addf624a2f52902e3c6ec015 opencv-features2d
verify_sha256 /kvmapp/server/dl_lib/libopencv_flann.so.4.9.0 \
	1dadc13c42828b3fef7b3c20026b3a0263fcbcd882bfb904105de0bea1a0c991 opencv-flann
verify_sha256 /kvmapp/server/dl_lib/libprotobuf.so.32.0.12 \
	096d35f5f085b74d6654d30bdfa91c69398093fc47548979d5c8ed4e5caebd27 protobuf
verify_sha256 /kvmapp/server/dl_lib/libstdc++.so.6.0.28 \
	9ebc8352014fbb7499194fdca56eb496c51c119b50d08d7b70b96058d3c5be17 libstdcpp
verify_sha256 /kvmapp/server/dl_lib/libgcc_s.so.1 \
	4b483b84f730b5e127ee8441cc143d5d90f1a31f0bfb999f94ef834eefa3da8c libgcc
verify_sha256 /kvmapp/server/dl_lib/libgomp.so.1.0.0 \
	986f21b24574f0e58672c865b34d9eba102ba45c05f18a608bf612816b84c901 libgomp
verify_sha256 /kvmapp/server/dl_lib/libatomic.so.1.2.0 \
	2421e827d033c3a055b973e6fbcf5a78fe987b50dd21e82a422a3728f4d3da3d libatomic
verify_sha256 /kvmapp/server/dl_lib/libz.so.1.3 \
	80eca40fca0cd60a08115aa4e3acc98f036476b1fd937a2b8abd1ca589554ede libz
verify_sha256 /kvmapp/server/dl_lib/libkvm.so \
	387f1c7f54fb67ecc0eafa961946eef7972022a92ad443fb68c3d88ef6d2f24f libkvm
verify_sha256 /kvmapp/server/dl_lib/libkvm_mmf.so \
	be269c595b454930abeb9bb05eb67ec708894eb2df1650c4d99ee1162e1e3f2d libkvm-mmf
verify_sha256 /kvmapp/server/dl_lib/libc.so \
	fbc494806cad67edbf4584221bdc481593fa04b317d9405cf3418aad9a9500c4 vendor-libc
verify_sha256 /lib/ld-musl-riscv64xthead.so.1 \
	e966ce689d386af715ec2ca558a90661731cd875192af91749b52475629cb7d2 xhead-loader
verify_sha256 /lib/ld-musl-riscv64v0p7_xthead.so.1 \
	8e4f81c0280b2337abea47bf151259f6fa3bf3261578dee8bba30f83c60fe7e8 v0p7-loader
verify_sha256 /mnt/system/ko/soph_vcodec.ko \
	0f0927cd796275f2241e8914b3efa57b124b8cc2aabc087ee899a56346a5c2be soph-vcodec
verify_sha256 /mnt/system/ko/soph_jpeg.ko \
	eacf2af2c75c23816af129843912f5072c9cb81d44434d563ceb449ee2899666 soph-jpeg
verify_sha256 /mnt/system/ko/soph_vc_driver.ko \
	cc543c2a1b25c63c0372d7a687643605b1d07a5624403e3cf7d74b52ecadecf5 soph-vc-driver

MEDIA_PROVENANCE="$TMP_DIR/source-media-provenance.txt"
debugfs -R "dump /mnt/system/ko/hardened-source-media-provenance.txt $MEDIA_PROVENANCE" \
	"$IMAGE" >/dev/null 2>&1 || die "could not extract source-built media provenance"
grep -qx 'sophgo_vc_commit=5ed7cc28daf7194885d87df2aa534a27a1956c70' "$MEDIA_PROVENANCE" || \
	die "source-built VC provenance is incorrect"
grep -qx 'device_acceptance=10.0.87.133-20260821T032009Z' "$MEDIA_PROVENANCE" || \
	die "source-built media device acceptance provenance is missing"
grep -qx 'redistribution=disabled-pending-license-grant' "$MEDIA_PROVENANCE" || \
	die "source-built media redistribution restriction is missing"

KVM_SYSTEM="$TMP_DIR/kvm_system"
debugfs -R "dump /kvmapp/kvm_system/kvm_system $KVM_SYSTEM" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract /kvmapp/kvm_system/kvm_system"
STAGED_KVM_SYSTEM="${STAGED_KVM_SYSTEM:-$ROOT/build/kvmapp-rust/kvmapp/kvm_system/kvm_system}"
[ -f "$STAGED_KVM_SYSTEM" ] || die "staged kvm_system is unavailable for provenance validation"
expected_kvm_system_sha256="$(sha256sum "$STAGED_KVM_SYSTEM" | awk '{print $1}')"
actual_kvm_system_sha256="$(sha256sum "$KVM_SYSTEM" | awk '{print $1}')"
[ "$actual_kvm_system_sha256" = "$expected_kvm_system_sha256" ] || \
	die "Buildroot modified kvm_system: expected $expected_kvm_system_sha256, got $actual_kvm_system_sha256"
KVM_SYSTEM_DYNAMIC="$TMP_DIR/kvm_system.dynamic"
readelf -d "$KVM_SYSTEM" >"$KVM_SYSTEM_DYNAMIC" 2>&1 || \
	die "kvm_system dynamic table is invalid"
grep -Fq 'Shared library: [libstdc++.so.6]' "$KVM_SYSTEM_DYNAMIC" || \
	die "kvm_system is missing the libstdc++.so.6 dependency"
grep -Fq 'Shared library: [libgcc_s.so.1]' "$KVM_SYSTEM_DYNAMIC" || \
	die "kvm_system is missing the libgcc_s.so.1 dependency"
grep -Fq 'Shared library: [libc.so]' "$KVM_SYSTEM_DYNAMIC" || \
	die "kvm_system is missing the libc.so dependency"
if grep -Eq '\((RPATH|RUNPATH)\)' "$KVM_SYSTEM_DYNAMIC"; then
	die "kvm_system contains RPATH/RUNPATH and will be rewritten by Buildroot"
fi
readelf -rW "$KVM_SYSTEM" >/dev/null 2>&1 || \
	die "kvm_system relocation table is invalid"
readelf -A "$KVM_SYSTEM" 2>/dev/null | grep -Fq 'v0p7' || \
	die "kvm_system is not the expected RISC-V v0p7 binary"

KVMAPP_S95="$TMP_DIR/kvmapp-S95nanokvm"
ETC_S95="$TMP_DIR/etc-S95nanokvm"
debugfs -R "dump /kvmapp/system/init.d/S95nanokvm $KVMAPP_S95" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract packaged S95nanokvm"
debugfs -R "dump /etc/init.d/S95nanokvm $ETC_S95" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract installed S95nanokvm"
cmp -s "$KVMAPP_S95" "$ETC_S95" || \
	die "packaged and installed S95nanokvm differ"
grep -Fq 'KVM_SYSTEM_PID_FILE=/tmp/kvm-system.pid' "$KVMAPP_S95" || \
	die "S95nanokvm does not track the kvm_system PID"
grep -Fq 'find_kvm_system_pids()' "$KVMAPP_S95" || \
	die "S95nanokvm lacks exact kvm_system process discovery"
grep -Fq 'adopt_single_kvm_system_process()' "$KVMAPP_S95" || \
	die "S95nanokvm lacks orphan kvm_system adoption"
grep -Fq 'kvm_system_is_running || return 1' "$KVMAPP_S95" || \
	die "system-update boot health does not require kvm_system"

KVMAPP_S30="$TMP_DIR/kvmapp-S30eth"
ETC_S30="$TMP_DIR/etc-S30eth"
debugfs -R "dump /kvmapp/system/init.d/S30eth $KVMAPP_S30" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract packaged S30eth"
debugfs -R "dump /etc/init.d/S30eth $ETC_S30" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract installed S30eth"
cmp -s "$KVMAPP_S30" "$ETC_S30" || \
	die "packaged and installed S30eth differ"
grep -Fq 'render_static_dns()' "$KVMAPP_S30" || \
	die "S30eth lacks idempotent static DNS rendering"
grep -Fq 'if (!seen[$2]++) print "nameserver " $2' "$KVMAPP_S30" || \
	die "S30eth does not de-duplicate static nameservers"

KVMAPP_S01="$TMP_DIR/kvmapp-S01fs"
ETC_S01="$TMP_DIR/etc-S01fs"
debugfs -R "dump /kvmapp/system/init.d/S01fs $KVMAPP_S01" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract packaged S01fs"
debugfs -R "dump /etc/init.d/S01fs $ETC_S01" "$IMAGE" >/dev/null 2>&1 || \
	die "could not extract installed S01fs"
cmp -s "$KVMAPP_S01" "$ETC_S01" || \
	die "packaged and installed S01fs differ"
grep -Fq 'etc/default/syslogd' "$KVMAPP_S01" || \
	die "S01fs does not restore preserved syslogd defaults"
grep -Fq 'etc/default/klogd' "$KVMAPP_S01" || \
	die "S01fs does not restore preserved klogd defaults"

OS_RELEASE="$TMP_DIR/os-release"
debugfs -R "dump /usr/lib/os-release $OS_RELEASE" "$IMAGE" >/dev/null 2>&1 || \
	die "could not read /usr/lib/os-release"
grep -qx "VERSION_ID=$EXPECTED_BUILDROOT_VERSION" "$OS_RELEASE" || \
	die "unexpected Buildroot VERSION_ID"

SYSTEM_VERSION_FILE="$TMP_DIR/system-version.json"
debugfs -R "dump /etc/kvm/system-version.json $SYSTEM_VERSION_FILE" "$IMAGE" >/dev/null 2>&1 || \
	die "could not read /etc/kvm/system-version.json"
grep -q "\"version\": \"$EXPECTED_SYSTEM_VERSION\"" "$SYSTEM_VERSION_FILE" || \
	die "unexpected system update version"

SSHD_CONFIG="$TMP_DIR/sshd_config"
debugfs -R "dump /etc/ssh/sshd_config $SSHD_CONFIG" "$IMAGE" >/dev/null 2>&1 || \
	die "could not read /etc/ssh/sshd_config"
grep -qx "PermitRootLogin yes" "$SSHD_CONFIG" || \
	die "root SSH password login is not explicitly enabled"
grep -qx "PasswordAuthentication yes" "$SSHD_CONFIG" || \
	die "SSH password authentication is not explicitly enabled"
grep -qx "PermitEmptyPasswords no" "$SSHD_CONFIG" || \
	die "empty SSH passwords are not explicitly disabled"

echo "validated latest Buildroot SG2002 rootfs: $IMAGE"
echo "Buildroot version: $EXPECTED_BUILDROOT_VERSION"
echo "kvmapp version: $EXPECTED_KVMAPP_VERSION"
echo "system version: $EXPECTED_SYSTEM_VERSION"

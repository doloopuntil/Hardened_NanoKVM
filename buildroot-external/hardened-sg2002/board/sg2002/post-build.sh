#!/bin/sh
set -eu

TARGET_DIR=$1
[ -d "$TARGET_DIR" ] || {
	echo "missing Buildroot target directory: $TARGET_DIR" >&2
	exit 1
}

ROOT="$(CDPATH= cd -- "$(dirname "$0")/../../../.." && pwd)"
KVMAPP_SOURCE="${NANOKVM_KVMAPP_SOURCE_DIR:-$ROOT/build/kvmapp-rust/kvmapp}"
PATCHELF="${HOST_DIR:-}/bin/patchelf"
EXPECTED_RUST_RUNPATH='/kvmapp/server/dl_lib'

# Buildroot's per-package accounting files live in package build directories.
# Local packages that copy their complete source root must never leak these
# host-specific snapshots into the appliance filesystem.
find "$TARGET_DIR" -type f -name '.files-list*' -delete

# GCC's target-side GDB auto-loader embeds the absolute HOST_DIR. NanoKVM ships
# neither GDB nor Python, so the helper is unusable and makes otherwise equal
# output directories differ byte-for-byte.
find "$TARGET_DIR" -type f -name '*-gdb.py' -delete

# Buildroot's generic target fix-rpath pass may rewrite an otherwise safe ELF.
# Restore the already-built Rust payload after that pass, but only when its
# RUNPATH is the single root-owned application library directory. Refuse /tmp,
# $ORIGIN, host paths, or any other source search location.
[ -x "$PATCHELF" ] || {
	echo "missing Buildroot host patchelf: $PATCHELF" >&2
	exit 1
}

restore_rust_elf() {
	source_path="$KVMAPP_SOURCE/$1"
	target_path="$TARGET_DIR/$2"
	[ -f "$source_path" ] || {
		echo "missing staged Rust payload: $source_path" >&2
		exit 1
	}
	runpath="$($PATCHELF --print-rpath "$source_path")"
	[ "$runpath" = "$EXPECTED_RUST_RUNPATH" ] || {
		echo "unexpected staged Rust RUNPATH in $source_path: $runpath" >&2
		exit 1
	}
	install -m 0755 "$source_path" "$target_path"
}

restore_rust_elf server/NanoKVM-Server kvmapp/server/NanoKVM-Server
restore_rust_elf backends/NanoKVM-Server.rust kvmapp/backends/NanoKVM-Server.rust
restore_rust_elf hwmon/nanokvm-hwmon kvmapp/hwmon/nanokvm-hwmon

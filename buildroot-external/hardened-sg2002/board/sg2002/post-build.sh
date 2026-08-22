#!/bin/sh
set -eu

TARGET_DIR=$1
[ -d "$TARGET_DIR" ] || {
	echo "missing Buildroot target directory: $TARGET_DIR" >&2
	exit 1
}

# Buildroot's per-package accounting files live in package build directories.
# Local packages that copy their complete source root must never leak these
# host-specific snapshots into the appliance filesystem.
find "$TARGET_DIR" -type f -name '.files-list*' -delete

# GCC's target-side GDB auto-loader embeds the absolute HOST_DIR. NanoKVM ships
# neither GDB nor Python, so the helper is unusable and makes otherwise equal
# output directories differ byte-for-byte.
find "$TARGET_DIR" -type f -name '*-gdb.py' -delete

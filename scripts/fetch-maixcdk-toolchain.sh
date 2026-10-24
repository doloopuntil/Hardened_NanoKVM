#!/usr/bin/env bash
# Fetch MaixCDK's default maixcam toolchain where MaixCDK's own build expects it,
# so that build reuses it. Prints the compiler bin directory.
# Usage: fetch-maixcdk-toolchain.sh MAIXCDK_DIR
set -euo pipefail

[ "$#" -eq 1 ] || {
	echo "usage: $0 MAIXCDK_DIR" >&2
	exit 2
}
MAIXCDK=$1
YAML="$MAIXCDK/platforms/maixcam.yaml"
[ -f "$YAML" ] || {
	echo "missing: $YAML" >&2
	exit 1
}

# url, sha256sum, filename, path and bin_path of the default toolchain entry.
read -r url sha filename path bin_path < <(python3 - "$YAML" <<'EOF'
import sys, yaml
with open(sys.argv[1]) as f:
    chains = yaml.safe_load(f)["toolchain"]
chain = next(c for c in chains if c.get("default"))
print(chain["url"], chain["sha256sum"], chain["filename"], chain["path"], chain["bin_path"])
EOF
)

pkg="$MAIXCDK/dl/pkgs/$path/$filename"
extract_dir="$MAIXCDK/dl/extracted/$path"
if [ ! -f "$pkg" ]; then
	mkdir -p "$(dirname "$pkg")"
	curl --fail --location --retry 2 --output "$pkg.part" "$url"
	mv "$pkg.part" "$pkg"
fi
echo "$sha  $pkg" | sha256sum -c - >&2
if [ ! -d "$extract_dir" ] || [ -z "$(ls -A "$extract_dir")" ]; then
	mkdir -p "$extract_dir"
	tar -C "$extract_dir" -xf "$pkg"
fi
bin="$MAIXCDK/dl/extracted/$bin_path"
"$bin/riscv64-unknown-linux-musl-gcc" --version | head -1 >&2
echo "$bin"

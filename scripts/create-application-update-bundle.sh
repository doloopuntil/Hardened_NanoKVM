#!/bin/sh
set -eu

if [ "$#" -ne 4 ]; then
  echo "usage: $0 <archive> <latest.json> <latest.json.sig|-> <output.bundle.tar>" >&2
  echo "pass - as the signature for unsigned metadata" >&2
  exit 1
fi

ARCHIVE="$1"
METADATA="$2"
SIGNATURE="$3"
OUTPUT="$4"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

cp "$METADATA" "$WORK/latest.json"
cp "$ARCHIVE" "$WORK/$(basename "$ARCHIVE")"
set -- latest.json "$(basename "$ARCHIVE")"
if [ "$SIGNATURE" != "-" ]; then
  cp "$SIGNATURE" "$WORK/latest.json.sig"
  set -- "$@" latest.json.sig
fi

# Plain tar: the application archive inside is already gzip-compressed. COPYFILE_DISABLE stops
# macOS tar from adding ._name entries for extended attributes, which the device rejects.
COPYFILE_DISABLE=1 tar -C "$WORK" -cf "$OUTPUT" "$@"
echo "wrote $OUTPUT"

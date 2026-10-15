#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

source "$HERE/../lib/assertions.sh"

mkdir -p "$TMP/reusable-loop"
printf 'not a directory\n' > "$TMP/output.md"

assert_dir_exists "directory artifact" "$TMP/reusable-loop"
if assert_dir_exists "regular file is not a directory" "$TMP/output.md"; then
  echo 'FAIL: assert_dir_exists accepted a regular file' >&2
  exit 1
fi
if assert_file_exists "directory is not a regular file" "$TMP/reusable-loop"; then
  echo 'FAIL: assert_file_exists accepted a directory' >&2
  exit 1
fi

echo 'PASS: artifact assertions distinguish directories from regular files'

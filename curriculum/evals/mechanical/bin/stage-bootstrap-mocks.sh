#!/usr/bin/env bash
# Stage the tracked bootstrap-mocks fixture to /tmp/bootstrap-mocks/.
#
# Bootstrap M2..M6 mechanical runners reference /tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/
# plus /tmp/bootstrap-mocks/challenge-inputs.md as a stand-in for connector content.
# The fixture lives under playgrounds/bootstrap-mocks/ so it survives /tmp clears
# and stays version-controlled.
#
# Usage: stage-bootstrap-mocks.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/playgrounds/bootstrap-mocks"
DST="/tmp/bootstrap-mocks"

[[ -d "$SRC" ]] || { echo "fixture not found: $SRC" >&2; exit 2; }

rm -rf "$DST"
mkdir -p "$DST"
cp -R "$SRC"/. "$DST"/

count=$(find "$DST" -type f | wc -l | tr -d ' ')
echo "Staged $count file(s) at $DST"

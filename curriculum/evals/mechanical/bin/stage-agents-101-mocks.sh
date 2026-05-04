#!/usr/bin/env bash
# Stage the tracked agents-101-mocks fixture to /tmp/agents-101-mocks/.
#
# Agents 101 M2..M6 mechanical runners reference /tmp/agents-101-mocks/{confluence,onedrive,practitioners}/
# plus /tmp/agents-101-mocks/challenge-inputs.md as a stand-in for connector content.
# The fixture lives under playgrounds/agents-101-mocks/ so it survives /tmp clears
# and stays version-controlled.
#
# Usage: stage-agents-101-mocks.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/playgrounds/agents-101-mocks"
DST="/tmp/agents-101-mocks"

[[ -d "$SRC" ]] || { echo "fixture not found: $SRC" >&2; exit 2; }

rm -rf "$DST"
mkdir -p "$DST"
cp -R "$SRC"/. "$DST"/

count=$(find "$DST" -type f | wc -l | tr -d ' ')
echo "Staged $count file(s) at $DST"

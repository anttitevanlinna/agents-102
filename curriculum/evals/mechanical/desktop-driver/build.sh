#!/usr/bin/env bash
# Compile the Swift helpers into bin/ (gitignored). Needs Xcode command-line tools.
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$D/bin"
for s in click scroll ocr redact sprites; do swiftc -O "$D/src/$s.swift" -o "$D/bin/$s"; echo "built bin/$s"; done
"$D/bin/sprites" "$D/bin"

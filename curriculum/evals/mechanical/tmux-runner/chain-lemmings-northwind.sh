#!/usr/bin/env bash
# chain-lemmings-northwind.sh — the Northwind cut on the lemmings SUT.
#
# Kept as the name the runbook and autumn-gaps.md cite. The body moved to
# chain-northwind.sh (2026-08-13), which takes --sut-kit so the same cut can
# run on picoshare and codesearch. This is the lemmings preset, nothing more:
# every flag passes straight through.
#
#   chain-lemmings-northwind.sh            == chain-northwind.sh --sut-kit lemmings
#   chain-lemmings-northwind.sh --from m4  == chain-northwind.sh --sut-kit lemmings --from m4
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$HERE/chain-northwind.sh" --sut-kit lemmings "$@"

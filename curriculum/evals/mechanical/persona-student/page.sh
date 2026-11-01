#!/usr/bin/env bash
# page.sh <module> <out.md> — the student view of one module (maintainer + backing stripped),
# cut where the module's config says the take-home pre-reads begin.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; ROOT="$(cd "$HERE" && git rev-parse --show-toplevel)"
cut="$(node -e "console.log(require('$HERE/modules/$1.json').cut_from||'')")"
node "$ROOT/scripts/read-training.js" "$(node -e "console.log(require('$HERE/modules/$1.json').training)")" --modules "$1" \
  | awk -v cut="$cut" 'cut!="" && index($0,cut)==1 {exit} {print}' > "$2"
echo "[page] $1 → $2 ($(wc -w < "$2") words)"

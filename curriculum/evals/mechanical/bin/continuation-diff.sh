#!/usr/bin/env bash
# Diff-bound continuation check between two snapshots of the same artefact.
#
# Catches both no-change-at-all (the Actor didn't actually regenerate) and
# wholesale rewrite (the Actor threw the previous version away). For HTML,
# strips `<style>...</style>` blocks before diffing — adding inline CSS is
# legitimate evolution that shouldn't blow up the line-count ratio.
#
# Usage: continuation-diff.sh <old> <new> [max_ratio]
#   max_ratio defaults to 0.80 (diff lines ≤ 80% of stripped-old lines).
# Exit 0 on PASS (continuation), 1 on FAIL (no-change or wholesale rewrite).

set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "usage: $0 <old> <new> [max_ratio]" >&2
  exit 2
fi

OLD="$1"
NEW="$2"
MAX_RATIO="${3:-0.80}"

[[ -f "$OLD" ]] || { echo "old file not found: $OLD" >&2; exit 2; }
[[ -f "$NEW" ]] || { echo "new file not found: $NEW" >&2; exit 2; }

strip_style() {
  # Remove <style>...</style> blocks (single- or multi-line) for HTML files.
  case "$1" in
    *.html|*.htm|*.html.*)
      perl -0777 -pe 's{<style[^>]*>.*?</style>}{}gs' "$1"
      ;;
    *)
      cat "$1"
      ;;
  esac
}

OLD_STRIPPED=$(mktemp); NEW_STRIPPED=$(mktemp)
trap 'rm -f "$OLD_STRIPPED" "$NEW_STRIPPED"' EXIT
strip_style "$OLD" > "$OLD_STRIPPED"
strip_style "$NEW" > "$NEW_STRIPPED"

old_lines=$(wc -l < "$OLD_STRIPPED" | tr -d ' ')
new_lines=$(wc -l < "$NEW_STRIPPED" | tr -d ' ')
diff_lines=$(diff "$OLD_STRIPPED" "$NEW_STRIPPED" | grep -cE '^[<>]' || true)

if [[ "$old_lines" -eq 0 ]]; then
  echo "FAIL — old file has 0 lines after style-strip; cannot compute ratio."
  exit 1
fi

ratio=$(awk -v d="$diff_lines" -v o="$old_lines" 'BEGIN { printf "%.2f", d / o }')

if [[ "$diff_lines" -eq 0 ]]; then
  echo "FAIL — no diff between $OLD and $NEW (no regeneration). old=$old_lines new=$new_lines."
  exit 1
fi

within_bound=$(awk -v r="$ratio" -v m="$MAX_RATIO" 'BEGIN { print (r < m) ? "1" : "0" }')

if [[ "$within_bound" == "1" ]]; then
  echo "PASS — continuation: diff=$diff_lines lines, old=$old_lines, ratio=$ratio (< $MAX_RATIO)."
  exit 0
else
  echo "FAIL — wholesale rewrite or large structural change: diff=$diff_lines, old=$old_lines, ratio=$ratio (>= $MAX_RATIO)."
  exit 1
fi

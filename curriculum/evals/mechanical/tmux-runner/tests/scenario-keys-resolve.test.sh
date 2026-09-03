#!/usr/bin/env bash
# Every prompt key in every scenario must resolve to a registry entry.
#
# The gap this closes: on 2026-08-01 the curriculum retired
# spot-gaps-build-the-loop-3/-4/-5 from M6. IMPROVEMENTS.md recorded the
# runner rework as owed, and it sat undone for a month because nothing
# mechanical was watching — the next M6 run would have died at turn 6 on an
# unresolvable key, hours in, for a reason decided a month earlier.
# A curriculum deletion is a runner break; this is the check that says so
# in one second instead of one leg.
# Run: bash tests/scenario-keys-resolve.test.sh   (exits nonzero on any miss)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REG="$HERE/../../../../prompts"          # curriculum/prompts
SCEN="$HERE/../scenarios"

[[ -d "$REG"  ]] || { echo "FAIL: prompt registry not found at $REG"; exit 1; }
[[ -d "$SCEN" ]] || { echo "FAIL: scenarios dir not found at $SCEN"; exit 1; }

pass=0 fail=0
for f in "$SCEN"/*.txt; do
  name="$(basename "$f")"
  missing=""
  while IFS= read -r line || [[ -n "$line" ]]; do
    # skip blanks, comments, and literal turns (leading *)
    case "$line" in ''|\#*|\**|@*) continue ;; esac
    key="${line%%[[:space:]]*}"
    [[ -z "$key" ]] && continue
    [[ -f "$REG/$key.md" ]] || missing="$missing $key"
  done < "$f"
  if [[ -n "$missing" ]]; then
    fail=$((fail+1)); echo "  FAIL - $name sends unresolvable key(s):$missing" >&2
  else
    pass=$((pass+1)); echo "  ok   - $name"
  fi
done

echo
echo "scenarios ok=$pass broken=$fail"
[[ "$fail" -eq 0 ]]

#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
KIT="$RUNNER/fixtures/agents-101-synthetic"

recipient="$KIT/answers/m7-recipient.txt"
assumptions="$KIT/answers/m7-assumptions.txt"
scenario="$RUNNER/scenarios/a101-m7.txt"

[[ -f "$recipient" && -f "$assumptions" && -f "$scenario" ]]
grep -qi 'Mara Viken' "$recipient"
grep -qiE 'Sales Ops|sales operations' "$recipient"
grep -qiE 'weekly spreadsheet' "$recipient"
grep -qiE 'analyst handoff' "$recipient"
grep -qiE 'preparation variance' "$recipient"
grep -qiE 'pilot.pricing review' "$recipient"
grep -qiE 'SELECT|assumption|test this week' "$assumptions"
grep -q '<M7_RECIPIENT>' "$scenario"
grep -q '<M7_ASSUMPTIONS>' "$scenario"

if find "$KIT" -path '*/module-7/*' -type f | grep -q .; then
  echo 'FAIL: M7 fixture pre-writes a module-7 result' >&2
  exit 1
fi

echo 'PASS: M7 recipient fixture supplies the incumbent, outcome, and selections without seeding results'

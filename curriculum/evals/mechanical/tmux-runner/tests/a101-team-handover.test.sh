#!/usr/bin/env bash
# Team edition drift found by the coverage guard on 2026-11-26: M7 opens with a
# handover (share-your-work-handover, prompt-ok 2026-11-14) and M8 judges and
# rebuilds the extension agent (extend-your-system-2); the runner sent neither.
# The neighbour is simulated: their skill and agent land in handover-in/, the
# student's session runs the handover prompt on them, and the neighbour's report
# on the student's own agent lands as module-7/handover.md for the interview.
# Run: bash tests/a101-team-handover.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."; S="$ROOT/scenarios"; K="$ROOT/fixtures/agents-101-synthetic"
set +e
pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
keys() { grep -vE '^[[:space:]]*(#|$|\*)' "$1" | awk '{print $1" "$2}' | sed 's/ $//' | tr '\n' '|'; }

m7="$(keys "$S/a101-m7.txt")"
[[ "$m7" == "@student-writes handover-in/agent-audit/SKILL.md|@student-writes handover-in/fleet-margin-agent.md|share-your-work-handover <CONTROL:NO_QUESTIONS>|@student-writes module-7/handover.md|share-your-work-1 "* ]] \
  && ok "m7 opens with the handover, then the interview" || bad "m7: $m7"
[[ "$(keys "$S/a101-m8.txt")" == "extend-your-system-1 <CONTROL:SAVE_WITHOUT_REVIEW>|extend-your-system-2 "* ]] \
  && ok "m8 judges and rebuilds right after building" || bad "m8: $(keys "$S/a101-m8.txt")"
for f in handover/agent-audit/SKILL.md handover/fleet-margin-agent.md answers/m7-handover-report.md; do
  [[ -s "$K/$f" ]] && ok "$f" || bad "missing $f"
done
grep -q 'memory/' "$K/handover/fleet-margin-agent.md" && ok "neighbour agent reads a memory the student lacks" || bad "neighbour agent names no memory/"
for h in '## Received' '## Skill' '## Agent' '## What would have travelled'; do
  grep -qF "$h" "$K/answers/m7-handover-report.md" || bad "report lacks $h"
done; ok "neighbour report has the four headings"
for a in 'm7:1)' 'm7:8)' 'm8:2)' 'm8:11)'; do
  grep -qF "    $a" "$ROOT/run-a101.sh" && ok "has $a" || bad "run-a101 lacks $a"
done
echo "[test] $pass passed, $fail failed"
[[ $fail -eq 0 ]]

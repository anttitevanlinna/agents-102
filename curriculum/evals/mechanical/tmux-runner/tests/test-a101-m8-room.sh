#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
KIT="$RUNNER/fixtures/agents-101-synthetic"
ROOM="$KIT/shared-room"
scenario="$RUNNER/scenarios/a101-m8.txt"

[[ -f "$KIT/module-8/extension-brief.md" && -f "$ROOM/selection-board.md" && -f "$scenario" ]]
grep -qiE 'input|brief' "$KIT/module-8/extension-brief.md"
! grep -qiE '^# (Agent|Role)|^Role:' "$KIT/module-8/extension-brief.md"

for person in mara jonas leila; do
  for file in context-manifest stance proposal cross-check critique; do
    path="$ROOM/participants/$person/$file.md"
    [[ -s "$path" ]] || { echo "FAIL: missing $path" >&2; exit 1; }
    grep -qE 'synthetic://|sources/|participants/' "$path" || {
      echo "FAIL: $path cites no synthetic source path" >&2
      exit 1
    }
  done
done

grep -qiE 'governance.first|governance before' "$ROOM/participants/mara/stance.md"
grep -qiE 'narrow sales.pilot|sales pilot' "$ROOM/participants/jonas/stance.md"
grep -qiE 'shared evidence layer|evidence layer' "$ROOM/participants/leila/stance.md"

directive_line="$(grep -n '^@publish-selection-board$' "$scenario" | cut -d: -f1)"
proposal_line="$(grep -n '^joint-double-diamond-5' "$scenario" | cut -d: -f1)"
midpoint_line="$(grep -n '^joint-double-diamond-6' "$scenario" | cut -d: -f1)"
[[ "$proposal_line" -lt "$directive_line" && "$directive_line" -lt "$midpoint_line" ]]
grep -q 'selection-board.md' "$RUNNER/arrange-agents-101.sh"

if find "$KIT" -type f \( -name strategy-kernel.md -o -name agent-set.md -o -name plan.md \) | grep -q .; then
  echo 'FAIL: M8 fixture seeds a final synthesis artifact' >&2
  exit 1
fi

echo 'PASS: M8 room holds conflicting neighbours and withholds selection until after Ingrid proposes'

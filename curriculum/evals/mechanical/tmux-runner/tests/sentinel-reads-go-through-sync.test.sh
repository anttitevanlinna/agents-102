#!/usr/bin/env bash
# A sentinel file proves the main agent yielded, not that the turn is over:
# background agents may be pending, another Stop hook may have blocked and
# re-opened the turn. lib/sync.sh owns that judgement (wait_for_turn /
# turn_landed hold on a busy pane and trim surplus Stops). A runner that
# tests `turn-N.done` itself bypasses it — found three times in one session
# (2026-09-25/26: M4 audit, M5 blocked Stop, M3 race loop). Only lib/sync.sh
# and the Stop hook itself may read or count sentinels.
#
# Run: bash tests/sentinel-reads-go-through-sync.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

scan() {   # $@ = files; prints offending lines
  grep -n -E '(-f|-e|-s) +"[^"]*(turn-[^"]*\.done|sentinels/turn-)' "$@" 2>/dev/null
}

hits="$(cd "$ROOT" && scan *.sh lib/*.sh | grep -v -E '^lib/sync\.sh:' || true)"
if [[ -n "$hits" ]]; then
  echo "  FAIL - runner reads sentinels directly; use wait_for_turn / turn_landed:" >&2
  echo "$hits" >&2
  exit 1
fi
echo "  ok   - no runner reads sentinels outside lib/sync.sh"

# Self-check: the scan catches the shape that shipped in run-m3.sh.
probe="$(mktemp)"; printf '    if [[ -f "$main_dir/sentinels/turn-$next.done" ]]; then\n' > "$probe"
if [[ -n "$(scan "$probe")" ]]; then echo "  ok   - scan catches the old run-m3.sh race-loop shape"
else echo "  FAIL - scan misses the old run-m3.sh shape" >&2; rm -f "$probe"; exit 1; fi
rm -f "$probe"

#!/usr/bin/env bash
# session-preflight.sh — the start-of-session git block, in one call.
#
# Replaces the four-or-five tool calls every session opened with: pull, status,
# log, and the "is a neighbour mid-edit in here?" check. Output is deliberately
# compact — this runs before any work, so it should cost a glance, not a page.
#
#   scripts/session-preflight.sh          pull + report
#   scripts/session-preflight.sh --no-pull   report only (offline, or mid-session)
#
# Never stashes, never resets, never rebases: trunk-based and multi-session, so
# uncommitted work in the tree is somebody's WIP by default, not a mess to tidy.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
[ "${1:-}" = "--no-pull" ] || git pull --ff-only 2>&1 | sed 's/^/pull: /'

echo "branch: $(git rev-parse --abbrev-ref HEAD)  head: $(git log -1 --format='%h %s' | cut -c1-72)"

echo "── recent ──"
git log --oneline -5 | cut -c1-90

# Dirty paths with mtimes. In a shared tree an unexplained edit is a colleague,
# not a bug: a file touched minutes ago while other sessions are live is WIP to
# leave alone, not damage to restore. Print the evidence rather than a verdict.
dirty=$(git status --porcelain)
if [ -n "$dirty" ]; then
  echo "── dirty ($(echo "$dirty" | wc -l | tr -d ' ') paths) ──"
  echo "$dirty" | while read -r st path; do
    p="${path##* -> }"
    ts=$( [ -e "$p" ] && date -r "$p" '+%H:%M' || echo '  --' )
    printf '%-3s %s  %s\n' "$st" "$ts" "$p"
  done | head -25
  [ "$(echo "$dirty" | wc -l)" -gt 25 ] && echo "   … $(( $(echo "$dirty" | wc -l) - 25 )) more"
fi

# Other live sessions on this machine — the reason --only exists on every commit.
peers=$(pgrep -x claude 2>/dev/null | wc -l | tr -d ' ')
[ "$peers" -gt 1 ] && echo "── $((peers - 1)) other claude session(s) live — commit with \`git commit -m msg --only -- <paths>\`, never bare ──"

# Rules the writing path depends on. Stale index reads exactly like a fresh one,
# so check it here rather than discovering it mid-draft.
node curriculum/evals/scripts/build-rule-index.js --check 2>&1 | sed 's/^/rules: /'

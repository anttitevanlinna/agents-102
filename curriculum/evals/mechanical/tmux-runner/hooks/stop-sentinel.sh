#!/usr/bin/env bash
# Stop hook for Claude Code SUT sessions driven by runner/.
# Writes a sentinel file the runner waits on between turns.
#
# Contract:
#   - The runner exports CLAUDE_RUNNER_SENTINEL_DIR before launching `claude`.
#   - This hook fires when Claude finishes generating a response (Stop event).
#   - We count existing turn-*.done files and create the next one atomically.
#
# No-ops cleanly when not running under the runner (env unset / dir missing).
set -euo pipefail

dir="${CLAUDE_RUNNER_SENTINEL_DIR:-}"
[[ -z "$dir" || ! -d "$dir" ]] && exit 0

# Stop hooks for a single Claude session don't run concurrently with each
# other, so no lock needed. Count existing turn-*.done files and add the next.
n=$(find "$dir" -maxdepth 1 -name 'turn-*.done' 2>/dev/null | wc -l | tr -d ' ')
next=$((n + 1))
touch "$dir/turn-$next.done"

#!/usr/bin/env bash
# Sync protocol: wait for a sentinel file written by the SUT's Stop hook.
# Cheaper and more reliable than scraping the pane for "ready" markers.
#
# Contract with the SUT session:
#   - The runner exports CLAUDE_RUNNER_SENTINEL_DIR before launching tmux.
#   - The SUT's Stop hook (configured in the test cwd) writes one file per
#     turn-complete: $CLAUDE_RUNNER_SENTINEL_DIR/turn-<seq>.done
#   - The runner increments <seq> before each send, then waits for the
#     matching .done file with a timeout.
set -euo pipefail

wait_for_turn() {
  # $1=sentinel dir, $2=turn seq (1-based), $3=timeout seconds
  local dir="$1" seq="$2" timeout="${3:-300}"
  local marker="$dir/turn-$seq.done"
  local waited=0
  while [[ ! -f "$marker" ]]; do
    sleep 1
    waited=$((waited + 1))
    if [[ "$waited" -ge "$timeout" ]]; then
      echo "wait_for_turn: timeout after ${timeout}s waiting for $marker" >&2
      return 1
    fi
  done
}

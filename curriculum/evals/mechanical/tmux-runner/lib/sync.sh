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
  # $1=sentinel dir, $2=turn seq (1-based), $3=timeout seconds,
  # $4=optional tmux session name (enables pane-death fast-fail).
  #
  # Exit codes:
  #   0  sentinel fired
  #   1  wall-clock timeout
  #   2  pane died before sentinel (only when $4 is provided)
  #
  # Pane-death detection (codesearch sweep 2026-05-25/26 — IMPROVEMENTS.md):
  # if the SUT pane dies mid-turn (API socket error, OOM, Claude crashed,
  # external kill), the tmux session ends and the sentinel will never fire.
  # Without this check the runner waits the full timeout (up to 7200s for
  # an M5 PC send-off) before noticing. With a session name passed, we
  # poll has-session every 5s and fail fast.
  local dir="$1" seq="$2" timeout="${3:-300}" session="${4:-}"
  local marker="$dir/turn-$seq.done"
  local waited=0 last_pane_check=0
  local pane_check_interval=5
  while [[ ! -f "$marker" ]]; do
    sleep 1
    waited=$((waited + 1))
    if [[ -n "$session" ]] && (( waited - last_pane_check >= pane_check_interval )); then
      last_pane_check=$waited
      if ! pane_alive "$session"; then
        echo "wait_for_turn: pane '$session' died before sentinel $marker (after ${waited}s)" >&2
        return 2
      fi
    fi
    if [[ "$waited" -ge "$timeout" ]]; then
      echo "wait_for_turn: timeout after ${timeout}s waiting for $marker" >&2
      return 1
    fi
  done
}

is_slash_only() {
  # Pure slash command (no args): /context, /clear, /memory, etc.
  # These render client-side — no LLM call, no Stop hook, no sentinel.
  [[ "$1" =~ ^/[a-zA-Z][a-zA-Z0-9-]*$ ]]
}

fake_sentinel_after_render() {
  # Bridge a slash-only turn into the sentinel sequence:
  # sleep for the client render, then touch the expected turn-N.done
  # so the counter stays consistent for the rest of the run.
  local sentinel_dir="$1" seq="$2" sleep_s="${3:-3}"
  sleep "$sleep_s"
  touch "$sentinel_dir/turn-$seq.done"
}

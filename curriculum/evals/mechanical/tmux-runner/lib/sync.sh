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

stall_pattern_in_recent_window() {
  # $1=snap (multi-line string), $2=ERE pattern, $3=recent_window (lines).
  # Returns 0 iff $pattern's LAST match is within the last $recent_window
  # lines of $snap; 1 otherwise. "Recent" = the API error has not been
  # scrolled off by subsequent agent output, i.e. the agent has produced
  # fewer than $recent_window lines below it. Boundary: strict '<', so a
  # match with exactly $recent_window lines below it is NOT recent.
  local snap="$1" pattern="$2" recent_window="${3:-20}"
  [[ -z "$snap" ]] && return 1
  local match_lineno
  match_lineno="$(printf '%s\n' "$snap" | grep -nE "$pattern" | tail -1 | cut -d: -f1)"
  [[ -z "$match_lineno" ]] && return 1
  local total
  total="$(printf '%s\n' "$snap" | wc -l | tr -d ' ')"
  local below=$(( total - match_lineno ))
  (( below < recent_window )) && return 0
  return 1
}

wait_for_turn() {
  # $1=sentinel dir, $2=turn seq (1-based), $3=timeout seconds,
  # $4=optional tmux session name (enables pane-death fast-fail + stalled-TUI
  #    report).
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
  #
  # Stalled-TUI detection (codesearch sweep 2026-05-26, M6 ×2 + M4 ×1):
  # Claude Code TUI in `--permission-mode auto` does NOT auto-retry on an
  # API socket-closed error. It displays the error, the spinner keeps
  # spinning, and the TUI waits for a human keystroke that never comes in
  # a headless runner. Pane stays alive (so pane-liveness can't catch it);
  # sentinel never fires; wall-clock timeout eventually kills it after the
  # full quota. Detect-and-report only — capture-pane every STALL_CHECK
  # interval, grep for API-error signatures, and if matched persistently
  # log a WARN to stderr every 5 minutes so an operator watching the chain
  # can intervene. Do NOT auto-nudge; that's a separate validation cycle.
  #
  # Recent-window refinement (codesearch 2026-06-01 M6 T9): once the
  # operator paste-buffer'd a re-fire and the agent recovered, the API
  # Error text stayed in scrollback and the simple grep kept matching it
  # turn-long (matches=26 by sentinel). Now we only count a match if its
  # last occurrence is within $stall_recent_window lines of the bottom —
  # i.e. the error hasn't been scrolled off by subsequent agent output.
  local dir="$1" seq="$2" timeout="${3:-300}" session="${4:-}"
  local marker="$dir/turn-$seq.done"
  local waited=0 last_pane_check=0 last_stall_check=0 last_stall_warn=0
  local pane_check_interval=5
  local stall_check_interval=30          # capture-pane every 30s
  local stall_warn_interval=300          # WARN every 5 min after match
  local stall_match_count=0
  local stall_match_threshold=2          # 2 consecutive matches = persistent
  local stall_recent_window=20           # match must be within last N lines
  local stall_pattern='API Error|socket closed unexpectedly|Connection.*refused|rate.?limit'
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
    if [[ -n "$session" ]] && (( waited - last_stall_check >= stall_check_interval )); then
      last_stall_check=$waited
      local snap
      snap="$(_tmux capture-pane -t "$session" -p -S -200 -E - 2>/dev/null || true)"
      if stall_pattern_in_recent_window "$snap" "$stall_pattern" "$stall_recent_window"; then
        stall_match_count=$((stall_match_count + 1))
        if (( stall_match_count >= stall_match_threshold )) && (( waited - last_stall_warn >= stall_warn_interval )); then
          last_stall_warn=$waited
          echo "wait_for_turn: WARN stalled-TUI pattern matched in pane '$session' at turn $seq (waited=${waited}s of ${timeout}s; matches=$stall_match_count). API error visible. Continuing to wait for sentinel." >&2
        fi
      else
        stall_match_count=0
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

# --- soft-cap nudge safeguard ------------------------------------------------
# A turn that runs past a SOFT cap (default 300s = 5 min) gets ESC-interrupted
# and nudged to wrap up ("Just give me the results. We continue."), then the
# walk continues. Bounds per-turn wall-clock on reading-heavy turns (e.g. M6's
# -study scan of the whole ~/.claude/projects/ tree) without failing the run.
# The HARD timeout still applies as the absolute ceiling if even the wrap-up
# hangs.
#
# Counter hazard this has to defend against: the Stop hook
# (hooks/stop-sentinel.sh) numbers sentinels by COUNTING existing turn-*.done
# files. An ESC that still fires a Stop, PLUS the nudge's own Stop, can leave
# MORE than $seq files — which would make the next turn's sentinel appear early
# and desync every later turn. So the wrap-up wait below waits for the count to
# SETTLE (not for one exact filename) and then trims any surplus back to
# exactly $seq.
CLAUDE_RUNNER_NUDGE_TEXT="${CLAUDE_RUNNER_NUDGE_TEXT:-Just give me the results. We continue.}"

count_sentinels() {
  local dir="$1"
  find "$dir" -maxdepth 1 -name 'turn-*.done' 2>/dev/null | wc -l | tr -d ' '
}

reconcile_sentinels() {
  # Keep exactly turn-1..turn-$seq.done; delete higher-numbered surplus the
  # nudge produced so the count-based Stop hook stays aligned for later turns.
  local dir="$1" seq="$2" f n
  for f in "$dir"/turn-*.done; do
    [[ -e "$f" ]] || continue
    n="${f##*/turn-}"; n="${n%.done}"
    [[ "$n" =~ ^[0-9]+$ ]] || continue
    (( n > seq )) && rm -f "$f"
  done
  return 0   # the trailing `(( )) &&` short-circuits to 1 when nothing is
             # trimmed; without this the function returns nonzero and aborts
             # the caller under `set -e` on the common no-surplus path.
}

nudge_for_results() {
  # ESC to interrupt the in-flight turn, then send the wrap-up prompt.
  # (Single ESC: returns Claude Code to an empty input. A second ESC can open
  # the message-history picker on some builds, which would swallow the nudge —
  # so we send exactly one.)
  local session="$1"
  _tmux send-keys -t "$session" Escape 2>/dev/null || true
  sleep 1.5
  pane_send_text "$session" "$CLAUDE_RUNNER_NUDGE_TEXT"
}

wait_for_turn_guarded() {
  # $1=sentinel dir, $2=seq, $3=hard timeout, $4=tmux session (required for the
  # nudge), $5=optional soft cap (default $CLAUDE_RUNNER_SOFT_CAP or 300).
  #
  # Exit codes mirror wait_for_turn: 0 sentinel fired (with or without a
  # nudge), 1 hard timeout (even after the nudge), 2 pane died.
  local dir="$1" seq="$2" hard="$3" session="$4"
  local soft="${5:-${CLAUDE_RUNNER_SOFT_CAP:-300}}"

  # Disabled or nonsensical soft cap (no session to nudge, <=0, or >= hard):
  # fall straight through to the plain wait, no nudge.
  if [[ -z "$session" || -z "$soft" || "$soft" -le 0 || "$soft" -ge "$hard" ]]; then
    wait_for_turn "$dir" "$seq" "$hard" "$session"
    return $?
  fi

  # Phase 1 — wait up to the soft cap with the normal detectors.
  wait_for_turn "$dir" "$seq" "$soft" "$session"
  local rc=$?
  (( rc != 1 )) && return "$rc"   # 0 = done early, 2 = pane died; nothing to nudge

  # Phase 2 — soft cap hit. Interrupt + nudge, then wait the remaining budget
  # for the sentinel count to settle, and trim any surplus the nudge created.
  echo "wait_for_turn_guarded: turn $seq exceeded soft cap ${soft}s — ESC + nudge ('$CLAUDE_RUNNER_NUDGE_TEXT'); up to $((hard - soft))s for wrap-up." >&2
  nudge_for_results "$session"

  local remaining=$(( hard - soft ))
  (( remaining < 60 )) && remaining=60
  local waited=0 last=-1 stable=0 cur
  local need_stable=3            # count unchanged this many polls = settled
  while (( waited < remaining )); do
    if ! pane_alive "$session"; then
      echo "wait_for_turn_guarded: pane '$session' died during wrap-up at turn $seq" >&2
      reconcile_sentinels "$dir" "$seq"
      return 2
    fi
    cur="$(count_sentinels "$dir")"
    if (( cur >= seq )) && [[ "$cur" == "$last" ]]; then
      stable=$((stable + 1))
      (( stable >= need_stable )) && break
    else
      stable=0
    fi
    last="$cur"
    sleep 1
    waited=$((waited + 1))
  done

  reconcile_sentinels "$dir" "$seq"
  if (( $(count_sentinels "$dir") >= seq )); then
    echo "wait_for_turn_guarded: wrap-up landed for turn $seq (nudged)." >&2
    return 0
  fi
  echo "wait_for_turn_guarded: turn $seq still incomplete after nudge + ${remaining}s wrap-up budget" >&2
  return 1
}

#!/usr/bin/env bash
# Unit + integration tests for the soft-cap nudge safeguard added to
# lib/sync.sh (wait_for_turn_guarded + count_sentinels + reconcile_sentinels +
# nudge_for_results). The safeguard caps a turn at CLAUDE_RUNNER_SOFT_CAP
# seconds, then ESC-interrupts and nudges "Just give me the results. We
# continue." before continuing the walk.
#
# The load-bearing risk is the count-based Stop hook (hooks/stop-sentinel.sh):
# an ESC that still fires a Stop, plus the nudge's own Stop, leaves a surplus
# turn-*.done file that would desync every later turn. The integration test
# reproduces exactly that double-sentinel and asserts reconcile heals it.
#
# Run: bash tests/guarded-wait.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/tmux.sh"
source "$HERE/../lib/sync.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

mk_dir() { mktemp -d; }
mk_turns() { local d="$1"; shift; for i in "$@"; do touch "$d/turn-$i.done"; done; }

echo "[test] count_sentinels counts turn-*.done only"
d="$(mk_dir)"; mk_turns "$d" 1 2 3
touch "$d/turn-notanumber.done" "$d/other.txt"
# turn-notanumber.done matches the glob but is not a numbered turn; count is a
# coarse gate (the hook counts the same way), so this documents the behaviour.
check "counts the three numbered + one glob-match" "$(count_sentinels "$d")" "4"
rm -rf "$d"

echo "[test] reconcile_sentinels trims surplus down to seq"
d="$(mk_dir)"; mk_turns "$d" 1 2 3 4 5
reconcile_sentinels "$d" 3
left="$(ls "$d"/turn-*.done 2>/dev/null | sed 's@.*/@@' | sort -t- -k2 -n | tr '\n' ' ')"
check "only turn-1..3 remain after reconcile to seq=3" "$left" "turn-1.done turn-2.done turn-3.done "
rm -rf "$d"

echo "[test] reconcile_sentinels is a no-op when there is no surplus"
d="$(mk_dir)"; mk_turns "$d" 1 2 3
reconcile_sentinels "$d" 5          # seq ahead of what exists
check "no files removed when count < seq" "$(count_sentinels "$d")" "3"
reconcile_sentinels "$d" 3          # seq == count
check "no files removed when count == seq" "$(count_sentinels "$d")" "3"
rm -rf "$d"

echo "[test] wait_for_turn_guarded passthrough: empty session -> plain wait, sentinel present"
d="$(mk_dir)"; mk_turns "$d" 1
rc=0; wait_for_turn_guarded "$d" 1 100 "" 300 || rc=$?
check "returns 0 immediately when sentinel exists (disabled path)" "$rc" "0"
rm -rf "$d"

echo "[test] wait_for_turn_guarded passthrough: soft >= hard disables the nudge"
d="$(mk_dir)"; mk_turns "$d" 1
rc=0; wait_for_turn_guarded "$d" 1 100 "" 200 || rc=$?   # soft 200 >= hard 100
check "soft>=hard falls through to plain wait" "$rc" "0"
rm -rf "$d"

echo "[test] wait_for_turn_guarded passthrough: plain timeout still returns 1"
d="$(mk_dir)"   # no sentinel
rc=0; wait_for_turn_guarded "$d" 1 2 "" 300 || rc=$?     # empty session -> plain wait, 2s
check "hard timeout with no sentinel returns 1" "$rc" "1"
rm -rf "$d"

# --- integration: real tmux pane, soft cap hit, double-sentinel desync -------
if ! command -v tmux >/dev/null 2>&1; then
  echo "[test] (skipping tmux integration — tmux not on PATH)"
else
  echo "[test] integration: soft cap fires -> nudge -> double sentinel -> reconciled"
  export RUNNER_TMUX_SOCKET="guardtest-$$"
  sess="guard-$$"
  d="$(mk_dir)"; mk_turns "$d" 1 2 3 4        # seq target is 5; 1..4 pre-exist
  pane_start "$sess" "/tmp" "sleep 600"
  sleep 1
  # Simulate the hazard: ~4s in (after the 2s soft cap + nudge), the ESC-stop
  # AND the nudge-stop both land -> turn-5 and a surplus turn-6.
  ( sleep 4; touch "$d/turn-5.done"; sleep 0.3; touch "$d/turn-6.done" ) &
  toucher=$!
  rc=0; wait_for_turn_guarded "$d" 5 30 "$sess" 2 || rc=$?
  wait "$toucher" 2>/dev/null || true
  check "guarded wait returns 0 after nudge + settle" "$rc" "0"
  check "count reconciled to exactly seq=5" "$(count_sentinels "$d")" "5"
  if [[ -e "$d/turn-6.done" ]]; then bad "surplus turn-6.done not trimmed"; else ok "surplus turn-6.done removed"; fi
  pane_kill "$sess"
  tmux -L "$RUNNER_TMUX_SOCKET" kill-server 2>/dev/null || true
  rm -rf "$d"
fi

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

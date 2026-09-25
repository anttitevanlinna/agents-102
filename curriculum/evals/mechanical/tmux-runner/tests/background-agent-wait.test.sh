#!/usr/bin/env bash
# A turn is not over while the pane says "✻ Waiting for N background agent(s)
# to finish". The Stop hook fires when the MAIN agent yields, not when its
# backgrounded subagents do, so the bare sentinel ends the turn early: M4 T2
# (lemmings, Sonnet, 2026-09-25) backgrounded the audit sub-agent, the runner
# fired T3 "pick the audit gaps" 4s later against no audit, and every later
# turn ran on the missing fill. When the agent then finishes while the pane is
# idle, Claude Code re-invokes the main agent and a SECOND Stop lands — a
# surplus sentinel that the count-based hook reads as the next turn's.
#
# Run: bash tests/background-agent-wait.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/tmux.sh"
source "$HERE/../lib/sync.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }
yes_no(){ if "$@"; then echo yes; else echo no; fi; }

# Pane shapes lifted from out/20260925-093936-88647/turn-6.transcript.txt.
pending_snap='⏺ Agent(Audit agent setup vs task)
  ⎿  Backgrounded agent (↓ to manage · ctrl+o to expand)
⏺ The top-5 ranking will follow when it reports back.
✻ Waiting for 1 background agent to finish
────────────────────────────────
❯
────────────────────────────────
  ◯ general-purpose  Audit agent setup vs task      6s · ↓ 37.0k tokens'

finished_snap='✻ Waiting for 1 background agent to finish
⏺ Agent "Audit agent setup vs task" finished · 55s
⏺ Reds fail for the predicted reasons.
✻ Cooked for 2m 34s · done 9:43 AM
────────────────────────────────
❯ '

echo "[test] bg_agents_pending reads the LAST status line"
check "pending while last status is Waiting" "$(yes_no bg_agents_pending "$pending_snap")" "yes"
check "clear once a later done-status replaces it" "$(yes_no bg_agents_pending "$finished_snap")" "no"
check "plural form counts" "$(yes_no bg_agents_pending '✻ Waiting for 3 background agents to finish')" "yes"
check "no status line at all is not pending" "$(yes_no bg_agents_pending '❯ hello')" "no"
check "empty snap is not pending" "$(yes_no bg_agents_pending '')" "no"

if ! command -v tmux >/dev/null 2>&1; then
  echo "[test] (skipping tmux integration — tmux not on PATH)"
else
  export RUNNER_TMUX_SOCKET="bgwait-$$"
  d="$(mktemp -d)"
  script="$d/pane.sh"

  echo "[test] integration: sentinel lands while an agent is pending -> wait holds, surplus trimmed"
  sess="bg-$$"
  cat > "$script" <<'EOF'
printf '⏺ Agent(Audit)\n✻ Waiting for 1 background agent to finish\n'
sleep 4
printf '⏺ Agent "Audit" finished · 4s\n✻ Cooked for 5s · done\n'
sleep 600
EOF
  mkdir "$d/s1"; touch "$d/s1/turn-1.done"          # main agent yielded: seq 1 "done"
  pane_start "$sess" "/tmp" "bash $script"
  # the re-invoked main agent's own Stop, once the agent finishes
  ( sleep 4.5; touch "$d/s1/turn-2.done" ) & toucher=$!
  t0=$(date +%s)
  rc=0; wait_for_turn "$d/s1" 1 60 "$sess" || rc=$?
  el=$(( $(date +%s) - t0 ))
  wait "$toucher" 2>/dev/null || true
  check "returns 0" "$rc" "0"
  check "held until the agent finished (>=4s)" "$(( el >= 4 ))" "1"
  check "surplus follow-up Stop trimmed to seq=1" "$(count_sentinels "$d/s1")" "1"
  pane_kill "$sess"

  echo "[test] integration: no background agent -> returns at once, nothing trimmed"
  sess="bg2-$$"
  mkdir "$d/s2"; touch "$d/s2/turn-1.done"
  pane_start "$sess" "/tmp" "bash -c 'printf \"✻ Worked for 3s · done\\n\"; sleep 600'"
  sleep 1
  t0=$(date +%s)
  rc=0; wait_for_turn "$d/s2" 1 60 "$sess" || rc=$?
  el=$(( $(date +%s) - t0 ))
  check "returns 0" "$rc" "0"
  check "no hold (<3s)" "$(( el < 3 ))" "1"
  check "count untouched" "$(count_sentinels "$d/s2")" "1"
  pane_kill "$sess"

  tmux -L "$RUNNER_TMUX_SOCKET" kill-server 2>/dev/null || true
  rm -rf "$d"
fi

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

#!/usr/bin/env bash
# Per-turn timeout selection.
#
# The multi-hour send-off budget belongs to the send-off KEY, not to the last
# position in the scenario. Positional selection held only while the send-off
# happened to be the final turn; ae101-m5-done-done runs in the M4 send-off
# session and lands after it, which under the old rule handed the two-hour
# budget to a one-question turn and dropped the real send-off to standard.
set -uo pipefail

turn_budget() {
  # $1=this turn's key ("" for a literal turn), $2=send-off key,
  # $3=standard timeout, $4=send-off timeout. Echoes the timeout to use.
  local key="$1" sendoff_key="$2" standard="$3" sendoff="$4"
  if [[ -n "$key" && "$key" == "$sendoff_key" ]]; then
    echo "$sendoff"
  else
    echo "$standard"
  fi
}

wait_expired() {
  # $1=poll-counter seconds, $2=wall-clock seconds, $3=timeout.
  # Echoes "" (keep waiting), "poll" (the loop counted out the budget) or
  # "wall" (real time ran out regardless of what the loop counted).
  #
  # Two clocks because they disagree across a machine sleep. wait_for_turn
  # counts its own `sleep 1` iterations, and a suspended process does not
  # iterate: on 2026-08-31 a turn sat for 22.5 hours of wall clock while its
  # counter read 2490s of a 3600s cap, so the cap never fired and the run
  # hung until a human noticed. Wall clock is the authority; the poll counter
  # stays because a turn can also legitimately exhaust it while the machine
  # is awake, and saying which clock ran out tells you which failure it was.
  # "wall" is reserved for the clocks DISAGREEING — real time spent that the
  # loop never counted. When both clocks land together the turn simply ran out
  # while the machine was awake, which is an ordinary "poll" timeout.
  local waited="$1" elapsed="$2" timeout="$3"
  local suspend_margin=300
  if [[ "$elapsed" -ge "$timeout" ]] && [[ $((elapsed - waited)) -ge "$suspend_margin" ]]; then
    echo "wall"; return
  fi
  if [[ "$waited" -ge "$timeout" ]] || [[ "$elapsed" -ge "$timeout" ]]; then
    echo "poll"; return
  fi
  echo ""
}

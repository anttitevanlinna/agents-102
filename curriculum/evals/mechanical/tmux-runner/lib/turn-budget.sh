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

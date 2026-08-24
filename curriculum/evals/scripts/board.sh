#!/usr/bin/env bash
# board.sh — every quality reader, one call, in reading order.
#
# WHAT THIS IS NOT: a status board. `status.sh` was deleted 2026-08-23 for
# computing its own view of quality state — it read the JSON instances instead
# of each file's Quality pins, so it lagged; it showed four of seven classes;
# and its --training filter leaked other trainings into the grid. Two boards
# disagreeing is worse than one, and the one sourced from derived state is
# always the one that says green.
#
# So this derives NOTHING. It shells out to the canonical readers and prints
# what they say, in the order you want to read them, with the exit codes
# preserved. Every number below belongs to the script that printed it. If you
# find yourself wanting to add a tally here, add it to the reader that owns the
# data instead — the moment this file computes something, it is status.sh again.
#
# Usage:
#   curriculum/evals/scripts/board.sh [--training ae101] [--gate]
#
# --gate: exit 1 if any GATE-class reader failed (verdict agreement, instance
# names, trace names). The queue and the freshness readers are reports, never
# gates: owing a judge is a to-do list, not a broken repo.
set -uo pipefail
cd "$(dirname "$0")/../../.." || exit 2

TRAINING=""
GATE=0
while [ $# -gt 0 ]; do
  case "$1" in
    --training) TRAINING="$2"; shift 2 ;;
    --gate) GATE=1; shift ;;
    *) echo "board.sh: unknown flag $1" >&2; exit 2 ;;
  esac
done
SCOPE=()
[ -n "$TRAINING" ] && SCOPE=(--training "$TRAINING")

rule() { printf '\n\033[1m── %s\033[0m\n' "$1"; }
fails=0

# Reports first: what still owes work. Never gates.
rule "QUEUE — what owes a judge"
node curriculum/evals/scripts/eval-queue.js "${SCOPE[@]}"

rule "SIM TRACES — caches that no longer describe their file"
node curriculum/evals/scripts/sim-freshness.js "${SCOPE[@]}" | tail -n 4

rule "MOOD — persona scores against the ship bar"
node curriculum/evals/scripts/sim-freshness.js --mood "${SCOPE[@]}" | tail -n 20

# A gate whose exit code is read through a pipe is not a gate: `$?` after
# `node x | tail` belongs to tail, which always succeeds. That mistake was made
# twice in one session by hand, so the tail-through-a-file shape below is the
# only way this script is allowed to trim a gate's output.
gate() {
  local title="$1" keep="$2"; shift 2
  rule "$title"
  local out rc
  out="$("$@" 2>&1)"; rc=$?
  if [ "$keep" = "all" ]; then printf '%s\n' "$out"; else printf '%s\n' "$out" | tail -n "$keep"; fi
  [ "$rc" -ne 0 ] && fails=$((fails + 1))
  return 0
}

# Gates second: what is internally inconsistent RIGHT NOW. These fail closed.
gate "VERDICT AGREEMENT — instance JSON vs the Quality row citing it" all \
  node curriculum/evals/scripts/check-verdict-agreement.js --quiet

gate "INSTANCE NAMES" 3 \
  node curriculum/evals/scripts/check-instance-names.js

gate "TRACE NAMES" 3 \
  node curriculum/evals/scripts/check-trace-names.js --quiet

printf '\n'
if [ "$fails" -gt 0 ]; then
  echo "$fails gate(s) failing. The reports above are to-do lists; these are contradictions."
  [ "$GATE" -eq 1 ] && exit 1
else
  echo "gates clean."
fi
exit 0

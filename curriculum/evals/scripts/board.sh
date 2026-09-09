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
# --gate: exit 1 if any GATE-class reader failed (instance schema, verdict
# agreement, instance names, trace names). The queue, the cards and the freshness
# readers are reports, never gates: owing a judge or a decision is a to-do list,
# not a broken repo.
#
# Two questions, two readers, both above the gates: eval-queue answers what owes
# a JUDGE, open-cards answers what owes a HUMAN. Neither derives the other's
# half, and a status question that reads only one of them undercounts.
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
node curriculum/evals/scripts/eval-queue.js ${SCOPE[@]+"${SCOPE[@]}"}

# The other half of "what's open". Until 2026-09-09 only the judge half had a
# reader, and the human half was answered by copy-pasting a `node -e` one-liner
# out of the prose of an unreferenced 29K report — which is how a 26-card queue
# got read as 131.
rule "CARDS — what owes a human"
node curriculum/evals/scripts/open-cards.js ${SCOPE[@]+"${SCOPE[@]}"}

rule "SIM TRACES — caches that no longer describe their file"
node curriculum/evals/scripts/sim-freshness.js ${SCOPE[@]+"${SCOPE[@]}"} | tail -n 4

rule "MOOD — persona scores against the ship bar"
node curriculum/evals/scripts/sim-freshness.js --mood ${SCOPE[@]+"${SCOPE[@]}"} | tail -n 20

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

# This one was missing until 2026-09-09, and its absence was the expensive kind:
# the board printed "gates clean" while check-instance-schema was exiting 1 on
# fifteen instances whose counts disagreed with their own ledgers. A gate that is
# never called cannot report red, and a green board over a red checker is the
# same lie whether the exit code was swallowed or never asked for. It needs a
# training — the three have independent histories and one must not hold another
# hostage — so with no --training there is nothing to check rather than
# everything.
if [ -n "$TRAINING" ]; then
  gate "INSTANCE SCHEMA — counts against the ledgers beneath them" all \
    node curriculum/evals/scripts/check-instance-schema.js --training "$TRAINING"
fi

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

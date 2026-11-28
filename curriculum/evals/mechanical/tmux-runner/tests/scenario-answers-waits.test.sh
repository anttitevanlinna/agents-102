#!/usr/bin/env bash
# A course prompt that asks the student something and waits for the answer must
# get that answer from its scenario, one of two ways:
#   - up front in its tail: <CONTROL:NO_QUESTIONS> plus a canned answer, or
#   - as the next turn: <CONTROL:PLAIN_QUESTION> in the tail, and the next
#     scenario line a literal `*` turn carrying the answer. This is the learner's
#     real flow, for a prompt whose answer responds to what the agent just showed.
# Otherwise the session ends the turn on a question nobody answers, the next
# course prompt reads as the reply, and the file the prompt writes after the
# answer never lands. Live chain 2026-11-26: M1 T5 asked "what changed the page
# most?", got no answer, never wrote module-1/context-trace.md, and the
# warn-only assertion passed.
# Run: bash tests/scenario-answers-waits.test.sh   (exits nonzero on any miss)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REG="$HERE/../../../../prompts"
SCEN="$HERE/../scenarios"
WAIT_RE='wait for (my|each|the) (answer|reply|marks?)|wait for my|ask me (one|two|three|a few|some)? ?questions?|ask me (what|which|whether)|^I compare and answer|for each, I answer|I answer (grounded|in one)'
pass=0 fail=0
for f in "$SCEN"/a101-*.txt; do
  lines=()
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in ''|\#*|@*) continue ;; esac
    lines+=("$line")
  done < "$f"
  for i in "${!lines[@]}"; do
    line="${lines[$i]}"
    [[ "$line" == \** ]] && continue
    key="${line%%[[:space:]]*}"
    [[ -f "$REG/$key.md" ]] || continue
    grep -qiE "$WAIT_RE" "$REG/$key.md" || continue
    tail=""; [[ "$line" == *[[:space:]]* ]] && tail="${line#*[[:space:]]}"
    next="${lines[$((i+1))]:-}"
    if [[ "$tail" == *'<CONTROL:NO_QUESTIONS>'* ]]; then
      pass=$((pass+1)); echo "  ok   - $(basename "$f") $key answers up front"
    elif [[ "$tail" == *'<CONTROL:PLAIN_QUESTION>'* && "$next" == \** ]]; then
      pass=$((pass+1)); echo "  ok   - $(basename "$f") $key answers on the next turn"
    else
      fail=$((fail+1)); echo "  FAIL - $(basename "$f") $key waits for an answer the scenario never gives" >&2
    fi
  done
done
echo "answers-waits: $pass ok, $fail missing"
[[ $fail -eq 0 ]]

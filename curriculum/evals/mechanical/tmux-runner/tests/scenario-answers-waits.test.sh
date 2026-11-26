#!/usr/bin/env bash
# A course prompt that asks the student something and waits for the answer must
# carry the answer up front in its scenario tail (<CONTROL:NO_QUESTIONS> plus a
# canned answer). Otherwise the session ends the turn on a question nobody
# answers, the next scenario line reads as the reply, and the file the prompt
# writes after the answer never lands. Live chain 2026-11-26: M1 T5 asked "what
# changed the page most?", got no answer, never wrote module-1/context-trace.md,
# and the warn-only assertion passed.
# Run: bash tests/scenario-answers-waits.test.sh   (exits nonzero on any miss)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REG="$HERE/../../../../prompts"
SCEN="$HERE/../scenarios"
WAIT_RE='wait for (my|each|the) (answer|reply)|ask me (one|two|three|a few|some)? ?questions?|ask me what'
pass=0 fail=0
for f in "$SCEN"/a101-*.txt; do
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in ''|\#*|\**|@*) continue ;; esac
    key="${line%%[[:space:]]*}"
    [[ -f "$REG/$key.md" ]] || continue
    grep -qiE "$WAIT_RE" "$REG/$key.md" || continue
    tail=""; [[ "$line" == *[[:space:]]* ]] && tail="${line#*[[:space:]]}"
    if [[ "$tail" == *'<CONTROL:NO_QUESTIONS>'* ]]; then
      pass=$((pass+1)); echo "  ok   - $(basename "$f") $key answers up front"
    else
      fail=$((fail+1)); echo "  FAIL - $(basename "$f") $key waits for an answer the scenario never gives" >&2
    fi
  done < "$f"
done
echo "answers-waits: $pass ok, $fail missing"
[[ $fail -eq 0 ]]

#!/usr/bin/env bash
# run the taste judge exactly as loop.sh does: rules + both example files, PAIRS_BATCH=2, EVAL_LEAN=0, from the repo root
J="$1"; TAG="$2"; RULES="${RULES:-curriculum/evals/mechanical/persona-student/taste-rules.md}"; EX="${EX:-curriculum/evals/mechanical/persona-student/taste-examples.md,curriculum/evals/mechanical/persona-student/taste-examples-cuts.md}"
R="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"; cd $R; P=$R/curriculum/evals/mechanical/persona-student
export PATH=$R/curriculum/evals/loops/bin:$PATH EVAL_BUDGET=2000 EVAL_BUDGET_FILE=$J/$TAG.count EVAL_LEAN=0 PAIRS_BATCH=2
mkdir -p $J/$TAG
for s in same para para2 swap; do for o in blind swapped; do node $P/pairs.js --blind $J/placebo/$s.$o.jsonl --rules $RULES --examples $EX --out $J/$TAG/$s.$o.picks.jsonl > /dev/null 2>&1 & done; done
for c in 0 1 2 3; do for o in blind swapped; do node $P/pairs.js --blind $J/antti/c$c.$o.jsonl --rules $RULES --examples $EX --out $J/$TAG/antti$c.$o.picks.jsonl > /dev/null 2>&1 & done; done
wait; date > $J/$TAG/DONE

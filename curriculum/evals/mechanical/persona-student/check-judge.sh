#!/usr/bin/env bash
# check-judge.sh — standing checks for the taste judge. Run after ANY change to taste-rules.md or the examples.
#   1. AE101 anchor: equal-length put-down/narrator/witty swaps in AE101 sections. Alert below 90%.
#   2. Concrete-sentence removal: Agents 101 module slides with one concrete sentence deleted (mkconcrete.py, no LLM).
#      WATCH, not alert: baseline about 50% with v3; Antti's own history cuts such sentences 13 of 17 times, so
#      'original wins' is not yet his call (runs/2026-11-01-concrete-removal/README.md). Alert if it falls below 40%.
# Usage (from persona-student/): ./check-judge.sh OUTDIR [examples-list]
# Under loops/bin/claude, run with EVAL_LEAN=0: the anchor was calibrated on full calls (lean: 83%, full: 100%, 2026-11-13).
set -euo pipefail
OUT=${1:?outdir}; EX=${2:-taste-examples.md,taste-examples-cuts.md}; RULES=${RULES:-taste-rules.md}; mkdir -p "$OUT"
A=runs/2026-11-01-ae101-anchor; D=runs/2026-11-01-concrete-removal
python3 - "$D" "$OUT" <<'PY'
import json,sys
D,O=sys.argv[1:]
import shutil
for n in ('blind','swapped','key'): shutil.copy(f'{D}/cc.{n}.jsonl', f'{O}/cc.{n}.jsonl')
PY
node pairs.js --blind $A/hard.blind.jsonl --rules "$RULES" --examples "$EX" --out "$OUT/anchor.jsonl" >/dev/null 2>&1 &
node pairs.js --blind $A/hard.swapped.jsonl --rules "$RULES" --examples "$EX" --out "$OUT/anchor-sw.jsonl" >/dev/null 2>&1 &
node pairs.js --blind "$OUT/cc.blind.jsonl" --rules "$RULES" --examples "$EX" --out "$OUT/cc.jsonl" >/dev/null 2>&1 &
node pairs.js --blind "$OUT/cc.swapped.jsonl" --rules "$RULES" --examples "$EX" --out "$OUT/cc-sw.jsonl" >/dev/null 2>&1 &
wait
python3 - "$A/hard.key.jsonl" "$OUT" <<'PY'
import json,sys
K,O=sys.argv[1:]; fl={'a':'b','b':'a'}; rd=lambda f:{j['id']:j for j in map(json.loads,open(f))}
bad=0
for name,key,p1,p2,bar in (('AE101 anchor',K,'anchor','anchor-sw',90),('concrete-sentence removal (watch)',f'{O}/cc.key.jsonl','cc','cc-sw',40)):
    k=rd(key); a=rd(f'{O}/{p1}.jsonl'); b=rd(f'{O}/{p2}.jsonl')
    c=sum(a.get(i,{}).get('pick')==k[i]['answer'] for i in k)+sum(fl.get(b.get(i,{}).get('pick'))==k[i]['answer'] for i in k)
    miss=sum(i not in a for i in k)+sum(i not in b for i in k)
    pct=100*c/(2*len(k)); ok=pct>=bar; bad+=not ok
    print(f"{name}: {pct:.0f}% ({c}/{2*len(k)}), bar {bar}% -> {'OK' if ok else 'ALERT'}  (noise ±5)" + (f"; {miss} picks missing (pairs.js dropped a batch; rerun those before reading an ALERT)" if miss else ""))
sys.exit(1 if bad else 0)
PY

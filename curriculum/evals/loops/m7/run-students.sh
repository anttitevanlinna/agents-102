#!/usr/bin/env bash
# run-students.sh <lab-checkout> <page.md> <label> <outdir> — 3 personas x 2 repeats, in parallel.
set -uo pipefail
LAB="$1"; PAGE="$2"; LABEL="$3"; OUT="$4"
P="$LAB/curriculum/evals/mechanical/persona-student"; PD="$LAB/curriculum/evals/personas/agents-101"
mkdir -p "$OUT"
for who in ingrid cfo-sceptic cto-builder; do for r in 1 2; do
  f="$OUT/$LABEL-$who-r$r.json"; [ -s "$f" ] && continue
  node "$P/experience.js" --persona-dir "$PD" --persona "$who" --module personal-to-team --page "$PAGE" --out "$f" &
done; done
wait

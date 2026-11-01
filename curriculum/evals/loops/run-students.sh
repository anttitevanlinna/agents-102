#!/usr/bin/env bash
# run-students.sh <lab-checkout> <page.md> <label> <outdir> [module] — personas x repeats, in parallel.
# PERSONAS (default "ingrid cfo-sceptic cto-builder") and REPEATS (default 2) override the panel.
set -uo pipefail
LAB="$1"; PAGE="$2"; LABEL="$3"; OUT="$4"; MOD="${5:-personal-to-team}"
P="$LAB/curriculum/evals/mechanical/persona-student"; PD="$LAB/curriculum/evals/personas/agents-101"
mkdir -p "$OUT"
for who in ${PERSONAS:-ingrid cfo-sceptic cto-builder}; do for r in $(seq 1 "${REPEATS:-2}"); do
  f="$OUT/$LABEL-$who-r$r.json"; [ -s "$f" ] && continue
  node "$P/experience.js" --persona-dir "$PD" --persona "$who" --module "$MOD" --page "$PAGE" --out "$f" &
done; done
wait

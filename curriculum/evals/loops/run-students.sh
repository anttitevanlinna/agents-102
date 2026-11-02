#!/usr/bin/env bash
# run-students.sh <lab-checkout> <page.md> <label> <outdir> [module] — personas x repeats.
# PERSONAS (default "ingrid cfo-sceptic cto-builder") and REPEATS (default 2) set the panel.
# At most STUDENT_JOBS (default 8) run at once; each failed run is retried twice with a back-off.
# Exits 3 if any student is still missing: a dropout changes the persona mix, and that alone
# moved the teaching number by ~20 points on unchanged text (2026-11-02).
set -uo pipefail
LAB="$1"; PAGE="$2"; LABEL="$3"; OUT="$4"; MOD="${5:-personal-to-team}"
P="$LAB/curriculum/evals/mechanical/persona-student"; PD="$LAB/curriculum/evals/personas/agents-101"
mkdir -p "$OUT"
one() {
  local f="$OUT/$LABEL-$1-r$2.json" t
  for t in 1 2 3; do
    [ -s "$f" ] && return 0
    node "$P/experience.js" --persona-dir "$PD" --persona "$1" --module "$MOD" --page "$PAGE" --out "$f" \
      || echo "[students] $LABEL $1 r$2 try $t failed" >&2
    [ -s "$f" ] || sleep $((t * 30))
  done
}
export -f one; export OUT LABEL P PD MOD PAGE
for who in ${PERSONAS:-ingrid cfo-sceptic cto-builder}; do for r in $(seq 1 "${REPEATS:-2}"); do echo "$who $r"; done; done \
  | xargs -P "${STUDENT_JOBS:-8}" -L 1 bash -c 'one "$0" "$1"'
want=$(( $(echo ${PERSONAS:-ingrid cfo-sceptic cto-builder} | wc -w) * ${REPEATS:-2} ))
have=$(ls "$OUT"/"$LABEL"-*-r*.json 2>/dev/null | wc -l)
echo "[students] $LABEL: $have of $want"
[ "$have" -ge "$want" ] || { echo "[students] INCOMPLETE $LABEL: $have of $want" >&2; exit 3; }

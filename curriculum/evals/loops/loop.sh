#!/usr/bin/env bash
# loop.sh — one pass of the quality loop on one Agents 101 module.
#
#   curriculum/evals/loops/loop.sh <module> <apply.py> <variants> <out-dir>
#   e.g. loop.sh personal-to-team m7/apply.py v1,v2,v3 /tmp/m7-run
#
# <module>   name of trainings/agents-101/<module>.md; needs persona-student/modules/<module>.json
#            (mood contract, intended learnings, damage spec).
# <apply.py> `apply.py <checkout> <variant>` rewrites the module's files in place for one variant.
#            Pass "-" with variants "" to measure the shipped text only (the personas
#            calibration run).
# Builds v0 (shipped) plus each variant and a damaged copy of v0, then runs every instrument:
# persona students (PERSONAS, REPEATS), learning match, word signal, story judge (STORY_N opus
# calls), taste judge pairs vs v0 in both orders, sentence flags, and the teaching measure
# (Big Idea stated cold, ranked first). Writes <out-dir>/report.md.
# Student text in this checkout is never touched; variants live in <out-dir>/lab/<v>.
# BASE_REV=<rev> makes v0 the text at that revision (instruments always come from this checkout);
# with rev-apply.py, variants named after revisions compare two points in history.
set -uo pipefail
MOD="$1"; APPLY="$2"; VARS="$3"; OUT="$(mkdir -p "$4" && cd "$4" && pwd)"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"; ROOT="$(cd "$HERE" && git rev-parse --show-toplevel)"
PS="$ROOT/curriculum/evals/mechanical/persona-student"
[ -f "$PS/modules/$MOD.json" ] || { echo "missing $PS/modules/$MOD.json" >&2; exit 2; }
IFS=, read -ra VS <<< "$VARS"; ALL=(v0 "${VS[@]}")
log() { echo "[loop] $*" >&2; }

log "lab: $OUT/lab"
mkdir -p "$OUT"/{lab,pages,students,story,taste,flags}
if [ ! -d "$OUT/lab/v0" ]; then
  git -C "$ROOT" worktree add -f --detach "$OUT/lab/v0" "${BASE_REV:-HEAD}" >/dev/null 2>&1 || { log "worktree failed"; exit 1; }
  # Uncommitted instrument edits in this checkout ride along, so the lab measures what you see.
  cp -a "$ROOT/curriculum/evals/mechanical/persona-student/." "$OUT/lab/v0/curriculum/evals/mechanical/persona-student/"
fi
for v in "${VS[@]}"; do
  [ -d "$OUT/lab/$v" ] || { cp -a "$OUT/lab/v0" "$OUT/lab/$v" && python3 "$APPLY" "$OUT/lab/$v" "$v" || exit 1; }
done
for v in "${ALL[@]}"; do
  (cd "$OUT/lab/$v/curriculum/evals/mechanical/persona-student" && bash page.sh "$MOD" "$OUT/pages/$v.md" >&2) || { log "page failed for $v"; exit 1; }
done
DMG=""
if node -e "process.exit((require('$PS/modules/$MOD.json').damage||{}).remove?0:1)"; then
  node "$PS/damage.js" --module "$MOD" --page "$OUT/pages/v0.md" --out "$OUT/pages/damaged.md" >&2 && DMG=damaged
fi

log "students, story judge, flags (parallel)"
for v in "${ALL[@]}" $DMG; do
  lab="$OUT/lab/${v/damaged/v0}"
  "$HERE/run-students.sh" "$lab" "$OUT/pages/$v.md" "$v" "$OUT/students" "$MOD" >"$OUT/students/$v.log" 2>&1 &
done
for v in "${ALL[@]}"; do
  [ -s "$OUT/story/$v.json" ] || node "$HERE/story-judge.js" "$OUT/pages/$v.md" "$OUT/story/$v.json" "${STORY_N:-3}" >"$OUT/story/$v.log" 2>&1 &
  node "$HERE/flags.js" "$OUT/lab/$v" --module "$MOD" --json >"$OUT/flags/$v.json" 2>/dev/null
done
if [ ${#VS[@]} -gt 0 ]; then
  python3 "$HERE/build-pairs.py" "$OUT/lab" "$OUT/taste" v0 "$VARS" "$MOD" >&2
  for o in blind swapped; do
    [ -s "$OUT/taste/picks-$o.jsonl" ] || PAIRS_BATCH=2 node "$PS/pairs.js" --blind "$OUT/taste/pairs.$o.jsonl" --rules "$PS/taste-rules.md" --examples "$PS/taste-examples.md,$PS/taste-examples-cuts.md" --out "$OUT/taste/picks-$o.jsonl" >"$OUT/taste/$o.log" 2>&1 &
  done
fi
wait
[ ${#VS[@]} -gt 0 ] && python3 "$HERE/taste-retry.py" "$OUT/taste" "$PS/pairs.js" "$PS/taste-rules.md" "$PS/taste-examples.md,$PS/taste-examples-cuts.md" >&2

log "scoring"
LOGS="$(ls "$OUT"/students/*.json | paste -sd, -)"
node "$PS/score.js" --module "$MOD" --logs "$LOGS" --match --out "$OUT/students-score.json" >/dev/null 2>&1
node "$HERE/words.js" --module-json "$PS/modules/$MOD.json" --logs "$LOGS" --out "$OUT/words.json" >/dev/null 2>&1
# Teaching measure (first-ranked): each student states the module's Big Idea cold; blind scorer.
# For a ranking use the n=24 panel: PERSONAS="ingrid cfo-sceptic cto-builder hr-svp ops-director veteran-director" REPEATS=4.
T="$ROOT/curriculum/evals/teaching"; mkdir -p "$OUT/teach"; : > "$OUT/teach/answers.jsonl"
for v in "${ALL[@]}" $DMG; do
  L="$(ls "$OUT"/students/$v-*.json 2>/dev/null | paste -sd, -)"; [ -n "$L" ] || continue
  node "$T/probe.js" --logs "$L" --group "$v" --out "$OUT/teach/$v.answers.jsonl" >>"$OUT/teach/probe.log" 2>&1
  cat "$OUT/teach/$v.answers.jsonl" >> "$OUT/teach/answers.jsonl"
done
node "$T/score.js" --in "$OUT/teach/answers.jsonl" --out "$OUT/teach/scored.jsonl" >"$OUT/teach/summary.txt" 2>&1
node "$HERE/report.js" "$OUT" "$MOD" > "$OUT/report.md"
log "done → $OUT/report.md"

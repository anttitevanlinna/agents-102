#!/usr/bin/env bash
# The M3 briefing is frozen (three-minds-one-synthesis-4 -> module-3/briefing-
# baseline.md), scored in M5 (hallucination-bakeoff-1-frozen copies its ## Answer
# word for word; -9 writes module-5/baseline-score.md) and judged as round 0 in
# M6 (eval-loop-1). The M5 plants can no longer ride a tail into a fresh briefing
# ("Do not fix, extend or reword it"), so the student writes them into the
# frozen copy's ## Answer before M5 starts, and every later count sees the same
# text. Checks: plant helper, scenario order, answers, assertions.
# Run: bash tests/a101-freeze-chain.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."; S="$ROOT/scenarios"
source "$ROOT/lib/assertions.sh"
set +e
pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
keys() { grep -vE '^[[:space:]]*(#|$|\*)' "$1" | awk '{print $1}' | tr '\n' ' ' | sed 's/ $//'; }

echo "[test] scenario order"
[[ "$(keys "$S/a101-m3.txt")" == *"three-minds-one-synthesis-1 three-minds-one-synthesis-4 a101-m3-debrief-handoff-rules"* ]] \
  && ok "m3 freezes the briefing before the debrief" || bad "m3: $(keys "$S/a101-m3.txt")"
[[ "$(keys "$S/a101-m4a.txt")" == "author-security-skill-guess "* ]] && ok "m4a opens with the guess" || bad "m4a: $(keys "$S/a101-m4a.txt")"
[[ "$(keys "$S/a101-m5.txt")" == "@student-plants-answer hallucination-bakeoff-1-frozen hallucination-bakeoff-2 hallucination-bakeoff-3 hallucination-bakeoff-marks hallucination-bakeoff-5 hallucination-bakeoff-8 hallucination-bakeoff-9 a101-m5-debrief-groundedness-rules" ]] \
  && ok "m5: plant, frozen copy, marks, score" || bad "m5: $(keys "$S/a101-m5.txt")"
[[ "$(keys "$S/a101-m6.txt")" == "eval-loop-1 eval-loop-2 eval-loop-5 eval-loop-spot-check a101-m6-debrief-tactic-sharpen new-human-role-in-the-loop-1 eval-loop-6" ]] \
  && ok "m6: spot-check before the debrief" || bad "m6: $(keys "$S/a101-m6.txt")"
grep -q 'M5_BRIEFING_SEED' "$S/a101-m5.txt" && bad "m5 still sends the seed tail against a word-for-word copy" || ok "no seed tail on the frozen copy"

echo "[test] answers for every new question"
for f in m3-doubted-line.txt m4-guess.txt m5-marks.txt m5-doubt-answer.txt m6-spot-marks.txt; do
  for kit in agents-101-synthetic agents-101-finnish-psychologist; do
    [[ -s "$ROOT/fixtures/$kit/answers/$f" ]] && ok "$kit/$f" || bad "missing $kit/answers/$f"
  done
done

echo "[test] assertions renumbered for the new turns"
for a in 'm3:8)' 'm3:10)' 'm4a:1)' 'm4a:5)' 'm5:4)' 'm5:7)' 'm5:8)' 'm6:4)' 'm6:6)'; do
  grep -qF "    $a" "$ROOT/run-a101.sh" && ok "has $a" || bad "run-a101 lacks $a"
done
grep -q 'fresh-briefing.md' "$ROOT/run-a101.sh" && bad "m6 T1 still expects fresh-briefing.md" || ok "m6 T1 checks round 0"

echo "[test] a101_student_plants_answer"
SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT
printf '# Crux\n\n## Question\nQ?\n\n## Answer\nLine one.\nLine two.\n\n## Doubted line\n> Line two.\nWhy: x\n' > "$SB/b.md"
printf 'Planted A. Planted B.\n' > "$SB/p.txt"
a101_student_plants_answer "$SB/b.md" "$SB/p.txt" >/dev/null 2>&1 && ok "plants" || bad "helper failed"
awk '/^## Answer/{a=1;next} /^## /{a=0} a' "$SB/b.md" | grep -q 'Planted A. Planted B.' && ok "inside ## Answer" || bad "plant not in ## Answer: $(cat "$SB/b.md")"
grep -q '^## Doubted line' "$SB/b.md" && [[ "$(grep -c 'Planted A' "$SB/b.md")" -eq 1 ]] && ok "doubted line kept, planted once" || bad "file damaged"
a101_student_plants_answer "$SB/b.md" "$SB/p.txt" >/dev/null 2>&1 && bad "planted twice" || ok "refuses a second plant"
printf '# no answer\n' > "$SB/n.md"
a101_student_plants_answer "$SB/n.md" "$SB/p.txt" >/dev/null 2>&1 && bad "planted without ## Answer" || ok "refuses a file with no ## Answer"

echo "[test] $pass passed, $fail failed"
[[ $fail -eq 0 ]]

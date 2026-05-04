#!/usr/bin/env bash
# Script judge for agents-101-m5 (setup + 5 detectors + scorer; 7 actors).
#
# Usage:
#   judge-m5.sh <scratch_dir> <setup_tr> <det1_tr> <det2_tr> <det3_tr> <det4_tr> <det5_tr> <scorer_tr>
#
# Writes report to: instances/agents-101-m5-verbatim-judge-report.md
# Exit 0 PASS, 1 FAIL.

set -uo pipefail

if [[ $# -ne 8 ]]; then
  echo "usage: $0 <scratch> <setup_tr> <det1..5_tr> <scorer_tr>" >&2
  exit 2
fi

SCRATCH="$1"
SETUP_TR="$2"
DET_TRS=("$3" "$4" "$5" "$6" "$7")
SCORER_TR="$8"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS=/tmp/prompts/hallucination-bakeoff
BRIEF="$SCRATCH/module-5/briefing.md"
BENCH="$SCRATCH/module-5/benchmark.md"
SCORE="$SCRATCH/module-5/scoreboard.md"
JUDGE_FILE="$SCRATCH/judges/groundedness-judge.md"
SETUP_SCROLL="$MECH_DIR/instances/agents-101-m5-verbatim-setup-scrollback.md"
SCORER_SCROLL="$MECH_DIR/instances/agents-101-m5-verbatim-scorer-scrollback.md"
REPORT="$MECH_DIR/instances/agents-101-m5-verbatim-judge-report.md"

declare -a names verdicts evidence
pass_count=0
fail_count=0
record() {
  local name="$1" verdict="$2" ev="$3"
  names+=("$name"); verdicts+=("$verdict"); evidence+=("$ev")
  if [[ "$verdict" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}

extract_uses() {
  local tr="$1"
  jq -r '
    select(.message.content[]?.type == "tool_use") |
    .message.content[] | select(.type == "tool_use") |
    [.name, (.input.file_path // .input.path // .input.command // ""), .id] | @tsv
  ' "$tr" 2>/dev/null
}

# V1, V2 — setup prompts read
for n in 001 002; do
  i=$((10#$n))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$SETUP_TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read prompt-${n}.txt (setup)"
  else
    record "V$i" "FAIL" "no Read of prompt-${n}.txt in setup"
  fi
done

# V3 — parameterized; substitution log expected. Look in any detector scrollback for prompt-003 method-naming.
# Soft check: at least one detector file exists with method line referring to one of five methods.
v3_pass=0
for det_file in "$SCRATCH"/module-5/detectors/*.md; do
  [[ -f "$det_file" ]] || continue
  if grep -iE 'triangulation|entailment|citation|self-consistency|counter-evidence' "$det_file" >/dev/null 2>&1; then
    v3_pass=1; break
  fi
done
[[ "$v3_pass" -eq 1 ]] && record "V3" "PASS" "method names present in detectors" || record "V3" "FAIL" "no detector method names"

# V4-V6 — scorer prompts read
for n in 004 005 006; do
  i=$((10#$n))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$SCORER_TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read prompt-${n}.txt (scorer)"
  else
    record "V$i" "FAIL" "no Read of prompt-${n}.txt in scorer"
  fi
done

# V7 — prompt-007 truncation log in scorer scrollback
if [[ -f "$SCORER_SCROLL" ]] && grep -F 'take-home prompt-007 truncated' "$SCORER_SCROLL" >/dev/null 2>&1; then
  record "V7" "PASS" "truncation log present"
else
  record "V7" "FAIL" "no truncation log"
fi

# A1 — briefing
if [[ -f "$BRIEF" ]]; then
  lines=$(wc -l < "$BRIEF" | tr -d ' ')
  if [[ "$lines" -ge 15 && "$lines" -le 100 ]]; then
    record "A1" "PASS" "$lines lines"
  else
    record "A1" "FAIL" "$lines lines (want 15-100)"
  fi
else
  record "A1" "FAIL" "briefing missing"
fi

# A2 — setup actor walked 5 claim-verdict cycles. Heuristic: scorer scrollback or setup transcript has ≥5 verdict tokens.
if [[ -f "$SETUP_SCROLL" ]]; then
  v_hits=$(grep -ciE 'grounded|not grounded|partly' "$SETUP_SCROLL" 2>/dev/null || echo 0)
  [[ "$v_hits" -ge 5 ]] && record "A2" "PASS" "$v_hits verdict mentions" || record "A2" "FAIL" "$v_hits verdicts"
else
  record "A2" "FAIL" "no setup scrollback"
fi

# A3 — benchmark with 5+ claim entries
if [[ -f "$BENCH" ]]; then
  rows=$(grep -cE '^- ' "$BENCH" 2>/dev/null || echo 0)
  table_rows=$(grep -cE '^\|' "$BENCH" 2>/dev/null || echo 0)
  table_rows=$((table_rows - 2 < 0 ? 0 : table_rows - 2))
  max=$(( rows > table_rows ? rows : table_rows ))
  if [[ "$max" -ge 5 ]]; then
    record "A3" "PASS" "$max claim entries"
  else
    record "A3" "FAIL" "$max entries (<5)"
  fi
else
  record "A3" "FAIL" "benchmark missing"
fi

# A4 — verdict mix not monotone
gh=$(grep -ciE '^[^a-z]*grounded' "$BENCH" 2>/dev/null || echo 0)
ngh=$(grep -ciF 'not grounded' "$BENCH" 2>/dev/null || echo 0)
if [[ "$gh" -ge 1 && "$ngh" -ge 1 ]]; then
  record "A4" "PASS" "grounded:$gh, not-grounded:$ngh"
else
  record "A4" "FAIL" "monotone (grounded:$gh, not-grounded:$ngh)"
fi

# A5 — 5 detector files
det_count=$(ls "$SCRATCH"/module-5/detectors/*.md 2>/dev/null | wc -l | tr -d ' ')
if [[ "$det_count" -eq 5 ]]; then
  record "A5" "PASS" "5 detector files"
else
  record "A5" "FAIL" "$det_count detector files"
fi

# A6 — Method line per detector
a6_pass=1; a6_ev=""
for det in "$SCRATCH"/module-5/detectors/*.md; do
  [[ -f "$det" ]] || continue
  if grep -F 'Method:' "$det" >/dev/null 2>&1; then
    a6_ev+="$(basename "$det" .md):✓ "
  else
    a6_pass=0; a6_ev+="$(basename "$det" .md):✗ "
  fi
done
[[ "$a6_pass" -eq 1 ]] && record "A6" "PASS" "$a6_ev" || record "A6" "FAIL" "$a6_ev"

# A7 — 2-7 findings per detector (allow 1.5x → 2-10)
a7_pass=1; a7_ev=""
for det in "$SCRATCH"/module-5/detectors/*.md; do
  [[ -f "$det" ]] || continue
  c=$(grep -cE '^- CLAIM:' "$det" 2>/dev/null || echo 0)
  if [[ "$c" -ge 2 && "$c" -le 10 ]]; then
    a7_ev+="$(basename "$det" .md):$c "
  else
    a7_pass=0; a7_ev+="$(basename "$det" .md):$c✗ "
  fi
done
[[ "$a7_pass" -eq 1 ]] && record "A7" "PASS" "$a7_ev" || record "A7" "FAIL" "$a7_ev"

# A8 — detectors did NOT read sibling detector files
a8_pass=1; a8_ev=""
for tr in "${DET_TRS[@]}"; do
  uses=$(extract_uses "$tr")
  bad=$(echo "$uses" | grep -E 'Read.*module-5/detectors/' || true)
  if [[ -n "$bad" ]]; then a8_pass=0; a8_ev+="leak "; fi
done
[[ "$a8_pass" -eq 1 ]] && record "A8" "PASS" "no detector cross-reads" || record "A8" "FAIL" "$a8_ev"

# A9 — detectors did NOT read benchmark.md
a9_pass=1
for tr in "${DET_TRS[@]}"; do
  uses=$(extract_uses "$tr")
  if echo "$uses" | grep -qE 'Read.*module-5/benchmark\.md'; then a9_pass=0; fi
done
[[ "$a9_pass" -eq 1 ]] && record "A9" "PASS" "no benchmark reads" || record "A9" "FAIL" "benchmark leak"

# A10 — scoreboard with header
if [[ -f "$SCORE" ]] && grep -E '\| Detector \| Precision \| Recall \| Coverage' "$SCORE" >/dev/null 2>&1; then
  record "A10" "PASS" "scoreboard header"
else
  record "A10" "FAIL" "scoreboard header missing"
fi

# A11 — 5 data rows
sb_rows=$(grep -cE '^\|' "$SCORE" 2>/dev/null || echo 0)
sb_rows=$((sb_rows - 2 < 0 ? 0 : sb_rows - 2))
[[ "$sb_rows" -ge 5 ]] && record "A11" "PASS" "$sb_rows rows" || record "A11" "FAIL" "$sb_rows rows"

# A12 — winner named
if grep -iE 'winner|ensemble' "$SCORE" >/dev/null 2>&1; then
  record "A12" "PASS" "winner named"
else
  record "A12" "FAIL" "no winner"
fi

# A13 — three-line classic-way contrast
if [[ -f "$SCORER_SCROLL" ]]; then
  hits=$(grep -ciE 'classic|faster|slower|why' "$SCORER_SCROLL" 2>/dev/null || echo 0)
  [[ "$hits" -ge 3 ]] && record "A13" "PASS" "$hits classic-way mentions" || record "A13" "FAIL" "$hits"
else
  record "A13" "FAIL" "no scorer scrollback"
fi

# A14 — judge file ≤30 lines (1.5x of 20)
if [[ -f "$JUDGE_FILE" ]]; then
  jl=$(wc -l < "$JUDGE_FILE" | tr -d ' ')
  [[ "$jl" -le 30 ]] && record "A14" "PASS" "$jl lines" || record "A14" "FAIL" "$jl lines"
else
  record "A14" "FAIL" "judge file missing"
fi

# A15 — Known limit: line
if grep -F 'Known limit:' "$JUDGE_FILE" >/dev/null 2>&1; then
  record "A15" "PASS" "Known limit present"
else
  record "A15" "FAIL" "Known limit missing"
fi

# A16 — no [BRACKET] placeholders
if grep -nE '\[[A-Z][A-Z_]+\]' "$JUDGE_FILE" >/dev/null 2>&1; then
  record "A16" "FAIL" "[BRACKET] placeholders present"
else
  record "A16" "PASS" "no placeholders"
fi

# A18 — no other judge files
extra=$(ls "$SCRATCH"/judges/*.md 2>/dev/null | grep -v 'groundedness-judge.md' || true)
if [[ -z "$extra" ]]; then
  record "A18" "PASS" "no extra judge files"
else
  record "A18" "FAIL" "extra: $extra"
fi

# A19 — no Debrief in scorer scrollback
if [[ -f "$SCORER_SCROLL" ]] && grep -i '^## Debrief' "$SCORER_SCROLL" >/dev/null 2>&1; then
  record "A19" "FAIL" "Debrief present"
else
  record "A19" "PASS" "no Debrief"
fi

# H1-H5: harness leakage across all transcripts
all_uses=""
for tr in "$SETUP_TR" "${DET_TRS[@]}" "$SCORER_TR"; do
  all_uses+=$(extract_uses "$tr")
  all_uses+=$'\n'
done

forbidden_check() {
  local label="$1" pattern="$2"
  if echo "$all_uses" | grep -qE "$pattern"; then
    record "$label" "FAIL" "leak detected"
  else
    record "$label" "PASS" "clean"
  fi
}
forbidden_check "H1" 'Read.*curriculum/exercises/'
forbidden_check "H2" 'Read.*curriculum/evals/mechanical/runners/.*(judge|sibling)'
forbidden_check "H3" 'Read.*maintainer\.md'
forbidden_check "H4" 'WebFetch'
# H5 — no Write to module-3 or module-4
if echo "$all_uses" | grep -qE 'Write.*(module-3|module-4)/'; then
  record "H5" "FAIL" "module-3/4 write"
else
  record "H5" "PASS" "no module-3/4 writes"
fi

# Prompt-source audit
psa_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" hallucination-bakeoff 2>&1) || true
psa_verdict=$(echo "$psa_out" | tail -1)

total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — Agents 101 M5 verbatim"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-m5.sh — no LLM."
  echo
  echo "## Assertions"
  echo
  echo "| ID | Verdict | Evidence |"
  echo "|---|---|---|"
  for i in "${!names[@]}"; do
    ev="${evidence[$i]//|/\\|}"
    ev="${ev//$'\n'/ }"
    echo "| ${names[$i]} | ${verdicts[$i]} | $ev |"
  done
  echo
  echo "## Prompt-source audit"
  echo '```'
  echo "$psa_out"
  echo '```'
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

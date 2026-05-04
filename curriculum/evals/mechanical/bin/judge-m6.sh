#!/usr/bin/env bash
# Script judge for agents-101-m6 (setup + run; 2 actors).
# Load-bearing invariant: judges/groundedness-judge.md must be byte-identical at end vs start.
#
# Usage:
#   judge-m6.sh <scratch_dir> <setup_tr> <run_tr> <judge_baseline_shasum>
#
# <judge_baseline_shasum> is the shasum of judges/groundedness-judge.md captured before run actor started
# (or empty string to skip — script will recompute against M5 scratch as best-effort baseline).
#
# Writes report to: instances/agents-101-m6-verbatim-judge-report.md
# Exit 0 PASS, 1 FAIL.

set -uo pipefail

if [[ $# -lt 3 ]]; then
  echo "usage: $0 <scratch> <setup_tr> <run_tr> [judge_baseline_shasum]" >&2
  exit 2
fi

SCRATCH="$1"
SETUP_TR="$2"
RUN_TR="$3"
BASELINE_SHA="${4:-}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS=/tmp/prompts/eval-loop
JUDGE_FILE="$SCRATCH/judges/groundedness-judge.md"
M5_JUDGE="$MECH_DIR/scratch/agents-101-m5/judges/groundedness-judge.md"
ORCH="$SCRATCH/module-6/orchestrator.md"
GEN="$SCRATCH/module-6/generator.md"
DASH="$SCRATCH/module-6/dashboard.md"
HEART="$SCRATCH/module-6/heartbeat.md"
EVNOTES="$SCRATCH/module-6/eval-notes.md"
SETUP_SCROLL="$MECH_DIR/instances/agents-101-m6-verbatim-setup-scrollback.md"
RUN_SCROLL="$MECH_DIR/instances/agents-101-m6-verbatim-run-scrollback.md"
RUN_REPORT="$MECH_DIR/instances/agents-101-m6-verbatim-run-report.md"
# Compose run text: scrollback if it exists, else run report (Actor may collapse both into one file).
if [[ -f "$RUN_SCROLL" ]]; then
  RUN_TEXT="$RUN_SCROLL"
else
  RUN_TEXT="$RUN_REPORT"
fi
REPORT="$MECH_DIR/instances/agents-101-m6-verbatim-judge-report.md"

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

# Verbatim — V1-V3 setup, V4-V5 run, V6 prompt-006 truncation
for n in 001 002 003; do
  i=$((10#$n))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$SETUP_TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read prompt-${n}.txt (setup)"
  else
    record "V$i" "FAIL" "no Read of prompt-${n}.txt"
  fi
done
for n in 004 005; do
  i=$((10#$n))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$RUN_TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read prompt-${n}.txt (run)"
  else
    record "V$i" "FAIL" "no Read of prompt-${n}.txt"
  fi
done
if [[ -f "$RUN_TEXT" ]] && grep -F 'Prompt-006' "$RUN_TEXT" >/dev/null 2>&1; then
  record "V6" "PASS" "prompt-006 truncation logged"
else
  record "V6" "FAIL" "no prompt-006 truncation log"
fi

# J1 — judge file byte-identical vs baseline (or against M5 scratch if no baseline)
current_sha=$(shasum "$JUDGE_FILE" 2>/dev/null | awk '{print $1}')
if [[ -z "$BASELINE_SHA" ]]; then
  BASELINE_SHA=$(shasum "$M5_JUDGE" 2>/dev/null | awk '{print $1}')
fi
if [[ -n "$BASELINE_SHA" && "$current_sha" == "$BASELINE_SHA" ]]; then
  record "J1" "PASS" "shasum match: $current_sha"
else
  record "J1" "FAIL" "shasum mismatch (current=$current_sha baseline=$BASELINE_SHA)"
fi

setup_uses=$(extract_uses "$SETUP_TR")
run_uses=$(extract_uses "$RUN_TR")
all_uses="$setup_uses"$'\n'"$run_uses"

# J2 — no Write/Edit to judges/groundedness-judge.md in either transcript
bad_judge_writes=$(echo "$all_uses" | grep -E '(Write|Edit).*judges/groundedness-judge\.md' || true)
if [[ -z "$bad_judge_writes" ]]; then
  record "J2" "PASS" "no Write/Edit on judge file"
else
  record "J2" "FAIL" "judge file mutated"
fi

# J3 — orchestrator.md asserts judge file is read-only
if grep -iE 'judge.*never|never.*judge|read.only.*judge|judge.*read.only|never write.*judge' "$ORCH" >/dev/null 2>&1; then
  record "J3" "PASS" "judge-immutability assertion present"
else
  record "J3" "FAIL" "no judge-immutability assertion in orchestrator"
fi

# A1 — fresh-briefing.md exists, 15-100 lines (allow 1.5x: up to 150)
FB="$SCRATCH/module-6/fresh-briefing.md"
if [[ -f "$FB" ]]; then
  fl=$(wc -l < "$FB" | tr -d ' ')
  if [[ "$fl" -ge 15 && "$fl" -le 150 ]]; then
    record "A1" "PASS" "$fl lines"
  else
    record "A1" "FAIL" "$fl lines"
  fi
else
  record "A1" "FAIL" "fresh-briefing missing"
fi

# A2 — first-run-judgment.md has per-claim feedback
FRJ="$SCRATCH/module-6/first-run-judgment.md"
if [[ -f "$FRJ" ]]; then
  hits=$(grep -ciE '(would make it groundable|cite|caveat|missing|source|verifiable)' "$FRJ" 2>/dev/null || echo 0)
  [[ "$hits" -ge 1 ]] && record "A2" "PASS" "$hits feedback hits" || record "A2" "FAIL" "$hits"
else
  record "A2" "FAIL" "first-run-judgment missing"
fi

# A3 — orchestrator names key elements (≥5 distinct)
if [[ -f "$ORCH" ]]; then
  distinct=0
  for kw in 'round 1' 'round 2' 'round 3' 'generator' 'judge' 'heartbeat' 'dashboard'; do
    grep -iqF "$kw" "$ORCH" 2>/dev/null && distinct=$((distinct+1))
  done
  [[ "$distinct" -ge 5 ]] && record "A3" "PASS" "$distinct elements" || record "A3" "FAIL" "$distinct"
else
  record "A3" "FAIL" "orchestrator missing"
fi

# A4 — pseudo-code outline appears in setup scrollback BEFORE orchestrator file Write
if [[ -f "$SETUP_SCROLL" ]]; then
  if grep -ciE 'pseudo|outline' "$SETUP_SCROLL" >/dev/null 2>&1; then
    record "A4" "PASS" "pseudo-code mentioned"
  else
    record "A4" "FAIL" "no pseudo-code in scrollback"
  fi
else
  record "A4" "FAIL" "no setup scrollback"
fi

# A5 — round folders exist
a5_pass=1
for n in 1 2 3; do
  [[ -d "$SCRATCH/module-6/runs/round-$n" ]] || a5_pass=0
done
[[ "$a5_pass" -eq 1 ]] && record "A5" "PASS" "round 1/2/3 folders" || record "A5" "FAIL" "missing round folder"

# A6 — dashboard.md exists at end
[[ -f "$DASH" ]] && record "A6" "PASS" "dashboard exists" || record "A6" "FAIL" "no dashboard"

# A7 — generator.md exists
if [[ -f "$GEN" ]]; then
  gl=$(wc -l < "$GEN" | tr -d ' ')
  [[ "$gl" -ge 1 ]] && record "A7" "PASS" "$gl lines" || record "A7" "FAIL" "$gl lines"
else
  record "A7" "FAIL" "generator missing"
fi

# A8 — per-round artifacts (briefing + judgment + strategy-diff)
a8_pass=1; a8_ev=""
for n in 1 2 3; do
  for f in briefing judgment strategy-diff; do
    if [[ -f "$SCRATCH/module-6/runs/round-$n/$f.md" ]]; then a8_ev+="r$n/$f:✓ "; else a8_pass=0; a8_ev+="r$n/$f:✗ "; fi
  done
done
[[ "$a8_pass" -eq 1 ]] && record "A8" "PASS" "$a8_ev" || record "A8" "FAIL" "$a8_ev"

# A9 — round-2 deltas.md
if [[ -f "$SCRATCH/module-6/runs/round-2/deltas.md" ]]; then
  record "A9" "PASS" "deltas.md present"
else
  record "A9" "FAIL" "no deltas.md"
fi

# A10 — heartbeat ≥6 lines
if [[ -f "$HEART" ]]; then
  hl=$(wc -l < "$HEART" | tr -d ' ')
  [[ "$hl" -ge 6 ]] && record "A10" "PASS" "$hl lines" || record "A10" "FAIL" "$hl lines"
else
  record "A10" "FAIL" "heartbeat missing"
fi

# A11 — flagged-claims top line per round
a11_pass=1; a11_ev=""
for n in 1 2 3; do
  jf="$SCRATCH/module-6/runs/round-$n/judgment.md"
  if [[ -f "$jf" ]] && grep -F 'Flagged claims:' "$jf" >/dev/null 2>&1; then a11_ev+="r$n:✓ "; else a11_pass=0; a11_ev+="r$n:✗ "; fi
done
[[ "$a11_pass" -eq 1 ]] && record "A11" "PASS" "$a11_ev" || record "A11" "FAIL" "$a11_ev"

# A12 — strategy-diff non-empty per round
a12_pass=1; a12_ev=""
for n in 1 2 3; do
  sd="$SCRATCH/module-6/runs/round-$n/strategy-diff.md"
  if [[ -f "$sd" && -s "$sd" ]]; then a12_ev+="r$n:✓ "; else a12_pass=0; a12_ev+="r$n:✗ "; fi
done
[[ "$a12_pass" -eq 1 ]] && record "A12" "PASS" "$a12_ev" || record "A12" "FAIL" "$a12_ev"

# A13 — generator changed (≥3 added lines vs initial seed)
# Heuristic: total non-blank lines ≥ 5 + at least 3 lines we'd consider "rule-shaped"
if [[ -f "$GEN" ]]; then
  total_nonblank=$(grep -cE '^[^[:space:]]' "$GEN" 2>/dev/null || echo 0)
  rule_shaped=$(grep -ciE '^([0-9]+\.|-|\*)' "$GEN" 2>/dev/null || echo 0)
  if [[ "$total_nonblank" -ge 8 && "$rule_shaped" -ge 3 ]]; then
    record "A13" "PASS" "generator rules grew (nonblank=$total_nonblank rule-shaped=$rule_shaped)"
  else
    record "A13" "FAIL" "generator thin (nonblank=$total_nonblank rule-shaped=$rule_shaped)"
  fi
else
  record "A13" "FAIL" "no generator"
fi

# A14 — dashboard populated
if [[ -f "$DASH" ]]; then
  hits=0
  for kw in round trajectory monotonic shasum integrity; do
    grep -iqF "$kw" "$DASH" 2>/dev/null && hits=$((hits+1))
  done
  [[ "$hits" -ge 4 ]] && record "A14" "PASS" "$hits dashboard elements" || record "A14" "FAIL" "$hits"
else
  record "A14" "FAIL" "no dashboard"
fi

# A15 — run scrollback contains judge-diff zero-changes line
if [[ -f "$RUN_TEXT" ]] && grep -iE 'zero changes|byte.identical|judge.*unchanged|integrity' "$RUN_TEXT" >/dev/null 2>&1; then
  record "A15" "PASS" "judge-diff zero-changes mentioned"
else
  record "A15" "FAIL" "no zero-changes mention"
fi

# A16 — generator-diff in run scrollback
if [[ -f "$RUN_TEXT" ]] && grep -iE 'generator.*diff|new rule' "$RUN_TEXT" >/dev/null 2>&1; then
  record "A16" "PASS" "generator-diff mentioned"
else
  record "A16" "FAIL" "no generator-diff mention"
fi

# A17 — eval-notes.md ≤30 lines (1.5x of 20)
if [[ -f "$EVNOTES" ]]; then
  el=$(wc -l < "$EVNOTES" | tr -d ' ')
  [[ "$el" -le 30 ]] && record "A17" "PASS" "$el lines" || record "A17" "FAIL" "$el lines"
else
  record "A17" "FAIL" "eval-notes missing"
fi

# A18 — prompt-006 NOT executed
if echo "$run_uses" | grep -qE 'Read.*prompt-006\.txt'; then
  record "A18" "FAIL" "prompt-006 read"
else
  record "A18" "PASS" "prompt-006 skipped"
fi

# H series
forbidden_check() {
  local label="$1" pattern="$2"
  if echo "$all_uses" | grep -qE "$pattern"; then
    record "$label" "FAIL" "leak"
  else
    record "$label" "PASS" "clean"
  fi
}
forbidden_check "H1" 'Read.*curriculum/exercises/'
forbidden_check "H2" 'Read.*curriculum/evals/mechanical/runners/.*judge\.'
forbidden_check "H3" 'Read.*maintainer\.md'
forbidden_check "H4" 'Task'
forbidden_check "H5" 'WebFetch'
if echo "$all_uses" | grep -qE 'Write.*(module-3|module-4|module-5)/'; then
  record "H6" "FAIL" "module-3/4/5 write"
else
  record "H6" "PASS" "no other-module writes"
fi
if echo "$setup_uses" | grep -qE '(Write|Edit).*judges/groundedness-judge\.md'; then
  record "H7" "FAIL" "setup wrote judge"
else
  record "H7" "PASS" "setup did not write judge"
fi
if echo "$run_uses" | grep -qE '(Write|Edit).*judges/groundedness-judge\.md'; then
  record "H8" "FAIL" "run wrote judge"
else
  record "H8" "PASS" "run did not write judge"
fi

# Prompt-source audit
psa_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" eval-loop 2>&1) || true
psa_verdict=$(echo "$psa_out" | tail -1)

total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — Agents 101 M6 verbatim"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-m6.sh — no LLM."
  echo "**Critical (J1–J3):** $(grep -E '^J' <<<"$(for i in "${!names[@]}"; do echo "${names[$i]} ${verdicts[$i]}"; done)")"
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

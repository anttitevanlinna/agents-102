#!/usr/bin/env bash
# Script judge for ae101-m2-pushback (push-back-on-the-plan).
#
# Usage:
#   judge-ae101-m2-pushback.sh <scratch> <transcript.jsonl>
#
# Writes report to: instances/ae101-m2-pushback-judge-report.md
# Exit 0 PASS, 1 FAIL.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_DIR/../../.." && pwd)"

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <scratch> <transcript.jsonl>" >&2
  exit 2
fi

SCRATCH="$1"
TR="$2"
REPO="$SCRATCH/repo"
PLAN="$REPO/.claude-plans/groupbyreason-helper.md"
SCROLL="$MECH_DIR/instances/ae101-m2-pushback-actor-scrollback.md"
REPORT="$MECH_DIR/instances/ae101-m2-pushback-judge-report.md"

declare -a names verdicts evidence
pass_count=0
fail_count=0
record() {
  local name="$1" verdict="$2" ev="$3"
  names+=("$name"); verdicts+=("$verdict"); evidence+=("$ev")
  if [[ "$verdict" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}

jq_tool_input() {
  local tool="$1" field="$2"
  jq -r --arg t "$tool" --arg f "$field" \
    '.message?.content[]? | select(.type=="tool_use" and .name==$t) | .input[$f] // empty' \
    "$TR" 2>/dev/null
}

# ── V-series ───────────────────────────────────────────────────────────────
for i in 001 002 003 004; do
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/push-back-on-the-plan/prompt-${i}.txt" "$TR" >/dev/null 2>&1; then
    record "V$((10#$i))" "PASS" "Read of prompt-${i}.txt confirmed"
  else
    record "V$((10#$i))" "FAIL" "no Read of prompt-${i}.txt"
  fi
done

# ── P-series: plan artefacts ───────────────────────────────────────────────
test -f "$PLAN" && record "P1" "PASS" "plan file exists" || record "P1" "FAIL" "plan file missing"

if [[ -f "$PLAN" ]]; then
  n=$(grep -cE '^[0-9]+\.' "$PLAN" || true)
  [[ "$n" -ge 5 ]] && record "P2" "PASS" "$n numbered steps" || record "P2" "FAIL" "only $n numbered steps"
else
  record "P2" "FAIL" "plan file missing"
fi

if [[ -f "$PLAN" ]] && grep -qiE 'compose' "$PLAN"; then
  record "P3" "PASS" "plan mentions 'compose' (sharpened soft item)"
else
  record "P3" "FAIL" "plan lacks 'compose' — soft-item sharpening evidence missing"
fi

# P4: tests-first ordering — scope to numbered-step section only (ignore title/overview).
# Find the first numbered step whose body mentions "test" vs first whose body mentions "wire"/"wiring".
if [[ -f "$PLAN" ]]; then
  # Extract numbered-step blocks: lines starting with `<digit>.` and the indented body up to the next step.
  # Then for each step, capture step number + whether body mentions test / wire.
  test_step=$(awk '
    /^[0-9]+\./ { n=$1; sub(/\./, "", n); cur=n; next }
    cur && /[Tt]est/ { print cur; exit }
  ' "$PLAN" | head -1)
  wire_step=$(awk '
    /^[0-9]+\./ { n=$1; sub(/\./, "", n); cur=n; next }
    cur && /[Ww]ir(e|ing)/ { print cur; exit }
  ' "$PLAN" | head -1)
  if [[ -n "$test_step" && -n "$wire_step" && "$test_step" -lt "$wire_step" ]]; then
    record "P4" "PASS" "tests-first ordering — test in step $test_step before wire in step $wire_step"
  elif [[ -n "$test_step" && -z "$wire_step" ]]; then
    record "P4" "PASS" "tests in step $test_step, no wire keyword in numbered steps"
  else
    record "P4" "FAIL" "tests-first ordering not evident in numbered steps (test@step${test_step:--} wire@step${wire_step:--})"
  fi
else
  record "P4" "FAIL" "plan file missing"
fi

# ── D-series: push-back discipline ─────────────────────────────────────────
if [[ -f "$SCROLL" ]]; then
  pushback_signal=$(awk '/Phase 2/,/Phase 3/' "$SCROLL" | grep -ciE 'push.back|soft item|reorder|TDD' || true)
else
  pushback_signal=0
fi
[[ "$pushback_signal" -ge 2 ]] \
  && record "D1" "PASS" "$pushback_signal push-back signals in Phase 2 region" \
  || record "D1" "FAIL" "only $pushback_signal push-back signals"

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*plan' "$SCROLL"; then
  record "D2" "PASS" "plan-mode substitution logged"
else
  record "D2" "FAIL" "no plan-mode substitution log"
fi

if [[ -f "$SCROLL" ]]; then
  qa_count=$(awk '/Phase 3/,/Phase 4/' "$SCROLL" | grep -ciE '^Q[1-9]|Question [1-9]|^### Q|^\*\*Q[1-9]' || true)
else
  qa_count=0
fi
[[ "$qa_count" -ge 5 ]] \
  && record "D3" "PASS" "$qa_count Q&A turn markers in Phase 3" \
  || record "D3" "FAIL" "only $qa_count Q&A turn markers (≥5 expected)"

# ── S-series: Stop discipline ──────────────────────────────────────────────
if [[ -f "$SCROLL" ]]; then
  exec_count=$(awk '/Phase 4/,EOF' "$SCROLL" | grep -cE 'npm test|node --test' || true)
else
  exec_count=0
fi
[[ "$exec_count" -eq 0 ]] \
  && record "S1" "PASS" "no npm test invocation after plan landed" \
  || record "S1" "FAIL" "$exec_count test invocations after plan landed (Stop discipline broken)"

write_paths=$(jq_tool_input "Write" "file_path")
edit_paths=$(jq_tool_input "Edit" "file_path")
mut_paths=$(printf '%s\n%s\n' "$write_paths" "$edit_paths")
mut_src=$(echo "$mut_paths" | grep -cE 'scratch/ae101-m2-pushback/repo/(src|tests)/' || true)
[[ "$mut_src" -eq 0 ]] \
  && record "S2" "PASS" "no Write/Edit to src/ or tests/" \
  || record "S2" "FAIL" "$mut_src Write/Edit calls to src/ or tests/ (Stop discipline broken)"

# ── N-series: pattern naming ───────────────────────────────────────────────
if [[ -f "$SCROLL" ]]; then
  pattern=$(awk '/Phase 4/,/Phase 5/' "$SCROLL" | grep -ciE 'design pattern|two.pass|second.pass|plan.read|approval inflation' || true)
else
  pattern=0
fi
[[ "$pattern" -ge 1 ]] \
  && record "N1" "PASS" "design-pattern named in Phase 4" \
  || record "N1" "FAIL" "no design-pattern naming"

# ── C-series: CLAUDE.local.md riding answer ────────────────────────────────
if [[ -f "$SCROLL" ]]; then
  c1_hit=$(awk '/Phase 5/,EOF' "$SCROLL" | grep -ciE 'auto.load|cold.start|loads at session|concatenate|every session' || true)
else
  c1_hit=0
fi
[[ "$c1_hit" -ge 1 ]] \
  && record "C1" "PASS" "Phase 5 answers auto-load question" \
  || record "C1" "FAIL" "Phase 5 lacks auto-load answer"

# ── H-series: harness leakage ──────────────────────────────────────────────
read_paths=$(jq_tool_input "Read" "file_path")
echo "$read_paths" | grep -qE 'curriculum/exercises/' \
  && record "H1" "FAIL" "Read of curriculum/exercises/ leaked" \
  || record "H1" "PASS" "no Read of curriculum/exercises/"
echo "$read_paths" | grep -qE 'curriculum/prompts/' \
  && record "H2" "FAIL" "Read of curriculum/prompts/ leaked" \
  || record "H2" "PASS" "no Read of curriculum/prompts/"
echo "$read_paths" | grep -qE 'runners/.*\.judge\.md|\.maintainer\.md' \
  && record "H3" "FAIL" "Read of judge runner or maintainer doc leaked" \
  || record "H3" "PASS" "no Read of judge runner or maintainer doc"

# ── PF / PS ────────────────────────────────────────────────────────────────
pf_out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" \
  "$MECH_DIR/runners/ae101-m2-pushback.actor.md" \
  "$REPO_ROOT/curriculum/exercises/push-back-on-the-plan.md" 2>&1) || true
echo "$pf_out" | tail -1 | grep -qE 'READY' \
  && record "PF1" "PASS" "runner-mapping: $(echo "$pf_out" | tail -1)" \
  || record "PF1" "FAIL" "runner-mapping: $(echo "$pf_out" | tail -1)"

ps_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" push-back-on-the-plan 2>&1) || true
echo "$ps_out" | tail -1 | grep -qE 'READY' \
  && record "PS1" "PASS" "prompt-source-audit: $(echo "$ps_out" | tail -1)" \
  || record "PS1" "FAIL" "prompt-source-audit: $(echo "$ps_out" | tail -1)"

# ── Write report ───────────────────────────────────────────────────────────
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — AE101 M2 push-back (script-only)"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m2-pushback.sh — no LLM."
  echo
  echo "Scratch: \`$SCRATCH\` (repo: \`$REPO\`)"
  echo "Transcript: \`$TR\`"
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
  echo "## Pre-flight"
  echo '```'
  echo "$pf_out"
  echo '```'
  echo
  echo "## Prompt-source audit"
  echo '```'
  echo "$ps_out"
  echo '```'
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

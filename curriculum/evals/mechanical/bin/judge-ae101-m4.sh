#!/usr/bin/env bash
# Script judge for ae101-m4 chain.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_DIR/../../.." && pwd)"

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <scratch> <transcript.jsonl>" >&2
  exit 2
fi

SCRATCH="$1"; TR="$2"
REPO="$SCRATCH/repo"
SCROLL="$MECH_DIR/instances/ae101-m4-actor-scrollback.md"
REPORT="$MECH_DIR/instances/ae101-m4-judge-report.md"

declare -a names verdicts evidence
pass_count=0; fail_count=0
record() { names+=("$1"); verdicts+=("$2"); evidence+=("$3")
  if [[ "$2" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}
jq_tool_input() { jq -r --arg t "$1" --arg f "$2" '.message?.content[]? | select(.type=="tool_use" and .name==$t) | .input[$f] // empty' "$TR" 2>/dev/null; }

# V-series
V_PROMPTS=( "walk-and-send-off/prompt-001.txt" "walk-and-send-off/prompt-002.txt" "walk-and-send-off/prompt-003.txt" "walk-and-send-off/prompt-004.txt" "run-the-first-experiment/prompt-001.txt" "run-the-first-experiment/prompt-002.txt" "run-the-first-experiment/prompt-003.txt" )
i=0; for p in "${V_PROMPTS[@]}"; do i=$((i+1))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/$p" "$TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read of $p confirmed"
  else record "V$i" "FAIL" "no Read of $p"; fi
done

# A-series
if [[ -f "$SCROLL" ]] && grep -ciqE 'Candidate 1.*fit|dailyTotalsByCategory' "$SCROLL"; then
  record "A1" "PASS" "Candidate 1 / dailyTotalsByCategory named"
else record "A1" "FAIL" "Candidate 1 not named as fit"; fi

cand_count=$(grep -ciE 'Candidate [123]' "$SCROLL" 2>/dev/null || echo 0)
[[ "$cand_count" -ge 3 ]] && record "A2" "PASS" "$cand_count Candidate refs" || record "A2" "FAIL" "only $cand_count"

if grep -iqE 'harness substitution.*audit|audit.*inline|audit-as-subagent' "$SCROLL" 2>/dev/null; then
  record "A3" "PASS" "audit substitution logged"
else record "A3" "FAIL" "no audit substitution"; fi

read_paths=$(jq_tool_input Read file_path)
if echo "$read_paths" | grep -q 'CLAUDE.local.md' && echo "$read_paths" | grep -q '\.claude/memory/'; then
  record "A4" "PASS" "Read of CLAUDE.local.md + memory files in transcript"
else record "A4" "FAIL" "missing Read of CLAUDE.local.md or memory/*.md"; fi

# G-series
qa_count=$(awk '/Phase 3/,/Phase 4/' "$SCROLL" 2>/dev/null | grep -oE '^\*\*Q[1-9]|^Q[1-9]:|^### Q[1-9]|^[1-9]\.' | grep -oE '[1-9]' | sort -u | wc -l | tr -d ' ')
[[ "$qa_count" -ge 3 ]] && record "G1" "PASS" "$qa_count Q&A items in Phase 3" || record "G1" "FAIL" "only $qa_count Q&A items"

if [[ -f "$REPO/.claude/memory/observations.md" ]]; then
  size=$(wc -c < "$REPO/.claude/memory/observations.md" | tr -d ' ')
  [[ "$size" -ge 300 ]] && record "G2" "PASS" "observations.md appended ($size bytes)" || record "G2" "FAIL" "observations.md too small ($size bytes)"
else record "G2" "FAIL" "observations.md missing"; fi

# F-series
f1_hits=$(awk '/Phase 4/,/Phase 5/' "$SCROLL" 2>/dev/null | grep -ciE 'observations|decisions|quality.criteria|test.strategy|three.block|Block [123]')
[[ "$f1_hits" -ge 3 ]] && record "F1" "PASS" "$f1_hits frame keywords" || record "F1" "FAIL" "only $f1_hits frame keywords"

# C-series
if [[ -d "$REPO/.git" ]] && git -C "$REPO" branch --list 'm4/*' | grep -q 'm4/'; then
  record "C1" "PASS" "m4/ branch exists"
else record "C1" "FAIL" "no m4/ branch"; fi

c2_log=$(git -C "$REPO" log --format=%s m4/dailytotalsbycategory 2>/dev/null || true)
if echo "$c2_log" | grep -qE 'M4 starting point|^M4:|dailyTotalsByCategory'; then
  record "C2" "PASS" "M4 branch has work commit"
else record "C2" "FAIL" "no work commit on m4/ branch (log: $c2_log)"; fi

if [[ -f "$REPO/src/cli.js" ]] && grep -q 'export' "$REPO/src/cli.js"; then
  record "C3" "PASS" "src/cli.js exists with --export"
else record "C3" "FAIL" "src/cli.js missing or lacks --export"; fi

if grep -q 'dailyTotalsByCategory' "$REPO/src/totals.js" 2>/dev/null; then
  record "C4" "PASS" "dailyTotalsByCategory in totals.js"
else record "C4" "FAIL" "dailyTotalsByCategory missing"; fi

if grep -q 'dailyTotalsByCategory' "$REPO/tests/totals.test.js" 2>/dev/null; then
  record "C5" "PASS" "dailyTotalsByCategory test exists"
else record "C5" "FAIL" "no dailyTotalsByCategory test"; fi

if grep -q 'dailyTotalsByCategory' "$REPO/README.md" 2>/dev/null; then
  record "C6" "FAIL" "README mentions dailyTotalsByCategory (M4 should leave this gap)"
else record "C6" "PASS" "README correctly does not mention dailyTotalsByCategory (M4 partial-shipping)"; fi

if grep -iqE 'harness substitution.*walk-away' "$SCROLL" 2>/dev/null; then
  record "C7" "PASS" "walk-away substitution logged"
else record "C7" "FAIL" "no walk-away substitution log"; fi

# N-series
p7_lines=$(awk '/Phase 7/,EOF' "$SCROLL" 2>/dev/null | wc -l | tr -d ' ')
[[ "$p7_lines" -ge 3 ]] && record "N1" "PASS" "Phase 7 has $p7_lines lines" || record "N1" "FAIL" "Phase 7 too thin ($p7_lines lines)"

# H-series
echo "$read_paths" | grep -qE 'curriculum/exercises/' && record "H1" "FAIL" "Read of exercises/ leaked" || record "H1" "PASS" "no exercises/ Read"
echo "$read_paths" | grep -qE 'curriculum/prompts/' && record "H2" "FAIL" "Read of prompts/ leaked" || record "H2" "PASS" "no prompts/ Read"
echo "$read_paths" | grep -qE 'runners/.*\.judge\.md|\.maintainer\.md' && record "H3" "FAIL" "Read of judge runner / maintainer leaked" || record "H3" "PASS" "no judge / maintainer Read"

# PF / PS
PF_TMP=$(mktemp -d); trap 'rm -rf "$PF_TMP"' EXIT
pfi=0
for ex_path in "curriculum/exercises/walk-and-send-off.md" "curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md"; do
  pfi=$((pfi+1))
  out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" "$MECH_DIR/runners/ae101-m4.actor.md" "$REPO_ROOT/$ex_path" 2>&1) || true
  echo "$out" > "$PF_TMP/pf-$pfi.txt"
  v=$(echo "$out" | tail -1)
  echo "$v" | grep -qE 'READY' && record "PF$pfi" "PASS" "$v" || record "PF$pfi" "FAIL" "$v"
done

psi=0
for slug in walk-and-send-off run-the-first-experiment; do
  psi=$((psi+1))
  out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" "$slug" 2>&1) || true
  echo "$out" > "$PF_TMP/ps-$psi.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PS$psi" "PASS" "$v"
  elif echo "$v" | grep -qE 'BLOCK'; then
    # BLOCK from curriculum-source Sev-1 (e.g., P4 vocab leak) — informational, not gating.
    # These are surfaced in the suspicion sweep, not by the mechanical Judge.
    record "PS$psi" "PASS" "BLOCK on pre-existing curriculum source (informational): $v"
  else
    record "PS$psi" "FAIL" "$v"
  fi
done

# Report
total=$((pass_count + fail_count))
verdict_line="PASS"; [[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"
{
  echo "# Judge report — AE101 M4 chain (script-only)"
  echo "## Summary"
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m4.sh — no LLM."
  echo "Scratch: \`$SCRATCH\` (repo: \`$REPO\`). Transcript: \`$TR\`."
  echo
  echo "## Assertions"
  echo "| ID | Verdict | Evidence |"
  echo "|---|---|---|"
  for i in "${!names[@]}"; do
    ev="${evidence[$i]//|/\\|}"; ev="${ev//$'\n'/ }"
    echo "| ${names[$i]} | ${verdicts[$i]} | $ev |"
  done
  echo
  echo "## Pre-flight"
  for i in 1 2; do echo; echo "### PF$i"; echo '```'; cat "$PF_TMP/pf-$i.txt"; echo '```'; done
  echo
  echo "## Prompt-source audit"
  for i in 1 2; do echo; echo "### PS$i"; echo '```'; cat "$PF_TMP/ps-$i.txt"; echo '```'; done
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

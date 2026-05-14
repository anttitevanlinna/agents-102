#!/usr/bin/env bash
# Script judge for ae101-m5 chain.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_DIR/../../.." && pwd)"

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <scratch> <transcript.jsonl>" >&2; exit 2
fi

SCRATCH="$1"; TR="$2"
REPO="$SCRATCH/repo"
SCROLL="$MECH_DIR/instances/ae101-m5-actor-scrollback.md"
REPORT="$MECH_DIR/instances/ae101-m5-judge-report.md"

declare -a names verdicts evidence
pass_count=0; fail_count=0
record() { names+=("$1"); verdicts+=("$2"); evidence+=("$3")
  if [[ "$2" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}
jq_tool_input() { jq -r --arg t "$1" --arg f "$2" '.message?.content[]? | select(.type=="tool_use" and .name==$t) | .input[$f] // empty' "$TR" 2>/dev/null; }

# V-series (8 prompts)
V_PROMPTS=( "learn-from-the-test/prompt-001.txt" "diagnose-and-resend/prompt-001.txt" "diagnose-and-resend/prompt-002.txt" "diagnose-and-resend/prompt-003.txt" "diagnose-and-resend/prompt-004.txt" "diagnose-and-resend/prompt-005.txt" "diagnose-and-resend/prompt-006.txt" "learn-from-the-test/prompt-002.txt" )
i=0; for p in "${V_PROMPTS[@]}"; do i=$((i+1))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/$p" "$TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read of $p confirmed"
  else record "V$i" "FAIL" "no Read of $p"; fi
done

# B-series — branches
if git -C "$REPO" branch --list 'm5/*' 2>/dev/null | grep -q 'm5/'; then
  record "B1" "PASS" "m5/ branch exists"
else record "B1" "FAIL" "no m5/ branch"; fi

if git -C "$REPO" branch --list 'm4/*' 2>/dev/null | grep -q 'm4/'; then
  record "B2" "PASS" "m4/ branch preserved from arrange"
else record "B2" "FAIL" "m4/ branch missing"; fi

# T-series — transcript read
read_paths=$(jq_tool_input Read file_path)
if echo "$read_paths" | grep -q 'claude-projects-stub.*m4-session.jsonl'; then
  record "T1" "PASS" "M4 transcript stub Read in transcript"
else record "T1" "FAIL" "no Read of claude-projects-stub/m4-session.jsonl"; fi

# D-series — diagnosis
if [[ -f "$SCROLL" ]]; then
  d1=$(awk '/Phase 3/,/Phase 4/' "$SCROLL" | grep -ciE 'goal drift|context rot|plausible.but.wrong')
  [[ "$d1" -ge 3 ]] && record "D1" "PASS" "all 3 failure modes named in Phase 3" || record "D1" "FAIL" "only $d1 failure modes"
else record "D1" "FAIL" "scrollback missing"; fi

# V-series — verifier artefact
if [[ -f "$REPO/.claude/hooks/csv-escape-check.sh" ]]; then
  record "VR1" "PASS" "csv-escape-check.sh exists"
else record "VR1" "FAIL" "verifier hook missing"; fi

# R-series — reference + plan
if [[ -f "$REPO/reference.md" ]]; then
  if grep -qiE 'Done means|done.means' "$REPO/reference.md" && grep -qiE 'Tests that name the bar|tests.*bar' "$REPO/reference.md"; then
    record "R1" "PASS" "reference.md has Done means + Tests sections"
  else record "R1" "FAIL" "reference.md missing required sections"; fi
else record "R1" "FAIL" "reference.md missing"; fi

if [[ -f "$REPO/plan.md" ]]; then
  hits=$(grep -ciE 'phase|current.phase|decision|what.didn.t' "$REPO/plan.md")
  [[ "$hits" -ge 2 ]] && record "P1" "PASS" "plan.md has plan structure ($hits keywords)" || record "P1" "FAIL" "plan.md too thin ($hits keywords)"
else record "P1" "FAIL" "plan.md missing"; fi

# C-series — packaged-run closes M4 gaps
if grep -qE 'escapeCSV|RFC 4180|escape.*csv' "$REPO/src/cli.js" 2>/dev/null; then
  record "C1" "PASS" "CLI has RFC 4180 escaping (M4 gap closed)"
else record "C1" "FAIL" "CLI lacks escaping"; fi

if grep -qE 'dailyTotalsByCategory|--export|export' "$REPO/README.md" 2>/dev/null; then
  record "C2" "PASS" "README mentions export (M4 gap closed)"
else record "C2" "FAIL" "README still missing export mention"; fi

if grep -qE '"bin"' "$REPO/package.json" 2>/dev/null; then
  record "C3" "PASS" "package.json bin entry wired (M4 gap closed)"
else record "C3" "FAIL" "package.json bin entry missing"; fi

if [[ -f "$REPO/RUN-NOTES.md" ]]; then
  record "C4" "PASS" "RUN-NOTES.md present"
else record "C4" "FAIL" "RUN-NOTES.md missing"; fi

# S-series — substitutions logged
if grep -iqE 'harness substitution.*claude-projects-stub|harness substitution.*transcript|claude-projects-stub' "$SCROLL" 2>/dev/null; then
  record "S1" "PASS" "transcript-path substitution logged"
else record "S1" "FAIL" "no transcript-path substitution log"; fi

if grep -iqE 'harness substitution.*worktree|worktree.*in.place' "$SCROLL" 2>/dev/null; then
  record "S2" "PASS" "worktree substitution logged"
else record "S2" "FAIL" "no worktree substitution log"; fi

if grep -iqE 'harness substitution.*walk-away' "$SCROLL" 2>/dev/null; then
  record "S3" "PASS" "walk-away substitution logged"
else record "S3" "FAIL" "no walk-away substitution log"; fi

# H-series
echo "$read_paths" | grep -qE 'curriculum/exercises/' && record "H1" "FAIL" "exercises/ Read" || record "H1" "PASS" "no exercises/ Read"
echo "$read_paths" | grep -qE 'curriculum/prompts/' && record "H2" "FAIL" "prompts/ Read" || record "H2" "PASS" "no prompts/ Read"
echo "$read_paths" | grep -qE 'runners/.*\.judge\.md|\.maintainer\.md' && record "H3" "FAIL" "judge/maintainer Read" || record "H3" "PASS" "no judge/maintainer Read"

# PF / PS
PF_TMP=$(mktemp -d); trap 'rm -rf "$PF_TMP"' EXIT
pfi=0
for ex_path in "curriculum/exercises/diagnose-and-resend.md" "curriculum/trainings/agentic-engineering-101/learn-from-the-test.md"; do
  pfi=$((pfi+1))
  out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" "$MECH_DIR/runners/ae101-m5.actor.md" "$REPO_ROOT/$ex_path" 2>&1) || true
  echo "$out" > "$PF_TMP/pf-$pfi.txt"
  v=$(echo "$out" | tail -1)
  echo "$v" | grep -qE 'READY' && record "PF$pfi" "PASS" "$v" || record "PF$pfi" "FAIL" "$v"
done

psi=0
for slug in diagnose-and-resend learn-from-the-test; do
  psi=$((psi+1))
  out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" "$slug" 2>&1) || true
  echo "$out" > "$PF_TMP/ps-$psi.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PS$psi" "PASS" "$v"
  elif echo "$v" | grep -qE 'BLOCK'; then
    record "PS$psi" "PASS" "BLOCK on pre-existing curriculum source (informational): $v"
  else
    record "PS$psi" "FAIL" "$v"
  fi
done

total=$((pass_count + fail_count))
verdict_line="PASS"; [[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"
{
  echo "# Judge report — AE101 M5 chain (script-only)"
  echo "## Summary"
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m5.sh — no LLM."
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

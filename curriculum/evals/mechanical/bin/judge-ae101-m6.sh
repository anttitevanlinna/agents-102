#!/usr/bin/env bash
# Script judge for ae101-m6 chain.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_DIR/../../.." && pwd)"

if [[ $# -lt 2 ]]; then echo "usage: $0 <scratch> <transcript.jsonl>" >&2; exit 2; fi

SCRATCH="$1"; TR="$2"
WORKTREE="$SCRATCH/repo-m5"
USER_STUB="$SCRATCH/.claude-user-stub"
SCROLL="$MECH_DIR/instances/ae101-m6-actor-scrollback.md"
REPORT="$MECH_DIR/instances/ae101-m6-judge-report.md"

declare -a names verdicts evidence
pass_count=0; fail_count=0
record() { names+=("$1"); verdicts+=("$2"); evidence+=("$3")
  if [[ "$2" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}
jq_tool_input() { jq -r --arg t "$1" --arg f "$2" '.message?.content[]? | select(.type=="tool_use" and .name==$t) | .input[$f] // empty' "$TR" 2>/dev/null; }

# V-series — 6 prompts
V_PROMPTS=( "spot-gaps-build-the-loop/prompt-001.txt" "spot-gaps-build-the-loop/prompt-002.txt" "spot-gaps-build-the-loop/prompt-003.txt" "spot-gaps-build-the-loop/prompt-004.txt" "spot-gaps-build-the-loop/prompt-005.txt" "arc-retrospective/prompt-001.txt" )
i=0; for p in "${V_PROMPTS[@]}"; do i=$((i+1))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/$p" "$TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read of $p confirmed"
  else record "V$i" "FAIL" "no Read of $p"; fi
done

# T-series — both transcripts Read
read_paths=$(jq_tool_input Read file_path)
if echo "$read_paths" | grep -q 'claude-projects-stub.*m4-session.jsonl'; then
  record "T1" "PASS" "M4 transcript stub Read"
else record "T1" "FAIL" "no Read of m4-session.jsonl"; fi

if echo "$read_paths" | grep -q 'claude-projects-stub.*m5-session.jsonl'; then
  record "T2" "PASS" "M5 transcript stub Read"
else record "T2" "FAIL" "no Read of m5-session.jsonl"; fi

# D-series — diff + ranked gaps in Phase 1
if [[ -f "$SCROLL" ]]; then
  d1=$(awk '/Phase 1/,/Phase 2/' "$SCROLL" | grep -ciE 'gap|packaging caught|packaging missed|drift|verifier|reference|plan.md')
  [[ "$d1" -ge 3 ]] && record "D1" "PASS" "$d1 diff/gap keywords in Phase 1" || record "D1" "FAIL" "only $d1 diff keywords"
else record "D1" "FAIL" "scrollback missing"; fi

# R-series — rule cut from CLAUDE.local.md
if [[ -f "$WORKTREE/CLAUDE.local.md" ]]; then
  if grep -qE '^## Rule 2:.*Test names' "$WORKTREE/CLAUDE.local.md"; then
    record "R1" "FAIL" "Rule 2 (Test names) still present in CLAUDE.local.md (should be cut)"
  else
    record "R1" "PASS" "Rule 2 removed from CLAUDE.local.md"
  fi
  # And there should still be at least 3 rules left (not nuked entirely)
  rules_left=$(grep -cE '^## Rule [0-9]+|^[0-9]+\.|^- ' "$WORKTREE/CLAUDE.local.md")
  [[ "$rules_left" -ge 3 ]] && record "R2" "PASS" "$rules_left rules remain after cut" || record "R2" "FAIL" "only $rules_left rules remain"
else
  record "R1" "FAIL" "CLAUDE.local.md missing"
  record "R2" "FAIL" "CLAUDE.local.md missing"
fi

# S-series — second skill authored
SKILL=$(ls "$USER_STUB/skills/"*/SKILL.md 2>/dev/null | grep -v 'test-strategy\|access-control-analysis\|stride' | head -1)
if [[ -n "$SKILL" && -f "$SKILL" ]]; then
  record "S1" "PASS" "second skill authored at $(basename "$(dirname "$SKILL")")"
  # YAML frontmatter
  if head -5 "$SKILL" | grep -qE '^---$' && head -5 "$SKILL" | grep -qE '^name: '; then
    record "S2" "PASS" "YAML frontmatter with name field"
  else record "S2" "FAIL" "missing YAML frontmatter or name field"; fi
  # TODO line in first 10 lines
  if head -10 "$SKILL" | grep -qE '<!-- v0\.2|TODO'; then
    record "S3" "PASS" "TODO line near top after Phase 5"
  else record "S3" "FAIL" "no TODO in first 10 lines"; fi
else
  record "S1" "FAIL" "no second skill SKILL.md found"
  record "S2" "FAIL" "skill missing"
  record "S3" "FAIL" "skill missing"
fi

# Q-series — Phase 3 question discipline (5 Q's)
qa_count=$(awk '/Phase 3/,/Phase 4/' "$SCROLL" 2>/dev/null | grep -oE '^\*\*Q[1-5]|^Q[1-5]:|^### Q[1-5]|^[1-5]\.' | grep -oE '[1-5]' | sort -u | wc -l | tr -d ' ')
[[ "$qa_count" -ge 5 ]] && record "Q1" "PASS" "$qa_count distinct Q-markers in Phase 3" || record "Q1" "FAIL" "only $qa_count Q-markers"

# A-series — arc retrospective note
if [[ -f "$WORKTREE/docs/arc-retrospective.md" ]]; then
  record "A1" "PASS" "arc-retrospective.md exists"
  # Should have at least one quoted artefact reference
  if grep -ciqE 'CLAUDE\.local\.md|\.claude/memory|ADR 0001|test-strategy|m4/|m5/' "$WORKTREE/docs/arc-retrospective.md"; then
    record "A2" "PASS" "arc-retrospective references specific artefacts"
  else record "A2" "FAIL" "no artefact references"; fi
else
  record "A1" "FAIL" "arc-retrospective.md missing"
  record "A2" "FAIL" "arc-retrospective.md missing"
fi

# Critique series — Phase 4 self-critique present
if [[ -f "$SCROLL" ]]; then
  c1=$(awk '/Phase 4/,/Phase 5/' "$SCROLL" | grep -ciE 'weakest|weak part|generic|pyramid|two runs|push back|miss')
  [[ "$c1" -ge 2 ]] && record "CR1" "PASS" "self-critique keywords in Phase 4 ($c1)" || record "CR1" "FAIL" "self-critique thin ($c1 keywords)"
else record "CR1" "FAIL" "scrollback missing"; fi

# Invoke + grade — Phase 5 self-grade present
if [[ -f "$SCROLL" ]]; then
  i1=$(awk '/Phase 5/,/Phase 6/' "$SCROLL" | grep -ciE 'is it good|caught|missed|sharpen|invoke|skill.*output')
  [[ "$i1" -ge 1 ]] && record "I1" "PASS" "Phase 5 invoke+grade evidence" || record "I1" "FAIL" "no invoke+grade evidence"
else record "I1" "FAIL" "scrollback missing"; fi

# H-series
echo "$read_paths" | grep -qE 'curriculum/exercises/' && record "H1" "FAIL" "exercises/ Read" || record "H1" "PASS" "no exercises/ Read"
echo "$read_paths" | grep -qE 'curriculum/prompts/' && record "H2" "FAIL" "prompts/ Read" || record "H2" "PASS" "no prompts/ Read"
echo "$read_paths" | grep -qE 'runners/.*\.judge\.md|\.maintainer\.md' && record "H3" "FAIL" "judge/maintainer Read" || record "H3" "PASS" "no judge/maintainer Read"

# PF / PS
PF_TMP=$(mktemp -d); trap 'rm -rf "$PF_TMP"' EXIT
pfi=0
for ex_path in "curriculum/exercises/spot-gaps-build-the-loop.md" "curriculum/exercises/arc-retrospective.md"; do
  pfi=$((pfi+1))
  out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" "$MECH_DIR/runners/ae101-m6.actor.md" "$REPO_ROOT/$ex_path" 2>&1) || true
  echo "$out" > "$PF_TMP/pf-$pfi.txt"
  v=$(echo "$out" | tail -1)
  echo "$v" | grep -qE 'READY' && record "PF$pfi" "PASS" "$v" || record "PF$pfi" "FAIL" "$v"
done

psi=0
for slug in spot-gaps-build-the-loop arc-retrospective; do
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
  echo "# Judge report — AE101 M6 chain (script-only)"
  echo "## Summary"
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m6.sh — no LLM."
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

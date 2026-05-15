#!/usr/bin/env bash
# Script judge for ae101-prework.
#
# Usage:
#   judge-ae101-prework.sh <scratch> <transcript.jsonl>
#
# Writes report to: instances/ae101-prework-judge-report.md
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
SCROLL="$MECH_DIR/instances/ae101-prework-actor-scrollback.md"
ACTOR_REPORT="$MECH_DIR/instances/ae101-prework-actor-report.md"
REPORT="$MECH_DIR/instances/ae101-prework-judge-report.md"

declare -a names verdicts evidence
pass_count=0
fail_count=0
record() {
  local name="$1" verdict="$2" ev="$3"
  names+=("$name"); verdicts+=("$verdict"); evidence+=("$ev")
  if [[ "$verdict" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}

# Helper: jq tool_use input field across transcript
jq_tool_input() {
  local tool="$1" field="$2"
  jq -r --arg t "$tool" --arg f "$field" \
    '.message?.content[]? | select(.type=="tool_use" and .name==$t) | .input[$f] // empty' \
    "$TR" 2>/dev/null
}

# ── V-series: prompt-read-check ────────────────────────────────────────────
for i in 001 002 003; do
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/prework/prompt-${i}.txt" "$TR" >/dev/null 2>&1; then
    record "V$((10#$i))" "PASS" "Read of prompt-${i}.txt confirmed in transcript"
  else
    record "V$((10#$i))" "FAIL" "no Read of prompt-${i}.txt in transcript"
  fi
done

# ── A-series: file existence ───────────────────────────────────────────────
test -f "$SCRATCH/Downloads-stub/ae101-content.tar.gz" \
  && record "A1" "PASS" "tarball present at Downloads-stub" \
  || record "A1" "FAIL" "tarball missing"

if test -d "$SCRATCH/Documents-stub/ae101-content/lectures" \
   && test -d "$SCRATCH/Documents-stub/ae101-content/exercises" \
   && test -d "$SCRATCH/Documents-stub/ae101-content/reference" \
   && test -d "$SCRATCH/Documents-stub/ae101-content/supplementary" \
   && test -d "$SCRATCH/Documents-stub/ae101-content/content/skills"; then
  record "A2" "PASS" "all 5 extracted subdirs present"
else
  record "A2" "FAIL" "extraction incomplete (missing one of lectures/exercises/reference/supplementary/content/skills)"
fi

test -f "$SCRATCH/.claude-user-stub/skills/access-control-analysis/SKILL.md" \
  && record "A3" "PASS" "access-control-analysis SKILL.md installed" \
  || record "A3" "FAIL" "access-control-analysis SKILL.md missing"

test -f "$SCRATCH/.claude-user-stub/skills/stride/SKILL.md" \
  && record "A4" "PASS" "stride SKILL.md installed" \
  || record "A4" "FAIL" "stride SKILL.md missing"

# ── B-series: bug screen ───────────────────────────────────────────────────
if [[ -f "$SCROLL" ]]; then
  bugs_seen=$(grep -cE 'AE-42|daily totals|refund line|Email notification.*batched|data-migration script' "$SCROLL" 2>/dev/null || echo 0)
else
  bugs_seen=0
fi
[[ "$bugs_seen" -ge 3 ]] \
  && record "B1" "PASS" "$bugs_seen candidate-bug references in scrollback" \
  || record "B1" "FAIL" "only $bugs_seen candidate-bug references (≥3 expected)"

if [[ -f "$SCROLL" ]] && grep -iqE 'daily.totals|AE-42' "$SCROLL"; then
  record "B2" "PASS" "AE-42 / daily-totals pick named"
else
  record "B2" "FAIL" "no pick named"
fi

if [[ -f "$SCROLL" ]]; then
  one_at_a_time=$(grep -ciE 'one at a time|first.*bug|second.*bug|third.*bug|next.*candidate|next.*bug' "$SCROLL" 2>/dev/null || echo 0)
else
  one_at_a_time=0
fi
[[ "$one_at_a_time" -ge 1 ]] \
  && record "B3" "PASS" "$one_at_a_time one-at-a-time signal(s) in scrollback" \
  || record "B3" "FAIL" "no one-at-a-time signal"

# ── R-series: readiness ────────────────────────────────────────────────────
if [[ -f "$SCROLL" ]] && grep -iqE 'tests? (run|pass)|ready for Module 1|repo is ready|npm test' "$SCROLL"; then
  record "R1" "PASS" "readiness confirmation present"
else
  record "R1" "FAIL" "no readiness confirmation"
fi

bash_calls=$(jq_tool_input "Bash" "command")
if echo "$bash_calls" | grep -qE 'npm test|node --test'; then
  record "R2" "PASS" "npm test / node --test invoked"
else
  record "R2" "FAIL" "no test invocation in transcript"
fi

# ── S-series: substitutions logged ─────────────────────────────────────────
if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*<CONTENT_URL>|harness substitution.*Downloads|pre-staged tarball' "$SCROLL"; then
  record "S1" "PASS" "tarball substitution logged"
else
  record "S1" "FAIL" "no tarball substitution log"
fi

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*\.claude|claude-user-stub|claude/skills|skill.*install.*substit' "$SCROLL"; then
  record "S2" "PASS" "skill-install substitution logged"
else
  record "S2" "FAIL" "no skill-install substitution log"
fi

# ── H-series: harness leakage ──────────────────────────────────────────────
read_paths=$(jq_tool_input "Read" "file_path")
if echo "$read_paths" | grep -qE 'trainings/agentic-engineering-101/prework\.md|curriculum/prompts/ae101-prework'; then
  record "H1" "FAIL" "Read of prework source / registry leaked"
else
  record "H1" "PASS" "no Read of prework source or registry"
fi

if echo "$read_paths" | grep -qE 'runners/ae101-prework\.judge\.md'; then
  record "H2" "FAIL" "Read of judge runner leaked"
else
  record "H2" "PASS" "no Read of judge runner"
fi

if echo "$bash_calls" | grep -qE 'curl.*CONTENT_URL|curl.*agents102\.bosser|curl.*<CONTENT_URL>'; then
  record "H3" "FAIL" "real curl to <CONTENT_URL> attempted"
else
  record "H3" "PASS" "no real curl to <CONTENT_URL>"
fi

# ── PF / PS ────────────────────────────────────────────────────────────────
pf_out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" \
  "$MECH_DIR/runners/ae101-prework.actor.md" \
  "$REPO_ROOT/curriculum/trainings/agentic-engineering-101/prework.md" 2>&1) || true
pf_verdict=$(echo "$pf_out" | tail -1)
if echo "$pf_verdict" | grep -qE 'READY'; then
  record "PF1" "PASS" "runner-mapping: $pf_verdict"
else
  record "PF1" "FAIL" "runner-mapping: $pf_verdict"
fi

ps_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" prework 2>&1) || true
ps_verdict=$(echo "$ps_out" | tail -1)
if echo "$ps_verdict" | grep -qE 'READY'; then
  record "PS1" "PASS" "prompt-source-audit: $ps_verdict"
else
  record "PS1" "FAIL" "prompt-source-audit: $ps_verdict"
fi

# ── Write report ───────────────────────────────────────────────────────────
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — AE101 prework (script-only)"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-prework.sh — no LLM."
  echo
  echo "Scratch: \`$SCRATCH\`"
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
  echo
  echo "## Harness substitutions (expected)"
  echo "- \`<CONTENT_URL>\` curl → pre-staged tarball at \`Downloads-stub/\`"
  echo "- \`~/Downloads/\` → \`Downloads-stub/\`"
  echo "- \`~/Documents/\` → \`Documents-stub/\`"
  echo "- \`~/.claude/skills/\` → \`.claude-user-stub/skills/\`"
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

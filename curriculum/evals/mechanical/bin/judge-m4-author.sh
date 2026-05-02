#!/usr/bin/env bash
# Script judge for bootstrap-m4-author runner.
#
# Replaces the LLM Judge dispatch — runs every assertion as a script call
# and emits the markdown report. Per the script ratchet (memory rule #17),
# Judge runs are reaching for bin/judge.sh aspirational endpoint; this is
# the per-runner increment.
#
# Usage:
#   judge-m4-author.sh <scratch_dir> <transcript.jsonl>
#
# Writes report to: instances/bootstrap-m4-author-judge-report.md (relative to mechanical/)
# Exit 0 on PASS, 1 on FAIL. PASS == every assertion exit 0.

set -uo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <scratch_dir> <transcript.jsonl>" >&2
  exit 2
fi

SCRATCH="$1"
TRANSCRIPT="$2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS=/tmp/prompts/author-security-skill
SCAFFOLD=/Users/anttitevanlinna/Projects/agents-102/curriculum/scaffolds/module-4-starter/policies
SKILL="$SCRATCH/module-4/skills/security-audit/SKILL.md"
RAW="$SCRATCH/outputs/policy-report-raw.md"
SCROLLBACK="$MECH_DIR/instances/bootstrap-m4-author-actor-scrollback.md"
REPORT="$MECH_DIR/instances/bootstrap-m4-author-judge-report.md"

[[ -f "$TRANSCRIPT" ]] || { echo "transcript not found: $TRANSCRIPT" >&2; exit 2; }
[[ -d "$SCRATCH"   ]]  || { echo "scratch not found: $SCRATCH" >&2; exit 2; }

declare -a names
declare -a verdicts
declare -a evidence

pass_count=0
fail_count=0

record() {
  local name="$1" verdict="$2" ev="$3"
  names+=("$name"); verdicts+=("$verdict"); evidence+=("$ev")
  if [[ "$verdict" == "PASS" ]]; then pass_count=$((pass_count+1)); else fail_count=$((fail_count+1)); fi
}

assert_pass() {
  local name="$1" cmd="$2"
  local out
  if out=$(eval "$cmd" 2>&1); then
    record "$name" "PASS" "${out:-(no stdout)}"
  else
    record "$name" "FAIL" "${out:-(empty)}"
  fi
}

# V1-V3: prompts read via Read tool
for n in 001 002 003; do
  i="${n#0}"; i="${i#0}"
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$TRANSCRIPT" >/dev/null 2>&1; then
    record "V${i}" "PASS" "Read prompt-${n}.txt"
  else
    record "V${i}" "FAIL" "no Read of prompt-${n}.txt in transcript"
  fi
done

# A1 — inherited M3 paths
a1_evidence=""
a1_pass=1
for f in memory/index.md agents/monday-risks.md module-3/answer.md; do
  if [[ -f "$SCRATCH/$f" ]]; then a1_evidence+="$f "; else a1_pass=0; fi
done
sources_count=$(ls "$SCRATCH/sources/" 2>/dev/null | wc -l | tr -d ' ')
if [[ "$sources_count" -ge 3 ]]; then a1_evidence+="sources=$sources_count"; else a1_pass=0; fi
if [[ "$a1_pass" -eq 1 ]]; then record "A1" "PASS" "$a1_evidence"; else record "A1" "FAIL" "$a1_evidence"; fi

# A2 — module-4/policies has .md files
md_count=$(ls "$SCRATCH/module-4/policies/"*.md 2>/dev/null | wc -l | tr -d ' ')
if [[ "$md_count" -ge 1 ]]; then record "A2" "PASS" "$md_count policy .md files"; else record "A2" "FAIL" "no policies/*.md"; fi

# A3 — order: prompt-001 read → policy reads → raw report write
# Use jq to find first Write of policy-report-raw.md and ensure it comes after prompt-001 Read
order_check=$(jq -r '
  select(.message.content[]?.type == "tool_use") |
  .message.content[] | select(.type == "tool_use") |
  [.name, (.input.file_path // .input.path // ""), .id] | @tsv
' "$TRANSCRIPT" 2>/dev/null)
p1_line=$(echo "$order_check" | grep -nE 'Read.*prompt-001\.txt' | head -1 | cut -d: -f1)
raw_line=$(echo "$order_check" | grep -nE 'Write.*policy-report-raw\.md' | head -1 | cut -d: -f1)
if [[ -n "$p1_line" && -n "$raw_line" && "$p1_line" -lt "$raw_line" ]]; then
  record "A3" "PASS" "prompt-001 read at line $p1_line, raw write at $raw_line"
else
  record "A3" "FAIL" "p1=$p1_line raw=$raw_line"
fi

# A4 — raw report header
if grep -F '| Rule | Description | Verdict | Evidence |' "$RAW" >/dev/null 2>&1; then
  record "A4" "PASS" "table header present"
else
  record "A4" "FAIL" "header missing"
fi

# A5 — ≥12 data rows
total_pipe=$(grep -c '^|' "$RAW" 2>/dev/null || echo 0)
data_rows=$((total_pipe - 2))
if [[ "$data_rows" -ge 12 ]]; then record "A5" "PASS" "$data_rows rows"; else record "A5" "FAIL" "$data_rows rows (<12)"; fi

# A6 — verdict "I can't tell" present
if grep -F "I can't tell" "$RAW" >/dev/null 2>&1; then record "A6" "PASS" "I can't tell present"; else record "A6" "FAIL" "missing"; fi

# A7 — no SKILL.md write before raw report
skill_first=$(echo "$order_check" | grep -nE 'Write.*module-4/skills/security-audit/SKILL\.md' | head -1 | cut -d: -f1)
if [[ -z "$skill_first" || ( -n "$raw_line" && "$skill_first" -gt "$raw_line" ) ]]; then
  record "A7" "PASS" "skill writes after raw (or none)"
else
  record "A7" "FAIL" "skill at $skill_first <= raw at $raw_line"
fi

# A8 — Maija's substance in scrollback (token-match: actor may paraphrase as student input)
if [[ -f "$SCROLLBACK" ]]; then
  hits=0
  for token in 'partner-NDA' 'Finnish data-protection' 'maija-prep-notes-skeptics' 'marketplace' 'shell access'; do
    grep -iqF "$token" "$SCROLLBACK" 2>/dev/null && hits=$((hits+1))
  done
  if [[ "$hits" -ge 3 ]]; then
    record "A8" "PASS" "Maija content present ($hits/5 tokens)"
  else
    record "A8" "FAIL" "Maija content thin ($hits/5 tokens)"
  fi
else
  record "A8" "FAIL" "scrollback not found"
fi

# A9 — actor waited (no skill-file Read between prompt-002 read and Maija block).
# Heuristic: between prompt-002 read line and prompt-003 read line in transcript,
# no Read or Write under module-4/skills/security-audit/.
p2_line=$(echo "$order_check" | grep -nE 'Read.*prompt-002\.txt' | head -1 | cut -d: -f1)
p3_line=$(echo "$order_check" | grep -nE 'Read.*prompt-003\.txt' | head -1 | cut -d: -f1)
if [[ -n "$p2_line" && -n "$p3_line" ]]; then
  middle=$(echo "$order_check" | sed -n "${p2_line},${p3_line}p")
  if echo "$middle" | grep -qE 'module-4/skills/security-audit/'; then
    record "A9" "FAIL" "skill IO between prompt-002 and prompt-003"
  else
    record "A9" "PASS" "no skill IO mid-Phase-2"
  fi
else
  record "A9" "FAIL" "p2/p3 read lines not both found"
fi

# A10 — SKILL.md exists
if [[ -f "$SKILL" ]]; then record "A10" "PASS" "SKILL.md exists"; else record "A10" "FAIL" "no SKILL.md"; fi

# A11 — four attack classes verbatim (case-insensitive)
a11_pass=1; a11_ev=""
for term in 'prompt injection' 'direct' 'indirect' 'secrets in context' 'scrollback' 'tool confusion' 'skill supply-chain'; do
  if grep -iqF "$term" "$SKILL" 2>/dev/null; then a11_ev+="✓"; else a11_ev+="✗($term)"; a11_pass=0; fi
done
if [[ "$a11_pass" -eq 1 ]]; then record "A11" "PASS" "all 4 attack classes named"; else record "A11" "FAIL" "$a11_ev"; fi

# A12 — layering
if grep -iqE 'layered|on top of|in place of' "$SKILL" 2>/dev/null; then
  record "A12" "PASS" "layering preamble present"
else
  record "A12" "FAIL" "no layered/on top of/in place of"
fi

# A13 — ≥2 classical controls
controls_hit=0
for c in 'network' 'IAM' 'identity' 'mTLS' 'perimeter' 'WAF' 'logging' 'vendor'; do
  if grep -iqw "$c" "$SKILL" 2>/dev/null; then controls_hit=$((controls_hit+1)); fi
done
if [[ "$controls_hit" -ge 2 ]]; then
  record "A13" "PASS" "$controls_hit classical controls"
else
  record "A13" "FAIL" "$controls_hit classical controls (<2)"
fi

# A14 — 5 mitigation shapes
a14_pass=1; a14_ev=""
for s in scope split filter gate review; do
  if grep -iqwF "$s" "$SKILL" 2>/dev/null; then a14_ev+="✓"; else a14_ev+="✗($s)"; a14_pass=0; fi
done
if [[ "$a14_pass" -eq 1 ]]; then record "A14" "PASS" "all 5 shapes"; else record "A14" "FAIL" "$a14_ev"; fi

# A15 — POLICY lens names report shape
if grep -E '\| Rule|Report shape:|sections:' "$SKILL" >/dev/null 2>&1; then
  record "A15" "PASS" "report shape named"
else
  record "A15" "FAIL" "no report shape"
fi

# A16 — ≥12 rule rows OR enumerated list
pipe_rows=$(grep -c '^|' "$SKILL" 2>/dev/null || echo 0)
pipe_rows=$((pipe_rows - 2 < 0 ? 0 : pipe_rows - 2))
num_rows=$(grep -cE '^[[:space:]]*[0-9]+\.' "$SKILL" 2>/dev/null || echo 0)
dash_rows=$(grep -cE '^[[:space:]]*-' "$SKILL" 2>/dev/null || echo 0)
max_rows=$(( pipe_rows > num_rows ? pipe_rows : num_rows ))
max_rows=$(( max_rows > dash_rows ? max_rows : dash_rows ))
if [[ "$max_rows" -ge 12 ]]; then
  record "A16" "PASS" "$max_rows rule rows"
else
  record "A16" "FAIL" "$max_rows rule rows (<12)"
fi

# A17 — grill-before-save: scrollback shows '?' after prompt-003 paste, before SKILL.md write
# Simpler heuristic: scrollback contains a question mark on a Claude turn after Maija pastes prompt-003 line
if [[ -f "$SCROLLBACK" ]]; then
  # Find first occurrence of prompt-003 paste markers and check for ? before SKILL.md mention
  if grep -E '\?' "$SCROLLBACK" >/dev/null 2>&1; then
    record "A17" "PASS" "scrollback contains questions"
  else
    record "A17" "FAIL" "no '?' anywhere in scrollback"
  fi
else
  record "A17" "FAIL" "no scrollback"
fi

# A18 — no Write to ~/.claude/ or skill-install/
bad_paths=$(echo "$order_check" | grep -E 'Write.*(\.claude/|skill-install/)' | grep -v "$SCRATCH" || true)
if [[ -z "$bad_paths" ]]; then
  record "A18" "PASS" "no out-of-scope writes"
else
  record "A18" "FAIL" "$(echo "$bad_paths" | head -1)"
fi

# A19 — no Phase 4/5: no security-report.md write, no agents/monday-risks.md edit
post_writes=$(echo "$order_check" | grep -E 'Write.*(outputs/security-report\.md|agents/monday-risks\.md)' || true)
edit_writes=$(echo "$order_check" | grep -E 'Edit.*agents/monday-risks\.md' || true)
if [[ -z "$post_writes" && -z "$edit_writes" ]]; then
  record "A19" "PASS" "no Phase 4/5 artifacts"
else
  record "A19" "FAIL" "Phase 4/5 leak"
fi

# A20 — module-3/ byte-unchanged vs M3 scratch
if diff -rq "$MECH_DIR/scratch/bootstrap-m3/module-3/" "$SCRATCH/module-3/" >/dev/null 2>&1; then
  record "A20" "PASS" "module-3 unchanged"
else
  record "A20" "FAIL" "module-3 differs from M3 scratch"
fi

# A21 — module-4/policies/ byte-unchanged vs scaffold
if diff -rq "$SCAFFOLD/" "$SCRATCH/module-4/policies/" >/dev/null 2>&1; then
  record "A21" "PASS" "policies unchanged"
else
  record "A21" "FAIL" "policies differ from scaffold"
fi

# H1-H4 — harness leakage (no Reads of forbidden paths)
forbidden_check() {
  local label="$1" pattern="$2"
  if echo "$order_check" | grep -qE "Read.*$pattern"; then
    record "$label" "FAIL" "Read of $pattern"
  else
    record "$label" "PASS" "no Read of $pattern"
  fi
}
forbidden_check "H1" 'curriculum/exercises/'
# H2 forbids Reads of *other* runners (judge or sibling actor) — not the actor's own runner file.
forbidden_check "H2" 'curriculum/evals/mechanical/runners/.*(judge|audit)\.'
forbidden_check "H3" 'maintainer\.md|planted-state'
forbidden_check "H4" '/tmp/bootstrap-mocks/'

# Prompt-source audit
psa_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" author-security-skill 2>&1) || true
psa_verdict=$(echo "$psa_out" | tail -1)

# Write report
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — Bootstrap M4 author verbatim"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-m4-author.sh — no LLM."
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
  echo
  echo '```'
  echo "$psa_out"
  echo '```'
  echo
  echo "Verdict: $psa_verdict"
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

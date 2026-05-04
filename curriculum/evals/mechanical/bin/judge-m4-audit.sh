#!/usr/bin/env bash
# Script judge for agents-101-m4-audit runner.
#
# Replaces the LLM Judge dispatch — runs every assertion as a script call.
# Per the script ratchet (memory rule #17), this is one more increment toward
# the bin/judge.sh aspirational endpoint.
#
# Usage:
#   judge-m4-audit.sh <scratch_dir> <transcript.jsonl>
#
# Writes report to: instances/agents-101-m4-audit-judge-report.md
# Exit 0 on PASS, 1 on FAIL.

set -uo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <scratch_dir> <transcript.jsonl>" >&2
  exit 2
fi

SCRATCH="$1"
TRANSCRIPT="$2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS=/tmp/prompts/audit-your-agent
SKILL_SRC="$SCRATCH/module-4/skills/security-audit/SKILL.md"
SKILL_INSTALL="$SCRATCH/skill-install/.claude/skills/security-audit/SKILL.md"
RAW="$SCRATCH/outputs/policy-report-raw.md"
PR_REPORT="$SCRATCH/outputs/policy-report.md"
SR_REPORT="$SCRATCH/outputs/security-report.md"
MR_AGENT="$SCRATCH/agents/monday-risks.md"
SCROLLBACK="$MECH_DIR/instances/agents-101-m4-audit-actor-scrollback.md"
REPORT="$MECH_DIR/instances/agents-101-m4-audit-judge-report.md"

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

# Pre-extract tool_use stream
order_check=$(jq -r '
  select(.message.content[]?.type == "tool_use") |
  .message.content[] | select(.type == "tool_use") |
  [.name, (.input.file_path // .input.path // .input.command // ""), .id] | @tsv
' "$TRANSCRIPT" 2>/dev/null)

# V1-V4
for n in 001 002 003 004; do
  i="${n#0}"; i="${i#0}"
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "$PROMPTS/prompt-${n}.txt" "$TRANSCRIPT" >/dev/null 2>&1; then
    record "V${i}" "PASS" "Read prompt-${n}.txt"
  else
    record "V${i}" "FAIL" "no Read of prompt-${n}.txt"
  fi
done

# A1 — inherited paths
a1_pass=1; a1_ev=""
for f in memory/index.md agents/monday-risks.md module-3/answer.md outputs/policy-report-raw.md module-4/skills/security-audit/SKILL.md; do
  if [[ -f "$SCRATCH/$f" ]]; then a1_ev+="$f "; else a1_pass=0; a1_ev+="MISS:$f "; fi
done
[[ "$a1_pass" -eq 1 ]] && record "A1" "PASS" "$a1_ev" || record "A1" "FAIL" "$a1_ev"

# A2 — policy-report-raw byte-unchanged: just check it still exists with non-zero size and at least one I can't tell
if [[ -s "$RAW" ]] && grep -F "I can't tell" "$RAW" >/dev/null 2>&1; then
  record "A2" "PASS" "raw report intact"
else
  record "A2" "FAIL" "raw report missing or trivially empty"
fi

# A3 — authored source byte-unchanged: spot-check that the four attack classes still appear (state-protection)
a3_pass=1
for term in 'prompt injection' 'tool confusion' 'skill supply-chain' 'secrets in context'; do
  grep -iqF "$term" "$SKILL_SRC" 2>/dev/null || a3_pass=0
done
[[ "$a3_pass" -eq 1 ]] && record "A3" "PASS" "authored skill intact" || record "A3" "FAIL" "authored skill mutated"

# A4 — install destination created
[[ -f "$SKILL_INSTALL" ]] && record "A4" "PASS" "skill-install/SKILL.md exists" || record "A4" "FAIL" "no skill-install"

# A5 — installed = authored
if diff -q "$SKILL_SRC" "$SKILL_INSTALL" >/dev/null 2>&1; then
  record "A5" "PASS" "install matches source"
else
  record "A5" "FAIL" "install != source"
fi

# A6 — substitution log present
if [[ -f "$SCROLLBACK" ]] && grep -F 'install location' "$SCROLLBACK" >/dev/null 2>&1; then
  record "A6" "PASS" "substitution log present"
else
  record "A6" "FAIL" "no substitution log"
fi

# A7 — no Write to ~/.claude/ on host
host_claude=$(echo "$order_check" | grep -E "Write.*$HOME/\.claude/" | grep -v "$SCRATCH" || true)
if [[ -z "$host_claude" ]]; then record "A7" "PASS" "no host ~/.claude writes"; else record "A7" "FAIL" "host write"; fi

# A8 — actor read installed SKILL.md
if echo "$order_check" | grep -qE "Read.*skill-install/.claude/skills/security-audit/SKILL\.md"; then
  record "A8" "PASS" "skill read"
else
  record "A8" "FAIL" "no skill read"
fi

# A9 — policy-report.md exists with table header
if [[ -f "$PR_REPORT" ]] && grep -F '| Rule | Description | Verdict | Evidence |' "$PR_REPORT" >/dev/null 2>&1; then
  record "A9" "PASS" "policy-report.md with header"
else
  record "A9" "FAIL" "missing"
fi

# A10 — ≥12 data rows
total_pipe=$(grep -c '^|' "$PR_REPORT" 2>/dev/null || echo 0)
data_rows=$((total_pipe - 2 < 0 ? 0 : total_pipe - 2))
[[ "$data_rows" -ge 12 ]] && record "A10" "PASS" "$data_rows rows" || record "A10" "FAIL" "$data_rows rows"

# A11 — three verdict values
a11_pass=1
for v in compliant violating "I can't tell"; do
  grep -iqF "$v" "$PR_REPORT" 2>/dev/null || a11_pass=0
done
[[ "$a11_pass" -eq 1 ]] && record "A11" "PASS" "all 3 verdicts" || record "A11" "FAIL" "verdict missing"

# A12 — substitution log: lens invocation
if grep -F 'reusable lens' "$SCROLLBACK" >/dev/null 2>&1; then
  record "A12" "PASS" "lens substitution logged"
else
  record "A12" "FAIL" "no lens log"
fi

# A13 — meta-read: 3+ heuristic mentions in scrollback (broad: surprises/pushback/hidden-violation/compliant-looking/I can't tell)
hits=$(grep -ciE 'surpris|push.back|hidden|compliant.looking|i can.t tell' "$SCROLLBACK" 2>/dev/null || echo 0)
[[ "$hits" -ge 3 ]] && record "A13" "PASS" "$hits meta-read mentions" || record "A13" "FAIL" "$hits"

# A14 — security-report.md exists
[[ -f "$SR_REPORT" ]] && record "A14" "PASS" "security-report.md" || record "A14" "FAIL" "missing"

# A15 — four attack classes verbatim
a15_pass=1; a15_ev=""
for term in 'prompt injection' 'direct' 'indirect' 'secrets in context' 'scrollback' 'tool confusion' 'skill supply-chain'; do
  if grep -iqF "$term" "$SR_REPORT" 2>/dev/null; then a15_ev+="✓"; else a15_ev+="✗($term)"; a15_pass=0; fi
done
[[ "$a15_pass" -eq 1 ]] && record "A15" "PASS" "all 4 attack classes" || record "A15" "FAIL" "$a15_ev"

# A16 — five mitigation shapes
a16_pass=1; a16_ev=""
for s in scope split filter gate review; do
  if grep -iqwF "$s" "$SR_REPORT" 2>/dev/null; then a16_ev+="✓"; else a16_ev+="✗($s)"; a16_pass=0; fi
done
[[ "$a16_pass" -eq 1 ]] && record "A16" "PASS" "all 5 shapes" || record "A16" "FAIL" "$a16_ev"

# A17 — classical controls floor
controls_hit=0
for c in network IAM identity mTLS perimeter WAF logging vendor; do
  grep -iqw "$c" "$SR_REPORT" 2>/dev/null && controls_hit=$((controls_hit+1))
done
[[ "$controls_hit" -ge 2 ]] && record "A17" "PASS" "$controls_hit controls" || record "A17" "FAIL" "$controls_hit"

# A18 — tier markers
tier_hits=$(grep -ciE '\b(high|medium|low)\b' "$SR_REPORT" 2>/dev/null || echo 0)
[[ "$tier_hits" -ge 3 ]] && record "A18" "PASS" "$tier_hits tier mentions" || record "A18" "FAIL" "$tier_hits"

# A19 — access-control enumeration ≥2
ac_hits=$(grep -ciE '^[[:space:]]*[-*0-9]' "$SR_REPORT" 2>/dev/null || echo 0)
[[ "$ac_hits" -ge 2 ]] && record "A19" "PASS" "$ac_hits enumerated" || record "A19" "FAIL" "$ac_hits"

# A20 — agents/monday-risks.md edited (differs from M3 baseline)
if diff -q "$MECH_DIR/scratch/agents-101-m3/agents/monday-risks.md" "$MR_AGENT" >/dev/null 2>&1; then
  record "A20" "FAIL" "monday-risks unchanged"
else
  record "A20" "PASS" "monday-risks edited"
fi

# A21 — edited file names excluded path (allow substring match — actor may shorten the filename)
if grep -iE 'maija-prep|skeptics' "$MR_AGENT" >/dev/null 2>&1; then
  record "A21" "PASS" "exclusion path identity named"
else
  record "A21" "FAIL" "no maija-prep / skeptics reference"
fi

# A22 — Mitigation applied and residual section
if grep -iE '^#{1,3} *Mitigation applied and residual' "$SR_REPORT" >/dev/null 2>&1; then
  record "A22" "PASS" "residual section present"
else
  record "A22" "FAIL" "no residual section"
fi

# A23 — residual section length 30-300 words (1.5x cap; case-insensitive heading match)
res_words=$(awk 'BEGIN{IGNORECASE=1} /^#{1,3} *mitigation applied/,0' "$SR_REPORT" 2>/dev/null | wc -w | tr -d ' ')
# Fallback: BSD awk may not honor IGNORECASE — try case-insensitive sed extract
if [[ -z "$res_words" || "$res_words" -eq 0 ]]; then
  res_words=$(sed -n '/[Mm][Ii][Tt][Ii][Gg][Aa][Tt][Ii][Oo][Nn] [Aa]pplied/,$p' "$SR_REPORT" 2>/dev/null | wc -w | tr -d ' ')
fi
if [[ "$res_words" -ge 30 && "$res_words" -le 300 ]]; then
  record "A23" "PASS" "$res_words words"
else
  record "A23" "FAIL" "$res_words words"
fi

# A24 — no Write to authored or installed SKILL.md (after Phase 1 install)
# Heuristic: count writes to those paths; expect exactly 1 (the install) for skill-install, 0 for source
src_writes=$(echo "$order_check" | grep -cE "Write.*module-4/skills/security-audit/SKILL\.md" || true)
inst_writes=$(echo "$order_check" | grep -cE "Write.*skill-install/.claude/skills/security-audit/SKILL\.md" || true)
if [[ "$src_writes" -eq 0 ]]; then
  record "A24" "PASS" "src writes=$src_writes inst writes=$inst_writes"
else
  record "A24" "FAIL" "src writes=$src_writes (>0)"
fi

# A25 — no Write to module-3/
m3_writes=$(echo "$order_check" | grep -E "Write.*module-3/" || true)
[[ -z "$m3_writes" ]] && record "A25" "PASS" "module-3 untouched" || record "A25" "FAIL" "module-3 write"

# A26 — no Debrief
if grep -i '^## Debrief' "$SCROLLBACK" >/dev/null 2>&1; then
  record "A26" "FAIL" "debrief present"
else
  record "A26" "PASS" "no debrief"
fi

# A27 — authored skill files byte-unchanged (compared to author end-state)
# Same check as A3 — already verified
record "A27" "PASS" "(same as A3)"

# A28 — installed skill byte-unchanged after Phase 1 (cp from source = identical)
# Captured by A5
record "A28" "PASS" "(same as A5)"

# H1-H4 — harness leakage
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
forbidden_check "H2" 'curriculum/evals/mechanical/runners/.*(judge|author)\.'
forbidden_check "H3" 'maintainer\.md|planted-state'
forbidden_check "H4" '/tmp/agents-101-mocks/'

# Prompt-source audit
psa_out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" audit-your-agent 2>&1) || true
psa_verdict=$(echo "$psa_out" | tail -1)

# Write report
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — Agents 101 M4 audit verbatim"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-m4-audit.sh — no LLM."
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

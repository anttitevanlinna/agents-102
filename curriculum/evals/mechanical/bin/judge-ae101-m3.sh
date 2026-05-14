#!/usr/bin/env bash
# Script judge for ae101-m3 chain (map → STRIDE → author skill).
#
# Usage:
#   judge-ae101-m3.sh <scratch> <transcript.jsonl>
#
# Writes report to: instances/ae101-m3-judge-report.md
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
SURFACE_MAP="$SCRATCH/m3-temp/surface-map.md"
THREAT_LIST="$SCRATCH/m3-temp/threat-list.md"
SKILL="$SCRATCH/.claude-user-stub/skills/test-strategy/SKILL.md"
SCROLL="$MECH_DIR/instances/ae101-m3-actor-scrollback.md"
REPORT="$MECH_DIR/instances/ae101-m3-judge-report.md"

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
declare -a V_PROMPTS=(
  "map-the-access-surface/prompt-001.txt"
  "map-the-access-surface/prompt-002.txt"
  "map-the-access-surface/prompt-003.txt"
  "map-the-access-surface/prompt-004.txt"
  "map-the-access-surface/prompt-005.txt"
  "threat-model-with-stride/prompt-001.txt"
  "threat-model-with-stride/prompt-002.txt"
  "threat-model-with-stride/prompt-003.txt"
  "threat-model-with-stride/prompt-004.txt"
  "author-test-strategy-skill/prompt-001.txt"
  "author-test-strategy-skill/prompt-002.txt"
)
vi=0
for p in "${V_PROMPTS[@]}"; do
  vi=$((vi+1))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/$p" "$TR" >/dev/null 2>&1; then
    record "V$vi" "PASS" "Read of $p confirmed"
  else
    record "V$vi" "FAIL" "no Read of $p"
  fi
done

# ── A-series: orient + skills listing ──────────────────────────────────────
if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*skills' "$SCROLL"; then
  record "A1" "PASS" "/skills substitution logged"
else
  record "A1" "FAIL" "no /skills substitution log"
fi

if [[ -f "$SCROLL" ]]; then
  skills_listed=$(awk '/Phase 1/,/Phase 2/' "$SCROLL" | grep -cE 'access-control-analysis|stride' || true)
else
  skills_listed=0
fi
[[ "$skills_listed" -ge 2 ]] \
  && record "A2" "PASS" "$skills_listed skill names listed in Phase 1" \
  || record "A2" "FAIL" "only $skills_listed skill names listed"

# ── M-series: surface map ──────────────────────────────────────────────────
test -f "$SURFACE_MAP" && record "M1" "PASS" "surface map exists" || record "M1" "FAIL" "surface map missing"

if [[ -f "$SURFACE_MAP" ]]; then
  cats=$(grep -cE '^## (User boundaries|Trust boundaries|Data flows|Tool|External integration|Authorization)' "$SURFACE_MAP" || true)
  [[ "$cats" -ge 5 ]] \
    && record "M2" "PASS" "$cats/6 STRIDE-like category headers" \
    || record "M2" "FAIL" "only $cats category headers (≥5 expected)"

  if grep -ciqE 'parseAdjustment|adjustments|input boundary' "$SURFACE_MAP"; then
    record "M3" "PASS" "Phase 4 integration evident — parseAdjustment surface present"
  else
    record "M3" "FAIL" "Phase 4 integration missing"
  fi

  if grep -ciqE '^## Codebase-specific|reason field|CSV.injection' "$SURFACE_MAP"; then
    record "M4" "PASS" "Phase 5 codebase-specific surface appended"
  else
    record "M4" "FAIL" "Phase 5 codebase-specific surface missing"
  fi
else
  record "M2" "FAIL" "surface map missing"
  record "M3" "FAIL" "surface map missing"
  record "M4" "FAIL" "surface map missing"
fi

# ── T-series: STRIDE threat-list + ADR ─────────────────────────────────────
test -f "$THREAT_LIST" && record "T1" "PASS" "threat list exists" || record "T1" "FAIL" "threat list missing"

if [[ -f "$THREAT_LIST" ]]; then
  stride_cats=$(grep -cE '^## (Spoofing|Tampering|Repudiation|Information disclosure|Denial of service|Elevation of privilege)' "$THREAT_LIST" || true)
  [[ "$stride_cats" -eq 6 ]] \
    && record "T2" "PASS" "all 6 STRIDE category headers present" \
    || record "T2" "FAIL" "only $stride_cats/6 STRIDE headers"

  if grep -iqE 'HIGH' "$THREAT_LIST"; then
    record "T3" "PASS" "HIGH-flagged entry present"
  else
    record "T3" "FAIL" "no HIGH-flagged entry"
  fi
else
  record "T2" "FAIL" "threat list missing"
  record "T3" "FAIL" "threat list missing"
fi

ADR=$(ls "$REPO/docs/adr/"0001-*.md 2>/dev/null | head -1)
if [[ -n "$ADR" && -f "$ADR" ]]; then
  record "T4" "PASS" "ADR exists: $(basename "$ADR")"
  adr_sections=$(grep -cE '^## (Context|Decision|Consequences|Alternatives considered)' "$ADR" || true)
  [[ "$adr_sections" -eq 4 ]] \
    && record "T5" "PASS" "all 4 ADR sections present" \
    || record "T5" "FAIL" "only $adr_sections/4 ADR sections"
else
  record "T4" "FAIL" "no ADR file at docs/adr/0001-*.md"
  record "T5" "FAIL" "ADR missing"
fi

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*skill-as-subagent|skill-as-subagent.*inline' "$SCROLL"; then
  record "T6" "PASS" "skill-as-subagent → inline substitution logged"
else
  record "T6" "FAIL" "no skill-as-subagent substitution log"
fi

# ── S-series: authored test-strategy skill ─────────────────────────────────
test -f "$SKILL" && record "S1" "PASS" "test-strategy SKILL.md authored" || record "S1" "FAIL" "test-strategy SKILL.md missing"

if [[ -f "$SKILL" ]]; then
  grep -qE '^name: test-strategy' "$SKILL" \
    && record "S2" "PASS" "frontmatter name: test-strategy" \
    || record "S2" "FAIL" "frontmatter missing or wrong name"

  grep -ciqE 'node --test|node:test' "$SKILL" \
    && record "S3" "PASS" "skill mentions node --test" \
    || record "S3" "FAIL" "skill missing node --test reference"
else
  record "S2" "FAIL" "skill missing"
  record "S3" "FAIL" "skill missing"
fi

# S4: 7 Q&A markers in Phase 10. Accept any of:
#   ^**Q1:** ... ^**Q7:**          (explicit turn markers)
#   ^Q1: ... ^Q7:                  (shorthand turn markers)
#   ^1. ... ^7.                    (numbered-list summary form)
# Count distinct integers 1-7 that appear as line-prefix in the Phase 10 region.
if [[ -f "$SCROLL" ]]; then
  qa=$(awk '/Phase 10/,/Phase 11/' "$SCROLL" \
       | grep -oE '^\*\*Q[1-7]|^Q[1-7]:|^### Q[1-7]|^[1-7]\.' \
       | grep -oE '[1-7]' \
       | sort -u | wc -l | tr -d ' ')
else
  qa=0
fi
[[ "$qa" -ge 7 ]] \
  && record "S4" "PASS" "$qa distinct Q&A items in Phase 10" \
  || record "S4" "FAIL" "only $qa distinct Q&A items (≥7 expected)"

if [[ -f "$SCROLL" ]]; then
  selfgrade=$(awk '/Phase 11/,EOF' "$SCROLL" | grep -ciE 'is it good|weakness|strength|generic|covers the hardening' || true)
else
  selfgrade=0
fi
[[ "$selfgrade" -ge 1 ]] \
  && record "S5" "PASS" "Phase 11 self-grade evident" \
  || record "S5" "FAIL" "Phase 11 self-grade missing"

# S6: TODO line near the top. Frontmatter occupies the first lines (typically 3-5),
# so check the first 10 lines — the TODO is supposed to land just below the closing
# `---`, in the first few body lines.
if [[ -f "$SKILL" ]] && head -10 "$SKILL" | grep -qE '<!-- v0\.2|TODO'; then
  record "S6" "PASS" "TODO present near top of skill file"
else
  record "S6" "FAIL" "no TODO in first 10 lines"
fi

# ── C-series: arrange state ────────────────────────────────────────────────
test -f "$REPO/CLAUDE.local.md" \
  && record "C1" "PASS" "CLAUDE.local.md written by Arrange" \
  || record "C1" "FAIL" "CLAUDE.local.md missing"

if [[ -f "$REPO/.gitignore" ]] && grep -q 'CLAUDE\.local\.md' "$REPO/.gitignore"; then
  record "C2" "PASS" ".gitignore contains CLAUDE.local.md"
else
  record "C2" "FAIL" ".gitignore does not contain CLAUDE.local.md"
fi

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
wf=$(jq_tool_input "WebFetch" "url")
[[ -z "$wf" ]] \
  && record "H4" "PASS" "no WebFetch attempted" \
  || record "H4" "FAIL" "WebFetch attempted: $wf"

# ── PF / PS ────────────────────────────────────────────────────────────────
PF_TMP=$(mktemp -d)
trap 'rm -rf "$PF_TMP"' EXIT

pfi=0
for ex in map-the-access-surface threat-model-with-stride author-test-strategy-skill; do
  pfi=$((pfi+1))
  out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" \
    "$MECH_DIR/runners/ae101-m3.actor.md" \
    "$REPO_ROOT/curriculum/exercises/${ex}.md" 2>&1) || true
  echo "$out" > "$PF_TMP/pf-$ex.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PF$pfi" "PASS" "runner-mapping ($ex): $v"
  else
    record "PF$pfi" "FAIL" "runner-mapping ($ex): $v"
  fi
done

psi=0
for ex in map-the-access-surface threat-model-with-stride author-test-strategy-skill; do
  psi=$((psi+1))
  out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" "$ex" 2>&1) || true
  echo "$out" > "$PF_TMP/ps-$ex.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PS$psi" "PASS" "prompt-source-audit ($ex): $v"
  else
    record "PS$psi" "FAIL" "prompt-source-audit ($ex): $v"
  fi
done

# ── Write report ───────────────────────────────────────────────────────────
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — AE101 M3 chain (script-only)"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m3.sh — no LLM."
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
  echo "## Pre-flight (per exercise)"
  for ex in map-the-access-surface threat-model-with-stride author-test-strategy-skill; do
    echo
    echo "### $ex"
    echo '```'
    cat "$PF_TMP/pf-$ex.txt"
    echo '```'
  done
  echo
  echo "## Prompt-source audit (per exercise)"
  for ex in map-the-access-surface threat-model-with-stride author-test-strategy-skill; do
    echo
    echo "### $ex"
    echo '```'
    cat "$PF_TMP/ps-$ex.txt"
    echo '```'
  done
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

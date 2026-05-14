#!/usr/bin/env bash
# Script judge for ae101-m1 chain (orient + fix + compound).
#
# Usage:
#   judge-ae101-m1.sh <scratch> <transcript.jsonl>
#
# Writes report to: instances/ae101-m1-judge-report.md
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
SCROLL="$MECH_DIR/instances/ae101-m1-actor-scrollback.md"
ACTOR_REPORT="$MECH_DIR/instances/ae101-m1-actor-report.md"
REPORT="$MECH_DIR/instances/ae101-m1-judge-report.md"

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
  "orient-and-introspect/prompt-001.txt"
  "orient-and-introspect/prompt-002.txt"
  "fix-tests-first/prompt-001.txt"
  "fix-tests-first/prompt-002.txt"
  "fix-tests-first/prompt-003.txt"
  "compound-and-close/prompt-001.txt"
  "compound-and-close/prompt-002.txt"
  "compound-and-close/prompt-003.txt"
  "compound-and-close/prompt-004.txt"
)

i=0
for p in "${V_PROMPTS[@]}"; do
  i=$((i+1))
  if bash "$SCRIPT_DIR/prompt-read-check.sh" "/tmp/prompts/$p" "$TR" >/dev/null 2>&1; then
    record "V$i" "PASS" "Read of $p confirmed"
  else
    record "V$i" "FAIL" "no Read of $p in transcript"
  fi
done

# ── A-series: orient + introspect ──────────────────────────────────────────
read_paths=$(jq_tool_input "Read" "file_path")
repo_reads=$(echo "$read_paths" | grep -cE "scratch/ae101-m1/repo/(package\.json|README\.md|src/|tests/)" || true)
[[ "$repo_reads" -ge 4 ]] \
  && record "A1" "PASS" "$repo_reads repo files Read" \
  || record "A1" "FAIL" "only $repo_reads repo files Read (≥4 expected)"

if [[ -f "$SCROLL" ]]; then
  p1=$(awk '/Phase 1/,/Phase 2/' "$SCROLL" | grep -ciE 'shape|structure|load.bearing|stale|recent' || true)
else
  p1=0
fi
[[ "$p1" -ge 1 ]] \
  && record "A2" "PASS" "Phase 1 shape/structure language present" \
  || record "A2" "FAIL" "Phase 1 lacks shape/structure language"

if [[ -f "$SCROLL" ]]; then
  p2=$(awk '/Phase 2/,/Phase 3/' "$SCROLL" | grep -ciE 'skip|didn.?t read|chose not to' || true)
else
  p2=0
fi
[[ "$p2" -ge 1 ]] \
  && record "A3" "PASS" "Phase 2 names a skip" \
  || record "A3" "FAIL" "no skip mentioned"

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*/context|substitution.*context' "$SCROLL"; then
  record "A4" "PASS" "/context substitution logged"
else
  record "A4" "FAIL" "no /context substitution log"
fi

# ── F-series: fix-tests-first artefacts ────────────────────────────────────
if [[ -f "$REPO/tests/totals.test.js" ]] \
   && grep -qE 'sum subtracts negatives|sum.*negative|-125|sum\(\[100' "$REPO/tests/totals.test.js"; then
  record "F1" "PASS" "negative-input test present"
else
  record "F1" "FAIL" "no negative-input test in tests/totals.test.js"
fi

if [[ -f "$REPO/src/totals.js" ]] \
   && ! grep -qE 'if \(n < 0\)' "$REPO/src/totals.js"; then
  record "F2" "PASS" "negative-skip line removed from totals.js"
else
  record "F2" "FAIL" "negative-skip still present in totals.js"
fi

bash_calls=$(jq_tool_input "Bash" "command")
if echo "$bash_calls" | grep -qE 'npm test|node --test'; then
  record "F3" "PASS" "npm test / node --test invoked"
else
  record "F3" "FAIL" "no test invocation in transcript"
fi

if [[ -d "$REPO" ]]; then
  pushd "$REPO" >/dev/null
  if npm test >/dev/null 2>&1; then
    record "F4" "PASS" "npm test green on current state"
  else
    record "F4" "FAIL" "npm test NOT green"
  fi
  popd >/dev/null
else
  record "F4" "FAIL" "scratch repo missing"
fi

if [[ -d "$REPO/.git" ]]; then
  if git -C "$REPO" branch --list 'fix/totals-negative-summation' | grep -q 'fix/totals-negative-summation'; then
    record "F5" "PASS" "branch fix/totals-negative-summation present"
  else
    record "F5" "FAIL" "branch missing"
  fi
else
  record "F5" "FAIL" "scratch is not a git repo"
fi

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*gh|no gh in subagent|ready for PR open' "$SCROLL"; then
  record "F6" "PASS" "gh pr create substitution logged"
else
  record "F6" "FAIL" "no gh substitution log"
fi

# ── C-series: CLAUDE.local.md ──────────────────────────────────────────────
test -f "$REPO/CLAUDE.local.md" \
  && record "C1" "PASS" "CLAUDE.local.md present" \
  || record "C1" "FAIL" "CLAUDE.local.md missing"

if [[ -f "$REPO/CLAUDE.local.md" ]]; then
  # Accept numbered list (1. 2. 3.), bullet (- *), or H2/H3 rule headers (## Rule N, ### N.).
  rules=$(grep -cE '^[0-9]+\.|^- |^\* |^##+ [Rr]ule [0-9]+|^##+ [0-9]+\.' "$REPO/CLAUDE.local.md" || true)
  [[ "$rules" -ge 3 ]] \
    && record "C2" "PASS" "$rules rule items" \
    || record "C2" "FAIL" "only $rules rule items (≥3 expected)"
else
  record "C2" "FAIL" "CLAUDE.local.md missing"
fi

if [[ -f "$REPO/.gitignore" ]] && grep -q 'CLAUDE\.local\.md' "$REPO/.gitignore"; then
  record "C3" "PASS" ".gitignore contains CLAUDE.local.md"
else
  record "C3" "FAIL" ".gitignore does not include CLAUDE.local.md"
fi

if [[ -f "$REPO/CLAUDE.local.md" ]] && grep -qE '\[[A-Z][A-Z_]+\]' "$REPO/CLAUDE.local.md"; then
  record "C4" "FAIL" "[BRACKET] placeholders in CLAUDE.local.md"
else
  record "C4" "PASS" "no placeholders"
fi

if [[ -f "$SCROLL" ]]; then
  teamflag=$(awk '/Phase 6/,/Phase 7/' "$SCROLL" | grep -ciE 'team.worthy|team rule|PR against team|CLAUDE\.md' || true)
else
  teamflag=0
fi
[[ "$teamflag" -ge 1 ]] \
  && record "C5" "PASS" "team-worthy flag noted" \
  || record "C5" "FAIL" "no team-worthy flag"

# ── T-series: ticket close ─────────────────────────────────────────────────
TICKET="$REPO/docs/tickets/AE-42.md"
if [[ -f "$TICKET" ]] && grep -q '^## Resolution' "$TICKET"; then
  record "T1" "PASS" "Resolution section appended to AE-42"
else
  record "T1" "FAIL" "no Resolution section"
fi

if [[ -f "$TICKET" ]]; then
  res_body=$(awk '/^## Resolution/,EOF' "$TICKET" | grep -ciE 'sum|negative|totals|refund|root cause' || true)
else
  res_body=0
fi
[[ "$res_body" -ge 1 ]] \
  && record "T2" "PASS" "Resolution names root cause keywords" \
  || record "T2" "FAIL" "Resolution lacks root cause keywords"

if [[ -f "$SCROLL" ]] && grep -iqE 'harness substitution.*MCP|harness substitution.*connector|manual paste|path[- ]3' "$SCROLL"; then
  record "T3" "PASS" "MCP substitution logged"
else
  record "T3" "FAIL" "no MCP substitution log"
fi

# ── H-series: harness leakage ──────────────────────────────────────────────
if echo "$read_paths" | grep -qE 'curriculum/exercises/'; then
  record "H1" "FAIL" "Read of curriculum/exercises/ leaked"
else
  record "H1" "PASS" "no Read of curriculum/exercises/"
fi

if echo "$read_paths" | grep -qE 'curriculum/prompts/'; then
  record "H2" "FAIL" "Read of curriculum/prompts/ (registry) leaked"
else
  record "H2" "PASS" "no Read of curriculum/prompts/"
fi

if echo "$read_paths" | grep -qE 'runners/.*\.judge\.md|\.maintainer\.md'; then
  record "H3" "FAIL" "Read of judge runner or maintainer doc leaked"
else
  record "H3" "PASS" "no Read of judge runner or maintainer doc"
fi

wf_urls=$(jq_tool_input "WebFetch" "url")
if [[ -n "$wf_urls" ]]; then
  record "H4" "FAIL" "WebFetch attempted: $wf_urls"
else
  record "H4" "PASS" "no WebFetch attempted"
fi

# ── PF / PS ────────────────────────────────────────────────────────────────
# Bash 3.2 (macOS default) lacks associative arrays — use temp files keyed by slug.
PF_TMP=$(mktemp -d)
trap 'rm -rf "$PF_TMP"' EXIT

pf_idx=0
for ex in orient-and-introspect fix-tests-first compound-and-close; do
  pf_idx=$((pf_idx+1))
  out=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" \
    "$MECH_DIR/runners/ae101-m1.actor.md" \
    "$REPO_ROOT/curriculum/exercises/${ex}.md" 2>&1) || true
  echo "$out" > "$PF_TMP/pf-$ex.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PF$pf_idx" "PASS" "runner-mapping ($ex): $v"
  else
    record "PF$pf_idx" "FAIL" "runner-mapping ($ex): $v"
  fi
done

ps_idx=0
for ex in orient-and-introspect fix-tests-first compound-and-close; do
  ps_idx=$((ps_idx+1))
  out=$(bash "$SCRIPT_DIR/prompt-source-audit.sh" "$ex" 2>&1) || true
  echo "$out" > "$PF_TMP/ps-$ex.txt"
  v=$(echo "$out" | tail -1)
  if echo "$v" | grep -qE 'READY'; then
    record "PS$ps_idx" "PASS" "prompt-source-audit ($ex): $v"
  else
    record "PS$ps_idx" "FAIL" "prompt-source-audit ($ex): $v"
  fi
done

# ── Write report ───────────────────────────────────────────────────────────
total=$((pass_count + fail_count))
verdict_line="PASS"
[[ "$fail_count" -gt 0 ]] && verdict_line="FAIL"

{
  echo "# Judge report — AE101 M1 chain (script-only)"
  echo
  echo "## Summary"
  echo
  echo "Verdict: **$verdict_line $pass_count/$total**. Generated by bin/judge-ae101-m1.sh — no LLM."
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
  for ex in orient-and-introspect fix-tests-first compound-and-close; do
    echo
    echo "### $ex"
    echo '```'
    cat "$PF_TMP/pf-$ex.txt"
    echo '```'
  done
  echo
  echo "## Prompt-source audit (per exercise)"
  for ex in orient-and-introspect fix-tests-first compound-and-close; do
    echo
    echo "### $ex"
    echo '```'
    cat "$PF_TMP/ps-$ex.txt"
    echo '```'
  done
  echo
  echo "## Harness substitutions (expected)"
  echo "- \`/rename\` slash command"
  echo "- \`/context\` slash command"
  echo "- \`gh pr create\` → \`git commit\` on feature branch"
  echo "- MCP connector → path-3 manual paste"
  echo "- Substituted student inputs via \`/tmp/ae101-mocks/student-inputs.md\`"
} > "$REPORT"

echo "$verdict_line $pass_count/$total → $REPORT"
[[ "$fail_count" -eq 0 ]] && exit 0 || exit 1

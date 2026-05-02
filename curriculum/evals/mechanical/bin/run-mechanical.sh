#!/usr/bin/env bash
# Prepare a mechanical-test runner for Actor dispatch.
#
# Replaces the "5 manual Bash steps" the orchestrator used to do by hand —
# pre-flight, prompt extraction, mock staging — and exits with a clear verdict.
# Does NOT dispatch the Actor (Agent tool, not Bash) and does NOT reset scratch
# (per-runner shape varies; left to a per-runner script or the orchestrator).
#
# Script-ratchet position: the next time we want this to also reset scratch and
# dispatch via headless `claude -p`, lift those moves into here. Today the unit
# of progress is making the deterministic prep one command instead of five.
#
# Usage: run-mechanical.sh <runner-slug>
#   <runner-slug> example: bootstrap-m2.verbatim
#   resolves to runners/<slug>.actor.md
#
# Exits:
#   0 — READY (pre-flight green, prompts extracted, mocks staged if needed)
#   1 — BLOCK (any pre-flight FAIL — do NOT dispatch Actor)
#   2 — usage error

set -uo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <runner-slug>  (e.g., bootstrap-m2.verbatim)" >&2
  exit 2
fi

SLUG="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_ROOT/../../.." && pwd)"
RUNNER="$MECH_ROOT/runners/${SLUG}.actor.md"

[[ -f "$RUNNER" ]] || { echo "runner not found: $RUNNER" >&2; exit 2; }

# 1. Extract exercise slugs from the runner's `**Exercise:**` tags.
#    Falls back to the slug-stem (drop trailing `.verbatim`, etc.) if no tags.
exercises=$(grep -E '^\*\*Exercise:\*\*' "$RUNNER" 2>/dev/null \
            | sed -E 's/.*\*\*Exercise:\*\*[[:space:]]+`?([a-z0-9-]+)`?.*/\1/' \
            | awk '!seen[$0]++')

if [[ -z "$exercises" ]]; then
  # Single-exercise runner with no Exercise tags (M1 shape) — derive from slug.
  case "$SLUG" in
    bootstrap-m1.verbatim) exercises="personal-site-with-guardrails" ;;
    *) echo "FAIL — no **Exercise:** tags in $RUNNER and no fallback for slug '$SLUG'." >&2
       exit 1 ;;
  esac
fi

echo "## Runner"
echo "$RUNNER"
echo
echo "## Exercises in chain"
echo "$exercises" | sed 's/^/- /'

# 2. Pre-flight per exercise.
echo
echo "## Pre-flight (runner-mapping-check)"
status=0
while IFS= read -r ex; do
  ex_file="$REPO_ROOT/curriculum/exercises/${ex}.md"
  echo
  echo "### $ex"
  if ! bash "$SCRIPT_DIR/runner-mapping-check.sh" "$RUNNER" "$ex_file"; then
    status=1
  fi
done <<< "$exercises"

if [[ $status -ne 0 ]]; then
  echo
  echo "Verdict: BLOCK — pre-flight failed. Fix runner before dispatching Actor."
  exit 1
fi

# 3. Extract prompts per exercise.
echo
echo "## Extract prompts"
while IFS= read -r ex; do
  ex_file="$REPO_ROOT/curriculum/exercises/${ex}.md"
  bash "$MECH_ROOT/parse-prompts.sh" "$ex_file" "/tmp/prompts/$ex" 2>&1 \
    | grep -E '^Extracted|^prompt-'
done <<< "$exercises"

# 4. Stage bootstrap mocks if the runner references them.
if grep -q '/tmp/bootstrap-mocks' "$RUNNER"; then
  echo
  echo "## Stage bootstrap mocks"
  bash "$SCRIPT_DIR/stage-bootstrap-mocks.sh"
fi

# 5. Static lints (informational — these have their own exit codes that the Judge enforces).
echo
echo "## Prompt-source audits (informational pre-check)"
while IFS= read -r ex; do
  echo
  echo "### $ex"
  bash "$SCRIPT_DIR/prompt-source-audit.sh" "$ex" 2>&1 | tail -6
done <<< "$exercises"

echo
echo "Verdict: READY — dispatch Actor with prompt = contents of $RUNNER"
echo "Scratch reset is per-runner; not handled here. After dispatch, find transcript at"
echo "  ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/<sid>/subagents/agent-<id>.jsonl"
exit 0

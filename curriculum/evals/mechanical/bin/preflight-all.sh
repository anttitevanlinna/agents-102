#!/usr/bin/env bash
# Pre-flight every actor runner whose name matches a glob, summarise verdicts.
# Catches runner-rot across the whole harness with one command instead of
# pre-flighting each runner manually.
#
# Usage:
#   preflight-all.sh                       # all *.actor.md
#   preflight-all.sh 'bootstrap-*'         # glob
#
# For each runner, derive exercise(s) from `**Exercise:**` tags (or the slug
# fallback table in run-mechanical.sh). Run runner-mapping-check.sh per
# exercise and tally the verdict.
#
# Exits 0 if all runners READY/READY-WITH-FLAGS, 1 if any BLOCK, 2 on usage.

set -uo pipefail

PATTERN="${1:-*}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$MECH_ROOT/../../.." && pwd)"

# Slug → exercise fallback for actor runners with no per-phase Exercise tags.
# (bash 3.2 on macOS lacks associative arrays — use a function.)
fallback_for() {
  case "$1" in
    bootstrap-m1.verbatim)        echo "personal-site-with-guardrails" ;;
    claude-basics-m1.verbatim)    echo "claude-basics-getting-started" ;;
    claude-basics-m2.verbatim)    echo "claude-basics-first-task" ;;
    claude-basics-m3.verbatim)    echo "claude-basics-multi-file" ;;
    *)                            echo "" ;;
  esac
}

shopt -s nullglob
GLOB="$MECH_ROOT/runners/${PATTERN}.actor.md"
# Word-split intentionally — the unquoted expansion is what triggers globbing.
runners=( $GLOB )
shopt -u nullglob

if [[ ${#runners[@]} -eq 0 ]]; then
  echo "No runners match: $GLOB" >&2
  exit 2
fi

total=0
ready=0
ready_flags=0
blocked=0
blocked_runners=()

for runner in "${runners[@]}"; do
  total=$((total + 1))
  slug=$(basename "$runner" .actor.md)
  echo "──── $slug ────"

  # Extract exercises from per-phase tags, fall back if none.
  exercises=$(grep -E '^\*\*Exercise:\*\*' "$runner" 2>/dev/null \
              | sed -E 's/.*\*\*Exercise:\*\*[[:space:]]+`?([a-z0-9-]+)`?.*/\1/' \
              | awk '!seen[$0]++')

  if [[ -z "$exercises" ]]; then
    fb=$(fallback_for "$slug")
    if [[ -n "$fb" ]]; then
      exercises="$fb"
    else
      echo "  SKIP — no Exercise tags and no fallback for $slug"
      continue
    fi
  fi

  any_block=0
  any_warn=0
  while IFS= read -r ex; do
    ex_file="$REPO_ROOT/curriculum/exercises/${ex}.md"
    if [[ ! -f "$ex_file" ]]; then
      echo "  $ex: SKIP — $ex_file not found"
      continue
    fi
    last=$(bash "$SCRIPT_DIR/runner-mapping-check.sh" "$runner" "$ex_file" 2>&1 | tail -1)
    case "$last" in
      "Verdict: READY"*WITH-FLAGS*)
        echo "  $ex: READY-WITH-FLAGS"
        any_warn=1
        ;;
      "Verdict: READY"*)
        echo "  $ex: READY"
        ;;
      "Verdict: BLOCK"*)
        echo "  $ex: BLOCK — $last"
        any_block=1
        ;;
      *)
        echo "  $ex: ?? — $last"
        any_block=1
        ;;
    esac
  done <<< "$exercises"

  if (( any_block )); then
    blocked=$((blocked + 1))
    blocked_runners+=("$slug")
  elif (( any_warn )); then
    ready_flags=$((ready_flags + 1))
  else
    ready=$((ready + 1))
  fi
done

echo
echo "──── Summary ────"
echo "Total: $total"
echo "READY: $ready"
echo "READY-WITH-FLAGS: $ready_flags"
echo "BLOCK: $blocked"
if (( blocked > 0 )); then
  echo
  echo "Blocked runners:"
  printf '  - %s\n' "${blocked_runners[@]}"
  exit 1
fi
exit 0

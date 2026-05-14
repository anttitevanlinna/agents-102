#!/usr/bin/env bash
# Top-level dispatcher for mechanical-test judges.
#
# Usage:
#   judge.sh <runner-slug> [<extra-args>]
#   judge.sh all               # fire every Agents 101 module judge in order
#
# Slugs:
#   agents-101-m1            no extra args
#   agents-101-m2            no extra args
#   agents-101-m3            no extra args
#   agents-101-m4-author     <transcript-path>
#   agents-101-m4-audit      <transcript-path>
#   agents-101-m5            <setup_tr> <det1..5_tr> <scorer_tr>   # 7 transcripts
#   agents-101-m6            <setup_tr> <run_tr> [<judge-baseline-shasum>]
#   ae101-prework            <transcript-path>
#   ae101-m1                 <transcript-path>
#
# All judges write instances/<runner-slug>-judge-report.md and exit 0 on PASS / 1 on FAIL.
#
# Per memory rule #17 (script ratchet): each per-module judge is a script that runs every
# assertion as a grep/jq/diff/shasum one-liner. No LLM Judge dispatch in the new pipeline.
# M1-M3 inherit transcript-only assertions from prior LLM-Judge runs (marked INHERITED in the
# report). All 6 modules' file-state and scrollback assertions re-fire against current state.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
UPDATE_QUALITY="$REPO_ROOT/curriculum/evals/scripts/update-quality.sh"

# Slug → module-file map for Quality-block updates on PASS
slug_to_file() {
  case "$1" in
    agents-101-m1)        echo "curriculum/trainings/agents-101/getting-going.md" ;;
    agents-101-m2)        echo "curriculum/trainings/agents-101/building-agent-systems.md" ;;
    agents-101-m3)        echo "curriculum/trainings/agents-101/multi-agent-systems.md" ;;
    agents-101-m4-author) echo "curriculum/trainings/agents-101/security.md" ;;
    agents-101-m4-audit)  echo "curriculum/trainings/agents-101/security.md" ;;
    agents-101-m5)        echo "curriculum/trainings/agents-101/output-quality.md" ;;
    agents-101-m6)        echo "curriculum/trainings/agents-101/evaluations.md" ;;
    ae101-prework)        echo "curriculum/trainings/agentic-engineering-101/prework.md" ;;
    ae101-m1)             echo "curriculum/trainings/agentic-engineering-101/getting-going.md" ;;
    ae101-m2-pushback)    echo "curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md" ;;
    ae101-m3)             echo "curriculum/trainings/agentic-engineering-101/earn-the-trust.md" ;;
    ae101-m4)             echo "curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md" ;;
    ae101-m5)             echo "curriculum/trainings/agentic-engineering-101/learn-from-the-test.md" ;;
    ae101-m6)             echo "curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md" ;;
    *) echo "" ;;
  esac
}

# Call update-quality on PASS
post_pass() {
  local slug="$1" rc="$2"
  [[ "$rc" -eq 0 ]] || return 0
  local file
  file=$(slug_to_file "$slug")
  [[ -n "$file" && -f "$REPO_ROOT/$file" ]] || return 0
  bash "$UPDATE_QUALITY" "$REPO_ROOT/$file" \
    --mechanical "PASS:$slug via bin/judge.sh" || true
}

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <slug> [extra args]" >&2
  echo "   or: $0 all" >&2
  exit 2
fi

SLUG="$1"
shift || true

# Optional --inspect flag — runs bin/inspector.sh against each transcript after the script judge.
# Advisory output (no gate); writes instances/<slug>-inspector-notes.md.
INSPECT=0
INSPECT_ARGS=()
for arg in "$@"; do
  if [[ "$arg" == "--inspect" ]]; then INSPECT=1; else INSPECT_ARGS+=("$arg"); fi
done
set -- "${INSPECT_ARGS[@]+"${INSPECT_ARGS[@]}"}"

run_inspector() {
  local sub_slug="$1" tr="$2"
  [[ "$INSPECT" -eq 1 && -n "${tr:-}" ]] || return 0
  echo "  inspector ($sub_slug)..."
  bash "$SCRIPT_DIR/inspector.sh" "$tr" "$sub_slug" || true
}

case "$SLUG" in
  agents-101-m1)
    bash "$SCRIPT_DIR/judge-m1.sh"; post_pass "$SLUG" $?
    ;;
  agents-101-m2)
    bash "$SCRIPT_DIR/judge-m2.sh"; post_pass "$SLUG" $?
    ;;
  agents-101-m3)
    bash "$SCRIPT_DIR/judge-m3.sh"; post_pass "$SLUG" $?
    ;;
  agents-101-m4-author)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 agents-101-m4-author <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m4-author.sh" "$SCRIPT_DIR/../scratch/agents-101-m4" "$1"; post_pass "$SLUG" $?
    run_inspector "agents-101-m4-author" "$1"
    ;;
  agents-101-m4-audit)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 agents-101-m4-audit <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m4-audit.sh" "$SCRIPT_DIR/../scratch/agents-101-m4" "$1"; post_pass "$SLUG" $?
    run_inspector "agents-101-m4-audit" "$1"
    ;;
  agents-101-m5)
    if [[ $# -lt 7 ]]; then
      echo "usage: $0 agents-101-m5 <setup_tr> <det1..5_tr> <scorer_tr> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m5.sh" "$SCRIPT_DIR/../scratch/agents-101-m5" "$@"; post_pass "$SLUG" $?
    run_inspector "agents-101-m5-setup" "$1"
    run_inspector "agents-101-m5-scorer" "$7"
    ;;
  agents-101-m6)
    if [[ $# -lt 2 ]]; then
      echo "usage: $0 agents-101-m6 <setup_tr> <run_tr> [<judge-baseline-shasum>] [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m6.sh" "$SCRIPT_DIR/../scratch/agents-101-m6" "$@"; post_pass "$SLUG" $?
    run_inspector "agents-101-m6-setup" "$1"
    run_inspector "agents-101-m6-run" "$2"
    ;;
  ae101-prework)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 ae101-prework <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-ae101-prework.sh" "$SCRIPT_DIR/../scratch/ae101-prework" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-prework" "$1"
    ;;
  ae101-m1)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 ae101-m1 <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-ae101-m1.sh" "$SCRIPT_DIR/../scratch/ae101-m1" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m1" "$1"
    ;;
  ae101-m2-pushback)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 ae101-m2-pushback <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-ae101-m2-pushback.sh" "$SCRIPT_DIR/../scratch/ae101-m2-pushback" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m2-pushback" "$1"
    ;;
  ae101-m3)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 ae101-m3 <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-ae101-m3.sh" "$SCRIPT_DIR/../scratch/ae101-m3" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m3" "$1"
    ;;
  ae101-m4)
    if [[ $# -lt 1 ]]; then echo "usage: $0 ae101-m4 <transcript> [--inspect]" >&2; exit 2; fi
    bash "$SCRIPT_DIR/judge-ae101-m4.sh" "$SCRIPT_DIR/../scratch/ae101-m4" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m4" "$1"
    ;;
  ae101-m5)
    if [[ $# -lt 1 ]]; then echo "usage: $0 ae101-m5 <transcript> [--inspect]" >&2; exit 2; fi
    bash "$SCRIPT_DIR/judge-ae101-m5.sh" "$SCRIPT_DIR/../scratch/ae101-m5" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m5" "$1"
    ;;
  ae101-m6)
    if [[ $# -lt 1 ]]; then echo "usage: $0 ae101-m6 <transcript> [--inspect]" >&2; exit 2; fi
    bash "$SCRIPT_DIR/judge-ae101-m6.sh" "$SCRIPT_DIR/../scratch/ae101-m6" "$1"; post_pass "$SLUG" $?
    run_inspector "ae101-m6" "$1"
    ;;
  all)
    # Fire M1-M3 (no transcript args needed). M4-M6 require transcript paths from this session;
    # for batch runs, dispatch through their per-module entry points.
    rc=0
    for m in m1 m2 m3; do
      echo "--- agents-101-$m ---"
      bash "$SCRIPT_DIR/judge-$m.sh" || rc=1
    done
    echo
    echo "M1-M3 done. M4-M6 require transcript paths — dispatch individually:"
    echo "  $0 agents-101-m4-author <tr>"
    echo "  $0 agents-101-m4-audit  <tr>"
    echo "  $0 agents-101-m5        <setup_tr> <det1..5_tr> <scorer_tr>"
    echo "  $0 agents-101-m6        <setup_tr> <run_tr> [<judge-baseline-sha>]"
    exit $rc
    ;;
  *)
    echo "unknown slug: $SLUG" >&2
    echo "valid: agents-101-m1 | agents-101-m2 | agents-101-m3 | agents-101-m4-author | agents-101-m4-audit | agents-101-m5 | agents-101-m6 | ae101-prework | ae101-m1 | ae101-m2-pushback | ae101-m3 | all" >&2
    exit 2
    ;;
esac

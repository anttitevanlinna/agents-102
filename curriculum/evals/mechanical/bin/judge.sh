#!/usr/bin/env bash
# Top-level dispatcher for mechanical-test judges.
#
# Usage:
#   judge.sh <runner-slug> [<extra-args>]
#   judge.sh all               # fire every Bootstrap module judge in order
#
# Slugs:
#   bootstrap-m1            no extra args
#   bootstrap-m2            no extra args
#   bootstrap-m3            no extra args
#   bootstrap-m4-author     <transcript-path>
#   bootstrap-m4-audit      <transcript-path>
#   bootstrap-m5            <setup_tr> <det1..5_tr> <scorer_tr>   # 7 transcripts
#   bootstrap-m6            <setup_tr> <run_tr> [<judge-baseline-shasum>]
#
# All judges write instances/<runner-slug>-judge-report.md and exit 0 on PASS / 1 on FAIL.
#
# Per memory rule #17 (script ratchet): each per-module judge is a script that runs every
# assertion as a grep/jq/diff/shasum one-liner. No LLM Judge dispatch in the new pipeline.
# M1-M3 inherit transcript-only assertions from prior LLM-Judge runs (marked INHERITED in the
# report). All 6 modules' file-state and scrollback assertions re-fire against current state.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

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
  bootstrap-m1)
    bash "$SCRIPT_DIR/judge-m1.sh"
    ;;
  bootstrap-m2)
    bash "$SCRIPT_DIR/judge-m2.sh"
    ;;
  bootstrap-m3)
    bash "$SCRIPT_DIR/judge-m3.sh"
    ;;
  bootstrap-m4-author)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 bootstrap-m4-author <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m4-author.sh" "$SCRIPT_DIR/../scratch/bootstrap-m4" "$1"
    run_inspector "bootstrap-m4-author" "$1"
    ;;
  bootstrap-m4-audit)
    if [[ $# -lt 1 ]]; then
      echo "usage: $0 bootstrap-m4-audit <transcript> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m4-audit.sh" "$SCRIPT_DIR/../scratch/bootstrap-m4" "$1"
    run_inspector "bootstrap-m4-audit" "$1"
    ;;
  bootstrap-m5)
    if [[ $# -lt 7 ]]; then
      echo "usage: $0 bootstrap-m5 <setup_tr> <det1..5_tr> <scorer_tr> [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m5.sh" "$SCRIPT_DIR/../scratch/bootstrap-m5" "$@"
    # M5 has 7 actors; inspect setup + scorer (longest chains), skip detectors (single-prompt each)
    run_inspector "bootstrap-m5-setup" "$1"
    run_inspector "bootstrap-m5-scorer" "$7"
    ;;
  bootstrap-m6)
    if [[ $# -lt 2 ]]; then
      echo "usage: $0 bootstrap-m6 <setup_tr> <run_tr> [<judge-baseline-shasum>] [--inspect]" >&2
      exit 2
    fi
    bash "$SCRIPT_DIR/judge-m6.sh" "$SCRIPT_DIR/../scratch/bootstrap-m6" "$@"
    run_inspector "bootstrap-m6-setup" "$1"
    run_inspector "bootstrap-m6-run" "$2"
    ;;
  all)
    # Fire M1-M3 (no transcript args needed). M4-M6 require transcript paths from this session;
    # for batch runs, dispatch through their per-module entry points.
    rc=0
    for m in m1 m2 m3; do
      echo "--- bootstrap-$m ---"
      bash "$SCRIPT_DIR/judge-$m.sh" || rc=1
    done
    echo
    echo "M1-M3 done. M4-M6 require transcript paths — dispatch individually:"
    echo "  $0 bootstrap-m4-author <tr>"
    echo "  $0 bootstrap-m4-audit  <tr>"
    echo "  $0 bootstrap-m5        <setup_tr> <det1..5_tr> <scorer_tr>"
    echo "  $0 bootstrap-m6        <setup_tr> <run_tr> [<judge-baseline-sha>]"
    exit $rc
    ;;
  *)
    echo "unknown slug: $SLUG" >&2
    echo "valid: bootstrap-m1 | bootstrap-m2 | bootstrap-m3 | bootstrap-m4-author | bootstrap-m4-audit | bootstrap-m5 | bootstrap-m6 | all" >&2
    exit 2
    ;;
esac

#!/usr/bin/env bash
# chain-lemmings-northwind.sh — drive the Northwind Team Track cut of AE101
# (registry key `agentic-engineering-101-northwind`) through the tmux-runner
# chain on the lemmings SUT.
#
# The Northwind cut is a thin `contentKey`-aliased variant of stock AE101: it
# runs the SAME four module files (getting-going, plan-mode-done-right,
# run-the-first-experiment, learn-from-the-test = stock M1/M2/M4/M5)
# unmodified, and simply omits M3 (`earn-the-trust`, a customer-authored
# workshop replaces it) and M6 (`spot-gaps-build-the-loop`, ditto). See
# `curriculum/trainings/agentic-engineering-101/autumn-gaps.md` for the full
# content-level audit; this script is the mechanical companion it names as
# owed ("the tmux runner ... could never cover the two room-scale workshops.
# With those gone, every sitting in the Bosser half is drivable.").
#
# Differs from chain-lemmings.sh in exactly one place: M3 never runs, so M4
# cannot inherit "current HEAD" (which in the stock chain is M3's ADR commit).
# It positions from M2's ending SHA instead — the same mechanism M2 already
# uses to position from M1. Nothing else about M1/M2/M4/M5 changes: same
# run-mN.sh scripts, same scenarios/mN.txt, same prompts. M4's own content
# only audits "whatever you've built" (ADRs/skills/memory) generically — it
# does not hard-require M3's ADR to exist, and M5's packaged re-send already
# degrades gracefully on a dropped M3 (confirmed in autumn-gaps.md, "checked,
# not a gap").
#
# Usage:
#   chain-lemmings-northwind.sh                # arrange, then m1, m2, m4, m5
#   chain-lemmings-northwind.sh --to m2        # arrange + M1 + M2 only
#   chain-lemmings-northwind.sh --from m4      # RESUME at M4 (reads newest
#                                               #   out/*/m2-state.json for the SHA)
#   chain-lemmings-northwind.sh --effort high  # cohort-faithful (slower)
#
# Run it backgrounded — multi-hour even with M3/M6 skipped. Each module logs
# to out/_chain-<m>.log; per-run artefacts land in out/<run-id>/ as usual.
#
# First use of this script: no live validation yet. Validate incrementally
# (--to m2, then --from m4 --to m5) before trusting a single-shot run, per
# lemmings-chain-runbook.md's own validate-on-first-use practice.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT="${HOME}/Projects/lemmings"
EFFORT="medium"
FROM="m1"; TO="m5"
DO_ARRANGE="auto"                       # auto = arrange iff FROM==m1
M1_SLUG="fix-hud-tally"
M2_SLUG="add-levels-2-3"
CHAIN_SLUG="blocker-deadlock-terminal"  # M4/M5 share this slug (branch convention)
M5_WORKTREE="${HOME}/Projects/lemmings-m5"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) FROM="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --no-arrange) DO_ARRANGE="no"; shift ;;
    --arrange) DO_ARRANGE="yes"; shift ;;
    --sut) SUT="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

export CLAUDE_CMD="claude --effort $EFFORT --permission-mode auto"
export CLAUDE_RUNNER_TIMEOUT="${CLAUDE_RUNNER_TIMEOUT:-1800}"

mod_num() { echo "${1#m}"; }
in_range() { local n; n="$(mod_num "$1")"; [[ "$(mod_num "$FROM")" -le "$n" && "$n" -le "$(mod_num "$TO")" ]]; }

latest_state() { ls -t "$HERE"/out/*/"$1-state.json" 2>/dev/null | head -1; }
state_val() { sed -n "s/.*\"$2\": *\"\([^\"]*\)\".*/\1/p" "$1" | head -1; }

run_module() {                          # $1=label, rest=command
  local label="$1"; shift
  echo "[chain] === $label ===  $*"
  set +e
  "$@" 2>&1 | tee "$HERE/out/_chain-$label.log"
  local rc=${PIPESTATUS[0]}
  set -e
  [[ $rc -eq 0 ]] || { echo "[chain] FAIL $label (rc=$rc) — see out/_chain-$label.log" >&2; exit "$rc"; }
}

position() {                            # $1=branch  $2=sha
  echo "[chain] positioning $1 @ $2"
  git -C "$SUT" checkout -B "$1" "$2"
}

wipe_leg_branches() {                   # $1=leg prefix (e.g. "m4", "m5")
  local prefix="$1"
  local b
  while IFS= read -r b; do
    [[ -z "$b" ]] && continue
    [[ "$b" == "$(git -C "$SUT" rev-parse --abbrev-ref HEAD 2>/dev/null)" ]] && continue
    echo "[chain] pre-wipe stale branch $b"
    git -C "$SUT" branch -D "$b" 2>/dev/null || true
  done < <(git -C "$SUT" for-each-ref --format='%(refname:short)' "refs/heads/${prefix}/" 2>/dev/null)
}

wipe_run_artifacts() {                  # $1=path under $SUT
  local rel="$1"
  local path="$SUT/$rel"
  if [[ -e "$path" ]]; then
    echo "[chain] pre-wipe $rel (was $(stat -f '%Sm' "$path" 2>/dev/null || echo unknown))"
    rm -f "$path"
  fi
}

echo "[chain] northwind cut: range $FROM..$TO (M3, M6 not part of this topology)  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s"

# ---- arrange (M1 baseline) ----------------------------------------------
if { [[ "$DO_ARRANGE" == "auto" && "$FROM" == "m1" ]] || [[ "$DO_ARRANGE" == "yes" ]]; }; then
  run_module arrange "$HERE/arrange-lemmings.sh" --sut "$SUT" --slug "$M1_SLUG"
fi

# ---- M1: getting going + context. SUT already on m1/<slug> @ bdd0919. ----
if in_range m1; then
  run_module m1 "$HERE/run-m1.sh" --cwd "$SUT" --task-slug "$M1_SLUG"
fi

# ---- M2: plan mode. Branch from M1's ending SHA. -------------------------
if in_range m2; then
  s="$(latest_state m1)"; [[ -n "$s" ]] || { echo "[chain] no m1-state.json — can't position M2" >&2; exit 1; }
  position "m2/$M2_SLUG" "$(state_val "$s" m1_ending_sha)"
  run_module m2 "$HERE/run-m2.sh" --cwd "$SUT" --task-slug "$M2_SLUG"
fi

# ---- M3 (earn-the-trust) intentionally absent: Northwind's cut drops it. -
# No worktree fork, no ADR, no test-strategy-lemmings skill.

# ---- M4: send-off. No M3 commit to inherit — position from M2's ending --
#       SHA directly (M2 makes no repo commit itself; plan-mode only, per
#       lemmings-chain-runbook.md's M2 validation note, so this is the same
#       SHA M2 started from — recorded via m2-state.json for parity with
#       how M2 positions from M1, and so this leg keeps working if that
#       ever stops being true).
if in_range m4; then
  s="$(latest_state m2)"; [[ -n "$s" ]] || { echo "[chain] no m2-state.json — can't position M4" >&2; exit 1; }
  position "m4/$CHAIN_SLUG" "$(state_val "$s" m2_ending_sha)"
  wipe_leg_branches m4
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA (the scenario -----
#       reads it from task.md's Run coordinates — no positioning needed here,
#       only clear stale worktree/branch so the fork lands clean). Identical
#       to chain-lemmings.sh's M5 block — this leg doesn't know or care
#       whether M3 ran.
if in_range m5; then
  m4_rec="$(grep 'Branch:' "$SUT/task.md" 2>/dev/null | grep -oE 'm4/[a-z0-9-]+' | tail -1)"
  m4_sp="$(git -C "$SUT" log --format='%h' --grep='^M4 starting point$' -1 2>/dev/null)"
  cur="$(git -C "$SUT" rev-parse --abbrev-ref HEAD)"
  if [[ -n "$m4_rec" && -n "$m4_sp" && "$m4_rec" != "$cur" ]]; then
    echo "[chain] reconciling: point $m4_rec at M4 starting point $m4_sp (task.md-recorded branch)"
    git -C "$SUT" branch -f "$m4_rec" "$m4_sp"
  fi
  m5_slug="${m4_rec#m4/}"; m5_slug="${m5_slug:-$CHAIN_SLUG}"
  git -C "$SUT" worktree remove --force "$M5_WORKTREE" 2>/dev/null || true
  [[ -e "$M5_WORKTREE" ]] && rm -rf "$M5_WORKTREE"
  git -C "$SUT" branch -D "m5/$m5_slug" 2>/dev/null || true
  git -C "$SUT" worktree prune
  run_module m5 "$HERE/run-m5.sh" --main-cwd "$SUT" --worktree-cwd "$M5_WORKTREE"
fi

# ---- M6 (spot-gaps-build-the-loop) intentionally absent: Northwind's cut -
# stops at M5; a customer-authored workshop replaces it.

echo "[chain] DONE range $FROM..$TO (northwind cut)"

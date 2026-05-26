#!/usr/bin/env bash
# chain-lemmings.sh — drive the full AE101 M1–M6 tmux-runner chain on the
# lemmings SUT, end to end, from a clean baseline. The missing wrapper around
# run-m{1..6}.sh: it arranges the M1 baseline, then positions each module's
# branch/worktree from the prior module's state.json hand-off and fires the
# next run-mN.sh. See lemmings-chain-runbook.md for the why behind each step.
#
# Usage:
#   chain-lemmings.sh                  # arrange, then m1..m6 (medium effort)
#   chain-lemmings.sh --to m1          # arrange + M1 only, then stop
#   chain-lemmings.sh --from m2        # RESUME at M2 (no arrange; reads the
#                                      #   newest out/*/m1-state.json for the SHA)
#   chain-lemmings.sh --from m3 --to m4
#   chain-lemmings.sh --effort high    # cohort-faithful (slower)
#
# Run it backgrounded — the chain is multi-hour. Each module logs to
# out/_chain-<m>.log; per-run artefacts land in out/<run-id>/ as usual.
#
# VALIDATION STATUS (2026-05-25): arrange + M1 validated live. M2–M6 transitions
# are coded from each run-mN.sh's contract but NOT yet run through this wrapper —
# validate module-by-module (--from mN --to mN) on first use. See runbook.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT="${HOME}/Projects/lemmings"
EFFORT="medium"
FROM="m1"; TO="m6"
DO_ARRANGE="auto"                       # auto = arrange iff FROM==m1
M1_SLUG="fix-hud-tally"
M2_SLUG="add-levels-2-3"
M3_SLUG="threat-model-share"
CHAIN_SLUG="blocker-deadlock-terminal"  # M4/M5/M6 share this slug (branch convention)
QUALITY_CWD="${HOME}/Projects/lemmings-m3-quality"
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

# Medium effort finishes turns well under an hour; 1800s caps a hung turn
# without clipping a real one. M5's packaged send-off is the long pole — the
# runbook notes raising this for the m5 leg if a send-off turn gets clipped.
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

# Pre-wipe a named ~/.claude/skills/<skill> slot so a leg that authors a
# SUT-suffixed skill (test-strategy-lemmings, session-shaper-lemmings) lands
# fresh — skills persist across sweeps with no sandbox; the M6 T5
# new-skill-since-baseline assertion catches an unchanged slot, but M3
# quality does not. Wipe per-leg before the leg fires. Ported from
# chain-codesearch.sh; the parity-port note in
# memory/compounded/2026-05-26-platform-sweep-idempotency-prewipe-authored-skills.md.
wipe_skill() {                          # $1=skill name
  local skill="$1"
  local path="$HOME/.claude/skills/$skill"
  if [[ -e "$path" ]]; then
    echo "[chain] pre-wipe ~/.claude/skills/$skill (was $(stat -f '%Sm' "$path/SKILL.md" 2>/dev/null || echo unknown))"
    rm -rf "$path"
  fi
}

# Pre-wipe stale m{4,5}/* sibling branches under the SUT. The leg either
# repositions its own branch fresh (M4 via position()) or reconciles via
# `branch -f` (M5). Stale siblings from prior runs pollute the namespace
# and — in chain-codesearch — caused a `branch -m` collision (2026-05-26,
# M4/M5 retest); chain-lemmings uses `branch -f` so it doesn't collide,
# but namespace hygiene still matters.
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

# Pre-wipe task.md / plan.md so the agent doesn't inherit a stale Run
# coordinates block from a previous run. task.md is tracked + committed at
# "M4 starting point", so positioning M4 from M3's HEAD restores the
# PREVIOUS run's task.md (with its Run coordinates pointing at the old
# branch + old transcript UUID). Caught 2026-05-26 in chain-codesearch; the
# same shape exists here.
wipe_run_artifacts() {                  # $1=path under $SUT
  local rel="$1"
  local path="$SUT/$rel"
  if [[ -e "$path" ]]; then
    echo "[chain] pre-wipe $rel (was $(stat -f '%Sm' "$path" 2>/dev/null || echo unknown))"
    rm -f "$path"
  fi
}

echo "[chain] range $FROM..$TO  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s"

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

# ---- M3: worktree fork + security/quality races. Branch from M2 ending. --
if in_range m3; then
  s="$(latest_state m2)"; [[ -n "$s" ]] || { echo "[chain] no m2-state.json — can't position M3" >&2; exit 1; }
  position "m3/$M3_SLUG" "$(state_val "$s" m2_ending_sha)"
  # the fork prompt creates the quality worktree + m3/quality branch — clear stale ones
  git -C "$SUT" worktree remove --force "$QUALITY_CWD" 2>/dev/null || true
  [[ -e "$QUALITY_CWD" ]] && rm -rf "$QUALITY_CWD"
  git -C "$SUT" branch -D m3/quality 2>/dev/null || true
  git -C "$SUT" worktree prune
  # M3 quality authors test-strategy-lemmings.
  wipe_skill test-strategy-lemmings
  wipe_leg_branches m3
  wipe_leg_branches m4
  run_module m3 "$HERE/run-m3.sh" --main-cwd "$SUT" --quality-cwd "$QUALITY_CWD"
fi

# ---- M4: send-off. M3 writes no state.json; main side ends on the ADR -----
#       commit (current HEAD). Branch m4/<slug> from there.
if in_range m4; then
  position "m4/$CHAIN_SLUG" "$(git -C "$SUT" rev-parse --short HEAD)"
  wipe_leg_branches m4
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA (the scenario -----
#       reads it from task.md's Run coordinates — no positioning needed here,
#       only clear stale worktree/branch so the fork lands clean).
if in_range m5; then
  # Reconcile the m4 branch so M5 can find the "M4 starting point". The M4
  # agent's branch name is NON-DETERMINISTIC (picks its own slug per run) and
  # often disagrees with task.md's recorded "Branch:" line — and the wrapper's
  # own positioning branch may sit at a DIFFERENT commit. M5 worktree-setup
  # reads task.md's branch + greps "M4 starting point" on it; if that branch
  # doesn't carry the commit, M5 falls back to "ask me for the SHA" → AUQ hang.
  # Robust fix (name-agnostic): point the task.md-recorded branch at the actual
  # "M4 starting point" commit (authoritative via git log --grep, reachable from
  # HEAD where the agent left the work). `branch -f` creates-or-moves; guarded
  # so we never -f the checked-out branch (if it's already correct, skip).
  # tail -1 — read the LATEST Branch: line. Defense-in-depth against the
  # agent leaving a second Run coordinates block from a prior run (caught
  # 2026-05-26 in chain-codesearch); wipe_run_artifacts above should make
  # the file fresh, but if a prompt regression appends instead of replaces,
  # the latest block is the one this run authored.
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

# ---- M6: spot gaps + retrospective, in the M5 worktree (no new branch). ---
if in_range m6; then
  # M6 authors session-shaper-lemmings.
  wipe_skill session-shaper-lemmings
  run_module m6 "$HERE/run-m6.sh" --cwd "$M5_WORKTREE" --task-slug "$CHAIN_SLUG"
fi

echo "[chain] DONE range $FROM..$TO"

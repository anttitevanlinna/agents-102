#!/usr/bin/env bash
# chain-codesearch.sh — drive the AE101 tmux-runner chain on the codesearch
# SUT, end to end. Sibling of chain-lemmings.sh; same shape, different SUT
# defaults + scenarios. Drives run-mN.sh with SCENARIO env pointed at the
# *-codesearch.txt variants.
#
# Scope today: M3–M6. M1/M2 not yet wrapped — the M1/M2 codesearch scenarios
# exist (scenarios/m{1,2}-codesearch.txt) but require an arrange step
# (M1 baseline + task.md authoring) that doesn't have a codesearch helper yet.
# Pass --from m1 or --from m2 and the script will error with a pointer.
#
# Usage:
#   chain-codesearch.sh                       # m3..m6, medium effort
#   chain-codesearch.sh --from m3 --to m4
#   chain-codesearch.sh --from m5             # resumes at m5 (reads task.md)
#   chain-codesearch.sh --effort high
#   chain-codesearch.sh --m2-sha e45ebef      # override M2-ending SHA
#                                             # (default: latest out/*/m2-state.json
#                                             #  whose m2_cwd is codesearch)
#
# Run it backgrounded — multi-hour. Per-module log → out/_chain-<m>-codesearch.log;
# per-run artefacts → out/<run-id>/ as usual.
#
# Per-runner tmux socket: each run-mN.sh exports RUNNER_TMUX_SOCKET so concurrent
# runners can't kill-server each other. This wrapper does NOT set its own —
# the children do, per-leg.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT="${HOME}/Projects/codesearch"
EFFORT="medium"
FROM="m3"; TO="m6"
M3_SLUG="threat-model-csweb-bind"
CHAIN_SLUG="clamp-show-to-roots"          # M4/M5/M6 share this slug
QUALITY_CWD="${HOME}/Projects/codesearch-m3-quality"
M5_WORKTREE="${HOME}/Projects/codesearch-m5"
M2_SHA_OVERRIDE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) FROM="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --sut) SUT="$2"; shift 2 ;;
    --m2-sha) M2_SHA_OVERRIDE="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

case "$FROM" in
  m1|m2) echo "[chain-cs] --from $FROM not supported yet. M1/M2 need a codesearch arrange helper (lemmings has arrange-lemmings.sh; the codesearch equivalent doesn't exist). Start at m3 with --m2-sha if needed." >&2; exit 2 ;;
esac

export CLAUDE_CMD="claude --effort $EFFORT --permission-mode auto"
export CLAUDE_RUNNER_TIMEOUT="${CLAUDE_RUNNER_TIMEOUT:-1800}"

mod_num() { echo "${1#m}"; }
in_range() { local n; n="$(mod_num "$1")"; [[ "$(mod_num "$FROM")" -le "$n" && "$n" -le "$(mod_num "$TO")" ]]; }

# Find the latest m2-state.json whose m2_cwd points at the codesearch SUT.
latest_codesearch_m2_state() {
  local f
  for f in $(ls -t "$HERE"/out/*/m2-state.json 2>/dev/null); do
    grep -q "\"m2_cwd\": \"$SUT\"" "$f" && { echo "$f"; return; }
  done
}
state_val() { sed -n "s/.*\"$2\": *\"\([^\"]*\)\".*/\1/p" "$1" | head -1; }

run_module() {                            # $1=label, rest=command
  local label="$1"; shift
  echo "[chain-cs] === $label ===  $*"
  set +e
  "$@" 2>&1 | tee "$HERE/out/_chain-$label-codesearch.log"
  local rc=${PIPESTATUS[0]}
  set -e
  [[ $rc -eq 0 ]] || { echo "[chain-cs] FAIL $label (rc=$rc) — see out/_chain-$label-codesearch.log" >&2; exit "$rc"; }
}

position() {                              # $1=branch  $2=sha
  echo "[chain-cs] positioning $1 @ $2"
  git -C "$SUT" checkout -B "$1" "$2"
}

echo "[chain-cs] range $FROM..$TO  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s"

# Per-leg pre-wipe of authored skills.
# Why this exists: every codesearch sweep authors SUT-suffixed skills under
# ~/.claude/skills/. Skills persist across sweeps (no sandbox). When a sweep
# fires against a path an earlier sweep already populated, the agent does the
# right thing — refuses to silently overwrite a working skill (caught
# 2026-05-26 in M6, see out/_chain-m6-codesearch.log + IMPROVEMENTS.md).
# M6 has a T5 new-skill-since-baseline assertion that catches this; M3 quality
# does NOT (it silently overwrites). Wipe per-leg, before the leg fires, so
# both legs land on a clean slot. Wipe the leg's OWN slot only — preserves
# earlier-leg-authored skills referenced by later legs (M6 reads
# test-strategy-codesearch as a reference for what good authoring looks like).
wipe_skill() {                            # $1=skill name
  local skill="$1"
  local path="$HOME/.claude/skills/$skill"
  if [[ -e "$path" ]]; then
    echo "[chain-cs] pre-wipe ~/.claude/skills/$skill (was $(stat -f '%Sm' "$path/SKILL.md" 2>/dev/null || echo unknown))"
    rm -rf "$path"
  fi
}

# Pre-wipe stale m{4,5}/* branches under the SUT.
# Why this exists: chain runs reposition $LEG_BRANCH from M3's HEAD via
# `git checkout -B`, but leave SIBLING branches under m4/* (or m5/*) from
# earlier runs untouched. When the agent picks a different slug than
# CHAIN_SLUG (which it can — task.md scope drives slug choice, not the
# wrapper's positioning branch), the chain's M5-prep reconciliation can
# collide with a stale sibling. Caught 2026-05-26: morning run left
# `m4/clamp-show-roots` lying around; afternoon agent created
# `m4/implement-bind-gate`; rename onto the stale name aborted with
# `fatal: branch already exists`. Wipe ALL m{4,5}/* on the SUT before the
# matching leg fires; the leg either positions its own branch fresh
# (M4 via the position() helper) or works inside a worktree (M5/M6).
wipe_leg_branches() {                     # $1=leg prefix (e.g. "m4", "m5")
  local prefix="$1"
  local b
  while IFS= read -r b; do
    [[ -z "$b" ]] && continue
    # Don't wipe the currently checked-out branch — that's the working ref.
    [[ "$b" == "$(git -C "$SUT" rev-parse --abbrev-ref HEAD 2>/dev/null)" ]] && continue
    echo "[chain-cs] pre-wipe stale branch $b"
    git -C "$SUT" branch -D "$b" 2>/dev/null || true
  done < <(git -C "$SUT" for-each-ref --format='%(refname:short)' "refs/heads/${prefix}/" 2>/dev/null)
}

# Pre-wipe task.md / plan.md so the agent doesn't inherit a stale
# Run coordinates block from a previous run.
# Why this exists: task.md is tracked + committed at "M4 starting point",
# so `git checkout -B <leg-branch> <M3-ADR-SHA>` restores the PREVIOUS run's
# committed task.md (with its Run coordinates pointing at the old branch +
# old transcript UUID). The M4 walk-and-send-off prompts expect a fresh
# task.md; the agent may skip overwriting if it deems the existing scope
# correct, and the commit-starting-point append-block step leaves the
# stale Run coordinates intact below the fresh one. Caught 2026-05-26:
# `grep 'Branch:' task.md | head -1` picked the stale block and the M5-prep
# reconciliation collided with the no-longer-current branch.
wipe_run_artifacts() {                    # $1=path under $SUT
  local rel="$1"
  local path="$SUT/$rel"
  if [[ -e "$path" ]]; then
    echo "[chain-cs] pre-wipe $rel (was $(stat -f '%Sm' "$path" 2>/dev/null || echo unknown))"
    rm -f "$path"
  fi
}

# ---- M3: worktree fork + security/quality races. Branch from M2 ending. --
if in_range m3; then
  if [[ -n "$M2_SHA_OVERRIDE" ]]; then
    m2_sha="$M2_SHA_OVERRIDE"
  else
    s="$(latest_codesearch_m2_state)"
    [[ -n "$s" ]] || { echo "[chain-cs] no codesearch m2-state.json — pass --m2-sha <sha>" >&2; exit 1; }
    m2_sha="$(state_val "$s" m2_ending_sha)"
  fi
  position "m3/$M3_SLUG" "$m2_sha"
  # Clear stale quality worktree/branch so the fork prompt lands clean.
  git -C "$SUT" worktree remove --force "$QUALITY_CWD" 2>/dev/null || true
  [[ -e "$QUALITY_CWD" ]] && rm -rf "$QUALITY_CWD"
  git -C "$SUT" branch -D m3/quality 2>/dev/null || true
  git -C "$SUT" worktree prune
  # M3 quality authors test-strategy-codesearch.
  wipe_skill test-strategy-codesearch
  # Stale-sibling wipe: clear m3/* and m4/* branches from prior runs so the
  # quality fork + the M4 leg below land on a clean slot (the m4 wipe runs
  # again below as the M4 leg's own pre-step; doing it here too is harmless).
  wipe_leg_branches m3
  wipe_leg_branches m4
  SCENARIO_MAIN="$HERE/scenarios/m3-main-codesearch.txt" \
  SCENARIO_QUALITY="$HERE/scenarios/m3-quality-codesearch.txt" \
    run_module m3 "$HERE/run-m3.sh" --main-cwd "$SUT" --quality-cwd "$QUALITY_CWD"
fi

# ---- M4: send-off. M3 writes no state.json; main side ends on the ADR -----
#       commit (current HEAD). Branch m4/<slug> from there.
if in_range m4; then
  position "m4/$CHAIN_SLUG" "$(git -C "$SUT" rev-parse --short HEAD)"
  # Stale-sibling wipe: any m4/<other-slug> from a previous run.
  wipe_leg_branches m4
  # Run-artifact wipe: task.md gets restored from M3's commit (it's tracked)
  # carrying stale Run coordinates from the previous run; clear it so the
  # agent's walk-and-send-off-1 writes a fresh file and commit-starting-point
  # writes a single Run coordinates block. plan.md is M5's; wipe it too in
  # case a previous M5 leaked it into the M4 fork.
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  SCENARIO="$HERE/scenarios/m4-codesearch.txt" \
    run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA. Scenario reads ---
#       the M4 branch from task.md Run coordinates (no positioning needed
#       here, only stale-worktree cleanup + m4-branch reconciliation).
if in_range m5; then
  # Read the LATEST Branch: line — `tail -1` is defense-in-depth against
  # the agent writing more than one Run coordinates block. The
  # wipe_run_artifacts task.md step in the M4 leg should prevent that,
  # but if a future prompt-shape regression appends a second block,
  # the latest one is the one written by THIS run's commit-starting-point.
  m4_rec="$(grep 'Branch:' "$SUT/task.md" 2>/dev/null | grep -oE 'm4/[a-z0-9-]+' | tail -1)"
  cur="$(git -C "$SUT" rev-parse --abbrev-ref HEAD)"
  if [[ -n "$m4_rec" && "$m4_rec" != "$cur" ]]; then
    echo "[chain-cs] reconciling m4 branch: $cur -> $m4_rec (task.md Run coordinates)"
    git -C "$SUT" branch -m "$cur" "$m4_rec"
  fi
  m5_slug="${m4_rec#m4/}"; m5_slug="${m5_slug:-$CHAIN_SLUG}"
  git -C "$SUT" worktree remove --force "$M5_WORKTREE" 2>/dev/null || true
  [[ -e "$M5_WORKTREE" ]] && rm -rf "$M5_WORKTREE"
  git -C "$SUT" branch -D "m5/$m5_slug" 2>/dev/null || true
  git -C "$SUT" worktree prune
  SCENARIO="$HERE/scenarios/m5-codesearch.txt" \
    run_module m5 "$HERE/run-m5.sh" --main-cwd "$SUT" --worktree-cwd "$M5_WORKTREE"
fi

# ---- M6: spot gaps + retrospective, in the M5 worktree (no new branch). ---
if in_range m6; then
  # M6 authors session-shaper-codesearch.
  wipe_skill session-shaper-codesearch
  SCENARIO="$HERE/scenarios/m6-codesearch.txt" \
    run_module m6 "$HERE/run-m6.sh" --cwd "$M5_WORKTREE" --task-slug "$CHAIN_SLUG"
fi

echo "[chain-cs] DONE range $FROM..$TO"

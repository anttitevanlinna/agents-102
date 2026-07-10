#!/usr/bin/env bash
# chain-picoshare.sh — drive the full AE101 M1–M6 tmux-runner chain on the
# picoshare SUT, end to end, from a clean baseline. Sibling of
# chain-lemmings.sh; same shape, picoshare defaults + scenarios.
#
# Usage:
#   chain-picoshare.sh                  # arrange, then m1..m6 (medium effort)
#   chain-picoshare.sh --to m1          # arrange + M1 only, then stop
#   chain-picoshare.sh --from m2        # RESUME at M2 (no arrange; reads the
#                                       #   newest picoshare m1-state.json for the SHA)
#   chain-picoshare.sh --from m3 --to m4
#   chain-picoshare.sh --effort high    # cohort-faithful (slower)
#
# Run it backgrounded — the chain is multi-hour (M4/M6 sends off can each run
# up to 1-2h). Each module logs to out/_chain-<m>-picoshare.log; per-run
# artefacts land in out/<run-id>/ as usual.
#
# picoshare-specific quirks (see playgrounds/picoshare.maintainer.md +
# IMPROVEMENTS.md "Caught 2026-05-27 picoshare M1-M6 full-chain audit"):
#   - M2 does NOT get its own branch — the scenario stays on m1/<slug>
#     throughout M2 (plan-mode, no repo commit). Every real picoshare
#     m2-state.json confirms m2_branch == m1/picoshare-01.
#   - M3 quality-lane worktree branch has been observed as both
#     `m3/picoshare-quality` (doc'd convention) and `m3/quality` (what an
#     agent actually named it once) — wipe both before the M3 leg.
#   - M5/M6 worktree lives at picoshare-m5 (not picoshare-m3-quality).
#
# VALIDATION STATUS (2026-07-10): written from the documented + historical
# picoshare run shape (playgrounds/picoshare.maintainer.md, IMPROVEMENTS.md
# picoshare entries, and every out/*/m{1,2,4,5,6}-state.json this SUT has
# produced) but not yet run through this wrapper end to end — validate
# module-by-module (--from mN --to mN) on first use, same caveat
# chain-lemmings.sh carried at its own first use.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT="${HOME}/Projects/picoshare"
EFFORT="medium"
FROM="m1"; TO="m6"
DO_ARRANGE="auto"                       # auto = arrange iff FROM==m1
M1_SLUG="picoshare-01"
M3_SLUG="rate-limit-public-guest-status"
CHAIN_SLUG="implement-public-status"    # M4/M5/M6 share this slug (branch convention)
QUALITY_CWD="${HOME}/Projects/picoshare-m3-quality"
M5_WORKTREE="${HOME}/Projects/picoshare-m5"

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

export CLAUDE_CMD="claude --model sonnet --effort $EFFORT --permission-mode auto"
export CLAUDE_RUNNER_TIMEOUT="${CLAUDE_RUNNER_TIMEOUT:-1800}"

mod_num() { echo "${1#m}"; }
in_range() { local n; n="$(mod_num "$1")"; [[ "$(mod_num "$FROM")" -le "$n" && "$n" -le "$(mod_num "$TO")" ]]; }

latest_picoshare_state() {              # $1=module (e.g. m1, m2)
  local f
  for f in $(ls -t "$HERE"/out/*/"$1-state.json" 2>/dev/null); do
    grep -q "\"${1}_cwd\": \"$SUT\"" "$f" && { echo "$f"; return; }
  done
}
state_val() { sed -n "s/.*\"$2\": *\"\([^\"]*\)\".*/\1/p" "$1" | head -1; }

run_module() {                          # $1=label, rest=command
  local label="$1"; shift
  echo "[chain-ps] === $label ===  $*"
  set +e
  "$@" 2>&1 | tee "$HERE/out/_chain-$label-picoshare.log"
  local rc=${PIPESTATUS[0]}
  set -e
  [[ $rc -eq 0 ]] || { echo "[chain-ps] FAIL $label (rc=$rc) — see out/_chain-$label-picoshare.log" >&2; exit "$rc"; }
}

position() {                            # $1=branch  $2=sha
  echo "[chain-ps] positioning $1 @ $2"
  git -C "$SUT" checkout -B "$1" "$2"
}

wipe_skill() {                          # $1=skill name
  local skill="$1"
  local path="$HOME/.claude/skills/$skill"
  if [[ -e "$path" ]]; then
    echo "[chain-ps] pre-wipe ~/.claude/skills/$skill (was $(stat -f '%Sm' "$path/SKILL.md" 2>/dev/null || echo unknown))"
    rm -rf "$path"
  fi
}

wipe_leg_branches() {                   # $1=leg prefix (e.g. "m4", "m5")
  local prefix="$1"
  local b
  while IFS= read -r b; do
    [[ -z "$b" ]] && continue
    [[ "$b" == "$(git -C "$SUT" rev-parse --abbrev-ref HEAD 2>/dev/null)" ]] && continue
    echo "[chain-ps] pre-wipe stale branch $b"
    git -C "$SUT" branch -D "$b" 2>/dev/null || true
  done < <(git -C "$SUT" for-each-ref --format='%(refname:short)' "refs/heads/${prefix}/" 2>/dev/null)
}

wipe_run_artifacts() {                  # $1=path under $SUT
  local rel="$1"
  local path="$SUT/$rel"
  if [[ -e "$path" ]]; then
    echo "[chain-ps] pre-wipe $rel (was $(stat -f '%Sm' "$path" 2>/dev/null || echo unknown))"
    rm -f "$path"
  fi
}

echo "[chain-ps] range $FROM..$TO  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s  model=sonnet"

# ---- arrange (M1 baseline) ----------------------------------------------
if { [[ "$DO_ARRANGE" == "auto" && "$FROM" == "m1" ]] || [[ "$DO_ARRANGE" == "yes" ]]; }; then
  run_module arrange "$HERE/arrange-picoshare.sh" --sut "$SUT" --slug "$M1_SLUG"
fi

# ---- M1: getting going + context. SUT on m1/<slug> @ 78080ce. -----------
if in_range m1; then
  SCENARIO="$HERE/scenarios/m1-picoshare.txt" \
    run_module m1 "$HERE/run-m1.sh" --cwd "$SUT" --task-slug "$M1_SLUG"
fi

# ---- M2: plan mode. picoshare STAYS on m1/<slug> — no new branch --------
#      (every real m2-state.json for this SUT shows m2_branch == m1/<slug>;
#      the plan is written to ~/.claude/plans/, not a repo commit).
if in_range m2; then
  s="$(latest_picoshare_state m1)"; [[ -n "$s" ]] || { echo "[chain-ps] no picoshare m1-state.json — can't confirm M2 baseline" >&2; exit 1; }
  cur="$(git -C "$SUT" rev-parse --abbrev-ref HEAD)"
  [[ "$cur" == "m1/$M1_SLUG" ]] || { echo "[chain-ps] WARN: expected to be on m1/$M1_SLUG for M2, currently on $cur" >&2; }
  SCENARIO="$HERE/scenarios/m2-picoshare.txt" \
    run_module m2 "$HERE/run-m2.sh" --cwd "$SUT" --task-slug "$M1_SLUG"
fi

# ---- M3: worktree fork + security/quality races. Branch from M2 ending. --
if in_range m3; then
  s="$(latest_picoshare_state m2)"; [[ -n "$s" ]] || { echo "[chain-ps] no picoshare m2-state.json — can't position M3" >&2; exit 1; }
  position "m3/$M3_SLUG" "$(state_val "$s" m2_ending_sha)"
  # the fork prompt creates the quality worktree — clear stale ones. Branch
  # name observed as EITHER m3/picoshare-quality (doc'd) or m3/quality
  # (what an agent actually named it once) — wipe both.
  git -C "$SUT" worktree remove --force "$QUALITY_CWD" 2>/dev/null || true
  [[ -e "$QUALITY_CWD" ]] && rm -rf "$QUALITY_CWD"
  git -C "$SUT" branch -D m3/picoshare-quality 2>/dev/null || true
  git -C "$SUT" branch -D m3/quality 2>/dev/null || true
  git -C "$SUT" worktree prune
  # M3 quality authors test-strategy-picoshare.
  wipe_skill test-strategy-picoshare
  wipe_leg_branches m3
  wipe_leg_branches m4
  SCENARIO_MAIN="$HERE/scenarios/m3-main-picoshare.txt" \
  SCENARIO_QUALITY="$HERE/scenarios/m3-quality-picoshare.txt" \
    run_module m3 "$HERE/run-m3.sh" --main-cwd "$SUT" --quality-cwd "$QUALITY_CWD"
fi

# ---- M4: send-off. M3 writes no state.json; main side ends on the ADR -----
#       commit (current HEAD). Branch m4/<slug> from there.
if in_range m4; then
  position "m4/$CHAIN_SLUG" "$(git -C "$SUT" rev-parse --short HEAD)"
  wipe_leg_branches m4
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  SCENARIO="$HERE/scenarios/m4-picoshare.txt" \
    run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA (scenario reads ---
#       it from task.md's Run coordinates — only clear stale worktree/branch
#       so the fork lands clean, plus reconcile as chain-lemmings.sh does).
if in_range m5; then
  m4_rec="$(grep 'Branch:' "$SUT/task.md" 2>/dev/null | grep -oE 'm4/[a-z0-9-]+' | tail -1)"
  m4_sp="$(git -C "$SUT" log --format='%h' --grep='^M4 starting point$' -1 2>/dev/null)"
  cur="$(git -C "$SUT" rev-parse --abbrev-ref HEAD)"
  if [[ -n "$m4_rec" && -n "$m4_sp" && "$m4_rec" != "$cur" ]]; then
    echo "[chain-ps] reconciling: point $m4_rec at M4 starting point $m4_sp (task.md-recorded branch)"
    git -C "$SUT" branch -f "$m4_rec" "$m4_sp"
  fi
  m5_slug="${m4_rec#m4/}"; m5_slug="${m5_slug:-$CHAIN_SLUG}"
  git -C "$SUT" worktree remove --force "$M5_WORKTREE" 2>/dev/null || true
  [[ -e "$M5_WORKTREE" ]] && rm -rf "$M5_WORKTREE"
  git -C "$SUT" branch -D "m5/$m5_slug" 2>/dev/null || true
  git -C "$SUT" worktree prune
  SCENARIO="$HERE/scenarios/m5-picoshare.txt" \
    run_module m5 "$HERE/run-m5.sh" --main-cwd "$SUT" --worktree-cwd "$M5_WORKTREE"
fi

# ---- M6: spot gaps + build the loop, in the M5 worktree (no new branch). --
if in_range m6; then
  # M6 authors session-shaper-picoshare.
  wipe_skill session-shaper-picoshare
  SCENARIO="$HERE/scenarios/m6-picoshare.txt" \
    run_module m6 "$HERE/run-m6.sh" --cwd "$M5_WORKTREE" --task-slug "$CHAIN_SLUG"
fi

echo "[chain-ps] DONE range $FROM..$TO"

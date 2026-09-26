#!/usr/bin/env bash
# chain-ae101.sh — drive the AE101 tmux-runner chain for one SUT kit and one
# cut of the training. One topology, per-SUT constants in the kit table below.
#
#   --sut-kit lemmings | picoshare | codesearch     (default lemmings)
#   --cut     full      prework → M1 … M6
#             northwind prework → M1, M2, M4, M5 — Northwind Team Track
#                       (registry key agentic-engineering-101-northwind): stock
#                       module files, M3 and M6 replaced by customer workshops,
#                       so M4 positions from M2's ending SHA instead of M3's ADR
#                       commit (training-architecture.md § Variant: Northwind)
#
# Usage:
#   chain-ae101.sh                                   # lemmings, full, arrange + m1..m6
#   chain-ae101.sh --from prework                    # arrange, prework, m1..m6
#   chain-ae101.sh --sut-kit picoshare --cut northwind
#   chain-ae101.sh --from m4 --chain-dir out/_chains/<id>   # resume: reads that chain's state
#   chain-ae101.sh --sut-kit codesearch --m2-sha <sha>      # codesearch has no arrange: starts at m3
#   chain-ae101.sh --model opus --effort high        # defaults: sonnet, medium
#   chain-ae101.sh --sut /path/to/repo               # override the kit's repo path
#
# Run it backgrounded — multi-hour. Module logs → out/_chain-<kit>-<cut>-<m>.log;
# per-run artefacts → out/<run-id>/. Chain state → out/_chains/<id>/
# (lib/chain.sh); ~/.claude/skills is restored to its pre-run snapshot on exit.
# Module sequence per kit × cut is pinned by tests/chain-fold.test.sh against
# the four per-SUT drivers this replaced (2026-09-26).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT_KIT="lemmings"; CUT="full"; SUT=""
EFFORT="medium"
MODEL="sonnet"                          # harness sessions run Sonnet unless --model says otherwise
CHAIN_DIR_ARG=""; M2_SHA_OVERRIDE=""
FROM=""; TO=""
DO_ARRANGE="auto"                       # auto = arrange iff FROM==prework|m1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --sut-kit) SUT_KIT="$2"; shift 2 ;;
    --cut) CUT="$2"; shift 2 ;;
    --from) FROM="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --chain-dir) CHAIN_DIR_ARG="$2"; shift 2 ;;
    --m2-sha) M2_SHA_OVERRIDE="$2"; shift 2 ;;
    --no-arrange) DO_ARRANGE="no"; shift ;;
    --arrange) DO_ARRANGE="yes"; shift ;;
    --sut) SUT="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

# ---- kit table -----------------------------------------------------------
# SCEN_SUFFIX "" = the bare scenarios/mN.txt (lemmings is the reference SUT
# they were written against). QUALITY_BRANCHES = what M3's fork may have
# named the quality branch on a previous run (picoshare has seen both).
case "$SUT_KIT" in
  lemmings)
    SUT_DEFAULT="${HOME}/Projects/lemmings"
    ARRANGE="$HERE/arrange-lemmings.sh"
    M1_SLUG="fix-hud-tally"
    M2_SLUG="add-levels-2-3"
    M3_SLUG="threat-model-share"
    CHAIN_SLUG="blocker-deadlock-terminal"   # M4/M5/M6 share this slug
    QUALITY_CWD="${HOME}/Projects/lemmings-m3-quality"
    QUALITY_BRANCHES="m3/quality"
    M5_WORKTREE="${HOME}/Projects/lemmings-m5"
    SCEN_SUFFIX=""
    ;;
  picoshare)
    SUT_DEFAULT="${HOME}/Projects/picoshare"
    ARRANGE="$HERE/arrange-picoshare.sh"
    M1_SLUG="picoshare-01"
    M2_SLUG=""                              # M2 stays on the M1 branch: plan-mode, no repo commit
    M3_SLUG="rate-limit-public-guest-status"
    CHAIN_SLUG="implement-public-status"
    QUALITY_CWD="${HOME}/Projects/picoshare-m3-quality"
    QUALITY_BRANCHES="m3/picoshare-quality m3/quality"
    M5_WORKTREE="${HOME}/Projects/picoshare-m5"
    SCEN_SUFFIX="-picoshare"
    ;;
  codesearch)
    SUT_DEFAULT="${HOME}/Projects/codesearch"
    ARRANGE=""                              # no arrange helper: can't start before M3 (full) / M4 (northwind)
    M1_SLUG="codesearch-01"
    M2_SLUG=""
    M3_SLUG="threat-model-csweb-bind"
    CHAIN_SLUG="clamp-show-to-roots"
    QUALITY_CWD="${HOME}/Projects/codesearch-m3-quality"
    QUALITY_BRANCHES="m3/quality"
    M5_WORKTREE="${HOME}/Projects/codesearch-m5"
    SCEN_SUFFIX="-codesearch"
    ;;
  *) echo "unknown --sut-kit: $SUT_KIT (want: lemmings | picoshare | codesearch)" >&2; exit 2 ;;
esac
SUT="${SUT:-$SUT_DEFAULT}"
[[ -d "$SUT" ]] || { echo "[chain] SUT not found: $SUT" >&2; exit 2; }

# ---- cut table -----------------------------------------------------------
case "$CUT" in
  full)      MODULES="prework m1 m2 m3 m4 m5 m6" ;;
  northwind) MODULES="prework m1 m2 m4 m5" ;;
  *) echo "unknown --cut: $CUT (want: full | northwind)" >&2; exit 2 ;;
esac
if [[ -z "$FROM" ]]; then
  if [[ -n "$ARRANGE" ]]; then FROM="m1"
  elif [[ "$CUT" == full ]]; then FROM="m3"
  else FROM="m4"; fi
fi
TO="${TO:-${MODULES##* }}"
for m in "$FROM" "$TO"; do
  [[ " $MODULES " == *" $m "* ]] || { echo "[chain] $m is not part of the $CUT cut ($MODULES)" >&2; exit 2; }
done
if [[ -z "$ARRANGE" ]] && [[ " prework m1 m2 " == *" $FROM "* ]]; then
  echo "[chain] --from $FROM not supported on the $SUT_KIT kit: no arrange helper exists (lemmings and picoshare have one). Start at $([[ $CUT == full ]] && echo m3 || echo m4) with --m2-sha or --chain-dir." >&2
  exit 2
fi

# Explicit chain state (lib/chain.sh): one chain dir per chain; each module's
# runner registers there; the next module reads it. Never the newest out/ run.
source "$HERE/lib/chain.sh"
chain_init "$HERE/out" "$CHAIN_DIR_ARG" >/dev/null || exit 2
echo "[chain] chain dir: $CLAUDE_RUNNER_CHAIN_DIR  (resume with --chain-dir this)"
chain_guard_skills          # ~/.claude/skills restored to this snapshot on any exit (lib/chain.sh)

export CLAUDE_CMD="claude --model $MODEL --effort $EFFORT --permission-mode auto"
# Medium effort finishes turns well under an hour; 1800s caps a hung turn
# without clipping a real one. M5's packaged send-off is the long pole.
export CLAUDE_RUNNER_TIMEOUT="${CLAUDE_RUNNER_TIMEOUT:-1800}"

mod_num() { case "$1" in prework) echo 0 ;; *) echo "${1#m}" ;; esac; }
in_range() {
  [[ " $MODULES " == *" $1 "* ]] || return 1
  local n; n="$(mod_num "$1")"
  [[ "$(mod_num "$FROM")" -le "$n" && "$n" -le "$(mod_num "$TO")" ]]
}

scen() {                                # $1=scenario stem -> path for this kit
  local p="$HERE/scenarios/$1$SCEN_SUFFIX.txt"
  [[ -f "$p" ]] || { echo "[chain] missing scenario for $SUT_KIT: $p" >&2; exit 2; }
  echo "$p"
}

latest_state() {                        # $1=module — THIS chain's state, never a guess
  local s; s="$(chain_state "$1")"
  if [[ -z "$s" ]]; then
    echo "[chain] no $1 state in $CLAUDE_RUNNER_CHAIN_DIR — resume with --chain-dir <the chain that ran $1>. Recent chains:" >&2
    chain_list_recent "$HERE/out" 5 >&2
    return 0
  fi
  echo "$s"
}
state_val() { sed -n "s/.*\"$2\": *\"\([^\"]*\)\".*/\1/p" "$1" | head -1; }

m2_ending_sha() {                       # --m2-sha wins; else this chain's M2 state
  if [[ -n "$M2_SHA_OVERRIDE" ]]; then echo "$M2_SHA_OVERRIDE"; return; fi
  local s; s="$(latest_state m2)"
  [[ -n "$s" ]] || { echo "[chain] no m2 state — pass --m2-sha <sha> or --chain-dir <a chain that ran m2 here>" >&2; return 1; }
  state_val "$s" m2_ending_sha
}

run_module() {                          # $1=label, rest=command
  local label="$1"; shift
  local log="$HERE/out/_chain-$SUT_KIT-$CUT-$label.log"
  echo "[chain] === $label ===  $*"
  set +e
  "$@" 2>&1 | tee "$log"
  local rc=${PIPESTATUS[0]}
  set -e
  [[ $rc -eq 0 ]] || { echo "[chain] FAIL $label (rc=$rc) — see $log" >&2; exit "$rc"; }
}

position() {                            # $1=branch  $2=sha
  echo "[chain] positioning $1 @ $2"
  git -C "$SUT" checkout -B "$1" "$2"
}

# Pre-wipe the leg's OWN authored-skill slot so the leg lands fresh. Skills
# persist across sweeps; an agent refuses to silently overwrite a working
# skill (M6 caught it via its new-skill assertion, M3 quality overwrote
# silently). Earlier legs' skills stay — M6 reads test-strategy-<sut>.
wipe_skill() {                          # $1=skill name
  local path="$HOME/.claude/skills/$1"
  if [[ -e "$path" ]]; then
    echo "[chain] pre-wipe ~/.claude/skills/$1 (was $(stat -f '%Sm' "$path/SKILL.md" 2>/dev/null || echo unknown))"
    rm -rf "$path"
  fi
}

# Pre-wipe stale m{3,4,5}/* sibling branches. The agent picks its own slug
# (task.md scope drives it, not the wrapper's positioning branch), so a stale
# sibling from an earlier run can collide with the M5-prep reconciliation.
wipe_leg_branches() {                   # $1=leg prefix (e.g. "m4")
  local b
  while IFS= read -r b; do
    [[ -z "$b" ]] && continue
    [[ "$b" == "$(git -C "$SUT" rev-parse --abbrev-ref HEAD 2>/dev/null)" ]] && continue
    echo "[chain] pre-wipe stale branch $b"
    git -C "$SUT" branch -D "$b" 2>/dev/null || true
  done < <(git -C "$SUT" for-each-ref --format='%(refname:short)' "refs/heads/$1/" 2>/dev/null)
}

# Pre-wipe task.md / plan.md: task.md is tracked and committed at "M4 starting
# point", so positioning M4 restores the PREVIOUS run's task.md with its Run
# coordinates (old branch, old transcript UUID); a stale block can survive
# below the fresh one and mislead M5's reconciliation.
wipe_run_artifacts() {                  # $1=path under $SUT
  local path="$SUT/$1"
  if [[ -e "$path" ]]; then
    echo "[chain] pre-wipe $1 (was $(stat -f '%Sm' "$path" 2>/dev/null || echo unknown))"
    rm -f "$path"
  fi
}

echo "[chain] kit=$SUT_KIT cut=$CUT range $FROM..$TO  model=$MODEL  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s"

# ---- arrange (M1 baseline) ----------------------------------------------
if [[ -n "$ARRANGE" ]] && { [[ "$DO_ARRANGE" == "auto" && ( "$FROM" == "m1" || "$FROM" == "prework" ) ]] || [[ "$DO_ARRANGE" == "yes" ]]; }; then
  run_module arrange "$ARRANGE" --sut "$SUT" --slug "$M1_SLUG"
fi

# ---- prework: AFTER arrange — arrange removes the -<sut> skills, and T2
#      re-installs the student ones. Writes nothing to the repo; replayable.
if in_range prework; then
  run_module prework "$HERE/run-prework.sh" --cwd "$SUT"
fi

# ---- M1: getting going + context. SUT on m1/<slug> from arrange. --------
if in_range m1; then
  SCENARIO="$(scen m1)" \
    run_module m1 "$HERE/run-m1.sh" --cwd "$SUT" --task-slug "$M1_SLUG"
fi

# ---- M2: plan mode. Branch from M1's ending SHA; kits whose M2 stays on ---
#       the M1 branch declare M2_SLUG="".
if in_range m2; then
  s="$(latest_state m1)"; [[ -n "$s" ]] || { echo "[chain] no m1 state — can't position M2" >&2; exit 1; }
  if [[ -n "$M2_SLUG" ]]; then
    position "m2/$M2_SLUG" "$(state_val "$s" m1_ending_sha)"
  else
    cur="$(git -C "$SUT" rev-parse --abbrev-ref HEAD)"
    [[ "$cur" == "m1/$M1_SLUG" ]] || echo "[chain] WARN: $SUT_KIT M2 expects m1/$M1_SLUG, currently on $cur" >&2
    echo "[chain] $SUT_KIT: M2 stays on the M1 branch (plan-mode, no repo commit) — no reposition"
  fi
  SCENARIO="$(scen m2)" \
    run_module m2 "$HERE/run-m2.sh" --cwd "$SUT" --task-slug "${M2_SLUG:-$M1_SLUG}"
fi

# ---- M3: worktree fork + security/quality races. Branch from M2 ending. --
if in_range m3; then
  position "m3/$M3_SLUG" "$(m2_ending_sha)"
  git -C "$SUT" worktree remove --force "$QUALITY_CWD" 2>/dev/null || true
  [[ -e "$QUALITY_CWD" ]] && rm -rf "$QUALITY_CWD"
  for b in $QUALITY_BRANCHES; do git -C "$SUT" branch -D "$b" 2>/dev/null || true; done
  git -C "$SUT" worktree prune
  wipe_skill "test-strategy-$SUT_KIT"        # M3 quality authors it
  wipe_leg_branches m3
  wipe_leg_branches m4
  SCENARIO_MAIN="$(scen m3-main)" SCENARIO_QUALITY="$(scen m3-quality)" \
    run_module m3 "$HERE/run-m3.sh" --main-cwd "$SUT" --quality-cwd "$QUALITY_CWD"
fi

# ---- M4: send-off. full: M3 writes no state.json and its main side ends on
#       the ADR commit, so branch from current HEAD. northwind: no M3 —
#       branch from M2's ending SHA, the way M2 branches from M1.
if in_range m4; then
  if [[ "$CUT" == full ]]; then m4_base="$(git -C "$SUT" rev-parse --short HEAD)"
  else m4_base="$(m2_ending_sha)"; fi
  position "m4/$CHAIN_SLUG" "$m4_base"
  wipe_leg_branches m4
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  SCENARIO="$(scen m4)" \
    run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA. M5's worktree-setup
#       reads task.md's recorded branch and greps "M4 starting point" on it;
#       the agent's branch name is its own choice and often differs from the
#       wrapper's. Point the recorded branch at that commit (branch -f: name-
#       agnostic, never collides with a stale sibling), unless it is checked
#       out. tail -1 = the latest Run coordinates block, if a prompt ever
#       appends instead of replacing.
if in_range m5; then
  m4_rec="$(grep 'Branch:' "$SUT/task.md" 2>/dev/null | grep -oE 'm4/[a-z0-9-]+' | tail -1 || true)"
  m4_sp="$(git -C "$SUT" log --format='%h' --grep='^M4 starting point$' -1 2>/dev/null || true)"
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
  SCENARIO="$(scen m5)" \
    run_module m5 "$HERE/run-m5.sh" --main-cwd "$SUT" --worktree-cwd "$M5_WORKTREE"
fi

# ---- M6: spot gaps + build the loop, in the M5 worktree (no new branch). --
if in_range m6; then
  wipe_skill "session-shaper-$SUT_KIT"       # M6 authors it
  SCENARIO="$(scen m6)" \
    run_module m6 "$HERE/run-m6.sh" --cwd "$M5_WORKTREE" --task-slug "$CHAIN_SLUG"
fi

echo "[chain] DONE kit=$SUT_KIT cut=$CUT range $FROM..$TO"

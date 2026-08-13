#!/usr/bin/env bash
# chain-northwind.sh — drive the Northwind Team Track cut of AE101
# (registry key `agentic-engineering-101-northwind`) through the tmux-runner
# chain on a SELECTED SUT.
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
# Differs from the stock chains in exactly one place: M3 never runs, so M4
# cannot inherit "current HEAD" (which in the stock chain is M3's ADR commit).
# It positions from M2's ending SHA instead — the same mechanism M2 already
# uses to position from M1. Nothing else about M1/M2/M4/M5 changes: same
# run-mN.sh scripts, same per-SUT scenarios, same prompts. M4's own content
# only audits "whatever you've built" (ADRs/skills/memory) generically — it
# does not hard-require M3's ADR to exist, and M5's packaged re-send degrades
# gracefully on a dropped M3 (confirmed live on lemmings 2026-07-28:
# verify-by-hand-judge found no test-strategy-<sut> skill and stood down).
#
# SUT kits (--sut-kit): lemmings (default) | picoshare | codesearch.
# A kit fixes the repo path, the branch slugs, the M5 worktree, the scenario
# suffix, and whether an arrange helper exists. codesearch has none, so it
# can't start at M1/M2 — same limitation chain-codesearch.sh carries.
#
# Usage:
#   chain-northwind.sh                            # lemmings: arrange, m1, m2, m4, m5
#   chain-northwind.sh --sut-kit picoshare        # same walk on picoshare
#   chain-northwind.sh --to m2                    # arrange + M1 + M2 only
#   chain-northwind.sh --from m4                  # RESUME at M4 (reads newest
#                                                 #   out/*/m2-state.json for the SHA)
#   chain-northwind.sh --effort high              # cohort-faithful (slower)
#   chain-northwind.sh --sut /path/to/repo        # override the kit's repo path
#
# Run it backgrounded — multi-hour even with M3/M6 skipped. Each module logs
# to out/_chain-<kit>-<m>.log; per-run artefacts land in out/<run-id>/.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SUT_KIT="lemmings"
SUT=""
EFFORT="medium"
FROM="m1"; TO="m5"
DO_ARRANGE="auto"                       # auto = arrange iff FROM==m1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --sut-kit) SUT_KIT="$2"; shift 2 ;;
    --from) FROM="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --no-arrange) DO_ARRANGE="no"; shift ;;
    --arrange) DO_ARRANGE="yes"; shift ;;
    --sut) SUT="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

# ---- kit config ----------------------------------------------------------
# SCEN_SUFFIX: "" means the bare scenarios/mN.txt (lemmings is the reference
# SUT those were written against); other kits carry their own -<kit> variants.
case "$SUT_KIT" in
  lemmings)
    SUT_DEFAULT="${HOME}/Projects/lemmings"
    ARRANGE="$HERE/arrange-lemmings.sh"
    M1_SLUG="fix-hud-tally"
    M2_SLUG="add-levels-2-3"
    CHAIN_SLUG="blocker-deadlock-terminal"
    M5_WORKTREE="${HOME}/Projects/lemmings-m5"
    SCEN_SUFFIX=""
    ;;
  picoshare)
    SUT_DEFAULT="${HOME}/Projects/picoshare"
    ARRANGE="$HERE/arrange-picoshare.sh"
    M1_SLUG="picoshare-01"
    # picoshare M2 stays on the M1 branch (plan-mode, no repo commit) — every
    # real picoshare m2-state.json confirms m2_branch == m1/picoshare-01.
    M2_SLUG=""
    CHAIN_SLUG="implement-public-status"
    M5_WORKTREE="${HOME}/Projects/picoshare-m5"
    SCEN_SUFFIX="-picoshare"
    ;;
  codesearch)
    SUT_DEFAULT="${HOME}/Projects/codesearch"
    ARRANGE=""                          # no arrange helper exists for this SUT
    M1_SLUG="codesearch-01"
    M2_SLUG=""
    CHAIN_SLUG="clamp-show-to-roots"
    M5_WORKTREE="${HOME}/Projects/codesearch-m5"
    SCEN_SUFFIX="-codesearch"
    ;;
  *)
    echo "unknown --sut-kit: $SUT_KIT (want: lemmings | picoshare | codesearch)" >&2
    exit 2
    ;;
esac
SUT="${SUT:-$SUT_DEFAULT}"

[[ -d "$SUT" ]] || { echo "[chain] SUT not found: $SUT" >&2; exit 2; }

scen() {                                # $1=module -> scenario path for this kit
  local p="$HERE/scenarios/$1$SCEN_SUFFIX.txt"
  [[ -f "$p" ]] || { echo "[chain] missing scenario for $SUT_KIT: $p" >&2; exit 2; }
  echo "$p"
}

if [[ -z "$ARRANGE" ]] && { [[ "$FROM" == "m1" ]] || [[ "$FROM" == "m2" ]]; }; then
  echo "[chain] --from $FROM not supported on the $SUT_KIT kit: no arrange helper exists (lemmings has arrange-lemmings.sh, picoshare has arrange-picoshare.sh). Position the repo by hand and start at m4." >&2
  exit 2
fi

export CLAUDE_CMD="claude --effort $EFFORT --permission-mode auto"
export CLAUDE_RUNNER_TIMEOUT="${CLAUDE_RUNNER_TIMEOUT:-1800}"

mod_num() { echo "${1#m}"; }
in_range() { local n; n="$(mod_num "$1")"; [[ "$(mod_num "$FROM")" -le "$n" && "$n" -le "$(mod_num "$TO")" ]]; }

# State lookup is SUT-scoped: out/ holds runs from every kit, so match the
# state file's own recorded cwd rather than taking the newest of any SUT.
latest_state() {                        # $1=module (m1, m2)
  local f
  for f in $(ls -t "$HERE"/out/*/"$1-state.json" 2>/dev/null); do
    grep -q "\"${1}_cwd\": \"$SUT\"" "$f" && { echo "$f"; return; }
  done
}
state_val() { sed -n "s/.*\"$2\": *\"\([^\"]*\)\".*/\1/p" "$1" | head -1; }

run_module() {                          # $1=label, rest=command
  local label="$1"; shift
  echo "[chain] === $label ===  $*"
  set +e
  "$@" 2>&1 | tee "$HERE/out/_chain-$SUT_KIT-northwind-$label.log"
  local rc=${PIPESTATUS[0]}
  set -e
  [[ $rc -eq 0 ]] || { echo "[chain] FAIL $label (rc=$rc) — see out/_chain-$SUT_KIT-northwind-$label.log" >&2; exit "$rc"; }
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

echo "[chain] northwind cut on kit=$SUT_KIT: range $FROM..$TO (M3, M6 not part of this topology)  effort=$EFFORT  sut=$SUT  timeout=${CLAUDE_RUNNER_TIMEOUT}s"

# ---- arrange (M1 baseline) ----------------------------------------------
if [[ -n "$ARRANGE" ]] && { [[ "$DO_ARRANGE" == "auto" && "$FROM" == "m1" ]] || [[ "$DO_ARRANGE" == "yes" ]]; }; then
  run_module arrange "$ARRANGE" --sut "$SUT" --slug "$M1_SLUG"
fi

# ---- M1: getting going + context. SUT already on m1/<slug> from arrange. --
if in_range m1; then
  SCENARIO="$(scen m1)" \
    run_module m1 "$HERE/run-m1.sh" --cwd "$SUT" --task-slug "$M1_SLUG"
fi

# ---- M2: plan mode. Branch from M1's ending SHA (kits whose M2 stays on ---
#       the M1 branch declare M2_SLUG="" and skip the reposition).
if in_range m2; then
  s="$(latest_state m1)"; [[ -n "$s" ]] || { echo "[chain] no m1-state.json for $SUT — can't position M2" >&2; exit 1; }
  if [[ -n "$M2_SLUG" ]]; then
    position "m2/$M2_SLUG" "$(state_val "$s" m1_ending_sha)"
  else
    echo "[chain] $SUT_KIT: M2 stays on the M1 branch (plan-mode, no repo commit) — no reposition"
  fi
  SCENARIO="$(scen m2)" \
    run_module m2 "$HERE/run-m2.sh" --cwd "$SUT" --task-slug "${M2_SLUG:-$M1_SLUG}"
fi

# ---- M3 (earn-the-trust) intentionally absent: Northwind's cut drops it. -
# No worktree fork, no ADR, no test-strategy-<sut> skill.

# ---- M4: send-off. No M3 commit to inherit — position from M2's ending ---
#       SHA directly (M2 makes no repo commit itself; plan-mode only, so
#       this is the same SHA M2 started from — read via m2-state.json for
#       parity with how M2 positions from M1, and so this leg keeps working
#       if that ever stops being true).
if in_range m4; then
  s="$(latest_state m2)"; [[ -n "$s" ]] || { echo "[chain] no m2-state.json for $SUT — can't position M4" >&2; exit 1; }
  position "m4/$CHAIN_SLUG" "$(state_val "$s" m2_ending_sha)"
  wipe_leg_branches m4
  wipe_run_artifacts task.md
  wipe_run_artifacts plan.md
  SCENARIO="$(scen m4)" \
    run_module m4 "$HERE/run-m4.sh" --cwd "$SUT" --task-slug "$CHAIN_SLUG"
fi

# ---- M5: worktree fork from the "M4 starting point" SHA (the scenario -----
#       reads it from task.md's Run coordinates — no positioning needed here,
#       only clear stale worktree/branch so the fork lands clean). This leg
#       doesn't know or care whether M3 ran.
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
  SCENARIO="$(scen m5)" \
    run_module m5 "$HERE/run-m5.sh" --main-cwd "$SUT" --worktree-cwd "$M5_WORKTREE"
fi

# ---- M6 (spot-gaps-build-the-loop) intentionally absent: Northwind's cut -
# stops at M5; a customer-authored workshop replaces it.

echo "[chain] DONE range $FROM..$TO (northwind cut, kit=$SUT_KIT)"

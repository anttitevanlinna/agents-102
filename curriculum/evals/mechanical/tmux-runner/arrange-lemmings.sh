#!/usr/bin/env bash
# arrange-lemmings.sh — reset the lemmings SUT to the M1 baseline for a clean
# full M1–M6 tmux-runner chain. Idempotent and reversible (timestamped backup).
#
# Why this exists: run-m{1..6}.sh each snapshot whatever HEAD/worktree state
# they find — they do NOT reset. The baseline prep between a finished chain and
# a fresh one was tribal knowledge. This script is that knowledge, encoded.
#
# A clean M1 baseline here (decided 2026-05-25, see lemmings-chain-runbook.md):
#   - code tree at bdd0919 (Initial commit) — the HUD 'Out' bug unfixed — on a
#     fresh m1/<slug> branch. (102241b is the prior dry-run's M1 fix; we redo it.)
#   - NO personal CLAUDE.local.md. The canonical M1-start baseline this file
#     once pointed at (.residue-archive/CLAUDE.local.md.preserved-2026-05-24)
#     was deleted, so we take the fresh first-student baseline: M1's
#     compound-and-close recreates the file. The compounded copy is backed up.
#   - no leftover M3/M5 worktrees (they block the M3 fork + M5 worktree-setup).
#   - the deterministic per-SUT skills (test-strategy-lemmings,
#     session-shaper-lemmings, and the legacy plan-gap-finder-lemmings) absent
#     at user scope, so M3/M6 author them clean. Prior versions backed up.
#
# Usage: arrange-lemmings.sh [--sut ~/Projects/lemmings] [--slug fix-hud-tally]
#
# Reverse a run: everything removed lands under the printed backup dir; the
# tail of the output prints the exact restore commands.
set -euo pipefail

SUT="${HOME}/Projects/lemmings"
SLUG="fix-hud-tally"
M1_SHA="bdd0919"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --sut)  SUT="$2";  shift 2 ;;
    --slug) SLUG="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

ts="$(date +%Y%m%d-%H%M%S)"
backup="${HOME}/Projects/lemmings-chain-backup/${ts}"
mkdir -p "$backup/skills"

echo "[arrange] SUT=$SUT  slug=m1/$SLUG  baseline=$M1_SHA"
echo "[arrange] backup: $backup"

# 0. sanity ----------------------------------------------------------------
[[ -d "$SUT/.git" ]] || { echo "[arrange] FAIL: $SUT is not a git repo" >&2; exit 1; }
git -C "$SUT" cat-file -e "${M1_SHA}^{commit}" 2>/dev/null \
  || { echo "[arrange] FAIL: $M1_SHA not found in $SUT" >&2; exit 1; }

# Record the pre-arrange ref state so a human can find prior-run SHAs later.
git -C "$SUT" branch -vv > "$backup/branches-before.txt" 2>/dev/null || true
git -C "$SUT" worktree list > "$backup/worktrees-before.txt" 2>/dev/null || true

# 0b. kill stale runner sessions on the DEFAULT socket ONLY ----------------
#     CRITICAL multi-agent rule: runners now use PER-RUNNER sockets
#     (`tmux -L runner-<run_id>` via lib/tmux.sh) precisely for ISOLATION — a
#     session on a `runner-*` socket may be a LIVE concurrent run (another
#     agent's codesearch/picoshare sweep). Do NOT enumerate or kill across
#     those sockets; that defeats the isolation they exist for. (An earlier
#     version of this script did, and killed a parallel agent's running M3.)
#     Only the legacy default socket can hold a truly-orphaned pre-sockets
#     session that contends with nothing — clean just those, by name.
if command -v tmux >/dev/null 2>&1; then
  for s in $(tmux ls 2>/dev/null | sed -n 's/^\(runner-[^:]*\):.*/\1/p'); do
    tmux kill-session -t "$s" 2>/dev/null && echo "[arrange] killed stale default-socket session $s"
  done
fi

# 1. fresh CLAUDE.local.md baseline (back up + remove) ----------------------
if [[ -f "$SUT/CLAUDE.local.md" ]]; then
  cp -p "$SUT/CLAUDE.local.md" "$backup/CLAUDE.local.md"
  rm -f "$SUT/CLAUDE.local.md"
  echo "[arrange] CLAUDE.local.md -> backup (removed; M1 recreates it)"
else
  echo "[arrange] CLAUDE.local.md already absent"
fi

# 2. per-SUT skills absent so M3/M6 author them clean ----------------------
for sk in test-strategy-lemmings session-shaper-lemmings plan-gap-finder-lemmings; do
  d="${HOME}/.claude/skills/$sk"
  if [[ -d "$d" ]]; then
    cp -Rp "$d" "$backup/skills/$sk"
    rm -rf "$d"
    echo "[arrange] skill $sk -> backup (removed)"
  fi
done

# 3. prune the worktrees that block the M3 fork + M5 worktree-setup ---------
#    (lemmings-m5-prior is left alone — M5 creates lemmings-m5, not -prior.)
git -C "$SUT" worktree prune
for wt in lemmings-m3-quality lemmings-m5; do
  wtpath="${HOME}/Projects/$wt"
  if git -C "$SUT" worktree list --porcelain | grep -qx "worktree $wtpath"; then
    git -C "$SUT" worktree remove --force "$wtpath" \
      && echo "[arrange] worktree $wt removed"
  fi
  if [[ -e "$wtpath" ]]; then            # stray dir not registered as a worktree
    mv "$wtpath" "$backup/$wt-stray"
    echo "[arrange] stray dir $wt -> backup"
  fi
done
git -C "$SUT" worktree prune

# 4. reset code to the M1 baseline on a fresh branch -----------------------
#    -B force-resets m1/<slug> if a prior run left it. Reversible via reflog
#    (the prior tip is in branches-before.txt).
git -C "$SUT" checkout -B "m1/$SLUG" "$M1_SHA"
echo "[arrange] $SUT now on m1/$SLUG @ $(git -C "$SUT" rev-parse --short HEAD)"

# 5. verify the baseline ----------------------------------------------------
dirty="$(git -C "$SUT" status --porcelain || true)"
if [[ -n "$dirty" ]]; then
  echo "[arrange] WARN: working tree not clean after reset:" >&2
  echo "$dirty" >&2
else
  echo "[arrange] working tree clean (ignored files preserved)"
fi
# The Stop-hook settings are gitignored, so the checkout keeps them — but a
# fresh SUT may never have had them installed.
if [[ -f "$SUT/.claude/settings.local.json" ]]; then
  echo "[arrange] Stop hook present (.claude/settings.local.json)"
else
  echo "[arrange] NOTE: no Stop hook — run ./install-sut.sh $SUT before the chain"
fi

cat <<EOF
[arrange] DONE.
[arrange] reverse this run:
[arrange]   cp "$backup/CLAUDE.local.md" "$SUT/"            # if it was removed
[arrange]   cp -R "$backup"/skills/* ~/.claude/skills/       # if skills were removed
[arrange]   (prior branch tips: $backup/branches-before.txt)
EOF

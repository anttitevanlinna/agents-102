#!/usr/bin/env bash
# arrange-picoshare.sh — reset the picoshare SUT to the M1 baseline for a
# clean full M1–M6 tmux-runner chain. Idempotent and reversible (timestamped
# backup). Sibling of arrange-lemmings.sh; same shape, picoshare specifics.
#
# Why this exists: run-m{1..6}.sh each snapshot whatever HEAD/worktree state
# they find — they do NOT reset. This script encodes the baseline prep,
# same as arrange-lemmings.sh does for the lemmings SUT.
#
# A clean M1 baseline here (per playgrounds/picoshare.maintainer.md):
#   - code tree at 78080ce (pristine — master's parent of upstream #761, the
#     real auth-bypass fix; bug is naturally present in upstream history,
#     no amendment) — on a fresh m1/<slug> branch.
#   - NO personal CLAUDE.local.md — M1's compound-and-close recreates it.
#   - no leftover M3-quality/M5 worktrees (they block the M3 fork + M5
#     worktree-setup).
#   - the deterministic per-SUT skills (test-strategy-picoshare,
#     session-shaper-picoshare) absent at user scope, so M3/M6 author them
#     clean. Prior versions backed up.
#
# Usage: arrange-picoshare.sh [--sut ~/Projects/picoshare] [--slug picoshare-01]
#
# Reverse a run: everything removed lands under the printed backup dir; the
# tail of the output prints the exact restore commands.
set -euo pipefail

SUT="${HOME}/Projects/picoshare"
SLUG="picoshare-01"
M1_SHA="78080ce"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --sut)  SUT="$2";  shift 2 ;;
    --slug) SLUG="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

ts="$(date +%Y%m%d-%H%M%S)"
backup="${HOME}/Projects/picoshare-chain-backup/${ts}"
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
#     CRITICAL multi-agent rule: runners use PER-RUNNER sockets
#     (`tmux -L runner-<run_id>` via lib/tmux.sh) precisely for ISOLATION — a
#     session on a `runner-*` socket may be a LIVE concurrent run (another
#     agent's lemmings/codesearch sweep). Do NOT enumerate or kill across
#     those sockets. Only the legacy default socket can hold a truly-orphaned
#     pre-sockets session that contends with nothing — clean just those.
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
for sk in test-strategy-picoshare session-shaper-picoshare; do
  d="${HOME}/.claude/skills/$sk"
  if [[ -d "$d" ]]; then
    cp -Rp "$d" "$backup/skills/$sk"
    rm -rf "$d"
    echo "[arrange] skill $sk -> backup (removed)"
  fi
done

# 3. prune the worktrees that block the M3 fork + M5 worktree-setup ---------
git -C "$SUT" worktree prune
for wt in picoshare-m3-quality picoshare-m5; do
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

# 3b. clear a dirty SUT tree so the baseline checkout can't abort ----------
#     Same rationale as arrange-lemmings.sh: `git checkout -B` aborts on
#     uncommitted tracked changes; snapshot to backup (reversible), then
#     hard-reset + clean. `clean -fd` (no -x) respects .gitignore, so the
#     Stop hook (gitignored .claude/settings.local.json) is preserved.
if [[ -n "$(git -C "$SUT" status --porcelain)" ]]; then
  git -C "$SUT" diff HEAD > "$backup/sut-dirty.patch" 2>/dev/null || true
  git -C "$SUT" ls-files --others --exclude-standard > "$backup/sut-untracked.txt" 2>/dev/null || true
  git -C "$SUT" reset --hard -q HEAD
  git -C "$SUT" clean -fdq
  echo "[arrange] dirty SUT tree reset (diff -> $backup/sut-dirty.patch; gitignored files kept)"
fi

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
[arrange]   git -C "$SUT" apply "$backup/sut-dirty.patch"    # if a dirty tree was reset
[arrange]   (prior branch tips: $backup/branches-before.txt)
EOF

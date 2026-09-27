#!/usr/bin/env bash
# pair-worktree.sh — one public + one private-core worktree per workstream.
#
#   scripts/pair-worktree.sh <pair-root> <branch> [<from-ref>]
#
# Run from any public checkout. Creates <pair-root>/agents-102 on <branch> and
# <pair-root>/agents-102-core on <branch>-core, both from <from-ref> (default
# main). The matching folder names make the tracked ../agents-102-core links
# resolve inside the pair, so the pair's traces never reach another checkout.
# Don't add a second public worktree to the same folder: it would share the
# core (scripts/core-pairing.js reports it; bind-trace.js refuses to write).
set -euo pipefail

root="${1:?usage: pair-worktree.sh <pair-root> <branch> [<from-ref>]}"
branch="${2:?usage: pair-worktree.sh <pair-root> <branch> [<from-ref>]}"
from="${3:-main}"

public="$(git rev-parse --show-toplevel)"
public="$(git -C "$public" worktree list --porcelain | sed -n '1s/^worktree //p')"
core="${AGENTS_CORE_DIR:-$public/../agents-102-core}"
[[ -d "$core/.git" || -f "$core/.git" ]] || { echo "pair-worktree: no core checkout at $core (set AGENTS_CORE_DIR)" >&2; exit 1; }

if [[ -e "$root" && -n "$(ls -A "$root")" ]]; then
  echo "pair-worktree: $root is not empty — a pair root holds one pair and nothing else" >&2
  exit 1
fi
mkdir -p "$root"
root="$(cd "$root" && pwd -P)"

git -C "$public" worktree add -q "$root/agents-102" -b "$branch" "$from"
git -C "$core" worktree add -q "$root/agents-102-core" -b "$branch-core" "$from"

node "$root/agents-102/scripts/core-pairing.js" "$root/agents-102" 2>/dev/null \
  || node "$(dirname "$0")/core-pairing.js" "$root/agents-102"
echo "pair ready: $root/agents-102 ($branch) + $root/agents-102-core ($branch-core)"
echo "start Claude from $root/agents-102 — its settings grant ../agents-102-core"

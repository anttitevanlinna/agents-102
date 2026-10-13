#!/usr/bin/env bash
# overlay-workspace.sh — judge a customer overlay (AGENTS_OVERLAY_DIR) with the
# normal eval machinery. Evals need a real tree: judges read files, the queue
# diffs git pins, the stamper writes Quality lines. So the overlay is judged in
# a paired public+core worktree on branch overlay/<customer>.
#
#   scripts/overlay-workspace.sh sync    <overlay-dir> <pair-root> <customer>
#   scripts/overlay-workspace.sh harvest <overlay-dir> <pair-root>
#
# sync     makes the pair (scripts/pair-worktree.sh) or updates it: merges our
#          main (-X ours: on a conflict the workspace side stands), copies the
#          overlay's curriculum files over it (the overlay wins outright), puts
#          back saved results from <overlay>/evals/{instances,sim-cache}, commits.
#          Run from the vendor checkout the pair belongs to.
# harvest  copies back into the overlay what the evals left: each overlay file
#          as it now stands in the pair (Quality lines included), and every
#          instance and trace the pair's branches changed since our main.
#
# Keep the pair between runs: Quality pins name its commits, so a fresh pair
# re-judges what the old one had already passed.
set -euo pipefail

cmd="${1:?usage: overlay-workspace.sh sync|harvest <overlay-dir> <pair-root> [customer]}"
overlay="$(cd "${2:?overlay dir}" && pwd -P)"
root="${3:?pair root}"
here="$(cd "$(dirname "$0")" && pwd -P)"

# The overlay's curriculum files: everything but training.json (build-only),
# the lock (build-only) and evals/ (results, restored separately).
overlay_files() {
  (cd "$overlay" && find . -type f ! -name overlay.lock.json ! -name training.json ! -path './evals/*' ! -path '*/.*' | sed 's|^\./||' | sort)
}

commit_if_changed() {   # <repo> <message>
  git -C "$1" add -A
  git -C "$1" diff --cached --quiet || git -C "$1" commit -qm "$2"
}

case "$cmd" in
  sync)
    customer="${4:?customer name}"
    branch="overlay/$customer"
    if [[ ! -d "$root/agents-102" ]]; then
      bash "$here/pair-worktree.sh" "$root" "$branch" main >/dev/null
    else
      git -C "$root/agents-102" merge -q -X ours --no-edit main
      git -C "$root/agents-102-core" merge -q -X ours --no-edit main
    fi
    root="$(cd "$root" && pwd -P)"
    ws="$root/agents-102"; core="$root/agents-102-core"
    vendor="$(git rev-parse --show-toplevel)"
    if [[ -d "$vendor/node_modules" && ! -e "$ws/node_modules" ]]; then
      ln -s "$vendor/node_modules" "$ws/node_modules"
      # .gitignore's node_modules/ matches a directory, not this link.
      ex="$(git -C "$ws" rev-parse --git-common-dir)/info/exclude"
      mkdir -p "$(dirname "$ex")"; grep -qx '/node_modules' "$ex" 2>/dev/null || echo '/node_modules' >> "$ex"
    fi
    while IFS= read -r rel; do
      mkdir -p "$(dirname "$ws/curriculum/$rel")"
      cp "$overlay/$rel" "$ws/curriculum/$rel"
    done < <(overlay_files)
    if [[ -d "$overlay/evals/instances" ]]; then cp "$overlay/evals/instances/"* "$ws/curriculum/evals/instances/"; fi
    if [[ -d "$overlay/evals/sim-cache" ]]; then mkdir -p "$core/evals/sim-cache"; cp "$overlay/evals/sim-cache/"* "$core/evals/sim-cache/"; fi
    commit_if_changed "$core" "overlay $customer: saved traces"
    commit_if_changed "$ws" "overlay $customer: applied from $overlay"
    echo "workspace ready: $ws ($branch). Run the eval flow there (eval-sweep args.repo/args.core = this pair), then: overlay-workspace.sh harvest $overlay $root"
    ;;
  harvest)
    root="$(cd "$root" && pwd -P)"
    ws="$root/agents-102"; core="$root/agents-102-core"
    while IFS= read -r rel; do
      cp "$ws/curriculum/$rel" "$overlay/$rel"
    done < <(overlay_files)
    n=0
    while IFS= read -r f; do
      [[ -f "$ws/$f" ]] || continue
      mkdir -p "$overlay/evals/instances"; cp "$ws/$f" "$overlay/evals/instances/"; n=$((n + 1))
    done < <(git -C "$ws" diff --name-only "$(git -C "$ws" merge-base main HEAD)" HEAD -- curriculum/evals/instances)
    while IFS= read -r f; do
      [[ -f "$core/$f" ]] || continue
      mkdir -p "$overlay/evals/sim-cache"; cp "$core/$f" "$overlay/evals/sim-cache/"; n=$((n + 1))
    done < <(git -C "$core" diff --name-only "$(git -C "$core" merge-base main HEAD)" HEAD -- evals/sim-cache)
    echo "harvested $(overlay_files | wc -l | tr -d ' ') overlay files and $n eval records into $overlay"
    ;;
  *) echo "overlay-workspace.sh: unknown command $cmd (sync|harvest)" >&2; exit 2 ;;
esac

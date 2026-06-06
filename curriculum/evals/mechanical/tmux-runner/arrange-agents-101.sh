#!/usr/bin/env bash
# arrange-agents-101.sh — reset the synthetic Agents 101 training dir to a
# clean prework baseline and stage the synthetic source material.
#
# Unlike AE101/lemmings (per-module git worktrees), Agents 101 is ONE growing
# training directory. "Arrange" = wipe it, drop in the starter tarball (the
# student extracts it in prework T1), install the Stop-hook, and stage the
# synthetic persona corpus where the M2 ingest turn will pull from.
#
# Reversible: any pre-existing training dir is moved to a timestamped backup,
# not deleted. Restore command is printed at the end.
#
# Usage: arrange-agents-101.sh [--cwd DIR] [--material DIR]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE" && git rev-parse --show-toplevel)"
KIT="$HERE/fixtures/agents-101-synthetic"

sut_cwd="$HOME/Documents/agents-101-runner"
material_dir="$HOME/Documents/agents-101-runner-material"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd) sut_cwd="$2"; shift 2 ;;
    --material) material_dir="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

ts="$(date +%Y%m%d-%H%M%S)"
backup_root="$HOME/Documents/agents-101-runner-backup/$ts"

strip_comments() { perl -0777 -pe 's/<!--.*?-->\s*//s' "$1"; }

# ---- Back up + wipe prior state -----------------------------------------
for d in "$sut_cwd" "$material_dir"; do
  if [[ -e "$d" ]]; then
    mkdir -p "$backup_root"
    echo "[arrange] backing up $d -> $backup_root/"
    mv "$d" "$backup_root/"
  fi
done
mkdir -p "$sut_cwd" "$material_dir"

# ---- Build + drop the starter tarball (prework T1 extracts it) ----------
echo "[arrange] building starter tarball: scripts/build-agents-101-starter-tarball.sh"
( cd "$REPO_ROOT" && ./scripts/build-agents-101-starter-tarball.sh ) >/dev/null
tarball="$REPO_ROOT/agents-101-starter.tar.gz"
[[ -f "$tarball" ]] || { echo "[arrange] FAIL: build produced no $tarball" >&2; exit 1; }
cp "$tarball" "$sut_cwd/agents-101-starter.tar.gz"
echo "[arrange] staged tarball in $sut_cwd"

# ---- Install the runner's Stop hook into the training dir ----------------
"$HERE/install-sut.sh" "$sut_cwd"

# ---- Stage the synthetic source material (M2 ingest pulls from here) ------
# The corpus is staged by simulated provenance so the M2 ingest exercises all
# three branches of the prompt's report (fetched / linked-by-path / not
# reachable), not just the local-file branch (finding C3):
#   wiki/   -> simulated Confluence connector (content saved)
#   docs/   -> simulated OneDrive connector  (content saved)
#   local/  -> a genuine local file on the laptop (linked by path, no content)
#   (open-web source is a REAL live crawl of a16z, named in the scenario)
#   (the O365 email bucket-3 source is unreachable: named, never staged)
# The churn counter-case is held in new/ for the Phase 3 compound turn so it has
# a genuinely new source. Comments stripped so the files read like real exports.
mkdir -p "$material_dir/wiki" "$material_dir/docs" "$material_dir/web" "$material_dir/local" "$material_dir/new" "$material_dir/new-m3"
strip_comments "$KIT/sources/wiki/pricing-strategy-2026.md" > "$material_dir/wiki/pricing-strategy-2026.md"
strip_comments "$KIT/sources/wiki/pilot-cohort-notes.md"    > "$material_dir/wiki/pilot-cohort-notes.md"
strip_comments "$KIT/sources/docs/q2-revenue-review.md"     > "$material_dir/docs/q2-revenue-review.md"
strip_comments "$KIT/local/board-paper-draft.md"           > "$material_dir/local/board-paper-draft.md"
strip_comments "$KIT/sources/web/usage-based-pricing-playbook.md" > "$material_dir/web/usage-based-pricing-playbook.md"
strip_comments "$KIT/sources/web/usage-pricing-churn-warning.md"  > "$material_dir/new/usage-pricing-churn-warning.md"
# M3 seam: a fresh practitioner postmortem (Halvorsen) held in new-m3/, out of
# the M2 ingest, so it is genuinely new when the M3 internet retriever fetches it.
strip_comments "$KIT/sources-m3/usage-pricing-postmortems-2026.md" > "$material_dir/new-m3/usage-pricing-postmortems-2026.md"
strip_comments "$KIT/meetings-week.md" > "$material_dir/meetings-week.md"

echo "[arrange] staged material in $material_dir:"
find "$material_dir" -type f | sed 's/^/  /'

echo
echo "[arrange] DONE. Training dir: $sut_cwd"
[[ -d "$backup_root" ]] && echo "[arrange] restore prior state: rm -rf '$sut_cwd' '$material_dir' && mv '$backup_root'/* '$HOME/Documents/'"
echo "[arrange] next: ./run-a101.sh --module prework --cwd '$sut_cwd' --material '$material_dir'"

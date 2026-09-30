#!/usr/bin/env bash
# arrange-em.sh — reset the Leading agentic engineering runner's training dir
# (chain-em.sh) to a clean M1 baseline: the manager's own notes on their team, and the runner's
# Stop hook. Like Agents 101, the mock is ONE growing training dir; each module
# runs a fresh claude session in it.
#
# Reversible: a pre-existing training dir is moved to a timestamped backup, not
# deleted. Restore command is printed at the end.
#
# Usage: arrange-em.sh [--cwd DIR]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/em-runner"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd) sut_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

backup_root="$HOME/Documents/em-runner-backup/$(date +%Y%m%d-%H%M%S)"
if [[ -e "$sut_cwd" ]]; then
  mkdir -p "$backup_root"
  echo "[arrange] backing up $sut_cwd -> $backup_root/"
  mv "$sut_cwd" "$backup_root/"
fi
mkdir -p "$sut_cwd"

cp "$HERE/fixtures/em-synthetic/team-notes.md" "$sut_cwd/team-notes.md"
"$HERE/install-sut.sh" "$sut_cwd"

echo "[arrange] DONE. Training dir: $sut_cwd"
[[ -d "$backup_root" ]] && echo "[arrange] restore prior state: rm -rf '$sut_cwd' && mv '$backup_root'/* '$(dirname "$sut_cwd")/'"
echo "[arrange] next: ./chain-em.sh --no-arrange --cwd '$sut_cwd'"

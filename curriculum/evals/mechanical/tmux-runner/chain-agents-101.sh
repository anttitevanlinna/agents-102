#!/usr/bin/env bash
# chain-agents-101.sh — arrange, then drive Agents 101 prework through M8 in
# one growing training dir (fresh claude session per module, same cwd).
#
# PURPOSE (read this): the assertions are the floor, not the point. This chain
# exists to surface SUBTLE AND LARGE PROBLEMS in the prompts and the student
# experience — surprises, mismatches, and broken prompt PROGRESSIONS (where one
# prompt's output doesn't cleanly feed the next, or a prompt assumes state the
# prior turn never produced). Every per-turn prompt + transcript is kept under
# out/. After a green-or-red run, read the transcripts against the prompt
# sequence and log findings in a101-runner-findings.md.
#
# Scenarios cover all eight modules, including a synthetic M7 recipient and a
# held-back M8 peer room. The chain runs
# LIVE end to end so each module builds on the prior module's real on-disk
# output — no entry-state seeding, because the cross-module handoff seams are
# exactly what this runner exists to catch. Default --to stays m2 (the validated
# floor); pass --to m3, m4a, m4b, m5, m6, m7, or m8 to extend the live run.
#
# Usage: chain-agents-101.sh [--from prework|m1|m2|m3|m4a|m4b|m5|m6|m7|m8] [--to ...] [--runtime cli|codex-cli] [--no-arrange]
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/agents-101-runner"
material_dir="$HOME/Documents/agents-101-runner-material"
from="prework"; to="m2"; do_arrange=1; runtime="cli"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) from="$2"; shift 2 ;;
    --to) to="$2"; shift 2 ;;
    --no-arrange) do_arrange=0; shift ;;
    --cwd) sut_cwd="$2"; shift 2 ;;
    --material) material_dir="$2"; shift 2 ;;
    --runtime) runtime="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done
case "$runtime" in
  cli|codex-cli) ;;
  *) echo "unknown Agents 101 runner runtime: $runtime (expected cli or codex-cli)" >&2; exit 2 ;;
esac

modules=(prework m1 m2 m3 m4a m4b m5 m6 m7 m8)
in_range=0
selected=()
for m in "${modules[@]}"; do
  [[ "$m" == "$from" ]] && in_range=1
  [[ $in_range -eq 1 ]] && selected+=("$m")
  [[ "$m" == "$to" ]] && break
done
[[ ${#selected[@]} -gt 0 ]] || { echo "empty module range ($from..$to)" >&2; exit 2; }

if [[ $do_arrange -eq 1 ]]; then
  echo "[chain] arranging…"
  "$HERE/arrange-agents-101.sh" --cwd "$sut_cwd" --material "$material_dir"
fi

for m in "${selected[@]}"; do
  echo "==================== [chain] module $m ===================="
  if ! "$HERE/run-a101.sh" --module "$m" --runtime "$runtime" --cwd "$sut_cwd" --material "$material_dir"; then
    echo "[chain] STOP: module $m failed. Training dir left as-is for inspection: $sut_cwd" >&2
    exit 1
  fi
done

echo "[chain] PASS slice: ${selected[*]} — training dir: $sut_cwd"
echo "[chain] now read transcripts under out/ for prompt/progression findings → a101-runner-findings.md"

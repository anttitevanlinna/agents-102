#!/usr/bin/env bash
# chain-agents-101.sh — arrange, then drive Agents 101 prework -> M1 -> M2 in
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
# Vertical slice: prework + M1 + M2. M3-M8 deferred (M8 explicitly OUT — needs
# a synthetic peer room).
#
# Slice grows as modules land: prework + M1 + M2 + M3 (… M4-M6 next). M7/M8
# deferred (M8 explicitly OUT — needs a synthetic peer room). The chain runs
# LIVE end to end so each module builds on the prior module's real on-disk
# output — no entry-state seeding, because the cross-module handoff seams are
# exactly what this runner exists to catch. Default --to stays m2 (the validated
# floor); pass --to m3 to extend once M3 is confirmed green.
#
# Usage: chain-agents-101.sh [--from prework|m1|m2|m3] [--to ...] [--no-arrange]
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/agents-101-runner"
material_dir="$HOME/Documents/agents-101-runner-material"
from="prework"; to="m2"; do_arrange=1
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) from="$2"; shift 2 ;;
    --to) to="$2"; shift 2 ;;
    --no-arrange) do_arrange=0; shift ;;
    --cwd) sut_cwd="$2"; shift 2 ;;
    --material) material_dir="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

modules=(prework m1 m2 m3 m4a m4b m5 m6)
in_range=0
selected=()
for m in "${modules[@]}"; do
  [[ "$m" == "$from" ]] && in_range=1
  [[ $in_range -eq 1 ]] && selected+=("$m")
  [[ "$m" == "$to" ]] && break
done
[[ ${#selected[@]} -gt 0 ]] || { echo "empty module range ($from..$to)" >&2; exit 2; }

# H2-harness: m4a installs a skill into the operator's REAL ~/.claude/skills/.
# Auth can't be isolated to a scratch $HOME on this setup — a fresh HOME comes up
# "Not logged in" (keychain login isn't inherited; see FIX-PLAN H2-harness).
# Maintainer's call: don't isolate, clean up post-run. Snapshot pre-existence now
# so the trap removes ONLY a skill THIS run created, never an operator skill that
# happens to share the name. The trap fires on any exit, incl. a failed module.
H2_SKILL_DIR="$HOME/.claude/skills/security-audit"
h2_runs_m4a=0
for m in "${selected[@]}"; do [[ "$m" == "m4a" ]] && h2_runs_m4a=1; done
h2_skill_preexisted=0
[[ -e "$H2_SKILL_DIR" ]] && h2_skill_preexisted=1
h2_cleanup() {
  [[ $h2_runs_m4a -eq 1 ]] || return 0
  if [[ $h2_skill_preexisted -eq 1 ]]; then
    echo "[chain] H2: left $H2_SKILL_DIR in place — it pre-existed this run, not ours to remove." >&2
    return 0
  fi
  if [[ -e "$H2_SKILL_DIR" ]]; then
    rm -rf "$H2_SKILL_DIR"
    echo "[chain] H2: removed runner-installed $H2_SKILL_DIR — operator skills dir left clean." >&2
  fi
}
trap h2_cleanup EXIT

if [[ $do_arrange -eq 1 ]]; then
  echo "[chain] arranging…"
  "$HERE/arrange-agents-101.sh" --cwd "$sut_cwd" --material "$material_dir"
fi

for m in "${selected[@]}"; do
  echo "==================== [chain] module $m ===================="
  if ! "$HERE/run-a101.sh" --module "$m" --cwd "$sut_cwd" --material "$material_dir"; then
    echo "[chain] STOP: module $m failed. Training dir left as-is for inspection: $sut_cwd" >&2
    exit 1
  fi
done

echo "[chain] PASS slice: ${selected[*]} — training dir: $sut_cwd"
echo "[chain] now read transcripts under out/ for prompt/progression findings → a101-runner-findings.md"

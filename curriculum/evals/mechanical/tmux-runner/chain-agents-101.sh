#!/usr/bin/env bash
# chain-agents-101.sh — arrange, then drive Agents 101 prework through M6 in
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
# Scenarios exist through M6. M7 is not yet modeled; M8 is explicitly out
# because it needs a synthetic peer room. The chain runs
# LIVE end to end so each module builds on the prior module's real on-disk
# output — no entry-state seeding, because the cross-module handoff seams are
# exactly what this runner exists to catch. Default --to stays m2 (the validated
# floor); pass --to m3, m4a, m4b, m5, or m6 to extend the live run.
#
# Resume: a --from past prework reads the prior module's state from the chain
# that ran it (--chain-dir) and checks it was THIS training dir; it never
# arranges, because arranging moves the dir's prior modules to a backup.
#
# Usage: chain-agents-101.sh [--from prework|m1|m2|m3|m4a|m4b|m5|m6] [--to ...]
#          [--chain-dir DIR] [--no-arrange | --arrange] [--cwd DIR] [--material DIR]
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/agents-101-runner"
material_dir="$HOME/Documents/agents-101-runner-material"
from="prework"; to="m2"; do_arrange=""
chain_dir_arg=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) from="$2"; shift 2 ;;
    --chain-dir) chain_dir_arg="$2"; shift 2 ;;
    --to) to="$2"; shift 2 ;;
    --no-arrange) do_arrange=0; shift ;;
    --arrange) do_arrange=1; shift ;;
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

prior=""                                # the module $from builds on
for m in "${modules[@]}"; do [[ "$m" == "$from" ]] && break; prior="$m"; done
if [[ -z "$do_arrange" ]]; then [[ -z "$prior" ]] && do_arrange=1 || do_arrange=0; fi
if [[ -n "$prior" && $do_arrange -eq 1 ]]; then
  echo "[chain] --arrange with --from $from would move $prior's work out of $sut_cwd — start at prework to arrange" >&2; exit 2
fi

# User-scope skills: m4a installs security-audit into the operator's REAL
# ~/.claude/skills/ (a scratch $HOME comes up "Not logged in" — keychain login
# isn't inherited; FIX-PLAN H2-harness), so the run can't be isolated. The
# chain guard snapshots the dir and restores it on any exit: a skill this run
# created is removed, one that pre-existed is left as it was.
source "$HERE/lib/chain.sh"
chain_init "$HERE/out" "$chain_dir_arg" >/dev/null || exit 2
echo "[chain] chain dir: $CLAUDE_RUNNER_CHAIN_DIR  (resume with --chain-dir this)"

if [[ -n "$prior" ]]; then               # declared prior state, or stop
  st="$(chain_state "a101-$prior")"
  if [[ -z "$st" ]]; then
    echo "[chain] $from builds on $prior and this chain has no $prior state — resume with --chain-dir <the chain that ran $prior>, or start at $prior. Recent chains:" >&2
    chain_list_recent "$HERE/out" 5 >&2; exit 1
  fi
  st_cwd="$(sed -n 's/.*"cwd": *"\([^"]*\)".*/\1/p' "$st" | head -1)"
  if [[ "$st_cwd" != "$sut_cwd" || ! -d "$sut_cwd" ]]; then
    echo "[chain] $prior ran in ${st_cwd:-an unrecorded dir}, not $sut_cwd — pass --cwd $st_cwd or start at $prior" >&2; exit 1
  fi
  echo "[chain] resuming on $prior state: $st"
fi
source "$HERE/lib/tmux.sh"
claude_cli_preflight "${CLAUDE_CMD:-claude --permission-mode auto}" || exit 2   # before arrange moves anything

chain_guard_skills          # ~/.claude/skills restored to this snapshot on any exit (lib/chain.sh)

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

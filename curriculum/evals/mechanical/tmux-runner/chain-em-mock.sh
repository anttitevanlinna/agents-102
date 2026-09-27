#!/usr/bin/env bash
# chain-em-mock.sh — arrange, then drive the Engineering Manager mock (M1 → M2)
# in one growing training dir, a fresh claude session per module.
#
# The mock proves a new training runs on the canonical engine, not a new one:
# chain state (lib/chain.sh), CLI preflight before arrange, ~/.claude/skills
# guard, and resume points that read declared prior state or stop.
#
# Resume: --from m2 reads M1's state from the chain that ran it (--chain-dir)
# and checks it was THIS training dir; it never arranges, because arranging
# moves the dir's prior work to a backup.
#
# Usage: chain-em-mock.sh [--from m1|m2] [--to m1|m2] [--chain-dir DIR]
#          [--no-arrange | --arrange] [--cwd DIR]
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/em-mock-runner"
from="m1"; to="m2"; do_arrange=""; chain_dir_arg=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from) from="$2"; shift 2 ;;
    --to) to="$2"; shift 2 ;;
    --chain-dir) chain_dir_arg="$2"; shift 2 ;;
    --no-arrange) do_arrange=0; shift ;;
    --arrange) do_arrange=1; shift ;;
    --cwd) sut_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

modules=(m1 m2)
selected=() in_range=0 prior=""
for m in "${modules[@]}"; do
  [[ "$m" == "$from" ]] && in_range=1
  [[ $in_range -eq 0 ]] && prior="$m"
  [[ $in_range -eq 1 ]] && selected+=("$m")
  [[ "$m" == "$to" ]] && break
done
[[ ${#selected[@]} -gt 0 && $in_range -eq 1 ]] || { echo "empty module range ($from..$to)" >&2; exit 2; }
if [[ -z "$do_arrange" ]]; then [[ -z "$prior" ]] && do_arrange=1 || do_arrange=0; fi
if [[ -n "$prior" && $do_arrange -eq 1 ]]; then
  echo "[chain] --arrange with --from $from would move $prior's work out of $sut_cwd — start at m1 to arrange" >&2; exit 2
fi

source "$HERE/lib/chain.sh"
chain_init "$HERE/out" "$chain_dir_arg" >/dev/null || exit 2
echo "[chain] chain dir: $CLAUDE_RUNNER_CHAIN_DIR  (resume with --chain-dir this)"
if [[ -n "$prior" ]]; then               # declared prior state, or stop
  st="$(chain_require_prior "em-mock-$prior" "$from" "$sut_cwd" "$HERE/out")" || exit 1
  echo "[chain] resuming on $prior state: $st"
fi
source "$HERE/lib/tmux.sh"
claude_cli_preflight "${CLAUDE_CMD:-claude --permission-mode auto}" || exit 2   # before arrange moves anything
chain_guard_skills          # ~/.claude/skills restored to this snapshot on any exit (lib/chain.sh)

if [[ $do_arrange -eq 1 ]]; then
  echo "[chain] arranging…"
  "$HERE/arrange-em-mock.sh" --cwd "$sut_cwd"
fi

for m in "${selected[@]}"; do
  echo "==================== [chain] module $m ===================="
  if ! "$HERE/run-em.sh" --module "$m" --cwd "$sut_cwd"; then
    echo "[chain] STOP: module $m failed. Training dir left as-is for inspection: $sut_cwd" >&2
    exit 1
  fi
done
echo "[chain] PASS slice: ${selected[*]} — training dir: $sut_cwd"

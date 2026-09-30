#!/usr/bin/env bash
# chain-em.sh — arrange, then drive Leading agentic engineering (key
# engineering-management, M1 → M4) in one growing training dir, a fresh claude
# session per module (run-em.sh --training em). Same engine as the EM mock
# (chain-em-mock.sh): chain state, CLI preflight before arrange, skills guard,
# resume only from declared prior state.
#
# The week between sittings is synthetic: after module N, fixtures/em-synthetic/
# week-N/ is laid into the training dir (observations after M1, the team's
# answers after M2, a coalition conversation after M3), plus the sample peer
# export as peers/sample.md after M2. A week never overwrites a file the run
# already wrote (lay_absent; BSD cp -n exits 1 on a skip, which set -e reads as
# failure). It is laid after mN even when the slice stops there, so a
# later --from m(N+1) resumes on it.
#
# Usage: chain-em.sh [--from m1..m4] [--to m1..m4] [--chain-dir DIR]
#          [--no-arrange | --arrange] [--cwd DIR]
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

sut_cwd="$HOME/Documents/em-runner"
WEEKS="$HERE/fixtures/em-synthetic"
SAMPLE_PEER="${EM_SAMPLE_PEER:-$HERE/../../../trainings/engineering-management/sample-peer-export.md}"
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

modules=(m1 m2 m3 m4)
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
  st="$(chain_require_prior "em-$prior" "$from" "$sut_cwd" "$HERE/out")" || exit 1
  echo "[chain] resuming on $prior state: $st"
fi
source "$HERE/lib/tmux.sh"
claude_cli_preflight "${CLAUDE_CMD:-claude --permission-mode auto}" || exit 2   # before arrange moves anything
chain_guard_skills          # ~/.claude/skills restored to this snapshot on any exit (lib/chain.sh)

if [[ $do_arrange -eq 1 ]]; then
  echo "[chain] arranging…"
  "$HERE/arrange-em.sh" --cwd "$sut_cwd"
fi

# Copy every file under $1 into $2 that $2 does not already have.
lay_absent() {
  local f
  while IFS= read -r f; do
    [[ -e "$2/$f" ]] && continue
    mkdir -p "$(dirname "$2/$f")"; cp "$1/$f" "$2/$f"
  done < <(cd "$1" && find . -type f ! -name README.md | sed 's#^\./##')
}

for m in "${selected[@]}"; do
  echo "==================== [chain] module $m ===================="
  if ! "$HERE/run-em.sh" --training em --module "$m" --cwd "$sut_cwd"; then
    echo "[chain] STOP: module $m failed. Training dir left as-is for inspection: $sut_cwd" >&2
    exit 1
  fi
  week="$WEEKS/week-${m#m}"
  if [[ -d "$week" ]]; then
    echo "[chain] a week passes: laying $(basename "$week") into the training dir"
    lay_absent "$week" "$sut_cwd"
  fi
  if [[ "$m" == m2 ]]; then
    [[ -f "$SAMPLE_PEER" ]] || { echo "[chain] STOP: no sample peer export at $SAMPLE_PEER" >&2; exit 1; }
    mkdir -p "$sut_cwd/peers"; [[ -e "$sut_cwd/peers/sample.md" ]] || cp "$SAMPLE_PEER" "$sut_cwd/peers/sample.md"
  fi
done
echo "[chain] PASS slice: ${selected[*]} — training dir: $sut_cwd"

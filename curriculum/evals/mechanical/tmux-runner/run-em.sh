#!/usr/bin/env bash
# run-em.sh — drive one Engineering Manager mock module against the synthetic
# manager kit (fixtures/em-mock-synthetic/: Linnea Voss and her eight-person
# payments team at the fictional Halvard Freight).
#
# The mock is the smallest training that proves a new training runs on the
# canonical engine: two modules, one registry prompt each, ONE growing training
# dir with a fresh claude session per module (the Agents 101 shape). Same libs
# as every runner: pane_start (CLI preflight), wait_for_turn (stall detection +
# auto-resend, background-agent settle), per-turn artifact assertions, chain
# registration, ~/.claude/skills guard.
#
# Deliverables are knowledge artifacts, not commits, so assertions are
# file-exists + grep-evidence + mtime-advanced.
#
# Usage: run-em.sh --module {m1|m2} [--cwd DIR]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/chain.sh"
source "$HERE/lib/assertions.sh"

module=""
sut_cwd="$HOME/Documents/em-mock-runner"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --module) module="$2"; shift 2 ;;
    --cwd)    sut_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

case "$module" in
  m1|m2) ;;
  *) echo "usage: $0 --module {m1|m2} [--cwd DIR]" >&2; exit 2 ;;
esac
[[ -f "$sut_cwd/team-notes.md" ]] || { echo "missing $sut_cwd/team-notes.md (run arrange-em-mock.sh first)" >&2; exit 2; }
scenario="$HERE/scenarios/em-mock-$module.txt"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

memory="$sut_cwd/team-leadership.md"
# Everyone in team-notes.md with enough written about them to place.
PEOPLE=(Aleksi Petra Jonas Sofia Tuomas Ingrid Mikko)

# Body of one `## <heading>` section of the memory (heading match is loose).
# Level-aware: a `### Aleksi` inside Team Knowledge stays in the section.
section() {
  awk -v h="$1" '/^#+ / { match($0, /^#+/); l = RLENGTH
                          if (on && l <= lvl) on = 0
                          if (!on && tolower($0) ~ tolower(h)) { on = 1; lvl = l } }
                 on' "$memory"
}

assert_turn() {
  local mod="$1" seq="$2" t="$3" base="$4" fail=0
  case "$mod:$seq" in
    m1:1)
      assert_file_exists "m1 T1 leadership memory" "$memory" || return 1
      local h
      for h in "team knowledge" "decision journal" "quality gate"; do
        grep -qiE "^#+ .*$h" "$memory" || { echo "[assert] FAIL m1 T1: no '$h' section in team-leadership.md" >&2; fail=1; }
      done
      local p missing=""
      for p in "${PEOPLE[@]}"; do section "team knowledge" | grep -q "$p" || missing="$missing $p"; done
      [[ -z "$missing" ]] || { echo "[assert] FAIL m1 T1: Team Knowledge does not place:$missing" >&2; fail=1; }
      section "team knowledge" | grep -qiE 'desire|ability|reinforcement' \
        || { echo "[assert] FAIL m1 T1: no ADKAR stage named in Team Knowledge" >&2; fail=1; }
      section "team knowledge" | grep -qiE 'hypothes' \
        || { echo "[assert] FAIL m1 T1: no entry tagged as a hypothesis (tiering missing)" >&2; fail=1; }
      # Mimi has one line of notes: placing her on ADKAR is a guess.
      assert_or_warn assert_scrollback_grep "m1 T1 thin notes named (Mimi)" "$memory" 'Mimi[^.]*(thin|not enough|too little|can.t place|unknown|no evidence|insufficient)'
      [[ $fail -eq 0 ]] && echo "[assert] PASS m1 T1: memory has three sections; Team Knowledge places all ${#PEOPLE[@]} people on ADKAR with tiers"
      return $fail ;;
    m2:1)
      assert_file_exists "m2 T1 starter questions" "$sut_cwd/starter-questions.md" || return 1
      local q; q="$(grep -c '?' "$sut_cwd/starter-questions.md")"
      [[ "$q" -ge 5 ]] || { echo "[assert] FAIL m2 T1: $q questions in starter-questions.md (want 5–10)" >&2; fail=1; }
      assert_file_mtime_advanced "m2 T1 memory updated" "$memory" "$base" || fail=1
      section "decision journal" | grep -qiE 'on the table|alternativ|instead|rejected|trade|give up' \
        || { echo "[assert] FAIL m2 T1: Decision Journal has no logged pick with alternatives" >&2; fail=1; }
      [[ "$(section "quality gate" | grep -cvE '^\s*(#|$)')" -ge 1 ]] \
        || { echo "[assert] FAIL m2 T1: Quality Gate is still empty" >&2; fail=1; }
      [[ $fail -eq 0 ]] && echo "[assert] PASS m2 T1: $q starter questions; pick journaled with alternatives; a Quality Gate check added"
      return $fail ;;
    *) echo "[em] no assertion configured for $mod:$seq" >&2; return 1 ;;
  esac
}

# Tests source this file for the assertions alone (tests/em-mock.test.sh).
[[ -n "${RUN_EM_SOURCE_ONLY:-}" ]] && return 0

# No human to approve tool calls. bypassPermissions is banned (startup dialog
# hangs the runner — README § Env knobs).
CLAUDE_CMD="${CLAUDE_CMD:-claude --permission-mode auto}"

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/em-mock-$module-$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"
run_register "em-mock-$module" "$run_dir"        # .module for prune; chain pointer if chained
runner_guard_skills "$run_dir"          # standalone: ~/.claude/skills restored in cleanup()

session="runner-$run_id"
timeout="${CLAUDE_RUNNER_TIMEOUT:-1800}"

echo "[em] module=$module cwd=$sut_cwd run=$run_id"
pane_start "$session" "$sut_cwd" "env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir $CLAUDE_CMD"
sleep "${CLAUDE_RUNNER_WARMUP:-10}"

cleanup() {
  pane_capture_safe "$session" "$run_dir/transcript.txt" 10 || true
  pane_kill "$session"
  runner_restore_skills
}
trap cleanup EXIT

lines=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  lines+=("$line")
done < "$scenario"
echo "[em] turns=${#lines[@]}"

seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))
  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
  else
    key="${line%%[[:space:]]*}" tail=""
    [[ "$line" == *[[:space:]]* ]] && { tail="${line#*[[:space:]]}"; tail="${tail#"${tail%%[![:space:]]*}"}"; }
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi
  echo "[em] turn=$seq: ${body:0:70}..."
  base=$(( $(date +%s) - 2 ))            # mtime baseline; 2s back guards same-second writes
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"   # auto-resend reads it
  pane_send_text "$session" "$body"
  if ! wait_for_turn "$sentinel_dir" "$seq" "$timeout" "$session"; then
    echo "[em] FAIL turn=$seq (sentinel timeout/pane-death after ${timeout}s) — see $run_dir" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"
  if ! assert_turn "$module" "$seq" "$run_dir/turn-$seq.transcript.txt" "$base"; then
    echo "[em] FAIL turn=$seq assertion — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

state="$run_dir/em-mock-$module-state.json"      # = the registered name, so chain_state finds it
{
  printf '{\n  "run_id": "%s",\n  "module": "%s",\n  "cwd": "%s",\n  "turns": %s,\n  "artifacts_present": [' "$run_id" "$module" "$sut_cwd" "$seq"
  first=1
  for a in team-leadership.md starter-questions.md; do
    [[ -e "$sut_cwd/$a" ]] || continue
    [[ $first -eq 0 ]] && printf ','; first=0
    printf '\n    "%s"' "$a"
  done
  printf '\n  ]\n}\n'
} > "$state"
echo "[em] PASS module=$module turns=$seq — out: $run_dir"

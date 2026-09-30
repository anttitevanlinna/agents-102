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
# --training em drives Leading agentic engineering (key engineering-management,
# M1-M4) on the same kit. Its prompts are generated, so each prompt turn is
# checked against the prompt's own registry contract (assert_contract: every
# `produces:` location exists, one was written this turn) and each module ends
# on a few claims the training rests on (assert_module_end). chain-em.sh lays the
# synthetic weeks in between modules.
#
# Usage: run-em.sh [--training mock|em] --module {m1|m2|m3|m4} [--cwd DIR]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/chain.sh"
source "$HERE/lib/assertions.sh"

module="" training="mock" sut_cwd=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --training) training="$2"; shift 2 ;;
    --module) module="$2"; shift 2 ;;
    --cwd)    sut_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

case "$training:$module" in
  mock:m1|mock:m2) name="em-mock-$module"; arranger=arrange-em-mock.sh; : "${sut_cwd:=$HOME/Documents/em-mock-runner}" ;;
  em:m1|em:m2|em:m3|em:m4) name="em-$module"; arranger=arrange-em.sh; : "${sut_cwd:=$HOME/Documents/em-runner}" ;;
  *) echo "usage: $0 [--training mock|em] --module {m1|m2 (mock) | m1..m4 (em)} [--cwd DIR]" >&2; exit 2 ;;
esac
scenario="$HERE/scenarios/$name.txt"

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

# $1=person. Her entry (the line naming her and the two after it) says the
# notes are too thin rather than placing her.
thin_notes_named() {
  section "team knowledge" | grep -A2 "$1" \
    | grep -qiE "thin|not enough|too little|can.t place|unknown|no evidence|insufficient"
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
      if thin_notes_named Mimi; then echo "[assert] PASS m1 T1: thin notes on Mimi named, not guessed"
      else echo "[assert] WARN m1 T1: Mimi placed without saying her notes are too thin to place" >&2; fi
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


# ---- --training em: contract + module-end checks ----------------------------
REGISTRY_DIR="${PROMPT_REGISTRY:-$HERE/../../../prompts}"

# Locations a prompt's frontmatter declares under produces:, one per line,
# with <placeholder> segments turned into a glob.
produced_locations() {
  awk 'NR==1 && /^---/ { fm=1; next } fm && /^---/ { exit }
       fm && /^[a-z]/ { inprod = ($0 ~ /^produces:/) }
       fm && inprod && /location:/ { sub(/.*location:[ \t]*/, ""); gsub(/<[^>]*>/, "*"); print }' \
    "$REGISTRY_DIR/$1.md" | sort -u
}

# $1=prompt key $2=mtime baseline. Every produced location exists (a folder
# non-empty); at least one of them was written this turn. A prompt may declare
# a location it only sometimes rewrites, so "every one advanced" would fail the
# run that behaved best.
assert_contract() {
  local key="$1" base="$2" loc path fresh=0 fail=0 n=0
  while IFS= read -r loc; do
    [[ -z "$loc" ]] && continue; n=$((n + 1))
    if [[ "$loc" == */ ]]; then
      path="$sut_cwd/$loc"
      if [[ -d "$path" && -n "$(ls -A "$path")" ]]; then
        [[ -n "$(find "$path" -type f -newermt "@$base" 2>/dev/null | head -1)" ]] && fresh=1
      else echo "[assert] FAIL $key: produced folder $loc missing or empty" >&2; fail=1; fi
    else
      local hits=() f
      for f in "$sut_cwd"/$loc; do [[ -f "$f" ]] && hits+=("$f"); done
      if [[ ${#hits[@]} -eq 0 ]]; then echo "[assert] FAIL $key: produced file $loc missing" >&2; fail=1
      else for f in "${hits[@]}"; do [[ $(stat -f %m "$f" 2>/dev/null || stat -c %Y "$f") -ge $base ]] && fresh=1; done; fi
    fi
  done < <(produced_locations "$key")
  [[ $n -gt 0 ]] || { echo "[assert] FAIL $key: declares no produces: location" >&2; return 1; }
  [[ $fresh -eq 1 ]] || { echo "[assert] FAIL $key: wrote none of the $n location(s) it declares" >&2; fail=1; }
  [[ $fail -eq 0 ]] && echo "[assert] PASS $key: all $n produced location(s) present, written this turn"
  return $fail
}

# $1=module. The claims the training rests on, checked once per module.
assert_module_end() {
  local fail=0 p missing=""
  case "$1" in
    m1)
      local h
      for h in "team knowledge" "decision journal" "quality gate"; do
        grep -qiE "^#+ .*$h" "$memory" || { echo "[assert] FAIL m1 end: no '$h' block" >&2; fail=1; }
      done
      for p in "${PEOPLE[@]}"; do section "team knowledge" | grep -q "$p" || missing="$missing $p"; done
      [[ -z "$missing" ]] || { echo "[assert] FAIL m1 end: Team Knowledge does not place:$missing" >&2; fail=1; }
      section "team knowledge" | grep -qi 'hypothes' || { echo "[assert] FAIL m1 end: no hypothesis tier" >&2; fail=1; } ;;
    m2)
      [[ $(grep -c '?' "$sut_cwd/questions.md" 2>/dev/null || echo 0) -ge 5 ]] || { echo "[assert] FAIL m2 end: fewer than 5 questions in questions.md" >&2; fail=1; } ;;
    m3)
      [[ $(section "team knowledge" | grep -ci 'crux') -ge 2 ]] || { echo "[assert] FAIL m3 end: Team Knowledge holds fewer than two crux" >&2; fail=1; } ;;
    m4)
      [[ -s "$sut_cwd/intent.md" ]] || { echo "[assert] FAIL m4 end: no intent.md" >&2; fail=1; }
      [[ -n "$(find "$sut_cwd/creation" -type f 2>/dev/null | head -1)" ]] || { echo "[assert] FAIL m4 end: creation/ is empty" >&2; fail=1; } ;;
  esac
  [[ $fail -eq 0 ]] && echo "[assert] PASS $1 end"
  return $fail
}

# Tests source this file for the assertions alone (tests/em-mock.test.sh, em-training.test.sh).
[[ -n "${RUN_EM_SOURCE_ONLY:-}" ]] && return 0

[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }
[[ -f "$sut_cwd/team-notes.md" ]] || { echo "missing $sut_cwd/team-notes.md (run $arranger first)" >&2; exit 2; }

# No human to approve tool calls. bypassPermissions is banned (startup dialog
# hangs the runner — README § Env knobs).
CLAUDE_CMD="${CLAUDE_CMD:-claude --permission-mode auto}"

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/$name-$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"
run_register "$name" "$run_dir"        # .module for prune; chain pointer if chained
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
  if [[ "$training" == em ]]; then
    if [[ "$line" != \** ]] && ! assert_contract "$key" "$base"; then
      echo "[em] FAIL turn=$seq contract ($key) — see $run_dir/turn-$seq.transcript.txt" >&2
      exit 1
    fi
  elif ! assert_turn "$module" "$seq" "$run_dir/turn-$seq.transcript.txt" "$base"; then
    echo "[em] FAIL turn=$seq assertion — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

if [[ "$training" == em ]] && ! assert_module_end "$module"; then
  echo "[em] FAIL module end $module — see $run_dir" >&2
  exit 1
fi

state="$run_dir/$name-state.json"      # = the registered name, so chain_state finds it
{
  printf '{\n  "run_id": "%s",\n  "module": "%s",\n  "cwd": "%s",\n  "turns": %s,\n  "artifacts_present": [' "$run_id" "$module" "$sut_cwd" "$seq"
  first=1
  for a in team-leadership.md starter-questions.md questions.md shortlists.md peer-export.md intent.md rehearsal.md creation; do
    [[ -e "$sut_cwd/$a" ]] || continue
    [[ $first -eq 0 ]] && printf ','; first=0
    printf '\n    "%s"' "$a"
  done
  printf '\n  ]\n}\n'
} > "$state"
echo "[em] PASS module=$module turns=$seq — out: $run_dir"

#!/usr/bin/env bash
set -euo pipefail

CODEX_TRANSPORT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEX_RUNNER_DIR="$(cd "$CODEX_TRANSPORT_DIR/.." && pwd)"
source "$CODEX_RUNNER_DIR/lib/codex-home.sh"

_codex_status_field() {
  node -e 'const v=require(process.argv[1]); process.stdout.write(String(v[process.argv[2]] ?? ""));' "$1" "$2"
}

_codex_reclassify() {
  local status_file="$1" failure_class="$2" exit_code="${3:-}"
  node - "$status_file" "$failure_class" "$exit_code" <<'NODE'
const fs = require('fs');
const file = process.argv[2];
const value = JSON.parse(fs.readFileSync(file, 'utf8'));
value.ok = false;
value.failureClass = process.argv[3];
if (process.argv[4] !== '') value.exitCode = Number(process.argv[4]);
fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
NODE
}

_codex_run_with_deadline() {
  local prompt_file="$1" raw_file="$2" stderr_file="$3" timeout="$4"
  shift 4
  local started now pid rc=0
  CODEX_LAST_TIMED_OUT=0
  started="$(date +%s)"
  "$@" < "$prompt_file" > "$raw_file" 2> "$stderr_file" &
  pid=$!
  while kill -0 "$pid" 2>/dev/null; do
    now="$(date +%s)"
    if (( now - started >= timeout )); then
      CODEX_LAST_TIMED_OUT=1
      kill -TERM "$pid" 2>/dev/null || true
      sleep 0.2
      kill -KILL "$pid" 2>/dev/null || true
      break
    fi
    sleep 0.1
  done
  if wait "$pid"; then rc=0; else rc=$?; fi
  CODEX_LAST_EXIT="$rc"
  export CODEX_LAST_TIMED_OUT CODEX_LAST_EXIT
}

codex_open() {
  local cwd="$1" run_dir="$2"
  [[ -d "$cwd" ]] || { echo "codex_open: cwd not found: $cwd" >&2; return 2; }
  mkdir -p "$run_dir"
  if [[ -n "${CODEX_HOME+x}" ]]; then
    CODEX_PREVIOUS_HOME_WAS_SET=1
    CODEX_PREVIOUS_HOME="$CODEX_HOME"
  else
    CODEX_PREVIOUS_HOME_WAS_SET=0
    CODEX_PREVIOUS_HOME=''
  fi
  CODEX_CWD="$cwd"
  CODEX_RUN_DIR="$run_dir"
  CODEX_THREAD_ID=''
  CODEX_OPERATOR_HOME="${CODEX_PREVIOUS_HOME:-$HOME/.codex}"
  export CODEX_CWD CODEX_RUN_DIR CODEX_THREAD_ID CODEX_OPERATOR_HOME
  export CODEX_PREVIOUS_HOME_WAS_SET CODEX_PREVIOUS_HOME
  codex_prepare_home "$run_dir"
  if [[ -z "$(trap -p EXIT)" ]]; then
    trap 'codex_close' EXIT
    CODEX_TRANSPORT_OWNS_EXIT_TRAP=1
  else
    CODEX_TRANSPORT_OWNS_EXIT_TRAP=0
  fi
  export CODEX_TRANSPORT_OWNS_EXIT_TRAP
}

codex_turn() {
  local prompt_file="$1" seq="$2" timeout="$3"
  local raw_file="$CODEX_RUN_DIR/turn-$seq.raw.jsonl"
  local stderr_file="$CODEX_RUN_DIR/turn-$seq.stderr.txt"
  local response_file="$CODEX_RUN_DIR/turn-$seq.response.txt"
  local status_file="$CODEX_RUN_DIR/turn-$seq.status.json"
  local codex_bin="${CODEX_BIN:-codex}"
  local -a command

  if [[ -z "$CODEX_THREAD_ID" ]]; then
    command=(
      "$codex_bin" exec --json --sandbox workspace-write
      -c 'approval_policy="never"'
      --skip-git-repo-check --ignore-user-config
      -C "$CODEX_CWD" -
    )
  else
    command=(
      "$codex_bin" exec resume "$CODEX_THREAD_ID" --json
      --ignore-user-config -
    )
  fi

  _codex_run_with_deadline "$prompt_file" "$raw_file" "$stderr_file" "$timeout" "${command[@]}"
  node "$CODEX_RUNNER_DIR/lib/parse-codex-jsonl.js" "$raw_file" "$status_file" "$response_file"

  if [[ "$CODEX_LAST_TIMED_OUT" == 1 ]]; then
    _codex_reclassify "$status_file" timeout "$CODEX_LAST_EXIT"
    return 1
  fi
  if [[ "$CODEX_LAST_EXIT" != 0 ]]; then
    _codex_reclassify "$status_file" "process-exit-$CODEX_LAST_EXIT" "$CODEX_LAST_EXIT"
    return 1
  fi
  if [[ "$(_codex_status_field "$status_file" ok)" != true ]]; then
    return 1
  fi

  local observed_thread
  observed_thread="$(_codex_status_field "$status_file" threadId)"
  if [[ -z "$CODEX_THREAD_ID" ]]; then
    CODEX_THREAD_ID="$observed_thread"
    export CODEX_THREAD_ID
    printf '%s' "$CODEX_THREAD_ID" > "$CODEX_RUN_DIR/thread-id.txt"
  elif [[ "$observed_thread" != "$CODEX_THREAD_ID" ]]; then
    _codex_reclassify "$status_file" thread-changed
    return 1
  fi
}

codex_close() {
  codex_cleanup_home
  if [[ "${CODEX_PREVIOUS_HOME_WAS_SET:-0}" == 1 ]]; then
    CODEX_HOME="$CODEX_PREVIOUS_HOME"
    export CODEX_HOME
  else
    unset CODEX_HOME
  fi
  if [[ "${CODEX_TRANSPORT_OWNS_EXIT_TRAP:-0}" == 1 ]]; then
    trap - EXIT
    CODEX_TRANSPORT_OWNS_EXIT_TRAP=0
    export CODEX_TRANSPORT_OWNS_EXIT_TRAP
  fi
}

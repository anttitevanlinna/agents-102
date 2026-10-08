#!/usr/bin/env bash
set -euo pipefail

# GitHub Copilot CLI's prompt mode is already a bounded, resumable process.
# Keep that lifecycle behind the same transport contract as the interactive
# tmux runtimes so the scenario driver and artifact assertions stay shared.

_copilot_token() {
  if [[ -n "${COPILOT_GITHUB_TOKEN:-}" ]]; then
    printf '%s' "$COPILOT_GITHUB_TOKEN"
  elif [[ -n "${GH_TOKEN:-}" ]]; then
    printf '%s' "$GH_TOKEN"
  elif [[ -n "${GITHUB_TOKEN:-}" ]]; then
    printf '%s' "$GITHUB_TOKEN"
  elif command -v gh >/dev/null 2>&1; then
    gh auth token 2>/dev/null || true
  fi
}

_copilot_uuid() {
  node -e 'process.stdout.write(require("crypto").randomUUID())'
}

_copilot_run_with_deadline() {
  local prompt="$1" transcript="$2" stderr_file="$3" timeout="$4"
  local started now pid rc=0
  shift 4
  COPILOT_LAST_TIMED_OUT=0
  started="$(date +%s)"
  (
    cd "$COPILOT_CWD"
    env \
      COPILOT_HOME="$COPILOT_RUN_HOME" \
      COPILOT_AUTO_UPDATE=false \
      COPILOT_GITHUB_TOKEN="$COPILOT_AUTH_TOKEN" \
      GITHUB_COPILOT_PROMPT_MODE_EXTENSIONS=true \
      "$@" --prompt "$prompt" > "$transcript" 2> "$stderr_file"
  ) &
  pid=$!
  while kill -0 "$pid" 2>/dev/null; do
    now="$(date +%s)"
    if (( now - started >= timeout )); then
      COPILOT_LAST_TIMED_OUT=1
      kill -TERM "$pid" 2>/dev/null || true
      sleep 0.2
      kill -KILL "$pid" 2>/dev/null || true
      break
    fi
    sleep 0.1
  done
  if wait "$pid"; then rc=0; else rc=$?; fi
  COPILOT_LAST_EXIT="$rc"
  export COPILOT_LAST_TIMED_OUT COPILOT_LAST_EXIT
}

copilot_open() {
  local cwd="$1" run_dir="$2"
  [[ -d "$cwd" ]] || { echo "copilot_open: cwd not found: $cwd" >&2; return 2; }
  mkdir -p "$run_dir"
  COPILOT_CWD="$cwd"
  COPILOT_RUN_DIR="$run_dir"
  COPILOT_RUN_HOME="$run_dir/copilot-home"
  COPILOT_SESSION_ID="$(_copilot_uuid)"
  COPILOT_AUTH_TOKEN="$(_copilot_token)"
  [[ -n "$COPILOT_AUTH_TOKEN" ]] || {
    echo 'copilot_open: no GitHub token found; set COPILOT_GITHUB_TOKEN, GH_TOKEN, or GITHUB_TOKEN, or sign in with gh' >&2
    return 2
  }
  mkdir -p "$COPILOT_RUN_HOME"
  chmod 700 "$COPILOT_RUN_HOME"
  printf '%s' "$COPILOT_SESSION_ID" > "$run_dir/session-id.txt"
  export COPILOT_CWD COPILOT_RUN_DIR COPILOT_RUN_HOME COPILOT_SESSION_ID COPILOT_AUTH_TOKEN
}

copilot_turn() {
  local prompt_file="$1" seq="$2" timeout="$3"
  local transcript="$COPILOT_RUN_DIR/turn-$seq.transcript.txt"
  local stderr_file="$COPILOT_RUN_DIR/turn-$seq.stderr.txt"
  local status_file="$COPILOT_RUN_DIR/turn-$seq.status.json"
  local copilot_bin="${COPILOT_BIN:-copilot}"
  local prompt
  local -a command
  prompt="$(cat "$prompt_file")"
  command=(
    "$copilot_bin"
    --no-auto-update
    --no-remote-export
    --no-ask-user
    --disable-builtin-mcps
    --allow-all
    --silent
    --output-format text
    --session-id "$COPILOT_SESSION_ID"
    --log-dir "$COPILOT_RUN_DIR/logs"
    -C "$COPILOT_CWD"
  )

  _copilot_run_with_deadline "$prompt" "$transcript" "$stderr_file" "$timeout" "${command[@]}"
  node - "$status_file" "$COPILOT_LAST_EXIT" "$COPILOT_LAST_TIMED_OUT" <<'NODE'
const fs = require('fs');
const file = process.argv[2];
const exitCode = Number(process.argv[3]);
const timedOut = process.argv[4] === '1';
fs.writeFileSync(file, JSON.stringify({
  ok: exitCode === 0 && !timedOut,
  exitCode,
  failureClass: timedOut ? 'timeout' : (exitCode === 0 ? '' : `process-exit-${exitCode}`),
}, null, 2) + '\n');
NODE

  if [[ "$COPILOT_LAST_TIMED_OUT" == 1 ]]; then
    echo "copilot_turn: timeout after ${timeout}s" >&2
    return 1
  fi
  if [[ "$COPILOT_LAST_EXIT" != 0 ]]; then
    echo "copilot_turn: process exited $COPILOT_LAST_EXIT; see $stderr_file" >&2
    return 1
  fi
  [[ -s "$transcript" ]] || {
    echo "copilot_turn: empty response; see $stderr_file" >&2
    return 1
  }
}

copilot_close() {
  COPILOT_AUTH_TOKEN=''
  export COPILOT_AUTH_TOKEN
}

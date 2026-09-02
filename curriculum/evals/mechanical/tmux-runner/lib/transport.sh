#!/usr/bin/env bash
set -euo pipefail

A101_TRANSPORT_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
A101_RUNNER_DIR="$(cd "$A101_TRANSPORT_LIB_DIR/.." && pwd)"
A101_REPO_ROOT="$(cd "$A101_TRANSPORT_LIB_DIR/../../../../.." && pwd)"

artifact_path() {
  local identity="$1" profile="${A101_RUNTIME_PROFILE:-cli}"
  node - "$A101_REPO_ROOT" "$profile" "$identity" <<'NODE'
const root = process.argv[2];
const profile = process.argv[3];
const identity = process.argv[4];
const runtimes = require(root + '/site/layouts/a101-runtimes.js');
const value = runtimes.getProfile(profile).artifacts[identity];
if (!value) {
  process.stderr.write(`artifact_path: unknown identity: ${identity}\n`);
  process.exit(2);
}
process.stdout.write(value);
NODE
}

transport_open() {
  local profile="$1" cwd="$2" run_dir="$3"
  A101_RUNTIME_PROFILE="$profile"
  export A101_RUNTIME_PROFILE
  case "$profile" in
    cli)
      source "${A101_CLAUDE_TRANSPORT:-$A101_RUNNER_DIR/transports/claude-tmux.sh}"
      A101_ACTIVE_TRANSPORT=claude
      claude_open "$cwd" "$run_dir"
      ;;
    codex-cli)
      source "${A101_CODEX_TRANSPORT:-$A101_RUNNER_DIR/transports/codex-exec.sh}"
      A101_ACTIVE_TRANSPORT=codex
      codex_open "$cwd" "$run_dir"
      ;;
    *)
      echo "transport_open: unsupported executable profile: $profile" >&2
      return 2
      ;;
  esac
  export A101_ACTIVE_TRANSPORT
}

transport_turn() {
  local prompt_file="$1" seq="$2" timeout="$3"
  case "${A101_ACTIVE_TRANSPORT:-}" in
    claude)
      claude_turn "$prompt_file" "$seq" "$timeout"
      ;;
    codex)
      local rc=0
      codex_turn "$prompt_file" "$seq" "$timeout" || rc=$?
      if [[ -f "$CODEX_RUN_DIR/turn-$seq.response.txt" ]]; then
        cp "$CODEX_RUN_DIR/turn-$seq.response.txt" "$CODEX_RUN_DIR/turn-$seq.transcript.txt"
      fi
      return "$rc"
      ;;
    *)
      echo 'transport_turn: no active transport' >&2
      return 2
      ;;
  esac
}

transport_close() {
  case "${A101_ACTIVE_TRANSPORT:-}" in
    claude) claude_close ;;
    codex) codex_close ;;
    '') return 0 ;;
    *) echo "transport_close: unknown active transport: $A101_ACTIVE_TRANSPORT" >&2; return 2 ;;
  esac
  A101_ACTIVE_TRANSPORT=''
  export A101_ACTIVE_TRANSPORT
}

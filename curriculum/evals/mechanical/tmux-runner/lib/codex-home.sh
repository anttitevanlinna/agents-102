#!/usr/bin/env bash
set -euo pipefail

codex_prepare_home() {
  local run_dir="$1"
  local adapter_home="$run_dir/codex-home"
  local operator_home="${CODEX_OPERATOR_HOME:-${CODEX_HOME:-$HOME/.codex}}"
  local auth_source="${CODEX_AUTH_SOURCE:-$operator_home/auth.json}"

  if [[ -e "$adapter_home" ]]; then
    echo "codex_prepare_home: adapter home already exists: $adapter_home" >&2
    return 2
  fi
  mkdir -m 700 "$adapter_home"

  if [[ -z "${CODEX_API_KEY:-}" ]]; then
    if [[ ! -f "$auth_source" ]]; then
      rmdir "$adapter_home" 2>/dev/null || true
      echo 'codex_prepare_home: environment/auth-missing' >&2
      return 2
    fi
    cp "$auth_source" "$adapter_home/auth.json"
    chmod 600 "$adapter_home/auth.json"
  fi

  CODEX_ADAPTER_HOME="$adapter_home"
  export CODEX_ADAPTER_HOME
  CODEX_HOME="$adapter_home"
  export CODEX_HOME
}

codex_cleanup_home() {
  [[ -n "${CODEX_ADAPTER_HOME:-}" ]] || return 0
  if [[ -z "${CODEX_RUN_DIR:-}" || "$CODEX_ADAPTER_HOME" != "$CODEX_RUN_DIR/codex-home" ]]; then
    echo "codex_cleanup_home: refusing unexpected path: $CODEX_ADAPTER_HOME" >&2
    return 2
  fi
  rm -rf -- "$CODEX_ADAPTER_HOME"
  CODEX_ADAPTER_HOME=''
  export CODEX_ADAPTER_HOME
}

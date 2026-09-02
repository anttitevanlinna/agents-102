#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
source "$RUNNER/lib/a101-controls.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

tokens='<CONTROL:NO_QUESTIONS> <CONTROL:DIRECT_EXECUTION> <CONTROL:MULTI_AGENT> <CONTROL:SAVE_WITHOUT_REVIEW>'
claude="$(render_controls cli "$tokens")"
codex="$(render_controls codex-cli "$tokens")"

[[ "$claude" == *AskUserQuestion* ]]
[[ "$claude" == *'plan mode'* ]]
[[ "$claude" == *subagents* ]]
[[ "$codex" == *'interactive user input'* ]]
[[ "$codex" == *'Execute directly'* ]]
[[ "$codex" == *'Codex agents'* ]]
[[ "$codex" != *AskUserQuestion* ]]
[[ "$codex" != *'plan mode'* ]]
[[ "$codex" != *subagent* ]]
[[ "$claude$codex" != *'<CONTROL:'* ]]

set +e
render_controls codex-cli '<CONTROL:NOT_REAL>' >"$TMP/controls.out" 2>"$TMP/controls.err"
rc=$?
set -e
[[ $rc -ne 0 ]]

raw="$({
  for file in "$RUNNER"/scenarios/a101-*.txt; do
    awk '!/^[[:space:]]*#/ && NF' "$file"
  done
} | grep -Ein 'AskUserQuestion|plan mode|subagent' || true)"
[[ -z "$raw" ]] || {
  echo 'FAIL: runtime-specific mechanics remain in executable scenario lines:' >&2
  echo "$raw" >&2
  exit 1
}

echo 'PASS: A101 scenario controls render without runtime leakage'

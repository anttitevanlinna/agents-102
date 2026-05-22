#!/usr/bin/env bash
# Install the runner's Stop hook into a SUT cwd's .claude/settings.local.json.
# Idempotent: re-running doesn't duplicate the hook.
#
# Usage: runner/install-sut.sh /path/to/sut
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sut="${1:-}"
if [[ -z "$sut" || ! -d "$sut" ]]; then
  echo "usage: $0 <sut-cwd>" >&2
  exit 2
fi

hook="$HERE/hooks/stop-sentinel.sh"
settings="$sut/.claude/settings.local.json"
mkdir -p "$sut/.claude"

if [[ ! -f "$settings" ]]; then
  printf '{}\n' > "$settings"
fi

# Merge a Stop hook entry pointing at our sentinel script. We key on the
# absolute path so the same SUT can carry other Stop hooks alongside ours.
tmp="$(mktemp)"
jq --arg cmd "$hook" '
  .hooks //= {} |
  .hooks.Stop //= [] |
  if any(.hooks.Stop[]?; .hooks[]?.command == $cmd) then .
  else .hooks.Stop += [{ "hooks": [{ "type": "command", "command": $cmd }] }]
  end
' "$settings" > "$tmp" && mv "$tmp" "$settings"

echo "[install-sut] hook registered in $settings"
echo "[install-sut] hook script: $hook"

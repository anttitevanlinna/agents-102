#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../../../.." && pwd)"
FIXTURE="$(mktemp -d)"
trap 'rm -rf "$FIXTURE"' EXIT

cat > "$FIXTURE/root-card.md" <<'PROMPT'
---
key: root-card
runtime: any
dest: Claude Code
---
Write ./{{artifact:root-instructions}}.
PROMPT

export PROMPT_REGISTRY="$FIXTURE"
source "$HERE/../lib/resolve-prompt.sh"

claude="$(resolve_prompt root-card cli)"
codex="$(resolve_prompt root-card codex-cli)"
[[ "$claude" == 'Write ./CLAUDE.md.' ]] || {
  echo "FAIL: Claude resolution leaked or changed: $claude" >&2
  exit 1
}
[[ "$codex" == 'Write ./AGENTS.md.' ]] || {
  echo "FAIL: Codex resolution leaked or changed: $codex" >&2
  exit 1
}

expected="$(node - "$ROOT" "$FIXTURE" <<'NODE'
const root = process.argv[2];
const dir = process.argv[3];
const compile = require(root + '/scripts/compile-prompts.js');
const registry = compile.registryForProfile(compile.loadRegistry(dir), 'codex-cli');
process.stdout.write(registry['root-card'].text);
NODE
)"
[[ "$codex" == "$expected" ]] || {
  echo 'FAIL: shell resolver differs from compiler projection' >&2
  exit 1
}

json="$(resolve_prompt root-card codex-cli --json)"
node -e '
const value = JSON.parse(process.argv[1]);
if (value.key !== "root-card" || value.runtime !== "codex-cli") process.exit(1);
if (value.text !== "Write ./AGENTS.md.") process.exit(1);
if (value.meta.dest !== "Claude Code") process.exit(1);
' "$json"

if resolve_prompt root-card nope >/dev/null 2>"$FIXTURE/error"; then
  echo 'FAIL: unknown runtime resolved' >&2
  exit 1
fi
[[ "$(wc -l < "$FIXTURE/error" | tr -d ' ')" == 1 ]] || {
  echo 'FAIL: resolver errors must stay on one stderr line' >&2
  exit 1
}

echo 'PASS: runner prompt resolution matches compiled runtime text'

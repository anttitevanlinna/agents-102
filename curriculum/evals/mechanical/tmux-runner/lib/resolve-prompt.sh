#!/usr/bin/env bash
# Resolve a prompt key to its body text from the agents-102 registry.
# Single source of truth: scenarios reference keys, never copy bodies.
set -euo pipefail

REGISTRY="${PROMPT_REGISTRY:-$HOME/Projects/agents-102/curriculum/prompts}"

resolve_prompt() {
  local key="$1"
  local file="$REGISTRY/$key.md"
  if [[ ! -f "$file" ]]; then
    echo "resolve_prompt: key not found: $key (looked in $REGISTRY)" >&2
    return 1
  fi
  # Strip the leading YAML frontmatter (between first and second `---` line),
  # then trim a leading blank line if present. Body is everything after.
  awk '
    BEGIN { in_fm = 0; past_fm = 0 }
    !past_fm && /^---[[:space:]]*$/ {
      if (in_fm == 0) { in_fm = 1; next }
      else            { in_fm = 0; past_fm = 1; next }
    }
    past_fm { print }
  ' "$file"
}

if [[ "${BASH_SOURCE[0]:-$0}" == "${0}" ]]; then
  resolve_prompt "$@"
fi

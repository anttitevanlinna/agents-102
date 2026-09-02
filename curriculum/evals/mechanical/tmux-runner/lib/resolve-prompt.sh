#!/usr/bin/env bash
# Resolve a prompt key to the compiler's exact runtime projection.
# Single source of truth: scenarios reference keys, never copy bodies or parse
# frontmatter independently from the site/workbook build.
set -euo pipefail

RESOLVE_PROMPT_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESOLVE_PROMPT_ROOT="$(cd "$RESOLVE_PROMPT_LIB_DIR/../../../../.." && pwd)"

resolve_prompt() {
  local key="$1"
  local profile="${2:-${A101_RUNTIME_PROFILE:-cli}}"
  shift "$(( $# >= 2 ? 2 : $# ))"
  node "$RESOLVE_PROMPT_ROOT/scripts/resolve-prompt.js" \
    --key "$key" --runtime "$profile" "$@"
}

if [[ "${BASH_SOURCE[0]:-$0}" == "${0}" ]]; then
  resolve_prompt "$@"
fi

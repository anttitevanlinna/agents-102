#!/usr/bin/env bash
# resolve_prompt finds the registry from its own location, not from where the
# maintainer happens to clone. A customer clone anywhere (or a HOME with no
# ~/Projects/agents-102) must resolve keys with PROMPT_REGISTRY unset.
#
# Run: bash tests/resolve-prompt-location.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
key="$(ls "$HERE/../../../../prompts" | grep '\.md$' | grep -v '^README' | head -1)"; key="${key%.md}"
[[ -n "$key" ]] || { echo "FAIL: no registry key found next to the runner" >&2; exit 1; }

out="$(env -u PROMPT_REGISTRY HOME=/nonexistent bash -c "source '$HERE/../lib/resolve-prompt.sh'; resolve_prompt '$key'" 2>&1)"
if [[ $? -eq 0 && -n "$out" ]]; then echo "  ok   - '$key' resolves with HOME=/nonexistent and no PROMPT_REGISTRY"
else echo "  FAIL - '$key' did not resolve from the runner's own location: $out" >&2; exit 1; fi

out="$(PROMPT_REGISTRY=/nonexistent bash -c "source '$HERE/../lib/resolve-prompt.sh'; resolve_prompt '$key'" 2>&1)"
if [[ $? -ne 0 ]]; then echo "  ok   - PROMPT_REGISTRY still overrides"
else echo "  FAIL - PROMPT_REGISTRY=/nonexistent was ignored" >&2; exit 1; fi

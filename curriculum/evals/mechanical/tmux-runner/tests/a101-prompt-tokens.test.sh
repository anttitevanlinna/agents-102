#!/usr/bin/env bash
# Every <UPPER_TOKEN> in a course prompt an a101 scenario sends must be one
# run-a101.sh substitutes. Live chain 2026-11-26: prework T1 pasted a literal
# <CONTENT_URL> (the build fills it, the runner did not) and the agent told the
# student the command "couldn't have worked anyway".
# Run: bash tests/a101-prompt-tokens.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REG="$HERE/../../../../prompts"
pass=0 fail=0
for f in "$HERE"/../scenarios/a101-*.txt; do
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in ''|\#*|\**|@*) continue ;; esac
    key="${line%%[[:space:]]*}"; [[ -f "$REG/$key.md" ]] || continue
    for tok in $(grep -oE '<[A-Z][A-Z0-9_]+>' "$REG/$key.md" | sort -u); do
      if grep -qF "body//$tok/" "$HERE/../run-a101.sh"; then pass=$((pass+1))
      else fail=$((fail+1)); echo "  FAIL - $(basename "$f") $key sends $tok unsubstituted" >&2; fi
    done
  done < "$f"
done
echo "prompt-tokens: $pass substituted, $fail raw"
[[ $fail -eq 0 ]]

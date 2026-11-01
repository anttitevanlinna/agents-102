#!/usr/bin/env bash
# a101_rewritten_path picks the file the agent says it rewrote, not the first
# path in the transcript. M7 T6 (2026-11-01 Sonnet chain): the prompt echo lists
# module-7/jtbd.md first, the agent rewrote module-7/technical-plan.md, and the
# mtime check ran on the wrong file.
# Run: bash tests/rewritten-path.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e
pass=0 fail=0
check(){ if [[ "$2" == "$3" ]]; then pass=$((pass+1)); echo "  ok   - $1"; else fail=$((fail+1)); echo "  FAIL - $1 (want [$3] got [$2])" >&2; fi; }
tmp="$(mktemp)"; trap 'rm -f "$tmp"' EXIT

printf '> Read everything in module-7/ (module-7/jtbd.md, module-7/branch.md)\n⏺ Read(module-7/people-plan.md)\n⏺ I rewrote module-7/technical-plan.md in place.\n' > "$tmp"
check "claimed rewrite wins over earlier paths" "$(a101_rewritten_path "$tmp" module-7)" "module-7/technical-plan.md"

printf '⏺ The sharing artifact is module-7/monday.md.\n⏺ Update(module-7/monday.md)\n' > "$tmp"
check "edited file when no rewrite claim" "$(a101_rewritten_path "$tmp" module-7)" "module-7/monday.md"

printf '⏺ Read module-7/jtbd.md\n' > "$tmp"
check "falls back to first path" "$(a101_rewritten_path "$tmp" module-7)" "module-7/jtbd.md"

echo "rewritten-path: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

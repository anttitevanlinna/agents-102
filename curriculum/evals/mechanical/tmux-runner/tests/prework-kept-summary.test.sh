#!/usr/bin/env bash
# Prework T4 resends the T3 calendar export, so the agent may rightly keep the
# identical meetings.md; the check passes when it says so. Live chain
# 2026-11-28: "I haven't re-read the export or rewritten the file." failed the
# pattern, which knew "didn't rewrite" but not "haven't ... rewritten".
# Run: bash tests/prework-kept-summary.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e
pass=0 fail=0
yes(){ if grep -Eqi "$A101_PREWORK_KEPT_RE" <<<"$1"; then pass=$((pass+1)); echo "  ok   - kept: $1"; else fail=$((fail+1)); echo "  FAIL - should match: $1" >&2; fi; }
no(){ if grep -Eqi "$A101_PREWORK_KEPT_RE" <<<"$1"; then fail=$((fail+1)); echo "  FAIL - should not match: $1" >&2; else pass=$((pass+1)); echo "  ok   - not kept: $1"; fi; }
yes "I haven't re-read the export or rewritten the file."
yes "I have not rewritten prework/meetings.md."
yes "I didn't rewrite it."
yes "The summary is still correct."
yes "The file is unchanged."
yes "I left it as is."
yes "It's the same export as before."
yes "I already did it, so I kept the file."
no  "I saved the summary to prework/meetings.md."
no  "Wrote 17 lines to prework/meetings.md"
echo "prework-kept-summary: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

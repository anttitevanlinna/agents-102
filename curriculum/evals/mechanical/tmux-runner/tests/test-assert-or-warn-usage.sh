#!/usr/bin/env bash
# Regression guard: assert_or_warn must be called as
#   assert_or_warn <command> <args...>
# (the command FIRST, no leading label). A leading quoted label —
#   assert_or_warn "some label" assert_scrollback_grep ...
# makes bash try to EXECUTE the label as a command; assert_or_warn then
# swallows the "command not found" into a WARN, so the real observation check
# silently never runs. Caught 2026-06-06 on the first m1 run (T5/T9).
#
# This greps the A101 runner for the malformed pattern. Pure static check.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
runner="$HERE/../run-a101.sh"

[[ -f "$runner" ]] || { echo "FAIL: $runner not found"; exit 1; }

# Malformed: assert_or_warn immediately followed by a double-quoted string.
if grep -nE 'assert_or_warn[[:space:]]+"' "$runner"; then
  echo "FAIL: assert_or_warn called with a leading quoted label (see lines above)."
  echo "      Correct form: assert_or_warn assert_scrollback_grep \"label\" \"\$t\" 'pat'"
  exit 1
fi
echo "PASS: no malformed assert_or_warn calls in run-a101.sh"

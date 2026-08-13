#!/usr/bin/env bash
# source-freshness.test.sh — regression tests for source-freshness.sh.
#
# Locks down the default scan scope: stamps in continuous-research/ are part of
# a no-args audit run, not only curriculum/. A correctly formed stamp that no
# default run ever reads is the failure the stamp convention exists to prevent.
#
# Run: bash curriculum/evals/scripts/source-freshness.test.sh
# Exit 0 = all pass; 1 = at least one failure.

set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$HERE/source-freshness.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fail=0
pass=0

assert_contains() { # haystack-file needle msg
  if grep -qF -- "$2" "$1"; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL: $3"; echo "    expected to find: $2"; echo "    in output:"; sed 's/^/      /' "$1"; fi
}
assert_not_contains() { # haystack-file needle msg
  if grep -qF -- "$2" "$1"; then fail=$((fail+1)); echo "FAIL: $3"; echo "    did NOT expect: $2"; else pass=$((pass+1)); fi
}

# fixture tree: one OK stamp in each corpus
mkdir -p "$TMP/curriculum" "$TMP/continuous-research/observations"
printf -- '- `[checked:2026-01-01 result:OK due:none]` https://example.com/a — [capability] curriculum stamp.\n' > "$TMP/curriculum/a.md"
printf -- '- `[checked:2026-01-01 result:OK due:none]` https://example.com/b — [practitioner direct] research stamp.\n' > "$TMP/continuous-research/observations/b.md"

# ── T1 — no-args run scans BOTH corpora ──────────────────────────────────────
( cd "$TMP" && bash "$SCRIPT" ) > "$TMP/out-default.txt" 2>&1 || true
assert_contains "$TMP/out-default.txt" "continuous-research" "default scan names continuous-research in scope"
assert_contains "$TMP/out-default.txt" "2 ok" "default scan parses the stamp in each corpus (2 ok)"

# ── T2 — explicit path arg still narrows the scan ────────────────────────────
( cd "$TMP" && bash "$SCRIPT" curriculum ) > "$TMP/out-explicit.txt" 2>&1 || true
assert_contains "$TMP/out-explicit.txt" "1 ok" "explicit path scans only what was given"
assert_not_contains "$TMP/out-explicit.txt" "continuous-research" "explicit curriculum run does not scan continuous-research"

# ── T3 — the research-corpus stamp is genuinely readable on its own ──────────
( cd "$TMP" && bash "$SCRIPT" continuous-research ) > "$TMP/out-research.txt" 2>&1 || true
assert_contains "$TMP/out-research.txt" "1 ok" "continuous-research stamp parses (the check saw its input)"

echo
echo "source-freshness.test.sh: $pass passed, $fail failed"
[[ $fail -gt 0 ]] && exit 1
exit 0

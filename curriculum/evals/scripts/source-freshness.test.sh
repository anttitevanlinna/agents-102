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

# ── T4 — the gate does not audit its own test fixtures ──────────────────────
# The parser fixture is a file of deliberately-broken stamps. It lives under
# curriculum/, so the default walk read it and reported its BLOCKED example rows
# as real corpus BLOCKs — 2 of 8 on the live corpus, a quarter of the gate's own
# output, in the number people quote before a cohort. A gate that counts its own
# fixture is a gate whose red is partly furniture.
printf -- '- `[checked:2026-01-01 result:BLOCKED due:asap]` https://example.com/fixture — [practitioner direct] deliberately broken.\n' > "$TMP/curriculum/parser.fixture.md"
# Judge machinery is the bigger source: an instance JSON whose evidence text
# QUOTES a stamp parses as a stamp. On the live corpus 32 stamp-shaped lines sat
# under curriculum/evals/ — 28 in instances/, 3 in scripts/, 1 in lints/ — and
# not one was a real citation. They were ~10 of the gate's 36 BLOCK rows.
mkdir -p "$TMP/curriculum/evals/instances" "$TMP/curriculum/evals/scripts"
printf -- '{"evidence": "stamp `[checked:2026-01-01 result:BLOCKED due:asap]` quoted in a verdict"}\n' > "$TMP/curriculum/evals/instances/x.technical.json"
printf -- 'assert("`[checked:2026-01-01 result:BLOCKED due:asap]`")\n' > "$TMP/curriculum/evals/scripts/x.test.js"
( cd "$TMP" && bash "$SCRIPT" ) > "$TMP/out-fixture.txt" 2>&1 || true
assert_not_contains "$TMP/out-fixture.txt" "parser.fixture.md" "default walk prunes *.fixture.md"
assert_not_contains "$TMP/out-fixture.txt" "x.technical.json" "default walk prunes judge instances"
assert_not_contains "$TMP/out-fixture.txt" "x.test.js" "default walk prunes eval machinery"
assert_contains "$TMP/out-fixture.txt" "2 ok" "pruning the machinery leaves the real stamps untouched"

# Naming it explicitly is a deliberate act and must still work — that is how the
# fixture gets exercised on purpose.
( cd "$TMP" && bash "$SCRIPT" curriculum/parser.fixture.md ) > "$TMP/out-fixture-explicit.txt" 2>&1 || true
assert_contains "$TMP/out-fixture-explicit.txt" "parser.fixture.md" "an explicitly named fixture is still scanned"

echo
echo "source-freshness.test.sh: $pass passed, $fail failed"
[[ $fail -gt 0 ]] && exit 1
exit 0

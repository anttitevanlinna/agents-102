#!/usr/bin/env bash
# Tests for board.sh's gate helper.
#
# The property under test is the one that made status.sh worth deleting and the
# one this script nearly repeated: a gate must fail on the CHECKER's exit code,
# never on the exit code of whatever trimmed its output. `node x | tail -n 3`
# always succeeds, so `|| fails=$((fails+1))` after it never fires and the board
# reports clean over a red checker. Same trap the eval-fire notes record being
# hit twice by hand in one session.
set -uo pipefail
cd "$(dirname "$0")" || exit 2

n=0
ok() { n=$((n + 1)); echo "ok $n - $1"; }
die() { echo "not ok - $1"; exit 1; }

# Extract the gate helper from board.sh and drive it against stubs, so the test
# binds to the shipped text rather than to a copy that can drift from it.
HELPER="$(sed -n '/^gate() {/,/^}/p' board.sh)"
[ -n "$HELPER" ] || die "gate() not found in board.sh — the helper was renamed or removed"

harness() {
  # $1 = stub exit code, $2 = keep ("all" or a line count)
  bash -c "
    set -uo pipefail
    fails=0
    rule() { :; }
    $HELPER
    stub() { printf 'line1\nline2\nline3\nline4\n'; return $1; }
    gate 'T' $2 stub
    echo \"FAILS=\$fails\"
  "
}

out="$(harness 0 3)"
echo "$out" | grep -q 'FAILS=0' || die "a passing checker must not increment fails (got: $out)"
ok "a passing checker leaves the counter alone"

out="$(harness 1 3)"
echo "$out" | grep -q 'FAILS=1' || die "a FAILING checker behind a tail must still increment fails (got: $out)"
ok "a failing checker counts even when its output is trimmed"

out="$(harness 1 all)"
echo "$out" | grep -q 'FAILS=1' || die "untrimmed failure must count too (got: $out)"
ok "a failing checker counts when its output is printed whole"

out="$(harness 1 3)"
echo "$out" | grep -q 'line4' || die "keep=3 must show the LAST lines, where a checker puts its verdict"
echo "$out" | grep -q 'line1' && die "keep=3 must not print all four lines"
ok "trimming keeps the tail, which is where a checker's summary lives"

out="$(harness 0 all)"
echo "$out" | grep -q 'line1' || die "keep=all must print everything"
ok "keep=all prints the whole report"

# The helper must never abort the run: one red gate cannot hide the gates after
# it, which is the same &&-chain masking problem the npm scripts have.
out="$(bash -c "
  set -uo pipefail
  fails=0
  rule() { :; }
  $HELPER
  bad() { echo x; return 1; }
  gate 'A' all bad
  gate 'B' all bad
  echo \"FAILS=\$fails\"
")"
echo "$out" | grep -q 'FAILS=2' || die "a red gate must not stop the ones behind it (got: $out)"
ok "two red gates both report; neither masks the other"

# ---- The unscoped board -------------------------------------------------------
# `--training` is documented as optional, and without it the board died on its
# very first reader: under `set -u`, "${SCOPE[@]}" on an EMPTY array is an
# unbound variable in bash 3.2, which is what macOS ships. So `npm run board`
# printed one header and exited 1. It went unnoticed because the scoped call is
# the one anybody actually types — the broken path was the one in the usage line.
out="$(bash -uo pipefail -c 'SCOPE=(); n() { echo "args=$#"; }; n ${SCOPE[@]+"${SCOPE[@]}"}; SCOPE=(--training ae101); n ${SCOPE[@]+"${SCOPE[@]}"}' 2>&1)"
[ "$out" = "$(printf 'args=0\nargs=2')" ] || die "the guarded expansion must pass nothing when empty and both words when set (got: $out)"
ok "an empty scope expands to no arguments instead of exploding"

# Every line that expands SCOPE must carry the `+` guard. Matching the bare
# string alone will not do — the guarded form CONTAINS it, so a naive grep
# passes on the broken file and fails on the fixed one.
bare="$(grep -n 'SCOPE\[@\]' board.sh | grep -v 'SCOPE\[@\]+' || true)"
[ -z "$bare" ] || die "board.sh expands SCOPE without the +guard; with no --training that is an unbound variable under set -u:
$bare"
ok "every SCOPE expansion carries the empty-array guard"

echo
echo "1..$n"

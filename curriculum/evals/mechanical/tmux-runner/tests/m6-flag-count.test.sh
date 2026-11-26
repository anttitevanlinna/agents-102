#!/usr/bin/env bash
# The M6 trajectory read the first number on any line with "flag" in it, and
# the last round-* folder whether or not it held a judgment. Live chain
# 2026-11-26: the judge's top line "Claims judged: 27. Claims flagged: 3." read
# as 27 flagged, and an empty round-4/ left the last count blank, so the
# trajectory check fell to a WARN on a 9 -> 3 -> 0 -> 1 loop.
# Run: bash tests/m6-flag-count.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e
pass=0 fail=0
check(){ if [[ "$2" == "$3" ]]; then pass=$((pass+1)); echo "  ok   - $1"; else fail=$((fail+1)); echo "  FAIL - $1 (want [$3] got [$2])" >&2; fi; }
SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT
printf 'Claims judged: 27. Claims flagged: 3.\n\nflagged claim 12 ...\n' > "$SB/a.md"
check "flagged, not judged" "$(a101_flagged_count "$SB/a.md")" 3
printf '# Judgment\n\nFlagged: 4 of 20 claims\n' > "$SB/b.md"
check "older 'Flagged: N' form" "$(a101_flagged_count "$SB/b.md")" 4
printf '**2 claims flagged** out of 18\n' > "$SB/c.md"
check "'N claims flagged' form" "$(a101_flagged_count "$SB/c.md")" 2
check "missing file is blank" "$(a101_flagged_count "$SB/none.md")" ""
mkdir -p "$SB/runs/round-1" "$SB/runs/round-2" "$SB/runs/round-3" "$SB/runs/round-10" "$SB/runs/round-11"
for r in 1 2 3 10; do printf 'Claims judged: 5. Claims flagged: 1.\n' > "$SB/runs/round-$r/judgment.md"; done
check "last round with a judgment (round-11 empty)" "$(a101_last_judged_round "$SB/runs")" "$SB/runs/round-10"
echo "m6-flag-count: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

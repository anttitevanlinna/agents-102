#!/usr/bin/env bash
# M2 T9 checked that the counter-case's sentinel words sat in memory/. Live
# chain 2026-11-28: the agent saved the essay as
# sources/practitioner-usage-pricing-churn-warning.md and rewrote three pages
# citing it, but paraphrased ("variance and surprise"), so 'survivorship|
# loss-averse' never reached memory/ and a real integration went red. A page
# citing the sources/ copy that carries the sentinel counts as integrated.
# Run: bash tests/m2-source-integrated.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e
pass=0 fail=0
ok(){ if a101_source_integrated "$SB/$2/memory" "$SB/$2/sources" 'survivorship|loss-averse'; then pass=$((pass+1)); echo "  ok   - $1"; else fail=$((fail+1)); echo "  FAIL - $1 should pass" >&2; fi; }
bad(){ if a101_source_integrated "$SB/$2/memory" "$SB/$2/sources" 'survivorship|loss-averse'; then fail=$((fail+1)); echo "  FAIL - $1 should fail" >&2; else pass=$((pass+1)); echo "  ok   - $1"; fi; }
SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT
mk(){ mkdir -p "$SB/$1/memory" "$SB/$1/sources"; printf 'pilot notes, volatile SMB\n' > "$SB/$1/sources/pilot.md"; }
mk words; printf 'The essay names a survivorship bias. [sources/x.md]\n' > "$SB/words/memory/a.md"
ok "sentinel word in memory" words
mk cited; printf 'But there is a survivorship bias in who writes these posts.\n' > "$SB/cited/sources/practitioner-churn-warning.md"
printf 'Churn is driven by variance and surprise. [sources/practitioner-churn-warning.md]\n' > "$SB/cited/memory/a.md"
ok "memory cites the sources/ copy carrying the sentinel" cited
mk saved; cp "$SB/cited/sources/practitioner-churn-warning.md" "$SB/saved/sources/"
printf 'Churn is driven by variance. [sources/pilot.md]\n' > "$SB/saved/memory/a.md"
bad "copied into sources/ but no page cites it" saved
mk none; printf 'Churn is driven by variance. [sources/pilot.md]\n' > "$SB/none/memory/a.md"
bad "nothing integrated" none
echo "m2-source-integrated: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

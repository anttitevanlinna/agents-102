#!/usr/bin/env bash
# prune-out.sh: retention for out/. Keeps the newest N run dirs per module,
# every run a kept chain points at, every run a doc cites by id, and
# anything younger than --min-age (an in-flight run has no state file yet).
# Dry run by default; --apply deletes. Module comes from .module, else inferred from what the dir holds.
#
# Run: bash tests/prune-out.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRUNE="$HERE/../prune-out.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

out="$(mktemp -d)"
old() { touch -t "$2" "$1"; }            # $1=dir $2=[[CC]YY]MMDDhhmm
mk() {   # $1=name $2=kind(module|state:<m>|m3|m5|bare) $3=stamp
  mkdir -p "$out/$1"
  case "$2" in
    module:*) echo "${2#module:}" > "$out/$1/.module" ;;
    state:*)  echo '{}' > "$out/$1/${2#state:}-state.json" ;;
    m3)       mkdir -p "$out/$1/main" "$out/$1/quality" ;;
    m5)       mkdir -p "$out/$1/pa" "$out/$1/pb" ;;
  esac
  old "$out/$1" "$3"
}
# m1: four runs, keep newest 2
mk r-m1-a module:m1 202609010000; mk r-m1-b state:m1 202609020000
mk r-m1-c module:m1 202609030000; mk r-m1-d module:m1 202609040000
# m3 (inferred from layout): three runs, oldest is pinned by a chain
mk r-m3-a m3 202608010000; mk r-m3-b m3 202609050000; mk r-m3-c m3 202609060000
# m5 (inferred): one run — under the keep count
mk r-m5-a m5 202609070000
# a fresh, state-less run: in flight, must survive regardless
mk r-new bare "$(date -v-1H +%Y%m%d%H%M)"
# chains: one pointing at the old m3, one empty (aborted resume)
mkdir -p "$out/_chains/c1" "$out/_chains/c-empty"
echo "$out/r-m3-a" > "$out/_chains/c1/m3.run"
echo "log" > "$out/_chain-m1.log"

# a doc elsewhere cites the oldest m1 run by id -> pinned
docs="$(mktemp -d)"; echo "see out/r-m1-a for the transcript" > "$docs/NOTES.md"

echo "[test] dry run lists, deletes nothing"
dry="$(bash "$PRUNE" --out "$out" --keep 2 --keep-chains 5 --min-age 24 --cited-by "$docs" | grep '^DELETE' | sed "s#$out/##" | sort | tr '\n' ' ')"
check "deletion set (cited run kept)" "$dry" "DELETE _chains/c-empty DELETE r-m1-b "
check "nothing removed on dry run" "$(ls -d "$out"/r-m1-a 2>/dev/null | wc -l | tr -d ' ')" "1"

echo "[test] --apply deletes exactly that set"
bash "$PRUNE" --out "$out" --keep 2 --keep-chains 5 --min-age 24 --cited-by "$docs" --apply >/dev/null
left="$(cd "$out" && ls -d r-* _chains/* | sort | tr '\n' ' ')"
check "survivors" "$left" "_chains/c1 r-m1-a r-m1-c r-m1-d r-m3-a r-m3-b r-m3-c r-m5-a r-new "
check "logs untouched" "$(ls "$out"/_chain-m1.log 2>/dev/null | wc -l | tr -d ' ')" "1"

echo "[test] refuses a path that is not a runner out/ dir"
rc=0; bash "$PRUNE" --out / --apply >/dev/null 2>&1 || rc=$?
check "nonzero on --out /" "$(( rc != 0 ))" "1"

rm -rf "$out" "$docs"
echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

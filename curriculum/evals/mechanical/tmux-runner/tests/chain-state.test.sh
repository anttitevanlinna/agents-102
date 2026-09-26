#!/usr/bin/env bash
# The chain hands state from module to module through an explicit chain dir,
# never by guessing the newest out/*/<m>-state.json. The guess breaks when
# two runs overlap or a stale run is newest: a second chain's M1 finishing
# after ours made our M2 position from the OTHER run's ending SHA.
#
# Run: bash tests/chain-state.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."
source "$ROOT/lib/chain.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

out="$(mktemp -d)"
mk_run() {  # $1=run id $2=module $3=sha  -> run dir with a state file
  mkdir -p "$out/$1"
  printf '{\n  "%s_ending_sha": "%s"\n}\n' "$2" "$3" > "$out/$1/$2-state.json"
  echo "$out/$1"
}

echo "[test] the newest-guess picks an overlapping run"
unset CLAUDE_RUNNER_CHAIN_DIR
chain_init "$out" >/dev/null
ours="$(mk_run 20260926-080000-1 m1 aaaaaaa)"; chain_register m1 "$ours"
sleep 1
mk_run 20260926-080500-2 m1 bbbbbbb >/dev/null   # another chain's M1, finished later
newest="$(ls -t "$out"/*/m1-state.json | head -1)"
check "old guess reads the other run (the bug)" "$(dirname "$newest")" "$out/20260926-080500-2"
check "chain_state reads this chain's M1" "$(chain_state m1)" "$ours/m1-state.json"

echo "[test] resume reuses an existing chain dir"
first="$CLAUDE_RUNNER_CHAIN_DIR"
unset CLAUDE_RUNNER_CHAIN_DIR
chain_init "$out" "$first" >/dev/null
check "same chain dir" "$CLAUDE_RUNNER_CHAIN_DIR" "$first"
check "state still resolves after resume" "$(chain_state m1)" "$ours/m1-state.json"

echo "[test] no registration -> empty, never a guess"
check "unregistered module is empty" "$(chain_state m2)" ""

echo "[test] chain_register is a no-op outside a chain"
( unset CLAUDE_RUNNER_CHAIN_DIR; chain_register m9 "$out/x" ) && ok "no chain dir: returns 0" || bad "no chain dir: nonzero"

echo "[test] run_register marks the module on every run dir"
mkdir -p "$out/r1"; run_register m4 "$out/r1"
check ".module written" "$(cat "$out/r1/.module" 2>/dev/null)" "m4"
check "and registered in the chain" "$(cat "$CLAUDE_RUNNER_CHAIN_DIR/m4.run" 2>/dev/null)" "$out/r1"

echo "[test] no chain script guesses the newest state"
g="$(grep -n -E 'ls -t [^|]*out/\*/[^|]*state\.json' "$ROOT"/chain-*.sh || true)"
if [[ -z "$g" ]]; then ok "no ls -t out/*/…state.json in chain scripts"; else bad "newest-guess still present:"; echo "$g" >&2; fi

rm -rf "$out"
echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

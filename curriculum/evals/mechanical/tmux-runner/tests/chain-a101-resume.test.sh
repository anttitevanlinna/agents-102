#!/usr/bin/env bash
# chain-agents-101.sh resume points read declared prior state or stop — the
# same contract chain-ae101.sh holds (4705306f). Agents 101 is ONE growing
# training dir, so a resume that re-arranges moves the prior modules' work to a
# backup and runs the module on an empty dir; one that finds no prior state
# builds on whatever the dir happens to hold. Each case runs the real driver in
# a sandbox: stub run-a101 / arrange record calls, a stub claude satisfies (or
# fails) the CLI preflight.
#
# Run: bash tests/chain-a101-resume.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

SB="$(mktemp -d)"; [[ -n "${KEEP:-}" ]] && echo "SB=$SB" || trap 'rm -rf "$SB"' EXIT
export TRACE="$SB/trace"
mkdir -p "$SB/tr/lib" "$SB/tr/out" "$SB/bin" "$SB/old" "$SB/home/.claude/skills"
cp "$ROOT/chain-agents-101.sh" "$SB/tr/"
cp "$ROOT"/lib/*.sh "$SB/tr/lib/"

cat > "$SB/tr/run-a101.sh" <<'EOF'
#!/usr/bin/env bash
m="" cwd=""
while [[ $# -gt 0 ]]; do case "$1" in --module) m="$2";; --cwd) cwd="$2";; esac; shift 2; done
echo "RUN $m" >> "$TRACE"
d="$(dirname "$0")/out/a101-$m-$RANDOM"; mkdir -p "$d"
printf '{\n  "module": "%s",\n  "cwd": "%s"\n}\n' "$m" "$cwd" > "$d/a101-$m-state.json"
source "$(dirname "$0")/lib/chain.sh"; run_register "a101-$m" "$d"
EOF
cat > "$SB/tr/arrange-agents-101.sh" <<'EOF'
#!/usr/bin/env bash
echo "ARRANGE" >> "$TRACE"
EOF
chmod +x "$SB/tr/run-a101.sh" "$SB/tr/arrange-agents-101.sh"
for v in "bin:2.1.300" "old:1.0.67"; do
  cat > "$SB/${v%%:*}/claude" <<EOF
#!/usr/bin/env bash
case "\$1" in --version) echo "${v#*:} (Claude Code)";; --help) echo 'choices: "auto", "plan"';; esac
EOF
  chmod +x "$SB/${v%%:*}/claude"
done

SUT="$SB/training"; mkdir -p "$SUT"
drive() {   # $1=PATH dir for claude, rest=driver args -> sets out rc; trace in $TRACE
  local p="$1"; shift
  : > "$TRACE"
  out="$(cd "$SB/tr" && HOME="$SB/home" PATH="$SB/$p:$PATH" bash ./chain-agents-101.sh --cwd "$SUT" --material "$SB/mat" "$@" 2>&1)"; rc=$?
}
chain_of() { sed -n 's/^\[chain\] chain dir: \([^ ]*\).*/\1/p' <<< "$out"; }
got() { tr '\n' ' ' < "$TRACE" | sed 's/ $//'; }

echo "[test] run-a101.sh writes its state under the module name it registers"
reg="$(sed -n 's/^run_register "\([^"]*\)".*/\1/p' "$ROOT/run-a101.sh")"
wr="$(sed -n 's/^state="\$run_dir\/\([^"]*\)-state\.json".*/\1/p' "$ROOT/run-a101.sh")"
[[ -n "$reg" && "$reg" == "$wr" ]] && ok "state file = <registered>-state.json ($reg)" || bad "registers '$reg' but writes '$wr-state.json' — chain_state can never find it"

echo "[test] fresh prework..m2: arrange, then each module"
drive bin --from prework --to m2
[[ $rc -eq 0 && "$(got)" == "ARRANGE RUN prework RUN m1 RUN m2" ]] && ok "prework..m2 arranges and runs" || bad "prework..m2 rc=$rc trace='$(got)'"
full_chain="$(chain_of)"

echo "[test] resume without --chain-dir stops before touching the dir"
drive bin --from m3 --to m3
[[ $rc -ne 0 && -z "$(got)" ]] && ok "m3 with no m2 state: refused, no arrange, no run" || bad "rc=$rc trace='$(got)'"
grep -q -- '--chain-dir' <<< "$out" && ok "error names --chain-dir" || bad "error lacks --chain-dir: $out"
grep -q "$full_chain" <<< "$out" && ok "error lists the chain that ran m2" || bad "recent chains not listed: $out"

echo "[test] resume from the chain that ran m2: no re-arrange"
drive bin --from m3 --to m3 --chain-dir "$full_chain"
[[ $rc -eq 0 && "$(got)" == "RUN m3" ]] && ok "m3 resumes on m2 state without arranging" || bad "rc=$rc trace='$(got)' out=$out"

echo "[test] explicit arrange on a resume is a contradiction"
drive bin --from m4a --to m4a --chain-dir "$full_chain" --arrange
[[ $rc -ne 0 && -z "$(got)" ]] && ok "--arrange with --from m4a refused" || bad "rc=$rc trace='$(got)'"

echo "[test] prior state from another training dir is not this dir's state"
mv "$SUT" "$SB/elsewhere"; SUT_SAVE="$SUT"; SUT="$SB/other"; mkdir -p "$SUT"
drive bin --from m4a --to m4a --chain-dir "$full_chain"
[[ $rc -ne 0 && -z "$(got)" ]] && ok "m3 state for a different cwd: refused" || bad "rc=$rc trace='$(got)'"
SUT="$SUT_SAVE"; mv "$SB/elsewhere" "$SUT"

echo "[test] m4b builds on m4a, not m3"
drive bin --from m4b --to m4b --chain-dir "$full_chain"
[[ $rc -ne 0 && -z "$(got)" ]] && ok "m4b without m4a state: refused" || bad "rc=$rc trace='$(got)'"

echo "[test] a stale claude stops the chain before arrange moves the dir"
drive old --from prework --to prework
[[ $rc -ne 0 && -z "$(got)" ]] && ok "preflight runs before arrange" || bad "rc=$rc trace='$(got)'"
grep -q '\[preflight\]' <<< "$out" && ok "preflight names the problem" || bad "no preflight message: $out"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

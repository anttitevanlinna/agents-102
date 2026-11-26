#!/usr/bin/env bash
# The open (self-study) edition runs prework, M1-M6 and the solo module
# agents-building-agents-solo; M7 and M8 are the team edition. The runner had no
# solo scenario, so the public edition's last module was never driven live
# (Antti, 2026-11-26: run the seven-module public version).
#
# Checks: the scenario sends the solo module's prompts in page order; the
# student-written brief lands through a guarded directive; the new-agent and
# rewritten-M2-agent helpers pick the right files; the chain runs solo on M6
# state and never runs M7/M8 in the open edition.
# Run: bash tests/a101-solo.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."
CUR="$ROOT/../../.."                       # curriculum/
source "$ROOT/lib/assertions.sh"
source "$ROOT/lib/a101-case.sh"
set +e
pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

echo "[test] scenario sends the solo module's prompts in page order"
# Page order = exercise prompts (build-for-the-gap.md), then the module debrief.
want="$( { grep -oE '\{\{prompt:[^}]+\}\}' "$CUR/exercises/build-for-the-gap.md"
           grep -oE '\{\{prompt:[^}]+\}\}' "$CUR/trainings/agents-101/agents-building-agents-solo.md"; } \
         | sed 's/{{prompt:\(.*\)}}/\1/' | tr '\n' ' ')"
scen="$ROOT/scenarios/a101-solo.txt"
got="$(grep -vE '^[[:space:]]*(#|$|\*|@)' "$scen" 2>/dev/null | awk '{print $1}' | tr '\n' ' ')"
[[ -n "$got" && "$got" == "$want" ]] && ok "keys: $got" || bad "scenario keys [$got] != page order [$want]"
grep -qE "^@student-writes module-7/brief\.md answers/solo-brief\.txt$" "$scen" \
  && ok "brief is a student-written file, not a prompt" || bad "no @student-writes module-7/brief.md directive"
grep -qE "^@student-writes module-6/trigger\.md answers/solo-trigger\.txt$" "$scen" \
  && ok "M6 homework trigger is student-written" || bad "no @student-writes module-6/trigger.md directive"
awk '/^@student-writes module-7\/brief/{d=NR} /^build-for-the-gap-1/{b=NR} END{exit !(d && b && d<b)}' "$scen" \
  && ok "brief lands before build-for-the-gap-1" || bad "brief directive not before build-for-the-gap-1"

echo "[test] nordveil carries the solo answers"
KIT="$ROOT/fixtures/agents-101-synthetic"
for f in answers/solo-person.txt answers/solo-brief.txt answers/solo-trigger.txt solo/pilot-accounts.md solo/pricing-rules.md; do
  [[ -s "$KIT/$f" ]] && ok "$f" || bad "missing $f"
done
grep -q '<SOLO_PERSON>' "$scen" && ok "person answers substituted" || bad "scenario never sends <SOLO_PERSON>"
grep -qE '<SOLO_PERSON>' "$ROOT/run-a101.sh" && ok "run-a101 substitutes <SOLO_PERSON>" || bad "run-a101 lacks <SOLO_PERSON>"
grep -qE '^    solo:[1-4]\)' "$ROOT/run-a101.sh" && [[ "$(grep -cE '^    solo:[1-4]\)' "$ROOT/run-a101.sh")" -eq 4 ]] \
  && ok "four solo assertions" || bad "run-a101 lacks solo:1..4 assertions"

echo "[test] solo ranks after m6 and nordveil supports it"
a101_load_case "$ROOT" nordveil
[[ "$(a101_module_rank solo)" -gt "$(a101_module_rank m6)" ]] && ok "solo after m6" || bad "rank solo='$(a101_module_rank solo)'"
a101_case_supports_module solo && ok "nordveil supports solo" || bad "nordveil refuses solo"

echo "[test] a101_student_writes copies once, inside the training dir"
SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT
mkdir -p "$SB/sut"; printf 'four lines\n' > "$SB/brief.txt"
a101_student_writes "$SB/sut" module-7/brief.md "$SB/brief.txt" >/dev/null 2>&1 \
  && cmp -s "$SB/brief.txt" "$SB/sut/module-7/brief.md" && ok "writes module-7/brief.md" || bad "brief not written"
printf 'agent wrote this\n' > "$SB/sut/module-7/brief.md"
a101_student_writes "$SB/sut" module-7/brief.md "$SB/brief.txt" >/dev/null 2>&1 \
  && bad "overwrote an existing file" || ok "refuses to overwrite"
a101_student_writes "$SB/sut" ../escape.md "$SB/brief.txt" >/dev/null 2>&1 \
  && bad "wrote outside the training dir" || ok "refuses .. paths"
a101_student_writes "$SB/sut" /tmp/abs.md "$SB/brief.txt" >/dev/null 2>&1 \
  && bad "wrote an absolute path" || ok "refuses absolute paths"

echo "[test] new agent and rewritten prior agent"
A="$SB/agents"; mkdir -p "$A"
printf 'm2\n' > "$A/pricing-challenge.md"; printf 'hw\n' > "$A/morning.md"
touch -t 202601010000 "$A/pricing-challenge.md" "$A/morning.md"
a101_list_agents "$A" > "$SB/before"
base=$(( $(date +%s) - 2 ))
printf 'new\n' > "$A/pilot-review-prep.md"
[[ "$(a101_new_agent "$A" "$SB/before")" == "$A/pilot-review-prep.md" ]] && ok "new agent found" || bad "new agent: '$(a101_new_agent "$A" "$SB/before")'"
[[ -z "$(a101_rewritten_prior_agent "$A" "$SB/before" "$base")" ]] && ok "no prior agent rewritten yet" || bad "false rewrite"
printf 'rewritten\n' > "$A/pricing-challenge.md"
[[ "$(a101_rewritten_prior_agent "$A" "$SB/before" "$base")" == "$A/pricing-challenge.md" ]] && ok "rewritten M2 agent found" || bad "rewrite: '$(a101_rewritten_prior_agent "$A" "$SB/before" "$base")'"

echo "[test] built agent reading memory/ vs forbidding it"
printf 'Do not read `memory/`, `sources/` or drafts/.\nInputs: module-7/mara/pilot-accounts.md\n' > "$SB/neg.md"
a101_agent_reads_memory "$SB/neg.md" && bad "a 'do not read memory/' line counted as reading it" || ok "forbidding memory/ is not reading it"
printf 'Inputs: module-7/mara/pilot-accounts.md, memory/pricing.md\n' > "$SB/pos.md"
a101_agent_reads_memory "$SB/pos.md" && ok "an input in memory/ is reading it" || bad "memory/ input missed"

echo "[test] chain: open edition stops at solo, never runs m7/m8"
T="$SB/tr"; export TRACE="$SB/trace"
mkdir -p "$T/lib" "$T/out" "$T/fixtures/agents-101-synthetic" "$SB/bin" "$SB/home/.claude/skills" "$SB/training"
cp "$ROOT/chain-agents-101.sh" "$T/"; cp "$ROOT"/lib/*.sh "$T/lib/"
cp "$ROOT/fixtures/agents-101-synthetic/case.sh" "$T/fixtures/agents-101-synthetic/"
cat > "$T/run-a101.sh" <<'EOF'
#!/usr/bin/env bash
m="" cwd=""
while [[ $# -gt 0 ]]; do case "$1" in --module) m="$2";; --cwd) cwd="$2";; esac; shift 2; done
echo "RUN $m" >> "$TRACE"
d="$(dirname "$0")/out/a101-$m-$RANDOM"; mkdir -p "$d"
printf '{\n  "module": "%s",\n  "cwd": "%s"\n}\n' "$m" "$cwd" > "$d/a101-$m-state.json"
source "$(dirname "$0")/lib/chain.sh"; run_register "a101-$m" "$d"
EOF
printf '#!/usr/bin/env bash\necho ARRANGE >> "$TRACE"\n' > "$T/arrange-agents-101.sh"
cat > "$SB/bin/claude" <<'EOF'
#!/usr/bin/env bash
case "$1" in --version) echo "2.1.300 (Claude Code)";; --help) echo 'choices: "auto", "plan"';; esac
EOF
chmod +x "$T/run-a101.sh" "$T/arrange-agents-101.sh" "$SB/bin/claude"
drive() { : > "$TRACE"; out="$(cd "$T" && HOME="$SB/home" PATH="$SB/bin:$PATH" bash ./chain-agents-101.sh --cwd "$SB/training" --material "$SB/mat" "$@" 2>&1)"; rc=$?; }
trace() { tr '\n' ' ' < "$TRACE" | sed 's/ $//'; }
drive --from prework --to solo
[[ $rc -eq 0 && "$(trace)" == "ARRANGE RUN prework RUN m1 RUN m2 RUN m3 RUN m4a RUN m4b RUN m5 RUN m6 RUN solo" ]] \
  && ok "prework..solo skips m7/m8" || bad "rc=$rc trace='$(trace)' $out"
chain="$(sed -n 's/^\[chain\] chain dir: \([^ ]*\).*/\1/p' <<< "$out")"
drive --from prework --to m6
c2="$(sed -n 's/^\[chain\] chain dir: \([^ ]*\).*/\1/p' <<< "$out")"
drive --from solo --chain-dir "$c2"
[[ $rc -eq 0 && "$(trace)" == "RUN solo" ]] && ok "--from solo resumes on m6 state" || bad "rc=$rc trace='$(trace)' $out"
drive --from m7 --to solo --chain-dir "$c2"
[[ $rc -ne 0 && -z "$(trace)" ]] && ok "m7..solo mixes editions: refused" || bad "rc=$rc trace='$(trace)'"
drive --from prework --to m8
[[ $rc -eq 0 && "$(trace)" == "ARRANGE RUN prework RUN m1 RUN m2 RUN m3 RUN m4a RUN m4b RUN m5 RUN m6 RUN m7 RUN m8" ]] \
  && ok "team edition unchanged (no solo)" || bad "team trace='$(trace)'"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

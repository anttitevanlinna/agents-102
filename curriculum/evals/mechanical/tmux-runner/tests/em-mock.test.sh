#!/usr/bin/env bash
# The Engineering Manager mock runs on the canonical engine: its chain resumes
# only from declared prior state (the Agents 101 contract, lib/chain.sh), runs
# the CLI preflight before arrange, and its per-turn assertions pass a real
# deliverable and fail each planted defect.
#
# Run: bash tests/em-mock.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT
export TRACE="$SB/trace"

# ---- chain: sandbox with stub runner / arranger / claude ------------------
mkdir -p "$SB/tr/lib" "$SB/tr/out" "$SB/bin" "$SB/old" "$SB/home/.claude/skills"
cp "$ROOT/chain-em-mock.sh" "$SB/tr/"
cp "$ROOT"/lib/*.sh "$SB/tr/lib/"
cat > "$SB/tr/run-em.sh" <<'EOF'
#!/usr/bin/env bash
m="" cwd=""
while [[ $# -gt 0 ]]; do case "$1" in --module) m="$2";; --cwd) cwd="$2";; esac; shift 2; done
echo "RUN $m" >> "$TRACE"
d="$(dirname "$0")/out/em-mock-$m-$RANDOM"; mkdir -p "$d"
printf '{\n  "module": "%s",\n  "cwd": "%s"\n}\n' "$m" "$cwd" > "$d/em-mock-$m-state.json"
source "$(dirname "$0")/lib/chain.sh"; run_register "em-mock-$m" "$d"
EOF
cat > "$SB/tr/arrange-em-mock.sh" <<'EOF'
#!/usr/bin/env bash
echo "ARRANGE" >> "$TRACE"
EOF
chmod +x "$SB/tr/run-em.sh" "$SB/tr/arrange-em-mock.sh"
for v in "bin:2.1.300" "old:1.0.67"; do
  cat > "$SB/${v%%:*}/claude" <<EOF
#!/usr/bin/env bash
case "\$1" in --version) echo "${v#*:} (Claude Code)";; --help) echo 'choices: "auto", "plan"';; esac
EOF
  chmod +x "$SB/${v%%:*}/claude"
done
SUT="$SB/training"; mkdir -p "$SUT"
drive() {
  local p="$1"; shift
  : > "$TRACE"
  out="$(cd "$SB/tr" && HOME="$SB/home" PATH="$SB/$p:$PATH" bash ./chain-em-mock.sh --cwd "$SUT" "$@" 2>&1)"; rc=$?
}
got() { tr '\n' ' ' < "$TRACE" | sed 's/ $//'; }

echo "[test] run-em.sh writes its state under the module name it registers"
reg="$(sed -n 's/^run_register "\([^"]*\)".*/\1/p' "$ROOT/run-em.sh")"
wr="$(sed -n 's/^state="\$run_dir\/\([^"]*\)-state\.json".*/\1/p' "$ROOT/run-em.sh")"
[[ -n "$reg" && "$reg" == "$wr" ]] && ok "state file = <registered>-state.json ($reg)" || bad "registers '$reg' but writes '$wr-state.json'"

echo "[test] chain: fresh run, resume, refusals"
drive bin
[[ $rc -eq 0 && "$(got)" == "ARRANGE RUN m1 RUN m2" ]] && ok "m1..m2 arranges and runs both" || bad "rc=$rc trace='$(got)' $out"
chain="$(sed -n 's/^\[chain\] chain dir: \([^ ]*\).*/\1/p' <<< "$out")"
drive bin --from m2
[[ $rc -ne 0 && -z "$(got)" ]] && grep -q -- '--chain-dir' <<< "$out" && ok "m2 without M1 state: refused, names --chain-dir" || bad "rc=$rc trace='$(got)'"
drive bin --from m2 --chain-dir "$chain"
[[ $rc -eq 0 && "$(got)" == "RUN m2" ]] && ok "m2 resumes on M1 state without arranging" || bad "rc=$rc trace='$(got)' $out"
drive bin --from m2 --chain-dir "$chain" --arrange
[[ $rc -ne 0 && -z "$(got)" ]] && ok "--arrange on a resume refused" || bad "rc=$rc trace='$(got)'"
SUT_SAVE="$SUT"; SUT="$SB/other"; mkdir -p "$SUT"
drive bin --from m2 --chain-dir "$chain"
[[ $rc -ne 0 && -z "$(got)" ]] && ok "M1 state from another training dir: refused" || bad "rc=$rc trace='$(got)'"
SUT="$SUT_SAVE"
drive old
[[ $rc -ne 0 && -z "$(got)" ]] && grep -q '\[preflight\]' <<< "$out" && ok "stale claude stops before arrange" || bad "rc=$rc trace='$(got)'"

# ---- assertions: a real deliverable passes, each planted defect fails ------
echo "[test] per-turn assertions"
W="$SB/w"; mkdir -p "$W"; echo notes > "$W/team-notes.md"
good_m1() { cat <<'EOF'
# Team leadership memory

## Team Knowledge

### People
- **Aleksi** (Ability high, Desire low for visibility). Hypothesis: burned by the last champion. "not going to be the AI guy"
- **Petra** (Awareness, Desire conditional). Observation: "show me it doesn't hallucinate a ledger entry"
- **Jonas** (Desire low). Rule candidate, hypothesis for now: mandates get reversed.
- **Sofia** (Ability without Knowledge of review). Observation.
- **Tuomas** (Desire high). Observation: asked twice for budget.
- **Ingrid** (Knowledge, Reinforcement missing). Hypothesis.
- **Mikko** (Awareness only). Observation.
- **Mimi**: notes too thin to place.

### Team
Chatting tier. Hypothesis: waiting out mandates is rational here.

## Decision Journal

## Quality Gate
EOF
}
m1() { ( cd "$W" && RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --module m1 --cwd "$W" && assert_turn m1 1 /dev/null 0 ) >/dev/null 2>&1; }
m2() { ( cd "$W" && RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --module m2 --cwd "$W" && assert_turn m2 1 /dev/null "$1" ) >/dev/null 2>&1; }

good_m1 > "$W/team-leadership.md"
m1 && ok "m1: complete memory passes (sub-headings stay inside Team Knowledge)" || bad "m1: complete memory failed"
good_m1 | sed '/^## Quality Gate/d' > "$W/team-leadership.md"
m1 && bad "m1: missing Quality Gate section passed" || ok "m1: missing Quality Gate section fails"
good_m1 | sed '/Tuomas/d' > "$W/team-leadership.md"
m1 && bad "m1: unplaced person passed" || ok "m1: a person not placed fails"
good_m1 | sed 's/[Hh]ypothesis/note/g' > "$W/team-leadership.md"
m1 && bad "m1: untiered entries passed" || ok "m1: no hypothesis tier fails"
good_m1 | awk '/^- \*\*Jonas/ {next} /^## Decision Journal/ {print; print "- **Jonas** (Desire low)"; next} 1' > "$W/team-leadership.md"
m1 && bad "m1: person placed only outside Team Knowledge passed" || ok "m1: a person placed outside Team Knowledge fails"

# Mimi's notes are one line: the memory must say so, and a model may put her
# name and the "too thin" on separate lines (live run 2026-09-27 did).
thin() { ( cd "$W" && RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --module m1 --cwd "$W" && thin_notes_named Mimi ) >/dev/null 2>&1; }
good_m1 > "$W/team-leadership.md"
thin && ok "thin notes: same-line flag found" || bad "thin notes: same-line flag missed"
good_m1 | awk '/^- \*\*Mimi/ {print "**Mimi Kallio** (new transfer)"; print "- [Observation] Notes are too thin to place her on ADKAR at all."; next} 1' > "$W/team-leadership.md"
thin && ok "thin notes: flag on the line after her name found" || bad "thin notes: next-line flag missed"
good_m1 | sed 's/^- \*\*Mimi.*/- **Mimi** (Desire high, Ability high)./' > "$W/team-leadership.md"
thin && bad "thin notes: a confident placement passed" || ok "thin notes: a confident placement fails"

journal='## Decision Journal
- Ask first: Q1, Q3, Q5. On the table: all seven. Why: they let people show agency. Give up: the budget question.'
gate='## Quality Gate
- In a week, at least three people answered with something they would try.'
qs='1. What would you build first?
2. Where does review slow you?
3. What did 2023 teach you?
4. Which tool do you trust?
5. Who do you ask?'
write_m2() {  # $1=journal $2=gate
  good_m1 | sed '/^## Decision Journal/,$d' > "$W/team-leadership.md"
  printf '%s\n\n%s\n' "$1" "$2" >> "$W/team-leadership.md"
}
base=$(( $(date +%s) - 5 ))
echo "$qs" > "$W/starter-questions.md"; write_m2 "$journal" "$gate"
m2 "$base" && ok "m2: questions + journaled pick + gate check passes" || bad "m2: complete deliverable failed"
write_m2 "$journal" "## Quality Gate"
m2 "$base" && bad "m2: empty Quality Gate passed" || ok "m2: empty Quality Gate fails"
write_m2 "## Decision Journal
- Ask Q1, Q3, Q5." "$gate"
m2 "$base" && bad "m2: pick without alternatives passed" || ok "m2: pick logged without alternatives fails"
echo "$qs" | head -3 > "$W/starter-questions.md"; write_m2 "$journal" "$gate"
m2 "$base" && bad "m2: three questions passed" || ok "m2: fewer than five questions fails"
echo "$qs" > "$W/starter-questions.md"; write_m2 "$journal" "$gate"
m2 $(( $(date +%s) + 60 )) && bad "m2: memory not updated passed" || ok "m2: memory not touched this turn fails"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

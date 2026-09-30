#!/usr/bin/env bash
# Leading agentic engineering (training key engineering-management) runs on the
# EM mock's engine: run-em.sh --training em. A generated training cannot carry
# hand-written per-turn assertions for prompts that are regenerated, so each
# prompt turn is checked against its own registry contract: every `produces:`
# location exists afterwards and at least one of them was written this turn.
# Module-end checks add the few claims the training rests on. chain-em.sh lays
# each synthetic week (fixtures/em-synthetic/week-N) into the training dir
# between modules, never over the manager's own files.
#
# Run: bash tests/em-training.test.sh
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

SB="$(mktemp -d)"; trap 'rm -rf "$SB"' EXIT

# ---- contract assertion against a stub registry ----------------------------
mkdir -p "$SB/prompts" "$SB/w"
cat > "$SB/prompts/t-two.md" <<'EOF'
---
key: t-two
produces:
  - id: a
    location: memo.md
  - id: b
    location: agents/
  - id: c
    location: diagnostics/check-<date>.md
---
Body.
EOF
W="$SB/w"
contract() { ( cd "$W" && PROMPT_REGISTRY="$SB/prompts" RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --training em --module m1 --cwd "$W" && assert_contract t-two "$1" ) >/dev/null 2>&1; }
base=$(( $(date +%s) - 2 ))
mkdir -p "$W/agents" "$W/diagnostics"; echo x > "$W/memo.md"; echo x > "$W/agents/a.md"; echo x > "$W/diagnostics/check-2026-09-30.md"
contract "$base" && ok "all produced locations present, one written this turn: pass" || bad "a real deliverable failed the contract"
mv "$W/agents" "$W/agents.away"
contract "$base" && bad "a missing produced folder passed" || ok "a missing produced folder fails"
mv "$W/agents.away" "$W/agents"; rm "$W/agents/a.md"
contract "$base" && ok "an empty produced folder passes (a prompt may create the place for later runs)" || bad "an empty produced folder failed"
echo x > "$W/agents/a.md"; rm "$W/diagnostics/check-2026-09-30.md"
contract "$base" && bad "a missing dated file passed" || ok "a missing <date> file fails"
echo x > "$W/diagnostics/check-2026-09-30.md"
touch -t 202001010000 "$W/memo.md" "$W/agents/a.md" "$W/diagnostics/check-2026-09-30.md" "$W/agents" "$W/diagnostics"
contract "$base" && bad "a turn that wrote nothing passed" || ok "a turn that wrote nothing it declares fails"

cat > "$SB/prompts/t-chat.md" <<'EOF2'
---
key: t-chat
produces:
  - id: talk
    location: scrollback
    consumed-by:
      - prompt:t-two
---
Body.
EOF2
chat() { ( cd "$W" && PROMPT_REGISTRY="$SB/prompts" RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --training em --module m1 --cwd "$W" && assert_contract t-chat "$1" ) >/dev/null 2>&1; }
chat "$base" && ok "a chat-only prompt (produces scrollback) owes no file" || bad "a scrollback-only prompt failed the contract"

# ---- module-end checks ------------------------------------------------------
mod_end() { ( cd "$W" && RUN_EM_SOURCE_ONLY=1 source "$ROOT/run-em.sh" --training em --module "$1" --cwd "$W" && assert_module_end "$1" ) >/dev/null 2>&1; }
rm -rf "$W"; mkdir -p "$W"
cat > "$W/team-leadership.md" <<'EOF'
# Team leadership
## Team Knowledge
- Aleksi: Desire (hypothesis). Petra: Knowledge. Jonas: Desire. Sofia: Ability. Tuomas: Desire. Ingrid: Ability. Mikko: Awareness. Mimi: notes too thin to place.
- crux (hypothesis): review of agent-written code has no owner.
- crux (hypothesis): the settlement edge cases live in one head.
## Decision Journal
- Placements, and why. Confidence baseline: 4.
## Quality Gate
- Did you make progress?
EOF
mod_end m1 && ok "M1 end: three blocks, everyone placed, a hypothesis, the baseline" || bad "a good M1 memory failed"
sed -i.bak 's/Confidence baseline: 4\./Confidence baseline: not recorded./' "$W/team-leadership.md"
mod_end m1 && bad "M1 end passed with no confidence baseline" || ok "M1 end fails when the confidence baseline is not recorded"
sed -i.bak 's/Confidence baseline: not recorded\./Confidence baseline: 4./' "$W/team-leadership.md"
sed -i.bak 's/Ingrid: Ability. //' "$W/team-leadership.md"
mod_end m1 && bad "M1 end passed with a person missing" || ok "M1 end fails when a person is not placed"
mod_end m3 && ok "M3 end: two crux-tagged hypotheses" || bad "two crux failed M3 end"
sed -i.bak '/settlement edge/d' "$W/team-leadership.md"
mod_end m3 && bad "M3 end passed with one crux" || ok "M3 end fails on one crux"
mod_end m4 && bad "M4 end passed with no intent or creation" || ok "M4 end fails without intent.md and creation/"
echo "We are betting that owning review moves both crux." > "$W/intent.md"; mkdir -p "$W/creation"; echo x > "$W/creation/agent.md"
mod_end m4 && ok "M4 end: intent.md and a creation" || bad "a real M4 end failed"

# ---- chain: weeks land between modules, never over the manager's files ------
mkdir -p "$SB/tr/lib" "$SB/tr/out" "$SB/tr/fixtures/em-synthetic/week-1/observations" "$SB/tr/fixtures/em-synthetic/week-2/responses" "$SB/bin" "$SB/home/.claude/skills" "$SB/sample"
cp "$ROOT/chain-em.sh" "$SB/tr/"; cp "$ROOT"/lib/*.sh "$SB/tr/lib/"
echo "week1 obs" > "$SB/tr/fixtures/em-synthetic/week-1/observations/a.md"
echo "fixture" > "$SB/tr/fixtures/em-synthetic/week-2/responses/petra.md"
echo "sample peer" > "$SB/sample/sample-peer-export.md"
export TRACE="$SB/trace"
cat > "$SB/tr/run-em.sh" <<'EOF'
#!/usr/bin/env bash
m="" cwd=""
while [[ $# -gt 0 ]]; do case "$1" in --module) m="$2";; --cwd) cwd="$2";; --training) ;; esac; shift 2; done
echo "RUN $m $(ls "$cwd"/observations "$cwd"/responses "$cwd"/peers 2>/dev/null | tr '\n' ' ')" >> "$TRACE"
[[ "$m" == m2 ]] && { mkdir -p "$cwd/responses"; echo "manager's own" > "$cwd/responses/petra.md"; }
d="$(dirname "$0")/out/em-$m-$RANDOM"; mkdir -p "$d"
printf '{\n  "module": "%s",\n  "cwd": "%s"\n}\n' "$m" "$cwd" > "$d/em-$m-state.json"
source "$(dirname "$0")/lib/chain.sh"; run_register "em-$m" "$d"
EOF
cat > "$SB/tr/arrange-em.sh" <<'EOF'
#!/usr/bin/env bash
echo "ARRANGE" >> "$TRACE"
EOF
cat > "$SB/bin/claude" <<'EOF'
#!/usr/bin/env bash
case "$1" in --version) echo "2.1.300 (Claude Code)";; --help) echo 'choices: "auto", "plan"';; esac
EOF
chmod +x "$SB/tr/run-em.sh" "$SB/tr/arrange-em.sh" "$SB/bin/claude"
CW="$SB/cwd"; mkdir -p "$CW"
( export PATH="$SB/bin:$PATH" HOME="$SB/home" EM_SAMPLE_PEER="$SB/sample/sample-peer-export.md"; bash "$SB/tr/chain-em.sh" --to m3 --cwd "$CW" ) >"$SB/chain.log" 2>&1
grep -q '^RUN m1 $' "$TRACE" && ok "M1 runs on the manager's notes alone" || bad "M1 saw a later week: $(grep 'RUN m1' "$TRACE")"
grep -q '^RUN m2 .*a.md' "$TRACE" && ok "week 1 observations are there for M2" || bad "week 1 missing at M2"
grep '^RUN m3 ' "$TRACE" | grep -q 'petra.md' && grep '^RUN m3 ' "$TRACE" | grep -q 'sample.md' && ok "week 2 answers and the sample peer are there for M3" || bad "week 2 missing at M3: $(grep 'RUN m3' "$TRACE")"
[[ "$(cat "$CW/responses/petra.md")" == "manager's own" ]] && ok "a week never overwrites the manager's own file" || bad "fixture overwrote the manager's file"

# With no --to, the chain runs every module (it inherited the mock's --to m2).
: > "$TRACE"; CW2="$SB/cwd2"; mkdir -p "$CW2"
( export PATH="$SB/bin:$PATH" HOME="$SB/home" EM_SAMPLE_PEER="$SB/sample/sample-peer-export.md"; bash "$SB/tr/chain-em.sh" --cwd "$CW2" ) >"$SB/chain2.log" 2>&1
[[ "$(grep -c '^RUN ' "$TRACE")" == 4 ]] && grep -q '^RUN m4' "$TRACE" && ok "no --to runs M1 through M4" || bad "default slice ran: $(grep -o '^RUN m[0-9]' "$TRACE" | tr '\n' ' ')"

# The kit's notes open on the confidence rating, as write-your-team-notes asks.
head -1 "$ROOT/fixtures/em-synthetic/team-notes.md" | grep -qE '^[0-9]+\b' && ok "EM kit notes: line one is the 1-10 rating" || bad "EM kit notes do not open on the rating"
grep -q 'em-synthetic/team-notes.md' "$ROOT/arrange-em.sh" && ok "arrange-em.sh lays the EM kit's notes" || bad "arrange-em.sh still lays the mock's notes"

echo "em-training.test.sh: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

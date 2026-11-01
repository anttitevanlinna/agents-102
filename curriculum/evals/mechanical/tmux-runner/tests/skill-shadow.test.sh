#!/usr/bin/env bash
# Guards the M4 skill-name collision (2026-11-01 live chain on the maintainer's Mac).
#
# The student authors a project skill named agent-audit. A personal skill of
# the same name in the claude.ai account (saved by the Cowork path of the same
# exercise) syncs into Claude Code as `anthropic-skills:<name>` under
# ~/.claude/skills/synced/<bucket>/. Its body is the course's own skill, so every
# m4b content grep passes whichever copy fired: green-but-broken.
#
# Contract:
#   a101_shadow_skills NAME [SKILLS_DIR] prints every user-scope or synced copy
#     of NAME (one path per line); prints nothing when there is none.
#   assert_skill_not_shadowed LABEL TRANSCRIPT NAME fails when the transcript
#     shows a namespaced load (Skill(<ns>:NAME)) and passes on the bare Skill(NAME)
#     or when no skill call shows at all (slash loads render without one).
# Run: bash tests/skill-shadow.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

# --- a101_shadow_skills ------------------------------------------------------
skills="$tmp/skills"; mkdir -p "$skills"
[[ -z "$(a101_shadow_skills agent-audit "$skills")" ]] \
  && ok "empty skills dir: no shadow" || bad "empty skills dir reported a shadow"

mkdir -p "$skills/synced/abc_def/agent-audit"; touch "$skills/synced/abc_def/agent-audit/SKILL.md"
out="$(a101_shadow_skills agent-audit "$skills")"
[[ "$out" == *"synced/abc_def/agent-audit"* ]] \
  && ok "synced copy found" || bad "synced copy missed (got: $out)"

mkdir -p "$skills/agent-audit"; touch "$skills/agent-audit/SKILL.md"
n="$(a101_shadow_skills agent-audit "$skills" | wc -l | tr -d ' ')"
[[ "$n" == 2 ]] && ok "user-scope + synced both found" || bad "expected 2 shadows, got $n"

mkdir -p "$skills/agent-audit-nordveil"; touch "$skills/agent-audit-nordveil/SKILL.md"
n="$(a101_shadow_skills agent-audit "$skills" | wc -l | tr -d ' ')"
[[ "$n" == 2 ]] && ok "prefix-named skill is not a shadow" || bad "prefix match counted as shadow ($n)"

# --- assert_skill_not_shadowed ------------------------------------------------
t="$tmp/t.txt"
printf '⏺ Skill(anthropic-skills:agent-audit)\n  ⎿  Successfully loaded skill\n' > "$t"
assert_skill_not_shadowed "ns load" "$t" agent-audit 2>/dev/null \
  && bad "namespaced load passed" || ok "namespaced load fails"

printf '⏺ Skill(agent-audit)\n  ⎿  Successfully loaded skill\n' > "$t"
assert_skill_not_shadowed "bare load" "$t" agent-audit >/dev/null 2>&1 \
  && ok "bare load passes" || bad "bare load failed"

printf '> /agent-audit — load the skill\nreport written\n' > "$t"
assert_skill_not_shadowed "slash only" "$t" agent-audit >/dev/null 2>&1 \
  && ok "no skill call shown passes" || bad "slash-only transcript failed"

echo "skill-shadow: $pass passed, $fail failed"
[[ $fail -eq 0 ]]

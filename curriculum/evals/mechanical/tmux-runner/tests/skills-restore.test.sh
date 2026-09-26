#!/usr/bin/env bash
# A chain leaves ~/.claude/skills exactly as it found it — on success, on
# failure, on Ctrl-C. Prework installs access-control-analysis / stride /
# security-tools, M3 authors test-strategy-<sut>, M6 authors
# session-shaper-<sut>, arrange removes -<sut> skills; before this, all of it
# stayed in the maintainer's user scope, loaded into every later session and
# set up the next run's skill-name clash (2026-09-26).
#
# Run: bash tests/skills-restore.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

fingerprint() { ( cd "$1" && find . -print0 | sort -z | xargs -0 ls -ld 2>/dev/null | awk '{print $1, $NF}'; find . -type f -print0 | sort -z | xargs -0 cat 2>/dev/null | shasum ) ; }

setup() {
  work="$(mktemp -d)"; skills="$work/skills"; outd="$work/out"
  mkdir -p "$skills/keep-me" "$skills/edit-me" "$skills/delete-me" "$outd"
  echo original > "$skills/keep-me/SKILL.md"
  echo original > "$skills/edit-me/SKILL.md"
  echo original > "$skills/delete-me/SKILL.md"
  ln -s ../keep-me "$skills/link-me"
  before="$(fingerprint "$skills")"
}

# A stand-in chain: snapshot + trap exactly as the real chains install them,
# then do what a run does to user-scope skills, then exit with $1.
fake_chain() {
  CLAUDE_RUNNER_SKILLS_DIR="$skills" bash -c "
    set -euo pipefail
    source '$ROOT/lib/chain.sh'
    chain_init '$outd' >/dev/null
    chain_guard_skills
    mkdir -p '$skills/stride'; echo student > '$skills/stride/SKILL.md'
    echo sharpened >> '$skills/edit-me/SKILL.md'
    rm -rf '$skills/delete-me'
    echo reached > '$work/reached'     # proves the run really changed skills
    $1
  " >/dev/null 2>&1
}

echo "[test] success path restores"
setup; fake_chain "exit 0"
check "run reached its skill edits (a clean run)" "$(cat "$work/reached" 2>/dev/null)" "reached"
check "skills identical after a clean run" "$(fingerprint "$skills")" "$before"; rm -rf "$work"

echo "[test] failure path restores"
setup; fake_chain "false"
check "run reached its skill edits (a failing run)" "$(cat "$work/reached" 2>/dev/null)" "reached"
check "skills identical after a failing run" "$(fingerprint "$skills")" "$before"; rm -rf "$work"

echo "[test] interrupt restores"
setup; fake_chain "kill -INT \$\$; sleep 5"
check "run reached its skill edits (SIGINT)" "$(cat "$work/reached" 2>/dev/null)" "reached"
check "skills identical after SIGINT" "$(fingerprint "$skills")" "$before"; rm -rf "$work"

echo "[test] resume gets the chain's own skills back, then cleans up again"
setup
CLAUDE_RUNNER_SKILLS_DIR="$skills" bash -c "
  set -euo pipefail; source '$ROOT/lib/chain.sh'
  chain_init '$outd' >/dev/null; chain_guard_skills
  echo \"\$CLAUDE_RUNNER_CHAIN_DIR\" > '$work/chain'
  mkdir -p '$skills/test-strategy-sut'; echo m3 > '$skills/test-strategy-sut/SKILL.md'
" >/dev/null 2>&1
check "authored skill gone after the first chain exits" "$(ls "$skills" | grep -c test-strategy-sut)" "0"
CLAUDE_RUNNER_SKILLS_DIR="$skills" bash -c "
  set -euo pipefail; source '$ROOT/lib/chain.sh'
  chain_init '$outd' \"\$(cat '$work/chain')\" >/dev/null; chain_guard_skills
  cat '$skills/test-strategy-sut/SKILL.md' > '$work/seen' 2>/dev/null || true
" >/dev/null 2>&1
check "resumed chain sees the skill M3 wrote" "$(cat "$work/seen" 2>/dev/null)" "m3"
check "and user scope is clean after the resume" "$(fingerprint "$skills")" "$before"; rm -rf "$work"

echo "[test] every chain script installs the guard"
missing=""
for c in "$ROOT"/chain-*.sh; do
  grep -q 'exec "\$HERE/chain-' "$c" && continue      # thin preset wrappers delegate
  grep -q '^chain_guard_skills' "$c" || missing="$missing $(basename "$c")"
done
check "no chain without chain_guard_skills" "${missing:-none}" "none"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

#!/usr/bin/env bash
# A standalone run-mN.sh / run-prework.sh leaves ~/.claude/skills as it found
# it — the same leak the chain guard closes, one level down (a lone M3 run
# writes the student skills too). Inside a chain the runner stands aside:
# the chain's guard owns the restore, so the two never both fire. Runners
# already hold `trap cleanup EXIT`, so the restore rides in their cleanup().
# CLAUDE_RUNNER_KEEP_SKILLS=1 opts out (hand-chaining m4a → m4b).
#
# Run: bash tests/runner-skills-guard.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }
fp() { ( cd "$1" && find . | sort; find . -type f -print0 | sort -z | xargs -0 cat 2>/dev/null | shasum ); }

setup() {
  work="$(mktemp -d)"; skills="$work/skills"; mkdir -p "$skills/mine" "$work/run"
  echo original > "$skills/mine/SKILL.md"; before="$(fp "$skills")"
}
# Stand-in runner with the real runners' shape: cleanup() on EXIT, guard after
# the run dir exists, a skill write, then the tail ($1).
fake_runner() {   # $1=tail  $2=extra env (optional)
  env CLAUDE_RUNNER_SKILLS_DIR="$skills" ${2:-} bash -c "
    set -euo pipefail
    source '$ROOT/lib/chain.sh'
    cleanup() { runner_restore_skills; }
    trap cleanup EXIT
    runner_guard_skills '$work/run'
    mkdir -p '$skills/stride'; echo student > '$skills/stride/SKILL.md'
    echo reached > '$work/reached'
    $1
  " >/dev/null 2>&1
}

for tail in "exit 0" "false" "kill -INT \$\$; sleep 5"; do
  echo "[test] standalone: $tail"
  setup; fake_runner "$tail"
  check "run reached its skill write" "$(cat "$work/reached" 2>/dev/null)" "reached"
  check "skills restored" "$(fp "$skills")" "$before"; rm -rf "$work"
done

echo "[test] exit before the runner installs its cleanup trap still restores"
# run-prework.sh deletes the student skills (reset) ~60 lines before its
# `trap cleanup EXIT`; a failed tarball build in between must not leave them gone.
setup
CLAUDE_RUNNER_SKILLS_DIR="$skills" bash -c "
  set -euo pipefail; source '$ROOT/lib/chain.sh'
  runner_guard_skills '$work/run'
  rm -rf '$skills/mine'; echo reached > '$work/reached'
  false
" >/dev/null 2>&1
check "run reached its reset" "$(cat "$work/reached" 2>/dev/null)" "reached"
check "skills restored though cleanup trap was never set" "$(fp "$skills")" "$before"; rm -rf "$work"

echo "[test] inside a chain the runner stands aside"
setup; fake_runner "exit 0" "CLAUDE_RUNNER_CHAIN_DIR=$work"
check "runner left the chain's skills in place" "$(cat "$skills/stride/SKILL.md" 2>/dev/null)" "student"; rm -rf "$work"

echo "[test] CLAUDE_RUNNER_KEEP_SKILLS=1 opts out"
setup; fake_runner "exit 0" "CLAUDE_RUNNER_KEEP_SKILLS=1"
check "skill kept on opt-out" "$(cat "$skills/stride/SKILL.md" 2>/dev/null)" "student"; rm -rf "$work"

echo "[test] every runner is wired"
miss=""
# Every run*.sh, not a list: a hand-kept list is how the generic run.sh sat
# unguarded and unnoticed until 2026-09-26.
for r in "$ROOT"/run*.sh; do
  grep -q '^runner_guard_skills ' "$r" || miss="$miss $(basename "$r"):guard"
  awk '/^cleanup\(\) \{/{on=1} on&&/runner_restore_skills/{f=1} on&&/^\}/{on=0} END{exit !f}' "$r" || miss="$miss $(basename "$r"):restore"
done
check "guard + restore-in-cleanup in every runner" "${miss:-none}" "none"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

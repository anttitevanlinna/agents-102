#!/usr/bin/env bash
# Regression test for arrange-lemmings.sh step 4 (baseline reset).
#
# Failure mode (2026-05-26): a mid-killed sweep left uncommitted tracked
# changes in the lemmings SUT (src/main.js, src/state.js). arrange's
# `git checkout -B m1/<slug> <baseline>` then ABORTED — "Your local changes
# would be overwritten by checkout" — and the whole chain failed at arrange.
# arrange's contract is "reset the SUT to the M1 baseline for a clean run",
# so a dirty tree must NOT block it. This test reproduces the abort, then
# asserts the reset sequence (snapshot -> reset --hard -> clean -fd ->
# checkout) lands a clean tree at baseline while PRESERVING gitignored files
# (the Stop hook .claude/settings.local.json arrange deliberately keeps).
#
# Run: bash tests/arrange-dirty-tree.test.sh   (exits nonzero on any failure)
set -uo pipefail

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

mk_sut() { # echoes a git repo: baseline commit, one later commit, .gitignored hook
  local d; d="$(mktemp -d)"
  ( cd "$d" && git init -q && git config user.email t@t && git config user.name t \
      && echo "level 1" > terrain.js && echo "let out = 0" > state.js \
      && printf '.claude/settings.local.json\n' > .gitignore \
      && git add -A && git commit -qm "Initial commit" \
      && echo "level 2" >> terrain.js && git commit -qam "second commit" \
      && mkdir -p .claude && echo '{"hooks":{}}' > .claude/settings.local.json ) >/dev/null
  echo "$d"
}
baseline_of() { ( cd "$1" && git rev-parse --short "$(git rev-list --max-parents=0 HEAD | tail -1)" ); }

echo "[test] dirty tracked changes ABORT a plain checkout -B (the bug)"
sut="$(mk_sut)"; base="$(baseline_of "$sut")"
# Reproduce the mid-killed-sweep dirty state: modify tracked files + add untracked.
( cd "$sut" && echo "out += 1" >> state.js && echo "tweak" >> terrain.js \
    && mkdir -p tests && echo "test stub" > tests/deadlock.test.js )
( cd "$sut" && git checkout -B m1/fix-hud-tally "$base" ) >/dev/null 2>&1
rc=$?
if [[ $rc -ne 0 ]]; then ok "plain checkout -B aborts on a dirty tree (rc=$rc)"; else bad "checkout -B unexpectedly succeeded on a dirty tree"; fi

echo "[test] reset sequence clears the dirty tree and lands clean at baseline"
backup="$(mktemp -d)"
# --- this is the sequence arrange now runs before its step-4 checkout ---
( cd "$sut" && git diff HEAD > "$backup/sut-dirty.patch" )                     # snapshot tracked
( cd "$sut" && git ls-files --others --exclude-standard > "$backup/sut-untracked.txt" )
( cd "$sut" && git reset --hard -q HEAD && git clean -fdq )                      # drop tracked + untracked
( cd "$sut" && git checkout -B m1/fix-hud-tally "$base" ) >/dev/null 2>&1
rc=$?
check "checkout -B now succeeds after reset" "$rc" "0"
dirty="$(cd "$sut" && git status --porcelain)"
check "working tree clean after reset" "$dirty" ""
head="$(cd "$sut" && git rev-parse --short HEAD)"
check "HEAD is at the baseline commit" "$head" "$base"
branch="$(cd "$sut" && git rev-parse --abbrev-ref HEAD)"
check "on the fresh m1 branch" "$branch" "m1/fix-hud-tally"

echo "[test] gitignored Stop hook is PRESERVED (clean -fd must not remove ignored)"
if [[ -f "$sut/.claude/settings.local.json" ]]; then ok "gitignored .claude/settings.local.json survived clean -fd"; else bad ".claude/settings.local.json was removed — clean -fd must respect .gitignore"; fi

echo "[test] dirty changes were snapshotted to backup (reversibility)"
if [[ -s "$backup/sut-dirty.patch" ]] && grep -q "state.js" "$backup/sut-dirty.patch"; then ok "tracked diff captured in backup patch"; else bad "tracked diff not captured in backup"; fi
if grep -q "tests/deadlock.test.js" "$backup/sut-untracked.txt"; then ok "untracked file recorded in backup manifest"; else bad "untracked file not recorded"; fi

rm -rf "$sut" "$backup"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

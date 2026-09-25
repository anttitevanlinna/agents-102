#!/usr/bin/env bash
# Unit tests for assert_work_since — the M4 send-off artefact gate.
#
# The send-off's contract (ae101-m4-take-task-end-to-end `produces:`) is
# "commits + changed files" on the m4 branch. It does NOT require a commit:
# the M1-learned rule says ask before committing, and the done-done turn that
# follows says do NOT commit. So the gate passes on committed work OR an
# uncommitted diff OR new untracked files since the "M4 starting point" SHA,
# and fails only when the tree is identical to it. Before this, M4 checked
# only the done-done transcript for words, so a send-off that shipped nothing
# still stamped PASS (lemmings 2026-09-25 run was graded on vocabulary alone).
# Run: bash tests/m4-sendoff-work.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"
set +e

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
expect_rc() { local label="$1" want="$2"; shift 2; "$@" >/dev/null 2>&1; local rc=$?
  if [[ $rc -eq $want ]]; then ok "$label"; else bad "$label (want rc=$want got $rc)"; fi; }

mk_repo() {
  local d; d="$(mktemp -d)"
  git -C "$d" init -q
  git -C "$d" -c user.name=t -c user.email=t@t commit -q --allow-empty -m "M4 starting point"
  echo a > "$d/f.txt"; git -C "$d" add f.txt
  git -C "$d" -c user.name=t -c user.email=t@t commit -q -m "M4 starting point"
  echo "$d"
}

echo "[test] assert_work_since"
d="$(mk_repo)"; sp="$(git -C "$d" rev-parse --short HEAD)"
expect_rc "identical tree = FAIL" 1 assert_work_since "t" "$d" "$sp"

echo b >> "$d/f.txt"
expect_rc "uncommitted edit = PASS" 0 assert_work_since "t" "$d" "$sp"
git -C "$d" checkout -q -- f.txt

echo x > "$d/new.js"
expect_rc "untracked new file = PASS" 0 assert_work_since "t" "$d" "$sp"
rm "$d/new.js"

echo c >> "$d/f.txt"; git -C "$d" -c user.name=t -c user.email=t@t commit -qam work
expect_rc "committed work = PASS" 0 assert_work_since "t" "$d" "$sp"

expect_rc "empty starting-point sha = FAIL" 1 assert_work_since "t" "$d" ""
rm -rf "$d"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

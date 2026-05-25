#!/usr/bin/env bash
# Unit tests for the detection helpers that back the M5/M6 load-bearing
# assertions hardened 2026-05-25 (IMPROVEMENTS.md "Caught 2026-05-25").
#
# Each test reproduces the failure mode the old heuristic had on the
# 2026-05-25 lemmings runs, then asserts the new helper gets it right.
# Run: bash tests/lib-detection.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/assertions.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

mk_repo() { # echoes a fresh git worktree path with one committed file
  local d; d="$(mktemp -d)"
  ( cd "$d" && git init -q && git config user.email t@t && git config user.name t \
      && echo "level 1" > terrain.js && git add -A && git commit -qm init ) >/dev/null
  echo "$d"
}

echo "[test] worktree_content_hash detects a save on a CLEAN worktree"
# This is the Fix-3 case: `git stash create` returns empty on a clean
# worktree, so the old tree-advance check never fired. A content hash must
# change when a new file lands, even with nothing staged/stashable.
repo="$(mk_repo)"
before="$(worktree_content_hash "$repo")"
stash_baseline="$(cd "$repo" && git stash create 2>/dev/null || true)"  # old mechanism
echo "  (old git-stash-create baseline on clean worktree = '${stash_baseline}')"
check "git stash create is empty on a clean worktree (the old bug)" "${stash_baseline}" ""
mkdir -p "$repo/tests"; printf 'assert no scan\n' > "$repo/tests/verifier.test.js"
after="$(worktree_content_hash "$repo")"
if [[ -n "$before" && "$before" != "$after" ]]; then ok "content hash advances when a new file lands"; else bad "content hash did not advance ($before -> $after)"; fi
rm -rf "$repo"

echo "[test] verifier path discovery via new-file set-diff (Fix 2)"
# The old run-m5.sh regex grabbed a backtick code-fence fragment
# (".claude/hooks/\`,") instead of the real saved path. Set-diff of the
# worktree file list before/after the save names the real new file.
repo="$(mk_repo)"
worktree_file_list "$repo" > /tmp/_before_$$.txt
mkdir -p "$repo/tests"; printf 'no-scan\n' > "$repo/tests/blocker-terminal-no-scan.test.js"
worktree_file_list "$repo" > /tmp/_after_$$.txt
new_rel="$(pick_verifier_path "$(comm -13 /tmp/_before_$$.txt /tmp/_after_$$.txt)")"
check "picks the real verifier path, not a backtick fragment" "$new_rel" "tests/blocker-terminal-no-scan.test.js"
rm -rf "$repo" /tmp/_before_$$.txt /tmp/_after_$$.txt

echo "[test] verifier picker prefers a verifier-ish name over an incidental file"
new_rel="$(pick_verifier_path "$(printf 'NOTES.md\ntests/smoke-check.sh\n')")"
check "verifier-ish name wins" "$new_rel" "tests/smoke-check.sh"

echo "[test] arc-note find catches an agent-chosen nested dir (Fix 4)"
# The old whitelist walked .claude/memory, docs/adr, docs/adrs, root only.
# The 2026-05-25 M6 run saved to docs/notes/ — a free-form pick the
# whitelist missed (state.json reported []). find-since-epoch catches it.
repo="$(mk_repo)"
ref="$(mktemp)"; sleep 1   # ref marker stamped at "run start"
mkdir -p "$repo/docs/notes"; echo "# arc" > "$repo/docs/notes/2026-05-25-rules-to-guards.md"
mkdir -p "$repo/node_modules/pkg"; echo "# noise" > "$repo/node_modules/pkg/README.md"  # must be excluded
hit_note=0; hit_noise=0
while IFS= read -r p; do
  [[ -z "$p" ]] && continue
  [[ "$p" == *docs/notes/2026-05-25-rules-to-guards.md ]] && hit_note=1
  [[ "$p" == *node_modules/* ]] && hit_noise=1
done < <(find_recent_md "$repo" "$ref")
rm -f "$ref"
check "finds the nested docs/notes/ arc note" "$hit_note" "1"
check "excludes node_modules noise" "$hit_noise" "0"
rm -rf "$repo"

echo "[test] classify_memory_write distinguishes the project-memory fix (L91)"
# BUG: a file appeared in the user-level auto-memory home -> fix didn't take.
check "user-level write classified BUG" "$(classify_memory_write 'project_x.md' '')" "BUG"
# PASS: file landed in the in-repo ./.claude/memory -> fix took.
check "in-repo write classified PASS" "$(classify_memory_write '' 'project_x.md')" "PASS"
# NONE: path not exercised (only CLAUDE.local.md rule-sharpening this run).
check "no memory write classified NONE" "$(classify_memory_write '' '')" "NONE"
# BUG wins if both somehow appear (user-level write is the regression signal).
check "user-level write dominates" "$(classify_memory_write 'a.md' 'b.md')" "BUG"
# Whitespace-only inputs must not read as a write.
check "whitespace-only is NONE" "$(classify_memory_write '   ' '  ')" "NONE"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]

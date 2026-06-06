#!/usr/bin/env bash
# Per-turn assertion predicates. Run after wait_for_turn but before
# advancing the runner. Sentinel completion proves a turn finished;
# these prove the prompt's artifact contract held.
#
# Canonical rule: check_platform_and_boundaries.md § 16a
# (sentinel completion != artifact delivery).
#
# Convention: every helper exits 0 on PASS, nonzero on FAIL.
# Echo a one-line "[assert] <result>: ..." for the run log.
#
# Soft assertions are not provided — if a turn produces nothing
# observable, name that explicitly in the runner and skip the check.
set -euo pipefail

assert_file_exists() {
  local label="$1" path="$2"
  if [[ -f "$path" ]]; then
    echo "[assert] PASS $label: file exists ($path)"
    return 0
  fi
  echo "[assert] FAIL $label: file missing ($path)" >&2
  return 1
}

assert_file_mtime_advanced() {
  # $1=label, $2=path, $3=baseline-mtime (epoch seconds).
  # Passes if file exists AND its mtime is strictly greater than baseline.
  local label="$1" path="$2" baseline="$3"
  if [[ ! -f "$path" ]]; then
    echo "[assert] FAIL $label: file missing ($path)" >&2
    return 1
  fi
  local cur
  cur="$(stat -f %m "$path" 2>/dev/null || stat -c %Y "$path")"
  if [[ "$cur" -gt "$baseline" ]]; then
    echo "[assert] PASS $label: mtime advanced ($baseline -> $cur)"
    return 0
  fi
  echo "[assert] FAIL $label: mtime unchanged (baseline=$baseline cur=$cur)" >&2
  return 1
}

mtime_of() {
  local path="$1"
  if [[ -f "$path" ]]; then
    stat -f %m "$path" 2>/dev/null || stat -c %Y "$path"
  else
    echo 0
  fi
}

assert_git_dirty() {
  # $1=label, $2=cwd. Passes if working tree has uncommitted changes.
  local label="$1" cwd="$2"
  local out
  out="$(cd "$cwd" && git status --porcelain 2>/dev/null)"
  if [[ -n "$out" ]]; then
    local n
    n="$(echo "$out" | wc -l | tr -d ' ')"
    echo "[assert] PASS $label: working tree dirty ($n entries)"
    return 0
  fi
  echo "[assert] FAIL $label: working tree clean in $cwd" >&2
  return 1
}

assert_new_commit() {
  # $1=label, $2=cwd, $3=baseline-sha. Passes if HEAD is not baseline.
  local label="$1" cwd="$2" baseline="$3"
  local head
  head="$(cd "$cwd" && git rev-parse --short HEAD 2>/dev/null)"
  if [[ "$head" != "$baseline" ]]; then
    echo "[assert] PASS $label: new commit ($baseline -> $head)"
    return 0
  fi
  echo "[assert] FAIL $label: HEAD unchanged at $baseline in $cwd" >&2
  return 1
}

assert_scrollback_grep() {
  # $1=label, $2=transcript path, $3=ERE pattern.
  # Passes if grep -E -i matches. Useful for prompts whose only artifact
  # is words in the response (e.g. "nothing new", "context table").
  local label="$1" transcript="$2" pattern="$3"
  if [[ ! -f "$transcript" ]]; then
    echo "[assert] FAIL $label: transcript missing ($transcript)" >&2
    return 1
  fi
  if grep -E -i -q "$pattern" "$transcript"; then
    echo "[assert] PASS $label: transcript matches /$pattern/"
    return 0
  fi
  echo "[assert] FAIL $label: transcript missing pattern /$pattern/" >&2
  return 1
}

assert_or_warn() {
  # Wrapper that downgrades a single assertion to a warning. Use
  # sparingly for genuinely observation-only turns. Always returns 0.
  # Usage: assert_or_warn assert_scrollback_grep "label" "$t" "pattern"
  if "$@"; then
    return 0
  fi
  echo "[assert] WARN downgraded" >&2
  return 0
}

# --- worktree tree-content detection -------------------------------------
# Replaces `git stash create` for tree-advance checks. `git stash create`
# returns EMPTY on a clean worktree (nothing to stash), so a save onto a
# freshly-forked clean worktree produced no baseline and the tree-advance
# assertion never fired (IMPROVEMENTS.md Fix 3, 2026-05-25). A content hash
# of every non-ignored file changes whenever a file is added OR modified,
# clean worktree or not.

worktree_file_list() {
  # Sorted list of non-ignored files (tracked + untracked), one per line,
  # relative to the worktree root. Empty if cwd is not a git repo.
  local cwd="$1"
  ( cd "$cwd" 2>/dev/null && git ls-files --cached --others --exclude-standard 2>/dev/null | LC_ALL=C sort )
}

worktree_content_hash() {
  # Single hash over the names AND contents of all non-ignored files.
  # Changes on any add/modify/delete. Empty cwd / no files -> stable "0".
  local cwd="$1" h
  h="$( cd "$cwd" 2>/dev/null \
    && git ls-files --cached --others --exclude-standard -z 2>/dev/null \
       | LC_ALL=C sort -z \
       | xargs -0 shasum -a 256 2>/dev/null \
       | shasum -a 256 \
       | awk '{print $1}' )"
  [[ -n "$h" ]] && echo "$h" || echo "0"
}

pick_verifier_path() {
  # Given newline-separated new-file paths (relative), pick the one most
  # likely to be the verifier. Prefer a verifier-ish name; else the first
  # script/doc-shaped file. Echoes empty if none. Replaces the old
  # backtick-grabbing scrollback regex (IMPROVEMENTS.md Fix 2, 2026-05-25).
  local new_files="$1" pick
  pick="$(printf '%s\n' "$new_files" | grep -E -i 'verif|hook|judge|check|test|smoke|gate' | head -1 || true)"
  [[ -z "$pick" ]] && pick="$(printf '%s\n' "$new_files" | grep -E '\.(sh|js|mjs|ts|py|md)$' | head -1 || true)"
  printf '%s' "$pick"
}

classify_memory_write() {
  # Decide where a memory write landed, for the walk-and-send-off-3
  # in-repo-memory-path fix (IMPROVEMENTS.md / pre-cohort L91, 2026-05-25).
  # The bug: the prompt said bare ".claude/memory/" and Claude routed to
  # its USER-LEVEL auto-memory home (~/.claude/projects/<encoded>/memory/)
  # instead of the in-repo observations/ (renamed from .claude/memory/ 2026-05-26). The fix names the in-repo
  # location explicitly (NOT "project memory" — that term denotes CLAUDE.md
  # in Claude Code; observations/ is a user-authored convention, per
  # check_platform_and_boundaries §6d). This classifier proves the fix took.
  #   $1 = new files seen in the user-level memory dir (any non-space = bug)
  #   $2 = new files seen in the project observations/ dir
  # Echoes: BUG (landed user-level) | PASS (landed in-repo) | NONE (path
  # not exercised this run — e.g. only CLAUDE.local.md rule-sharpening).
  local user_new="$1" proj_new="$2"
  if [[ -n "${user_new//[[:space:]]/}" ]]; then echo BUG
  elif [[ -n "${proj_new//[[:space:]]/}" ]]; then echo PASS
  else echo NONE; fi
}

find_recent_md() {
  # Markdown files under one or more roots modified after the reference file $ref,
  # excluding known noise dirs. Replaces the fixed dir-whitelist that
  # missed agent-chosen destinations like docs/notes/ (IMPROVEMENTS.md
  # Fix 4, 2026-05-25). Accepts additional roots beyond the worktree —
  # e.g. ~/.claude/projects/<encoded-cwd>/memory/ — so the M6 runner can
  # catch arc-retrospectives that land outside the SUT cwd (Fix 5,
  # 2026-05-26: the picoshare practice-arc-M1-M6.md case). Missing
  # additional roots are silently skipped. Uses `-newer <reffile>`
  # (POSIX) not `-newermt "@epoch"` — BSD find on macOS can't parse the
  # @epoch form and errored silently, so the old line never matched
  # anything regardless of dir.
  local root="$1" ref="$2"
  shift 2
  [[ -f "$ref" ]] || { echo "[assert] WARN find_recent_md: missing ref marker $ref" >&2; return 0; }
  local r
  for r in "$root" "$@"; do
    [[ -d "$r" ]] || continue
    find "$r" \
      \( -name node_modules -o -name .git \) -prune -o \
      -type f -name '*.md' -newer "$ref" -print 2>/dev/null
  done
}

eval_trajectory_verdict() {
  # Pure classifier for an m6 eval-loop's flagged-count trajectory. Counts +
  # real-work flag in, verdict out — so it's unit-testable and the m6:2 case
  # stays thin. Distinguishes a THEATER loop (did nothing useful) from a
  # legitimately-low one: a narrow judge (e.g. M5's source-triangulation winner,
  # blind to overreach by its own documented limit) meeting an already-grounded
  # corpus starts at 0 countable flags while real improvement lands in the
  # uncounted dimension. round-1==0 is NOT theater on its own.
  # Args: <round1_count> <last_count> <real_work:0|1>
  # Echo: IMPROVED <r1->last> | FLOOR-UNCOUNTED | THEATER <why> | UNPARSED
  # Exit: 1 only for THEATER (hard fail); 0 otherwise.
  local r1="$1" last="$2" work="$3"
  if ! [[ "$r1" =~ ^[0-9]+$ && "$last" =~ ^[0-9]+$ ]]; then echo "UNPARSED"; return 0; fi
  if [[ "$r1" -gt 0 ]]; then
    if [[ "$last" -lt "$r1" ]]; then echo "IMPROVED $r1->$last"; return 0; fi
    echo "THEATER flat/worse counted trajectory ($r1->$last) with flags left to fix"; return 1
  fi
  # round-1 countable flags == 0
  if [[ "$work" -eq 1 ]]; then echo "FLOOR-UNCOUNTED"; return 0; fi
  echo "THEATER round-1 flagged 0 and loop did no real work (no prompt evolution)"; return 1
}

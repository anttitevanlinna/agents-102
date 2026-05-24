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

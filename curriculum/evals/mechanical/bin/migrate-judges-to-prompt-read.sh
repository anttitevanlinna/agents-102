#!/usr/bin/env bash
# One-shot migration: rewrite every Judge runner's V-check assertions from
# verbatim-check.sh (scrollback grep, depended on Actor discipline to
# blockquote-paste) to prompt-read-check.sh (transcript jq for Read events).
#
# Why: M2 run 1 lost V6/V8/V9/V10 because Haiku skipped the blockquote-paste
# on short prompts mid-chain. The transcript-based check is unforgeable —
# a Read of prompt-NNN.txt proves the model received the prompt content.
#
# Surgical edit: only lines that BOTH (a) reference verbatim-check.sh and
# (b) reference a /tmp/prompts/ path get rewritten. Lines that pair
# verbatim-check.sh with substitute pastes (linkedin-paste.txt etc.) stay
# unchanged — those are scrollback assertions for student-input substitutes,
# which the new script doesn't replace.
#
# Usage: migrate-judges-to-prompt-read.sh [--dry-run]
#
# Reports: per-file count of lines changed.

set -uo pipefail

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MECH_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

shopt -s nullglob
files=( "$MECH_ROOT/runners"/*.judge.md )
shopt -u nullglob

total_files=0
total_changes=0

for f in "${files[@]}"; do
  # Lines touched by this migration: those mentioning both `verbatim-check.sh`
  # AND `/tmp/prompts/` (V-check pattern). Substitute-paste lines (linkedin,
  # project-story, hate-list, strengths-pushback) reference different paths.
  to_change=$(grep -n 'verbatim-check\.sh' "$f" 2>/dev/null \
              | grep '/tmp/prompts/' \
              | wc -l | tr -d ' ')

  if [[ "$to_change" -eq 0 ]]; then
    continue
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] $(basename "$f"): would rewrite $to_change V-check line(s)"
    grep -n 'verbatim-check\.sh' "$f" | grep '/tmp/prompts/' | sed 's/^/    /'
    total_files=$((total_files + 1))
    total_changes=$((total_changes + to_change))
    continue
  fi

  # Two-stage substitution:
  #   (1) On lines that mention /tmp/prompts/, swap the script name.
  #   (2) On those same lines, swap a `<scrollback>` arg (or ` scrollback `
  #       angle-less placeholder) for `<transcript>`.
  # The `<scrollback>` placeholder pattern varies per judge file; the
  # ACTOR_TRANSCRIPT_PATH or transcript-file argument is what every
  # prompt-read-check call now wants.
  # Use `sed -i ''` for BSD compatibility (macOS).
  sed -i '' -E '
    /\/tmp\/prompts\// s|bin/verbatim-check\.sh|bin/prompt-read-check.sh|g
    /\/tmp\/prompts\// s|<scrollback>|<transcript>|g
    /\/tmp\/prompts\// s|<actor scrollback>|<transcript>|g
  ' "$f"

  echo "$(basename "$f"): rewrote $to_change V-check line(s)"
  total_files=$((total_files + 1))
  total_changes=$((total_changes + to_change))
done

echo
echo "── summary ──"
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "[dry-run] Would touch $total_files file(s), $total_changes line(s)."
else
  echo "Touched $total_files file(s), $total_changes line(s)."
fi

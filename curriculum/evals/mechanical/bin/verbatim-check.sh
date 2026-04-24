#!/usr/bin/env bash
# Verbatim-prompt round-trip check with blockquote normalization.
#
# Actors paste prompts into scrollback wrapped in `> ` blockquotes (so the
# scrollback reads as the student's message). A raw `grep -F` or Python
# `in` check fails on multi-paragraph prompts because every line has a
# `> ` prefix and blank lines become `>` (or nothing). Normalize both
# sides by stripping the leading `> ?` per line, then compare.
#
# Usage: verbatim-check.sh <prompt-file> <scrollback-file>
# Exits 0 on match, 1 on miss. Prints the first 40 chars of the prompt
# as evidence on match, or diff-on-first-mismatch on miss.

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <prompt-file> <scrollback-file>" >&2
  exit 2
fi

PROMPT="$1"
SCROLLBACK="$2"

if [[ ! -f "$PROMPT" ]]; then
  echo "prompt file not found: $PROMPT" >&2
  exit 2
fi
if [[ ! -f "$SCROLLBACK" ]]; then
  echo "scrollback not found: $SCROLLBACK" >&2
  exit 2
fi

# Strip `> ?` prefix per line; collapse `>` blank lines to empty.
normalize() {
  sed -E 's/^> ?//; s/^>$//' "$1"
}

PROMPT_NORM=$(normalize "$PROMPT")
SCROLLBACK_NORM=$(normalize "$SCROLLBACK")

if printf '%s' "$SCROLLBACK_NORM" | grep -qF "$PROMPT_NORM"; then
  PREFIX=$(head -c 40 "$PROMPT")
  echo "PASS — verbatim match. Prefix: $PREFIX"
  exit 0
else
  echo "FAIL — prompt not found in scrollback after blockquote normalization."
  echo "--- prompt (first 80 chars) ---"
  head -c 80 "$PROMPT"
  echo
  echo "--- scrollback has (grep for prompt's first line, unblockquoted) ---"
  FIRST_LINE=$(head -1 "$PROMPT" | head -c 40)
  printf '%s' "$SCROLLBACK_NORM" | grep -F "$FIRST_LINE" | head -3 || echo "(not found)"
  exit 1
fi

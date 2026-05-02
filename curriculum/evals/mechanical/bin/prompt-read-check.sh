#!/usr/bin/env bash
# Verify a prompt file was Read by the Actor in the transcript.
#
# Replaces verbatim-check.sh's scrollback-grep approach. The previous check
# relied on the Actor disciplinedly blockquote-pasting each prompt into a
# scrollback file the Actor wrote — which Haiku skipped on short prompts mid-
# chain (M2 run 1 lost V6/V8/V9/V10 this way).
#
# The transcript is unforgeable: a tool_use of name "Read" with input.file_path
# == <prompt> proves the model received the prompt content unmodified. That's
# stronger evidence than a markdown blockquote in a file the Actor authored.
#
# Script-ratchet move: drops the Actor's discipline burden + makes the check
# deterministic. Pairs with rules #16 (acceptance-test contract) and #17
# (script ratchet — every Judge run leaves behind one more script).
#
# Usage: prompt-read-check.sh <prompt-path> <transcript.jsonl>
# Exits 0 on Read found, 1 on miss, 2 on usage error.

set -uo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 <prompt-path> <transcript.jsonl>" >&2
  exit 2
fi

PROMPT="$1"
TRANSCRIPT="$2"

[[ -f "$TRANSCRIPT" ]] || { echo "transcript not found: $TRANSCRIPT" >&2; exit 2; }

# Count tool_use entries of name "Read" with input.file_path matching $PROMPT
# exactly. The transcript is JSONL; each line is a message envelope whose
# .message.content is EITHER a string (system message) or an array of
# content blocks (assistant turns with tool_use). Skip the string case
# explicitly so jq doesn't error on iteration.
hits=$(jq -r --arg p "$PROMPT" '
  if (.message.content | type) == "array" then
    .message.content
    | map(select(.type? == "tool_use" and .name? == "Read" and .input.file_path? == $p))
    | length
  else
    0
  end
' "$TRANSCRIPT" 2>/dev/null | awk '{s+=$1} END{print s+0}')

if [[ "$hits" -ge 1 ]]; then
  PROMPT_BASENAME=$(basename "$PROMPT")
  echo "PASS — Actor Read $PROMPT_BASENAME ($hits time(s))"
  exit 0
else
  echo "FAIL — no Read of $PROMPT in transcript"
  exit 1
fi

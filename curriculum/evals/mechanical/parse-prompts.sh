#!/usr/bin/env bash
# Extract fenced prompt blocks from a curriculum exercise file.
#
# Convention in exercise files: a block meant for the student to copy is
# marked with a line containing `**Prompt**` immediately followed (after a blank
# line) by a triple-backtick fenced code block. The fence's closing ``` marks
# the end of the prompt. The site renderer wraps the label + fence in a chrome
# block with a Copy button and a destination chip; this parser only needs the
# label-then-fence shape.
#
# Usage: parse-prompts.sh <exercise.md>
# Output: writes prompt-NNN.txt files to $OUT_DIR (default: /tmp/prompts/<slug>/)
# Prints the output dir + a count summary to stdout.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <exercise.md> [out_dir]" >&2
  exit 2
fi

SRC="$1"
SLUG=$(basename "$SRC" .md)
OUT_DIR="${2:-/tmp/prompts/$SLUG}"

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR"/prompt-*.txt

awk -v out_dir="$OUT_DIR" '
  BEGIN { state = "idle"; n = 0; body = "" }

  # Enter expect-fence state when we see the Prompt label
  /^\*\*Prompt\*\*/ {
    state = "expect_fence"
    next
  }

  # Start capturing inside a fence while in expect_fence state
  state == "expect_fence" && /^```/ {
    state = "capture"
    body = ""
    next
  }

  # Close fence while capturing
  state == "capture" && /^```/ {
    n++
    out_path = sprintf("%s/prompt-%03d.txt", out_dir, n)
    printf "%s", body > out_path
    close(out_path)
    state = "idle"
    next
  }

  # Accumulate body lines
  state == "capture" {
    body = body $0 "\n"
  }

  END {
    printf "Extracted %d prompt(s) to %s\n", n, out_dir
  }
' "$SRC"

echo
echo "Files:"
ls -1 "$OUT_DIR" | head -20

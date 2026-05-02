#!/usr/bin/env bash
# Verify no Write/Edit/MultiEdit tool call on a target file between two Read
# events in a subagent transcript.
#
# Used to enforce per-phase invariants like "no site.html regen during the
# look-back phase" — the look-back boundaries are the Read of prompt-005.txt
# (start) and Read of prompt-006.txt (end).
#
# Usage: no-write-between-reads.sh <transcript.jsonl> <start-anchor> <end-anchor> <forbidden-pattern>
#   start-anchor / end-anchor: substrings appearing in the Read event line
#     (e.g. "prompt-005.txt"). The first occurrence in the transcript wins.
#   forbidden-pattern: substring matched against tool-use file_path of
#     Write/Edit/MultiEdit calls in the slice (e.g. "site.html").
# Exit 0 on no violations, 1 on violations, 2 on usage / boundary issues.

set -euo pipefail

if [[ $# -ne 4 ]]; then
  echo "usage: $0 <transcript.jsonl> <start-anchor> <end-anchor> <forbidden-pattern>" >&2
  exit 2
fi

JSONL="$1"
START="$2"
END="$3"
FORBIDDEN="$4"

[[ -f "$JSONL" ]] || { echo "transcript not found: $JSONL" >&2; exit 2; }

# Match only lines that are Read tool_use events on the anchor file.
# The naive `grep -nF "$ANCHOR"` matches the user-message line that lists
# the runner instructions (which mention every prompt-NNN.txt by name),
# so anchors collapse to line 1. Filter to events where the anchor
# appears in a `"file_path":"..."` slot AND the line carries a Read.
match_read_line() {
  local anchor="$1"
  awk -v a="$anchor" '
    /"name":"Read"/ && index($0, "\"file_path\"") > 0 && index($0, a) > 0 { print NR; exit }
  ' "$JSONL"
}

start_line=$(match_read_line "$START")
end_line=$(match_read_line "$END")

if [[ -z "$start_line" || -z "$end_line" ]]; then
  echo "FAIL — could not locate anchors: '$START' line=$start_line, '$END' line=$end_line"
  exit 2
fi

if (( start_line >= end_line )); then
  echo "FAIL — start_line $start_line >= end_line $end_line; anchors out of order"
  exit 2
fi

violations=$(
  sed -n "${start_line},${end_line}p" "$JSONL" \
    | jq -r --arg f "$FORBIDDEN" '
        (.message.content // []) | select(type=="array") | .[]?
        | select(.type? == "tool_use")
        | select((.name? // "") | test("^(Write|Edit|MultiEdit)$"))
        | select((.input.file_path? // "") | contains($f))
        | .input.file_path
      ' 2>/dev/null \
    | wc -l | tr -d ' '
)

if [[ "$violations" -eq 0 ]]; then
  echo "PASS — no Write/Edit/MultiEdit on '$FORBIDDEN' between '$START' (line $start_line) and '$END' (line $end_line)."
  exit 0
else
  echo "FAIL — $violations Write-class call(s) on '$FORBIDDEN' in window [$start_line, $end_line]."
  exit 1
fi

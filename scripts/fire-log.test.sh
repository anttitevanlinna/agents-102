#!/usr/bin/env bash
# Tests for fire-log.sh — the PostToolUse firing tracker.
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
HOOK="$HERE/fire-log.sh"
pass=0; fail=0

run() { # run <payload> ; leaves the log at $SANDBOX/.fire-log
  SANDBOX=$(mktemp -d)
  CLAUDE_PROJECT_DIR="$SANDBOX" printf '%s' "$1" | CLAUDE_PROJECT_DIR="$SANDBOX" "$HOOK"
  RC=$?
}

check() { # check <label> <expected-substring-or-EMPTY>
  local label="$1" want="$2" got
  got=$(cut -f2 "$SANDBOX/.fire-log" 2>/dev/null | tr '\n' ',')
  if [ "$want" = "EMPTY" ]; then
    [ -z "$got" ] && { pass=$((pass+1)); echo "  ok   $label"; } \
                  || { fail=$((fail+1)); echo "  FAIL $label — logged [$got], expected nothing"; }
  elif printf '%s' "$got" | grep -q -- "$want"; then
    pass=$((pass+1)); echo "  ok   $label"
  else
    fail=$((fail+1)); echo "  FAIL $label — logged [$got], expected to contain [$want]"
  fi
  rm -rf "$SANDBOX"
}

echo "fire-log.sh"

run '{"tool_input":{"command":"node scripts/check-slide-size.js"}}'
check "logs a repo script" "scripts/check-slide-size.js"

run '{"tool_input":{"command":"node curriculum/evals/scripts/eval-queue.js --training ae101"}}'
check "logs a curriculum/evals script" "curriculum/evals/scripts/eval-queue.js"

run '{"tool_input":{"command":"npm run audit:backing"}}'
check "logs an npm run target" "npm run audit:backing"

run '{"tool_input":{"command":"npm test"}}'
check "logs bare npm test" "npm test"

run '{"tool_input":{"skill":"eval-fire"}}'
check "logs a skill invocation" "skill:eval-fire"

run '{"tool_input":{"command":"node scripts/a.js && node scripts/a.js && node scripts/b.js"}}'
check "de-dupes within one command" "scripts/a.js,scripts/b.js,"

run '{"tool_input":{"command":"ls -la"}}'
check "ignores an unrelated command" "EMPTY"

# Malformed input must never block a tool call.
for bad in '' 'not json' '{"tool_input":{}}'; do
  run "$bad"
  if [ "$RC" -eq 0 ]; then pass=$((pass+1)); echo "  ok   exits 0 on malformed input [${bad:0:12}]"
  else fail=$((fail+1)); echo "  FAIL nonzero exit ($RC) on malformed input [${bad:0:12}]"; fi
  rm -rf "$SANDBOX"
done

echo "fire-log.test.sh: $pass passed, $fail failed"
[ "$fail" -eq 0 ]

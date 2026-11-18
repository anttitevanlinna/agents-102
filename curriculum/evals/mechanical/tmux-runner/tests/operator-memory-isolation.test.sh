#!/usr/bin/env bash
# Guards C-3 of the 2026-11-01 live chain: the operator's ~/.claude/CLAUDE.md
# loaded into the SUT session, and its pseudonym rule landed in the student's
# generated root file (M2 T12, M3 T8). A student would not have that file.
#
# Contract:
#   claude_launch_cmd RUN_DIR prints the SUT launch command. It writes
#   RUN_DIR/runner-settings.json whose claudeMdExcludes names the operator's
#   user memory ($HOME/.claude/CLAUDE.md and $HOME/.claude/rules/**), and the
#   command passes that file with --settings, CLAUDE_CMD override or not.
#   Auth stays where it is: no CLAUDE_CONFIG_DIR, no HOME swap.
# Probe (2026-11-18, Sonnet): same question, without the excludes "YES", with "NO".
# Run: bash tests/operator-memory-isolation.test.sh   (exits nonzero on any failure)
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../transports/claude-tmux.sh"
set +e

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

cmd="$(unset CLAUDE_CMD; claude_launch_cmd "$tmp")"
settings="$tmp/runner-settings.json"
[[ -f "$settings" ]] && ok "settings file written" || bad "no $settings"
node -e '
  const s = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  const home = process.argv[2];
  const ex = s.claudeMdExcludes || [];
  for (const want of [home + "/.claude/CLAUDE.md", home + "/.claude/rules/**"])
    if (!ex.includes(want)) { console.error("missing " + want); process.exit(1); }
' "$settings" "$HOME" && ok "excludes name the operator memory" || bad "excludes incomplete"
[[ "$cmd" == "claude --model sonnet --permission-mode auto --settings $settings" ]] \
  && ok "default command passes the settings" || bad "default command: $cmd"
[[ "$cmd" != *CLAUDE_CONFIG_DIR* && "$cmd" != *HOME=* ]] \
  && ok "auth location untouched" || bad "command moves auth: $cmd"

cmd="$(CLAUDE_CMD=/opt/x/claude claude_launch_cmd "$tmp")"
[[ "$cmd" == "/opt/x/claude --settings $settings" ]] \
  && ok "CLAUDE_CMD override still isolated" || bad "override: $cmd"

cmd="$(CLAUDE_CMD='claude --settings /own.json' claude_launch_cmd "$tmp")"
[[ "$cmd" == "claude --settings /own.json" ]] \
  && ok "an override with its own --settings is left alone" || bad "own settings: $cmd"

echo "operator-memory-isolation: $pass passed, $fail failed"
(( fail == 0 ))

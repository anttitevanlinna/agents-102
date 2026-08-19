#!/usr/bin/env bash
# Firing tracker — record which repo scripts and skills actually run.
#
# Registered as a PostToolUse hook on Bash and Skill in .claude/settings.json.
# Reads the hook payload on stdin, pulls out the command (or skill name), and
# appends one tab-separated line per repo script, npm target, or skill it
# names. Append-only; never blocks, never prints, always exits 0 — telemetry
# that can fail a tool call is worse than no telemetry.
#
# The hook registration lives in .claude/settings.json and this script lives in
# scripts/, both tracked, so the tracker survives a fresh clone. .claude/hooks/
# is gitignored and anything parked there exists on one machine only.
#
# Log: .fire-log at repo root (gitignored — it observes one machine).
# Read it:  cut -f2 .fire-log | sort | uniq -c | sort -rn
#
# Absence is not proof of death. This sees only what runs through a Claude
# session on this machine, the log starts empty, and a script can be invoked by
# CI, by a person in a plain terminal, or by another clone. A name missing after
# a month means "not seen here" — which is a question to ask, not a verdict.

set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
LOG="$ROOT/.fire-log"

payload=$(cat 2>/dev/null) || exit 0
[ -n "$payload" ] || exit 0

stamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)

emit() { [ -n "$1" ] && printf '%s\t%s\n' "$stamp" "$1" >> "$LOG"; }

skill=$(printf '%s' "$payload" | jq -r '.tool_input.skill // empty' 2>/dev/null)
[ -n "$skill" ] && emit "skill:$skill"

cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // empty' 2>/dev/null)
if [ -n "$cmd" ]; then
  printf '%s\n' "$cmd" \
    | grep -oE '(scripts|curriculum/evals/scripts)/[A-Za-z0-9_.-]+\.(js|sh)|npm (run [a-z:-]+|test)' \
    | sort -u \
    | while IFS= read -r hit; do emit "$hit"; done
fi

exit 0

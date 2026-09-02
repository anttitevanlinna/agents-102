#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

[[ "$($RUNNER/run-a101.sh --print-runtime)" == cli ]]
[[ "$($RUNNER/run-a101.sh --runtime codex-cli --print-runtime)" == codex-cli ]]
set +e
"$RUNNER/run-a101.sh" --runtime nope --print-runtime >"$TMP/out" 2>"$TMP/err"
rc=$?
set -e
[[ $rc -eq 2 ]]
grep -q 'unknown Agents 101 runner runtime' "$TMP/err"

cat > "$TMP/fake-claude.sh" <<'SH'
claude_open() { CLAUDE_RUN_DIR="$2"; export CLAUDE_RUN_DIR; printf 'claude-open %s %s\n' "$1" "$2" >> "$A101_FAKE_LOG"; }
claude_turn() { cp "$1" "$CLAUDE_RUN_DIR/turn-$2.transcript.txt"; }
claude_close() { printf 'claude-close\n' >> "$A101_FAKE_LOG"; }
SH
cat > "$TMP/fake-codex.sh" <<'SH'
codex_open() { CODEX_RUN_DIR="$2"; export CODEX_RUN_DIR; printf 'codex-open %s %s\n' "$1" "$2" >> "$A101_FAKE_LOG"; }
codex_turn() { cp "$1" "$CODEX_RUN_DIR/turn-$2.response.txt"; }
codex_close() { printf 'codex-close\n' >> "$A101_FAKE_LOG"; }
SH

export A101_FAKE_LOG="$TMP/transport.log"
export A101_CLAUDE_TRANSPORT="$TMP/fake-claude.sh"
export A101_CODEX_TRANSPORT="$TMP/fake-codex.sh"
source "$RUNNER/lib/transport.sh"

mkdir -p "$TMP/work" "$TMP/run-m1" "$TMP/run-m2" "$TMP/run-codex"
printf '%s' prompt > "$TMP/prompt.txt"
transport_open cli "$TMP/work" "$TMP/run-m1"
transport_turn "$TMP/prompt.txt" 1 3
[[ "$(cat "$TMP/run-m1/turn-1.transcript.txt")" == prompt ]]
transport_close
transport_open cli "$TMP/work" "$TMP/run-m2"
transport_close
[[ "$(grep -c '^claude-open ' "$A101_FAKE_LOG")" == 2 ]]

transport_open codex-cli "$TMP/work" "$TMP/run-codex"
transport_turn "$TMP/prompt.txt" 1 3
[[ "$(cat "$TMP/run-codex/turn-1.transcript.txt")" == prompt ]]
transport_close

A101_RUNTIME_PROFILE=cli
[[ "$(artifact_path root-instructions)" == CLAUDE.md ]]
[[ "$(artifact_path project-skills)" == .claude/skills ]]
A101_RUNTIME_PROFILE=codex-cli
[[ "$(artifact_path root-instructions)" == AGENTS.md ]]
[[ "$(artifact_path project-skills)" == .agents/skills ]]

echo 'PASS: Agents 101 selects a fresh transport and concrete artifact paths'

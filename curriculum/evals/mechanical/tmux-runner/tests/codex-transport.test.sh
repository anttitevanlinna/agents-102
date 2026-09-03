#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
FAKE="$RUNNER/fixtures/fake-codex"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

export CODEX_BIN="$FAKE"
export FAKE_CODEX_LOG="$TMP/args.log"
export FAKE_CODEX_PWD_LOG="$TMP/pwd.log"
mkdir -p "$TMP/operator/.agents/skills" "$TMP/operator/skills"
printf '%s' '{"token":"synthetic"}' > "$TMP/operator/auth.json"
printf '%s' 'personal config' > "$TMP/operator/config.toml"
printf '%s' 'personal instructions' > "$TMP/operator/AGENTS.md"
printf '%s' 'personal mcp' > "$TMP/operator/mcp.json"
export CODEX_AUTH_SOURCE="$TMP/operator/auth.json"
export CODEX_HOME="$TMP/operator"

source "$RUNNER/transports/codex-exec.sh"

field() {
  node -e 'const v=require(process.argv[1]); const parts=process.argv[2].split("."); let x=v; for (const p of parts) x=x[p]; process.stdout.write(String(x));' "$1" "$2"
}

open_case() {
  local name="$1"
  mkdir -p "$TMP/work-$name" "$TMP/run-$name"
  codex_open "$TMP/work-$name" "$TMP/run-$name"
}

expect_failure() {
  local case_name="$1" expected="$2" timeout="${3:-3}"
  export FAKE_CODEX_CASE="$case_name"
  open_case "$case_name"
  printf '%s' 'do the turn' > "$TMP/$case_name.prompt"
  set +e
  codex_turn "$TMP/$case_name.prompt" 1 "$timeout"
  local rc=$?
  set -e
  [[ $rc -ne 0 ]] || { echo "FAIL: $case_name returned success" >&2; exit 1; }
  local status="$TMP/run-$case_name/turn-1.status.json"
  [[ -s "$TMP/run-$case_name/turn-1.raw.jsonl" || "$case_name" == timeout ]]
  [[ "$(field "$status" failureClass)" == "$expected" ]] || {
    echo "FAIL: $case_name expected $expected, got $(field "$status" failureClass)" >&2
    exit 1
  }
  codex_close
}

export FAKE_CODEX_CASE=success-start
open_case success
printf '%s' 'first' > "$TMP/first.prompt"
codex_turn "$TMP/first.prompt" 1 3
[[ "$(field "$TMP/run-success/turn-1.status.json" ok)" == true ]]
[[ "$(cat "$TMP/run-success/thread-id.txt")" == thread-123 ]]
[[ "$(cat "$TMP/run-success/turn-1.response.txt")" == 'first response' ]]

export FAKE_CODEX_CASE=success-resume
printf '%s' 'second' > "$TMP/second.prompt"
codex_turn "$TMP/second.prompt" 2 3
[[ "$(field "$TMP/run-success/turn-2.status.json" ok)" == true ]]
[[ "$(cat "$TMP/run-success/turn-2.response.txt")" == 'second response' ]]
grep -q 'exec --json' "$FAKE_CODEX_LOG"
grep -q 'exec resume thread-123 --json' "$FAKE_CODEX_LOG"
grep -q 'exec resume thread-123 --json --skip-git-repo-check' "$FAKE_CODEX_LOG" || {
  echo 'FAIL: Codex resume omitted --skip-git-repo-check' >&2
  exit 1
}
[[ "$(sed -n '1p' "$FAKE_CODEX_PWD_LOG")" == "$TMP/work-success" ]] || {
  echo 'FAIL: Codex start did not launch from the target cwd' >&2
  exit 1
}
[[ "$(sed -n '2p' "$FAKE_CODEX_PWD_LOG")" == "$TMP/work-success" ]] || {
  echo 'FAIL: Codex resume did not launch from the target cwd' >&2
  exit 1
}
codex_close

expect_failure turn-failed turn-failed
expect_failure malformed malformed-json
expect_failure missing-thread missing-thread
expect_failure exit-seven process-exit-7
expect_failure timeout timeout 1

export FAKE_CODEX_CASE=success-start
open_case changed
printf '%s' first > "$TMP/changed-first.prompt"
codex_turn "$TMP/changed-first.prompt" 1 3
export FAKE_CODEX_CASE=changed-thread
printf '%s' second > "$TMP/changed-second.prompt"
set +e
codex_turn "$TMP/changed-second.prompt" 2 3
rc=$?
set -e
[[ $rc -ne 0 ]]
[[ "$(field "$TMP/run-changed/turn-2.status.json" failureClass)" == thread-changed ]]
codex_close

export FAKE_CODEX_CASE=isolated-home
open_case isolated
run_home="$CODEX_HOME"
printf '%s' isolate > "$TMP/isolated.prompt"
codex_turn "$TMP/isolated.prompt" 1 3
[[ "$(field "$TMP/run-isolated/turn-1.status.json" ok)" == true ]]
codex_close
[[ ! -e "$run_home" ]]
[[ "$CODEX_HOME" == "$TMP/operator" ]] || {
  echo "FAIL: codex_close did not restore operator CODEX_HOME: $CODEX_HOME" >&2
  exit 1
}

echo 'PASS: Codex exec transport retains and classifies JSONL evidence'

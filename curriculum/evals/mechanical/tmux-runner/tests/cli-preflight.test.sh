#!/usr/bin/env bash
# A stale Claude Code on PATH dies before turn 1 with an empty transcript:
# Homebrew's 1.0.67 rejected `--permission-mode auto` while ~/.local/bin held
# 2.1.283 (Acme run, 2026-09-26). pane_start refuses a claude launch whose
# binary is below the runner floor or lacks the permission mode the command
# asks for — before any tmux session exists — and names the fix.
#
# Run: bash tests/cli-preflight.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

fake() {  # fake <dir> <version> <mode choices>
  mkdir -p "$1"
  cat > "$1/claude" <<EOF
#!/usr/bin/env bash
case "\$1" in
  --version) echo "$2 (Claude Code)" ;;
  --help) echo '  --permission-mode <mode>  Permission mode (choices: $3)' ;;
esac
EOF
  chmod +x "$1/claude"
}
fake "$TMP/old" 1.0.67 '"acceptEdits", "bypassPermissions", "default", "plan"'
fake "$TMP/new" 2.1.283 '"acceptEdits", "auto", "bypassPermissions", "manual", "dontAsk", "plan"'
fake "$TMP/nomode" 2.1.290 '"acceptEdits", "plan"'

check() {  # check <PATH dir> <cmd>  → prints exit code, stderr to $TMP/err
  PATH="$1:$PATH" bash -c "source '$HERE/../lib/tmux.sh'; claude_cli_preflight \"\$1\"" _ "$2" 2>"$TMP/err" >/dev/null
  echo $?
}

echo "[test] a current CLI with the requested mode passes"
[[ "$(check "$TMP/new" 'env CLAUDE_RUNNER_SENTINEL_DIR=/x claude --model sonnet --permission-mode auto')" == 0 ]] \
  && ok "2.1.283 + auto passes" || bad "2.1.283 + auto refused: $(cat "$TMP/err")"

echo "[test] a CLI below the floor is refused with the path, version and floor"
rc="$(check "$TMP/old" 'claude --permission-mode auto')"
[[ "$rc" != 0 ]] && ok "1.0.67 refused" || bad "1.0.67 passed"
grep -q "1.0.67" "$TMP/err" && grep -q "$TMP/old/claude" "$TMP/err" && grep -q "floor 2.1.281" "$TMP/err" \
  && ok "message names version and binary path" || bad "message: $(cat "$TMP/err")"
grep -qi "PATH\|CLAUDE_CMD" "$TMP/err" && ok "message names the remediation" || bad "no remediation: $(cat "$TMP/err")"

echo "[test] a CLI that lacks the requested permission mode is refused"
[[ "$(check "$TMP/nomode" 'claude --permission-mode auto')" != 0 ]] && grep -q '"auto"\|auto' "$TMP/err" \
  && ok "missing mode refused" || bad "missing mode passed"

echo "[test] a non-claude command is not the preflight's business"
[[ "$(check "$TMP/old" 'bash -c true')" == 0 ]] && ok "bash launch passes" || bad "bash launch refused"

echo "[test] a missing binary is refused"
[[ "$(check "$TMP/none" 'env PATH=/nonexistent /nonexistent/claude')" != 0 ]] && ok "missing binary refused" || bad "missing binary passed"

echo "[test] pane_start runs the preflight before creating a session"
out="$(PATH="$TMP/old:$PATH" bash -c "source '$HERE/../lib/tmux.sh'; _tmux() { echo TMUX-CALLED; }; pane_start t-preflight /tmp 'claude --permission-mode auto'" 2>/dev/null)"
[[ "$out" != *TMUX-CALLED* ]] && ok "no tmux session on refusal" || bad "tmux started under a stale CLI"

echo
echo "[test] $pass passed, $fail failed"
[[ $fail -eq 0 ]]

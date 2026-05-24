#!/usr/bin/env bash
# run-prework.sh — drive AE101 prework end-to-end, idempotently.
#
# Single session in the lemmings repo. Walks scenarios/prework.txt:
#   T1 download tarball  -> ~/Downloads/ae101-content.tar.gz
#   T2 extract + install -> ~/Documents/ae101-content/ + 3 skills in ~/.claude/skills/
#   T3 screen + ready    -> bug pick + repo-readiness read (scrollback only)
#
# Re-runnable by construction. Prework writes nothing to the repo, so the
# run can replay over and over. The only durable writes are OUTSIDE the
# repo; this runner RESETS them before each run:
#   - deletes the three installed personal skills (re-installed by T2)
#   - clears ~/Downloads/ae101-content.tar.gz and ~/Documents/ae101-content/
# An end-of-run gate asserts the repo's tracked-file state is unchanged
# vs. the pre-launch baseline — the property that makes the replay safe.
#
# <CONTENT_URL>: the download prompt ships the literal placeholder
# (deploy-time substituted in production). This runner builds the content
# tarball, serves it on 127.0.0.1, and rewrites <CONTENT_URL> to the local
# URL before sending T1. Override with PREWORK_CONTENT_URL to point at a
# real cohort URL (then the local build + server are skipped).
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# sentinel completion proves the turn finished, not that the prompt's
# artifact landed. Each turn is gated by a contract here.
#
# Usage: run-prework.sh [--cwd /path/to/repo]   (default --cwd ~/Projects/lemmings)
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/assertions.sh"

REPO_ROOT="$(cd "$HERE" && git rev-parse --show-toplevel)"

sut_cwd="$HOME/Projects/lemmings"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd) sut_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ ! -d "$sut_cwd" ]]; then
  echo "usage: $0 [--cwd <repo>]   (missing: $sut_cwd)" >&2
  exit 2
fi

scenario="$HERE/scenarios/prework.txt"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

# Prework is install-heavy (curl + tar + cp into ~/.claude/skills). Every
# turn needs tool calls with no human to approve, so unlike run-m{1..4}
# (which leave CLAUDE_CMD to the operator) this runner forces a permissive
# mode by default. bypassPermissions is banned — its startup dialog hangs
# the runner (README § Env knobs).
CLAUDE_CMD="${CLAUDE_CMD:-claude --permission-mode auto}"

run_id="$(date +%Y%m%d-%H%M%S)-$$"
run_dir="$HERE/out/$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-900}"

# ---- Reset out-of-repo durable state (the re-runnable core) --------------
echo "[prework] reset: deleting installed personal skills (T2 re-installs them)"
for s in access-control-analysis stride security-tools; do
  rm -rf "$HOME/.claude/skills/$s"
done
echo "[prework] reset: clearing prior download + extract artifacts"
rm -f  "$HOME/Downloads/ae101-content.tar.gz"
rm -rf "$HOME/Documents/ae101-content"

# ---- Content URL: real override, or build + serve locally ----------------
content_url="${PREWORK_CONTENT_URL:-}"
http_pid=""
if [[ -z "$content_url" ]]; then
  echo "[prework] building content tarball: scripts/build-ae101-content-tarball.sh"
  ( cd "$REPO_ROOT" && ./scripts/build-ae101-content-tarball.sh ) >/dev/null
  tarball="$REPO_ROOT/ae101-content.tar.gz"
  [[ -f "$tarball" ]] || { echo "[prework] FAIL: build produced no $tarball" >&2; exit 1; }
  port="${PREWORK_HTTP_PORT:-8099}"
  ( cd "$REPO_ROOT" && exec python3 -m http.server "$port" --bind 127.0.0.1 ) >/dev/null 2>&1 &
  http_pid=$!
  content_url="http://127.0.0.1:$port/ae101-content.tar.gz"
  # Readiness probe: confirm the server is actually serving the tarball
  # before we launch Claude. Without this, a port clash (crashed prior run,
  # concurrent prework run) leaves a dead URL and the only symptom is a
  # confusing 900s sentinel timeout at T1. Fail fast with a clear message.
  probe_ok=0
  for _ in 1 2 3 4 5; do
    if curl -fsS -o /dev/null "$content_url"; then probe_ok=1; break; fi
    sleep 1
  done
  if [[ "$probe_ok" -ne 1 ]]; then
    echo "[prework] FAIL: tarball not reachable at $content_url" >&2
    echo "[prework]   port $port may be in use (another run? set PREWORK_HTTP_PORT) or python3 http.server died." >&2
    exit 1
  fi
  echo "[prework] serving tarball at $content_url (pid $http_pid)"
else
  echo "[prework] using PREWORK_CONTENT_URL=$content_url (no local build/server)"
fi

# ---- Git baseline (repo must be untouched at end) ------------------------
baseline_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
baseline_tracked="$(cd "$sut_cwd" && git status --porcelain | grep -v '^??' || true)"
baseline_untracked="$(cd "$sut_cwd" && git status --porcelain | grep '^??' || true)"

echo "[prework] cwd=$sut_cwd run=$run_id"
echo "[prework] baseline sha=$baseline_sha"
echo "[prework] launching: env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir $CLAUDE_CMD"

launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir $CLAUDE_CMD"
pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "$warmup"

cleanup() {
  pane_capture "$session" "$run_dir/transcript.txt" 2>/dev/null || true
  pane_kill "$session"
  [[ -n "$http_pid" ]] && kill "$http_pid" 2>/dev/null || true
}
trap cleanup EXIT

# Read scenario into array.
lines=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  lines+=("$line")
done < "$scenario"

total=${#lines[@]}
echo "[prework] turns=$total"

content_dir="$HOME/Documents/ae101-content"

# Assertion dispatch — one case per turn. See scenarios/prework.txt.
assert_turn() {
  local seq="$1" transcript="$2"
  case "$seq" in
    1)  # download — tarball landed in ~/Downloads.
        assert_file_exists "T1 download" "$HOME/Downloads/ae101-content.tar.gz"
        ;;
    2)  # extract + install — content dir populated AND three skills installed.
        local fail=0
        for sub in content/skills lectures exercises reference supplementary; do
          if [[ ! -d "$content_dir/$sub" ]]; then
            echo "[assert] FAIL T2 extract: missing $content_dir/$sub" >&2
            fail=1
          fi
        done
        for s in access-control-analysis stride security-tools; do
          assert_file_exists "T2 skill $s" "$HOME/.claude/skills/$s/SKILL.md" || fail=1
        done
        [[ $fail -eq 0 ]] && echo "[assert] PASS T2 extract+install: content dir populated, 3 skills installed"
        return $fail
        ;;
    3)  # screen + ready — scrollback names a pick and a readiness read.
        # CAUTION: the captured transcript includes the ECHOED prompt, so a
        # grep for words that appear in the prompt tail (trivial / pick / HUD /
        # test / PR / ready / branch) passes on the echo alone — a no-op
        # assertion. Both patterns below are deliberately restricted to
        # Claude's RESPONSE vocabulary (verdict phrasing; test-runner output),
        # which does NOT appear in the sent prompt. See check_platform_and_
        # boundaries.md § 16a (sentinel/echo completion != real delivery).
        local fail=0
        assert_scrollback_grep "T3 bug pick (verdict voice)" "$transcript" \
          "recommend|verdict|I'?d (pick|go|choose|recommend)|go with|going with|clear winner|best (pick|candidate|choice)" || fail=1
        assert_scrollback_grep "T3 readiness (ran/inspected checks)" "$transcript" \
          "node --test|node:test|npm |✔|✓|[0-9]+ (passing|tests?)|# (pass|tests)|no blocker|blocker|able to (branch|commit|open)|clean working tree" || fail=1
        return $fail
        ;;
    *)
        echo "[prework] no assertion configured for turn $seq" >&2
        return 1
        ;;
  esac
}

seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
    echo "[prework] turn=$seq literal=${body:0:60}..."
  else
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[prework] turn=$seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
    # Stand in for deploy-time <CONTENT_URL> substitution on the download turn.
    body="${body//<CONTENT_URL>/$content_url}"
  fi

  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  if ! wait_for_turn "$sentinel_dir" "$seq" "$standard_timeout"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[prework] FAIL turn=$seq (sentinel timeout after ${standard_timeout}s) — see $run_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"

  if ! assert_turn "$seq" "$run_dir/turn-$seq.transcript.txt"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[prework] FAIL turn=$seq assertion miss — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

pane_capture "$session" "$run_dir/transcript.txt"

# ---- End-of-run gate: the repo must be untouched -------------------------
# Hard FAIL if any TRACKED-file state changed (modified/staged) vs baseline:
# that would mean prework wrote into the repo and the run is not a clean
# replay. New untracked paths (e.g. node_modules/ from a test run) are a
# soft WARN — idempotent and ignorable, but worth surfacing.
post_tracked="$(cd "$sut_cwd" && git status --porcelain | grep -v '^??' || true)"
post_untracked="$(cd "$sut_cwd" && git status --porcelain | grep '^??' || true)"

if [[ "$post_tracked" != "$baseline_tracked" ]]; then
  echo "[prework] FAIL repo-untouched gate: tracked-file state changed in $sut_cwd" >&2
  echo "--- baseline (tracked) ---" >&2; echo "$baseline_tracked" >&2
  echo "--- after run (tracked) ---" >&2; echo "$post_tracked" >&2
  exit 1
fi
echo "[assert] PASS repo-untouched: tracked-file state unchanged in $sut_cwd"

if [[ "$post_untracked" != "$baseline_untracked" ]]; then
  echo "[prework] WARN new untracked paths appeared (ignorable, not a repo write):" >&2
  comm -13 <(printf '%s\n' "$baseline_untracked" | sort) \
           <(printf '%s\n' "$post_untracked" | sort) >&2 || true
fi

echo "[prework] PASS turns=$seq — out: $run_dir"

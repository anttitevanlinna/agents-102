#!/usr/bin/env bash
# run-m5.sh — drive AE101 M5 (Learn from the test, re-send packaged).
#
# Three sequential phases, three distinct Claude Code sessions
# (sessions are the boundary M5's design relies on — see exercise
# diagnose-and-resend.md "Open a new Claude Code session in the M5
# worktree" + module "Session: new, M5 long-run" before the re-send).
#
#   Phase A — main pane, in original repo (--main-cwd):
#     ae101-m5-worktree-setup forks the M5 worktree from M4's "M4
#     starting point" SHA. The fork reads task.md's protected
#     `Run coordinates` block to find the m4/ branch + transcript path
#     (pre-cohort-todos [watch]: coordinates land at BOTTOM of task.md;
#     this scenario doesn't paper over that — let it surface if it bites).
#
#   Phase B — exercise pane, in the worktree (--worktree-cwd):
#     diagnose-and-resend-1..6 + canned-reply literals + lock-it-in.
#     Two ask-and-wait turns (verifier approval at -4; reference+plan
#     grill at -6). Builds verifier + reference.md + plan.md at the
#     worktree root.
#
#   Phase C — rerun pane, in the worktree, FRESH session:
#     ae101-m5-rerun-packaged is the long autonomous send-off (up to 1h).
#     Module body says "Open a new Claude Code session in the worktree"
#     — we open a second tmux pane with a fresh `claude` process to
#     match. The packaging files (reference.md, plan.md, verifier) are
#     on disk in the worktree; the new session loads CLAUDE.md /
#     CLAUDE.local.md fresh.
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# sentinel completion proves the turn finished, not that the prompt's
# promised artifact landed. Each phase-B key turn is gated by a contract.
# Phase A asserts the worktree exists post-turn; Phase C asserts the
# m5-state.json carries plausible coordinates.
#
# Scenario file is split into three blocks by comment markers:
#   `# === PA:` / `# === PB:` / `# === PC:`
# Lines before the first marker are treated as preamble (ignored).
# Lines inside a block follow the same shape as M1/M2/M4 scenarios
# (prompt-key first token + optional tail; lines starting with `*` are
# literal-text canned replies).
#
# Usage:
#   run-m5.sh --main-cwd /path/to/repo --worktree-cwd /path/to/repo-m5
#
# m5-state.json shape:
#   {
#     "run_id": "...",
#     "m5_main_cwd": "...",
#     "m5_worktree_cwd": "...",
#     "m5_starting_sha": "abc1234",   (HEAD in worktree at start of phase C)
#     "m5_ending_sha":   "def5678",   (HEAD in worktree after phase C)
#     "m5_branch": "m5/<slug>",
#     "m5_exercise_session_uuid": "...",
#     "m5_rerun_session_uuid": "...",
#     "m5_exercise_transcript_path": "...",
#     "m5_rerun_transcript_path": "...",
#     "m5_reference": "/path/to/reference.md",
#     "m5_plan_md":   "/path/to/plan.md",
#     "m5_verifier":  "...",   (best-effort discovered; empty if not found)
#     "m5_run_notes": "..."    (RUN-NOTES.md at worktree root, if present)
#   }
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/assertions.sh"

main_cwd=""
worktree_cwd=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --main-cwd)     main_cwd="$2"; shift 2 ;;
    --worktree-cwd) worktree_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$main_cwd" || ! -d "$main_cwd" ]]; then
  echo "usage: $0 --main-cwd <repo> --worktree-cwd <m5-worktree-path>" >&2
  echo "  main-cwd must exist; worktree-cwd is the path the fork prompt will create." >&2
  exit 2
fi
if [[ -z "$worktree_cwd" ]]; then
  echo "usage: $0 --main-cwd <repo> --worktree-cwd <m5-worktree-path>" >&2
  exit 2
fi

scenario="${SCENARIO:-$HERE/scenarios/m5.txt}"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

run_id="$(date +%Y%m%d-%H%M%S)-$$"
run_dir="$HERE/out/$run_id"
pa_dir="$run_dir/pa"
pb_dir="$run_dir/pb"
pc_dir="$run_dir/pc"
mkdir -p "$pa_dir/sentinels" "$pb_dir/sentinels" "$pc_dir/sentinels"

pa_session="runner-$run_id-pa"
pb_session="runner-$run_id-pb"
pc_session="runner-$run_id-pc"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
launch_cmd_template="${CLAUDE_CMD:-claude}"

# Per-turn timeouts.
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-3600}"
# Phase B's diagnose-and-resend-6 grill round can be long (multiple
# rounds of three questions before the agent says "ready"). Same budget
# as the standard turn — the canned-reply pattern caps it at one round.
# Phase C is the long send-off; budget is up to 1h by default.
sendoff_timeout="${CLAUDE_RUNNER_M5_SENDOFF_TIMEOUT:-3600}"

echo "[m5] run=$run_id"
echo "[m5] main_cwd=$main_cwd"
echo "[m5] worktree_cwd=$worktree_cwd (will be created by phase A)"
echo "[m5] scenario=$scenario"

# ============================================================
# Parse scenario into three phase-blocks: PA, PB, PC.
# Block markers are `# === PA:`, `# === PB:`, `# === PC:` (case-sensitive).
# Lines before the first marker are preamble (ignored).
# ============================================================
pa_lines=()
pb_lines=()
pc_lines=()
phase=""  # "", "pa", "pb", "pc"

while IFS= read -r line || [[ -n "$line" ]]; do
  # Block-marker detection (must happen BEFORE general comment-skip).
  if [[ "$line" =~ ^#[[:space:]]*===[[:space:]]*PA ]]; then
    phase="pa"; continue
  elif [[ "$line" =~ ^#[[:space:]]*===[[:space:]]*PB ]]; then
    phase="pb"; continue
  elif [[ "$line" =~ ^#[[:space:]]*===[[:space:]]*PC ]]; then
    phase="pc"; continue
  fi
  # Skip blanks + comment-only lines.
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  case "$phase" in
    pa) pa_lines+=("$line") ;;
    pb) pb_lines+=("$line") ;;
    pc) pc_lines+=("$line") ;;
    "") ;; # preamble, ignore
  esac
done < "$scenario"

pa_total=${#pa_lines[@]}
pb_total=${#pb_lines[@]}
pc_total=${#pc_lines[@]}
echo "[m5] phase counts: PA=$pa_total PB=$pb_total PC=$pc_total"

if [[ "$pa_total" -lt 1 || "$pb_total" -lt 1 || "$pc_total" -lt 1 ]]; then
  echo "[m5] FAIL: scenario must have at least one line in each of PA/PB/PC" >&2
  exit 2
fi

# Cleanup trap kills all three sessions; bounded captures prevent
# trap-hold on actively-rendering panes.
cleanup() {
  pane_capture_safe "$pa_session" "$pa_dir/transcript.txt" 10
  pane_capture_safe "$pb_session" "$pb_dir/transcript.txt" 10
  pane_capture_safe "$pc_session" "$pc_dir/transcript.txt" 10
  pane_kill "$pa_session"
  pane_kill "$pb_session"
  pane_kill "$pc_session"
}
trap cleanup EXIT

# ============================================================
# Helpers: render a scenario line, label it, send via tmux.
# ============================================================
render_line() {
  local line="$1"
  if [[ "$line" == \** ]]; then
    local body="${line#\*}"
    body="${body# }"
    printf '%s' "$body"
  else
    local key="${line%%[[:space:]]*}"
    local tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    local body
    body="$(resolve_prompt "$key")"
    if [[ -n "$tail" ]]; then
      body="${body}"$'\n'"${tail}"
    fi
    printf '%s' "$body"
  fi
}

label_line() {
  local line="$1"
  if [[ "$line" == \** ]]; then
    echo "literal=${line:0:50}..."
  else
    local key="${line%%[[:space:]]*}"
    echo "key=$key"
  fi
}

is_literal_line() {
  [[ "$1" == \** ]]
}

# ============================================================
# Snapshot transcripts dirs + git baseline.
# ============================================================
encoded_main_cwd="$(echo "$main_cwd" | sed 's|/|-|g')"
main_transcripts_dir="$HOME/.claude/projects/$encoded_main_cwd"
mkdir -p "$main_transcripts_dir"
pre_main_transcripts="$(ls "$main_transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"

run_start_epoch="$(date +%s)"

# ============================================================
# Phase A: ae101-m5-worktree-setup in the main repo.
# Single prompt-key turn; creates the worktree.
# ============================================================
echo "[m5] === phase A: main-pane worktree setup ==="
launch_pa="env CLAUDE_RUNNER_SENTINEL_DIR=$pa_dir/sentinels $launch_cmd_template"
echo "[m5] PA launching in $main_cwd: $launch_pa"
pane_start "$pa_session" "$main_cwd" "$launch_pa"
sleep "$warmup"

pa_seq=0
pa_key_seq=0
for line in "${pa_lines[@]}"; do
  pa_seq=$((pa_seq + 1))
  if is_literal_line "$line"; then
    echo "[m5] PA turn=$pa_seq literal"
  else
    pa_key_seq=$((pa_key_seq + 1))
    echo "[m5] PA turn=$pa_seq $(label_line "$line")"
  fi
  body="$(render_line "$line")"
  printf '%s' "$body" > "$pa_dir/turn-$pa_seq.prompt.txt"
  pane_send_text "$pa_session" "$body"

  if is_slash_only "$body"; then
    fake_sentinel_after_render "$pa_dir/sentinels" "$pa_seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn "$pa_dir/sentinels" "$pa_seq" "$standard_timeout"; then
    pane_capture_safe "$pa_session" "$pa_dir/transcript.txt" 10
    echo "[m5] FAIL PA turn=$pa_seq (sentinel timeout after ${standard_timeout}s) — see $pa_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$pa_session" "$pa_dir/turn-$pa_seq.transcript.txt"
done

# Assert the worktree exists.
if [[ ! -d "$worktree_cwd" ]]; then
  echo "[assert] FAIL PA: worktree $worktree_cwd not created by ae101-m5-worktree-setup" >&2
  pane_capture_safe "$pa_session" "$pa_dir/transcript.txt" 10
  exit 1
fi
if [[ ! -d "$worktree_cwd/.git" && ! -f "$worktree_cwd/.git" ]]; then
  echo "[assert] FAIL PA: $worktree_cwd exists but is not a git worktree (no .git entry)" >&2
  exit 1
fi
# .git in a worktree is a file (`gitdir: ...`), not a dir.
echo "[assert] PASS PA: worktree at $worktree_cwd"

# Capture PA scrollback for the final transcript, then kill PA — its
# session is done and its presence on the M4 cwd would otherwise tie
# up the encoded transcripts dir snapshot bookkeeping for downstream
# phases that read worktree-cwd-encoded transcripts.
pane_capture "$pa_session" "$pa_dir/transcript.txt"
pane_kill "$pa_session"

# Snapshot worktree state baselines before phase B.
encoded_worktree_cwd="$(echo "$worktree_cwd" | sed 's|/|-|g')"
worktree_transcripts_dir="$HOME/.claude/projects/$encoded_worktree_cwd"
mkdir -p "$worktree_transcripts_dir"
pre_pb_transcripts="$(ls "$worktree_transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
worktree_baseline_sha="$(cd "$worktree_cwd" && git rev-parse --short HEAD)"
worktree_branch="$(cd "$worktree_cwd" && git rev-parse --abbrev-ref HEAD)"
reference_md="$worktree_cwd/reference.md"
plan_md="$worktree_cwd/plan.md"
reference_baseline_mtime="$(mtime_of "$reference_md")"
plan_baseline_mtime="$(mtime_of "$plan_md")"
echo "[m5] worktree baseline: branch=$worktree_branch sha=$worktree_baseline_sha"

# ============================================================
# Phase B: exercise — diagnose-and-resend-1..6 in worktree.
# Install Stop hook in worktree (git worktree add doesn't copy
# .claude/settings.local.json — same lesson as M3 phase B).
# ============================================================
echo "[m5] === phase B: exercise in $worktree_cwd ==="
echo "[m5] PB installing Stop hook into worktree"
"$HERE/install-sut.sh" "$worktree_cwd"

launch_pb="env CLAUDE_RUNNER_SENTINEL_DIR=$pb_dir/sentinels $launch_cmd_template"
echo "[m5] PB launching: $launch_pb"
pane_start "$pb_session" "$worktree_cwd" "$launch_pb"
sleep "$warmup"

# Verifier file location is student-picked (diagnose-and-resend-4 says
# "tell me where it lives"). We can't assert a fixed path; instead we
# track the worktree-tree state via `git stash create` before and after
# T4 (the verifier-save canned-reply turn) so the assertion fires on
# tree-content advance — the same shape run-m1.sh uses for the T6
# deeper-pass check. Verifier may also land under .claude/hooks/ or as
# a slash-command file — both are tracked git paths only if the
# worktree's gitignore lets them through, but `git stash create` sees
# unstaged tracked changes + everything under non-ignored paths. Best
# effort; if the verifier lands fully under a gitignored path we fall
# back to scrollback-grep for "verifier" / "saved".
tree_sha_before_verifier_save=""

assert_pb_turn() {
  local key_seq="$1" transcript="$2"
  case "$key_seq" in
    1)  # diagnose-and-resend-1 — print transcript path + confirm jsonl.
        # Scrollback should contain a path under ~/.claude/projects/ and
        # a "exists" / ".jsonl" affirmation.
        assert_scrollback_grep "PB-T1 transcript-path" "$transcript" '\.claude/projects/|\.jsonl'
        ;;
    2)  # diagnose-and-resend-2 — three lenses with quoted moments.
        # Scrollback should name at least two of the three failure modes.
        # Pattern: "drift" / "rot" / "plausible" / "wrong" (any two hits).
        # Loose match; the exercise tolerates "no instance" for a lens.
        assert_scrollback_grep "PB-T2 lens-named" "$transcript" "drift|rot|plausible|dominant"
        ;;
    3)  # diagnose-and-resend-3 — validation categories named.
        # Scrollback should name spec / working-doc / check shapes.
        assert_scrollback_grep "PB-T3 validation-mapping" "$transcript" "spec|working doc|plan\.md|reference|verifier|check|test|hook"
        ;;
    4)  # diagnose-and-resend-4 — verifier PROPOSED (not saved yet).
        # The ask-and-wait tail explicitly defers the save to the canned
        # reply that follows. Assert the proposal is in scrollback;
        # snapshot the tree SHA so case 5 can verify the save landed.
        if ! assert_scrollback_grep "PB-T4 verifier-proposed" "$transcript" "verifier|hook|judge|background.agent|ralph|re.feed|shell.hook"; then
          return 1
        fi
        tree_sha_before_verifier_save="$(cd "$worktree_cwd" && git stash create 2>/dev/null || true)"
        echo "[m5] PB-T4 pre-save tree=${tree_sha_before_verifier_save:0:8}"
        ;;
    5)  # diagnose-and-resend-5 — smoke-test PASS + FAIL synthetic inputs.
        # Two assertions: (a) scrollback names PASS and FAIL outcomes;
        # (b) tree content advanced past the pre-save baseline OR the
        # verifier landed under a gitignored path (fallback scrollback
        # grep for save-path-like text).
        if ! assert_scrollback_grep "PB-T5 smoke-test outcomes" "$transcript" "pass|fail|expected|fired|matched"; then
          return 1
        fi
        local tree_now
        tree_now="$(cd "$worktree_cwd" && git stash create 2>/dev/null || true)"
        if [[ -n "$tree_now" && "$tree_now" != "$tree_sha_before_verifier_save" ]]; then
          echo "[assert] PASS PB-T5 worktree tree advanced (${tree_sha_before_verifier_save:0:8} -> ${tree_now:0:8})"
        else
          # Verifier may have landed under .gitignore'd path. Soft check:
          # scrollback names a saved-to path.
          assert_or_warn assert_scrollback_grep "PB-T5 verifier saved (path mentioned)" "$transcript" "saved|wrote|created|/Users/|~/|\.claude/"
        fi
        ;;
    6)  # diagnose-and-resend-6 — grill round in chat (don't touch files
        # yet). Three-questions-per-round numbered list expected in
        # scrollback; reference.md and plan.md must remain at their
        # pre-T6 mtime baseline (the prompt's "Don't touch either file
        # until I say 'lock it in.'" contract).
        if ! assert_scrollback_grep "PB-T6 three-question grill" "$transcript" "1\.|1\)|^[[:space:]]*-|question"; then
          return 1
        fi
        local ref_now plan_now
        ref_now="$(mtime_of "$reference_md")"
        plan_now="$(mtime_of "$plan_md")"
        if [[ "$ref_now" -gt "$reference_baseline_mtime" ]]; then
          echo "[assert] FAIL PB-T6 reference.md touched before 'lock it in' (mtime $reference_baseline_mtime -> $ref_now)" >&2
          return 1
        fi
        if [[ "$plan_now" -gt "$plan_baseline_mtime" ]]; then
          echo "[assert] FAIL PB-T6 plan.md touched before 'lock it in' (mtime $plan_baseline_mtime -> $plan_now)" >&2
          return 1
        fi
        echo "[assert] PASS PB-T6 reference.md+plan.md untouched (mtimes stable)"
        # Refresh baselines: the 'lock it in' literal fires next; the
        # downstream "files exist" assertion happens after phase B closes.
        reference_baseline_mtime="$ref_now"
        plan_baseline_mtime="$plan_now"
        ;;
    *)
        echo "[m5] no PB assertion configured for key_seq=$key_seq" >&2
        return 1
        ;;
  esac
}

pb_seq=0
pb_key_seq=0
for line in "${pb_lines[@]}"; do
  pb_seq=$((pb_seq + 1))
  is_literal=0
  if is_literal_line "$line"; then
    is_literal=1
    echo "[m5] PB turn=$pb_seq literal=${line:0:60}..."
  else
    pb_key_seq=$((pb_key_seq + 1))
    echo "[m5] PB turn=$pb_seq key_seq=$pb_key_seq $(label_line "$line")"
  fi

  body="$(render_line "$line")"
  printf '%s' "$body" > "$pb_dir/turn-$pb_seq.prompt.txt"
  pane_send_text "$pb_session" "$body"

  if is_slash_only "$body"; then
    echo "[m5] PB turn=$pb_seq slash-command — bridging via lib"
    fake_sentinel_after_render "$pb_dir/sentinels" "$pb_seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn "$pb_dir/sentinels" "$pb_seq" "$standard_timeout"; then
    pane_capture_safe "$pb_session" "$pb_dir/transcript.txt" 10
    echo "[m5] FAIL PB turn=$pb_seq (sentinel timeout after ${standard_timeout}s) — see $pb_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$pb_session" "$pb_dir/turn-$pb_seq.transcript.txt"

  if [[ "$is_literal" -eq 1 ]]; then
    echo "[m5] PB turn=$pb_seq literal — no assertion (downstream key-turn or post-phase will gate)"
    continue
  fi

  if ! assert_pb_turn "$pb_key_seq" "$pb_dir/turn-$pb_seq.transcript.txt"; then
    pane_capture_safe "$pb_session" "$pb_dir/transcript.txt" 10
    echo "[m5] FAIL PB turn=$pb_seq key_seq=$pb_key_seq assertion miss — see $pb_dir/turn-$pb_seq.transcript.txt" >&2
    exit 1
  fi
done

# Post-phase-B: assert reference.md + plan.md landed after the
# 'lock it in' literal. (The literal is the last canned reply in
# the PB block; its sentinel has fired but it carries no assertion
# of its own.)
if [[ ! -f "$reference_md" ]]; then
  echo "[assert] FAIL PB post: reference.md missing at $reference_md after lock-it-in" >&2
  exit 1
fi
if [[ ! -f "$plan_md" ]]; then
  echo "[assert] FAIL PB post: plan.md missing at $plan_md after lock-it-in" >&2
  exit 1
fi
ref_final_mtime="$(mtime_of "$reference_md")"
plan_final_mtime="$(mtime_of "$plan_md")"
if [[ "$ref_final_mtime" -le "$reference_baseline_mtime" ]]; then
  echo "[assert] FAIL PB post: reference.md mtime did not advance after lock-it-in (baseline=$reference_baseline_mtime cur=$ref_final_mtime)" >&2
  exit 1
fi
if [[ "$plan_final_mtime" -le "$plan_baseline_mtime" ]]; then
  echo "[assert] FAIL PB post: plan.md mtime did not advance after lock-it-in (baseline=$plan_baseline_mtime cur=$plan_final_mtime)" >&2
  exit 1
fi
echo "[assert] PASS PB post: reference.md + plan.md landed after lock-it-in"

pane_capture "$pb_session" "$pb_dir/transcript.txt"
# Identify PB session UUID.
post_pb_transcripts="$(ls "$worktree_transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
pb_uuid=""
for f in $post_pb_transcripts; do
  if ! echo " $pre_pb_transcripts " | grep -qF " $f "; then
    pb_uuid="${f%.jsonl}"
    break
  fi
done

# Kill PB; phase C runs in a FRESH session in the same worktree cwd.
pane_kill "$pb_session"

# ============================================================
# Phase C: packaged re-send (FRESH session in worktree).
# Long autonomous send-off; per-turn timeout = sendoff_timeout (1h).
# ============================================================
echo "[m5] === phase C: packaged re-send in $worktree_cwd (FRESH session) ==="
pre_pc_transcripts="$post_pb_transcripts"
worktree_sha_before_pc="$(cd "$worktree_cwd" && git rev-parse --short HEAD)"

launch_pc="env CLAUDE_RUNNER_SENTINEL_DIR=$pc_dir/sentinels $launch_cmd_template"
echo "[m5] PC launching: $launch_pc"
pane_start "$pc_session" "$worktree_cwd" "$launch_pc"
sleep "$warmup"

pc_seq=0
pc_key_seq=0
for line in "${pc_lines[@]}"; do
  pc_seq=$((pc_seq + 1))
  if is_literal_line "$line"; then
    echo "[m5] PC turn=$pc_seq literal=${line:0:60}..."
  else
    pc_key_seq=$((pc_key_seq + 1))
    echo "[m5] PC turn=$pc_seq key_seq=$pc_key_seq $(label_line "$line")"
  fi

  body="$(render_line "$line")"
  printf '%s' "$body" > "$pc_dir/turn-$pc_seq.prompt.txt"
  pane_send_text "$pc_session" "$body"

  if is_slash_only "$body"; then
    fake_sentinel_after_render "$pc_dir/sentinels" "$pc_seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn "$pc_dir/sentinels" "$pc_seq" "$sendoff_timeout"; then
    pane_capture_safe "$pc_session" "$pc_dir/transcript.txt" 10
    echo "[m5] FAIL PC turn=$pc_seq (sentinel timeout after ${sendoff_timeout}s) — see $pc_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$pc_session" "$pc_dir/turn-$pc_seq.transcript.txt"
done

pane_capture "$pc_session" "$pc_dir/transcript.txt"

# Post-phase-C assertions:
#  - plan.md exists and has a "Run coordinates" block at the top
#    (prompt body writes it BEFORE the run).
#  - plan.md mtime advanced past the lock-it-in baseline (re-send
#    mutated plan.md during the run).
#  - HEAD in worktree may or may not have advanced — the prompt doesn't
#    require commits. Capture as data, don't assert.
if ! grep -E -i -q "Run coordinates" "$plan_md"; then
  echo "[assert] FAIL PC post: plan.md missing 'Run coordinates' block (prompt body requires it before the run)" >&2
  exit 1
fi
plan_post_pc_mtime="$(mtime_of "$plan_md")"
if [[ "$plan_post_pc_mtime" -le "$plan_final_mtime" ]]; then
  echo "[assert] WARN PC post: plan.md mtime did not advance during the re-send (lock-in=$plan_final_mtime end=$plan_post_pc_mtime) — agent may have stalled early" >&2
fi
echo "[assert] PASS PC post: plan.md has Run coordinates block"

# Identify PC session UUID.
post_pc_transcripts="$(ls "$worktree_transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
pc_uuid=""
for f in $post_pc_transcripts; do
  if ! echo " $pre_pc_transcripts " | grep -qF " $f "; then
    pc_uuid="${f%.jsonl}"
    break
  fi
done

# ============================================================
# Write m5-state.json.
# ============================================================
worktree_ending_sha="$(cd "$worktree_cwd" && git rev-parse --short HEAD)"
worktree_ending_branch="$(cd "$worktree_cwd" && git rev-parse --abbrev-ref HEAD)"

# Best-effort verifier discovery: look for files mentioned as "saved" /
# "verifier" path in PB transcripts. Heuristic, not load-bearing.
m5_verifier=""
verifier_candidate="$(grep -hoE '(/Users/[^[:space:]]+|~/[^[:space:]]+|\.claude/hooks/[^[:space:]]+|verifier\.[a-z]+)' \
  "$pb_dir"/turn-*.transcript.txt 2>/dev/null \
  | grep -E '(verifier|hook|judge)' \
  | head -1 || true)"
if [[ -n "$verifier_candidate" ]]; then
  m5_verifier="${verifier_candidate/#\~/$HOME}"
fi

m5_run_notes=""
[[ -f "$worktree_cwd/RUN-NOTES.md" ]] && m5_run_notes="$worktree_cwd/RUN-NOTES.md"

state_file="$run_dir/m5-state.json"
cat > "$state_file" <<EOF
{
  "run_id": "$run_id",
  "m5_main_cwd": "$main_cwd",
  "m5_worktree_cwd": "$worktree_cwd",
  "m5_starting_sha": "$worktree_sha_before_pc",
  "m5_ending_sha": "$worktree_ending_sha",
  "m5_branch": "$worktree_ending_branch",
  "m5_exercise_session_uuid": "$pb_uuid",
  "m5_rerun_session_uuid": "$pc_uuid",
  "m5_exercise_transcript_path": "$worktree_transcripts_dir/$pb_uuid.jsonl",
  "m5_rerun_transcript_path": "$worktree_transcripts_dir/$pc_uuid.jsonl",
  "m5_reference": "$reference_md",
  "m5_plan_md": "$plan_md",
  "m5_verifier": "$m5_verifier",
  "m5_run_notes": "$m5_run_notes"
}
EOF

echo "[m5] PASS all phases — out: $run_dir"
echo "[m5] state.json: $state_file"
cat "$state_file"

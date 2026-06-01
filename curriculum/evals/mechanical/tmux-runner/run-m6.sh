#!/usr/bin/env bash
# run-m6.sh — drive AE101 M6 (Spot gaps, build the loop + Arc retrospective)
# end-to-end.
#
# Single session in the M5 worktree (`../<repo>-m5`). Walks scenarios/m6.txt:
# diff-two-runs → cut-stale-rule → study-the-stack → draw-shapes →
# primitives-menu → author-skill (interview + save-gate) → critique →
# invoke-on-real-run → arc-retrospective.
#
# Why single-session, not race-based like M3: M6 is reflection + authoring +
# retrospective, no parallel tracks. The arc-retrospective prompt body asks
# the agent to dispatch a fresh Agent-tool sub-task internally; the runner
# stays one pane.
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# sentinel completion proves the turn finished, not that the prompt's
# promised artifact landed. Each prompt-key turn is gated by a contract
# here. Dispatched on key_seq (prompt-key counter), NOT total seq —
# canned-reply literals in m6-codesearch.txt don't shift the case numbers.
#
# Usage: run-m6.sh --cwd /path/to/worktree [--task-slug <slug>]
#
# state.json shape:
#   {
#     "m6_cwd": "/Users/.../lemmings-m5",
#     "m6_session_uuid": "<uuid>",
#     "m6_transcript_path": "<path>",
#     "m6_new_skills": ["skill-name-1", ...],
#     "m6_claude_local_md_mtime_advanced": true|false,
#     "m6_arc_note_paths": ["<saved-path>", ...]
#   }
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/assertions.sh"

sut_cwd=""
task_slug=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd)        sut_cwd="$2"; shift 2 ;;
    --task-slug)  task_slug="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$sut_cwd" || ! -d "$sut_cwd" ]]; then
  echo "usage: $0 --cwd <worktree> [--task-slug <slug>]" >&2
  exit 2
fi

scenario="${SCENARIO:-$HERE/scenarios/m6.txt}"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir ${CLAUDE_CMD:-claude}"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
# M6 turns are reading-heavy (Phase 1 diff across two runs, arc-retrospective
# read across six modules). Authoring + invocation turns are shorter. Default
# 1h matches M1/M2; override via env.
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-3600}"
# Soft cap for the -study turn ONLY (default 300s = 5 min). -study scans the
# whole ~/.claude/projects/ tree — the one turn with unbounded read time. If it
# runs past this it gets ESC-interrupted and nudged to wrap up ("Just give me
# the results. We continue."), then the walk continues. Every OTHER turn keeps
# the plain hard timeout (standard_timeout) — diff (T1) and arc-retro (T9) are
# legitimately long at high effort and must not be clipped. Set
# CLAUDE_RUNNER_SOFT_CAP=0 to disable the nudge entirely.
soft_cap="${CLAUDE_RUNNER_SOFT_CAP:-300}"

# Snapshot transcripts dir + git baseline + skills dir + CLAUDE.local.md mtime.
# NOTE: encoded_cwd uses `/` → `-`; Claude Code also collapses `.` → `-` (latent
# IMPROVEMENTS.md finding 2026-05-24). Current SUT paths (lemmings, picoshare,
# codesearch) carry no dots, so this is correct today; fix at lib level when a
# dotted SUT path lands.
encoded_cwd="$(echo "$sut_cwd" | sed 's|/|-|g')"
transcripts_dir="$HOME/.claude/projects/$encoded_cwd"
# user_mem_dir = home-keyed auto-memory for THIS SUT cwd. M6 arc-retrospectives
# may land here (the picoshare 2026-05-26 practice-arc-M1-M6.md case): the
# agent reasons about cross-module retrospectives as personal-not-team and
# picks the home-keyed slot over the in-repo observations/ memo shape.
user_mem_dir="$transcripts_dir/memory"
mkdir -p "$transcripts_dir"
pre_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
baseline_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
baseline_branch="$(cd "$sut_cwd" && git rev-parse --abbrev-ref HEAD)"

skills_dir="$HOME/.claude/skills"
mkdir -p "$skills_dir"
pre_skills="$(ls "$skills_dir" 2>/dev/null | sort | tr '\n' ' ')"

claude_local_md="$sut_cwd/CLAUDE.local.md"
claude_local_mtime_baseline="$(mtime_of "$claude_local_md")"
run_start_epoch="$(date +%s)"
# Reference marker for "files saved during this run". find_recent_md uses
# `-newer <reffile>` (POSIX) — BSD find on macOS can't parse `-newermt
# "@epoch"` and errored silently, so the old arc-note scan never matched
# (IMPROVEMENTS.md Fix 4, 2026-05-25).
run_start_marker="$run_dir/.run-start"
touch "$run_start_marker"

echo "[m6] cwd=$sut_cwd run=$run_id"
echo "[m6] baseline sha=$baseline_sha branch=$baseline_branch"
echo "[m6] pre-skills=$pre_skills"
echo "[m6] soft-cap=${soft_cap}s (ESC+nudge, -study turn only) hard-timeout=${standard_timeout}s"
echo "[m6] launching: $launch_cmd"

pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "$warmup"

cleanup() {
  pane_capture_safe "$session" "$run_dir/transcript.txt" 10
  pane_kill "$session"
}
trap cleanup EXIT

# Read scenario into array.
lines=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  lines+=("$line")
done < "$scenario"

total=${#lines[@]}
echo "[m6] turns=$total"

# Locate the new skill directory authored during this run.
# Returns the first skill name that didn't exist in pre_skills.
new_skill_global=""
locate_new_skill() {
  local d base
  new_skill_global=""
  for d in "$skills_dir"/*/; do
    [[ -d "$d" ]] || continue
    base="$(basename "$d")"
    if ! echo " $pre_skills " | grep -qF " $base "; then
      # Only count it if SKILL.md actually exists inside.
      if [[ -f "$d/SKILL.md" ]]; then
        new_skill_global="$base"
        return 0
      fi
    fi
  done
  return 1
}

# Assertion dispatch — one case per prompt-key turn. Dispatched on key_seq.
# Literal turns (lines starting with `*`) are skipped — sentinel-wait +
# transcript capture only, no assertion. Same dispatch shape as run-m2.sh.
assert_turn() {
  local seq="$1" transcript="$2"
  case "$seq" in
    1)  # spot-gaps-build-the-loop-1 — diff two runs across four dimensions.
        # Scrollback must surface the four-dim frame OR the ranked gap.
        # The body asks for "what packaging caught / missed / introduced /
        # where the fix belongs" + a final ranked gap. Match any of the
        # frame words plus a ranking signal.
        assert_scrollback_grep "T1 four-dim diff" "$transcript" "caught|missed|introduced|gap|dominant|rank|ranked"
        ;;
    2)  # spot-gaps-build-the-loop-2 — cut one stale rule from
        # ./CLAUDE.local.md OR say all rules hold and stop. Pass if file
        # mtime advanced OR scrollback says rules held / stopped.
        if assert_file_mtime_advanced "T2 CLAUDE.local.md mtime" "$claude_local_md" "$claude_local_mtime_baseline" 2>/dev/null; then
          return 0
        fi
        assert_scrollback_grep "T2 rules-held fallback" "$transcript" "all rules|still holds?|every rule|no rule|nothing to cut|hold under|stop"
        ;;
    3)  # spot-gaps-build-the-loop-study — wider look across the whole
        # stack: scans ~/.claude/projects/ and groups the kinds of work
        # that recur (SUT-independent — the student's own session history,
        # not the SUT codebase). Soft check: scrollback shows a grouped +
        # ranked recurring-work inventory. Vocabulary is wide.
        assert_scrollback_grep "T3 repeated-work inventory" "$transcript" "group|recur|repeat|pattern|kind of work|across|stack|rank|ranked|top|instance"
        ;;
    4)  # spot-gaps-build-the-loop-shapes — draw the top recurring
        # work-shapes as mermaid diagrams. Require mermaid-syntax tokens,
        # not English words — "flow"/"branch"/"loop"/"step" passed even
        # without any diagram drawn (2026-06-01 audit; happened to fire
        # for the right reason this run, hole closed for next).
        assert_scrollback_grep "T4 recurring-shape diagrams" "$transcript" "mermaid|flowchart|graph TD|graph LR|-->"
        ;;
    5)  # spot-gaps-build-the-loop-primitives — 5-10 atomic primitives
        # named with fire-timing, then 2-3 ranked for the dominant gap.
        # Primitives vocabulary is wide; match any 3+ to confirm a list
        # was produced (loose grep with several alternations).
        assert_scrollback_grep "T5 primitives menu" "$transcript" "test|lint|format|typecheck|compile|build|browser|smoke|review|diff|judge|verifier|gate|schema|contract|eval"
        ;;
    6)  # spot-gaps-build-the-loop-3 — author skill through interview.
        # The prompt says "Show me before saving" — under the ask-and-wait
        # pattern the actual file write may land in the next literal
        # turn's response (codesearch variant) OR in this turn (lemmings
        # suppression variant). Defer the hard file-existence check to
        # case 7; here, assert scrollback contains the interview shape
        # (questions, draft, or save-gate language).
        assert_scrollback_grep "T6 interview/draft" "$transcript" "question|interview|skill|name|description|frontmatter|fires|shape|save"
        ;;
    7)  # spot-gaps-build-the-loop-4 — critique before shipping. By this
        # turn the SKILL.md must exist somewhere under ~/.claude/skills/
        # (both ask-and-wait and suppression variants have had the
        # save-gate fire by now). Two checks: (a) a new skill dir with
        # SKILL.md exists since baseline; (b) scrollback contains
        # critique-shaped language (weakest, generic, missing).
        if ! locate_new_skill; then
          echo "[assert] FAIL T7 new-skill: no new ~/.claude/skills/<name>/SKILL.md since baseline" >&2
          return 1
        fi
        echo "[assert] PASS T7 new-skill: $new_skill_global"
        assert_scrollback_grep "T7 critique-shape" "$transcript" "weak|weakest|generic|missing|assumption|push.back|wrong"
        ;;
    8)  # spot-gaps-build-the-loop-5 — invoke skill on M5 packaged run,
        # produce output, judge it in the same turn. Match invocation +
        # judgement vocabulary. The skill's name SHOULD appear in
        # scrollback (the prompt says "by its name"); we don't hard-grep
        # for the exact name because the agent may abbreviate or quote
        # differently — fall back to the menu vocab + judgement words.
        assert_scrollback_grep "T8 invoke+judge" "$transcript" "invoke|invoked|catch|caught|miss|missed|finding|pass|fail|fired|output|good|useful|sharper"
        ;;
    9)  # arc-retrospective-1 — one-page note, agent shows before saving,
        # student-picked destination (ADR / observations/ / standalone
        # file). The body says "Show me the note before you save it.
        # I'll push back, then we save." The codesearch variant adds an
        # explicit save-approval literal after this turn; the lemmings
        # variant leaves the save to a follow-up turn. Scrollback must
        # contain a note-shaped output (arc / changed / pattern words +
        # a proposed destination).
        assert_scrollback_grep "T9 arc-note" "$transcript" "arc|changed|pattern|shape|practice|ADR|memo|memory|standalone|propose"
        ;;
    *)
        echo "[m6] no assertion configured for prompt-key turn $seq" >&2
        return 1
        ;;
  esac
}

seq=0
key_seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))
  is_literal=0
  turn_soft_cap=0   # only the -study turn opts in below; 0 = plain hard timeout

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
    is_literal=1
    echo "[m6] turn=$seq literal=${body:0:60}..."
  else
    key_seq=$((key_seq + 1))
    key="${line%%[[:space:]]*}"
    # The -study turn scans the whole ~/.claude/projects/ tree — the only turn
    # with unbounded read time. Cap just it; the rest keep the hard timeout.
    [[ "$key" == "spot-gaps-build-the-loop-study" ]] && turn_soft_cap="$soft_cap"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[m6] turn=$seq key_seq=$key_seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi

  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  if is_slash_only "$body"; then
    echo "[m6] turn=$seq slash-command (no sentinel) — bridging via lib"
    fake_sentinel_after_render "$sentinel_dir" "$seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn_guarded "$sentinel_dir" "$seq" "$standard_timeout" "$session" "$turn_soft_cap"; then
    pane_capture_safe "$session" "$run_dir/transcript.txt" 10
    echo "[m6] FAIL turn=$seq — see $run_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"

  # Literal turns carry no assertion — the next prompt-key turn picks up
  # downstream state.
  if [[ "$is_literal" -eq 1 ]]; then
    echo "[m6] turn=$seq literal — no assertion (downstream key-turn will gate)"
    continue
  fi

  if ! assert_turn "$key_seq" "$run_dir/turn-$seq.transcript.txt"; then
    pane_capture_safe "$session" "$run_dir/transcript.txt" 10
    echo "[m6] FAIL turn=$seq key_seq=$key_seq assertion miss — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

pane_capture "$session" "$run_dir/transcript.txt"

# Post-run: identify new session UUID + capture M6 end state.
post_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
new_uuid=""
for f in $post_transcripts; do
  if ! echo " $pre_transcripts " | grep -qF " $f "; then
    new_uuid="${f%.jsonl}"
    break
  fi
done

# Enumerate all new skills (the run may produce one or more).
new_skills_json="[]"
new_skills_list=()
for d in "$skills_dir"/*/; do
  [[ -d "$d" ]] || continue
  base="$(basename "$d")"
  if ! echo " $pre_skills " | grep -qF " $base "; then
    [[ -f "$d/SKILL.md" ]] && new_skills_list+=("$base")
  fi
done
if [[ ${#new_skills_list[@]} -gt 0 ]]; then
  new_skills_json="[$(printf '"%s",' "${new_skills_list[@]}" | sed 's/,$//')]"
fi

# Detect arc-retrospective save destinations (IMPROVEMENTS.md Fix 4,
# 2026-05-25; Fix 5, 2026-05-26). The note's destination is student-picked
# (ADR / observations/ memo / standalone file / home-keyed auto-memory),
# so we can't pin a single path. The old code walked a fixed dir-whitelist
# (.claude/memory, docs/adr, docs/adrs, root) at maxdepth 1 — it missed
# the 2026-05-25 lemmings docs/notes/ pick and reported []. Walk the
# whole worktree for .md files newer than the run-start marker, excluding
# known noise. Also walk $user_mem_dir — the picoshare 2026-05-26 run
# saved practice-arc-M1-M6.md to ~/.claude/projects/<encoded>/memory/
# (reasoning: cross-module retrospective is personal, doesn't fit the
# atomic-memo observations/ shape). False positives (e.g. an edited
# CLAUDE.local.md) are recoverable by a human; false negatives mean
# state.json lies.
arc_paths_list=()
while IFS= read -r path; do
  [[ -n "$path" ]] && arc_paths_list+=("$path")
done < <(find_recent_md "$sut_cwd" "$run_start_marker" "$user_mem_dir")
arc_paths_json="[]"
if [[ ${#arc_paths_list[@]} -gt 0 ]]; then
  arc_paths_json="[$(printf '"%s",' "${arc_paths_list[@]}" | sed 's/,$//')]"
fi

# CLAUDE.local.md mtime delta — observation only, not gating.
claude_local_mtime_now="$(mtime_of "$claude_local_md")"
claude_local_advanced="false"
[[ "$claude_local_mtime_now" -gt "$claude_local_mtime_baseline" ]] && claude_local_advanced="true"

ending_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
ending_branch="$(cd "$sut_cwd" && git rev-parse --abbrev-ref HEAD)"

state_file="$run_dir/m6-state.json"
cat > "$state_file" <<EOF
{
  "run_id": "$run_id",
  "m6_cwd": "$sut_cwd",
  "m6_starting_sha": "$baseline_sha",
  "m6_ending_sha": "$ending_sha",
  "m6_branch": "$ending_branch",
  "m6_session_uuid": "$new_uuid",
  "m6_transcript_path": "$transcripts_dir/$new_uuid.jsonl",
  "m6_new_skills": $new_skills_json,
  "m6_claude_local_md": "$claude_local_md",
  "m6_claude_local_md_mtime_advanced": $claude_local_advanced,
  "m6_arc_note_paths": $arc_paths_json,
  "task_slug": "$task_slug"
}
EOF

echo "[m6] PASS turns=$seq — out: $run_dir"
echo "[m6] state.json: $state_file"
cat "$state_file"

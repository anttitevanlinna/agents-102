# runner/ — tmux-driven Claude Code session runner

Drives a real Claude Code session in a tmux pane through a sequence of prompts and captures the transcript. The thing headless `claude -p` can't do: walk a multi-turn arc with the TTY surface intact (hooks, statusline, permission prompts).

## Shape

```
runner/
  run.sh                 # entry: walks a scenario, drives the pane
  install-sut.sh         # one-time: registers Stop hook in a SUT cwd
  hooks/
    stop-sentinel.sh     # writes turn-N.done after each Claude response
  lib/
    resolve-prompt.sh    # key -> body from agents-102/curriculum/prompts/
    tmux.sh              # send-keys / capture-pane / kill
    sync.sh              # wait_for_turn — block until sentinel appears
  scenarios/
    smoke.txt            # one prompt key per line
  out/<run-id>/          # transcript, per-turn captures, sentinels
```

## Design notes

- **Scenarios reference prompt keys, never copy prompt bodies.** Source of truth for prompts is `~/Projects/agents-102/curriculum/prompts/<key>.md`. Override the registry path with `PROMPT_REGISTRY`.
- **Sync via Stop-hook sentinel, not pane scraping.** Pane-output grepping is brittle (ANSI, statusline redraws, streaming). A Stop hook fires deterministically when Claude finishes a turn — we wait on a file, not a string.
- **One tmux session per run.** Pane 0 holds Claude. Detached, so the runner can drive multiple sessions in parallel later.

## First run

```bash
# 1. one-time: register the Stop hook in the SUT cwd
runner/install-sut.sh ~/Projects/lemmings

# 2. drive the smoke scenario
runner/run.sh runner/scenarios/smoke.txt --cwd ~/Projects/lemmings

# 3. inspect output
ls runner/out/<run-id>/
#   transcript.txt           full scrollback
#   turn-1.prompt.txt        what we sent
#   turn-1.transcript.txt    scrollback at turn end
#   sentinels/turn-1.done    sentinel that unblocked the runner
```

## Env knobs

- `PROMPT_REGISTRY` — path to prompts/ (default: `~/Projects/agents-102/curriculum/prompts`)
- `CLAUDE_CMD` — launch command (default: `claude`). Use `CLAUDE_CMD="claude --permission-mode auto"` for headless runs (the auto-mode classifier allows tool calls without prompts). **Do NOT use `--permission-mode bypassPermissions`** — it shows a "Yes/No, exit" confirmation dialog at startup that hangs the runner forever (no Stop hook fires for the dialog).
- `CLAUDE_RUNNER_TIMEOUT` — per-turn sentinel timeout in seconds (default: 3600s = 1h). M1 + M2 default to this because `CLAUDE_EFFORT=high` (M1's prework default) plus API retries can push a single TDD turn past 60min. For faster medium-effort runs, set `CLAUDE_EFFORT=medium` AND override to ~1500s.
- `CLAUDE_RUNNER_SLASH_SLEEP` — render-wait for slash-only turns (default: 3s).

## Per-turn artifact assertions

Sentinel completion proves a turn finished, not that the prompt's contract held. Each `run-mN.sh` carries an `assert_turn <seq>` case statement that names the contract for every turn (file exists / mtime advanced / git dirty / new commit / scrollback grep). FAIL on miss stops the run. Helpers live in `lib/assertions.sh`. Canonical rule: `check_platform_and_boundaries.md § 16a`.

## Prework runner — `run-prework.sh`

Drives the AE101 prework arc (download → extract + install → screen + ready) in a lemmings session. Unlike `run-m{1..4}`, prework writes **nothing to the repo** — its only durable writes land outside it (`~/Downloads/ae101-content.tar.gz`, `~/Documents/ae101-content/`, the three curated skills under `~/.claude/skills/`). That makes it re-runnable: the runner resets those out-of-repo writes before each run, so the scenario replays from a clean slate.

```bash
# one-time: register the Stop hook in the SUT
install-sut.sh ~/Projects/lemmings

# run (defaults to --cwd ~/Projects/lemmings)
run-prework.sh
```

What the runner does before each run:
- **Deletes the three installed personal skills** (`access-control-analysis`, `stride`, `security-tools`) — T2 re-installs them from the tarball, so the install itself is what's under test.
- **Clears** `~/Downloads/ae101-content.tar.gz` and `~/Documents/ae101-content/` so the download + extract are genuinely fresh.
- **Builds** the content tarball (`scripts/build-ae101-content-tarball.sh`) and **serves it on `127.0.0.1`**, rewriting the prompt's `<CONTENT_URL>` placeholder to that local URL — the harness standing in for `build-workbook.js`'s deploy-time substitution. Set `PREWORK_CONTENT_URL` to point at a real cohort URL instead (skips the local build + server).

End-of-run gate: the repo's **tracked-file state must be unchanged** vs. the pre-launch baseline. That's the assertion behind "re-runnable" — if prework wrote into the repo, the gate fails. New untracked paths (e.g. `node_modules/` from a test-readiness check) are a soft WARN, not a failure.

Env knobs: `CLAUDE_CMD` (defaults to `claude --permission-mode auto` here — prework is install-heavy and has no human to approve curl/tar/cp), `PREWORK_HTTP_PORT` (default `8099`), `PREWORK_CONTENT_URL`, plus the shared `CLAUDE_RUNNER_*` knobs.

Scoped out: `ae101-prework-one-at-a-time` mandates the `AskUserQuestion` tool, which hangs the headless runner. The screen-and-ready turn carries the lazy-student guard tail with three candidate bugs inline instead.

## Save-gate scenarios

Some prompts end with implicit approval gates: *"Show me the diff before you commit"* (M1 `fix-tests-first-3`), *"Don't touch the plan file until I say 'lock it in.'"* (M2 `push-back-on-the-plan-2`), *"Want me to make X or hold for your read?"* (M3 `threat-model-with-stride-3`, M4 `walk-and-send-off-3`). Without a literal-text approval line on the next scenario line, the artifact silently drops and the next prompt rolls forward without the prior turn's contract met. Convention: `* yep just save it` or `* lock it in` on the next scenario line.

## Slash-command turns

Pure slash commands (`/context`, `/clear`, `/memory`) render client-side — no LLM call, no Stop hook, no sentinel. The runner's `is_slash_only` helper (in `lib/sync.sh`) detects this shape and bridges with `fake_sentinel_after_render` (sleep + touch). Slash commands with arguments (`/security-audit — load the skill`) DO fire the model and the Stop hook; they don't need special handling.

## AskUserQuestion guards

Prompts that interview the student (any `AskUserQuestion` tool call) hang the headless runner forever — the UI waits for an arrow-key + Enter that never come. Convention: every such prompt scenario line carries a lazy-student tail that says *"I'm doing a headless dry-run, please don't call AskUserQuestion — use your judgment"* plus the answers Claude would have asked for, inline. Examples: M2 `push-back-on-the-plan-1/2`, M2 `extract-the-task-shaping-rule-1/2`, M3 `author-test-strategy-skill-1`, M4 `walk-and-send-off-3`.

## v0 limits — known and deliberate

- One pane, one SUT for single-session runners (`run.sh`, `run-prework.sh`, `run-m1.sh`, `run-m2.sh`, `run-m4.sh`). `run-m3.sh` orchestrates two parallel sessions for the worktree fork.
- Hook is per-cwd. `install-sut.sh` writes to `.claude/settings.local.json` (gitignored by default in Claude Code projects).

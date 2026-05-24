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
- `CLAUDE_RUNNER_TIMEOUT` — per-turn sentinel timeout in seconds (default: 600 for v0; 900 in run-m2.sh).
- `CLAUDE_RUNNER_SLASH_SLEEP` — render-wait for slash-only turns (default: 3s).

## Per-turn artifact assertions

Sentinel completion proves a turn finished, not that the prompt's contract held. Each `run-mN.sh` carries an `assert_turn <seq>` case statement that names the contract for every turn (file exists / mtime advanced / git dirty / new commit / scrollback grep). FAIL on miss stops the run. Helpers live in `lib/assertions.sh`. Canonical rule: `check_platform_and_boundaries.md § 16a`.

## Save-gate scenarios

Some prompts end with implicit approval gates: *"Show me the diff before you commit"* (M1 `fix-tests-first-3`), *"Don't touch the plan file until I say 'lock it in.'"* (M2 `push-back-on-the-plan-2`), *"Want me to make X or hold for your read?"* (M3 `threat-model-with-stride-3`, M4 `walk-and-send-off-3`). Without a literal-text approval line on the next scenario line, the artifact silently drops and the next prompt rolls forward without the prior turn's contract met. Convention: `* yep just save it` or `* lock it in` on the next scenario line.

## Slash-command turns

Pure slash commands (`/context`, `/clear`, `/memory`) render client-side — no LLM call, no Stop hook, no sentinel. The runner's `is_slash_only` helper (in `lib/sync.sh`) detects this shape and bridges with `fake_sentinel_after_render` (sleep + touch). Slash commands with arguments (`/security-audit — load the skill`) DO fire the model and the Stop hook; they don't need special handling.

## AskUserQuestion guards

Prompts that interview the student (any `AskUserQuestion` tool call) hang the headless runner forever — the UI waits for an arrow-key + Enter that never come. Convention: every such prompt scenario line carries a lazy-student tail that says *"I'm doing a headless dry-run, please don't call AskUserQuestion — use your judgment"* plus the answers Claude would have asked for, inline. Examples: M2 `push-back-on-the-plan-1/2`, M2 `extract-the-task-shaping-rule-1/2`, M3 `author-test-strategy-skill-1`, M4 `walk-and-send-off-3`.

## v0 limits — known and deliberate

- One pane, one SUT for single-session runners (`run.sh`, `run-m1.sh`, `run-m2.sh`, `run-m4.sh`). `run-m3.sh` orchestrates two parallel sessions for the worktree fork.
- Hook is per-cwd. `install-sut.sh` writes to `.claude/settings.local.json` (gitignored by default in Claude Code projects).

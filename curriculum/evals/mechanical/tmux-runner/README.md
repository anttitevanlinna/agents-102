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
- `CLAUDE_CMD` — launch command (default: `claude`). Override to pass flags, e.g. `CLAUDE_CMD="claude --permission-mode bypassPermissions"` for non-interactive runs.

## v0 limits — known and deliberate

- One pane, one SUT. Parallel scenarios = future.
- No expectations / assertions yet. v0 captures transcripts; you eyeball them. Assertion layer is the next ratchet.
- Permission prompts will hang the runner unless the launch command bypasses them or the tools are pre-allowlisted in the SUT's `.claude/settings.json`.
- Hook is per-cwd. `install-sut.sh` writes to `.claude/settings.local.json` (gitignored by default in Claude Code projects).

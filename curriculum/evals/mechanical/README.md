# mechanical/

The actor/judge "mechanical" runner (subagent Actor + Judge on Haiku, `bin/judge*.sh` + `runners/`) was **removed 2026-06-01**. It ran in a sandboxed subagent that substituted away the platform surface (slash commands, MCP, plan mode, `gh`, nested skills) and graded prompt *shape*, not whether commands ran — so it was structurally blind to the failures the live runner catches. Superseded by `tmux-runner/`.

**Mechanical is no longer a recorded Quality rung.** It's a pre-ship system test: run `tmux-runner/`, fix what it finds, ship. No `- mechanical` stamp in artifacts; no `mechanical-tested` ladder rung. Ladder is `compendium-audited → sim-passed`.

What lives here now:

- **`tmux-runner/`** — the live system test. Drives a real Claude Code session per module against a real SUT. Self-contained; see its own `README.md` + `lemmings-chain-runbook.md`.
- **`bin/prompt-source-audit.sh`** — static curriculum-source linter (P-checks on fenced prompts, E-checks on bodies). Live; part of the done-done static gate. Run from repo root: `prompt-source-audit.sh <exercise-slug>`.
- **`parse-prompts.sh`** — extracts fenced prompts to `/tmp/prompts/<slug>/` for the linter's P-checks. Run before `prompt-source-audit.sh`.
- **`playgrounds/`** — SUT planted-state maintainer docs (`codesearch.maintainer.md`, `picoshare.maintainer.md` are tmux-runner assets) + legacy actor/judge seeds pending cleanup.

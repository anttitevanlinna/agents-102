# Copilot command contract with a Codex backend

`scripts/copilot-via-codex.js` exercises the GitHub Copilot command paths used by the Agents 102 generation system without requiring a Copilot license. The caller supplies Copilot-shaped commands. The adapter runs the work through Codex and keeps the canonical instructions, workflow body, judge prompts, schemas, and generated artifacts unchanged.

This is compatibility evidence. It is not a Copilot emulator and must not be reported as a licensed Copilot pass.

For a runner that expects the executable name `copilot`, prepend the scoped wrapper to that runner's `PATH`:

```sh
PATH="$PWD/scripts/copilot-via-codex-bin:$PATH" copilot --version
```

Do not install or expose the wrapper globally. A real Copilot installation must remain unambiguous when licensed acceptance testing begins.

## Supported commands

Prompt mode accepts:

```sh
COPILOT_HOME=/path/to/isolated/state \
AGENTS_CORE_DIR=/path/to/agents-102-core \
  ./scripts/copilot-via-codex.js \
  --experimental \
  --add-dir /path/to/agents-102-core \
  --session-id generation-session \
  --no-ask-user \
  -p "Inspect the queue and report what is owed."
```

The first turn stores the Codex thread ID under `$COPILOT_HOME/copilot-via-codex/sessions.json`. A later command with the same Copilot session ID resumes that Codex thread. The working directory is part of the mapping; the adapter refuses to resume the ID from another directory.

Workflow mode accepts the Copilot command shape used by the project extension:

```sh
COPILOT_HOME=/path/to/isolated/state \
AGENTS_CORE_DIR=/path/to/agents-102-core \
COPILOT_CODEX_TRACE_DIR=/path/to/run-traces \
  ./scripts/copilot-via-codex.js \
  --experimental \
  --add-dir /path/to/agents-102-core \
  workflow run eval-sweep \
  --args @eval-sweep-input.json \
  --silent --output-format json
```

`eval-sweep` still comes from `.claude/workflows/eval-sweep.js`. The existing Copilot adapter supplies the runtime-neutral workflow arguments. Its `agent`, `parallel`, `pipeline`, `phase`, and `log` operations are backed by isolated `codex exec` calls. Structured judge responses use the workflow's existing JSON Schemas through Codex `--output-schema`.

## Hook behavior

Before a prompt-mode Codex turn, the adapter executes the repository hook paths that affect the prompt contract:

- Claude-compatible `SessionStart` on the first mapped turn;
- Claude-compatible `UserPromptSubmit` for side effects, including `prompt-ok` recording;
- Copilot `userPromptTransformed` for model-facing surface-rule context.

The adapter does not claim to reproduce Copilot's `preToolUse`, `postToolUse`, permission, subagent, notification, or stop lifecycle. In particular, a wrapper cannot deny a Codex tool call after Codex has selected it. Repository scripts, schemas, the prompt-card pre-commit gate, and end-state assertions still run normally, but they are not a substitute for a native permission-hook test.

## Permissions and isolation

The default backend uses Codex automatic approval review in its workspace-write sandbox. `--allow-all` and `--yolo` map to Codex's explicit approval-and-sandbox bypass and belong only in a disposable worktree. Copilot `--allow-tool` and `--allow-url` values are accepted so the production command can be reused, but they do not widen the Codex sandbox.

Personal Codex configuration is ignored by default. Set `COPILOT_CODEX_USE_USER_CONFIG=1` only when the test deliberately includes it. Set `CODEX_BIN` to pin the executable under test. Use a fresh `COPILOT_HOME` for each scenario so another run cannot supply a session mapping.

`--output-format json` in prompt mode returns the raw Codex JSONL trace. This makes command execution, token use, and the backend thread auditable, but it is not Copilot's native event schema. Workflow mode returns the canonical workflow result as JSON.

## Evidence levels

| Result | What it establishes |
|---|---|
| Adapter unit pass | Argument translation, session mapping, hook routing, schema handoff, and fail-closed unsupported flags |
| Codex-backed generation pass | Prompt-chain suitability, artifact contracts, canonical workflow execution, persistence, and deterministic gates under Codex |
| Licensed Copilot smoke | Native instruction and extension discovery, permission hooks, Copilot event payloads, and model behavior |

Keep all three labels in reports. A Codex-backed generation pass reduces the licensed smoke to the platform boundary; it does not erase that boundary.

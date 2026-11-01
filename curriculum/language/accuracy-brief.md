# Accuracy brief: how agents work in Agents 101

Prompt input for `scripts/accuracy-pass.js`. Sources: `check_platform_and_boundaries.md` §6, §6d, §7, §7b; `check_student_facing.md` §4, §13, §21, §21b; `trainings/agents-101/training-architecture.md` § Platform; maintainer's calls-page steers 2026-11-01.

## Runtime contract
- Agents 101 runs on Claude Code (CLI + Desktop), Cowork, Codex and GitHub Copilot. Never a plain chat surface. Runtime-specific mechanics sit behind runtime spans, so body prose stays runtime-neutral.
- The root instructions file is `CLAUDE.md` under Claude and `AGENTS.md` under Codex/Copilot. Body prose says "root instructions file" unless it is inside a runtime span.
- Local training directory only; cloud/remote features are out of scope.

## How the machine works (facts)
- An LLM generates the next response from everything in its context window. Each turn it reads the whole conversation so far. Nothing is "looked up" unless a tool fetches it.
- Context = what is in the window for this session; it dies at session close. Memory = files on disk the agent reads again next session (the memory folder, the root instructions file, rules files). "Memory compounds, context feeds it." Never "your context compounds".
- The agent = the LLM plus a harness that runs tools: reading and writing files, running commands, searching, calling connectors (MCP). A tool call is text the model emits; the harness turns it into an action.
- The root instructions file loads automatically at session start. Other files load only when the agent reads them (because a prompt or the instructions file names them). A custom agent taught in Agents 101 is a plain markdown file of instructions that a session reads; that is not the same as Claude Code's subagent definitions in `.claude/agents/`.
- Skills = folders with a SKILL.md the agent loads by name when the work matches.
- Subagents / helper agents run in their own context and return a result to the lead session; they run in parallel with each other. They do not see the lead session's conversation. Separate sessions coordinate only through files on disk.
- Scheduling: Routines (local, fires only while the app is open and the machine awake) or `/loop` inside a session.
- A session is one sitting on one task. "Start a new session in X", not "open Claude Code in X". Sessions in different working directories cannot resume each other; evidence travels by disk.
- Output is non-deterministic: same prompt, same files, different session, different answer.
- The agent cannot "prove" things and neither can classical software testing; checks reduce risk.

## Vocabulary
- "the agent" when it acts (writes files, runs tools, does multi-step work); "the LLM" when the topic is thinking, drift, framing; "Claude" for the product or as the addressee of a plain ask.
- "session" for the sitting, "task" for the work item; no noun "run" for a session.
- No invented concepts: "agent file", "the wall", "shape" for an option. The student steers the agent with context; the student's job is not "writing things down for the agent".
- Name the actor instead of a referent-less "it".

## What counts as an error
A sentence that states or implies something false about the above: wrong mechanism, wrong word for a primitive, an invented primitive, context and memory swapped, a claim the agent "knows" or "remembers" something it has not read, a runtime-specific claim in neutral body prose, a referent so unclear the mechanism is ambiguous. Style alone is not an error.

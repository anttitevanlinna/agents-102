# The agent loop

An **agent** is an LLM that runs in a loop, calling tools to take action. Each iteration: the LLM receives context (system prompt, conversation, tool results), decides on the next step, either responds to you or calls a tool. The **agent harness** is the surrounding code that runs the loop, exposes tool definitions to the LLM, executes the tool calls, feeds results back in. Claude Code is one harness; Cursor, Cline, Gemini CLI are others. The **agent loop** is that iteration itself: prompt → reason → tool call → result → reason again, until the agent decides to stop.

Three prompts to make the loop concrete in your current session.

{{prompt:ae101-agent-loop-ascii}}

{{prompt:ae101-agent-loop-tools-list}}

{{prompt:ae101-agent-loop-tool-injection}}

> Feel free to dive deeper on any aspect.

<!-- maintainer -->

**Quality:** draft 2026-05-14

**Meta:** *Mini-supplementary for AE101. Referenced from `compound-and-close.md`'s timebox callout. Audience: senior engineers who want to look under the hood while the room finishes the MCP install. ~5 minutes.*

**Role:** answers the foundational *what's an agent / harness / loop* question AE101 otherwise leaves implicit. Senior-engineer audience; assumed-known is the default. This is the looking-under-the-hood opt-in for the engineer who wants the mechanism, not just the use.

**Placement:** referenced from `compound-and-close.md` timebox callout. Optional read while the room finishes the MCP-connector install. Can be re-read post-cohort as reference.

**Voice:** Boris-flat technical (mechanism description, not framing).

**Watch-fors (delivery):**
- Don't fold this into the main M1 flow — it's an opt-in. Pulling it into the room's required reading creates a why-is-the-trainer-explaining-agents-to-senior-engineers moment that the AE101 register avoids.
- The three prompts demonstrate the loop on the student's live session; that's the teaching move. The paragraph is scaffolding for the prompts, not the lesson.

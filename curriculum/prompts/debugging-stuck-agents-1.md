---
key: debugging-stuck-agents-1
dest: Claude Code
runtime: any
origin: lectures/debugging-stuck-agents
---
Find the root cause of this bug.

Read the relevant files and the recent session context. Tell me whether the failure is mainly:
1. a source problem: missing, stale, contradictory, or unread evidence
2. a processing problem: wrong prompt, wrong role, bad handoff, vague output shape, or synthesis that averaged away disagreement
3. a boundary problem: the agent tried to use data, tools, or authority it should not have had

Do not fix anything yet. Show me the failure chain in 5 bullets: what happened, where it started, where it became visible, what file or prompt caused it, and the smallest fix that would prevent the next run.

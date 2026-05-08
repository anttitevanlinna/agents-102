---
key: diagnose-and-resend-6
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
---
Build me two task-scoped artefacts for re-running the un-packaged task packaged.

First, the reference artefact. A task-local file (not my codebase rules — those already exist). Should hold:
- The task scope and success criteria, in two or three sentences
- Pointers to the memory pages, ADRs, skills, and connectors most relevant to THIS task
- The constraints the verifier we just built will enforce (the verifier owns execution checks; the reference names WHAT good looks like, not how it's measured)
- **The tests that name the bar** — scoped to this task's core paths, named before any code lands. Tests are a first-class part of the task spec for anything load-bearing; throwaway experiments can skip. Where a core requirement resists being named as a test, flag it as a question, not a rule.
- A "done means" line — what the agent should produce that signals task completion (tests green + requirements met)

Second, plan.md. A working document the agent owns and mutates as it runs. Should start with:
- The task broken into 3–7 phases the agent can re-anchor against
- **Tests-first phase** — the first phase writes or updates the tests from the reference spec. Code phases come after. The plan makes this ordering explicit.
- A "current phase" line the agent updates as it progresses
- A "decisions log" section the agent appends to when it makes a load-bearing choice
- A "what I tried that didn't work" section to prevent context-rot re-derivations

Propose the file paths (next to each other; same task-scoped folder). Show me both files before you save. I'll push back, then we save.

Before you save, grill me on missing details that can ruin the smooth run.

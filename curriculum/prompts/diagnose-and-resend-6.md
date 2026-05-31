---
key: diagnose-and-resend-6
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: validation-mapping
    source: prompt:diagnose-and-resend-3
  - id: verifier
    source: prompt:diagnose-and-resend-4
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-completed
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
  - id: memory-folder
    source: prompt:walk-and-send-off-3
    conditional: m4-completed
produces:
  - id: reference-artefact
    location: task-local file at worktree (path Claude proposes)
    consumed-by:
      - prompt:ae101-m5-rerun-packaged
      - prompt:spot-gaps-build-the-loop-1
  - id: plan-md
    location: plan.md (at worktree root, next to reference)
    consumed-by:
      - prompt:ae101-m5-rerun-packaged
      - prompt:spot-gaps-build-the-loop-1
---
Build me two task-scoped artefacts for re-running the un-packaged task packaged.

First, the reference artefact. A task-local file (not my codebase rules — those already exist). Should hold:
- The task scope and success criteria, in two or three sentences
- Pointers to the memory pages, any ADRs, any authored skills, and connectors most relevant to THIS task
- The constraints the verifier we just built will enforce (the verifier owns execution checks; the reference names WHAT good looks like, not how it's measured)
- The tests that name the bar: scoped to this task's core paths, named before any code lands. Tests are a first-class part of the task spec for anything load-bearing; throwaway experiments can skip. Where a core requirement resists being named as a test, flag it as a question, not a rule.
- A "done means" line — what the agent should produce that signals task completion (tests green + requirements met)

Second, plan.md. A working document the agent owns and mutates as it runs. Should start with:
- The task broken into 3–7 phases the agent can re-anchor against
- Tests-first phase: the first phase writes or updates the tests from the reference spec. Code phases come after. The plan makes this ordering explicit.
- A "current phase" line the agent updates as it progresses
- A "decisions log" section the agent appends to when it makes a load-bearing choice
- A "what I tried that didn't work" section to prevent context-rot re-derivations

Propose the file paths (next to each other; same task-scoped folder). Show me both files in prose.

Don't touch either file until I say 'lock it in.' When you do edit either file, use Edit on the changed section, not Write on the whole file.

Before lock-in, grill me on missing details that could ruin the smooth run. Ask three questions at a time. For each, recommend an answer.

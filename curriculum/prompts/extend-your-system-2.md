---
key: extend-your-system-2
dest: Builder Claude
runtime: any
origin: exercises/extend-your-system
requires:
  - id: m7-handover
    source: prompt:personal-to-team-handover
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: m8-improved-agent
    location: module-8/improved-agent.md
---
Read `module-7/handover.md` and the agent in `agents/` it names. Save the current version beside it as `<name>.v1.md`. Fix the line the handover quotes as assuming my own memory or files, and anything else the handover shows broke. Run the old and the new version once on the same input from my system. Score both outputs with `judges/groundedness-judge.md`; do not change the judge.

Write `module-8/improved-agent.md`:
- The two scores, old and new.
- Each line you changed, before and after.
- `## Rule for the room`: one line any agent in this room could follow, learned from this fix.

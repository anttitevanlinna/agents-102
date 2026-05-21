---
key: spot-gaps-build-the-loop-3
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: two-run-gap-map
    source: prompt:spot-gaps-build-the-loop-1
  - id: primitive-menu
    source: prompt:spot-gaps-build-the-loop-primitives
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
    note: referenced as authoring-pattern template
produces:
  - id: session-shaper-skill-draft
    location: ~/.claude/skills/<student-named>/SKILL.md (personal, auto-discovered)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-4
      - prompt:spot-gaps-build-the-loop-5
---
Author a session-shaper as a personal skill. The skill's job is to shape future sessions on this kind of task so the dominant gap I diagnosed in Phase 1 doesn't recur. Shape: one of sharpened-verifier, LLM-judge, or gap-finder — I'll tell you which after you ask. Same authoring approach as the test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`.

Interview me one question at a time. Cover: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in terms I can defend to a teammate, what to flag vs. what to let through, how it outputs (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.

Push back when my answer is generic. A judge that says "check if the output is good" is useless; a verifier that duplicates the existing test suite is noise. Codebase-specific and failure-specific.

When you have enough, propose a skill name. Write `~/.claude/skills/<proposed-name>/SKILL.md`: frontmatter (name + description), then instructions. Show me before saving.

---
key: joint-double-diamond-5
dest: Builder Claude
runtime: any
origin: exercises/joint-double-diamond
requires:
  - id: m8-stance
    source: prompt:joint-double-diamond-3
  - id: m8-cross-check
    source: prompt:joint-double-diamond-4
produces:
  - id: m8-proposals
    location: shared-folder/<participant>/proposal.md
---
Read `stance.md` and `cross-check.md` from the exact participant subfolder where you wrote `context-manifest.md`. Then write my proposal for the shared surface.

Write `proposal.md` in that same subfolder:
- Crux, one sentence.
- Guiding policy, one sentence.
- Two experiments, each with owner, two-week test, success signal.
- What I changed after cross-checking with other agents.
- What I refused to change, and why.
- One unresolved disagreement the synthesizer must preserve.

Cite every claim against a source file, stance, or cross-check.

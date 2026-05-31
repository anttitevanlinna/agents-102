---
key: spot-gaps-build-the-loop-5
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: session-shaper-skill-draft
    source: prompt:spot-gaps-build-the-loop-3
  - id: skill-self-critique
    source: prompt:spot-gaps-build-the-loop-4
  - id: packaged-run-artefact
    source: prompt:ae101-m5-rerun-packaged
produces:
  - id: second-authored-skill
    location: ~/.claude/skills/session-shaper/SKILL.md (sharpened after invocation on real artefacts)
    consumed-by:
      - prompt:arc-retrospective-1
anchors:
  - move: skill-by-name
    span: "by its name"
  - move: self-critique-register
    span: "in the same response, answer: is the skill any good?"
  - move: disambiguation-criteria
    span: "Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?"
---
Invoke the `session-shaper` skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.

Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).

Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?

Don't reassure me about the skill. If it isn't earning its place, say so.

---
key: threat-model-with-stride-1
dest: Claude Code
runtime: any
origin: exercises/threat-model-with-stride
requires:
  - id: access-surface-map
    source: prompt:map-the-access-surface-5
  - id: stride-skill
    source: external (curated skill installed at prework)
produces:
  - id: stride-threat-list
    location: next to the surface map (file) + scrollback (high-severity flags)
    consumed-by:
      - prompt:threat-model-with-stride-2
---
Invoke the stride skill on the access-surface map from the previous exercise (path is earlier in this scrollback). Run it in a subagent so the six-category output doesn't flood this thread. Save the threat list next to the surface map. Flag the high-severity ones for this feature. Don't pick yet — I'll decide next. Report whether or not the skill loaded in the subagent.

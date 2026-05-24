---
key: threat-model-with-stride-1
dest: Claude Code
runtime: any
origin: exercises/threat-model-with-stride
requires:
  - id: access-surface-map
    source: prompt:map-the-access-surface-5
  - id: security-tools-skill
    source: external (curated skill installed at prework)
  - id: stride-skill
    source: external (curated skill installed at prework)
produces:
  - id: stride-threat-list
    location: next to the surface map (file) + scrollback (high-severity flags)
    consumed-by:
      - prompt:threat-model-with-stride-2
---
Run the security-tools skill first as a quick pre-flight to verify the local environment is ready for the threat-model pass. Then invoke the stride skill on the access-surface map from the previous exercise (path is earlier in this scrollback). Run stride in a subagent so the six-category output doesn't flood this thread. Save the threat list next to the surface map. Flag the high-severity ones for this feature. Don't pick yet — I'll decide next. Report whether or not the stride skill loaded in the subagent.

Find the access-surface map's path in this scrollback before dispatching. When the subagent returns, tell me which file it used and confirm the stride pass ran on that file.

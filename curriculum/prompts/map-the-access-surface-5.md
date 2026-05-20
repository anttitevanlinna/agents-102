---
key: map-the-access-surface-5
dest: Claude Code
runtime: any
origin: exercises/map-the-access-surface
requires:
  - id: access-surface-map
    source: prompt:map-the-access-surface-4
produces:
  - id: access-surface-map
    location: temp directory (in-place update)
    consumed-by:
      - prompt:threat-model-with-stride-1
      - prompt:ae101-m3-sharpen-skill
---
Add a new surface to the map that the skill didn't catch but matters in this codebase. One sentence on what it is, one sentence on why the skill missed it (likely codebase-specific: framework, deployment model, team convention). Show me the diff.

The surface the skill missed that I know matters is:

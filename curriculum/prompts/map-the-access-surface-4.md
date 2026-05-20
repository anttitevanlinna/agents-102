---
key: map-the-access-surface-4
dest: Claude Code
runtime: any
origin: exercises/map-the-access-surface
requires:
  - id: access-surface-map
    source: prompt:map-the-access-surface-2
produces:
  - id: access-surface-map
    location: temp directory (in-place update)
    consumed-by:
      - prompt:map-the-access-surface-5
      - prompt:threat-model-with-stride-1
---
Update the surface-map file in the temp directory to integrate the delta below — pull the item to the top of its category and explain in one line why this codebase's deployment model elevates it. Show me the diff.

The surface the skill called out harder than I would have:

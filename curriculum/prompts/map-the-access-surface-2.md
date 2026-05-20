---
key: map-the-access-surface-2
dest: Claude Code
runtime: any
origin: exercises/map-the-access-surface
requires:
  - id: feature-being-shipped
    source: scrollback (student input at M3 Connections)
  - id: access-control-analysis-skill
    source: external (curated skill installed at prework)
produces:
  - id: access-surface-map
    location: temp directory (path Claude reports)
    consumed-by:
      - prompt:map-the-access-surface-3
      - prompt:map-the-access-surface-4
      - prompt:map-the-access-surface-5
      - prompt:threat-model-with-stride-1
      - prompt:ae101-m3-sharpen-skill
---
Invoke the access-control-analysis skill on the feature I'll name. Save the surface map to a temp directory and tell me the path. Use the skill's default output shape; don't prompt me to customize.

The feature is:

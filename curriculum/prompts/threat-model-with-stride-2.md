---
key: threat-model-with-stride-2
dest: Claude Code
runtime: any
origin: exercises/threat-model-with-stride
requires:
  - id: stride-threat-list
    source: prompt:threat-model-with-stride-1
produces:
  - id: picked-threat-and-hardening
    location: scrollback (student picks one threat + hardening shape)
    consumed-by:
      - prompt:threat-model-with-stride-3
---
Walk me through picking the load-bearing STRIDE category for this feature. Start by proposing the most plausible incident story (one or two sentences, from the access surface and threat list), then map that story to the STRIDE class it best fits (S/T/R/I/D/E), name what the threat actually is in one sentence, and propose the hardening shape (scope/split/filter/gate/review). I'll steer if the story or mapping misses.

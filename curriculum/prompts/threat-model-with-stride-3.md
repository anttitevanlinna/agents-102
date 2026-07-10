---
key: threat-model-with-stride-3
dest: Claude Code
runtime: any
origin: exercises/threat-model-with-stride
requires:
  - id: picked-threat-and-hardening
    source: prompt:threat-model-with-stride-2
produces:
  - id: stride-adr
    location: docs/adr/NNNN-slug.md (or repo's adr convention)
    conditional: m3-stride-completed
    consumed-by:
      - prompt:threat-model-with-stride-4
      - prompt:author-test-strategy-skill-1
      - prompt:author-test-strategy-skill-2
      - prompt:ae101-m3-sharpen-skill
      - prompt:walk-and-send-off-2
      - prompt:diagnose-and-resend-6
      - prompt:ae101-m5-rerun-packaged
      - module:run-the-first-experiment
      - module:learn-from-the-test
      - module:spot-gaps-build-the-loop
---
Write an ADR for the hardening decision we just made. Use my repo's ADR convention: check for an existing docs/adr/ folder or whatever the repo uses; if there isn't one, use docs/adr/NNNN-slug.md with a minimal template (Context / Decision / Consequences / Alternatives considered).

Ground each section in what we discussed: the plausible incident story is the Context; the threat we picked and the hardening we chose is the Decision; the Consequences section names what this costs (latency, complexity, operational burden) and what it protects; Alternatives considered names the 2–3 options we didn't pick and one line on why.

Save the ADR to that path, then show me the diff.

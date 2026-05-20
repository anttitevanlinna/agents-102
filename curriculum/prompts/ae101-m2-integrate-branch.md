---
key: ae101-m2-integrate-branch
dest: Claude Code
context: only if something earned itself
runtime: any
origin: agentic-engineering-101/plan-mode-done-right
requires:
  - id: design-pattern-named
    source: prompt:push-back-on-the-plan-3
produces:
  - id: plan-shaping-rule
    location: ./CLAUDE.local.md (create + gitignore if missing)
    conditional: branch-earned-itself
    consumed-by:
      - module:earn-the-trust
      - module:run-the-first-experiment
      - module:learn-from-the-test
      - module:spot-gaps-build-the-loop
---
If one branch from this session sharpened how plans get made in this codebase, write the rule into ./CLAUDE.local.md (create + gitignore if missing; personal file, not team ./CLAUDE.md). The file gets the rule alone — one paragraph naming what Claude should do when making the next plan, no narrative, no session quotes, no multi-section headers.

In chat, show me which branch you picked, the moment that earned it, and why. Flag if it's team-worthy so I can open a separate PR against ./CLAUDE.md later.

If nothing earned itself, say so and stop.

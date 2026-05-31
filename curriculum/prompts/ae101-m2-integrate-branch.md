---
key: ae101-m2-integrate-branch
dest: Claude Code
context: only if something earned itself
runtime: any
origin: agentic-engineering-101/plan-mode-done-right
note: |
  Deliberate imprecision — do NOT tighten. "The file gets the rule alone" is
  plausible-but-loaded on purpose: the M2 exercise (plan-mode-done-right.md — the
  callout right below this marker + Key Concept "precise prompting is harder than it
  looks") wants the student to read it, watch the diff, and catch that "alone" could
  overwrite ./CLAUDE.local.md and nuke M1's rules + the five task-shape rules.
  Rewording to "add at the end / leave existing untouched" removes the lesson.
  Headless-autonomous data-loss (no human at the diff) is a harness concern
  (tmux-runner/IMPROVEMENTS.md), not a curriculum fix.
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

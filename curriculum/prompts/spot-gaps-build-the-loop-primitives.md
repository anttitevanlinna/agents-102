---
key: spot-gaps-build-the-loop-primitives
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: two-run-gap-map
    source: prompt:spot-gaps-build-the-loop-1
  - id: recurring-shape-diagrams
    source: prompt:spot-gaps-build-the-loop-shapes
produces:
  - id: primitive-menu
    location: scrollback (5-10 atomic verification primitives with one-line check-description and fire-timing per primitive, plus 2-3 ranked by fit against dominant gap)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-3
---
I'm about to author a skill that wraps a checking primitive against my dominant gap. Before I commit to a shape, expand my menu.

List 5–10 atomic verification primitives a software engineer uses to check agentic work (test-writing, browser-testing, PR-building, lint-gates, ...) — the moves themselves, not the agent context. For each, name in one line what it checks and where it fires (pre-run / mid-run / post-run / continuous).

Then evaluate fit for the dominant gap I named in Phase 1. Which 2–3 primitives would most likely have caught it? Don't recommend a skill shape yet; recommend the primitives.

Be concrete. Generic "tests" doesn't make the cut; "unit test against the changed function" does.

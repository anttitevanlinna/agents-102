# M6 defect sweep — 2026-08-12

Scope: student-facing body only (above `<!-- maintainer -->`), per the M4 defect catalogue (11 classes). Files audited: the M6 module file, its exercise, and all seven M6 lectures.

Total hits: **8** across 2 files. 7 files clean.

---

## curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md (module) — 1 hit

1. **`spot-gaps-build-the-loop.md:62`** · catalogue **#9 Orphan slide**
   > "One move is left, and it runs past the edge of this room."

   A lone paragraph sitting between two include links — `[The map, filled in](...)` above it, `[Agents that build agents](...)` below it. The Slides renderer turns this into its own near-empty slide. It's also redundant: the next lecture's own opening line ("The map you just drew ended on a dashed loop, yours to draw solid. This is the move that draws it.") already carries the transition.
   **Proposed:** cut. The linked lecture's own opener supplies the hand-off; nothing is lost.

---

## curriculum/exercises/spot-gaps-build-the-loop.md — 7 hits

Ranked by severity.

1. **`spot-gaps-build-the-loop.md:87`** · catalogue **#10 Body prose answering the prompt below it**
   > "Expect the list to look familiar: test-writing, browser-testing, PR-building, lint and typecheck gates, compile and build, smoke-test on a real path, code-review, git-diff inspection, schema validation, eval suites for agent outputs. Your list won't be exact. The recognition is the point. The primitives Claude names are the ones your codebase already runs."

   Sits directly after `{{prompt:spot-gaps-build-the-loop-primitives}}` and pre-lists ten specific items the prompt is supposed to surface — a recap slide that answers the prompt in advance of the student reading Claude's actual output.
   **Proposed:** cut the itemized list; keep only "Your list won't be exact. The recognition is the point." — the recognition claim survives without pre-stocking the answer.

2. **`spot-gaps-build-the-loop.md:25`** · catalogue **#11 Over-long prompt lead-in** (25 words)
   > "Ask Claude to read both sessions side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced."

   **Proposed:** "Ask Claude to compare both sessions and name what packaging missed." (11 words) — the fuller ask lives in the prompt body.

3. **`spot-gaps-build-the-loop.md:40`** · catalogue **#11 Over-long prompt lead-in** (20 words)
   > "Ask Claude to cut one rule the two-session diagnosis killed, or to say so and stop if all rules held."

   **Proposed:** "Ask Claude to cut one stale rule the diagnosis killed." (10 words) — the "or say so and stop" branch is already covered by the prompt itself.

4. **`spot-gaps-build-the-loop.md:83`** · catalogue **#11 Over-long prompt lead-in** (19 words)
   > "Ask Claude to name the checking primitives the field already runs and rank the ones that fit your gap."

   **Proposed:** "Ask Claude to name checking primitives that fit your gap." (10 words)

5. **`spot-gaps-build-the-loop.md:62`** · catalogue **#11 Over-long prompt lead-in** (17 words)
   > "Ask Claude to scan your sessions across every project and group the kinds of work that recur."

   **Proposed:** "Ask Claude to scan your sessions for recurring work." (9 words)

6. **`spot-gaps-build-the-loop.md:75`** · catalogue **#5 Speech verb with no addressee**
   > "Want to see the shapes, not read them? Mermaid comes back as text. Say *give me this in HTML* to open them in a browser."

   "Say" names no addressee; a reader could read this as talking to the room or to themselves rather than to Claude.
   **Proposed:** "Ask Claude for this in HTML to open them in a browser."

7. **`spot-gaps-build-the-loop.md` — Session widget vs. body** (checked, not flagged): the widget `**Session** *(new, "Module 6 worktree session")*` is followed by "Open a new Claude Code session in the existing M5 worktree..." — this carries real additional content (path, no-fork, leave-M5-running guidance) beyond what the widget states, so it does not meet the #8a duplication bar. Noted here only because it was the closest near-miss in the file; no fix proposed.

---

## Clean files

- `curriculum/lectures/the-2-frontiers.md` — clean.
- `curriculum/lectures/story-of-module-6.md` — clean.
- `curriculum/lectures/quality-is-grounding.md` — clean.
- `curriculum/lectures/composing-the-workflow.md` — clean.
- `curriculum/lectures/the-loop-has-a-name.md` — clean.
- `curriculum/lectures/the-map-filled-in.md` — clean.
- `curriculum/lectures/agents-that-build-agents.md` — clean. One lead-in ("Ask the agent to turn them into a prompt that builds the kit.") runs 13 words, one over the ≤12 target; too marginal to card as a hit, noted for awareness only.

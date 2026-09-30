# Find the two crux

## Big Idea

Two crux named from your team's own answers are worth more than a backlog of good ideas.

## What You'll Learn

After this module, you will be able to:

- **Pick** a first move from your shortlist and journal it with the options you turned down
- **Read** a peer manager's memory from your own company against yours
- **Distill** exactly two crux for your team, each with the alternatives it beat
- **Name** your coalition and schedule a weekly check-in agent for them

## Start here

**Session** *(new, "Module 3 - Find the two crux")*

Start a fresh Claude Code session in `~/Documents/leading-agentic-engineering/`.

```
/rename m3-find-the-two-crux
```

Whose answer this week changed what you thought about your team?

## Choose the first move

[Exercise: Pick your first move](exercises/pick-your-first-move.md)

## Borrow a second pair of eyes

[Exercise: Cross-read a peer's memory](exercises/cross-read-a-peers-memory.md)

## Name the two crux

[Lecture: Two crux, not a backlog](lectures/two-crux-not-a-backlog.md)

[Exercise: Find your two crux](exercises/find-your-two-crux.md)

## Bring the coalition along

[Exercise: Schedule the coalition check-in](exercises/schedule-the-coalition-check-in.md)

## Did you make progress?

Ask whether you made progress, and whether you laid ground for more, from this module's evidence.

{{prompt:em-close-find-the-two-crux}}

## Key Concepts

- Commit to a first move before you know it's right; the journal entry is what makes a miss useful.
- A peer's memory shows you the part of your own team you can't see from inside. One outside report is one sighting.
- A crux names the mechanism that blocks, not a goal or a category.
- Two crux, each carrying the alternatives it beat, held as hypotheses your people's answers keep testing.
- The coalition check-in asks what people need, never what they did.

## Bring to Module 4

**One conversation with a coalition member about your two crux, saved as an observation in `observations/`.** It is the first sign of whether the crux land with anyone but you.

## Next

Your two crux say where to push. Next you declare where you are heading, bound by them, and build the first thing that takes you there.

<!-- maintainer -->

- **Transitions:** start-here 4 @start "Start here: session + opening question" · close 8 @end "Did you make progress? + Next"

## Design (EM proving run 2026-09-30)

- **Mood:** co-creation through cross-pollination. Leaves the manager holding two crux that are theirs but tested against the team's answers and a peer's view; sets up M4's clarity of aim.
- **Pick your first move:** `em-shortlist-and-first-move` reruns the reader on the full week, the manager picks one move, Quality Gate check, Decision Journal entry (context, alternatives, why this won, trade-offs). Conviction over correctness.
- **Cross-read a peer's memory:** `em-export-peer-memory` → `peer-export.md` (root, outside `peers/`); roles or pseudonyms, never names; owner reads before swapping. Swap by hand; `em-cross-read-peer-memory` reads `peers/`, writes `peer:`-tagged observations + one outside-view Quality Gate check (strategy M3 Block 3). Without a partner: `sample-peer-export.md` (this folder) saved as `peers/sample.md`.
- **Two crux, not a backlog (lecture):** Rumelt's crux (sourced there); "two" is the training's stance.
- **Find your two crux:** `em-find-two-crux`, method inlined (no crux skill ships to this audience). Crux land as hypotheses tagged `crux` (decision 2026-09-30), not rules; M4 reads them so.
- **Schedule the coalition check-in:** `em-schedule-coalition-checkin` (coalition into Team Knowledge + `agents/coalition-check-in.md`) + `em-coalition-checkin-task` (Schedule-sidebar prompt, headless-safe). Drafts land in `diagnostics/coalition-<date>.md`; the agent never sends. Companions, not instruments.
- **Did you make progress?:** `em-close-find-the-two-crux`, evidence = the two crux, first move, coalition drafts, whether a coalition member has agreed to come along.
- **Bring to Module 4:** one coalition conversation about the crux, as an observation.
- **Timing:** exercises 15 + 25 + 25 + 20, lecture ~8, transitions 12 ≈ 105 min.
- **Artifacts:** first-move journal entry, `peer-export.md`, `peers/`, two `crux` hypotheses in Team Knowledge, coalition in Team Knowledge, `agents/coalition-check-in.md`, `diagnostics/coalition-<date>.md`.

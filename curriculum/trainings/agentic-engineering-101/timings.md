# AE101 delivery shapes

Machine-read by `scripts/calculate-time.js`. This file holds only what nothing can derive: the slot each module is sold into, and the day's rhythm constants. Every duration inside a module comes from the leaf that owns it (`**Time:**` on the exercise or lecture file) plus that module's `- **Transitions:**` line. Nothing here restates a beat.

Markdown rather than YAML on purpose: no new parser dependency, and no YAML 1.1 sexagesimal trap where an unquoted `10:30` resolves to the integer 630.

## Rhythm

- **Day start:** 08:30
- **Lunch:** 75
- **Break:** 20

## Caps

Minutes of slot, per delivery shape. `cohort-2day` is the sold two-day cohort, three modules a day back to back. `sitting-2h` is the four-sitting Northwind track, one module per weekly sitting.

Cell format is `<cap>` or `<cap>@<wall-clock start>`. A start turns the computed elapsed column into a clock column; without one the map still computes, it just has no wall time to hang on. An empty cell means the module is not offered in that shape.

| Module | cohort-2day | sitting-2h |
|---|---|---|
| getting-going | 120@08:30 | 120 |
| plan-mode-done-right | 120@10:50 | 120 |
| earn-the-trust | 120@14:05 | 120 |
| run-the-first-experiment | 120@08:30 | 120 |
| learn-from-the-test | 120@10:50 | 120 |
| spot-gaps-build-the-loop | 120@14:05 | 120 |

<!-- maintainer -->

**Meta:**
- **Source of the cohort-2day caps:** the Day 1 / Day 2 schedule tables in `trainer-modules.md`, block end minus block start. Three 2h modules per day, back to back: module, break, module, lunch, module, close. Both days run 08:30–16:20 on the rhythm above.
- **Source of the sitting-2h caps:** the four-sitting Northwind track, one module per weekly sitting at 2h.
- **Both shapes are 120 across the board,** so every module reads the same verdict in each. The columns stay separate because the shapes can diverge again, and because `cohort-2day` still carries per-shape transition overrides the weekly sitting does not.
- **A cap is a container, not a verdict.** Whether a module fits is computed, never typed. `node scripts/calculate-time.js` prints FITS or OVER per module per shape.
- **Every authored duration is a single ceiling.** No ranges, anywhere: not on a leaf's `**Time:**` line, not on a phase marker, not on a transition. A range made every total a spread, and a spread is not something a trainer can hold a room to. `--check` rejects one on sight and names the number to write instead.
- **Adding a shape** = one column here plus its caps. No module file changes; the calculator picks the column up by header name.

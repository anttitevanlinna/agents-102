# AE101 delivery shapes

Machine-read by `scripts/calculate-time.js`. This file holds only what nothing can derive: the slot each module is sold into, and the day's rhythm constants. Every duration inside a module comes from the leaf that owns it (`**Time:**` on the exercise or lecture file) plus that module's `- **Transitions:**` line. Nothing here restates a beat.

Markdown rather than YAML on purpose: no new parser dependency, and no YAML 1.1 sexagesimal trap where an unquoted `10:30` resolves to the integer 630.

## Rhythm

- **Day start:** 08:30
- **Lunch:** 75
- **Break:** 20

## Caps

Minutes of slot, per delivery shape. `cohort-2day` is the sold two-day cohort, where M4 runs compressed and M2 splits across lunch. `sitting-1h45` is the four-sitting track, one module per weekly sitting.

Cell format is `<cap>` or `<cap>@<wall-clock start>`. A start turns the computed elapsed column into a clock column; without one the map still computes, it just has no wall time to hang on. An empty cell means the module is not offered in that shape.

| Module | cohort-2day | sitting-1h45 |
|---|---|---|
| getting-going | 120@08:30 | 105 |
| plan-mode-done-right | 100@10:50 | 105 |
| earn-the-trust | 110@14:05 | 105 |
| run-the-first-experiment | 90@08:30 | 105 |
| learn-from-the-test | 120@10:20 | 105 |
| spot-gaps-build-the-loop | 105@13:50 | 105 |

<!-- maintainer -->

**Meta:**
- **Source of the cohort-2day caps:** the Day 1 / Day 2 schedule tables in `trainer-modules.md`, block end minus block start. M2's 100 is its two blocks summed (10:50–12:00 plus the post-lunch 13:15–13:45); the lunch between them is not slot time. M4's 90 is the compressed Day 2 opener.
- **Source of the sitting-1h45 caps:** the four-sitting track, one module per weekly sitting at 1h45. M1 has always been sold as the exception; the cap here records the sitting it is measured against, not a claim that it fits.
- **A cap is a container, not a verdict.** Whether a module fits is computed, never typed. `node scripts/calculate-time.js` prints FITS / TIGHT / OVER per module per shape, and TIGHT means the floor fits and the ceiling does not — the state the prose corpus kept recording as "fits with buffer."
- **Adding a shape** = one column here plus its caps. No module file changes; the calculator picks the column up by header name.

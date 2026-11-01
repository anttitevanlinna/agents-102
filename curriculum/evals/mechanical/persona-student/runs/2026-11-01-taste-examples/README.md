# Example-based taste judge (2026-11-01)

`pairs.js --rules taste-rules.md --examples taste-examples.md`. The examples file holds Antti's 13 past-call rationales with the exact rejected and kept text, his sure blind-pick reasons, his triad findings, and five AE101 sections as frame references. Rebuild it with `build_examples.py`. The 45-pair holdout excludes every pair shown in the studio.

| holdout (a/b, swapped) | all | refused (15) | accepted (20) | antti-wording (10) | voice (5) | stable | stable correct |
|---|---|---|---|---|---|---|---|
| plain | 27, 24 | 5, 8 | 15, 13 | 7, 3 | 2, 2 | 30 | 18 |
| rules v2 | 27, 29 | 7, 8 | 14, 15 | 6, 6 | 2, 2 | 37 | 24 |
| rules v2 + examples | 27, 30 (60–67%) | 6, 7 | 15, 16 | 6, 7 | 1, 2 | 36 | 24 |

Damaged-copy check (`damaged.*`, picks `plain`/`v2`/`ex` and `-sw`): 12 A101 slides, each with generic padding (`pad`) or one inserted narrator, put-down or witty line (`taste`), in both orders. Every judge picks the original 12/12 on both kinds, including the plain judge. The check passes, but it does not separate the judges. A harder damage set is needed, such as cutting the slide's most concrete sentence or swapping in a near-synonym frame.

What the 12 order-stable misses are: almost all are counterweights where Antti kept the longer text. Examples: orientation duplication (`tn-side-quest`), a numeral that aids memory (`tn-five-things`), repetition on tough M1 openers (`tn-places-not-pipeline`), a line answering the room's unspoken objection (`tn-not-deterministic`), and a voice fragment (`tn-team-pr-fragment`). The judge over-applies "shorter wins" even with the exceptions written out.

Gold drift: `tn-wall` (2026-09-03: renaming "wall" refused) contradicts Antti's blind call on 2026-11-01 ("the wall is not a thing… Claude trying to be clever"). Today's call should override it. Re-label stale gold rather than count it as a judge miss.

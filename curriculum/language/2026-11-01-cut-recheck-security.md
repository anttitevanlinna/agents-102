# Cut recheck: Security, cut text vs pre-cut text

Question: did the 93-sentence cut (421f619) lose key points in Security? Base 421f619^ (pre-cut, rewrites already in), so this isolates the cuts. Runner `curriculum/evals/loops/loop.sh security`, 3 personas × 4 repeats per side, variant applied by checking out the cut files at 421f619^.

Runs of 12 carrying each learning (word signal), pre-cut → cut; Module 7 pilot's independent run (base 1059873, rewrites + cuts) alongside:

| learning | pre-cut → cut | pilot run |
|---|---|---|
| escalate-and-prototype | 8 → 5 | 8 → 6 |
| non-determinism | 3 → 4 | 5 → 3 |
| package-the-check | 9 → 8 | 10 → 8 |
| english-is-attack-surface | 9 → 11 | |
| loop-not-certainty | 11 → 12 | 11 → 11 |
| door-you-dont-open | 12 → 12 | 11 → 11 |

Taste judge preferred the pre-cut text on all 5 changed slides, both orders.

Only escalate-and-prototype dips in both runs. The pre-cut students quote "The reusable check is the expert in the room." beside "you know what to show a human expert", so that sentence and "The reusable check and the loop carry to the next agent." (package-the-check) are restored on audit-your-agent's last two slides. Non-determinism moves in opposite directions across the two runs, so it reads as noise and nothing is restored for it.

Evaluations (pilot run): design-the-loop 9 → 11, so the first-run dip was noise; floor-ceiling 8 → 6, small. Nothing restored.

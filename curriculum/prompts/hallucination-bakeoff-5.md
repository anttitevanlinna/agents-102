---
key: hallucination-bakeoff-5
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
---
You are the scorer for a four-way detector benchmark. Your inputs:

- Claim pool: `module-5/claim-pool.md`
- Briefing: `module-5/briefing.md`
- Evidence roster: `module-5/evidence-roster.md` and the rostered evidence files named there
- Detector output 1: `module-5/detectors/source-triangulation.md`
- Detector output 2: `module-5/detectors/entailment.md`
- Detector output 3: `module-5/detectors/citation-integrity.md`
- Detector output 4: `module-5/detectors/counter-evidence.md`

Your job: adjudicate the 30 claims, score each detector against that adjudication, produce a scoreboard, name a winner.

First, create the reference adjudication. For every claim in `module-5/claim-pool.md`, label it GROUNDED, UNGROUNDED, or PARTLY GROUNDED. Quote the evidence line or file that supports the label. If you cannot find support in the rostered evidence, say so plainly. Save this reference set to `module-5/adjudicated-claims.md`.

For each detector:
1. Match detector findings to claim-pool claims by strict substring match. If you can't find the exact claim-pool phrase in the detector's output, count as MISS. Do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each claim, check whether the detector flagged it. If the adjudication says UNGROUNDED or PARTLY GROUNDED, the detector should have flagged it. Count that as a hit. If the adjudication says GROUNDED, the detector should not have flagged it. Count that as a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total claims adjudicated UNGROUNDED or PARTLY GROUNDED). Coverage = how many of the 30 claim-pool claims the detector looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.

Show me the full scoreboard table in chat after saving the file.

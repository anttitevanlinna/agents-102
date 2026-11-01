# Taste Studio: elicitation page for the maintainer's taste

Published page: https://claude.ai/artifact/8QVvcCt9UmwTTCGsmLtraT (private to the maintainer).
`template.html` + `data.json` → page (`__DATA__` replaced with data.json, `</` escaped).
Answers live in the artifact db, collection `answers` (doc ids `why-<pair>`, `blind-<pair>`,
`triad-<n>`, `story-1`, `rule-<id>`); rule hypotheses in `rules` (add or set `retired:true` there,
no republish needed). Read back with ArtifactData `list answers`.

| Tab | Method | Seeds | Feeds |
|---|---|---|---|
| Your past calls | rationale capture + laddering (one LLM follow-up via `sample`) | 14 gold Antti-pairs all 4 readers missed | taste-judge few-shots, rubric lines |
| Blind picks | paired comparison + test-retest | 8 A101 candidates (c1–c8) + 6 split gold pairs | held-out gold; self-agreement = ceiling for judge agreement |
| Odd one out | repertory grid triads | 9 A101 slides, 6 triads | maintainer's own construct lexicon for judges |
| The story | Critical Decision Method, 4 sweeps | POV scar story | first-person POV beat (draft card) |
| Check my rules | teach-back with boundary conditions | 12 hypotheses from taste-notes + pair whys | promote agreed rules to check_*.md via /compound |

Bar: taste judge ≥80% on held-out pairs in both orders, ≥65% on voice; read test-retest first,
since the judge cannot beat the maintainer's own self-agreement.

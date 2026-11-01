# Damaged-copy check on all 8 Agents 101 modules, judge v3 (2026-11-01)

`mkdmg-modules.js` takes 3 slides per module (seeded pick, body `##` chunks of 40–220 words, no prompt blocks). Each slide gets four damaged copies:

- putdown, narrator or witty: one sentence rewritten at about equal length;
- cut-concrete: the slide's most concrete sentence deleted.

That makes 96 pairs. The judge is `pairs.js --rules taste-rules.md --examples taste-examples.md,taste-examples-cuts.md`, run in both orders. Run-to-run noise is about ±5.

| group | pairs | judge picks the original |
|---|---|---|
| ALL | 96 | 96% (185/192) |
| narrator | 24 | 100% |
| witty | 24 | 100% |
| putdown | 24 | 98% |
| cut-concrete | 24 | 88% |
| 6 of 8 modules | 12 each | 100% |
| evaluations | 12 | 96% |
| multi-agent-systems | 12 | 96% |
| output-quality | 12 | 79% |

Every module's damaged copies are caught. The judge picks the original on every damaged copy in at least one order, except one pair: the output-quality slide that lost "Four detectors run on the same claim pool…", which it misses in both orders.

The weak spot is cutting concrete text. The v3 rules lean shorter, so a slide that loses its example or its numbers can look tidier. Two of the six cut-concrete misses deleted a pointer line ("Read [What is an Agent…]", "Module 4 starts fresh at…"). Those are arguably not damage, so the true rate is a little higher than 88%. Re-run on every judge change; if cut-concrete falls below 80%, the "shorter by default" line is over-reaching.

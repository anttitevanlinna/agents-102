# AE101 anchor for the taste judge (2026-11-01)

AE101 is the calibrated reference (maintainer, 2026-11-01): its compendium-checked text scores about 90 on the story rubric. Agents 101 is mostly generated from strategy input and has been run through once. The pair judge's anchor is therefore this: shown 12 random AE101 sections, each beside a copy with one sentence rewritten at equal length into a put-down, a narrator line or a witty line (`../2026-11-01-gate-age-harddamage/mkdmg.js`), the judge must prefer the AE101 original.

Result, `taste-rules.md` + `taste-examples.md`, both orders: 35 and 34 of 36 (96%, ±5); 33 stable, all correct. Re-run this whenever the rules or examples change. Below 90% means the judge has drifted away from the reference voice.

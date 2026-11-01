# Two-step gate, age split, harder damage (2026-11-01)

All runs use `taste-rules.md` with `examples-noblind.md`, which is `taste-examples.md` minus the blind-pick reasons, so that today's blind picks can serve as a test set. Every set was run in both a/b orders. Score with `../../score-gate.py KEY PICKS PICKS_SW [GATE GATE_SW]`. LLM run-to-run noise is about ±5 points: the plain judge scored 57% on this holdout earlier today and 63% here.

## 1. Two-step gate (`gate.js`, then `pairs.js`)
Step 1 keeps the longer version when the extra text is orientation, a memory numeral, or an answer to an unspoken objection.

| 45-pair holdout | plain | rules+examples | gate + rules+examples |
|---|---|---|---|
| agreement | 63% | 61% | 64% |

The gate fires on 11–12 of 45 pairs and is right on 6 and 8 of them (50–73%). It catches the intended counterweights (`tn-side-quest`, `tn-five-things`, `tn-not-deterministic`), but it also fires on numeral edits that Antti accepted. Net effect: +3 points, inside the noise.

## 2. Age split
The holdout has no calls from the last week (dates run from 2026-04 to mid-October, and 19 pairs are undated). The recent set is therefore Antti's 14 blind picks from 2026-11-01, scored against today's labels.

| | plain | rules+examples | gate |
|---|---|---|---|
| older calls (holdout, 45) | 63% | 61% | 64% |
| today's calls (14) | 68% | 71% | 71% |
| today's, coin flips dropped (12) | 71% | 75% | 75% |

Always-shorter scores 9/14 (64%) on today's set, so today's calls are also easier: 6 of the 8 new pairs were cuts. The direction supports drift, but n=14 is small. `tn-wall` is a confirmed reversal.

## 3. Harder damage (`mkdmg.js`)
One existing sentence per slide is rewritten at near-equal length into a put-down, a narrator line, or a witty line: 12 slides × 3 kinds = 36 pairs.

Results: plain 100%, rules+examples 99%, gate 99%. Every judge, including the plain one, spots the taste violation when the clean version sits beside it. The damage check passes but still does not separate the judges.

## Read
Judges recognise bad lines easily. What they cannot reproduce is Antti's choice to keep longer text, and his calls also move over time. "Done" should be measured on recent calls against his own self-agreement (about 83%), with old gold re-labelled where he has since reversed himself.

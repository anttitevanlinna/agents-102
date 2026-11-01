# AE101 history cuts: Antti's own length and frame calls as a third recent set (2026-11-01)

150 blind slide pairs mined from the AE101 sessions where Antti cut length and fixed frame. The kept side is the text after the commit; the other side is the text before it. Rebuild with `python3 build_history_pairs.py OUTDIR` (seed 20261101). Score with `score_history.py`; the command is at the bottom.

## Sessions

| session | tier | pairs | what it was |
|---|---|---|---|
| 2026-08-05 line-read | gold | 38 | About 50 one-change commits between 08:30 and 10:12, one every one or two minutes ("Cut artifact-not-feeling line", "Replace leave-the-room metaphor", "Call the far-half governor a question"), plus the 13:50 build-story cut |
| 2026-08-25 called cuts | gold | 12 | Commits whose message says "Antti-called" or "Antti-directed" |
| 2026-08-29 compaction | gold | 24 | The M1–M6 compaction pass recorded in `taste-notes.md` 2026-08-29 (pairs from `aa64ce15` are already in antti-pairs and left out) |
| 2026-07-09 voice pass | silver | 25 | Judge-found YUCK fixes plus 19 MILD fixes Antti adjudicated on cards; the commit does not say which pair is which |
| 2026-08-12–14 sweeps | silver | 35 | Rule-driven: the lead-in budget, M1 and M2 line-reads, "cut what an engineer already knows" |
| 2026-08-18–25 trims | silver | 16 | The M1 trim and "Ten bullets lose their fourth sentence" |

Pairs are whole `##` slides of the student-visible body, above the first `<!--` marker. Additions are left out, and so are pairs over 450 words. No pair matches an antti-pairs text. Some silver pairs carry mechanical changes in the same slide, such as a pointer fix; treat silver as noisier.

## Scores

Readers were run in both a/b orders. Run-to-run noise is about ±5 points, and with n=12 to 38 per session each session row also carries about ±8 of sampling noise.

| group | n | always-shorter | plain | rules+examples | gate + rules+examples |
|---|---|---|---|---|---|
| ALL | 150 | 78% | 64% | 78% | 68% |
| gold | 74 | 80% | 61% | 80% | 66% |
| silver | 76 | 76% | 66% | 77% | 70% |
| 08-05 line-read | 38 | 66% | 59% | **83%** | 66% |
| 08-25 called cuts | 12 | 100% | 58% | 75% | 75% |
| 08-29 compaction | 24 | 92% | 67% | 77% | 60% |
| kept side longer | 24 | 0% | 42% | 50% | 56% |
| rewords (within 2% of the same length) | 42 | 21% (9 ties) | 56% | 65% | |

What the numbers say:

1. **On a cut session, "shorter wins" is the bar, and it is high (78%).** The rules+examples judge only matches it overall.
2. **The 08-05 line-read is the one place the judge beats it, 83% against 66%.** That session is mostly rewords: jargon to plain words, metaphor to literal, obligation to permission. The stated taste rules carry exactly that, and the plain judge does not (59%).
3. **The gate hurts here.** It fired 43 times across both orders and was right 3 times. It reads orientation (20 wrong), memory numerals (11) and unspoken objections (9) into text Antti cut. Its jobs come from his counterweights, but inside his own cut sessions he cut those kinds of lines freely. Recommendation: stop using the gate as a hard override; keep the three jobs as rule text the judge weighs.
4. **When Antti kept the longer side (24 pairs), every reader is near a coin flip.** These are the rewords that add a clause for accuracy ("If you've specified a large enough task well, the re-send can run for hours") or name the actor ("It" becomes "The LLM").

## Command

```
python3 score_history.py history.key.jsonl history.blind.jsonl \
  plain=hist-plain.jsonl,hist-plain-sw.jsonl \
  rules+ex=hist-ex.jsonl,hist-ex-sw.jsonl \
  gate+rules+ex=hist-ex.jsonl,hist-ex-sw.jsonl,hist-gate.jsonl,hist-gate-sw.jsonl
```

`rules+ex` is `pairs.js --rules taste-rules.md --examples taste-examples.md`. None of these pairs are in the examples file, so the set stays a test set; keep it out of `taste-examples.md`.

## v3: the judge learns the cut patterns (holdout)

`taste-rules.md` v3 adds two sections, "Cuts the author makes himself" and "Additions the author makes". Its Length section now says the shorter version wins by default, and that orientation repeats, counts and objection-answers get no protection as a class. `taste-examples-cuts.md` holds 17 of his cuts, all taken from the train half (`build_cut_examples.py`). `split.py` splits the 150 pairs per session by md5 order into 74 train and 76 holdout. Three holdout pairs (`holdout-leaked.json`) contain a phrase that the v3 rules quote; the "clean" row leaves them out. The gate is retired; see the header of `gate.js`.

Both orders; noise is about ±5, and n=76 adds about ±5 of sampling error.

| holdout group | n | always-shorter | v2 rules+examples | v3 |
|---|---|---|---|---|
| ALL | 76 | 79% | 79% | **87%** |
| clean (leaked 3 removed) | 73 | | 78% | 86% |
| gold | 37 | 78% | 85% | 89% |
| silver | 39 | 79% | 73% | 85% |
| 07-09 voice pass | 13 | 85% | 85% | 88% |
| 08-05 line-read | 19 | 63% | 89% | 89% |
| 08-12–14 sweeps | 18 | 89% | 67% | 89% |
| 08-18–25 trims | 8 | 50% | 69% | 69% |
| 08-25 called cuts | 6 | 100% | 75% | 92% |
| 08-29 compaction | 12 | 92% | 83% | 88% |
| kept side longer | 10 | 0% | 55% | 50% |

What changed:

- v3 beats always-shorter by 8 points overall. Most of the gain is on the cut sessions, where v2 had been keeping longer text that he cut (08-12–14: 67% to 89%; 08-25: 75% to 92%).
- When he kept the longer side, v3 is still a coin flip (5 of 10).
- On the old 45-pair holdout, where he often refused a cut, v3 scores 61%, the same as v2. The "shorter by default" line did not cost the refusals.
- The AE101 anchor scores 35 and 36 of 36 (99%) and is stable, against 96% before.

## Antti's answers on the judge-unsure representatives (2026-11-01 17:30)

`resolve.py` writes `history.key.resolved.jsonl`; `resolutions.json` gives the reason for each change. Use the resolved key from here on.

- Named actor (`ad58dca3-2`) and low-value closing sentence (`35e7889b-139`): he agreed with his August call. Six order-flip cuts of the same kind are confirmed by pattern.
- `a90c9ec2-58` is relabelled to the other side ("Agents don't 'earn' autonomy"). This is drift; his current call wins.
- He answered "neither" on the keep-longer lens wording (`488cf42a-10`) and on "container" vs "place to hang moves" (`a90c9ec2-62`). Both are dropped from scoring, along with one same-text lookalike (`488cf42a-12`).
- The concrete-sentence card got "not enough context". It has been re-asked with the full slide (`cc-getting-going-2`).

With the resolved key, using the v3 picks from before the three rules added at 61cea88a: 147 pairs, v3 85% against always-shorter 80%. On kept-longer it is 55% (n=21). Noise is about ±5.

Rerun after the three rules added at 61cea88a (low-value closer, no "earn" for agents, metaphor must fit its noun), picks in `v3r-61cea88a*.jsonl`: resolved key, 147 pairs, 86% against always-shorter 80% (was 85%); kept-longer 57% (n=21). The rules cost nothing here.

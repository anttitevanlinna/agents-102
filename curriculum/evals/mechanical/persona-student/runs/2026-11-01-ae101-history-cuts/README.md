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

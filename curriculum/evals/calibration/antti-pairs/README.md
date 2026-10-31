# Antti-pairs: a calibration set mined from the maintainer's own calls

55 blind A/B pairs. In each, the maintainer picked one version of a slide (or one sentence in its slide) over the other. A reader instrument (simulated student, judge, rubric) is calibrated when it picks the same side. No new rulings were asked for: every label comes from git history or `curriculum/taste-notes.md`.

## Files

- `pairs.blind.jsonl`: what the reader sees. `{id, file, a, b}`. `a`/`b` are whole `##` slide chunks (median 108 words), identical except for the contested span. Side is randomised (seed 20261031; 27 a, 28 b).
- `pairs.key.jsonl`: never shown to the reader. `{id, answer, source, kind, dim, file, date, why, preferred_len, other_len}`. `why` quotes the ruling.
- `score.py picks.jsonl`: accuracy overall, by kind and by dim, beside the always-pick-the-shorter baseline.
- `build.py`, `taste_spec.py`, `git_pairs.py`, `pairs_sig.json`: rebuild. `python3 build.py <outdir> pairs_sig.json` reproduces the key byte for byte.

## What is in it

| kind | n | label means |
|---|---|---|
| refused-edit | 22 | a card, sweep or judge proposed a change; Antti kept the original (or reverted to it) |
| accepted-edit | 19 | a carded change Antti took |
| antti-wording | 14 | Antti supplied or steered the words himself |

By dim: clarity 22, felt-learning 13, voice 9, enjoyment 5, truth 3, agency 2, orientation 1.

Sources: 32 pairs from commits whose message records a maintainer ruling (cards ruled, reverts, restores, "Antti's sentence"); 23 from `taste-notes.md`, rebuilt as slide variants on today's text. Of those 23, the `alt` side of `tn-good-and-bad-work`, `tn-wall` and `tn-on-your-side` is reconstructed from the note's description, not quoted. Every other `alt` is quoted from the note or the diff.

Mostly AE101 and shared lectures and slides, the calibrated corpus that Agents 101 inherits its style from. A few are from APT101 and Claude Basics.

## How to read a score

- **Shorter-baseline is 56% overall** (31 of 55 preferred sides are shorter, 6 tie). A reader has to clear that before it means anything. On `clarity` the baseline is 86% because most cuts landed. On `refused-edit` it is low, because there the refused proposal was often the shorter one. So `refused-edit` accuracy is the number that shows taste and not just a liking for short text.
- LLM readers tend to accept every proposed edit. A reader that scores well on `accepted-edit` but under 50% on `refused-edit` is agreeing with whatever changed, not with Antti.
- Target, per the coordinator's definition of done: about 80% or better overall, and no kind under 65%.

## As a drift anchor

The pairs are frozen: git pairs carry the text of their own commit (2026-04-24 to 2026-10-07), taste-notes pairs the text at `90463be7`. Re-score every judge or persona revision on the same file. A move in this score with no change to the instrument is judge drift (the 10-08 → 10-31 rubric drop, 86 → 78, is the case it should explain or rule out). Keep one judge that never sees this set (holdout), so the set doesn't become something to tune against.

## A human anchor beside it

AE101's first cohort (real people) reported overload: *"too much material, too little structure"*, *"as it stands, this doesn't work for us"* (`theory-plan.md` § Why this exists). The text they took is `3605286c^` (the theory layer landed 2026-07-04 in `3605286c`). A simulated student that reads M1–M3 at `3605286c^` and does not report overload, or that reports no less of it at HEAD, has not passed the damaged-copy test against real data. This is the only human verdict in the repos. The earlier NPS 60–80 training left no material.

## Not in this set yet (next sources, in order of yield)

1. **122 `Antti-directed` notes in maintainer blocks** under `curriculum/{trainings,exercises,lectures,slides}`. Many quote before and after, and 12 say *do not re-propose*, which makes them refusals. These could add an estimated 40–60 pairs.
2. **475 `memory/compounded/` entries** in core. Each has `example_from_session` (what Claude did) and `counter_example` (Antti's redirect). About 85 on reader surfaces quote wording. Most are structural (placement, dosage), so they fit damaged-copy generators better than sentence pairs.
3. **Session transcripts on Antti's machine** (`~/.claude/projects/*.jsonl`): every card with his reply, including the refusals that never reached git. `self-review-mining.md` already describes the miner. This needs Remote Control on his machine and would probably outyield 1 and 2 together.
4. 8,463 sentence-level edits across all curriculum commits. Most were judge-driven and only implicitly approved. Kept out on purpose: labelling with them would train the reader to agree with the judges.

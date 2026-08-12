# M4 defect sweep — 2026-08-12

Scope: student-facing body only (above `<!-- maintainer -->`) across the 7 files listed. `walk-and-send-off.md` excluded (live edit). Checked against the 11-item defect catalogue and `check_student_facing.md` §9 (all four axes) + `check_slides.md`.

Total hits: **9** across 2 catalogue classes (over-long lead-ins, duplication) plus 1 unverifiable-promise. 4 of 7 files are clean.

---

## curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md — 4 hits, all #11 (over-long prompt lead-ins)

Module is otherwise clean: no orphan slides (the four `[Lecture:]`/`[Exercise:]` links in `## Start here` run back-to-back with zero interstitial prose), no unfounded diagnosis, no attitude adverbs, no speech-verb-without-addressee, no unverifiable promise. But every prompt lead-in beyond the first blows the ≤12-word target — the file reads like the 9-word opener set the bar and then abandoned it.

1. **[HIGH] Line ~75–77.** `"Optional: if you want the experiment to outlast your laptop or to hand it to someone, ask Claude to push the branch and set its upstream."` — 26 words. Catalogue #11.
   Fix: `"Optional: push the branch and set its upstream."` (8 words) — the rationale (outlast your laptop / hand it off) already sits in the paragraph above; the lead-in doesn't need to re-carry it.

2. **[HIGH] Line ~92–94.** `"If Claude stalls and you want to see whether it picks itself back up, this nudge is phrased as encouragement and lands as a taunt:"` — 25 words. Catalogue #11.
   Fix: `"If Claude stalls, this nudge doubles as a taunt:"` (9 words) — cuts the "phrased as encouragement" preview, which also nudges toward #10 (telling the student how to read the prompt before they read it).

3. **[HIGH] Line 81–83.** `"Ask Claude to run the scoped task end-to-end in this same session, with your rules files, memory, ADRs, and skills loaded."` — 21 words. Catalogue #11.
   Fix: `"Ask Claude to run the task end-to-end in this session."` (10 words) — "with your rules files, memory, ADRs, and skills loaded" is scene-setting the trifecta paragraph above already established; the prompt itself will show what's loaded.

4. **[MED] Line 69–71.** `"Ask Claude to commit current state on a feature branch, record the coordinates, and tell you the short SHA."` — 19 words. Catalogue #11.
   Fix: `"Ask Claude to commit current state and record the coordinates."` (10 words) — "on a feature branch" and "tell you the short SHA" are mechanism the prompt itself performs; the two-sentence paragraph above the lead-in already explains why.

---

## curriculum/lectures/test-and-learn.md — 4 hits (1 unverifiable promise, 3 duplication)

1. **[HIGH] Line 20.** `"You'll use it on every future agent hand-off."` — Catalogue #6, unverifiable promise, exact match to the catalogue's own example shape. Costs nothing to write, nothing checks it.
   Fix: cut the sentence. The preceding two sentences (*"Not a template. A question."* + the italic question itself) already carry the teaching weight; the promise adds nothing testable.

2. **[MED] Line 23–25.** Header `## Cancel is legitimate; traces are data` then bullet opens: `"Cancel is legitimate; traces are data. If twenty minutes in you can see Claude hallucinating..."` — verbatim repeat of the header as the bullet's own first sentence. Catalogue #8c.
   Fix: drop the repeated clause, start the bullet at the actual content: `"If twenty minutes in you can see Claude hallucinating file paths, contradicting its own earlier steps, or missing a requirement that wasn't in the prompt, stop it."` The header alone carries the claim under `check_slides.md §6` (header self-carries).

3. **[MED] Line 17, 19.** Header `## Gap analysis: walk your system against the task` then bullet: `"**Gap analysis**: walk the system you have against the system the task needs."` — near-verbatim restate (same clause, "your system against the task" → "the system you have against the system the task needs"). Catalogue #8c.
   Fix: drop the repeated definition clause from the bullet, keep only what's new: `"**Gap analysis**: Claude audits your setup as a subagent and returns a ranked list of thin spots."` (folds in the next bullet's opening, which currently duplicates the same ground a third time — see below).

4. **[LOW-MED] Line 3, 5.** Header `## Every send-off is an experiment` then body sentence 2: `"Every send-off from here on is an experiment."` — near-verbatim restate. Catalogue #8c.
   Fix: cut the sentence; the paragraph's next sentence (*"The agent is the apparatus, your rules and context are the setup, and the result is data"*) is the actual content and reads fine as the opener without the restated header.

---

## curriculum/lectures/ironies-of-automation.md — 1 hit

1. **[MED] Line 9, 13.** Header `## Trust and vigilance move in opposite directions` then bullet 3 opens: `"Trust and vigilance move in opposite directions. The same observed competence that earns the agent more autonomy degrades the attention you bring to the next task."` — verbatim repeat of the header as the bullet's own first sentence. Catalogue #8c.
   Fix: drop the repeated clause, start the bullet at `"The same observed competence that earns the agent more autonomy degrades the attention you bring to the next task."` The header already states the claim; per `check_slides.md §6` a header that self-carries doesn't need its own bullet to re-assert it before adding the new content.

Rest of the file is clean: the Bainbridge argument/result distinction is carefully drawn (not a compressed aphorism — it's explained in the same sentence), "ask the plain question first" is a private/reflective question with no room-facing addressee problem, no attitude adverbs, no unfounded diagnosis.

---

## curriculum/lectures/the-far-half.md — clean

No hits. The near-verbatim echo between the section header `## Your first un-packaged long session` and its first bullet (`"One long session goes off un-packaged, on purpose"`) is a paraphrase, not a verbatim restate, and it's carrying the map-figure's own caption language deliberately (per the maintainer block) — not counted as a hit.

## curriculum/lectures/the-agent-loop.md — clean

All three prompt lead-ins (`"Ask for the loop as a diagram."` / `"Ask what tools this session is carrying."` / `"Ask where that list comes from."`) are 5–6 words, well under the #11 ceiling. No duplication, no unfounded diagnosis, no unverifiable promise.

## curriculum/lectures/what-keeps-a-long-running-session-going.md — clean

No header/bullet duplication, no unknowable criteria, no attitude adverbs.

## curriculum/lectures/reading-the-return.md — clean

`"Predictable failures are readable failures"` and `"Use the three as lenses, not boxes"` read compressed but are both decoded in the sentence immediately following (not left opaque like the catalogue's "the audit walks your whole system so you don't" example) — not flagged as #3.

---

## Summary table

| File | Hits | Worst catalogue class |
|---|---|---|
| run-the-first-experiment.md | 4 | #11 over-long lead-ins (up to 26 words vs ≤12 target) |
| test-and-learn.md | 4 | #6 unverifiable promise + #8c duplication ×3 |
| ironies-of-automation.md | 1 | #8c duplication |
| the-far-half.md | 0 | clean |
| the-agent-loop.md | 0 | clean |
| what-keeps-a-long-running-session-going.md | 0 | clean |
| reading-the-return.md | 0 | clean |

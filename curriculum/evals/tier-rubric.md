# Slide tiers — the decision procedure

How a `<!--tier:N-->` marker is chosen. One rubric, so a tagging pass, a lint and a
trainer all mean the same thing by "T2". Definitions are the renderer's
(`TIER_INFO`, `site/layouts/slides.js`); this file is how you apply them.

**What the tag is for.** `maxTier: 1` — the barebones deck — drops every T2 and T3
slide. So a tag is a standing answer to one question, asked of a trainer who is
behind schedule:

> **If this slide is skipped, what breaks?**

Not *is it good*. Not *is it well written*. Every slide in the corpus survived a
cut pass; a tag is not a second verdict on whether it deserves to exist.

## The three answers

**T1 — Core. Something later depends on it.** Skip it and there is a hole
downstream. Any one of these is sufficient:

- it carries a `{{prompt:}}` block the room copies, or a live demo the trainer runs;
- it is the only place a term, artifact, file path, or decision the exercise needs
  gets established;
- it is an exercise step;
- it is the module's frame — the Big Idea, the ask, what they will be able to do;
- it is a permission or reassurance beat before a hard ask. *These read as padding
  and are not.* Asking a room to ship a run they expect to fail costs something;
  buying that cheaply is core, not comfort.

**T2 — Recognition. It names what the room already did.** The value is the word for
the thing, not the thing. Skip it and they still did the work; they just leave
without the label. Tests: it debriefs, generalises, or gives a name to an
experience the students have already had in this module.

> **Hard constraint: a T2 cannot sit before the module's first exercise.**
> The room has not done the thing yet, so there is nothing to recognise. A
> pre-exercise slide that reads as recognition is **mis-placed, not mis-tagged** —
> report it as a PLACEMENT finding and do not tag it T2 to make the problem tidy.

**T3 — Story / extra theory. Skip freely.** Narrative, history, provenance, or
depth that neither sets up a doing nor names one. Skipping it costs mood and
motivation, not capability. An anecdote, a "why this matters in the industry"
beat, a passage for the curious.

Anything you cannot place: **UNSURE**, with the reason. An unsure is worth more
than a confident wrong tag — the wrong tag is invisible until a room loses a slide
it needed.

## Rules of the pass

- **Tag slides, never files.** Two slides in one lecture are routinely T1 and T3.
  The 38 tags in the corpus before this audit marked *which files got a tier pass*,
  which is exactly the failure this rubric exists to end.
- **Untagged means T1.** The renderer says so explicitly (`tier` defaults to `'1'`).
  So the audit's job is finding what is NOT core, not labelling everything.
- **Position is evidence.** Read the module file first: where the first `exercises/`
  ref sits splits the module into before (nothing to recognise yet) and after
  (recognition is available). A lecture placed after all four exercises is a
  different animal from the same prose placed first.
- **A story is not automatically T3.** Ask what it does. `story-of-module-6` is a
  first-person memo with no understudy in the corpus — the one beat that cannot be
  reconstructed from bullets. Openers earn repetition and carry the mood contract.
  A demo the trainer performs is T1 however theoretical it reads.
- **Tagging is not cutting.** Do not propose edits or deletions. A slide that looks
  cuttable goes on a separate list for `cut-sweep.ae101.md`, and it still gets a tag.
- **Exercises are T1 by default.** They are the doing the barebones deck exists to
  reach. Tag inside one only for a genuine aside.

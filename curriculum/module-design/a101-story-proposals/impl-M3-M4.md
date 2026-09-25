# Implementation report — M3 + M4 (2026-09-23)

Tranche: Agents 101 Modules 3 and 4, against `blend.md` § Titles M3/M4, § The turn, § Point of
view. Nothing in this file is student-facing.

---

## `lectures/when-to-split-an-agent.md`

**Headers now present** (eight `##`, in order):

```
## The unit is the recurring workflow
## Start with don't
## Split when they can't be one
## More agents is not more rigour
## The test that catches the bluff
## Two shapes, each with its own territory
## Other agents are part of the tool surface
## Three agents is not three times as good
```

Four are the blend's: *Start with don't* · *Split when they can't be one* · *More agents is not
more rigour* · *Other agents are part of the tool surface*. The other four promote bold leads the
file already carried, so the deck chunks cleanly at every seam.

**Lines added:**

- Under `## More agents is not more rigour`, learning A's counter-voice:
  > And more input is not the fix either. The beige answer was not short of context. It had three
  > stances in front of it and could not choose between them.
- Under `## Start with don't`, the bold lead folded into the body sentence:
  > Inside a workflow, start with don't. Default to one agent with a good prompt.
- Under `## Two shapes, each with its own territory`:
  > Once you've decided to split, pick the shape.

**Lines cut:**

- `**The unit is the recurring workflow.**` · `**Inside a workflow, start with don't.**` ·
  `**When splitting earns its keep.**` · `**The test that catches the bluff.**` ·
  `**And once you've decided to split: which shape?**` · `**One warning before you leave the
  room.**` — each becomes the `##` above the prose it led.
- `Two shapes today, each with its own territory.` — the header now carries it.
- `More agents is not more rigour.` from the body of that paragraph — the header carries it.

**Slide-size check:**

```
Slide-size check — files: 1   slides: 8   limits: 210 words / 6 bullets
  oversized: 0
✓ every slide is within limits
```

**Declined:**

- `## Three stances beat one summarizer` · `## Left alone, it averages to beige` ·
  `## A framework makes it pick`. Those three lines are in `multi-agent-systems.md` § Key
  Concepts, not in this lecture's body. A header here would sit over nothing:
  `check_lectures.md §4` truth clause, and `check_slides.md §5` no orphan slides. The beige
  counter-voice the blend wanted under the beige slide is placed under
  `## More agents is not more rigour` instead, which makes the same claim (more inputs is not a
  better answer) and does have the body to carry it. "Beige" resolves for a deck reader via
  `check_slides.md §1`'s module-signposting carve-out: the enclosing module's § What You'll Learn
  and § Key Concepts both name it, and this lecture runs after them.

---

## `lectures/debugging-stuck-agents.md`

**Headers now present:**

```
## Diagnose before repair
## Sources, processing, boundary
```

**Lines added:** none. Both headers sit above prose the file already had.

**Lines cut:** none.

**Slide-size check:**

```
Slide-size check — files: 1   slides: 2   limits: 210 words / 6 bullets
  oversized: 0
✓ every slide is within limits
```

**Noted, not declined:** `## Sources, processing, boundary` heads a five-item list. Items 1 to 3
are the three places named; items 4 and 5 (shrink the rerun, write down the lesson) apply to all
three. The header is true of where the diagnosis can land, which is what the slide teaches.

---

## `lectures/practice-of-risk.md`

**Headers now present** (seven `##`, in order):

```
## Certainty is a fantasy you inherited
## Three ways agents break the old story
## Assess, then mitigate
## Reassess the residual, then decide
## Now the move is to give it less
## The best mitigation is the door you don't open
## The discipline is what carries
```

**Lines added** — the frame's break, one new slide, with control's break merged into it per the
blend's one-slide preference:

> Everything you have built so far gave the agent more. More context. A memory that survives the
> session. More stances at the table. Now the move is to give it less.
>
> Both moves are right, and the difference is what happens when the agent is wrong. More context
> makes a good answer likelier. Less access makes a bad answer smaller.
>
> Every door you close is a source you won't read. The tool you take away was a capability. The
> split you make leaves two agents each knowing half of what one agent knew. Scope it down far
> enough and the system is safe and useless. Nobody hands you the number. You pick it, you write
> down what is left, and you sign for it.

Braid's draft says *"Three modules of this training taught you to give the agent more"* and
*"This module teaches the opposite move on the same dial."* Both are cross-module sequencing in a
lecture body (`check_lectures.md §3`) and the second narrates the curriculum
(`check_student_facing.md §33`), so the passage opens on *everything you have built so far* and
lets the move be the student's. Control's *"brilliant on Tuesday and a breach on Thursday"*
sentence is not carried: it is the third statement of a cost the two sentences above it already
land, and the day names read as a time anchor.

**Lines cut:**

- `**The work is the loop.**` as a standalone bold lead. The string survives as the first words of
  `## Assess, then mitigate` (*"The work is the loop. You don't get certainty, you get four steps,
  plain and repeatable."*), which keeps the maintainer block's scar-slot locator live and takes the
  slide from five bolded elements to four (`check_slides.md §9`: the four step names are checklist
  item names, a fifth handle is over budget).
- `You don't get certainty. You get a loop. Four steps, plain, repeatable.` — folded into the line
  above.
- `**The best mitigation is the one you don't need.**` · `**Certainty is a fantasy you
  inherited.**` · `**The uncomfortable part, said plainly.**` — each replaced by the `##` over the
  same prose.

**Slide-size check:**

```
words  bul  slide header
  201    0  Three ways agents break the old story
  159    0  The best mitigation is the door you don't open
  158    0  Assess, then mitigate
  137    0  The discipline is what carries
  124    0  Now the move is to give it less
   83    0  Reassess the residual, then decide
   64    0  Certainty is a fantasy you inherited

Slide-size check — files: 1   slides: 7   limits: 210 words / 6 bullets
  oversized: 0
✓ every slide is within limits
```

**Backing block:** `best-mitigation-is-the-one-you-dont-need` now quotes *"The best mitigation is
the door you don't open."*, the string the body carries. Two claims added for the new passage,
both `vision · ← none-owed`, matching the file's other house stances.

**Scar slot:** recorded in the maintainer block as a dated open slot for Antti — placement after
*The work is the loop* and before *The best mitigation is the door you don't open*, shape per
`braid-the-anatomy.md` § 3, fallback M7 per `control-and-creativity.md` § 3. No placeholder, no
drafted incident, no first-person prose in student text.

**Declined:**

- `## "I can't tell" is a real answer`. That line lives in `security.md` § Key Concepts. It is not
  in this lecture's body, so the header would sit over nothing (`check_lectures.md §4` truth
  clause).
- The blend's single `## Assess, mitigate, reassess, decide` slide. All four steps under one
  header measures 241 words against the 210 cap (`check_slides.md §14`). Split at the conceptual
  seam per `check_lectures.md §5`: find-and-reduce, then name-what-is-left-and-sign. Both halves
  earn a §4 header.
- The analogy break (*no employee reads every document as an instruction*) gets no slide, per the
  blend. It also gets no body sentence: the line exists only as a title candidate in
  `a101-skeleton-to-be.md`, not as prose this lecture carries, and drafting it is not in this
  tranche's scope.
- `## The discipline is what carries` is built from the closer's own last sentence rather than from
  the blend, which lists no header for that beat. The slides layout chunks at `##`, so without one
  the closer would ride on `## The best mitigation is the door you don't open` at 296 words. The
  file's own `**The uncomfortable part, said plainly.**` was the cheaper promotion and is an orphan
  mood header under `check_lectures.md §4`.

---

## `trainings/agents-101/multi-agent-systems.md`

**Headers now present** in the Debrief-to-Next stretch:

```
## Debrief
## Nothing here checks any of it
## Push back on the summary
## The doubt stays. Hold it.
## Optional memory check before Module 4
## Key Concepts
## Pre-reads before Module 4
## What's the worst thing it could do with that access?
## Next
```

**Line added** (one, under `## Nothing here checks any of it`, closing the paragraph that header
now sits over):

> The audit reads how your agents handed work to each other. Nothing in it reads the briefing and
> tells you whether it is true.

**Lines cut:**

- `What's the worst thing it could do with that?` from § Next — the header now asks it, and the
  sentence restated it verbatim one line down.

`## Push back on the summary` keeps the two push-back sentences; the unease beat moves under its
own header so the module's last teaching slide is the doubt and nothing else. § Next stays the
last section and carries the build-between-modules ask.

**Slide-size check:**

```
Slide-size check — files: 1   slides: 13   limits: 210 words / 6 bullets
  oversized: 0
✓ every slide is within limits
```

---

## `trainings/agents-101/security.md`

**Lines cut** — § Next, the dedupe the blend calls for:

> Remember also: agent actions start as text. A tool call, an email draft, a CRM update, a database
> change, a ticket comment, before any of those touch another system, they are words the agent
> produced and another system obeys. If the output is wrong, the action built from it will be wrong
> too. Module 5 starts there.

M3 keeps its instance (`multi-agent-systems.md` § Start here, *"text is also where action
starts"*). § Next now hands over one question. A maintainer note records the guard so the
paragraph is not re-added.

**Lines added:** none in body.

**Slide-size check:**

```
Slide-size check — files: 1   slides: 10   limits: 210 words / 6 bullets
  oversized: 0
✓ every slide is within limits
```

---

## `exercises/three-minds-one-synthesis.md`

**Line added** — the turn, one sentence pair, § Close, immediately before *"Hold the doubt"*:

> Everything you just did is the move this training teaches, run properly. It still handed you
> something you cannot vouch for.

**Lines cut:** none. Nothing else in § Close moves. No slide headers touched; the exercise is not
slide-chunked in the checker's A101 set.

---

## Open for Antti

- The scar slot in `practice-of-risk.md`. One first-person incident, his own, per the spec now in
  that file's maintainer block. Until it lands, M4's door-you-don't-open stance is defended by
  mechanism and by the new break passage, not by a scar.
- `check_writing.md §21` sits close to *"Every door you close is a source you won't read."* The
  superlative is true of read-access doors and loosens on a write-access door, which is not a
  source. The line is carried verbatim because the blend names it twice as required text and the
  two sentences after it scope the claim to what the closing costs. Worth one call at the next
  line-read: keep it, or drop *every*.

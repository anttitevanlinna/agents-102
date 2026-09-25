# Implemented: A101 M5 + M6 (2026-09-23)

Executes `blend.md` § Titles M5 and M6, § Stance (*You haven't checked the judge yet*), § Learnings
B and C. Drafted lines come from `braid-the-anatomy.md` § 5 and `control-and-creativity.md` § 1 and
§ 5. Seven files touched, nothing outside the group. Slide-size gate green on all of them.

---

## `curriculum/lectures/grounded.md`

**Headers now present** (10 `##`, deck order):

1. `## There is truth out there`
2. `## Mostly right, ten times over, is mostly wrong`
3. `## A test-and-fix loop collapses the error rate`
4. `## "Are you sure?" is another fluent answer`
5. `## Don't pick a method. Run the candidates.`
6. `## Four candidates that fail differently`
7. `## You have done this before`
8. `## The judge names its own limit`
9. `## In the full agent picture, this is the check`
10. `## A drift signal, never proof`

**Lines added**

- Slide 4 opener: *"When something comes back and you can't tell whether it is grounded, the cheap
  move is to ask the agent. Are you sure? Check that again. What comes back is another answer from
  the same place the first one came from, in the same confident voice."*
- Slide 7 opener (learning C's M5 beat, control § 5 L3, backward only): *"Three stances, one
  framework. Four detectors, one scoreboard. You make more candidates than you need, and then
  something picks between them on evidence rather than on whichever one sounded best."*
- Slide 10, the absorbed self-consistency beat: *"Run the same briefing twice from the same sources
  and you can ask a different question: what stays stable, and what drifts?"* / *"That is worth
  knowing, and it is not the check you are about to build. A claim can be stable and still
  unsupported, if both runs repeat the same assumption. A claim can be grounded and still come out
  phrased differently each time. Drift is a warning signal, never proof of fabrication."* /
  *"Two runs is a demo, not a measurement. With two, a claim that appears in both could be the
  model's pull toward a popular framing, and a claim that drifts could be an edge case in the next
  sample. The signal firms up somewhere around five to ten runs. A production check wants twenty or
  thirty."*

**Lines cut**

- *"After revision, source triangulation, entailment, and citation integrity came back clean.
  Counter-evidence still found the CNBC-vs-court-record conflict on the $5,000 sanction, and the
  revised story followed the primary court record. A later rerun caught one more smoothing the
  earlier passes had walked past. That is the loop: check, tighten, rerun, keep the remaining
  uncertainty visible."* — the paragraph's subject is this file's own revision passes
  (`check_student_facing.md` §33 subject test; the deletion test joins cleanly). The cut also buys
  the room slide 7 needs.
- The bolded lead-ins it replaced: `**Why this happens, in one sentence.**`, `**The compound
  reliability math.**`, `**Now flip the math.**`, `**The word is grounded.**`, `**Don't pick a
  method. Run the candidates.**`, `**What this buys you.**` — headers now carry them, and a bolded
  lead sentence is what `check_slides.md` §9 bans.
- From the refrain line, the duplicated clause *"In the full agent picture, this is the check."*,
  which the header now states.

**Backing block** — `mata-detector-rerun` claim removed (its quoted body text is gone);
`the-word-is-grounded` re-quoted against surviving text; `mata-detector-passes` source description
restated against the slide that now carries the pass. `**Length:**` note no longer states a word
count (`feedback_do_not_write_counts`), and names the command that regenerates the check.

**Slide-size check**

```
204  A drift signal, never proof            173  There is truth out there
169  Mostly right, ten times over...        164  You have done this before
162  Four candidates that fail differently  157  A test-and-fix loop collapses the error rate
149  "Are you sure?" is another fluent...   121  Don't pick a method. Run the candidates.
120  The judge names its own limit           77  In the full agent picture, this is the check
files: 1   slides: 10   oversized: 0   ✓ every slide is within limits
```

**Declined**

- *Eight headers.* The deck carries ten. `check_lectures.md` §5 requires a split at a conceptual
  seam when a chunk is over the cap: the compound-reliability pair is 326 words in one slide, so
  the flip half runs as `## A test-and-fix loop collapses the error rate`, and the
  intuition-versus-empirical beat runs as `## Don't pick a method. Run the candidates.` rather than
  pushing `## Four candidates that fail differently` to 280. Cutting either half instead would have
  taken out the rescue mechanism the M5 mood contract turns on.
- *`## This is the check`* ships as `## In the full agent picture, this is the check`. The short
  form is a demonstrative with nothing on the slide to bind it (`check_slides.md` §1, §6, header
  self-carries at projection distance). The full refrain is the corpus's own construction.
- The four bolded detector labels on slide 6 stay. They are a scanned list, not prose, and each is
  inside the handle cap (`check_slides.md` §9, menu-slide waiver).

---

## `curriculum/trainings/agents-101/output-quality.md`

**Headers now present:** Big Idea · Prework · What You'll Learn · Start here · Debrief · Notice what
the prompt insists on · Push back on the summary · **Propose, double-check, apply** · **Which rung
has this action earned?** · Key Concepts · Pre-reads before Module 6 · Next.

**Lines added** — § Start here: *"Module 3 named text as the place where action starts."*

**Lines cut**

- *"Remember also that agent actions start as text. A tool call, an email draft, a CRM update, a
  database change, a ticket comment, before any of those touch another system, they are words the
  agent produced and another system obeys. If the words are wrong, the action will be wrong too."*
  (blend § Keep and cut item 1; the M3 opener keeps the paragraph).
- The link line `[Lecture: Self-consistency after the scoreboard](lectures/self-consistency-after-scoreboard.md)`.

**Renamed** — `## Agent Actions` → `## Propose, double-check, apply` (`check_student_facing.md` §17,
student's verb where the section is about doing; not a canonical module-shape section name, so the
carve-out does not reach it). The trainer Meta transitions row now names the new heading.

**Slide-size check** — `files: 1 slides: 12 oversized: 0`. Largest: Key Concepts 210/6 (unchanged by
this pass), Start here 154, Which rung has this action earned? 102, Propose, double-check, apply 50.

---

## `curriculum/lectures/self-consistency-after-scoreboard.md`

Maintainer note only, no body edit. The stale `**Placement in module:**` line is replaced by
`**Unlinked (2026-09-23).**`, naming the `## A drift signal, never proof` slide in `grounded.md` as
the surviving beat, the three registered prompts as the reason the file stays on disk, and the
on-screen run after the benchmark as what a cohort with time still does.

---

## `curriculum/lectures/evals-as-steering.md`

**Headers now present:** `## Module 5 turned judgment into a judge` (kept) · `## Groundedness
protects the floor` · `## Steering raises the ceiling` · `## A yardstick you rewrite is not a
yardstick` · `## The answer is never "the eval passed"`.

**Lines added / cut** — none. Body prose untouched; the only structural change is the `##` before
*"A groundedness eval protects the floor"*, which the blend's five-header list requires and which
the prose already carried.

**Renames** — `## The second kind` → `## Steering raises the ceiling`; `## What you build now` →
`## A yardstick you rewrite is not a yardstick`; `## The question to hold` → `## The answer is never
"the eval passed"`.

**AE101 compatibility** — `trainings/agentic-engineering-101/run-the-first-experiment.md` names this
lecture in exactly one place, line 185, inside the Mollick source stamp: *"This is the module that
owns the check — `lectures/evals-as-steering.md` and `trainings/agents-101/evaluations.md` name the
same piece for Agents 101 and can delegate here."* No AE101 module links the lecture, includes it,
or cites a header of it; `grep -rn "evals-as-steering"` outside `module-design/` returns only that
stamp, eval instances, story-depth reports and the scanner's test fixture. `check-include-anchors.js`
and `check-cross-doc-anchors.js` both pass. Header renames are therefore invisible on the AE101 side.

**Slide-size check**

```
202  A yardstick you rewrite is not a yardstick     174  Steering raises the ceiling
 90  The answer is never "the eval passed"           81  Module 5 turned judgment into a judge
 46  Groundedness protects the floor
files: 1   slides: 5   oversized: 0   ✓ every slide is within limits
```

**Declined** — `## Will the bitter lesson apply here?`. The bitter-lesson question is the lecture's
opening prose (*"Maybe the bitter lesson applies to companies too... We are about to find out."*);
the closing section holds a different question (*"What would have to be true for this eval to be the
right one?"*) and ends on the human-role shift. A header asserts what its own body supports
(`check_lectures.md` §4 truth clause), so the closer takes the claim it actually argues. Putting the
bitter-lesson header over the opening prose would mean splitting chunk 0, which is more than the
rename budget this shared file was given.

---

## `curriculum/lectures/when-the-score-stops-moving.md`

**Headers now present:** `## A flat score is information about the judge` · `## You haven't checked
the judge yet` · `## If the model stops fabricating, what is your judge for?`

**Lines added**

- *"The judge has been scoring your work all the way through the loop. Nothing has been scoring the
  judge."*
- *"You have not checked it against yourself. Take a handful of outputs, score them by hand, and put
  your verdicts beside the judge's. Where it passed something you would have sent back, you have
  found what a flat line cannot show you: the judge and you do not agree as often as the number
  suggests."*
- *"That is an afternoon, not a project, and you do it once per judge you intend to trust."*
- *"Your judge catches claims that float free of the evidence. That job is real today, and it is
  also the job most likely to get cheaper. Every model release makes the floor cheaper to hold. No
  release so far has told anyone what good means in your company."*
- *"So carry the question rather than an answer. If the fabrication your judge was built for mostly
  stops arriving, what is left for it to check?"*

**Lines cut** — the maintainer block's opening *"Created 2026-06-06 in the M1–M6 tmux-runner fix pass
(finding C10). Not yet compendium-audited; owes a full pass at the next `/curriculum-pre-ship-audit`
(no Quality stamp until then)."* It is session biography (`check_writing.md` §3) and it contradicts
the Quality line at the foot of the same block. `**Time:**` moves from 4 to 6 minutes for the two
added slides.

**Slide-size check** — `files: 1 slides: 3 oversized: 0`; 181 / 95 / 92 words, `✓ within limits`.

**Note** — the counter-voice hands over a move (score a handful by hand and compare), per the mood
constraint; the future rung stays a question, since an answer there is a prediction.

---

## `curriculum/lectures/new-human-role-in-the-loop.md`

**Headers now present:** `## Would you let it send the mail?` (kept) · `## Two evals, two different
jobs` (kept) · `## Variety in, selection out, memory keeps` · `## The human moves one level up`
(renamed from `## The human does not disappear`) · `## Make the goal-nudger` (kept, prompt
untouched) · `## The better it gets, the less you watch` · `## When did you last read one
yourself?` · `## The full picture, and what it is made of`.

**Lines added**

- Naming beat: *"You have run this twice now without calling it anything. Something makes more than
  one candidate. Something else picks. What wins gets written down."* / *"The three stances and the
  four detectors were the generating half. The floor eval and the ceiling eval are the picking half.
  The loop runs all three stages while you are out of the room: the generator makes more than you
  need, the judge throws most of it away, the tactic file keeps what survived."* / *"So the two
  evals are not two instruments on a shelf. They are one mechanism seen at two zoom levels, and the
  floor is a stage inside it rather than a tool beside it."*
- Counter-voice: *"Here is the part that does not resolve."* / *"Every clean week is real evidence
  the loop is working, and real erosion of your ability to tell when it stops working. Those are the
  same weeks. Design the loop and never run one yourself, and you lose the eye that made you worth
  putting in charge of it, slowly enough that nothing announces it."*
- Governor, with the move attached: *"There is no instrument for this one. There is a question, and
  it has a date on it: when did you last read one of these yourself, start to finish, without the
  agent summarising it first?"* / *"If the answer is a month, put one in your calendar. Not a review
  of the loop. One piece of the work the loop produced, read the way the person receiving it will
  read it."*
- Closing slide: *"You added those parts one at a time, and each one was a single decision: what you
  give it, and what you keep back."*

**Lines moved** — the refrain paragraph *"At this point the full picture is visible: model, context,
tools, goal, loop, checks, boundary, interface..."* moves out of the opener and into the closing
slide, so the assembly is named after the last piece lands rather than before. The lecture's final
four lines (*"That is the new human role in the loop."* through *"one loop at a time."*) travel with
it, so the deck has one close, not two.

**Lines cut** — none beyond the move. The brief's *cut any line that answers or restates the
model-rotates question* found nothing to cut: the body carries no future echo, and the word `model`
appears only in the refrain's own list of parts.

**Slide-size check**

```
185  The human moves one level up       180  Would you let it send the mail?
139  Two evals, two different jobs      113  Variety in, selection out, memory keeps
101  The full picture, and what it is made of    71  When did you last read one yourself?
 63  Make the goal-nudger                63  The better it gets, the less you watch
files: 1   slides: 8   oversized: 0   ✓ every slide is within limits
```

**Declined** — cutting `## Make the goal-nudger` to reach the blend's seven. It holds the lecture's
prompt, and prompt blocks were out of scope for this tranche. The seven named beats are all present,
`## The full picture, and what it is made of` included, because size never forced the cut the blend
put first in the drop order.

---

## `curriculum/trainings/agents-101/evaluations.md`

**Lines cut** — § Run the loop without you in it, the second paragraph of the callout: *"Keep adding
connectors to your key systems. Combining insight across systems can surface relationships no single
system shows. Progress from you taking actions the agent proposes, to letting the agent take safe
actions itself. Stay safe. Start small. Then scale."* The first paragraph of the callout stays.

**Headers now present** — unchanged. **Slide-size check** — `files: 1 slides: 10 oversized: 0`,
largest Bring to Module 7 at 183.

---

## Open, for whoever holds the neighbouring files

- `curriculum/trainings/agents-101/trainer-modules.md` line 194 states the M5 flow as
  `Grounded → hallucination benchmark → self-consistency after the scoreboard → Debrief`. The
  self-consistency step is no longer linked from the module. Outside this group's file set;
  `check_writing.md` §3 wants the describing page fixed in the same commit.
- `curriculum/exercises/hallucination-bakeoff.md` line 179 carries a trainer watch-for about
  students treating self-consistency as proof. Still correct, now backed by a slide in `grounded.md`
  rather than by a linked lecture. No edit owed, named so the next sweep does not read it as orphan.
- Quality lines were not touched in any file; the per-class staleness scanner routes the re-eval.

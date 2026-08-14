# AE101 M4 frame — why the module is shaped this way

**Status:** idea, not a decision. No body edits proposed yet. Origin: session 2026-08-13, Antti-initiated.

**The want.** Students are never told why M4 and M5 are shaped as run-it-and-read-it rather than
here-is-the-method. The reason exists, is defensible, and currently reaches a student only by accident.

---

## Origin: the precedent is already shipped

Agents 101 M5, `exercises/hallucination-bakeoff.md`. Four detectors, one claim pool, a scoring agent,
a measured winner promoted to a judge file. Body states the principle outright:

- *"The move is empirical. You don't pick a detection method because somebody said so."* (L17)
- *"Method selection in agent quality work is empirical, not intuitive… You trust it because you ran a
  benchmark **on your own output** with your own reference and it won."* (L115)
- Maintainer block: *"Empirical method selection beats authority ('this method is best')."* (L135)

Antti's framing of why it was built that way: *"There was no way to state which is best nor say that use
this, it will always work."* Two separate claims in one sentence — **which is best** (nobody knows) and
**it will always work** (nothing does, everywhere). The second is the sharper one and was nearly lost.

**AE101 is the same spirit in a different seat.** Not the same shape — say "same spirit" carelessly and an
Agents 101 alum arrives in M5 hunting for four detectors and a precision column.

| | Agents 101 bakeoff | AE101 M4→M5 |
|---|---|---|
| Candidates | 4 published detection methods | 2 — you un-packaged, you packaged |
| Adjudicator | a 5th agent; student deliberately *not* the classifier | the student, holding three lenses |
| Evidence | precision / recall / coverage scoreboard | the diff and the transcript |

Same epistemics, opposite seat for the human. The seat is audience-driven: builder leaders read
scoreboards; engineer ICs do the reading themselves. Any framing sentence must survive that difference.

---

## Four candidate whys

**A — the field has not converged.** *State* claim. Evidence already in-corpus:
`lectures/learning-through-contrast.md` backing block, stance line — *"holds: nothing on compaction. A
four-lane sweep of eleven named practitioners on 2026-08-01 found zero convergence in either direction."*
Body carries one visible trace: *"No winning strategy here, and no percentage worth memorising."*

*Weakness:* A quietly promises an ending. If it is merely unsettled, someday it settles and the apparatus
was scaffolding for a gap. A rational student can wait it out. Register is apologetic — *sorry, no map yet.*

**B — therefore we shaped the module as run-and-read.** Pedagogy claim. **Derivative; do not write alone.**
Standing on its own it is the author admiring the lesson plan. Follows from A/C/D in a clause or not at all.

**C — the field keeps moving.** *Rate* claim (Antti, this session): plan files, verifier shapes, how memory
is constructed will all be different in months. Removes the ending A implies; converts apology into moat.
Same sentence as the house value prop at individual scale — *tools commoditize; organisational learning
rate is the ceiling.*

*Evidence must be past-tense, not promissory.* A rate prediction is falsifiable in front of the student and
takes the module's credibility with it if plan files look much the same next spring. The corpus already
holds the past-tense version, and it is stronger than A's: not eleven people disagreeing, but
**the same people reversing themselves inside the window** (all from `learning-through-contrast.md` backing):
- HumanLayer moved off 40%-of-usable-window to a flat 100k-token mark, *"For opus 1m this is only 10%."*
- Amp built handoff, then killed it: *"So handoff is out. Compaction is in."* — a team that shipped a
  feature to avoid compaction, then adopted compaction.
- Steinberger abandoned his restart-per-task habit.

**D — the answer is local, and you should not take ours even if we had one.** Two halves:

- *D-place.* A converged field still would not produce an answer for **this** repo. The verifier that wins
  on a Go service with a fast deterministic suite loses on the twelve-year-old Rails app with a flaky one.
  A and C are claims about time; D-place is about place, **and survives the field freezing solid.**
  It is the only why that cannot be falsified by events.
- *D-posture.* The capability being installed is refusing to take a method on authority — including ours.
  This is the only why that explains the **form**. A and C are perfectly well served by a lecture
  (*here is the menu, the field disagrees, pick one*). Only D makes running it necessary.

**Ordering.** A and C are about the field and about time; they are the perishable *evidence*.
D is about the student; it is the durable *claim*. A and C say we cannot tell you. D says you should not
want ours even if we could.

**E — the experiment got cheap** (weaker, keep on the table). Split-testing four methods on your own
material used to be a research project; the bakeoff does it in ~20 minutes of watching agents work. Not
withholding an answer — handing over something better, affordable only because the cost curve moved.
Reads as abundance rather than deficit, which lands differently in a room.

---

## The load-bearing claim

**The model holds the general. Local escapes it — for now.**

Consequences:

1. **The head-to-head is not a teaching technique. It is the only operation in the session that
   manufactures information the model does not already have.** Four detectors on your output scored against
   your reference produces a fact that exists nowhere in training data. Everything else in that session,
   however clever, is retrieval.
2. **The general-knowledge race is a Red Queen race and cannot be won.** Every laptop in the room contains
   a faster reader than the curriculum can be updated. Most AI training is selling a snapshot of a moving
   thing, which is why it is worthless within the quarter. The way to beat the model on general knowledge
   is to decline to enter.
3. **Better account of the human role than "stay in the loop."** The agent brings the general, you bring the
   local, the work is the join. Local evidence is the only input in the system the human uniquely supplies.
   Not a consolation prize — the scarce half.
4. **"For now" should be said out loud, because its expiry is our own roadmap.** Local escapes the model
   until the model gets your local, and getting your local into the agent *is* encoding — judge file, rules
   file, verifier. *"Local escapes it, for now"* and *"compound what you learned into something durable"*
   are one sentence pointed in opposite directions. M6 is the student closing their own gap deliberately
   instead of waiting for the platform to close it for them.

---

## Counter-view: local is not the scarce half

The load-bearing claim may sit one abstraction too high.

1. **"The model holds the general" is positioning, not a literal account.** Models have gaps, and useful
   work beyond the experiment is not merely retrieval. The lectures curate attention, install shared
   vocabulary, sequence durable priors, and make the student's evidence legible. The training does not
   need to beat the model at storing facts, but neither can it dismiss everything outside the head-to-head
   as reading.
2. **Local does not escape the agent once the agent can inspect it.** M5 says this directly: *"You hold the
   three lenses. You are not holding the codebase. The agent reads that for you."* The unavailable fact is
   narrower: which method works for this task, in this codebase, under these consequences, does not exist
   until the test runs. The experiment creates the evidence; locality alone does not.
3. **The human does not uniquely supply local evidence.** The repo, transcript, tests and verifier all
   produce it, and the agent can read them. The human supplies the evaluation authority: what counts, which
   failure cost most, which trade-off is acceptable, and whether the result deserves to become a rule.
   That is the decision M5 deliberately keeps with the student.
4. **E is not the weaker why.** D explains why the answer must be derived here. E explains why deriving it
   during a training is now affordable. C explains why the derivation must repeat. A is the current example,
   not the foundation. Without cheap experiments, locality is only a warning; with them, it becomes a skill.

Alternative load-bearing claim:

**General methods are cheap and perishable. The locally valid answer does not exist until the system runs
the test. Agents make producing evidence cheap; human judgement determines what the result means; encoding
makes the learning durable.**

The moat is not local knowledge. It is the rate at which a person or team produces, judges and encodes local
evidence. On this reading M4→M6 already carries the whole argument: M4 creates evidence, M5 interprets it,
M6 encodes it. If the idea reaches body, name that operating rule after the contrast earns it. Do not explain
the lesson plan to the student.

## Do not let precision turn into retreat

The counter-view corrects the mechanism. It is not a reason to weaken the student-facing thesis.

This audience already sees the capability curve. Engineers do not need a cautious lesson that methods change
or that context matters. They know both. Replacing the Red Queen claim with *"current patterns are starting
hypotheses"* tells them less than they arrived knowing, and it removes the reason the M4→M6 sequence exists.

The full-strength claim:

> **Anything general this training can tell you, the LLM already knows or soon will. What it cannot know yet
> is what works in your codebase, with your task, your constraints and your standards. That knowledge has to
> be produced locally.**

This is directional, not a claim of literal model omniscience. Keep the causal pieces separate:

1. **Capability growth makes general knowledge cheap.** The model can retrieve and combine the published
   methods faster than a curriculum can restamp them.
2. **Capability growth also makes local experiments cheap.** A comparison that once cost a research project
   can run while the engineer watches the sessions work.
3. **Tool and method churn makes specific recipes perishable.** Growth changes the economics; churn creates
   the expiry. Do not bundle those into one causal claim.
4. **The missing result cannot be retrieved.** An agent can read the repo, transcript and tests. It cannot
   retrieve the outcome of an experiment nobody has run. General methods narrow the candidates; the local
   comparison decides which deserve encoding.
5. **Human judgement remains the authority.** The agent helps produce and read the evidence. The engineer
   decides what counts, which failure mattered, which trade-off is acceptable and what earns promotion into
   the system.

That account explains the sequence without turning it into a lesson-plan apology:

- **M4 creates the baseline.** The system leaves as it stands, before a general recipe is installed.
- **M5 creates and interprets the comparison.** The second session changes the package. Only now does the
  locally grounded answer exist, and even then it is a provisional next rule rather than a universal winner.
- **M6 encodes what deserves to survive.** The result moves into rules, verifiers and skills so the next
  session inherits the learning. When conditions change, the same loop can run again.

### Student dosage

The thesis needs one full weighted home, with two short bookends:

- **Before the M4 send-off, disclose the reason for the baseline without revealing the package:**
  *"The general playbook is already in the model. What works here is not. Send the system you have; this
  first session creates the baseline."*
- **After the M5 comparison, name what happened at full strength:**
  *"The model arrived knowing the general methods. Neither the model nor this training knew which ones this
  task needed. The two sessions produced evidence neither could have given you beforehand."*
- **At M6, echo the rate claim:**
  *"The frontier keeps moving. Your advantage is the rate at which you test, judge and encode what works
  here."*

**The strongest counterargument is to cut the M4 line entirely.** A meta-frame is strongest after enactment,
and pre-disclosure can invite the student to hedge or pre-package the baseline. This objection sets the
survival test for the M4 sentence. It must push toward sending the system as it stands. It must not name
reference, plan.md or verifier; explain what M5 will find; or imply that the student should customise
anything before the first session. The current M4 opener already says the un-packaged contrast is
deliberate. A world-facing reason can replace that weaker lesson-plan explanation without adding another
beat.

**Endorsed (Fable re-read 2026-08-13), with two consequences the counter-view earns.** (1) The
evidence-does-not-exist-until-the-run form is immune to the falsification that worried the original claim:
a model ingesting the student's repo closes the *local-knowledge* gap but cannot retrieve the outcome of an
experiment nobody ran. "For now" stops being a hedge on the moat and becomes a statement about encoding.
(2) It answers collision (d) directly: *the run manufactures the evidence* pushes toward sending it,
where *the field has no answer* pushed toward hedging.

**Where this leaves the M4 move: narrow swap, with cut as the fallback.** The full operating rule still earns
its name after the contrast. M4 gets only the world-facing reason to run the baseline, replacing the
unsourceable retention sentence (*"No generic long-running-agent advice lands the way…"*). It must push the
student toward sending the system as it stands, without naming the package or predicting the diagnosis.
If a persona read shows that even the narrow sentence invites hedging or pre-packaging, cut it and let
*"The contrast is the lesson. Un-packaged first is by design."* stand. M5 remains the weighted home either
way.

---

## The aha — what the student gets

**Approved direction (Antti 2026-08-13): the two-halves formulation.** This section renders the
counter-view's alternative claim in the student's voice; it is the frame's student-facing payload. The
taxonomy (A–E) is authoring apparatus — nobody carries five lettered claims out of a training. The student
carries one inversion, felt once, sayable to a colleague afterwards:

> *"The reason nobody could tell me the best way isn't that the field is young — it's that the question
> doesn't have a general answer. And the answer it does have, for my repo, costs twenty minutes and my
> agent runs the experiment for me. I've been queuing at an oracle when I own a lab."*

**The belief it inverts.** The audience's operating epistemology: *somewhere out there, people have figured
out how to do this properly; my job is to find it and keep up.* That is how engineers acquire craft
practice — editor setups, git workflows: lore, adopted on authority — and right now it carries a painful
edge, because the lore churns monthly and every engineer in the room privately feels behind.

**Half one — the field cannot converge, and that is diagnostic, not disappointing.** The churn (A) and the
reversals (C) are not immaturity. A field of locally true answers looks exactly like this from the outside:
every blog post is correct, about its author's repo (D-place). Convergence is not late; it is structurally
impossible, because the question is local. Once seen, the churn stops generating anxiety — you cannot be
behind in a race that was never the job.

**Half two — the question they asked outward is answerable inward, cheaply.** Why this class of question
stayed lore: the experiment was too expensive. Nobody benchmarks editor configs; you would have to live in
each one for a month. An agent setup tests in an afternoon — same task, two conditions, the agent runs it
and the agent reads the transcript (E). Asking your own repo is now faster than asking the internet. A
class of question that was always settled by fashion is suddenly settled by measurement, and almost nobody
has noticed.

**The feeling** (ahas are feelings before they are propositions): relief converting into agency. The
keeping-up anxiety dissolves, and what replaces it is a lab. The general is free — the agent carries it.
The local is manufacturable on demand. The only rate that matters is the student's own
produce → judge → encode loop — the house value prop at individual scale.

**Cash value, Monday.** The reflex changes, and the change is observable. Teammate asks *"what's the best
way to do X with agents?"* Pre-aha: hunt for the authoritative answer. Post-aha: shape the twenty-minute
experiment.

**What the aha is NOT** — each near-miss steals it:
- *"Packaging works."* An answer, general-shaped; the cheap reading (below).
- *"The field is immature."* Implies waiting fixes it; waiting is exactly wrong.
- *"Empiricism is good."* Already believed; the news is that it now applies to craft lore.
- *"The training was cleverly designed."* B. The moment the aha is about us, it is stolen.

**The got-it test (leap-test shape).** The student defends the path to a skeptic on their own team,
**unattributed**. Staff engineer: *"why did you run the same task twice instead of setting it up
properly?"* — *"the course does it that way"* = not got. *"Nobody could have told me what proper is — the
answer for our codebase didn't exist until I produced it"* = got. A, C, D and E all inside that sentence,
load-bearing and invisible; B correctly vanished.

**Why students will not get it as-is — the enactment is ambiguous, and the cheap reading is the
anti-lesson.** Three stacked reasons (Antti's fear, substantiated):

1. **No body home.** Nine fragments at ~85% median depth, each in local costume (compaction, skills,
   plans). Nobody assembles a law from scattered caveats.
2. **The M4/M5 experiment supports two readings, and the cheap one wins by default.** Reading 1:
   *un-packaged failed, packaged worked → use plan files* — a general lesson, freshly minted from the
   student's own data; imported best practice wearing a lab coat. Reading 2: *which failures my task
   produces, and which pieces catch them, did not exist until I ran it.* The headline ("packaged wins")
   replicates across every student and every repo, and uniform results read as universal truths. The
   bakeoff avoids this structurally: four detectors calibrated to a tight race → neighbours crown
   different winners → the room itself disproves "method X is best." AE101's variance lives in the details
   (which lens dominated, which gaps ranked top) and stays private to each laptop.
3. **M5's payoff beat pays in general coin.** The kit handover — *"Each piece turns up on its own across
   practitioner write-ups. This training combined them into one kit and gave them names"* — reads as: here,
   after all, IS the settled, practitioner-converged answer. The trophy moment says the thing D forbids.
   The frame is not merely unstated; it is contradicted by the reward structure at the exact moment
   recognition should fire.

Levers, in rough leverage order — named here, deliberately not designed yet:
- **Surface the room's variance.** The cohort's unique resource; the spread of gap-lists across the room IS
  the proof of locality, the way the bakeoff's divergent winners were.
- **Reframe the kit handover by one clause.** The menu you now know how to audition, not the answer you now
  own.
- **Make the naming sentence contrastive, not celebratory.** Not "packaging works" (already believed;
  Reading 1) but the thing only Reading 2 contains: *your neighbour ran the same experiment and needs a
  different kit.*

---

## The floor — what does not move

Told without a floor, C is nihilism with an invoice: everything specific you paid for expires. The bakeoff
solves this without arguing it, by naming the durable thing out loud (*candidates → benchmark → scorer →
winner*, *"portable to every quality judgment you'll ever automate"*), so the perishable parts being
perishable does not sting.

**Artefacts churn; physics does not.** Stable for years: files on disk survive and conversations do not;
a fuller window produces a worse answer, not merely a slower one; write it down or lose it.

That split is the single most useful thing to hand a student — it says what to memorise and what to
re-derive. **We already encode it mechanically:** `due:cohort` vs `due:none` in the backing blocks is
exactly the perishable/durable line. The curriculum knows which of its claims expire. The student does not.

---

## The distribution bug (strongest argument for acting at all)

The explanation is already written — **as a trainer note.** `lectures/learning-through-contrast.md`
delivery watch-fors: *"'So what number should I use?' will be asked, and the answer does not fit on the
slide. Give it in the room: there isn't one, and the reason is that a percentage stopped being a meaningful
unit."*

So today the why reaches a student only if they ask the question out loud, in a room, with a trainer who
remembers. Self-study students never get it. Quiet students never get it. Everyone else concludes the
material is vague. The receipts sit one layer further down still, in a `<!-- backing -->` block — the one
place in the corpus guaranteed never to reach a student.

We are not deciding whether to make a claim. We are deciding whether to stop hiding one we have already
made, sourced, and scripted.

---

## The prior already exists and is orphaned

`pre-cohort-todos.md` buried-gold item #6: two of the three soil-line priors survive only as 13.5px italic
SVG caption microtext under `lectures/the-whole-map.md`'s engine map — *"act under uncertainty · competence
is the gate · a move counts when it crosses the wall"* — and the derived M3/M6 map copies drop the strip.
Only the third clause ever gets a weighted home.

**"Act under uncertainty" is the law D lives under.** Already identified as the arc's substrate, already
written, never spoken on a slide. So the floor is not missing. It is furniture.

Open reframe: is this a new claim at all, or is it *act under uncertainty* finally getting a weighted home,
with M4/M5 as the beat that earns it?

---

## Debts this creates

- **It bills the lectures.** A training whose thesis is *the general is free and current from your agent*
  ships 26 in-deck lectures of general claims. There is a good answer — they are shared vocabulary and the
  priors that make local findings legible, and you cannot ask for what you cannot name — but that answer
  must be **true of the lectures as actually written**. Audit running 2026-08-13.
- **Every number we hand out must justify itself.** The ten-nudge ceiling especially
  (*"past ten or so, you've become the agent"*, now in `exercises/set-the-markers-send-it-off.md`) is an
  operational number in a domain we would have just declared numberless. Fine, but then we owe the student
  one line on when a number is worth having anyway.
- **"We deliberately don't tell you things you could ask Claude" is also what a thin course says.** The
  defence is not rhetorical, it is the artefact: the student leaves holding a measured result and a file
  they built — proof they know something nobody told them. The claim is only safe standing next to the
  evidence it produced.
- **Cross-training reference is unavailable.** AE101 students are engineer ICs and mostly have not done
  Agents 101. The frame must stand alone; it cannot be stated by pointing at the bakeoff.

---

## Corpus audit, 2026-08-13 — what the lectures actually are

26 in-deck lectures, 15,226 body words, 357 backing claims counted independently (26/26 ratios reproduce).

**The thesis survives contact.** 18 of 26 lectures (69%), 11,443 of 15,226 words (75%), are primarily
vocabulary/stance rather than general transfer. Pessimistic bound, flipping the two contested calls: 61%.
Measured as substitutable *passages* rather than files: ~3,200 words, **~21% of the deck**, concentrated in
about ten passages. **This is not a pivot. It is a name for what the deck already does.**

**The skew is at the front, and it is not M4.** General-transfer word share by module:

| M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|
| **61.6%** | 26.0% | 0% | 34.5% | 47.5% | 0% |

M1 forms the first impression and is 62% general transfer (`the-wizard-move` teaching in-context
conditioning — not even agentic-engineering-specific; `the-machine-you-just-met` teaching two-stage
training and sycophancy). Auditor's line: *the module where the training has to demonstrate it holds
something a chat window doesn't is the module most easily reproduced by a chat window.* M6 is the mirror —
4,860 words, 32% of the corpus, **zero** general-transfer — and the student reaches it after they have
already decided whether the training was worth buying.

**Placement behaviour already answers the C-late / D-early question empirically.** Nine body-prose
statements of the frame exist. Split by shape, by depth-into-file:

- *Shape (i), "the field hasn't settled this"* (= **C**): 96%, 95%, 80%. Median ~90%.
- *Shape (ii), "your material decides"* (= **D-place**): 30%, 47%, 49%, 55%, 89%. Median ~49%.
- *Shape (iii), question left open*: 99%, 90%.

**The corpus already places locality claims roughly twice as early as unsettledness claims**, without
anyone having decided to. The single earliest hit in the whole deck is the cleanest statement of the thesis
anywhere in AE101 — `skills-from-the-frontier.md:12` (M3, 30% depth): *"a good test strategy depends on
which framework you use, where the flaky tests actually fail… **Nobody outside your team can write that
skill well. Curating it would be theatre.**"*

**APPARATUS = 0 primary, across 26 lectures.** If what escapes the model is local evidence, the class
whose job is *manufacturing* local evidence has no primary representation in the deck at all. The lectures
name and commit; they do not teach method. Probably correct division of labour (exercises generate,
lectures name) — but it should be a stated choice rather than an accident.

**~~The thesis is already biting the house~~ — RETRACTED on verification (Fable re-read 2026-08-13).**
The audit claimed `skills-from-the-frontier.md` ships a stale company name behind a held card. False: the
body at L17 already reads *"Fin (Intercom)"* (fixed in `54ac1a0`). What is actually stale is the **Flagged
entry at L112**, which still quotes the pre-fix body (*"the body currently reads 'Intercom's 267-skill
plugin repo'"*) and still routes a card for an edit that already landed. The auditor trusted the maintainer
note over the prose it describes — the stale-evidence failure `memory` already names (*identical evidence
on a changed file = cached, not a verdict*). Real finding, one tier down: clear the dead Flagged entry, and
treat every audit claim of the form "file X currently says Y" as unverified until read — the one such claim
elevated to a headline failed checking.

**Instrument caveat, recorded so a later cycle does not over-trust it.** The `← none-owed` ratio is a
*vocabulary* detector, not a substitutability detector. Mean none-owed share: VOCABULARY .71, STANCE .58,
GENERAL_TRANSFER .50 — stance sits 8 points from general transfer. `the-gate-is-a-claim` is 2 sourced / 19
none-owed and is the corpus's #2 substitution risk, because Goodhart, Deming and regression-to-the-mean are
house-phrased restatements of textbook measurement theory. **None-owed ≠ non-substitutable.**

**Proposed fifth class: LOCAL_TESTIMONY.** `how-this-training-was-built` + `story-of-module-6` (1,830w, 12%
of corpus) are first-person reports of internal results — not held positions, not naming, not method. They
landed in STANCE by elimination, inflating a column labelled "the author's judgement" with what is actually
testimony. They are the two least substitutable files in the deck. The house already treats them as a
separate genre: `check_lectures.md §5` exempts both **by name** from the slide-size gate.

## What a start-of-M4 disclosure collides with

Eight collisions found. The three that survive scrutiny against the narrow swap proposed below:

- **(d) package pre-empt is M4's dominant named failure mode.** A front-loaded *"we can't give you a
  settled answer"* reads as licence to hedge — the literal shape of the failure the module exists to
  prevent. **The sharpest objection.** Any line must push toward *go get the data*, never toward *build
  something custom before you send it.*
- **(a) performance anxiety** is the named drift to watch for before the student has acted; a disclosure at
  the very open is the shape most likely to manufacture it.
- **(g) never a corrective gap** — the training naming its own limitation sits in the same failure family
  as naming the student's.

**Rebutted:** (c) and (e) apply to `the-far-half.md`, not to `test-and-learn.md`, which is where the swap
lands and which has headroom. (f) and (h) assume the beat is being *added* — it is not. The pedagogy is
**already** narrated at M4's open (*"The contrast is the lesson… Un-packaged first is by design"*). Under
(h)'s own logic the sentence currently shipping is the violation, and the swap reduces the
pedagogy-narration by replacing a claim about our lesson plan with a claim about the world.

## The finding that reframes the whole thing

`test-and-learn.md` already carries the disclosure at M4's open, in its weakest form. It gives **B** —
*"No generic long-running-agent advice lands the way you just watched this fail… lands"* — a claim about
**retention**, not about **truth**. It says *we could have told you, but you wouldn't have felt it.*

**And the corpus already knows B is the unsourceable one.** The Frameworks entry records
Productive Failure / contrasting cases (Kapur; Schwartz & Bransford) as **"borrow considered and DECLINED
2026-08-01"** — Kapur's limitations section restricts the finding to *"ontologically direct"* domains and
calls extension *"problematic"*; the Sinha & Kapur meta-analysis reports the effect **reversing** for
domain-general skills. The note closes: *"This entry exists to stop a later cycle adding Kapur as a helpful
improvement."*

Meanwhile A and C are sourced to the hilt one module later, in `learning-through-contrast.md`'s backing
block, where no student reaches them. **The claim we cannot stand behind is in the body; the claim we can
prove is in a comment block.** That is the argument for the swap, and it is much stronger than a
placement preference.

## Open decisions

**Settled in direction (Antti 2026-08-13):** students need the frame — the failure mode without it is the
audience's default behaviour (import the general), and by the frame's own churn claim it is the only
durable thing the training sells. Dosage: **one full weighted home after the contrast, with a one-sentence
M4 disclosure and a one-sentence M6 echo. Everything else stays enacted, not explained.** The
student-facing payload is the aha (§ above), not the taxonomy. What the frame must defeat is the cheap
reading (§ *Why students will not get it as-is*).

Still open:

1. **The exact weighted home inside M5.** The student must hold the comparison before the full claim lands.
   Candidate surfaces: the closing lecture after the package is built, the kit handover, or a new recognition
   beat immediately after the two-session read. The M4 sentence remains a disclosure, not the weighted home.
2. **Which levers fire against the cheap reading, and how many.** Room-variance beat (biggest, trainer
   surface), kit-handover clause (cheapest, likely carries most load), contrastive naming sentence. The
   variance beat needs a solo/self-read fallback — the workbook is also read alone.
3. **Does the floor get named,** or does naming it soften C into something comfortable?
4. **How much maintenance machinery becomes visible?** A training that says *the field moves* while
   visibly running dated source stamps against a cohort date makes the argument twice. Almost nobody can
   make that second argument. Also: the reference file currently 3x past its own staleness bar is either an
   embarrassment or the most honest possible exhibit, depending on whether we say it out loud.

## Gates if this ever becomes body text

Student-facing body edits — `check_student_facing.md` §22/§26 approval gate applies. Card BEFORE/AFTER/
WHY/RISK, one at a time. Mood-contract check first: M4/M5 carry deliberate residual uncertainty
(`hallucination-bakeoff.md` precedent — *"do NOT resolve M3's strategic uncertainty or M4's security
residual"*); a framing statement that defuses the discomfort steals the beat it explains.

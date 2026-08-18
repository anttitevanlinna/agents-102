# Autumn track, gaps and seams

<!-- maintainer -->

Maintainer-facing. Not student material, not listed in the registry, not rendered into any workbook.

The autumn track ships **plain, unmodified AE101 modules 1, 2, 4 and 5**, in that order, as four
sittings. AE101 module 3 (*Earn the trust*) is dropped. AE101 module 6 (*Spot gaps, build the loop*)
becomes a customer-authored workshop. Workshops slot between the sittings and are the customer's to
design.

Going back to originals authored for six modules and a 1h45 envelope cannot be lossless. This document
is the inventory of everywhere it pinches. **Nothing here is fixed.** Each entry is left visibly open,
because a run that quietly repairs a gap produces material that looks finished, is not, and hides the
cost from whoever prices the next phase.

Two things to read it against:

- **No AE101 original was edited to produce this cut.** Where an entry says a surviving file asserts
  something untrue, the file is correct as authored for AE101 and wrong only for this track.
- **Thirteen files were deleted** to get here: five autumn module files, an autumn prework page, four
  forked exercises, one forked lecture, and two workshop exercises. **They are not recoverable from this
  repo's history.** The commits that added them and the commit that removed them are squashed into one
  before anything is pushed, deliberately: the workshop material is the customer's IPR under the
  ownership split, and squashing keeps it out of public history at no cost, because none of it was ever
  pushed. So where an entry below says *the fork had solved this*, read it as a description of a solved
  problem, not as a pointer to a retrievable file. Anything worth keeping had to be carried into this
  document in full, and where it was not, closing the gap means authoring it again.

Deleted shared-library artefacts are named by slug rather than by path below. The content-tarball
builder seeds its link-reachability walk from every markdown file at the training-directory root
(`scripts/build-ae101-content-tarball.sh:78`), so a path written in full here would be harvested as a
missing link and warned about on every build. Gap 22 records the underlying behaviour.

---

# § Gaps

Twenty-six entries. Entries 1 to 22 are ordered by what someone pricing the next phase should read
first: the delivery shape, then the student's first surface, then the arc, then the take-home material.
Entries 23 to 25 are the unmet seams, logged here as well because a contract with no producing side is
also a gap, and a reader pricing from this section alone should not have to find them in § *Seams*.
Entry 26 is the one an adversarial judge found in this document rather than in the curriculum.

---

## 1. The revert un-compresses. 10h30 becomes 13h, and all of the growth lands on Bosser

**The track needs.** A sitting shape that fits the slots the customer books: 2h / 3h / 1h / 1h30 / 3h.
The autumn module files were authored to exactly that. `autumn-compounding` stated the reason in one
line: it took *"AE101 M1 (Getting going + context) and M2 (Plan mode, done right), 3h30 of authored
material, into a 2h slot."*

**Plain AE101 does.** Four modules, each authored to a ~1h45 envelope, with no module-level guidance
for fitting a shorter slot. A sweep of all four surviving files for prepared-cut language returns one
hit, and it is phase-level rather than module-level (`run-the-first-experiment.md:154`, *"Phase 2 runs
long (>40 min) … compress the Phase 3 settle beat if needed"*). The fork carried the module-level
version, including a cut order — the walk-down shortens before the read, and the read shortens before
the compound loses a minute. That guidance goes with the file.

**The arithmetic, in full.** Each length read from its own file rather than assumed.

```
Briefs' shape (the deleted files, as authored)
  autumn-compounding                2h00
  autumn-ai-readiness               3h00
  autumn-run-the-first-experiment   1h00
  autumn-learn-from-the-test        1h30
  autumn-build-your-loop            3h00
                                  ------
                                   10h30

Final cut
  getting-going                     1h45   (+ ~15 min take-home, close-the-ticket, outside the slot)
  plan-mode-done-right              1h45
  run-the-first-experiment          1h45
  learn-from-the-test               1h45
                                  ------
  4 x AE101                       = 7h00   Bosser-delivered
  2 x 3h customer workshops       = 6h00   customer-authored
                                  ------
                                   13h00

Deltas
  total room time      10h30 -> 13h00    +2h30   (+24%)
  Bosser-delivered      4h30 ->  7h00    +2h30   (+56%)
  customer workshops    6h00 ->  6h00    unchanged
  calendar slots            5 ->     6
```

Going back to originals does not merely lose the compression. It **un-compresses**: the fusion existed
precisely because 1h45 modules do not fit this slot shape. Every added minute lands on the half Bosser
staffs and bills, which grows by more than half again, and sitting 1 alone splits into two.

One note on the grain of the number: the per-beat sums across the four files run 97–104 minutes, so
1h45 is a rounded envelope with buffer folded in, not a floor. Plan against 1h45; do not treat the
spare minutes as slack.

**In the room.** A trainer handed a 2h slot opens `getting-going.md`, finds 1h45 of material plus a
take-home and no instruction on what to stretch, and improvises the fit live. The deleted file named
which beat was the cut and which three were spine.

**Who could close it.** Maintainer with the customer's calendar owner. This is a scheduling and
commercial re-negotiation (six slots, 13h), not an authoring fix. The four AE101 files are correct as
authored; they are authored to a different slot shape than this customer books.

> Accepted by the maintainer 2026-07-28 as the expected runtime. Recorded, not argued. The 13h assumes
> two workshops; a domain-brain workshop, if a domain elects one, is additional.

---

## 2. Page one tells the student they are on a six-module training

**The track needs.** A first surface describing four sittings and the task sizes this cut actually
consumes.

**Plain AE101 does.** `prework.md:11` — *"Across six modules you'll work at four task sizes, bring
something at each size from your backlog."* Then four bullets, one per module, Modules 1 through
4-onward. `getting-going.md:10` repeats it on the first page of sitting 1: *"You'll stay in this one
repo across all six modules."*

The task sizes then land on the wrong sittings. `prework.md:15` assigns *a small feature* to Module 3,
which is dropped. The workbook renderer numbers modules by position in the training's own array, so in
a four-module track the hero above `run-the-first-experiment` reads **03** while its body prose calls
itself Module 4, and the hero above `learn-from-the-test` reads **04** against a body that says
Module 5.

**In the room.** The student's first paragraph of the training, read at home before anyone can correct
it, describes a route they are not on. They budget for six sittings and source four backlog items, two
of which are dead. The trainer's first act on day one is a correction to the page the student was told
to trust, which is the authority that page exists to establish.

**Who could close it.** Maintainer, at the registry: restore a track-specific prework override, or make
`prework.md` § *What to bring* module-count-neutral. The second is a cross-training change — three
registry entries carry `contentKey: 'agentic-engineering-101'`, so an in-place edit reaches canonical
AE101 and the preview cut too.

---

## 3. Prework installs three security skills for the module this track drops

**The track needs.** A setup step that extracts the bundle and stops.

**Plain AE101 does.** `prework.md:18` announces *"The curated security skills install in Step 4."*
Step 4 is headed *"Extract the bundle and install the curated skills"*, and the registry prompt the
student pastes writes `access-control-analysis`, `stride` and `security-tools` into `~/.claude/skills/`
by name. The tarball script still whitelists all three.

**In the room.** The student approves permission prompts for writes outside their repo to install three
skills, and then never fires one. A grep of the four surviving module files returns zero invocations.
It is dead weight in a 30-minute setup, and it plants a durable expectation — *there is a security
module* — that the arc never pays off. `plan-mode-done-right.md:80` reinforces it at the close of
sitting 2 by telling the student to bring a feature to point the skills at.

**Who could close it.** Maintainer: a track-specific prework that omits the install, or an accepted
decision to ship the skills as unused reference material with a line saying so. The `SKILLS` array in
`scripts/build-ae101-content-tarball.sh` is the second half of the same decision.

**Closed 2026-07-28 — neither option, a third one.** This track ships no content tarball at all, so the
install step has nothing to install from and is flagged out of the shared prework
(`flags: { payload: false }`, § *Decisions* below). The `SKILLS` array is untouched, because AE101 still
issues the bundle and still sits M3.

---

## 4. The first prompt the student pastes announces "a six-module training" to their agent

**The track needs.** A setup prompt that does not put the wrong module count into the agent's context
on the student's first paste.

**Plain AE101 does.** `curriculum/prompts/ae101-prework-extract-and-install.md:28` opens its body with
*"I'm starting a six-module training called Agentic Engineering 101."* Registry prompt bodies render
inline into the workbook, so this is student-facing text, not maintainer metadata.

**In the room.** Distinct from gap 2, and harder to correct: this frame is in the student's clipboard
and in their agent's context window. When the student later asks their own Claude what the training
covers, the agent answers from the frame the student handed it. A wrong module count the student typed
themselves outranks a trainer's verbal correction.

**Who could close it.** Maintainer, via track-specific prompt keys. The deleted prework page had
already scoped four (`nw-prework-download-tarball`, `nw-prework-extract`, `nw-prework-screen-and-ready`,
`nw-prework-one-at-a-time`).

**Closed 2026-07-28, incidentally.** No track-specific prompt keys were needed. The offending prompt is
the *extract-and-install* one, which lives inside the step this track no longer runs, so it left with
the payload. Worth noting because it is the one gap that closed without anyone aiming at it: the six-
module frame was never in the prework's own prose, it was in a prompt the prose included. Verified by
rebuilding and reading the composed page: no registry prompt block in this variant now states a module
count. **Gap 2 is not closed by this** and the distinction matters — the *prose* still says *"Across six
modules"*, and the page's copy-block carries that prose, so a student who copies the page still hands
their agent the wrong count. What changed is that they no longer paste it as an instruction.

---

## 5. One click from page one, the no-repo student builds a codebase for six modules and seeds a feature for the dropped security module

**The track needs.** A fallback build for the student without a usable repo, sized to four sittings, not
planting material for a module that never runs.

**Plain AE101 does.** `prework.md:30` links `supplementary/build-a-project-from-zero.md`. That page says
*"The six modules grow it"*, carries a section headed *"Where the four task sizes come from"*, and
instructs the student to add a data surface because *"That surface is what Module 3 reads when you map
access control and run STRIDE against it."* It is linked from sitting 1 as well as prework.

**In the room.** This lands on the weakest student in the cohort, the one already doing the heaviest
prework. They spend extra unpaid time deliberately engineering an access-control surface so a STRIDE
exercise has material, and no STRIDE exercise exists. They also read the six-module frame a second time
from a page that reads as more detailed and therefore more authoritative.

**Who could close it.** Maintainer. The file is a shared supplementary inherited by all three AE101
variants, so an in-place edit is a three-variant change. A track-specific fallback or a variant marker
is the straight fix.

**Closed 2026-07-28 — neither, because the requirement itself was wrong.** Maintainer's call: change what
the page asks for rather than flag who it is asked of. The data-surface step survives, because a game
that only draws to a canvas has thin surface area and the later task sizes need somewhere real to land;
what goes is the *security justification* for it (*"that surface is what Module 3 reads when you map
access control and run STRIDE against it"*). A three-variant edit was the right answer once the ask
stopped being security-shaped, since no cut benefits from a student engineering an access-control
surface to feed an exercise.

The module labels went with it, here and in the prework's matching list. Four task sizes assigned to four
module numbers is a mapping that is wrong in this cut and brittle in every other; the sizes are
self-describing, and the ordering the student actually needs (*which do I want on day one*) is now
carried by *"roughly in the order you'll reach for them"* rather than by arithmetic.

---

## 6. The four sittings call themselves by their AE101 numbers, and the student types one of them

**The track needs.** A sitting 3 of 4 that does not tell the student they are at module 4 of 6, and does
not claim they have built across four modules when they have sat two.

**Plain AE101 does.** `walk-and-send-off.md:5` names the session *"Module 4 - Run the first
experiment"*; `:10` has the student type `/rename m4-walk-send`; `:15` instructs *"Walk what you've
built across four modules against it"*; the branch is pinned as `m4/<slug>`. Across the four surviving
module files, AE101 module numbers appear in body prose dozens of times. `plan-mode-done-right.md`
alone names the dropped Module 3 on seven lines: four in student-facing body (76, 78, 80, 82) and three
in the maintainer block (103, 146, 147), which the workbook build strips. Price the four.

**In the room.** The student types `m4-walk-send` at the third sitting and commits to a branch called
`m4/…`, then reads that they should walk four modules' worth of system when they have two AE101 modules
and some workshops behind them. The audit subagent is briefed against a system that does not exist, and
students whose audit comes back thin read it as their own failure rather than as the correct result for
two sittings — which is the exact mood drift the module's trainer notes already flag as the dominant
risk.

**Who could close it.** Maintainer only, and as one coordinated edit: the `m4/<slug>` prefix is matched
by name at sitting 4's worktree fork, so renaming it means editing `learn-from-the-test.md` and
`ae101-m5-worktree-setup` in the same pass. A trainer cannot paper over a slug the student types.

**Split 2026-07-28: the count claim fixed, the slug namespace accepted.**

The half that was doing real harm is gone. *"Walk what you've built across four modules against it"* is
now *"walk what you've built so far against it"*, in the exercise body and in its `**What happened:**`
recap. That line was the one the gap's own room-analysis flagged as costly: a student whose audit comes
back thin reads it as personal failure rather than as the correct result for the sittings they have
actually had. Note it was wrong in canonical AE101 too — at sitting 4 an AE101 student has *three*
modules behind them, not four.

The `m4/<slug>` branch, the `/rename m4-walk-send` session name and the `../<repo>-m5` worktree are kept.
`check_prompts §32` treats module-numbered artefact namespaces as deliberate: they ground the agent, and
branch, worktree and transcript slug are one namespace matched by name across two module files and a
gated prompt. Renaming buys a cosmetic improvement — the student types `m4` at their third sitting — and
pays for it by breaking a documented convention in three places at once. Accepted; trainer-script
one-liner if a room asks.

---

## 7. Sitting 2 closes by sending the student to prepare for the dropped security module

**The track needs.** A close and a between-sitting reading list pointing at whatever actually follows
sitting 2, which is a customer workshop we do not author.

**Plain AE101 does.** `plan-mode-done-right.md:78` — *"Ask Claude where it wrote the plan file, note the
path; M3 reads it. Close this session when the second read lands. M3 opens fresh and runs security
skills against the M2 feature."* Then `:80` — *"Come to Module 3 without that noted path and a feature
to point the skills at, and you'll be scrambling to reconstruct one while the room is already running
STRIDE. Your call."* Then a whole `## Pre-reads before Module 3` section carrying Willison's lethal
trifecta and the OWASP LLM Top 10.

**In the room.** The last three screens the student reads on the day of sitting 2 are homework for a
module that does not exist, complete with a stakes line threatening a scramble that cannot occur. Two
optional readings are prescribed into the gap where the customer's workshop sits, so the student's prep
time goes to agentic security instead of whatever the workshop needs. The trainer either reads it out,
which is wrong, or visibly skips the last section of the page in front of the room. A student who asks
*what's M3?* gets an off-script answer about a cut security module in the final five minutes of the day.

The fork had already decided this and left an instruction not to re-add the ask.

**Who could close it.** Maintainer, plus whoever owns the customer's workshop brief — the bridge text
has to name the workshop, and only the customer knows what it is.

**Closed 2026-07-28 by build-level parametrisation.** The M3 homework, the stakes line and the whole
*Pre-reads before Module 3* section are wrapped in `<!--flag:module:earn-the-trust-->` and resolve out of
any cut that does not run that module. One sentence is deliberately left outside the flag — *"Close this
session when the second read lands"* — because `## Next` with everything removed is an empty heading, and
an empty heading projects as a slide that says nothing.

**The bridge is still not written, and that is correct rather than pending.** What follows sitting 2 is a
customer workshop under the IPR split, so Bosser naming it would be authoring their material. The flag
leaves a clean edge for them to attach to instead of a wrong forward pointer to paper over.

---

## 8. The map projected at sitting 2 draws a six-module route and a solid security loop

**The track needs.** An orientation slide whose territory matches the four-sitting route. The deleted
lecture fork was authored for exactly this and its own maintainer block forbade the swap-back.

**Plain AE101 does.** `plan-mode-done-right.md:32` wires `lectures/the-whole-map.md` in as *"where the
first three modules sit"*. The lecture body places *"M1 to M3"* in the near half and *"M4 to M6"* in the
far half. Its inline SVG draws a solid teal ellipse tagged `THE SECURITY LOOP` with the sub-label
*"amends the plan · what safe means"*, at the same stroke weight and tag style as the plan, build and
compounding loops. The fork had spliced exactly three lines out; reverting re-inserts all three.

**In the room.** The first orientation this cohort ever gets is projected at sitting 2 and tells them
they are on a six-module route with a security phase, minutes before the trainer explains they are on
four sittings with no security module. A student who counts gets a different number than the slide, and
the module they cannot find is the one the customer chose to drop. The dashed ghost strands on the
figure are legitimately not-yet-built in both cuts; the security strand is not-in-this-track, and the
drawing does not distinguish the two.

**Who could close it.** Maintainer: a track-local map variant, a VARIANT-marked *You are here* slide, or
an accepted trainer patching the slide aloud at every cohort. The splice is three lines — the ellipse,
the tag and the sub-label — and it does not survive the squash, so it is a re-do rather than a revert.
Assemble by splice rather than retyping the SVG, which is how the fork did it without disturbing the
rest of the figure.

**Accepted as-is 2026-07-28 — the map is territory, not a syllabus.** Decided by the maintainer, and the
reasoning inverts the gap rather than answering it: a map that shows only what the training teaches is a
table of contents wearing a map's clothes. This one already draws things no cut teaches — the prototyping
loop and the checking loop are ghosts in both cuts. Security is one more piece of ground the student can
see and has not walked, which is honest cartography and useful besides: a security and quality module is
a live possibility for Q4, and erasing the loop now would mean redrawing it then.

**One line changed, because accepting this made the framing false.** The module lead-in said *"the whole
territory this training covers"* — a claim that only holds while the map and the syllabus are the same
shape. It now reads *"the whole territory this work runs in"*, matching the lecture's own opening,
*"Every piece of agentic work maps onto the same cycle."* That correction applies to canonical AE101 too,
where the map has always exceeded the syllabus.

**What stays true.** The solid stroke still does not distinguish *not-in-this-track* from *not-yet-built*.
Under the accepted framing that distinction matters less: both are ground the student has not walked.
A trainer asked *"why is there a security loop?"* has a real answer rather than a correction — *that phase
exists in the work; this track does not cover it.*

---

## 9. The map promises a spine it never fills in, and its team edge is never explained

**The track needs.** The map closed as well as opened, and someone in the room saying what the team zone
on its right edge means, since team-level compounding is why this track exists.

**Plain AE101 does.** `the-whole-map.md` opens the six-phase territory and locates the work so far in
its near half. The two lectures that return to and fill that same map (`the-loop-half-filled`, wired
into the dropped `earn-the-trust`; `the-map-filled-in`, wired into the dropped
`spot-gaps-build-the-loop`) are both out of this cut. `the-far-half.md` re-opens the far half at
sitting 3 and consolidates nothing.

Separately, the SVG prints the soil line *"a move counts when it crosses the wall"* across the bottom,
plus `THE TEAM →`, `↻ CROSSING THE WALL`, `CROSSES TO THE TEAM ↗` and `TRUSTED · SHARED VALUE →` along
the right edge. Neither of the lecture's remaining slides contains the words *wall* or *team*. The full
explanation lived in the M6 close. One subordinate clause in `the-far-half` at sitting 3 is the only
surviving mention.

**In the room.** The room is told at sitting 2 that the map is the spine and every module points back at
it. It is re-shown once and never filled in; the last thing the cohort sees of it is a half-drawn
territory. Meanwhile a projected diagram carries four labels about crossing to the team and one italic
strip declaring the rule, and the trainer says nothing about any of them. The customer bought
team-level compounding, and the promise is drawn on the slide with no sentence behind it.

**Who could close it.** Either re-cut the third slide to promise only what four sittings deliver, or
commission a consolidation beat at the end of sitting 4. The wall explanation is roughly one slide
(~120 words); the deleted fork's second slide is a working draft of it.

**Closed 2026-07-28 with the second option, authored fresh.** *Back to the map, one last time* now sits
at the end of sitting 4, behind `no-module:spot-gaps-build-the-loop`, so it appears only in cuts that
lack the module whose closer would otherwise fill the map in. AE101 is untouched and keeps
`the-map-filled-in`.

It does both halves of this gap at once. The map gets closed rather than left half-drawn, and the right
edge finally gets its sentence: **the wall** is the line between what works for you and what works for
someone else, a rule in your own `CLAUDE.local.md` is on your side of it, the same rule in a repo's
`CLAUDE.md` has crossed. It names the order as deliberate rather than as a shortfall — prove it on
yourself, then promote — which matters because everything these four sittings build sits on the personal
side, and a room that bought team-level compounding could otherwise read that as the track falling short.

**Deliberately stops before the hand-off.** The closing line points at the crossing as the open question
rather than answering it. What crosses, and how, is the customer's workshop, and naming it here would be
authoring their material.

---

## 10. The far-half lecture captions its figure `THE FAR HALF · M4–M6`

**The track needs.** An opener that names the far half of the map without promising a sixth module.

**Plain AE101 does.** `run-the-first-experiment.md` inlines `lectures/the-far-half.md` unchanged at
`## Start here`. Its map caption reads `THE FAR HALF · M4–M6` (`the-far-half.md:94`), a body bullet says
*"M4 to M6 go there"*, and its closing bullet promises *"The laws that explain the bite get named at M5
and M6"*.

**In the room.** The trainer projects a slide whose caption promises three far-half modules to a room
that has one sitting left, then reads a bullet deferring the explanatory laws to a module that never
arrives. This deck's whole job is to make the student count where they are on the map. The deleted
module carried a two-paragraph trainer flag telling the trainer to say *the rest of this track* instead;
that instruction goes with the file, so the next trainer meets the slide cold.

**Who could close it.** Maintainer: a shared-library variant of `the-far-half.md` that drops the module
labels, which by the deleted file's own note has to reach AE101 and this track in one edit. Until then a
trainer-guide line is the cheap mitigation.

---

## 11. The pre-send safety gate is written as recall of a module this track never ran

**The track needs.** A gate on an unsupervised multi-hour run: three questions (private data, untrusted
content, channel out), one leg cut, framed as a gate on *this run* rather than as security teaching,
because the track has no security module to teach it.

**Plain AE101 does.** `run-the-first-experiment.md:77` carries it as one prose paragraph opening *"One
more check before the send, the same three questions from Module 3's close, now pointed at this run…"*
There is no fenced prompt after it, no budgeted phase, no minutes, and no push-back move for a student
who turns it into threat-modelling. The student's only prior exposure to the trifecta is an optional
pre-read in sitting 2, filed under a section headed *Pre-reads before Module 3*.

To be fair to the surviving text: the three questions and their three mitigations are spelled out in
full at that line, and `walk-and-send-off.md:86` restates the check standalone with no module reference
at all. The room is not left with nothing. What it is left with is a recall cue and no recalled
material.

**In the room.** The trainer reads *"the same three questions from Module 3's close"* to a room that
never had a Module 3 close. Either the trainer improvises a cold trifecta teach that nothing budgets —
the beat sits inside a 5-minute send-off block — or the room nods through the cue and sends a multi-hour
unwatched run with all three legs live. That configuration is exactly what the check exists for, and it
is the last mandatory beat before the paste.

**Who could close it.** Maintainer: re-frame the sentence to stand alone, or add a fenced prompt for the
gate. The deleted fork had rebuilt this as its own phase — four budgeted minutes, its own prompt, and a
maintainer note that the gate survives a dropped parent — but that wording does not survive the squash,
so this is authoring from scratch rather than lifting. Budget it as such. The shape to re-author is on
the record here: three questions (private data, untrusted content, channel out), cut one leg, framed as
a gate on this run rather than as security teaching. A trainer cannot close it live without unbudgeted
improvisation.

**Closed 2026-07-28, by the cheaper of the two options.** The recall cue is gone: *"the same three
questions from Module 3's close, now pointed at this run"* is now *"three questions pointed at this
run"*. No fenced prompt, no budgeted phase — the three questions and their three mitigations were
already spelled out in full at that line, so what the gap actually described was **a recall cue with
nothing to recall**, and deleting the cue leaves a gate that stands on its own.

Which is what `walk-and-send-off.md:86` had been doing all along, standalone and module-free. That
sibling is the argument this needed no authoring: a gate the student can apply cold is better than one
that depends on remembering a sitting, and that is as true for canonical AE101 as it is here.

---

## 12. The send-off task is a hard gate that nothing in the four sittings issues

**The track needs.** Sitting 3 opens on a task each participant has already picked and screened: a real
backlog slice with a nameable *done*, bigger than a typo fix, smaller than an epic.

**Plain AE101 does.** `run-the-first-experiment.md:8` opens `## Prework` by asserting it as already
done — *"The scoped task you picked as homework."* The surface that issues it is
`earn-the-trust.md:95`, in the dropped module's `## Bring to Module 4`. Sitting 2's close instead issues
the dropped module's prework. The ask does exist twice as a pull the student must read for themselves
(`prework.md:16`, weeks earlier and unscreened; `run-the-first-experiment.md:27`, *"come with one or two
candidate tasks"*). What is missing is the push: a hard-gate issuance with screening at the preceding
sitting's close.

**In the room.** The trainer opens sitting 3 with *the task you picked as homework* and a share of the
room has never been asked. The backstop is the exercise's own Phase 1, ten minutes of screening — but
that phase is written for someone who arrived with candidates. The 45-minute walk, the beat the sitting
exists to protect, is what pays for the scramble.

**Who could close it.** Bosser, or the customer. Either the workshop between sittings 2 and 3 closes
with a Bring block issuing the screened task, or sitting 2's close picks it up. This is a curriculum
decision about the four surviving modules, not something the customer can be handed silently.

**Closed 2026-07-28: sitting 2's close picks it up.** Chosen over the workshop option because a hard gate
that lives in someone else's material is a hard gate you cannot verify. Behind
`no-module:earn-the-trust`, so it fires exactly for cuts missing the module whose `## Bring to Module 4`
block issues this in AE101 — and never doubles up where that block already exists.

The wording deliberately mirrors the AE101 block it stands in for, including the stakes line, minus the
scramble that cannot happen: *"come without one and you'll be picking while the room is already
walking."* Gap 7 flagging out the M3 homework is what made room for it; the same close that read as
homework for a module nobody sits now issues the one task the next sitting actually depends on.

---

## 13. The worktree comes back with its reason removed

**The track needs.** Identical starting code state between the two runs, so packaging is the only
changed variable. That is the whole claim sitting 4 rests on.

**Plain AE101 does.** Forks a sibling worktree at `../<repo>-m5` and spends a `##` section, a six-step
registry prompt and a coordinates-verification beat on it. The reason a fork rather than a branch earns
that machinery is that module 6 opens a session inside it (`spot-gaps-build-the-loop.md:25`). Module 6
is dropped. The worktree returns doing only the job a branch does, at six steps of setup instead of one.

**In the room.** Roughly 8–10 minutes of the sitting-4 open goes to worktree setup and coordinates
verification, bought with a downstream payoff the track does not have. A student who asks *why not just
a branch?* gets no answer from the material, because the answer was module 6.

**Who could close it.** Nobody, without editing AE101 — which is what this revert deliberately does not
do. A knowingly-carried cost, worth naming rather than discovering in the room.

**Accepted as-is 2026-07-28.** The fork still buys the thing sitting 4 rests on — identical starting code
state, so packaging is the only changed variable — it just buys it at six steps where a branch would
manage in one. Unlike gaps 14 and 15, which the worktree *causes*, this is only a price. The honest
trainer answer to *why not just a branch?* is now on the record: a branch would work for this cut; the
fork is what the parent training uses because a later module opens a session inside it. Roughly 8–10
minutes, knowingly spent.

---

## 14. The worktree's gitignored-copy step can silently change two variables at once

**The track needs.** The packaged re-run starts from the same *system* the un-packaged run did,
including the personal rules file compounded since sitting 1.

**Plain AE101 does.** A worktree is a fresh checkout, so gitignored files do not ride along. AE101
copies them with two conditional `cp` lines inside the setup prompt
(`ae101-m5-worktree-setup.md:29`) and asks Claude to confirm which files copied across. If
`CLAUDE.local.md` lives somewhere else — and `learn-from-the-test.md:166` says the sponsor's own
convention overrides — or the copy is skipped, the packaged run runs without rules the un-packaged run
had. No later beat re-checks it.

**In the room.** The student runs the contrast, reads a difference and attributes it to packaging. It
may be partly the missing rules file. The sitting's mood target, *I can feel what packaging adds now*,
is taught on an experiment that has silently changed two variables, and neither trainer nor student has
a signal that it happened.

**Who could close it.** A trainer-side check at the worktree-setup beat: read back which files copied,
and confirm the rules file was where the copy looked. That is a trainer instruction rather than a
content change, but it does not exist in `learn-from-the-test.md`, and the deleted exercise was the only
place the risk was written down.

**Closed 2026-07-28, and not as a variant fix.** This one was mis-filed as a Northwind gap: nothing in
canonical AE101 re-checks the copy either, so the same silent two-variable experiment has always been
available to every cohort. The check is now body prose at the worktree beat, in **both** cuts — *"the
whole contrast rests on the second run starting from the same system the first one did, and a rules file
that quietly stayed behind changes two variables instead of one."* Trainer instruction was the wrong
layer for it: the student is the one who knows where their rules file lives.

---

## 15. The student's rules file ends the track in two divergent copies

**The track needs.** The personal rules file grown since sitting 1 to end the track in one place, in the
repo the student actually works in.

**Plain AE101 does.** Copies `CLAUDE.local.md` and `observations/` into `../<repo>-m5`, states plainly
that the copies are independent from that point, and defers the merge decision to *post-Module-6*
(`learn-from-the-test.md:42`, and the artefact-contract row at `:183`). Module 6 is dropped, so the
decision point never arrives and no later beat mentions the divergence again.

**In the room.** The student walks out of the last Bosser sitting with two copies of the artefact the
training told them was theirs to keep: the original in the repo, and the sitting-4 copy in a sibling
directory carrying that sitting's work. Nothing tells them to reconcile. A closing workshop that reads
`./CLAUDE.local.md` at the repo root reads the copy that did *not* get the sitting-4 work.

**Who could close it.** A trainer close-of-sitting instruction (merge the worktree copy back, or delete
it and keep the original), or the customer workshop naming which copy it means. Neither exists.

**Closed 2026-07-28 by the inverse flag.** AE101 defers the merge decision to post-Module-6, which is
right for AE101 and impossible here, so the two cuts need *different sentences* rather than one sentence
minus a clause. `<!--flag:no-module:spot-gaps-build-the-loop-->` carries text that exists only for cuts
lacking that module: reconcile the two copies before leaving the sitting, and make sure the repo you
actually work in holds the version carrying this sitting's work. AE101 keeps its deferral, untouched.

This is what the flag mechanism was missing until now — every earlier flag could only *remove*. A gap
that needs the variant to say something the parent does not was unreachable with subtraction alone.

---

## 16. The last Bosser sitting closes on three consecutive sections promising a Module 6

**The track needs.** A final sitting that hands off to a customer-authored workshop, in the customer's
own terms.

**Plain AE101 does.** Closes with `## Next` (a paragraph on what Module 6 will do), `## Bring to Module
6`, and `## Pre-reads before Module 6`, framed by *"when Module 6 gets there"* and *"The loop assembled
next"*. Key Concepts also promises *"the team kit's evals grow from here"*. Under this cut there is no
Module 6 and no team kit at Bosser's end. The final exercise ends the same way:
`diagnose-and-resend.md:99` tells the student *"M6 will cut one stale rule once the contrast lands"*,
and hedges *"and M3 if completed"* for a module never on offer.

The sitting's second in-room opener compounds it. `learning-through-contrast.md:7` reads *"M4 was the
test. This is the learn."* — on slide one, at a sitting the students know as the fourth of four. That
lecture's own maintainer block records the module-number anchors as a deliberate carve-out that will not
be fixed, because the lecture's subject *is* the M4→M5 arc. The deleted module dropped it from the
in-room set naming this exact problem.

**In the room.** The student's last five minutes with Bosser are three headings and a paragraph
describing a session that does not exist, on the workbook page and on the projected deck, at the beat
where the material is supposed to hand the room forward with confidence. It is also the beat where a
student asks whether they are getting a shortened training. They end the track with a rules file they
were told carries a known-stale rule, and no beat that removes it.

**Who could close it.** Nobody, without editing AE101. This is the load-bearing cost of running an
unmodified module as a track's final sitting. Price it as a trainer-script item rather than discover it
live.

**Closed 2026-07-28, and the "nobody without editing AE101" verdict is what dated it.** That was true
when the only tools were forking and in-place editing. A module flag is neither: `## Next`, `## Bring to
Module 6` and `## Pre-reads before Module 6` are wrapped in
`<!--flag:module:spot-gaps-build-the-loop-->`, along with the Key Concepts clause promising the team
kit's evals and `diagnose-and-resend.md`'s *"M6 will cut one stale rule"* (plus its *"and M3 if
completed"* hedge, under the other module's flag). Canonical AE101 renders byte-for-byte what it rendered
before.

**What the last sitting now ends on.** The delegation-frontier closing lecture, whose final line is *"you
are not delegating more. You are checking less."* No trainer-script item, and a better close than three
headings describing a session that does not exist. The hand-off to the customer's closing workshop stays
theirs to author, same as gap 7.

**Still open from this gap:** `learning-through-contrast.md:7` — *"M4 was the test. This is the learn."*
— on slide one of a sitting the room knows as the fourth of four. Left alone deliberately: that lecture's
subject *is* the M4-to-M5 arc, its maintainer block declares the anchors a considered carve-out, and a
flag there would gut the lecture rather than trim it. Trainer-script item, and a one-liner rather than
the three-section problem this gap opened with.

---

## 17. No team artefact leaves any Bosser sitting

**The track needs.** The autumn design carried one constraint above all others: every sitting leaves
something the team can read. It matters most at sitting 1 (whose workshop opens on a room expected to
have pooled something) and at sitting 4 (the last before a team workshop).

**Plain AE101 does.** `compound-and-close.md` produces one artefact, `./CLAUDE.local.md`, gitignored and
personal. Team-worthiness survives as a clause in the `compound-and-close-1` prompt asking Claude to
flag team-worthy rules *in the chat summary* and explicitly not to write or PR anything; the exercise
then tells the student to close the session. AE101's team move is a one-to-one human conversation —
*show it to a teammate over coffee* — not a room record. At sitting 4 the outputs are entirely
individual: diagnosis, verifier, reference, plan, packaged re-run.

In fairness, sitting 1 is not empty-handed: the bug-fix PR is shipped at the close, and the module-1
homework lands a close-out note where the team reads it. What is missing is a durable, group-readable
artefact from the sitting itself.

**In the room.** Managers in this cohort attend as engineers and were sold team-level compounding. The
first thing they can show a colleague from sitting 1 is a chat scrollback in a session the exercise told
them to close. Four sittings in, the room still has no shared vocabulary artefact to carry into the team
workshop, and nobody has heard what anyone else's dominant failure was.

**Who could close it.** Maintainer plus the account owner. This is a scope decision — is the team
artefact still promised? — not an editing one.

---

## 18. Nobody authors a skill, and the closing workshop budgets its authoring beat as a second rep

**The track needs.** A first rep at skill authoring before a workshop spends 40 of its 150 minutes on
one.

**Plain AE101 does.** Teaches skill authoring at module 3 (`author-test-strategy-skill`), which this cut
drops, and writes its closing exercise as a repeat: *"You ran it at M3 on a test-strategy skill; you run
it again here with two runs' evidence in hand. Same move, faster."* Sitting 2 forward-promises the rep
that never happens: *"the move itself turns out to be packageable as a skill; you author your first one
there."*

**In the room.** A room doing this cold overruns a beat budgeted for fluency. The workshop's pacing
rules already anticipate overrun and answer it by protecting the deliberation: *"Phase 4 over 40 min —
cut it, not Phase 5"*, and *"Phase 5 does not get shortened below 25 minutes."* So the cost is not the
loss of the team-level beat, which is defended. It is that a room authoring its first-ever skill does it
inside a cap that drops from 40 minutes to 30, with at most five minutes coming off the deliberation
floor. A first rep compressed into a beat sized for a second rep produces a thinner skill, and the
deliberation then argues over thinner candidates.

**Who could close it.** Customer workshop author (budget a first rep, not a second), or a maintainer who
re-homes the authoring rep into a surviving sitting and fixes sitting 2's forward promise.

---

## 19. "Eval" is used at the last sitting and defined nowhere in the cut

**The track needs.** A definition before the word does load-bearing work. The deleted workshop carried
one, as a sentence plus three bullets: *"An eval is the automated check that says this agent-produced
thing meets our bar."* Then **Verifier** when the check is deterministic; **Judge** when it needs
reading, written in prose and run by an LLM; **Gate** when either is placed where it blocks.

**Plain AE101 does.** Defines it in module 6's Key Concepts and in `the-loop-has-a-name`, both dropped.
The last surviving sitting uses the word twice without defining it: *"Your verifier is your first eval.
The team kit's evals grow from here"* (`learn-from-the-test.md:68`), and the exercise's *"the closing
lecture names it."* No surviving module, exercise or lecture in this cut carries the definition.

**In the room.** The trainer projects a Key Concepts slide saying *your first eval* and pointing at a
closing lecture this track does not run. The student either asks and gets an off-book answer, or leaves
with the word and no bar behind it — into a customer workshop where the word does its work.

**Who could close it.** Maintainer, with a one-breath primer at sitting 4, since the surviving Key
Concept already leans on it. Or the customer workshop author, who must define it before the routing
beat.

**Closed 2026-07-28 with the primer, in both cuts.** *"Your verifier is your first eval: the automated
check that says an agent-produced thing meets your bar."* Six words added where the word first does work.

Worth recording why this was not a variant fix either: AE101's **first** use of *eval* is also at sitting
4, and its definition arrives at module 6. So canonical AE101 has been using the word a full module
before earning it, which `check_student_facing §2` asks it not to do. The cut exposed it; the cut did not
cause it. The customer workshop still owns the Verifier / Judge / Gate split, which is a routing
distinction rather than a definition.

---

## 20. The take-home supplementaries address a reader who finished a module this track does not run

**The track needs.** Post-track reading that assumes only what four sittings deliver.

**Plain AE101 does.** The registry ships all ten AE101 supplementaries to this variant unconditionally
via `contentKey`. Two address a reader who has shipped a second skill at module 6:
`how-the-best-do-ci-cd.md:5` opens *"You finished M6 owning the loop at your desk"*, and
`skill-stacking.md:165` opens *"You shipped a second skill in M6."* A third,
`workflow-composition-lineages.md:127`, tells the reader that *"the two curated security skills from M3
(`/access-control-analysis` and `/stride`) sit inside the PLAN phase"* as part of their own composed
kit; its only entry point was module 6's lecture, so after the revert it ships as a 28KB orphan no
module links.

Two others (`backpressure`, and `workflow-composition-lineages`'s own placement note) reference module 6
only in maintainer blocks, which the workbook build strips. Price the two student-facing ones, not four.

**In the room.** This is the material most likely to be read alone, weeks later, with no trainer to
correct it. It opens by congratulating the student on work they never did, and `skill-stacking`'s
section is an exercise with four questions, all four unanswerable.

**Who could close it.** Maintainer. A per-variant `supplementaries` list in the registry is the smallest
lever.

**Closed 2026-07-28, and the smallest lever turned out to be the wrong one.** A per-variant
`supplementaries` list would have *withheld* the pages. But `how-the-best-do-ci-cd` and `skill-stacking`
are good reading for anyone who has run the loop twice; only their opening sentences assume a module this
cut skips. Withholding the page to fix its first line costs the reader the other 95%.

So the openers are flagged and re-written per cut rather than the pages dropped. Where AE101 says *"You
finished M6 owning the loop at your desk"*, this cut reads *"You own the loop at your desk: a task run
twice, the difference read, the rules sharpened from what you saw."* Same for `skill-stacking`'s exercise
lead, which now says *"take any skill you have written, or the next one you would write"* — the four
questions become answerable instead of unanswerable. `workflow-composition-lineages`'s M3-specific
paragraph is flagged out entirely; the page's argument does not rest on it.

Flags now apply to supplementaries and references, not just module bodies — this is the surface most
likely to be read alone weeks later with no trainer present, so it is the surface where congratulating a
student on work they never did costs most.

---

## 21. Two reference and supplementary pages teach from dropped-module material

**The track needs.** Worked examples drawn from beats this track runs, and no page telling the student
that an audit they never ran still holds.

**Plain AE101 does.** `reference/prompt-anatomy.md:29` illustrates the primed-context-list move with a
scrollback naming *"the access-control output, the STRIDE decision and ADR"*, and cites
`author-test-strategy-skill-1` and `spot-gaps-build-the-loop-3` as canonical examples of the
skill-author conversation. Separately, `supplementary/the-lethal-trifecta.md:18` — linked from the
send-off beat at sitting 3 — asserts *"The access-surface map and the STRIDE pass you ran on the feature
still hold."*

**In the room.** The page teaching prompt craft, which is the transferable skill the training is
ultimately selling, uses as its two most concrete examples moments the student never had. And a student
who follows the trifecta link at the moment of the send reads that two audits they never performed still
hold; the page's actual argument survives the confusion, but their first reaction is that they skipped
an exercise. This is the one supplementary the surviving body prose actively pushes them toward.

**Who could close it.** Maintainer. The trifecta page already carries a note that this sentence was
de-sequenced once; a second pass could finish the job.

**Closed 2026-07-28.** The second pass happened, and the first pass had stopped one word short: it
replaced the module reference (*"from M3"*) but kept the possessive (*"the STRIDE pass you ran"*), which
still asserts the student did it. Now *"an access-surface map and a STRIDE pass on the feature"* — the
argument that the two audits compose is untouched, because it never depended on the reader having run
either.

`prompt-anatomy.md`'s primed-context-list example is re-cut to beats every cut runs: *"the plan
walk-down, the push-back that changed the plan, what came back from the send-off, the critique
exchange."* The move being taught is *name specific beats rather than say read everything*, and it
demonstrates that better with beats the reader recognises. Also fixed in passing:
`run-the-first-experiment.md:14` attributed an optional reading to *"Module 3"*; the duplication is
deliberate (`check_cross_module §2` wants between-module reading in two places) but the attribution was
not load-bearing, so it went and the links stayed.

**Deliberately not changed:** the `author-test-strategy-skill-1` / `spot-gaps-build-the-loop-3`
citations two sections down. A citation has to point at where the pattern actually lives; re-pointing it
at a prompt this cut runs would be a false statement about the corpus to spare the reader an unfamiliar
name. That the skill-author conversation itself never fires in this cut is gap 18, not a citation
defect.

---

## 22. This document trips the content-tarball builder's reachability walk

**The track needs.** A maintainer inventory that can name deleted files without producing build noise.

**Plain AE101 does.** `scripts/build-ae101-content-tarball.sh:78` seeds its link-reachability walk from
`find "$TRAINING_DIR" -maxdepth 1 -name '*.md'`, excluding only a four-name trainer-only list. Any
markdown file at the training-directory root is a seed. This file is one. Every
`lectures/<slug>.md` or `exercises/<slug>.md` path written here is harvested and, if the file is gone,
emitted as `WARN: AE101 references … but file missing`.

The blast radius is small and worth stating precisely: module files are never copied into the tarball,
only used as link seeds, so no maintainer text reaches a student. The workbook renderer resolves modules
by registry slug rather than by directory scan, so this file is not rendered either. The failure mode is
build noise that reads as breakage.

**In the room.** Not a room problem. A maintainer problem: the next person to see those warnings will
either chase a phantom regression or "fix" them by deleting the mentions from this document, which
destroys the record. Deleted artefacts are therefore named here by slug rather than by path.

**Closed 2026-07-28.** `autumn-gaps.md` added to the tarball builder's `TRAINER_ONLY` array, with the
reason recorded at the array: this file names deleted lectures and exercises by path *on purpose*, so
seeding the reachability walk from it harvests files that are supposed to be gone. The build now runs
with zero warnings. The cost was never the blast radius — module files are only read as link seeds,
never copied — it was that a builder crying wolf on every run is a builder whose warnings stop being
read.

**Who could close it.** Maintainer, under `scripts/` — either an explicit exclude for this file, or the
module-set-aware payload work already logged as owed. Out of scope for this run by construction.

---

## 23. Nothing asks anyone to pin the team's shared folder, and the first workshop cannot open without it

**The track needs.** Every participant walking into the first workshop with the team's shared folder
pinned to their device and already verified, by pointing a session at it and having it read two files
back from disk. This is not incidental: that folder is the working directory for the whole session, and
every claim, correction and convention filed under a participant's name lands inside it.

**Plain AE101 does.** Nothing. There is no shared team folder anywhere in this cut. A sweep of every
surviving surface — prework, the four module files, the training architecture, all nine linked exercises
and all sixteen linked lectures — returns one near-match, and it concerns the student's own git repo
happening to sit on a sync client rather than a team folder. No surviving sitting asks anyone to pin
anything, and none contains a read-back that verifies a synced folder has arrived. Sitting 1's close
hands straight to plan
mode.

**In the room.** The workshop's own diagnostic is that an unarrived folder *"can look completely normal
from the outside"*, so the trainer finds out at the first prompt rather than before it. The recorded
recovery is that the frame absorbs one sync, and that three or four turns the frame into IT support:
roughly fifteen minutes of a 180-minute session spent pinning folders. A participant whose folder never
settles files locally for the whole session and moves their claims in afterwards, which loses the
attributed-in-the-moment property the beat is built on.

**Who could close it.** Not the workshop's own page, and that is the part worth stating. The check needs
enough lead time for sync to settle, so a page nobody opens until the workshop morning cannot issue it.
It has to come from the sitting before, or from a separate pre-read the customer sends. Bosser's half is
one line in sitting 1's close, which does not exist today. Recorded as the unmet half of seam A.

---

## 24. The walk-and-fill audit cannot be told that a domain-knowledge store exists

**The track needs.** If a team builds a domain-knowledge store in one of the customer's workshops, the
walk-and-fill audit at sitting 3 has to read it. That beat's entire job is to ask whether the context is
enough for the task about to be sent off.

**Plain AE101 does.** Audits a closed list: `CLAUDE.md`, `CLAUDE.local.md`, the repo's ADRs, the skills
at both `.claude/skills/` and `~/.claude/skills/`, and the wired connectors. The module's learning
objective repeats the same enumeration. The exercise also states the governing mechanic outright:
anything not auto-loaded is read *"when a prompt names the path"*. A domain store is neither auto-loaded
nor named, so the audit will not find it.

The natural remedy — a conditional inside the shared exercise — is unavailable here. That exercise is
canonical AE101 serving all three variants through one `contentKey` resolution, so a customer-specific
conditional would reach AE101's own cohorts, and this run edits no original.

**In the room.** Nothing visible happens, which is what makes it worth the entry. The audit returns its
five ranked thin spots exactly as designed. They are simply the five thin spots of a system missing its
largest piece, and neither the trainer nor the participant has any signal that the biggest context layer
the team owns was never opened. It surfaces months later, if at all.

**Who could close it.** The customer, in workshop material they own: either the workshop that builds the
store closes by telling participants to name it to the audit at the next sitting, or the store is placed
where the audit's existing list already reaches — a repo ADR, an authored skill, or a wired connector —
which turns a curriculum edit into a placement decision. Recorded as seam E, the one contract on the
list that cannot be closed from either end.

---

## 25. Six workshop prerequisites have no producing side anywhere in the four sittings

**The track needs.** The deleted workshops opened on six things the sittings were expected to have
produced or established. Full detail per contract is in seam H; this entry exists so a reader pricing
the work from § *Gaps* alone sees them.

1. **The pre-built findings set** — a gap analysis of the team's repos, a draft definition of an
   AI-ready repo, a draft ranked top five, built before the day from the team's code, history and
   reviews, every claim citing its source and backward-validated by a separate agent.
2. **A one-line `./CLAUDE.md` at the team folder root** — the only surface that reaches a session which
   never pasted the setup prompt, naming the synced-folder runtime.
3. **A month of Claude Code history across every repo the participant works in** — the friction sweep's
   input.
4. **Git-host review-thread reachability from a managed laptop** — decides whether half that sweep runs.
5. **A cross-repo friction list** at a fixed local path — the wide half of the closing gap scan.
6. **`@path` import literacy** — the precondition for the shared-library criterion and its Monday leap
   test.

**Plain AE101 does.** None of them. Items 1, 2 and 5 have no producer anywhere in the repo now that the
workshops are deleted. Item 3 is contradicted by design: prework pins the student to one repo, so the
training generates a handful of sessions in a single codebase. Item 4 is an IT question nobody asks.
Item 6 is documented in the reference page students carry but taught and exercised in no sitting.

**In the room.** Each fails differently, and the shared property is the dangerous one: **five of the six
degrade silently rather than erroring.** The friction sweep still returns a list, just the transcript
half of it. The gap scan still returns gaps, just single-repo ones. The shared-library criterion still
gets agreed, because it sounds obviously right to a room that has never done it. Only the missing
findings set fails loudly, and its recorded recovery is to cancel and rebook.

**Who could close it.** The customer, item by item, and mostly in workshop material or scheduling rather
than curriculum: 1 and 2 with whoever assembles the team folder, 3 by placing the workshop late enough
in the track for real history to exist, 4 in the plug-point conversation before the day, 5 by buying the
cross-repo sweep or accepting a single-repo scan, 6 with a two-minute live demonstration. What Bosser
owes is the list itself, which is this entry and seam H.

---

## 26. The slide-rework re-audit debt was already paid; what is still owed is narrower and later

**The track needs.** The lectures a trainer projects to a paying room to have been audited against the
form they are currently in.

**Plain AE101 does — and an earlier draft of this entry said otherwise.** The 2026-07-09 slide rework
did leave every projected lecture carrying a *"re-audit before ship"* marker, and this entry recorded
that faithfully. What it never did was check whether the marker was still true. It was not. The full
re-eval of 2026-07-26 (`fe18297` — 51 files audited, 47 GO / 4 BLOCK) re-ran the judges against the
reworked bodies and re-stamped every Quality line, but it moved only the date and the per-class SHAs
and carried the qualifying clause through untouched. So each file went on declaring a debt it had just
paid, and this entry counted the declarations. Measured against the evidence rather than the annotation
— the git dates on the `curriculum/evals/instances/*.json` verdict files themselves — **all 25 AE101
lectures and all 11 marked exercises were judged on 2026-07-26**, seventeen days after the rework. The
stale clause was swept from 30 files on 2026-08-01.

**Why it sat wrong.** The instrument was the files' own prose. This entry read sixteen maintainer
blocks, found the same sentence in fifteen, and reported the count — which measures how many files
*say* they need a re-audit, not how many do (`check_research_claims.md §14(c)`: a check that confirms
an annotation exists is not a check that it is true). The mechanical question is one git can answer:
is a file's newest judge-verdict file older than its last above-the-fence edit?

**In the room.** Nothing visible then, and nothing owed on paper now for the 2026-07-09 pass. Do not
read that as *the cut is fully audited* — read the next paragraph, which is the part that survives.

**Enlarged by this session, 2026-07-28, and stated rather than left to be discovered.** Closing gaps 2,
5, 6, 7, 9, 11, 12, 14, 15, 16, 19, 20 and 21 touched **18 student-facing files** whose Quality lines
carry per-class SHAs from before those edits. Nothing was re-stamped, because re-stamping without
re-running the judges is the one move that turns this ledger into fiction:

```
exercises/            diagnose-and-resend · share-your-work · walk-and-send-off
lectures/             the-far-half · the-loop-half-filled · the-whole-map
prompts/              ae101-prework-extract-and-install
trainings/…/          getting-going · learn-from-the-test · plan-mode-done-right · prework
                      run-the-first-experiment
  reference/          prompt-anatomy
  supplementary/      build-a-project-from-zero · how-the-best-do-ci-cd · skill-stacking
                      the-lethal-trifecta · workflow-composition-lineages
```

Most edits are subtractions or single clauses, which is the cheap end of a re-audit. Two are not, and
should lead the run: *Back to the map, one last time* is newly authored prose (gap 9), and
`learn-from-the-test`'s worktree beat gained a paragraph (gap 14). The `slides` class is the one to watch
— several edits changed what a projected chunk says, and one added a chunk.

**A second thing the battery should now check, which it could not before.** Judges read source files, and
source files now carry flag markers, so a judge reading `plan-mode-done-right.md` sees *both* branches of
every flagged passage at once. That is not what either cohort is shown. Fire the battery against the
**built** variant page where the class allows it, or the judge will keep flagging contradictions that no
student can see.

**Who could close it.** Maintainer, and it is a battery run rather than an authoring job: re-fire the
seven-class judges on the sixteen and re-stamp. It is not created by this cut and it is not made worse
by it — canonical AE101 carries the same debt on the same files. It reaches this track because the track
returns to them, and this document exists to say what the track actually ships.

**A correction to this document's own earlier draft, kept rather than quietly removed.** § *What got
better* previously claimed the deleted files carried re-audit markers that leave with them, and that the
track returns to audited artefacts. Both halves were wrong and both flattered the run: zero of the
thirteen deleted files carried the marker, and the material returned to carries it. Found by the Row 4b
judge, not by the run.

---

# § Seams

The interface a customer-authored workshop is written against. Eight contracts, at the boundaries where
a workshop meets a sitting. Each states what one side **produces**, the **stable identifier** where it
lands, and what the other side must **consume**. No Bosser file is named as the thing that satisfies a
contract — the workshops are the customer's, and this section exists so they can be authored without
reading our material.

Direction varies and each table says which way its own contract runs. Most have a Bosser sitting
producing and a workshop consuming; seams B and D run the other way, with the workshop producing what
the next sitting needs. **Seam E is the one that cannot be fixed from either end**: the workshop
produces, a Bosser sitting is the consumer, and that sitting cannot be told to consume without editing a
canonical original.

**Some seams are declared unmet.** Where one side does not produce what the other needs, the entry says
so plainly and names what must carry it instead. An unmet seam stated is a working interface; an unmet
seam assumed is a workshop discovering in the room that nobody made the artefact. Every unmet seam is
also reachable from § *Gaps* — seams A, D and E as gaps 17, 23, 12 and 24, and the six contracts in seam
H as gap 25, which lists six of its seven unmet contracts (the seventh, a team-level record, is gap 17)
— so someone reading only § *Gaps* to price the work does not miss what this
section found.

---

## Seam A — sitting 1 → the workshop that follows it

| | |
|---|---|
| **Produces** | `./CLAUDE.local.md` at the repo root, created and gitignored if absent. A shipped bug-fix PR: the body instructs commit, push branch, open PR; the merge is the student's team's call, which is why the module's own learning objective can say *before merging* without any beat instructing one. A close-out note in the team's tracker — take-home homework, so conditional on the student doing it and on the tracker being reachable; nothing downstream consumes it. |
| **Lands at** | Repo root, gitignored. The rules file auto-loads at every cold session start in that repo. |
| **Workshop consumes** | The rules file, per participant, on their own machine only. |
| **Producible** | **Yes, for the individual. No, for the group.** |

The individual half holds: what a student writes at sitting 1 is loaded and audited at sittings 3 and 4.
The group half does not exist. `./CLAUDE.local.md` is gitignored and personal, so a group workshop
cannot read it, and no other artefact leaves sitting 1 in a form a room can argue over.

**Declared unmet — the team-rules proposal.** The `compound-and-close-1` prompt asks Claude to flag
team-worthy rules *in the chat summary* and explicitly not to write or PR anything; the exercise then
closes the session. **No Bosser sitting writes a group-readable rules artefact.** A workshop opening with
*what did you flag as the team's?* is asking a room to reconstruct three lines of a closed scrollback.
Either the workshop budgets a reconstruct-it-now beat, or one prompt is added to sitting 1 that writes
the flagged rules to a named file.

**Declared unmet — the pinned team shared folder.** This is the largest hole in the interface and the
one most likely to surface in a room. A workshop whose working directory is the team's shared folder
needs that folder pinned to each device and sync-verified before the day, by pointing a session at it
and having it read two files back from disk. **No Bosser sitting asks anyone to pin anything, and no
Bosser sitting contains a read-back that would verify a synced folder had arrived.** AE101 does use
read-backs elsewhere — the worktree setup asks Claude to confirm which files copied across, and a
trainer push has the student read back a branch and SHA — so the missing thing is specifically a
sync-arrival check, not the technique. A sweep of every surviving surface in this cut
— prework, the four module files, the training architecture, all nine linked exercises and all sixteen
linked lectures — found one near-match, and it concerns the student's own git repo happening to sit on a
sync client, not a team folder.

This one cannot be carried by the workshop's own page. A partially-arrived folder looks completely
normal from the outside, and the check needs to happen with enough lead time for sync to settle — so a
page nobody opens until the morning of cannot issue it. It has to be issued by the sitting before, or by
a separate pre-read from the customer. Bosser's side of that is one line in sitting 1's close, which
does not exist today.

---

## Seam B — the workshop → sitting 2

| | |
|---|---|
| **Workshop must leave** | One surfaced multi-file backlog task, in the same repo used at sitting 1. |
| **Stable identifier** | None by design. Tracker, head, or conversation. |
| **Sitting 2 consumes** | The task, at its own `## Prework`, plus `./CLAUDE.local.md` auto-loading at cold start. |
| **Producible** | **Yes** — the rules file carries cleanly across an intervening workshop. |

The caveat is issuance, not production. The multi-file-task ask lives on `plan-mode-done-right.md:10`,
which the student reaches on the day of sitting 2 unless they read ahead, and on `prework.md:14`, read
weeks earlier. Sitting 1's close describes multi-file work as a property of module 2 rather than as a
bring-this. With a workshop wedged into the gap, the last thing this cohort heard from an AE101 trainer
was about the workshop, not about a backlog task. If the workshop's close carries the reminder, the seam
holds; if not, sitting 2 opens with part of the room hunting a task in plan mode.

---

## Seam C — sitting 2 → the workshop that follows it

| | |
|---|---|
| **Produces** | A plan file, written by plan mode when the student approves the plan after the push-back loop. |
| **Lands at** | **Student-noted path only.** Plan mode displays the path inline; there is no fixed convention, and the artefact contract states this is deliberate. |
| **Workshop consumes** | The plan, if it wants it. It must ask each participant for their path. |
| **Producible** | **Yes, but not addressable.** |

A workshop prompt cannot name this path. It must ask, conversationally, per participant. Note also that
sitting 2's close currently frames the ask around a dropped module (gap 7), so students who skipped that
line arrive with nothing to point at.

---

## Seam D — the workshop → sitting 3

| | |
|---|---|
| **Workshop must leave** | One screened send-off-sized task per participant: a real backlog slice with a *done* nameable in one sentence, bigger than a typo fix, smaller than an epic. |
| **Stable identifier** | None. The task is named in conversation at sitting 3's opening screen. |
| **Sitting 3 consumes** | It at `## Prework`, as an assertion: *"The scoped task you picked as homework."* |
| **Producible** | **No. Declared unmet.** |

**No Bosser sitting issues this homework.** In plain AE101 it is issued at the close of module 3, which
is dropped. Sitting 2's close issues the dropped module's prework instead. The ask survives twice as
something the student may read for themselves, weeks early and unscreened, but the hard-gate push is
gone.

The workshop between sittings 2 and 3 is the natural home: it is the last meeting before the send-off,
which is exactly why the deleted design put it there. It needs to close with a Bring block. Sitting 3's
backstop is ten minutes of in-room screening written for someone who arrived with candidates, and the
45-minute walk is what pays for the scramble.

---

## Seam E — the workshops → sitting 3's walk, running the other way

Every other seam here runs forwards: a sitting produces, a workshop consumes. This one runs backwards,
and it is the only contract on the list where **the workshop is the producer and a Bosser sitting is the
consumer that will not consume.**

| | |
|---|---|
| **Workshop produces** | A domain-knowledge store, if a team builds one. |
| **Lands at** | Whatever the customer chooses. Not fixed here, and it does not need to be. |
| **Sitting 3 should consume** | It, inside the walk-and-fill audit — the beat whose entire job is *is the context enough for this task?* |
| **Producible** | **Not applicable. The consuming side is unmet, and cannot be met from our side.** |

**What plain AE101 does.** The walk's audit fence is a closed enumeration. It names `CLAUDE.md`,
`CLAUDE.local.md`, the ADRs in the repo, the skills at both `.claude/skills/` and `~/.claude/skills/`,
and the wired connectors. The module's own learning objective repeats the same list. Nothing in it
admits the possibility of a domain-knowledge store, and the exercise states the general mechanic
plainly: anything not auto-loaded is read *"when a prompt names the path"*. A domain brain is neither
auto-loaded nor named, so a closed-list audit will not go looking for it.

**Why the natural remedy is unavailable here.** The customer's brief proposes a conditional inside the
shared exercise. That exercise is canonical AE101 and serves all three variants through the same
`contentKey` resolution, so a customer-specific conditional in it would reach AE101's own cohorts. This
run edits no original. The remedy is therefore off the table for this phase rather than rejected on its
merits.

**So: no Bosser sitting will tell the student to include a domain brain in the walk.** Whatever carries
that instruction has to live in the workshop's own material — either the workshop that builds the store
closes by telling participants to name it to the audit at the next sitting, or the store is placed
somewhere the audit's existing list already reaches (a repo ADR, a skill, a wired connector), which
converts the problem into a placement decision rather than a curriculum edit.

**The failure if nobody carries it.** The beat whose job is to ask whether the context is enough
silently skips the newest and largest context layer the team has. It fails quietly and it fails well:
the audit still returns five ranked thin spots, they are just the five thin spots of a system missing
its biggest piece. Nobody in the room can tell. Logged as gap 24.

---

## Seam F — sitting 3 → the gap → sitting 4

| | |
|---|---|
| **Produces** | Branch `m4/<short-task-slug>`; a protected block headed `Run coordinates (do not rewrite or remove)` appended to `./task.md` holding the branch name and the session transcript path; a commit messaged `M4 starting point` at the branch tip; the short SHA reported in scrollback. |
| **Lands at** | `./task.md` at the repo root, and the branch in the student's own repo. |
| **Sitting 4 consumes** | The block by name, the branch named in it, and the commit matched by its message. |
| **Producible** | **Yes.** One prompt produces all of it, and sitting 4 reads exactly that. |

**This is the sturdiest contract in the track, and it is also the one a workshop can break.** Any
workshop scheduled in this gap must treat the following as do-not-touch:

- do not have students write to `./task.md`
- do not rename, delete or merge the `m4/<slug>` branch
- do not amend, squash or rebase the commit messaged `M4 starting point`
- do not move the student to a different working directory without returning them

Breaking any of these stops sitting 4's first ten minutes. The trainer's documented fallback is *the SHA
Claude reported at Module 4 close*, which by then lives only in a closed scrollback.

**A second, quieter collision: the repo is occupied.** The un-packaged multi-hour run owns the student's
laptop and repo for the whole gap — AE101 says so twice, placing the pre-reads *"in the Module 4 to
Module 5 gap while your un-packaged run is still going"* and instructing *"Close the session once the
run is done."* A hands-on workshop in this gap asks the student to work in a repo that has a run
mid-flight in it: branch switches, dirty trees, competing sessions. A student who frees the laptop for
the workshop stops the run early, which the curriculum blesses but which thins sitting 4's material.
Either the workshop in this gap is laptop-free or works in a different repo, or it goes elsewhere in the
sequence.

---

## Seam G — sitting 4 → the closing workshop

| | |
|---|---|
| **Produces** | A packaged re-run on branch `m5/<task-slug>`, forked from sitting 3's `m4/<task-slug>` SHA; a protected `Run coordinates` block at the top of `plan.md`; `RUN-NOTES.md`; a reference artefact and a verifier. |
| **Lands at** | **The worktree root `../<repo>-m5` — not the repo root.** `plan.md` and `RUN-NOTES.md` have fixed names there. The reference artefact sits beside them at a path the agent proposes. The verifier need not be beside anything: its registry location is a script in `.claude/hooks/`, a CI config, a pre-commit hook, or a slash-command, and the student picks. |
| **Workshop consumes** | Both runs read off disk, the packaging that made the difference, and `./CLAUDE.local.md` for the rule-cut beat. |
| **Producible** | **Yes — at a location a workshop will not guess.** |

Three things a closing workshop must be told, because the surviving material does not say them:

**1. Open the session in the worktree, not the repo root.** AE101's own module 6 does exactly this
(*"Open a fresh Claude Code session in the Module 5 worktree, `../<repo>-m5`. Both runs already live
there."*), and that instruction is dropped with the module. A session opened at the repo root sees no
`plan.md`, no reference, no verifier and no `RUN-NOTES.md`.

**2. Read the two transcripts from their recorded coordinates, do not search for them.** The transcript
folder *usually* follows the working directory a session ran in, so the repo root and the worktree *may*
encode to different folders — that is how AE101's own reference page states it, and the hedge is
deliberate. Either way the advice is the same and does not depend on resolving it: a prompt told to
*find both runs in this repo's session transcripts by matching on the task* may find one of the two,
silently, and report success. The paths are recorded rather than guessable — the un-packaged run's in
`task.md`'s coordinates block, the packaged run's in `plan.md`'s. Read those first; fall back to
searching only if a block is absent. AE101 draws the same conclusion in its own words: *"the durable
move recording, not searching."*

**3. Find the reference and verifier by listing the directory.** Only `plan.md` and `RUN-NOTES.md` have
fixed names. The reference artefact's registry location is *"task-local file at worktree (path Claude
proposes)"* and the verifier's is *"path varies (script in .claude/hooks/, CI config, pre-commit, or
slash-command — student picks)"*. AE101's own re-send prompt resolves them by listing the worktree root.
A workshop fence that names either by path misses for most of the room.

There is a trap here worth naming, because the tempting shortcut looks safe. Sitting 4's own
artefact-contract row offers a name — *"`reference.md` at worktree root (or location named in Phase 4
prompt)"* — and a workshop author reading that table would reasonably hard-code `reference.md`. The
parenthetical is the operative half: the prompt the student pastes pins no name, and the re-send prompt
finds the file by listing the directory rather than by opening a known path. So `reference.md` is the
likely name, not the guaranteed one. List the directory; do not trust the row.

**And one artefact contract that inverts the beat's lesson.** The rule-cut beat reads and edits
`./CLAUDE.local.md`. There are two live copies: the repo root's (sitting 1's) and the worktree's (copied
at the fork, divergent from that moment). A participant who cuts a dead rule in the workshop watches a
clean diff land, opens their real repo on Monday, and finds the rule still there — the cut happened in a
worktree nobody told them to merge. Whichever copy the workshop means, it should say which, and decide
the merge-back before it closes.

---

## Seam H — contracts with no producing side anywhere in the four sittings

Everything below was consumed by the deleted workshops. The first six are **declared unmet** — produced
by nothing plain AE101 does. The seventh is a team-level record, which gap 17 carries in substance. The
last is the inverse: an artefact plain AE101 does produce and nothing consumes. All are listed so a
workshop author can decide to build, buy, drop or simply inherit them rather than discover them.

**The pre-built findings set.** The readiness workshop opened on a gap analysis of the team's repos, a
draft definition of an AI-ready repo, a draft ranked top five with a maturity tier per repo, and a set
of surfaced tacit rules — all built before the day from the team's code, history, reviews, wiki and
service catalogue, every claim citing its source, then backward-validated by a separate agent. This is
a customer-side pipeline and correctly not a Bosser sitting. What is owed is the transfer of its
operating detail into the customer's brief: the three stages, the seeded-wrong-citation smoke test, the
dated-filename convention the setup prompt's newest-wins tie-break depends on, and above all the pre-day
check — a named person opens two findings the week before and confirms both cite work from the team's
last month. The workshop's own recovery for a missing findings set is *cancel and rebook*.

**A one-line `./CLAUDE.md` at the team folder root.** The only place the synced-folder runtime reaches a
session that never pasted the setup prompt: no history, no atomic write, two writers on one file produce
a duplicate rather than a merge, eventually consistent cross-folder reads. It covers the recovery path
where a participant restarts mid-session. Ships with the pre-built folder, written by whoever assembles
it. One line, but written by someone who holds those four facts.

**A month of Claude Code history across every repo the participant works in.** The friction sweep reads
it. Plain AE101 pins the student to exactly one repo by design — *"Every module of this training starts
from a Claude Code session in this repo"* — so the training generates a handful of sessions in one repo
over the weeks of the track. Whether a participant has broader history is a fact about their day job.
The sweep's yield is therefore a function of *when* the workshop is scheduled relative to the sittings,
and nobody currently owns that placement.

**Git-host review-thread reachability from a managed laptop.** The friction sweep's second half pulls
review comments given and received. Nothing in prework or any sitting establishes this access; on a
managed laptop it is an IT question. It degrades silently: the prompt is well-built enough that the
agent reports the block and skips, so the output still looks like a normal sweep. What is lost is the
material the workshop wants most — the things a teammate said twice in review, which are tacit team
rules by definition.

**A cross-repo friction list at `~/readiness-notes/friction.md`.** The closing gap scan was authored to
read two sources: this file, covering every repo the participant works in, and the day's read of session
history, covering one. Nothing in plain AE101 writes, reads or mentions that path. Under this cut the
closing scan is single-repo, and a participant whose worst recurring friction lives in the repo they did
not bring surfaces nothing about it. Either the customer buys the cross-repo sweep somewhere earlier —
it cost 30 minutes in the deleted design — or the maintainer records that the closing scan is
deliberately single-repo.

**Attributed per-participant notes and any team-level record.** Every artefact the four surviving
sittings produce is personal and mostly gitignored. The closing workshop's filing beat reads as a
30-second callback (*"you filed this way in the readiness workshop"*); under this cut it is a cold
first-time setup, including the sync read-back, the private/claim two-tier split, and the
do-not-write-in-anyone-else's-folder rule. Budget five minutes of new teaching, not a callback.

**`@path` import literacy.** The shared-library criterion and its Monday leap test both require the
student to know that a rules file can pull a shared standard in with an `@` path, that prose describing
where the standard lives loads nothing, and that the path resolves on the local machine. The mechanic is
documented in the reference page students carry (`reference/claude-code-for-engineers.md:135`) but is
never taught or exercised: no surviving surface in this cut mentions a shared library or an `@` path,
and the one lecture about where a rules file goes teaches three deployment shapes and no imports. Not a
day-of failure — a Monday failure. The room will agree the criterion because it sounds obviously right,
and nobody in it has ever done the thing.

**Three security skills, no longer installed, and now worth naming out loud.** This paragraph used to
record a gift: prework installed `access-control-analysis`, `stride` and `security-tools` on every
student's machine, their only named consumers sat in the dropped module, so a customer authoring a
security workshop would have found a working triple already on the laptops. **Withdrawn 2026-07-28** —
the install went with the payload (gap 3). The skills still exist in `content/skills/` and the tarball
script still whitelists them, so the gift is still available; it just has to be *asked for* now rather
than found. Which is the safer shape anyway: an unannounced capability nobody knows about is not an
asset, it is a coincidence.

---

# § What got better

A gap list that records only what got worse is as misleading as one that omits it. Everything below is a
real improvement, verified rather than assumed.

**The track ships no content tarball, and the prework says so by construction — 2026-07-28.** Decided
after checking which surviving surfaces actually open a file in `~/Documents/ae101-content/`: two, both
M3 security exercises, both in the module this cut drops. Reference and supplementary material renders
in the workbook regardless. So the payload was equipment issued for a sitting nobody attends, and its
absence closes gaps 3 and 4.

The mechanism is worth recording because it is new and it is reusable. `flags: { payload: false }` on
the registry entry, and passages in the *shared* source wrapped in `<!--flag:payload-->`. Not a fork:
both variants keep reading one `prework.md`, which is what stops the two from drifting the way the five
deleted forks did. The build strips the flagged passages, **renumbers the remaining `## N.` steps
consecutively, and rewrites every surviving "Step N" reference to match** — so the student sees steps 1,
2, 3 rather than 1, 2, 5. A reference left outside the flag that points at a removed step fails the
build rather than shipping; that guard fired once during authoring, on the lede's *"curated skills
installed"* clause.

The flag is registry-side rather than a CLI switch on purpose: the publishing side builds this track
from its own clone with one command, and a variant whose correctness depends on remembering an extra
argument ships wrong the first time someone forgets it. Guarded by `scripts/content-flags.test.js`;
AE101's own prework output was verified byte-identical to the previously committed build.

**A second flag kind, added 2026-07-28, and it declares nothing —** `<!--flag:module:earn-the-trust-->`.
It resolves against the training's own `modules` list rather than against a boolean someone maintains, so
a passage preparing the student for a module survives exactly when that module is in the cut. Nothing to
keep in sync, and the failure mode of the boolean version — homework outliving the module it prepares
for, which is precisely what gaps 7 and 16 were — cannot recur. A cut that later adds the module back
gets its homework back for free.

Prefer it over a declared boolean whenever the dependency really is a module, because a boolean would be
a second copy of a fact the registry already holds. When no module list is supplied at all, every module
flag keeps its passage: absence of information is not evidence that a module was dropped, and a caller
that does not know the cut must not silently delete its homework.

**The `git worktree` prerequisite is truthful again.** Prework lists `git worktree` as a hard
prerequisite. Under the autumn fork nothing used it — the forked exercise had replaced the worktree with
a plain branch and argued the case explicitly. Plain AE101's sitting 4 hard-requires the fork
(`learn-from-the-test.md:40`), so the prerequisite earns its place on page one again. Note the nuance in
gap 13: the mechanic is truthful, its downstream reason is not.

**`high` thinking effort is correct again, and an internal contradiction disappears.** AE101's own
training default is `high` (`prework.md:5`), with one deliberate override to `medium` at module 2 that
prework itself announces. The autumn fork had set `medium` everywhere while inheriting a prework page
saying `high`. That contradiction goes. The override survives cleanly too: `plan-mode-done-right` is
still position 2 in this track and still carries its own medium line, so prework's *"Module 2 calls out
a medium override"* remains true. **One condition on this:** all four surviving modules are budgeted
1h45, so `high` is internally consistent on the material's own numbers. It is only wrong if the
customer's booked slot is shorter than 1h45, which is the same open question as gap 1.

**Unaudited material leaves.** Eight of the thirteen deleted files carried no quality stamp of any kind;
the other five declared *"No Quality line by design"*, which is also unstamped. Five never-checked
capability claims stamped `[checked:never result:NEEDED due:asap]` go with them, across three files. All
of that leaves the repo with the deletions.

**What does not follow, and an earlier draft of this bullet claimed it did: that the track therefore
returns to fully audited artefacts.** It does not. See gap 26. The deleted files carried no
*re-audit before ship* markers at all — zero across all thirteen — because they carried no stamps
either; unmarked is not the same as clean. The win here is the removal of unaudited material, not the
arrival of audited material. *(Amended 2026-08-01: this bullet used to close on "while the lectures
this cut returns to carry them live." That was true of the 2026-07-09 markers, which turned out to be
stale and were swept — see gap 26. Two lectures still carry a marker, both correctly: `when-a-plan-is-good`
and `how-this-training-was-built`, each edited after its last judge run.)*

**The prompt registry becomes whole again.** The deleted files carried inline prompt blocks in the
pre-migration form, with registry entries logged as owed before ship. Roughly a dozen prompts return to
the registry, where the prompt-graph validator and the approval gates can see them. The owed migration
closes by deletion.

**Six compressed-away beats come back.** The second sweep in the opening exercise, the practitioner
naming, two push-backs on two axes rather than one, the question budget, and both escalation moves. The
forked exercises had cut them to fit; the originals run at their authored length now that each has its
own sitting.

**Three live errata disappear.** The forked exercise served a projected shared lecture the trainer had
to correct aloud in three places. Those corrections go with the file.

**Two orphaned back-references resolve.** The chameleon callback in the opening lecture points at a
lecture that is back in the room, and the parallel-sessions plant in `when-a-plan-is-good` is restored —
the fusion's *drop the aside* would have orphaned its payoff at sitting 4. `learning-through-contrast`
also returns, which the fork had to drop because its module anchors did not resolve. (That return is
mixed; see gap 16.)

**`./task.md` exists earlier.** In plain AE101 the file lands on disk at the task pick rather than at
the pin, so the recovery anchor exists roughly 45 minutes earlier in the sitting. The optional push of
the starting-point branch also returns — the fork left the run recoverable only from the student's own
laptop.

**The mechanical battery can drive the whole set again.** The tmux runner drives a single student's
agent session headlessly, so it could never cover the two room-scale workshops. With those gone, every
sitting in the Bosser half is drivable.

**Closed 2026-07-28.** `chain-lemmings-northwind.sh` (`curriculum/evals/mechanical/tmux-runner/`)
drives it: same `run-mN.sh` scripts and prompts as stock AE101 (content is byte-identical under this
cut's `contentKey`), M3 and M6 simply absent from the topology, M4 repositioned to start from M2's
ending SHA instead of M3's now-nonexistent ADR commit. Validated live, medium effort, full PASS M1
through M5 — including the two things this document could only predict from reading source: M4's audit
turn has no hard dependency on M3's ADR or `test-strategy-lemmings` skill, and M5's
`verify-by-hand-judge` degrades gracefully (stands down with "nothing to judge") when that skill is
absent from disk, exactly as the "checked, not a gap" note above predicted. Full account, including one
unrelated agent-authored-verifier false positive the M5 run caught and documented itself, in
`lemmings-chain-runbook.md` § *Northwind variant*.

---

# § Checked, and not a gap

**Sitting 1's working-tree warning still has its module.** `getting-going.md` warns that a later module
commits the student's working tree. That module is `run-the-first-experiment`, which survives as sitting
3. No action.

**The multi-file-task ask is not lost.** It is issued at `prework.md:14` as well as on sitting 2's own
page. The defect is that it is never re-issued at sitting 1's close, which is a weaker claim than
*missing* — recorded under seam B rather than as a gap.

**The packaged re-send prompt already degrades on the dropped security module.** It handles the absence
gracefully rather than assuming module 3's artefacts exist. No action.

**The map lecture is linked from sitting 2, not sitting 1.** An earlier reading of the predicted-gap
list placed it at sitting 1. It is wired in at `plan-mode-done-right.md:32`. Sitting 1 opens with a
trick exchange and two lectures, none of which draws the territory; the first drawn map is at the top of
sitting 2. Gaps 8 and 9 are written against the corrected position.

**The `m4/<slug>` coupling is looser than it looks.** Sitting 4's worktree prompt resolves the branch
from the coordinates block rather than by prefix match (*"that block is authoritative … don't
rediscover the branch with broad branch search"*). The hard name dependency is in the module body, not
the prompt. It still needs one coordinated edit if the slug is ever renamed (gap 6), but the prompt
layer is robust.

**No Step 4 install blocker is documented.** An earlier draft of gap 3 asserted a known failure in the
skills install. Nothing in `pre-cohort-todos.md` or anywhere in the curriculum records one. The claim
was speculative and is struck; gap 3 stands on dead weight and false expectation alone.

---

# § Still unexamined

Named so the next phase can price the audit as well as the gaps.

- **Trainer-facing surfaces were not swept.** `trainer-guide.md`, `trainer-modules.md`,
  `pre-cohort-todos.md`, `training-architecture.md` and `M6-WINDDOWN-STATUS.md` all sit in the training
  directory and all carry double-digit counts of dropped-module references. None reaches a student:
  `--no-trainer-docs` skips `trainer-guide` and `trainer-modules`, and the other three are never rendered
  into a student workbook by any path, flag or no flag. But the trainer reads them, and they describe a
  six-module training with a security module and a closing module this cut does not run. This inventory
  covers what the student receives. The trainer's half is owed.
- **The registry lede was rewritten and the reasoning lives outside this document.** The old lede
  claimed *"Five sessions, ten and a half hours"*, false under this cut on any arrangement. The
  replacement makes no session-count or duration claim. It is the run's only edit to a buyer-facing
  surface; the decision and its register reasoning are in the run's plan under § *Decisions log*.
- **The two workshops were read for their contracts, not for their pedagogy.** What the customer loses
  by re-authoring them from scratch is not priced here.
- **The eight remaining supplementaries** were checked for dropped-module references, not for whether
  their sequencing assumptions survive a four-sitting arc.
- **No live delivery has been run against this cut.** Every cost above is derived from the text.

# Buried gold — decision-ready proposals (2026-08-15)

Scope: the four subsections of `pre-cohort-todos.md` § *Hunt for buried gold* — *Verified in the current curriculum* (7), *The reason leaks out of the deck* (1), *Outside-in practitioner lens* (10), *Enactment gaps* (3). Twenty-one items. The later subsections of that section (Tensions, delegation-frontier, Key Concepts corpus-wide) are out of scope here.

Report only. Nothing under `curriculum/**` or `site/**` was edited. Every proposed body edit below is a card awaiting your call.

**Verdicts: 6 PROMOTE · 1 JOIN · 10 LEAVE-AS-IS · 4 NEEDS-ANTTI.**

---

## If you only had an hour

Three cards, in this order. All three land in slides with measured headroom, none moves a leaf `**Time:**` line, and none reopens a decision you already made.

1. **Card 3 — diff and transcript are two evidence layers** → new bullet in M5's `## Key Concepts` (48w/4b today, the emptiest destination in the set). The generalisation exists three times in the corpus and is stated best on a reference page that never reaches the deck. Cheapest promotion with the widest reach.
2. **Card 4 — every check has a latency budget** → third bullet on `the-loop-has-a-name.md` § *One primitive, placed wherever there's a bar* (92w/2b, 118 words of headroom). The slide's whole subject is placement; latency is the placement axis it is missing.
3. **Card 1 — compounding includes deletion** → extend M6 `## Key Concepts` bullet 6. The move is already enacted with its own slide, LO and leap test; only the generalisation is missing from the reminder slot.

Then read the two deletions below (items 5 and 6) — both bullets are already closed and, by this file's own rule, should be deleted rather than decided.

---

## Summary table

| # | Item | Verdict | Lands where | Reaches deck | Min added |
|---|---|---|---|---|---|
| 1 | Compounding includes deletion | **PROMOTE** | M6 module `## Key Concepts`, bullet 6 extended | yes | 0 |
| 2 | Parallelism has a topology | **PROMOTE** | M5 module § *Hold the worry beside the artefact*, one clause | yes | 0 |
| 3 | Diff and transcript = two evidence layers | **PROMOTE** | M5 module `## Key Concepts`, new bullet | yes | 0 |
| 4 | Every check has a latency budget | **PROMOTE** | `the-loop-has-a-name.md` § *One primitive…*, new bullet (M6) | yes | 0 |
| 5 | Soil-line priors | **LEAVE** — already landed 2026-08-15; delete the bullet | — | — | 0 |
| 6 | Dip-before-climb | **LEAVE** — already landed 2026-07-03; destination now ruled out | — | — | 0 |
| 7 | Ten-nudge ceiling | **LEAVE** — M5's numberless echo is the designed variation | — | — | 0 |
| 8 | Context-window prior leaks out of the deck | **LEAVE** — decision already on the record | — | — | 0 |
| 9 | Cherny: recurrence threshold → automation | **NEEDS-ANTTI** — contradicts a printed figure caption | (M2 `how-instructions-grow.md` if reversed) | yes | 0 |
| 10 | Cherny/Klaassen: retrieval architecture | **LEAVE** — same decision as #8 under a different name | — | — | 0 |
| 11 | Ronacher: WIP / review bandwidth | **LEAVE** — fully covered in three lectures | — | — | 0 |
| 12 | Ronacher: delete failed automation | **JOIN** into #1; negative-knowledge half **LEAVE** | see #1 | yes | 0 |
| 13 | Willison: comprehension gate at handoff | **NEEDS-ANTTI** — strongest of the ten, card drafted | M3 `earn-the-trust.md` clear-the-session beat | yes | 0 |
| 14 | Willison: rule-to-judgment ladder | **NEEDS-ANTTI** — theory-rewrite scope, not a card | — | — | — |
| 15 | Husain/Shankar: durable failure dataset | **LEAVE** — no persistent slot; §26 bans reader-less writes | — | — | 0 |
| 16 | Husain: exploration vs exploitation | **LEAVE** — the hold-out already gives the student the move | — | — | 0 |
| 17 | Pocock: grilling as reusable shape | **LEAVE** — attribution cap; variation-not-repetition is the design | — | — | 0 |
| 18 | Klaassen: compounding needs a retrieval test | **NEEDS-ANTTI** — cheap card drafted | M1 `compound-and-close.md` § *What you built* | yes | 0 |
| 19 | Enactment: agent answers a human reviewer | **LEAVE** — no reviewer exists inside the slot | — | — | 0 |
| 20 | Enactment: exercise the running software at "done" | **PROMOTE** — needs an 8-word budget it does not have | M5 `diagnose-and-resend.md` Phase 3 | yes | 0 |
| 21 | Enactment: a repo you do not own | **LEAVE** — the single-repo contract wins | — | — | 0 |

**Total computed minutes added: 0.** All six PROMOTEs are bullet- or clause-level edits inside existing leaves. `scripts/calculate-time.js` derives module totals from each leaf's own `**Time:**` line plus the module's `- **Transitions:**` line; none of those strings moves, so `--check` stays green. The honest cost is trainer-pace seconds — roughly 30 to 45 across all six — which is real in a room and invisible to the script.

### Timing baseline, because it has moved since the punchlist was written

`node scripts/calculate-time.js --training agentic-engineering-101`, run today:

| Module | File | Total | vs 2h slot |
|---|---|---|---|
| M1 | `getting-going` | 117 | fits, 3 float |
| M2 | `plan-mode-done-right` | 123 | **over by 3** |
| M3 | `earn-the-trust` | 112 | fits, 8 float |
| M4 | `run-the-first-experiment` | 105 | fits, 15 float |
| M5 | `learn-from-the-test` | 133 | **over by 13** (accepted, stated on the trainer Slot line) |
| M6 | `spot-gaps-build-the-loop` | 112 | fits, 8 float |

The punchlist's own per-file bullet still says *"M2 runs past its 2h slot by 6."* It is 3, and has been since commit `7dbdf0a` ("M2 fits the figure its own trainer page has been quoting"). That bullet wants correcting or deleting independently of anything here.

---

## Section 1 — Verified in the current curriculum

### Item 1 — Compounding includes deletion → **PROMOTE**

**Where it stands now.** The move is not buried; it is enacted. `curriculum/exercises/spot-gaps-build-the-loop.md:35` gives it a whole `##` slide (*Cut one stale rule the diagnosis killed*), the M6 module file's `## What You'll Learn` carries *"**Cut** one rule from `./CLAUDE.local.md` the diagnosis killed"*, and the file's leap test demands *"at least one rule deleted… the deletion commit visible in git history."* The item's framing — *"leaving it inside one exercise bullet"* — undersells what shipped.

What is genuinely missing is the **generalisation in the reminder slot**: M6's `## Key Concepts` has six bullets about accumulation and none about subtraction.

**Constraint that decides the shape.** M6 `## Key Concepts` measures **177w / 6 bullets** — at the bullet cap. Its own maintainer block says so: *"KC slide at 173w/6b, at the bullet cap — extend-don't-append stands."* So this is an extension, not a seventh bullet.

**BEFORE** — `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md:61`

> - Encoding is the third phase of test → learn → encode. Two sessions tested; the diagnosis learned; the handoff encodes. The loop closes when the lesson ships.

**AFTER**

> - Encoding is the third phase of test → learn → encode. Two sessions tested; the diagnosis learned; the handoff encodes. Adding is only half of encoding: a rules file that only grows compounds noise alongside the learning. The loop closes when the lesson ships.

**WHY.** The module has the student perform subtraction and then never names it in the slot the student re-reads; the general loop is add → sharpen → delete, and without the third verb the reminder slide teaches accumulation only.

**RISK — low/medium.** Slide goes 177w → 194w, still under 210, still 6 bullets. Two things to note rather than fear. (a) The exercise line it paraphrases is a registered backing claim, `rules-files-have-a-half-life · vision · ← none-owed`; per `check_writing.md §22` a claim with two bodies binds to both, so if you take this card, the KC wording and the exercise wording want reading together once. (b) `check_writing.md §19c` would flag a verbatim echo — the AFTER deliberately restates rather than copies.

---

### Item 2 — Parallelism has a topology, not just a count → **PROMOTE**

**Where it stands now.** The strongest statement is in an optional supplementary that never reaches the deck: `supplementary/workflow-composition-lineages.md` § *Single writer with advisor agents*, quoting Walden Yan verbatim — *"multi-agent systems work best today when writes stay single-threaded and the additional agents contribute intelligence rather than actions"* — plus the Cognition history (*"They tried parallel writers; conflicting implicit choices (style, edge cases) broke the work. Parallel reviewers feeding a single writer did not."*).

The half of the worry that says *more agents ≠ more throughput* is **already covered in-deck**, three times: `what-keeps-a-long-running-session-going.md` (backpressure, *"Every unread diff joins a queue downstream of the agent"*), `the-far-half.md` (Absorption), `the-map-filled-in.md` (*"Review bandwidth is the constraint composition cannot relax"*). What is not covered is **write-coupling** — parallelise reads, serialise coupled writes.

**Placement note.** The obvious home, `composing-the-workflow.md` § *From skills to a workflow*, is at **6 bullets** and its neighbouring slide states a deliberate refusal: *"How the field composes kits like this is a live argument with no settled answer, so there is no prompt to drill here."* Promoting the topology rule there means reversing a stated stance and cutting a bullet. The cheap alternative is to qualify the sentence that grants the permission, at the moment it is granted.

**BEFORE** — `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:36` (M5 module file, § *Hold the worry beside the artefact*, 100w/0b)

> Acting without full control is the job from here on. Build the check, send again. That control pays twice: a session your checks steer is a session you don't babysit, and a session you don't babysit can run beside another.

**AFTER**

> Acting without full control is the job from here on. Build the check, send again. That control pays twice: a session your checks steer is a session you don't babysit, and a session you don't babysit can run beside another, as long as the two are not writing the same files.

**WHY.** The sentence currently grants permission with no shape, and the shape is the whole finding: independent reads and reviews parallelise, coupled writes do not.

**RISK — low.** +11 words on a 100w slide. M5 is the module already over by 13, but this changes no leaf `**Time:**`, so the computed total does not move. The clause uses no unearned vocabulary. The alternative verdict is defensible and I would not argue hard against it: **LEAVE**, on the grounds that composition is explicitly routed to the supplementary and the course has chosen not to prescribe topology.

---

### Item 3 — The diff and the transcript are two evidence layers → **PROMOTE**

**Where it stands now.** Stated three times, and the sharpest statement is on a page that never projects.

- `curriculum/exercises/diagnose-and-resend.md:28` (M5, in-deck), as exercise logistics: *"Two places hold the story. The repo's git history … tells you *what* the agent did. That run's session transcript, at the path recorded in `task.md`, tells you *how* it got there, drift and dead-ends included."*
- `reference/claude-code-for-engineers.md:329` (**not in the deck**), as the general form: *"**Why both layers: git tells you what changed. The transcript tells you why the agent changed it, what it almost did, what it misunderstood, and where you steered. A good post-session read uses both.**"*
- `curriculum/lectures/what-packaging-is.md:237` (M5, in-deck), in passing: *"it runs the task, reads its own transcript, diffs the returns."*

So the generalisation exists, in full, on a reference page — the classic shape this whole hunt is about.

**BEFORE** — `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:55-58` (M5 `## Key Concepts`, 48w/4b — the most headroom of any destination in this set)

> ## Key Concepts
> - The model already knows the public field.
> - The missing evidence is the interaction of this task, model, repository, and setup.
> - The experiment produces a candidate, not an optimum.
> - The agent makes evidence cheap; the engineer decides what it means and what becomes durable practice.

**AFTER**

> ## Key Concepts
> - The model already knows the public field.
> - The missing evidence is the interaction of this task, model, repository, and setup.
> - The experiment produces a candidate, not an optimum.
> - The agent makes evidence cheap; the engineer decides what it means and what becomes durable practice.
> - Two evidence layers, not one. Git history says what the agent shipped; the session transcript says how it got there, drift and dead-ends included. Diagnosing from one alone misses the other half.

**WHY.** Outcome evidence without process evidence misses the mechanism of failure; process evidence without the diff misses what actually shipped — and right now the student meets that pair as instructions for one exercise rather than as a method they carry.

**RISK — low.** Slide 48w → 80w, 4 → 5 bullets. Both terms are earned inside M5 by the time the KC slide renders (Phase 1 reads the transcript). The one thing to watch: `check_pedagogy.md §126`-style test — *name the beat in this module that taught it* — passes cleanly on `diagnose-and-resend` Phase 1, so this is a reminder, not new material.

---

### Item 4 — Every check has a latency budget → **PROMOTE**

**Where it stands now.** `supplementary/how-the-best-do-ci-cd.md:43` § *Eval latency is part of the loop* (**not in the deck**):

> A 15-minute CI run feels fine when a human steps away for coffee. When the agent is waiting, 15 minutes is idle compute plus context loss plus a forced switch to another task. The best treat eval latency as a direct tax on what their kit can do for them. They split fast lane from slow lane. Cheap deterministic checks run in seconds and verify the agent's next move. Judges and gates run in minutes, in the background, on the merged change.
>
> **Husain** names the two halves: guardrails sit inline and block the response, evaluators run async on heavier compute.

The core course names verifier, judge and gate as one primitive and distinguishes them by **mechanism** and **placement in CI** — never by **clock**. Read cold, they sound interchangeable in cost.

**Destination.** `curriculum/lectures/the-loop-has-a-name.md` § *One primitive, placed wherever there's a bar* (M6, **92w / 2 bullets**, 118 words of headroom). This slide's entire subject is placement, which makes latency the axis it is missing. Its sibling `## The primitive that runs on cadence` covers scheduling, which is a different question — when it fires, not how long it takes.

**BEFORE** — `curriculum/lectures/the-loop-has-a-name.md:12-15`

> ## One primitive, placed wherever there's a bar
>
> - The shape fires on any workflow with a quality bar, not only agent sessions. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.
> - Naming it is what lets you reuse it. Once you see the verifier, the judge, and the gate as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

**AFTER**

> ## One primitive, placed wherever there's a bar
>
> - The shape fires on any workflow with a quality bar, not only agent sessions. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.
> - Naming it is what lets you reuse it. Once you see the verifier, the judge, and the gate as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.
> - Placement has a clock. A check that returns in seconds can sit inline and steer the agent's next move. A judge that takes minutes runs in the background, on the merged change. Put the slow one where the agent has to wait and you have bought idle compute, not confidence.

**WHY.** Students leave able to name three checks and unable to say where each belongs, and the placement rule is a clock, not a taxonomy — a judge in the inline slot stalls every session it guards.

**RISK — low.** 92w → 143w, 2 → 3 bullets. Two follow-ons if you take it, both below the fence and both apply-directly rather than card: the file's `<!-- backing -->` block owes a claim entry for the new line, and Husain's guardrails-vs-evaluators source (already stamped `[checked:2026-05-25 result:OK due:none]` in the CI/CD supplementary) should be inherited verbatim rather than re-stamped. No student-side attribution is owed — `check_writing.md §11` caps practitioner mentions per module and this is a mechanism, not a named framework.

---

### Item 5 — Two of the three soil-line priors exist only as figure microtext → **LEAVE (already closed; delete the bullet)**

This one is done, and the punchlist bullet quotes wording the corpus no longer carries.

**The quoted strip is stale.** The item quotes *"act under uncertainty · competence is the gate · a move counts when it crosses the wall."* The current strip, identical across all four map copies (`the-whole-map.md:84`, `the-loop-half-filled.md:101`, `the-far-half.md:95`, `the-map-filled-in.md:84`), reads:

> the soil it grows in: act under uncertainty · competence sets the ceiling · cross personal → team

**The weighted spoken home exists.** `curriculum/lectures/the-map-filled-in.md:91`, fourth bullet of § *The checking loop, drawn solid*:

> - The line along the bottom has been on the map since M2: *act under uncertainty · competence sets the ceiling · cross personal → team*. Every send-off acted before the answer existed. Every check you built raised what you could hand off. And the crossing is the one move still open.

And the same file's maintainer block carries a note headed, in your own words, **"Soil line spoken (2026-08-15, Antti-directed; buried-gold item)"**, which states that this bullet *"is its only spoken home — do not add siblings at M2/M3/M4, the earlier maps carry it visually by design"*, plus the trainer line *"land the soil line off the figure — three standing orders, read them from the map, never lectured."*

**Verdict.** The item's action — *"decide whether each gets one weighted spoken home or stays figure furniture"* — was decided on the day this file was last touched. Per this file's own opening rule, **delete the bullet**. Nothing to card.

---

### Item 6 — The dip-before-climb expectation hangs off another law's bullet → **LEAVE**

**Already landed, and the proposed destination is now closed by a rule.**

The sentence is not a stray trailing clause; it sits inside a bulleted law under its own bold handle in the M6 closing lecture, `the-map-filled-in.md:186`:

> - **Cross personal → team.** (Outcome) What survives the session is the fix, the rule it taught, and the skill it became; what compounds is the part a team takes up. Review infrastructure grows by accretion, one trusted check at a time, and it starts at the size of the one just shipped. Your own sessions speed up before the team's numbers move, because the team's way of reviewing and sharing has to be rebuilt around the new speed first; the checks and skills you hand over are that rebuild.

The file's maintainer block records the placement as deliberate and dated: *"the wall-crossing bullet (**Cross personal → team**) now carries a worded, no-math dip-before-climb mechanism"*, with the J-curve borrow logged (David 1990; Brynjolfsson, Rock and Syverson 2021, both verified live 2026-07-03) and the claim registered in the backing block as `dip-before-climb`.

**The item's proposed alternative is ruled out.** It asks whether the expectation should move to "the M6 close." `check_slides.md` § *`## Next` is two plain sentences* (Antti, 2026-08-14) says that slot is *what the next module does, what the student carries into it*, and that *"a closer that teaches has stolen the slide it was pointing at."* A dip-before-climb mechanism is teaching. M6's `## Next` cannot take it.

**Verdict: LEAVE.** The claim-shaped position it wanted, it has — bold handle, own bullet, M6's closing lecture, 183w/3b with 27 words of headroom if you ever want to sharpen it in place. This bullet is closeable too; I have left it in the table as LEAVE rather than delete only because the wording question ("trailing clause vs its own bullet") is still arguably open, unlike item 5.

---

### Item 7 — The ten-nudge ceiling never travels → **LEAVE**

**Current text, M4** — `curriculum/exercises/set-the-markers-send-it-off.md:56`, § *While it runs*:

> - Nudge by hand: answer a question, correct a path, push back on visible drift. Past ten or so interventions, you have become the agent; call it and read what is there.

**Current text, M5** — `curriculum/exercises/diagnose-and-resend.md:139`, § *Send it off and read the report cold*:

> Manual nudges are part of the session; when nudging turns into typing every step, the agent isn't the agent any more, that's a result worth reading.

**Why leave it.** Three reasons, and together they are decisive.

1. The M4 file's own accept-note (2026-08-02) defends the number precisely because *"they cannot know whether three nudges or thirty is normal"* — a first-timer's calibration. By M5 the student has run M4 and supplied their own number. Repeating it is bookkeeping, not calibration.
2. `check_pedagogy.md §9b` wants each recurrence of a move to wear a different face. The M5 line keeps the stance and swaps the numeric threshold for a felt one (*typing every step*). That **is** the variation; adding the number back collapses it into verbatim repetition, which §9b names as the failure.
3. `check_writing.md §20`'s memory-handle carve-out would license a travelling number only where the reader carries it away from its enumeration. Here the second site is a different beat with a different tell, not a recall of the first.

The item compares this to the 10% prior, which does travel. The disanalogy: the 10% prior is a fact about agents that stays true everywhere, while ten nudges is a pacing calibration for a first long run.

---

## Section 2 — The reason leaks out of the deck

### Item 8 — The context-window prior is absent from the deck → **LEAVE**

The item answers itself: *"the call is on the record; re-open it only if the long-run modules need students holding a trimmed window as a quality move rather than budget hygiene."* `the-loop-half-filled.md`'s maintainer block banks context-window capacity as a near-half law the closer skips, taught in the supplementary, *"It stays there."*

Nothing in the M4–M6 material asks the student to trim a window as a quality move — the long-run modules ask them to build checks, not to manage tokens — so the re-open condition has not fired. **No action.**

Worth knowing before you read item 10: that item proposes the same promotion under a different name.

---

## Section 3 — Outside-in practitioner lens

Read this section with the freshness ledger in hand. **Six of the ten sources fail or cannot pass `check_research_claims.md §2` as currently cited**, which is a finding about the list, not only about individual items.

| Item | Source | Ladder / freshness read |
|---|---|---|
| 9 | Orosz interview with Cherny | `[practitioner analysis]`, not direct — a journalist's write-up. Undated in the citation, and the corpus already carries a sibling Cherny-via-a-writer stamp at `result:CAVEAT due:asap`. **Fails §1 byline discipline as cited.** |
| 10 | internal `token-efficiency.md` | fine, no external claim |
| 11 | Ronacher, *The Final Bottleneck*, 2026-02-13 | **2 days outside the 6-month window** as of today. Describes a practice, so no §2a durable-account carve-out. |
| 12 | Ronacher, *Things That Didn't Work*, 2025-07-30 | **~12.5 months old**, describes a practice not a completed event. **Fails §2 outright.** |
| 13 | Willison, *Understand to participate*, 2026-07-02 | in window, `[practitioner direct]` — clean |
| 14 | Willison, *Fable's judgement*, 2026-07-03 | in window, `[practitioner direct]` — clean |
| 15, 16 | Husain & Shankar, Evals FAQ | undated in the citation. The corpus stamps a sibling FAQ page `[checked:2026-05-25 result:OK due:none]` as a durable FAQ entry; that inheritance would have to be made explicit per §11a. |
| 17 | Pocock, `grilling.md` on GitHub | living repo, no publication date. Needs a `checked:` stamp before it backs anything. |
| 18 | Klaassen, `every.to/guides/compound-engineering` | **URL mismatch.** The corpus stamps `every.to/source-code/compound-engineering-the-definitive-guide` at `[checked:2026-07-30 result:OK due:2027-01-30]`. A different URL for the same claim is the exact swapped-citation shape logged as `charles-rachitsky result:CORRECT` — where a substituted URL turned out not to carry the numbers it was cited for, for four months. Open the guide URL before it backs anything. |

Items 11 and 12 are both LEAVE on curriculum grounds anyway, so the freshness failures cost nothing there. Item 18's URL question would need settling before any card lands.

### Item 9 — Cherny: automate recurring review comments after a count → **NEEDS-ANTTI** (I recommend LEAVE)

**Not a gap — a stance conflict.** M2's lecture `how-instructions-grow.md` teaches the CLAUDE.local.md → CLAUDE.md → SKILL.md route and then refuses the ladder in body prose (line 27):

> This is one common route, not a promotion ladder. A useful skill can also emerge directly from repeated work.

and prints, as the figure's own closing caption, in 15px italic across the bottom of the diagram:

> No promotion step is mandatory.

That caption is registered as the backing claim `common-route-not-ladder · vision`. Adding *"after it recurs three or four times, write the check"* installs exactly the mandatory step the figure denies, on a slide the student sees.

The mechanism Cherny describes is also already in the corpus and already sourced better: the CI/CD supplementary's `cursor-bugbot` entry (verified live 2026-08-01) carries *"useful review comments becoming promoted rules"* as its transferable half, with the vendor telemetry stripped.

**Recommendation: LEAVE.** If you want the counting heuristic, it is a reversal of a printed caption in M2 and re-derivation of two figures, on the module that is over by 3. That is a decision, not an edit — hence NEEDS-ANTTI rather than a card.

### Item 10 — Cherny/Klaassen: retrieval architecture as core theory → **LEAVE**

This is item 8 wearing a different hat. The proposal is *"make context economics core theory"*; the deck-leak section records the decision that context-window material **stays in the supplementary**, banked in `the-loop-half-filled.md`'s maintainer block as a near-half law the closer skips: *"It stays there."*

What exists in-deck-adjacent today: `reference/claude-code-for-engineers.md:133` documents `@path` imports, and line 333 carries the operational half — *"Do not paste a whole transcript into another system. Point Claude at the file and ask for the narrow read you need."* Those are mechanics at point of use, which is where `check_student_facing.md §29` wants them.

**LEAVE**, and note that a "new" item on the outside-in list re-proposing a decision recorded two subsections above it is a small argument for pruning that list.

### Item 11 — Ronacher: review bandwidth governs safe throughput → **LEAVE (fully covered)**

Three in-deck statements, all AE101:

- `curriculum/lectures/what-keeps-a-long-running-session-going.md:16-17` — *"The session can produce changes faster than you can judge them. Every unread diff joins a queue downstream of the agent."* / *"Flow engineering calls the push from a slower downstream stage **backpressure**: slow down, stop, or redirect when the next stage cannot safely accept more."*
- `curriculum/lectures/the-far-half.md:106` — *"**Absorption** determines how much of the output you can actually take up. Generating is fast; reading, judging, and merging are not. On a long session the gap between the two decides your real throughput."*
- `curriculum/lectures/the-map-filled-in.md:178-180` — *"Review bandwidth is the constraint composition cannot relax. … Each eval that stands without you buys a piece of that budget back."*

That is the WIP law, stated three times under two coined names, with the payoff clause (checks buy capacity back) that Ronacher's piece does not carry. Nothing to add. The item's *"AE101 names backpressure, but does not yet teach work-in-progress as the governing quantity"* is simply wrong against the corpus.

### Item 12 — Ronacher: delete failed automation, keep negative knowledge → **JOIN (deletion half) + LEAVE (negative-knowledge half)**

**Deletion half** is item 1. It is taught, enacted, LO'd and leap-tested; the card at item 1 covers the missing generalisation. Fold this bullet into that one.

**Negative-knowledge half** — *"record what was tried and the acceptance variance"* — is genuinely absent. The nearest neighbour is `reference/prompt-anatomy.md:167` (*"Write what you tried and why it didn't work gives the agent somewhere to go besides invention"*), which is a within-session fail-loud instruction, not a durable record.

**LEAVE**, three reasons: the source fails §2 by a year; `check_pedagogy.md §26` bans reflective file-writes with no downstream reader, and no AE101 beat reads a failed-experiments log; and adding a second durable artifact to M6 competes with the gap map and stack-map that already are the M6 compound.

### Item 13 — Willison: comprehension gate at handoff → **NEEDS-ANTTI** (strongest of the ten)

**Genuinely absent, in-window source, and it is the course's own audience contract turned into a move.** The AE101 audience contract is *vouch for what you claim as yours*; nowhere does the curriculum ask the student to demonstrate they can. The nearest beat inverts the direction: M3's clear-the-session move has the **agent** surface what is still loose, not the student explain the change back.

If you want the cheapest possible version, here is the card. I am filing it as NEEDS-ANTTI rather than PROMOTE because it adds a claim the arc does not currently make, and that is your call, not mine.

**BEFORE** — `curriculum/exercises/compound-and-close.md:46-48`, § *What you built* (M1, 30w/0b)

> ## What you built
>
> **What happened:** One rules file, written from how you actually worked rather than from a template.
>
> Whether it earns its keep shows up the next time a session reads it.

**AFTER**

> ## What you built
>
> **What happened:** One rules file, written from how you actually worked rather than from a template.
>
> Whether it earns its keep shows up the next time a session reads it. So does whether you can still explain the change it shipped: what moved, why, and what the next safe edit would be.

**WHY.** As the agent's implementation outruns your model of it, passing checks stop being evidence you can vouch for the result — and a green PR is exactly where that debt hides.

**RISK — medium.** +22 words on a 30w slide, so the slide nearly doubles but stays far under cap; M1 has 3 minutes of float. The real risk is `check_student_facing.md §1`'s identity-criterion rule: *"could a student in this room satisfy it on the first attempt today?"* On M1's small bug fix, yes — which is why M1 is the right home and M4's send-off would be the wrong one. Second consideration: M1's `## What you built` is a `**What happened:**` block, and `check_writing.md §16` wants those to land on the artifact's destination. The AFTER extends past the destination sentence, which is a deliberate stretch of that shape and worth your eye.

### Item 14 — Willison: rule-to-judgment ladder → **NEEDS-ANTTI** (not a card)

Real, in-window, `[practitioner direct]`, and genuinely uncovered — nothing in AE101 teaches when to stop prescribing and let the agent choose inside stated boundaries. The nearest hit inverts it: `skills-from-the-frontier.md` § *The tool flags; you make the call*.

But this is not a bullet. It is the second half of the *Tensions the theory rewrite must preserve* subsection (*"encode invariants, constraints and evidence requirements; delegate observable, reversible choices; remove rules that no longer earn their context cost"*), and landing it means deciding what the course's stance on instruction accretion is — which touches M2's rules-file arc, M6's compound ladder and the delegation-frontier model in three files. **Post-cohort scope.** I would not open it before the first paying room.

### Item 15 — Husain & Shankar: error analysis before eval design, durable failure dataset → **LEAVE**

The calibration half is already taught: `the-gate-is-a-claim.md` carries Husain's hand-label-to-agreement loop. The missing half is a **growing case bank**, and AE101 has no slot for one — M5 diagnoses one run, M6 contrasts two, and there is no artifact that survives the training to accumulate into.

Building one means a persistent cross-module dataset the student maintains, which is a seventh module's worth of scaffolding for a six-module arc, and `check_pedagogy.md §26` blocks the cheap fake version (a file nobody downstream reads). **LEAVE.**

### Item 16 — Husain: keep exploration alive after the evaluator exists → **LEAVE**

`the-gate-is-a-claim.md` § *Gates decay* already teaches the Goodhart failure and its countermoves:

> A measure that becomes a target stops measuring. **Goodhart's law.** The LLM is an optimizer aimed straight at your gate… The countermoves are a hold-out and an integrity check. Keep a check the agent never sees… After a suspicious pass, inspect the gate itself.

Husain's claim has a different **rationale** (a targeted classifier structurally cannot find failures it was not built to describe) but the **same move** (hold something back from the check). `check_student_facing.md §26` says a rationale that does not change what the student does is a cut, and it says to run that test before the truth test. **LEAVE.**

### Item 17 — Pocock: grilling as an explicit pre-build artefact → **LEAVE**

The shape is used four times and credited twice:

- M2 `push-back-on-the-plan.md:5,93` — *"run a second-pass grilling"* + *"Credit: Matt Pocock for the original `grill-me` skill"*
- M3 `skills-from-the-frontier.md:6` — named to the student: *"patterned on Matt Pocock's `grill-me` skill… 'a relentless interview to sharpen a plan or design.'"*
- M3 `author-security-skill.md:47` — *"Claude grills you first."*
- M5 `diagnose-and-resend.md:98` — *"grill me on missing details… Ask three questions at a time. For each, recommend an answer."*

Naming it a fifth time as a portable pattern is what `check_writing.md §11` calls collecting credits, and `check_pedagogy.md §9b` says the varied instantiation across three modules **is** the design — same move, different face. The item's own wording (*"uses this shape locally without fully naming it as reusable task shaping"*) describes deliberate dosage. **LEAVE.**

### Item 18 — Klaassen: compounding is not complete until the next loop retrieves the lesson → **NEEDS-ANTTI** (cheap card available)

**Half-covered, and the missing half is the interesting one.** M1's `compound-and-close.md:48` defers the test rather than running it: *"Whether it earns its keep shows up the next time a session reads it."* M6's LO says *"**Encode** the lesson so the next loop inherits it"* — but nothing verifies the rule actually fires in a fresh session. The M1 leap test checks the rule was **written** and **integrated**, never that it **loaded**.

The cheapest version is one clause naming the trigger rather than a new beat.

**BEFORE** — `curriculum/exercises/compound-and-close.md:48`

> Whether it earns its keep shows up the next time a session reads it.

**AFTER**

> Whether it earns its keep shows up the next time a session reads it, so the rule that matters most is the one that loads without you asking.

**WHY.** A note that never fires is not a compound; Klaassen's finish line is *would the system catch this automatically next time*, and the arc currently stops at writing it down.

**RISK — medium, and there is a collision.** M2's whole opening beat has the student put exactly this question to Claude (*is this file auto-loaded?*), and `check_writing.md §16` records a landed instance where `extract-the-task-shaping-rule`'s recap answered that question two beats early and had to be cut. This AFTER edges toward the same trap: it asserts loading matters at M1, one module before M2 investigates it. It probably survives because it names a criterion rather than an answer — but that is the judgement, and it is yours. **Note also:** if item 13's card is also taken, both extend the same three-word sentence; they would need writing as one edit, not two.

---

## Section 4 — Enactment gaps

### Item 19 — No agent ever answers a human reviewer → **LEAVE**

**Confirmed absent.** M1 ships a real PR (`fix-tests-first.md` § *Ship the PR*) and a real ticket close-out (`close-the-ticket.md` § *Write the close-out and send it*); M3's `## Next` invokes reviewers as framing only (*"Your staff engineer sees a test-strategy skill… your CISO sees a STRIDE decision with an ADR"*). The agent produces review comments (`earn-the-trust`, `map-the-access-surface`) and mines them; it never answers one.

**Why leave it.** Two rules bite, independently.

- `check_pedagogy.md §11` — *does Claude have access, and whose judgement is it?* A reviewer's comment is an artifact that does not exist inside the slot. There is no reviewer in the room, no PR gets reviewed inside two hours, and the beat would have to synthesise the comment it then answers.
- `check_pedagogy.md §17` — corporate infra is never a forcing function. A live review thread is precisely the org dependency that rule exists to keep out of the critical path.

The item's own closing clause names the reason (*"cohort students have no live reviewer"*). It is right, and it is decisive. **Delete-able bullet, arguably.**

### Item 20 — No beat exercises the running software when the agent declares done → **PROMOTE, with a budget problem**

**The gap is real and the item scopes it correctly.** M5's Phase 1 deliberately keeps the student off the codebase (*"You hold the three lenses. You are not holding the codebase. The agent reads that for you."*) and should stay that way — that is diagnosis. The gap is in **Phase 3**, the verifier menu, where all three shapes stay at artifact level. Even the deterministic shell-hook is a check on produced work, not on the software running.

**The constraint.** `curriculum/exercises/diagnose-and-resend.md` § *Phase 3: Build the verifier for your worst failure* measures **202w / 4b**. The cap is 210. There are **eight words of headroom** on the whole slide.

**BEFORE** — `curriculum/exercises/diagnose-and-resend.md:75`

> Read what Claude proposes. Push back if the verifier covers the wrong shape (a generic test suite when you needed a judge, or the reverse). The fit between failure shape and verifier shape is what you are after. When the shape fits the failure, say *save it.*

**AFTER**

> Read what Claude proposes. Push back if the verifier covers the wrong shape (a generic test suite when you needed a judge, or the reverse), or if it never exercises the path a user takes. The fit between failure shape and verifier shape is what you are after. When the shape fits the failure, say *save it.*

**WHY.** Every countermove to premature completion in the corpus is a check the agent can satisfy without the software ever having executed, so *done* can be declared and verified on a system nobody ran.

**RISK — medium.** +10 words takes the slide to 212, **over the 210 cap**, and `node scripts/check-slide-size.js` will fail the build. Two ways out, and this is the part that needs your call rather than mine:

- **(a)** Take the +10 and pay for it by trimming the shell-hook bullet's forward-pointing tail (*"you will meet the word again if you extend the verifier to fire automatically between runs"* — 16 words), which is arc-narration of the kind `check_student_facing.md §33` cuts on sight. Net −6 words, landing at 196. My preference.
- **(b)** Take the shorter clause *"or if nothing ever runs"* (+5 words, lands at 207, fits), at the cost of some precision.
- **(c)** Add a per-slide accept-note. I would not: a permanently-flagged slide trains everyone to scroll past the warning, which is the reason `check_slides.md §14` makes the hatch per-slide in the first place.

### Item 21 — The student never points an agent at a repo they do not own → **LEAVE**

**Confirmed by design, not oversight.** `prework.md` § *1. Pick THE repo* pins one repository (*"Every module of this training starts from a Claude Code session in this repo"*), `getting-going.md` restates it (*"You'll stay in this one repo for the whole training"*), and `close-the-ticket.md` § *Anything can be reverse-engineered* declares the wider licence while admitting its own scale: *"The ticket is that move at its smallest."*

**Why leave it.** The single-repo contract is load-bearing for the thing the training actually sells — rules and memory compounding on one codebase across six modules. Enacting the full-size version means a second repo the student has no rules or memory in, which is the one place compounding cannot be observed. And the obvious cheap home does not exist: **M6 has no `## Homework` section** (its sections are Big Idea, Prework, What You'll Learn, Start here, Human close, Optional challenges, Key Concepts, Next), so a homework line means a new `##`, which means a new slide, on a module whose `## Start here` is already oversized.

A declaration deliberately left un-enacted is a legitimate shape. **LEAVE.**

---

## Findings that contradict the section's own framing

1. **Two of the seven "verified, still open" items are already closed.** Item 5's soil-line question was decided on 2026-08-15 with a maintainer note that names itself a *buried-gold item*; item 6's dip-before-climb mechanism landed 2026-07-03 with sources verified live. The section is not a punch list of open decisions; it is at least 29% changelog.
2. **Item 5 quotes wording the corpus does not carry.** The strip reads *competence sets the ceiling · cross personal → team*, not *competence is the gate · a move counts when it crosses the wall*. An item that cites stale text cannot be trusted to have re-read its own destination.
3. **The M2 overrun figure in the same file is stale** — 3 minutes, not 6, since commit `7dbdf0a`.
4. **One of the ten outside-in items is a decision recorded two subsections above it.** Item 10 (retrieval architecture as core theory) is the deck-leak section's context-window call under a different name.
5. **One outside-in item contradicts a printed figure caption.** Item 9's counting threshold installs a mandatory promotion step that `how-instructions-grow.md`'s diagram denies in 15px italic, as a registered backing claim.
6. **One is simply covered.** Item 11 asserts AE101 *"does not yet teach work-in-progress as the governing quantity"*; three lectures do, one of them in the exact words *"Review bandwidth is the constraint composition cannot relax."*
7. **Six of the ten outside-in sources fail or cannot pass the freshness and byline rules as cited**, including a Klaassen URL that does not match the one the corpus already stamps — the same swapped-citation shape logged as `charles-rachitsky result:CORRECT`.
8. **The section's framing that these are "cheap, no new theory, one beat each"** holds for the enactment gaps and for items 1–4. It does not hold for the outside-in list, where the three survivors (13, 14, 18) each add a claim the arc does not currently make.

### One thing found in passing, outside scope

`node scripts/check-slide-size.js --file curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md --report` reports **`## Start here` at 216 words — over the 210 cap, with no accept-note in the file's maintainer block.** M6 ships oversized on that slide today. Not a buried-gold item; worth its own bullet somewhere.

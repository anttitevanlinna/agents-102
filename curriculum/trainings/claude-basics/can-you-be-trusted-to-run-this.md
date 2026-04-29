# Can you be trusted to run this?

## Big Idea

Trust isn't a feeling. It's a checking system you can run on plausible output.

## Meta

- **Primary Bloom's level:** Apply → Evaluate
- **Prework:** none in Module 2 (Module 1 already had everyone in Cowork on the cohort SharePoint workspace; personal CLAUDE.md exists)
- **Homework:** none
- **Materials (organisers):** `shared/m2-verification-output.md`, prepared and pre-screened by the organisers before the cohort, plus the organisers' private answer key
- **Plug points:** the pre-staged two-page output; evidence surfaces available to the team; group verification files in `shared/`; the team rule in `shared/m2-verification-synthesis.md`

## What You'll Learn

After this module, you will be able to:

- **Extract** the factual claims worth checking from a plausible two-page output
- **Map** claims to the evidence surfaces that could ground them
- **Apply** two detection methods: source support and counter-evidence
- **Translate** group findings into personal CLAUDE.md rules for future Claude answers

## Connections

Think back to Module 1, or to your pre-work. Was there a moment when Claude told you something at work and you weren't sure if it was right?

In Module 1 you built a system on a task where you knew the answer. The output came out generic, you caught it, you wrote rules. The catches landed because the truth lived in your head.

Now point that same instinct at a two-page answer with about fifty claims. Some are wrong. Some are unsupported. Some cannot be checked from the room. That's the work the team will be doing after the workshop.

## Lectures

[Lecture: Why mostly right fails](lectures/why-mostly-right-fails.md)

## Exercises

[Exercise: Find the wrong claims](exercises/the-it-directors-prompt.md)

## Key Concepts (Emergent)

- Plausible output can carry many claims. A small wrong fraction is still enough to mislead users
- Source support and counter-evidence catch different failures. One asks whether the claim has ground; the other asks whether the ground pushes back
- The scoreboard is lightweight here: which method caught useful wrongness for this team
- *"I can't tell"* is a custodial answer, not a defect
- The method must survive the session. The final move is writing verification rules into personal CLAUDE.md

## Plug Points

- **The pre-staged output.** The organisers prepare `shared/m2-verification-output.md`: two pages, roughly fifty factual claims, with plausible wrongness seeded or preserved
- **The evidence surfaces.** Public docs, internal policy, intranet, SharePoint files, admin panels, or named owners. The organisers help with access mechanics; the team owns the judgment
- **The private answer key.** The organisers pre-screen enough claims to reveal 5-8 examples after the groups report
- **Group outputs.** Nominated group drivers write `shared/group-*-verification.md`; organisers run the separate synthesis exercise to write `shared/m2-verification-synthesis.md`

## Debrief

Five minutes. The personal rule-write already happened in Phase 5 of the exercise. This Debrief addresses what stayed open.

Ask Claude to list every row from your `verification-table.md` that stayed unsupported, overreaching, or *"I-can't-tell."*

**Prompt** *(Cowork)*

```
Read `verification-table.md` in my participant folder. List the rows with verdict unsupported, overreaches, or I-can't-tell.

For each row, show:
- the claim
- which check caught it, if any
- what evidence would close it

Don't suggest fixes. I want to see what stayed open.
```

Read the list in chat. One row, in your head: which open claim would matter most if a real user acted on the answer and it turned out to be wrong?

That question scales. Module 3 picks it up at the rollout level.

## Bridge

One plausible document, checked by groups, turned into operating rules. The rollout is bigger. What's the actual crux: the thing that, if got right, would make the rest follow?

## Organisers' Activities

[Exercise: Organisers synthesize verification](exercises/organisers-synthesize-verification.md)

## Prework for organisers

[Exercise: Organisers prepare Claude Basics](exercises/organisers-prepare-claude-basics.md)

<!-- maintainer -->

**Meta:**
- **Primary Bloom's level:** Apply → Evaluate
- **Length:** 45 minutes module. 3 Connections + 6 mini-lecture + 23 participant exercise + 4 synthesis + 4 personal rule-write + 5 Debrief/Bridge
- **Connections fallback if M1 didn't run.** Self-study readers and any cohort where M2 runs without M1 — replace the *"this morning's M1"* anchor with *"the last time you used Claude on something at work"*

**Quality:** draft 2026-04-29
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rule 35 audience-tier)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-judge-report.md` @ c25d7c4) PASS 12/12 — STALE after the 2026-04-29 exercise redesign
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched Connections + Bridge prose; re-sim recommended before next cohort
- draft 2026-04-29 (remote-resilient architecture edit: verification source is pre-staged in `shared/m2-verification-output.md`; sim/mechanical not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*

**Eval instance:** `curriculum/evals/instances/claude-basics--the-it-directors-prompt.md`

**Mood contract:** sober alert. Steady-hand custodial. Edits that resolve into *"we've solved hallucination"* steal M3's set-up. Edits that resolve into panic steal M1's empowerment.

**Frame to land (verbatim from strategy session 2026-04-27):**
- *"Trust isn't a feeling — it's a verification you run."*
- *"sober alert custodial — competence in the presence of fallibility, not panic and not false comfort."*
- From the offer (FI): *"Miten Claudesta saa hallittavan? IT-johtaja kirjoittaa ohjeet livenä, tiimi varmistaa että säännöt näkyvät tulosteessa ja tuntuvat toimivilta."*
- 2026-04-29 remote-resilient update: no live generation dependency. Verification starts from a pre-staged `shared/m2-verification-output.md`; group files feed a team rule.

# Exercise: Test the sharing plan

**Time:** 22 minutes.

The technical and people plans are hypotheses. This exercise tests the switch they assume, names the failure that could hide behind a clean technical build, and turns one assumption into a conversation.

## Test the switch assumptions

*10 min*

Use Roger Martin's question: *what would have to be true for this teammate, doing this job, to fire their current hire and use my candidate?*

{{prompt:share-your-work-5}}

`module-7/assumptions.md` now records the two or three tests you selected for this week.

## Name the likely failure and Monday move

*12 min*

Six months from now, the teammate went back to the incumbent. The agent writes three failure stories, then turns the strongest evidence into one named conversation and one test.

{{prompt:share-your-work-6}}

The agent carries the strongest failure pressure into `module-7/monday.md`: one person, one question about how they do the job today, and one selected assumption with its test.

## Take the transferable move with you

Before designing a solution, interview for the outcome. Pick the candidate against that outcome. Draft the technical and people plans together. Test the switch, not the solution. A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design.

<!-- maintainer -->

**Atomic — no phase markers.** The assumption test and failure story feed the same Monday action.

**Leap test — next working day:**

- Runs one row marked `SELECTED THIS WEEK` in `module-7/assumptions.md` and records what happened.
- Uses the question in `module-7/monday.md` with the named teammate before proposing a deployment.
- Revises the outcome or candidate when the real conversation contradicts the builder's hypothesis.

**Failure modes and escape hatches:**

- **Assumption test:** the rows collapse into beliefs such as *"the teammate sees value."* Have the agent replace each selected belief with a named conversation, small experiment, or observable check this week.
- **Premortem to Monday:** the first move becomes a deployment. Have the agent rewrite `module-7/monday.md` so the named teammate and job question happen before any build or rollout.

**Why this is one bounded exercise:** the assumption test, premortem, and Monday file are one Check-to-Act chain. The failure story pressures the selected assumption; the close turns that pressure into the next observable move.

**Framework sources:** [primary practitioner article] Roger Martin, ["The Risk of the Status Quo"](https://rogerlmartin.com/docs/default-source/Articles/strategy/rotman_spring07_riskofstatusquo.pdf?sfvrsn=d2dd3b82_0) — reverse-engineering what would have to be true; [practitioner article] Gary Klein, ["Performing a Project Premortem"](https://hbr.org/2007/09/performing-a-project-premortem) — the premortem. These techniques live inline because Module 7 applies them rather than teaching separate strategy packets.

**Quality:** compendium-audited 2026-08-25 (writing@a4be944f story@a4be944f technical@a4be944f behavior@a4be944f pedagogy@a4be944f strategy@a4be944f slides@a4be944f)
- judges @a4be944f: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

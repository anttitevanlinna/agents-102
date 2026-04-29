# Where is this all going?

## Big Idea

In 45 minutes the room produces a real rollout strategy together. The hard part isn't picking a tool. It's finding the crux.

## Meta

- **Primary Bloom's level:** Evaluate
- **Prework:** none in Module 3 (Module 2's break verdict is the entry condition; the IT Director carries it back into the room)
- **Homework:** none
- **Materials (trainer):** four group folders pre-created in the SharePoint workspace, two days pre-cohort, with read+write per group and IT-Director read across all four. The IT Director rehearses the cross-group synthesis prompt against four sample group files one day pre-cohort
- **Plug points:** the IT Director's break-time verdict; the team's actual rollout difficulties (named in the divergence interviews); the IT Director's live cross-group synthesis on screen

## What You'll Learn

After this module, you will be able to:

- **Articulate** the top three difficulties facing your team's Claude rollout, surfaced through a Claude-led interview
- **Synthesize** a group's divergent rollout difficulties into a single named crux using a synthesizer agent
- **Evaluate** which cross-cutting cruxes from a multi-group readout would actually move the rollout if addressed first
- **Recognise** the structure the room produced together (divergent voices, group convergence, cross-group synthesis) and how it scales the verification work from Module 2 to a rollout-level question

## Connections

The IT Director carries the break-time verdict back into the room. One thing that checked out, one thing that didn't, one *"I can't tell."* That verdict is the smallest version of what comes next. Module 2 ran verification on a single prompt. Module 3 runs it on the rollout itself.

The question to hold for the next 45 minutes: when the team rolls Claude out across the org, what's the **crux**? Not the long list of worries. The single thing that, if you got it right, would make the rest follow.

## Lectures

None in Module 3. The reveal at the close is the whole concept beat.

## Exercises

[Exercise: Find the crux](exercises/find-the-crux.md)

## Key Concepts (Emergent)

- The crux is what Richard Rumelt calls it. The one thing that, if got right, makes the rest follow. Most rollout strategies fail because they treat all difficulties as equal weight
- A divergent interview surfaces what each participant actually thinks; a synthesizer reads across and finds the pattern that no one person had named
- The structure that produced the answer is the structure the room was already inside of. The work routes through people; the architecture follows the work, not the other way round

## Plug Points

- **The break verdict.** IT Director's actual finding from Module 2's break, not a script
- **Group composition.** Trainer scales group count to participant count: 2-3 groups for 8 or fewer; 3 groups for 9-12; 4 groups for 13-16
- **The cohort's real rollout difficulties.** Each participant's divergence interview is on their own org's rollout, not a generic case
- **The cross-group synthesis.** IT Director's live work, on screen, in real time. The output is a real rollout strategy the IT Director takes back to the org

## Debrief

Two minutes. The reveal already happened in the exercise close; the Debrief sits with what changed.

Ask Claude to read the rollout strategy the IT Director just produced and name the one move you (the participant, not the IT Director) would prioritise this week.

**Prompt** *(Claude Code)*

```
Read rollout-strategy.md (the file the IT Director just produced from across the four group cruxes). Look at it from MY position on the team — not the IT Director's. Of the moves named in the strategy, which ONE would I personally do first this week, and why? One sentence. No hedging.
```

Read the answer in chat. The point isn't to act on it today. The point is that you can already see your own piece of the rollout, named concretely, in the strategy you helped produce.

## Bridge

There is no Module 4. The rollout is the work.

Chat level in. Out: a working system, a verification that holds on output whose answer wasn't already known, a rollout strategy the team owns, and the named identity of *Claude custodian* for the org. The check-back happens at week 1, week 4, week 12.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Evaluate
- **Length:** 45 minutes. 4 Connections + 3 concept + 32 exercise + 4 reveal/reflection + 2 Debrief/Bridge
- **Sponsor-as-participant rule fires hardest in M3.** The IT Director MUST drive Phase 3 of the exercise live. If they're frozen by stage fright or tool unfamiliarity, the magic beat collapses. Pre-cohort rehearsal (one day before): trainer fakes four sample group-crux files, IT Director runs the cross-group synthesizer prompt against them, produces a rollout-strategy.md. They've done the move once; they're not inventing it cold on cohort day
- **Group folder access topology — set up two days pre-cohort.** The IT Director or the customer's IT admin creates four group folders inside the cohort SharePoint workspace. Each group's members get read+write to their own group's folder. The IT Director gets read access across all four. Without this, Phase 2 cross-folder file-sharing breaks and Phase 3 cross-group synthesis has nothing to read
- **The reveal is scripted only at Phase 3 close.** Trainer's silent-presence stance through Phase 1 and Phase 2 protects the magic. If the trainer hints earlier that *"you're building a multi-agent system,"* the lived discovery dies. Reveal lands AFTER the IT Director's strategy file is saved
- **No M4.** The training ends at M3. Resist the urge to bridge into a phantom next-module. The send-off is *"the rollout is the work"*

**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule 12 in-chat + rule #3 no-narrate-student-state + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rule 35 audience-tier, check_lectures v2026-04-27)
- sim-passed 2026-04-28 (IT-admin-medium-light-chat persona post-sweep re-sim returned APPROVE; all six beats ≥8/10; reveal lands forward-awe not performative)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md` @ c25d7c4) PASS 13/13 — verbatim round-trip on all 3 prompts; pre-staged files untouched (A2); Phase 1 one-question-at-a-time discipline; Phase 3 cross-group push-back integrated as voice-shaping

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`

**Mood contract:** expanded horizon. Forward awe with a deliverable in hand. Edits that resolve into graduation-ceremony register steal the forward hunger. Edits that resolve into *"now you know what to do"* are correct; edits into *"we're done here"* are wrong.

**Frame to land (verbatim from strategy session 2026-04-27):**
- *"The IT team IS the multi-agent system that ships the rollout. The hard part isn't picking a tool — it's finding the crux."*
- *"Oh — we just did the thing we're worried about doing."*
- *"forward awe with a deliverable in hand."*

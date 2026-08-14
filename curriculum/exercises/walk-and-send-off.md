# Prep the run, *fill the gaps*

**Time:** 55 minutes.

**Session** *(new, "Module 4 - Run the first experiment")*

```
/rename m4-walk-send
```

Start clean at your repo root. The task here is bigger than anything so far. Before the new session, check your working tree and branch. You ride that state into the closing `m4/<slug>` commit, and the next module forks its worktree from that commit.

**What you do:** walk a task you've been avoiding against what you've built, then fill the worst gaps it exposes.

**What you build:** a scoped task, and the worst gaps filled in `observations/`.

**The point:** you find the thin spots before the agent does.

---

## Phase 1: Pick the task you'll send off

*10 min*

- Bring one or two candidates: a real slice you'd send off rather than nudge bit by bit.

Ask Claude to screen your candidates, scope the winner, and add them after the colon.

{{prompt:walk-and-send-off-1}}

## Push back until the task is one end-to-end slice

- Push back when the screening goes off-topic, or misses something you know about the codebase.
- You'll use this task again next module.

## Phase 2: Build the ranked list of what will hurt the agent

*45 min*

- The agent reads `CLAUDE.md`, `CLAUDE.local.md`, memory, ADRs, and any skills you've authored, then ranks the five thin spots that will hurt it most on this task.
- Heavy audit expected. Skim past the opening summary; the ranked thin-spots list is the payoff. If the ranked list comes back thin, push Claude to keep digging rather than letting a shallow pass stand as done. If it comes back long and unranked, send it back for five, ranked.

Ask Claude to run the audit as a subagent and return a ranked top-five.

{{prompt:walk-and-send-off-2}}

## Correct the list and reprioritise it

- The ranking is Claude's read of your system. Tell it what's wrong, what's missing, and what you'd move up.

## Fill the worst two or three gaps

- Pick the ones that will hurt the agent most, probably two or three, not all five. You'll see next module what the others were for.
- New observations land in `observations/`, gitignored. That's the default home. If your team kit pins a different path, tell Claude which one and stay consistent with it. If `observations/` is new to your repo, ask Claude to add it to `.gitignore` before any writes; the fills below land there and you don't want them tracked.
- The agent reads `observations/` when a prompt names the path, the same way it reads your ADRs. It is not auto-loaded the way `CLAUDE.md` and `CLAUDE.local.md` are.

Ask Claude to walk the picked gaps one at a time, with AskUserQuestion.

{{prompt:walk-and-send-off-3}}

## Match each fill to its shape and home

A fill looks like one of these shapes (the audit tags each gap with one):

- **Observation or rule:** *"Add this to observations: the payments service treats idempotency keys case-sensitively even though the docs don't say so."* Lands in `observations/`.
- **Sharpen an existing rule:** *"In my `CLAUDE.local.md`, under 'testing', replace the current mocking rule with one that says: integration tests hit a real Postgres in Docker; unit tests mock at the service boundary, never at the repository."* Lands in `./CLAUDE.local.md`. (Team-worthy version would go in a PR against `CLAUDE.md` separately.)
- **Wire a connector:** if the task needs something only a connector reaches (issue tracker, staging logs, internal API), wire it now while the task is on your mind, not mid-send-off. Claude Code action, not a file write.
- **Bring the material in:** if the task turns on business rules the repo doesn't carry (customer segments, regulatory scope, team commitments), fetch them. Paste the section, export the Notion page, save the PDF, give Claude the link if it can reach it. Tell Claude to land what you bring in `observations/`. A pointer the agent can't open is not context.

## Push back when Claude drifts from the codebase

- If Claude says something about your codebase you didn't tell it, ask where it read that.

## Compare notes, then tidy the folder

> **Time check.** Different paces hit this point at different times. The room doesn't wait for the slowest. Five to ten minutes here.

- Compare notes with the people around you: what surfaced, where the audit missed, when the agent went lazy.
- Optional, before the send-off: tidy the folder. *"Propose 5 to 10 ways to make `./observations/` load better into future sessions, in priority order."* Take as many as you want from the top.

<!-- maintainer -->

**View summary:** You choose a task large enough to expose drift, ask the agent to find the thinnest parts of your existing context, fill only the worst gaps, and send the task off un-packaged. That first run becomes evidence for the next module.

**`Wire a connector` stays, and owes no setup teaching.** (Antti 2026-08-13, closing a maintainer-call.) The objection was that AE101 never teaches connector setup, so the fill menu asks for a move the training has not equipped. The call: assume this audience already knows how to add a connector. It is ordinary working knowledge for the engineers in the room, not a curriculum coinage, so teaching it would be earning a term they already own — the failure mode `check_student_facing.md` §2 warns about, where over-applying the earn rule strips out the language that makes the material sound written by someone in the trade. Do not cut the shape, do not add a setup beat, and do not re-raise: the other three fills are file writes, this one is not, and that asymmetry is fine.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads and the "Start clean." paragraph lead de-bolded; kept bold only on the four fill-shape menu handles (**Observation or rule** / **Sharpen an existing rule** / **Wire a connector** / **Bring the material in**); widget/label chrome untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**The compare-notes beat is one slide, two moves, and the room line is deliberate (rebuilt 2026-08-14, Antti-directed).** The slide was a timing callout with the room-share folded into it and a single tidy bullet hanging below; it now reads as one beat: (a) compare notes with the people around you, (b) optionally run the folder tidy-up before the send-off. The callout is pure timing now, and **the room naming moved into bullet (a), which keeps this file at exactly one room line** — the ceiling `check_student_facing.md` §2 sets for the lifted acknowledge-the-room ban. *Compare notes with the people around you* names that others are present and that talking to them is worth doing; it mandates no utterance, no addressee, and no report-back, which is the line §2 actually draws. The 5–10 minute window is a trainer cue (catch-up for slower paces plus the banter beat on agent laziness). Do not re-flag as a room-share command, and do not add a second room line elsewhere in this file.

**Prompt register — `walk-and-send-off-3` rewritten 2026-05-21.** Earlier "deliberately short" speed-up shape (*"You propose solutions and ask questions. Use the ask-questions tool to speed up my work."*) was the cohort's single biggest individual failure mode (M4 12:36Z + 12:37Z: outright-skipped exercise). Rewritten to scaffold the gap-fill structurally with `AskUserQuestion` by name + pick-then-walk loop + per-shape destination mapping (`observations/` for observations and brought-in material; `./CLAUDE.local.md` for rule sharpening; connector setup for connector wiring). The fourth shape is **Bring the material in**, and it asks the student to fetch the document, not to label the gap — do not reintroduce a naming-only tag, in body or registry. Pairs with `author-test-strategy-skill-1`'s 2026-05-21 close — same family fix (replace push-back-by-convention with tool-by-name). Body restructured so the prompt is the default flow, not an opt-in speed-up; conversational-example bullets demoted to "what a fill looks like" reference after the prompt fence, each bullet now naming the matching destination.

**Quality:** compendium-audited 2026-08-13 (writing@19249df story@19249df technical@19249df behavior@19249df pedagogy@19249df strategy@1c765f2 slides@19249df)
- judges @19249df: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~750 words body.

**Placement:** `set-the-markers-send-it-off.md` follows immediately and closes M4. This file's own `**Time:**` line at the top is the only duration it owns; the module total is computed — `node scripts/calculate-time.js run-the-first-experiment`.

<!-- backing -->

Claims
- `find-thin-spots-before-the-agent-does` · vision · "you find the thin spots before the agent does" ← none-owed
- `push-if-the-ranked-list-comes-back-thin` · vision · "If the ranked list comes back thin, push Claude to keep digging rather than letting a shallow pass stand as done." ← none-owed

Sources
(none. Every claim is the exercise's own design stance or a move the student runs against their own repo. The one borrowed frame is generic business-analysis vocabulary that owes attribution by name only.)

Frameworks
- Gap analysis · [borrow:business analysis] · law:none · ← cultural-vocab — the Phase 2 audit is this move, and the body never names it. Deliberate: the label is universally known and adds nothing the ranked list does not already do. Do not reintroduce it as a named method.
- Test and learn · [borrow:none] · law:variation-selection-retention · ← cultural-vocab — the un-packaged run is the variant this arc generates; the next module selects
- Name the uncertainty before you move · [borrow:none] · law:name-the-uncertainty-before-you-move · ← none — the fit-check against long-run criteria is this governor fired before a send-off

Stance `[stance:2026-08-01 level:L1]`
- holds: that a deliberately un-packaged first run teaches more than a lecture about packaging would. **This is a pedagogy stance, not a field finding, and it should never acquire a citation** — the warrant is the contrast the student experiences a module later, and dressing it in practitioner evidence would misdescribe why we do it.
- contested: nothing in the file. The design bet is real but it is ours to make and ours to test, and the module that follows is the test.
- would-move-it: cohort evidence that the un-packaged run reads as a waste of an hour rather than as the setup for a contrast. That is delivery evidence from a room, not research — the first cohort has run, so this is answerable rather than hypothetical.

OODA
- question: did the un-packaged send-off land as a deliberate baseline or as a failed exercise, in the rooms that have run it?
- roster: none external — cohort debrief notes and the module's own `- cohorts:` log.
- last-run: 2026-08-01

<!-- /backing -->
**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- scopes a real backlog task down to one end-to-end slice, pushing back where the agent's screen misses something they know about the codebase
- walks an audit prompt against a real backlog task before sending it off, fills the worst three gaps
- tidies `./observations/` from a ranked list of proposals rather than leaving the folder as it fell out of the session

**Failure modes + diagnostics:**
- **Phase 1 task-sprawl** — student picks the quarterly epic. Diagnostic: the scoped task doesn't have a "done" the student can name. Fix: trainer forces a slice; better a smaller task that runs the full arc.
- **Phase 2 audit busywork** — Claude returns 12 items instead of 5, student drowns. Diagnostic: prompt wasn't ranked-top-5 enforced. Fix: re-run the prompt; enforce ranking; student picks top 3.
- **Phase 2 over-fill** — student tries to close all five gaps. Diagnostic: *"just one more"* creep. Fix: trainer names the sponge-not-rock rule; M5 will teach the other two.
- **Package-pre-empt at the hand-off** — student tries to add a plan.md or build a verifier before the task leaves. It surfaces here, at the fill beat, but the send-off itself now lives in `set-the-markers-send-it-off.md`, which owns the diagnostic and the trainer move.

**Plug points:**
- Student's own task you'd send off rather than nudge bit by bit (Phase 1 pick)
- Sponsor-stated rules-file home (Phase 2 rule-sharpening target)
- Sponsor-stated memory / business-rules home (Phase 2 fill destination for business-rules pointer)
- Sponsor-stated ADR convention (memory already references; no new move here)

**Decision points (pacing):**
- **Phase 1 >15 min** — task is too big. Force a slice.
- **Phase 2 audit >15 min** — Claude returned too much. Re-run with ranked-top-5 enforcement.
- **Phase 2 fill short (<15 min)** — student accepted Claude's drafts without push-back. Trainer prompts for a codebase-specific correction on at least one fill.
- **Settle beat waved through** — tidy-up and diff-review took under a minute. Check the `observations/` tree actually got tidied and the diff seen before the send-off.
- **Whole-room mood below 7** — curious readiness isn't landing. Check Phase 1: real task or compliance task? Task-selection is where this mood starts or dies.

**Send-off mechanism:** owned by `set-the-markers-send-it-off.md`, which runs immediately after this exercise. Do not restate the same-session rule, the laptop-sleep capability note or the trace-preservation contract here.

**Watch-fors (cross-phase):**
- Task sprawl at Phase 1 — the biggest single failure mode; everything downstream is sized by the task pick.
- Audit busywork at Phase 2 — re-run the prompt, don't let student filter a 15-item list manually (that's the anti-pedagogy from `check_student_facing` #9).
- Voice-smuggling at the fill beat or the close — if it starts sounding like M5's unleashed leverage, student thinks this is the leverage moment. It isn't. M4 is readiness without completion.
- Package-pre-empt at the fill beat — the highest-probability module-specific failure, and it starts here even though it lands next door.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

**M4 has no Debrief — this file names the module's send-off, or "the close".** `run-the-first-experiment.md` closes on the send-off itself, so a Debrief is not a section the student reaches. The label belongs nowhere in this file, body or trainer metadata. A `## What closes the module` section used to preview that section's beats here (return markers, trifecta check, send-off paste); it was cut 2026-08-12 as a forward-pointer duplicating the module text a screen below it. Do not restore it — the module owns its own close.

**`walk-and-send-off-4` stays retired.** The settle-the-tree beat runs as plain body prose at the close of the fill section: no heading, no fence. The three-block frame is deliberately absent — it names the memory architecture without advancing the curriculum — and the propose-then-review-the-diff move is on its third rep in this file by that point (Phase 1 pick, Phase 2 audit, Phase 2 fill), so prose carries it. Do not re-fence it, even lighter.

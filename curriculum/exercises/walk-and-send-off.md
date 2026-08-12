# Walk and *send off*

**Time:** 55 minutes.

**Session** *(new, "Module 4 - Run the first experiment")*

Start a new Claude Code session at your repo root.

```
/rename m4-walk-send
```

Start clean. The task here is bigger than anything so far. Before the new session, check your working tree and branch. You ride that state into the closing `m4/<slug>` commit, and the next module forks its worktree from that commit.

**What you do:** walk a task you've been avoiding against what you've built, then send it off un-packaged.

**What you build:** a scoped task with a 'done' you can name, and the worst gaps filled in `observations/`.

**The point:** sending this off un-packaged is what teaches you what packaging adds later.

---

## Phase 1: Pick the task you'll send off

*10 min*

- A real slice you'd send off rather than nudge bit by bit, with a 'done' you can name in a sentence. Bigger than a typo-fix, smaller than an epic.
- The pick is yours; the fit-check is the agent's. Bring one or two candidates; the agent screens them for fit against the three long-run criteria.

Ask Claude to screen the candidates you bring against the three long-run criteria and scope the winner. Drop the candidates after the colon.

{{prompt:walk-and-send-off-1}}

## Push back until the task is one end-to-end slice

- Push back when the read misses the codebase. The agent is reading the shape, not the substance.
- Imagining a finished demo means you scoped too big. Slice it down to one end-to-end thing that gives the agent something real to work with.
- Pick one task well. You'll use it again next module.

## Phase 2: Build the ranked list of what will hurt the agent

*45 min*

- The audit walks your whole system so you don't. The agent reads `CLAUDE.md`, `CLAUDE.local.md`, memory, ADRs, and any skills you've authored as a subagent, then ranks the five thin spots that will hurt the agent most on this task.
- Heavy audit expected. Skim past the opening summary; the ranked thin-spots list is the payoff. If the ranked list comes back thin, push Claude to keep digging rather than letting a shallow pass stand as done. If it comes back long and unranked, send it back for five, ranked.

Ask Claude to run the audit as a subagent and return a ranked top-five.

{{prompt:walk-and-send-off-2}}

## Read the ranked thin-spots

- Name which ones you already knew, which surprised you. This move is *gap analysis*: walk the system you have against the system the task needs. You'll use it for every agent hand-off.

## Fill the worst two or three gaps

- Pick the ones that will hurt the agent most, probably two or three, not all five. You'll see next module what the others were for.
- New observations land in `observations/`, gitignored. That's the default home. If your team kit pins a different path, tell Claude which one and stay consistent with it. If `observations/` is new to your repo, ask Claude to add it to `.gitignore` before any writes; the fills below land there and you don't want them tracked.
- The agent reads `observations/` when a prompt names the path, the same way it reads your ADRs. It is not auto-loaded the way `CLAUDE.md` and `CLAUDE.local.md` are.

Ask Claude to walk you through the picked gaps one at a time, using the AskUserQuestion tool to scaffold the flow.

{{prompt:walk-and-send-off-3}}

## Match each fill to its shape and home

A fill looks like one of these shapes (the audit tags each gap with one):

- **Observation or rule:** *"Add this to observations: the payments service treats idempotency keys case-sensitively even though the docs don't say so."* Lands in `observations/`.
- **Sharpen an existing rule:** *"In my `CLAUDE.local.md`, under 'testing', replace the current mocking rule with one that says: integration tests hit a real Postgres in Docker; unit tests mock at the service boundary, never at the repository."* Lands in `./CLAUDE.local.md`. (Team-worthy version would go in a PR against `CLAUDE.md` separately.)
- **Wire a connector:** if the task needs something only a connector reaches (issue tracker, staging logs, internal API), wire it now while the task is on your mind, not mid-send-off. Claude Code action, not a file write.
- **Name a business-rules gap:** if the task touches customer segments, regulatory scope, or team commitments and you don't have that written anywhere Claude can read, *the gap IS the finding*. Write one line in observations naming what's missing and where the real material lives (external wiki, team Notion, sponsor's head). Claude knows what it doesn't know. That's still context. Lands in `observations/`.

## Push back when a fill drifts from the codebase

- Your observations are what you just admitted is thin in spots. Don't let them re-seed with drift. Push back when Claude writes something that doesn't match the codebase.

> **Time check.** Different paces hit this point at different times. The room doesn't wait for the slowest. Five to ten minutes to share what surfaced, where the audit missed, and why the agent sometimes goes lazy.

- Before the send-off, ask Claude to propose any tidy-up of `./observations/`. Cap it at one or two file moves or renames; leave the ADRs and skills where they are, and ask to see the diff before it lands.
- Consider whether each rule is stored where it will fire. A rule the agent never reads is not a rule.

**What happened:** One scoped task, a ranked audit of the system against it, and the worst gaps filled. The `observations/` tree is settled on disk before the send-off.

## What closes the module

The exercise ends here. The module's send-off takes over:

1. You set the two return markers: ask Claude where this session's transcript lives, then ask it to commit the current state on a feature branch and report the short SHA. Push the branch if you want the experiment to outlast your laptop. The next session forks from that commit and reads the transcript.
2. You run the trifecta check: does the agent hold private data, does untrusted content reach its context window, is there a channel out? All three at once is the opening that prompt injection needs. All three present here, cut one leg before you send.
3. You paste the send-off prompt to the same session. Keep the laptop awake and plugged in. Don't close the lid; sleep freezes the session and it won't resume on wake. If you want to stop the session early, wait for a tool call to finish; clean interrupts between tool calls are fine. Traces are data either way.

<!-- maintainer -->

**View summary:** You choose a task large enough to expose drift, ask the agent to find the thinnest parts of your existing context, fill only the worst gaps, and send the task off un-packaged. That first run becomes evidence for the next module.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads and the "Start clean." paragraph lead de-bolded; kept bold only on the four fill-shape menu handles (**Observation or rule** / **Sharpen an existing rule** / **Wire a connector** / **Name a business-rules gap**); widget/label chrome untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Time-check callout — deliberate exception to `check_student_facing.md` preamble (room-share commands).** The Phase 2→Phase 3 callout uses *"to share what surfaced, where the audit missed, and why the agent sometimes goes lazy."* The preamble bans room-share commands (`share with your neighbor`, `tell the room`, `say X out loud`); *to share* without an addressee reads as invitational room-energy, not a student-action mandate. The blockquote shape + named 5–10 min window is a trainer cue (catch-up window for slower paces + banter beat on agent laziness). Future judges should not re-flag.

**Prompt register — `walk-and-send-off-3` rewritten 2026-05-21.** Earlier "deliberately short" speed-up shape (*"You propose solutions and ask questions. Use the ask-questions tool to speed up my work."*) was the cohort's single biggest individual failure mode (M4 12:36Z + 12:37Z: outright-skipped exercise). Rewritten to scaffold the gap-fill structurally with `AskUserQuestion` by name + pick-then-walk loop + per-shape destination mapping (`observations/` for observations and business-rules gaps; `./CLAUDE.local.md` for rule sharpening; connector setup for connector wiring). Pairs with `author-test-strategy-skill-1`'s 2026-05-21 close — same family fix (replace push-back-by-convention with tool-by-name). Body restructured so the prompt is the default flow, not an opt-in speed-up; conversational-example bullets demoted to "what a fill looks like" reference after the prompt fence, each bullet now naming the matching destination.

**Quality:** compendium-audited 2026-08-02 (writing@1c765f2 story@1c765f2 technical@1c765f2 behavior@1c765f2 pedagogy@1c765f2 strategy@1c765f2 slides@1c765f2)
- judges @1c765f2: writing PASS, story PASS, technical PASS (verify-refuted), behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~750 words body.

**Placement:** the send-off closes M4 after this exercise. This file's own `**Time:**` line at the top is the only duration it owns; the module total is computed — `node scripts/calculate-time.js run-the-first-experiment`.

<!-- backing -->

Claims
- `unpackaged-send-off-teaches-what-packaging-adds` · vision · "sending this off un-packaged is what teaches you what packaging adds later" ← none-owed
- `done-you-can-name-in-a-sentence` · vision · "with a 'done' you can name in a sentence" ← none-owed
- `pick-is-yours-fit-check-is-the-agents` · vision · "The pick is yours; the fit-check is the agent's." ← none-owed
- `imagining-a-demo-means-too-big` · vision · "Imagining a finished demo means you scoped too big." ← none-owed
- `audit-walks-the-system-so-you-dont` · vision · "The audit walks your whole system so you don't." ← none-owed
- `push-if-the-ranked-list-comes-back-thin` · vision · "If the ranked list comes back thin, push Claude to keep digging rather than letting a shallow pass stand as done." ← none-owed
- `gap-analysis-move` · borrowed · "walk the system you have against the system the task needs" ← cultural-vocab

Sources
(none. Every claim is the exercise's own design stance or a move the student runs against their own repo. The one borrowed frame is generic business-analysis vocabulary that owes attribution by name only.)

Frameworks
- Gap analysis · [borrow:business analysis] · law:none · ← cultural-vocab — named in prose as *walk the system you have against the system the task needs*, never as a branded method
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
- opens a worktree on a clean branch when a real task warrants the un-watched send-off shape
- walks an audit prompt against a real backlog task before sending it off, fills the worst three gaps
- sends off un-packaged in the same Claude Code session and cancels when the trace is enough, treating the cancel as data not failure

**Failure modes + diagnostics:**
- **Phase 1 task-sprawl** — student picks the quarterly epic. Diagnostic: the scoped task doesn't have a "done" the student can name. Fix: trainer forces a slice; better a smaller task that runs the full arc.
- **Phase 2 audit busywork** — Claude returns 12 items instead of 5, student drowns. Diagnostic: prompt wasn't ranked-top-5 enforced. Fix: re-run the prompt; enforce ranking; student picks top 3.
- **Phase 2 over-fill** — student tries to close all five gaps. Diagnostic: *"just one more"* creep. Fix: trainer names the sponge-not-rock rule; M5 will teach the other two.
- **Send-off package-pre-empt** — student tries to add a plan.md or build a verifier before sending off. Diagnostic: *"should I just quickly…"* Fix: trainer names the rule — *"un-packaged is by design. Don't pre-empt M5's learning."*
- **Send-off anxiety** — student hesitates at the final paste. Diagnostic: *"what if it runs forever / breaks things / gets nowhere?"* Fix: trainer names cancel-is-legit — *"stop it when you've seen enough. Traces are data."*

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

**Send-off mechanism (module close, step 3):**
- Student passes the final prompt to the SAME Claude Code session they've been in for 90+ minutes. No new session. No `/schedule`, no `/loop`, no cloud runner.
- Student closes the laptop (power settings + plugged in) OR stops the run mid-flight when observation is sufficient.
- Trace preservation: Claude Code scrollback is the artifact M5 reads. Anything the student's configured for conversation logging continues.
- **Capability verified:** laptop-sleep freezes the session (not resumable on wake); Ctrl+C mid-tool-call can corrupt the `.jsonl`; no per-session token budget. Details in `reference/claude-code-for-engineers.md § 9`.

**Watch-fors (cross-phase):**
- Task sprawl at Phase 1 — the biggest single failure mode; everything downstream is sized by the task pick.
- Audit busywork at Phase 2 — re-run the prompt, don't let student filter a 15-item list manually (that's the anti-pedagogy from `check_student_facing` #9).
- Voice-smuggling at the fill beat or the close — if it starts sounding like M5's unleashed leverage, student thinks this is the leverage moment. It isn't. M4 is readiness without completion.
- Package-pre-empt at the close — the highest-probability module-specific failure.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

**M4 has no Debrief — this file names the module's send-off, or "the close".** `run-the-first-experiment.md` closes on the send-off itself, so a Debrief is not a section the student reaches. The label belongs nowhere in this file, body or trainer metadata. `## What closes the module` tracks that section's beats in its own order: return markers, trifecta check, send-off paste.

**`walk-and-send-off-4` stays retired.** The settle-the-tree beat runs as plain body prose at the close of the fill section: no heading, no fence. The three-block frame is deliberately absent — it names the memory architecture without advancing the curriculum — and the propose-then-review-the-diff move is on its third rep in this file by that point (Phase 1 pick, Phase 2 audit, Phase 2 fill), so prose carries it. Do not re-fence it, even lighter.

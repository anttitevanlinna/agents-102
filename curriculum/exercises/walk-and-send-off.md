# Walk and *send off*

**Time:** 55 minutes inside a 1h45 module slot (Phases 1–2, breakdown: pick 10 / walk-and-fill 45). The send-off (~5 min, single prompt paste) closes the module after this exercise.

**Session** *(new, "Module 4 - Run the first experiment")*

Start a new Claude Code session at your repo root.

```
/rename m4-walk-send
```

Start clean. The task here is bigger than anything so far. Before the new session, check your working tree and branch. You ride that state into the closing `m4/<slug>` commit and the fork that follows.

**What you do:** Pick a task you've been avoiding, the kind you'd send off rather than nudge bit by bit. Walk what you've built so far against it. Fill the worst gaps and settle your `observations/` tree on disk. At the close, send the task off, un-packaged, to the same Claude Code session. Leave the laptop awake while you step away, or stop the run when you've seen enough.

**What you build:** two things a long run can ride: a scoped task with a 'done' you can name in a sentence, and the worst gaps filled in `observations/` and your rules file, with the `observations/` tree settled on disk. Then it goes off un-packaged.

**The point:** This is the first experiment of a two-run arc. The un-packaged send-off here is what teaches you what packaging adds, a lesson no lecture can land. Every send-off is a test, not a production run; you are testing and you are learning.

---

## Phase 1: Pick the task you'll send off

- A real slice you'd send off rather than nudge bit by bit, with a 'done' you can name in a sentence. Bigger than a typo-fix, smaller than an epic.
- The pick is yours; the fit-check is the agent's. You are not on the hook for scanning your roadmap or Jira; that stays with you. Bring one or two candidates; the agent screens them for fit against the three long-run criteria.

Ask Claude to screen the candidates you bring against the three long-run criteria and scope the winner. Drop the candidates after the colon.

{{prompt:walk-and-send-off-1}}

## Push back until the task is one end-to-end slice

- Push back when the read misses the codebase. The agent is reading the shape, not the substance.
- Imagining a finished demo means you scoped too big. Slice it down to one end-to-end thing that gives the agent something real to work with.
- Pick one task well. You'll use it again next module.

## Phase 2: Build the ranked list of what will hurt the agent

- The audit walks your whole system so you don't. The agent reads `CLAUDE.md`, `CLAUDE.local.md`, memory, ADRs, and any skills you've authored as a subagent, then ranks the five thin spots that will hurt the agent most on this task.
- Heavy run expected. Skim past the opening summary; the ranked thin-spots list is the payoff. If the ranked list comes back thin, push Claude to keep digging rather than letting a shallow pass stand as done.

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
- **Wire a connector:** if the task needs something only a connector reaches (issue tracker, staging logs, internal API), wire it now while the task is on your mind, not mid-run. Claude Code action, not a file write.
- **Name a business-rules gap:** if the task touches customer segments, regulatory scope, or team commitments and you don't have that written anywhere Claude can read, *the gap IS the finding*. Write one line in observations naming what's missing and where the real material lives (external wiki, team Notion, sponsor's head). Claude knows what it doesn't know. That's still context. Lands in `observations/`.

## Push back when a fill drifts from the codebase

- Your observations are what you just admitted is thin in spots. Don't let them re-seed with drift. Push back when Claude writes something that doesn't match the codebase.

> **Time check.** Different paces hit this point at different times. The room doesn't wait for the slowest. Five to ten minutes to share what surfaced, where the audit missed, and why the agent sometimes goes lazy.

- Before the send-off, ask Claude to propose any tidy-up of `./observations/`. Cap it at one or two file moves or renames; leave the ADRs and skills where they are, and ask to see the diff before it lands.
- Consider whether each rule is stored where it will fire. A rule the agent never reads is not a rule.

**What happened:** You picked a real task you'd send off rather than nudge bit by bit. You walked what you'd built so far against it, filled the worst gaps, and settled the `observations/` tree before the send-off.

## What closes the module

The exercise ends here. The module's send-off takes over:

1. You set the two return markers: ask Claude where this session's transcript lives, then ask it to commit the current state on a feature branch and report the short SHA. Push the branch if you want the run to outlast your laptop. The next session forks from that commit and reads the transcript.
2. You run the trifecta check: does the agent hold private data, does untrusted content reach its context window, is there a channel out? All three at once is the opening that prompt injection needs. All three present here, cut one leg before you send.
3. You paste the send-off prompt to the same session. Keep the laptop awake and plugged in. Don't close the lid; sleep freezes the session and it won't resume on wake. If you want to stop the run early, wait for a tool call to finish; clean interrupts between tool calls are fine. Traces are data either way.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads and the "Start clean." paragraph lead de-bolded; kept bold only on the four fill-shape menu handles (**Observation or rule** / **Sharpen an existing rule** / **Wire a connector** / **Name a business-rules gap**); widget/label chrome untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Time-check callout — deliberate exception to `check_student_facing.md` preamble (room-share commands).** The Phase 2→Phase 3 callout uses *"to share what surfaced, where the audit missed, and why the agent sometimes goes lazy."* The preamble bans room-share commands (`share with your neighbor`, `tell the room`, `say X out loud`); *to share* without an addressee reads as invitational room-energy, not a student-action mandate. The blockquote shape + named 5–10 min window is a trainer cue (catch-up window for slower paces + banter beat on agent laziness). Future judges should not re-flag.

**Prompt register — `walk-and-send-off-3` rewritten 2026-05-21.** Earlier "deliberately short" speed-up shape (*"You propose solutions and ask questions. Use the ask-questions tool to speed up my work."*) was the cohort's single biggest individual failure mode (M4 12:36Z + 12:37Z: outright-skipped exercise). Rewritten to scaffold the gap-fill structurally with `AskUserQuestion` by name + pick-then-walk loop + per-shape destination mapping (`observations/` for observations and business-rules gaps; `./CLAUDE.local.md` for rule sharpening; connector setup for connector wiring). Pairs with `author-test-strategy-skill-1`'s 2026-05-21 close — same family fix (replace push-back-by-convention with tool-by-name). Body restructured so the prompt is the default flow, not an opt-in speed-up; conversational-example bullets demoted to "what a fill looks like" reference after the prompt fence, each bullet now naming the matching destination.

**Quality:** compendium-audited 2026-07-26 (writing@9697944 technical@b3143a4 behavior@b3143a4 strategy@b3143a4 slides@9697944)
- judges @9697944: writing PASS, story REVISE (1/0 see instances/ae101--walk-and-send-off.story.json), technical PASS, behavior PASS, pedagogy REVISE (1/0 see instances/ae101--walk-and-send-off.pedagogy.json), strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~750 words body.

**Time budget total:** 60 min exercise body. Module Debrief + send-off adds 15–20 min.

**Frameworks riffed on:**
- **Gap analysis** (Phase 2) — generic business-analysis framework; named in prose as *walk the system you have against the system the task needs*.
- **Compound engineering** (module Debrief) — Kieran Klaassen. Review + Compound step as Debrief's self-rewrite pattern, now in its fourth rep for the student.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- opens a worktree on a clean branch when a real task warrants the un-watched send-off shape
- walks an audit prompt against a real backlog task before sending it off, fills the worst three gaps
- sends off un-packaged in the same Claude Code session and cancels when the trace is enough, treating the cancel as data not failure

**Failure modes + diagnostics:**
- **Phase 1 task-sprawl** — student picks the quarterly epic. Diagnostic: the scoped task doesn't have a "done" the student can name. Fix: trainer forces a slice; better a smaller task that runs the full arc.
- **Phase 2 audit busywork** — Claude returns 12 items instead of 5, student drowns. Diagnostic: prompt wasn't ranked-top-5 enforced. Fix: re-run the prompt; enforce ranking; student picks top 3.
- **Phase 2 over-fill** — student tries to close all five gaps. Diagnostic: *"just one more"* creep. Fix: trainer names the sponge-not-rock rule; M5 will teach the other two.
- **Debrief package-pre-empt** — student tries to add a plan.md or build a verifier before sending off. Diagnostic: *"should I just quickly…"* Fix: trainer names the rule — *"un-packaged is by design. Don't pre-empt M5's learning."*
- **Send-off anxiety** — student hesitates at the final paste. Diagnostic: *"what if it runs forever / breaks things / gets nowhere?"* Fix: trainer names cancel-is-legit — *"stop it when you've seen enough. Traces are data."*

**Plug points:**
- Student's own task you'd send off rather than nudge bit by bit (Phase 1 pick)
- Sponsor-stated rules-file home (Debrief rewrite target)
- Sponsor-stated memory / business-rules home (Phase 2 fill destination for business-rules pointer)
- Sponsor-stated ADR convention (memory already references; no new move here)

**Decision points (pacing):**
- **Phase 1 >15 min** — task is too big. Force a slice.
- **Phase 2 audit >15 min** — Claude returned too much. Re-run with ranked-top-5 enforcement.
- **Phase 2 fill short (<15 min)** — student accepted Claude's drafts without push-back. Trainer prompts for a codebase-specific correction on at least one fill.
- **Settle beat waved through** — tidy-up and diff-review took under a minute. Check the `observations/` tree actually got tidied and the diff seen before the send-off.
- **Whole-room mood below 7** — curious readiness isn't landing. Check Phase 1: real task or compliance task? Task-selection is where this mood starts or dies.

**Send-off mechanism (Debrief step 3):**
- Student passes the final prompt to the SAME Claude Code session they've been in for 90+ minutes. No new session. No `/schedule`, no `/loop`, no cloud runner.
- Student closes the laptop (power settings + plugged in) OR stops the run mid-flight when observation is sufficient.
- Trace preservation: Claude Code scrollback is the artifact M5 reads. Anything the student's configured for conversation logging continues.
- **Capability verified:** laptop-sleep freezes the session (not resumable on wake); Ctrl+C mid-tool-call can corrupt the `.jsonl`; no per-session token budget. Details in `reference/claude-code-for-engineers.md § 9`.

**Watch-fors (cross-phase):**
- Task sprawl at Phase 1 — the biggest single failure mode; everything downstream is sized by the task pick.
- Audit busywork at Phase 2 — re-run the prompt, don't let student filter a 15-item list manually (that's the anti-pedagogy from `check_student_facing` #9).
- Voice-smuggling at Phase 3 or Debrief — if it starts sounding like M5's unleashed leverage, student thinks this is the leverage moment. It isn't. M4 is readiness without completion.
- Package-pre-empt at Debrief — the highest-probability module-specific failure.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

**2026-07-03** — `## What closes the module` re-aligned to the module file's `## Send the task off` flow, per refuter close-out-drift finding. Two fixes: (1) relabeled off "Debrief" — `run-the-first-experiment.md` says "No Debrief; the send-off is the close of the work", so the close heading + intro, the `**What you do:**` overview, and the `**What happened:**` recap now name the module file's send-off / "the close", not a Debrief section (same mislabel in three body spots); (2) the two beats the module file carries at close but this list omitted were added in true order — the transcript/commit return markers (new step 3) and the trifecta cut-one-leg check (new step 4, before the send-off paste). The existing compound and push-back beats were kept and the list shape preserved; the finding was missing-beats + mislabel, not the step set. Prose-only; no `{{prompt}}` markers touched (the send-off, transcript, and commit prompts live in the module file, not here). Reconcile-in-sweep: this maintainer block, `**Time budget total:**`, and `**Send-off mechanism (Debrief step 3)**` still say "Debrief", and the last now maps to step 5 after the renumber — left for a maintainer-label sweep to avoid touching trainer metadata in a prose-fix batch.

**2026-07-26** — Module-close reconciliation: `run-the-first-experiment.md`'s close was rewritten 2026-07-08 (commit 05fbd36) to drop the compound pass entirely ("No compound pass at the close... Compound on evidence, not anticipation"), which the 2026-07-03 fix above reconciled against an older version. Three fixes here: (1) `**What you do:**` (line 15) dropped "compound your rules file and" — the close is send-off only, no compound framing; (2) `## What closes Module 4` dropped the compound-step and push-back-on-summary beats (old steps 1-2, which the module no longer runs), renumbering the return-markers / trifecta / send-off-paste beats down to 1-3; (3) Phase 2's "Heavy run expected" callout moved ahead of its `{{prompt:walk-and-send-off-2}}` fence (was stranded in the following `## Read the ranked thin-spots` section, i.e. after the run had already started) and now names the premature-stop failure mode alongside the existing over-reading one, per `check_pedagogy.md` §48. **Resolved 2026-07-26 (same day, second look):** the §16 finding above proposed re-fencing Phase 3 as `{{prompt:walk-and-send-off-4}}` without checking why that exact prompt was retired 16 days earlier. `2f0c8a2` (2026-07-10) deliberately cut the three-block/Huryn frame as decorative naming that "named the memory architecture without advancing the curriculum," keeping only the practical settle-the-tree beat and dropping 2 slides in the process — not re-fencing it was the point of that commit, not an oversight. Re-adding any prompt here, even a lighter one, reopens a question the maintainer had already closed. Fix instead: Phase 3's heading is gone; its two bullets fold into the close of the prior section as plain body prose, no new `##`, no new prompt. The propose/review-diff move was already the third rep of the same pattern in this file (Phase 1 pick, Phase 2 audit, Phase 2 fill) — by this point body prose carries it. `walk-and-send-off-4` stays retired. **Reconcile-in-sweep debt widens:** the "Debrief" label sweep deferred 2026-07-03 (`**Time budget total:**`, `**Frameworks riffed on:**` compound-engineering bullet, `**Send-off mechanism (Debrief step 3)**`) is now further stale — "step 3" in that heading pointed at the send-off-paste beat before this pass; after the renumber it points at the trifecta check instead. Still left for the maintainer-label sweep, not touched here.

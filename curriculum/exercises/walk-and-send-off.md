# Walk and send off

**What you do:** Pick a multi-hour task you've been avoiding. Walk what you've built across four modules against it. Fill the worst gaps. See Huryn's three-block frame in your own material. At Debrief, compound your rules file and send the task off, un-packaged, to the same Claude Code session. Close the laptop, or stop the run when you've seen enough.

**What happens:** You end the module with the task in flight (or stopped with traces to read), your personal `CLAUDE.local.md` rewritten from session evidence (gitignored, not team `CLAUDE.md`), memory and ADRs rearranged into Huryn's three blocks, and a business-rules pointer wired at the sponsor-stated home (or a clean statement of the gap). M5 opens with whatever came back.

**The point:** This is the first experiment of a two-run arc. The un-packaged send-off tonight teaches M5 what packaging adds, a lesson no lecture can land. Every send-off is a test, not a production run; you are testing and you are learning.

**Time:** 60 minutes inside a 2h module slot (Phases 1–3). The Debrief + send-off (~15–20 min) is owned by the module file, not this exercise; the two together close M4.

---

## Phase 1: Pick the task (~10 min)

Start a new Claude Code session in your repo. Paste this prompt and work through it in conversation:

**Prompt** *(copy → Claude Code)*

You've come in with one or two candidate tasks in mind (Connections). Claude screens them. It can't scan your roadmap or Jira, and we don't want it to; the picking work is your judgement about what's been sitting, and Claude's job is to check fit.

```
I'm about to run my first long-running experiment. I've come with one or two candidate tasks from my backlog: multi-hour work I haven't got to, or tasks I'd rather an agent took the first pass at.

Ask me to describe each candidate in a line or two. Then screen them against three criteria:
- Sustained coherence across multi-hour work
- Requirement-weaving (multiple things need to hold at once)
- Multi-file reasoning

For each candidate, give me your read (fit / marginal / wrong shape) and why. If one is a clear fit, help me scope it into two or three sentences I can refer back to. If neither fits, tell me what's missing; if both fit, push me to pick the one that'll teach me more tonight.
```

*(end of prompt)*

Claude will ask, you'll describe, it'll screen. Push back on the read if it misses something about the codebase. You know what's really there; Claude's reading the shape, not the substance. If you catch yourself imagining a finished demo for a candidate, you've scoped too big; slice it down to one end-to-end thing the agent can chew on.

**The point:** pick once, pick well. M5 inherits the same task; we re-run it packaged, so the contrast is the pedagogy.

---

## Phase 2: Walk and fill (~35 min)

### The audit (~10 min)

Claude audits your system as a subagent: fresh context, ranked report back.

**Prompt** *(copy → Claude Code)*

```
Audit my system against the task we just scoped. Read both `CLAUDE.md` (team, if it exists) and `CLAUDE.local.md` (personal, gitignored), everything in `.claude/memory/` (or wherever my memory lives), the ADRs in this repo, the skills in `.claude/skills/`, and the connectors I've wired.

Run this in a fresh context. Spawn a sub-task via the Task tool, or `/clear` if you prefer. The goal: Claude reads your setup without the current conversation colouring it. Return a structured report.

Return a ranked top-5: thin spots, missing context, wrong assumptions, or unwired tools that will hurt the agent if it tries this task un-packaged. Rank by how much damage each will do to a multi-hour run.

For each item, say: (a) what's thin, (b) what a properly-prepared agent would need instead, (c) the cheapest way to close the gap today: add an observation, sharpen a rule, wire a connector, or name it as a business-rules gap.
```

*(end of prompt)*

Read the ranked list. Name which ones you already knew about, which surprised you. **Framework**: this is *gap analysis*, walk the system you have against the system the task needs. You'll use it forever for every agent hand-off.

### The fill (~25 min)

Pick the ones that will hurt the agent most (probably two or three, not all five). Close each in conversation. M5 teaches you what the others were for.

For each of the three, keep it conversational:

- **Observation or rule:** *"Add this to memory: the payments service treats idempotency keys case-sensitively even though the docs don't say so."*
- **Sharpen an existing rule:** *"In my `CLAUDE.local.md`, under 'testing', replace the current mocking rule with one that says: integration tests hit a real Postgres in Docker; unit tests mock at the service boundary, never at the repository."* (Team-worthy version would go in a PR against `CLAUDE.md` separately.)
- **Wire a connector:** if the task needs something only a connector reaches (issue tracker, staging logs, internal API), wire it now while the task is on your mind, not mid-run.
- **Name a business-rules gap:** if the task touches customer segments, regulatory scope, or team commitments and you don't have that written anywhere Claude can read, *the gap IS the finding*. Write one line in memory naming what's missing and where the real material lives (external wiki, team Notion, sponsor's head). Claude knows what it doesn't know. That's still context.

Push back when Claude writes something that doesn't match the codebase. You know what's actually there; Claude's drafting off your memory, and the memory is exactly what we just admitted is thin in spots.

---

## Phase 3: See the frame (~15 min)

**Prompt** *(copy → Claude Code)*

```
Look at everything in my memory, my ADRs, and my test-strategy skill. Rearrange what's there into Paweł Huryn's three-block memory frame:

- Block 1: observations → hypotheses → rules (what I've noticed about this codebase, what I've started to suspect, what I've decided to treat as true)
- Block 2: decisions with alternatives (architectural or design choices + what else was considered; the ADRs live here)
- Block 3: quality criteria (what I expect to be true of shipped code in this codebase; the test-strategy skill contributes)

Don't invent new material. Rearrange what's there.

Before you name the frame or propose a new structure, show me one concrete example from each block. Quote a specific observation from my memory (Block 1), a specific ADR I've already written (Block 2), a specific check from my test-strategy skill (Block 3).
```

*(end of prompt)*

Read the examples first. This is the moment where you should recognise your own work: *"oh, that ADR I wrote in M3, that's a Block 2 entry. I've been doing this for four modules."* If you don't feel the recognition, the rearrangement isn't landing; ask Claude to quote different examples until one lands.

Once the frame is named through your own material, let Claude propose the actual rearrangement. File moves, renames, new index page, whatever fits. Approve, push back, or redirect.

**Framework**: Huryn's three-block memory. Not a template you fill; a frame that names what you've been building.

---

## What closes the module (owned by the module's Debrief section)

Phase 3 is where the exercise ends. The module's Debrief takes over:

1. Claude self-compounds your personal `CLAUDE.local.md` from session evidence: integrates, sharpens, removes. Team-worthy rules get flagged in the summary, not auto-PRed.
2. You push back on the 3–5 line summary.
3. You paste the send-off prompt to the same session and close the laptop (or stop the run when you've seen enough; traces are data).

See the module file for the two Debrief prompts.

<!-- maintainer -->

**Word count:** ~750 words body.

**Time budget total:** 60 min exercise body. Module Debrief + send-off adds 15–20 min.

**Frameworks riffed on:**
- **Gap analysis** (Phase 2) — generic business-analysis framework; named in prose as *walk the system you have against the system the task needs*.
- **Huryn's three-block memory** (Phase 3) — Paweł Huryn. Earns its name through quote-from-own-work before naming.
- **Compound engineering** (module Debrief) — Kieran Klaassen. Review + Compound step as Debrief's self-rewrite pattern, now in its fourth rep for the student.

**Failure modes + diagnostics:**
- **Phase 1 task-sprawl** — student picks the quarterly epic. Diagnostic: the scoped task doesn't have a "done" the student can name. Fix: Nerd forces a slice; better a smaller task that runs the full arc.
- **Phase 2 audit busywork** — Claude returns 12 items instead of 5, student drowns. Diagnostic: prompt wasn't ranked-top-5 enforced. Fix: re-run the prompt; enforce ranking; student picks top 3.
- **Phase 2 over-fill** — student tries to close all five gaps. Diagnostic: *"just one more"* creep. Fix: Nerd names the sponge-not-rock rule; M5 will teach the other two.
- **Phase 3 Huryn-as-lecture** — Claude names the frame before quoting from the student's own work. Diagnostic: student reads the three-block definition without recognition. Fix: re-run the prompt; insist on quote-first, name-second.
- **Debrief package-pre-empt** — student tries to add a plan.md or build a verifier before sending off. Diagnostic: *"should I just quickly…"* Fix: Nerd names the rule — *"un-packaged is by design. Don't pre-empt M5's learning."*
- **Send-off anxiety** — student hesitates at the final paste. Diagnostic: *"what if it runs forever / breaks things / gets nowhere?"* Fix: Nerd names cancel-is-legit — *"stop it when you've seen enough. Traces are data."*

**Plug points:**
- Student's own multi-hour task (Phase 1 pick)
- Sponsor-stated rules-file home (Debrief rewrite target)
- Sponsor-stated memory / business-rules home (Phase 2 fill destination for business-rules pointer)
- Sponsor-stated ADR convention (memory already references; no new move here)

**Decision points (pacing):**
- **Phase 1 >15 min** — task is too big. Force a slice.
- **Phase 2 audit >15 min** — Claude returned too much. Re-run with ranked-top-5 enforcement.
- **Phase 2 fill short (<15 min)** — student accepted Claude's drafts without push-back. Nerd prompts for a codebase-specific correction on at least one fill.
- **Phase 3 <10 min** — frame didn't land. Diagnostic: did Claude quote student's OWN ADR as Block 2? If not, redo.
- **Whole-room mood below 7** — curious readiness isn't landing. Check Phase 1: real task or compliance task? Task-selection is where this mood starts or dies.

**Send-off mechanism (Debrief step 3):**
- Student passes the final prompt to the SAME Claude Code session they've been in for 90+ minutes. No new session. No `/schedule`, no `/loop`, no cloud runner.
- Student closes the laptop (power settings + plugged in) OR stops the run mid-flight when observation is sufficient.
- Trace preservation: Claude Code scrollback is the artifact M5 reads. Anything the student's configured for conversation logging continues.
- **Capability-check open:** behaviour on overnight session-left-running vs. mid-run Ctrl+C. Verify before first cohort; Pass 3 reflects findings.

**Watch-fors (cross-phase):**
- Task sprawl at Phase 1 — the biggest single failure mode; everything downstream is sized by the task pick.
- Audit busywork at Phase 2 — re-run the prompt, don't let student filter a 15-item list manually (that's the anti-pedagogy from `check_student_facing` #9).
- Voice-smuggling at Phase 3 or Debrief — if it starts sounding like M5's unleashed leverage, student thinks this is the leverage moment. It isn't. M4 is readiness without completion.
- Package-pre-empt at Debrief — the highest-probability module-specific failure.

**TODO (Pass 3):**
- Three-persona simulation sweep (mid-competent / opinionated-senior / fast-operator), self-study mode with Agentic Nerd present. Mood scores per phase.
- Worked-example task shapes by engineer archetype (backend / frontend / platform / data) — reference file at `curriculum/reference/picking-a-first-long-task.md`.
- Capability check: session-left-running behaviour overnight; mid-run Ctrl+C trace preservation.
- Paired simulation against the M5 return exercise to verify the un-packaged artifact has enough surface area for M5's diagnosis-by-contrast.

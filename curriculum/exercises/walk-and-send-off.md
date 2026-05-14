# Walk and send off

**Time:** 55 minutes inside a 1h45 module slot (Phases 1–3, breakdown: pick 10 / walk-and-fill 35 / see-the-frame 10). The send-off (~5 min, single prompt paste) is owned by the module file, not this exercise; the two together close Module 4.

**Session** *(new, "Module 4 - Run the first experiment")*

Start a new Claude Code session at your repo root.

```
/rename m4-walk-send
```

**Start clean.** M4 picks up a bigger task than M1–M3. Before the new session, check your working tree and branch. You ride that state into Phase 4's `m4/<slug>` commit and M5's fork.

**What you do:** Pick a task you've been avoiding, the kind you'd send off rather than nudge bit by bit. Walk what you've built across four modules against it. Fill the worst gaps. See Huryn's three-block frame in your own material. At Debrief, compound your rules file and send the task off, un-packaged, to the same Claude Code session. Leave the laptop awake while you step away, or stop the run when you've seen enough.

**The point:** This is the first experiment of a two-run arc. The un-packaged send-off here teaches Module 5 what packaging adds, a lesson no lecture can land. Every send-off is a test, not a production run; you are testing and you are learning.

---

## Phase 1: Pick the task

Start a new Claude Code session in your repo. One or two candidate tasks come in with you (Connections). Claude screens them: it can't scan your roadmap or Jira, and that stays your call. The picking work is your judgement about what's been sitting; Claude's job is to check fit.

**Not an epic. Not a typo-fix. A real slice you'd send off rather than nudge bit by bit, with a 'done' you can name in a sentence.**

Ask Claude to screen the candidates you bring against the three long-run criteria and scope the winner. Drop the candidates after the colon, one per line.

{{prompt:walk-and-send-off-1}}


Push back when the read misses something about the codebase. Claude is reading the shape, not the substance. If you catch yourself imagining a finished demo for a candidate, you've scoped too big; slice it down to one end-to-end thing the agent can chew on.

**The point:** pick one task well. You'll use it again next module.

---

## Phase 2: Walk and fill

### Run the audit

Ask Claude to audit your system as a subagent and return a ranked top-5 of what will hurt the agent most on this task.

{{prompt:walk-and-send-off-2}}


Read the ranked list. Name which ones you already knew about, which surprised you. **Framework**: this is *gap analysis*, walk the system you have against the system the task needs. You'll use it forever for every agent hand-off.

### Fill the gaps

Pick the ones that will hurt the agent most (probably two or three, not all five). Close each in conversation. You'll see next module what the others were for.

Memory-path note, first time through: the default home is `.claude/memory/` in your repo, gitignored. If your team kit pins a different path, stay consistent with it. Tell Claude which one and move on.

**If `.claude/memory/` is new to your repo, ask Claude to add it to `.gitignore` before any writes.** The fills below land there; you don't want them tracked.

This is a convention you're authoring, not a Claude Code feature. The agent reads `.claude/memory/` when a prompt names the path, the same way it reads your ADRs. It is not auto-loaded the way `CLAUDE.md` and `CLAUDE.local.md` are.

Claude Code also has an auto-memory of its own at `~/.claude/projects/<project>/memory/`, written by the agent for its own recall and surfaced via `/memory`. AE101 leaves that one out by design. You choose what is worth remembering and write it yourself. Auto-memory has its place; here, compounding stays legible, gitignored, and yours.

For each of the three, keep it conversational:

- **Observation or rule:** *"Add this to memory: the payments service treats idempotency keys case-sensitively even though the docs don't say so."*
- **Sharpen an existing rule:** *"In my `CLAUDE.local.md`, under 'testing', replace the current mocking rule with one that says: integration tests hit a real Postgres in Docker; unit tests mock at the service boundary, never at the repository."* (Team-worthy version would go in a PR against `CLAUDE.md` separately.)
- **Wire a connector:** if the task needs something only a connector reaches (issue tracker, staging logs, internal API), wire it now while the task is on your mind, not mid-run.
- **Name a business-rules gap:** if the task touches customer segments, regulatory scope, or team commitments and you don't have that written anywhere Claude can read, *the gap IS the finding*. Write one line in memory naming what's missing and where the real material lives (external wiki, team Notion, sponsor's head). Claude knows what it doesn't know. That's still context.

Push back when Claude writes something that doesn't match the codebase. The memory is what you just admitted is thin in spots; don't let it re-seed itself with drift.

Speed up the gap-fill if prose Q&A is dragging.

{{prompt:walk-and-send-off-3}}

---

> **Time check.** Different paces hit this beat at different times. The room doesn't wait for the slowest. Five to ten minutes to share what surfaced, where the audit missed, and why the agent sometimes goes lazy.

## Phase 3: See the frame

Ask Claude to rearrange your memory, ADRs, and skill into Huryn's three blocks, quoting your own work for each block before naming the frame.

{{prompt:walk-and-send-off-4}}


Read the examples first. If they're from your own files, the frame should click. If it doesn't, ask Claude to quote different examples until one does.

Once the frame is named through your own material, let Claude propose the actual rearrangement. Cap the proposal at one or two file moves or renames; larger reorganisation is a separate session, not a mid-module sweep (the send-off fires next, and you want the tree settled before it does).

**Framework**: Huryn's three-block memory. Not a template you fill; a frame that names what you've been building.

**What happened:** You picked a real task you'd send off rather than nudge bit by bit. You walked what you'd built across four modules against it, filled the worst gaps, and let Claude rearrange memory and ADRs into Huryn's three blocks against your own material. The frame named what was already there. Phase 3 ended with the tree settled before the Debrief's send-off.

---

## What closes the module (owned by the module's Debrief section)

Phase 3 is where the exercise ends. The module's Debrief takes over:

1. You nudge the compound step: Claude reads the session, rewrites your personal `CLAUDE.local.md` from evidence, integrates, sharpens, removes, and reports 3–5 lines. Team-worthy rules get flagged in the summary, not auto-PRed.
2. You push back on the 3–5 line summary.
3. You paste the send-off prompt to the same session. Keep the laptop awake and plugged in. Don't close the lid; sleep freezes the session and it won't resume on wake. If you want to stop the run early, wait for a tool call to finish; clean interrupts between tool calls are fine. Traces are data either way.

<!-- maintainer -->

**Time-check callout — deliberate exception to `check_student_facing.md` preamble (room-share commands).** The Phase 2→Phase 3 callout uses *"to share what surfaced, where the audit missed, and why the agent sometimes goes lazy."* The preamble bans room-share commands (`share with your neighbor`, `tell the room`, `say X out loud`); *to share* without an addressee reads as invitational room-energy, not a student-action mandate. The blockquote shape + named 5–10 min window is a trainer cue (catch-up window for slower paces + banter beat on agent laziness). Future judges should not re-flag.

**Prompt register — `walk-and-send-off-3` deliberately short.** The Phase 2 gap-fill speed-up prompt (`You propose solutions and ask questions. Use the ask-questions tool to speed up my work.`) is intentionally brief, lowercase-hyphenated tool name, no honorifics. It models the casual one-line ask a tired engineer types mid-conversation when prose Q&A is dragging. The `ask-questions tool` phrasing is the curriculum's runtime-agnostic term (`AskUserQuestion` is the Claude Code implementation; the prompt avoids tying to one runtime). Pairs with the M2 `push-back-on-the-plan-4` carve-out — both encode end-of-flow tired-engineer register. Audit-class judges flagging it as a stylistic outlier should treat as accepted-by-design.

**Quality:** compendium-audited 2026-05-09 (writing@88a1dd4 story@88a1dd4 technical@88a1dd4 behavior@88a1dd4)
- judges @88a1dd4: writing PASS, story PASS, technical PASS, behavior PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

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
- Student's own task you'd send off rather than nudge bit by bit (Phase 1 pick)
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
- **Capability verified:** laptop-sleep freezes the session (not resumable on wake); Ctrl+C mid-tool-call can corrupt the `.jsonl`; no per-session token budget. Details in `reference/claude-code-for-engineers.md § 9`.

**Watch-fors (cross-phase):**
- Task sprawl at Phase 1 — the biggest single failure mode; everything downstream is sized by the task pick.
- Audit busywork at Phase 2 — re-run the prompt, don't let student filter a 15-item list manually (that's the anti-pedagogy from `check_student_facing` #9).
- Voice-smuggling at Phase 3 or Debrief — if it starts sounding like M5's unleashed leverage, student thinks this is the leverage moment. It isn't. M4 is readiness without completion.
- Package-pre-empt at Debrief — the highest-probability module-specific failure.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

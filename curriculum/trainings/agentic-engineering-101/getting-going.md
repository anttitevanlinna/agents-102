# Getting going + context (+ MCP + first skills)

## Big Idea
The first compound loop closes on a trivial bug from your own backlog — while you wire one MCP, invoke your first skill, and seed the substrate every module after this one rides on.

> **Pass 2 TODO (post-restructure 2026-04-22):** grow the front with the MCP + first-skill orientation ramp. Current content ports from the pre-restructure "Ship with agents" spine; MCP/skill beats live in strategy but not yet in the module body.

## Meta
- **Primary Bloom's level:** Apply (run the loop end-to-end) + Analyze (recognize the shape after you ran it)
- **Prework:** about 30 min — [Module 1 prework](curriculum.html?training=agentic-engineering-101&prework=1). Content folder unzipped, Claude Code open on the repo you'll grow, one bug surfaced in conversation with Claude.
- **Homework:** none — Module 2's setup lives in Module 2's prework.
- **Materials (trainer):** content folder (`agents-102-content-agentic-engineering-101.zip`) shipped before prework; no trainer scaffolds beyond that. All compounding artifacts land in the student's repo (see `content-strategy-agentic-engineering-101.md` § Delivery architecture).
- **Plug points:** the student's own repo + the bug Claude surfaced in prework.

## What You'll Learn
After this module, you will be able to:
- **Run** Plan → Work → Review end-to-end on a trivial bug in your own repo, with plan mode used deliberately
- **Recognize** the shape of what you just ran, named by two practitioners who wrote it up before you did
- **Seed** your repo's `CLAUDE.md` from a session retro — the file the next session reads first
- **Log** one decision-journal entry where your team keeps durable knowledge — the home your sponsor named, or a better one you can argue for

## Connections

**The question — to you:** what's one trick you figured out with Claude Code that nobody taught you? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session. Write it on a sticky, or paste it in chat if you're remote. The room harvests everyone's before the training adds its own.

## Lectures

[The wizard move](lectures/the-wizard-move.md)

## Exercises

[Ship a trivial bug](exercises/ship-trivial-bug.md)

## Key Concepts (Emergent)
- Plan mode earns its keep on trivial bugs too — not despite, but because
- A rules file written from a session retro reads different from one written from a blank page
- The compound loop is four steps, and the fourth is what makes the first three compound
- Your memory of this codebase is an artifact, not a feeling

## Plug Points
The student's own repo and the bug Claude surfaced in prework. No company data needed yet. If the student arrives having drifted from their prework choice, Phase 1 runs a fresh bug-surfacing conversation — criteria unchanged: small, visible, yours, shippable in an hour.

The **sponsor-stated knowledge home** (pre-engagement contract — see `content-strategy-agentic-engineering-101.md` § "Pre-engagement contract") supplies the default for where the decision-journal entry and rules file land in Phase 4 and the Debrief. Student can override with a reasoned alternative; opting out is not a path.

## Debrief

10 minutes. Claude reviews the session, writes (or integrates into) your repo's `CLAUDE.md`, reports 3–5 lines of what it installed and why. You read the summary and push back where it's wrong. That push-back is the reflection — no three-question interview.

**Prompt** *(copy → Claude Code)*

```
Review this session. We fixed a trivial bug using plan mode — Plan → Work → Review. Read the ADR we wrote, read the diff of the PR we shipped, scan the scrollback for turns where I pushed back on something you proposed and where we converged after disagreement.

Then write or integrate the CLAUDE.md at the root of this repo (or .claude/CLAUDE.md if that's the existing convention here). If one exists, rewrite in place — integrate, don't append. 8–15 lines that read as rules for this repo's future sessions. Reference the ADR. No retro-notes section.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why — grounded in specific session moments. I shouldn't have to open the file to know.
```

*(end of prompt)*

Read Claude's summary. Push back where it's wrong — quote the session moment, tell it what it misread. That push-back is how the rules file earns its keep. M2 takes the same move and extends it across repos and business context.

## Bridge
You just ran the loop on one bug. M2 runs it across your whole system — multiple repos, business rules, company context — so the agent handling the next non-trivial ticket arrives already knowing where to look.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Session runtime:** 1h45 (Connections 10 / Lecture 10 / Exercise 55–70 / Debrief 15 / Bridge 5)
- **Opening-bid install mechanic** (content-strategy-agentic-engineering-101.md State-of-play Q#5): trainer demos a wizard-level move on a volunteer's codebase → Connections harvests tricks each student brought → exercise ships one real PR through plan mode → Debrief writes the repo's `CLAUDE.md` from session evidence.
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder unzipped by student at prework; all compounding artifacts land in the student's real repo (`CLAUDE.md` at root, ADRs in `docs/adr/`, `.claude/memory/` from M2). No training-dir state.

**Agentic Nerd logic (TODO — skill not yet created; strategy doc §"Prep notes — the `agentic-nerd` skill" + §"Delivery architecture"):**
- **P1 blocker** — student has drifted from prework choice. Nerd runs fresh bug-surfacing conversation. Criteria unchanged.
- **P2 blocker** — student approves the first plan without pushback. Nerd invokes plan-mode approval inflation guard: *"quote one step you'd remove from this plan."*
- **P4 blocker** — student skims the diff ("looks fine") under 30 seconds. Nerd: *"find me one line you'd have written differently — not wrong, just different."*
- **P5 behavior** — stay silent. Let Claude name the shape. Attribution (Klaassen + Huryn) is one line each after the student's recognition. Don't over-teach.
- **Debrief module-level** — the prompt above is the Debrief prompt. Module 1 is the ONLY module where the Debrief interviews the student (Q1/Q2/Q3). M2 onward, the Nerd self-compounds rules files without question-and-answer scaffolding (per SKILL.md § "Debrief pattern").
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Nerd fast-paths replay (pedagogy already landed; regenerate artifacts for new substrate).

**Plug points (trainer):**
- Student's repo (chosen in prework) + bug Claude surfaced in prework
- Repo change mid-training is a supported replay path, not a failure mode.

**Frameworks riffed on (attributed at exercise P5):**
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3 per `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. Primary URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`, late-2025/early-2026.
- **Three-block memory** — Paweł Huryn. Knowledge Architecture / Decision Journal / Quality Gate. Level 2 single-experiment per `continuous-research/insights.md` lines 1051–1065. Primary URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`, 2026-04-01.

**Open questions this module surfaces for later passes:**
- Self-study solo variant of Connections (room share of tricks) — Nerd collects and reflects thematic tendencies back to student.
- Wizard-demo choice — which move does the trainer pick for the opener? Needs a menu of 3–5 demo patterns worth running on a volunteer repo. (TODO before first delivery.)

**TODO (2026-04-21 session close):**
- **Agentic Nerd skill creation.** Referenced throughout as if it exists. Prep notes in `content-strategy-agentic-engineering-101.md` § "Prep notes — the `agentic-nerd` skill." Current exercise survives without it (verified by Mira/Greg/Jin sims, all self-study, no Nerd). Before first cohort: create the skill with the P1/P2/P4 push-back moves captured in this file's maintainer section.
- **Content folder zip packaging.** Prework references `agents-102-content-agentic-engineering-101.zip` that doesn't exist yet. Needs a one-time build step that bundles `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/prework.md`, `curriculum/reference/` (when populated). Ship as a zip + a verify-it-unpacks-cleanly check. TODO before first cohort.
- **Register audit — motivational-warmth residue.** Greg-persona sim (2026-04-21) hallucinated motivational lines that don't exist in the files (*"You'll feel the wizard move," "Celebrate the ship."*). Hallucinating pep-talk is a tell that surrounding prose carries residual warmth even where specific sentences grep clean. Before first cohort: re-read all M1 files as a senior-opinionated reader (Greg voice), trim any sentence that reads as training-author warmth rather than peer-to-peer directness.
- **Three-persona simulation archive.** Simulations landed in this session's conversation scrollback but weren't saved as reference artifacts. Consider: archive per-persona sim reports under `curriculum/evals/instances/sims/agentic-engineering-101--ship-with-agents--<persona>.md` so the next reshape pass can see what prior personas caught.

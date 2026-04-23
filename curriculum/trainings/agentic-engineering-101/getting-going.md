# Getting going + context (+ MCP)

## Big Idea
The first compound loop closes on a trivial bug from your own backlog. Orient, fix tests-first without plan mode, retro into a `CLAUDE.md` born from the session, close the bug's ticket via one connector. The substrate every module after this one rides on.

## Meta
- **Primary Bloom's level:** Apply (run the three-phase loop end-to-end) + Analyze (read Claude's own introspection against `/context`; read the retro summary against session moments)
- **Prework:** about 30 min — [Module 1 prework](curriculum.html?training=agentic-engineering-101&prework=1). Content folder unzipped, Claude Code open on the repo you'll grow, one bug surfaced in conversation with Claude.
- **Homework:** none — Module 2's setup lives in Module 2's prework.
- **Materials (trainer):** content folder (`agents-102-content-agentic-engineering-101.zip`) shipped before prework; no trainer scaffolds beyond that. All compounding artifacts land in the student's repo (see `content-strategy-agentic-engineering-101.md` § Delivery architecture). Claude Code specifics (MCP install per tracker, tenant-admin fallbacks) live in `curriculum/reference/mcp-and-connectors.md` — updated as Claude Code's install surface changes.
- **Plug points:** the student's own repo + the bug Claude surfaced in prework + the sponsor-stated ticket tracker.

## What You'll Learn
After this module, you will be able to:
- **Run** an orient → fix → compound → extend loop end-to-end on a trivial bug in your own repo
- **Introspect** on Claude's read of your repo and verify the self-report against `/context` — the instrument that shows where the 10% lives
- **Fix** the bug tests-first, root-cause-driven, no plan mode — and seed the preference into `CLAUDE.md` mid-exercise
- **Wire** one connector and close the bug's ticket — the first move outside the repo

## Connections

**The question — to you:** what's one trick you figured out with Claude Code that nobody taught you? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session. Write it on a sticky, or paste it in chat if you're remote. The room harvests everyone's before the training adds its own.

## Lectures

[The wizard move](lectures/the-wizard-move.md)

## Exercises

[Ship a trivial bug](exercises/ship-trivial-bug.md)

## Key Concepts (Emergent)
- Plan mode is overhead on a trivial bug — M2 is where it earns its keep
- Claude can introspect on its own read; the self-report is a hypothesis, not ground truth — verify against `/context`
- The 10% Claude couldn't address lives in the slice of the repo it didn't load — your job is to steer what lands in the window
- A `CLAUDE.md` born from how you actually worked reads different from one written from a blank page
- The first compound step closes before the retro — Phase 2's rule to `CLAUDE.md` is the first one; Phase 3 extends it

## Plug Points
The student's own repo and the bug Claude surfaced in prework. No company data needed yet. If the student arrives having drifted from their prework choice, Phase 1 runs a fresh bug-surfacing conversation — criteria unchanged: small, visible, yours, shippable in an hour.

The **sponsor-stated knowledge home** and **sponsor-stated ticket tracker** (pre-engagement contract — see `content-strategy-agentic-engineering-101.md` § "Pre-engagement contract") supply the defaults for where `CLAUDE.md` lives (P2/P3) and which connector gets wired (P3). Student can override with a reasoned alternative; opting out is not a path.

## Debrief
The retro runs inside Exercise Phase 3 — Claude reviews the session, extends `CLAUDE.md` in place, reports 3–5 lines, student pushes back. No separate module-level Debrief block; the Bridge picks up right after the ticket close-out.

## Bridge
You ran the loop once, on a trivial bug, without plan mode. M2 is where plan mode earns its keep — multi-file work, two reads (yours + grill), approval inflation catches as the teaching moment. `CLAUDE.md` sits at the top of the next session, waiting to be read.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Session runtime:** 2h (Connections 10 / Lecture 10 / Exercise 85–95 / Bridge 5). 2h is deliberate for M1 — longer than M2–M4's 1h45 because of the orient+introspect ramp and the MCP close-out. Other modules run at 1h45.
- **Opening-bid install mechanic:** trainer demos a wizard-level move on a volunteer's codebase → Connections harvests tricks each student brought → Exercise Phase 1 each student runs the orient + introspect move on their own repo → Phase 2 tests-first bug fix → Phase 3 retro extends `CLAUDE.md` + ticket close-out via connector. No separate module-level Debrief.
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder unzipped by student at prework; all compounding artifacts land in the student's real repo (root `CLAUDE.md`, `.claude/memory/` from M4). No training-dir state.
- **Claude Code specifics** (MCP install per tracker, tenant-admin fallbacks): `curriculum/reference/mcp-and-connectors.md`. Updated as Claude Code's install surface changes; exercise body points at it and stays stable.

**Agentic Nerd logic (TODO — skill not yet created; strategy doc §"Prep notes — the `agentic-nerd` skill" + §"Delivery architecture"):**
- **P1 introspection skip** — student reads Claude's repo summary and moves to the bug fix without running the second prompt. Nerd push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **P1 `/context` skipped** — slash command read as prose, not as a command. Nerd push: *"type /context in the chat — look at the number."*
- **P1 drifted bug** — student has drifted from prework choice. Nerd runs fresh bug-surfacing conversation. Criteria unchanged.
- **P2 tests-skipped** — student pastes bug and Claude jumps to a fix. Nerd push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log "no verifier here" as a note that lands in M4.)
- **P2 diff / rule rubber-stamp** — student says "looks fine" or accepts Claude's CLAUDE.md rule without reading. Nerd push: *"find me one line you'd have written differently — not wrong, just different"* / *"read it aloud — if someone on your team read this in six months, would they run the same loop?"*
- **P3 retro confabulation** — Claude's 3–5 line summary name-drops session moments without quoting. Nerd push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **P3 MCP install gate** — corporate tenant blocks connector install. Nerd surfaces the tenant-admin fallback per tracker from `reference/mcp-and-connectors.md`. Never a blocker; always a fallback path.
- **Self-compounding at every module from M1** — the Nerd never interviews the student with Q1/Q2/Q3. Claude reviews session evidence, rewrites rules file in place, reports 3–5 lines, student pushes back. Same shape across the training.
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Nerd fast-paths replay (pedagogy already landed; regenerate artifacts for new substrate).

**Plug points (trainer):**
- Student's repo (chosen in prework) + bug Claude surfaced in prework + sponsor-stated ticket tracker.
- Repo change mid-training is a supported replay path, not a failure mode.

**Frameworks riffed on:**
- **TDD (test-driven development)** — Phase 2's tests-first, root-cause-driven fix. Recognized framework the engineer audience already knows; the rule seeded into `CLAUDE.md` is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Attributed inside Claude's Phase 3 retro summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Materials seeded in M1 without naming the three-block frame; the frame earns its name at M4.

**Open questions this module surfaces for later passes:**
- Self-study solo variant of Connections (room share of tricks) — Nerd collects and reflects thematic tendencies back to student.
- Wizard-demo choice — which move does the trainer pick for the opener? Needs a menu of 3–5 demo patterns worth running on a volunteer repo. (TODO before first delivery; Antti is reviewing the opener overall after this reconstruction pass.)

**TODO:**
- **Three-persona simulation on the reshaped three-phase exercise** (Maija mid-competent / Greg opinionated senior / Jin fast operator). Focus: P1 introspection feel, P2 tests-first pressure, P3 MCP gate realism.
- **Agentic Nerd skill creation.** Referenced throughout as if it exists. Prep notes in `content-strategy-agentic-engineering-101.md` § "Prep notes — the `agentic-nerd` skill." Current exercise survives without it (prior three-persona sim on the old shape: all APPROVE WITH TODOs self-study, no Nerd). Before first cohort: create the skill with the P1/P2/P3 push-back moves captured in this file's maintainer section.
- **Content folder zip packaging.** Prework references `agents-102-content-agentic-engineering-101.zip` that doesn't exist yet. Build step bundles `curriculum/lectures/`, `curriculum/exercises/`, `curriculum/trainings/agentic-engineering-101/prework.md`, **and `curriculum/reference/`** (now used; `reference/mcp-and-connectors.md` is the first file). Ship + verify unpack. TODO before first cohort.
- **Register audit — motivational-warmth residue.** Greg-persona sim (2026-04-21) hallucinated motivational lines that don't exist in the files (*"You'll feel the wizard move," "Celebrate the ship."*). Hallucinating pep-talk is a tell that surrounding prose carries residual warmth even where specific sentences grep clean. Before first cohort: re-read M1 files as a senior-opinionated reader; trim sentences that read as training-author warmth rather than peer-to-peer directness.
- **Three-persona simulation archive.** Archive per-persona sim reports under `curriculum/evals/instances/sims/agentic-engineering-101--ship-trivial-bug--<persona>.md` so the next reshape pass can see what prior personas caught.

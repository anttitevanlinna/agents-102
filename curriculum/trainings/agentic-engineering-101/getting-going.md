# Getting going + context (+ MCP)

## Big Idea
The first compound loop closes on a trivial bug from your own backlog. Orient, fix tests-first without plan mode, retro into a personal `CLAUDE.local.md` born from the session, close the bug's ticket via one connector. The loop every module after this one rides on.

## Meta
- **Primary Bloom's level:** Apply (run the three-phase loop end-to-end) + Analyze (read Claude's own introspection against `/context`; read the retro summary against session moments)
- **Prework:** about 30 min. [Module 1 prework](curriculum.html?training=agentic-engineering-101&prework=1). Content folder unzipped, Claude Code open on the repo you'll grow, one bug surfaced in conversation with Claude.
- **Homework:** none. Module 2's setup lives in Module 2's prework.
- **Materials (trainer):** content folder (`agents-102-content-agentic-engineering-101.zip`) shipped before prework; no trainer scaffolds beyond that. All compounding artifacts land in the student's repo (see content strategy § Delivery architecture). Claude Code specifics (MCP install per tracker, tenant-admin fallbacks) live in [MCP and connectors](../reference/mcp-and-connectors.md), updated as Claude Code's install surface changes.

## What You'll Learn
After this module, you will be able to:
- **Run** an orient → fix → compound → close loop end-to-end on a trivial bug in your own repo
- **Introspect** on Claude's read of your repo and verify the self-report against `/context`, the instrument that shows where the 10% lives
- **Fix** the bug tests-first, root-cause-driven, no plan mode, and ship the PR
- **Compound** the session into your personal `./CLAUDE.local.md` (gitignored, yours; [reference § 1](../reference/claude-code-for-engineers.md) for the four-layer hierarchy) and close the bug's ticket via one connector. The first move outside the repo

## Connections

**The question (to you):** what's one trick you figured out with Claude Code that nobody taught you? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session. Write it on a sticky, or paste it in chat if you're remote. The room harvests everyone's before the training adds its own.

## Lectures

[The wizard move](lectures/the-wizard-move.md)

## Exercises

[Orient and introspect](exercises/orient-and-introspect.md)

[Fix tests-first](exercises/fix-tests-first.md)

[Compound and close](exercises/compound-and-close.md)

## Key Concepts (Emergent)
- Plan mode is overhead on a trivial bug. M2 is where it earns its keep
- Claude can introspect on its own read; the self-report is a hypothesis, not ground truth. Verify against `/context`
- The 10% Claude couldn't address lives in the slice of the repo it didn't load. Your job is to steer what lands in the window
- A `CLAUDE.local.md` born from how you actually worked reads different from one written from a blank page
- The compound step lives in Ex3, after the PR ships. One move: review the whole session, write the rule from evidence, name the shape
- Personal rules (`./CLAUDE.local.md`, gitignored) vs. team rules (`./CLAUDE.md`, PR-reviewed) is a split worth learning early. Session compounds default to personal; team-worthy rules earn their own PR

## Debrief
The compound step runs inside the `compound-and-close` exercise. Claude reviews the full session (Ex1 + Ex2) and writes `./CLAUDE.local.md` from evidence (personal, gitignored; creates it if it doesn't exist, integrates if it does), reports 3–5 lines, student pushes back. If any rule is team-worthy (one every engineer on this codebase would benefit from) Claude calls it out in the summary so the student can open a PR against team `./CLAUDE.md` separately. No separate module-level Debrief block; the Bridge picks up right after the ticket close-out.

## Closing lecture

[How this training was built](lectures/how-this-training-was-built.md)

## Bridge
You ran the loop once, on a trivial bug, without plan mode. M2 is where plan mode earns its keep: multi-file work, two reads (yours + grill), approval inflation catches as the teaching moment. `./CLAUDE.local.md` sits at the top of the next session, waiting to be read (alongside team `./CLAUDE.md` if this repo has one; both concatenate into context).

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Session runtime:** 2h (Connections 10 / Lecture 10 / Exercise 95 / Bridge 5). Trainer demos slowly, room copy-pastes concurrently — fits 2h in-class. Exercise breakdown: orient-and-introspect 18 / fix-tests-first 40 / compound-and-close 37 (compound retro + MCP wire + ticket close). 2h is deliberate for M1 — longer than M2–M6's 1h45 because of the orient+introspect ramp and the MCP close-out.
- **Mood target:** joyful creation — *"it works, on my repo."* Watch for: mood drift toward technical warm-up (the bug feels arbitrary, the loop feels mechanical, "this is just a TDD fix I do anyway"). Diagnostic: student narrates Ex2 as a generic engineering move with no surprise. Fix: Nerd surfaces the agentic specificity — *"the loop you just ran was orient → fix → compound → close on YOUR repo, with a rules file born from how YOU just worked. That's not a bug fix; that's the instrument starting to play your music."*
- **Opening-bid install mechanic:** trainer demos a wizard-level move on a volunteer's codebase → Connections harvests tricks each student brought → Ex1 (orient-and-introspect) each student runs the orient + introspect move on their own repo → Ex2 (fix-tests-first) TDD bug fix, ship the PR → Ex3 (compound-and-close) compound `./CLAUDE.local.md` from session evidence + ticket close-out via connector. No separate module-level Debrief.
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder unzipped by student at prework; all compounding artifacts land in the student's real repo — session compounds to `./CLAUDE.local.md` (personal, gitignored), team rules to `./CLAUDE.md` via PR, `.claude/memory/` from M4 (gitignored by default; team-kit override respected). No training-dir state. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.
- **Claude Code specifics** (MCP install per tracker, tenant-admin fallbacks): `curriculum/reference/mcp-and-connectors.md`. Updated as Claude Code's install surface changes; exercise body points at it and stays stable.

**Agentic Nerd push-backs** (skill at `content/skills/agentic-nerd/SKILL.md`, installed to `~/.claude/skills/` at prework):
- **Ex1 introspection skip** — student reads Claude's repo summary and moves to the bug fix without running the second prompt. Nerd push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **Ex1 `/context` skipped** — slash command read as prose, not as a command. Nerd push: *"type /context in the chat — look at the number."*
- **Ex1 drifted bug** — student has drifted from prework choice. Nerd runs fresh bug-surfacing conversation. Criteria unchanged.
- **Ex2 tests-skipped** — student pastes bug and Claude jumps to a fix. Nerd push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log "no verifier here" as a note that lands in M4.)
- **Ex2 diff rubber-stamp** — student says "looks fine" under 30 seconds. Nerd push: *"find me one line you'd have written differently — not wrong, just different."*
- **Ex3 rule rubber-stamp** — student accepts Claude's `./CLAUDE.local.md` rule without reading. Nerd push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"*
- **Ex3 team vs. personal ambiguity** — Claude writes a rule that's team-worthy (*"always validate webhook signatures before dispatch — our payment flow got bitten by this"*) but lands it in `./CLAUDE.local.md` without flagging. Nerd push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so I can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."*
- **Ex3 compound-summary confabulation** — Claude's 3–5 line summary name-drops session moments without quoting. Nerd push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **Ex3 MCP install gate** — corporate tenant blocks connector install. Nerd surfaces the tenant-admin fallback per tracker from [MCP and connectors](../reference/mcp-and-connectors.md). Never a blocker; always a fallback path.
- **Self-compounding at every module from M1** — the Nerd never interviews the student with Q1/Q2/Q3. Claude reviews session evidence, rewrites rules file in place, reports 3–5 lines, student pushes back. Same shape across the training.
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Nerd fast-paths replay (pedagogy already landed; regenerate artifacts for the new repo).

**Plug points (trainer):**
- Student's repo (chosen in prework) + bug Claude surfaced in prework + sponsor-stated ticket tracker.
- Repo change mid-training is a supported replay path, not a failure mode.

**Frameworks riffed on:**
- **TDD (test-driven development)** — Ex2's tests-first, root-cause-driven fix. Recognized framework the engineer audience already knows; the rule written into `./CLAUDE.local.md` at Ex3 is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Attributed inside Claude's Ex3 compound summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Materials seeded in M1 without naming the three-block frame; the frame earns its name at M4. **Design intent (do not flag in audits):** M1 has no explicit three-block language and that is correct. The compound move at Ex3 produces material that rearranges into the three blocks at M4; explicit naming here would steal M4's recognition moment.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

# Getting going + context (+ MCP)

## Big Idea
The first compound loop closes on a trivial bug from your own backlog. Orient, fix tests-first without plan mode, retro into a personal `CLAUDE.local.md` born from the session, close the bug's ticket via one connector. The loop every module after this one rides on.

## Prework

About 30 min. Complete the prework at the top of this workbook.

## What You'll Learn
After this module, you will be able to:
- **Run** an orient → fix → compound → close loop end-to-end on a trivial bug in your own repo
- **Introspect** on the agent's read of your repo. Use `/context` to see how much your context window has filled up. Assume 10% of what Claude says or does is misrepresentation and dig until you find it
- **Fix** the bug tests-first, root-cause-driven, no plan mode, and ship the PR
- **Compound** the session into your personal `./CLAUDE.local.md` (gitignored, yours; [the four CLAUDE.md layers](reference/claude-code-for-engineers.md) for the hierarchy) and close the bug's ticket via one connector. The first move outside the repo

## Start here

**The question (to you):** what's one trick you figured out with Claude Code that nobody taught you? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session. The room harvests everyone's before the training adds its own.

[The wizard move](lectures/the-wizard-move.md)

[Orient and introspect](exercises/orient-and-introspect.md)

[Fix tests-first](exercises/fix-tests-first.md)

[Compound and close](exercises/compound-and-close.md)

## Key Concepts
- Plan mode is overhead on a trivial bug. Module 2 is where it earns its keep
- The agent can introspect on its own read; the self-report is a hypothesis, not ground truth. Assume 10% of what it says or does is misrepresentation and dig
- `/context` shows how much of your window has filled up. The slice of the repo Claude didn't load is the bounded-window reality, your job is to steer what lands in those bytes
- A `CLAUDE.local.md` born from how you actually worked reads different from one written from a blank page
- The compound step lives in Exercise 3, after the PR ships. One move: review the whole session, write the rule from evidence, name the shape
- Personal rules (`./CLAUDE.local.md`, gitignored) vs. team rules (`./CLAUDE.md`, PR-reviewed) is a split worth learning early. Session compounds default to personal; team-worthy rules earn their own PR

## Debrief
The compound step runs inside the `compound-and-close` exercise. The agent reviews the full session (Exercise 1 + Exercise 2) and writes `./CLAUDE.local.md` from evidence (personal, gitignored; creates it if it doesn't exist, integrates if it does), reports 3–5 lines, you push back. If any rule is team-worthy (one every engineer on this codebase would benefit from) the agent calls it out in the summary so you can open a PR against team `./CLAUDE.md` separately. No separate module-level Debrief block; the Bridge picks up right after the ticket close-out.

[How this training was built](lectures/how-this-training-was-built.md)

## Next
Module 1 ran the loop once on a trivial bug, no plan mode. Module 2 is where plan mode earns its keep: multi-file work, a second pass that pressure-tests the plan, and the catches that come with approving more scope than you'd cold-authorize. `./CLAUDE.local.md` sits at the top of the next session, waiting to be read (alongside team `./CLAUDE.md` if this repo has one; both concatenate into context).

## Homework after Module 1, between-module reading

Optional. Skipping either piece does not break Module 2. Both sit in the gap between Module 1 and Module 2; engineers who do them arrive at Module 2 with practitioner voice and worktree-readiness as recognition rather than novelty.

**Watch: Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) (~30 min).** Cherny walks through how he and the team actually use the tool: plan mode, verification loops, parallel worktrees, `CLAUDE.md` compounding, slash commands, subagent map-reduce, the finish-the-migration rule. Why for Module 2: frames the practitioner voice the rest of Agentic Engineering 101 (AE101 from here on) earns through exercises. The moves you will live in Module 2 through Module 6 show up here first as one person's working rhythm.

**Read: [Multi-session and Git: survival guide](reference/multi-session-git.md) (~10 min).** Short local reference page on worktrees versus branches versus clones, and how to open several Claude Code sessions on the same repo without wrecking each other's state. Cherny calls parallel worktrees his single biggest productivity unlock: one repo, several Claude Code sessions running at once, each on its own branch, no stashing and no clobbering. Reach for them when one session is waiting on a long run and another piece of work is ready to move, when you want to try two approaches to the same problem side by side, or when a review task can run alongside the build. The instinct earns itself in use.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-03
- judges @68f5fd4: writing REVISE (1B/1T see instances/ae101--getting-going.writing.json), story REVISE (1B/1T see instances/ae101--getting-going.story.json), technical REVISE (2B/2T see instances/ae101--getting-going.technical.json), behavior grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Session runtime:** 2h (Connections 10 / Lecture 10 / Exercise 95 / Bridge 5). Trainer demos slowly, room copy-pastes concurrently — fits 2h in-class. Exercise breakdown: orient-and-introspect 18 / fix-tests-first 40 / compound-and-close 37 (compound retro + MCP wire + ticket close). 2h is deliberate for M1 — longer than M2–M6's 1h45 because of the orient+introspect ramp and the MCP close-out.
- **Mood target:** joyful creation — *"it works, on my repo."* Watch for: mood drift toward technical warm-up (the bug feels arbitrary, the loop feels mechanical, "this is just a TDD fix I do anyway"). Diagnostic: student narrates Ex2 as a generic engineering move with no surprise. Fix: Nerd surfaces the agentic specificity — *"the loop you just ran was orient → fix → compound → close on YOUR repo, with a rules file born from how YOU just worked. That's not a bug fix; that's the instrument starting to play your music."*
- **Opening-bid install mechanic:** trainer demos a wizard-level move on a volunteer's codebase → Connections harvests tricks each student brought → Ex1 (orient-and-introspect) each student runs the orient + introspect move on their own repo → Ex2 (fix-tests-first) TDD bug fix, ship the PR → Ex3 (compound-and-close) compound `./CLAUDE.local.md` from session evidence + ticket close-out via connector. No separate module-level Debrief.
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder unzipped by student at prework; all compounding artifacts land in the student's real repo — session compounds to `./CLAUDE.local.md` (personal, gitignored), team rules to `./CLAUDE.md` via PR, `.claude/memory/` from M4 (gitignored by default; team-kit override respected). No training-dir state. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.
- **Claude Code specifics** (MCP install per tracker, tenant-admin fallbacks): `curriculum/reference/mcp-and-connectors.md`. Updated as Claude Code's install surface changes; exercise body points at it and stays stable.
- **Freshness-rule exception — Cherny *Mastering Claude Code in 30 minutes* (May 2025).** Kept outside the 6-month window by decision; pedagogy match unbeaten by successors.

**Push-back moves** (trainer delivers by default; Nerd in self-study):
- **Connections trick** (Nerd only; cohort skips) — student shares one trick; Nerd drops one observation about working rhythm + one watch-for in M1. Don't extract themes from one trick. Nerd push: *"You reach for `/clear` between tasks — watch whether you let `/context` surprise you at Ex1, or just confirm what you already think."*
- **Ex1 introspection skip** — student reads Claude's repo summary and moves to the bug fix without running the second prompt. Nerd push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **Ex1 `/context` skipped** — slash command read as prose, not as a command. Nerd push: *"type /context in the chat — look at the number."*
- **Ex1 drifted bug** — student has drifted from prework choice. Nerd runs fresh bug-surfacing conversation. Criteria unchanged.
- **Ex2 tests-skipped** — student pastes bug and Claude jumps to a fix. Nerd push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log "no verifier here" as a note that lands in M4.)
- **Ex2 diff rubber-stamp** — student says "looks fine" under 30 seconds. Nerd push: *"find me one line you'd have written differently — not wrong, just different."*
- **Ex3 rule rubber-stamp** — student accepts Claude's `./CLAUDE.local.md` rule without reading. Nerd push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"*
- **Ex3 team vs. personal ambiguity** — Claude writes a rule that's team-worthy (*"always validate webhook signatures before dispatch — our payment flow got bitten by this"*) but lands it in `./CLAUDE.local.md` without flagging. Nerd push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so I can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."*
- **Ex3 compound-summary confabulation** — Claude's 3–5 line summary name-drops session moments without quoting. Nerd push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **Ex3 MCP install gate** — corporate tenant blocks connector install. Nerd surfaces the tenant-admin fallback per tracker from [MCP and connectors](reference/mcp-and-connectors.md). Never a blocker; always a fallback path.
- **Self-compounding at every module from M1** — the Nerd never interviews the student with Q1/Q2/Q3. Claude reviews session evidence, rewrites rules file in place, reports 3–5 lines, student pushes back. Same shape across the training.
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Nerd fast-paths replay (pedagogy already landed; regenerate artifacts for the new repo).

**Plug points (trainer):**
- Student's repo (chosen in prework) + bug Claude surfaced in prework + sponsor-stated ticket tracker.
- Repo change mid-training is a supported replay path, not a failure mode.

**Frameworks riffed on:**
- **TDD (test-driven development)** — Ex2's tests-first, root-cause-driven fix. Recognized framework the engineer audience already knows; the rule written into `./CLAUDE.local.md` at Ex3 is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Attributed inside Claude's Ex3 compound summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Materials seeded in M1 without naming the three-block frame; the frame earns its name at M4 via recognition — explicit naming here would steal it.

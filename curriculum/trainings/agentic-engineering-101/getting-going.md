# Getting going + context

> Run M1 on `high` thinking effort (the training default).

## Big Idea
The first compound loop closes on a trivial bug from your own backlog. Orient, fix tests-first without plan mode, retro into a personal `CLAUDE.local.md` born from the session. The fourth move, closing the bug's ticket outside the repo, runs as homework. The loop every module after this one rides on.

## Prework

Complete the prework at the top of this workbook. You'll open the first session in the repo you picked there. You'll stay in this one repo across all six modules. A later module commits your working tree as a fixed starting point, so keep unrelated work-in-progress committed or on its own branch as you go, and nothing stray rides into that snapshot.

## What You'll Learn
After this module, you will be able to:
- **Run** an orient → fix → compound → close loop end-to-end on a trivial bug in your own repo
- **Introspect** the agent's read of your repo and dig until you find what it's misrepresenting
- **Fix** the bug tests-first, root-cause-driven, no plan mode, and ship the PR
- **Compound** one rule from the session into `./CLAUDE.local.md`. Then close the bug's ticket via one connector as homework. The first move outside the repo

## Start here

**The question (to you):** what's one trick you figured out with Claude Code that nobody taught you? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session.

Everyone names a trick first; the training picks up from there.

[Painting the picture with the LLM](lectures/painting-the-picture-with-the-llm.md)

[The wizard move](lectures/the-wizard-move.md)

[Orient and introspect](exercises/orient-and-introspect.md)

[Fix tests-first](exercises/fix-tests-first.md)

[Compound and close](exercises/compound-and-close.md)

[The machine you just met](lectures/the-machine-you-just-met.md)

[How this training was built](lectures/how-this-training-was-built.md)

## Key Concepts
- The loop is orient → fix → compound → close
- `/context` shows what landed in the window. What didn't land is real, and you choose what fills the next round. (`/context` is oldskool; [ccstatusline](https://github.com/sirmalloc/ccstatusline) shows the same thing continuously in your status line.) Context is what you put in it.
- The agent's self-report is a hypothesis, not ground truth. Dig until you find what misrepresents. Claims aren't evidence.
- A failing test is the only proof the bug exists. Without it, the fix is a guess that happens to compile
- A `./CLAUDE.local.md` built from session evidence reads different from one drafted blank: concrete, specific, yours. Personal layer first; team-worthy rules earn their own PR. Rules grow from evidence, not blank pages.
- Closing the ticket via connector is the first move past the repo. The loop ends outside the code, and that close is your homework

## Homework
The loop's fourth move, done on your own: [Close the ticket](exercises/close-the-ticket.md). Wire one connector into your tracker and let the agent close the bug's ticket with a real close-out note, outside the repo where your team reads it.

## Next
Module 2 is where plan mode earns its keep: multi-file work, a second pass that pressure-tests the plan, and the catches that come with approving more scope than you'd cold-authorize. `./CLAUDE.local.md` sits at the top of the next session, waiting to be read (alongside team `./CLAUDE.md` if this repo has one; both concatenate into context). Close this session once the rules file lands; Module 2 opens fresh in the same repo.

## Pre-reads before Module 2

Optional. Both sit in the gap between Module 1 and Module 2. Do them and Module 2's moves land as things you've already seen.

**Watch: Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0).** Cherny walks through how he and the team actually use the tool: plan mode, verification loops, parallel worktrees, `CLAUDE.md` compounding, slash commands, subagent map-reduce, the finish-the-migration rule. The moves of Module 2 through Module 6 in Agentic Engineering 101 (AE101 from here on) show up here first as one person's working rhythm.

**Read: [Multi-session and Git: survival guide](../../trainings/agentic-engineering-101/reference/multi-session-git.md).** Short local reference page on worktrees versus branches versus clones, and how to open several Claude Code sessions on the same repo without wrecking each other's state. Cherny calls parallel worktrees his single biggest productivity unlock: one repo, several Claude Code sessions running at once, each on its own branch, no stashing and no clobbering. Reach for them when one session is waiting on a long run and another piece of work is ready to move, when you want to try two approaches to the same problem side by side, or when a review task can run alongside the build. The instinct earns itself in use.

<!-- maintainer -->


**Ticketing → homework (this pass):** the connector + ticket close-out moved from Ex3 (`compound-and-close`) to the `close-the-ticket` homework exercise. Body reframed: Big Idea, the Compound LO, the closing Key Concept, a new `## Homework` section, runtime rebalanced. Per-class Quality SHAs below predate the reframe — re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@1a9e10b story@1a9e10b technical@1a9e10b behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @1765c51: PASS — override-§3-student-noted-path-by-design-§5-contract-row-added-see-instances/ae101--prework-M1-M3.cross_module.json set=[prework,getting-going,plan-mode-done-right,earn-the-trust]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Session runtime:** ~1h45 (Connections 10 / Lecture 10 / Exercise 75 / Bridge 5). Trainer demos slowly, room copy-pastes concurrently. Exercise breakdown: orient-and-introspect 18 / fix-tests-first 40 / compound-and-close ~18 (compound retro + second sweep). The connector wire + ticket close-out is now the `close-the-ticket` homework (~15 min take-home), which pulls M1 back from its old 2h into the M2–M6 1h45 band; the orient+introspect ramp is what still fills the slot.
- **Prep timing:** prework 30 min; optional Cherny video 30 min; optional multi-session reference 10 min.
- **Mood target:** joyful creation — *"it works, on my repo."* Watch for: mood drift toward technical warm-up (the bug feels arbitrary, the loop feels mechanical, "this is just a TDD fix I do anyway"). Diagnostic: student narrates Ex2 as a generic engineering move with no surprise. Fix: trainer surfaces the agentic specificity — *"the loop you just ran was orient → fix → compound on YOUR repo, with a rules file born from how YOU just worked, and the close-outside-the-repo move waiting as homework. That's not a bug fix; that's the instrument starting to play your music."*
- **Opening-bid install mechanic:** trainer demos a wizard-level move on a volunteer's codebase → Connections harvests tricks each student brought → Ex1 (orient-and-introspect) each student runs the orient + introspect move on their own repo → Ex2 (fix-tests-first) TDD bug fix, ship the PR → Ex3 (compound-and-close) compound `./CLAUDE.local.md` from session evidence. The connector wire + ticket close-out is the `close-the-ticket` homework. No separate module-level Debrief.
- **Delivery architecture** (content folder, working-dir model, compounding-artifact split, no training-dir state): canonical in `training-architecture.md` §Working directory model / §Material distribution / §Rule files. Not restated here. The four-layer rule-file hierarchy is in `reference/claude-code-for-engineers.md § 1`.
- **Claude Code specifics** (MCP install per tracker, tenant-admin fallbacks): `curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md`. Updated as Claude Code's install surface changes; exercise body points at it and stays stable.
- **Freshness-rule exception — Cherny *Mastering Claude Code in 30 minutes* (May 2025).** Kept outside the 6-month window by decision; pedagogy match unbeaten by successors.

**Push-back moves:**
- **Ex1 introspection skip** — student reads Claude's repo summary and moves to the bug fix without running the second prompt. Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **Ex1 `/context` skipped** — slash command read as prose, not as a command. Trainer push: *"type /context in the chat — look at the number."*
- **Ex1 drifted bug** — student has drifted from prework choice. Trainer runs fresh bug-surfacing conversation. Criteria unchanged.
- **Ex2 tests-skipped** — student pastes bug and Claude jumps to a fix. Trainer push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log "no verifier here" as a note that lands in M4.)
- **Ex2 diff rubber-stamp** — student says "looks fine" under 30 seconds. Trainer push: *"find me one line you'd have written differently — not wrong, just different."*
- **Ex3 rule rubber-stamp** — student accepts Claude's `./CLAUDE.local.md` rule without reading. Trainer push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"*
- **Ex3 team vs. personal ambiguity** — Claude writes a rule that's team-worthy (*"always validate webhook signatures before dispatch — our payment flow got bitten by this"*) but lands it in `./CLAUDE.local.md` without flagging. Trainer push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so I can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."*
- **Ex3 compound-summary confabulation** — Claude's 3–5 line summary name-drops session moments without quoting. Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **Self-compounding at every module from M1** — the compound move never interviews the student with Q1/Q2/Q3. Claude reviews session evidence, rewrites rules file in place, reports 3–5 lines, student pushes back. Same shape across the training.
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Trainer fast-paths replay (pedagogy already landed; regenerate artifacts for the new repo).

**Plug points (trainer):**
- Student's repo (chosen in prework) — sponsor-stated example repos by team type if a student arrives without one
- Bug Claude surfaced in prework — sponsor-stated bug-tracking convention informs how the prework prompt phrases the surfacing
- Sponsor-stated ticket tracker (Linear / Jira / GitHub Issues) — used in the `close-the-ticket` homework; MCP install per tracker, tenant-admin fallback in `reference/mcp-and-connectors.md`
- Repo change mid-training is a supported replay path — model in `training-architecture.md` §Replay

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Runs `/context` on a working session and reads the unread-slice number** without being prompted. Falsifiable: scrollback of a normal session shows `/context` as a deliberate move (not a feature tour) within the first ten minutes.
2. **Writes a failing test that proves the bug exists before touching the fix** on a real backlog bug. Falsifiable: the commit history shows a test commit before the fix commit, OR the diff shows test additions and source changes in the same commit with the test demonstrably reflecting the bug.
3. **Edits `./CLAUDE.local.md` from session evidence after a non-trivial session**, integrating rather than appending, with a rule that quotes the specific session beat that earned it. Falsifiable: the rule names a session moment and could not have been written from a blank page.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Chosen trivial bug (incoming) | Prework session scrollback in the chosen repo + tracker/repo context if one exists | Prework Step 4 bug-screen conversation | M1 Ex2 `fix-tests-first` prompt consumes the selected bug as the failing-test target |
| Personal rules file | `./CLAUDE.local.md` (repo-personal, gitignored; create-or-integrate) | Exercise 3 compound prompt — Claude reviews full session, writes from evidence, user pushes back | Every future session in this repo (auto-loads at session-cold start); M2 plan-reading session opens with these rules already in context; M4 walk-and-fill audit subagent reads as part of *"system you have"*; M3 sharpens further with security/skill-authoring rules |

The shipped PR is produced this module; the closed ticket is produced in the `close-the-ticket` homework. Both live in external systems (the PR system, the ticket tracker) and neither is consumed by a downstream module by stable path, so per rule 46's carve-out they're exempt from the contract requirement.

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Ex1 — introspection prompt + `/context` | Introspection skip — student reads Claude's repo summary and moves to the bug fix without running the second prompt | Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"* |
| Ex1 — `/context` as command, not prose | `/context` skipped — slash command read as prose | Trainer push: *"type /context in the chat — look at the number."* |
| Ex2 — tests-first discipline | Tests-skipped — student pastes bug and Claude jumps to a fix | Trainer push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log *"no verifier here"* as a note that lands in M4.) |
| Ex2 — diff review before merge | Diff rubber-stamp — student says *"looks fine"* under 30 seconds | Trainer push: *"find me one line you'd have written differently — not wrong, just different."* |
| Ex3 — compound prompt writes `./CLAUDE.local.md` from session evidence | Rule rubber-stamp — student accepts Claude's rule without reading | Trainer push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"* |
| Ex3 — team-worthy flag in compound summary | Team vs personal ambiguity — Claude lands a team-worthy rule in `./CLAUDE.local.md` without flagging | Trainer push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so you can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."* |
| Ex3 — quoted-evidence in compound summary | Compound-summary confabulation — Claude name-drops session moments without quoting | Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."* |

**Frameworks riffed on:**
- **TDD (test-driven development)** — Ex2's tests-first, root-cause-driven fix. Recognized framework the engineer audience already knows; the rule written into `./CLAUDE.local.md` at Ex3 is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) (Every Inc.) [practitioner direct, vendor venue]. Plan → Work → Review → Compound. Attributed inside Claude's Ex3 compound summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm) [practitioner direct, vendor venue]. Materials seeded in M1 without naming the three-block frame; the frame earns its name at M4 via recognition — explicit naming here would steal it. URL deferred to M4 reveal.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

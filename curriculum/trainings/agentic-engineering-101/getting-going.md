# Getting going + context

> Run Module 1 on `high` thinking effort (the training default).

## Big Idea
Your first session should leave something behind that the next one can use. Otherwise you have a clever assistant and no compounding.

## Prework

You'll open the first session in the repo you picked. You'll stay in this one repo for the whole training. Probably best to keep the training's work off your mainline.

The prework also carries one optional read for the gap before this module: Simon Willison, [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/). He draws the line between vibe coding and working with coding agents as an accountable engineer. The first bug fix here starts on the accountable side of that line.

## What You'll Learn
After this module, you will be able to:
- **Run** an orient → fix → close → compound loop end-to-end on a trivial bug in your own repo
- **Distinguish** the agent's account of your repo from the repo's actual state
- **Fix** the bug tests-first, root-cause-driven, no plan mode, and ship the PR
- **Close** the bug's ticket from what your team's own tracker conventions show
- **Compound** the session into a personal rules file at `./CLAUDE.local.md`

## How we work in this room

- **Make it work for you.** Start from the moves this training teaches, then find your optimal way of working in your system.
- **Exercises.** Do them. That is how you experience what the model actually does.
- **Everybody should be answering.** The trainer keeps the room moving; they are not the debugger or necessarily the deepest Claude Code expert here. Ask Claude what is wrong, or ask out loud.

## Freedom to choose

- Set the right pace for the group. Not too fast, not too slow.
- People will finish at different times. Cutting depth and prompts here and there is often the right thing.
- Exercises over lectures and theory. You can come back to the theory any time.
- Protect your working memory. Cut where needed. No need to read the agent's output word for word.
- All modules are designed to cope with missing details from prior modules.

## Start here

**The question (to you):** what's your favourite Claude Code trick that not many people know? Doesn't have to be big. The weird prompt shape that works. The slash command you use more than the others. The thing you tell Claude at the start of every session.

[Painting the picture with the LLM](lectures/painting-the-picture-with-the-llm.md)

[The wizard move](lectures/the-wizard-move.md)

[Orient and map the window](exercises/orient-and-introspect.md)

[Prove the bug, then ship the fix](exercises/fix-tests-first.md)

[Close the ticket](exercises/close-the-ticket.md)

[Compound and close](exercises/compound-and-close.md)

[The machine you just met](lectures/the-machine-you-just-met.md)

## Key Concepts
<!--tier:2-->

- The loop is orient → fix → close → compound
- `/context` shows what landed in the window. What didn't land is real, and you choose what fills the next round. (`/context` is oldskool; ccstatusline, or ask Claude to set up the built-in status line.) Context is what you put in it.
- The agent's self-report is a hypothesis, not ground truth. Read it as the agent's account of the repo and the session, not the things themselves. The scrollback is the machine's reflection; current state lives on disk.
- A failing test is what makes the fix checkable. Without it, the fix is a guess that happens to compile
- A `./CLAUDE.local.md` built from session evidence reads different from one drafted blank: concrete, specific, yours. Personal layer first; team-worthy rules earn their own PR. It is the simplest personal store, and a starter. Everyone sees how it will bloat almost immediately.
- The loop ends outside the code. The close-out lands in the tracker your team reads, and that tracker encodes conventions living in the tickets. One ticket is enough to start reading them back

## Optional challenges
<!--tier:3-->

Pick one when you want a side quest before Module 2.

- Use [`/loop`](https://code.claude.com/docs/en/scheduled-tasks) to babysit one PR until its checks pass and its review threads are quiet.
- Create a morning [routine](https://code.claude.com/docs/en/routines) that triages new Jira issues, investigates likely root causes, and leaves an evidence trail.
- Sweep 100 resolved PR comments. Cluster repeated feedback, find missing repository rules, and reject any proposed rule without three examples.
- Automate rule compounding. After each session, capture one evidenced lesson, route it to the right rules file, and check whether it helps next time.

## Pre-reads before Module 2
<!--tier:3-->

Optional. Do them and Module 2's moves land as things you've already seen.

**Read:** [The agentic engineering progression](trainings/agentic-engineering-101/supplementary/agentic-engineering-progression.md). The progression from using AI for assistance to improving the system behind every session, followed by a model of reach and calibrated trust.

**Read:** Dex Horthy, [Why Software Factories Fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md) (HumanLayer). Tests tell you in seconds whether the code passes; bad architecture bills you over months, and no benchmark scores a model on keeping a codebase maintainable. The cure he lands on is human review made affordable by upfront planning.

**Watch:** Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0). Cherny walks through how he and the team actually use the tool: plan mode, verification loops, parallel worktrees, `CLAUDE.md` compounding, slash commands, subagent map-reduce, the finish-the-migration rule. The moves of Agentic Engineering 101 (AE101 from here on) show up here first as one person's working rhythm.

**Read:** [Multi-session and Git: survival guide](trainings/agentic-engineering-101/reference/multi-session-git.md). Short local reference page on worktrees versus branches versus clones, and how to open several Claude Code sessions on the same repo without wrecking each other's state. Cherny calls parallel worktrees his single biggest productivity unlock: one repo, several Claude Code sessions running at once, each on its own branch, no stashing and no clobbering. Reach for them when one session is waiting on a long run and another piece of work is ready to move, when you want to try two approaches to the same problem side by side, or when a review task can run alongside the build. The instinct earns itself in use.

## Next
<!--tier:3-->

Module 2 is where plan mode earns its keep: multi-file work, and a second pass that pressure-tests the plan before you approve it. Your rules file gets read at the top of that session.

<!-- maintainer -->

**Carded and kept (Antti 2026-08-29): the "All modules are designed to cope with missing details from prior modules" bullet stays.** It is the rescue guarantee — a trainer improvising cuts mid-session, or a student who missed a beat, needs the stated design promise, not only the cutting permission the list grants above it. `check_student_facing.md` §33 does not take it; do not re-card.

**Carded and kept (Antti 2026-08-29): the `CLAUDE.local.md` KC bullet keeps both trailing sentences** ("It is the simplest personal store, and a starter. Everyone sees how it will bloat almost immediately."). The bloat warning is essential: without it students assume every rule earns its keep, and M4's subtraction work lands on an expectation this bullet is there to break. Do not trim as NVA; do not re-card.

**The confidence before-measurement fires at this module's open, ahead of any teaching, and lives OUTSIDE the workbook.** The measurement system is deliberately not in student-facing body; the trainer administers it. Canonical wording in `theory-plan.md` § Baseline instrument — verbatim-identical to the M6 after-measurement or the delta measures the wording. Do not add a rating beat to this file's body.

**`## Prework` carries no instruction to do the prework and no locator.** A student reading this module either did it or did not; the section states what the prework left them holding. The page-geometry phrase that once trailed it (*"at the top of this workbook"*) is banned: the deck has no top once the renderer cuts at `##` (`check_slides.md` §12), and `check_slides.md` §2's navigational-pointer carve-out named that exact phrase as exempt before the blessing was withdrawn in the compendium. Do not reintroduce a locator, or the compliance line.

**The Willison pre-read is mirrored here on purpose.** `check_cross_module.md` §2 wants between-module reading in two places; prework assigns *Vibe engineering* for the gap before this module, so `## Prework` echoes it in the receiver's register. The M2→M3 boundary is the shape being matched. Do not DRY it back to one location.

**Slide size accepted:** Pre-reads before Module 2 — a reading list, not a taught slide. Four readings at 268 words against the 210 cap, and the length is the annotations: each entry says what the reading argues and why this gap is where it lands, which is what makes an optional read get taken. Trimming to the cap means dropping a reading or reducing it to a bare link, and a bare link in a between-module gap does not get opened. Nobody is projected this and talked over it — the student reads it after the module closes, at their own pace, where 268 words is a minute. The cap is calibrated for a slide a trainer stands next to.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/scheduled-tasks — [platform docs] `/loop` is session-scoped repeated prompting, and the official examples include babysitting a PR until checks and review comments settle. fallback: keep the challenge but remove the feature name and ask Claude to poll the PR manually.
- `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/routines — [platform docs] Cloud routines run autonomously on schedules with selected repositories and connectors. Jira is the challenge's chosen connected source, not a capability claim made by the page. fallback: schedule the same triage outside Claude Code and send its output into a session.
- `[checked:2026-07-30 result:OK due:2027-01-27]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md — [practitioner direct, vendor venue] (Dex Horthy, HumanLayer; Jul 2026 repo doc, last substantive commits through 2026-07-27, content + thesis verified 2026-07-30; due is publication+6mo). Claim anchors: no benchmark measures codebase-quality maintenance; tests-in-seconds vs architecture-cost-in-months; fix = human review + upfront planning. fallback: paraphrase as "practitioners running agent fleets report review, not generation, as the quality bottleneck" without single attribution.
- `[checked:2026-08-03 result:OK due:none]` `continuous-context:status-line` — [delegated stamp] The `/context` aside, both halves: ccstatusline as a third-party install, and `/statusline` for Claude Code's own status line. The dated checks are owned by `exercises/orient-and-introspect.md`, which teaches the beat and carries both URLs; `due:none` because a delegation does not expire and the delegate's own stamps are what `source-freshness.sh` walks. The Key Concepts recap names no URL of its own. fallback: cut the parenthetical — `/context` alone carries the point.
- `[checked:2026-08-08 result:OK due:none]` https://every.to/source-code/compound-engineering-the-definitive-guide — [delegated stamp] Klaassen, *Definitive Guide*, cited in the Frameworks list for the term only, never a step count. The dated check for THIS URL is owned by `exercises/push-back-on-the-plan.md` (`klaassen-definitive-guide`); the current loop sequence is a different claim with different URLs, stamped in `exercises/compound-and-close.md`. `due:none` because a delegation does not expire and the delegate's own stamp is what `source-freshness.sh` walks. fallback: name only the compound step.
- `[checked:2026-08-12 result:OK due:none]` https://simonwillison.net/2025/Oct/7/vibe-engineering/ — [delegated stamp] Willison, *Vibe engineering*. The line 12 pointer at the optional pre-read. The dated check is owned by `prework.md`, which assigns the read and dates it in body as October 2025; `due:none` because a delegation does not expire and the delegate's own stamp is what `source-freshness.sh` walks. The 2025-10-07 date sits outside the 6-month window under the same maintainer decision recorded there — named framing piece, dated at the assigning surface. Verified live 2026-08-12: title, date, author, and the vibe-coding-vs-accountable-engineer distinction all hold. fallback: cut the sentence — the prework assigns the read, and this module only points back at it.
- `[checked:2026-05-25 result:CAVEAT due:none]` https://www.youtube.com/watch?v=6eBSHbLKuN0 — [delegated stamp] Cherny, *Mastering Claude Code in 30 minutes*. The dated check is owned by `exercises/open-the-side-quest.md`; `due:none` because a delegation does not expire and the delegate's own stamp is what `source-freshness.sh` walks. The May 2025 date sits outside the 6-month window **by maintainer decision** — recorded in the Meta block below as the freshness-rule exception, pedagogy match unbeaten by successors. fallback: the pre-read is optional; drop it and Module 1 stands.

**LO "Compound the session into a personal rules file" is deliberately narrow (2026-08-23).** An LO names the artefact Ex4 produces, and that is the rules file. The wide definition (Klaassen, `vocabulary.md` § compound engineering) lands in the Ex4 coinage and the closer's `## What compounds` slide; do not widen the LO to the class, and do not flag it against the registry.

**Start-here trick-share accept-note:** *"Everyone names a trick first; the training picks up from there"* is the `check_pedagogy.md` §27 Connections-opener room-harvest carve-out — in-scope-by-design, the room-read IS the work; do not re-flag.

**M1 runs four in-class exercises and issues no homework.** The loop's order is orient → fix → close → compound, and the close sits third on purpose: the tracker conventions the agent surfaces at `close-the-ticket` are session evidence the compound sweep then integrates, so the field rules reach `./CLAUDE.local.md` without a separate fold step. Do not re-order compound ahead of the close. Connector install is out of scope for the room — see the exercise's own maintainer block.

**Room agreement.** Cohort delivery projects `How we work in this room` and `Freedom to choose` before the opening trick-share. The first slide establishes that each engineer finds their own optimal way of working, the trainer keeps the room moving rather than serving as its debugger or deepest Claude Code expert, and everybody helps answer questions. The second gives the group responsibility for a workable pace and makes selective cutting explicit when an individual's working memory is full. Both stay inside the existing 10-minute opening allocation. Self-study skips the room-only slides silently.


**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js getting-going`. The two room-agreement slides and the Connections trick-share share the opening allocation. Trainer demos slowly, room copy-pastes concurrently. M1 is sold into a longer slot than the rest of the arc, and the four-exercise arc is what fills it.
- **Transitions:** opening 10 @start "Opening: two room-agreement slides + trick-share" · bridge 5 @end "Bridge"
- **Prep timing:** prework 30 min; optional progression page 5 min; optional Cherny video 30 min; optional multi-session reference 10 min; optional factory essay 15 min.
- **Mood target:** joyful creation — *"it works, on my repo."* Watch for: mood drift toward technical warm-up (the bug feels arbitrary, the loop feels mechanical, "this is just a TDD fix I do anyway"). Diagnostic: student narrates Ex2 as a generic engineering move with no surprise. Fix: trainer surfaces the agentic specificity — *"the loop you just ran was orient → fix → close → compound on YOUR repo, with a close-out written in your team's own register and a rules file born from how YOU just worked. That's not a bug fix; that's the instrument starting to play your music."*
- **Opening-bid install mechanic:** the wizard-move lecture's live demo (the dinner-question context trick, two fresh Claude Code sessions each in its own empty directory; the question is deliberately not about code) installs the mood → Connections harvests tricks each student brought → Ex1 (orient-and-introspect) each student runs the orient + introspect move on their own repo → Ex2 (fix-tests-first) TDD bug fix, ship the PR → Ex3 (close-the-ticket) read the team's tracker conventions off one real ticket, close the bug's ticket in that register → Ex4 (compound-and-close) compound `./CLAUDE.local.md` from session evidence, the tracker read included. No separate module-level Debrief.
- **Delivery architecture** (content folder, working-dir model, compounding-artifact split, no training-dir state): canonical in `training-architecture.md` §Working directory model / §Material distribution / §Rule files. Not restated here. The four-layer rule-file hierarchy is in `reference/claude-code-for-engineers.md § 1`.
- **Claude Code specifics** (MCP install per tracker, tenant-admin fallbacks): `curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md`. No in-class beat installs a connector; the page is the student's own path when they want one, and the exercise body carries a single navigational pointer at it.
- **Freshness-rule exception — Cherny *Mastering Claude Code in 30 minutes* (May 2025).** Kept outside the 6-month window by decision; pedagogy match unbeaten by successors.

**Push-back moves** (trainer delivers):
- **Ex1 introspection skip** — student reads Claude's repo summary and moves to the bug fix without running the second prompt. Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **Ex1 `/context` skipped** — slash command read as prose, not as a command. Trainer push: *"type /context in the chat — look at the number."*
- **Ex1 drifted bug** — student has drifted from prework choice. Trainer runs fresh bug-surfacing conversation. Criteria unchanged.
- **Ex2 tests-skipped** — student pastes bug and Claude jumps to a fix. Trainer push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log "no verifier here" as a note that lands in M4.)
- **Ex2 diff rubber-stamp** — student says "looks fine" under 30 seconds. Trainer push: *"find me one line you'd have written differently — not wrong, just different."*
- **Ex3 rules rubber-stamp** — student accepts all five proposed tracker-convention rules without rejecting one. Trainer push: *"which of the five did the agent guess at? Make it separate what it read from what it inferred."*
- **Ex3 close-out rubber-stamp** — student ships the agent's first close-out draft unread. Trainer push: *"read it against the comments already on that ticket. Does it sound like the same team wrote it?"*
- **Ex4 rule rubber-stamp** — student accepts Claude's `./CLAUDE.local.md` rule without reading. Trainer push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"*
- **Ex4 team vs. personal ambiguity** — Claude writes a rule that's team-worthy (*"always validate webhook signatures before dispatch — our payment flow got bitten by this"*) but lands it in `./CLAUDE.local.md` without flagging. Trainer push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so I can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."*
- **Ex4 compound-summary confabulation** — Claude's 3–5 line summary name-drops session moments without quoting. Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*
- **Self-compounding at every module from M1** — the compound move never interviews the student with Q1/Q2/Q3. Claude reviews session evidence, rewrites rules file in place, reports 3–5 lines, student pushes back. Same shape across the training.
- **Repo change mid-training** — supported. Replay M1 → M(current) on new repo in an evening. Trainer fast-paths replay (pedagogy already landed; regenerate artifacts for the new repo).

**Plug points (trainer):**
- Student's repo (chosen in prework); a student without one builds their own via the build-a-project-from-zero supplementary
- Bug Claude surfaced in prework
- The team's ticket tracker (Linear / Jira / GitHub Issues) — the field vocabulary Ex3 reverse-engineers is the team's own. A tracker with disciplined labels yields sharper rules than one without, and naming that gap to the room is a live read on the org's own conventions
- Repo change mid-training is a supported replay path — model in `training-architecture.md` §Replay

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Runs `/context` on a working session and reads the unread-slice number** without being prompted. Falsifiable: scrollback of a normal session shows `/context` as a deliberate move (not a feature tour) within the first ten minutes.
2. **Writes a failing test that proves the bug exists before touching the fix** on a real backlog bug. Falsifiable: the commit history shows a test commit before the fix commit, OR the diff shows test additions and source changes in the same commit with the test demonstrably reflecting the bug.
3. **Edits `./CLAUDE.local.md` from session evidence after a non-trivial session**, integrating rather than appending, with a rule that quotes the specific session beat that earned it. Falsifiable: the rule names a session moment and could not have been written from a blank page.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Chosen trivial bug (incoming) | Prework session scrollback in the chosen repo + tracker/repo context if one exists | Prework bug-screen conversation | M1 Ex2 `fix-tests-first` prompt consumes the selected bug as the failing-test target |
| Personal rules file | `./CLAUDE.local.md` (repo-personal, gitignored; create-or-integrate) | Exercise 4 compound prompt — Claude reviews full session, writes from evidence, user pushes back | Every future session in this repo (auto-loads at session-cold start); M2 plan-reading session opens with these rules already in context; M4 walk-and-fill audit subagent reads as part of *"system you have"*; M3 sharpens further with security/skill-authoring rules |

The shipped PR and the closed ticket are both produced this module and both live in external systems (the PR system, the ticket tracker). Neither is consumed by a downstream module by stable path, so per rule 46's carve-out they're exempt from the contract requirement. The tracker-convention rules Ex3 surfaces stay in scrollback and reach disk only through Ex4's compound sweep, so they carry no identifier of their own.

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Ex1 — introspection prompt + `/context` | Introspection skip — student reads Claude's repo summary and moves to the bug fix without running the second prompt | Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"* |
| Ex1 — `/context` as command, not prose | `/context` skipped — slash command read as prose | Trainer push: *"type /context in the chat — look at the number."* |
| Ex2 — tests-first discipline | Tests-skipped — student pastes bug and Claude jumps to a fix | Trainer push: *"back up — what's the failing test that would prove this bug exists?"* (If no test infrastructure on this path, log *"no verifier here"* as a note that lands in M4.) |
| Ex2 — diff review before merge | Diff rubber-stamp — student says *"looks fine"* under 30 seconds | Trainer push: *"find me one line you'd have written differently — not wrong, just different."* |
| Ex3 — conventions prompt separates strong signals from guesses | Rules rubber-stamp — all five proposed rules accepted unread | Trainer push: *"which of the five did the agent guess at?"* |
| Ex3 — close-out prompt reports what it wrote | Close-out rubber-stamp — first draft shipped without reading it against the ticket's own comments | Trainer push: *"read it against the comments already on that ticket."* |
| Ex4 — compound prompt writes `./CLAUDE.local.md` from session evidence | Rule rubber-stamp — student accepts Claude's rule without reading | Trainer push: *"read it aloud — if someone on your team read this in six months, would they run the same loop?"* |
| Ex4 — team-worthy flag in compound summary | Team vs personal ambiguity — Claude lands a team-worthy rule in `./CLAUDE.local.md` without flagging | Trainer push: *"this rule is the whole team's problem, not yours alone. Flag it in your summary so you can open a PR against team `./CLAUDE.md` separately — don't PR it automatically, but name it."* |
| Ex4 — sweep prompt, *"integrate, don't append"* | Self-charity on rule self-review — the agent under-flags its own weak rules in the second pass | Trainer push: *"read each rule aloud — does it quote a specific moment, or just summarize a theme?"* |
| Ex4 — quoted-evidence in compound summary | Compound-summary confabulation — Claude name-drops session moments without quoting | Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."* |

**Frameworks riffed on:**
- **TDD (test-driven development)** — Ex2's tests-first, root-cause-driven fix. Recognized framework the engineer audience already knows; the rule written into `./CLAUDE.local.md` at Ex4 is the student's own TDD-style preference.
- **Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) (Every Inc.) [practitioner direct, vendor venue]. Cite this URL for the term and the each-unit-makes-the-next-easier thesis, never for a step count: the step names live elsewhere and the loop's staging moves; Ex4's compound summary prints the current sequence, whose stamps live in `exercises/compound-and-close.md`, while this URL's own stamp is delegated per the Source verification block above. Attributed inside Claude's Ex4 compound summary and in `lectures/the-machine-you-just-met.md`'s closing beat.
**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

**Quality:** compendium-audited 2026-08-30 (writing@43e6cae1 story@43e6cae1 technical@43e6cae1 behavior@1480362 pedagogy@85515fa0 strategy@85515fa0 slides@43e6cae1)
- judges @85515fa0: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @d47fb5af: PASS — set=[prework,getting-going,plan-mode-done-right,earn-the-trust]; 3 pairs, 0 blocking; see instances/ae101--module-set--prework-m3.cross_module.json

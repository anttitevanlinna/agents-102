# Name the rules, place the file

**Time:** 15 minutes.

**What you do:** surface task-shaping rules from the session you just ran, then read more off one story ticket.

**What you build:** one rules file from two sources: how you shaped this task, and how your team writes stories.

**The point:** find a place for your rules.

---

## Phase 1: Name the rules from this session

*8 min*

- The rules are already in the session; naming them is what is left. Each decision in the plan read carried a task-shaping rule about what made this task plan-mode-able.
- The agent reads the scrollback; you react to what it proposes. The scrollback is the right source here: the question is how you worked, not what is on disk.

Ask Claude for the rules.

{{prompt:extract-the-task-shaping-rule-1}}


## Reject or rewrite the generic rule

- The generic rule is the tell. The rule that arrives generic, like "pick tasks that span multiple files," is the one that needs rewriting into your words, or rejecting.

## Read more rules off one story ticket

- The same move you ran at M1 on a bug ticket, pointed at a story. How your team writes stories is a rule the tracker has been keeping, same as the bug fields were.
- If the task you brought came from your tracker, its own ticket is the one to read. Otherwise any real story works. One the agent just wrote carries none of your team's conventions.
- No tracker this session can reach? Paste the fields instead of the link. [MCP and connectors](../trainings/agentic-engineering-101/reference/mcp-and-connectors.md) has the one-liner per tracker if you want the reach for next time.

Drop a story ticket link after the colon.

{{prompt:extract-the-task-shaping-rule-4}}

## Phase 2: Pick how the file loads

*4 min*

- Every session on this laptop (user-level), or only sessions in this repo (repo-personal).
- Claude knows the paths; the choice is yours.

Decide the location with Claude.

{{prompt:extract-the-task-shaping-rule-2}}


## Wire the file in, check the wording

| What | Where | Loads | To wire |
|---|---|---|---|
| CLAUDE.md files | personal, repo, repo-local (gitignored) | every session | |
| Rules | `.claude/rules/` (repo) · `~/.claude/rules/` (personal) | every session; `paths:`-scoped ones on matching file reads | `paths:` frontmatter |
| Auto memory | `~/.claude/projects/<project>/memory/` | `MEMORY.md` index every session; topic files as needed | Claude writes it; `/memory` to inspect |
| Skills | personal or repo skills folder | name and description every session; full body on invocation | author or install from a plugin marketplace |
| Roll your own | any path: a notes folder, `~/.claude/memory/` | only when a prompt names it or Claude reads it | an `@path` line in an auto-loaded CLAUDE.md upgrades it to every session |

Roll your own is often facilitated by hooks and mini-skills that route the context loading: a hook injects it at session start, a mini-skill reads it when the work calls for it.

- If the picked path only loads when named, ask for the `@import` line before you move on. Without it the file sits on disk unread.
- Read the rules back. If any drifted from your wording, push back and have Claude rewrite.
- [Claude Code for engineers](../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md) is the long form: precedence, walk-up, the managed layer.

## Phase 3: Name the automation shapes

*3 min*

Ask Claude what this file could drive later.

{{prompt:extract-the-task-shaping-rule-3}}


## Read the shapes

- A shape you could use names its trigger and where your file sits in the loop. If Claude offers only one, ask for two more.
- Want the machinery? Ask about GitHub Actions, the Claude Code action, and Routines by name.

<!-- maintainer -->

**The `@import` wiring stays in body, not the fence — standing `[watch]`, reaffirmed 2026-08-02.** (The ask sits in a plain bullet under the load-map table on the *Wire the file in* slide; the `**Note**` widget it used to occupy was the slide's only content, which is not what a Note is for — a Note is louder than surrounding prose, and there was none.) This is a KNOWN §16 gap held open on purpose, logged in `pre-cohort-todos.md` (2026-07-26): *"stays REVISE, `[watch]` … Accepted as-is. Fires if a cohort run shows a student picking a non-auto-load path and missing the wire. Fix when it fires: fold the `@import` ask into `extract-the-task-shaping-rule-2.md`'s fence."* The trigger is field evidence from a cohort, not a judge's re-derivation — so a pedagogy REVISE here is the expected steady state, not a new finding. **Do not fold it into the fence before the trigger fires**, and do not re-argue it from §16's optional-refinements carve-out: the Note says *"before you move on"*, which is a gate, so that carve-out does NOT cover this. The reason is the watch decision, and the maintainer's grounds are that the wiring stays the student's choice.

**When the trigger does fire, fence it as a QUESTION, not an action** — *"do you also want an `@import` line so it fires automatically, or keep it explicit-load-only?"* A silent automatic wire-up collides with rule 37 and with the module's deliberate no-prescription stance on auto-load. The downstream stake, per the Artefact-contracts table in `plan-mode-done-right.md`: M4's walk-and-fill audit subagent cannot see `~/.claude/memory/` unless it is `@import`-wired from `~/.claude/CLAUDE.md`.

**View summary:** You ask the agent to recover the task-shaping rules hidden in the planning session, rewrite anything generic, and save the useful rules where Claude will read them. The artifact turns one good planning experience into reusable guidance for similar work.

**Scrollback-ownership clause (2026-08-08, Antti-directed):** Phase 1's *"The scrollback is the right source here: the question is how you worked, not what is on disk"* is the deliberate boundary of M1's scrollback law (`the-machine-you-just-met`, *The scrollback is not the work*): session questions read the chat, state questions read the disk. It stops the law over-learning into scrollback-bad. No module reference in body on purpose; the recognition stays implicit.

**The load-map table on the *Wire the file in* slide (2026-08-13, Antti-directed).** One compact map, the reference kept as the long form. Roster is Antti's call: CLAUDE.md variants squashed to one row (this audience knows the scoping split), rules dirs, auto memory, skills, roll-your-own with dynamic loading. The skills and auto-memory rows sit here as lookup rows ahead of their concepts' earning beats (`how-instructions-grow` names skill loading at M2's close; M3 runs it) — accepted as part of the roster call, not an earning leak. The table follows the placement prompt, so it verifies the pick rather than answering the prompt. Every row verified 2026-08-13 against docs/en/memory.md, user-level `~/.claude/rules/` additionally live-probed by cold-start session; five auto-load surfaces per `check_platform_and_boundaries.md` §6d.

**Scope ends at the automation-shapes read.** The split with M1 is by ticket kind, not by move: `close-the-ticket` reads a **bug** ticket and proposes bug rules, this exercise reads a **story** ticket and proposes story rules. The repeat is deliberate and named in the body (`check_pedagogy.md §9b` — same move, different face), so a judge reading the two files side by side should not flag the twin fences as duplication. Do not point either prompt at the other's ticket kind. The `-4` key was M1's bug-conventions prompt until 2026-08-12 and now carries the story read; M1's trio renamed to `close-the-ticket-1/2/3` in the same pass, so any reference to `extract-the-task-shaping-rule-4` dated before then means the bug prompt.

**Phase 3 automation-shapes prompt (`extract-the-task-shaping-rule-3`) kept, not cut.** The lecture `where-the-rule-could-live` walks the same three shapes, which makes this prompt look like a cut candidate. It is not: this is a no-build, name-the-shapes horizon beat, so it adds none of the concurrent-heavy-execution load the cull targeted — cutting it reclaims no load, it only drops a cheap payoff. It gives the slot a breather after the rules-extraction work and primes the lecture reveal (generate-then-reveal). Not a cut candidate.

**Emphasis budget (`check_slides.md §9`):** no bolded handles in the body; all bullet leads plain. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. (The 2026-08-12 story-ticket pass added a slide and two backing claims, both logged below; the no-claims-added clause above described the earlier slides-only pass and is kept as its record, not as a current description of the file.)

**Quality:** compendium-audited 2026-08-12 (writing@bc8e9e6 story@96b3554 technical@bc8e9e6 behavior@bc8e9e6 pedagogy@96b3554 strategy@1c765f2 slides@bc8e9e6)
- judges @96b3554: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- cohorts: none yet

**Meta (trainer):**
- **Primary Bloom's level:** Apply (P1 surface, story-ticket read) + Evaluate (P1 reject/rewrite) + Understand (P3 read shapes)
- **Placement:** inside the wider M2 slot — `node scripts/calculate-time.js plan-mode-done-right` for the current map; this file owns only its own `**Time:**` line. Sits AFTER `push-back-on-the-plan` and BEFORE the optional plan-reading-rule soft-compound. Two compound moves now close M2 with different scopes: this exercise captures task-shaping rules to a free-choice `.md`; the soft-compound integrates one plan-reading branch into `CLAUDE.local.md` if one earned itself.
- **Mood target:** extension of grounded competence into capture-and-name. Student leaves: *"the rule sits in MY file at MY location; I see how this could automate; I'm not building it today — and that's the move."*
- **Strategic beat:** *capture-your-world* (theme #5) made concrete via free-choice location; *non-agentic-default* (theme #6) made concrete via deferred application. The M2 discipline ("approve, don't execute") applied one layer up ("save, don't automate").
- **Non-front-running checks:**
  - Phase 2 names a `.md` file, NOT a skill. M3 Ex3 owns first skill-by-name authoring.
  - Phase 3 asks Claude to NAME shapes, not to invoke any. M5 owns verifier-as-eval; M6 owns eval-encoding. Today's discipline is capture-not-apply.
  - Free-choice location respects the M3 forthcoming auto-load / lazy-load / explicit-load tier reveal — rules file lands in whichever tier the student picks; no curriculum prescription.
- **Themes earned:** capture-your-world (the rule file IS the captured world; user-chosen location respects that it's THEIR world); compounding (observation → rule, written down); mirror (Claude's extraction reflects what you actually did this session); self-aware + grain of salt (Phase 3 asks Claude to introspect on automation paths — generates hypotheses, doesn't ship them).

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- adds one rule born from a real planning session to `./CLAUDE.local.md` or `~/.claude/CLAUDE.md`
- reads one story ticket for what its fields encode before shaping work from it, rather than reading it only for the ask
- names the loading mechanism (auto-load vs lazy-load vs `@import`) when deciding where a rule belongs
- when asked to automate a backlog process, states the rules-file-first order before requesting any build/code

**Push-back moves:**
- **P1 generic rules** — Claude returns rubber-stamp rules ("pick tasks that span multiple files"). Trainer push: *"name a moment from THIS session that produced that rule. If you can't, the rule is generic — push Claude for one anchored in what you actually did."*
- **P1 default-acceptance** — student saves all five rules verbatim without rewriting any. Trainer push: *"pick one. Read it aloud. Rewrite it so it sounds like you, or reject it."*
- **P2 location-paralysis** — student stalls choosing the path. Trainer push: *"the location is reversible. The CLAUDE files and both rules dirs auto-load; anywhere else fires only when a prompt names the path or an `@import` line wires it in. Pick by the mechanism you want; you can move it later."*
- **Story-ticket read — file written early** — the agent takes *"add them to the rules"* as an instruction to create a rules file, and the placement decision is made before the student makes it. `extract-the-task-shaping-rule-4`'s fence says not to; `-1` carries no such guard and runs earlier, so this is the recovery either way. Trainer push: *"ask Claude where it put them. If it wrote a file, have it tell you the path and then make the location decision yourself in the next step — the file it picked is a default, not your call."*
- **Story-ticket read — confident read off an unreachable ticket** — the session cannot open the tracker and the agent produces conventions anyway. Trainer push: *"ask it which fields it actually saw. If it can't quote them, paste the fields and re-run."*
- **P3 building-instinct** — student starts asking Claude to write the Slack bot. Trainer push: *"the lecture is next. Today is capture; application is downstream."*

**Watch-fors:**
- **P1 too long** — student over-reads, won't accept any rule as good enough. Decision: send the timer; the rule that ships imperfect rides into M3 and sharpens there.
- **P2 student saves to a Agents 101-style training-dir path** — they may have prework muscle memory. Trainer push: *"AE101 has no training-dir; the rule lives in your tooling, not the training's."*
- **P3 Claude proposes one shape only** — push for two more; the lecture grounds three.

**Plug points:**
- Student's own session scrollback (the M2 plan-mode work)
- Sponsor-stated rules home for students who pick the team-shareable path

**Frameworks riffed on (attributed at the lecture, not in this exercise's body):**
- The three automation shapes are named in `lectures/where-the-rule-could-live.md`. This exercise stays anchored to the student's own session evidence.

**Arc:**
- Picks up from: `push-back-on-the-plan` Phase 5 — the design pattern Claude named is the raw material for Phase 1 here.
- Hands off to: `lectures/where-the-rule-could-live.md` — closes the module on the leverage horizon without forcing a build.

<!-- backing -->

Claims
- `find-a-place-for-your-rules` · vision · "find a place for your rules." ← none-owed — the generic-rules claim it replaces is carried by `the-generic-rule-is-the-tell` in the Reject-or-rewrite beat, where the student meets it at the move.
- `the-generic-rule-is-the-tell` · vision · "The generic rule is the tell." ← none-owed
- `the-tracker-keeps-story-conventions-too` · vision · "How your team writes stories is a rule the tracker has been keeping, same as the bug fields were." ← none-owed
- `an-agent-written-ticket-carries-no-conventions` · vision · "One the agent just wrote carries none of your team's conventions." ← none-owed
- `the-rules-are-already-in-the-session` · vision · "The rules are already in the session; naming them is what is left." ← none-owed
- `agent-reads-the-scrollback-you-react` · vision · "The agent reads the scrollback; you react to what it proposes." ← none-owed
- `scrollback-right-source-for-session-questions` · vision · "The scrollback is the right source here: the question is how you worked, not what is on disk." ← none-owed — the ownership boundary of the M1 scrollback law: session questions read the chat, state questions read the disk.
- `ask-about-the-machinery` · detail · "Ask about GitHub Actions, the Claude Code action, and Routines by name." ← gh-actions-cron, cc-github-action, cc-routines — an ask, not an assertion: the body names three runtimes to raise with Claude and claims nothing about what any of them does. That framing is what keeps the gating and the default-behaviour caveats below out of student prose.
(No separate claim on the pause. The prompt creates it — *"stop and ask which one I want to rewrite and which one I want to reject"* — and `the-generic-rule-is-the-tell` carries the beat with the header above it.)

Sources
Every other claim here is the exercise's own design stance; the rules produced are the student's, read off their own session. These three back the *Read the shapes* runtime names only. Dated checks are owned by `lectures/where-the-rule-could-live.md`, which stamps all three and is the next thing the student reads; `due:none` because a delegation does not expire, the delegate's stamp does.
- gh-actions-cron `[checked:2026-07-31 result:OK due:none]` https://code.claude.com/docs/en/github-actions — [delegated stamp] the least plan-gated of the three, a plain `schedule: cron` workflow calling the action.
- cc-github-action `[checked:2026-07-31 result:CAVEAT due:none]` https://github.com/anthropics/claude-code-action — [delegated stamp] GA at v1.0. **The caveat matters only if this ever hardens into a claim:** default no-configuration behaviour listens for `issue_comment` and `pull_request_review_comment`, not for issues opened or labelled, so triage-on-open is a workflow the team writes.
- cc-routines `[checked:2026-07-31 result:OK due:none]` https://claude.com/blog/introducing-routines-in-claude-code — [delegated stamp] gated on both a paid plan and Claude Code on the web, itself research preview, so a room will not all have it. Named as something to ask about rather than to run, which is what keeps that gating out of the body.

Frameworks
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — naming the rule behind the decision, not repeating the decision
- The compound ladder · [borrow:none] · law:the-compound-ladder · ← none — fix to memory, the second rung, run for the first time here

Stance `[stance:2026-08-01 level:L0]`
- holds: nothing about the field, and it should stay that way. Twelve minutes of extracting a student's own rules from a session they just ran. **The generic-rule rejection beat is the whole design bet:** an agent asked for rules will produce plausible generic ones, and catching that is the skill.
- contested: nothing evidential.
- would-move-it: nothing published. What would move it is rooms reporting that the surfaced rules come back generic anyway despite the rejection pass — a delivery signal, answerable from cohort notes.

OODA
- question: none standing. Watch whether the rejection pass actually fires in rooms or gets skipped for time at twelve minutes.
- roster: none external — cohort debrief notes.
- last-run: 2026-08-01

<!-- /backing -->

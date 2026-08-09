# Name the rules, place the file

**Time:** 12 minutes.

**What you do:** read back over the plan-mode session you just ran. Ask Claude to surface three to five rules about what made *this* task plan-mode-able, what kind of multi-file work wants this treatment, what a good factoring looks like before plan mode runs on it. Save those rules to a `.md` file at a location you choose. Then ask Claude how the file could drive automated task-splitting in the future.

**What you build:** a rules file that carries how you factored this task on this codebase. Three to five task-shaping rules, surfaced from your own session and sharpened in your own words, saved at a location you chose so it fires when you want it. The automation read stays a read: you name the shapes, you don't build them today.

**The point:** the file is the artifact. You captured how *you* factored *this* task on *this* codebase. Templates stay generic; this file carries your rules. The next small lecture names three places this kind of file ends up.

---

## Phase 1: Name the rules from this session

*5 min*

- You already did the work; now name the rules inside it. You ran a plan, two push-backs, a second-pass walk-down, and an approval. Each decision along the way carried a task-shaping rule about what made this task plan-mode-able.
- You are not on the hook for remembering it. The agent reads the scrollback; you react to what it proposes. The scrollback is the right source here: the question is how you worked, not what is on disk.

Ask Claude to read the scrollback, propose rules, and pause for your push-back before going further.

{{prompt:extract-the-task-shaping-rule-1}}


## Reject or rewrite the generic rule

- When Claude pauses for the rewrite-and-reject pass, that is where your hand goes on the work.
- The generic rule is the tell. The rule that arrives generic, like "pick tasks that span multiple files," is the one that needs rewriting into your words, or rejecting.

## Phase 2: Pick where the file fires

*4 min*

- The choice is when the rules fire, not where the bytes sit. Anywhere on this laptop (user-level), or only when this repo is open (repo-personal).
- Claude carries the path taxonomy; you carry the choice.

Decide the location with Claude.

{{prompt:extract-the-task-shaping-rule-2}}


## Wire the file in, check the wording

**Note** A rule off the auto-load path needs a wire, or it sits silently on disk until something reads it. `./CLAUDE.local.md`, `./CLAUDE.md`, and `~/.claude/CLAUDE.md` auto-load; anywhere else needs an `@import` line added to one of those three, e.g. `@~/.claude/memory/task-shaping.md` added to `~/.claude/CLAUDE.md` for a rule that lives at `~/.claude/memory/task-shaping.md`. If Claude picked a path outside the three, ask it for that `@import` line before you move on.

- Read the three rules back. If any drifted from your wording, push back and have Claude rewrite.

## Phase 3: Name the automation shapes, don't build them

*3 min*

- The prompt asks for shapes, not code. "This rules file" means the `.md` file you saved in Phase 2. The first automation attempt points an agent at that file and one input stream: a Slack channel, an issue queue, or a backlog export.

{{prompt:extract-the-task-shaping-rule-3}}


## Read the shapes, hold the build

- Read the answer as a map, not a mandate. The next small lecture walks the same shapes with the trigger and runtime for each.

## What happened

Claude read the scrollback and proposed the rules. You rewrote or rejected at least one. You named the file and the path. Claude wrote it. You asked one open question about where the file could go next. Claude proposed shapes. You read.

<!-- maintainer -->

**The `@import` wiring stays in the body Note, not the fence — standing `[watch]`, reaffirmed 2026-08-02.** This is a KNOWN §16 gap held open on purpose, logged in `pre-cohort-todos.md` (2026-07-26): *"stays REVISE, `[watch]` … Accepted as-is. Fires if a cohort run shows a student picking a non-auto-load path and missing the wire. Fix when it fires: fold the `@import` ask into `extract-the-task-shaping-rule-2.md`'s fence."* The trigger is field evidence from a cohort, not a judge's re-derivation — so a pedagogy REVISE here is the expected steady state, not a new finding. **Do not fold it into the fence before the trigger fires**, and do not re-argue it from §16's optional-refinements carve-out: the Note says *"before you move on"*, which is a gate, so that carve-out does NOT cover this. The reason is the watch decision, and the maintainer's grounds are that the wiring stays the student's choice.

**When the trigger does fire, fence it as a QUESTION, not an action** — *"do you also want an `@import` line so it fires automatically, or keep it explicit-load-only?"* A silent automatic wire-up collides with rule 37 and with the module's deliberate no-prescription stance on auto-load. The downstream stake, per the Artefact-contracts table in `plan-mode-done-right.md`: M4's walk-and-fill audit subagent cannot see `~/.claude/memory/` unless it is `@import`-wired from `~/.claude/CLAUDE.md`.

**View summary:** You ask the agent to recover the task-shaping rules hidden in the planning session, rewrite anything generic, and save the useful rules where they will fire. The artifact turns one good planning experience into reusable guidance for similar work.

**Scrollback-ownership clause (2026-08-08, Antti-directed):** Phase 1's *"The scrollback is the right source here: the question is how you worked, not what is on disk"* is the deliberate boundary of M1's scrollback law (`the-machine-you-just-met`, *The scrollback is not the work*): session questions read the chat, state questions read the disk. It stops the law over-learning into scrollback-bad. No module reference in body on purpose; the recognition stays implicit.

**Scope ends at the automation-shapes read.** The ticket-conventions prompt (`extract-the-task-shaping-rule-4`) belongs to M1's `close-the-ticket`, which is also where *refinement* is earned as a term — do not reintroduce either here.

**Phase 3 automation-shapes prompt (`extract-the-task-shaping-rule-3`) kept, not cut.** The lecture `where-the-rule-could-live` walks the same three shapes, which makes this prompt look like a cut candidate. It is not: this is a no-build, name-the-shapes horizon beat, so it adds none of the concurrent-heavy-execution load the cull targeted — cutting it reclaims no load, it only drops a cheap payoff. It gives the slot a breather after the rules-extraction work and primes the lecture reveal (generate-then-reveal). Not a cut candidate.

**Emphasis budget (`check_slides.md §9`):** no bolded handles in the body; all bullet leads plain. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Quality:** compendium-audited 2026-08-08 (writing@cc2296b story@1c765f2 technical@1c765f2 behavior@1c765f2 pedagogy@cb44994 strategy@1c765f2 slides@cc2296b)
- judges @cc2296b: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- cohorts: none yet

**Meta (trainer):**
- **Primary Bloom's level:** Apply (P1 surface) + Evaluate (P1 reject/rewrite) + Understand (P3 read shapes)
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
- names the loading mechanism (auto-load vs lazy-load vs `@import`) when deciding where a rule belongs
- when asked to automate a backlog process, states the rules-file-first order before requesting any build/code

**Push-back moves:**
- **P1 generic rules** — Claude returns rubber-stamp rules ("pick tasks that span multiple files"). Trainer push: *"name a moment from THIS session that produced that rule. If you can't, the rule is generic — push Claude for one anchored in what you actually did."*
- **P1 default-acceptance** — student saves all five rules verbatim without rewriting any. Trainer push: *"pick one. Read it aloud. Rewrite it so it sounds like you, or reject it."*
- **P2 location-paralysis** — student stalls choosing the path. Trainer push: *"the location is reversible. `./CLAUDE.local.md` and `~/.claude/CLAUDE.md` auto-load; anywhere else fires only when a prompt names the path or an `@import` line wires it in. Pick by the mechanism you want; you can move it later."*
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
- `the-file-is-the-artifact` · vision · "the file is the artifact" ← none-owed
- `templates-stay-generic` · vision · "Templates stay generic; this file carries your rules" ← none-owed
- `you-already-did-the-work-now-name-it` · vision · "You already did the work; now name the rules inside it." ← none-owed
- `agent-reads-the-scrollback-you-react` · vision · "The agent reads the scrollback; you react to what it proposes." ← none-owed
- `scrollback-right-source-for-session-questions` · vision · "The scrollback is the right source here: the question is how you worked, not what is on disk." ← none-owed — the ownership boundary of the M1 scrollback law: session questions read the chat, state questions read the disk.
- `reject-or-rewrite-the-generic-rule` · vision · "When Claude pauses for the rewrite-and-reject pass, that is where your hand goes on the work." ← none-owed

Sources
(none. Every claim is the exercise's own design stance; the rules produced are the student's, read off their own session.)

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

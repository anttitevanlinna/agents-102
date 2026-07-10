# Name the rules, place the file

**Time:** 12 minutes.

**What you do:** read back over the plan-mode session you just ran. Ask Claude to surface three to five rules about what made *this* task plan-mode-able, what kind of multi-file work wants this treatment, what a good factoring looks like before plan mode runs on it. Save those rules to a `.md` file at a location you choose. Then ask Claude how the file could drive automated task-splitting in the future.

**What you build:** a rules file that carries how you factored this task on this codebase. Three to five task-shaping rules, surfaced from your own session and sharpened in your own words, saved at a location you chose so it fires when you want it. The automation read stays a read: you name the shapes, you don't build them today.

**The point:** the file is the artifact. You captured how *you* factored *this* task on *this* codebase. Templates stay generic; this file carries your rules. The next small lecture names three places this kind of file ends up.

---

## Phase 1: Name the rules from this session

- You already did the work; now name the rules inside it. You ran a plan, two push-backs, a second-pass walk-down, and an approval. Each decision along the way carried a task-shaping rule about what made this task plan-mode-able.
- You are not on the hook for remembering it. The agent reads the scrollback; you react to what it proposes.

Ask Claude to read the scrollback, propose rules, and pause for your push-back before going further.

{{prompt:extract-the-task-shaping-rule-1}}


## Reject or rewrite the generic rule

- When Claude pauses for the rewrite-and-reject pass, that is where your hand goes on the work.
- The generic rule is the tell. The rule that arrives generic, like "pick tasks that span multiple files," is the one that needs rewriting into your words, or rejecting.

## Phase 2: Pick where the file fires

- The choice is when the rules fire, not where the bytes sit. Anywhere on this laptop (user-level), or only when this repo is open (repo-personal).
- Claude carries the path taxonomy; you carry the choice.

Decide the location with Claude.

{{prompt:extract-the-task-shaping-rule-2}}


## Wire the file in, check the wording

- A rule off the auto-load path needs a wire. If the agent proposes a path other than `./CLAUDE.local.md`, `./CLAUDE.md`, or `~/.claude/CLAUDE.md`, ask Claude to also propose the `@import` line that wires the file in. A rule at `~/.claude/memory/task-shaping.md` (or any notes folder) sits silently on disk until something reads it; adding `@~/.claude/memory/task-shaping.md` to `~/.claude/CLAUDE.md` is what makes "fires anywhere on this laptop" actually fire.
- Read the three rules back. If any drifted from your wording, push back and have Claude rewrite.

## Phase 3: Name the automation shapes, don't build them

- **Refinement** is the backlog-grooming loop. Sizing, splitting, and sharpening tickets before they're worked.
- The prompt asks for shapes, not code. "This rules file" means the `.md` file you saved in Phase 2. The first automation attempt points an agent at that file and one input stream: a Slack channel, an issue queue, or a backlog export.

{{prompt:extract-the-task-shaping-rule-3}}


## Read the shapes, hold the build

- Read the answer as a map, not a mandate. The next small lecture walks the same shapes with the trigger and runtime for each.

## What happened

Claude read the scrollback and proposed the rules. You rewrote or rejected at least one. You named the file and the path. Claude wrote it. You asked one open question about where the file could go next. Claude proposed shapes. You read.

<!-- maintainer -->

**Ticket phase split out:** the optional "read one real ticket" phase (`extract-the-task-shaping-rule-4`) moved to the `read-the-ticket-rules.md` homework exercise; this file now ends at the automation-shapes read. Body trimmed since the SHAs below, so re-audit before ship.

**Phase 3 automation-shapes prompt (`extract-the-task-shaping-rule-3`) kept, not cut.** It was flagged `low-yield` (the lecture `where-the-rule-could-live` walks the same three shapes). Kept by decision: this is a no-build, name-the-shapes horizon beat, so it adds none of the concurrent-heavy-execution load the cull targeted — cutting it reclaims no load, it only drops a cheap payoff. It gives the slot a breather after the rules-extraction work and primes the lecture reveal (generate-then-reveal). Not a cut candidate.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** One handle kept bold: **Refinement** at its term-earning moment (bold narrowed from the full lead sentence to the word); all other bullet leads de-bolded. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@88a1dd4 story@0fafbbe technical@0fafbbe behavior@0fafbbe pedagogy@0fafbbe strategy@0fafbbe slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- cohorts: none yet

**Meta (trainer):**
- **Primary Bloom's level:** Apply (P1 surface) + Evaluate (P1 reject/rewrite) + Understand (P3 read shapes)
- **Exercise time band:** 12 min inside the wider M2 slot (Connections 10 / Lecture A 8 / Exercise A 50 / Exercise B 12 / Lecture B 5 / soft-compound 3 / Debrief 7 / Bridge 5 + buffer to 1h45). Sits AFTER `push-back-on-the-plan` and BEFORE the optional plan-reading-rule soft-compound. Two compound moves now close M2 with different scopes: this exercise captures task-shaping rules to a free-choice `.md`; the soft-compound integrates one plan-reading branch into `CLAUDE.local.md` if one earned itself.
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
- deflects the build instinct toward capture-first when proposing automation against a backlog

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
- Hands off to: `lectures/where-the-rule-could-live.md` — closes the module on the leverage horizon without forcing a build. The optional ticket-inference beat is now the `read-the-ticket-rules` homework (M2).

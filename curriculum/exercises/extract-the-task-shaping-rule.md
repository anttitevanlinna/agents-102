# Extract the task-shaping rule

**Time:** 12 minutes.

**What you do:** read back over the plan-mode session you just ran. Ask Claude to surface three to five rules about what made *this* task plan-mode-able, what kind of multi-file work wants this treatment, what a good factoring looks like before plan mode runs on it. Save those rules to a `.md` file at a location you choose. Then ask Claude how the file could drive automated task-splitting in the future. If time remains, reverse-engineer one ticket from your task manager and see what basic field-use rules Claude can infer.

**The point:** the file is the artifact. You captured how *you* factored *this* task on *this* codebase. Templates stay generic; this file carries your rules. The next small lecture names three places this kind of file ends up.

## Phase 1: Surface the rules from this session

You just ran a plan, two push-backs, a second-pass walk-down, and an approval. The decisions you made along the way carried task-shaping rules. Time to name them.

Ask Claude to read the scrollback, propose rules, and pause for your push-back before going further.

{{prompt:extract-the-task-shaping-rule-1}}


When Claude pauses for the rewrite-and-reject pass, that is the engagement step. The rule that arrives generic is the one that needs your hand on it.

## Phase 2: Save it where you'll find it again

Decide the location with Claude. The dimension that matters is when the rules fire, anywhere on this laptop (user-level), or only when this repo is open (repo-personal). Claude carries the path taxonomy; you carry the choice.

{{prompt:extract-the-task-shaping-rule-2}}


If the agent proposes a path other than `./CLAUDE.local.md`, `./CLAUDE.md`, or `~/.claude/CLAUDE.md`, ask Claude to also propose the `@import` line that wires the file in. A rule at `~/.claude/memory/task-shaping.md` (or any notes folder) sits silently on disk until something reads it; adding `@~/.claude/memory/task-shaping.md` to `~/.claude/CLAUDE.md` is what makes "fires anywhere on this laptop" actually fire.

Read the three rules Claude shows back. If any drifted from your wording, push back and have Claude rewrite.

## Phase 3: Automating refinement

Refinement is the backlog-grooming loop: sizing, splitting, and sharpening tickets before they're worked. The prompt asks for shapes, not code. "This rules file" means the `.md` file you saved in Phase 2. The first automation attempt starts by pointing an agent at that file and one input stream: a Slack channel, an issue queue, or a backlog export.

{{prompt:extract-the-task-shaping-rule-3}}


Read the answer. The next small lecture walks the same shapes with the trigger and runtime for each.

## Optional: Reverse-engineer your task manager

If there is time left, open one real ticket from Jira, Linear, GitHub Issues, Azure Boards, or whatever your team uses. Copy the ticket into Claude with the visible fields, title, description, comments, and links. One ticket is enough for a first read.

Then ask Claude to infer how the fields are being used.

{{prompt:extract-the-task-shaping-rule-4}}

Read the output as a first pass, not a policy. One ticket can reverse-engineer basic rules: which fields matter, which labels carry meaning, which wording signals "too big," which status changes imply ownership. If backlog refinement is your first automation attempt, these field-use rules become the first add-on to the Phase 2 `.md` file, or a small companion file beside it. Iterate for depth. Three to five tickets from different work types will surface stronger rules than one ticket, and Claude should keep separating strong signals from guesses as the sample grows.

When Claude finishes, the lecture is next.

**What happened:** Claude read the scrollback and proposed the rules. You rewrote or rejected at least one. You named the file and the path. Claude wrote it. You asked one open question about where the file could go next. Claude proposed shapes. You read. Optionally: you pasted one real ticket, and Claude inferred how your team seems to use fields like status, labels, priority, component, estimate, owner, and epic.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@88a1dd4 story@0fafbbe technical@0fafbbe behavior@0fafbbe pedagogy@0fafbbe strategy@0fafbbe)
- judges @0fafbbe: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- cohorts: none yet

**Meta (trainer):**
- **Primary Bloom's level:** Apply (P1 surface) + Evaluate (P1 reject/rewrite) + Understand (P3 read shapes)
- **Exercise time band:** 12 min inside the wider M2 slot (Connections 10 / Lecture A 8 / Exercise A 50 / Exercise B 12 / optional task-manager reverse-engineer 5 if time remains / Lecture B 5 / soft-compound 3 / Debrief 7 / Bridge 5 + buffer to 1h45). Sits AFTER `push-back-on-the-plan` and BEFORE the optional plan-reading-rule soft-compound. Two compound moves now close M2 with different scopes: this exercise captures task-shaping rules to a free-choice `.md`; the soft-compound integrates one plan-reading branch into `CLAUDE.local.md` if one earned itself.
- **Mood target:** extension of grounded competence into capture-and-name. Student leaves: *"the rule sits in MY file at MY location; I see how this could automate; I'm not building it today — and that's the move."*
- **Strategic beat:** *capture-your-world* (theme #5) made concrete via free-choice location; *non-agentic-default* (theme #6) made concrete via deferred application. The M2 discipline ("approve, don't execute") applied one layer up ("save, don't automate").
- **Non-front-running checks:**
  - Phase 2 names a `.md` file, NOT a skill. M3 Ex3 owns first skill-by-name authoring.
  - Phase 3 asks Claude to NAME shapes, not to invoke any. M5 owns verifier-as-eval; M6 owns eval-encoding. Today's discipline is capture-not-apply.
  - Free-choice location respects the M3 forthcoming auto-load / lazy-load / explicit-load tier reveal — rules file lands in whichever tier the student picks; no curriculum prescription.
- **Themes earned:** capture-your-world (the rule file IS the captured world; user-chosen location respects that it's THEIR world); compounding (Block 1 — observation → rule, written down); mirror (Claude's extraction reflects what you actually did this session); self-aware + grain of salt (Phase 3 asks Claude to introspect on automation paths — generates hypotheses, doesn't ship them).

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- adds one rule born from a real planning session to `./CLAUDE.local.md` or `~/.claude/CLAUDE.md`
- names the loading mechanism (auto-load vs lazy-load vs `@import`) when deciding where a rule belongs
- deflects the build instinct toward capture-first when proposing automation against a backlog

**Push-back moves:**
- **P1 generic rules** — Claude returns rubber-stamp rules ("pick tasks that span multiple files"). Trainer push: *"name a moment from THIS session that produced that rule. If you can't, the rule is generic — push Claude for one anchored in what you actually did."*
- **P1 default-acceptance** — student saves all five rules verbatim without rewriting any. Trainer push: *"pick one. Read it aloud. Rewrite it so it sounds like you, or reject it."*
- **P2 location-paralysis** — student stalls choosing the path. Trainer push: *"the location is reversible. `./CLAUDE.local.md` and `~/.claude/CLAUDE.md` auto-load; anywhere else fires only when a prompt names the path or an `@import` line wires it in. Pick by the mechanism you want; you can move it later."*
- **P3 building-instinct** — student starts asking Claude to write the Slack bot. Trainer push: *"the lecture is next. Today is capture; application is downstream."*
- **Optional task-manager overreach** — student treats one-ticket inference as policy. Trainer push: *"one ticket gives basic rules. Mark guesses, then test them on more tickets later."*

**Watch-fors:**
- **P1 too long** — student over-reads, won't accept any rule as good enough. Decision: send the timer; the rule that ships imperfect rides into M3 and sharpens there.
- **P2 student saves to a Agents 101-style training-dir path** — they may have prework muscle memory. Trainer push: *"AE101 has no training-dir; the rule lives in your tooling, not the training's."*
- **P3 Claude proposes one shape only** — push for two more; the lecture grounds three.
- **Optional step consumes lecture time** — skip it. The required artifact is the task-shaping `.md`; task-manager reverse-engineering is a time-left demo or homework move.

**Plug points:**
- Student's own session scrollback (the M2 plan-mode work)
- One real ticket from the student's task manager (optional reverse-engineering step)
- Sponsor-stated rules home for students who pick the team-shareable path

**Frameworks riffed on (attributed at the lecture, not in this exercise's body):**
- The three automation shapes are named in `lectures/where-the-rule-could-live.md`. This exercise stays anchored to the student's own session evidence.

**Arc:**
- Picks up from: `push-back-on-the-plan` Phase 5 — the design pattern Claude named is the raw material for Phase 1 here.
- Hands off to: `lectures/where-the-rule-could-live.md` — closes the module on the leverage horizon without forcing a build.

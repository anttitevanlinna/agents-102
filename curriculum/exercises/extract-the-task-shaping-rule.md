# Extract the task-shaping rule

**What you do:** read back over the plan-mode session you just ran. Ask Claude to surface three to five rules about what made *this* task plan-mode-able — what kind of multi-file work wants this treatment, what a good factoring looks like before plan mode runs on it. Save those rules to a `.md` file at a location you choose. Then ask Claude how the file could drive automated task-splitting in the future.

**What happens:** Claude reads the scrollback and proposes the rules. You rewrite or reject at least one. You name the file and the path. Claude writes it. You ask one open question about where the file could go next. Claude proposes shapes. You read.

**The point:** the file is the artifact. You captured how *you* factored *this* task on *this* codebase. No vendor ships *that* version of it — they ship templates, you wrote yours. The mini-lecture that follows names three places this kind of file ends up.

**Time:** 12 minutes.

## Phase 1: Surface the rules from this session (4 min)

You just ran a plan, two push-backs, a second-pass walk-down, and an approval. The decisions you made along the way carried task-shaping rules. Time to name them.

Ask Claude to read the scrollback, propose rules, and pause for your push-back before going further.

**Prompt** *(Claude Code)*

```
Read this session end-to-end. Propose three to five rules about what makes a multi-file task plan-mode-able on this codebase. Phrase each as a one-liner I could re-read tomorrow. Anchor each rule in a specific moment from the session: the task I picked, what the second-pass read surfaced, what my push-backs caught, where the plan factored cleanly and where it didn't. Rules about task shape, not about plan-reading craft. After proposing, stop and ask which one I want to rewrite and which one I want to reject. Wait for my answer before continuing.
```


When Claude pauses for the rewrite-and-reject pass, that is the engagement step. The rule that arrives generic is the one that needs your hand on it.

## Phase 2: Save it where you'll find it again (2 min)

Decide the location with Claude. The dimension that matters is when the rules fire — anywhere on this laptop (user-level), or only when this repo is open (repo-personal). Claude carries the path taxonomy; you carry the choice.

**Prompt** *(Claude Code)*

```
Let's decide together where we store this for optimal use in future. Propose two or three plausible paths with their loading models — fires-anywhere-on-this-laptop vs fires-only-when-this-repo-is-open — and tell me which one you'd pick for these rules and why. I'll confirm or steer. Once we agree, write the rules in the wording I sharpened. After saving, show me the first three rules from the file so I can confirm the wording stuck. If a file already exists at the path we pick, ask before overwriting.
```


Read the three rules Claude shows back. If any drifted from your wording, push back and have Claude rewrite.

## Phase 3: Where could this go next? (6 min)

Now the open question. The prompt asks for shapes, not code.

**Prompt** *(Claude Code)*

```
Suppose I wanted this rules file to drive automated task-splitting in the future — running over a backlog, an issue queue, or a stream of incoming requests, splitting epics into shippable slices using these rules as the guardrail. What two or three shapes does that automation typically take? Name each shape, what would invoke it, and where the rules file would sit in the loop. Don't propose code today.
```


Read the answer. The shapes Claude names are the same ones the mini-lecture grounds in real practitioner work.

When Claude finishes, the lecture is next.

<!-- maintainer -->


**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-26; check_student_facing v2026-04-27 #21+#1; check_pedagogy v2026-04-28 #32+#34+#39; check_prompts v2026-04-28 #1+#15; check_strategy_tie_in v2026-04-25; check_lectures v2026-04-24)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- sim-passed 2026-04-28 (Mid-competent 8.0 / Opinionated-senior 7.5 / Fast-operator 9.0 (Phase 1) + 8.5 (Phase 2) after both gates moved into runtime / Nitpicker — flagged ~/.claude/memory/ path + body-vs-prompt contradiction; both fixed)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/ae101-m2-extract-judge-report.md` @ 18affa1) PASS 8/8 with harness substitution flag (A4 wrote to scratch stub `<scratch>/.claude-user-stub/CLAUDE.md` instead of real `~/.claude/CLAUDE.md` per substitution table; Actor declared explicitly)
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
- **Themes earned:** capture-your-world (the rule file IS the captured world; user-chosen location respects that it's THEIR world); compounding (Block 1 — observation → rule, written down); mirror (Claude's extraction reflects what you actually did this session); self-aware + grain of salt (Phase 3 asks Claude to introspect on automation paths — generates hypotheses, doesn't ship them).

**Push-back moves** (trainer delivers by default; Nerd in self-study):
- **P1 generic rules** — Claude returns rubber-stamp rules ("pick tasks that span multiple files"). Nerd: *"name a moment from THIS session that produced that rule. If you can't, the rule is generic — push Claude for one anchored in what you actually did."*
- **P1 default-acceptance** — student saves all five rules verbatim without rewriting any. Nerd: *"pick one. Read it aloud. Rewrite it so it sounds like you, or reject it."*
- **P2 location-paralysis** — student stalls choosing the path. Nerd: *"the location is reversible. Pick the one whose loading model matches how you want the rules to fire; you can move it later."*
- **P3 building-instinct** — student starts asking Claude to write the Slack bot. Nerd: *"the lecture is next. Today is capture; application is downstream."*

**Watch-fors:**
- **P1 too long** — student over-reads, won't accept any rule as good enough. Decision: send the timer; the rule that ships imperfect rides into M3 and sharpens there.
- **P2 student saves to a Bootstrap-style training-dir path** — they may have prework muscle memory. Nerd: *"AE101 has no training-dir; the rule lives in your tooling, not the training's."*
- **P3 Claude proposes one shape only** — push for two more; the lecture grounds three.

**Plug points:**
- Student's own session scrollback (the M2 plan-mode work)
- Sponsor-stated rules home for students who pick the team-shareable path

**Frameworks riffed on (attributed at the lecture, not in this exercise's body):**
- The three automation shapes are named in `lectures/where-the-rule-could-live.md`. This exercise stays anchored to the student's own session evidence.

**Arc:**
- Picks up from: `push-back-on-the-plan` Phase 5 — the design pattern Claude named is the raw material for Phase 1 here.
- Hands off to: `lectures/where-the-rule-could-live.md` — closes the module on the leverage horizon without forcing a build.

# Plan mode, done right

> Run this module on medium thinking effort. High and xhigh may feel sluggish on a tight slot like this one.

## Big Idea
The first plan is plausible. Plausible isn't good enough, and you are the one who can tell the difference.

## Prework

Surface one multi-file backlog task in the repo you used for Module 1. Criteria: non-trivial agent work, touching wrong file matters, you'd ship it today if you had the hour. From your tracker, your head, or in conversation with Claude, your choice.

**A task that spans a few files. Not an epic.**

Optional reading before this module: [The agentic engineering progression](trainings/agentic-engineering-101/supplementary/agentic-engineering-progression.md), which sets up reach and calibrated trust; Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0); [Multi-session and Git: survival guide](../../trainings/agentic-engineering-101/reference/multi-session-git.md). And if Dex Horthy's [Why Software Factories Fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md) is still on your list from Module 1, this is the module it pays off in: the cure he lands on is human review made affordable by upfront planning. If you like a lookup page nearby, [plan mode at depth in the reference](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#9-plan-mode-at-depth) has the approval paths in one table.

## What You'll Learn
After this module, you will be able to:
- **Run** plan mode on a real multi-file task and judge the plan against five criteria
- **Push back** twice on the plan via *No, keep planning*, surfacing what the agent didn't see
- **Walk down** unresolved branches, with a recommended answer per branch
- **Spot** approval inflation in a plan whose structure makes it look decided
- **Extract** task-shaping rules from two sources, your plan session and one story ticket, into a `.md` file you place

## Start here

**The question, to you:** when was the last time you entered generation with too little planning? Where did it bite: wrong files, a design decided mid-run, rework you could have planned away?

[Lecture: The whole map](lectures/the-whole-map.md)

[Lecture: When a plan is good](lectures/when-a-plan-is-good.md)

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

[Exercise: Extract the task-shaping rule](exercises/extract-the-task-shaping-rule.md)

[Lecture: Where the rule could live](lectures/where-the-rule-could-live.md)

[Lecture: How instructions grow](lectures/how-instructions-grow.md)

## Key Concepts
- Structure is persuasive. A 7-item plan with headers looks like a decision even when it's a draft. Assume about 10% of it is wrong and go find which part.
- A human read and an agent's walk-down catch different misses. The gap between them is where the plan-reading skill lives.
- Assumption-silent isn't assumption-free: every plan assumes something, the good ones say what. A verification step that could fail is a gate; one that always passes is decoration.
- A plan with a specific file list has made decisions; a plan without one hasn't. The deferred ones get made mid-run, where a wrong call tangles across files.
- You don't have to execute a plan to know it's good. The skill is old; only the surface is new.
- A rule that doesn't load doesn't exist, and where you put it decides when it fires. Fixing the plan is the first loop; changing the rule that shaped it is the second, which Argyris called double-loop learning.

## Optional challenges

Pick one when plan mode feels too comfortable.

- Apply domain-driven design, or your favorite design framework, in plan mode. Make the plan name boundaries, invariants, and decisions before files.
- Build an internet-research system that searches broadly, prefers primary sources, rejects unsupported claims, and returns a claim-to-evidence table instead of fluff.
- Start a [Claude Code cloud session](https://code.claude.com/docs/en/claude-code-on-the-web), steer it for a few turns from the mobile app, then inspect the branch and transcript back at your desk.
- Try to bully plan mode into a bad architecture. Keep insisting on one tempting shortcut, then record where Claude pushes back and where it caves.

<!--flag:module:earn-the-trust-->## Pre-reads before Module 3

Optional. The security frame Module 3 works in.

**Read:** Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (June 2025). Names the threat class that combines private data, untrusted content, and external communication into a compromise surface.

**Read:** Simon Willison, [Designing agentic loops](https://simonwillison.net/2025/Sep/30/designing-agentic-loops/) (September 2025). What to decide before an agent runs with less supervision: what it can reach, what it must not touch, and where the blast radius ends.

**Optional deeper scan:** [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/). Broader checklist covering prompt injection, insecure output handling, data leakage, and the rest of the surface.<!--/flag:module:earn-the-trust--><!--flag:no-module:earn-the-trust-->## Pre-reads before Module 4

Optional. The thinking Module 4 asks you to do before you step away from a session.

**Read:** Lucas F. da Costa, [Backpressure Is All You Need](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need) (May 2026). Da Costa carries a word out of flow systems and into agent work: when generation outruns judgment, the human becomes the stage everything else waits on. Module 4 sends off a session that runs without you watching, which is where you meet that limit yourself.<!--/flag:no-module:earn-the-trust-->

## Next

<!--flag:module:earn-the-trust-->At M3 you point the same move at a feature you're shipping, and the call it surfaces gets written down where a teammate finds it. Note the plan file path on your way out: M3 reads it, against a task with an external or user-facing surface.<!--/flag:module:earn-the-trust--><!--flag:no-module:earn-the-trust-->

**Pick one scoped task you'd send off rather than nudge bit by bit: a real slice. Bigger than a typo-fix, smaller than an epic.**

The test for a right-sized one: hours of agent work, not minutes; several files, with requirements that have to be woven together rather than one change repeated; and something you'd happily run on a throwaway branch. A migration, a gnarly refactor, a test-coverage push, an API cutover. The task you have been putting off because it needs babysitting is usually it.

The next sitting opens on that task and spends most of its time walking your system against it. Come without one and you'll be picking while the walk is already underway. Your call.<!--/flag:no-module:earn-the-trust-->

<!-- maintainer -->

**"Try to bully plan mode into a bad architecture" stands, Antti-directed 2026-08-23.** A writing judge filed it under `check_writing.md` §17 (no combative verbs about the agent). Rejected: the bullying is intentional and carries the teaching goal — the bullet asks the student to press a bad idea deliberately and record where Claude holds and where it caves, so the ugly verb names the instrument. §17 gained the matching carve-out the same day (a beat whose point IS the bad register), scoped to the probe, not to surrounding prose. Do not soften this verb.

**Willison's *Designing agentic loops* is the M3 access-surface read, full stop — it does not also serve as a pre-M4 read.** The `no-module:earn-the-trust` `## Pre-reads before Module 4` block carries da Costa's *Backpressure Is All You Need* instead, the same essay `earn-the-trust.md` assigns as M4's pre-read in the six-module arc — one pre-M4 read across every cut, not a Willison/da Costa split by whether M3 ran. `run-the-first-experiment.md`'s matching `## Prework` callback names da Costa unconditionally, no flag.

**Willison pre-read's trailing "Module 3 draws that boundary for your own repo" cut, Antti-directed 2026-08-23.** `check_student_facing.md` §33: subject is a module, and the predicate promises a later beat's job (the predicate-leak clause added 2026-08-23). Line 86 already carries the M3 framing once, and of AE101's three pre-reads sections this was the only one narrating a later module. §33 now states that `## Pre-reads before Module N` does NOT inherit `## Prework`'s exemption. Do not restore the clause.

**Big Idea cut from four sentences to one, Antti-directed 2026-08-12.** Prior text: *"A second-pass grilling can press a plan harder than you need to consume. Your own read catches the decisions your codebase experience makes visible; the agent starts walking the branches you may not see. Keep the highest-value sharpenings. Stop when the plan is good enough to generate."* Four sentences of the module summarising its own `when-a-plan-is-good` § *Two reads, paired* slide before the student reached it, with `## What You'll Learn` restating the same arc immediately below in the more precise register. It was briefly moved below this fence, then restored: `slides.js:264` renders the Big Idea as the **subtitle on the module divider slide**, so this is title-card copy projected on a wall, not a body section — below the fence it left M2 the only module with a bare title card. Spec and the ~30-word ceiling now live in `curriculum/module-shape.md` § Big Idea; `check_student_facing.md` §33's exemption was narrowed the same day to cover what a module earns, never where it sits.

**Both `## Start here` connectives cut, same pass.** *"Before the plan-reading move, one orientation: the whole map, and where you are on it."* and *"Everyone names a moment first; When a plan is good names the pattern."* The second was an orphan slide in the composed deck (`check_slides.md` §5): `buildDeckModel` buffers stray module-level prose and flushes it when it hits the next `.phase--*`, so a lone paragraph between two inlined lectures projects as a slide containing one sentence. Both were also arc-positioning under §33, and the second pointed at a room beat by position (§2). M1 and M3 carry bare link runs with no connectives — that is the house shape. Do not reintroduce a framing line above a lecture include here.

**The bolded task-sizing callouts in `## Prework` AND `## Next` are mandated, not stylistic.** `check_pedagogy.md` §34 requires a **bolded** anti-pattern line naming the ceiling wherever task selection drives the outcome, and prints almost this exact wording as its own example. A slides judge reads either as a §9 emphasis-budget violation (two bolded sentences, not a short handle) because §9 cannot see §34. Accepted-by-design: do not flatten them, and do not re-raise as a fresh finding. The `## Next` line was added to this note 2026-08-13 after a slides judge correctly declined to file it and asked whether the note extended: it does. `## Next` is where the student picks M3's task, so it is M3's prework delivered at M2's close — the same beat §34 names, not a second one.

**The six-module `## Next` branch names M3's task and carries NO bring-or-scramble stakes line. That asymmetry is correct (Antti, 2026-08-22).** The other module gaps carry one because arriving empty costs room time: no task picked and you pick while the exercise runs; no session and there is nothing to diagnose. M3 does not require the plan file. Its `## Prework` names the *feature* as the artefact and accepts a backlog item, a Jira or Linear ticket, or a design doc instead, so nothing is lost by arriving without one and a stakes line here would have to invent a consequence — which `check_writing.md` §21 rules out. Judges reading for pattern completeness should not re-raise. Do not justify it with *"the file is in the student's repo"*: it is not, per the artefact-contract row above.

**The soft-compound and Boy Scout closes moved into `exercises/extract-the-task-shaping-rule.md` as Phases 4–5 (2026-08-25, Antti-directed).** The module body carries includes only between the exercises and the closing lectures now. Their design notes (fence acceptance, Boy Scout attribution call, `push-back-on-the-plan-4` register) travelled with the prompts to that file's maintainer block.

**M2 issues no homework.** Do not add a `## Homework` section. The ticket read is no longer M1's alone: `extract-the-task-shaping-rule` runs the same move on a **story** ticket, where M1's `close-the-ticket` runs it on a **bug** ticket (2026-08-12, maintainer-directed). The split is by ticket kind, and the M2 instance is scoped to one short slide inside the existing exercise — not a second exercise, and not a homework beat.

**The 10% line in `## Key Concepts` carries M1's attested prior, in M1's register.** `orient-and-introspect.md` § *Read the self-report, then spot-check it* holds it as *"about 10%… could be more or less"*, a loosely-held search budget, maintainer-attested there. This bullet applies the same prior to a plan instead of to the agent's read of a repo, and keeps the hedge plus the instruction register (*assume, then go find which part*) rather than stating a floor. The distinction is load-bearing: a floor is a claim about the world and gets quoted back at you; the prior is an instruction to the reader. `check_slides.md` §7's number-plus-retraction sub-item does not fire here (no retraction attached), and the attested double-hedge stays M1's alone. Do not harden this to *"at least"*, and do not add a retraction clause.

**The overwrite-recovery sentence — `exercises/extract-the-task-shaping-rule.md`, Phase 4 callout — stays in body; maintainer call 2026-08-02.** *"If it did overwrite, the old rules are still in this session's scrollback; ask Claude to restore them."* This is `check_student_facing.md` §5's own boundary case, not a violation of it: the failure is plausible (the prompt is fair to misread as a replace), the rescue is non-obvious (that the old rules survive in scrollback is not something a student would guess), and it is one tight line of state-plus-one-move. It is also **time-critical** — the scrollback dies with the session, so a student who finds the overwrite after closing has lost the rules for good. Body is the only surface that reaches them while the rescue still works. A writing judge has flagged this once and the orchestrator then proposed routing it below the maintainer fence, which §5 explicitly calls deletion. Do not cut it, and do not "move it to the trainer" — the fence is stripped from every rendered surface.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

This module points at four sources in body and owned a stamp for none of them; three are checked in the file that teaches them and are delegated here, one is checked live.

- `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/claude-code-on-the-web — [platform docs] Cloud sessions run on Anthropic-managed infrastructure and can be opened and steered from the Claude mobile app. fallback: replace the cloud-and-mobile challenge with a local Remote Control handoff.
- `[checked:2026-05-25 result:CAVEAT due:none]` https://www.youtube.com/watch?v=6eBSHbLKuN0 — [delegated stamp] Cherny, *Mastering Claude Code in 30 minutes*, the line 16 optional pre-read. Dated check owned by `exercises/open-the-side-quest.md`; outside the 6-month window by maintainer decision, recorded in `getting-going.md`. `due:none` — a delegation does not expire, the delegate's stamp does. fallback: optional reading; drop it.
- `[checked:2026-07-31 result:OK due:none]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md — [delegated stamp] Horthy, *Why Software Factories Fail*, the line 16 callback. Freshest dated check is `lectures/when-a-plan-is-good.md`; `getting-going.md` also carries one. This module makes no numeric claim on it, only the pointer plus its thesis (the cure is human review made affordable by upfront planning), so delegation is the right shape rather than a fourth copy. fallback: drop the callback; the module stands without it.
- `[checked:2026-07-02 result:OK due:none]` https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ — [delegated stamp] Willison, the line 90 `## Pre-read` for Module 3. Dated check owned by `supplementary/the-lethal-trifecta.md`, itself `due:none` as a durable named-framing piece. fallback: the supplementary carries the threat class in full.
- `[checked:2026-07-30 result:OK due:2026-03-30]` https://simonwillison.net/2025/Sep/30/designing-agentic-loops/ — [practitioner direct] (Willison, 2025-09-30). Outside the 6-month window by decision: named framing piece, dated in body, same treatment as the Cherny video exception in `getting-going.md`. Not a §2a durable-account carve-out: that shape needs a specific completed event, and this piece describes a general technique. No compendium rule waives the clock here; this is a maintainer decision, same shape as the Cherny exception, which is likewise uncited. **This file owns the check and assigns the essay in the six-module arc only**, as the second `## Pre-reads before Module 3` entry (Antti, 2026-08-21: *"it was more about security than long-running"* — the essay's subject is what the agent may reach and what it must not touch, which is M3's access-surface question). Not assigned at M4 in any cut. fallback: drop the entry; the trifecta read carries the threat class on its own.
- `[checked:2026-07-30 result:OK due:none]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [delegated stamp] da Costa, the `no-module:earn-the-trust` `## Pre-reads before Module 4` entry. Dated check owned by `earn-the-trust.md`, which assigns the essay in the six-module arc; `run-the-first-experiment.md` carries an unconditional echo of the same URL in its `## Prework`. `due:none` — a delegation does not expire, the delegate's stamp does. fallback: drop the entry; the M4 callback in `run-the-first-experiment.md` still assigns the piece.
- `[checked:2026-08-02 result:OK due:cohort]` https://owasp.org/www-project-top-10-for-large-language-model-applications/ — [academic/research] The line 92 optional deeper scan, and the one source here no other file stamps. Page live and actively maintained at check. **Scope caveat that will matter at re-check:** the effort has become the OWASP GenAI Security Project and the current list lives at genai.owasp.org/llm-top-10/ (2025 edition), with the v1.1 categories the body echoes — prompt injection, insecure output handling, data leakage — now archived and partly renamed. The landing URL still resolves and still fronts the project. `due:cohort` because that migration is mid-flight. fallback: link the GenAI project root and describe it as the wider LLM-risk checklist without naming categories.

**Quality:** compendium-audited 2026-08-26 (writing@d065f8bc story@d065f8bc technical@af3c9106 behavior@7fb973dd pedagogy@d065f8bc strategy@ba5ccf5 slides@d065f8bc)
- judges @d065f8bc: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @37aa983b: PASS — set=[prework,getting-going,plan-mode-done-right,earn-the-trust]; 3 pairs, 0 blocking; see instances/ae101--module-set--prework-m3.cross_module.json

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat is the Evaluate beat)
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js plan-mode-done-right`. Trainer demos slowly, room copy-pastes concurrently. Self-study follow-along runs comparably; simple-prompting beats are quick.
- **Transitions:** connections 10 @start "Connections: the approved-unread plan" · debrief 7 @after:how-instructions-grow "Debrief" · bridge 5 @end "Bridge"
- **No charge on `push-back-on-the-plan`** — rationale in that exercise's block.
- **Prep timing:** backlog-task surfacing 10 min; optional progression page 5 min; optional Cherny video 30 min; optional multi-session reference 10 min; Module 3 pre-reads 10–15 min (trifecta) + 10 min (agentic loops); optional OWASP scan 20 min. In cuts without M3 the three are replaced by the Module 4 pre-read, da Costa's *Backpressure Is All You Need*, 15 min.
- **Mood target:** grounded competence — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."* Watch for: mood drift toward *"the second read did everything; my push-back was pointless."* Diagnostic: student at P5 reports the second-pass read caught the interesting stuff. Fix: trainer surfaces the contrast — *"your push-back caught the soft item the second read re-softened; your voice-of-experience beats the agent's breadth on that axis."*
- **Delivery architecture** (working-dir model, compounding-artifact split, no training-dir state): canonical in `training-architecture.md` §Working directory model / §Rule files. Not restated here. Plan files land in Claude Code's default location; the four-layer rule-file hierarchy is in `reference/claude-code-for-engineers.md § 1`.
- **Wizard demo:** intentionally none — engineer audience, the lecture carries push-back calibration.

**Push-back moves:**
- **P1 blocker** — student can't surface a fitting task. Trainer runs three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp** — student approves under 60s with no push-back messages. Trainer: *"pick No, keep planning — send one soft item before approving."*
- **P3 generic push-back** — messages lack step numbers or specific concerns. Trainer: *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening on regeneration** — Claude acknowledges the push-back but re-softens the flagged step in the revised plan. Trainer: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P4 value-skip** — student stops after 2–3 questions without judging what remains. Trainer: *"what would the next question still change in execution? If nothing material, lock it in. If one branch still matters, take that one."*
- **P4 auto-accept** — student accepts every recommended answer without correcting any. Trainer: *"reject at least one recommended answer if it's wrong for your codebase — the second read's recommendations are defaults, not prescriptions."*
- **P5 deflection** — student reports *"the second read did all the work, my push-back was pointless."* Trainer: *"quote one thing your push-back caught that the second read would have missed. You're reading differently; different isn't worse."*
- **P5 naming** — if Claude frames the pattern as *"use plan mode carefully,"* trainer pushes for structural naming: *"the pattern is human read → push-back → agent walk-down → approve. Name the pairing, not the moral."*
- **Debrief** — self-compounding. If Claude writes a generic rubric, trainer: *"name a pattern specific to THIS codebase, from THIS session's evidence — what branch did grill surface that a first read would miss on this repo?"*

**Watch-fors (cross-phase):**
- Lecture over-runs to 15+ min. Cut the three-pressures section to 60 seconds if tight; the exercise teaches them.
- Connections drifts into war-stories about bad agent behavior. Cap at 10 min, let the stories be short.
- Student reaches for the Ctrl+G plan-file edit flow (a real practitioner primitive). Fine to acknowledge at Debrief as a next-tier move; not this exercise's path.
- Student asks *"why don't we execute?"* near P5. Answer: making the plan good IS the work; recognising a good plan is the skill this module installs.

**Decision points:**
- **Exercise runs to 70 min:** the second read went deep (common on real codebases). That is 13 over its 57, and there is no spare beat to take it from — this module has no buffer transition, and the 5-minute overrun on the Slot line (calculate-time.js 2026-08-26: 125 min vs the 120 cap) is already spent. Take it from the Bridge (5), then compress the Debrief (7) — in that order, and keep the pattern-naming step. Below that, the give is the second exercise, not the close.
- **Exercise finishes under 45 min:** the highest-value branches landed fast — a good-enough read, a small task, or a thin design tree. Use spare time for the comparison and rule extraction; don't invent more reading to fill the slot.
- **Whole room mood below 7:** something is stealing grounded competence. Check: was the student's push-back still active when the second read ran (order matters — push-back first keeps the student's read in the driver's seat)? Was the walk-down taken in its three-question batches (not dumped whole and skimmed)? Was "stop, don't execute" named early enough to land as intentional rather than anticlimactic?

**Plug points (trainer):**
- Student's own repo (carried from M1)
- Student's own backlog task (surfaced in M2 prework)
- Rules home for the Compound step — auto-loaded options are `./CLAUDE.local.md` (repo-personal), `~/.claude/CLAUDE.md` (cross-repo), and a rules file under `.claude/rules/` or `~/.claude/rules/`; anything else, including `~/.claude/memory/<file>.md` or a notes folder, only loads when a prompt names the path or an `@import` line inside an auto-loaded `CLAUDE.md` pulls it in
- Push-back moves at P3

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Enters plan mode (Shift+Tab cycle) on a non-trivial multi-file task before approving** anything Claude writes. Falsifiable: scrollback of a working session shows the mode-cycle move on a task that touches two or more files.
2. **Sends at least one *No, keep planning* push-back referencing a specific step number and a specific word from the plan**, before approving. Falsifiable: the push-back message quotes the plan's own step text rather than naming a generic concern.
3. **Asks Claude to walk down unresolved branches three questions at a time** when the plan touches a design tree they don't fully see. Falsifiable: the scrollback shows a batched Q-and-A sequence, not a prompt that returned a list of branches in one shot.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Task-shaping rule file | Student-picked location. Auto-loaded: `./CLAUDE.local.md` (repo-personal), `~/.claude/CLAUDE.md` (cross-repo), or a rules file under `.claude/rules/` / `~/.claude/rules/`. Not auto-loaded but legal: a notes folder, `~/.claude/memory/<file>.md`, or any other path — read only when a prompt names the path or when an `@import` line inside an auto-loaded `CLAUDE.md` pulls it in. | Exercise 2 (extract-the-task-shaping-rule) — Claude reads M2 scrollback, proposes 3–5 rules, student rewrites or rejects at least one. If the picked path doesn't auto-load, Claude should also propose the `@import` wire-up so the rule fires next session. | M4 walk-and-fill Phase 1 (audit subagent reads `CLAUDE.md` / `CLAUDE.local.md` / `observations/` repo-level / ADRs / skills; user-level `~/.claude/memory/` is silent unless `@import`-wired from `~/.claude/CLAUDE.md`). Any future task-shaping conversation in the same loading scope. |
| Personal rules update (optional, opportunistic) | `./CLAUDE.local.md` (repo-personal, gitignored) | "Save the rule if it earned itself" prompt — Phase 4 of `exercises/extract-the-task-shaping-rule.md`; Claude integrates one branch from the second-pass read, only if one earned itself | Every future session in this repo (auto-loads at session-cold start); M3 sharpens further with security/skill-authoring rules |
| Plan file (from plan mode) | `~/.claude/plans/<slug>-<adjective>-<noun>.md` — fixed directory, generated filename. User-keyed and laptop-local, so it never rides the branch. Plan mode displays the path inline when it writes; the student notes it at module close for M3. The curriculum prescribes no location, which is the student-pick part — the directory itself is Claude Code's, not a choice anyone makes. | Exercise Phase 3 (`push-back-on-the-plan`) — plan mode writes the file when the student approves the plan after the push-back loop. | M3 prework / Ex1 input (earn-the-trust.md L12: "The plan file Claude Code wrote during plan mode is what M3 reads — you noted the path at M2 close."). |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| P1 — *"surface a multi-file task that fits the criteria"* | P1 blocker — student can't find a fitting task | Trainer runs three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters. |
| P3 — *"push back twice via No, keep planning"* | P3 rubber-stamp — student approves under 60s with no push-back | Trainer push: *"pick No, keep planning — send one soft item before approving."* |
| P3 — *"the push-back names a step number AND a specific word"* | P3 generic push-back — messages lack specifics | Trainer push: *"which step, which words? say the thing you'd want a senior reviewer to catch."* |
| P3 — *"verify the push-back actually sharpened the plan, not re-softened"* | P3 softening on regeneration — Claude acknowledges and re-softens | Trainer push: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."* |
| P4 — *"judge what another branch would still change"* | P4 value-skip — student stops without judging what remains | Trainer push: *"what would the next question still change in execution? If nothing material, lock it in. If one branch still matters, take that one."* |
| P4 — *"reject at least one recommended answer"* | P4 auto-accept — student accepts every recommended answer | Trainer push: *"reject at least one recommended answer if it's wrong for your codebase — the second read's recommendations are defaults, not prescriptions."* |
| P5 — *"approve, stop, do not execute"* | P5 execution-creep — student executes the plan anyway | Trainer push: *"making the plan good IS the work; recognising a good plan is the skill this module installs."* |
| P5 — *"name the pattern: human read → push-back → agent walk-down → approve"* | P5 deflection — student reports *"the second read did all the work"* | Trainer push: *"quote one thing your push-back caught that the second read would have missed."* |

The save-the-rule and Boy Scout beats live in `exercises/extract-the-task-shaping-rule.md` (Phases 4–5), and their failure modes live in that file's Push-back moves / Watch-fors.

**Frameworks riffed on (attributed in-exercise or at Debrief):**
- **Plan mode** (Anthropic Claude Code). Activation: Shift+Tab cycle (CLI) or the mode dropdown (Desktop). Push-back via *No, keep planning* at the approval prompt — chat-based, the exercise's path. Reference: https://code.claude.com/docs/en/permission-modes.md `[capability]`. Anthropic's own docs on Anthropic's own product are a capability reference, never `[practitioner direct]`. Live stamp lives on `exercises/push-back-on-the-plan.md`; keep the two in step.
- **Compound engineering** — Kieran Klaassen (Every Inc.). M2 is the Plan step at depth, continuation from M1. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `https://every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct, vendor venue]`.
- **"What would have to be true" / strategic-choice assumption-testing** — Roger Martin (HBR, *Playing to Win*). Vision-layer attribution, optional at Debrief; most engineers have seen this in strategy readings.

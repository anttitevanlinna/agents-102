# Eval — tests-first integration in AE101 M2 + M5

**Scope:** LLM-as-judge pass on the narrow tests-first change (M2 Phase 2 plan prompt + one body line; M5 Phase 4 reference-artefact prompt + plan.md prompt). Files evaluated end-to-end but the verdict weights the delta.

**Templates applied:** `curriculum/evals/exercise.md` judges (essential + contributory). No prior instance files existed for either exercise — noted in TODOs.

---

## File 1 — `push-back-on-the-plan.md` (M2)

**Mood contract:** grounded competence.
**Tests-first touch points:** body line at Phase 2 ("Read the tests section carefully. A good plan names the tests before any code; the tests are part of what 'done' means, not something you bolt on after. If the tests section is thin or missing, that's a push-back.") + plan prompt now includes "tests you'd write or update before any code lands."

### Per-judge table

| Judge | Pass/Fail | Evidence |
|---|---|---|
| Leap test | Pass | Student leaves able to read a plan, send specific push-backs, run a second-pass read, recognize plan-mode approval inflation. Tests-first strengthens push-back vocabulary (thin tests section = soft item). |
| Framing fidelity | Pass | Opens with "reading a plan is finite" — no anti-framing of tests as CI theatre. |
| LO fit (Apply + Analyze + Evaluate) | Pass | Tests-first sits cleanly in Evaluate (student judges test quality as part of plan read). No new LO drift. |
| Module-to-module arc | Pass | M1 loop carries in; tests-first body line hands off naturally to M3 (judge-building) — push-back on thin tests section IS the seed of M3's judge. No front-run of M3 vocabulary. |
| Mood lands (per-phase + close) | Pass (8/10 throughout) | Tests-first reads as "one more thing a good plan names," not as correction. Reinforces grounded-competence ("I can see what a tight plan looks like"). No tonal jolt. |
| Teaching moment | Pass | Softening-on-regeneration tell still the load-bearing aha. Tests-first is a second, weaker aha (thin tests = push-back fuel). Doesn't dilute. |
| Riffs on framework | Pass | Plan mode + Pocock grill-me + Martin assumption-testing + Klaassen compound. Tests-first riffs on TDD implicitly without naming it — good; the term would strobe for non-TDD shops. |
| Failure modes named | Pass | P3 rubber-stamp, performative, softening, timer-abuse, senior-refusal all covered. Tests-first doesn't introduce a new failure mode worth naming. |
| Time-boxed | Pass | 60 min, P1 5 / P2 15 / P3 15 / P4 15 / P5 10. Tests-first adds ~1 line of reading at P2 — negligible. |
| Facilitator briefing | Pass | Watch-fors + decision points + plug points + Nerd push-backs all present. |
| Scaffold / worked example | Pass | Prompts are scaffolds; plan-file naming example ("migrate-auth-hash-calm-otter.md") is concrete. |
| Prompt design | Pass | No mid-prompt `[BRACKETS]`. Added "tests you'd write or update before any code lands" reads as first-class attribute in a list of four (files / shape / tests / done-check). Not bolted. |
| Plug points real | Pass | Own repo, own backlog task, sponsor-stated rules home. |
| Business-audience language | N/A (AE101 — engineer audience) | Engineer IC audience; terms like "hook," "pre-commit," etc. earned by prior arc. |
| Voice | Pass | Second person, Seth-warm-Rory-reframe register intact. |
| Length | Pass | ~950 words body. Over the 400–700 target but this is an AE101 exercise with 60-min runtime and five phases — the target is Bootstrap-tuned; AE101 runs longer. Documented elsewhere. |
| Specificity | Pass | Named mechanics (Shift+Tab, keep-planning-with-feedback, plan-file naming), named axes (soft/assumption/committed). |

**Banned-word scan:** clean (no honest/delve/crucial/importantly/landscape-as-verb/ritual/ceremony/substrate in student body).
**Placeholder-in-fence:** clean.
**Em-dash discipline (student body):** clean — no em-dashes in pre-maintainer section.
**Skill-invocation-by-name-not-path:** N/A (no skills invoked; Pocock credit in maintainer only — correct, per "don't front-run M3's first-Skill-use moment").
**Delivery architecture (AE101):** clean. Plan files land in Claude Code's plan dir; Compound rules land in student's real repo `CLAUDE.local.md`. "No training-dir state" explicit.
**Prompt lead-in:** both prompts have action lead-ins under 20 words ("Ask Claude to work in plan mode and write a detailed plan file…"; "Ask Claude to walk down every unresolved branch…"). Pass.
**Action-header discipline:** Phase headers ("Bring a real task," "Enter plan mode…," "Push back twice," "Second-pass read," "Stop. See the design pattern."). Command-verb-led. Pass.
**Vocabulary discipline (LLM/agent/Claude):** "agent" for acting, "Claude" for the product. Clean.
**Link format:** one path-form link in maintainer (`reference/claude-code-for-engineers.md § 1`) — maintainer-only, exempt. No path-form links in student body.

### Does tests-first earn its place?

Yes. The integration is one body sentence + one clause in the plan prompt. It reads as a natural attribute of a good plan (files / shape / tests / done-check), not as a bolted crusade. It also gives the student a reliable push-back target ("the tests section is thin") which strengthens Phase 3's forcing function.

### Verdict: **APPROVE**

**Top items (contributory, not blockers):**
1. The tests-first body line sits mid-paragraph in Phase 2. Consider a one-line pull-out to make the "tests are part of what 'done' means" click faster on skim — but not required; mid-paragraph keeps it from reading as a doctrine.
2. No eval instance file exists at `curriculum/evals/instances/agentic-engineering-101--plan-mode-done-right.md` referencing this exercise — TODO for pre-first-cohort.

---

## File 2 — `diagnose-and-resend.md` (M5)

**Mood contract:** learning through contrast.
**Tests-first touch points:** reference-artefact prompt ("The tests that must exist and pass — named, before any code lands. Tests are a first-class part of the task spec, not a bolt-on after implementation. If a requirement can't be named as a test, the requirement isn't clear enough yet.") + "done means" line (tests green + requirements met) + plan.md prompt ("Tests-first phase — the first phase writes or updates the tests from the reference spec. Code phases come after. The plan makes this ordering explicit.").

### Per-judge table

| Judge | Pass/Fail | Evidence |
|---|---|---|
| Leap test | Pass | Student leaves with diagnosis + verifier + reference + plan.md; tests-first sharpens what the reference and plan.md carry. |
| Framing fidelity | Pass | "Diagnosis through named failure modes" opens. Tests-first reinforces "validation would have caught this at hour 2." |
| LO fit (Analyze + Evaluate + Create) | Pass | Tests-first is a Create move (name the tests before code). Tightens the Create beat. |
| Module-to-module arc | Pass | M4 un-packaged artefact → M5 diagnosis → M6 expand verifier kit. Tests-first hands off to M6 cleanly (M6 can layer additional checks on top of test gate). |
| Mood lands (learning through contrast) | Pass (8/10) | Tests-first plays to contrast: "un-packaged run shipped code without pinning tests; packaged run names the tests first." The contrast IS the mood. |
| Teaching moment | Pass | Dominant-failure → matching verifier shape. Tests-first doesn't dilute; it reinforces the reference as "task spec, not admiration." |
| Riffs on framework | Pass | Goal drift / context rot / plausible-but-wrong (convergent practitioner vocabulary); Ronacher three-pattern (maintainer-only, closing lecture names it); Cherny three shapes. Tests-first riffs on TDD without naming it — same call as M2, correct for the audience. |
| Failure modes named | Pass | Seven named; tests-first adds implicit coverage for "plan.md reads like project plan" (tests-first phase is a natural agent-mutable anchor). |
| Time-boxed | Pass | 65 min exercise body + 15–20 min Debrief. Tests-first adds negligible reading time. |
| Facilitator briefing | Pass | Decision points + watch-fors + send-off mechanism all present. |
| Scaffold / worked example | Partial | The two prompts are detailed scaffolds. Maintainer TODO flags "worked-example reference + plan.md pair for the Nerd's reference library, by archetype" — i.e. known gap pre-first-cohort. Not blocking. |
| Prompt design | Pass | No mid-prompt `[BRACKETS]`. Tests-first clauses sit in bulleted lists inside both prompts — reads as first-class, not appended. |
| Plug points real | Pass | Student's own M4 artefact, repo's CI conventions, sponsor-stated folder convention. |
| Business-audience language | N/A (engineer audience) | AE101 scope. |
| Voice | Pass | Second person; pragmatic; no consultant-speak. |
| Length | Pass | ~810 words body (stated). Within AE101 norm. |
| Specificity | Pass | Named lenses, named verifier shapes, quoted-moment requirement, named sections of plan.md. |

**Banned-word scan (student body, pre-maintainer):** clean on honest/delve/crucial/importantly/landscape-as-verb/ritual/ceremony. One use of *"substrate"* appears — but in the maintainer block only (line under Plug points: "Student's own M4 artefact (Phase 1 substrate)"). Body is clean. Pass.
**Placeholder-in-fence:** clean.
**Em-dash discipline (student body):** several em-dashes in prose and in prompt fences (e.g., Phase 1: *"tell you *what* the agent did; the transcript tells you *how* it got there, including the drift and dead-ends"* uses semicolon, OK; but *"`~/.claude/projects/` — Claude Code stores..."*, *"Goal drift — moments where..."*, *"The tests that must exist and pass — named, before any code lands"* all use em-dashes). Compendium rule *"no em-dashes, simple sentences"* applies to all student-facing curriculum. Flag as contributory revise — consistent with pre-existing file style; not introduced by the tests-first change (the tests-first clause inherits the surrounding em-dash convention).
**Skill-invocation-by-name-not-path:** N/A.
**Delivery architecture (AE101):** clean — "same repo you ran M4 in," `~/.claude/projects/` for session scrollback, task-scoped folder for reference + plan.md. No training-dir state.
**Prompt lead-in:** all four prompts have action lead-ins with command verb under 20 words. Pass.
**Action-header discipline:** "Read the return," "Align-then-run, in reverse," "Build the verifier," "Assemble reference + plan.md." Command-led. Pass.
**Vocabulary discipline:** "agent" for acting, "Claude" for product. Clean.
**Link format:** maintainer paths only; body uses no filename-as-link.

### Does tests-first earn its place?

Yes, and more visibly than in M2. The tests-first clause in the reference prompt is load-bearing — it converts the reference from "success criteria prose" into "named tests + done-means line," which is what makes the re-send produce a different feel than the un-packaged M4 run. Without it, the reference reads like a manifesto (the exact failure mode the maintainer block warns against). The plan.md "Tests-first phase" clause closes the loop by making the agent's first ordered move "write/update tests," which is what the un-packaged run missed. Tests-first here is not ornament; it is the packaging that earns the contrast.

### Verdict: **APPROVE-WITH-TODOs**

**Top items:**
1. **Em-dash sweep (contributory).** Student body contains em-dashes inherited from pre-existing file style. Convert to periods / commas / parentheses in a dedicated pass. Not blocking tests-first acceptance.
2. **Worked-example pair for reference + plan.md (known TODO in maintainer block).** Pre-first-cohort artefact needed so the Nerd can anchor archetype-specific references when a student stalls.
3. **Eval instance file** at `curriculum/evals/instances/agentic-engineering-101--learn-from-the-test.md` noted in maintainer as unbuilt — create before first cohort.

---

## Cross-file read on tests-first

The integration passes the four focus questions:

1. **Earns its place without bloat:** one body line in M2, two clauses across two prompts in M5. No new phases, no new artefacts, no new vocabulary. Within the existing plan-attribute list and reference-spec list, tests-first is an obvious member.
2. **Reads as first-class, not bolted:** in M2, tests sit alongside files / shape / done-check — four peers, none privileged. In M5, tests-first has its own bold tag in both prompt bullet lists — reads as one of the ordered moves, not an aside.
3. **Matches mood contract:** M2 grounded competence is strengthened (one more thing a good plan reliably names). M5 learning-through-contrast is strengthened (un-packaged run didn't name tests; packaged run does — that *is* the contrast).
4. **No banned words or register drift:** student body clean in both files for the change scope. Em-dashes in M5 are pre-existing and not introduced by the tests-first edits.

**Word count:** ~1180 words.

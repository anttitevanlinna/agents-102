# Diagnose and *package*

**Time:** 65 minutes inside a 2h module slot (Phases 1–4). Debrief + re-send (~15–20 min) is owned by the module file.

**Session** *(new, "Module 5 worktree session")*

Open a new Claude Code session in the M5 worktree at `../<repo>-m5` (set up at module open).

```
/rename m5-diagnose-resend
```

**HOX** You should be in the M5 worktree now. Make sure you are not continuing on the M4 repo or branch.

**What you do:** Read the un-packaged M4 artefact through three failure-mode lenses. For each named failure, ask what validation would have caught it in minutes, not hours. Build a verifier shaped against your dominant failure (one of three shapes). Assemble a task-scoped reference artefact + plan.md in conversation. At Debrief, the module re-sends the same task packaged.

**What you build:** three pieces that make a failed run come back trustworthy: a verifier, a reference, and a plan.md. Each one is built against a specific failure you read in the M4 run.

**The point:** Ronacher's three-pattern earns its name in this exercise. You don't learn it from a slide; you build each piece against a failure you read in your own artefact. The closing lecture names what you built afterward.

---

## Phase 1: Read what the failed run did

- **You're diagnosing, not fixing.** The un-packaged M4 run was supposed to underdeliver. What came back is data, not blame.
- **Two places hold the story.** The repo's git history (commits on the `m4/<slug>` branch, files modified, branch state, all visible from the worktree) tells you *what* the agent did. The M4 session transcript, at the path recorded in `task.md`, tells you *how* it got there, drift and dead-ends included.
- **You hold the three lenses. You are not holding the codebase.** The agent reads that for you.

Ask Claude to read the recorded transcript path from `task.md`.

{{prompt:diagnose-and-resend-1}}


Confirm the path is right. Then ask Claude to read the repo state on the previous-run branch and the transcript, and walk the work through three failure-mode lenses with quoted moments.

{{prompt:diagnose-and-resend-2}}


## Pin each failure to a quoted moment

- **Push back where Claude generalises.** One quoted line per lens beats a paragraph of summary. The diagnosis is data, not blame; the un-packaged run was supposed to underdeliver.
- The move you just ran is *diagnosis through named failure modes*. The vocabulary is the lens; the artefact is the substance.

## Phase 2: Match each failure to the check that catches it

- **Ask the question that earns the three-pattern.** For each named failure: *what validation would have caught this in minutes, not hours?*
- **Match the verifier shape to the failure, not the slogan.** Drift and context rot fire mid-run, on every spec re-read or window fill, so minute cadence is real there. Plausible-but-wrong fires on output: the work compiles, passes lint, looks right, and is wrong.

Ask Claude to walk each diagnosed failure backwards into the validation that would have caught it.

{{prompt:diagnose-and-resend-3}}


Read the three answers back. You now have three pieces, each tied to a specific failure you diagnosed. Phase 3 builds one of them; Phase 4 assembles the other two.

## Phase 3: Build the verifier for your worst failure

- **Pick the shape that matches your dominant failure.** The comfortable shape is rarely the right one. Match the failure, not your familiarity.

- **Background-agent verifier.** Separate Claude session reads the produced work and judges it. Right when the failure was qualitative (style, fit, "did the answer the question").
- **Deterministic shell-hook.** Tests, lint, type-check, compile, custom invariant. Right when the failure has a true-false answer (broke the build, touched the wrong directory). The shell-hook shape IS a Claude Code stop-hook; you will meet the word again if you extend the verifier to fire automatically between runs.
- **Ralph re-feed.** Loop the prompt with a check baked in; agent re-runs against its own output until the check passes. Right when drift was the dominant failure and re-anchoring catches it.

Ask Claude to build the verifier shape that matches your dominant failure, scoped to the task we ran un-packaged. Drop the shape name after the colon, one of: background-agent, shell-hook, Ralph re-feed.

{{prompt:diagnose-and-resend-4}}


Read what Claude proposes. Push back if the verifier covers the wrong shape (a generic test suite when you needed a judge, or the reverse). The fit between failure shape and verifier shape is the teaching moment. The verifier IS your first eval; the closing lecture names it.

## Prove the verifier actually fires

- **A built-but-untested verifier is no verifier.** The wiring (hook config, file paths, slash-command registration, loop trigger) is fragile, and silent failures cost the next phase. Fire it once before Phase 4.

{{prompt:diagnose-and-resend-5}}

## Phase 4: Write the reference and plan.md

- **The reference pins the task.** Its success criteria, and pointers to the memory, skills, and connectors that matter.
- **plan.md is the agent's mutable working document.** Not the plan-mode plan. This is what the agent re-reads when its window fills.

Ask Claude to assemble both, scoped to the same M4 task, in conversation.

{{prompt:diagnose-and-resend-6}}

> **Watch for slowness.** Two files rewritten between every grill turn is the slowness pattern. The prompt above locks both files until you say *lock it in.* If the agent touches either file mid-grill anyway, push back.

## Check both files are for the agent, not you

- **Read them in prose.** Push back if the reference reads like generic long-running advice instead of THIS task's substance. Push back if plan.md reads like a project plan instead of an agent-mutable working document.
- The artefacts are for the agent to consume mid-run, not for you to admire.

## Approve

Say *lock it in.* The agent writes both files. Read the diffs.

**What happened:** You ended the exercise with a diagnosis (named failures + quoted moments from your own artefact), a working verifier targeting one specific failure mode, and a reference artefact + plan.md scoped to the same M4 task. Each piece earned its place against a failure you read in your own artefact, not a slide.

**The exercise ends here.** The module's re-send is next: same task, with reference + plan.md + verifier all in play. The personal rules from M1 (and M3 if completed) carry forward via the worktree fork; M6 will cut one stale rule once the contrast lands.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-09 (writing@88a1dd4 story@88a1dd4 technical@88a1dd4 behavior@88a1dd4)
- judges @88a1dd4: writing PASS, story PASS, technical PASS, behavior PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~810 words body.

**Time budget total:** 65 min exercise body. Phase breakdown: P1 15 / P2 10 / P3 20 / P4 20. Module Debrief + re-send adds 15–20 min. Closing lecture adds 12–15 min after Debrief.

**Frameworks riffed on:**
- **Diagnosis through named failure modes** (Phase 1) — convergent practitioner vocabulary (goal drift / context rot / plausible-but-wrong); pre-read carries the colour, this exercise applies them.
- **Align-then-run, in reverse** (Phase 2) — Ronacher's align-then-run move (ask the agent how it would validate, then negotiate the validation loop) inverted: ask backwards from a failure to the validation that would have caught it. Earns the three-pattern.
- **Three verifier shapes** (Phase 3) — Boris Cherny. Menu form; student picks one against dominant failure. Closing lecture confirms attribution.
- **Reference + plan.md** (Phase 4) — Ronacher's three-pattern, two of three pieces. Built in conversation, scoped to the task.

**Failure modes + diagnostics:**
- **Phase 1 generalised diagnosis** — student says "the agent drifted" without quoting moments. Diagnostic: prompt requires quoted artefact moments; if Claude returns only summaries, re-run with explicit *"quote a specific commit / file change / scrollback line"*.
- **Phase 1 dominant-failure dodge** — student picks the failure mode they already know how to fix, not the one that cost the most. Diagnostic: ranking is by impact, not familiarity. Trainer push: *"which one cost the run the most? Build the verifier for that one."*
- **Phase 2 prescription-jumping** — student rushes past the question to start building. Diagnostic: Phase 2 produces three named validations; if the conversation moved to "let me build" before all three, redo.
- **Phase 3 verifier-shape mismatch** — student picks the shape they're most comfortable building (usually shell-hook), regardless of failure. Diagnostic: does the verifier actually fire on the failure mode it targets? If not, re-scope.
- **Phase 3 verifier as test suite** — student rebuilds the existing test suite as their verifier. Diagnostic: the verifier targets agent-produced work, with a quality bar that ISN'T already in CI. Trainer push: *"if the existing tests caught it, the run wouldn't have failed. What's missing from the existing tests?"*
- **Phase 4 reference-as-codebase-rules** — student rewrites `CLAUDE.local.md` content into the reference. Diagnostic: the reference is task-local, lives in a task-scoped folder, references the codebase rules instead of restating them.
- **Phase 4 plan.md-as-project-plan** — student writes a Gantt-shaped plan instead of an agent-mutable document. Diagnostic: the plan.md has a "current phase" line the agent updates and a "decisions log" the agent appends to. If neither, redo.

**Plug points:**
- Student's own M4 artefact (Phase 1 source material)
- Repo's existing CI / hook / pre-commit conventions (Phase 3 shell-hook integration)
- Sponsor-stated task-scoped folder convention (Phase 4 file paths)

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diagnosis; force ranking and a single dominant.
- **Phase 1 <10 min** — under-engagement; diagnostic is whether quoted moments appear. If summary-only, redo with quote-enforcement.
- **Phase 3 verifier doesn't fire** — re-scope. The verifier is the load-bearing artefact for the re-send; spend extra time here over Phase 4 if needed.
- **Phase 4 >25 min** — reference becoming a manifesto. Cap at half-page reference + half-page plan.md.
- **Whole-room mood below 7** — learning through contrast isn't landing. Check Phase 1 specificity. If diagnoses stayed generic, the contrast in Phase 2 has nothing to bite into.

**Watch-fors (cross-phase):**
- Failure-mode collapse — student treats two failure modes as the same. Phase 1 must produce distinct quoted moments for each named mode.
- Verifier gold-plating — student tries to build a 5-shape verifier covering everything. M5's verifier is shaped against ONE failure; M6 expands the kit.
- Three-pattern naming pre-empted — if Phase 2 or Phase 3 names "Ronacher's three-pattern," the closing lecture has nothing to add. Watch for the term-of-art leaking into trainer push-backs.
- Reference vs. rules drift — students familiar with `CLAUDE.local.md` may try to rewrite it as the reference. The reference is task-local; rules are repo-local.

**Send-off mechanism (Debrief, owned by module file):**
- Same Claude Code session as the exercise. No new session, no scheduled agent.
- Reference artefact + plan.md + verifier all loaded; agent re-reads at every working-window pressure point.
- Same close-the-laptop or stop-when-you've-seen-enough rule as M4.

Pre-cohort open items: see `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

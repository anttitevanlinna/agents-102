# Learn from the test, re-send packaged

## Big Idea
Read the un-packaged M4 run through three failure-mode lenses, build the validation that would have caught each, assemble the reference and plan.md, and re-send the same task packaged. The contrast is the lesson.

## Prework

Walk in with the M4 send-off artefact. Stopped, finished, ran out of credit, doesn't matter.

Optional pre-reads in the M4-to-M5 gap: Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich) (~5 min); Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) (~15–20 min).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** an un-packaged multi-hour run through three named failure-mode lenses (goal drift, context rot, plausible-but-wrong), quoting specific moments in your own artefact for each
- **Earn** the three-pattern (reference artefact + plan.md + external verifier) by mapping each piece to the failure it would have caught. The three pieces become tools, not vocabulary
- **Build** a verifier shaped against your dominant failure using one of three shapes (background-agent, shell-hook, or Ralph re-feed)
- **Assemble** the reference artefact + plan.md in conversation, scoped to the same task M4 sent off
- **Re-send** the packaged version of the same task in the same Claude Code session and let it run a second time
- **Compound by subtraction:** cut one rule diagnosis killed from `./CLAUDE.local.md`; rules-files have a half-life

## Start here

You sent off an un-packaged run at the close of M4 and read the pre-read. You walk in with the artefact in front of you. The in-room lecture below opens the session.

[Lecture: Reading the return](lectures/reading-the-return.md)

[Lecture: Learning through contrast](lectures/learning-through-contrast.md)

[Exercise: Diagnose and re-send](exercises/diagnose-and-resend.md)

## Key Concepts
- The three failure modes earn their names by reading them in your own artefact, not from a slide
- The three-pattern (Ronacher) is one move per failure mode, not three moves to memorise. Reference catches drift; plan.md catches rot; verifier catches plausible-but-wrong
- The three verifier shapes are pickable against the failure shape you diagnosed. Same eval, different mechanism
- Same task run twice with packaging as the only changed variable IS the lesson. No lecture replicates this
- **Practice beats external proof.** You read the failure in your own artefact, named the three modes from what you saw, and shaped the validation yourself. No benchmark told you what went wrong; the run did. From here, that's the discipline that carries the work
- Your verifier is your first eval. M6 gives evals their full weight as team infrastructure
- The kit grows: subagents for context isolation and `/compact` at ~60% extend session length without packaging. Worth knowing alongside the three-pattern

## Cut what diagnosis killed

The un-packaged M4 send-off was the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the run worse. Cleaning is the compound move that keeps the loop fast; rules-files have a half-life.

Ask Claude to cut one rule diagnosis killed, or to say so and stop if all rules held.

**Prompt** *(Claude Code, only if a rule earned cutting)*

```
Read ./CLAUDE.local.md. Read this M5 scrollback: the three failure modes I named, the verifier I built, the reference and plan I assembled. Find the one rule diagnosis showed is wrong, stale, or never fires when it should. Cut it from ./CLAUDE.local.md in place. Show me the line you cut, in two sentences why diagnosis killed it. If every rule still holds under diagnosis, say so and stop.
```

Now the re-send. Same task as M4, packaged this time. The prompt can be short because the packaging carries the context: the reference pins the goal, plan.md carries the state, the verifier carries the quality gate. You're not re-explaining the task; you're invoking what you assembled.

Ask Claude to re-run the same M4 task using the reference, plan.md, and verifier you just built.

**Prompt** *(Claude Code, final move of the module)*

```
Run the task we sent un-packaged at M4. Same scope, same goal. The reference and plan.md we assembled are at the path we wrote; the verifier is ready to fire. Go.

I'm closing the laptop. If the verifier fails, fix and re-run; don't paper over. Tell me what shipped, what didn't, and what the verifier surfaced.
```


The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). Same cancel-is-legit rule from M4: stopping when the trace is enough is the result. Manual nudges are part of the run; when nudging turns into typing every step, the agent isn't the agent any more — that's a result worth reading.

[Lecture: What packaging is](lectures/what-packaging-is.md)

## Next

M6 reads the packaged run. Subtler misses, subtler drift. Your verifier gets its full name as an eval, and the team kit takes its first inherited skill.

## Pre-reads before M6

Optional. Skipping does not break M6. The piece lands in the M5 to M6 gap and primes two moves the module will name from your own two-run evidence.

**Read — Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (~10 min).** Klaassen runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel to triage review. Why for M6: reliability is a number you measure, not a vibe you sense, and one verifier can become a panel. Both ideas land as recognition when the module names them from your own artefacts.

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-26 (check_writing — `substrate` in maintainer L120 swapped to `source material`; check_student_facing #21 + power-settings carve-out; check_pedagogy #9b + compound-shape; check_prompts; check_strategy_tie_in; check_lectures. **check_research_claims:** Pre-reads attribution corrected — "You're the Bread in the AI Sandwich" reattributed to Laura Entis interview write-up of Klaassen; *"Definitive Guide"* claim that 80/20 ratio is "stated verbatim" dropped — ratio is practitioner-posture summary, not in the article. See `curriculum/evals/instances/ae101-m5-m6-source-verification.md`.)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Session runtime:** 1h45 (Connections 5 / In-room opener lecture 6 / Exercise 60 / Debrief 12 / Re-send 3 / Closing lecture 15 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Closing lecture sits after Debrief + Re-send (structural addition over M4 — names Ronacher's three-pattern from felt evidence). Pre-read (`reading-the-return.md`) lands at the close of M4 Debrief, separate from this module's runtime. Exercise breakdown: Phase 1 read-the-return 15 / Phase 2 align-then-reverse 10 / Phase 3 build-verifier 18 / Phase 4 assemble-reference-and-plan 17.
- **Mood target:** learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* Watch for: mood drift toward correction-feeling (*"my un-packaged run was bad and now I'm fixing it"*) or compliance-feeling (*"the three-pattern is the answer; I should adopt it"*). Diagnostic: student at Phase 3 picks the safest verifier shape regardless of their dominant failure. Fix: Nerd reframes — *"the verifier matches the failure, not the comfort. Which one was your dominant?"*
- **Delivery architecture** (strategy doc § "Delivery architecture"): AE101 content folder + student's real repo. The re-send at Debrief happens in the same Claude Code session the student used for diagnose + build + assemble + retro. No new session, no scheduled agent, no cloud runner.
- **Pre-read placement:** `lectures/reading-the-return.md` is shared at the close of M4's Debrief, after the un-packaged send-off prompt is pasted. Self-study Teacher Claude shares the link in the M4 close-out message. In-room cohorts get the same link in the day-1 wrap-up Slack/Teams thread.
- **Quality:** sim-passed 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts; three-persona sim 2026-04-25 — Debrief redesign)

**Push-back moves** (TODO — Nerd skill not yet written; trainer covers by default in cohort):
- **Connections blocker** — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear). Nerd: *"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/` if you closed the session. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."*
- **Phase 1 diagnosis-as-blame** — student frames failures as their fault (*"I should have written a better prompt"*). Nerd: *"the un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."*
- **Phase 1 over-diagnosis** — student lists 8 failures across all three modes. Nerd: *"pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"*
- **Phase 2 prescription-skip** — student goes straight from named failure to building the fix without the align-then-run question. Nerd: *"the question matters more than the answer. What validation would have caught this in minutes, not hours?"*
- **Phase 3 verifier-shape mismatch** — student picks shell-hook for a qualitative failure (or LLM-judge for a deterministic one). Nerd surfaces the menu again: *"qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"*
- **Phase 4 reference-as-rewrite** — student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference. Nerd: *"the reference is task-local. Lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."*
- **Debrief re-send anxiety** — student hesitates at the second send-off. Nerd: *"same task, packaged. Same close-the-laptop move. The point is to read the contrast at M6, not to nail it this run."*
- **Closing lecture pre-empt** — Nerd accidentally names "Ronacher's three-pattern" before the closing lecture. Don't. The closing lecture earns the name from felt evidence. If the Nerd uses the term in Phases 1–4, the closing has nothing to add.

**Watch-fors (cross-phase):**
- Failure-mode collapse — student conflates two modes (treats goal drift and context rot as the same thing). Phase 1 spots this; force separation by asking for distinct quoted moments for each.
- Verifier as gold-plating — student tries to build a 5-shape verifier covering everything. M5's verifier is shaped against ONE failure. M6 expands the kit; M5 picks one and runs.
- Reference-pattern drift — student writes a generic "rules for long-running" file instead of a task-scoped reference artefact. Diagnostic: the file references the task's success criteria and constraints, or it's the wrong artefact.
- Closing-lecture-as-pre-read — if the closing names something the student already heard in pre-read, the pre-read leaked. Sim catches this; ship-pass eval also.

**Decision points (pacing):**
- **Phase 1 runs short (<10 min):** student didn't engage the artefact. Diagnostic: did they quote specific moments, or summarise generically? If summary, redo with quote-required prompt.
- **Phase 1 runs long (>20 min):** artefact is too rich and student is over-diagnosing. Force ranking — top three failures, dominant first.
- **Phase 3 runs short (<15 min):** verifier is too thin. Diagnostic: does it actually fire on the failure shape it's targeting? If not, re-scope.
- **Phase 4 runs long (>25 min):** reference is becoming a manifesto. Cap at half-page reference + half-page plan.md.
- **Whole-room mood below 7:** learning through contrast isn't landing. Check Phase 1: did the diagnosis name SPECIFIC failures with quoted moments, or did it stay generic? Specificity is where this mood lives.

**Plug points (trainer):**
- The student's M4 artefact (Phase 1 source material)
- Sponsor-stated rules-file home (Debrief rewrite target — same as M4)
- Sponsor-stated test/CI conventions (Phase 3 shell-hook verifier shape integrates here)

**Frameworks riffed on (attributed in lecture):**
- **Ronacher's three-pattern** — Armin Ronacher. Earns its name in the closing lecture, not before.
- **Cherny's three stop-hook shapes** — Boris Cherny. Phase 3 names the menu; closing lecture confirms attribution.
- **Intercom Tier 1/2/3** — Darragh Curran. Closing lecture only; the org-scale anchor.
- **Compound engineering** — Kieran Klaassen. Debrief self-compound, fifth rep for the student.

**First-cohort observation questions:**
- Verifier-shape calibration: does the three-shape menu cover the failure modes students surface, or does a fourth/fifth shape want naming?

Pre-cohort open items for M5: see `pre-cohort-todos.md`.

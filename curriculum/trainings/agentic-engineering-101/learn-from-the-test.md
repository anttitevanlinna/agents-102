# Learn from the test, re-send packaged

## Big Idea
Read the un-packaged Module 4 run through three failure-mode lenses, build the validation that would have caught each, assemble the reference and plan.md, and re-send the same task packaged. The contrast is the lesson.

## Prework

Walk in with the Module 4 send-off artefact. Stopped, finished, ran out of credit, doesn't matter.

Optional prep in the Module 4 to Module 5 gap: read [Clean Code Is Steering: Insights from Uncle Bob](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md); watch Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich); read Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** your un-packaged Module 4 send-off through three named lenses, goal drift, context rot, plausible-but-wrong, with quoted moments per lens
- **Pair** each failure mode with the packaging that catches it: drift ↔ reference artefact, rot ↔ plan.md, plausible-but-wrong ↔ external verifier
- **Build** a verifier shaped against your dominant failure using one of three shapes (background-agent, shell-hook, or Ralph re-feed)
- **Assemble** the reference artefact + plan.md in conversation, scoped to the same task Module 4 sent off
- **Re-send** the packaged version of the same task in the session your diagnosis ran in, and let it run a second time

## Set up the Module 5 worktree

Before opening the Module 5 session, fork the Module 4 starting SHA into a sibling worktree. Module 5's work (diagnosis, verifier, reference, plan.md, and the re-send) runs in the worktree, so the second run starts from the same code state as the first. Cherny calls parallel worktrees his biggest productivity unlock; the Module 2 pre-read lands here.

A real engineering call lives in this fork: gitignored files (your `CLAUDE.local.md`, `observations/`) don't ride into a worktree because git doesn't see them. AE101's default is to copy them in once at fork time. Your Module 1 evidence rides forward (along with any Module 3 artefacts if you've completed it); Module 5 and Module 6 compounding diverges in the worktree; you decide post-Module-6 what to merge back into the original. Other engineers wire it differently.

**Session** *(continue or new, "original repo")*

Run the fork from your original repo, not the worktree (it doesn't exist yet). If your Module 4 session is still open, ask it there, it's already in the right place. Otherwise open a fresh session in the original repo location and ask there.

**Claude figures out `<repo-name>` from the working directory.** Help it if it gets confused.

{{prompt:ae101-m5-worktree-setup}}

**Claude will narrate before acting.** It usually opens with a plan summary listing the six sub-steps, then runs them. Skim past the opening; look for the shell-command output confirming the worktree path and which files copied across.

**The coordinates are the anchor.** Claude should read the protected `Run coordinates` block in `task.md`, use the exact `m4/<slug>` branch named there, and fork from that branch's "M4 starting point" commit. If the coordinates are missing or the commit message has been rewritten, stop and use the SHA Claude reported at Module 4 close rather than guessing from branch names.

The worktree is forked and ready. You open the session in it at the first exercise.

## Start here

You sent off an un-packaged run at the close of Module 4 and read the pre-read. You walk in with the artefact in front of you and the three failure-mode lenses in hand. The in-room lecture below opens the session.

[Lecture: Reading the return](lectures/reading-the-return.md)

[Lecture: Learning through contrast](lectures/learning-through-contrast.md)

[Exercise: Diagnose and re-send](exercises/diagnose-and-resend.md)

## Key Concepts
- The three failure modes earn their names by reading them in your own artefact
- One move per failure mode, not three to memorise. Reference catches drift; plan.md catches rot; verifier catches plausible-but-wrong
- You pick the verifier shape against the failure shape. Same eval, different mechanism
- Same task run twice with packaging as the only changed variable IS the lesson
- No benchmark told you what went wrong; the artefact did. The artefact rules, self-reports don't.
- Your verifier is your first eval. The team kit's evals grow from here

Now the re-send. Same task as Module 4, packaged this time. The prompt can be short because the packaging carries the context: the reference pins the goal, plan.md carries the state, the verifier carries the quality gate. The packaging does the explaining; the prompt invokes it.

**Session** *(new, "M5 long-run")*

Open a new Claude Code session in the worktree at `../<repo>-m5`. The packaging files live on disk; the worktree's auto-loaded rules (`CLAUDE.md`, `CLAUDE.local.md`) load fresh into the new session. The exercise session can stay open if you want to glance back at the assembly conversation.

```
/rename m5-long-run
```

Fresh context matters here. The exercise session built heavy scrollback (verifier scaffolding, hooks, plan.md drafts); every long-run turn would otherwise pay cache-read on that prefix, $20-30 saved at Opus prices, and the field has a name for this move (Ralph's fresh-sessions camp, Amp's manual-handoff camp; see [What packaging is](lectures/what-packaging-is.md)).

Prefer to stay in the exercise session? Paste this to drop scrollback in-place:

{{prompt:ae101-m5-clear-before-rerun}}

Either way, the re-send prompt below stands alone: Claude lists the worktree root and reads what it finds.

Ask Claude to re-run the same Module 4 task using the reference, plan.md, and verifier you just built.

{{prompt:ae101-m5-rerun-packaged}}

The walk-away report at the close is what Module 6 opens on. RLHF will frame partial failures as partial successes, *"shipped most of it, hit a snag on X."* The contrast with the un-packaged M4 run depends on this report being candid evidence, not encouragement. If the summary reads polished, ask the agent to list the artifacts that didn't ship and quote the verifier output verbatim where it fired. Your call on whether to push.

The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). Same cancel-is-legit rule from Module 4: stopping when the trace is enough is the result. Manual nudges are part of the run; when nudging turns into typing every step, the agent isn't the agent any more, that's a result worth reading.

[Lecture: What packaging is](lectures/what-packaging-is.md)

[Lecture: The gate is a claim too](lectures/the-gate-is-a-claim.md)

## Next

Module 6 reads the packaged run. Subtler misses, subtler drift. Your verifier gets its full name as an eval, and the team kit takes its first inherited skill. The question changes scale too: Module 5 asked *did my run pass?* Module 6 starts asking *do all our runs pass, and who reviewed what?*

## Bring to Module 6

A packaged re-run with substance. Read the scrollback or commits from the Debrief re-send; check the agent didn't just stall in the first minute.

Come to Module 6 without the packaged run and you'll be reading one run while the room is reading two. Your call.

## Pre-reads before Module 6

Optional. Skipping does not break Module 6. Both fit the Module 5 to Module 6 gap.

**Read, Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it).** Klaassen runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel to triage review. Reliability is a number you measure, not a vibe you sense, and one verifier can become a panel. You'll recognise both in your own artefacts when Module 6 gets there.

**Read, [Checks that push back](trainings/agentic-engineering-101/supplementary/backpressure.md).** The verifier from this module is the first gate in a bigger story: checks that push back inside the loop are what let a run reach farther than you can watch. The loop assembled next is this story, with your own artefacts in it.

<!-- maintainer -->


**Quality:** compendium-audited 2026-07-08 (writing@0ef2ca6 story@1ff6f8a technical@0ef2ca6 behavior@1ff6f8a pedagogy@0ef2ca6 strategy@1ff6f8a slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS (override-r1-Debrief-canonical-section-vocab-per-carve-out-see-instances/ae101--learn-from-the-test.slides.json)
- cross_module @0ef2ca6: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop,plan-mode-done-right]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Session runtime:** 1h45 (Connections 5 / In-room opener lecture 6 / Exercise 60 / Debrief 12 / Re-send 3 / Closing lecture 15 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Closing lecture sits after Debrief + Re-send (structural addition over M4 — names Ronacher's three-pattern from felt evidence). Pre-read (`reading-the-return.md`) lands at the close of M4 Debrief, separate from this module's runtime. Exercise breakdown: Phase 1 read-the-return 15 / Phase 2 align-then-reverse 10 / Phase 3 build-verifier 18 / Phase 4 assemble-reference-and-plan 17.
- **Prep / bridge timing:** Entis/Klaassen interview 30 min; Klaassen compound-engineering guide 15–20 min; Klaassen verifier article 10 min.
- **Mood target:** learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* Watch for: mood drift toward correction-feeling (*"my un-packaged run was bad and now I'm fixing it"*) or compliance-feeling (*"the three-pattern is the answer; I should adopt it"*). Diagnostic: student at Phase 3 picks the safest verifier shape regardless of their dominant failure. Fix: trainer reframes — *"the verifier matches the failure, not the comfort. Which one was your dominant?"*
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries. Not restated here. Module-specific: M5 forks a worktree at `../<repo>-m5` and the packaged re-send runs in a fresh session there (cross-cwd boundary, so `new`, not the same session as diagnose + build + assemble). No scheduled agent, no cloud runner — the second run is still a synchronous laptop run.
- **Pre-read placement:** `lectures/reading-the-return.md` is shared at the close of M4's Debrief, after the un-packaged send-off prompt is pasted. In-room cohorts get the same link in the day-1 wrap-up Slack/Teams thread.
- **Banned-word carve-out (URL only):** the § Pre-reads pointer to `supplementary/backpressure.md` carries the word solely as the target's filename in the link URL; link text is the paraphrase "Checks that push back". The word stays supplementary-only vocabulary — do not promote it into this module's body prose or link text.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear). Trainer push: *"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/` if you closed the session. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* See [Claude Code for engineers — session transcripts](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#10-session-transcripts--read-what-actually-happened).
- **Phase 1 diagnosis-as-blame** — student frames failures as their fault (*"I should have written a better prompt"*). Trainer push: *"the un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."*
- **Phase 1 over-diagnosis** — student lists 8 failures across all three modes. Trainer push: *"pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"*
- **Phase 2 prescription-skip** — student goes straight from named failure to building the fix without the align-then-run question. Trainer push: *"the question matters more than the answer. What validation would have caught this in minutes, not hours?"*
- **Phase 3 verifier-shape mismatch** — student picks shell-hook for a qualitative failure (or LLM-judge for a deterministic one). Trainer surfaces the menu again: *"qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"*
- **Phase 4 reference-as-rewrite** — student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference. Trainer push: *"the reference is task-local. Lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."*
- **Debrief re-send anxiety** — student hesitates at the second send-off. Trainer push: *"same task, packaged. Same close-the-laptop move. The point is to read the contrast at M6, not to nail it this run."*
- **Closing lecture pre-empt** — trainer accidentally names "Ronacher's three-pattern" before the closing lecture. Don't. The closing lecture earns the name from felt evidence. If the term comes up in Phases 1–4, the closing has nothing to add.

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
- The student's M4 artefact (Phase 1 source material) — un-packaged-run trace from M4's send-off; sponsor-stated artefact-storage location if the cohort uses one
- Sponsor-stated rules-file home (Debrief rewrite target, same as M4) — `./CLAUDE.local.md` is the repo-personal default; sponsor's actual convention overrides
- Sponsor-stated test/CI conventions (Phase 3 shell-hook verifier shape integrates here) — sponsor names the test framework + CI gate convention so the verifier shape matches what teammates already run

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Reads an agent's long-running artefact through three named failure-mode lenses** (goal drift, context rot, plausible-but-wrong) and quotes specific moments per lens. Falsifiable: a real artefact-read produces a written diagnosis with at least one quoted moment per failure mode, not a generic summary.
2. **Builds a verifier shaped against the dominant failure mode** of a real long-running agent task, picking from the three-shape menu (background-agent, shell-hook, Ralph re-feed). Falsifiable: a verifier file exists at a stable path; its first 10 lines name the failure mode it targets and the check-shape that catches it.
3. **Sends the same task twice with packaging as the changed variable**, reads the contrast. Falsifiable: two distinct agent runs of the same scoped task exist (un-packaged baseline + packaged re-run); the diff is the artefact M6 reads.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| M5 worktree branch + SHA (packaged-run starting state) | `m5/<task-slug>` branch in worktree at `../<repo>-m5`, forked from M4's `m4/<task-slug>` SHA | Set up the Module 5 worktree prompt | M5 packaged re-send (runs in worktree); M6 diff (compares M5 packaged-run output to M4 un-packaged-run output) |
| Reference artefact | `reference.md` at worktree root (or location named in Phase 4 prompt) | Phase 4 (assemble-reference-and-plan) | M5 re-send prompt — Claude reads the reference at the start of the packaged run; M6 diff (does the reference scope still match what shipped?) |
| Plan.md | `plan.md` at worktree root (or location named in Phase 4 prompt) | Phase 4 | M5 re-send (Claude re-reads plan.md when it drifts); M6 diff |
| Verifier | path named in Phase 3's build prompt (typically `verifier.sh`, `evals/judge.md`, or a stop-hook config) | Phase 3 (build-verifier) | M5 re-send (verifier fires per plan.md cadence during the packaged run); M6 second-skill authoring reads the verifier as a precedent for the encode loop |
| Run notes from packaged re-send | `RUN-NOTES.md` at worktree root | Re-send prompt — Claude writes in-flight when stuck | M6 diff (subtler-misses pattern); M6 second-skill authoring (gap-finder shape often emerges from notes) |
| Personal rules carried into M5 worktree | `./CLAUDE.local.md` in worktree (copied at fork, independent from original after) | Worktree-setup prompt (`ae101-m5-worktree-setup`) — no M5 sharpening by design; the re-send + the M4↔M5 contrast IS M5's compound move | M6 Phase 1 reads them as part of the system that produced both runs; M6 Phase 2 cuts one stale rule from this copy; eventual decision post-M6 about merging back to original repo |
| Observations carried into M5 worktree | `./observations/` in worktree (gitignored, copied at fork alongside `CLAUDE.local.md`, independent from original after) | Worktree-setup prompt (`ae101-m5-worktree-setup`) copies it in at fork — M4's `walk-and-send-off` is the real producer; M5 adds none by design | M6 Phase 1 reads it as part of the system that produced both runs; eventual decision post-M6 about merging back to original repo |
| M5 session transcript | `~/.claude/projects/<project-folder>/<session-id>.jsonl` | Claude Code runtime, persisted automatically | M6 opening session reads M5 transcript directly to ground the read of the packaged run |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Worktree setup — *"fork from the M4 SHA"* | Connections blocker — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear) | Trainer push: *"the artefact is whatever's there — repo commits since M4, files modified, scrollback at `~/.claude/projects/<project>/`. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* |
| Phase 1 — *"quote specific moments per failure-mode lens"* | Phase 1 diagnosis-as-blame — student frames failures as their fault | Trainer push: *"the un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."* |
| Phase 1 — *"pick the dominant failure"* | Phase 1 over-diagnosis — student lists 8 failures across all three modes | Trainer push: *"pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"* |
| Phase 2 — *"align then reverse: what would have caught this in minutes, not hours?"* | Phase 2 prescription-skip — student goes straight from named failure to building the fix | Trainer push: *"the question matters more than the answer. What validation would have caught this in minutes, not hours?"* |
| Phase 3 — *"verifier shape matches the failure shape"* | Phase 3 verifier-shape mismatch — student picks shell-hook for a qualitative failure (or LLM-judge for a deterministic one) | Trainer surfaces the menu again: *"qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"* |
| Phase 4 — *"reference is task-local, not a rules-file rewrite"* | Phase 4 reference-as-rewrite — student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference | Trainer push: *"the reference is task-local. Lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."* |
| Debrief — *"send the packaged version, step away"* | Debrief re-send anxiety — student hesitates at the second send-off | Trainer push: *"same task, packaged. Same step-away move. The point is to read the contrast at M6, not to nail it this run."* |
| Closing lecture — *"name Ronacher's three-pattern only AFTER the felt evidence lands"* | Closing lecture pre-empt — trainer accidentally names the three-pattern before the closing lecture | Trainer: don't. The closing lecture earns the name from felt evidence. If the term gets used in Phases 1–4, the closing has nothing to add. |

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis on Klaassen, 2026-04-22. Byline correctly attributed in file. fallback: cite as Entis write-up of the Shipper–Klaassen interview.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct] Klaassen 2026-02-09, resolves, within window. fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18, 10-runs + parallel-feedback-agents verbatim. Dated origin; pre-read for recognition. fallback: paraphrase the reliability-as-measured idea, drop the date claim.
- Ronacher / Cherny / Cur-Intercom cited via `lectures/what-packaging-is.md` and `lectures/the-loop-has-a-name.md` source lists — stamps live there; confirm each stays in sync with this module's references.

**Frameworks riffed on (attributed in lecture):**
- **Ronacher's three-pattern** — Armin Ronacher. Earns its name in the closing lecture, not before.
- **Cherny's three stop-hook shapes** — Boris Cherny. Phase 3 names the menu; closing lecture confirms attribution. Hook system reference (event names, config shape, when-to-reach-for-hooks): `claude-code-for-engineers.md` § 13.
- **Intercom Tier 1/2/3** — Darragh Curran. Closing lecture only; the org-scale anchor.
- **Compound engineering** — Kieran Klaassen. Debrief self-compound, fifth rep for the student.
- **Hook-vs-prompt partition (must vs should)** — convergent practitioner pattern; named in the closing lecture's *"Hooks always fire"* section.

**First-cohort observation questions:**
- Verifier-shape calibration: does the three-shape menu cover the failure modes students surface, or does a fourth/fifth shape want naming?

Pre-cohort open items for M5: see `pre-cohort-todos.md`.

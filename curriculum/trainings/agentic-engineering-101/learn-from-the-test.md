# Learn from the test, re-send packaged

## Big Idea
Read the un-packaged Module 4 run through three failure-mode lenses, build the validation that would have caught each, assemble the reference and plan.md, and re-send the same task packaged. The contrast is the lesson.

## Prework

Walk in with the Module 4 send-off artefact. Stopped, finished, ran out of credit, doesn't matter.

Optional prep in the Module 4 to Module 5 gap: watch Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich); read Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** an un-packaged multi-hour run through three named failure-mode lenses (goal drift, context rot, plausible-but-wrong), quoting specific moments in your own artefact for each
- **Earn** the three-pattern (reference artefact + plan.md + external verifier) by mapping each piece to the failure it would have caught. The three pieces become tools, not vocabulary
- **Build** a verifier shaped against your dominant failure using one of three shapes (background-agent, shell-hook, or Ralph re-feed)
- **Assemble** the reference artefact + plan.md in conversation, scoped to the same task Module 4 sent off
- **Re-send** the packaged version of the same task in the same Claude Code session and let it run a second time

## Set up the Module 5 worktree

Before opening the Module 5 session, fork the Module 4 starting SHA into a sibling worktree. Module 5's work (diagnosis, verifier, reference, plan.md, and the re-send) runs in the worktree, so the second run starts from the same code state as the first. Cherny's productivity unlock from the Module 2 pre-read lands here.

A real engineering call lives in this fork: gitignored files (your `CLAUDE.local.md`, `.claude/memory/`) don't ride into a worktree because git doesn't see them. AE101's default is to copy them in once at fork time. Your Module 1 and Module 3 evidence rides forward; Module 5 and Module 6 compounding diverges in the worktree; you decide post-Module-6 what to merge back into the original. Other engineers wire it differently. The arc-retrospective at Module 6 close picks up the question.

If your Module 4 Claude Code session is still open, ask it. Otherwise open a fresh session in the original repo location and ask there.

**Prompt** *(Claude Code)*

```
Find the branch starting with `m4/` (run `git branch -a | grep '/m4/'` — there'll be one) and the commit messaged "M4 starting point" on it. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so M5/M6 compounding has the M1/M3 evidence to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  cp -r ../<repo-name>/.claude/memory/ ../<repo-name>-m5/.claude/memory/  (if it exists)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
```

Open a new Claude Code session in the worktree. The rest of Module 5 runs there.

## Start here

You sent off an un-packaged run at the close of Module 4 and read the pre-read. You walk in with the artefact in front of you. The in-room lecture below opens the session.

[Lecture: Reading the return](lectures/reading-the-return.md)

[Lecture: Learning through contrast](lectures/learning-through-contrast.md)

[Exercise: Diagnose and re-send](exercises/diagnose-and-resend.md)

## Key Concepts
- The three failure modes earn their names by reading them in your own artefact, not from a slide
- The three-pattern (Ronacher) is one move per failure mode, not three moves to memorise. Reference catches drift; plan.md catches rot; verifier catches plausible-but-wrong
- The three verifier shapes are pickable against the failure shape you diagnosed. Same eval, different mechanism
- Same task run twice with packaging as the only changed variable IS the lesson. No lecture replicates this
- **Practice beats external proof.** You read the failure in your own artefact, named the three modes from what you saw, and shaped the validation yourself. No benchmark told you what went wrong; the run did. From here, that's the discipline that carries the work
- Your verifier is your first eval. Module 6 gives evals their full weight as team infrastructure
- The kit grows: subagents for context isolation and `/compact` at ~60% extend session length without packaging. Worth knowing alongside the three-pattern

Now the re-send. Same task as Module 4, packaged this time. The prompt can be short because the packaging carries the context: the reference pins the goal, plan.md carries the state, the verifier carries the quality gate. The packaging does the explaining; the prompt invokes it.

Ask Claude to re-run the same Module 4 task using the reference, plan.md, and verifier you just built.

**Prompt** *(Claude Code, final move of the module)*

```
Re-run the task we just packaged. The reference, plan.md, and verifier are at the paths we wrote in this session.

Rules: run the verifier per plan.md cadence; don't paper over failures; if you get stuck, write into RUN-NOTES.md and try a different angle; I'm walking away.

Before you start, ask for or write anything else you want for this run.

Tell me what shipped, what didn't, and what the verifier surfaced.
```

The walk-away report at the close is what Module 6 opens on. RLHF will frame partial failures as partial successes, *"shipped most of it, hit a snag on X."* The contrast with the un-packaged M4 run depends on this report being candid evidence, not encouragement. If the summary reads polished, ask the agent to list the artifacts that didn't ship and quote the verifier output verbatim where it fired. Your call on whether to push.

The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). Same cancel-is-legit rule from Module 4: stopping when the trace is enough is the result. Manual nudges are part of the run; when nudging turns into typing every step, the agent isn't the agent any more, that's a result worth reading.

[Lecture: What packaging is](lectures/what-packaging-is.md)

## Next

Module 6 reads the packaged run. Subtler misses, subtler drift. Your verifier gets its full name as an eval, and the team kit takes its first inherited skill.

## Pre-reads before Module 6

Optional. Skipping does not break Module 6. The piece lands in the Module 5 to Module 6 gap and primes two moves the module will name from your own two-run evidence.

**Read, Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it).** Klaassen runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel to triage review. Why for Module 6: reliability is a number you measure, not a vibe you sense, and one verifier can become a panel. Both ideas land as recognition when the module names them from your own artefacts.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-03 (behavior@4cacfba)
- judges @4cacfba: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS (accepted-FP-plus-mitigated-see-pre-cohort-todos)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Session runtime:** 1h45 (Connections 5 / In-room opener lecture 6 / Exercise 60 / Debrief 12 / Re-send 3 / Closing lecture 15 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Closing lecture sits after Debrief + Re-send (structural addition over M4 — names Ronacher's three-pattern from felt evidence). Pre-read (`reading-the-return.md`) lands at the close of M4 Debrief, separate from this module's runtime. Exercise breakdown: Phase 1 read-the-return 15 / Phase 2 align-then-reverse 10 / Phase 3 build-verifier 18 / Phase 4 assemble-reference-and-plan 17.
- **Prep / bridge timing:** Entis/Klaassen interview 30 min; Klaassen compound-engineering guide 15–20 min; Klaassen verifier article 10 min.
- **Mood target:** learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* Watch for: mood drift toward correction-feeling (*"my un-packaged run was bad and now I'm fixing it"*) or compliance-feeling (*"the three-pattern is the answer; I should adopt it"*). Diagnostic: student at Phase 3 picks the safest verifier shape regardless of their dominant failure. Fix: Nerd reframes — *"the verifier matches the failure, not the comfort. Which one was your dominant?"*
- **Delivery architecture** (strategy doc § "Delivery architecture"): AE101 content folder + student's real repo. The re-send at Debrief happens in the same Claude Code session the student used for diagnose + build + assemble + retro. No new session, no scheduled agent, no cloud runner.
- **Pre-read placement:** `lectures/reading-the-return.md` is shared at the close of M4's Debrief, after the un-packaged send-off prompt is pasted. Self-study Teacher Claude shares the link in the M4 close-out message. In-room cohorts get the same link in the day-1 wrap-up Slack/Teams thread.

**Push-back moves** (trainer covers in cohort; the Nerd skill that consumes these in self-study is upstream-pending):
- **Connections blocker** — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear). Nerd: *"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/` if you closed the session. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* See [Claude Code for engineers — session transcripts](reference/claude-code-for-engineers.md#10-session-transcripts--read-what-actually-happened).
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
- The student's M4 artefact (Phase 1 source material) — un-packaged-run trace from M4's send-off; sponsor-stated artefact-storage location if the cohort uses one
- Sponsor-stated rules-file home (Debrief rewrite target, same as M4) — `./CLAUDE.local.md` is the repo-personal default; sponsor's actual convention overrides
- Sponsor-stated test/CI conventions (Phase 3 shell-hook verifier shape integrates here) — sponsor names the test framework + CI gate convention so the verifier shape matches what teammates already run

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Reads an agent's multi-hour artefact through three named failure-mode lenses** (goal drift, context rot, plausible-but-wrong) and quotes specific moments per lens. Falsifiable: a real artefact-read produces a written diagnosis with at least one quoted moment per failure mode, not a generic summary.
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
| Sharpened personal rules | `./CLAUDE.local.md` in worktree (independent from original after fork) | Debrief self-compound prompt | M6 in worktree; eventual decision post-M6 about merging back to original repo |
| M5 session transcript | `~/.claude/projects/<project-folder>/<session-id>.jsonl` | Claude Code runtime, persisted automatically | M6 opening session reads M5 transcript directly to ground the read of the packaged run |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Worktree setup — *"fork from the M4 SHA"* | Connections blocker — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear) | Trainer / Nerd: *"the artefact is whatever's there — repo commits since M4, files modified, scrollback at `~/.claude/projects/<project>/`. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* |
| Phase 1 — *"quote specific moments per failure-mode lens"* | Phase 1 diagnosis-as-blame — student frames failures as their fault | Trainer / Nerd: *"the un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."* |
| Phase 1 — *"pick the dominant failure"* | Phase 1 over-diagnosis — student lists 8 failures across all three modes | Trainer / Nerd: *"pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"* |
| Phase 2 — *"align then reverse: what would have caught this in minutes, not hours?"* | Phase 2 prescription-skip — student goes straight from named failure to building the fix | Trainer / Nerd: *"the question matters more than the answer. What validation would have caught this in minutes, not hours?"* |
| Phase 3 — *"verifier shape matches the failure shape"* | Phase 3 verifier-shape mismatch — student picks shell-hook for a qualitative failure (or LLM-judge for a deterministic one) | Trainer / Nerd surfaces the menu again: *"qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"* |
| Phase 4 — *"reference is task-local, not a rules-file rewrite"* | Phase 4 reference-as-rewrite — student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference | Trainer / Nerd: *"the reference is task-local. Lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."* |
| Debrief — *"send the packaged version, close the laptop"* | Debrief re-send anxiety — student hesitates at the second send-off | Trainer / Nerd: *"same task, packaged. Same close-the-laptop move. The point is to read the contrast at M6, not to nail it this run."* |
| Closing lecture — *"name Ronacher's three-pattern only AFTER the felt evidence lands"* | Closing lecture pre-empt — Nerd or trainer accidentally names the three-pattern before the closing lecture | Trainer / Nerd: don't. The closing lecture earns the name from felt evidence. If the term gets used in Phases 1–4, the closing has nothing to add. |

**Source verification — MUST DO before first cohort** (per `check_research_claims.md` § 11):
- Armin Ronacher (M5 closing lecture, three-pattern) — verify URL on `lectures/what-packaging-is.md` source list resolves; freshness re-check before first cohort. [practitioner direct]
- Boris Cherny (Phase 3 three stop-hook shapes; M5 closing lecture attribution) — verify URLs on `lectures/what-packaging-is.md`. [practitioner direct]
- Darragh Curran / Intercom Tier 1/2/3 (M5 closing lecture, org-scale anchor) — verify the 19.2% auto-approved + Tier 1/2/3 numbers against the original Curran post; freshness re-check. [practitioner analysis] (Curran writing about Intercom's deployment).
- Kieran Klaassen (Debrief Compound step + pre-reads at lines 10, 90) — three URLs on `every.to`: *Bread in the AI Sandwich* (Entis [practitioner analysis] on Klaassen), *Compound Engineering: The Definitive Guide* [practitioner direct], *My AI Had Already Fixed the Code Before I Saw It* [practitioner direct]. Verify all three resolve; freshness re-check before first cohort.
- Pre-read verification log lives in `lectures/reading-the-return.md`, `lectures/learning-through-contrast.md`, and `lectures/what-packaging-is.md` maintainer blocks per the M5 strategy doc — confirm each lecture's source-verification list stays in sync with this module's references.

**Frameworks riffed on (attributed in lecture):**
- **Ronacher's three-pattern** — Armin Ronacher. Earns its name in the closing lecture, not before.
- **Cherny's three stop-hook shapes** — Boris Cherny. Phase 3 names the menu; closing lecture confirms attribution.
- **Intercom Tier 1/2/3** — Darragh Curran. Closing lecture only; the org-scale anchor.
- **Compound engineering** — Kieran Klaassen. Debrief self-compound, fifth rep for the student.

**First-cohort observation questions:**
- Verifier-shape calibration: does the three-shape menu cover the failure modes students surface, or does a fourth/fifth shape want naming?

Pre-cohort open items for M5: see `pre-cohort-todos.md`.

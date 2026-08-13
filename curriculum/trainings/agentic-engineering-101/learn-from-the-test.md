# Learn from the test, re-send packaged

## Big Idea
Steer your long run. You can't stand over a multi-hour session, so the steering goes in before the task leaves, and the run you already have tells you what to put there.

## Prework

Walk in with the un-packaged send-off artefact. Stopped, finished, ran out of credit, doesn't matter.

Optional prep while the un-packaged session is still going: read [Clean Code Is Steering: Reading Uncle Bob's Agent Experiments](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md); watch Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich); read [Verification asymmetry](trainings/agentic-engineering-101/supplementary/verification-asymmetry.md); read Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** your un-packaged send-off through three named lenses, goal drift, context rot, plausible-but-wrong, grounded in quoted moments from the run
- **Pair** each failure mode with the packaging that catches it: drift ↔ reference artefact, rot ↔ plan.md, plausible-but-wrong ↔ external verifier
- **Build** a verifier shaped against your dominant failure using one of three shapes (background-agent, shell-hook, or Ralph re-feed)
- **Assemble** the reference artefact + plan.md in conversation, scoped to the same task you sent off
- **Re-send** the packaged version of the same task in the session your diagnosis ran in, and let it run a second time

## Start here

You sent off an un-packaged session. You walk in with the artefact in front of you; the lecture below hands you the lenses to read it with.

> **Long sessions, short reads.** The M1 countermove rides along: never let the agent say everything. Ranked findings first, detail on request, the full record on disk. Chat is for what changed and what needs you.

[Lecture: Reading the return](lectures/reading-the-return.md)

[Lecture: Learning through contrast](lectures/learning-through-contrast.md)

## The nag writes the verifier

Somewhere during the un-packaged send-off a worry surfaced: did it touch the migration, did the tests really cover the edge. There was no way to check mid-session, and it nagged.

The nag is a spec, arriving one worry at a time. Each one names a check the session should have carried with it. This module turns the list into machinery: the reference pins the goal, plan.md carries the state, the verifier runs the checks you wished you could run mid-flight.

Acting without full control is the job from here on. The feeling of what is missing points at what to build next. Build it, send again.

## Set up the worktree

Before the exercise session, fork the un-packaged session's starting SHA into a sibling worktree. This module's work (diagnosis, verifier, reference, plan.md, and the re-send) runs in the worktree, so the second session starts from the same code state as the first. Cherny calls parallel worktrees his biggest productivity unlock.

Gitignored files (your `CLAUDE.local.md`, `observations/`) don't ride into a worktree, because git doesn't see them. The setup prompt copies them across, so your Module 1 evidence<!--flag:module:earn-the-trust--> and any Module 3 artefacts<!--/flag:module:earn-the-trust--> comes with you. From there the two copies compound separately.<!--flag:module:spot-gaps-build-the-loop--> After Module 6 you decide what to merge back.<!--/flag:module:spot-gaps-build-the-loop-->

[Exercise: Fork the worktree, carry the evidence](exercises/fork-the-worktree.md)

[Exercise: Diagnose and re-send](exercises/diagnose-and-resend.md)

[Lecture: What packaging is](lectures/what-packaging-is.md)

[Lecture: The gate is a claim too](lectures/the-gate-is-a-claim.md)

## Key Concepts
- The three failure modes earn their names by reading them in your own artefact
- One move per failure mode, not three to memorise. Reference catches drift; plan.md catches rot; verifier catches plausible-but-wrong
- You pick the verifier shape against the failure shape. Same eval, different mechanism
- Same task run twice with packaging as the only changed variable IS the lesson
- No benchmark told you what went wrong; the artefact did. The artefact rules, self-reports don't.
- Your verifier is your first eval: the automated check that says an agent-produced thing meets your bar<!--flag:module:spot-gaps-build-the-loop-->. Module 6 maps the eval shapes from here<!--/flag:module:spot-gaps-build-the-loop-->

<!--flag:no-module:spot-gaps-build-the-loop-->
## Back to the map, one last time

The map at sitting 2 had an edge nobody explained. A dashed line down the right side, `THE TEAM` beyond it, and along the bottom, in italics: *a move counts when it crosses the wall*.

**The wall** is the line between what works for you and what works for someone else. A rule in your own `CLAUDE.local.md` sits on your side of it. The same rule in a repo's `CLAUDE.md`, loading into a teammate's session whether they asked for it or not, has crossed.

Everything built in these four sittings is on your side. The rules file, the observations, the verifier, the reference, the plan. That is the right order and not a shortfall: prove it on yourself, then promote. A rule promoted before it works on you is a rule your team has to live with, and a habit that never crosses stays yours alone.

The map's near half is where a single loop runs and compounds. The far half is where sessions get long and you build the checks that let them. You have run the loop and built the checks: a long run you can send, and a return you can read, because the checks guiding it are yours. The right edge is the crossing, and the first move across is one rule, proven on you, promoted through your team's normal PR. Your call when it's ready.

<!--/flag:no-module:spot-gaps-build-the-loop--><!--flag:module:spot-gaps-build-the-loop-->
## Bring to Module 6

A packaged session with substance. Read the scrollback or commits from the re-send; check the agent didn't just stall in the first minute.

Come to Module 6 without the packaged session and you'll have one session to read where the exercise needs two. Your call.

## Pre-reads before Module 6

Optional. Skipping does not break Module 6. Both fit the Module 5 to Module 6 gap.

**Read, Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it).** Klaassen runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel to triage review. Reliability is a number you measure, not a vibe you sense, and one verifier can become a panel. You'll recognise both in your own artefacts.

**Read, Lucas F. da Costa, [Backpressure Is All You Need](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need)** (May 2026). Da Costa follows the word from flow systems into agent work: when generation outruns judgment, the human becomes the limiting stage. Module 6 picks up the design question: which checks belong inside the workflow so the session does not wait for your read at every seam?
## Next

Module 6 reads the packaged session. Subtler misses, subtler drift. Your verifier turns out to be one of three eval shapes, and the map widens from one task to the work you repeat across your stack. The question changes scale too: Module 5 asked *did my task pass?* Module 6 starts asking *do all our tasks pass, and who reviewed what?*

<!--/flag:module:spot-gaps-build-the-loop-->

<!-- maintainer -->

**Slide-size splits (2026-07-10, hand slides-audit):** two pre-existing oversized chunks split at conceptual seams, zero wording changes — `## Re-send the same task, packaged` + `## Send it off and read the report cold` carve the re-send narrative out of `## Key Concepts` (was 430w); `## Run the fork from the original repo` carves execution out of the worktree rationale (was 309w). Headers are command-verb, build-squint checked. Key Concepts now ends at its sixth bullet as the section name promises.

**Nag beat + reading reminder added (2026-07-10, Antti-directed cognitive-load arc):** (1) *Long sessions, short reads* blockquote in Start here — the M5 reminder leg of the selective-reading arc (M1 teach → M2 exception → M3 take-into-use → M5 remind), per `check_student_facing.md` §29 operational-reminder-at-moment-of-use. (2) New section *The nag writes the verifier* after Start here — reframes the M4 mid-run worry as the verifier's spec ("the feeling of what is missing points at what to build", Antti's frame near-verbatim); names the reference/plan.md/verifier trio in the same role-language the re-send section already uses. Opener-dosage check: arming beat (spirit + one move), does not name Ronacher's three-pattern or the failure-mode↔packaging pairing — closer's beats intact. First para names a plausible mid-run worry: resonant-copy carve-out, don't flatten at re-audit.

**Quality:** compendium-audited 2026-08-04 (writing@93bb807 story@93bb807 technical@93bb807 behavior@93bb807 pedagogy@93bb807 strategy@93bb807 slides@93bb807)
- judges @93bb807: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @93bb807: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; see instances/ae101--m4-m5-m6.cross_module.json
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js learn-from-the-test`. Trainer demos slowly, room copy-pastes concurrently. The closing lecture sits after Debrief + Re-send, where M4 has no closer of its own — it names Ronacher's three-pattern from felt evidence, so it cannot come earlier.
- **Transitions:** connections 5 @start "Connections" · debrief 12 @after:diagnose-and-resend "Debrief" · bridge 3 @end "Bridge"
- **Fork is a band because the spread is real.** Machine time is ~1 min (`ae101-m5-worktree-setup` runner turns); the rest is coordinates-read, copy-verification and Day-2 re-entry fumble. Ceiling is judgement, not observation.
- **Charge:** reading-the-return 5 — it is an in-room M5 opener, charged since 2026-08-12. It was previously charged 0 on the premise that M4's Debrief handed it out as a pre-read; M4 has no Debrief, nothing made it prework, and M5's body asserted the student had read it.
- **Prep / bridge timing:** Entis/Klaassen interview 30 min; Klaassen compound-engineering guide 15–20 min; Klaassen verifier article 10 min; optional da Costa essay 15 min.
- **Mood target:** learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* Watch for: mood drift toward correction-feeling (*"my un-packaged run was bad and now I'm fixing it"*) or compliance-feeling (*"the three-pattern is the answer; I should adopt it"*). Diagnostic: student at Phase 3 picks the safest verifier shape regardless of their dominant failure. Fix: trainer reframes — *"the verifier matches the failure, not the comfort. Which one was your dominant?"*
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries. Not restated here. Module-specific: M5 forks a worktree at `../<repo>-m5` and the packaged re-send runs in a fresh session there (cross-cwd boundary, so `new`, not the same session as diagnose + build + assemble). No scheduled agent, no cloud runner — the second run is still a synchronous laptop run.
- **`lectures/reading-the-return.md` is an M5 in-room opener, not a pre-read.** Do not re-file it as prework without also charging M5's clock and cutting the body line that assumes it was read.
- **Backpressure vocabulary:** the term is earned in Module 4 and reinforced here through da Costa's primary essay. Module 5 keeps the source title and the workflow-seam question together so the word travels with its mechanism, not as a detached label.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear). Trainer push: *"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/` if you closed the session. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* See [Claude Code for engineers — session transcripts](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#10-session-transcripts-read-what-actually-happened).
- **Phase 1 diagnosis-as-blame** — student frames failures as their fault (*"I should have written a better prompt"*). Trainer push: *"the un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."*
- **Phase 1 over-diagnosis** — student lists 8 failures across all three modes. Trainer push: *"pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"*
- **Phase 2 prescription-skip** — student goes straight from named failure to building the fix without the align-then-run question. Trainer push: *"the question matters more than the answer. What validation would have caught this in minutes, not hours?"*
- **Phase 3 verifier-shape mismatch** — student picks shell-hook for a qualitative failure (or LLM-judge for a deterministic one). Trainer surfaces the menu again: *"qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"*
- **Phase 4 reference-as-rewrite** — student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference. Trainer push: *"the reference is task-local. Lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."*
- **Debrief re-send anxiety** — student hesitates at the second send-off. Trainer push: *"same task, packaged. Same close-the-laptop move. The point is to read the contrast at M6, not to nail it this run."*
- **Closing lecture pre-empt** — trainer accidentally names "Ronacher's three-pattern" before the closing lecture. Don't. The closing lecture earns the name from felt evidence. If the term comes up in Phases 1–4, the closing has nothing to add.

**Watch-fors (cross-phase):**
- Failure-mode collapse — student treats two modes as synonyms without explaining what each reveals. Phase 1 asks for that distinction; a shared quoted moment is fine.
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
1. **Reads an agent's long-running artefact through three named failure-mode lenses** (goal drift, context rot, plausible-but-wrong) and grounds the diagnosis in quoted moments. Falsifiable: a real artefact-read explains what each lens reveals in specific evidence, not a generic summary; one moment may support more than one lens.
2. **Builds a verifier shaped against the dominant failure mode** of a real long-running agent task, picking from the three-shape menu (background-agent, shell-hook, Ralph re-feed). Falsifiable: a verifier file exists at a stable path; its first 10 lines name the failure mode it targets and the check-shape that catches it.
3. **Sends the same task twice with packaging as the changed variable**, reads the contrast. Falsifiable: two distinct agent runs of the same scoped task exist (un-packaged baseline + packaged re-run); the diff is the artefact M6 reads.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| M5 worktree branch + SHA (packaged-run starting state) | `m5/<task-slug>` branch in worktree at `../<repo>-m5`, forked from M4's `m4/<task-slug>` SHA | Set up the Module 5 worktree prompt | M5 packaged re-send (runs in worktree); M6 diff (compares M5 packaged-run output to M4 un-packaged-run output) |
| Reference artefact | `reference.md` in the task-scoped folder Phase 4 proposes (sponsor plug point; Claude names the path at lock-in) | Phase 4 (assemble-reference-and-plan) | M5 re-send prompt — Claude reads the reference at the start of the packaged run; M6 diff (does the reference scope still match what shipped?) |
| Plan.md | `plan.md` in the same task-scoped folder, next to the reference | Phase 4 | M5 re-send (Claude re-reads plan.md when it drifts); M6 diff |
| Verifier | path named in Phase 3's build prompt (typically `verifier.sh`, `evals/judge.md`, or a stop-hook config), recorded as plan.md's `verifier` line | Phase 3 (build-verifier) | M5 re-send (reads the invocation off plan.md's verifier line and fires it per the cadence recorded there); M6's diff reads the verifier as the sharper-verifier home's precedent |
| Run notes from packaged re-send | `RUN-NOTES.md` at worktree root | Re-send prompt — Claude writes in-flight when stuck | M6 diff (subtler-misses pattern; the dominant gap's home often surfaces in the notes) |
| Personal rules carried into M5 worktree | `./CLAUDE.local.md` in worktree (copied at fork, independent from original after) | Worktree-setup prompt (`ae101-m5-worktree-setup`) — no M5 sharpening by design; the re-send + the M4↔M5 contrast IS M5's compound move | M6 Phase 1 reads them as part of the system that produced both runs and cuts one stale rule from this copy; eventual decision post-M6 about merging back to original repo |
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

- `[checked:2026-08-09 result:OK due:none]` `lectures/the-machine-you-just-met.md:sharma-sycophancy-2023` — [delegated stamp] The re-send beat's *"RLHF is a big part of why: agreeable answers won the preference round"* — hedge (*a big part*) matches the source's "driven in part"; the second clause is M1's slide title verbatim, and that lecture's backing owns the dated Sharma check plus the do-not-strengthen-to-sole-cause guard. `due:none` — a delegation does not expire; the delegate's stamp is what `source-freshness.sh` walks. fallback: drop the mechanism clause; "Expect partial failures framed as partial successes" stands alone.

- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis on Klaassen, 2026-04-22. Byline correctly attributed in file. fallback: cite as Entis write-up of the Shipper–Klaassen interview.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct] Klaassen 2026-02-09, resolves, within window. fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18, 10-runs + parallel-feedback-agents verbatim. Dated origin; pre-read for recognition. fallback: paraphrase the reliability-as-measured idea, drop the date claim.
- `[checked:2026-07-30 result:OK due:2027-01-30]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] (Lucas F. da Costa, 2026-05-23). Byline, date, and the claim that a human error-catching stage limits the system were verified against the original. The body paraphrases that limit and passes its design question to Module 6. Same source as `spot-gaps-build-the-loop.md` § Prework; keep the two in sync. fallback: drop the pre-read item; the M4 lecture still earns the term from the student's live session.
- Ronacher / Cherny / Cur-Intercom cited via `lectures/what-packaging-is.md` and `lectures/the-loop-has-a-name.md` source lists — stamps live there; confirm each stays in sync with this module's references.

**Frameworks riffed on (attributed in lecture):**
- **Ronacher's three-pattern** — Armin Ronacher. Earns its name in the closing lecture, not before.
- **Cherny's three stop-hook shapes** — Boris Cherny. Phase 3 names the menu; attribution lives in M6's module-file Frameworks section (`the-loop-has-a-name.md` body never names Cherny). Hook system reference (event names, config shape, when-to-reach-for-hooks): `claude-code-for-engineers.md` § 13.
- **Intercom Tier 1/2/3** — Darragh Curran. Closing lecture only; the org-scale anchor.
- **Compound engineering** — Kieran Klaassen. Debrief self-compound, fifth rep for the student.
- **Hook-vs-prompt partition (must vs should)** — convergent practitioner pattern; named in the closing lecture's *"Hooks always fire"* section.

**First-cohort observation questions:**
- Verifier-shape calibration: does the three-shape menu cover the failure modes students surface, or does a fourth/fifth shape want naming?

Pre-cohort open items for M5: see `pre-cohort-todos.md`.

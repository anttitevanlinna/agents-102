# Learn from the test, re-send packaged

## Big Idea
Steer your long session. You can't stand over it hour by hour, so the steering goes in before the send-off, and the session you already ran is the evidence for what the next one needs.

## Prework

Walk in with your un-packaged session. Stopped, finished, ran out of credit, doesn't matter.

Optional prep while it's still running: read Ethan Mollick, [The Bitter Lesson versus The Garbage Can](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage), the one to start with; read [Clean Code Is Steering: Reading Uncle Bob's Agent Experiments](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md); watch Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich); read [Verification asymmetry](trainings/agentic-engineering-101/supplementary/verification-asymmetry.md); read [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** your un-packaged send-off through three named lenses, goal drift, context rot, plausible-but-wrong, grounded in quoted moments from the return
- **Pair** each failure mode with the packaging that catches it: drift ↔ reference artefact, rot ↔ plan.md, plausible-but-wrong ↔ external verifier
- **Build** a verifier shaped against your dominant failure using one of three shapes (background-agent, shell-hook, or Ralph re-feed)
- **Assemble** the reference artefact + plan.md in conversation, scoped to the same task you sent off
- **Re-send** the packaged version of the same task

## Start here

You sent off an un-packaged session. You walk in with the artefact in front of you; the lecture below hands you the lenses to read it with.

> **Long sessions, short reads.** The M1 countermove rides along: tell the agent what output you want. Ranked findings first, detail on request, the full record on disk.

## Say what done-done means

The session you sent off declared done at some point. Against what? Nothing in the repo said. A done-done definition is a small context trick that buys repeated fast verification: every run, and every check you build, measures against the same line.

This one runs in the session you sent off. Its answer lands in the transcript you are about to read.

{{prompt:ae101-m5-done-done}}

Prompting this over and over is not the way. The real move is putting the definition in `./CLAUDE.md` once, where every session reads it and no session has to be told. On your own repo that is a PR-sized change; `./CLAUDE.local.md` first if you want to live with it a week.

[Lecture: Reading the return](lectures/reading-the-return.md)

[Lecture: Learning through contrast](lectures/learning-through-contrast.md)

## Your mid-run worries hint at missing checks

Somewhere during the un-packaged send-off a worry surfaced: did it touch the migration, did the tests really cover the edge. There was no way to check mid-session, and it nagged.

Test that worry against the return. Where the return bears it out, the worry names your first check. Where it doesn't, the artefact wins: it is first-hand data from the real run, and the worry is not.

Acting without full control is the job from here on. Build the check, send again. The checks pay twice: a session they steer is a session you don't babysit, and a session you don't babysit can run beside another.

## Set up the worktree

Before the exercise session, fork the un-packaged session's starting SHA into a sibling worktree. This module's work (diagnosis, verifier, reference, plan.md, and the re-send) runs in the worktree, so the second session starts from the same code state as the first.

Gitignored files (your `CLAUDE.local.md`, `observations/`) don't ride into a worktree, because git doesn't see them. The setup prompt copies them across, so what you built in Module 1<!--flag:module:earn-the-trust--> and Module 3<!--/flag:module:earn-the-trust--> comes with you. From there the two copies compound separately.<!--flag:module:spot-gaps-build-the-loop--> After Module 6 you decide what to merge back.<!--/flag:module:spot-gaps-build-the-loop-->

[Exercise: Fork the worktree, carry the evidence](exercises/fork-the-worktree.md)

[Exercise: Diagnose and re-send](exercises/diagnose-and-resend.md)

> **Dense slides.** In the two closing lectures, the headings carry the claims; the bullets back them up. Follow the headings; pick the detail that interests you most.

[Lecture: What packaging is](lectures/what-packaging-is.md)

[Lecture: The gate is a claim too](lectures/the-gate-is-a-claim.md)

## Key Concepts
- The model already knows the public field.
- The missing evidence is the interaction of this task, model, repository, and setup.
- The experiment promotes a candidate to tested-here; the local optimum stays ahead.
- The agent makes evidence cheap; the engineer decides what it means and what becomes durable practice.

<!--flag:no-module:spot-gaps-build-the-loop-->
## Inspect your results

The packaged session returns after this sitting ends. The experiment produces its evidence only when the return gets read.

- Give it the read the first return got: the three lenses, your worries tested against the artefact. Where the two sessions disagree is the local evidence: which failure the kit caught, and which still recurs.
- The verifier's green is a claim, not proof. Ask the agent to show what the gate checked and what sat outside its view before you credit the kit.
- What recurs names your next check. Build it, send again: the loop you just ran is yours to keep running.

## Back to the map, one last time

{{figure:map-engine-m4-open}}

The map at sitting 2 had an edge nobody explained. A dashed line down the right side, `THE TEAM` beyond it, and along the bottom, in italics: *cross personal → team*.

**The wall** is the line between what works for you and what works for someone else. A rule in your own `CLAUDE.local.md` sits on your side of it. The same rule in a repo's `CLAUDE.md`, loading into a teammate's session whether they asked for it or not, has crossed.

Everything built in these four sittings is on your side. The rules file, the observations, the verifier, the reference, the plan. That is the right order and not a shortfall: prove it on yourself, then promote. A rule promoted before it works on you is a rule your team has to live with, and a habit that never crosses stays yours alone.

The map's near half is where a single loop runs and compounds. The far half is where sessions get long and you build the checks that let them. You have run the loop and built the checks: a long session you can send, and a return you can read, because the checks guiding it are yours. The right edge is the crossing, and the first move across is one rule, proven on you, promoted through your team's normal PR. Your call when it's ready.

<!--/flag:no-module:spot-gaps-build-the-loop-->

## Optional challenges

Pick one when you want the test to bite harder.

- Run Geoffrey Huntley's [original Ralph](https://ghuntley.com/ralph/) on one small task in a disposable repo. Inspect what repetition fixes, and what it repeats forever.
- Run a wide refactor with Claude Code's [`ultracode`](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) workflow. Cap the budget, keep the task scoped, and review every cross-cutting decision.
- On a disposable branch, plant 20 plausible bugs. Run the current tests and count the catches. Then open a fresh review session, count again, and reveal your answer key.
- Build an adversarial, experimental [agent team](https://code.claude.com/docs/en/agent-teams) for feature planning: an orchestrator, quirky ideator, pessimist, and solid performer. Let them message one another before the orchestrator commits to a plan.

<!--flag:module:spot-gaps-build-the-loop-->
## Bring to Module 6

A packaged session with substance. Read the scrollback or commits from the re-send; check the agent didn't just stall in the first minute.

Come to Module 6 without the packaged session and you'll have one session to read where the exercise needs two. Your call.

## Pre-reads before Module 6

Optional.

**Read,** Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it). He runs the verifier 10 consecutive times before trusting it, and uses per-feedback specialised agents in parallel to triage review. Reliability is a number you measure, not a vibe you sense, and one verifier can become a panel. You'll recognise both in your own artefacts.

## Next

Module 6 reads the packaged session: subtler misses, subtler drift. The question widens from *did my task pass?* to *do all our tasks pass, and who reviewed what?*

<!--/flag:module:spot-gaps-build-the-loop-->

<!-- maintainer -->

**Done-done opener (Antti-directed 2026-08-23).** `## Say what done-done means` sits between the Start-here aside and *Reading the return*, and it needs a finished M4 send-off: the student pastes `ae101-m5-done-done` into that session, so the per-point audit lands in the transcript `diagnose-and-resend` reads. That is the trick: the transcript inspects itself before M5 reads it, with the original context still live. Question form rather than a file write for that reason. The four points are Antti's basic done-done. The closing paragraph names the compounding half (definition goes to `./CLAUDE.md` once; prompting it repeatedly is the anti-pattern) and keeps the M1 personal-first pattern for the team file. Trainer may demo on the screen first; the answer must be the student's own session's (`check_lectures.md` §6 carve-out), so do not convert to trainer-only. Do not add a done-means criterion or a write-to-CLAUDE.md prompt; the student decides whether and where the definition lands.

**`## Inspect your results` stays prose, no fence (accepted 2026-08-20).** Flagged as M5's only loop-closing diagnostic sitting outside a prompt block. It is deliberate. The section renders only for the no-M6 variant (`<!--flag:no-module:spot-gaps-build-the-loop-->`), and it fires after the sitting ends, on a return whose artefact paths do not exist at authoring time, so a fence would have to invent them. The module's prompts belong to `diagnose-and-resend`; this is the close that hands a no-M6 student the loop in their own words. Do not add a fence, and do not cut it.

**Slide-size splits (2026-07-10, hand slides-audit):** two pre-existing oversized chunks split at conceptual seams, zero wording changes — `## Re-send the same task, packaged` + `## Send it off and read the report cold` carve the re-send narrative out of `## Key Concepts` (was 430w); `## Run the fork from the original repo` carves execution out of the worktree rationale (was 309w). Headers are command-verb, build-squint checked. Key Concepts now ends at its sixth bullet as the section name promises.

**Nag beat + reading reminder added (2026-07-10, Antti-directed cognitive-load arc):** (1) *Long sessions, short reads* blockquote in Start here — the M5 reminder leg of the selective-reading arc (M1 teach → M2 exception → M3 take-into-use → M5 remind), per `check_student_facing.md` §29 operational-reminder-at-moment-of-use. (2) New section *Your mid-run worries hint at missing checks* after Start here — reframes the M4 mid-run worry as a candidate the artefact adjudicates. Opener-dosage check: arming beat (spirit + one move), does not name Ronacher's three-pattern or the failure-mode↔packaging pairing — closer's beats intact. First para names a plausible mid-run worry: resonant-copy carve-out, don't flatten at re-audit.

**Two corrections to that beat, 2026-08-14 (Antti: "may be misplaced, and it now contradicts a bit with the agent encodes from evidence").** (a) **The nag no longer writes the spec on its own.** It read *"Your nag is a spec, arriving one worry at a time. Each one names a check the session should have carried with it."* — which contradicts the module's own method, where `diagnose-and-resend` Phase 1 reads the artefact through three lenses and Phase 2 asks *what validation would have caught this* per **named failure**. The nag is a remembered feeling about a run the student was not watching, the exact source Phase 1 teaches them to distrust (*"assume about 10% of the account misrepresents the run"*). Body now tests the worry against the return, and **the artefact adjudicates**. Do not restore a wording where the feeling is the spec. (b) **The trio pre-announcement is cut** — *"the reference pins the goal, plan.md carries the state, the verifier runs the checks"* handed out all three roles before the student had diagnosed anything, and `what-packaging-is` exists to earn those names from felt evidence at the closer. The beat is now spirit plus one move, which is what the opener-dosage line above always claimed it was.

**Key Concepts (Antti-decided 2026-08-15): the four lines ARE the block, verbatim.** Each maps to a beat
the module teaches — the three theory slides mid-deck in `lectures/what-packaging-is.md`, after the
three-pattern slide — so the reminders-only test passes by construction. The engineer-as-actor grammar in
the fourth line is deliberate; keep it. Do not re-expand with mechanics bullets: the verifier-shape menu
and evidence-in-artefact reminders live in the exercise body and the closer lectures, and a KC bullet
restating them is a duplicate, not a recap.

**Multisession permission carrier (Antti 2026-08-15): M5 alone, one line** at the close of *Your mid-run
worries hint at missing checks* — control → no babysitting → a second session beside this one. M4 declined (its
stamps stay current). Ledger corrections that travel with this: `training-architecture.md` row 7 (parallel
sessions date to M3+, where `open-the-side-quest` first runs two), and the commitment-table row #11 in
`bosser-strategy:content-strategy-agentic-engineering-101.md` — row #11 correction still owed.

**Slide deixis accepted:** "the bullets back" — verb phrase ("back them up"), not a spatial pointer.

**Dense-slides note (Antti-directed 2026-08-15, closing clause Antti-worded):** body blockquote before the
closer includes — *headings carry the claims; bullets back them up; follow the headings, pick the
detail that interests you most*. Engineer register, no house dialect ("handles") on a student surface. The
heading/bullet split is load-bearing for the SOLO reader: with no trainer speaking the connective tissue
the bullets ARE the lecture. The closing clause is authority-grammar on purpose (equals-not-pupils): it
describes the artifact and hands the attention decision to the student — do not rewrite it into curriculum
scheduling ("come back later", "read them after"). Trainer sibling in `trainer-modules.md` M5 says land the
header and handle per slide, never read bullets aloud. Two registers, one instruction; keep them in step.

**Quality:** sim-passed 2026-08-19 (writing@ba5ccf5 story@ba5ccf5 technical@ba5ccf5 behavior@93bb807 pedagogy@ba5ccf5 strategy@ba5ccf5 slides@ba5ccf5)
- judges @ba5ccf5: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @0dea491e: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; 2 pairs, 0 blocking; see instances/ae101--m4-m5-m6.cross_module.json
**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js learn-from-the-test`. Trainer demos slowly, room copy-pastes concurrently. The closing lecture sits after Debrief + Re-send, where M4 has no closer of its own — it names Ronacher's three-pattern from felt evidence, so it cannot come earlier.
- **Transitions:** connections 5 @start "Connections" · done-done 3 @start "Say what done-done means" · debrief 12 @after:diagnose-and-resend "Debrief" · bridge 3 @end "Bridge"
- **Fork is a band because the spread is real.** Machine time is ~1 min (`ae101-m5-worktree-setup` runner turns); the rest is coordinates-read, copy-verification and Day-2 re-entry fumble. Ceiling is judgement, not observation.
- **Charge:** reading-the-return 5 — it is an in-room M5 opener, charged since 2026-08-12. It was previously charged 0 on the premise that M4's Debrief handed it out as a pre-read; M4 has no Debrief, nothing made it prework, and M5's body asserted the student had read it.
- **Prep / bridge timing:** Entis/Klaassen interview 30 min; Klaassen compound-engineering guide 15–20 min; Klaassen verifier article 10 min.
- **Mood target:** learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* Watch for: mood drift toward correction-feeling (*"my un-packaged run was bad and now I'm fixing it"*) or compliance-feeling (*"the three-pattern is the answer; I should adopt it"*). Diagnostic: student at Phase 3 picks the safest verifier shape regardless of their dominant failure. Fix: trainer reframes — *"the verifier matches the failure, not the comfort. Which one was your dominant?"*
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries. Not restated here. Module-specific: M5 forks a worktree at `../<repo>-m5` and the packaged re-send runs in a fresh session there (cross-cwd boundary, so `new`, not the same session as diagnose + build + assemble). No scheduled agent, no cloud runner — the second run is still a synchronous laptop run.
- **`lectures/reading-the-return.md` is an M5 in-room opener, not a pre-read.** Do not re-file it as prework without also charging M5's clock and cutting the body line that assumes it was read.
- **Backpressure vocabulary:** the source essay is the M3→M4 gap read (`earn-the-trust.md § Pre-read before Module 4`) and the term is named in the room by M4's closing lecture. Module 5 assigns no reading on it and needs none: the student arrives holding both the word and a session that produced changes faster than they could read them. Do not re-assign da Costa here.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without the M4 artefact accessible (closed laptop, ran out of credit, repo state unclear). Trainer push: *"the artefact is whatever's there. Repo commits since M4. Files modified. Scrollback at `~/.claude/projects/<project>/` if you closed the session. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."* See [Claude Code for engineers — session transcripts](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#25-session-transcripts-default-location).
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
| Reference artefact | task-local reference file in the task-scoped folder Phase 4 proposes (sponsor plug point; Claude names the path and filename at lock-in) | Phase 4 (assemble-reference-and-plan) | M5 re-send prompt — Claude reads the reference at the start of the packaged run; M6 diff (does the reference scope still match what shipped?) |
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

- `[checked:2026-08-15 result:OK due:2027-02-15]` https://ghuntley.com/ralph/ — [practitioner direct] Geoffrey Huntley's original Ralph account describes the repeated agent loop named in the challenge. fallback: describe a minimal fresh-context coding loop without the Ralph name.
- `[checked:2026-08-15 result:OK due:2027-02-15]` https://claude.com/blog/introducing-dynamic-workflows-in-claude-code — [platform primary] Anthropic's launch post names `ultracode` as the effort setting that lets Claude decide when to use a dynamic workflow, and warns that it can consume substantially more tokens. fallback: use a manually designed multi-agent workflow with the same scope and budget cap.
- `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/agent-teams — [platform docs] Agent teams provide a lead, independent teammates, a shared task list, and direct inter-agent messaging. fallback: run the four roles in separate sessions and pass their notes through the orchestrator by hand.
- `[checked:2026-08-09 result:OK due:none]` `lectures/the-machine-you-just-met.md:sharma-sycophancy-2023` — [delegated stamp] The re-send beat's *"RLHF is a big part of why: agreeable answers won the preference round"* — hedge (*a big part*) matches the source's "driven in part"; the second clause is M1's slide title verbatim, and that lecture's backing owns the dated Sharma check plus the do-not-strengthen-to-sole-cause guard. `due:none` — a delegation does not expire; the delegate's stamp is what `source-freshness.sh` walks. fallback: drop the mechanism clause; "Expect partial failures framed as partial successes" stands alone.

- `[checked:2026-08-21 result:OK due:none]` https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage — [delegated stamp] Mollick, the `## Prework` echo of the M4→M5 gap read. Dated check owned by `run-the-first-experiment.md`, which assigns it as the block's lead entry. `due:none` — a delegation does not expire, the delegate's stamp does. fallback: drop the echo; the assigning file still leads with it.
- `[checked:2026-05-25 result:OK due:2026-10-22]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis on Klaassen, 2026-04-22; due is publication+6mo. Byline correctly attributed in file. fallback: cite as Entis write-up of the Shipper–Klaassen interview.
- `[checked:2026-05-25 result:CAVEAT due:none]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct] Klaassen 2026-02-09 — publication is outside the 6-month window, so this cites as the framework's canonical writeup (origin, not fresh evidence); `due:none` per the framework-origin variant, the recommendation does not expire with the window. fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-05-25 result:CAVEAT due:none]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18, 10-runs + parallel-feedback-agents verbatim. Dated origin, well outside the window; pre-read for recognition, never current practice; `due:none` per the dated-origin variant. fallback: paraphrase the reliability-as-measured idea, drop the date claim.
- Ronacher and Cherny are cited via `lectures/what-packaging-is.md`; stamps live there and should stay in sync with this module's references. The Intercom tier case lives in M6's `lectures/the-loop-has-a-name.md`.

**Frameworks riffed on (attributed in lecture):**
- **Ronacher's three-pattern** — Armin Ronacher. Earns its name in the closing lecture, not before.
- **Cherny's three stop-hook shapes** — Boris Cherny. Phase 3 names the menu; attribution lives in M6's module-file Frameworks section (`the-loop-has-a-name.md` body never names Cherny). Hook system reference (event names, config shape, when-to-reach-for-hooks): `claude-code-for-engineers.md` § 34.
- **Compound engineering** — Kieran Klaassen. Debrief self-compound, fifth rep for the student.
- **Hook-vs-prompt partition (must vs should)** — convergent practitioner pattern; named in the closing lecture's *"Hooks always fire"* section.

**First-cohort observation questions:**
- Verifier-shape calibration: does the three-shape menu cover the failure modes students surface, or does a fourth/fifth shape want naming?

Pre-cohort open items for M5: see `pre-cohort-todos.md`.

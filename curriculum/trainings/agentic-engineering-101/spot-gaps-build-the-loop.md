# Spot gaps, build the loop

## Big Idea
Diagnose the gaps two sessions of the same task exposed, place each in memory, a verifier, or a new skill, then map the work you repeat across your stack.

## Prework

Optional pre-read in the Module 5 to Module 6 gap: Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (Aug 2025), and Lucas F. da Costa, [Backpressure Is All You Need](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need) (May 2026). Module 4 gave the pressure a name: backpressure. The Module 5 reading now meets a design question: which checks belong at the seams?

Optional lookup pages: [session transcripts in the reference](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#10-session-transcripts-read-what-actually-happened) for the two-session compare, and [long-running shapes](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#9-long-running-shapes-loop-scheduled-tasks-routines-goal) for when you turn a one-off into a pattern you run on a schedule, in a loop, or until a condition holds.

## What You'll Learn
After this module, you will be able to:
- **Diagnose** the gap two sessions of the same task surface
- **Read** where each gap belongs: memory, sharper verifier, or new skill
- **Cut** one rule from `./CLAUDE.local.md` the diagnosis killed
- **Surface** the kinds of work you repeat across your stack, and draw their recurring shapes
- **Map** evals across verifier, judge, and gate
- **Encode** the lesson so the next loop inherits it
- **Generalize** the shapes you mapped into a handoff prompt that builds your workflow skills across your stack

## Start here

Open a fresh Claude Code session in the Module 5 worktree, `../<repo>-m5`. Both sessions already live there.

You walk in holding two sessions of the same task. The un-packaged Module 4 send-off. The packaged Module 5 re-send. The contrast across two sessions is the material. One session gave you a failure mode to name. Two sessions give you gaps the three-pattern itself didn't anticipate, and a shape for what to do about each one.

> **Packaged session thin or missing?** You can still rescue it. If the M5 session is alive but stalled, nudge it once; a *"continue"*-prompt is usually enough. If it crashed or never started, paste the packaged re-send against your worktree fresh; let it catch up while you read on. M6 starts by reading; before it writes, decide whether to wait, stop M5, or accept the partial session as the artefact. Skip the opening lecture. Practice is core. Lectures can be read later.

> **Just can't get the M5 session working?** You lose a bit of value but you can still do this module's exercises. Despair not.

[The 2 frontiers](lectures/the-2-frontiers.md)

[Story of Module 6](lectures/story-of-module-6.md)

[Quality is grounding](lectures/quality-is-grounding.md)

[Spot gaps, build the loop](exercises/spot-gaps-build-the-loop.md)

## Key Concepts
- The three-pattern catches what it was shaped to catch. The gaps that surface after two sessions are data the pattern didn't anticipate, not proof the pattern failed
- Claude over-credits its own packaging by default. You know the countermove by now. A fair push-back names one thing the verifier missed, concretely. The sessions rule; the summary of them doesn't
- Gaps sort into three homes: memory (rules that would have prevented the mistake upstream), sharper verifier (a check that would have fired mid-session), or new skill (a move packaged for future tasks)
- An eval is the automated check that says *this agent-produced thing meets our bar*. Verifier when deterministic, judge when LLM-based, gate when placed in CI. All three are evals. A check proves something only where it could say no. A judge in the producer's window cannot say no exactly where the producer went wrong.
- The handoff prompt IS the loop. It packages the stack-map into a move that authors the skill each shape calls for, when you run it.
- Encoding is the third phase of test → learn → encode. Two sessions tested; the diagnosis learned; the handoff encodes. The loop closes when the lesson ships.

## Human close

No compound prompt here. The exercise's gap map and stack-map are the Module 6 compound; the encode-move lands inside the last lecture. This slot is a human round: talk, compare, no prompts.

*Two sessions of the same task, read to the bone. The loop, yours.*

**Self-study variant.** Close the laptop. If you can name the move in one sentence, that's the marker; no further articulation required.

[Composing the workflow](lectures/composing-the-workflow.md)

[The loop has a name](lectures/the-loop-has-a-name.md)

[The map, filled in](lectures/the-map-filled-in.md)

One move is left, and it runs past the edge of this room.

[Agents that build agents](lectures/agents-that-build-agents.md)

## Next

The next task you start, package it and send it off, then read what comes back through the lens you built. The reading is the loop, not the sending. It's yours now.

The training opened on a trick nobody taught you. The loop is how the next one gets found on purpose.

**Going deeper, when this loop has to scale past you:** [How the best do CI/CD at agent scale](trainings/agentic-engineering-101/supplementary/how-the-best-do-ci-cd.md).

Keep on learning and sharing.

Antti

<!-- maintainer -->


**Capstone-close sign-off — deliberate exception to `check_writing.md` rule 6** (creator-name ban). The `## Next` section closes with a personal sign-off from the curriculum author (the bare-name line after *"Keep on learning and sharing."*). M6 is the AE101 core arc's final module; the close earns the human voice that the practitioner-fluency mood warrants. Per the rule's second exception (added 2026-05-03), the signature is in-scope-by-design for capstone-module closes. Future judges should not re-flag.

**Backpressure vocabulary:** the term is earned in Module 4 and reinforced by da Costa's primary essay in Module 5. The Prework echo keeps the source title visible; the M6 close stays concrete about checks at workflow seams. `the-map-filled-in.md` remains the sole M6 recap of generation speed, review bandwidth, and evals buying capacity back.

**M6 opener rescue + accept-loss callouts — deliberate exception to `check_student_facing.md` rule 5 (golden path only in body).** Two consecutive blockquotes in `## Start here` carry the rescue paths (nudge / re-send fresh / skip the opener) and the accept-the-loss floor ("you can still do the module's exercises"). Rule 5 normally bans recovery branches in body; here the structural risk (M5 run crashed during lunch in 2-day delivery) is named with scoped rescue, then a softer floor for the case where rescue fails entirely. The blockquote shape isolates both from the golden-path narrative for prepared students. Future judges should not re-flag.

**Human close's "talk, compare, no prompts" stays in body — `check_pedagogy.md` §27 mode-defining-cue carve-out (maintainer call).** The cue defines the slot's mode against a training that is otherwise prompts; the round's form (pairs, whole-room, write-then-share) stays the trainer's per the strategy doc's M6 Debrief spec. Future judges should not re-flag.

**Independence axis on the eval-taxonomy Key Concept (2026-08-09, Antti-directed; buried-gold item):** bullet 4 closes with the kernel (*a check proves something only where it could say no*) and the failure named engineer-plain (*a judge in the producer's window cannot say no exactly where the producer went wrong*). This is the taxonomy's third axis — who judges, relative to who produced — alongside mechanism (deterministic/LLM) and placement (CI). `check_pedagogy §9b` variation of the M5 closer's independence law (`the-gate-is-a-claim.md` slide 1, the second-call law): M5 states the law; this bullet makes it the build-time question. Guards: (a) do not escalate to a prescription ("always use a fresh session") — the M5 accept-note keeps the countermove ladder ranked, not mandated; (b) KC bullet 2's over-credit line is the worked instance two bullets up — the rhyme is deliberate, do not dedupe either side; (c) KC slide at 196w/6b, at the bullet cap — extend-don't-append stands.

**Quality:** compendium-audited 2026-08-09 (writing@4f5ce48 story@93bb807 technical@93bb807 behavior@1c765f2 pedagogy@93bb807 strategy@4f5ce48 slides@4f5ce48)
- judges @4f5ce48: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @93bb807: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; see instances/ae101--m4-m5-m6.cross_module.json
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Leap test** (per `check_pedagogy.md` rule 45; M6 is an arc-mood exercise so the test names artefact + use, not activity):
- The student has read their own Claude Code history back across the stack and holds a set of mermaid diagrams of the work they repeat. The dominant gap now sits inside a recognised work-shape, not floating alone.
- The student's `./CLAUDE.local.md` shows at least one rule deleted (compound-by-subtraction), the deletion commit visible in git history, born from the two-run diagnosis.
- The student now holds a standalone handoff prompt, written by the agent from the recurring-work shapes mapped in the exercise, that studies their whole stack and authors a skill per recurring shape when run later. The encode-move generalised from one task to all their work.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Two-run gap map | Ranked gap list in M6 session scrollback; optionally copied to `observations/` if the student wants it durable | Exercise Phase 1 (diff un-packaged M4 vs packaged M5, quote both runs, rank dominant gap) | Exercise Phase 1's rule cut (reads the ranked list for the rule the diagnosis killed); future post-cohort team-kit conversation |
| Recurring-work shapes | Repeated-work inventory + mermaid diagrams (≤30 nodes each) in M6 session scrollback | Exercise Phase 2 study prompt (scan `~/.claude/projects/` across the stack) + shapes prompt (draw the top recurring patterns) | The `agents-that-build-agents` close (the shapes carry into the handoff prompt) |
| Stale-rule deletion | `./CLAUDE.local.md` in the M5 worktree, with one rule cut in place if diagnosis killed it | Exercise Phase 1 compound-by-subtraction prompt | Every future session in the worktree; post-M6 merge-back decision into the original repo's personal rules |
| Workflow-skills handoff prompt | Standalone prompt in the close scrollback; student saves it where they choose (repo note or `~/.claude/`) | `agents-that-build-agents` close — the agent reads the recurring-work shapes and writes a cold-runnable prompt | The student's own later sessions: run cold to study their stack, diagram recurring shapes, author a skill per shape |

**Failure modes + escape hatches per phase** (per `check_pedagogy.md` rule 47; one row per forcing function shipping in the exercise):
- **Phase 1 — Diff and name the gaps.** Failure: both-runs collapse — student treats the packaged run as the only material worth diagnosing, the un-packaged baseline fades. Escape: trainer asks for quoted moments from each run separately before any synthesis.
- **Phase 1 — Compound move (cut stale rule).** Failure: addition-only compounding — student only adds rules, never subtracts. Escape: forcing prompt names a specific rule the two-run diagnosis killed; if the student can't name one, the diagnosis wasn't sharp enough — back to Phase 1's quoted-moments check.
- **Phase 2 — Stack scan (study / shapes).** Failure: scan-sprawl — the study reads the whole stack and throws back a wall the student catalogues instead of ranks. Escape: the body steer (*read for the few at the top you actually repeat*) plus trainer push to the ranked head; depth is the student's call, not a mandate.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js spot-gaps-build-the-loop`. The slack is the Debrief and the exercise's scan-depth steer; the lecture-dense close is not where to find it. Trainer demos slowly, room copy-pastes concurrently.
- **Transitions:** re-entry 10 @start · debrief 12 @after:spot-gaps-build-the-loop · bridge 3 @end
- **Prep / bridge timing:** optional Klaassen verifier article 10 min; human close / team-kit accretion slot 10–15 min.
- **Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. Failure shapes that steal the mood: compliance-feel (*"build the eval, pass the gate"*), paperwork-feel, credibility-performance (*"we live what we teach"*), trainer-monologue retrospective. If any beat reads like one of those, revise.
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries / §Material distribution (no training-dir state, no `module-N/` folders). Not restated here. Module-specific: M6 opens a fresh session in the M5 worktree at `../<repo>-m5` where both runs already live, then reads, routes, and maps in-place. The handoff prompt from the close is the take-home; skill candidates it surfaces later ship personal-first, team-PR via human conversation — not auto-promoted.
- **Pre-read placement:** none. M6 opens with the Story lecture in-room.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without one of the two artefacts accessible (laptop closed between M5 and M6, scrollback gone, repo state unclear on the packaged run). Trainer push: *"both artefacts are whatever's there. Commits between M4 and M5 send-offs, files modified during each run, scrollback at `~/.claude/projects/<project>/` if the sessions closed — if M4 and M5 share a cwd, recency alone can grab the wrong attempt; filter by a phrase unique to that send-off's opening prompt instead. Open a fresh Claude Code session in the repo and ask it to surface what each run touched."*
- **Phase 1 over-diagnosis** — student lists a long catalogue of gaps across both runs. Trainer push: *"two runs, maybe three gaps each. Pick the three that cost the most, dominant first."*
- **Phase 2 scan-drown** — the study throws back a wall and the student starts cataloguing. Trainer push: *"read the ranked head. The few you actually repeat are the map; the rest is inventory."*

**Watch-fors (cross-phase):**
- Both-runs collapse — student treats the packaged run as the only material worth diagnosing (the un-packaged baseline fades). Phase 1 recovers by asking for quoted moments from each run, separately.
- Gap-home confusion — the diff prompt calls everything a skill candidate because skills feel like "the answer." Push back on the output: some gaps belong in memory, some in a sharper existing verifier, some in a new skill.
- Closing-lecture-as-pre-read — if the closing names something the student already heard, the opener or exercise leaked. Three-persona sim catches this; ship-pass eval also.

**Decision points (pacing):**
- **Phase 1 runs short (<10 min):** student didn't engage both runs. Diagnostic: did they quote specific moments from each, or summarise generically? If summary, redo with quote-required prompt.
- **Phase 1 runs long (>20 min):** student is over-diagnosing. Force ranking — top three gaps, dominant first.
- **Phase 2 runs short (<10 min):** the scan skimmed. Diagnostic: does the shapes output name work the student recognises as theirs? If it reads generic, re-run study with a narrower pointer.
- **Phase 2 runs long (>15 min):** cataloguing. Force the ranked head, draw two or three shapes, skip the sidestep.
- **Whole-room mood below 7:** practitioner fluency isn't landing. Check Phase 1: did the diagnosis name SPECIFIC gaps with quoted moments from BOTH runs? Specificity-across-two-runs is where this mood lives.

**Plug points (trainer):**
- The student's two run artefacts (Phase 1 input material)
- Sponsor-stated team-kit home (second-skill ship destination for team-PR candidates)
- Sponsor-stated memory home (where gaps-belong-in-memory land)
- Sponsor-stated team-rule review cadence (named so the team-PR flag at ship doesn't become the compound-loop bottleneck)

**Frameworks riffed on (attributed in closer):**
- **Ronacher's three-pattern** — Armin Ronacher `[practitioner direct]`. Re-named in the closing lecture as a scaffold the student is now ready to sharpen, not a fixed recipe.
- **Cherny's three verifier shapes** — Kim on Cherny `[practitioner analysis]`. The primitives menu riffs on this convergence.
- **Ramp Dojo** — 350-skill marketplace `[practitioner direct, Geoff Charles CPO, 2026-04-09]`, as the team kit's destination shape. Confirmed against ramp.md 2026-05-25 (public X primary paywalled). Closing lecture attribution.
- **Intercom Tier 1/2/3** — Darragh Curran, [2x Nine Months Later](https://ideas.fin.ai/p/2x-nine-months-later) `[practitioner direct, vendor venue, 2026-04-16]`. 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / ~500-person R&D — four numbers confirmed verbatim 2026-05-25. Closing lecture org-scale anchor.
- **Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) `[practitioner direct, vendor venue, 2026-02-09]`. Live + accurate 2026-05-25. The review + compound step made explicit across two runs. Exercise Phase 1 + closing lecture's team-kit-accretion line.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:OK due:2026-11-25]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18; the `## Prework` gap pre-read. Same source as `learn-from-the-test.md` § Source verification — keep the two in sync. fallback: drop the Klaassen pre-read; Module 4 and the M5 da Costa reading still carry the checks mechanism.
- `[checked:2026-08-01 result:OK due:none]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja, 14 Jan 2026: reference / plan.md-equivalent / verifier, 10 h / 2.2M tokens. **Durable account, `due:none`** (`source-freshness-format.md` § Durable-account variant, added 2026-08-01) — a completed run reported first-hand does not expire; the previous swap-at-Sep-2026 instruction is withdrawn. Figures re-verified verbatim 2026-08-01. Still binding: date it in body (*"in January 2026"*) so it reads as an account rather than as current practice.
- `[checked:2026-07-02 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): the three verifier shapes (background agent / agent-stop hook / Ralph Wiggin plugin, verbatim) are KIM'S synthesis, NOT Cherny's own taxonomy, and are ABSENT from the Orosz interview. fallback: present as a practitioner-convergent menu, no single attribution.
- `[checked:2026-05-25 result:OK due:2026-10-08]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO: 350+ skill Dojo, 99.5% AI-active, 84% coding-agents weekly. Confirmed via observations/ramp.md; that X status is link-only (author + date oEmbed-verified April 8 2026). fallback: "hundreds of skills" if the number is contested.
- `[checked:2026-05-25 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16): 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines / ~473 R&D in 1,305 (body says ~500; the-loop-has-a-name uses the tighter ~470/1,300). Metrics vendor-self-reported. fallback: keep numbers, attribute Intercom telemetry, flag self-report.
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen (2026-02-09): the four-step compound loop; the explicit plan/work/review/compound naming is convergent-across-appearances, not verbatim-on-page (matches the same-source CAVEAT stamps in `run-the-first-experiment.md` and `test-and-learn.md`). fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct] Shipper & Klaassen (Jan 2026): the 80/20 ratio ("roughly 80 percent ... plan and review ... 20 percent ... work and compound") — NOT in the Definitive Guide. Dec-2025 origin framing, so the ratio reads as the historical anchor it is. fallback: keep the posture hedge.
- `[checked:2026-07-30 result:OK due:2027-01-30]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] (Lucas F. da Costa, 2026-05-23). The `## Prework` echo follows the term earned in Module 4 and the primary reading carried by Module 5. Same source as `learn-from-the-test.md` § Source verification; keep the two in sync. fallback: drop the echo; Module 4 still earns the term and Module 5 still carries the primary reading.

**First-cohort observation questions:**
- Two-run reading stamina — does Phase 1's diagnosis-across-two-runs hold, or does the second run fade?
- Primitives sidestep — how many rooms take the optional beat, and does the menu pair recognisably with the shapes students draw when they do?
- Debrief round form — which works best with this mood (pair / whole-room / silent write-then-share)?

Pre-cohort open items for M6: see `pre-cohort-todos.md`.

**2026-07-03 (re-sequence pass)** — Human close re-sequenced to agents-last per Antti: *the-map-filled-in* now the penultimate consolidation beat, *agents-that-build-agents* the training's closing beat, one-line forward-launch transition added before it. Tasks 2–4 were already applied in the same-day close rework and left in place: four source stamps re-verified to `checked:2026-07-02` (MiniJinja → CAVEAT + 6-mo-window note; Kim-on-Cherny shapes at the verbatim "background agent / agent-stop hook / Ralph Wiggin plugin"; Klaassen Definitive Guide → CAVEAT to match the same-source sibling stamps; how-Every-codes → CAVEAT, Dec-2025 origin framing); four-beat runtime line; Quality-predates re-audit note; overbooked-close eyeball flag. This pass only reordered the runtime beat list to agents-last and named the re-sequence in the Quality parenthetical.

**2026-07-05 (cut pass) — Antti.** Two M6 beats cut fully. (1) The *Steering the wiring* lecture: worktree-evidence wiring is plumbing, not a load-bearing concept, and its graduation beat ("you pick, no canonical answer") is already carried by *composing-the-workflow*'s close. (2) The *Arc-named retrospective* exercise (`arc-retrospective`): did not advance the learning; the arc-recognition it aimed at is carried by the Human close and *the-map-filled-in*. Removed everywhere: both `## Start here` links; the arc-retrospective leap-test outcome, artefact-contract row, per-phase failure mode, push-back move, watch-for, decision point, and first-cohort question (above); the `steering-the-wiring` theory-manifest entry (`build-workbook.js`); the `arc-retrospective-1` prompt plus its four `consumed-by` graph refs; the two audit-script hardcodes (`audit-eval-coverage.js`, `audit-ae101-artifact-contracts.js`). Frees ~20 min against the overbooked close. Both files git-rm'd (reversible via history). Companion cross-file cleanups: M5 (`learn-from-the-test.md`) forward-pointer, the sibling exercise's trailing beat line, and the trainer pages.

# Spot gaps, build the loop

## Big Idea
Every gap you found belongs somewhere durable, or you will find it again next week.

## Prework

Optional pre-read before this module: Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (Aug 2025). He measures a verifier before trusting it and runs several in parallel. This module meets the design question that follows: which checks belong at the seams, so the work does not queue on your read?

Optional lookup pages: [session transcripts in the reference](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#25-session-transcripts-default-location) for the two-session compare, and [long-running shapes](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#17-long-running-shapes-loop) for when you turn a one-off into a pattern you run on a schedule, in a loop, or until a condition holds.

## What You'll Learn
After this module, you will be able to:
- **Diagnose** the gaps two sessions of the same task surface, and read where each belongs: memory, sharper verifier, or new skill
- **Cut** one rule from `./CLAUDE.local.md` the diagnosis killed
- **Surface** the kinds of work you repeat across your stack, and draw their recurring shapes
- **Map** evals across verifier, judge, and gate
- **Encode** the lesson so the next loop inherits it
- **Generalize** the shapes you mapped into a handoff prompt that builds your workflow skills across your stack

## Start here

Open a fresh session in the Module 5 worktree, `../<repo>-m5`. Both sessions are readable: the branches share `.git`, and each session recorded its transcript path.

You walk in holding two sessions of the same task. The un-packaged Module 4 send-off. The packaged Module 5 re-send. One session gave you a failure mode to name. Two sessions give you gaps the three-pattern didn't anticipate, and a shape for what to do about each one.

> **Packaged session thin or missing?** You can still rescue it. If the M5 session is alive but stalled, nudge it once; a *"continue"*-prompt is usually enough. If it crashed or never started, paste the packaged re-send against your worktree fresh; let it catch up while you read on. M6 starts by reading; before it writes, decide whether to wait, stop M5, or accept the partial session as the artefact. If the room starts the lecture while you are still getting a session going, stay with the rescue and read it afterwards.

> **Just can't get the M5 session working?** You lose a bit of value but you can still do this module's exercises. Despair not.

[The 2 frontiers of learning](lectures/the-2-frontiers.md)

[Story of Module 6](lectures/story-of-module-6.md)

[Quality is grounding](lectures/quality-is-grounding.md)

[Map the gaps, read your stack](exercises/spot-gaps-build-the-loop.md)

## Human close

No compound prompt here. The exercise's gap map and stack-map are the Module 6 compound; the encode-move lands inside the last lecture. This slot is a human round: talk, compare, no prompts.

*Two sessions of the same task, read to the bone. The loop, yours.*

**Self-study variant.** Close the laptop. If you can put the move in one sentence, that's the marker; no further articulation required.

[Composing the workflow](lectures/composing-the-workflow.md)

[The check you built is an eval](lectures/the-loop-has-a-name.md)

[The map, filled in](lectures/the-map-filled-in.md)

[Agents that build agents](lectures/agents-that-build-agents.md)

## Key Concepts
- The three-pattern catches what it was shaped to catch. The gaps that surface after two sessions are data the pattern didn't anticipate, not proof the pattern failed
- Claude over-credits its own packaging by default. A fair push-back names one thing the verifier missed, concretely. The evidence is in the sessions, not in the summary of them
- Gaps sort into three homes: memory (rules that would have prevented the mistake upstream), sharper verifier (a check that would have fired mid-session), or new skill (a move packaged for future tasks)
- A check proves something only where it could say no. A judge in the producer's window cannot say no exactly where the producer went wrong.
- The handoff prompt IS the loop. It packages the stack-map into a move that authors the skill each shape calls for, when you run it.
- Encoding is the third phase of test → learn → encode. Two sessions tested; the diagnosis learned; the handoff encodes. Encoding subtracts as well as adds: the durable shape is add, sharpen, delete. A rules file that only grows compounds noise alongside the learning.

## Optional challenges

Pick one when you want to turn your kit back on itself.

- Build a universal skill loader that works from any directory, finds every skill available to the current project, and loads the one the task needs.
- Write an eval for system-design quality and architectural compliance. Make it a required PR check that blocks changes which violate your architecture.
- Ship one skill for your team and get it adopted. Two teammates must use it on real work and send back one improvement each.
- Build a system that shows which skills, hooks, and rules in your kit fired across recent sessions, and which never fired at all.

## Next

The next task you start, package it and send it off, then read what comes back through the lens you built. The reading is the loop, not the sending. It's yours now.

The training opened on a trick. The loop is how the next one gets found on purpose.

**Going deeper:** [How the best do CI/CD at agent scale](trainings/agentic-engineering-101/supplementary/how-the-best-do-ci-cd.md), for when this loop has to scale past you.

Keep on learning and sharing.

Antti

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** Start-here cut "The contrast is the material." (the one-session/two-sessions pair carries it); KC bullet 2 cut "You know the countermove by now." (the deliberate rhyme with bullet 4 untouched); KC bullet 6 cut "The loop closes when the lesson ships." — `the-map-filled-in`'s test-learn-encode bullet keeps the line and owns it. Do not restore.

**The confidence after-measurement fires at this module's Human close but lives OUTSIDE the workbook.** The measurement system is deliberately not in student-facing body; the trainer administers it. Canonical wording in `theory-plan.md` § Baseline instrument — verbatim-identical to the before-measurement or the delta measures the wording. Target delta +3. Do not add a rating beat to this file's body.

**The rescue callout's lecture line is triage, not a ranking of lectures against exercises (2026-08-15, Antti).** The line is scoped to the moment: *"If the room starts the lecture while you are still getting a session going, stay with the rescue and read it afterwards."* The room-parallelism is the point — others sit the lecture while this student fixes a session — so keep the line, and keep it conditional. Do not widen it into a lectures-are-skippable doctrine, and do not cut the beat: a stranded student needs permission to spend room time on the rescue.


**Capstone-close sign-off — deliberate exception to `check_writing.md` rule 6** (creator-name ban). The `## Next` section closes with a personal sign-off from the curriculum author (the bare-name line after *"Keep on learning and sharing."*). M6 is the AE101 core arc's final module; the close earns the human voice that the practitioner-fluency mood warrants. Per the rule's second exception (added 2026-05-03), the signature is in-scope-by-design for capstone-module closes. Future judges should not re-flag.

**Backpressure vocabulary:** da Costa's essay is the M3→M4 gap read and M4's closing lecture names the term in the room, two modules back by the time the student arrives here. M6 assigns no reading on it and does not restate the word: the `## Prework` echo carries Klaassen, and the M6 close stays concrete about checks at workflow seams. `the-map-filled-in.md` remains the sole M6 recap of generation speed, review bandwidth, and evals buying capacity back.

**M6 opener rescue + accept-loss callouts — deliberate exception to `check_student_facing.md` rule 5 (golden path only in body).** Two consecutive blockquotes in `## Start here` carry the rescue paths (nudge / re-send fresh / skip the opener) and the accept-the-loss floor ("you can still do the module's exercises"). Rule 5 normally bans recovery branches in body; here the structural risk (M5 run crashed during lunch in 2-day delivery) is named with scoped rescue, then a softer floor for the case where rescue fails entirely. The blockquote shape isolates both from the golden-path narrative for prepared students. The two blockquote leads (**Packaged session thin or missing?** / **Just can't get the M5 session working?**) are accepted menu-style handles under `check_slides.md` §9's reading-list carve-out. Future judges should not re-flag.

**Human close's "talk, compare, no prompts" stays in body — `check_pedagogy.md` §27 mode-defining-cue carve-out (maintainer call).** The cue defines the slot's mode against a training that is otherwise prompts; the round's form (pairs, whole-room, write-then-share) stays the trainer's per the strategy doc's M6 Debrief spec. Future judges should not re-flag.

**`## Human close` is a pre-close beat, not the module's ending (2026-08-19, Antti-directed: *"human close can be a beat before actual full closing. It is deliberately there to have the time for closing conversations."*).** The slot buys room time for the closing conversation while the closer lecture chain, `## Key Concepts`, `## Optional challenges` and `## Next` still follow. A story judge scoring close mood reads those four trailing sections as an ending that will not end and files `check_strategy_tie_in.md` §1 against the beat's own framing (*"no compound prompt here... talk, compare, no prompts"*, the identity line, the self-study *"Close the laptop"*). The trailing count is the design and it is not high: M6 carries fewer sections after its last teaching beat than M4 or M5, neither `## Bring to Module N` nor `## Pre-reads` applying to the terminal module. Do not move the beat later, do not fold it into `## Next`, and do not soften its framing to acknowledge what follows — the conversation needs a named slot, and the name is what makes a trainer stop for it. The self-study variant's *"Close the laptop"* is the solo form of the same break. Future judges should not re-flag.

**Independence axis on the eval-taxonomy Key Concept (2026-08-09, Antti-directed; buried-gold item):** bullet 4 closes with the kernel (*a check proves something only where it could say no*) and the failure named engineer-plain (*a judge in the producer's window cannot say no exactly where the producer went wrong*). Independence — who judges, relative to who produced — is the only axis this bullet carries. Mechanism (deterministic/LLM) and placement (CI) belong to `the-loop-has-a-name.md`'s naming slide, which this section precedes in deck order; stating them here hands the closer's payload over two slides early, against `vocabulary.md`'s don't-pre-plant line on *eval*. The word itself still lands in `## What You'll Learn`, where signposting is allowed to name what the module earns. `check_pedagogy §9b` variation of the M5 closer's independence law (`the-gate-is-a-claim.md` slide 1, the second-call law): M5 states the law; this bullet makes it the build-time question. Guards: (a) do not escalate to a prescription ("always use a fresh session") — the M5 accept-note keeps the countermove ladder ranked, not mandated; (b) KC bullet 2's over-credit line is the worked instance two bullets up — the rhyme is deliberate, do not dedupe either side; (c) KC slide at 188w/6b, at the bullet cap — extend-don't-append stands.

**Quality:** compendium-audited 2026-08-26 (writing@297eb2f9 story@0e4f7c9e technical@b55cd28b behavior@1c765f2 pedagogy@b55cd28b strategy@0e4f7c9e slides@297eb2f9)
- judges @297eb2f9: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @37aa983b: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; 2 pairs, 0 blocking; see instances/ae101--module-set--m4-m5-m6.cross_module.json

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
- Team-kit home, if the team has one (second-skill ship destination for team-PR candidates)
- Memory home (where gaps-belong-in-memory land)
- The team's rule-review cadence (named so the team-PR flag at ship doesn't become the compound-loop bottleneck)

**Frameworks riffed on (attributed in closer):**
- **Ronacher's three-pattern** — Armin Ronacher `[practitioner direct]`. Re-named in the closing lecture as a scaffold the student is now ready to sharpen, not a fixed recipe.
- **Cherny's three verifier shapes** — Kim on Cherny `[practitioner analysis]`. The primitives menu riffs on this convergence.
- **Ramp Dojo** — 350-skill marketplace `[practitioner direct, Geoff Charles CPO, 2026-04-09]`, as the team kit's destination shape. Confirmed against ramp.md 2026-05-25 (public X primary paywalled). Closing lecture attribution.
- **Intercom Tier 1/2/3** — Darragh Curran, [2x Nine Months Later](https://ideas.fin.ai/p/2x-nine-months-later) `[practitioner direct, vendor venue, 2026-04-16]`. 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / ~500-person R&D — four numbers confirmed verbatim 2026-05-25. Closing lecture org-scale anchor.
- **Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) `[practitioner direct, vendor venue, 2026-02-09]`. Live + accurate 2026-05-25. The review + compound step made explicit across two runs. Exercise Phase 1 + closing lecture's team-kit-accretion line.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:CAVEAT due:none]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen 2025-08-18; the `## Prework` gap pre-read. Dated origin, well outside the window; pre-read for recognition, never current practice; `due:none` per the dated-origin variant, matching `learn-from-the-test.md` § Source verification (`check_research_claims.md §11a` bans `checked`+6mo computed dues). fallback: drop the Klaassen pre-read; Module 4 and Module 5 still carry the checks mechanism.
- `[checked:2026-08-01 result:OK due:none]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja, 14 Jan 2026: reference / plan.md-equivalent / verifier, 10 h / 2.2M tokens. **Durable account, `due:none`** (`source-freshness-format.md` § Durable-account variant, added 2026-08-01) — a completed run reported first-hand does not expire; the previous swap-at-Sep-2026 instruction is withdrawn. Figures re-verified verbatim 2026-08-01. Still binding: date it in body (*"in January 2026"*) so it reads as an account rather than as current practice.
- `[checked:2026-07-02 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): the three verifier shapes (background agent / agent-stop hook / Ralph Wiggin plugin, verbatim) are KIM'S synthesis, NOT Cherny's own taxonomy, and are ABSENT from the Orosz interview. fallback: present as a practitioner-convergent menu, no single attribution.
- `[checked:2026-05-25 result:OK due:2026-10-08]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO: 350+ skill Dojo, 99.5% AI-active, 84% coding-agents weekly. Confirmed via observations/ramp.md; that X status is link-only (author + date oEmbed-verified April 8 2026). fallback: "hundreds of skills" if the number is contested.
- `[checked:2026-05-25 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16): 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines / ~473 R&D in 1,305 (body says ~500; the-loop-has-a-name uses the tighter ~470/1,300). Metrics vendor-self-reported. fallback: keep numbers, attribute Intercom telemetry, flag self-report.
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen (2026-02-09): the four-step compound loop; the explicit plan/work/review/compound naming is convergent-across-appearances, not verbatim-on-page (matches the same-source CAVEAT stamps in `run-the-first-experiment.md` and `test-and-learn.md`). fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct] Shipper & Klaassen (Jan 2026): the 80/20 ratio ("roughly 80 percent ... plan and review ... 20 percent ... work and compound") — NOT in the Definitive Guide. Dec-2025 origin framing, so the ratio reads as the historical anchor it is. fallback: keep the posture hedge.

**First-cohort observation questions:**
- Two-run reading stamina — does Phase 1's diagnosis-across-two-runs hold, or does the second run fade?
- Primitives sidestep — how many rooms take the optional beat, and does the menu pair recognisably with the shapes students draw when they do?
- Debrief round form — which works best with this mood (pair / whole-room / silent write-then-share)?

Pre-cohort open items for M6: see `pre-cohort-todos.md`.

**Opener order is `The 2 frontiers` first, then `Story of Module 6` (2026-08-12, maintainer-confirmed: *what is in module file is correct*).** The frontier framing opens; the permission beat follows it. `bosser-strategy:content-strategy-agentic-engineering-101.md` § *M6 in detail → Opener* previously had `Story of Module 6` opening, and stated the reason as a principle (*permission works before the work, not after*) rather than a preference, so it read as still binding; the doc is now corrected to match this file and records that the earlier reason is superseded. A `strategy` judge will re-flag this on any run against a stale copy of the doc — the module file is the decision. Do not reorder to match a doc.

**2026-07-05 (cut pass) — Antti.** Two M6 beats cut fully. (1) The *Steering the wiring* lecture: worktree-evidence wiring is plumbing, not a load-bearing concept, and its graduation beat ("you pick, no canonical answer") is already carried by *composing-the-workflow*'s close. (2) The *Arc-named retrospective* exercise (`arc-retrospective`): did not advance the learning; the arc-recognition it aimed at is carried by the Human close and *the-map-filled-in*. Removed everywhere: both `## Start here` links; the arc-retrospective leap-test outcome, artefact-contract row, per-phase failure mode, push-back move, watch-for, decision point, and first-cohort question (above); the `steering-the-wiring` theory-manifest entry (`build-workbook.js`); the `arc-retrospective-1` prompt plus its four `consumed-by` graph refs; the two audit-script hardcodes (`audit-eval-coverage.js`, `audit-ae101-artifact-contracts.js`). Frees ~20 min against the overbooked close. Both files git-rm'd (reversible via history). Companion cross-file cleanups: M5 (`learn-from-the-test.md`) forward-pointer, the sibling exercise's trailing beat line, and the trainer pages.

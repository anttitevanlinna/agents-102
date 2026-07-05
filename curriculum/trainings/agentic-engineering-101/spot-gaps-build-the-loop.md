# Spot gaps, build the loop

## Big Idea
Two runs of the same task (un-packaged Module 4, packaged Module 5) are enough evidence to name what the three-pattern didn't anticipate, pick where the gap belongs (memory, verifier, new skill), and author a session-shaper skill through conversation so future you inherits the lesson.

## Prework

Optional pre-read in the Module 5 to Module 6 gap: Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (Aug 2025).

Optional lookup pages: [session transcripts in the reference](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#10-session-transcripts--read-what-actually-happened) for the two-run compare, and [long-running shapes](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#9-long-running-shapes--loop-scheduled-tasks-routines-goal) for when you turn a one-off into a pattern you run on a schedule, in a loop, or until a condition holds.

## What You'll Learn
After this module, you will be able to:
- **Diagnose** the gap two runs of the same task surface
- **Route** each gap to its home: memory, sharper verifier, or new skill
- **Cut** one rule from `./CLAUDE.local.md` the diagnosis killed
- **Surface** the kinds of work you repeat across your stack, and draw their recurring shapes
- **Author** a session-shaper skill through conversation, ship to your personal kit
- **Map** evals across verifier, judge, and gate
- **Encode** the lesson so the next loop inherits it
- **Generalize** the encode-move into a handoff prompt that builds your workflow skills across your stack

## Start here

You walk in holding two runs of the same task. The un-packaged Module 4 send-off. The packaged Module 5 re-run. The contrast across two runs is the material. One run gave you a failure mode to name. Two runs give you gaps the three-pattern itself didn't anticipate, and a shape for what to do about each one.

> **Packaged run thin or missing?** You can still rescue it. If the M5 session is alive but stalled, nudge it once with the Continue prompt from M4. If it crashed or never started, paste the packaged re-send against your worktree fresh; let it catch up while the room reads. M6 starts by reading; before it writes, decide whether to wait, stop M5, or accept the partial run as the artefact. Skip the opening lecture. Practice is core. Lectures can be read later.

> **Just can't get the M5 run working?** You lose a bit of value but you can still do this module's exercises. Despair not.

[The 2 frontiers](lectures/the-2-frontiers.md)

[Story of Module 6](lectures/story-of-module-6.md)

[Quality is grounding](lectures/quality-is-grounding.md)

[Spot gaps, build the loop](exercises/spot-gaps-build-the-loop.md)

## Key Concepts
- The three-pattern catches what it was shaped to catch. The gaps that surface after two runs are data the pattern didn't anticipate, not proof the pattern failed
- Gaps sort into three homes: memory (rules that would have prevented the mistake upstream), sharper verifier (a check that would have fired mid-run), or new skill (a move packaged for future tasks)
- An eval is the automated check that says *this agent-produced thing meets our bar*. Verifier when deterministic, judge when LLM-based, gate when placed in CI. All three are evals
- The second authored skill IS the loop. It packages the diagnosis into a move the next run inherits.
- Encoding is the third phase of test → learn → encode. Two runs tested; the diagnosis learned; the skill encodes. **Remember: the loop closes when the lesson ships.**

## Human close

No compound prompt here. The encode step already happened when you shipped the second skill in the exercise; the team-kit accretion is the Module 6 compound. This slot is the human round the practitioner-fluency mood warrants.

*Three runs of the loop on your own work. The kit, yours.*

**Self-study variant.** Close the laptop. The encode step already happened when you shipped the second skill. If you can name the move in one sentence, that's the marker; no further articulation required.

[Composing the workflow](lectures/composing-the-workflow.md)

[The loop has a name](lectures/the-loop-has-a-name.md)

[The map, filled in](lectures/the-map-filled-in.md)

One move is left, and it runs past the edge of this room.

[Agents that build agents](lectures/agents-that-build-agents.md)

## Next

The next task you start, package it and send it off, then read what comes back through the lens you built. The reading is the loop, not the sending. It's yours now.

**Going deeper, when this loop has to scale past you:** [How the best do CI/CD at agent scale](trainings/agentic-engineering-101/supplementary/how-the-best-do-ci-cd.md).

**Why the loop reaches farther than you can watch:** [Checks that hold the line](trainings/agentic-engineering-101/supplementary/backpressure.md). The gates you built are the reach you get.

Keep on learning and sharing.

Antti

<!-- maintainer -->


**Capstone-close sign-off — deliberate exception to `check_writing.md` rule 6** (creator-name ban). The `## Next` section closes with a personal sign-off from the curriculum author (the bare-name line after *"Keep on learning and sharing."*). M6 is the AE101 core arc's final module; the close earns the human voice that the practitioner-fluency mood warrants. Per the rule's second exception (added 2026-05-03), the signature is in-scope-by-design for capstone-module closes. Future judges should not re-flag.

**Banned-word carve-out (URL only):** the `## Next` going-deeper pointer to `supplementary/backpressure.md` carries the word solely as the target's filename in the link URL; link text is the paraphrase "Checks that hold the line" — deliberately non-identical to the sibling paraphrase "Checks that push back" at `learn-from-the-test.md` § Pre-reads, so each surface phrases the concept in its own sentence. The word stays supplementary-only vocabulary — do not promote it into this module's body prose or link text. Same carve-out as `learn-from-the-test.md` § Pre-reads.

**M6 opener rescue + accept-loss callouts — deliberate exception to `check_student_facing.md` rule 5 (golden path only in body).** Two consecutive blockquotes in `## Start here` carry the rescue paths (nudge / re-send fresh / skip the opener) and the accept-the-loss floor ("you can still do the module's exercises"). Rule 5 normally bans recovery branches in body; here the structural risk (M5 run crashed during lunch in 2-day delivery) is named with scoped rescue, then a softer floor for the case where rescue fails entirely. The blockquote shape isolates both from the golden-path narrative for prepared students. Future judges should not re-flag.

**Quality:** compendium-audited 2026-05-31 (writing@0ef2ca6 story@1ff6f8a technical@0ef2ca6 behavior@1ff6f8a pedagogy@0ef2ca6 strategy@d06b5b8) — predates the 2026-07-02 close rework (the-map-filled-in added to the Human close, going-deeper pointers added to `## Next`) and the 2026-07-03 room re-sequence (agents-that-build-agents moved to the training's last beat); re-audit before ship.
- judges @d06b5b8: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- cross_module @0ef2ca6: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop,plan-mode-done-right]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Leap test** (per `check_pedagogy.md` rule 45; M6 is an arc-mood exercise so the test names artefact + use, not activity):
- The student has read their own Claude Code history back across the stack and holds a set of mermaid diagrams of the work they repeat. The dominant gap now sits inside a recognised work-shape, not floating alone.
- The student now owns a second packaged skill in `~/.claude/skills/` shaped to one of three forms (sharpened-verifier / judge / gap-finder), built from the gap-diagnosis across two runs, and invokes it the next time a similar task ships.
- The student's `./CLAUDE.local.md` shows at least one rule deleted (compound-by-subtraction), the deletion commit visible in git history, born from the two-run diagnosis.
- The student now holds a standalone handoff prompt, written by the agent from the shipped `session-shaper`, that studies their whole stack and authors a skill per recurring shape when run later. The encode-move generalised from one task to all their work.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Two-run gap map | Ranked gap list in M6 session scrollback; optionally copied to `observations/` if the student wants it durable | Exercise Phase 1 (diff un-packaged M4 vs packaged M5, quote both runs, rank dominant gap) | Phase 2 session-shaper authoring; future post-cohort team-kit conversation |
| Recurring-work shapes | Repeated-work inventory + mermaid diagrams (≤30 nodes each) in M6 session scrollback | Exercise Phase 2 study prompt (scan `~/.claude/projects/` across the stack) + shapes prompt (draw the top recurring patterns) | The session-shaper authoring (which shape holds the dominant gap); the `agents-that-build-agents` close (the shapes carry into the handoff prompt) |
| Stale-rule deletion | `./CLAUDE.local.md` in the M5 worktree, with one rule cut in place if diagnosis killed it | Exercise Phase 1 compound-by-subtraction prompt | Every future session in the worktree; post-M6 merge-back decision into the original repo's personal rules |
| Session-shaper / second skill | `~/.claude/skills/<skill-name>/SKILL.md` (personal, auto-discovered) | Exercise Phase 2 authoring conversation + self-critique + invocation on packaged run | Future long-running tasks of the same shape; `the-loop-has-a-name` lecture names it as verifier/judge/gate/eval; `agents-that-build-agents` prompt reads it as evidence |
| Workflow-skills handoff prompt | Standalone prompt in the close scrollback; student saves it where they choose (repo note or `~/.claude/`) | `agents-that-build-agents` close — the agent reads the shipped `session-shaper` and writes a cold-runnable prompt | The student's own later sessions: run cold to study their stack, diagram recurring shapes, author a skill per shape |

**Failure modes + escape hatches per phase** (per `check_pedagogy.md` rule 47; one row per forcing function shipping in the exercise):
- **Phase 1 — Diff and name the gaps.** Failure: both-runs collapse — student treats the packaged run as the only material worth diagnosing, the un-packaged baseline fades. Escape: trainer asks for quoted moments from each run separately before any synthesis.
- **Phase 1 — Compound move (cut stale rule).** Failure: addition-only compounding — student only adds rules, never subtracts. Escape: forcing prompt names a specific rule the two-run diagnosis killed; if the student can't name one, the diagnosis wasn't sharp enough — back to Phase 1's quoted-moments check.
- **Phase 2 — Author the skill (interview).** Failure: skill-shape mismatch — student picks sharpened-verifier when the dominant gap was qualitative drift, or judge shape when the gap is deterministic. Escape: trainer surfaces the menu — *"qualitative gap wants a judge. Deterministic gap wants a sharpened verifier. Recurring-drift gap wants a gap-finder skill. Which is yours?"*
- **Phase 2 — Author the skill (interview).** Failure: author-in-editor-not-conversation — student tries to open a markdown file and type the skill directly. Escape: trainer holds the line — *"The first skill in this training was authored in conversation. Same move here. Claude drafts from the diagnosis, you push back, Claude ships."*
- **Phase 2 — Self-critique before ship.** Failure: rubber-stamp self-audit — student or Claude marks the skill complete without finding the section where session evidence shows it underdelivered. Escape: prompt forces enumeration of one named convention from the session that the skill failed to encode; hedged language like *"minor polish"* is rejected.
- **Phase 2 — Invoke on actual run.** Failure: skill-as-documentation — student writes a SKILL.md that describes the gap instead of moving to catch it. Escape: diagnostic — the skill's `description` ends with an outcome, not a topic; if it reads like a topic page, re-scope in conversation.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Session runtime:** 1h45 nominal (Story opener 5 / Exercise 45 / Debrief 12 / Human close / Bridge 3). The Human close runs four beats — the story beats, *the-loop-has-a-name* 12–15 (per its maintainer Time line), *the-map-filled-in* 8–10 (per its maintainer Time line), and *agents-that-build-agents* now as the training's closing beat — 20+ min against the 15 the nominal budget gave the old single closer slot, so the close overshoots 1h45. Cutting the arc-retrospective exercise (2026-07-05) frees ~20 min back against that overshoot. Trainer demos slowly, room copy-pastes concurrently.
- **Prep / bridge timing:** optional Klaassen verifier article 10 min; human close / team-kit accretion slot 10–15 min.
- **Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. Failure shapes that steal the mood: compliance-feel (*"build the eval, pass the gate"*), paperwork-feel, credibility-performance (*"we live what we teach"*), trainer-monologue retrospective. If any beat reads like one of those, revise.
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries / §Material distribution (no training-dir state, no `module-N/` folders). Not restated here. Module-specific: M6 opens a fresh session in the M5 worktree at `../<repo>-m5` where both runs already live, then reads + authors + ships in-place. The second skill ships to personal `~/.claude/skills/`; team-PR is a strong follow-up, mediated by human conversation with teammates — not auto-promoted.
- **Pre-read placement:** none. M6 opens with the Story lecture in-room.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student walks in without one of the two artefacts accessible (laptop closed between M5 and M6, scrollback gone, repo state unclear on the packaged run). Trainer push: *"both artefacts are whatever's there. Commits between M4 and M5 send-offs, files modified during each run, scrollback at `~/.claude/projects/<project>/` if the sessions closed. Open a fresh Claude Code session in the repo and ask it to surface what each run touched."*
- **Phase 1 over-diagnosis** — student lists a long catalogue of gaps across both runs. Trainer push: *"two runs, maybe three gaps each. Pick the three that cost the most. The second skill you author at Phase 2 fits one shape."*
- **Phase 2 skill-shape mismatch** — student picks a sharpened-verifier shape when the dominant gap was a drift the verifier wouldn't have seen, or a judge shape when the gap is deterministic. Trainer surfaces the menu: *"qualitative gap wants a judge. Deterministic gap wants a sharpened verifier. Recurring-drift gap wants a gap-finder skill. Which is yours?"*
- **Phase 2 author-in-editor-not-conversation** — student tries to open a markdown file and type the skill directly. Trainer push: *"The first skill in this training was authored in conversation. Same move here. Claude drafts from the diagnosis, you push back, Claude ships."*
- **Closing lecture pre-empt** — trainer accidentally uses the phrase *"your verifier is an eval"* in Phase 1 or Phase 2. Don't. The closing lecture earns it from the just-built second skill. If the term gets used earlier, the closer has nothing to land.

**Watch-fors (cross-phase):**
- Both-runs collapse — student treats the packaged run as the only material worth diagnosing (the un-packaged baseline fades). Phase 1 recovers by asking for quoted moments from each run, separately.
- Gap-home confusion — student packs everything into the second skill because skills feel like "the answer." Force separation: some gaps belong in memory, some in a sharper existing verifier, some in a new skill. Phase 1 names the home before Phase 2 builds.
- Skill-as-documentation — student writes a SKILL.md that describes the gap instead of moving to catch it. Diagnostic: the skill's `description` ends with an outcome, not a topic. If it reads like a topic page, re-scope.
- Closing-lecture-as-pre-read — if the closing names something the student already heard, the opener or exercise leaked. Three-persona sim catches this; ship-pass eval also.

**Decision points (pacing):**
- **Phase 1 runs short (<10 min):** student didn't engage both runs. Diagnostic: did they quote specific moments from each, or summarise generically? If summary, redo with quote-required prompt.
- **Phase 1 runs long (>20 min):** student is over-diagnosing. Force ranking — top three gaps, dominant first, one per home (memory / verifier / skill).
- **Phase 2 runs short (<15 min):** the second skill is too thin. Diagnostic: does it fire on the gap shape it's targeting? If not, re-scope in conversation.
- **Phase 2 runs long (>35 min):** the skill is becoming a manifesto. Cap at the shape of a tight SKILL.md — named invocation pattern, one or two illustrative examples.
- **Whole-room mood below 7:** practitioner fluency isn't landing. Check Phase 1: did the diagnosis name SPECIFIC gaps with quoted moments from BOTH runs? Specificity-across-two-runs is where this mood lives.

**Plug points (trainer):**
- The student's two run artefacts (Phase 1 input material)
- Sponsor-stated team-kit home (second-skill ship destination for team-PR candidates)
- Sponsor-stated memory home (where gaps-belong-in-memory land)
- Sponsor-stated team-rule review cadence (named so the team-PR flag at ship doesn't become the compound-loop bottleneck)

**Frameworks riffed on (attributed in closer):**
- **Ronacher's three-pattern** — Armin Ronacher `[practitioner direct]`. Re-named in the closing lecture as a scaffold the student is now ready to sharpen, not a fixed recipe.
- **Cherny's three verifier shapes** — Boris Cherny `[practitioner direct]`. The second-skill authoring picks a shape from this menu.
- **Ramp Dojo** — 350-skill marketplace `[practitioner direct, Geoff Charles CPO, 2026-04-09]`, as the team kit's destination shape. Confirmed against ramp.md 2026-05-25 (public X primary paywalled). Closing lecture attribution.
- **Intercom Tier 1/2/3** — Darragh Curran, [2x Nine Months Later](https://ideas.fin.ai/p/2x-nine-months-later) `[practitioner direct, vendor venue, 2026-04-16]`. 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / ~500-person R&D — four numbers confirmed verbatim 2026-05-25. Closing lecture org-scale anchor.
- **Compound engineering** — Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) `[practitioner direct, vendor venue, 2026-02-09]`. Live + accurate 2026-05-25. The review + compound step made explicit across two runs. Exercise Phase 2 authoring + closing lecture's team-kit-accretion line.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-07-02 result:CAVEAT due:cohort]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja (2026-01-14): reference / plan.md-equivalent / verifier, 10h / 2.2M tokens. Post 2026-01-14, exits the 6-mo window 2026-07-14 — cite dated or apply the fallback at a Sep-2026 cohort. fallback: named-practitioner long-run with reused tests-as-verifier; drop the numbers.
- `[checked:2026-07-02 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): the three verifier shapes (background agent / agent-stop hook / Ralph Wiggin plugin, verbatim) are KIM'S synthesis, NOT Cherny's own taxonomy, and are ABSENT from the Orosz interview. fallback: present as a practitioner-convergent menu, no single attribution.
- `[checked:2026-05-25 result:OK due:2026-10-08]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO: 350+ skill Dojo, 99.5% AI-active, 84% coding-agents weekly. Confirmed via observations/ramp.md; that X status is link-only (author + date oEmbed-verified April 8 2026). fallback: "hundreds of skills" if the number is contested.
- `[checked:2026-05-25 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16): 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines / ~473 R&D in 1,305 (body says ~500; the-loop-has-a-name uses the tighter ~470/1,300). Metrics vendor-self-reported. fallback: keep numbers, attribute Intercom telemetry, flag self-report.
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen (2026-02-09): the four-step compound loop; the explicit plan/work/review/compound naming is convergent-across-appearances, not verbatim-on-page (matches the same-source CAVEAT stamps in `run-the-first-experiment.md` and `test-and-learn.md`). fallback: cite as Klaassen's canonical compound-engineering writeup.
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct] Shipper & Klaassen (Jan 2026): the 80/20 ratio ("roughly 80 percent ... plan and review ... 20 percent ... work and compound") — NOT in the Definitive Guide. Dec-2025 origin framing, so the ratio reads as the historical anchor it is. fallback: keep the posture hedge.

**First-cohort observation questions:**
- Two-run reading stamina — does Phase 1's diagnosis-across-two-runs hold, or does the second run fade?
- Skill-shape menu — do the three shapes cover the gaps students surface?
- Debrief round form — which works best with this mood (pair / whole-room / silent write-then-share)?

Pre-cohort open items for M6: see `pre-cohort-todos.md`.

**M6 close overbooked (2026-07-03) — Antti's eyeball.** The Human close now carries four lecture beats plus the human round against the 15-min nominal closer slot, and the close overshoots 1h45. Which beats stay in-room versus move to the M5-to-M6 gap as prework is a delivery call, not a content one — flagged for Antti to trim; no content changed here.

**2026-07-03 (re-sequence pass)** — Human close re-sequenced to agents-last per Antti: *the-map-filled-in* now the penultimate consolidation beat, *agents-that-build-agents* the training's closing beat, one-line forward-launch transition added before it. Tasks 2–4 were already applied in the same-day close rework and left in place: four source stamps re-verified to `checked:2026-07-02` (MiniJinja → CAVEAT + 6-mo-window note; Kim-on-Cherny shapes at the verbatim "background agent / agent-stop hook / Ralph Wiggin plugin"; Klaassen Definitive Guide → CAVEAT to match the same-source sibling stamps; how-Every-codes → CAVEAT, Dec-2025 origin framing); four-beat runtime line; Quality-predates re-audit note; overbooked-close eyeball flag. This pass only reordered the runtime beat list to agents-last and named the re-sequence in the Quality parenthetical.

**2026-07-05 (cut pass) — Antti.** Two M6 beats cut fully. (1) The *Steering the wiring* lecture: worktree-evidence wiring is plumbing, not a load-bearing concept, and its graduation beat ("you pick, no canonical answer") is already carried by *composing-the-workflow*'s close. (2) The *Arc-named retrospective* exercise (`arc-retrospective`): did not advance the learning; the arc-recognition it aimed at is carried by the Human close and *the-map-filled-in*. Removed everywhere: both `## Start here` links; the arc-retrospective leap-test outcome, artefact-contract row, per-phase failure mode, push-back move, watch-for, decision point, and first-cohort question (above); the `steering-the-wiring` theory-manifest entry (`build-workbook.js`); the `arc-retrospective-1` prompt plus its four `consumed-by` graph refs; the two audit-script hardcodes (`audit-eval-coverage.js`, `audit-ae101-artifact-contracts.js`). Frees ~20 min against the overbooked close. Both files git-rm'd (reversible via history). Companion cross-file cleanups: M5 (`learn-from-the-test.md`) forward-pointer, the sibling exercise's trailing beat line, and the trainer pages.

**2026-07-03 (supplementary-promotion wiring cleanup)** — Removed the `## Next` going-deeper pointer that linked `supplementary/the-gate-is-a-claim.md` and `supplementary/ironies-of-automation.md`. Both were promoted to in-room lectures earlier this run (the-gate-is-a-claim → M5 lecture, ironies-of-automation → M4 lecture), so a M6 back-pointer to them as further-reading supplementaries is stale (students now meet both taught in-room before M6). The two remaining going-deeper pointers (how-the-best-do-ci-cd, backpressure) still reference genuine supplementaries and are untouched.

# Spot gaps, build the loop

## Big Idea
Two runs of the same task (un-packaged Module 4, packaged Module 5) are enough evidence to name what the three-pattern didn't anticipate, pick where the gap belongs (memory, verifier, new skill), and author a session-shaper skill through conversation so future you inherits the lesson.

## Prework

Walk in with both Module 4 (un-packaged) and Module 5 (packaged) run artefacts. Optional pre-read in the Module 5 to Module 6 gap: Kieran Klaassen, [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) (~10 min).

## What You'll Learn
After this module, you will be able to:
- **Diagnose** (Analyze) the packaged Module 5 run alongside the un-packaged Module 4 baseline; name gaps the three-pattern didn't anticipate, quoted from your own artefacts.
- **Name** (Evaluate) which gap belongs in memory, which in a sharper verifier, which in a new skill, using two runs' evidence, not prescription.
- **Compound by subtraction** (Evaluate) — cut one rule the two-run diagnosis killed from `./CLAUDE.local.md`; rules-files have a half-life.
- **Author** (Create) a session-shaper skill through conversation, shape follows what the two runs demanded (sharpened-verifier / judge / gap-finder); self-critique; invoke on the packaged run; ship to personal `~/.claude/skills/`.
- **Name** (Understand) evals as the broader family — verifier in your repo, judge in your test, gate in your CI — same function, different surfaces. Anchored by Ramp Dojo and Intercom Tier 1/2/3 from your just-built artefact.
- **Articulate** (Evaluate) one key learning and one personal thought on the future in the Debrief round. Not a performance; a marker of where your practice stands after six modules.

## Start here

You walk in holding two runs of the same task. The un-packaged Module 4 send-off. The packaged Module 5 re-run. The contrast across two runs is the material. One run gave you a failure mode to name. Two runs give you gaps the three-pattern itself didn't anticipate, and a shape for what to do about each one.

[Story of Module 6](lectures/story-of-module-6.md)

[Spot gaps, build the loop](exercises/spot-gaps-build-the-loop.md)

[Steering the wiring](lectures/steering-the-wiring.md)

[Arc-named retrospective](exercises/arc-retrospective.md)

## Key Concepts
- The three-pattern catches what it was shaped to catch. The gaps that surface after two runs are data the pattern didn't anticipate, not proof the pattern failed
- Gaps sort into three homes: memory (rules that would have prevented the mistake upstream), sharper verifier (a check that would have fired mid-run), or new skill (a move packaged for future tasks)
- An eval is the automated check that says *this agent-produced thing meets our bar*. Verifier when deterministic, judge when LLM-based, gate when placed in CI. All three are evals
- The second authored skill IS the loop. It packages the diagnosis into a move the next run inherits. Writing it in conversation (not by opening a markdown file) keeps the authoring discipline continuous with Module 3
- Encoding is the third phase of test → learn → encode. Two runs tested; this module's reading learned; the skill encodes

**Compounding (Theme 2):** Review + Compound made explicit across two runs of the same task. Iterative encoding, not single-pass retrospective. The second skill and the team-kit accretion move carry it.

**Self-aware / grain of salt (Theme 4):** the whole module is conversation with Claude about Claude's output across two runs. The artefacts rule; self-reports don't. Phase 1 push-backs and the closing lecture's judge-built-from-diagnosis move surface it.

## Human close

10–15 minutes. No compound prompt here. The encode step already happened when you shipped the second skill in the exercise; the team-kit accretion is the Module 6 compound. This slot is the human round the practitioner-fluency mood warrants. The trainer reads the room and picks the form (pair exchange, whole-room round, quiet write-then-share, or skip the round when energy is spent).

*Three runs of the loop on your own work. The kit, yours.*

**Self-study variant.** Close the laptop. The encode step already happened when you shipped the second skill. If you can name the move in one sentence, that's the marker; no further articulation required.

[The loop has a name](lectures/the-loop-has-a-name.md)

[Agents that build agents](lectures/agents-that-build-agents.md)

## Next

On Monday, pick a task your team is sitting on, send it off packaged, read the return through the lens you just built. The loop is yours now.

Keep on learning and sharing.

—Antti

<!-- maintainer -->


**Quality:** draft 2026-04-26 (touched after audit — degraded from compendium-audited 2026-04-26; subtraction-only edit removed redundant worktree paragraph from "## Next" — same content already lives at M1 prework. Re-audit on next pass.)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Session runtime:** 1h45 (Story opener 5 / Exercise 45 / Arc-retrospective 20 / Debrief 12 / Closer 15 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Arc-retrospective is the read-and-synthesise of M1–M6 artefacts (root rules file, memory, ADRs, both authored skills, both run artefacts).
- **Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. Failure shapes that steal the mood: compliance-feel (*"build the eval, pass the gate"*), paperwork-feel, credibility-performance (*"we live what we teach"*), trainer-monologue retrospective. If any beat reads like one of those, revise.
- **Delivery architecture** (strategy doc § "Delivery architecture"): AE101 content folder + student's real repo. Both runs already live in the repo; M6 reads + authors + ships in-place. No training-dir state, no `module-N/` folders. The second skill ships to personal `~/.claude/skills/`; team-PR is a strong follow-up, mediated by human conversation with teammates — not auto-promoted.
- **Pre-read placement:** none. M6 opens with the Story lecture in-room. Self-study Teacher Claude reads it aloud at session open.
- **Quality:** sim-passed 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts; three-persona sim 2026-04-25 — Debrief redesign)

**Push-back moves** (trainer covers in cohort; the Nerd skill that consumes these in self-study is upstream-pending):
- **Connections blocker** — student walks in without one of the two artefacts accessible (laptop closed between M5 and M6, scrollback gone, repo state unclear on the packaged run). Nerd: *"both artefacts are whatever's there. Commits between M4 and M5 send-offs, files modified during each run, scrollback at `~/.claude/projects/<project>/` if the sessions closed. Open a fresh Claude Code session in the repo and ask it to surface what each run touched."*
- **Phase 1 over-diagnosis** — student lists a long catalogue of gaps across both runs. Nerd: *"two runs, maybe three gaps each. Pick the three that cost the most. The second skill you author at Phase 2 fits one shape."*
- **Phase 2 skill-shape mismatch** — student picks a sharpened-verifier shape when the dominant gap was a drift the verifier wouldn't have seen, or a judge shape when the gap is deterministic. Nerd surfaces the menu: *"qualitative gap wants a judge. Deterministic gap wants a sharpened verifier. Recurring-drift gap wants a gap-finder skill. Which is yours?"*
- **Phase 2 author-in-editor-not-conversation** — student tries to open a markdown file and type the skill directly. Nerd: *"M3 authored the first skill in conversation. Same move here. Claude drafts from the diagnosis, you push back, Claude ships."*
- **Arc-retro scope drift** — student's retrospective prompt asks Claude to read the whole training history including decisions they don't have in the repo. Nerd: *"bounded read. Root rules file, memory folder, ADRs if you have them, both authored skills, the two run artefacts. Claude names the arc from that evidence — not from the training's marketing."*
- **Debrief round awkwardness** — self-study student finds the two-part articulation stilted in solo mode. Teacher Claude: *"type what you'd say out loud. No frame, no performance. The marker is where your practice stands, not how the sentence reads."*
- **Closing lecture pre-empt** — Nerd accidentally uses the phrase *"your verifier is an eval"* in Phase 1 or Phase 2. Don't. The closing lecture earns it from the just-built second skill. If the Nerd uses the term earlier, the closer has nothing to land.

**Watch-fors (cross-phase):**
- Both-runs collapse — student treats the packaged run as the only material worth diagnosing (the un-packaged baseline fades). Phase 1 recovers by asking for quoted moments from each run, separately.
- Gap-home confusion — student packs everything into the second skill because skills feel like "the answer." Force separation: some gaps belong in memory, some in a sharper existing verifier, some in a new skill. Phase 1 names the home before Phase 2 builds.
- Skill-as-documentation — student writes a SKILL.md that describes the gap instead of moving to catch it. Diagnostic: the skill's `description` ends with an outcome, not a topic. If it reads like a topic page, re-scope.
- Arc-retrospective-as-trainer-monologue — Claude writes the arc note in a voice that sounds like a testimonial for the training. Push back: *"write from my artefacts, quote me where you can, skip the summary of what the training taught."*
- Closing-lecture-as-pre-read — if the closing names something the student already heard, the opener or exercise leaked. Three-persona sim catches this; ship-pass eval also.

**Decision points (pacing):**
- **Phase 1 runs short (<10 min):** student didn't engage both runs. Diagnostic: did they quote specific moments from each, or summarise generically? If summary, redo with quote-required prompt.
- **Phase 1 runs long (>20 min):** student is over-diagnosing. Force ranking — top three gaps, dominant first, one per home (memory / verifier / skill).
- **Phase 2 runs short (<15 min):** the second skill is too thin. Diagnostic: does it fire on the gap shape it's targeting? If not, re-scope in conversation.
- **Phase 2 runs long (>35 min):** the skill is becoming a manifesto. Cap at the shape M3's test-strategy skill held — tight SKILL.md, named invocation pattern, one or two illustrative examples.
- **Arc-retrospective runs long (>25 min):** scope drifted. Re-cut the read-list; the retrospective is a one-page note, not a training memoir.
- **Whole-room mood below 7:** practitioner fluency isn't landing. Check Phase 1: did the diagnosis name SPECIFIC gaps with quoted moments from BOTH runs? Specificity-across-two-runs is where this mood lives.

**Plug points (trainer):**
- The student's two run artefacts (Phase 1 input material)
- Sponsor-stated team-kit home (second-skill ship destination for team-PR candidates)
- Sponsor-stated memory home (where gaps-belong-in-memory land)
- Sponsor-stated team-rule review cadence (named so the team-PR flag at ship doesn't become the compound-loop bottleneck)

**Frameworks riffed on (attributed in closer):**
- **Ronacher's three-pattern** — Armin Ronacher. Re-named in the closing lecture as a scaffold the student is now ready to sharpen, not a fixed recipe.
- **Cherny's three verifier shapes** — Boris Cherny. The second-skill authoring picks a shape from this menu.
- **Ramp Dojo** — 350-skill marketplace as the team kit's destination shape. Closing lecture attribution.
- **Intercom Tier 1/2/3** — Darragh Curran. 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / 500-person R&D. Closing lecture org-scale anchor.
- **Compound engineering** — Kieran Klaassen. The review + compound step made explicit across two runs. Exercise Phase 2 authoring + closing lecture's team-kit-accretion line.

**First-cohort observation questions:**
- Two-run reading stamina — does Phase 1's diagnosis-across-two-runs hold, or does the second run fade?
- Skill-shape menu — do the three shapes cover the gaps students surface?
- Arc-retrospective for core-only cohorts — 15–20 min enough, or does it want more room?
- Debrief round form — which works best with this mood (pair / whole-room / silent write-then-share)?

Pre-cohort open items for M6: see `pre-cohort-todos.md`.

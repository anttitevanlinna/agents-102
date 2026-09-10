# The wizard move

## Context is King

The same question, two answers. Two Claude Code sessions. In one, the first prompt is *"What is the capital of Italy?"* Claude answers *Rome.* Then the second prompt: *"What should we have for dinner?"* Claude suggests something Italian: pasta, osso buco, risotto.

Same words, different session. In the other session, the first prompt is *"What is the largest lake in Finland?"* Claude answers *Saimaa.* Then the same second prompt: dinner. Take a guess before it runs. What does Claude suggest now?

Something Finnish: salmon, rye bread, meatballs. But not as reliably. The first exchange became part of context, and the context colored everything after.

## You steer the answer by loading context

Context is whatever you tell it. A fact. A role. A preference. A constraint. All of it colors what comes next. You, in a way, compel the right output by having the right stuff in the context.

The move is loading the right context before the question, not a clever prompt or a slash command you didn't know.

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-10 (writing@0d65ff01 story@0d65ff01 technical@0d65ff01 behavior@1480362 pedagogy@0d65ff01 strategy@08946dd8 slides@0d65ff01)
- judges @0d65ff01: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- compendium-audited 2026-04-26 (check_writing voice-quartet Seth-Rory-Risto, check_student_facing #14, check_lectures opener, check_strategy_tie_in)

**Standing constraints:**
- **Zero bold on the narrative and demo slides** (Antti: *"go very lightly on the bold"*). Prose paragraphs, not bolded-claim bullets. `check_slides §9` (spec: `theory-plan.md § Slide format + dosage`).
- **Guess before reveal.** The guess paragraph precedes the Finnish-dinner answer. Both sessions get narrated before the live run. `check_slides §4`.
- **No plan mode on this surface.** M1's fix runs tests-first; plan mode earns its keep at M2. Any phrasing like *"with plan mode used deliberately"* is drift. Confirmed against the module's Big Idea + LO (Antti, 2026-09-01).
- **The loop-over-the-fix beat belongs to the M1 closer, not here.** `the-machine-you-just-met.md` lands it after the four exercises as recognition (`## You just ran the same loop`, kicker *"The loop is the shape. The bug today was the excuse."*). This opener carries the context mechanism and stops; no loop preview, no borrowed kicker.
- **Zero map references.** M1 is protected; the map arrives at M2.
- Openers carry no setup lede.

**Meta:**
- **Placement:** M1 opener, after Connections, before the exercise.
- **Time:** 8 min. 5 min lecture prose + 3 min live two-session demo in Claude Code, not claude.ai (Antti, 2026-08-23).
- **Voice:** Seth × Rory × Risto — warm + counterintuitive + direct.

**The Context is King demo:**
- **Two sessions is the dose (Antti 2026-08-25); Agents 101's third, cardiologist role-example stays out of body and demo.** The fact-vs-fact contrast carries the mechanism; a third example restates it.
- Not adapted for engineers. The universality is the point — the lesson lands because it is not about code. Engineers come in expecting a clever-prompt flex and get a 60-second demo that reframes the whole training.

**Demo watch-fors:**
- **Establish that the sessions are independent before you deliver.** The whole bit depends on session 2 not knowing about session 1. **Standing instruction: two fresh Claude Code sessions, each in its own new empty directory outside any repo.** That clears the directory-keyed layer: project `CLAUDE.md`, `CLAUDE.local.md`, project `.claude/rules/`, project memory. It does not clear user scope. `~/.claude/CLAUDE.md`, `~/.claude/rules/` and any managed policy load in every session wherever it starts, so read your own user rules before the cohort and check that nothing there steers food, culture or tone, or start both demo sessions with `claude --setting-sources project`, which leaves user scope out of that session (Claude Code 2.1.259; measured 5 of 5 Italian without user scope against 1 of 5 under a user file carrying a persona). One directory per session rather than one reused across both: outside a repo the working directory is the project root, so a reused folder gives session 1 a place to leave something for session 2. Not one session with `/clear` between beats. Dry-run once before the cohort on the Claude Code version the room will meet. Salvage if session 2 answers Finnish-adjacent anyway: *"It remembered — which is the lecture's point one step early: context is what you tell it, and now you've seen it telling itself."*
- Room wants something code-specific up front — hold. The exercise is on their codebase; the opener isn't. The abstract demo is what makes Monday-on-their-repo feel inevitable rather than impressive.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `context-conditions-next-answer` · detail · "The first exchange became part of context, and the context colored everything after" ← in-context-conditioning, demo-fires-live
- `conditioning-is-unreliable` · detail · "But not as reliably." ← antti-dinner-demo-deliveries, dinner-demo-haiku-sample
- `context-is-whatever-you-tell-it` · vision · "Context is whatever you tell it. A fact. A role. A preference. A constraint." ← none-owed
- `the-move-is-loading-context` · vision · "The move is loading the right context before the question, not a clever prompt or a slash command you didn't know" ← none-owed

**Sources**
- in-context-conditioning `[checked:2026-07-30 result:CAVEAT due:none]` https://arxiv.org/abs/2005.14165 — [academic/research] Brown et al., *Language Models are Few-Shot Learners* (2020). Backs the MECHANISM and nothing beyond it: *"the model is conditioned on a natural language instruction and/or a few demonstrations of the task and is then expected to complete further instances of the task simply by predicting what comes next"* — prior text in the window conditions the next output, with no weight update. CAVEAT: every experiment in the paper is task demonstrations lifting downstream accuracy. It does not test an unrelated earlier exchange colouring a later, different question, which is exactly what the demo shows. **Do not cite it as evidence for the dinner effect.** Foundational, `due:none`. fallback: cite the mechanism and let the live demo carry the specific effect.
- antti-dinner-demo-deliveries `[checked:2026-08-03 result:ATTESTED due:none]` attested:Antti 2026-08-03 repeated Agents 101 deliveries of the dinner demo — [practitioner direct, maintainer-attested] The comparative ranking ("the Finnish window conditions the dinner answer less reliably than the Italian one") is the maintainer's repeated first-hand observation across cohort deliveries of this exact demo. The carve-out covers the ranking; the owed live run on demo-fires-live covers a single firing and cannot. fallback: drop "But not as reliably." and keep the mechanism sentence.
- dinner-demo-haiku-sample `[checked:2026-08-03 result:CAVEAT due:none]` (no URL — house measurement, results recorded here) — [house measurement] 20 fresh claude-haiku-4-5 sessions, 10 per window, neutral two-turn prompt, classified post-hoc: Italy-conditioned 7/10 distinctly Italian (3 defected to salmon dinners); Finland-conditioned 8/10 Nordic-marked (1 defected to risotto). CAVEAT twice: a different model than the room meets, and the instrument is confounded — salmon-with-dill is also Haiku's apparent unconditioned default (3/10 Italy-arm answers served it), so Finnish hits cannot be separated from default behaviour while Italian hits are unambiguous. The sample neither confirms nor refutes the ranking; the attestation above carries it. fallback: none — recorded as context, not as the claim's warrant.
- demo-fires-live `[checked:2026-09-06 result:OK due:cohort]` (no URL — live dry-run) — [capability] The demo runs in Claude Code, and session independence rests on what a fresh session loads. Two layers, and only one of them is directory-keyed. Project `CLAUDE.md`, `CLAUDE.local.md`, project `.claude/rules/` and project memory are absent in an empty directory outside any repo; user scope (`~/.claude/CLAUDE.md`, `~/.claude/rules/`, managed policy) loads in every session wherever it starts. Verified live 2026-08-23 by opening a session in an empty non-git directory and reading back the user file's first heading. Dry-run 2026-09-06 on Claude Code 2.1.259, default model, each pair in its own empty non-git directory with `--setting-sources project`: Italy then dinner gave an Italian answer 5 of 5 (cacio e pepe, *since we were on Italy*), Finland then dinner gave a Finnish answer 3 of 3 (salmon and dill, chanterelles, muikku), a fresh session with only the dinner question gave a generic list. The same Italy pair under a user-scope `~/.claude/CLAUDE.md` that carries a persona fired 1 of 5, so the user layer is the live risk and that flag is the switch that clears it for the demo. Both halves are the standing instruction in Demo watch-fors. Owed before each cohort: two fresh sessions, one directory each, on the Claude Code version the room will use, the dinner question run through, then `result:ATTESTED`. fallback: none. If the demo stops firing, the opener needs rebuilding, not rewording.

**Frameworks**
- Context conditioning · [borrow:ML research] · law:steering-is-executable-constraint-your-stance-is-the-ceiling · ← in-context-conditioning

**Stance** `[stance:2026-08-01 level:L2]`
- holds: the mechanism is foundational and not in doubt — prior text in the window conditions the next output, with no weight update (Brown et al. 2020). Note what that does and does not cover. The literature on file backs the *mechanism*. What backs the *specific* effect the demo shows, an unrelated earlier exchange colouring a later question, is the demo. For a claim the room watches happen in 60 seconds, a live check is the stronger warrant anyway, which is why this is taught as a demo and not as a citation. The product side is a standing precondition: the demo runs in fresh Claude Code sessions in an empty directory outside any repo, so nothing directory-keyed loads. The trainer's own user-scope rules load anyway and are the part that needs checking (instruction + salvage in Demo watch-fors).
- contested: whether the demo still fires cleanly on a current model — a model that has got better at ignoring irrelevant prior context weakens the Finland beat, which the body already hedges as the less reliable of the two.
- decided: **`context-conditions-next-answer` stays `detail` on a mechanism-plus-attestation pairing (2026-08-02).** Brown et al. carries the mechanism, the attested run carries the specific effect; the stamps carry the split. One pass found no paper testing the two-turn effect exactly — a finding about the search, not the world; do not read it as "nobody has studied this."
- would-move-it: the demo failing to produce a Finnish answer on a current model, or Claude Code starting to load cross-directory state into a fresh session in an empty directory. Either one makes this a rebuild, not an edit — the opener's whole job is that the room watches the effect happen.

**OODA**
- question: does the two-window demo still fire on the model and the product defaults the next cohort will meet? Bounded to delivery reliability. This is not a question about in-context learning as a research topic. **Two absences banked 2026-07-30 — do not re-hunt either.** On model distractibility there is no evidence in either direction: Willison's memory-tagged archive, the Sonnet 5 announcement and system card, and Anthropic's release notes carry no claim that current models are less influenced by irrelevant prior context, and the Opus 4.6 retrieval improvement is the opposite skill (finding buried detail inside one long context, not ignoring unrelated earlier material) so it is not usable here. On counter-evidence to the two-turn effect, nothing was found; the nearest adjacent paper, Mu et al., *A Closer Look at System Prompt Robustness* (Feb 2025, arxiv.org/abs/2502.12197) `[academic/research]`, studies adherence against **conflicting and adversarial user input** rather than conversation length, so it is not a caveat on the opener and should not be re-chased as one.
- roster: `platform-watch/coding-agents/state.md`; Claude Code release notes (memory, rules loading, session start); Simon Willison for model-behavior deltas.
- last-run: 2026-07-30

<!-- /backing -->

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

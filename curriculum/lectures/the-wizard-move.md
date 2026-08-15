# The wizard move

## Who this is for

You've already done the hard part. You found this training because you use Claude Code regularly and you want to get further with it. That's who this training is for.

## Context is King

The same question, two answers. Two Claude chat windows. In one, the first prompt is *"What is the capital of Italy?"* Claude answers *Rome.* Then the second prompt: *"What should we have for dinner?"* Claude suggests something Italian: pasta, osso buco, risotto.

Same words, different window. In the other window, the first prompt is *"What is the largest lake in Finland?"* Claude answers *Saimaa.* Then the same second prompt: dinner. Take a guess before it runs. What does Claude suggest now?

Something Finnish: salmon, rye bread, meatballs. But not as reliably. The first exchange became part of context, and the context colored everything after.

## You steer the answer by loading context

A role colors answers the same way a fact does. One more window. The first prompt: *"I'm a cardiologist preparing dinner for my patients."* Then the same second prompt about dinner. The suggestion shifts again: heart-healthy, low-sodium, vegetable-forward. Not because Claude knows medicine better than Italian cooking. You told it who you are, and every answer after took that into account.

Context is whatever you tell it. A fact. A role. A preference. A constraint. All of it colors what comes next. You, in a way, compel the right output by having the right stuff in the context.

The move is loading the right context before the question, not a clever prompt or a slash command you didn't know. Everything else in this training is about how to earn that kind of primed window on any codebase, any Monday.

## Everyone arrives partial, trainers included

You found your way to Claude Code by yourself. Maybe a colleague pointed you at it. Maybe you watched a video. Mostly you just typed something, watched what came back, and kept the prompts that worked. You picked up tricks. The slash command that saves keystrokes. The `CLAUDE.md` shape that produced output you liked. The weird thing you tell Claude at the start of every session.

Every engineer who sat down with this tool did some version of that. One engineer brings a slash command, another a `CLAUDE.md` shape, another a strange opening instruction. Everyone's slice is partial, and everyone else's is different.

This training pools partial into a shared floor, then raises the ceiling. The people building this are partial too. Six months ahead of you on some moves, six months behind on others.

## The loop is what you repeat

Fix one trivial bug from your own backlog, end-to-end. Log one decision. Seed a rules file your next session reads first.

The fix happens once. The loop is what you repeat: a way of working, not one bug closed. You become the Claude wizard by running the loop on real work and letting the habit sharpen. Not by reading about it.

<!-- maintainer -->

**Standing constraints:**
- **Zero bold on the narrative and demo slides** (Antti: *"go very lightly on the bold"*). Prose paragraphs, not bolded-claim bullets. `theory-plan.md § Slide format — emphasis budget` + `check_slides §9`.
- **Guess before reveal.** The guess paragraph precedes the Finnish-dinner answer. Both windows get narrated before the live run. `check_slides §4`.
- **No plan mode on this surface.** M1's fix runs tests-first; plan mode earns its keep at M2. Any phrasing like *"with plan mode used deliberately"* is drift.
- **Don't steal the closer's kicker.** *"Loop is the shape / bug was the excuse"* belongs to the M1 closer.
- **Zero map references.** M1 is protected; the map arrives at M2.
- Openers carry no setup lede.

**Open:** the plan-mode drift removal wants a maintainer eyeball against the module's Big Idea + LO.

**Quality:** compendium-audited 2026-08-02 (writing@1c765f2 story@1c765f2 technical@1c765f2 behavior@1c765f2 pedagogy@1c765f2 strategy@1c765f2 slides@1c765f2)
- judges @1c765f2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- compendium-audited 2026-04-26 (check_writing voice-quartet Seth-Rory-Risto, check_student_facing #14, check_lectures opener, check_strategy_tie_in)
**Meta:**
- **Placement:** M1 opener, after Connections, before the exercise.
- **Time:** 10 min. 5–7 min lecture prose + 3 min live two-window demo in claude.ai chat windows — deliberately not code, per the demo spec above.
- **Voice:** Seth × Rory × Risto — warm + counterintuitive + direct.

**The Context is King demo (stolen verbatim from Agents 101):**
- Two chat windows. Capital-of-Italy → pasta suggestion. Largest-lake-of-Finland → Finnish dinner. Same second prompt, different answer, because the first exchange became part of context.
- Third window: cardiologist-preparing-dinner-for-patients → heart-healthy suggestion. Context is whatever you tell it.
- Not adapted for engineers. The universality is the point — the lesson lands because it is not about code. Engineers come in expecting a clever-prompt flex and get a 60-second demo that reframes the whole training.

**Demo watch-fors:**
- **Establish that the windows are independent before you deliver.** Cross-chat search is on by default for paid accounts, so a demo account cannot be assumed clean and the whole bit depends on window 2 not knowing about window 1. **Standing instruction (decided 2026-08-01): open all three windows in incognito** (the ghost icon on a new chat, outside a project). Fallback if incognito is unavailable: turn off *Search and reference chats* under Settings → Memory, pause memory generation, and clear the Profile personal-preferences field. On Team or Enterprise, confirm no org-level policy forces memory back on. Salvage if window 2 answers Finnish-adjacent anyway: *"It remembered — which is the lecture's point one step early: context is what you tell it, and now you've seen it telling itself"*; then run the third window clean.
- Room wants something code-specific up front — hold. The exercise is on their codebase; the opener isn't. The abstract demo is what makes Monday-on-their-repo feel inevitable rather than impressive.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `context-conditions-next-answer` · detail · "The first exchange became part of context, and the context colored everything after" ← in-context-conditioning, demo-fires-live
- `conditioning-is-unreliable` · detail · "But not as reliably." ← antti-dinner-demo-deliveries, dinner-demo-haiku-sample
- `role-conditions-like-fact` · detail · "A role colors answers the same way a fact does" ← role-prompting-capability, demo-fires-live
- `context-is-whatever-you-tell-it` · vision · "Context is whatever you tell it. A fact. A role. A preference. A constraint." ← none-owed
- `the-move-is-loading-context` · vision · "The move is loading the right context before the question, not a clever prompt or a slash command you didn't know" ← none-owed
- `everyone-arrives-partial` · vision · "Everyone's slice is partial, and everyone else's is different" ← none-owed
- `trainers-partial-too` · vision · "The people building this are partial too. Six months ahead of you on some moves, six months behind on others." ← none-owed
- `loop-not-the-fix` · vision · "The fix happens once. The loop is what you repeat" ← none-owed
- `wizard-by-running-not-reading` · vision · "You become the Claude wizard by running the loop on real work and letting the habit sharpen. Not by reading about it." ← none-owed

**Sources**
- in-context-conditioning `[checked:2026-07-30 result:CAVEAT due:none]` https://arxiv.org/abs/2005.14165 — [academic/research] Brown et al., *Language Models are Few-Shot Learners* (2020). Backs the MECHANISM and nothing beyond it: *"the model is conditioned on a natural language instruction and/or a few demonstrations of the task and is then expected to complete further instances of the task simply by predicting what comes next"* — prior text in the window conditions the next output, with no weight update. CAVEAT: every experiment in the paper is task demonstrations lifting downstream accuracy. It does not test an unrelated earlier exchange colouring a later, different question, which is exactly what the demo shows. **Do not cite it as evidence for the dinner effect.** Foundational, `due:none`. fallback: cite the mechanism and let the live demo carry the specific effect.
- role-prompting-capability `[checked:2026-07-30 result:CAVEAT due:2027-01-30]` https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices — [capability] Anthropic, *Prompting best practices* § Give Claude a role: *"Setting a role in the system prompt focuses Claude's behavior and tone for your use case. Even a single sentence makes a difference."* CAVEAT, channel mismatch: the doc documents the **system prompt** and its worked example is a cURL call carrying a `system` parameter. The cardiologist beat is a **first user turn** in an ordinary chat window. Corroborating, not identical. The body already closes the gap on its own terms — *"Context is whatever you tell it. A fact. A role."* — a role stated in conversation is context like any other. (The `docs.claude.com/.../system-prompts` path 302s here; use this URL.) fallback: drop the separate role citation. The role claim is the conditioning claim.
- antti-dinner-demo-deliveries `[checked:2026-08-03 result:ATTESTED due:none]` attested:Antti 2026-08-03 repeated Agents 101 deliveries of the dinner demo — [practitioner direct, maintainer-attested] The comparative ranking ("the Finnish window conditions the dinner answer less reliably than the Italian one") is the maintainer's repeated first-hand observation across cohort deliveries of this exact demo. The carve-out covers the ranking; the owed live run on demo-fires-live covers a single firing and cannot. fallback: drop "But not as reliably." and keep the mechanism sentence.
- dinner-demo-haiku-sample `[checked:2026-08-03 result:CAVEAT due:none]` (no URL — house measurement, results recorded here) — [house measurement] 20 fresh claude-haiku-4-5 sessions, 10 per window, neutral two-turn prompt, classified post-hoc: Italy-conditioned 7/10 distinctly Italian (3 defected to salmon dinners); Finland-conditioned 8/10 Nordic-marked (1 defected to risotto). CAVEAT twice: a different model than the room meets, and the instrument is confounded — salmon-with-dill is also Haiku's apparent unconditioned default (3/10 Italy-arm answers served it), so Finnish hits cannot be separated from default behaviour while Italian hits are unambiguous. The sample neither confirms nor refutes the ranking; the attestation above carries it. fallback: none — recorded as context, not as the claim's warrant.
- demo-fires-live `[checked:2026-07-30 result:CAVEAT due:cohort]` https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context — [capability] Anthropic support, *Use Claude's chat search and memory to build on previous context*. **The demo's independence premise is no longer an account default.** Verbatim: *"Once the ability to search past chats is rolled out to your account, it will be enabled by default"* — Pro, Max, Team, Enterprise. A separate memory feature synthesises entries across chats, and Enterprise carries an org-wide *Generate memory from chat history* toggle documented as default-on. Two limits, both load-bearing and neither to be filled in: the page describes search as user-initiated (*"Just ask Claude about your previous conversations naturally to use it"*) and says nothing either way about unprompted invocation; and it does not state whether incognito blocks *reading* existing memory as well as writing it. So the mechanisms that would break window independence are on by default, and whether they fire on an unrelated dinner question is undocumented in both directions. The premise is un-guaranteed, not disproven. Still owed: a live run against the model and account the cohort will actually meet, then `result:ATTESTED`. fallback: none. If the demo stops firing, the opener needs rebuilding, not rewording.

**Frameworks**
- Context conditioning · [borrow:ML research] · law:steering-is-executable-constraint-your-stance-is-the-ceiling · ← in-context-conditioning, role-prompting-capability
- The loop over the fix · [borrow:practitioner-coined] · law:the-compound-ladder · ← cultural-vocab. Body carries the recognition beat only; the ladder is not named on this surface.

**Stance** `[stance:2026-08-01 level:L2]`
- holds: the mechanism is foundational and not in doubt — prior text in the window conditions the next output, with no weight update (Brown et al. 2020). Note what that does and does not cover. The literature on file backs the *mechanism*. What backs the *specific* effect the demo shows, an unrelated earlier exchange colouring a later question, is the demo. For a claim the room watches happen in 60 seconds, a live check is the stronger warrant anyway, which is why this is taught as a demo and not as a citation. The product side is now a standing precondition, not a risk: cross-chat search/memory are default-on for paid accounts, and the demo runs in incognito windows by standing instruction (decided 2026-08-01; mitigation + salvage in Demo watch-fors).
- contested: whether the demo still fires cleanly on a current model — a model that has got better at ignoring irrelevant prior context weakens the Finland beat, which the body already hedges as the less reliable of the two.
- decided: **`context-conditions-next-answer` stays `detail` on a mechanism-plus-attestation pairing, 2026-08-02.** Brown et al. 2020 backs *prior text conditions the next output*; the demo's specific effect — an unrelated earlier exchange colouring a later, different question — is attested by our own run, and one pass found no paper testing exactly that. That is a finding about the search, not about the world, so do not read it as "nobody has studied this." The pairing is sound and the stamps carry the split; naming it out loud because a `detail` claim whose specific form rests on our own demo deserves to be visible.
- decided: **the role citation keeps a scoped slot, not a full one, 2026-08-02.** Anthropic's doc says a role in the **system prompt** focuses behaviour, and its example is a cURL call with a `system` parameter; the cardiologist beat is a first **user turn** in a chat window. It backs the *mechanism* of role conditioning and must not be read as backing the channel. The body's own line already dissolves the distinction (*"Context is whatever you tell it. A fact. A role."*), which is what the lecture argues anyway — so no body edit, and no second citation is owed.
- would-move-it: the demo failing to produce a Finnish answer on a current model, or incognito ceasing to isolate new chats from search/memory state. Either one makes this a rebuild, not an edit — the opener's whole job is that the room watches the effect happen.

**OODA**
- question: does the two-window demo still fire on the model and the product defaults the next cohort will meet? Bounded to delivery reliability. This is not a question about in-context learning as a research topic. **Two absences banked 2026-07-30 — do not re-hunt either.** On model distractibility there is no evidence in either direction: Willison's memory-tagged archive, the Sonnet 5 announcement and system card, and Anthropic's release notes carry no claim that current models are less influenced by irrelevant prior context, and the Opus 4.6 retrieval improvement is the opposite skill (finding buried detail inside one long context, not ignoring unrelated earlier material) so it is not usable here. On counter-evidence to the two-turn effect, nothing was found; the nearest adjacent paper, Mu et al., *A Closer Look at System Prompt Robustness* (Feb 2025, arxiv.org/abs/2502.12197) `[academic/research]`, studies adherence against **conflicting and adversarial user input** rather than conversation length, so it is not a caveat on the opener and should not be re-chased as one.
- roster: `platform-watch/coding-agents/state.md`; Anthropic release notes and the claude.ai memory / personalization settings; Simon Willison for model-behavior deltas.
- last-run: 2026-07-30

**Flagged**
- `[resolved:2026-08-01]` **Product-default flag closed.** The 2026-07-30 flag (cross-chat search default-on meets `would-move-it`) is resolved: maintainer decision 2026-08-01 makes incognito the standing instruction for all demo windows; the stance's `contested:` drops the product half (now a standing precondition) and keeps the model half as the live question. Salvage line for a leak recorded in Demo watch-fors + the M1 run sheet. Residual unknown stands as stated then: docs remain silent on unprompted invocation and on whether incognito blocks memory reads — the incognito instruction plus the pre-cohort dry-run is the mitigation, not a proof.

<!-- /backing -->

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

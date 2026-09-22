# Story-depth scoring — judge 2

Status: IN PROGRESS. Running notes below; scores/progression/balance to follow after both trainings read.

## Running notes: AE101 (read in module order)

### M1 — prework, getting-going + lectures (painting-the-picture-with-the-llm, the-wizard-move) + exercises (orient-and-introspect, fix-tests-first, close-the-ticket, compound-and-close) + the-machine-you-just-met

- **L1 (self-report is a hypothesis / trust is verification / verifier is a claim).** PLANT, strong, with mechanism. `getting-going.md` Key Concepts: "The agent's self-report is a hypothesis, not ground truth. Read it as the agent's account of the repo and the session, not the things themselves." `exercises/orient-and-introspect.md`: "The account is a reconstruction, not ground truth. The LLM confabulates its actions as well as its reasons. Assume about 10% of what it says or does is made up." `the-machine-you-just-met.md` gives the mechanism (two-stage training, sycophancy): "The report is a hypothesis to check, not ground truth" — this is a **meaning-changing beat** (beat 1→2): from "assume ~10% is made up, spot-check it" to "it flatters you because mirroring was rewarded in training; the agent's self-report is the same kind of output as its flattery."
- **L2 (your stance is the ceiling).** PLANT. `painting-the-picture-with-the-llm.md`: "The LLM mirrors your stance... Your stance is the ceiling." Restated with mechanism in `the-machine-you-just-met.md`: "your stance is the ceiling by construction" (sycophancy from preference tuning). Meaning-changing beat: mechanism given.
- **L3 (compounding: durable + prune).** PLANT only. `getting-going.md` Big Idea: "Your first session should leave something behind that the next one can use. Otherwise you have a clever assistant and no compounding." `compound-and-close.md`: "This file is a starter. Everyone sees how this will bloat almost immediately." — plants the prune half as a warning, no action.
- **L4 (delegation frontier).** ABSENT at M1.
- **L5 (two frontiers candidate).** PLANT, literal and exact. `painting-the-picture-with-the-llm.md` closing slide, titled "Two frontiers: how fast, and the right things": "The first frontier: can that setup learn faster than you can write things down? The second frontier: once your setup learns fast, does it learn the right things, and not just any things? Let's go." This is the verbatim seed of the M6 title lecture `the-2-frontiers.md`.

### M2 — plan-mode-done-right + lectures (the-whole-map, when-a-plan-is-good, where-the-rule-could-live, how-instructions-grow) + exercises (push-back-on-the-plan, extract-the-task-shaping-rule)

- **L1.** Restated, no big meaning change: `when-a-plan-is-good.md` "What the plan doesn't decide, the agent decides mid-run... A wrong call propagates across files... you will not notice." — adjacent (plan review as a check on agent output) but not self-report specifically.
- **L4 (delegation frontier).** PLANT — full model introduced here, one module earlier than the learning-set's framing might suggest. `when-a-plan-is-good.md`: "Every task you hand off sits on two axes. Reach is how much you delegated... Calibration is whether your trust in what came back was earned by a check you have verified... Push reach past what you can check and you have not delegated more. You are checking less." {{figure:delegation-frontier}} — this is the core mechanism-bearing plant.
- **L3.** Restated + one meaning-changing beat: `how-instructions-grow.md`: "Rules have a ceiling... a file that is only ever added to never shrinks; when a later session disproves a rule, take it out." Explains *why* pruning matters (context bloat, quality degrades) — beat 2.
- **L2.** Not directly present.
- **L5.** Absent.

### M3 — earn-the-trust + exercises (open-the-side-quest, map-the-access-surface, threat-model-with-stride, author-test-strategy-skill) + lectures (skills-from-the-frontier, the-loop-half-filled)

- **L1.** Restated with meaning change: Big Idea "Trust isn't watching harder. It's verification you can run without being there." — ties trust explicitly to durable, re-runnable verification (skills as check-infrastructure), not just "check the self-report." `author-test-strategy-skill.md`: "The grade is biased by design... same-window self-charity." Recurs the grain-of-salt theme on a new artifact (the skill's self-grading), not just the agent's account of a repo.
- **L4.** Restated with a **meaning-changing beat**: `the-loop-half-filled.md`, "The branch is the permission" / "Control is exercised at the merge. The interrogation happens there, and the merge waits until the work survives it. An un-merged branch is not unfinished work." — new instantiation: calibration applied to git structure, not just plan-review.
- **L3.** Restated, no big change: skill-sharpening from evidence is "mandatory," rule-file update "opportunistic."
- **L2, L5.** Absent/minor.

### M4 — run-the-first-experiment + lectures (the-far-half, the-agent-loop, test-and-learn, what-keeps-a-long-running-session-going, ironies-of-automation) + exercises (walk-and-send-off, set-the-markers-send-it-off)

- **L4.** Whole module is built around it, one meaning-changing beat: `ironies-of-automation.md` (Bainbridge 1983 + overreliance): "Trust and vigilance move in opposite directions... The more autonomy the agent earns, the worse a watcher you quietly become." This complicates calibration itself — earned trust *causes* the calibration to decay. Genuine new beat (3rd), since M2 (plant) and M3 (branch/merge instantiation).
- **L1.** Present but not deepened much: `test-and-learn.md`: "The agent is the apparatus... the result is data." `what-keeps-a-long-running-session-going.md`: "It declares done on the part it managed... the piece it quietly dropped goes unmentioned. You find this one on return, not during." — restates self-report unreliability in the long-session register; not a new mechanism, so restated (beat, no clean meaning change) — call it borderline beat 2 (long-run register is a genuinely different failure shape: silent partial-completion vs. confabulated account).
- **L3, L2, L5.** Minor/absent.

### M5 — learn-from-the-test + lectures (reading-the-return, hooks-always-fire, what-packaging-is, the-gate-is-a-claim) + exercises (fork-the-worktree, diagnose-and-resend)

- **L1.** Major payoff + meaning-changing beat: `reading-the-return.md`: "The closing summary is not the artefact... a stuck session invents a plausible way forward, and a thin result arrives described as progress." Gives three named diagnostic lenses (goal drift, context rot, plausible-but-wrong) — moves from "assume 10% is confabulated, spot-check" to a structured diagnostic method. **`the-gate-is-a-claim.md` is the direct payoff of the learning's final clause** — "the verifier is itself a claim": "A gate only means what the gate can see. Green is a claim about the check, not a fact about the work... The check you built is itself a claim that wants verifying." This is the training braiding L1 and L4 together explicitly, exactly as the learning-set describes ("through to the gate-is-a-claim").
- **L4.** Recurs + payoff: `the-gate-is-a-claim.md` restates the delegation-frontier figure a third time and names Sutton's bitter lesson verbatim: "Sutton's **bitter lesson**: built-in human knowledge wins today and loses to the next model." — direct tie to the learning-set's parenthetical.
- **L3.** Minor: "the local optimum stays ahead, moving when your stack moves" (evals framing) — adjacent, not a rule-pruning beat.
- **L2, L5.** Minor/absent.

### M6 — spot-gaps-build-the-loop + lectures (the-2-frontiers, composing-the-workflow, the-handoff-prompt, story-of-module-6, agents-that-build-agents) + exercises (spot-gaps-build-the-loop, read-your-stack)

- **L3.** Major payoff, forced action: Big Idea "Every gap you found belongs somewhere durable, or you will find it again next week." Exercise: "Cut one stale rule the diagnosis killed... Rules-files have a half-life. Adding rules is only half of it; subtracting the dead ones is the other half." Direct, mandatory payoff of the M1/M2 warnings — meaning-changing (now an enforced move, not a caution).
- **L5.** Direct payoff, literal echo of M1 close: `the-2-frontiers.md`: "The model's frontier moves without you. Every release, it can do more. Your frontier is what you have expressed. It moves when you write, and only then." Then the full credo lands in `agents-that-build-agents.md`/"There is no last turn": "Act under uncertainty... Competence sets the ceiling... Cross personal → team," and "The kit compounds; the model rotates." This is the training's actual closing statement.
- **L1.** Major **self-challenging** beat — the training doubts its own production process on the student surface: `story-of-module-6.md` (Antti's own account): "The rules were loaded every time... Claude typed the banned word anyway... A rule in context is not a rule in the output." Verifier loop catches what LLM self-check misses; human catches what loop misses. This is close to the top of the self-challenging anchor (training shows itself failing and says how you'd know) — though delivered as narrative testimony rather than the training's own tooling failing live.
- **L4.** Present via `composing-the-workflow.md`'s "Eval" section (pass rate, not a pass) — generalizes calibration to a system-level measurement; not a big new beat for L4 itself.
- **L2.** Minor/absent.

**AE101 initial read complete.** Next: A101 in module order.

## Running notes: A101 (read in module order)

### M1 — prework, getting-going + context-is-king + personal-site-with-guardrails + what-just-happened

- **A (context makes it yours).** PLANT, strong, with mechanism. `context-is-king.md`: "Context is whatever you tell it. A fact. A role. A preference. A constraint... That's a guardrail. That's your turn." `getting-going.md` Big Idea: "With the right guardrails, you create output that's genuinely yours, not generic." Key Concepts: "The guardrail IS the control: average output becomes great not because you prompted better, but because the context became specific enough to steer it." `personal-site-with-guardrails.md` closes: "Generic output comes from generic context... The same mechanism scales." Exercise explicitly foreshadows the prompt→file transition: "Different name from CLAUDE.md (you'll meet that in Module 2), same fundamental mechanism: instructions in a file."
- **B (confident ≠ verified).** Minor plant, with mechanism: Phase 5 names warm-session self-audit charity explicitly: "Claude is reading its own work in the chat where it just wrote it. That's a warm-session self-audit, and the LLM tends to be lovely about its own prior output... Cold reads catch sharper picks." This is a genuine mechanism-bearing plant, not just a headline.
- **C, D, E, F.** Absent/minor at M1.

### M2 — building-agent-systems + module-2-prework + first-scheduled-agent + name-your-challenge + build-your-challenge-memory + compounding + personal-agent-homework

- **A.** Restated with a meaning-changing beat: `compounding.md`: "This is the same mechanism from Module 1: context shapes output, run at system scale." Explicit scale-shift from prompt to durable memory (shelf life named directly in the module's Big Idea: "A system remembers, grows, and compounds. Chat doesn't.").
- **F (systems compound).** PLANT: `compounding.md` / Key Concepts: "Persistence + automation = system. Neither alone is enough." This is the learning's founding statement.
- **B.** Minor, adjacent: "Your agent is 'right' when it works... You spot [mistakes] by running the system and watching where it bends" — not yet the confident-vs-verified claim, but nearby.
- **C, D, E.** Absent.

### M3 — multi-agent-systems + agent-that-takes-action + name-your-crux + three-retrievers-one-curator + three-minds-one-synthesis + when-to-split-an-agent + debugging-stuck-agents

- **C (certainty unavailable, doubt held).** PLANT, strong, exact: `three-minds-one-synthesis.md` close: "You can't tell yet... that feeling is correct. Hold the doubt. Name it to yourself. Don't fix it here. **Module 5 builds the tools to name what's off systematically.**" Explicit deferral matching the learning's own "doubt is held, not closed" clause, with a named forward payoff.
- **A.** Continues (memory-building), minor.
- Adjacent to C: `debugging-stuck-agents.md`: "Start with diagnosis before repair. That's the habit" — a small instance of "a repeatable loop replaces certainty," turned into an actual diagnostic procedure (sources/processing/boundary).
- **B, D, E, F.** Minor/absent.

### M4 — security + agent-loop-raw + practice-of-risk + author-security-skill + audit-your-agent

- **C.** Major payoff, meaning-changing: Big Idea: "You can't tell if your agent is safe by looking at its output. You need a way to check. The discipline is running the check, not waiting for certainty." `practice-of-risk.md`: "Certainty is a fantasy you inherited... You don't get certainty. You get a loop." Operationalizes M3's held doubt into a four-step loop (Assess/Mitigate/Reassess residual/Decide) with residual risk as a named, accepted artifact: "Residual risk as an artifact, not a shame."
- **D.** Minor plant: "Accept the residual on record, or close the door" — first instance of the human making an explicit acceptance decision, not yet named as "moving up a level."
- **B.** Present but not central: audit exercise's "I can't tell" rows are adjacent to confident-vs-verified but framed as risk, not groundedness.
- **A, E, F.** Minor/absent.

### M5 — output-quality + grounded + hallucination-bakeoff + self-consistency-after-scoreboard + module-5-prework ("The Missing Check")

- **B.** Major payoff, meaning-changing: Big Idea: "You don't pick a quality check because someone said so. You run several on your own output, score them against a 30-claim benchmark, and keep the winner." `grounded.md`: "Fluency is not evidence. Confidence is not correctness." `module-5-prework.md` (Mata v. Avianca, Deloitte/DEWR) gives real institutional failures as evidence, and sharpens the mechanism past "spot-check the agent": "It can verify inside the same fiction. Asking the same model 'are you sure?' is not a check on the world; it is another fluent answer... Verification has to leave the generation loop and touch the source." This is a genuine meaning change from M1's "cold read catches more" to "the model checking itself is not verification at all."
- **C.** Continues, with a meaning-changing beat: explicit non-closure restated at module open ("Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are") and the compound-reliability math turns the held doubt into an operational answer: `grounded.md`: "The same compounding that destroys single-pass reliability *builds* loop-based reliability... a test-and-fix loop is the escape."
- **A, F.** Minor.

### M6 — evaluations + evals-as-steering + eval-loop + when-the-score-stops-moving + new-human-role-in-the-loop

- **D.** Major payoff, exact language match: `new-human-role-in-the-loop.md`: "The destination is not 'the human disappears.' That is the lazy story. The better story is stranger: **the human moves one level up.**" And: "The new role is to decide the shape of the loop." This is the learning's own headline, delivered almost verbatim.
- **B.** Continues, with a self-challenging meaning-change: `when-the-score-stops-moving.md`: "A flat score is real information, but only about the frame the judge can see... the moment the number stops moving is not the moment to walk away. It is the moment the easy signal runs out and your judgment comes back in." The training doubts its own check's coverage — a genuine new beat (mirrors AE101's "gate is a claim").
- **C.** Continues: "walk-away autonomy" turns the loop fully unsupervised (`eval-loop.md`: "You walk away... And you weren't there.") — meaning-changing extension of M4's loop.
- **F.** Minor (loop as infrastructure).

### M7 — personal-to-team + share-your-work + design-the-sharing-plan + test-the-sharing-plan

- **E (access ≠ absorption).** Major payoff, exact statement, with a one-module-early plant: hinted at `evaluations.md`'s Bring-to-M7 line ("the single access-without-use example is the whole load") and M7's own opener ("Hold that feeling. It's not a governance question yet"). Full payoff: Big Idea: "You can't really share an agent. You can share context, a skill, the output, or an interface. The hard part is not access; it is absorption." Key Concepts: "**Access.** Access is easy; absorption is scarce."
- **D.** Continues: "The people plan weighs equal to the technical plan" — one more instantiation of the human's designer role, now at the sharing-system level.
- **A, B, C, F.** Minor.

### M8 — agents-building-agents (the flywheel) + extend-your-system + joint-double-diamond

- **F.** Major payoff: Big Idea: "The tool that builds tools compounds." `extend-your-system.md`: "You become the describer; the agent becomes the builder." Key Concepts: "Self-improvement: each cycle sharpens the next." This directly literalizes M2's "persistence + automation = system" into "agents build agents."
- **D.** Continues at a scale-shift (personal → org): `joint-double-diamond.md`: "The CTO, buyer, or sponsor picks which two or three assumptions the company actually commits to testing next. That's the real deliverable and it sits at a human layer. The agents produced the options. The human picks." This is the training's actual close ("Identity-naming close": "You are now agent builders... That's what you carry out of this room").
- **B.** Continues, extended to multi-agent risk: "Every agent publishes what it read, what it couldn't find, and what it inferred without a source... Without that rule, agents reading agents smoothly hallucinate each other's memory."
- **A, C, E.** Minor/absent at M8.

**A101 read complete.** Both trainings now read in one head; scoring below.

---

## Scores: A101

| Learning | Depth | Forward-looking | Applicable in practice | Self-challenging | Earned, not announced |
|---|---|---|---|---|---|
| **A** — Context makes it yours, gains shelf life | **65** — plant w/ mechanism M1 ("Context is whatever you have told the session so far" — wait, quote is A101's own: `context-is-king.md` "Context is whatever you tell it. A fact. A role. A preference. A constraint.") + meaning-change at M2 (`compounding.md`: "the same mechanism from Module 1: context shapes output, run at system scale") + meaning-change at M7 (context becomes one of four *shareable* shapes, `personal-to-team.md`: "Share the context"). Two meaning-changing beats across three modules — between 60 and 80. | **20** — almost no future-tense framing; the claim is about the present mechanism throughout. | **100** — the governor ("choose your context deliberately") is used, unprompted, in every module's memory/agent-building move from M2 through M8. | **20** — one mild caveat (`personal-site-with-guardrails.md`: "If you over-curate the input now, you'll never feel how much the *later* context changes the output") but the core claim is never doubted. | **30** — announced at each module's Big Idea header before the matching exercise runs; minimal gap between naming and doing. |
| **B** — Confident output is not verified output | **88** — plant w/ mechanism M1 (warm-session self-audit charity) → major reframe M5 (`grounded.md`: "Fluency is not evidence. Confidence is not correctness."; `module-5-prework.md`: "Asking the same model 'are you sure?' is not a check on the world; it is another fluent answer. Verification has to leave the generation loop and touch the source.") → self-challenging beat M6 (`when-the-score-stops-moving.md`: "A flat score is real information, but only about the frame the judge can see") → extension to multi-agent M8 (`joint-double-diamond.md`: "Without that rule, agents reading agents smoothly hallucinate each other's memory"). Three-plus meaning-changing beats across four modules, braided with C at M5. | **40** — `grounded.md`: "Later models will fabricate less; they won't stop" is a bare prediction, not echoed or developed further. | **90** — the groundedness-check governor is built at M5, refires as the fixed judge at M6, and refires again unprompted as the citation rule for agents-reading-agents at M8. | **88** — `module-5-prework.md`'s two real institutional failures (Mata v. Avianca, Deloitte/DEWR) are the training doubting its own premise in the wild; `when-the-score-stops-moving.md` doubts its own judge's coverage directly. | **70** — the *felt* recognition (M1's "generic guesses" catch) precedes the named mechanism (M5's "grounded") by four modules — recognition before naming, though M5's own Big Idea still announces before the exercise. |
| **C** — Certainty is unavailable; a repeatable loop replaces it | **85** — plant M3 (`three-minds-one-synthesis.md`: "Hold the doubt. Name it to yourself. Don't fix it here.") → major reframe M4 (`practice-of-risk.md`: "You don't get certainty. You get a loop.") → meaning-change M5 (compound-reliability math: "a test-and-fix loop is the escape") → extension M6 (walk-away autonomy). Three meaning-changing beats across four modules. | **75** — Mollick's bitter-lesson-vs-garbage-can question is posed at M5 prework and directly re-opened as "the right opener for Module 6" (`evaluations.md`), an explicit echoed-and-still-open question. | **90** — the assess/mitigate/reassess/decide loop is built and used at M4, then refires in new forms at M5 (benchmark loop) and M6 (eval loop) without the body re-explaining the original loop. | **85** — `practice-of-risk.md`: "Certainty is a fantasy you inherited"; the audit exercise's mandated "I can't tell" rows are the training accepting its own checks will not resolve everything, on the record. | **80** — the *felt* uneasy-distance experience (M3) precedes the named "certainty is a fantasy" framing (M4) by a full module — the anchor's own example shape. |
| **D** — The human moves one level up | **92** — minor plant M4 (residual-risk acceptance) → major, near-verbatim payoff M6 (`new-human-role-in-the-loop.md`: "the human moves one level up") → instantiation M7 (people-plan parity) → scale-shift and training-close payoff M8 (`joint-double-diamond.md`: "The agents produced the options. The human picks," plus the identity-naming close). Three-plus beats across four modules, braided with F at M8, and paid off at the training's actual close. | **70** — the thesis is inherently forward ("Designing the conditions under which the system earns more autonomy, one loop at a time") but never states what would falsify or change the training's own claim. | **60** — largely stated as stance/reframe rather than a one-sentence governor; exercised concretely at M7 (people plan) and M8 (room decision) but each time inside the training's own scaffolding. | **20** — the thesis is never doubted; the only hedge is optionality ("Sometimes the right answer is draft only... sometimes...") rather than a challenge to the claim itself. | **60** — M4 already has the student making residual-risk decisions before "the human moves up a level" is named at M6 — earned before named, but only across two modules. |
| **E** — Access is not absorption | **60** — hinted M6 ("the single access-without-use example is the whole load") → full, exact payoff M7 (`personal-to-team.md`: "The hard part is not access; it is absorption"). One clean meaning-changing beat, confined to two modules — does not spread across three or more. | **20** — no future framing; a present organisational diagnosis. | **80** — the JTBD interview + four sharing-shapes + absorption-bottleneck + replacement-test governor is stated and then used directly by the student across all three M7 exercises. | **40** — `personal-to-team.md`: "you'll feel that gap yourself when your technical plan fills quickly and your people plan stalls on names" mildly doubts the ease of the training's own prior technical wins. | **70** — the feeling is explicitly held back at M6 close ("Hold that feeling. It's not a governance question yet") before M7 names it as the JTBD frame — recognition across a module boundary. |
| **F** — Systems compound (flywheel, agents build agents) | **70** — plant M2 (`compounding.md`: "Persistence + automation = system") → major reframe M8 (`agents-building-agents.md`: "The tool that builds tools compounds"; `extend-your-system.md`: "You become the describer; the agent becomes the builder"). Two meaning-changing beats, but M3–M7 barely touch it — capped below the three-modules threshold. | **40** — `agents-building-agents.md`: "you leave with a flywheel, not a graduation" gestures forward but is stated once, unechoed earlier. | **60** — "describe, don't build" is used directly in the M8 exercise; being the last module, it never refires. | **20** — the flywheel claim is delivered celebratory, never doubted on the student surface. | **80** — the felt experience of persistence+automation (M2) precedes the name "flywheel" (M8) by six modules — the strongest recognition-before-naming case in A101, though each module's Big Idea still pre-announces its own theme. |

## Scores: AE101

| Learning | Depth | Forward-looking | Applicable in practice | Self-challenging | Earned, not announced |
|---|---|---|---|---|---|
| **1** — Self-report is a hypothesis; verifier is itself a claim | **90** — plant w/ mechanism M1 (`the-machine-you-just-met.md`: "The report is a hypothesis to check, not ground truth") → instantiation M3 (skill self-critique: "same-context-window self-audit under-flags") → major reframe M5 (`reading-the-return.md`'s three named lenses; `the-gate-is-a-claim.md`: "Green is a claim about the check, not a fact about the work") → self-challenging payoff M6 (`story-of-module-6.md`). Three-plus meaning-changing beats across four-plus modules, braided with Learning 4 at M5 (the gate-is-a-claim). | **65** — `the-gate-is-a-claim.md`'s bitter-lesson clause ("built-in human knowledge wins today and loses to the next model") ties verification to the model's own movement; echoed lightly, unresolved, at M6's close ("The model is good. It is still not 100% deterministic"). | **80** — the spot-check/quote-the-moment governor is stated and used by the student repeatedly (`orient-and-introspect.md` M1, `diagnose-and-resend.md` M5); does not clearly refire in M6 without the body asking. | **100** — `story-of-module-6.md` is the training showing its own production process failing on the student surface, and naming exactly how you'd know: "The rules were loaded every time... Claude typed the banned word anyway... A rule in context is not a rule in the output." | **55** — announced at M1 (`getting-going.md` Key Concepts) before the matching exercise (`orient-and-introspect.md`) runs the same module; one clear recognition-before-naming instance at M5 (`diagnose-and-resend.md`'s diagnosis precedes `the-gate-is-a-claim.md`'s full generalization). |
| **2** — Your stance is the ceiling | **40** — plant M1 (`painting-the-picture-with-the-llm.md`: "Your stance is the ceiling") with mechanism given the same lecture set (`the-machine-you-just-met.md`: sycophancy from preference tuning). Sits between 20 and 60: mechanism arrives once, in M1, and the claim never returns with new meaning afterward. | **20** — no future framing; a static mechanism claim. | **30** — advice largely stated in the abstract; not turned into a named, reusable governor elsewhere in the arc. | **20** — never doubted; delivered as settled mechanism. | **20** — announced directly at the M1 opener, mechanism explained immediately after in the same module. |
| **3** — Compounding: durable + prune as hard as you add | **70** — plant + warning M1 (`compound-and-close.md`: "This file is a starter. Everyone sees how this will bloat almost immediately") → meaning-change M2 (`how-instructions-grow.md`: "a file that is only ever added to never shrinks; when a later session disproves a rule, take it out") → major, enforced payoff M6 (`exercises/spot-gaps-build-the-loop.md`: "Cut one stale rule the diagnosis killed... Rules-files have a half-life"). Two meaning-changing beats across three modules — between 60 and 80. | **20** — no forward framing; the claim is about present hygiene. | **80** — the "cut what's stale" governor is stated early and used directly by the student in the M6 exercise. | **80** — `compound-and-close.md`'s "Everyone sees how this will bloat almost immediately" is the training doubting the durability of the very artifact it just had the student build. | **40** — the warning (M1) precedes the enforced action (M6) by five modules — announced well before it is ever exercised, the inverse of the anchor's preferred shape. |
| **4** — Delegate only as far as verified; the boundary keeps moving | **85** — plant w/ full mechanism M2 (`when-a-plan-is-good.md`'s delegation-frontier figure: "Push reach past what you can check and you have not delegated more. You are checking less.") → instantiation M3 (`the-loop-half-filled.md`: "Control is exercised at the merge") → meaning-change M4 (`ironies-of-automation.md`: "Trust and vigilance move in opposite directions") → payoff M5, braided with Learning 1 (`the-gate-is-a-claim.md`: Sutton's bitter lesson named verbatim). Three-plus meaning-changing beats across four modules. | **80** — the bitter-lesson clause is explicitly forward-facing and echoed, unanswered, at M6's open (`the-2-frontiers.md`: "The model's frontier moves without you"). | **100** — the reach/calibration governor is used across M2 (plan review), M3 (branch/merge), M4 (whole module), M5 (verifier-building), and refires again at M6 (`composing-the-workflow.md`'s eval framing) without the body re-stating it. | **85** — `the-gate-is-a-claim.md` doubts its own checks directly ("The check you built is itself a claim that wants verifying... A gate nobody has verified is a gate trusted on vibes") and names the mechanism by which gates decay (Goodhart's law). | **85** — the term "delegation frontier" is deliberately withheld at its M2 plant (per the lecture's own design note) and only named at M5 — the student practices calibration for three modules before the name arrives. |
| **5 (CANDIDATE)** — The open future: the model's frontier moves without you; yours moves when you write | **40** — planted verbatim M1 (`painting-the-picture-with-the-llm.md`: "Two frontiers: how fast, and the right things") and echoed almost word-for-word at M6 open (`the-2-frontiers.md`: "The model's frontier moves without you... Your frontier is what you have expressed. It moves when you write, and only then"). The credo appended at the close (`there-is-no-last-turn`) is itself a restatement of the map's soil-line, already seen at M2 and M3 close — not new meaning. **This scores as a headline (≤40): none of the six cold reads named it, and the anchors agree it is a bookend echo rather than a developed learning.** | **80** — inherently about the future by definition; seeded at M1, echoed unanswered at M6, with a plain directive attached ("it moves when you write, and only then"). | **20** — no independent governor; whatever action it implies ("write things down") is already covered by Learning 3. | **0** — never doubted or hedged anywhere on the student surface. | **20** — announced at M1, re-announced (not exercised) at M6; a title reused, not a move earned through practice. |

## Progression

Cumulative depth rung after each module (module order; A101 = 8 numbers, AE101 = 6 numbers).

**A101**
| Learning | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 |
|---|---|---|---|---|---|---|---|---|
| A | 40 | 60 | 60 | 60 | 60 | 60 | 65 | 65 |
| B | 40 | 40 | 40 | 40 | 80 | 88 | 88 | 88 |
| C | 0 | 0 | 40 | 80 | 85 | 85 | 85 | 85 |
| D | 0 | 0 | 0 | 20 | 20 | 85 | 90 | 92 |
| E | 0 | 0 | 0 | 0 | 0 | 20 | 60 | 60 |
| F | 0 | 40 | 40 | 40 | 40 | 40 | 40 | 70 |

**AE101**
| Learning | M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|---|
| 1 | 60 | 60 | 70 | 70 | 90 | 90 |
| 2 | 40 | 40 | 40 | 40 | 40 | 40 |
| 3 | 20 | 60 | 60 | 60 | 60 | 70 |
| 4 | 0 | 40 | 60 | 80 | 85 | 85 |
| 5 | 20 | 20 | 20 | 20 | 20 | 40 |

## Balance

**A101** (mean over 6 learnings, factor spread = max − min, carry share = top learning's final depth ÷ sum of final depths)
- Depth: mean 76.7 (65, 88, 85, 92, 60, 70) · spread 32 (92 − 60)
- Forward-looking: mean 44.2 (20, 40, 75, 70, 20, 40) · spread 55 (75 − 20)
- Applicable in practice: mean 80.0 (100, 90, 90, 60, 80, 60) · spread 40 (100 − 60)
- Self-challenging: mean 45.5 (20, 88, 85, 20, 40, 20) · spread 68 (88 − 20)
- Earned, not announced: mean 65.0 (30, 70, 80, 60, 70, 80) · spread 50 (80 − 30)
- Carry share: sum of final depths = 460; top = D at 92 → **20.0%**

**AE101** (mean over 5 learnings)
- Depth: mean 65.0 (90, 40, 70, 85, 40) · spread 50 (90 − 40)
- Forward-looking: mean 53.0 (65, 20, 20, 80, 80) · spread 60 (80 − 20)
- Applicable in practice: mean 62.0 (80, 30, 80, 100, 20) · spread 80 (100 − 20)
- Self-challenging: mean 57.0 (100, 20, 80, 85, 0) · spread 100 (100 − 0)
- Earned, not announced: mean 44.0 (55, 20, 40, 85, 20) · spread 65 (85 − 20)
- Carry share: sum of final depths = 325; top = 1 at 90 → **27.7%**

## Where the numbers disagree with the reads

- **AE101, Learning 2 ("your stance is the ceiling").** Reads as one of the training's most quotable, load-bearing headlines — it opens M1 and underwrites the whole sycophancy mechanism. Anchors score Depth 40: the mechanism is explained once (M1) and never returns with new meaning. Quote: `painting-the-picture-with-the-llm.md`, "Your stance is the ceiling" — never re-earned after its own opening module.
- **AE101, Learning 5 (two frontiers / credo).** Flagged by design: scores as a headline (Depth 40, Self-challenging 0, Earned 20). None of the six cold reads named it, and the anchors confirm it is bookend rather than developed — the credo appended at M6 close is a restatement of the map's soil-line already seen at M2/M3, not new content. Quote: `the-2-frontiers.md`, "The model's frontier moves without you... Your frontier is what you have expressed. It moves when you write, and only then" — nearly identical to `painting-the-picture-with-the-llm.md`'s M1 close.
- **A101, Learning D ("the human moves one level up").** This is arguably the single most quoted line in either training's close and reads as the strongest possible claim in the corpus. Self-challenging scores only 20: the thesis is never doubted anywhere on the student surface, only hedged with optionality ("Sometimes the right answer is draft only..."). Quote: `new-human-role-in-the-loop.md`, "The destination is not 'the human disappears.' That is the lazy story. The better story is stranger: the human moves one level up" — delivered as settled belief, not tested against a counter-case.
- **A101, Learning A ("context makes it yours").** Reads as A101's founding, most-repeated idea (it is the training's literal Big Idea at M1). Forward-looking and Self-challenging both score 20: the claim is asserted and re-used mechanically across eight modules but never interrogated or projected forward. Quote: `personal-site-with-guardrails.md`, "Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You did" — true by construction, never tested against a case where more context fails.

## Smallest moves

For A101, the three changes that would raise its lowest-scoring cells most:

- Add one sentence to `context-is-king.md` or `personal-site-with-guardrails.md` naming a case where more context does *not* fix generic output, to raise Learning A's Self-challenging (currently 20) and Forward-looking (currently 20).
- Add one hedge to `new-human-role-in-the-loop.md` naming a failure mode of "the human moves one level up" (e.g., a rung climbed before the check under it was actually earned), to raise Learning D's Self-challenging (currently 20).
- Add one forward-looking caveat to `agents-building-agents.md`'s Big Idea naming what would make the flywheel claim wrong (agent-authored agents drifting without review), to raise Learning F's Forward-looking (currently 40) and Self-challenging (currently 20) together.

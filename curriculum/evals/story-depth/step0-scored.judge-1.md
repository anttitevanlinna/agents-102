# Step 0 — Story-Depth Scoring: AE101 vs A101

Read in student order: AE101 six module bodies + `the-machine-you-just-met`, `orient-and-introspect`, `the-gate-is-a-claim`, `the-2-frontiers`, `painting-the-picture-with-the-llm`, `the-whole-map`, `ironies-of-automation`, `compound-and-close`. A101 nine module bodies + `compounding`, `new-human-role-in-the-loop`. Deeper lecture/exercise trees not opened line-by-line beyond these targeted pulls — noted as a scope limit; scores below rest on the quoted evidence found, not on unexamined files.

## Running notes

**AE101**

- M1 (`getting-going` + `orient-and-introspect` + `the-machine-you-just-met`): plants L1 ("The agent's self-report is a hypothesis, not ground truth" — Key Concepts) and L2 ("Your stance is the ceiling" — `painting-the-picture-with-the-llm`) as headlines. Plants L3 baseline (`compound-and-close`, "every push-back is a hint toward your own rules"). L4/L5 not yet present (L5 gets its 3-sentence "two frontiers" seed in `painting-the-picture-with-the-llm`).
- M2 (`plan-mode-done-right`): L4's axes appear unnamed via the shared `{{figure:delegation-frontier}}` canvas (per `the-gate-is-a-claim.md` maintainer block: "the M2 slide holds the name back so this one keeps the naming beat"). L3 restates (`extract-the-task-shaping-rule`, task-shaping rule extraction). L1/L2 carried, not developed.
- M3 (`earn-the-trust`): L1 restates via the ADR catch ("reasoned forward from the conversation, not from the filesystem" — referenced in `the-machine-you-just-met` maintainer block). L3 meaning-changes: skills now compound too, split from rules ("Skills carry the codebase's conventions; your rules file carries how you work" — Key Concepts). L2 restates via the skeptical-eye grill ("same-window self-audit under-flags").
- M4 (`run-the-first-experiment`): all four learnings carried, none meaningfully advanced in the module body itself; `ironies-of-automation` closes M4 on trust/vigilance (adjacent to L1/L4 but not the same claim).
- M5 (`learn-from-the-test` + `the-gate-is-a-claim`): L1 meaning-changes hard — "The check you built is itself a claim that wants verifying... Green is a claim about the check, not a fact about the work." L3 meaning-changes — verifier/reference/plan named as compounding that is "checked" not "loaded," a new shape. L4 fully named for the first time, with the bitter-lesson close ("Retire what the next model outgrows, add what it needs").
- M6 (`spot-gaps-build-the-loop` + `the-2-frontiers`): L3's biggest beat — explicit subtraction ("Cut one rule from `./CLAUDE.local.md` the diagnosis killed"; Big Idea: "Every gap you found belongs somewhere durable, or you will find it again next week"). L5 echoes M1 verbatim by design ("Echoes Module 1's 'Painting the picture' opener... The recurrence is the point"), answering nothing. L1/L2/L4 carried, not advanced.

**A101**

- M1 (`getting-going`): plants A ("Guardrails are structured context... The guardrail IS the control") and B ("Claude as cold critic... get an unbiased verdict") as headlines.
- M2 (`building-agent-systems` + `compounding`): A meaning-changes — context becomes memory with shelf life ("Context stops being something trapped in one conversation. It becomes memory the agent can re-read"). F plants fully formed ("A system is two things stacked: Persistence... Automation... Put them together and you get something that keeps getting better the more you feed it"), placed AFTER the exercise that produced the felt evidence ("You just did something a chat can't do").
- M3 (`multi-agent-systems`): C plants — "The unease you feel about the synthesized briefing is not something to close today. It stays." Mood target is explicitly "Unsettled competence." D advances (division architect, per the M6 arc-recap).
- M4 (`security`): C meaning-changes — "'I can't tell' is a real answer... Closing one takes evidence" institutionalizes the held doubt as a rubric, not just a feeling. B advances — "You can't tell if your agent is safe by looking at its output. You need a way to check. The discipline is running the check."
- M5 (`output-quality`): B meaning-changes hard — the benchmark/judge is built, "empirical method selection over authority." C explicitly refuses false closure — "This module is the rescue. Not full closure: your Module 3 doubt and your Module 4 residuals stay where they are." Mood contract: "Do NOT resolve M3's strategic uncertainty or M4's security residual."
- M6 (`evaluations` + `new-human-role-in-the-loop`): B/C payoff together — "The close is not 'trust the agent.' The close is 'trust the loop you can inspect.'" D gets its explicit name and the training's own arc-recap: "M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer."
- M7 (`personal-to-team`): E plants and is mostly confined here — "access is not absorption... you'll feel that gap yourself when your technical plan fills quickly and your people plan stalls on names." D advances (sharing = a role change, not just a technical act).
- M8 (`agents-building-agents`): F pays off — "The tool that builds tools compounds"; "Self-improvement: each cycle sharpens the next." D closes — "Humans contribute by talking in the room and by steering their agents at decision beats. They do not run the plumbing."

## Scores: AE101

| Learning | Depth | Forward-looking | Applicable | Self-challenging | Earned-not-announced |
|---|---|---|---|---|---|
| **1. Trust arc (self-report → gate is a claim)** | 60 — "The report is a hypothesis to check, not ground truth" (M1, `the-machine-you-just-met`) restated at M3's ADR catch, meaning-changes once at M5: "The check you built is itself a claim that wants verifying" (`the-gate-is-a-claim.md`) | 85 — M5 closes on the bitter lesson: "Retire what the next model outgrows, add what it needs" (`the-gate-is-a-claim.md`) — a standing instruction for when the model moves | 80 — spot-check governor stated M1 (`orient-and-introspect`, "Quote a specific file or function back") and used; M5's countermoves ("compare a handful of your own judgements... teach the judge until you converge") stated, not built by the student on record | 80 — the training doubts its own gate explicitly: "A gate nobody has verified is a gate trusted on vibes" (`the-gate-is-a-claim.md`) | 50 — M1 Key Concepts names the hypothesis-claim before the spot-check move runs; M5's meaning-change is named in the same closing lecture that builds the verifier, not earned a module ahead |
| **2. Stance is the ceiling (sycophancy mechanism)** | 40 — stated in two M1 lectures ("Your stance is the ceiling," `painting-the-picture-with-the-llm`; sycophancy mechanism, `the-machine-you-just-met`) with no confirmed cross-module meaning-change found | 15 — no forward framing beyond the unanswered "two frontiers" aside inside the same M1 lecture | 75 — "the mirror is steered by what you bring" (M1) operationalised at M2's push-back exercise and re-fires unprompted at M3's skeptical-eye grill ("ask Claude to over-flag... fresh-session it") | 60 — RLHF mechanism named as the machine's own failure mode: "Agreeable answers won the second round... matching you is what scored well in training" | 20 — announced at M1's opener, before any push-back exercise runs |
| **3. Compounding: durable + prune** | 85 — M1 baseline → M3 meaning-change (skills split from rules) → M5 meaning-change (verifier/plan as a "checked not loaded" compounding shape) → M6 meaning-change + payoff (explicit subtraction: "Cut one rule... the diagnosis killed") | 45 — tied loosely to M6's "two frontiers" opener ("Your frontier is what you have expressed. It moves when you write") but not argued as compounding's own forward claim | 90 — "integrate, don't append" governor re-fires at every module's compound/sharpen beat without being re-taught each time | 75 — self-charity named twice: "same-window self-audit under-flags" (M3), reused verbatim as the independence bullet's warrant (M5) | 60 — `the-machine-you-just-met` (Klaassen naming) is placed explicitly *after* Ex4, so the student ran the compound move before the term "compound engineering" attached to it, but within the same module |
| **4. Delegation frontier / bitter lesson** | 60 — axes shown unnamed at M2 (`when-a-plan-is-good`, per `the-gate-is-a-claim.md`'s own maintainer note: "the M2 slide holds the name back"), fully named with one meaning-change at M5 | 90 — the clearest forward-looking beat in AE101: "Today's right procedure... is superseded too. Retire what the next model outgrows, add what it needs" | 35 — the countermoves are explicitly deferred: "You do not need to build these today; ask your agent to walk you through the relevant one when you need it" (`the-gate-is-a-claim.md`) — no exercise operationalises it on record | 70 — "reckless autonomy" and "calibrated agency"... "From outside, the two look identical" is the training warning the student it can fool itself | 80 — the student meets the axes at M2 (unnamed) and only gets the name three modules later at M5 — real recognition-before-naming |
| **5. CANDIDATE — the open future / two frontiers** | 40 — restated twice (M1 opener, M6 opener) with **zero** meaning-change; M6's own lecture meta says explicitly: "Recognition pace... does not teach a new term" | 80 — genuinely forward and genuinely unresolved: "The model's frontier moves without you... Your frontier is what you have expressed... only then," echoed unanswered at M6 | 10 — no exercise, no governor, no student-facing move at all; the lecture's own backing block: "holds: nothing sourced, by design" | 5 — explicitly free of any counter-voice by design ("If this file ever acquires a sourced claim, it has stopped being what it is") | 10 — announced both times, before any work, never earned through a move |

## Scores: A101

| Learning | Depth | Forward-looking | Applicable | Self-challenging | Earned-not-announced |
|---|---|---|---|---|---|
| **A. Context makes it yours → shelf life** | 70 — M1 headline ("The guardrail IS the control") → M2 meaning-change ("Context stops being something trapped in one conversation. It becomes memory," `compounding.md`) → M7 meaning-change (context becomes a *shared* artifact: "share the context") | 15 — no real future framing | 90 — "guardrail is the control" reused as the operating pattern behind every module's Debrief rewrite of `./CLAUDE.md`, unprompted each time | 35 — little doubt cast on the mechanism itself; mostly empowering framing | 45 — M1 names it before the exercise (`Context is King` opens the module); M2's meaning-change is named in `compounding.md`, explicitly placed after Phase 3 ran ("you can't picture it from a description, you had to see it") |
| **B. Confident output ≠ verified output** | 85 — M1 headline (cold critic) → M4 meaning-change ("Certainty is a fantasy; the discipline is the answer") → M5 meaning-change (benchmark/judge built, "empirical method selection over authority") → M6 payoff ("trust the loop you can inspect," not the agent) | 20 — mostly present-tense verification, little forward claim | 90 — "propose, double-check, apply" (M5) is stated and then literally re-run as M6's eval-loop exercise without re-teaching | 80 — `when-the-score-stops-moving.md` (M6) is named in the maintainer notes as "naming what the judge can't see" — the training doubting its own check on the record | 55 — M1's cold-critic move is exercised inside the Debrief, but the naming ("You are the world's best evaluator of your own profile") sits in the same module's Key Concepts, in the closer |
| **C. Certainty is unavailable; the loop replaces it, doubt held not closed** | 90 — M3 plants ("The unease you feel... is not something to close today. It stays") → M4 meaning-change ("'I can't tell' is a real answer") → M5 meaning-change, explicit refusal of false closure ("This module is the rescue. Not full closure") → M6 payoff | 75 — Mollick pre-read frames the open question directly at M6's open: "Mollick does not call the winner. Neither does this training" | 90 — "I can't tell" is a literal rubric column used at M4 and echoed at M5's judge ("Known limit:" line) and M6 | 90 — the curriculum states its own non-resolution on the record repeatedly: "Nothing today resolves it. That's the curriculum" (M4); mood contract explicitly bans resolving M3/M4 at M5 | 70 — M3's mood target ("Unsettled competence") is felt before M4 names the doctrine that formalises it |
| **D. The human moves one level up** | 95 — six-beat arc, one per module, stated by the training itself: "M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer" (`new-human-role-in-the-loop.md`), extended to M7 (sharing) and M8 (decision layer) | 65 — M6 closes on an open question ("have you designed the loop that would make sending it responsible?") that is not resolved, but no stated falsifier for the training's own stance | 90 — the autonomy ladder / "which rung has this earned" governor is stated at M5 and reused unprompted at M6, M7, M8 | 70 — M6 explicitly critiques the earlier posture: "That works for one mail. It does not work for a system" | 75 — the six-module arc is lived before `new-human-role-in-the-loop.md` names it at M6's close; partially undercut by per-module Big Idea lines that pre-announce each local role shift |
| **E. Access is not absorption** | 30 — stated once with in-module elaboration (Key Concepts restates "Access is easy; absorption is scarce"); no confirmed return or payoff at M8 | 5 — no forward framing | 60 — the technical-plan / people-plan split is a real governor, built once in the M7 exercises, not confirmed to re-fire at M8 | 40 — "name the likely adoption failure... including the social failure that's hardest to see" is a real caveat against the learning's own optimism | 25 — "Hold that feeling. It's not a governance question yet" announces the frame before the interview exercise runs |
| **F. Systems compound (persistence + automation → flywheel)** | 90 — M2 headline+mechanism → M6 meaning-change (automation runs unattended: "walk-away autonomy") → M8 meaning-change + payoff ("The tool that builds tools compounds," braided directly with D at the close) | 55 — M8's `## Next` is explicitly open-ended: "you leave with a flywheel, not a graduation," naming the next step without saying what would change course | 90 — "persistence + automation = system" (M2 Key Concept) is the literal build pattern reused unprompted at M6 and M8 | 45 — some self-doubt at M8 ("This is a self-audit of a live agent round. Convenient, not neutral") but mostly triumphant framing | 65 — `compounding.md` is placed after Phase 3 already produced the felt evidence: "Not the ingestion... The thing you did that a chat can't do is Phase 3" |

## Progression

Cumulative depth rung after each module (module order; unchanged rungs carried forward).

**AE101** (M1–M6 = prework/getting-going, plan-mode-done-right, earn-the-trust, run-the-first-experiment, learn-from-the-test, spot-gaps-build-the-loop)

| Learning | M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|---|
| 1. Trust arc | 20 | 20 | 40 | 40 | 60 | 60 |
| 2. Stance is ceiling | 20 | 40 | 40 | 40 | 40 | 40 |
| 3. Compounding+prune | 20 | 20 | 40 | 40 | 60 | 85 |
| 4. Delegation frontier | 0 | 40 | 40 | 40 | 60 | 60 |
| 5. Two frontiers (candidate) | 20 | 20 | 20 | 20 | 20 | 40 |

**A101** (M1–M8 = getting-going, building-agent-systems, multi-agent-systems, security, output-quality, evaluations, personal-to-team, agents-building-agents)

| Learning | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 |
|---|---|---|---|---|---|---|---|---|
| A. Context→memory | 20 | 60 | 60 | 60 | 60 | 60 | 70 | 70 |
| B. Confident≠verified | 20 | 20 | 20 | 40 | 70 | 85 | 85 | 85 |
| C. Certainty held | 0 | 0 | 40 | 60 | 70 | 90 | 90 | 90 |
| D. Human moves up | 20 | 40 | 55 | 65 | 75 | 95 | 95 | 95 |
| E. Access≠absorption | 0 | 0 | 0 | 0 | 0 | 0 | 40 | 40 |
| F. Systems compound | 20 | 60 | 60 | 60 | 60 | 80 | 80 | 90 |

## Balance

**AE101** (over 5 learnings, including the candidate)
- Depth: mean 57, spread 45 (85 − 40)
- Forward-looking: mean 63, spread 75 (90 − 15)
- Applicable: mean 58, spread 80 (90 − 10)
- Self-challenging: mean 58, spread 75 (80 − 5)
- Earned-not-announced: mean 44, spread 70 (80 − 10)
- Carry share: top learning (3, depth 85) ÷ sum of depths (285) = **30%**

**A101** (over 6 learnings)
- Depth: mean 77, spread 65 (95 − 30)
- Forward-looking: mean 39, spread 70 (75 − 5)
- Applicable: mean 85, spread 30 (90 − 60)
- Self-challenging: mean 60, spread 55 (90 − 35)
- Earned-not-announced: mean 56, spread 50 (75 − 25)
- Carry share: top learning (D, depth 95) ÷ sum of depths (460) = **21%**

## Where the numbers disagree with the reads

- **AE101 L2 (stance is the ceiling)** — likely read as foundational/strong by the cold reads (it's the training's opening reframe and gets two full M1 lectures). Depth scores only 40: no confirmed cross-module meaning-change after M1. Quote that decides it: nothing in M2–M6 restates "your stance is the ceiling" with new meaning; the closest is the skeptical-eye grill at M3, which is a *technique* callback (push harder), not a development of the stance-ceiling claim itself.
- **AE101 L4 (delegation frontier)** — a "★ backbone law" per the maintainer notes, likely read as heavily applied. Applicable scores only 35: the training explicitly declines to make the student build any of the three countermoves — "You do not need to build these today; ask your agent to walk you through the relevant one when you need it" (`the-gate-is-a-claim.md`).
- **A101 E (access is not absorption)** — one of the most quotable lines in either training, plausibly read as a headline learning. It scores lowest across the board (Depth 30, Forward 5, Self-challenging 40): it is stated and elaborated once, at M7, with no confirmed plant earlier or payoff at M8. Quote that decides it: "access is not absorption" and its Key Concepts restatement both live only in `personal-to-team.md`.
- **A101 Forward-looking generally** (mean 39) — a training that opens M6 with Mollick's unresolved bitter-lesson question might read as consistently forward-facing, but only C carries that quality (75); A, B, E score at or near floor.

## Smallest moves

- Add one callback line to M8 naming "access is not absorption" against the flywheel's own rollout — the single biggest lever on E's Depth cell (30 → plausible 60).
- Give A ("context makes it yours") one counter-voice or named failure mode — currently the lowest Self-challenging cell (35) in either training's non-candidate set, with no beat showing the guardrail mechanism failing.
- Add one sentence to `new-human-role-in-the-loop.md`'s closing question naming what would change the training's own stance on where the human belongs — would move D's Forward-looking (65) toward the top anchor without adding a new beat.

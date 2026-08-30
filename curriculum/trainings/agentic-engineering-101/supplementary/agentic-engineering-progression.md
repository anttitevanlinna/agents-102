# The agentic engineering progression

Agentic engineering is the discipline of progressively extending an engineer's reach with AI. The engineer remains the active party: choosing what to attempt, shaping the conditions, judging the result, and deciding what the system should learn.

## Part 1: The progression

Six levels, from assistance to a system you keep improving. Each level holds until it exposes the constraint the next one removes: what moves an engineer up is not ambition, it is a limit met in real work.

Fredrik Wollsén and Jesse McCrosky describe a similar team-scale movement in [The AI-Native Engineering Playbook: Crawl, Walk, Run, Fly](https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook). Their labels differ. The recurring progression is from using the agent inside one task to engineering the conditions behind many tasks.

## Assistance

AI helps with work already on your desk. It completes a function, explains a file, drafts a test. You stay beside it, supplying context and correcting each move, and you read everything before you use it.

**Moves you up:** the agent can act, not just answer, and carrying each suggestion into the code by hand is the slow part. The door is trust at one edit's scope, held by your own eyes and a test run. The way up is letting it edit a file and run the tests while you watch.

## Interactive work

One conversation, one task. The agent reads the code, proposes a change, and acts; you steer each step and watch the result land. Working side by side is where trust starts: you see what it gets right without you, and what it should never be left alone with. It is also where you return on an unfamiliar codebase.

**Moves you up:** once observed competence covers a whole task shape, standing beside every step is the expensive part. The door is trust across that whole shape, held by the task's conditions and its done-evidence instead of by your presence. The way up is handing one outcome over and judging what comes back.

## Delegating bounded outcomes

You hand over an outcome, not a step: the agent reads the repository, makes the change, runs the checks, and returns a diff. You have not left engineering. You have widened what you engineer: the task, the conditions around it, and the evidence that says it is done. Durable files let a handoff stretch longer, and verification lets it stretch farther without losing control.

**Moves you up:** a delegated task leaves you waiting, and waiting is capacity. The door is trust that survives your absence, held by durable files an agent can read cold and checks that run without you. The way up is shaping a second task and starting it beside the first.

## Directing parallel sessions

Once one task runs without your constant attention, another runs beside it. Worktrees separate the changes, durable files carry the context, and checks establish what deserves to survive. You direct several sessions rather than one conversation.

**Moves you up:** parallelism demands coordination, and the coordination repeats: the same handoffs, the same checks, the same merge discipline. The door is trust in the recurring task itself, held by a check you wrote into it. The way up is writing one loop down and letting a session run it.

## Encoding checked loops

Recurring work becomes a loop with its own checks: the task shape is written down, the gate that judges the result is part of it, and a session can run it end to end. You review outcomes instead of keystrokes.

**Moves you up:** a working loop no longer improves when you prompt harder; it improves when its surroundings do. The door is trust in the gates' own verdicts, held by calibration, the checking of the checks. The way up is working on the surroundings: the rules, the memory, the checks every session starts from.

## Improving the system

You improve the files, memory, skills, and verification that make every subsequent session stronger. Every fix that becomes a rule and every check that becomes a gate raises the floor of all future work. The limit keeps moving outward too: eventually it is what you can review, and what your team can absorb.

The measure is not maximum delegation. It is knowing what to delegate, how far to let it run, and what evidence to demand.

## Part 2: The leverage model

{{figure:delegation-frontier}}

- **Reach** is how much you delegate: the size of the task and the distance between checks.
- **Calibration** is whether trust in the result was earned by a check you have verified.
- High reach splits on calibration. Measured gates produce calibrated agency. Unmeasured green produces reckless autonomy.
- The frontier moves outward only as fast as the gates behind it. Push reach past calibration and you are checking less, not delegating more.

At the high-reach edge, scale makes the distinction visible. In August 2026, Wollsén wrote in [This is getting ridiculous: I shipped 490 pull requests in June](https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped) that he kept 30 to 40 sessions open and actively managed 10 to 15 through a working day. By his own estimate, the value his four-engineer team delivered ran far below what its pull-request count alone would suggest: he kept output volume and delivered value on separate axes.

Leverage is not reach alone. It is reach that measured trust can keep up with.

## One model, not two

The progression and the leverage model describe the same thing. Every **Moves you up:** is a check getting cheap enough to license more reach, so the levels are calibration states, not ranks. Read the doors again: the same trust every time, at a larger scope, held by a check that needs less of you. That is why an unfamiliar codebase sends you down a level, and why moving down is the model working.

<!-- maintainer -->

**Time:** ~5 min.

**Meta:** *AE101 supplementary. Part 1 gives the engineer-active progression, one slide per level, each closing on a `**Moves you up:**` constraint. Part 2 gives the leverage model. First linked from M1's pre-reads; linked again from M4's `## Prework` section.*

**Role:** Names a recurring progression in how engineers use AI, then gives the calibrated delegation frontier for reasoning about leverage. The engineer remains the actor throughout.

**Placement:** Primary link from M1 (`getting-going.md`) under `## Pre-reads before Module 2`. Reappears at the start of M4 (`run-the-first-experiment.md`) as an optional forward look.

**Voice:** Direct, compact, engineer-active. Each level slide states the work in second person and closes on the constraint that opens the next level; the leverage model gets the page's only diagram.

<!-- backing -->

Claims
- `engineer-expands-reach` · vision · "progressively extending an engineer's reach with AI" ← none-owed
- `engineer-remains-active` · vision · "The engineer remains the active party" ← none-owed
- `engineer-active-progression` · vision · "AI helps with work already on your desk. … You direct several sessions rather than one conversation. … You improve the files, memory, skills, and verification that make every subsequent session stronger." ← none-owed
- `constraint-chain` · vision · "Each level holds until it exposes the constraint the next one removes" ← none-owed
- `measure-not-maximum-delegation` · vision · "The measure is not maximum delegation. It is knowing what to delegate, how far to let it run, and what evidence to demand." ← none-owed
- `playbook-team-progression` · detail · "a similar team-scale movement ... from using the agent inside one task to engineering the conditions behind many tasks" ← fred-ai-native-playbook
- `reach-definition` · vision · "**Reach** is how much you delegate: the size of the task and the distance between checks." ← none-owed
- `calibration-definition` · vision · "**Calibration** is whether trust in the result was earned by a check you have verified." ← none-owed
- `high-reach-splits` · vision · "Measured gates produce calibrated agency. Unmeasured green produces reckless autonomy." ← none-owed
- `frontier-follows-gates` · vision · "The frontier moves outward only as fast as the gates behind it" ← none-owed
- `wollsen-parallel-session-account` · detail · "he kept 30 to 40 sessions open and actively managed 10 to 15 through a working day" ← fred-throughput-account
- `wollsen-value-estimate` · detail · "the value his four-engineer team delivered ran far below what its pull-request count alone would suggest" ← fred-throughput-account
- `leverage-reach-and-trust` · vision · "Leverage is not reach alone. It is reach that measured trust can keep up with." ← none-owed
- `one-model-not-two` · vision · "Every **Moves you up:** is a check getting cheap enough to license more reach, so the levels are calibration states, not ranks." ← none-owed
- `doors-are-trust-at-scope` · vision · "the same trust every time, at a larger scope, held by a check that needs less of you" ← none-owed

Sources
- fred-ai-native-playbook `[checked:2026-08-08 result:OK due:2026-09-04]` https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook — [practitioner direct, commercial interest] Wollsén and McCrosky's March 2026 account supplies the Crawl/Walk/Run/Fly sequence and the moves summarized in body: agent in repo, agent-readable context and routines, then parallel orchestration. fallback: remove the stage labels and retain the engineer-active synthesis.
- fred-throughput-account `[checked:2026-08-08 result:OK due:2027-02-06]` https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped — [practitioner direct, commercial interest] Wollsén's August 2026 production account supplies the 30–40 open sessions and 10–15 actively managed sessions figures, plus the volume-vs-value caution the body paraphrases number-free. His three-to-four-times value self-estimate is quarantined (`observations/wollsen-fredrik.md` § Numbers that must not be carried: self-estimate, no axis) and stays out of body. fallback: remove the numbers and retain the qualitative constraint that parallel output can outrun organizational absorption.

Frameworks
- Engineer-active progression · [borrow:none] · ← none — owned synthesis; a recurring sequence, not a rank assigned to a person
- Calibrated delegation frontier · [borrow:none] · law:calibrated-delegation-frontier · ← none — duplicated from the canonical M5 lecture; reach expands while calibration holds
- Crawl, Walk, Run, Fly · [borrow:none] · ← fred-ai-native-playbook — Wollsén and McCrosky's progression is credited in body and used as corroboration, not adopted as the page's maturity ladder

Stance `[stance:2026-08-08 level:L1]`
- holds: the engineer-active progression is an owned synthesis over moves taught in AE101 and corroborated by Wollsén and McCrosky's practitioner progression. It is a causal model, not a maturity score or a claim that every engineer follows the same sequence.
- contested: the sequence compresses several branches into one order. Parallel sessions and recurring loops can arrive in either order. The page claims that each gain exposes a new constraint, not a universal chronology.
- would-move-it: practitioner accounts showing a recurring intermediate stage the progression cannot explain, or evidence that greater reach predicts better outcomes regardless of calibration.

OODA
- question: does the engineer-active progression still explain what practitioners report as reach, parallel capacity, and system improvement change?
- roster: Wollsén and McCrosky's playbook, Wollsén's production follow-up, and the canonical delegation-frontier lecture.
- last-run: 2026-08-08

<!-- /backing -->
**Watch-fors (delivery):**
- Part 1 is one slide per level (Antti-directed 2026-08-14). Each slide carries the level's substance and ends with a `**Moves you up:**` seam in three beats (Antti-directed 2026-08-19): the limit met in real work, then a `The door is trust …, held by <holder>` sentence, then a `The way up is …` sentence naming the concrete move. The door is always the level of control, calibration and trust earned — never the artifact; the artifact (eyes and a test run, the packaged done-evidence, durable files, a written check, calibrated gates) is the HOLDER of that control, named after `held by`. The closing slide's "Read the doors again" sentence depends on every door staying trust-shaped. Keep the levels describing work, and keep each seam naming a limit and a trust state, never a rank or a score.
- Part 2 owns the leverage model. Do not add a module-by-module explanation around it.
- The closing slide names the Part 1 ↔ Part 2 identity: each `**Moves you up:**` is calibration licensing reach, and levels can be lost. It stays short, stays LAST, and the level slides carry only quiet clues toward it (the "you read everything" echo of the diagram's low-reach label, the return-on-unfamiliar-codebase line, the second-task-shaped-well-enough clause). Do not spell the connection out inside Part 1; the reveal is the smart reader's to make first.
- The diagram is a deliberate duplicate of `curriculum/lectures/the-gate-is-a-claim.md`; keep the model and labels synchronized.
- This page deliberately gives away M5's delegation-frontier reveal. Repetition can teach better than preserving one big reveal; M5 deepens and operationalizes the model rather than depending on first exposure.
- The progression describes how work is organized, not a score assigned to the person. Session count and autonomy are inputs, not levels.
- Keep shortcut framing out of the student-facing body.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@e11bbeb4 technical@17446703 behavior@670460b pedagogy@1abb84c6 strategy@670460b slides@17446703)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS

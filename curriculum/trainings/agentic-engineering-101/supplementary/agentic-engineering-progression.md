# The agentic engineering progression

Agentic engineering is the discipline of progressively extending an engineer's reach with AI. The engineer remains the active party: choosing what to attempt, shaping the conditions, judging the result, and deciding what the system should learn.

## Part 1: The progression

Six levels, from assistance to a system you keep improving. Each level holds until it exposes the constraint the next one removes: what moves an engineer up is not ambition, it is a limit met in real work.

Fredrik Wollsén and Jesse McCrosky describe a similar team-scale movement in [The AI-Native Engineering Playbook: Crawl, Walk, Run, Fly](https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook). Their labels differ. The recurring progression is from using the agent inside one task to engineering the conditions behind many tasks.

## Assistance

AI helps with work already on your desk. It completes a function, explains a file, drafts a test. You stay beside it, supplying context and correcting each move, and you read everything before you use it.

**Moves you up:** the agent can act, not just answer. The first time you let it edit a file and run the tests while you watch, the work has a second pair of hands in it.

## Interactive work

One conversation, one task. The agent reads the code, proposes a change, and acts; you steer each step and watch the result land. Working side by side is where trust starts: you see what it gets right without you, and what it should never be left alone with. It is also where you return on an unfamiliar codebase.

**Moves you up:** trust enables delegation. Once observed competence covers a whole task shape, standing beside every step is the expensive part.

## Delegating bounded outcomes

You hand over an outcome, not a step: the agent reads the repository, makes the change, runs the checks, and returns a diff. You have not left engineering. You have widened what you engineer: the task, the conditions around it, and the evidence that says it is done.

**Moves you up:** durable context lets a handoff stretch longer, and verification lets it stretch farther without losing control. A delegated task also leaves you waiting, and waiting is capacity.

## Directing parallel sessions

Once one task runs without your constant attention, another runs beside it, if you have a second task shaped well enough to hand over. Worktrees separate the changes, durable files carry the context, and checks establish what deserves to survive. You direct several sessions rather than one conversation.

**Moves you up:** parallelism demands coordination: handoffs, checks, merge discipline. The work of running the sessions starts to repeat, and repetition reveals what belongs in a loop.

## Encoding checked loops

Recurring work becomes a loop with its own checks: the task shape is written down, the gate that judges the result is part of it, and a session can run it end to end. You review outcomes instead of keystrokes.

**Moves you up:** a working loop shifts the question. It no longer improves when you prompt harder; it improves when its surroundings do.

## Improving the system

You improve the context, memory, skills, and verification that make every subsequent session stronger. Every fix that becomes a rule and every check that becomes a gate raises the floor of all future work. The limit keeps moving outward too: eventually it is what you can review, and what your team can absorb.

The measure is not maximum delegation. It is knowing what to delegate, how far to let it run, and what evidence to demand.

## Part 2: The leverage model

<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="A two-by-two map of delegated work. Horizontal axis: reach, how much you hand off. Vertical axis: calibration, whether trust was earned by a measured gate. Four states: chat-shaped work bottom-left, controlled assistance top-left, reckless autonomy bottom-right, calibrated agency top-right. A dashed ochre curve labelled the frontier rises from low reach at low calibration to high reach at high calibration, and moves outward as fast as the gates behind it." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<rect x="12" y="12" width="1176" height="536" fill="none" stroke="#d6c8a3" stroke-width="1" opacity="0.9"/>
<rect x="650" y="270" width="500" height="200" fill="rgba(138,58,42,0.05)"/>
<g stroke="#d6c8a3" stroke-width="1" stroke-dasharray="2 8" opacity="0.8">
<line x1="650" y1="70" x2="650" y2="470"/>
<line x1="150" y1="270" x2="1150" y2="270"/>
</g>
<g stroke="#786c56" stroke-width="1.6" stroke-linecap="round">
<line x1="150" y1="470" x2="1140" y2="470"/>
<line x1="150" y1="470" x2="150" y2="80"/>
</g>
<g fill="#786c56">
<polygon points="1150,470 1138,464 1138,476"/>
<polygon points="150,70 144,82 156,82"/>
</g>
<text x="650" y="505" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56">REACH · HOW MUCH YOU HAND OFF →</text>
<text x="125" y="270" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56" transform="rotate(-90 125 270)">CALIBRATION · TRUST, MEASURED ↑</text>
<g text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="12.5" letter-spacing="2">
<text x="400" y="150" fill="#2f6b6b">CONTROLLED ASSISTANCE</text>
<text x="400" y="400" fill="#2f6b6b">CHAT-SHAPED WORK</text>
<text x="800" y="150" fill="#2f6b6b">CALIBRATED AGENCY</text>
<text x="960" y="400" fill="#8a3a2a">RECKLESS AUTONOMY</text>
</g>
<g text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234">
<text x="400" y="168">small handoffs, tight review</text>
<text x="400" y="418">you read everything</text>
<text x="800" y="168">big handoffs, gates and checks you trust</text>
<text x="960" y="418">big handoffs, green you took on faith</text>
</g>
<path d="M 480,470 C 640,420 760,330 850,240 S 980,120 1020,70" fill="none" stroke="#a05a2c" stroke-width="2.4" stroke-dasharray="7 7" opacity="0.85"/>
<text x="935" y="205" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" letter-spacing="2.5" fill="#a05a2c" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">THE FRONTIER</text>
<text x="935" y="221" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">moves as fast as the gates behind it</text>
<line x1="880" y1="250" x2="945" y2="250" stroke="#a05a2c" stroke-width="1.8" stroke-linecap="round"/>
<polygon points="955,250 943,244 943,256" fill="#a05a2c"/>
<text x="650" y="533" text-anchor="middle" font-family="EB Garamond, Georgia, serif" font-style="italic" font-size="15.5" fill="#4a4234">The frontier: the largest task you can hand off, well designed, enough unclarity removed.</text>
<text x="1176" y="36" text-anchor="end" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9" letter-spacing="2" fill="#8a3a2a">TWO AXES · FOUR STATES</text>
</svg>
</figure>

- **Reach** is how much you delegate: the size of the task and the distance between checks.
- **Calibration** is whether trust in the result was earned by a gate you have verified.
- High reach splits on calibration. Measured gates produce calibrated agency. Unmeasured green produces reckless autonomy.
- The frontier moves outward only as fast as the gates behind it. Push reach past calibration and you are checking less, not delegating more.

At the high-reach edge, scale makes the distinction visible. In August 2026, Wollsén wrote in [This is getting ridiculous: I shipped 490 pull requests in June](https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped) that he kept 30 to 40 sessions open and actively managed 10 to 15 through a working day. He estimated his four-engineer team delivered three to four times the value of an average team, far below the multiple suggested by its pull-request count.

Leverage is not reach alone. It is reach that trust can keep up with.

## One model, not two

The progression and the leverage model describe the same thing. Every **Moves you up:** is a check getting cheap enough to license more reach, so the levels are calibration states, not ranks. That is why an unfamiliar codebase sends you down a level, and why moving down is the model working.

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
- `engineer-active-progression` · vision · "AI helps with work already on your desk. … You direct several sessions rather than one conversation. … You improve the context, memory, skills, and verification that make every subsequent session stronger." ← none-owed
- `constraint-chain` · vision · "Each level holds until it exposes the constraint the next one removes" ← none-owed
- `measure-not-maximum-delegation` · vision · "The measure is not maximum delegation. It is knowing what to delegate, how far to let it run, and what evidence to demand." ← none-owed
- `playbook-team-progression` · detail · "a similar team-scale movement ... from using the agent inside one task to engineering the conditions behind many tasks" ← fred-ai-native-playbook
- `reach-definition` · vision · "**Reach** is how much you delegate: the size of the task and the distance between checks." ← none-owed
- `calibration-definition` · vision · "**Calibration** is whether trust in the result was earned by a gate you have verified." ← none-owed
- `high-reach-splits` · vision · "Measured gates produce calibrated agency. Unmeasured green produces reckless autonomy." ← none-owed
- `frontier-follows-gates` · vision · "The frontier moves outward only as fast as the gates behind it" ← none-owed
- `wollsen-parallel-session-account` · detail · "he kept 30 to 40 sessions open and actively managed 10 to 15 through a working day" ← fred-throughput-account
- `wollsen-value-estimate` · detail · "three to four times the value of an average team, far below the multiple suggested by its pull-request count" ← fred-throughput-account
- `leverage-reach-and-trust` · vision · "Leverage is not reach alone. It is reach that trust can keep up with." ← none-owed
- `one-model-not-two` · vision · "Every **Moves you up:** is a check getting cheap enough to license more reach, so the levels are calibration states, not ranks." ← none-owed

Sources
- fred-ai-native-playbook `[checked:2026-08-08 result:OK due:2026-09-04]` https://positivelyfred.substack.com/p/the-ai-native-engineering-playbook — [practitioner direct, commercial interest] Wollsén and McCrosky's March 2026 account supplies the Crawl/Walk/Run/Fly sequence and the moves summarized in body: agent in repo, agent-readable context and routines, then parallel orchestration. fallback: remove the stage labels and retain the engineer-active synthesis.
- fred-throughput-account `[checked:2026-08-08 result:OK due:2027-02-08]` https://positivelyfred.substack.com/p/this-is-getting-ridiculous-i-shipped — [practitioner direct, commercial interest] Wollsén's August 2026 production account supplies the 30–40 open sessions, 10–15 actively managed sessions, and his own three-to-four-times value estimate. The body keeps PR volume and estimated delivered value on separate axes. fallback: remove the numbers and retain the qualitative constraint that parallel output can outrun organizational absorption.

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
- Part 1 is one slide per level (Antti-directed 2026-08-14). Each slide carries the level's substance and ends with a `**Moves you up:**` line naming the constraint that opens the next level; the constraint chain lives in those closing lines, not in a separate paragraph. Keep the levels describing work, and keep each `**Moves you up:**` naming a limit met in real work, never a rank or a score.
- Part 2 owns the leverage model. Do not add a module-by-module explanation around it.
- The closing slide names the Part 1 ↔ Part 2 identity: each `**Moves you up:**` is calibration licensing reach, and levels can be lost. It stays short, stays LAST, and the level slides carry only quiet clues toward it (the "you read everything" echo of the diagram's low-reach label, the return-on-unfamiliar-codebase line, the second-task-shaped-well-enough clause). Do not spell the connection out inside Part 1; the reveal is the smart reader's to make first.
- The diagram is a deliberate duplicate of `curriculum/lectures/the-gate-is-a-claim.md`; keep the model and labels synchronized.
- This page deliberately gives away M5's delegation-frontier reveal. Repetition can teach better than preserving one big reveal; M5 deepens and operationalizes the model rather than depending on first exposure.
- The progression describes how work is organized, not a score assigned to the person. Session count and autonomy are inputs, not levels.
- Keep shortcut framing out of the student-facing body.

**Quality:** compendium-audited 2026-08-09 (writing@670460b story@670460b technical@670460b behavior@670460b pedagogy@670460b strategy@670460b slides@670460b)
- judges @670460b: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

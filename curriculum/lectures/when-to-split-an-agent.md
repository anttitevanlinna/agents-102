# Lecture: How agents work together

Six agents worked on one question in this module. Three searched, three decided. None of them talked to each other. They handed off through shared files.

## Agents hand off through shared files

Each agent writes what it found to a file. The next agent reads the file, not the other agent's mind: `sources/` held the search, `module-3/stances/` held the three takes, `crux.md` holds the answer.

A file can be read later: by you, by another agent, by next week's run. A conversation between agents cannot.

## Split the work, run it in parallel

Split the problem where its parts differ: a different source, a different dialect, a different stance. Give each part its own agent. Bring the parts back to one place that decides.

Three agents searched in parallel. Three argued from different seats. One session applied the kernel and committed.

## Two ways to run a team

**Separate sessions.** Each agent keeps its own context, tools and clock. You see each one work and can step into one without confusing the others.

**Helper agents in one session.** Quick parallel thinking with a bounded return. The main session starts each helper, gives it one job, and discards it when its file comes back.

## A framework makes it pick

Without a framework, the synthesizer summarises three views, evenly weighted.

Hand the synthesizer the strategy kernel (diagnosis, guiding policy, coherent actions). The synthesizer then commits to one diagnosis and drops what does not serve it.

## Handoffs are where work gets lost

Every split creates a handoff, and handoffs are where work goes wrong. A retriever finds two numbers and the curator keeps one. A source's internal shorthand is rewritten in public tone and loses its meaning.

Open the files where one agent handed to the next. An error made there stacks through the steps after it.

## Split for a reason

Not every job needs a team. Could one prompt produce the same quality? Then write that one prompt.

Split where the parts cannot be one agent: different access, a different dialect, a different stance. One agent per recurring workflow; a team only where the workflow divides.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS, slides PASS

**Decision note 2026-11-13 (Antti: M3's real aims are how multiple agents work together, divide and conquer, plus a home for goals that fit nowhere else).** Lecture retitled *How agents work together*; slides: shared-file handoffs, split and run in parallel, two ways to run a team, a framework makes it pick, handoffs are where work gets lost, split for a reason. Start-with-don't and the three split criteria are now one caveat slide (`## Split for a reason`); the slide files `start-with-dont` and `split-when-they-cant-be-one` are no longer included here. Wording calls: no "hire", no "meeting room"; agent terms. Big Idea stated cold against the new strategy line: 60 → 74 (lean scorer, n=24 each).

**Time:** 8 minutes.

**Placement in module:** After the exercises, before the Debrief. The exercises run both shapes; the lecture names how they worked together and where the handoffs break.

<!-- backing -->

Claims
- `the-unit-is-the-recurring-workflow` · vision · "The unit is the recurring workflow." ← none-owed
- `agents-hand-off-through-shared-files` · vision · "The next agent reads the file, not the other agent's mind" ← none-owed
- `split-where-parts-cannot-be-one` · vision · "Split where the parts cannot be one agent: different access, a different dialect, a different stance." ← none-owed
- `handoffs-are-where-work-gets-lost` · vision · "Every split creates a handoff, and handoffs are where work goes wrong." ← none-owed

Sources
(none. Every claim is a Bosser design stance about how many agents a workflow wants. No practitioner count, no measured result, and none should be invented for it.)

Frameworks
- One agent per recurring workflow · [borrow:none] · law:none · ← none — **Bosser stance.** Anti-mega-agent and anti-proliferation in the same breath: across workflows many agents, within a workflow usually one
- Principle of least coordination · [borrow:security engineering] · law:none · ← cultural-vocab — energy borrowed from least-privilege, applied to agent count
- Ship less, ship better · [borrow:none] · law:none · ← cultural-vocab — Godin, applied to agent count rather than features
- Requisite variety · [borrow:cybernetics] · law:requisite-variety · ← cultural-vocab — the three split criteria are three kinds of variety one agent cannot hold

Stance `[stance:2026-08-01 level:L0]`
- holds: nothing that anyone else has published. **This lecture is a house position stated as a house position, and that is the straight reading** — its three split criteria and its start-with-don't default are ours, argued from design rather than from evidence. `L0` records that plainly rather than dressing a stance as a finding.
- contested: agent-count guidance generally, which is one of the noisier corners of the field and full of vendor architecture diagrams. The lecture's value is having a default at all; most published advice does not commit to one.
- would-move-it: practitioners publishing agent-count patterns that contradict start-with-don't — particularly evidence that multi-agent decomposition inside one workflow pays more often than it costs. That would invert the default rather than adjust it.

OODA
- question: is there published practitioner evidence on when multi-agent decomposition inside a single workflow actually pays?
- roster: Anthropic multi-agent research posts, Dex Horthy and HumanLayer, Simon Willison, Kieran Klaassen, Geoffrey Huntley
- last-run: 2026-08-01

<!-- /backing -->
**Philosophy callout (sparing):**
- Belief #5 — don't make general what you don't practice yourself — lands implicitly. The "start with don't" default is the practitioner voice: the people who've done multi-agent the most are the ones who know when not to.

**Deferred facilitator notes:**
- Watch-for the over-enthusiast. Someone in the room will want to split every workflow. Name it from the front: *"I predict two of you will go back and split something on Monday that should have stayed one agent. That's fine — you'll notice the coordination cost and pull it back together. Just try to notice within a day, not a month."*
- The "three tests" framing is deliberately spartan — three is the memorable number. Don't expand to five.
- Tie to the exercise's unease: Module 3 is about noticing, not fixing. This lecture names *when* to reach for multi-agent; Module 5 names *how well* any agent output is actually landing. Different questions, sequenced deliberately.
- Variant note: Mid-Management edition of this training can keep the whole lecture verbatim; the "your team will ask you" framing becomes literal rather than illustrative.

# Lecture: When to split an agent (and how)

You split an agent two ways: three retrievers in separate windows, three stances inside one session. Your team will ask: *when do I split, and how?*

## The unit is the recurring workflow

Build one agent per recurring workflow: a single `.md` file, guardrailed for that job. A mega-agent that does everything drifts in scope, and nobody can tell what it is responsible for. A hundred tiny agents cost more to coordinate than they save.

Within one workflow, when does splitting into multiple agents pay?

[Start with don't](slides/start-with-dont.md)

[Split when they can't be one](slides/split-when-they-cant-be-one.md)

## More agents is not more rigour

Split for a reason, not because "three is more thorough": more agents means more prompts to tune, more noise, more coordination cost. More input does not fix a beige answer either. The synthesizer had three stances in front of it and could not choose.

## A framework makes it pick

Three stances give you a spread of views, and a spread is not an answer. Without a spine, the synthesizer summarises: three views, evenly weighted, nobody chose.

Hand it the strategy kernel (diagnosis, guiding policy, coherent actions). It then commits to one diagnosis and drops what does not serve it. The stances bring the variety. The frame brings the choice.

## The test that catches the bluff

Could one prompt produce the same quality of output? If yes, write that one prompt. Single-agent is the default; split only when one prompt cannot.

## Two options, each with its own territory

Pick an option once you split.

**Separate sessions (the Phase 1 move).** Pick this when each agent needs its own context, tools and clock. Separate windows let you see each agent work and intervene in one without confusing the others.

**Helper agents in one session (the Phase 2 move).** Pick this when the main session wants quick parallel thinking and a bounded return. The three stances each had a single job, a clean instruction and no long-lived state; they reported back as files and disappeared. The main session stays in charge.

## Other agents are part of the tool surface

Other agents are part of the tool surface: one agent can call a different stance, source zone, or working style.

**Pick:** Sessions when you want each agent to stay alive for a while. Helper agents when you want them in and out. Different tools: sessions; shared tools: helper agents.

## Seams are where it fails

Splitting creates handoffs, and handoffs are where work goes wrong. A retriever finds two numbers and the curator keeps one. A source's internal shorthand is rewritten in public tone and loses its meaning. Three stances reach the synthesizer and come out as one beige paragraph.

Check where the pieces meet.

## Three agents is not three times as good

Multiple agents give you *three different views of the same thing*, and cost coordination. If one well-prompted agent gives you what you need, write the one prompt.

A whole module showed multi-agent works. Don't apply it to everything.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS, slides PASS

**Laws moved in from Key Concepts (2026-09-24, Antti-directed).** `## A framework makes it pick` and `## Seams are where it fails` carry what `multi-agent-systems.md` § Key Concepts used to state; the module list is now four handles that point here.

**Time:** 10 minutes.

**Slides (2026-09-23, blend § Titles M3):** Eight `##` slides carry the lecture, including the blend's two named additions, `## More agents is not more rigour` and `## Other agents are part of the tool surface`. Learning A's beige counter-voice sits under the first of those. The merged skeleton's three other M3 headers (`## Three stances beat one summarizer`, `## Left alone, it averages to beige`, `## A framework makes it pick`) belong to `multi-agent-systems.md` § Key Concepts, which is where those lines are; a header for them here would sit over nothing (`check_lectures.md §4` truth clause).

**Placement in module:** After the exercise, before the Debrief. The exercise proves both shapes work; the lecture names them and draws the boundary. Per the no-telling-precedes-doing rule, the "start with don't" default is safer delivered after the exercise — pre-exercise it sounds like a disclaimer, post-exercise it lands.

<!-- backing -->

Claims
- `the-unit-is-the-recurring-workflow` · vision · "The unit is the recurring workflow." ← none-owed
- `inside-a-workflow-start-with-dont` · vision · "Inside a workflow, start with don't." ← none-owed
- `split-on-different-access` · vision · "Each agent needs different data, different tools, different credentials." ← none-owed
- `split-on-different-dialect` · vision · "The material in each source speaks a different language" ← none-owed
- `split-on-different-stance` · vision · "The agents should actively disagree with each other." ← none-owed
- `sessions-versus-subagents` · vision · "Sessions when you want each agent to stay alive for a while. Subagents when you want them in and out." ← none-owed

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

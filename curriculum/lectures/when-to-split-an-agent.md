# Lecture: When to split an agent (and how)

You just split an agent two ways. Three retrievers in separate windows. Three stances inside one session. Both worked; both felt different. The next question (the one your team will ask you the first Monday you try this on real work) is *when do I split, and how?*

**The unit is the recurring workflow.**

Build one agent per recurring workflow, a single `.md` file, guardrailed for the job that workflow does. Don't try to make a mega-agent that does everything (*the company brain*); it ages badly, drifts in scope, nobody can tell what it's responsible for. Don't go the other way and proliferate a hundred tiny agents either; coordination cost eats the win. The right number is *one per piece of work that recurs in your week.*

That's the across-workflow answer. The question this lecture answers is the within-workflow one: when, inside a single workflow, does splitting into multiple agents pay?

**Inside a workflow, start with don't.**

Default to one agent with a good prompt. Splitting adds coordination cost: handoffs to manage, mis-framing to watch for, prompts to tune per agent, a synthesis step that lies if you let it. If a single well-shaped agent with a single well-shaped prompt can produce what you need, do that. Most of the time, it can.

**When splitting earns its keep.**

Three tests. If any hold, splitting pays. If none do, a single prompt probably beats you.

- **Different access.** Each agent needs different data, different tools, different credentials. A Confluence retriever (an agent that searches and returns matches from Confluence) can't pretend to be a web search. A legal-policy agent shouldn't also have customer-data access. Access boundaries force separation.
- **Different dialect.** The material in each source speaks a different language: internal jargon vs. public tone vs. email shorthand. One agent bending between them loses nuance. Three agents each native to their source keep the signal.
- **Different stance.** The agents should actively disagree with each other. A backward planner and a reframer (an agent that reframes the material from a different stance) thinking *in the same voice* is one agent pretending to be three. If your three are paraphrases, collapse them.

Note what's not on the list: *"because three is more thorough."* More agents is not more rigour. More agents is more prompts to tune, more noise in the synthesis, more coordination tax. Split for a reason.

**The test that catches the bluff.**

Ask yourself: *can I write one prompt that produces the same quality of output?* If yes, you didn't need to split. Write the one prompt. Keep your life small.

The test is unkind on purpose. Business people who have just seen multi-agent work want to split everything. Resist it. Single-agent is the plain default.

**And once you've decided to split: which shape?**

Two shapes today, each with its own territory.

**Separate sessions (the Phase 1 move).** Pick this when each agent needs its own persistent context, its own tools, its own clock. The three retrievers had their own connectors, their own search history, their own conversation threads. Long-running, independent, visible. Separate windows let you *see* each one working; you can intervene in one without confusing the others. Good for retrieval across systems, parallel deep dives, anything where you want to watch each agent as it runs.

**Subagents in one session (the Phase 2 move).** Pick this when the main session wants quick parallel thinking and a bounded return. The three stances had a single job each, a clean instruction, no long-lived state, and they reported back as files and disappeared. Good for parallel framing of the same material, multi-perspective analysis, bursts of bounded work. The main session stays in charge; the subagents are temps.

In the full agent picture, other agents are part of the tool surface. They let one agent call a different stance, a different source zone, or a different working style without stuffing every job into one prompt.

**The shape test.** Sessions when you want each agent to stay alive for a while. Subagents when you want them in and out. Sessions when you want concurrency visible; subagents when you want it invisible. Sessions when they have different tools; subagents when they share.

**One warning before you leave the room.**

You cannot hire three agents and expect the output to be three times as good. You hire three agents to get *three different views of the same thing,* and you pay for the privilege with coordination cost. If you don't need three different views (if one well-prompted agent can give you what you need), please, for the sake of your sanity, write the one prompt.

A whole module just showed you multi-agent works. Next Monday, you will be tempted to apply it to everything. Don't.

**Time:** 8–10 minutes.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-03 (writing@60b1b6c)
- judges @60b1b6c: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered

**Placement in module:** After the exercise, before the Debrief. The exercise proves both shapes work; the lecture names them and draws the boundary. Per the no-telling-precedes-doing rule, the "start with don't" default is safer delivered after the exercise — pre-exercise it sounds like a disclaimer, post-exercise it lands.

**Frameworks riffed on:**
- One-agent-per-recurring-workflow (Bosser stance). Across workflows: many agents, each `.md`-file-shaped and guardrailed. Within a workflow: usually one. Anti-mega-agent and anti-proliferation in the same breath.
- Principle of least coordination (energy borrowed from least-privilege) — minimum number of agents to do the job.
- "Ship less, ship better" (Seth Godin) — applied to agent count, not features.

**Philosophy callout (sparing):**
- Belief #5 — don't make general what you don't practice yourself — lands implicitly. The "start with don't" default is the practitioner voice: the people who've done multi-agent the most are the ones who know when not to.

**Deferred facilitator notes:**
- Watch-for the over-enthusiast. Someone in the room will want to split every workflow. Name it from the front: *"I predict two of you will go back and split something on Monday that should have stayed one agent. That's fine — you'll notice the coordination cost and pull it back together. Just try to notice within a day, not a month."*
- The "three tests" framing is deliberately spartan — three is the memorable number. Don't expand to five.
- Tie to the exercise's unease: Module 3 is about noticing, not fixing. This lecture names *when* to reach for multi-agent; Module 5 names *how well* any agent output is actually landing. Different questions, sequenced deliberately.
- Variant note: Mid-Management edition of this training can keep the whole lecture verbatim; the "your team will ask you" framing becomes literal rather than illustrative.

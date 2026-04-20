# Agents Building Agents (The Flywheel)

## Big Idea
The tool that builds tools compounds.

## Meta
- **Primary Bloom's level:** Create
- **Prework:** Risto on acting on the future and building hypotheses; Rumelt on crux / good strategy bad strategy
- **Homework:** none (the strategy deliverable IS the closing artifact)
- **Materials (trainer):** demo agent that generates another agent; shared-context scaffold for the joint Diamond 1 + 2 exercise; domain prediction framework (rules codified + correctness verifiable + talent constrained); three thinking-discipline skills shipped in the Module 8 scaffold — `crux` (Rumelt), `assumption-test` (Roger Martin), `pre-mortem` (Klein/Kahneman). Participants apply them in sequence during the synthesis and take them home.
- **Plug points:** CTO/sponsor present; company's own context fed into all agents

## What You'll Learn
After this module, you will be able to:
- **Use** Claude Code to generate a new agent that extends your system
- **Design** the Diamond 1 crux diagnosis using shared-context agents
- **Create** the guiding policy (Diamond 2) — Rumelt-style strategy kernel produced by the system the participants built
- **Evaluate** the output as a set of assumptions to test Monday morning

## Lectures
- **Agent generates agent (demo)** — Watch the meta-tool in action. Sets up the Extend exercise.

## Exercises
- **Extend your system** — Use Claude Code to generate a new agent (new data source, new output, new perspective). You describe. The coding agent builds. It works. That's multiplication.
- **Joint Double Diamond — diagnose and guide** — Everyone's agents run on shared context. The synthesis IS the sequence of three skills applied in order:
  1. **`crux`** — every participant's agent runs the Rumelt discipline on their own brain folder. Obstacles, clusters, the load-bearing one named. The room pools cruxes; the CTO's agent synthesizes the top three and drafts the guiding policy.
  2. **`assumption-test`** — the guiding policy and its actions go through Roger Martin's discipline. What would have to be true for this to work? Assumptions ranked, top three pulled out, two-week experiments designed.
  3. **`pre-mortem`** — the resulting plan gets the Klein/Kahneman treatment. 18 months from now, this failed — what happened? Concrete risks, early warning signals.
  Personal agents cross-pollinate throughout — your agent reads mine, flags conflicts, finds synergies. Output: the synthesized AI strategy — diagnosis, guiding policy, experiments, risks, signals. The skills ship in the Module 8 scaffold and the participant takes them home.

## Tentative: Live Deliberation (direction under discussion — 2026-04-19)

**Not committed. Flagged here so the direction is visible alongside the current exercise design.** Effects on runtime, infra, in-room vs. self-study, and flow still to be worked through.

The peak of M8 moves from *"agents on shared context, humans orchestrate"* to **"networked personal agents in live deliberation, orchestrator-agent runs the rounds, humans join at the decision layer."** Each participant's personal agent — the one they've built across M1–M7 with their company's context — joins a shared runtime (Cowork or successor) as a first-class participant with persistent identity and an addressable handle. The room's agents deliberate with each other natively: positions posted, pushbacks via `@mention`, updated stances, convergence. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

**Why this is the right direction:**
- **Genuine heterogeneity of context.** 10 real agents from 10 real orgs argue through a shared problem. The diversity is the insight. A single synthetic panel can't produce this.
- **Entire M1–M7 arc pays off in M8.** The personal agent ARRIVES loaded with the student's brain, sources, skills, evals, sharing protocol. M8 is the payoff, not a new exercise.
- **Agents orchestrating agents, applied to itself.** The orchestrator is also an agent. M8's own thesis made literal.
- **Understandable magic.** Students read every message and `@mention`; the transcript is the mechanism. Legible even though networked.
- **Designed to the capability that's landing, not the one from 6 months ago.** Networked agent runtimes, persistent identity, native agent-to-agent messaging are arriving. M8 is ahead of the curve, not chasing it.

**What this replaces (if adopted):**
- The Joint Double Diamond exercise becomes live-deliberated rather than shared-context-batch-run. The three skills (`crux`, `assumption-test`, `pre-mortem`) stay — they become the methods agents apply in rounds, not synchronous steps students run together.
- "Agents on shared context, pooled manually" → "agents deliberate natively, orchestrator-agent pools and synthesizes."

**Open questions under discussion:**
- Strategy skills may move to M7 (tentative, 2026-04-20). `crux` / `assumption-test` / `pre-mortem` fit M7's "I should share but don't know how" storytelling as a genuine strategy problem. If adopted, M8 agents still invoke the skills during deliberation but teaching sits in M7. See `memory/project_m7_strategy_skills_move.md`.
- Runtime dependency — Cowork trajectory or whatever is live at delivery time. Bridge design if capability is still landing.
- Self-study variant — solo student can't gather a room of real personal agents; solo version uses persona-agents as approximation. Real peak is in-room.
- How humans intervene without breaking the deliberation flow.
- Whether the orchestrator-agent ships as a scaffold skill or is generated on-the-fly (fitting the flywheel thesis).
- How F-Secure copyright fence interacts (they deliver their own M8).

Detailed notes: `memory/project_m8_joint_panel.md`.

## Key Concepts (Emergent)
- **Self-improvement**: each cycle makes the next sharper. Diamond 2 output is sharper than Diamond 1 because agents built on each other's work.
- **Org capability**: 20 people just produced a Rumelt-style strategy kernel no consultant could deliver, because it's grounded in their company's own content. The agents did the synthesis.
- **The three predictable walls after Bootstrap**: data access, runtime platform, discoverability. The executive recommendation names them.
- **Domain prediction framework**: rules codified + correctness verifiable + talent constrained = agent-ready. Apply to the company's 200 processes to pick the first 5 to try.
- **Skills as thinking disciplines — reusable tools you take home.** `crux`, `assumption-test`, `pre-mortem` aren't Module 8 props. They're named, portable disciplines participants point Claude at from Tuesday onward, on any decision that feels too big to eyeball.

## Plug Points
- **CTO/sponsor must be in the room.** Their agent has the special role in Diamond 2.
- **The company's own strategic context** — feeds into all agents during the joint exercise.
- **Agent demos.** Every participant shipped at least one real agent over the course of the training (promised from Module 1, built progressively from Module 2 onward). The closing session includes a demo round — each participant shows what their agent does, with their real data. The demo moment is part of the Module 8 deliverable, not separate from it.

## Identity-naming close
The sponsor — who sat alongside the room for all eight modules — names what just happened, in one sentence, out loud: *"You are now agent builders. You have built agents that do real work on your company's data. You can do it again tomorrow on a new problem. That's what you carry out of this room."* No certificate. No ceremony. A name the graduate can say to colleagues on Tuesday morning who weren't there. Identity persists; skills fade.

## Bridge
The strategy you just produced is a set of assumptions. Label them. Design experiments to test them. That's how you start Monday. Bootstrap is Step 1 of 5 — Make Your Own is next.

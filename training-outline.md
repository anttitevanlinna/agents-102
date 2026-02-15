# Agents 102 — Training Outline (Draft)

## Format

- Hands-on, exercise-led (not lecture-led)
- 2 days (expandable to 4 for deeper practice)
- Skills are built incrementally — a small piece at a time
- Every concept is learned by doing, not by slides

## Audience

The builder leader: CEO, CTO, SVP of HR who wants to own the transformation — not outsource it. The one who is frustrated with transformation theatre and wants their people to *have* the competence, not rent it.

Also: product managers, team leads, and practitioners who will become champions — the people who carry the understanding forward and train the next wave, with their org's own structure.

## Four Pillars

Every agent participants build must be:

1. **LLM-based** — built on large language models, understanding how they work
2. **Secure** — safe to deploy, not just functional
3. **Lifecycle-managed** — created, tested, deployed, monitored, updated, retired
4. **Reliable** — does not fabricate; outputs can be trusted

These pillars run through the entire training, not as separate lectures but as qualities that emerge through the exercises.

## Training Arc

The training is exercise-led. Each module builds on the previous one, adding complexity bit by bit until participants have built something real — and understand its limits.

---

### Module 1: Your Personal Profile Agent

**Start with yourself. Start with what you know.**

This is the entry point. No abstract examples — you build an agent that works with *your* data, about *you*.

**Exercise flow:**

1. Take your own LinkedIn profile as the starting material
2. Use Claude Code to create a personal profile agent
3. Add the secret sauce — techniques that make the output genuinely better than a copy-paste
4. Make it bigger — more detail, more scope, more ambition about what the agent produces
5. Keep pushing until it starts fabricating — it will invent things about you, your experience, your skills
6. **This is the teaching moment** — you catch the fabrication because you're the world's leading expert on your own life

**Why this works:** Everyone in the room is the perfect evaluator of their own profile. They don't need technical knowledge to spot when the agent is making things up. The fabrication problem becomes visceral, not theoretical.

**Key learning:** The agent is useful AND unreliable. Both things are true at once. That tension is the entire game.

### Module 2: Evaluations — Catching Fabrication Systematically

**You found the problem. Now learn the discipline.**

Spotting fabrication by eye works for your own profile. It doesn't scale. This module introduces evaluations (evals) — the systematic practice of checking whether an agent's outputs are trustworthy.

- What are evals and why do they matter?
- How to design checks that catch fabrication
- The difference between "looks good" and "is correct"
- Building evals into the agent workflow, not as an afterthought

*(Further modules to be developed)*

---

### Part 3: The Fundamentals — How Agents Work with LLMs

**Durable knowledge that outlasts any specific tool.**

- What an LLM actually does — plain language, no mysticism
- From chatbot to agent: what's the difference, mechanically?
- The building blocks: instructions, tools, memory, reasoning, action
- Giving an agent a task, boundaries, and judgment
- Where the limits are today

### Part 4: Security — Building Agents You Can Trust

**An agent that works but isn't secure is worse than no agent at all.**

- What can go wrong: prompt injection, data leakage, unintended actions
- Thinking about trust boundaries
- Security as a design habit, not an add-on
- **Plug point:** participants integrate their own organization's security policies, compliance requirements, and data classification into their agent design

### Part 5: Lifecycle — From Experiment to Production

**Agents aren't fire-and-forget. They need care.**

- How agents are created, tested, deployed, monitored
- When and how to update an agent
- When to retire one
- The organizational side: who owns the agent?

### Part 6: Scaling the Movement

**From "I get it" to "my organization gets it." With your own structure.**

- The multiplier model: why you can't train everyone, and don't need to
- How to explain agents to your team without jargon
- How to identify where agents create value in your domain
- Creating the next wave: from trained leader to internal champion
- **Plug point:** participants design the scaling approach using their org's own structure — not our template
- The network: connecting with peers across companies doing the same transformation
- Living with uncertainty: navigating what comes next without a fixed map

## Design Principles

- Exercise-led — every concept is learned by doing
- Build incrementally — small pieces, growing complexity
- Fundamentals-first, not tool-first
- Framework + plug points — we provide the patterns, the org integrates their reality
- Show the real thing, not polished demos
- Honest about what we don't know
- Every participant leaves able to multiply the knowledge
- The four pillars (LLM-based, secure, lifecycle, reliable) are woven through, not bolted on
- With your own structure — not our template applied to your org

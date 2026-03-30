# StrongDM — Software Factory (3-Person AI Team)

**Type:** Born AI-native (AI team) | **Size:** 3 engineers | **Evidence:** Deep case
**Key sources:** Simon Willison blog (Feb 2026), Justin McCarthy talks

---

## How They Work

- **3 engineers. Two rules:** Code NOT written by humans. Code NOT reviewed by humans.
- **Spec-Driven Development:** Humans write specifications. Agents implement. Holdout scenarios validate.
- **"Attractor" repository:** Contains zero code — just three markdown files with specifications. The specs attract the right implementation.
- **3-10x sustained velocity** over months (production, not pilot).

## The Verification Breakthrough

What makes this work where others produce "fast garbage":

- **Holdout Scenario Sets:** Acceptance criteria the coding agent never sees. A separate LLM evaluator judges whether output satisfies them.
- **Probabilistic Satisfaction:** Measures fraction of trajectories likely satisfying needs. Not pass/fail — confidence levels.
- **Digital Twin Universe (DTU):** Behavioural clones of third-party services (Okta, Jira, Slack). Enables testing at scales exceeding production.

## Formation Story

Justin McCarthy identified Claude 3.5 Sonnet (Oct 2024) as the inflection point where "long-horizon agentic coding workflows began to compound correctness rather than error." Founded the AI team around this specific capability threshold. Three months later, working demos.

## The Skill Shift

Engineers write specifications, not code. The critical skill is:
- Defining acceptance criteria precisely enough for holdout scenarios
- Designing the Digital Twin Universe
- Architectural judgment about what to build and how to decompose it

## What Transfers

- **Spec-driven development** as a pattern (applicable beyond this team)
- **Holdout scenarios** as verification mechanism
- **The tool threshold concept** — there's a specific capability level at which agents can sustain long-horizon work. Below it, they compound errors. Above it, they compound correctness.

## Limitations / What Doesn't Transfer

- Greenfield team, not transform-in-place
- 3 people with exceptional skill — no evidence for normal engineering teams
- Specific to well-scoped, specification-friendly work
- Legacy multi-team value chains may be exactly where this breaks down

## Key Insight

**The bottleneck shift from generation to verification.** StrongDM solved verification with holdout scenarios and Digital Twins. That's what enabled the "dark factory." Without it, they'd be stuck at Level 2 like everyone else. "Generation is no longer the bottleneck. Verification is."

---

*Last updated: March 2026*

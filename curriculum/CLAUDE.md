# Curriculum Production

This CLAUDE.md governs curriculum work. Read `lecture-guardrails.md` before writing any module.

## Scope

Bootstrap (Step 1) — the 2-day intensive. Eight modules, each a single markdown file in this directory.

**Source of truth:** `training-outline.md` defines the arc. `learning-goals.md` defines what graduates can do. `../content-strategy.md` defines the storyline and positioning. Curriculum modules are the executable version of these three documents.

**An existing version of this training is being delivered. The existing curriculum has not yet been incorporated into this project's materials. It is a key input for future curriculum development.**

## Modules

1. `module-01-getting-going.md` — Getting Going
2. `module-02-building-agent-systems.md` — Building Agent Systems
3. `module-03-multi-agent-systems.md` — Multi-Agent Systems
4. `module-04-security.md` — Security
5. `module-05-output-quality.md` — Output Quality and Hallucination Control
6. `module-06-evals.md` — Evaluations
7. `module-07-agent-platforms.md` — Agent Platforms
8. `module-08-agents-building-agents.md` — Agents Building Agents (The Flywheel)

## Arc Logic

- **Modules 1-3** build incrementally: get started → grow the project → coordinate multiple agents. Each module's project grows from the previous one — not throwaway exercises but a single system that gets more sophisticated.
- **Modules 4-6** add the disciplines that separate toys from production: security, output quality, evals. These retrofit onto what was built in 1-3 — participants experience "I built something that works but I can't trust yet."
- **Module 7** zooms out: where do agents live in the real world? Platforms, deployment, the landscape.
- **Module 8** is the flywheel insight: agents that build agents. Code-generating agents as the meta-tool.

## Module Format

Each module is a single markdown file:

```
# Module N: [Title]

## Meta
- Duration: [estimated time]
- Prerequisites: [what participants need]
- Materials: [what facilitator prepares]
- Pillar focus: [which of the four pillars]

## Learning Objectives
[3-5 specific things participants will be able to do]

## Setup
[Exact steps to get ready]

## Exercises
### Exercise N.1: [Name]
**What you do:** [Clear instruction]
**What happens:** [Expected behavior]
**The point:** [Why this matters]
**Facilitator note:** [Timing, common questions]

## Key Concepts
[Concepts that EMERGE from the exercises — never presented before doing]

## Plug Points
[Where organizations insert their own context]

## Reflection
[Discussion prompts]

## Bridge
[How this connects to the next module]
```

## Exercise Design Rules

- **Claude Code specific.** Exact commands, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain before the exercise demonstrates it.
- **Real data, not toy data.** Participants use their own profiles, policies, domains.
- **Fabrication is the teaching moment.** Module 1 deliberately pushes until the agent fabricates.
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **Show the failure mode.** For every capability, show what goes wrong without the discipline.
- **The four pillars (LLM-based, secure, lifecycle, reliable) are woven through, not bolted on.**

## Plug Points Framework

Plug points are where the organization's own reality replaces generic content:

```
> PLUG POINT: [What the org inserts here]
> Default: [What we provide if they don't have their own]
```

Examples: security policies, data classification rules, compliance requirements, domain-specific evaluation criteria, org structure for agent ownership.

## Content Boundaries

- **Technical depth:** Enough to build, not enough to become an ML engineer. Understand WHY, not the math of HOW.
- **No slides.** The markdown IS the material.
- **No vendor comparison.** We use Claude Code.
- **COPYRIGHT:** All exercises, examples, and instructional language must be original. Never reproduce or adapt from external sources.

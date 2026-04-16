# Curriculum Production

This CLAUDE.md governs curriculum work. Read `lecture-guardrails.md` before writing any module.

## Scope

Bootstrap (Step 1) — eight modules, each a single markdown file in this directory. Delivery format varies (2-day intensive, 8 weekly sessions, etc.).

**Source of truth:** `content-strategy.md` defines the arc, storyline, module skeleton, and learning goals. `lecture-guardrails.md` defines pedagogical and design rules (the "how"). Curriculum modules are the executable version of these documents.

**An existing version of this training is being delivered. The existing curriculum has not yet been incorporated into this project's materials. It is a key input for future curriculum development.**

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

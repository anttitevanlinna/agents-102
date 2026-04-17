# Security

## Big Idea
Your agent just violated company policy. That's YOUR problem.

## Meta
- **Primary Bloom's level:** Analyze → Evaluate
- **Prework:** personal reading on the skills system (how skills scope agent capabilities, permissions, tool access)
- **Homework:** shadow-agents / agent sprawl reading (agent sprawl statistics, 82% think protected / 24% have visibility)
- **Materials (trainer):** pre-built compliance skills derived from the customer's security/legal policies; controlled-example agent designed to fail on policy in a dramatic, clear way
- **Plug points:** the customer's security policies, legal rules, compliance processes — pre-converted to skills (separately billed prep work if Antti builds)

## What You'll Learn
After this module, you will be able to:
- **Analyze** a working agent system against real company security, legal, and compliance rules
- **Identify** where the system violates policy and why conventional tests miss it
- **Apply** skills to scope agent capabilities and enforce trust boundaries
- **Evaluate** the tradeoff between agent capability and risk

## Lectures
- *(None explicitly. The controlled example + debrief carries the teaching.)*

## Exercises
- **Audit and contain with skills** — Analyse your Module 3 system against the company's security, legal, and compliance rules. Where does it violate? What data shouldn't it touch? What output shouldn't it produce? Apply the trainer's pre-built compliance skills, re-run, see what changes — what the agent can no longer do, and why that's the right answer.
- **(Optional) Build your own skill** — Scope a boundary that matters to you.

## Key Concepts (Emergent)
- **Trust boundaries** — what the agent can access vs. what it should access. Skills enforce this.
- **It looked good. It was wrong.** Your tests wouldn't have caught this — because the failure is policy, not correctness.
- **Business risk > prompt injection.** The interesting failure is compliance violation, not technical attack.

## Plug Points
- **Security/legal/compliance policies** as usable documents. Converted to skills before training.

## Bridge
It's secure. But is the output actually good?

# Supplementary Materials

Reference documents that build up progressively across multiple modules. Students read assigned sections before the module that next expands them, and own the complete document as a standing reference after the training.

## Why this exists (separate from lectures)

**Lectures** are single-sitting events (15-min demo, or a prework piece read once before one module). They unpack one idea.

**Supplementary materials** cover concepts too complex to absorb in one sitting. They have a *progression* — the "what is an agent" answer a student needs in Module 1 is different from the answer they need in Module 4. A single monolithic reading can't meet them where they are, and the complete answer only matures as modules go. So each supplementary is built up over the training and referred to by sections per module.

## Planned supplementaries

### what-is-an-agent.md
The agent-ness progression. Starts at "LLM isn't a chatbot," ends at "agents build agents."
- **Section 1 — LLM vs chat:** *written 2026-04-17.* Read as training prework. Primes the mental frame before Module 1.
- **Module 2:** Chat → agent — persistence + automation = system *(section to add)*
- **Module 3:** Multi-agent — specialization, handoffs, the assembly line *(section to add)*
- **Module 4:** Tools, skills, permissions *(section to add)*
- **Module 5:** The autonomy ladder: what the agent may propose, check, or do *(written 2026-04-29)*
- **Module 6:** Agents as judges: generate, score, adjust, repeat *(written 2026-04-29)*
- **Module 8:** Agents building agents (the flywheel) *(section to add)*

### building-guardrails.md
The constraint / context discipline. "Guardrails" isn't one thing — it's the same pattern scaled up across modules.
- **Module 1:** Guardrails as structured context (`CLAUDE.md`)
- **Module 2:** The schema layer of the LLM memory — guardrails for knowledge
- **Module 4:** Skills — scoped guardrails, trust boundaries
- **Module 5:** Generation rules as guardrails (citations, claim restrictions)

### learning-and-compounding-systems.md
The system-that-improves discipline. From one-shot to self-correcting to meta-improving.
- **Module 2:** The LLM memory — compounding as the core pattern
- **Module 5:** The quality loop (generate → evaluate → adjust → regenerate)
- **Module 6:** The eval-iteration loop (the eval is also an assumption)
- **Module 8:** Agents building agents — self-improvement as design

### personal-to-company-gap.md
Why a personal agent is so hard to turn into a company agent. The thousand tacit choices that make your own agent work — and why removing the tacit layer breaks everything. Organising insight: Polanyi's "we know more than we can tell." *Pass 1 skeleton written 2026-04-19.*
- **Module 2:** The tacit choices that hold a personal agent together (Section 1)
- **Module 3:** Implicit trust — why access doesn't transfer trust; the Access-Trust Gap (Section 2)
- **Module 4:** Permissions are free at scale 1; skills-as-scoping is the design answer (Section 3)
- **Module 5/6:** Taste is private, quality is public — eval-rubric-not-a-voice (Section 4)
- **Module 7:** The four plain sharing shapes; why "share the whole agent" is a vendor pitch (Sections 5–6)
- **Module 8:** The organisational absorption layer — what the company has to catch (Section 7)

### agent-ready-data.md
How leading companies make data and systems available to agents — a progression, not a doctrine. Files → MCP → CLIs → headless SaaS → semantic skills → semantic models. Each rung unlocks a new set of agents and a new set of people. *Pass 1 skeleton written 2026-04-19.*
- **Module 2:** Files as the default — `sources/` + `memory/`
- **Module 4:** MCP (agent's standard plug) + CLIs (handles agents already grip) — with scoped permissions
- **Module 7:** Headless SaaS + semantic skills — sharing at the data layer, not the agent layer
- **Module 8:** Semantic models — the company's shared meaning, made agent-readable; the shared ground that makes agents compound

### agent-trigger-list.md
Daily invocation habits after the core arc. Helps students notice when to bring an agent into real work instead of waiting for a special "AI task."
- **After Module 2:** Start noticing trigger moments once the agent has reusable memory.
- **After Module 3:** Add the "one agent or several?" question.
- **After Module 6:** Five Monday trigger moments and a prompt that writes `./agent-trigger-list.md` from the student's own training folder.

### cookbook-for-agent-system-design.md
*"This is how you do it."* Practitioner recipes — the moves, in sequence, that take someone from chat to an agent system they'd stake their reputation on. Supersedes the earlier "lifecycle doc" idea (recipes compose; lifecycles gatekeep).
- **Module 1:** Recipe 1 — a piece of output that is genuinely yours
- **Module 2:** Recipe 2 — a compounding system around one live challenge
- **Module 3:** Recipe 3 — a multi-agent system that answers a strategic question
- **Modules 4–8:** Recipes 4–8 (scoped trust, quality loop, steering evals, team promotion, agents building agents) — placeholders; filled as each module stabilises.
- **Beyond the training:** cloud deployment, team sharing, cross-org reuse, enterprise integration, observability, handoffs to non-agent systems — added when each practice is reliable enough that a working practitioner would recommend it without caveats.

More supplementaries may be added as patterns emerge.

## Filename convention

`<slug>.md` — kebab-case, no module numbers.

## Structure of a supplementary file

```markdown
# [Title]

[One-paragraph framing of the progression.]

## [Section name — typically tied to a module]

*Referenced from: Module [N] ([module slug]).*

[Content at the depth appropriate for this module's stage. Subsequent sections build on this.]

## [Next section]

*Referenced from: Module [N+k].*

[…]
```

One H1 per file (the title). Sections by H2. Each section notes which module invokes it as prework or follow-up reading.

## How modules reference supplementaries

Modules reference supplementaries as **prework** or **homework**, by title + section name. Not inlined in the module page (like exercises and lectures are) — supplementaries stand as separate documents:

```markdown
## Meta
- **Prework:** [What is an Agent — LLM vs chat](../../supplementary/what-is-an-agent.md#llm-vs-chat)
```

Participants click through to read the section. The supplementary page shows the full document in context; the participant sees what's been covered and what's coming.

## Rendering

The existing curriculum renderer handles these via `?file=supplementary/<slug>` — no code change needed. Each supplementary renders as a full standalone document, printable and linkable.

Include-link expansion (the automatic inlining that exercises and lectures get inside module pages) does **not** apply to supplementaries. Supplementaries are reference material, not module content.

## Three-pass build for supplementaries

Supplementaries don't follow the per-artifact three-pass build the same way. Instead:

1. **Pass 1 (structural):** README + projected progression (this file)
2. **Pass 2 (per-section build-up):** Each module's turn adds/revises its section as that module is written
3. **Pass 3 (polish):** Tighten cross-references, consistent voice, final read when the training is near-complete

Sections fill in opportunistically as the modules they serve get built.

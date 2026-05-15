# Agentic systems, shown in the repo

## Big Idea

Agentic systems become visible when you know where to look: rules, prompts, memory, checks, build scripts, customer versions, and commits.

## What This Workshop Builds

In this workshop, you will be able to:

- **Recognise** the parts of an agentic system in a real repo
- **Explain** why rules, prompts, checks, and build outputs matter more than a single chat transcript
- **Connect** the live workbook to the source files and build system that produce it
- **Notice** the loop that makes the system improve: rules, inspect, plan, edit, check, build, compound

## Opening Question

When you hear *agentic system*, what do you imagine exists behind the scenes?

The actual system behind this workbook makes a useful contrast.

## Live Demo

[Lecture: Agentic systems demo script](lectures/agentic-systems-demo-script.md)

## What to Notice

- A chat is a conversation. A system is the conversation plus the rules, files, checks, and outputs that make the work repeatable
- `CLAUDE.md` files are working agreements: what the agent reads before it acts
- Prompts are reusable moves, not magic sentences
- Evals and checks are how a system earns trust over time
- The customer workbook is built output. The source lives in curriculum files; the deployment is a product of the build system

## Handoff

Now that you have seen the shape of a system, run one together: individual signal first, group synthesis second, cross-pollination only after synthesis.

<!-- maintainer -->

**Meta:**
- **Primary Bloom's level:** Understand
- **Length:** 45 minutes. Opening question + 35-minute agentic system demo + handoff
- **Demo spine:** deployed workbook → rules → source module → exercise/prompt → build script → client output → checks → compounding

**Quality:** compendium-audited 2026-05-15 (writing@eb1168f technical@eb1168f behavior@eb1168f pedagogy@eb1168f)
- judges @eb1168f: writing PASS, story REVISE (see-instances/claude-basics--agentic-systems-repo-demo.story.json), technical PASS, behavior PASS, pedagogy PASS, strategy REVISE (see-instances/claude-basics--agentic-systems-repo-demo.strategy.json)
- cross_module @eb1168f: PASS — set=[M1,M2,M3,M4]

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Agentic systems, shown in the repo*

**Mood contract:** concrete awe. The demo should make system shape inspectable without becoming a coding lesson.

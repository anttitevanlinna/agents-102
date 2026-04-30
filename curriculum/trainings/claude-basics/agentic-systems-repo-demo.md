# Agentic systems, shown in the repo

## Big Idea

Agentic systems become visible when you know where to look: rules, prompts, memory, checks, build scripts, customer versions, and commits.

## Meta

- **Primary Bloom's level:** Understand
- **Prework:** Cowork tour optional; bring one question about the Claude rollout
- **Homework:** [Homework: build and verify](#homework-build-and-verify)
- **Materials (organisers):** projected agents-102 repo, deployed Acme workbook, and a clean path through the files named below
- **Plug points:** the customer's rollout question, the customer's licensing and connector reality, the workbook URL they will use after the session

## What You'll Learn

After this module, you will be able to:

- **Recognise** the parts of an agentic system in a real repo
- **Explain** why rules, prompts, checks, and build outputs matter more than a single chat transcript
- **Connect** the live workbook to the source files and build system that produce it
- **Name** what you would need before trusting a Claude workflow to repeat

## Connections

When you hear *agentic system*, what do you imagine exists behind the scenes?

Hold two answers in the room. Then look at the actual system behind this workbook.

## Lectures

None as a separate reading. This module is a live repo demo.

## Exercises

None. The exercise is the inspection.

## Key Concepts (Emergent)

- A chat is a conversation. A system is the conversation plus the rules, files, checks, and outputs that make the work repeatable
- `CLAUDE.md` and `AGENTS.md` are working agreements: what the agent reads before it acts
- Prompts are reusable moves, not magic sentences
- Evals and checks are how a system earns trust over time
- The customer workbook is built output. The source lives in curriculum files; the deployment is a product of the build system

## Plug Points

- **The deployed workbook.** Start with the Acme workbook so the room sees the artifact they will use.
- **The source path.** Show the matching module, exercise, and prompt files in `curriculum/`.
- **The rule path.** Show `AGENTS.md`, `CLAUDE.md`, and the Claude Basics training rules so the room sees how an agent gets steered.
- **The build path.** Show the customer build command and the generated `site/clients/acme/` output.
- **The change path.** Show one recent commit so the room sees that the system evolves through small versioned changes.

## Debrief

Two minutes. Ask yourself: which part made this feel less like a chat and more like a system?

Ask Claude to capture that in one sentence.

**Prompt** *(Cowork)*

```
Based on the repo demo I just watched, explain in one sentence what makes an agentic system different from a chat.

Then list the three system parts I should look for next time someone shows me an AI workflow.
```

Keep the answer. You will use it when the live exercise turns the room itself into a small system.

## Bridge

Now that you have seen the shape of a system, run one together: individual signal first, group synthesis second, cross-pollination only after synthesis.

<!-- maintainer -->

**Meta:**
- **Primary Bloom's level:** Understand
- **Length:** 45 minutes. 5 Connections + 35 live repo demo + 2 Debrief + 3 Bridge
- **Demo spine:** deployed workbook → source module → exercise/prompt → rules → build script → client output → commit history

**Quality:** draft 2026-04-30
- draft 2026-04-30 (new live repo-demo module after strategy restructure; sim/mechanical/eval not rerun)

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Agentic systems, shown in the repo*

**Mood contract:** concrete awe. The demo should make system shape inspectable without becoming a coding lesson.

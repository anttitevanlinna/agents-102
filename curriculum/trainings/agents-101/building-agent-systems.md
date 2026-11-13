# Building Agent Systems

## Big Idea
A system remembers, grows, and compounds around the one thing you need to make progress on. Chat can't.

## Prework

[Module 2 prework](lectures/module-2-prework.md). (1) Bring a live challenge. (2) Verify your Confluence and OneDrive connectors. (3) <span class="rt-code">Plan-mode primer.</span><span class="rt-cowork">Plan-first primer.</span> (4) Karpathy's LLM Wiki post. (5) Optional: Lindenberg memory-architecture piece.

## What You'll Learn
After this module, you can:
- **Build** an LLM memory on your next big challenge
- **Build** a custom agent (markdown instructions) and run it on your memory
- **Review** a plan before the agent acts
- **See** the three layers (raw sources, memory, rules file) and why plain text
- **Evaluate** whether memory is compounding or growing

## Start here

Start a fresh session or task at `~/Documents/agents-101/`. Module 1's scrollback stays behind.

Your `memory/`, `sources/` and `agents/` folders are empty from prework. Module 1's files stay out of this build. The root instructions file comes in the Debrief.

What's the difference between asking an agent a question and having an agent keep a knowledge base that every later agent reads?

## Name the challenge you're carrying

What challenge are you carrying that isn't solved yet? Not a task. You'll build a memory around it.

If everything you've read and drafted on that challenge moved into a memory an agent could read and sharpen, what changes at work?

Connectors let the agent combine clues that live apart, like a wiki page and an email thread.

[Demo: 1st scheduled agent](lectures/first-scheduled-agent.md)

[Exercise: Name your next big challenge](exercises/name-your-challenge.md)

Keep the same session running; the agent has your challenge in scrollback.

[Exercise: Build your challenge memory](exercises/build-your-challenge-memory.md)

[Lecture: Compounding](lectures/compounding.md)

## Debrief

Five minutes. A retro, **and the first root instructions file in this directory.** The agent writes the rules every agent here reads, each traced to a session moment: what worked, what rubbed, what got repeated.

{{prompt:a101-m2-debrief-claude-md}}

## Push back on the summary

Push back on anything in the agent's summary that doesn't match your sense of the work. *"Keep the draft I accepted as an example, beside the fixes."* *"You missed the bit where we had to regenerate three times because of X."*

What the agent leaves out is often the signal. A summary that names three rules and skips the messy fourth, where you re-prompted twice, is the tell.

## Fix the output, then fix the rule

> Your agent is "right" when it works. Have the agent rerun a miss before anyone fixes it. A miss that comes back every run is context the agent still lacks: sharpen the memory, tighten a rule, rewrite the prompt. You spot the next mistakes by running the system and watching where it bends.

Watching where it bends is continuous improvement, done by hand.

## The model will change under this

The model will change. Your memory will not.

Your folder holds your challenge, your sources and your rules. A better model reads your folder better. It does not write it for you.

## Key Concepts
- A system compounds around your challenge: each new source sharpens what is already there. A chat starts from zero.
- Persistence plus automation: a system.
- Three layers in plain text: untouched raw sources, a memory the agent sharpens, a rules file.

## Bring to Module 3

**A daily agent, scheduled, with a week of observation behind it.** It reads your challenge memory. Module 3 splits work against that week of runs.

[Schedule your personal agent](exercises/personal-agent-homework.md)

## Pre-reads before Module 3

[Agent Trigger List, After Module 2](trainings/agents-101/supplementary/agent-trigger-list.md#after-module-2-start-noticing-trigger-moments), for noticing when work should call the agent. [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md): tools, memory, context.

[Before Module 3](exercises/module-3-prework.md)

Save the run, then end this session.

## Next
Before the next module, have the agent build a few more agents you need. Pick by pain: a task you keep doing manually. Meeting prep and calendar triage are fine starters. Keep the first version proposal-only: the agent drafts, ranks, or prepares; you decide what leaves the system.

<!-- maintainer -->

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `compounding.md`.

**Story blend, M2 Debrief (2026-09-23).** Two subsection headers after the Debrief prompt, per `module-design/a101-story-proposals/blend.md` § Titles, M2. `Fix the output, then fix the rule` sits over the watching-where-it-bends prose: the body already runs that order (push back on the output, then turn the miss into a line of context) and the verb header states it. `The model will change under this` carries the blend's seed for the model-rotates learning: *the model will change under this; the memory will not*. It stays a statement about what the student now owns and asks no question; the question it seeds belongs to the last module.

**Mood target:** Satisfied compounding — the student sees a living system around the challenge, not a folder-setup exercise.

**Push-back moves / Watch-fors / Decision points:** [M2 run sheet](trainer-modules.md#m2-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Opening connector demo (trainer, 5 min):** Place after the opening questions and before `Name your next big challenge`. Use non-sensitive trainer material. Ask Claude to answer one small work question by checking two connected systems and the open web: for example, a wiki page, a recent document or meeting note, and one outside source. The point is not the answer. The point is the moment where Claude combines clues that normally live in separate places.

**Meta (trainer):**
- **Transitions:** connector demo 5 @start "Opening connector demo" · debrief 5 @end "Debrief" · bridge 3 @end "Bridge"
- **Where these numbers come from:** connector demo from this block's own "(trainer, 5 min)"; debrief from the body ("Five minutes."). Every beat here has no file of its own, so nothing else prices it.
- **Charge:** personal-agent-homework 0 — the 35-minute setup is completed between sittings so Module 3 opens on a week of observation.
- **Charge:** module-3-prework 0 — same: inlined for findability, read between sittings.
- **Primary Bloom's level:** Apply → Analyze
- **Prework time:** 30-35 minutes. Challenge choice 5, connector check 5, plan-mode or plan-first primer 15, Karpathy 5-10.
- **Materials (trainer):** Module 2 zip that unpacks into the student's working directory — empty `sources/` (participant fills via curation on class day — no pre-load), empty `memory/`, and empty `agents/`. No root `CLAUDE.md` ships; the student creates it in the Debrief. Five-minute connector demo uses non-sensitive trainer material across two connected systems plus one outside source. Phase 3's second batch comes from the participant themselves — they find another piece of material mid-exercise. No trainer injection; the three-minute "go find more" loop is part of the lesson.
- **Plug points:** Each participant's own live challenge + curated sources from their Confluence / Office365 / internet. Sponsor pre-agreement: Confluence & Office365 connector access for the cohort; acceptance that the shape (not the substance) of challenges may be shared in the room.

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Challenge file | `./challenge.md` | M2 challenge-naming exercise | M3 crux work; M5-M6 briefing/eval targets; M8 sponsor-challenge contrast |
| Sources folder | `sources/` | M2 source curation | M3 retrieval/synthesis; M5 benchmark evidence; M6 eval loop; M7-M8 extension work |
| Challenge memory | `memory/` | M2 memory build and updates | M3-M8 as the curated context layer |
| Custom agent files | `agents/` | M2 agent-system build | M3-M8 as reusable workers and extension targets |
| Root rules file | `./CLAUDE.md` | M2 Debrief | M3-M8 fresh sessions as durable operating memory |

**Plug Points (trainer):**
- **Each participant's own live challenge.** The exercises are structurally the same across people. What changes is what's inside the memory.
- **Sources must be readable by agents** (text, markdown, PDF, structured data) — Confluence and Office365 connector access arranged with the sponsor before training day.

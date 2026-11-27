# Multi-Agent Systems

## Big Idea
Several agents can work on one problem together. Split the work, run the agents in parallel, and let them hand off through shared files. Three agents search, three more decide. Handoffs are where work gets lost, so check them.

## Prework

[Schedule your personal agent](exercises/personal-agent-homework.md) to read your challenge memory. [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) covers tools, memory and context. [Helper agents primer](exercises/module-3-prework.md) before Module 3.

## What You'll Learn
After this module, you will be able to:
- **Orchestrate** multiple agents
- **Split** work across agents
- **Debug** agent handoffs

## Start here

Start a fresh session or task at `~/Documents/agents-101/`.

Today three agents search your documents and practitioner articles, and three more work out what the findings mean. Files on your computer are enough. A wiki or document connector is an optional extra.

[Demo: Agent that takes action](lectures/agent-that-takes-action.md)

[Exercise: Name your crux](exercises/name-your-crux.md)

[Exercise: Three retrievers, one curator](exercises/three-retrievers-one-curator.md)

[Exercise: Three minds, one synthesis](exercises/three-minds-one-synthesis.md)

[Lecture: How agents work together](lectures/when-to-split-an-agent.md)

[Lecture: Debugging stuck agents](lectures/debugging-stuck-agents.md)

## Debrief

Five minutes. The agent reviews the four prompts, the retrieval files, the synthesizer's briefing and the conversation, then rewrites your <span class="rt-claude-skills">`CLAUDE.md`</span><span class="rt-agent-skills">`AGENTS.md`</span> in place and reports what changed. Push back on anything that looks wrong.

{{prompt:a101-m3-debrief-handoff-rules}}

## The review checks handoffs, not truth

The prompt asks the agent for a harsh review of the handoffs: at least two places where work was lost, each with evidence (the file, the step, what was lost). Without the demand for evidence, the review turns polite.

The review covers how your agents handed work to each other. It does not check whether the briefing is true.

## Push back on the summary

Push back where the summary is wrong: *"The planner and the reframer needed to be separate."* *"The wiki retriever kept normalising before writing."*

## The briefing is still unchecked

Nothing checks the briefing yet, so whether it is right stays open.

## Optional memory check before Module 4

**Optional: test the memory's structure.** After you add a lot to `sources/`, run this prompt between modules. New evidence shows whether the memory's topics still fit.

{{prompt:a101-m3-homework-memory-health}}

## Key Concepts
- Agents work together through shared files: what one writes is the next one's context.
- Split where the parts differ, run them in parallel, bring them back to one place that decides.
- Two ways to run a team: separate sessions on shared files, or helpers the main session starts and discards.
- Handoffs are where work gets lost: open the files where one agent handed to the next.

## Pre-reads before Module 4

[Agent Trigger List, After Module 3](trainings/agents-101/supplementary/agent-trigger-list.md#after-module-3-notice-when-one-agent-is-not-enough) and the multi-agent sections of [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md).

[Before Module 4](lectures/module-4-prework.md)

After the optional check and pre-reads, end this session. Module 4 starts fresh at `~/Documents/agents-101/`.

## Bring to Module 4: what's the worst thing it could do with that access?

An agent that works across connected systems has access to those systems.

## Next
Until Module 4, keep working on your real problem: add an agent for a critical dependency, or a plan visualisation.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@cf4fd816 story@78d17fc9 technical@78d17fc9 behavior@78d17fc9 pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @cf4fd816: writing PASS (2 findings see instances/agents-101--module--multi-agent-systems.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]
- cross_module @42b9610a: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,agents-building-agents-solo]; 7 pairs, 0 blocking; see instances/agents-101--module-set--agents-101-open-edition.cross_module.json

**Red thread (2026-11-13, Antti).** "It is not to add sentences. It is to align on common theme. Say it in different ways without adding more content." Added openers, four-ideas slides and own-agent callouts were tried and removed the same evening. Align existing lines; add none.

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `when-to-split-an-agent.md`; the stance roll-call lives in the synthesis exercise.

**Debrief slides (2026-09-23, blend § Titles M3):** Three headers over the prose that already carried them. `## Nothing here checks any of it` sits over the audit-prompt commentary, which names what the audit reads and what it does not. `## The doubt stays. Hold it.` holds the unease beat on its own slide, after the push-back sentences. `## Bring to Module 4: what's the worst thing it could do with that access?` heads the access hand-off, so `## Next` carries the build-between-modules ask alone; the `Bring to Module` prefix is what `scripts/curriculum.test.js` allows between Key Concepts and Next. Nothing here resolves the unease; the mood target below is the constraint.

**Mood target:** Unsettled competence — the synthesis is useful, but the student leaves asking whether it is right.

**Push-back moves / Watch-fors / Decision points:** [M3 run sheet](trainer-modules.md#m3-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Timing:** `timings.md` is the canonical generated budget. Do not maintain a second total in this module.

- **Transitions:** crux opener 8 @start "Crux opener + the question" · debrief 5 @end "Debrief" · bridge 3 @end "Bridge"
- **Where these numbers come from:** crux opener is the authored room estimate; debrief comes from the body ("Five minutes."). Every beat here has no file of its own, so nothing else prices it.
- **Charge:** module-4-prework 0 — same: inlined for findability, read between sittings.

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Crux file | `./crux.md` | M3 name-your-crux exercise | M3 synthesis; M5 benchmark target; M6 eval-loop generation target |
| Module 3 synthesis artifacts | `module-3/` | M3 retriever, curator, and synthesis exercises | M3 Debrief; M5 benchmark; M6 eval loop; M7 sharing diagnosis |
| Curated memory update | `memory/` (including `memory/_synthesis-m3.md` when present) | M3 curator/synthesizer update | M4 security audit; M5-M8 downstream system work |
| Root rules file update | `./CLAUDE.md` | M3 Debrief | M4-M8 fresh sessions as handoff and division-of-work rules |

**Plug Points (trainer):**

> PLUG POINT: The three source zones the retrievers cover.
> Default: wiki / docs / curated internet — the retrievers ask the student inline which specific tools they use (Confluence / Notion / SharePoint wiki / Guru for wiki; OneDrive / SharePoint / Google Drive for docs). Prompt language is permissive by design — no trainer swap required; the pattern holds across toolchains.

> PLUG POINT: The framework the synthesizer uses.
> Default: Rumelt's strategy kernel (diagnosis → guiding policy → coherent actions). Alternatives by challenge type: StoryBrand for positioning challenges, Jobs-to-be-Done for product/feature decisions, principle of least privilege for security/access decisions.

> PLUG POINT: The three synthesizer stances.
> Default: backward-from-end planner, Martin's *what-would-have-to-be-true* experimenter, counterintuitive reframer (the Rory seat). Students can swap the Rory seat for another sharp stance if one fits their challenge better — e.g., a premortem voice (Kahneman/Klein) for risk-heavy challenges, a JTBD interviewer voice for customer-facing ones. Keep three; keep them genuinely different.

**Capability check status:** confirmed (per `three-retrievers-one-curator.md` + `three-minds-one-synthesis.md` § *Capability notes (confirmed)*). Multi-window / multi-session on the same working directory works on CLI (four terminal windows) and desktop (four sessions); 3 concurrent Cowork tasks on the same connected folder confirmed running 2026-04-29 (Antti); subagent launch phrasing (*"spawn three subagents in parallel"*) confirmed working in current Claude Code. Re-verify only if Claude Code's session-isolation or subagent-spawn semantics change.

**Frameworks riffed on:**
- Rumelt's strategy kernel (default synthesizer spine) — M3's opening *Name your crux* exercise produces the diagnosis seed; the synthesizer's Rumelt prompt builds the policy and actions on top of it
- Roger Martin's *what-would-have-to-be-true* assumption test (the experimenter stance) — also threaded through the curriculum's throughlines (see lecture-guardrails → Strategy as assumptions)
- Rory Sutherland's behavioural-economics counterintuitive reframe (the reframer stance) — named explicitly; the Rory seat
- One-agent-per-recurring-workflow (Bosser stance) — many agents across workflows, usually one within. M3 deliberately puts the student inside the rare within-workflow case where access + dialect + stance force splitting; the lecture closes with the across-workflow rule

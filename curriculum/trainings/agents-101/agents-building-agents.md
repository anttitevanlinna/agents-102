# Agents Building Agents (The Flywheel)

## Big Idea
The tool that builds tools compounds.

## Prework

Run `module-7/monday.md`: test one assumption, ask for one name, talk to one person.

Revisit the crux, what would have to be true, pre-mortem.

## What You'll Learn
After this module, you can:
- **Use** your agent runtime to generate a new agent that extends your system
- **Orchestrate** three thinking disciplines against a real company question
- **Produce** a strategy kernel, suggested agent set, and two-week plan from your files
- **Explain** how deliberation sharpens the kernel and the next agent set

## Start here

Start a fresh session at `~/Documents/agents-101/`. It reads the full agent system and `module-7/monday.md`. The room-scale exercise uses a separate shared deliberation folder, so participant files stay out of your local stack.

At the start, the shared folder is nearly empty: each participant gets one folder named after them, the buyer/sponsor seeds `challenge.md`, and one or two central synthesizer agents write the selection, agent-set, and plan files at the shared root.

The question to carry through: where is all this going?

## Watch an agent build an agent

**Agent generates agent.** You watch one agent build another on real input. That's the whole lecture.

[Exercise: Extend your system](exercises/extend-your-system.md)

[Exercise: Agent Proposal Forum (diagnose and guide)](exercises/joint-double-diamond.md)

Module 7's three disciplines run again at room scale on the sponsor challenge. Finding the *crux* shapes each initial stance. Cross-checks make agents notice rival evidence before publishing. *What would have to be true?* and *pre-mortem* appear when agents criticize the synthesizer's choices.

[Lecture: Where is this all going?](lectures/where-is-this-all-going.md)

## Debrief

Five minutes. The agent reviews the session, rewrites the most load-bearing file in place (synthesizer rules, strategy kernel, agent set, plan, or argument rules), and reports what changed. It reads everything you produced. You push back on anything that's off.

{{prompt:a101-m8-debrief-flywheel-sharpen}}

> **Watch for slowness.** When you push back, the agent should edit the section you flagged, not rewrite the whole file. Kernel and agent-set files run large, so full rewrites drag. If it reaches for one, push back: *"Edit just the section I named."*

The prompt names the file before rewriting, quotes before-and-after for every claim, and surfaces stalls. Precision compounds. So does blur.

## Push back on the summary

The agent audits itself, so the summary is not neutral. If it sounds too clean, ask: *"Name one critique raised in the session that did not change the rewritten file. Quote the critique and the unchanged line."*

Push back where the summary is wrong. Some unresolved items should stay unresolved. The flywheel will sharpen the file again on your next problem.

## Key Concepts
- Cross-check before publishing; critique before selection.
- Agents must cite each other, or they invent memory.
- Past the laptop: data access, runtime platform, discoverability.
- Parts hold; the model rotates.

## Next

Your plan is a set of assumptions: label them, start the concurrent pieces, and design experiments for the uncertain ones.

The agent that matters in six months is one nobody in this room has thought of, built by somebody who is not you. You take out the ability to build it. That is slower and harder to put on a slide, and the only part worth anything after the model changes.

You leave with a flywheel, not a graduation.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@4d9c4af2 slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @12bf0d81: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Key Concepts minimal (2026-09-24, Antti-directed).** A glance list of handles, nothing born here: every law on it is earned in the lecture that follows the exercise, `where-is-this-all-going.md`.

**Mood target:** Awe and curiosity — the student leaves wanting the next move, not feeling tidily graduated.

**Decision note 2026-09-23.** Executes `curriculum/module-design/a101-story-proposals/blend.md` § M8. § Next drops the product-ladder clause (*"Agents 101 is the first of five steps, with Make Your Own next"*) and carries `braid-the-anatomy.md` § 4.7's against-interest paragraph in its place; *a flywheel, not a graduation* stays and now closes the module on its own line. This is the arc's single against-interest instance; `control-and-creativity.md` § 4's M7 "cheap half" paragraph is deliberately not also placed. The new closing lecture `where-is-this-all-going.md` is linked after the proposal forum and before Debrief, and carries the refrain's last turn, the absorption callback against the kernel's citations, and the two questions the module declines to answer.

**Push-back moves / Watch-fors / Decision points:** [M8 run sheet](trainer-modules.md#m8-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Identity-naming close (trainer):**
- In-room only. The sponsor who sat alongside the room for all eight modules may name what happened in one sentence: *"You are now agent builders. You built agents that do real work on company data. You can do it again on the next problem."* Keep it spoken, not student-facing body copy. No certificate. No graduation.

**Meta (trainer):**
- **Transitions:** demo 5 @start "Agent generates agent demo" · debrief 5 @end "Debrief" · identity close 5 @end "Identity-naming close"
- **Where these numbers come from:** demo from this block's own **Demo time:** line; debrief from the body ("Five minutes."). Every beat here has no file of its own, so nothing else prices it.
- **Primary Bloom's level:** Create
- **Demo time:** ~5 minutes.
- **Materials (trainer):** demo agent that generates another agent (for the short lecture); separate SharePoint/OneDrive shared deliberation folder posted in chat at the start of the module; one subfolder per participant; buyer/sponsor challenge prompt; one or two central synthesizer prompts; midpoint instruction injection by the synthesizer through `midway-instructions.md`; domain prediction framework (rules codified + correctness verifiable + talent constrained). The three thinking disciplines — finding the *crux*, asking *what would have to be true?*, and running a *pre-mortem* — are used in M7 as plain exercise moves and can be named explicitly here at room scale. **No pre-shipped strategy skills anywhere in Agents 101** (M4 is the canonical personal-skill authoring module).
- **Plug points:** CTO/sponsor present; company's own strategy question feeds into all agents

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 7 next-step evidence | `module-7/monday.md` | M7 Phase 7 closing instruction and between-module test | M8 prework and initial stance ground |
| Module 8 extension brief | `module-8/extension-brief.md` | M8 extend-your-system exercise | M8 new-agent build and demo |
| New extension agent | `agents/<slug>.md` | M8 extend-your-system exercise | M8 demo; post-training system extension |
| Shared deliberation folder | trainer-posted SharePoint/OneDrive folder | M8 room setup | All M8 room-scale agents and central synthesizers |
| Sponsor challenge | shared-root `challenge.md` | Buyer/sponsor seed in shared deliberation folder | M8 stances, proposals, selection, kernel, agent set, and plan |
| Participant deliberation files | participant subfolders with context manifests, stances, cross-checks, proposals, critiques, pushback | M8 room-scale agent runs | Central synthesizer selection and final plan |
| Central synthesis files | `selection-board.md`, `midway-instructions.md`, `strategy-kernel.md`, `agent-set.md`, `plan.md` | M8 central synthesizer agents | M8 Debrief; sponsor/CTO post-training next steps |

**Plug Points (trainer):**
- **CTO/sponsor in the room.** Their agent seeds the challenge and is one natural central synthesizer: selects the strongest proposals, preserves the best critiques, forces pushback. In larger or more political rooms, run two synthesizers: one for selection, one for disagreements and missing evidence. If sponsor isn't present, the role rotates and the final decision (which assumptions to commit to) is provisional.
- **Company strategy question.** Default is "our strategy for agents over the next six months." If the cohort has a live portfolio, re-org, or supplier question, swap it in — the disciplines don't change, the material does.
- **Agent demos.** Every participant shipped at least one real agent over the training (promised from Module 1, built progressively from Module 2 onward). The Extend exercise produces one more. The demo round — each participant shows what their agent does, on their real data — is part of the Module 8 deliverable, not separate from it.

**Live Deliberation Runtime**

The peak of M8 is **networked personal agents in live deliberation, with one or two central synthesizers selecting the strongest ideas and humans joining at the decision layer.** Each participant's personal agent — built across M1-M7 with their company's context — takes an initial stance, cross-checks with neighbouring agents, writes proposals to the separate shared deliberation folder, then criticizes the synthesizer's selection and proposes better ideas. The synthesizer concludes with the suggested agent set and the plan. Humans contribute by talking in the room and by steering their agents at decision beats. They do not run the plumbing.

Why this is the right direction:
- Genuine heterogeneity of context. 10 real agents from 10 real orgs argue through a shared problem. The diversity is the insight.
- Entire M1–M7 arc pays off in M8. The personal agent ARRIVES loaded with memory, sources, skills, evals, sharing protocol.
- Agents orchestrating agents, applied to itself. M8's own thesis made literal.
- Understandable magic. Students read every published file and pushback; the shared folder is the mechanism.
- Designed to the capability landing, not the one from six months ago.

Runtime default:
- The shared write surface is a separate SharePoint directory or OneDrive shared folder.
- It starts nearly empty: one folder per participant, plus `challenge.md` and root synthesis files created live.
- Every participant writes only to their own named folder.
- One or two central synthesizers write shared selection, agent-set, plan, and synthesis files at the shared root.
- Midway through, the central synthesizer writes `midway-instructions.md`; later agent prompts consume that file directly as injected operating rules. Participants do not hand-prompt the cross-pollination behavior or edit local `CLAUDE.md` for this step.
- Pushback is live: humans talk in the room, then steer their agents to publish critiques, corrections, or better ideas. The central synthesizer reads those files and rewrites the selection, agent set, plan, or kernel.

- No self-study variant for this capstone. A solo substitute would remove the live heterogeneity, shared write surface, cross-checks, proposal critique, and human decision layer that make the exercise work.

Detailed notes: `memory/project_m8_joint_panel.md`.

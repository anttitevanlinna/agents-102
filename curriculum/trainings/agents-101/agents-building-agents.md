# Agents Building Agents (The Flywheel)

## Big Idea
The tool that builds tools compounds.

## Prework

Run `module-7/monday.md`, test one assumption, ask for one name, and talk to one person. Then revisit the three thinking disciplines you used there: find the crux, ask what would have to be true, and run a pre-mortem.

## What You'll Learn
After this module, you will be able to:
- **Use** your Claude runtime to generate a new agent that extends your system
- **Orchestrate** three thinking disciplines at room scale against a real company question
- **Produce** a strategy kernel, suggested agent set, and two-week plan grounded in your actual files
- **Explain** how the deliberation cycle sharpens the strategy kernel and the next agent set

## Start here

Start a fresh <span class="rt-code">Claude Code session</span><span class="rt-cowork">Cowork task</span> at `~/Documents/agents-101/`. That local session reads the full agent system and `module-7/monday.md`; the room-scale exercise uses a separate shared deliberation folder so participant files do not blur into the local stack.

At the start, the shared folder is nearly empty: each participant gets one folder named after them, the buyer/sponsor seeds `challenge.md`, and one or two central synthesizer agents write the selection, agent-set, and plan files at the shared root.

Eight modules of compounding sit on disk. A memory. Agents that read it. Skills that audit the agents. Judges that catch the skills drifting. Each module raised a ceiling. Today the ceiling moves on its own.

The question that shows up without being asked: *where is this all going?*

Hold that. Module 8 doesn't answer it. It shows you the shape of an answer you'll keep sharpening.

## Watch an agent build an agent

**Agent generates agent.** The meta-tool in action. Sets up the Extend exercise. You watch one agent build another, end-to-end, on real input. That's the whole lecture.

[Exercise: Extend your system](exercises/extend-your-system.md)

[Exercise: Agent Proposal Forum (diagnose and guide)](exercises/joint-double-diamond.md)

The three thinking disciplines you applied in Module 7 on your own sharing problem run again here at room scale on the sponsor challenge. Finding the *crux* shapes each initial stance. Cross-checks force agents to notice rival evidence before they publish proposals. *What would have to be true?* and *pre-mortem* appear when agents criticize the synthesizer's choices and propose better ideas. Same disciplines, named inline in the prompts. Bigger instrument.

## Debrief

Five minutes. Claude reviews the session and sharpens whichever file carried the load: the central synthesizer's rules, the strategy kernel, the agent set, the plan, or the rules that governed how the agents argued. The evidence is what you produced: the context manifests, stances, cross-checks, proposals, selection board, synthesizer-injected midpoint instructions, critiques, pushbacks, kernel, agent set, and plan. Claude reviews, rewrites the most load-bearing file in place, reports what changed. You push back on anything that's off.

{{prompt:a101-m8-debrief-flywheel-sharpen}}

> **Watch for slowness.** When you push back on the rewrite, Claude should Edit the section you flagged, not rewrite the whole file. Kernel and agent-set files run large; full-file rewrites per pushback turn drag. If Claude reaches for Write on the whole file anyway, push back: *"Edit just the section I named."*

Notice what this prompt insists on: name the file before rewriting, quote the before-and-after for every claim, surface stalls even if the round felt smooth. The flywheel amplifies specificity the same way it amplifies everything else. Precision compounds. So does blur.

## Push back on the summary

This is a self-audit of a live agent round. Convenient, not neutral. If the summary sounds too clean, ask the harsher read: *"Name one critique raised in the session that did not change the rewritten file. Quote the critique and the unchanged line."*

Read Claude's summary. Push back where it's wrong. Some of what didn't resolve shouldn't resolve. It's the live edge of the work. The flywheel that sharpened the file just now is the one that will sharpen it again after Agents 101, on the next problem, on the one after that, on the one you don't yet know you have. You just watched it compound.

## Key Concepts

- **Self-improvement**: each cycle sharpens the next. Proposals read sharper than initial stances because the agents cross-check before publishing, then critiques sharpen the synthesizer's selection.
- **Org capability**: many agents reading and proposing in parallel produce a kernel, agent set, and plan grounded in your own files, not a single consultant's read.
- **The three predictable walls past the laptop loop**: data access, runtime platform, discoverability. The plan already names which wall bites first for your company. Seeing them is the sign the kernel works.
- **Thinking disciplines you take home as named moves.** Crux, *what would have to be true?*, pre-mortem aren't props and they aren't installed skills. They're portable disciplines you ask Claude to run on any decision too big to eyeball.
- **Grounding when agents read agents.** Every agent publishes what it read, what it couldn't find, and what it inferred without a source. Every claim cites the file it came from. Without that rule, agents reading agents smoothly hallucinate each other's memory.

## Next

The plan you just produced is a set of assumptions dressed as work: label them, start the concurrent pieces, and design experiments for the uncertain ones. Agents 101 is the first of five steps, with Make Your Own next; you leave with a flywheel, not a graduation.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-23 (writing@194c81b0 story@194c81b0 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@725101ec slides@194c81b0)
- judges @194c81b0: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @090407d3: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Mood target:** Awe and curiosity — the student leaves wanting the next move, not feeling tidily graduated.

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

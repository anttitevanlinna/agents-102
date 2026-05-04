# Agents Building Agents (The Flywheel)

## Big Idea
The tool that builds tools compounds.

## Prework

Run the Module 7 next-step artifact, test one assumption, ask for one name, and talk to one person. Then read Risto on acting on the future and building hypotheses, and Rumelt on crux / *Good Strategy Bad Strategy*.

## What You'll Learn
After this module, you will be able to:
- **Use** Claude Code to generate a new agent that extends your system
- **Orchestrate** three thinking-disciplines from Rumelt, Roger Martin, and Klein and Kahneman at room scale against a real company question
- **Produce** a strategy kernel, suggested agent set, and two-week plan grounded in your actual files
- **Read** the flywheel itself (why the cycle that sharpened the kernel just now is the one that sharpens it again after Agents 101)

## Start here

Module 8 reads the full agent system, the Module 7 next-step file, and the sponsor challenge. The trainer posts a separate shared deliberation folder in chat for the room-scale work. In-room, the shared folder is nearly empty at the start: each participant gets one folder named after them, the buyer/sponsor seeds `challenge.md`, and one or two central synthesizer agents write the selection, agent-set, and plan files at the shared root.

Eight modules of compounding sit on disk. A memory. Agents that read it. Skills that audit the agents. Judges that catch the skills drifting. Each module raised a ceiling. Today the ceiling moves on its own.

The question that shows up without being asked: *where is this all going?*

Hold that. Module 8 doesn't answer it. It shows you the shape of an answer you'll keep sharpening.

**Agent generates agent (demo, ~5 min).** The meta-tool in action. Sets up the Extend exercise. You watch one agent build another, end-to-end, on real input. That's the whole lecture.

[Exercise: Extend your system](exercises/extend-your-system.md)

[Exercise: Agent Proposal Forum (diagnose and guide)](exercises/joint-double-diamond.md)

The three thinking-disciplines you applied in Module 7 on your own sharing problem run again here at room scale on the sponsor challenge. *Crux* shapes each initial stance (Rumelt). Cross-checks force agents to notice rival evidence before they publish proposals. *What would have to be true?* and *pre-mortem* appear when agents criticize the synthesizer's choices and propose better ideas. Same disciplines, named inline in the prompts. Bigger instrument.

## Key Concepts

- **Self-improvement**: each cycle sharpens the next. Proposals read sharper than initial stances because the agents cross-check before publishing, then critiques sharpen the synthesizer's selection.
- **Org capability**: twenty people just produced a strategy kernel, agent set, and plan no consultant could deliver, because it's grounded in your company's own files and the room's live proposal market.
- **The three predictable walls after Agents 101**: data access, runtime platform, discoverability. The plan you produced already names which wall bites first for your company. That you can see them is the sign the kernel works.
- **Domain prediction framework**: rules codified + correctness verifiable + talent constrained = agent-ready. Apply it to your company's 200 processes to pick the first 5 to try.
- **Thinking disciplines you take home as named moves.** Crux, *what would have to be true?*, pre-mortem aren't Module 8 props and they aren't installed skills. They're named, portable disciplines you ask Claude to run after training, on any decision that feels too big to eyeball, same shape as the Module 2 Debrief move.
- **Grounding when agents read agents.** Every agent publishes what it read, what it couldn't find, and what it inferred without a source. Every claim cites the file it came from. Without that rule, twenty agents smoothly hallucinate each other's memory. With it, the pushback rounds have something to push back at.

## Debrief

Five minutes. Claude reviews the session and sharpens whichever file carried the load: the central synthesizer's rules, the strategy kernel, the agent set, the plan, or the rules that governed how the agents argued. The evidence is what you produced: the context manifests, stances, cross-checks, proposals, selection board, synthesizer-injected midpoint instructions, critiques, pushbacks, kernel, agent set, and plan. Claude reviews, rewrites the most load-bearing file in place, reports what changed. You push back on anything that's off.

**Prompt** *(Builder Claude)*

```
Start by identifying the file path. No plan or preamble.

Review this session and sharpen the file that carried the most weight — most likely the strategy kernel, agent set, plan, or central synthesizer's rules, whichever governed how the agents argued and selected. Identify the file path and confirm in one line before rewriting; overwrite in place, do not create a parallel version. Then scan the shared deliberation folder: challenge, context manifests, stances, cross-checks, proposals, selection-board, midway-instructions, critiques, pushback, kernel, agent-set, plan. Identify which synthesizer-injected midpoint instructions actually changed later agent behavior.

Look back over the session: surface at least two flywheel stalls (an agent waiting on another that never finished), at least one under-specified role (so two agents played it or none did), and at least one proposal the room converged on too fast — name which proposal and which agent could have pushed back but didn't. Where did a critique land and change a selection? Where did the plan invent a dependency that could actually run concurrently (capture that as a rule)? What did the session fail to decide, and why?

Then rewrite the file. If you are uncertain which file carried the most weight, default to the central synthesizer rules file; do not pause. Integrate, don't append. Add the role that was underspec'd, sharpen the rule for how pushback forces a stance-update, remove a rule that made agents defer when they should have argued. Preserve any rule not directly contradicted by session evidence. Don't add a "retro notes" section; rewrite the file as the better version. Do not close every loop — some of what didn't resolve should stay open, named.

When you're done, tell me in 3-5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why. For each claimed change, quote the before-and-after line or section header so I can confirm it landed. Name which critique was raised but not acted on, and which file's rules directly contradicted what happened. If you think every critique was acted on, quote the evidence. Name one thing the session genuinely didn't resolve.
```


Notice what this prompt insists on: name the file before rewriting, quote the before-and-after for every claim, surface stalls even if the round felt smooth. The flywheel amplifies specificity the same way it amplifies everything else. Precision compounds. So does blur.

This is a self-audit of a live agent round. Convenient, not neutral. If the summary sounds too clean, ask the harsher read: *"Name one critique raised in the session that did not change the rewritten file. Quote the critique and the unchanged line."*

Read Claude's summary. Push back where it's wrong. Some of what didn't resolve shouldn't resolve. It's the live edge of the work. The flywheel that sharpened the file just now is the one that will sharpen it again after Agents 101, on the next problem, on the one after that, on the one you don't yet know you have. You just watched it compound.

## Next

The plan you just produced is a set of assumptions dressed as work. Label them. Start the concurrent pieces, and design experiments for the uncertain ones. That's the first move after Agents 101. Agents 101 is Step 1 of 5 (Make Your Own is next). You don't graduate. You have a flywheel.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-02 (writing@3d7e76c story@3d7e76c)
- judges @3d7e76c: writing PASS, story PASS, technical grandfathered, behavior REVISE (accepted residual per memory/compounded/2026-05-02-pedagogy-debrief-prompts-residual-med-risk-by-design.md)

**TODO (Cowork edition review 2026-04-29):**
- First learning goal says "Use Claude Code to generate a new agent." Runtime-fork or neutralize for Cowork so the goal remains "use the runtime to generate a new agent" without making Cowork feel like a secondary path.

**Identity-naming close (trainer):**
- In-room only. The sponsor who sat alongside the room for all eight modules may name what happened in one sentence: *"You are now agent builders. You built agents that do real work on company data. You can do it again on the next problem."* Keep it spoken, not student-facing body copy. No certificate. No graduation.

**Meta (trainer):**
- **Primary Bloom's level:** Create
- **Materials (trainer):** demo agent that generates another agent (for the short lecture); separate SharePoint/OneDrive shared deliberation folder posted in chat at the start of the module; one subfolder per participant; buyer/sponsor challenge prompt; one or two central synthesizer prompts; midpoint instruction injection by the synthesizer through `midway-instructions.md`; domain prediction framework (rules codified + correctness verifiable + talent constrained). The three thinking-disciplines — Rumelt on *crux*, Martin on *what would have to be true?*, Klein and Kahneman on *pre-mortem* — are used in M7 as plain exercise moves and can be named explicitly here at room scale. **No pre-shipped strategy skills anywhere in Agents 101** (M4 is the canonical personal-skill authoring module).
- **Plug points:** CTO/sponsor present; company's own strategy question feeds into all agents

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

Still to dry-run:
- Exact OneDrive/SharePoint sync timing with 10-20 concurrent writers.
- Whether the central synthesizer prompt should be generated during the agent-generates-agent demo or pasted inline. **Not** as a pre-shipped skill.
- No self-study variant for this capstone. A solo substitute would remove the live heterogeneity, shared write surface, cross-checks, proposal critique, and human decision layer that make the exercise work.

Detailed notes: `memory/project_m8_joint_panel.md`.

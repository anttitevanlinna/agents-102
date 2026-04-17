# Agents 102 — Content Strategy

The training-level narrative: arc, storyline, audience, deliverable, supplementary materials. Per-module sections below carry the pedagogical scaffold (Connections, Exercise, Lecture, Reflection, Bridge).

**Alignment rule (important).** The module files in `trainings/bootstrap/` are the canonical spine for Bootstrap. The exercise named in each module section here MUST match the exercise in the corresponding module file. When one changes, the other changes in the same edit. Drift between the two is a process bug — not a matter of taste.

See `lecture-guardrails.md` for all pedagogical and design rules. See `CLAUDE.md` for content development rules (including the one-exercise-per-module principle).

## Modules

1. Getting Going
2. Building Agent Systems
3. Multi-Agent Systems
4. Security
5. Output Quality and Hallucination Control
6. Evaluations
7. From Personal to Team
8. Agents Building Agents (The Flywheel)

## Arc Logic

- **Modules 1-3** build incrementally: get started → grow the project → coordinate multiple agents. Each module's project grows from the previous one — not throwaway exercises but a single system that gets more sophisticated.
- **Modules 4-6** add the disciplines that separate toys from production: security, output quality, evals. These retrofit onto what was built in 1-3 — participants experience "I built something that works but I can't trust yet."
- **Module 7** scales up: your agent works for you, now make it work for the team. Governance, shared context, ownership.
- **Module 8** is the flywheel insight: agents that build agents. Code-generating agents as the meta-tool.

## The Problem

Everyone says agents will be the big thing. Vendors are selling it. Boards are asking about it. McKinsey, Deloitte, IBM — they've all published frameworks for the "agentic enterprise."

But without agent competence, there is no vision. The consultancy frameworks are governance of an abstraction. Leadership reads the McKinsey report, approves a governance framework, launches an initiative portfolio — and 18 months later, nobody in the room has ever seen an agent work with their company's data.

Previous transformations — digital, agile, cloud — could be led from strategy alone. The agentic transformation is different. You cannot envision what agents do for your organization if you cannot think agents. The gap is not between strategy and execution. The gap is between strategy and competence.

## Who Moves First

The builder leader. The CEO, CTO, SVP HR who wants to own the transformation — not outsource it to a consultancy. Psychographic, not a title. Personally frustrated with transformation theatre: governance frameworks that govern nothing real, initiative lists with no vision behind them.

They want their organization to *have* the competence, not rent it. When the consultancy leaves, the slides go stale — but when people learn to think agents, the capability compounds. They need to look outward at the super early adopters — people using Claude Code, ChatGPT, Codex, automating their lives and businesses right now. Once the builder leader gets it, they can move with their own structure, their own policies, their own people.

## What We Teach

The fundamentals of making agents with LLMs. Fundamentals-first, not tool-first. Tools will change. Platforms will mature. The person who understands how LLMs power agents will adapt to whatever comes next.

- What an LLM actually does (demystified, no jargon)
- How you go from "a chatbot" to "an agent" — what changes, mechanically
- What tools, memory, and reasoning mean in practice
- How to give an agent a task, boundaries, and judgment
- What early adopters are doing right now with real tools

## What Graduates Can Do

After Bootstrap, participants should be able to design, build, and manage real agent systems that create ongoing value in their organization. Not toy demos — working systems they'd stake their reputation on.

### Underlying Capabilities

**Design & Architecture** — Decompose a business problem into agent-solvable steps. Design multi-step agent pipelines. Choose when to use single vs. multi-agent. Define agent boundaries.

**Building & Implementation** — Create agents using Claude Code. Give agents effective instructions, tools, and constraints. Connect agents to real data sources. Build periodic/scheduled agent workflows. Integrate domain knowledge into agent behavior.

**Quality & Reliability** — Design and implement evals that catch fabrication and quality problems. Build feedback loops. Know the difference between "looks good" and "is verified."

**Security & Trust** — Identify trust boundaries. Prevent common risks. Design agents that are safe to give real access to real systems.

**Scaling & Multiplication** — Explain what agents are and why they matter — without jargon. Identify high-value agent opportunities in any business domain. Guide others through building their first agent. Create the conditions for agents to improve themselves.

### The Standard

A graduate doesn't need to be a software engineer. But they need to be able to: **Describe** what an agent system should do with enough precision that it can be built. **Build** a working agent for a real use case. **Evaluate** whether an agent's output is trustworthy using systematic methods. **Operate** an agent system beyond the demo stage. **Multiply** — teach someone else to do the same.

## The Scaling Challenge

You cannot train everyone at 1000/head. Too expensive, too slow. The answer is a five-step journey:

1. **Bootstrap** — 500/person, 2-day intensive. Anyone can walk in. You build a real agent.
2. **Make Your Own** — key change leaders design the rollout. Change strategy lab.
3. **Champions** — the best from Bootstrap learn to facilitate and adapt. Train-the-trainer.
4. **Scale** — champions run it inside their org, with their own structure. Zero external dependency.
5. **Drive into Value Chains** — where do agents create real business value? Map, rework, learn from peers.

All materials co-branded with the customer, co-copyright for further development. Anti-SAFe: no lock-in, no certification dependency. If you stop working with us, you keep everything.

## The Storyline

**Act 1: "I can create something"** — The empowerment moment. You sit down with Claude Code and make an agent that does something real. Skeptics become believers. The personal "I did that" feeling.

**Act 2: "How do I scale it?"** — The natural next question. I made one agent for myself — how does this become something a team, a department, an organization can use?

**Act 3: "How do I control it?"** — Security. Reliability. Fabrication. Trust. The things that separate a toy from something you'd stake your reputation on.

**Act 4: The flywheel** — Agents creating agents. The ultimate scaling mechanism. The tool that builds tools compounds.

## The Undertone

This training is direct: we don't know exactly where this is going. Nobody does. But agents are being built right now, by real people, solving real problems. The skill isn't predicting the future. It's learning to move through uncertainty. This directness builds trust. The leaders in the room know that anyone promising certainty is lying.

## Why Code-Generating Agents Are the Flywheel Class

Traditional agent tools (LangChain, CrewAI, n8n, Power Automate) are linear. You build an agent, it runs, done. No compounding.

Code-generating agents (Claude Code, Codex) are meta-tools: you build with it → it builds agents → those agents create value → you need more agents → you already know how to build them → the capability compounds. The consultancy frameworks miss this because they think about deploying agents, not about the meta-capability of building agents with agents.

Bootstrap uses Claude Code because we are teaching people to use the agent that makes all other agents.

## A Note on Weight

The storyline is deliberately light — not thick, not textbook-heavy. It rolls forward naturally, driven by curiosity: smart people asking good questions about a future that nobody fully understands yet. The depth is in the doing, not in the reading.

## Choosing the Initiative

Pre-agreement conversation with the sponsor: "What should we work on during the training?"

The company brings their own content and goals. One company has a product knowledge base. Another has compliance processes. Another has competitive intelligence. That content becomes the LLM brain backbone of every exercise from Module 2 onward.

**What makes a good initiative:** Something the company already has content for, that everyone in the room understands, and that touches enough complexity to sustain 8 modules.

**What makes a bad initiative:** Too specialized (only 3 people understand it). Too abstract ("improve our processes"). Too regulated (compliance overhead dominates learning). Too novel (nobody has a baseline).

## What Success Looks Like

- **30 days:** Changed conversations. "We could build an agent for that" becomes natural.
- **60 days:** 5+ people building prototype agents on their own. Sharing WoW moments and failures.
- **90 days:** Agents doing things the company couldn't do before. The CTO hears about it without asking.

## Bootstrap Is Step 1 of 5

After Bootstrap, three gaps remain:

1. **Infrastructure + deployment.** Bootstrap teaches building and discipline, not CI/CD or production monitoring.
2. **Governance framework.** Bootstrap shows WHY governance matters. Building the framework is Make Your Own (Step 2).
3. **Organizational buy-in.** 20 trained people in a 5000-person org. The strategy deliverable starts the conversation.

The funnel: Bootstrap → Make Your Own → Champions → Scale → Drive into Value Chains.

---

## Prework

**Done before training day. Three tasks + one read. ~30 min for the tool-comfortable, up to ~60 for a first-time user.**

### Before you start (5 min setup check)

- **A Claude account** at claude.ai. The training runs on the Claude Pro or Team tier — the customer confirms licensing.
- **Claude Code installed.** Use the **desktop app** (macOS/Windows) or the **web version** (claude.ai/code). **No terminal required.** If you've never used a terminal, stay with desktop or web.
- **An hour.** More than it sounds like; less than it feels like.

### Task 1 — Snake game (10 min)

Open Claude Code. Start a new project. Paste this prompt:

```
Build me a snake game as a single HTML file. Save it as snake.html in this project.
```

Claude writes the file. Open `snake.html` in your browser. Play. Keep the file.

*Proof: Claude Code can write code and save files on your machine.*

### Task 2 — Your week in meetings (10 min)

Two paths. Pick whichever matches your setup.

**Path A — connector enabled** (Microsoft 365 or Google Workspace). Paste:

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt in this project.
```

**Path B — no connector / no admin rights.** Attach a screenshot of your calendar week view. Then paste:

```
Based on the calendar screenshot I just shared, list my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt in this project.
```

*Proof: Claude can read your real work data — in whichever shape you can provide it — and produce a useful summary.*

### Task 3 — Read the mental frame (10 min)

Open `curriculum/supplementary/what-is-an-agent.md`. Read section 1: **LLM vs chat — what's the difference?** Two pages. You'll meet the rest as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

---

You arrive on Day 1 with: Claude Code working, a snake game, a meetings summary, and a 2-page read. Module 1 just gets going.

**Personal agents** (daily planner, email triage, or similar scheduled agents) — too ambitious to self-serve before class. **Moved to Module 2 prework** where Module 1's context is under the belt.

> CUSTOMER: Claude Code licenses (Pro or Team tier) for all participants. Calendar connector (M365 or Google Workspace) enabled by IT before the cohort — or explicit acknowledgement that some participants will use the screenshot fallback.

## Every student ships at least one real agent

Standing promise of the training. Over the course of Bootstrap, every participant builds at least one agent that does something real in their work — not a toy demo, an agent with their data, solving their problem. **Demoed at the closing session (Module 8).** The demo moment is part of the deliverable, not just show-and-tell.

---

## Getting Going

**Big idea:** With the right guardrails, you create output that's genuinely yours — not generic.

**Warm-up. Everyone creates something real and sees what guardrails do to quality.**

- Connections: "What have you used ChatGPT/Claude for? What was the best thing it made for you? What was generic about it?"
- Lecture: **"Context is King"** — 15-min trainer demo. Two Claude windows, same second question ("what should we have for dinner?"), different first prime ("capital of Italy" vs "largest lake in Finland"). Same words, different answers — context colored everything. Third window with "I'm a cardiologist" extends the lesson: context isn't only about countries, it's whatever you tell it.
- Exercise: **Personal site with guardrails** — 45-min build. Six phases. Phase 1: boring baseline. Phase 2: colleague-as-buyer differentiation frame (who comes to you for help, what problem you solve, how you guide — StoryBrand for work life). Phase 3: strengths that serve them. Phase 4: look back at the baseline — find three empty/wrong claims. Phase 5: anti-branding via mirror — what you hate, flipped, surfaces what you're great at. Phase 6: free iteration until "this is me."
- Teaching moment: You are the world's best evaluator of your own profile. You caught the fabrication because you know the truth. That instinct is everything.
- Reflection: "What surprised you about what it got right? What surprised you about what it got wrong?"
- Homework: Antti's LLM brain post (from whitepaper). Sections from "What is an Agent" supplementary doc (see below).
- Bridge: You just made great output. But it's a one-shot. What if it could remember, grow, and compound?

---

## Building Agent Systems

**Big idea:** A system remembers, grows, and compounds. Chat doesn't. Your company's own content is the foundation.

**Start the LLM brain. Build agents that use it. The company's content runs through everything from here.**

Each company brings their own content and goals — pre-agreed with the sponsor. One company has an AI-ready product knowledge base. Another has a great security/compliance process. Another has competitive intelligence they want to systematize. That content becomes the LLM brain, and the brain becomes the backbone of every exercise from Module 2 onward.

The exercises are structurally the same across companies. What changes is what's inside the brain.

> CUSTOMER: Company knowledge base / content for the LLM brain. Pre-agreed with sponsor. Examples: product knowledge base, compliance process docs, competitive intelligence files, customer insights database/files. Must be in a format agents can read (text, markdown, PDF, structured data). This is the backbone of every exercise from here onward.

- Connections: "How many of you saw the Karpathy LLM wiki post? What's the difference between asking an LLM a question and having an LLM maintain a knowledge base for you?"
- Concept: Three layers — raw sources (the company's content, immutable), wiki/brain (LLM-maintained, compounding), schema (the rules — CLAUDE.md)
- Exercise: **Stand up your company brain** — Ingest the company's source materials. Watch the agent build the initial knowledge pages, add cross-references, refine summaries as you feed in more. Build an agent that does real work drawing from the compiled knowledge — drafting, checking, synthesizing. Query the brain directly. Let the agent lint its own brain for contradictions, gaps, stale claims. The system maintains itself.
- Teaching moment: Persistence + automation = system. It remembers. It runs. It grows. And it's YOUR content — not generic.
- Lecture: **"Compounding"** — how to make your agent learn and self-correct. Each cycle builds on the last. The brain gets sharper, not just bigger. Self-correction as a design pattern, not a wish. Reference: Pawel Huryn and his pragmatic instructions (see his X.com feed for specific recommendations).
- Concept (emergent): File-based architecture. Why markdown files beat databases for this. The LLM writes text and is best at text.
- Reflection: "What other content from your company would you feed this? What would change if your whole team had access to this brain?"
- Bridge: You have agents doing real work with your content. But the job is getting too big for one agent. What do you split?

---

## Multi-Agent Systems

**Big idea:** Split the work. Each agent does one step and passes it forward.

**User sentiment analysis. Three agents, two rounds each, one synthesis.**

Prework: Agent memory — agentic RAG vs. traditional RAG, filesystem as memory. Agent tools and MCP.

- Connections: "Your brain agent does everything. What if you had specialized agents that each see a different part of reality?"
- Concept: The assembly line — each agent does one job, passes work forward. Sequential pipeline, not a mesh.
> CUSTOMER: Customer insights data — support tickets, NPS results, feedback forms, or similar. Also: list of review platforms where the company is discussed (G2, App Store, Trustpilot, etc.) and key competitors to monitor.

- Exercise: **Assembly-line sentiment analysis** — Build three specialised agents that each see a different slice of reality: direct customer feedback (support tickets, NPS, feedback forms), public reviews (G2, App Store, Trustpilot, Reddit), and competitor remarks (same public sources, different lens). Run each agent for two rounds — round two shows the brain sharpening as new sources confirm, contradict, or deepen round one. Synthesize across all three. The finding no single agent could produce: "customers complain about X, competitor Y is praised for X." Internal perception vs. external reality.
- Teaching moment: The seams are where it fails. Multi-agent coordination is a handoff problem. What happens when one agent's output is noisy or biased?
- Lecture: **"Setting Up Proper Competitor Analysis"** — tips and tricks for scraping the internet (what works, what doesn't, what breaks). Synthesis techniques: how to turn noisy multi-source data into findings that hold up.
- Concept (emergent): When is one agent better than three? Not always obvious. Three agents here because they see genuinely different data — not because splitting is inherently better.
- Reflection: "What surprised you in the synthesis? Did any finding contradict what your company believes about itself?"
- Bridge: You built something that works. But can you trust it? Tomorrow we break it.

---

## Security

**Big idea:** Your agent just violated company policy. That's YOUR problem.

**The compliance violation. Skills as the security architecture. Not prompt injection — business risk.**

Prework: personal reading on the skills system (how skills scope agent capabilities, permissions, tool access).

- Connections: "What's the worst thing your agent could do with access to company data?"
- Exercise: **Audit and contain with skills** — Analyse your Module 3 system against the company's security, legal, and compliance rules. Where does it violate? What data shouldn't it touch? What output shouldn't it produce? Apply the trainer's pre-built compliance skills, re-run, see what changes — what the agent can no longer do, and why that's the right answer.
- Teaching moment: It looked good. It was wrong. Your tests wouldn't have caught this.
- Optional exercise: **Build your own skill** — scope a boundary that matters to you.
> CUSTOMER: Security policies, legal rules, compliance processes — as usable documents. These get turned into skills before training. Can be separately billed prep work if Antti builds the skills from company policies.
- Concept (emergent): Trust boundaries. What the agent can access vs. what it should access. Skills are how you enforce this.
- Reflection: "What policy does your organization have that an agent could violate without knowing?"
- Bridge: It's secure. But is the output actually good?

---

## Output Quality and Hallucination Control

**Big idea:** LLMs will always fabricate. The skill is spotting it, adjusting the rules, and seeing the improvement.

Prework: 10 famous agent failures in real life (curated reading — TODO: build this list).

- Connections: "From the prework — which failure surprised you most? Could it happen with your system?"
- Lecture: **"Why LLMs Will Always Fabricate"** — not a bug to be fixed, a property to be managed. The statistical nature of generation. Why confidence and correctness are unrelated. Includes the compound reliability math (85% per step × 10 steps = 20% end-to-end).
- Exercise: **Find and tighten fabrication** — Apply the trainer's prompt pattern to your Module 2-3 output (optionally blend with internet search — the system will fabricate, that's designed). Spot what it got wrong, what it invented, what looks plausible but isn't supported. You are the domain expert — use that. Tighten the rules (add constraints, require citations, restrict claims). Regenerate. Compare. See what you gained. See what you lost — tighter rules kill good output too.
- Concept (emergent): The quality loop — generate, evaluate, adjust rules, regenerate. This is the discipline. Not a one-time fix but a continuous practice.
- Concept (emergent): The demo-to-production gap. Works once ≠ works reliably. Non-deterministic failure means you can't just "fix the bug."
- Reflection: "How confident are you in your system's output now? What would it take to stake your reputation on it?"
- Bridge: You can spot fabrication by eye. But you won't always be there. What if you could automate what you just did — turn your judgment into rules a machine can run? That's evals.

---

## Evaluations

**Big idea:** Evals are strategic steering, not testing. You're measuring whether the output is differentiated enough to matter.

**Two things: loop into desired outcome. Create eval criteria that reflect what YOU care about.**

Prework: Ethan Mollick — "Garbage Can and Bitter Lesson."

- Connections: "In Module 5 you spotted fabrication by eye and adjusted rules. What if you could automate that entire loop?"
- Lecture / prework: **"Evals as steering"** — `curriculum/lectures/evals-as-steering.md`. Reframes evals as strategic steering (not testing), distinguishes convergence vs. steering evals, sets up the exercises.
- Exercise: **Convergence eval — automate your Module 5 check** — Build an eval that checks for the fabrication patterns you found manually. Run it. Loop: generate → eval → adjust → regenerate until the output meets the bar. Experience the system converging on quality.
- Exercise: **Steering eval** — Run the shared customer-case criterion pre-agreed with the sponsor (real stakes — see how one criterion reads across different agents' output). Then design your own — not about correctness, but about what matters to YOU (brand voice, strategic differentiation, something no generic eval would check). Iterate the criterion itself — see what it catches, see what it misses. The eval is also an assumption.
- Teaching moment: Evals encode your assumptions about what matters. Wrong assumptions = wrong evals. The loop works for output AND for the evals themselves.
- Concept (emergent): Two uses of evals — convergence (looping to a desired outcome) and steering (encoding preference into the system). Both are essential.
- Throughline moment: "What would have to be true for these evals to be the right ones?"
- Reflection: "If your evals passed, would you stake your reputation on the output?"
- Bridge: You can build agents, secure them, evaluate them. But where do they live in the real world?

---

## From Personal to Team

**Big idea:** Your agent works for you. Making it work for the team is a different problem.

**Promotion: personal → team → company. What changes, what breaks.**

Prework: 8 short stories on how the best have scaled personal agents to team/company level (TODO: curate). Must include variance — different approaches, different scales. Must include: a skill-based story (team capability encoded as a skill), a recurring simple agent running in the cloud (cron job, not enterprise platform). Goal: show there's no single right way.

- Connections: "You've built something that works on your laptop. What would need to change for your whole team to use it?"
- Exercise: **Promote from personal to team** — List everything personal about your system: credentials, context, assumptions baked into guardrails — everything that breaks when someone else runs it. Redesign for the team: shared access to the brain, governance (who can ingest sources? who changes schema? who sees output?). Hand the whole thing to a pair partner. Can they run it? Can they get useful output without your context? Where does it fail?
- Teaching moment: The personal → team gap is not technical. It's about shared context, trust, and ownership. The agent that works because YOU know what it means doesn't work when 10 people interpret the output differently.
- Concept (emergent): The promotion path. Personal agents, team agents, company agents are different products. Promotion means redesigning, not just sharing.
- Reflection: "Who in your organization would own this system? Who decides what goes into the brain? Who's accountable when the output is wrong?"
- Bridge: You can build agents, secure them, evaluate them, and scale them to a team. What if you didn't have to build each one by hand?

---

## Agents Building Agents (The Flywheel)

**Big idea:** The tool that builds tools compounds.

**Everyone's agents run on shared context. The output is the synthesized AI strategy.**

Prework: Risto — acting on the future and building hypotheses. Rumelt — crux / good strategy bad strategy.

> CUSTOMER: CTO/sponsor present for Module 8. Their agent has a special role in Diamond 2 — drafting the guiding policy. They need to be in the room.

- Connections: "You've each built agents for one part of the initiative. What happens when they all run together?"
- Demo: **Agent generates agent** — the meta-tool in action. Sets up the Extend exercise.
- Exercise: **Extend your system** — Use Claude Code to generate a new agent that extends your system — a new data source for the brain, a new kind of output, a new perspective. You describe what you want. The coding agent builds it. It works. That's multiplication.
- Exercise: **Joint Double Diamond — diagnose and guide** — Everyone's agents run on shared context. First: agents synthesize a Rumelt-style crux list — real obstacles to the agentic transformation here, grounded in 8 modules of hands-on evidence. Agents prioritize. The room validates. Then: the CTO's agent takes the top 3 cruxes and drafts the guiding policy — how to resolve each one. Everyone's agents feed in actions and recommendations grounded in what they built. Personal agents cross-pollinate — your agent reads mine, flags conflicts, finds synergies. Output: the synthesized AI strategy.
- Teaching moment: Self-improvement — each cycle makes the next one better. They just saw it: Diamond 2 output was sharper than Diamond 1 because agents built on each other's work.
- Teaching moment: Org capability — 20 people just produced a Rumelt-style strategy kernel (diagnosis + guiding policy + coherent actions) that no consultant could deliver, because it's grounded in hands-on experience with the company's own content. And the agents did the synthesis.
- The deliverable: The synthesized AI strategy IS the executive recommendation. Not co-created on a whiteboard — produced by the system they built.
- Throughline moment: "This strategy is a set of assumptions. Label them. Design experiments to test them. That's how you start Monday."
- Reflection: "What will you build first when you get back to your desk?"

---

## Supplementary Materials

Reference documents that build up progressively across modules. Participants read assigned sections before the module that next expands them, and own the complete document as a standing reference after the training.

**Why these are not lectures.** Lectures are single-sitting events (a 15-min demo, or a 10-min reading before one module). Supplementaries cover concepts too complex to absorb in one sitting — their *progression* is the point. The "what is an agent" answer a participant needs in Module 1 is different from the one they need in Module 4. A monolithic reading can't meet them where they are; sections build as modules go.

Three supplementaries, with more to be added as patterns emerge:

1. **what-is-an-agent.md** — the agent-ness progression. LLM → chat → system → multi-agent → agents-that-judge → agents-building-agents. Sections added from Modules 1, 2, 3, 4, 5-6, 8.
2. **building-guardrails.md** — the constraint / context discipline. Guardrails as structured context → schema for knowledge → skills as scoped boundaries → generation rules. Sections added from Modules 1, 2, 4, 5.
3. **learning-and-compounding-systems.md** — the system-that-improves discipline. The brain → quality loop → eval iteration → agents building agents. Sections added from Modules 2, 5, 6, 8.

See `supplementary/README.md` for the full pattern: filename convention, section structure, how modules reference, and the pass-by-opportunity build (sections fill in as the modules they serve are written).

Sections are referenced from module files by title and section anchor, not inlined. Participants click through and see the full document in context — what's been covered, what's coming.

## Quick reference (lookup, not progressive)

Separate from supplementaries: `curriculum/reference/` holds flat lookup material — commands, connector setup, skill basics, troubleshooting. Different purpose from supplementaries (progressive, pedagogical). Curriculum content stays concept-focused; when a student needs an operational "how do I..." answer, content links to the reference:

> Stuck on the connector? See [Claude quick reference](curriculum.html?file=reference/claude-quick-reference).

Rule: if a lecture or exercise needs more than two sentences of "here's how to configure X," move X to the reference and link.

Current reference: **Claude Quick Reference** (install, files, connectors, skills, subagents, troubleshooting). Living document — grows as training uncovers gaps.

---

## Content production — eval-driven

Every lecture and exercise is evaluated with an LLM-as-judge before it ships. The eval system lives in `curriculum/evals/`:

- `lecture.md` — reusable lecture eval template (13 judges)
- `exercise.md` — reusable exercise eval template (13 judges including Scaffold provided and Prompt design)
- `instances/<training>--<slug>.md` — filled-in evals for specific lecture/exercise pairs, with eval-run log

Three possible verdicts: **APPROVE** (all judges pass), **APPROVE WITH TODOs** (essentials pass, contributory items deferred), **REVISE** (essentials fail). Good enough > polished — contributory TODOs ship with the content, appended as a labeled section at the bottom of the file.

The content produced through this loop is itself a demonstration of Module 6's pedagogy: using steering evals to build a steering-evals lecture. Meta-alignment is the point.

---

## State of play (as of 2026-04-17)

Bootstrap training — snapshot of what exists. Refresh this section at the end of every significant session.

**Fully built:**
- **Training-level:** prework (snake / calendar / mental-frame read), training index page at `site/curriculum.html`
- **Module 1 (Getting Going):** module file, Opening lecture (Context is King), Personal site with guardrails exercise (6 phases), Closing lecture (What just happened), Debrief (Claude retro)
- **Module 6 slice:** Evals as steering lecture (prework), Steering eval exercise
- **Supplementaries:** What is an Agent section 1 (the other two supplementaries are outline-only stubs)
- **Reference:** Claude quick reference (install, files, connectors, skills, subagents, troubleshooting)
- **Eval system:** lecture.md + exercise.md templates, 5 filled instances with eval-run logs, simulation protocol with 6 known Claude-behavior patterns

**Partially built (module files exist as spines, content still needed):**
- Modules 2, 3, 4, 5, 7 — module files have metadata, LOs, exercise/lecture names, bridge. Content files not yet written.
- Module 8 — module file exists; Joint Double Diamond exercise and agent demo not written.

**Open TODOs across the curriculum:**
- Backfill Debrief sections for modules 2–8 (Module 1 is the reference pattern)
- Consider renaming Module 1 to "Context is King" (requires cascade — see TODO comment at top of `trainings/bootstrap/getting-going.md`)
- Supplementaries `building-guardrails.md` and `learning-and-compounding-systems.md` are outlines; sections fill in as their modules are built
- Facilitator notes across all artifacts deferred per student-facing-first rule (below `---` rule; will be extracted to a dedicated artifact later)
- Module 2 prework (personal scheduled agent) not yet scaffolded — students build on the connector proven during training prework

**Workstream priorities (in rough order):**
1. Module 2 content (Building Agent Systems — LLM brain exercise + Compounding lecture)
2. Module 2 prework (personal scheduled agent — daily planner / email triage)
3. Modules 3–5 content
4. Supplementary sections as their modules land
5. Module 7 content
6. Module 8 content (Extend + Joint Double Diamond)
7. Facilitator notes pass across everything
8. Second training variant (mid-management) — reuse exercises/lectures/supplementaries; new `trainings/mid-management/` module files with audience-specific framing

**Content types in use** (see `CLAUDE.md` for decision tree): lectures (inlined, single-sitting), exercises (inlined, one bounded activity), supplementaries (not inlined, progressive reference), quick reference (not inlined, flat lookup with pointers to official docs).

---

## Reading List — Unallocated

Articles and readings to include as prework/homework. Not yet assigned to specific modules.

- ~~Ethan Mollick: "Garbage Can and Bitter Lesson"~~ → Module 6 prework
- ~~Rumelt: crux / good strategy bad strategy~~ → Module 8 prework
- ~~Risto: acting on the future and building hypotheses~~ → Module 8 prework
- Chip Huyen: AI Engineering (O'Reilly 2025) — best fundamentals book. No code, no math. Evals chapter candidate for Module 6 prework. Most-read on O'Reilly platform. [allocate to module]
- André Lindenberg: Claude Code's memory architecture (LinkedIn post) — three-layer design (index/topic files/transcripts), write discipline, skeptical retrieval. Maps to Module 2 LLM brain architecture. Candidate for Module 2 or Module 3 prework.

---

## To Add — Research Findings Not Yet in Curriculum

Gaps identified by comparing content strategy against research insights and patterns (April 2026).

**1. Compound reliability math** (Pattern 30, Level 3)
85% per-step accuracy ^ 10 steps = 20% end-to-end success. The single most useful number a CTO can take away. Explains why customer service works (2-3 steps) and complex processes don't.
→ Candidate: Module 5 lecture or teaching moment. "Why LLMs Will Always Fabricate" could include this math.

**2. Three enablers after competence** (Pattern 13, Level 2-3)
After Bootstrap, builders hit three predictable walls: (1) data access, (2) runtime platform, (3) discoverability. From F-Secure evidence.
→ Candidate: Module 8 strategy deliverable. The executive recommendation should name these three predicted walls.

**3. The Access-Trust Gap** (Pattern 47, Level 4 — strongest research finding)
54-95% of enterprises have AI access, but only 5-22% have trust/production readiness. Gap always >35 points. The bottleneck is trust-building, not technology.
→ Candidate: Module 7 teaching moment. "You've built something. Access is easy. Trust is the hard part."

**4. Agent sprawl / shadow agents**
500K agents inside Microsoft, 29% without IT approval. 50:1 non-human to human identities. 82% of executives think they're protected, only 24% have visibility.
→ Candidate: Module 4 prework reading or connections question. "How many agents already run in your company without IT knowing?"

**5. Domain prediction framework** (Level 4 meta-pattern)
Rules codified + correctness verifiable + talent constrained = agent-ready domain. Predicts which of 200 processes to try first.
→ Candidate: Module 8 strategy exercise. Give participants the framework. Apply to their company's processes. Feed into Diamond 1 crux diagnosis.

**6. Announcement-to-deployment gap** (Pattern 31, Level 3)
Every platform ships announcements faster than deployments. Foundry GA: zero new customers in 5 days. Frontier: zero evidence after 7 weeks. The vendor bullshit detector.
→ Candidate: Module 7 prework reading or connections question. Inoculates against vendor pitches.

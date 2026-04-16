# Agents 102 — Content Strategy

Working skeleton. Shuffle freely. Individual module files get written once this stabilizes.

See `lecture-guardrails.md` for all pedagogical and design rules.

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

**Done before training day. Ensures Module 1 starts with building, not troubleshooting.**

1. **Make sure Claude Code works.** Install, authenticate, run a test conversation. If it doesn't work, fix it now — not in the room.
2. **Create two scheduled agents using O365 connector:**
   - **Daily planner** — pulls calendar, creates a structured daily plan. Runs every morning.
   - **Email triage** — reads inbox, categorizes and prioritizes. Runs on schedule.

These are personal utility agents. They prove the whole chain works: Claude Code runs, the O365 connector is set up, scheduled execution works. The participant arrives on day one having already built two working agents. Module 1 can just get going.

> CUSTOMER: Claude Code licenses for all participants. O365 access with calendar and email permissions.

---

## Module 1: Getting Going

**Big idea:** With the right guardrails, you create output that's genuinely yours — not generic.

**Warm-up. Everyone creates something real and sees what guardrails do to quality.**

- Connections: "What have you used ChatGPT/Claude for? What was the best thing it made for you? What was generic about it?"
- Exercise: Take your LinkedIn profile. Generate an HTML one-pager personal site from it — no guardrails, just the raw LLM.
- Exercise: Now add the trainer's guardrail (a CLAUDE.md with differentiation, storytelling, and framing rules). Regenerate. See the difference. Average becomes great — not because you prompted better, but because the guardrail shaped the output.
- Exercise: Push it — make the site bigger, more ambitious, more you. Add sections, claims, projects.
- Exercise: Push until it breaks — find where the LLM starts inventing things about you
- Teaching moment: You are the world's best evaluator of your own profile. You caught the fabrication because you know the truth. That instinct is everything.
- Exercise: Fix it with better guardrails. See the output improve. The guardrail IS the control.
- Lecture: **"Context is King"** — trainer demo showing how context affects output. Same task, different context = different quality. The guardrail is structured context. This is the only lecture in Module 1.
- Reflection: "What surprised you about what it got right? What surprised you about what it got wrong?"
- Homework: Antti's LLM brain post (from whitepaper). Sections from "What is an Agent" supplementary doc (see below).
- Bridge: You just made great output. But it's a one-shot. What if it could remember, grow, and compound?

---

## Module 2: Build Your First Agents

**Big idea:** A system remembers, grows, and compounds. Chat doesn't. Your company's own content is the foundation.

**Start the LLM brain. Build agents that use it. The company's content runs through everything from here.**

Each company brings their own content and goals — pre-agreed with the sponsor. One company has an AI-ready product knowledge base. Another has a great security/compliance process. Another has competitive intelligence they want to systematize. That content becomes the LLM brain, and the brain becomes the backbone of every exercise from Module 2 onward.

The exercises are structurally the same across companies. What changes is what's inside the brain.

> CUSTOMER: Company knowledge base / content for the LLM brain. Pre-agreed with sponsor. Examples: product knowledge base, compliance process docs, competitive intelligence files, customer insights database/files. Must be in a format agents can read (text, markdown, PDF, structured data). This is the backbone of every exercise from here onward.

- Connections: "How many of you saw the Karpathy LLM wiki post? What's the difference between asking an LLM a question and having an LLM maintain a knowledge base for you?"
- Concept: Three layers — raw sources (the company's content, immutable), wiki/brain (LLM-maintained, compounding), schema (the rules — CLAUDE.md)
- Exercise: Set up the LLM brain for your initiative. Ingest the company's source materials. Watch the agent build the initial knowledge pages.
- Exercise: Ingest more. See the brain update — cross-references, new pages, updated summaries. It compounds.
- Exercise: Build an agent that does real work using the brain. Product company: agent that drafts a product brief from the knowledge base. Compliance company: agent that checks a process against policy. The agent reads from compiled knowledge, not raw files.
- Exercise: Query the brain directly. Ask it questions. See how answers draw from structured knowledge, not one-shot retrieval.
- Exercise: The lint operation — have the agent check its own brain for contradictions, gaps, stale claims. The system maintains itself.
- Teaching moment: Persistence + automation = system. It remembers. It runs. It grows. And it's YOUR content — not generic.
- Lecture: **"Compounding"** — how to make your agent learn and self-correct. Each cycle builds on the last. The brain gets sharper, not just bigger. Self-correction as a design pattern, not a wish. Reference: Pawel Huryn and his pragmatic instructions (see his X.com feed for specific recommendations).
- Concept (emergent): File-based architecture. Why markdown files beat databases for this. The LLM writes text and is best at text.
- Reflection: "What other content from your company would you feed this? What would change if your whole team had access to this brain?"
- Bridge: You have agents doing real work with your content. But the job is getting too big for one agent. What do you split?

---

## Module 3: Multi-Agent Systems

**Big idea:** Split the work. Each agent does one step and passes it forward.

**User sentiment analysis. Three agents, two rounds each, one synthesis.**

Prework: Agent memory — agentic RAG vs. traditional RAG, filesystem as memory. Agent tools and MCP.

- Connections: "Your brain agent does everything. What if you had specialized agents that each see a different part of reality?"
- Concept: The assembly line — each agent does one job, passes work forward. Sequential pipeline, not a mesh.
> CUSTOMER: Customer insights data — support tickets, NPS results, feedback forms, or similar. Also: list of review platforms where the company is discussed (G2, App Store, Trustpilot, etc.) and key competitors to monitor.

- Exercise: Build three agents:
  1. **Own customer comments** — ingests direct customer feedback (support tickets, NPS, feedback forms)
  2. **Public reviews** — ingests what the market says about you (G2, App Store, Trustpilot, Reddit)
  3. **Competitor remarks** — ingests what people say about alternatives (same public sources, different lens)
- Exercise: Run 2 rounds each. Round 1 builds the base. Round 2 shows the brain getting sharper — new sources confirm, contradict, or deepen what round 1 found.
- Exercise: Synthesize across all three. This is the finding no single agent could produce: "customers complain about X, competitor Y is praised for X." The gap between internal perception and external reality.
- Teaching moment: The seams are where it fails. Multi-agent coordination is a handoff problem. What happens when one agent's output is noisy or biased?
- Lecture: **"Setting Up Proper Competitor Analysis"** — tips and tricks for scraping the internet (what works, what doesn't, what breaks). Synthesis techniques: how to turn noisy multi-source data into findings that hold up.
- Concept (emergent): When is one agent better than three? Not always obvious. Three agents here because they see genuinely different data — not because splitting is inherently better.
- Reflection: "What surprised you in the synthesis? Did any finding contradict what your company believes about itself?"
- Bridge: You built something that works. But can you trust it? Tomorrow we break it.

---

## Module 4: Security

**Big idea:** Your agent just violated company policy. That's YOUR problem.

**The compliance violation. Skills as the security architecture. Not prompt injection — business risk.**

Prework: personal reading on the skills system (how skills scope agent capabilities, permissions, tool access).

- Connections: "What's the worst thing your agent could do with access to company data?"
- Exercise: Take the Module 3 sentiment analysis system. Analyse it against the company's security, legal, and compliance rules. Where does it violate? What data shouldn't it touch? What output shouldn't it produce?
- Teaching moment: It looked good. It was wrong. Your tests wouldn't have caught this.
- Exercise: Apply the pre-built compliance skills (provided by trainer) to the Module 3 agents. Re-run. See what changes — what the agent can no longer do, and why that's the right answer.
- Optional exercise: Make your own personal skill — scope a boundary that matters to you.
> CUSTOMER: Security policies, legal rules, compliance processes — as usable documents. These get turned into skills before training. Can be separately billed prep work if Antti builds the skills from company policies.
- Concept (emergent): Trust boundaries. What the agent can access vs. what it should access. Skills are how you enforce this.
- Reflection: "What policy does your organization have that an agent could violate without knowing?"
- Bridge: It's secure. But is the output actually good?

---

## Module 5: Output Quality and Hallucination Control

**Big idea:** LLMs will always fabricate. The skill is spotting it, adjusting the rules, and seeing the improvement.

Prework: 10 famous agent failures in real life (curated reading — TODO: build this list).

- Connections: "From the prework — which failure surprised you most? Could it happen with your system?"
- Lecture: **"Why LLMs Will Always Fabricate"** — not a bug to be fixed, a property to be managed. The statistical nature of generation. Why confidence and correctness are unrelated.
- Exercise: Generate a real work product from your Module 2-3 system. Sentiment summary, competitor brief, whatever your initiative produces. Read it carefully.
- Exercise: Spot the fabrication. What did it get wrong? What did it invent? What looks plausible but isn't supported by your source materials? You are the domain expert — use that.
- Exercise: Adjust the generation rules — tighten guardrails, add constraints, require source citations, restrict claims. Regenerate.
- Exercise: Compare before and after. See the improvement. See what you lost (sometimes tighter rules kill good output too).
- Concept (emergent): The quality loop — generate, evaluate, adjust rules, regenerate. This is the discipline. Not a one-time fix but a continuous practice.
- Concept (emergent): The demo-to-production gap. Works once ≠ works reliably. Non-deterministic failure means you can't just "fix the bug."
- Reflection: "How confident are you in your system's output now? What would it take to stake your reputation on it?"
- Bridge: You can spot fabrication by eye. But you won't always be there. What if you could automate what you just did — turn your judgment into rules a machine can run? That's evals.

---

## Module 6: Evaluations

**Big idea:** Evals are strategic steering, not testing. You're measuring whether the output is differentiated enough to matter.

**Two things: loop into desired outcome. Create eval criteria that reflect what YOU care about.**

Prework: Ethan Mollick — "Garbage Can and Bitter Lesson."

- Connections: "In Module 5 you spotted fabrication by eye and adjusted rules. What if you could automate that entire loop?"
- Exercise: Take your Module 5 output. Build an eval that checks for the problems you found manually. Run it. Loop: generate → eval → adjust → regenerate until the output meets the bar. Experience the system converging on quality.
- Exercise: Now the harder thing. Create a totally new eval criterion — not about correctness, but about what matters to YOU. Brand voice. Strategic differentiation. Depth of insight. Whatever makes your initiative's output worth sharing vs. forgettable. Something no generic eval would check for.
- Exercise: Run your custom eval. See what it catches. See what it misses. Iterate the criterion itself — the eval is also an assumption to be tested.
- Teaching moment: Evals encode your assumptions about what matters. Wrong assumptions = wrong evals. The loop works for output AND for the evals themselves.
- Concept (emergent): Two uses of evals — convergence (looping to a desired outcome) and steering (encoding preference into the system). Both are essential.
- Throughline moment: "What would have to be true for these evals to be the right ones?"
- Reflection: "If your evals passed, would you stake your reputation on the output?"
- Bridge: You can build agents, secure them, evaluate them. But where do they live in the real world?

---

## Module 7: From Personal to Team

**Big idea:** Your agent works for you. Making it work for the team is a different problem.

**Promotion: personal → team → company. What changes, what breaks.**

Prework: 8 short stories on how the best have scaled personal agents to team/company level (TODO: curate). Must include variance — different approaches, different scales. Must include: a skill-based story (team capability encoded as a skill), a recurring simple agent running in the cloud (cron job, not enterprise platform). Goal: show there's no single right way.

- Connections: "You've built something that works on your laptop. What would need to change for your whole team to use it?"
- Exercise: Take your system. Identify what's personal — your credentials, your context, your assumptions baked into guardrails. List everything that breaks when someone else runs it.
- Exercise: Redesign for the team. Shared access to the brain. Governance: who can ingest sources? Who can change the schema? Who sees the output? Build the access model.
- Exercise: Hand it to a pair partner. Can they run it? Can they get useful output without your context? Where does it fail?
- Teaching moment: The personal → team gap is not technical. It's about shared context, trust, and ownership. The agent that works because YOU know what it means doesn't work when 10 people interpret the output differently.
- Concept (emergent): The promotion path. Personal agents, team agents, company agents are different products. Promotion means redesigning, not just sharing.
- Reflection: "Who in your organization would own this system? Who decides what goes into the brain? Who's accountable when the output is wrong?"
- Bridge: You can build agents, secure them, evaluate them, and scale them to a team. What if you didn't have to build each one by hand?

---

## Module 8: Agents Building Agents (The Flywheel)

**Big idea:** The tool that builds tools compounds.

**Everyone's agents run on shared context. The output is the synthesized AI strategy.**

Prework: Risto — acting on the future and building hypotheses. Rumelt — crux / good strategy bad strategy.

> CUSTOMER: CTO/sponsor present for Module 8. Their agent has a special role in Diamond 2 — drafting the guiding policy. They need to be in the room.

- Connections: "You've each built agents for one part of the initiative. What happens when they all run together?"
- Demo: An agent that generates another agent for the initiative. The meta-tool in action.
- Exercise: Use Claude Code to generate a new agent that extends your system — a new data source for the brain, a new kind of output, a new perspective. You describe what you want. The coding agent builds it. It works. That's multiplication.
- The joint moment — double diamond, agent-powered:
  - **Diamond 1 — Diagnose the cruxes.** Everyone's agents run on shared context. Agents synthesize a Rumelt-style crux list: what are the real obstacles to the agentic transformation here? Not generic risks — specific cruxes grounded in 8 modules of hands-on evidence. Agents prioritize. The room validates.
  - **Diamond 2 — Paint the way forward.** CTO's agent takes the top 3 cruxes and drafts the guiding policy — how to resolve each one. Everyone's agents feed in actions and recommendations grounded in what they built. Personal agents cross-pollinate feedback across participants — your agent reads my agent's recommendations, flags conflicts, finds synergies.
- Teaching moment: Self-improvement — each cycle makes the next one better. They just saw it: Diamond 2 output was sharper than Diamond 1 because agents built on each other's work.
- Teaching moment: Org capability — 20 people just produced a Rumelt-style strategy kernel (diagnosis + guiding policy + coherent actions) that no consultant could deliver, because it's grounded in hands-on experience with the company's own content. And the agents did the synthesis.
- The deliverable: The synthesized AI strategy IS the executive recommendation. Not co-created on a whiteboard — produced by the system they built.
- Throughline moment: "This strategy is a set of assumptions. Label them. Design experiments to test them. That's how you start Monday."
- Reflection: "What will you build first when you get back to your desk?"

---

## Supplementary Materials

**"What is an Agent"** — 6-page reference document. Always available to participants. Not read cover-to-cover as prework — specific sections assigned as prework for relevant modules.

Sections (TODO: define):
- What an LLM is and isn't
- From chatbot to agent — what changes
- Tools, memory, context, reasoning
- Skills and permissions
- Multi-agent coordination
- The flywheel: agents building agents

Section allocation to modules (TODO: fill in as modules solidify):
- Module 1 homework: [which sections]
- Module 3 prework: [which sections]
- Module 4 prework: [which sections — skills]

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

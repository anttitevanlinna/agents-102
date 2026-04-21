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

## Agenticness Contract (strategic requirement)

The training must BE agentic, not teach *about* agents. Prompting with extra steps is the failure mode that undersells the category.

**Two-part definition of agentic:**
1. **Using capabilities to the full** — multi-agent orchestration, self-improving loops, bake-offs, source-watching, background execution, agents-spawning-agents, live-system tool use. The agent does the heavy lifting.
2. **Learning** — agents learn from use (updating context, skills, judges from observed outcomes). Students learn by watching capability they didn't know existed.

**The walk-away test.** From Module 2 onward, every exercise must allow the student to leave the chair while the agent works. If they're reading every reply and pasting it back, it is prompting, not agentic work. Manual loops documented in prose are a human loop, not an agent loop.

**The 50% magic rule.** Of Modules 3–8, **at least three must land as magic** — moments where the student experiences capability they didn't know existed. The other three can be supporting. Functional competence across all six is not enough; half the post-M2 experience must push the boundary of what's possible.

**Understandable magic, not wizardry.** The student must be able to explain what happened and why it worked. *"Four detectors ran in parallel, meta-eval scored them, we kept the winner"* is understandable magic. *"The agent just figured it out"* is mystification — and mystification trains dependency, the opposite of competence-first. Awe through clarity (Risto's epistemic directness), not awe through opacity. Mechanism must be legible in the artifacts the exercise leaves behind.

**Canonical magic patterns** (menu — more exist; these are known-good, Antti has run all of them):
- **Orchestrator + parallel generation + self-improving eval loop** — orchestrator directs N generation tracks; eval loop runs continuously, improves itself by observing what slips past. Two loops compounding.
- **Bake-off / method tournament** — N judges or detectors run in parallel on the same input; meta-eval measures and picks the winner (or ensemble). Teaches empirical selection over intuition.
- **Self-improving skill / agent that learns in real life** — agent updates its own context or skill file from observed corrections. The agent is better when you come back than when you left.
- **Source-watching background agent** — watches an inbox, folder, or queue and acts unattended. First true walk-away.
- **Agents spawning agents that spawn judges** — compound autonomy. Peak of the curve at M8.

**Current gap** (2026-04-19 audit): M3 and M8 are agentic; M4–M7 retreat to scaffolded prompting. M5 (output quality) is the weakest — manual claim classification, no automation. The curriculum has roughly 1.5 of the required 3 magic beats across M3–M8. Steering target: honor M3's existing multi-agent work, rewrite M5 (bake-off), rewrite M6 (orchestrator + self-improving eval), keep M8 as peak compound. M4 and M7 stay functional-supporting.

**Ramp of trust distance** (so students aren't dropped into cold water):

| M | Student's relationship to the loop |
|---|---|
| M1 | In the chat, every turn |
| M2 | Watching plan mode — agent writes files, student approves |
| M3 | Orchestrating multiple sessions — student starts, synthesizes |
| M4 | Reviewing — skills run end-to-end, student picks fixes |
| M5 | Watching a bounded tournament / loop run |
| M6 | Walk-away — loop runs to completion or convergence |
| M7 | Someone else's loop runs on your context |
| M8 | Agents spawning loops — student conducts |

This ramp is load-bearing. Jumping straight to walk-away at M2 is cruel; still reading every reply at M8 is theft of the category.

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

1. **Bootstrap** — 500/person, hands-on intensive over days or weeks. Anyone can walk in. You build a real agent.
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

The company brings their own content and goals. One company has a product knowledge base. Another has compliance processes. Another has competitive intelligence. That content becomes the LLM memory backbone of every exercise from Module 2 onward.

**What makes a good initiative:** Something the company already has content for, that everyone in the room understands, and that touches enough complexity to sustain 8 modules.

**What makes a bad initiative:** Too specialized (only 3 people understand it). Too abstract ("improve our processes"). Too regulated (compliance overhead dominates learning). Too novel (nobody has a baseline).

## The sponsor takes the training with the cohort

**Non-negotiable delivery requirement.** The CEO / CTO / SVP who bought the training sits in every module as a participant — not an observer, not a drop-in. Builds their own agent on their own challenge alongside the room. If the sponsor can't commit to all eight modules, we don't run the cohort.

Why: the agentic transformation is the rare shift that can't be led from strategy alone — without agent competence, there's no vision, only governance of an abstraction. A sponsor who delegates the training to the room and waits for the Module 8 readout has built the same governance frame we're trying to escape. The sponsor learning alongside everyone else — visibly not-knowing on Module 1, visibly struggling on Module 3, visibly shipping on Module 8 — is what gives the cohort permission to lean into unease.

In Module 1 Connections, the sponsor speaks first. Naked admission: *"I don't know what I'm doing here either. That's why we're all in this together."* Risto Siilasmaa's career is evidence that leaders who admit unknowing unlock rooms that leaders who perform certainty can't. Twenty SVPs watching the CTO model epistemic humility rewrites what's permitted for the next seven modules. The vulnerability moment is earned structurally, not performed — the sponsor can admit unknowing because they're actually about to not-know alongside everyone else.

In Module 8, the sponsor's agent has the special role (drafting the guiding policy against the shared cruxes). That role only lands if the sponsor actually built an agent — which they did, because they took the training.

> CUSTOMER: Sponsor (CEO / CTO / SVP HR — whoever bought the training) commits to all eight modules as a participant. Not negotiable at contracting. If sponsor bandwidth is the blocker, move the cohort date; don't run it without them.

## What Success Looks Like

- **Day 8 (close):** Every graduate leaves as an **Agent builder** — a named identity they can say out loud, on Monday, to colleagues who weren't there. Not "I took a training." *"I'm an agent builder."* Identity persists; skills fade. Saying it changes who returns their calls.
- **30 days:** Changed conversations. "We could build an agent for that" becomes natural.
- **60 days:** 5+ people building prototype agents on their own. Sharing WoW moments and failures.
- **90 days:** Agents doing things the company couldn't do before. The CTO hears about it without asking.

**"Agent builder" is the graduate identity — not a certification.** Anti-SAFe: no badge, no exam, no license. Identity-naming is a different move from certification theatre. A Y Combinator founder is "YC alumni" for life because the program conferred an identity, not because they passed a test. Module 8's close explicitly confers *agent builder* as the name the graduate carries. They are someone who has built an agent that does something real with their company's own data — and who can do it again tomorrow on a new problem. That sentence is the identity. The Module 8 deliverable (the strategy kernel) is the evidence.

## Bootstrap Is Step 1 of 5

After Bootstrap, three gaps remain:

1. **Infrastructure + deployment.** Bootstrap teaches building and discipline, not CI/CD or production monitoring.
2. **Governance framework.** Bootstrap shows WHY governance matters. Building the framework is Make Your Own (Step 2).
3. **Organizational buy-in.** 20 trained people in a 5000-person org. The strategy deliverable starts the conversation.

The funnel: Bootstrap → Make Your Own → Champions → Scale → Drive into Value Chains.

---

## Prework

**Done before training day. One setup step + three tasks + one read. ~30 min for the tool-comfortable, up to ~60 for a first-time user.**

### Before you start (5 min setup check)

- **A Claude account** at claude.ai. The training runs on the Claude Pro or Team tier — the customer confirms licensing.
- **Claude Code installed.** Use the **desktop app** (macOS/Windows) or the **web version** (claude.ai/code). **No terminal required.** If you've never used a terminal, stay with desktop or web.
- **An hour.** More than it sounds like; less than it feels like.

### Step 0 — Your training working directory (5 min)

You need one folder on your machine that holds everything you build across the training. Create it anywhere convenient — Desktop, Documents, wherever. Name it `agents-102-bootstrap/`.

Then download the **training starter zip** (link in your welcome email) and unzip it *inside* that folder. You'll see empty subfolders appear: `prework/`, `module-1/`, `module-2/`, … through `module-8/`. That's your training home for the whole run.

For the prework tasks below, **open the `prework/` subfolder in Claude Code** — not the whole root. Your workspace changes at three seams across the training: `prework/` now, `module-1/` for Module 1, the `agents-102-bootstrap/` root from Module 2 onward. Within each scope, files land in the right subfolder (during Module 2 the prework brief writes to `module-2/challenge.md` from the root — you don't reopen for each artifact). Two folder switches total. The workspace stays clean without you thinking about it.

*Not in OneDrive, Dropbox, or Google Drive.* A synced folder and an agent writing files at the same time fight each other. Keep this folder local.

### Task 1 — Snake game (10 min)

In Claude Code, with `prework/` open, paste this prompt:

```
Build me a snake game as a single HTML file. Save it as snake.html.
```

Claude writes the file. Open `snake.html` in your browser. Play.

*Proof: Claude Code can write code and save files on your machine.*

### Task 2 — Your week in meetings (10 min)

Two paths. Pick whichever matches your setup.

**Path A — connector enabled** (Microsoft 365 or Google Workspace). Paste:

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

**Path B — no connector / no admin rights.** Attach a screenshot of your calendar week view. Then paste:

```
Based on the calendar screenshot I just shared, list my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

*Proof: Claude can read your real work data — in whichever shape you can provide it — and produce a useful summary.*

### Task 3 — Read the mental frame (10 min)

Open `curriculum/supplementary/what-is-an-agent.md`. Read section 1: **LLM vs chat — what's the difference?** Two pages. You'll meet the rest as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

---

You arrive at Module 1 with: a working directory ready for every module, Claude Code working, a snake game, a meetings summary, and a 2-page read. Module 1 just gets going.

**For Module 1, you'll open `module-1/` in Claude Code** — a genuinely empty folder. That's on purpose. Prework artifacts stay in `prework/`; Module 1 starts with nothing primed. For Module 2, you'll reopen at the `agents-102-bootstrap/` root — Module 2 ships a scaffold that unzips there, and from then on the root is home for the rest of the training.

**Module 2 has its own prework — name your next big challenge.** You'll get that assignment before Module 2 starts, once Module 1 is under your belt. That's the brief you'll build on for the rest of the training.

**Personal scheduled agent** (daily planner, email triage, or similar) is now **Module 2 homework** — after you've built the memory, you schedule a daily touch with it. Easier as a follow-on than a cold prework task.

> CUSTOMER: Claude Code licenses (Pro or Team tier) for all participants. Calendar connector (M365 or Google Workspace) enabled by IT before the cohort — or explicit acknowledgement that some participants will use the screenshot fallback. Training starter zip hosted somewhere participants can download (private site, customer SharePoint, or email attachment).

## Every student ships at least one real agent

Standing promise of the training. Over the course of Bootstrap, every participant builds at least one agent that does something real in their work — not a toy demo, an agent with their data, solving their problem. **Demoed at the closing session (Module 8).** The demo moment is part of the deliverable, not just show-and-tell.

---

## Getting Going

**Big idea:** With the right guardrails, you create output that's genuinely yours — not generic.

**Mood (deliberate):** Joyful creation. The *"I made this. It's me."* moment. The student arrives as a chat user and walks out having produced something that is specifically, unmistakably theirs — caught Claude fabricating on facts they know cold, shaped the output with context, felt the "this is me" emotional payoff. Empowerment is the point; nothing else should compete for attention. Any edit that makes M1 feel like a technical warm-up (rather than a personal creative act) steals the joy — and the joy is what gets the student through the harder moods to come.

**Warm-up. Everyone creates something real and sees what guardrails do to quality.**

- Connections: "What have you used ChatGPT/Claude for? What was the best thing it made for you? What was generic about it?"
- Lecture: **"Context is King"** — 15-min trainer demo. Two Claude windows, same second question ("what should we have for dinner?"), different first prime ("capital of Italy" vs "largest lake in Finland"). Same words, different answers — context colored everything. Third window with "I'm a cardiologist" extends the lesson: context isn't only about countries, it's whatever you tell it.
- Exercise: **Personal site with guardrails** — 45-min build. Six phases. Phase 1: boring baseline. Phase 2: colleague-as-buyer differentiation frame (who comes to you for help, what problem you solve, how you guide — StoryBrand for work life). Phase 3: strengths that serve them. Phase 4: look back at the baseline — find three empty/wrong claims. Phase 5: anti-branding via mirror — what you hate, flipped, surfaces what you're great at. Phase 6: free iteration until "this is me."
- Teaching moment: You are the world's best evaluator of your own profile. You caught the fabrication because you know the truth. That instinct is everything.
- Reflection: "What surprised you about what it got right? What surprised you about what it got wrong?"
- Homework: Antti's LLM brain post (from whitepaper). Sections from "What is an Agent" supplementary doc (see below).
- Bridge: You just made great output. But it's a one-shot. What if it could remember, grow, and compound?

---

## The mood arc (M1 → M6)

The emotional shape of the first six modules is deliberately engineered. Each module's mood feeds the next; resolving a mood early steals the next module's teaching moment.

- **M1 — joyful creation.** *"I made this. It's me."* Context + guardrails produce output that's genuinely yours. Empowerment is the payoff.
- **M2 — satisfied compounding.** *"It runs while I sleep."* Persistence + automation turn a one-shot into a system. Ownership is the payoff.
- **M3 — unsettled competence.** *"I wonder if this is right?"* Multi-agent works; the output sits at an uneasy distance from trust. Doubt is planted, deliberately unresolved.
- **M4 — deepened unease.** *"Damn, this is complex stuff."* Skills reveal what the agents were doing underneath. The problem gets more texture, not less. The doubt compounds.
- **M5 — mechanical rescue.** *"Ahh, this is actually fixable."* Fabrication has patterns; the loop (spot → tighten → regenerate) works. Relief, earned plainly.
- **M6 — unleashed leverage.** *"We can automate the loop."* Evals run the spotting-and-steering industrial. Empowered builder returns.
- **M7 — generous impulse.** *"This is starting to work. I wonder if others could benefit?"* Generosity as a natural consequence — sharing from enthusiasm, not from obligation. The axis shifts from personal-mastery to team-ownership. Four strategies that actually work: share context, share a skill, share the output (push), share an interface (pull — e.g., Slack bot). "Share the whole agent" is not on the list — that's the vendor pitch.
- **M8 — awe and curiosity.** *"Oh shit. Where is this all going?"* The flywheel lands. Agents building agents; trajectory accelerating; no visible ceiling. Awe at what the stack can actually do, curiosity about what comes next. The student leaves Bootstrap wanting the next move, not feeling done.

**The eight-module rhythm in one line:** joy → compound → unease → deeper unease → rescue → leverage → generosity → awe. Build, doubt, fix, scale, wonder.

Any edit that makes M3's output feel clean, or M4's security feel tidy, steals from M5 and M6. Any edit that makes M7 feel like a governance chore steals the generous impulse. Any edit that makes M8 feel like a tidy graduation ceremony steals the forward hunger — the right ending is *"I want the next move,"* not *"we're done here."* Honour the arc.

---

## The personal-to-work shift (M1 → M2)

Module 1's artifact is personal: your site, your voice, your profile. Module 2's artifact is work: your board paper, your re-org, your vendor decision. The *substrate* continuity is strong — guardrails file → memory + agent files + CLAUDE.md — but the *subject* pivots, and we name the pivot openly rather than paper over it.

> "The first thing you build is for you, because you're the only evaluator you can't fool. Then we turn to work — because that's where the system has to stand up."
> — Antti

The pedagogical logic:
- **Personal first** because you are the one evaluator you cannot fool on your own content. Learning to spot fabrication on something you know cold is the foundation skill for everything that follows. Nobody else in the room can verify your site as precisely as you can.
- **Work from Module 2 onward** because that is where the system actually has to stand up — where the compound shows up in your life, where the stakeholder isn't a mirror. The personal artifact was a rehearsal with the world's most plain evaluator. The work artifact is the real game.
- The shift is a feature, not a seam to be hidden. Named clearly in M2's Connections so students feel the transition as intentional rather than as drift.

This shift is *implicit* in the current Bootstrap material; Pass 3 work on the Module 2 module file should add a one-liner at the start of Connections that acknowledges it in student-facing language ("Module 1 was for you. From here on, we turn to the thing you actually get paid to move.").

---

## Building Agent Systems

**Big idea:** A system remembers, grows, and compounds around the one thing you need to make progress on. Chat can't.

**Mood (deliberate):** Satisfied compounding. The *"it runs while I sleep"* feeling. The student moves from one-shot output (M1's joy) to a living system — files that sharpen, an agent that reads them, a scheduled touch that lands in their inbox tomorrow morning in the company's house style. Ownership, not novelty, is the payoff: it's theirs, it persists, it's already compounding. Any edit that makes M2 feel like a set-up-the-tools module steals the compounding feeling; M2's artifact is a system the student wants to keep, not a demo they'll discard.

**Build your challenge memory. Three sources, your real challenge, agents that work on it from Module 2 onward.**

Before Module 2, each participant gets a lightweight prework nudge: **bring a live challenge on your mind** — the thing you actually need to move forward on at work — plus a connector-verification step (Confluence + OneDrive) and a 15-minute plan-mode primer. The challenge itself gets *pinned* in the first 15 minutes of Module 2 via the `name-your-challenge` opener exercise — deliberately moved into the main session so students who skipped prework don't stall Phase 1. The training memory is then built around that challenge. Three sources feed it: your Confluence, your Office365 workspace, and curated internet best practice on the challenge. The memory becomes the backbone of every exercise from Module 2 onward.

The exercises are structurally the same across companies. What changes is whose challenge the memory serves.

> CUSTOMER: Participants will work on a live personal challenge — confirm this is acceptable to the sponsor. Confluence and Office365 connectors available for the cohort (IT enabled before Module 2). Participants are willing to share the *shape* of their work with the room for peer review — not the confidential content. No company-wide knowledge base pre-stage required.

- Connections: "Karpathy keeps a wiki about himself — not a chat history, a wiki he maintains with an LLM's help. How does that feel different from the last time you asked ChatGPT about something? And the challenge you named last week — what would it mean to have a wiki like that about *it*?"
- Concept: Three layers — raw sources (your Confluence, Office365, curated internet best practice — immutable), wiki/memory (LLM-maintained, compounding), the rules file (CLAUDE.md)
- Exercise: **Build your challenge memory** — Curate your three sources: what from Confluence, what from Office365, what internet best practice on the challenge. Plan mode first, then load: the agent proposes a topic list, you approve, it writes the memory. Build your first custom agent as a plain markdown file (instructions the model reads — what it's for, plus rules) that does one real job serving the challenge with source citations. Go find one more piece of material yourself mid-exercise and drop it in — watch existing pages *sharpen* instead of grow. Let the memory lint itself for contradictions, gaps, stale claims — you approve each proposed fix. Close by putting the memory to work: ask it the hardest open question on your challenge and read the citation-backed answer. The system maintains itself; the agent is text; the substrate is consistent — and it travels.
- Teaching moment: Persistence + automation = system. It remembers. It runs. It grows. And it's YOUR challenge — not generic.
- Lecture: **"Compounding"** — how to make your agent learn and self-correct. Each cycle builds on the last. The memory gets sharper, not just bigger. Self-correction as a design pattern, not a wish.
- Concept (emergent): File-based shape. Why markdown files beat databases for this. The LLM writes text and is best at text.
- Reflection: "What else about this challenge would you feed the memory? What would change if two colleagues working on the same challenge shared one?"
- Debrief: The Module 1 retro pattern, adapted — plus one new move: name the **crux** of your challenge as you see it right now. (Don't polish it. First pass. The crux skill ships here as a lightweight deposit; Module 8 picks it up again with Rumelt fully named.)
- Homework: **Personal agent homework** — schedule a daily touch with your challenge memory. The scheduled-agent pattern moves here from prework — easier once the memory exists.
- Bridge: You have an agent doing real work on your challenge. But the job is bigger than one angle. What do you split?

---

## Multi-Agent Systems

**Big idea:** Hire three agents to search. Three more to decide. The filesystem is the meeting room.

**Mood (deliberate):** Module 3 ends in unease, not quality. The student walks out with a synthesized answer that works well enough to feel useful and *not quite* well enough to trust — and we don't resolve that feeling here. The right closing question is *"I wonder if this is right?"*, noted but not fixed. Module 5 is the quality module; it picks up the doubt Module 3 plants. Any edit to Module 3 that makes the output feel like a clean 10/10 is the wrong edit — it steals Module 5's teaching moment. Let it stew.

**Two multi-agent shapes in one exercise. Retrieval = 3+1 separate Claude Code sessions on shared files. Synthesis = one session, three subagents (backward-planner, Martin's experimentator, Rory).**

Prework: Two reads (`exercises/module-3-prework.md`). **Reading 1** — five practitioners automating their life with Claude Code and OpenClaw (Simon Willison, Andrej Karpathy, Thorsten Ball, Mitchell Hashimoto, Geoffrey Huntley); pick three, read one piece each, note one takeaway per practitioner. Calibrates what single-agent already does, so the added coordination in Module 3 is visible. OpenClaw context grounded in `continuous-research/findings/archive/computer-use-and-nordic-signals-march-24-2026.md` (OSS fourth path) + Karpathy's Fortune piece (Mar 21 2026). **Reading 2** — plain-language primer on Claude Code's subagent architecture: what it is (helper with instructions, own context, shared filesystem, returns a result), how to launch one (plain-language prompt — "Launch a subagent to…" / "Launch these three in parallel"), what you'll see (Task block in the transcript). Explicitly does not cover authoring via `/agents` — launching is enough for Phase 2.

- Connections: "Last module you were the librarian — you searched Confluence, pulled from OneDrive, chased down practitioner articles by hand. Today you hire three agents to do that search, and three more to decide what it means. One of them is Rory. What do you expect will get lost between them?"
- Concept (staged, not front-loaded): two multi-agent shapes in Claude Code. Separate sessions (what you feel in Phase 1) and subagents (what you build in Phase 2). The filesystem is the meeting room in both.
> CUSTOMER: No additional data pre-load. The exercise runs on the same three source zones curated in Module 2 (wiki / collab suite / curated internet). Connectors already in place from Module 2.

- Exercise: **Three retrievers, three minds** — two phases, one strategic question about the student's challenge.
  - *Phase 1 — Retrieval (3+1 sessions).* Student opens four Claude Code windows on the shared working directory. Three are retrievers, each pointed at one source zone (Confluence-retriever, Office365-retriever, internet-retriever), each with its own agent file and dialect. Run in parallel. Outputs land as markdown files in `module-3/retrievals/`. The fourth is the main session — reads the three as they arrive. The felt moment: three windows churning, files materialising in shared folders, *they're working together on the same problem.*
  - *Phase 2 — Synthesis (subagents).* Main session now spawns three subagents inside one session: a **backward-from-end planner** (start at the outcome, work back to today), a **Martin-style experimentator** (*what would have to be true for this to work?* — the assumption test), and a **counterintuitive reframer** (the Rory seat — question the obvious take, steal an analogy from an unrelated field). Each subagent reads the retrievals and produces its stance. The main session combines into the optimal suggestion, guardrailed by a framework — Rumelt's kernel by default, or StoryBrand / JTBD / principle-of-least-privilege by challenge type.
- Teaching moment: Seams are where it fails. Synthesizer left un-prompted averages three takes into beige. Laziness is designed in. **The output is meant to feel 7/10, not 10/10** — that unease is the handoff to Module 5, not a defect in the exercise. Also: Phase 1 and Phase 2 are two *different* multi-agent mechanisms. Student leaves knowing both — separate sessions vs. subagents — not just one.
- Lecture: **"When to split an agent (and how)"** — splitting earns its keep only when the agents genuinely can't be one (different access, different dialect, different stance). Faking multi-agent with one prompt is the tell. And once you've decided to split: separate sessions when each agent needs its own persistent context/tools; subagents when the orchestrator wants quick parallel thinking in one flow. Anthropic's warning lands here — only a few situations where splitting wins. This is one of them.
- Concept (emergent): Three stances beat one summarizer. Frameworks are the synthesizer's spine. Rumelt's crux skill from Module 2's Debrief comes back — here it's running inside an agent, not a human retro.
- Reflection: "Does this feel right? Not in a way you can point at — just the off feeling. Where does the answer sit at that uneasy distance between 'stake my reputation on it' and 'something's not quite there'? Note the shape of the doubt in `module-3/wonder.md`. Don't fix it. Module 5 comes back for this."
- Bridge: You just built something that works across three systems and thinks in three voices. Which means it just gained access to three systems. What's the worst thing it could do with that?

---

## Security

**Big idea:** You can't tell if your agent is safe by looking at its output. You need a way to check — and the practice is running the check, not waiting for certainty.

**Mood (deliberate):** Epistemic humility, not guilt. The student built something real in M2–M3. Some got lucky; most have small mistakes; everyone has risks they haven't assessed. The feeling isn't *"I screwed up"* — it's *"I'd like to be safe and I genuinely don't know how to know."* The lecture names the feeling as the permanent condition of working with agents, not a failure state. *"Damn, this is complex stuff — and the practice is doing the work, not reaching certainty."* The unease stays; Module 5 picks up the output-quality thread from here.

**The skills-application module.** Skills arrive as the mechanism — but not as scoping-down. They show up as **expertise the student plugs in.** Two skills, two lenses: a pre-made `company-ai-policy` skill (co-built with the customer and teacher) and a generic `agent-security` skill (access-control analysis + agent-STRIDE, with agentic mitigations suggested).

Prework: two reads. (1) Skills — what they are, how they work, why they're the agent's way of borrowing expertise. (2) Agent security vs. classical software security — why the threat model shifts when the system is non-deterministic and tool-using, and why mitigations are agent-shaped (split / filter / review / gate) rather than firewall-shaped.

- Connections: "You've had three agents search your company and three more decide. What doesn't sit right about that, from a risk angle? Name the thing you'd want to check before letting this near a real stakeholder."
- Lecture: **"The practice of risk"** — absolute certainty never exists. The practice is the loop: assess → mitigate → reassess residual risk → decide. Access control (what can it reach vs. should reach) and agent-STRIDE (spoof / tamper / repudiate / disclose / DoS / elevate, in agent shapes) are the two lenses. Agentic mitigations (split, filter, review, scope, gate) — not firewalls. And the best mitigation is the one you don't need: don't open the biggest risks in the first place. The `company-ai-policy` skill exists to tell you which doors not to open.
- Exercise: **Audit your agent** — run two pre-made skills against your Module 3 system. Skill 1 (`company-ai-policy`) produces a policy-compliance report — for each policy rule: compliant / violating / "I can't tell." Skill 2 (`agent-security`) runs access-control analysis + agent-STRIDE and suggests ranked agentic mitigations. Read both reports. Pick ONE risk. Apply the mitigation the skill proposed. Re-run. See the residual risk shift — not vanish.
- Teaching moment: Distributed, not dramatic. Some students are clean by luck; most have "I can't tell" rows they can't clear today; all have residual risk after mitigation. The variance across the room IS the teaching moment — and the loop (assess → mitigate → reassess) is portable to every agent they'll build.
> CUSTOMER: The `company-ai-policy` skill is per-customer prep work. Built from the customer's data-usage policy, security policy, AI-use policy (if they have one), and any sector-specific compliance rules (GDPR, NIS2, DORA, MIFID, sector codes). Separately billed if Antti builds it. The `agent-security` skill is generic — shipped with the training.
- Concept (emergent): Skills as expertise injection, not just scoping. Residual risk as a first-class artifact. The best mitigation is not opening the door.
- Reflection: "What's one 'I can't tell' row you're leaving 'I can't tell' today — and what would it take to close it?"
- Homework: extract one micro-skill from your own reading of a company policy rule (e.g., customer-data classification, retention boundaries). Every student produces one skill before Module 5. Plus: agent-sprawl reading (shadow agents, the 82%-think-protected / 24%-have-visibility pattern).
- Bridge: The agent is scoped, the residual risk is named. But the output inside the scope — can you trust what it actually says?

---

## Output Quality and Hallucination Control

**Big idea:** There is truth out there. Your agent's job is to stay connected to it. When it can't reach the ground, it fills the gap — confidently, plausibly, wrong. Grounding is the discipline that makes the gap visible.

**Mood (deliberate):** Rescue. The unease of M3 and M4 has been accumulating; here it finds a home. Fabrication has signature shapes — you CAN spot them — and the fix is mechanical: tighten the rules, regenerate, check again. *"Ahh, this is actually fixable."* But rescue, not triumph. The rules catch fabrication; they don't catch everything. M3's strategic uncertainty and M4's security residual still stand. Competence returns, now earned plainly because the student felt the doubt first and sees what rules can and cannot reach.

**Center of gravity:** GROUNDED as the discipline. Fabrication is the failure mode when there's no ground to stand on. The positive frame ("is the output connected to truth?") carries into every agent output the student will ever read.

Prework: **two** public-record cases with documented organisational root causes (not ten headlines). Mata v. Avianca (S.D.N.Y. 2023) and Deloitte Australia / DEWR welfare-compliance report (2025). Both cases have the organisational missing-check on public record — not just the symptom. Student arrives with one sentence per case: *"the missing organisational check was X."* Seeds M5's classification and lecture Technique 1 (citation re-verification).

- Connections: "Remember the M3 feeling — this is almost right but not quite? Today we name the shape."
- Lecture: **"Why LLMs Will Always Fabricate"** (TODO — not yet written) — leads with GROUNDED as the discipline, fabrication as the failure mode. Statistical nature of generation. Why confidence and correctness are unrelated. Includes compound reliability math (85% per step × 10 steps = 20% end-to-end) — the single most useful number a CTO can take away.
- Exercise: **Hallucination bake-off** — Four detectors race on the same output (your Module 3 briefing): source triangulation, entailment judge, citation integrity, conventional-wisdom flag. A meta-evaluator agent scores each against a 5-claim gold standard you annotate in 2 minutes. Student watches the scoreboard fill in — doesn't classify claims by hand. Winner saves to `judges/groundedness-judge.md` with a mandatory "Known limit:" line naming what it misses. M6 picks this judge up and evolves it. **Magic beat (understandable):** four methods, one corpus, the scoreboard IS the mechanism — *"ahh, this is actually fixable, and here's empirically WHICH detector caught what."* Not triumph: the judge is plain about its blind spots, M3's strategic uncertainty and M4's security residual still stand.
- Concept (emergent): Grounded vs. ungrounded — the positive epistemic frame. The quality loop — generate → spot → tighten → regenerate → judge the tradeoff. The demo-to-production gap — works once ≠ works reliably.
- Teaching moment: Rescue is real but bounded. Grounded catches the invented content. It doesn't catch sources that are wrong, framing that tilts, choices about what to include, or strategic judgment. M3's uncertainty and M4's residual both still stand.
- Reflection: "The v1 vs v2 comparison — which specific line in v2 is a real improvement, and which is a loss you wish you hadn't taken? And what about this briefing still can't the grounding rules reach?"
- Bridge: You can spot ungrounded output by eye. But you won't always be there. What if you could automate what you just did — turn your judgment into rules a machine can run? That's evals.

---

## Evaluations

**Big idea:** Evals are strategic steering, not testing. You're measuring whether the output is differentiated enough to matter.

**Mood (deliberate):** Leverage. In M5 the student spotted fabrication by eye; here they automate it. The mechanical fix gets industrial — evals run the loop so the student doesn't have to. *"Unleash the crunching power."* The mood shifts from relieved competence to empowered builder: *I can steer the system systematically, not just inspect its output one artifact at a time.* Also, the move from "checking the output" to "encoding what matters" — evals are the first artifact where the student's judgment gets pressed into a format a machine can run repeatedly.

**Two things: loop into desired outcome. Create eval criteria that reflect what YOU care about.**

Prework: Ethan Mollick — "Garbage Can and Bitter Lesson."

- Connections: "In Module 5 you spotted fabrication by eye and adjusted rules. What if you could automate that entire loop?"
- Lecture / prework: **"Evals as steering"** — `curriculum/lectures/evals-as-steering.md`. Reframes evals as strategic steering (not testing), distinguishes convergence vs. steering evals, sets up the exercises.
- Exercise: **Eval loop** — Orchestrator session directs **2 parallel generation tracks × 3 rounds** against a shared prompt. The winner judge from M5 (`judges/groundedness-judge.md`) grades each round. Between rounds, a meta-agent observes what the judge caught and what slipped past (optional student deltas.md input), edits the judge's rules in place, and the next round uses the sharper judge. Two loops compounding: generation sharpens under eval pressure; the eval sharpens from observing generation. **Student walks away** for ~25–30 min while rounds run — first true walk-away on the trust-distance ramp. Returns to `judge-diff.md` + `meta-log.md` per round (legibility artifacts), converged outputs, and a judge that visibly learned. **Magic beat (understandable):** mechanism legible in the diff files — student points at specific rule edits and can explain why. *"We can automate the loop — and the loop improves itself."*
- Teaching moment: Evals encode your assumptions about what matters. Wrong assumptions = wrong evals. The loop works for output AND for the evals themselves.
- Concept (emergent): Two uses of evals — convergence (looping to a desired outcome) and steering (encoding preference into the system). Both are essential.
- Throughline moment: "What would have to be true for these evals to be the right ones?"
- Reflection: "If your evals passed, would you stake your reputation on the output?"
- Bridge: You can build agents, secure them, evaluate them. But where do they live in the real world?

---

## From Personal to Team

**Big idea:** You can't really share an agent. You can share context, a skill, the output, or an interface — and the choice is a strategy decision, not a deployment decision.

**Mood (deliberate):** Generosity as a natural consequence. By M7 the student's challenge memory has been quietly working for them for days — it produced outputs they trust, spotted mistakes they corrected, and became something they check before meetings. The mood isn't *"I should scale this because governance says so"* — it's *"this is starting to work. I wonder if others could benefit?"* A generative impulse, not a compliance impulse. That distinction matters: a system shared from enthusiasm promotes differently from one shared from obligation. The friction in M7's exercise (picking a strategy, shipping it, seeing what the receiver actually experiences) lands plainly because the student wants the sharing to work.

**Four known sharing strategies — pick one, ship it. "Share the whole agent" is not a strategy; it's a vendor pitch that doesn't hold up in practice.**

Vendors sell agent marketplaces. Practitioners don't share agents. Four strategies actually work in the field:

1. **Share the context.** Give teammates your `memory/`, `sources/`, root `CLAUDE.md`, `style.md`. They build their own agent on top of your curation. Each person's agent looks slightly different; the context is shared; the curation compounds across the team. Lowest coordination cost; highest trust requirement (your teammates have to trust your curation).
2. **Share a skill.** Extract one scoped capability as a skill file — a policy-check skill, a brand-voice skill, a citation-format skill. Teammates plug it into their own agents. Skills travel further than agents because they're bounded. (This is also where Module 4's skills-as-security-architecture work pays off — scoping is the sharing mechanism.)
3. **Share the output (push).** Deploy the agent on a schedule or in the cloud; put the output somewhere the team sees it (an intranet page, the team's shared drive, a morning email). People consume what the agent produces without running it themselves. Scheduled, one-way, artifact-shaped.
4. **Share an interface (pull).** Wrap the agent in something people can invoke — a Slack bot, a Teams @mention, a web form, a simple endpoint. The agent waits; the interface is the handle. Teammates ask in their own words and get the agent's answer on demand. Higher engineering lift (someone keeps the interface up) but zero trust cost and highest conversational fluency.

Strategies 3 and 4 are close cousins with opposite defaults: 3 is *push* (the agent pushes output to you on a schedule), 4 is *pull* (you pull the agent's attention when you need it). Most teams want one or the other, not both.

Prework (as of 2026-04-20): **Three-walls pre-read** bundling the three real walls a practitioner hits when scaling past themselves: **absorption bottleneck** (L4 — learning-rate cap; your org can't absorb capability faster than people learn to use it), **Access-Trust Gap** (Pattern 47, L4 — 54-95% access, 5-22% production trust, 35+ point gap; access doesn't convert to real use), **discoverability** (F-Secure-validated — nobody finds, invokes, or trusts the shared agent without a way to encounter it in the flow of work). The announcement-to-deployment gap (Pattern 31) was removed from the bundle on 2026-04-20 — it's a research/media pattern for reading vendor noise, not a wall a practitioner hits inside their own rollout. (Data access + runtime walls from the original F-Secure post-training-walls set are technical prerequisites students meet BEFORE they encounter the three sharing walls; they surface in M2 prework and M4, not here.) Plus Rumelt on *crux / Good Strategy Bad Strategy*, Roger Martin on *strategy as assumptions / what would have to be true?*, Gary Klein on *pre-mortem* (migrated from M8 — the strategy skills are now M7 material). The 8 practitioner stories originally TODO'd are superseded by the patterns catalog (`strategy/personal-to-team-patterns.md`) which students consult live during the exercise.

- Connections: "Your challenge memory has been quietly working for you for a day and a half. What would you want your teammate to actually *have* — your folder, one of your skills, the morning output, or a way to ask it a question in Slack? And why that one?"
- Exercise: **Share your work** — Strategy skills (Rumelt's `crux`, Martin's `assumption-test`, Klein's `pre-mortem`) absorbed from M8 apply to the sharing problem itself. Diagnose the load-bearing obstacle (usually social, not technical — the module's teaching moment). Pick 1–3 patterns from the **personal-to-team patterns catalog** (`strategy/personal-to-team-patterns.md`) that fit your real situation. Two branches, both first-class: **Branch A (cloud agent infra — N8N / Cowork / Power Automate / equivalent)** pushes toward plan mode + real deployment. **Branch B (personal Claudes only)** splits work into skills + data sources; teammates run their own Claudes. Student picks live. Deliverables: **technical plan AND people plan** (ownership, governance, operating, accountability, propagation) — missing people plan = incomplete even with perfect technical. Assumption-test names what would have to be true; pre-mortem imagines the 6-month failure (biased toward the social failure you're not seeing). **Hardness is a feature:** students may not complete final passages. What doesn't finish in-room = Monday's work. Forcing-function principle.
- Teaching moment: "Shared agent" sounds sensible and is vendor-shaped ceremony. The real sharing is at context, skill, output (push), or interface (pull) — and the choice between the four IS the design decision. Different challenges want different strategies; different teams absorb different strategies. The room will split across all four, and that's the point.
- Concept (emergent): Sharing layers — context, skill, output, interface — each with a different coordination cost, trust requirement, fidelity, and engineering lift. None of them is "ship the agent." Push (output) and pull (interface) are the two ways to deliver a running agent's value without making the consumer run one.
- Reflection: "Who in your organisation would you share context with? Who should get a skill? Who just wants the output? Who'd actually use an @mention? And why is it almost never the same person across all four?"
- Bridge: You can build agents, secure them, evaluate them, and ship any of four shared versions to your team. What if you didn't have to build each one by hand?

---

## Agents Building Agents (The Flywheel)

**Big idea:** The tool that builds tools compounds.

**Mood (deliberate):** Awe and curiosity. The *"oh shit — where is this all going?"* moment. After seven modules of building, doubting, fixing, scaling, sharing, the flywheel lands: agents building agents, capability compounding by construction, the student's own trajectory accelerating with no visible ceiling. Not fear. Not overwhelm. Genuine awe at what the stack they've been learning can actually do — and genuine curiosity about what comes next. The mood is generative: the student leaves Bootstrap *wanting the next move*, not feeling they've finished one. Any edit that makes M8 feel like a tidy graduation ceremony steals this — the right ending is forward hunger, not closure.

**Everyone's agents run on shared context. The output is the synthesized AI strategy.**

Prework: Risto — acting on the future and building hypotheses. Rumelt — crux / good strategy bad strategy.

> CUSTOMER: CTO/sponsor present for Module 8. Their agent has a special role in Diamond 2 — drafting the guiding policy. They need to be in the room.

- Connections: "You've each built agents for one part of the initiative. What happens when they all run together?"
- Demo: **Agent generates agent** — the meta-tool in action. Sets up the Extend exercise.
- Exercise: **Extend your system** — Use Claude Code to generate a new agent that extends your system — a new data source for the memory, a new kind of output, a new perspective. You describe what you want. The coding agent builds it. It works. That's multiplication.
- Exercise: **Joint Double Diamond — diagnose and guide** — Everyone's agents run on shared context. Three thinking skills run in sequence to do the heavy lifting: **crux** (Rumelt — find the load-bearing obstacle, not the long list), **assumption-test** (Roger Martin — what would have to be true for this guiding policy to work?), **pre-mortem** (Klein/Kahneman — it's 18 months from now and this failed; why?). First diamond: each agent runs the **crux** skill against its own module's hands-on evidence; the room synthesizes a shared crux list and picks the top three. Second diamond: the CTO's agent drafts a guiding policy for the top three cruxes; everyone's agents run **assumption-test** on it, then **pre-mortem** against it. Personal agents cross-pollinate — your agent reads mine, flags conflicts, finds synergies. Output: the synthesized AI strategy, with its load-bearing assumptions named and its most likely failure modes pre-identified.
- Teaching moment: Self-improvement — each cycle makes the next one better. They just saw it: Diamond 2 output was sharper than Diamond 1 because agents built on each other's work.
- Teaching moment: Org capability — 20 people just produced a Rumelt-style strategy kernel (diagnosis + guiding policy + coherent actions) that no consultant could deliver, because it's grounded in hands-on experience with the company's own content. And the agents did the synthesis.
- The deliverable: The synthesized AI strategy IS the executive recommendation. Not co-created on a whiteboard — produced by the system they built.
- Throughline moment: "This strategy is a set of assumptions. Label them. Design experiments to test them. That's how you start Monday."
- Reflection: "What will you build first when you get back to your desk?"
- **Identity-naming close:** after the strategy deliverable lands, the sponsor names what just happened — *"You are now agent builders. You have built agents that do real work on your company's data. You can do it again tomorrow on a new problem. That's the identity you leave with. It's not a badge; it's what you can do."* The term is said out loud, by the sponsor, to the room. No certificate, no ceremony — one sentence that gives every graduate a name for themselves to say in meetings on Tuesday. Identity persists; skills fade.

---

## Supplementary Materials

Reference documents that build up progressively across modules. Participants read assigned sections before the module that next expands them, and own the complete document as a standing reference after the training.

**Why these are not lectures.** Lectures are single-sitting events (a 15-min demo, or a 10-min reading before one module). Supplementaries cover concepts too complex to absorb in one sitting — their *progression* is the point. The "what is an agent" answer a participant needs in Module 1 is different from the one they need in Module 4. A monolithic reading can't meet them where they are; sections build as modules go.

Four supplementaries, with more to be added as patterns emerge:

1. **what-is-an-agent.md** — the agent-ness progression. LLM → chat → system → multi-agent → agents-that-judge → agents-building-agents. Sections added from Modules 1, 2, 3, 4, 5-6, 8.
2. **building-guardrails.md** — the constraint / context discipline. Guardrails as structured context → schema for knowledge → skills as scoped boundaries → generation rules. Sections added from Modules 1, 2, 4, 5.
3. **learning-and-compounding-systems.md** — the system-that-improves discipline. The memory → quality loop → eval iteration → agents building agents. Sections added from Modules 2, 5, 6, 8.
4. **cookbook-for-agent-system-design.md** — *"this is how you do it."* Practitioner recipes, one per module's artifact, written out so a graduate can run them on Monday. Recipes 1–3 seeded from the Bootstrap spine; 4–8 follow the remaining modules. Extends beyond the training with cloud deployment, team sharing, cross-org reuse, enterprise integration, observability, handoffs. Supersedes the earlier "lifecycle doc" idea: recipes compose; lifecycles gatekeep.

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

## State of play (as of 2026-04-20)

Bootstrap training — snapshot of what exists. Refresh this section at the end of every significant session.

**2026-04-20 session — agenticness-contract pass.** Three modules rewritten to honor the Agenticness Contract (walk-away test + 50% magic rule + understandable magic + trust-distance ramp): M5 bake-off, M6 orchestrator+self-improving eval loop, M7 pattern-catalog-driven with strategy skills absorbed. Magic beat count across M3–M8 now 4 of 6 (M3 three-retrievers, M5 bake-off, M6 eval-loop, M8 flywheel) — comfortably over the 3-of-6 threshold. Source-watcher/scheduled pattern confirmed already shipped via M2's personal-agent-homework. M8 live-deliberation direction flagged tentatively pending runtime capability (Cowork or successor). Personal-to-team patterns catalog scaffolded at `strategy/personal-to-team-patterns.md` — needs practitioner-grade examples filled in. Newsletter draft note for the catalog at `strategy/drafts/newsletter-personal-to-team-patterns.md`.

**Fully built** (content artifacts — what a student can actually do):
- **Prework:** `curriculum/trainings/bootstrap/prework.md` (snake / calendar / mental-frame read)
- **Module 1 (Getting Going):** module file + Opening lecture (Context is King) + Personal site with guardrails exercise + Closing lecture (What just happened) + Debrief
- **Module 2 (Building Agent Systems):** module file, Module 2 prework (connector check + plan-mode primer + nudge), Name your challenge opener (first 15 min of Module 2), Build your challenge memory exercise, Personal agent homework (now includes Step 2 "capture the look" → `style.md` + CLAUDE.md rule → stylised HTML output), Compounding lecture, Debrief with crux skill deposit. Main exercise APPROVE WITH TODOs — **needs re-run after the company→challenge memory reframe.**
- **Module 3 (Multi-Agent Systems):** module file, Module 3 prework (five practitioners automating with Claude Code + OpenClaw, plus subagent primer), Three retrievers three minds exercise (two phases — sessions + subagents), When to split an agent (and how) lecture, Debrief tuned to deliberate unease. Exercise eval APPROVE WITH TODOs (length soft-fails); prework eval APPROVE WITH TODOs. Pass 3 mood correction applied — ending mood is "I wonder if this is right?" noted in `module-3/wonder.md`, Module 5 picks up the doubt. Capability questions (multi-session open, subagent launch phrasing) confirmed by Antti; both working. Self-study variant owes a recipe for opening four sessions when no trainer is present.
- **Module 5 (Output Quality):** module file reframed (center of gravity: GROUNDED as the discipline; fabrication as the failure mode when there is no ground to stand on). Exercise rewritten 2026-04-20 to **Hallucination bake-off** (see State of play → REWRITTEN entry below for canonical detail). Previous exercise (**Ground your output** — five-category classification by hand) is kept as optional reference, scheduled for delete at next sweep if unused. Lecture `grounded.md` — original shape leads with GROUNDED as discipline + compound reliability math (85%×10=20%) + three detection techniques (citation re-verification, adversarial pass, consistency probe); **needs reshape** to frame the three as candidates-to-measure in the bake-off rather than methods-to-know. Lecture eval dispatched before reshape; redo after reshape.
- **Module 4 (Security):** module file reframed (mood: epistemic humility, not guilt; big idea: *you can't tell if your agent is safe by looking at its output — the practice is running the check*). Two pre-built skills as the module's material, both written and shipping in `curriculum/scaffolds/module-4-starter/skills/`: `agent-security` (generic, ships with training — SKILL.md + stride.md + access-analysis.md + mitigations.md) and `company-ai-policy` **Nordic-baseline default** (SKILL.md + policies/gdpr-essentials.md + data-classification.md + ai-use-baseline.md + sector-rules-placeholder.md). **For in-company deliveries, `company-ai-policy` is replaced by a customer-specific version co-created with the buying organisation outside this repo (separately billable deliverable, ~0.5–1 day Antti time).** Scaffold README documents the two delivery modes. Prework with two sections: skills + agent-vs-software security. In-room lecture **The practice of risk**. Exercise **Audit your agent** — three phases on the student's Module 3 system, produces `module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md` with a "doors I'd rather not open" scoping rule. Lecture eval APPROVE; exercise eval APPROVE WITH TODOs (length soft-fails). Simulation 8/10 "this is me" — mood lands. Pass-1 patches applied (Phase 3 stop language, re-check granularity). **Blocking before first delivery:** capability check on skill drop-in + plain-language invocation.
- **Cookbook supplementary (stub):** `supplementary/cookbook-for-agent-system-design.md` created as Pass 1 structural placeholder. Recipes 1–3 seeded with one-paragraph summaries pointing at the corresponding module's exercise file; Pass 2 per-recipe write-outs happen as each module reaches its own Pass 3. Supersedes the earlier "lifecycle doc" idea.
- **Mood arc captured (M1–M6):** dedicated section in content-strategy names each module's deliberate mood and the handoff between them (joy → compound → unease → deeper unease → rescue → leverage). Parallel "Mood (deliberate)" lines now sit at the top of M3, M4, M5, M6 sections. Future authors of M4/M5/M6 content must respect the arc: resolving a mood too early steals the next module's teaching moment.
- **Module 5 (Output Quality) — REWRITTEN 2026-04-20 as magic beat:** Hallucination bake-off exercise (4 detectors × meta-eval × gold standard × winner judge saved). Supersedes `ground-your-output.md` (kept as optional reference; delete at next sweep if unused). Lecture `grounded.md` reshaped same session — reframed as "four candidates to measure" (empirical method selection), matches exercise's four detectors, ~900 words.
- **Module 6 (Evaluations) — REWRITTEN 2026-04-20 as magic beat:** Eval loop exercise — orchestrator + 2 parallel generation tracks × 3 rounds + self-improving eval (meta-agent edits judge between rounds). Canonical artifact of Antti's own practice. Supersedes `groundedness-eval.md` and `steering-eval.md`. Steering-eval kept as supplementary for variants.
- **Module 7 (Personal to Team) — REDESIGNED 2026-04-20 as canonical:** `share-your-work.md` exercise absorbs strategy skills from M8 (`crux` / `assumption-test` / `pre-mortem`), uses patterns catalog as reference, two scenario branches (cloud agent infra / personal-Claudes-only), technical + people plan both required, hardness-is-a-feature (incomplete endings = Monday's work). Supersedes `promote-your-challenge-memory.md`. Pattern catalog (`strategy/personal-to-team-patterns.md`) is scaffolded; patterns need Antti's practitioner detail.
- **Supplementaries:** What is an Agent section 1 (other two are stubs)
- **Reference:** Claude quick reference

*Non-content infrastructure (delivery skill, scaffolds, eval system, material distribution, path conventions) lives in its canonical home; see `curriculum/CLAUDE.md` for the map. Don't restate it here.*

**Partially built (module files exist as spines, content still needed):**
- Module 8 — module file exists with Extend + Joint Double Diamond exercises (inline in module file, no separate exercise files yet). Strategy skills (`crux` / `assumption-test` / `pre-mortem`) migrated to Module 7 as of 2026-04-20 — M8 agents still invoke them during deliberation but teaching sits in M7. Live Deliberation direction flagged tentatively in M8 file (networked personal agents on shared runtime, orchestrator-as-agent, humans at decision layer — pending capability landing). The `crux` skill debuts in Module 2's Debrief.

**Open TODOs across the curriculum:**
- Backfill Debrief sections for modules 2–8 (Module 1 is the reference pattern)
- Consider renaming Module 1 to "Context is King" (requires cascade — see TODO comment at top of `trainings/bootstrap/getting-going.md`)
- Supplementaries `building-guardrails.md` and `learning-and-compounding-systems.md` are outlines; sections fill in as their modules are built
- Facilitator notes across all artifacts deferred per student-facing-first rule (below `---` rule; will be extracted to a dedicated artifact later)
- Module 2 prework (`name-your-challenge.md`) and Module 2 homework (`personal-agent-homework.md`) not yet scaffolded

**Open TODOs from critical-review pass (2026-04-17):**
- ~~**What-is-an-agent definitional wobble.**~~ *Resolved 2026-04-18.* Not a real problem — the gradual-reveal doctrine is the answer. An agent is a 5-10-aspect thing; each module turns on one aspect as the exercise needs it. Apparent contradictions between module-level framings resolve experientially, not in text. **Do not bridge them with a paragraph.** Principle now codified in `lecture-guardrails.md` → Teaching principles → "Progressive reveal: don't define the whole agent." Side-fix: the "never line" framing we had invented is gone — it's not part of classical agent architectures; the hardest constraint is just a high-priority rule.
- ~~**Snake game promise unfulfilled.**~~ *Resolved 2026-04-18.* Snake is prework only — a one-shot proof that Claude Code writes files to your machine. Nothing more. The "glance at it again" line was already removed from prework.
- **Capability verification overdue for Module 2 homework.** `personal-agent-homework.md` instructs *Schedule sidebar → New task → New local task* in the Claude Code desktop app. Per the capability-check rule (verify before drafting, not from memory), run a `claude-code-guide` agent pass before the next delivery. Prior sessions missed features; assume this is stale.
- ~~**No student-facing connector pre-check in Module 2 prework.**~~ *Resolved 2026-04-21.* Connector-verification step is now item 2 in `exercises/module-2-prework.md`.
- **Reading-list redundancy check.** Module 1 homework = Antti's LLM brain post. Module 2 prework = Karpathy's LLM Wiki post. Both cover maintained-knowledge-via-LLM. Confirm they earn their seats independently — if one subsumes the other, cut the duplicate. Worth a side-by-side read.
- ~~**Exercise-led rule vs. Module 1 opening lecture.**~~ *Resolved 2026-04-18.* Rule refined in `lecture-guardrails.md`: no *telling* precedes doing, but *showing* (a live demo the student watches) counts as experience. Module 1's opening lecture stands — priming via demo is necessary when there's no prior experience to reflect on.
- **Module 2 one-big-idea density.** Stated big idea: "a system remembers, grows, and compounds." Module 2 actually teaches persistence, custom-agent-as-markdown, plan mode, three-layer architecture, self-maintenance, crux naming. Six moves. Some hang on the big idea; some are orthogonal. Plain review needed: is this compounding-as-throughline, or Module 2 overloaded?
- **Philosophy callout session-level budget.** Rule: 1-2 callouts per lecture max. Compounding lecture uses beliefs #3 + #12; What-just-happened lecture uses beliefs #2 + #3. Belief #3 appears in both — within-lecture budget but student hears it twice in one day. Need a session-level callout register or explicit "repetition across lectures is fine when intentional" note.
- **Productive-failure doctrine vs. prework friction-removal.** `lecture-guardrails.md`: failure is the teaching moment. Recent prework edits added fallbacks and connector pre-checks. Not a contradiction — training-day failures are designed-in, prework failures lose the student. But the line isn't articulated. Add a one-line rule somewhere: *"Design failure INTO training; design it OUT of prework and setup."*
- **"Each task opens the folder where its artifact lands" — rule phrasing drift.** Implied reading: every artifact justifies its own folder-open. Actual design: three session seams (prework, Module 1, Module 2 onward), and within each seam artifacts write to the right subfolder. Tighten phrasing in `curriculum/CLAUDE.md` Material Distribution section and in `content-strategy.md` prework Step 0.

**De-duplication — canonical homes (keep current):**
- **Architectural rules** (directory structure, include-links, module file shape, material distribution, orchestrator pattern) → `curriculum/CLAUDE.md`.
- **Pedagogical rules** (Bloom, 4 Cs, emergent knowledge/control/leadership, audience, throughlines) → `curriculum/lecture-guardrails.md`.
- **Generation-time rules** (three-pass build, PDCA loop, prompt design, simulation protocol, voice/style, jargon ban, philosophy callouts) → `.claude/skills/content-creation/SKILL.md`.
- **Delivery mode + working-directory path** → `.claude/skills/self-study/SKILL.md`.
- **Business model / strategy** → `strategy/` directory.
- **F-Secure copyright fence** → `curriculum/CLAUDE.md` §Copyright fence.
- **Research quality protocol** → project root `CLAUDE.md` + subagent injectable block.

The rule: one canonical home per piece of content; everywhere else uses a one-line reference. If a reader needs detail, they follow the link. When adding a new rule, add it in its canonical home only — pointers elsewhere if discoverability matters.

**Workstream priorities (in rough order):**
0. **Module runtime retrofit to 1h45** (rule added 2026-04-19). Every Bootstrap module session now targets 1h45 to fit a 2-hour calendar invite with ~15 min buffer. Current modules run 65–75 min; need +30–40 min of substance. New guidance lives in `.claude/skills/content-creation/SKILL.md` → "Module session runtime — 1h45 target" and in `curriculum/evals/exercise.md` time-box judge. Retrofit pass owed: M1 (Getting Going), M2 (Building Agent Systems), M3 (Multi-Agent Systems), M4 (Security), M5 (Output Quality), M6 (Evaluations) — extend exercises and Debriefs per the 1h45 budget; do not pad lectures. Options for the extra time: richer multi-loop exercises, longer Connections (group warmup), longer Debrief with cross-room show-and-tell, built-in pair discussion, facilitator-recovery slack.
1. **Module 2 eval + simulation RE-RUN** — the exercise reframed from "company memory" to "challenge memory" (3 sources: Confluence, O365, internet best practice; personal challenge, not shared company KB). Previous APPROVE WITH TODOs verdict is stale; re-evaluate against the new shape.
2. **Name your challenge** prework (`name-your-challenge.md`) — Module 2 prework, delivered before Module 2 starts. Needs scaffold + eval.
3. **Personal agent homework** (`personal-agent-homework.md`) — scheduled daily touch with the memory; moved from prework to Module 2 homework.
4. **Module 4 capability check** — verify skill drop-in + plain-language invocation work reliably in current Claude Code; pre-bake `/skill use` fallback into prompts if not. Blocking before first delivery.
5. **Module 4 customer-version build template** — the out-of-repo process and input checklist for building the customer-specific `company-ai-policy` skill from a customer's policies. Referenced from `scaffolds/module-4-starter/README.md`. Needed to scope the separately-billable prep work and run a first customer engagement.
8. Module 5 content (output quality, hallucination loop — picks up the mood from M3's `wonder.md` and M4's residual)
9. Supplementary sections as their modules land
10. Module 7 content
11. Module 8 content (Extend + Joint Double Diamond with the three thinking skills: crux, assumption-test, pre-mortem)
12. Facilitator notes pass across everything
13. Second training variant (mid-management) — reuse exercises/lectures/supplementaries; new `trainings/mid-management/` module files with audience-specific framing

**Content types in use** (see `CLAUDE.md` for decision tree): lectures (inlined, single-sitting), exercises (inlined, one bounded activity), supplementaries (not inlined, progressive reference), quick reference (not inlined, flat lookup with pointers to official docs).

---

## Reading List — Unallocated

Articles and readings to include as prework/homework. Not yet assigned to specific modules.

- ~~Ethan Mollick: "Garbage Can and Bitter Lesson"~~ → Module 6 prework
- ~~Rumelt: crux / good strategy bad strategy~~ → Module 8 prework
- ~~Risto: acting on the future and building hypotheses~~ → Module 8 prework
- Chip Huyen: AI Engineering (O'Reilly 2025) — best fundamentals book. No code, no math. Evals chapter candidate for Module 6 prework. Most-read on O'Reilly platform. [allocate to module]
- André Lindenberg: Claude Code's memory architecture (LinkedIn post) — three-layer design (index/topic files/transcripts), write discipline, skeptical retrieval. Maps to Module 2 LLM memory architecture. Candidate for Module 2 or Module 3 prework.

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

**7. Absorption bottleneck** (Level 4 meta-pattern — highest-ROI import not yet in curriculum)
Volume of mostly-correct output is the *next* wall after verification. CircleCI 2026 (8M PRs): +59% generation, −7% throughput; 95% of teams fail to scale both. Evals solve *quality*; absorption is the organisational capacity to *metabolise* what the agent produces.
→ Candidate: **Module 7 pre-read** or M6→M7 bridge teaching moment. Frame: "Evals solve verification. Absorption is the next wall — and yours." Pairs naturally with the sharing strategies (output-push vs interface-pull have very different absorption profiles).
→ Source: `continuous-research/findings/by-pattern/absorption-bottleneck.md`.

---

## Audit Notes — Research Alignment (2026-04-19)

Gaps and reframes from the curriculum↔research audit. Apply at next revision of the named sections.

**M7 pre-read bundle (compose one reading from three findings):**
- Absorption bottleneck (#7 above) — the next wall after verification.
- Access-Trust Gap (#3 above, Pattern 47 L4) — "access is easy; trust is the scarce thing you are actually distributing."
- Announcement-to-deployment gap (#6 above, Pattern 31 L3) — vendor pitch inoculation.
Together these prime the M7 generosity mood plainly: sharing is not a ceremony, it's running into three real walls practitioners have already hit.

**Reframe "canonical" on four sharing strategies (line 401).** Research did not find a validated promotion path (`synthesis/cto-answer.md` §"What We Did Not Find"). The four strategies are Antti's practitioner taxonomy (F-Secure / Neste / Posti cohorts), not an L3 convergence finding. Relabel as *"four strategies that work in practice"* and note explicitly that the industry has no validated pattern yet — directness positions the buyer.

**M2 LLM Wiki + Claude Code choice — defensible by absence.** The counter-argument to "author intuition" is convergence-by-absence: no business-side practitioner has ever shipped proper agents on LangChain (2022+) or Copilot Studio (2023+) at any scale we've found. The alternative platforms produce consumers, not builders. File-based agentic RAG on a coding-agent substrate is where business-side builders exist. Teach confidently; cite the absence directly. (See user signal 2026-04-19.)

**Sponsor-attends framing.** Defensible from competence-first + experience-first patterns, but no direct research on *sponsor-in-room-for-all-8-modules* vs. alternatives. Own it as practitioner conviction in sales conversations, not "the research shows."

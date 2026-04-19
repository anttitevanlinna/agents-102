# Lecture Guardrails

Rules for designing and reviewing curriculum modules. Every module must pass these guardrails before it ships.

> **This document owns pedagogy** — the learning design that all modules embody. For generation rules (how to write a lecture/exercise file) see `.claude/skills/content-creation/SKILL.md`. For architecture (directory structure, include-links, distribution) see `curriculum/CLAUDE.md`.

---

## Bloom's Taxonomy Drives Everything

Every module and every subsection within a module is designed against explicit learning goals, classified by Bloom's taxonomy level:

1. **Remember** — recall facts, terms, concepts
2. **Understand** — explain ideas, interpret, summarize
3. **Apply** — use knowledge in new situations
4. **Analyze** — break down, compare, identify patterns
5. **Evaluate** — judge, critique, make decisions
6. **Create** — design, build, produce something new

### How this works in practice

**Design time:** Before writing any module content, write the learning goals first. Each goal states what the participant will be able to do (verb) and at which Bloom's level. The exercises are then designed to reach those levels — not the other way around.

**Review time:** After drafting a module, check every subsection: what Bloom's level does this target? If a module claims "participants will be able to design X" (Create) but the exercises only ask them to follow a tutorial (Apply), the module fails review.

### Learning goals in the material

Learning goals are not hidden metadata. They are visible to participants at three points in every module:

**At the start — "What you'll learn":**
Short, formal learning goals. Written as "After this module, you will be able to..." followed by specific, verb-led statements. Participants read these before starting. They know what they're aiming for.

```
## What You'll Learn

After this module, you will be able to:
- **Identify** the components of an agent system (tools, instructions, memory)
- **Build** a working agent that uses your own data
- **Evaluate** whether your agent's output is trustworthy by testing it against facts you know
```

**At the end — "What you learned":**
Return to the same learning goals. Briefly confirm: you can now do these things. Not a lecture — a mirror. "You just did X. That's [Bloom's level] — you didn't just read about it, you built it."

**At the end — "What this unlocks":**
A short section connecting the achieved learning goals to real capability: "Now that you can [learning goal], you are able to [practical thing in your organization]." This bridges from training to work. Not aspirational — concrete.

```
## What This Unlocks

Now that you can build and evaluate a personal agent:
- You can create a first agent for any domain where YOU are the expert evaluator
- You can explain to your team what an agent actually does — with a live demo, not slides
- You can spot when an agent is fabricating — the most important skill in agent work
```

### Bloom's level expectations per module

Not every module needs to reach Create. The progression across the 8-module arc:

| Module | Primary Bloom's level | Why |
|--------|----------------------|-----|
| 1. Getting Going | Apply | Build your first thing |
| 2. Building Agent Systems | Apply → Analyze | Grow the project, understand why structure matters |
| 3. Multi-Agent Systems | Analyze → Create | Design coordination, make architectural choices |
| 4. Security | Analyze → Evaluate | Break things, judge what's safe |
| 5. Output Quality | Evaluate | Judge output, identify failure modes |
| 6. Evals | Create | Design your own evaluation system |
| 7. From Personal to Team | Analyze → Evaluate | Redesign for shared use, judge what breaks |
| 8. Agents Building Agents | Create | Build the meta-tool, design the flywheel |

---

## Training from the Back of the Room — 4 Cs Structure

Every module follows Sharon Bowman's 4 Cs framework, adapted for hands-on-keyboard training.

### The 4 Cs

**C1: Connections (opening — ~10% of module time)**
Activate what learners already know before any new content. Everyone in the room has prior beliefs about agents — from ChatGPT, news, vendor pitches, their own experiments. Surface these first.

Techniques:
- **"What do you already know?"** — quick round: participants share their current understanding or experience with the module's topic. No correction yet — wrong beliefs are useful, they make the learning stick when challenged.
- **"What questions do you have?"** — park questions visibly. Return to them at the end. Unanswered questions create attention.
- **Prediction** — "What do you think will happen when we do X?" before the exercise. Creates engagement with the outcome.

What this replaces: jumping straight into exercises. The Connection makes the exercise meaningful — participants aren't just following steps, they're testing their own beliefs.

**C2: Concepts (content delivery — ~20% of module time)**
Short bursts of new information. Never more than 10 minutes of facilitator talking before participants do something with the information.

Rules:
- **10-minute rule.** If the facilitator has been talking for 10 minutes, stop. The learners do something: discuss, predict, try, question.
- **Concepts serve exercises, not the other way around.** Only explain what's needed for the next exercise. No "background" sections that front-load theory.
- **Use the learners' language from C1.** If someone said "I think agents are just chatbots with tools," build on that — confirm, challenge, or extend it.

**C3: Concrete Practice (the core — ~50% of module time)**
Learners do real work. This is the exercise-led heart of every module. Participants build with Claude Code, using their own data, in their own context.

Rules:
- **Practice the skill, not a simulation of the skill.** Building an agent IS the practice. Not a quiz about agents. Not a diagram of an agent.
- **Mistakes are the curriculum.** When the agent fabricates, when the prompt injection works, when the multi-agent handoff fails — that's the learning. Don't prevent failure; design for it.
- **Incremental growth.** Each exercise extends what was built before. The participant's project grows across modules, not reset each time.

**C4: Conclusions (closing — ~20% of module time)**
Learners generate the summary, not the facilitator. If they can't articulate what they learned, the module didn't work.

Techniques:
- **"Teach it back"** — pairs explain the key concept to each other. The facilitator listens, corrects only if fundamentally wrong.
- **Return to C1 questions** — revisit the parked questions and predictions. "You predicted X. What actually happened?" This closes the loop.
- **"What this unlocks"** — participants (not the facilitator) articulate what they can now do that they couldn't before. The facilitator adds the formal framing after.
- **Learning goals check** — return to the stated goals from the opening. Confirm each one was met through what was done, not what was said.

### Adaptation for hands-on-keyboard training

TBR was designed for classroom training with physical movement — wall charts, gallery walks, table rotations. This training is built around Claude Code on a laptop. The adaptations:

| TBR principle | Classroom version | Our version |
|--------------|-------------------|-------------|
| Movement trumps sitting | Stand up, walk to wall chart | Switch between terminal and discussion. Change pairs. Demo to neighbor. |
| Talking trumps listening | Table discussions | Pair programming. "Explain to your neighbor what your agent just did." |
| Images trump words | Visual aids, posters | Live terminal output. The agent's behavior IS the visual. |
| Writing trumps reading | Sticky notes, flip charts | Participants write prompts, instructions, CLAUDE.md files. Writing IS building. |
| Shorter trumps longer | 10-min chunks | Same — 10-min rule applies to facilitator talking. Exercises can run longer. |
| Different trumps same | Vary activities | Alternate: solo building → pair review → group discussion → solo building. |

### How 4 Cs maps to the module format

```
# Module N: [Title]

## Connections                    ← C1: activate prior knowledge
## What You'll Learn              ← formal learning goals (Bloom's)
## [Concept + Exercise blocks]    ← C2 and C3 interleaved, never C2 alone for >10 min
## What You Learned               ← C4: return to learning goals
## What This Unlocks              ← C4: learner-generated, then facilitator frames
## Reflection                     ← C4: return to C1 questions and predictions
```

---

## Style and Vibe: For Builders

This training is for people who learn by doing. Not by reading. Not by listening. Not by being told what's important. They build something, and the understanding follows.

The entire curriculum rests on three emergences.

### Emergent knowledge

Knowledge is not transmitted. It emerges from practice.

You don't explain what an agent is, then have them build one. They build one, and then they know what an agent is — from the inside out, not from a definition. The exercises produce the knowledge. The facilitator's job is to name what just happened, not to pre-explain what's about to happen.

This means:
- **No *telling* precedes doing.** Verbal concept talk ("here's what X is, now go try it") is banned before the exercise. But *showing* is not telling — a live demo the student watches counts as experience. Module 1's opening lecture is a 15-min demo of context-shaping in action; the student hasn't built anything yet, but they've *seen* the phenomenon. Priming via demo is necessary when there's no prior experience to reflect on — the student needs an anchor to reach for. The rule, sharpened: tell nothing; let them experience (as actor OR watcher); name what just happened after.
- **Vocabulary arrives late.** Participants have already built the thing before they learn what it's called. "What you just created — that pattern is called orchestration." Not "Orchestration is a pattern where..."
- **Wrong mental models are useful.** If someone thinks agents are "just fancy chatbots," don't correct them up front. Let the exercises break that belief. A corrected misconception sticks harder than a delivered fact.
- **The facilitator asks, doesn't tell.** "What did you notice?" beats "Here's what happened." Pull the insight from the room. If nobody gets there, ask a sharper question. Telling is the last resort.
- **Mistakes are the curriculum.** When the agent fabricates, when the prompt injection works, when the multi-agent handoff fails — that's the learning. Don't prevent failure; design for it.

### Emergent control

You don't teach control as rules. Control emerges from experiencing what goes wrong.

Security isn't a policy document. It's the moment your agent leaks data because you didn't set a boundary. Hallucination control isn't a checklist. It's the moment your agent confidently invents a credential you never had. Evals aren't best practice. They're the discipline you build after your agent broke your trust.

This means:
- **Design for failure first.** Every discipline module (4, 5, 6) starts by letting the thing go wrong. The participant's own agent — the one they built and trust — fails. That emotional response is the foundation of the discipline.
- **Rules arrive as solutions, not as mandates.** "Your agent just leaked data. Here's how you prevent that." Not "These are the security rules. Now apply them." The rule is the answer to a problem they just felt.
- **Control is earned, not granted.** Participants don't get a checklist of best practices. They develop their own controls through experience, guided by the exercises. Their controls are theirs — they'll actually use them.

### Emergent leadership

You don't teach leadership. It emerges from being the person who can teach others.

The final act of every module is articulating what was learned — to a partner, to the group, in your own words. This isn't assessment. It's the first act of leadership. If you can explain what an agent does, you can lead an agentic initiative. If you can explain why evals matter, you can build the case for your organization. The multiplier effect isn't a separate module — it's woven into every Conclusions phase.

This means:
- **"Teach it back" is not optional.** Every module ends with participants explaining the core concept to each other. Not summarizing — teaching. The difference matters: summarizing is recalling, teaching is restructuring the knowledge for someone else.
- **The training creates teachers, not graduates.** The real measure of a module isn't "did they get it?" but "can they make someone else get it?" That's the standard for Champions readiness.
- **Agency over the material.** Participants are not consumers of the curriculum. They reshape it through plug points, through their own examples, through the questions they ask. By the end of Bootstrap, the best ones are already thinking "I could run this for my team." That's the point.

### The builder's contract

The implicit promise to every participant:

> We won't waste your time with theory you could read yourself. Every minute you spend here, you'll be building something real. You'll leave with something that works, the knowledge of where it breaks, and the ability to explain both to your team. The rest — the vision, the strategy, the scaling — emerges from that foundation. You go first. Then you help others go forward.

---

## Philosophy as the Spine

`philosophy.md` (repo root) holds the 19 beliefs behind the training. Two clusters matter most for the story arc:

- **Fundamental questions about the future** — where is this going, what's real vs. hype, who creates it, what do you do about it, where does the real transformation happen.
- **Student's stance** — practice or theorize, tool or fundamentals, go first or wait, share or hoard, consumer or teacher, move without a map.

Philosophy threads through the training in lectures, openings, closings. **The teacher carries the whole story arc in the room, including parts that are deliberately not written down.** Written materials are the backbone, not the script. Some parts remain human and just spoken in the right places.

For the generation-time rule on how to deploy philosophy callouts in content (sparing, never front-loaded), see `.claude/skills/content-creation/SKILL.md`.

---

## Audience: The Chat-to-Systems Leap

### Entry requirement

One thing: **you can have a lengthy conversation with an LLM.** That's it. If you've used ChatGPT, Claude, Copilot — had real back-and-forth conversations, not just "write me an email" — you're ready.

No coding experience. No prompt engineering course. No AI background. The chat experience is the foundation. Everything else, we teach.

### The real situation in the room

The room will have a range:
- **Basic chat users** — they've had conversations with ChatGPT, maybe use it weekly. They know it's useful but haven't gone deep.
- **Advanced chat users** — heavy daily users, good at prompting, maybe built custom GPTs or Claude Projects. They get a lot out of these tools.
- **Deep prompters** — they've studied prompt engineering, chain-of-thought, system prompts. They know the craft of getting good outputs from a single conversation.

**What unites them all: nobody is building systems.** They are all chatting. Even the most advanced users are having conversations — one prompt, one response, maybe a long thread. They are not creating agents that run autonomously, coordinate with other agents, use tools, or operate without a human in the loop.

That is the leap this training makes: **from chatting with AI to building systems with AI.**

### What this means for module design

**Module 1 must work for basic chat users.** If someone who's only used ChatGPT casually can't complete Module 1, the module is broken. The entry barrier is too high. Module 1 is the door — it must be wide open.

**Advanced users are not bored by Module 1.** They move faster through the exercises, but the insight is new for everyone: chat is ephemeral, systems persist. Even a deep prompter has never given an agent a CLAUDE.md file, tools, and autonomy. That's a different thing from a good prompt.

**The gap between chat and systems is the same for everyone.** A basic chat user and an advanced prompter are equidistant from building an agent system. The prompter will write better instructions faster — but the architectural thinking (decomposition, tool design, evaluation, multi-agent coordination) is new for both. Don't assume advanced users can skip foundational concepts. They can skip "what is an LLM" — they can't skip "what is an agent."

**Never explain what they already know.** Everyone in the room has chatted with an LLM. Don't waste time explaining what a prompt is, what a response looks like, or that LLMs can be wrong. They know. Start from there. The Connections phase (C1) should surface their existing chat experience as the foundation — "You've all done X. Now we're going to do something different."

**Name the leap explicitly.** Participants need to hear: "Everything you've done with AI so far is a conversation. Today you start building systems. The difference: a conversation ends when you close the tab. A system keeps working." This framing respects their experience while making the new territory clear.

### Pacing for mixed experience

- **Exercises have a floor and a ceiling.** The basic exercise is completable by a basic chat user. The extension ("Now try...") challenges advanced users. Same module, different depth.
- **Pair mixed levels.** When forming pairs for discussion or review, mix basic and advanced users. The advanced user practices teaching (emergent leadership). The basic user gets a peer explanation, not a facilitator lecture.
- **Advanced users are not teaching assistants.** They are learning too. Their experience with chat is relevant context, not authority. The system-building concepts are new for them — don't let them coast on chat fluency.

---

## Training Strategy Decisions

Strategic choices that shape how every module is designed and delivered.

### The initiative: one shared company goal

Everyone in the room works on the same company-relevant initiative. Not individual projects. Not generic scenarios.

**How it works:**
- The initiative is pre-agreed with the customer sponsor before the training. Example: "We want agents for our claims processing," "We need agent-driven competitive intelligence," "We want to automate our compliance reporting."
- Antti and the sponsor scope it to something that (a) matters to the company, (b) is achievable as a growing prototype across 8 modules, and (c) touches enough complexity to sustain the full arc.
- All exercises advance this initiative. The system grows across modules — not throwaway exercises but a single system getting more sophisticated. See `content-strategy.md` for the module arc.

**Why this works:** Relevance is not negotiable. A CTO sending 20 people to Bootstrap expects them to come back having worked on something real for the company — not a toy project they'll never touch again.

**What this means for the curriculum:** The module files describe the exercises in terms of the structure (what kind of agent, what kind of growth, what kind of coordination), not the domain. The domain comes from the initiative. Exercises use placeholders like "your initiative's data source" and "your initiative's key workflow" — filled in during prep.

### The tooling: Claude Code desktop/web

Plan for Claude Code in GUI/web mode. Do not assume terminal comfort. The audience is chat users — they are comfortable with graphical interfaces and text input, not with command lines.

**Design implication:** Exercises describe what to do conceptually ("create a new project," "add a tool," "give your agent these instructions") rather than terminal commands. When Claude Code has both CLI and GUI modes, the exercises should work in either.

**Fallback:** If Claude Code desktop/web isn't available for a specific cohort, the facilitator handles the terminal layer. Exercises stay focused on what participants are thinking and deciding, not on which commands they type.

### The discipline modules: separate first, then apply

Modules 4-6 (Security, Output Quality, Evals) follow a two-phase pattern:

1. **Learn the discipline on a controlled example.** The facilitator provides a prepared agent designed to fail in instructive ways. The failure is dramatic, clear, and designed — not accidental. Participants see the problem in a context where the facilitator controls the outcome.

2. **Apply the discipline to your own project.** Participants take the lessons and apply them to the initiative project they've been building since Module 1. Now the failure is personal — their agent, their initiative, their problem.

**Why this order:** Jumping straight to "attack your own agent" is pedagogically risky. Participants might not find the vulnerability. The controlled example guarantees the teaching moment. The application to their own project guarantees the emotional impact.

### Scheduling is a delivery decision

Modules are self-contained units. Could be 2 days intensive, 8 weeks at 2 hours each, or any other configuration. The curriculum doesn't assume a schedule. Every module must work as a standalone session with prework before and homework after.

### The deliverable

Bootstrap ends with a tangible deliverable for the executive sponsor. See Module 8 in `content-strategy.md` for the current format (double diamond, Rumelt-style strategy kernel). The format may evolve after the first delivery.

---

## Module Reusability: One Library, Many Curriculums

Modules and exercises are **composable building blocks**, not chapters in a monolith. The same module library serves multiple curriculum variants — different audiences, different emphasis, ~80% shared content.

### Known variants

- **Agents 102 (Bootstrap)** — the default. Hands-on builders making the chat-to-systems leap. Individual empowerment as the foundation.
- **Agents 102 for Mid-Management** — more team/org transformation framing. Same building exercises, different reflection questions and throughline emphasis. "How does this change how your team works?" instead of "What will you build next?"
- Future variants may include: executive briefing (compressed), domain-specific (e.g., agents for finance), advanced practitioners.

### Why this matters (architectural rationale)

The anti-SAFe promise ("with your own structure") means the curriculum itself must be modular. If we can't reconfigure our own training for different audiences without rewriting, we're doing the thing we criticize. Composability isn't just a nice-to-have — it's the product architecture.

Core design commitments:

1. **Separate universal core from audience-specific framing.** Every module has a core that's the same everywhere (the exercises, the concepts, the failure modes) and a framing layer that varies by audience (Connections questions, Conclusions prompts, "What This Unlocks" sections, facilitator notes about the room dynamic).
2. **Exercises are universal. Reflections are audience-specific.** Building an agent is building an agent — the tech is the same regardless of who's in the room. But "What did you learn?" means something different to an individual contributor vs. someone responsible for 50 people's productivity.
3. **The throughlines flex, they don't change.** Roger Martin's "strategy as assumptions" lands for everyone. But the assumptions worth surfacing differ: a builder asks "will this agent work?" while a mid-manager asks "will my team adopt this?" Same framework, different questions.
4. **One file per module, not one file per variant.** Forking files = drift. The mid-management version of Module 4 should never drift from the Bootstrap version of Module 4's core exercises.

---

## Teaching Principles

Design heuristics that apply across all modules. Not per-module prescriptions — those live in the content strategy.

### Exercise pairing: solo building, pair review

During exercises, everyone builds individually at their own pace and depth. Then they pair up to review each other's work.

- Solo building: preserves individual pace. Nobody is waiting for their partner.
- Pair review: cross-pollination. Each person sees a different approach to the same problem.

**Design implication:** Exercises have a clear "build" phase (solo, timed) and a "review" phase (pairs, structured questions). The review isn't "show and tell" — it has specific prompts: "What did your partner do that you wouldn't have thought of? What would break in their approach?"

### The "system" concept: persistence + automation

For non-technical people, "system" clicks when two things combine:
1. **Persistence** — "It remembers. It has files. It has structure. It's not a chat that resets."
2. **Automation** — "It runs without me. It did the work while I was in a meeting."

Neither alone is enough. Persistence without automation is just a saved document. Automation without persistence is a one-shot script. Together, they make "system" tangible.

### Progressive reveal: don't define the whole agent

An agent is a 5-10-aspect thing (goal-oriented, multi-turn, autonomously-deciding, with LLM + harness + tools + context + guardrails + …). **Do not give the whole picture at the start — it overwhelms.** Each module turns on one aspect, as the exercise needs it:

- Module 1 — context shapes output
- Module 2 — persistence + automation = system; text file as the thing you author
- Module 3 — coordination across agents (assembly line)
- Module 4 — tool boundaries (skills)
- Module 5-6 — reliability and steering
- Module 7 — shared ownership
- Module 8 — self-reference / compounding

By the end, the student has the whole picture. At each moment, they have only the aspect the current work requires. Apparent contradictions between module-level definitions (*"agent = LLM + tools"* in prework vs. *"agent = markdown file"* in Module 2) resolve experientially, not in text — don't try to bridge them with a paragraph.

### Evals framing: strategic steering, not testing

Evals are NOT testing. They are not quality control. They are not proofreading. **Evals are a tool for steering output toward strategically significant factors.** Making output more differentiated. More aligned with brand voice. More grounded in specific evidence. With clear metrics.

### Multi-agent framing: assembly line or fan-in

Two shapes land for business audiences: **assembly line** ("each agent does one step and passes the work forward" — sequential) and **fan-in** ("several specialists run in parallel, one synthesizer decides" — Module 3's shape). Both are learnable because both have *seams you can point at*. A web of agents talking to each other is not (at this level). In either shape the teaching moment is the same: **the seam is where it fails** — handoffs lose conflicts, dialects clash, synthesizers average to beige.

---

## The Throughline: Strategy as Discovery

Every module echoes a single philosophical stance: **strategy is not a plan — it's a process of discovery through action.** This is Roger Martin's "Playing to Win" logic applied to agent work: you don't analyze your way to the right agent. You make choices, test them, learn, and make better choices.

### The three throughlines

These are not separate topics. They are lenses that recur in every module — in exercises, in reflections, in the Connections and Conclusions phases. They are how we talk about what's happening, not what we explicitly teach.

**1. Continuous improvement** — Building an agent is not a project with an end. It's a cycle: build → observe → adjust → build again. Toyota Kata pattern. Never present this as a methodology — it's what naturally happens when builders keep building. Name it when you see it.

**2. Discovery and learning** — You cannot predict what an agent will do from its specification. You have to run it and see. This mirrors Martin's core argument: strategy is a bet, not a proof. When participants say "I thought it would do X but it did Y" — that's the moment. Celebrate it.

**3. Strategy as assumptions** — Every design decision is an assumption. "This guardrail will prevent off-brand output" — assumption. Test it. Use Martin's language: "What would have to be true for this to work?" This is the question that turns a decision into a testable hypothesis.

### How throughlines appear in the material

Throughlines are NOT separate sections in each module. They emerge in:

- **Connections (C1):** "What assumptions did you bring into this module?"
- **Exercise debrief moments:** "What surprised you? That surprise = an assumption that was wrong."
- **Conclusions (C4):** "What would have to be true for this to work in your company?"
- **The Bridge:** "The assumption you just tested leads naturally to the next question..."

The facilitator names the pattern when it appears. The material creates the conditions for it to appear. The throughlines are never taught — they are observed and named.

---

## Design Implications from the Sponsor's Perspective

### Every module must produce a showable artifact

Every module must produce something a participant can SHOW someone else. Not just knowledge in their head — an artifact, a demo, a story. "Let me show you what I built" is how movements start. This also creates WoW moments — participants surprised by what they just created — which fuel post-training adoption.

### Why training, not self-serve

Self-serve plateaus at chatting. Smart people will figure out better prompting. They will NOT cross the gap to building systems. Training crosses the gap. Self-serve may never cross it. Self-serve also doesn't create teachers — and the multiplier effect is what the sponsor is actually buying.

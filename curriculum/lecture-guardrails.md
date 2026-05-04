# Lecture Guardrails

> **What this file is.** Pedagogical theory reference — Bloom, 4 Cs, the three emergences, audience, throughlines, sponsor-perspective design implications. Read once for grounding before doing curriculum work.
>
> **What this file is NOT.** A generation-time checklist. Generation rules fire from `memory/check_*.md` compendiums (writing, sales_copy, student_facing, prompts, lectures, strategy_tie_in, pedagogy, research_claims, platform_and_boundaries) — not from this file.
>
> **Where the live rules live.** Architecture: `curriculum/CLAUDE.md`. Session/PDCA cadence and three-pass build: `.claude/skills/content-creation/SKILL.md`. Compounded learnings (atomic, schema-validated): `memory/compounded/`.

---

## Bloom's Taxonomy Drives Everything

Every module and every subsection is designed against explicit learning goals, classified by Bloom's level:

1. **Remember** — recall facts, terms, concepts
2. **Understand** — explain, interpret, summarize
3. **Apply** — use knowledge in new situations
4. **Analyze** — break down, compare, identify patterns
5. **Evaluate** — judge, critique, decide
6. **Create** — design, build, produce

**Design time:** Write learning goals first. Each states what the participant will be able to do (verb) and at which Bloom's level. Exercises are then designed to reach those levels — not the other way around.

**Review time:** Bloom's-level fit per subsection is checked as part of the LLM-judge eval (see `curriculum/evals/lecture.md` template), not as an independent author pass.

### Learning goals are visible to participants at three points

**At the start — "What you'll learn":** formal, verb-led. *"After this module, you will be able to..."*

```
## What You'll Learn

After this module, you will be able to:
- **Identify** the components of an agent system (tools, instructions, memory)
- **Build** a working agent that uses your own data
- **Evaluate** whether your agent's output is trustworthy by testing it against facts you know
```

**At the end — "What you learned":** return to the same goals. A mirror, not a lecture.

**At the end — "What this unlocks":** connect achieved goals to real capability. Concrete, not aspirational.

### Bloom's level expectations per module (Agents 101)

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

Other trainings (AE101, Engineering Management) have their own Bloom progressions — see their content-strategy files.

---

## Training from the Back of the Room — 4 Cs Structure

Every module follows Sharon Bowman's 4 Cs framework, adapted for hands-on-keyboard training.

**C1: Connections (~10%).** Activate prior knowledge. *"What do you already know?"*, parked questions, predictions before the exercise.

**C2: Concepts (~20%).** Short bursts of new information. **10-minute rule** — if the facilitator has been talking 10 minutes, stop. Concepts serve exercises, not the other way around. Use the learners' language from C1.

**C3: Concrete Practice (~50%).** Learners do real work. Building an agent IS the practice — not a quiz, not a diagram. Each exercise extends what was built before; the project grows across modules.

**C4: Conclusions (~20%).** Learners articulate what they did. Articulating-the-summary is one valid Conclusions move; it is not the test of whether the module worked (the AE101 mood arc treats unease/struggle as the curriculum — see `check_pedagogy.md` §19 silent-failure rule). Return to C1 questions and predictions; "What this unlocks"; learning goals check.

### TBR adaptation for hands-on-keyboard training

| TBR principle | Classroom version | Our version |
|--------------|-------------------|-------------|
| Movement trumps sitting | Walk to wall chart | Switch between terminal and discussion |
| Talking trumps listening | Table discussions | "Explain to your neighbor what your agent just did" |
| Images trump words | Visual aids | Live terminal output. Agent behavior IS the visual |
| Writing trumps reading | Sticky notes | Participants write prompts, instructions, CLAUDE.md files |
| Shorter trumps longer | 10-min chunks | Same — 10-min rule for facilitator talking |
| Different trumps same | Vary activities | Alternate building → discussion → building |

Canonical module file shape (Big Idea / Meta / Plug Points / Debrief / Bridge): see `curriculum/CLAUDE.md` § *Module File Shape*.

---

## Style and Vibe: For Builders

People who learn by doing. They build something, and the understanding follows. The curriculum rests on three emergences.

### Emergent knowledge

Knowledge is not transmitted. It emerges from practice. Participants build the thing before they learn what it's called. *"What you just created — that pattern is called orchestration."* Not *"Orchestration is a pattern where..."*

A live demo the student watches counts as experience — priming via demo is necessary when there's no prior experience to reflect on. The rule, sharpened: tell nothing; let them experience (as actor OR watcher); name what just happened after.

### Emergent control

Control emerges from experiencing what goes wrong. Security isn't a policy document — it's the moment your agent leaks data because you didn't set a boundary. Hallucination control isn't a checklist — it's the moment your agent confidently invents a credential.

Discipline modules (4, 5, 6) start by letting the thing go wrong. Rules arrive as solutions to problems the participant just felt — not as mandates.

### Emergent leadership

The final act of every module is articulating what was learned. The first act of leadership.

(Agents 101 framing: *"creates teachers, not graduates"* — the measure is *"can they make someone else get it?"* AE101 has a different end-state — *practitioner*, not teacher. Portfolio-wide, the principle is that participants reshape the curriculum through plug points, examples, and questions.)

### The builder's contract

> We won't waste your time with theory you could read yourself. Every minute you spend here, you'll be building something real. You'll leave with something that works, the knowledge of where it breaks, and the ability to explain both to your team. The rest — the vision, the strategy, the scaling — emerges from that foundation. You go first. Then you help others go forward.

---

## Audience: The Chat-to-Systems Leap (Agents 101)

This section describes the **Agents 101** audience. Other portfolio trainings target different audiences (AE101: software engineer ICs; Engineering Management: engineering managers) — see their content-strategy files. The "chat-to-systems leap" framing below is Agents 101-specific.

**Entry requirement:** **you can have a lengthy conversation with an LLM.** That's it. No coding experience, no prompt engineering course, no AI background.

**The room will have a range:**
- **Basic chat users** — weekly ChatGPT use, haven't gone deep.
- **Advanced chat users** — heavy daily users, good at prompting, custom GPTs or Claude Projects.
- **Deep prompters** — studied prompt engineering, chain-of-thought, system prompts.

**What unites them: nobody is building systems.** Even the most advanced users are having conversations. They are not creating agents that run autonomously, coordinate, use tools, or operate without a human in the loop. The Agents 101 leap: **from chatting with AI to building systems with AI.**

**What this means for module design:**

- **Module 1 must work for basic chat users.** Entry barrier must be low. Advanced users are not bored — the insight (chat is ephemeral, systems persist) is new for everyone.
- **The gap between chat and systems is the same for everyone.** A basic chat user and an advanced prompter are equidistant from building an agent system.
- **Never explain what they already know.** Everyone has chatted with an LLM. Start from there.
- **Name the leap explicitly.** *"Everything you've done with AI so far is a conversation. Today you start building systems."*

**Pacing for mixed experience:** Exercises have a floor and a ceiling (basic + extension). Pair mixed levels — advanced practices teaching, basic gets peer explanation. Advanced users are not teaching assistants; the system-building concepts are new for them too.

---

## Training Strategy Decisions

### The initiative: one shared company goal

Everyone works on the same company-relevant initiative. Not individual projects. Pre-agreed with the customer sponsor; scoped to something that (a) matters to the company, (b) is achievable as a growing prototype across the module arc, (c) touches enough complexity to sustain the full arc. All exercises advance this initiative — a single system getting more sophisticated.

A CTO sending 20 people to Agents 101 expects them back having worked on something real for the company.

**Curriculum implication:** Module files describe exercises in terms of structure (what kind of agent, what kind of growth, what kind of coordination), not domain. The domain comes from the initiative. Exercises use placeholders like *"your initiative's data source"* — filled in during prep.

### The discipline modules: separate first, then apply

Modules 4-6 (Security, Output Quality, Evals) follow a two-phase pattern:

1. **Learn the discipline on a controlled example.** A prepared agent designed to fail in instructive ways. The failure is dramatic, clear, designed.
2. **Apply the discipline to your own project.** Take the lessons to the initiative project they've been building.

Jumping straight to *"attack your own agent"* is pedagogically risky — participants might not find the vulnerability. The controlled example guarantees the teaching moment; the application to their own project guarantees emotional impact.

---

## Module Reusability: One Library, Many Curriculums

Modules and exercises are **composable building blocks**, not chapters in a monolith. The same library serves multiple curriculum variants — different audiences, different emphasis, ~80% shared content.

The anti-SAFe promise (*"with your own structure"*) means the curriculum itself must be modular. If we can't reconfigure our own training without rewriting, we're doing the thing we criticize. Composability is the product architecture.

**Core design commitments:**

1. **Separate universal core from audience-specific framing.** Core (exercises, concepts, failure modes) is the same everywhere; framing layer (Connections, Conclusions, "What This Unlocks", facilitator notes) varies by audience.
2. **Exercises are universal. Reflections are audience-specific.** Building an agent is building an agent. But *"What did you learn?"* means something different to an IC vs. someone responsible for 50 people's productivity.
3. **The throughlines flex, they don't change.** *"Strategy as assumptions"* lands for everyone, but the assumptions worth surfacing differ — a builder asks *"will this agent work?"*, a mid-manager asks *"will my team adopt this?"*
4. **One file per module, not one file per variant.** Forking files = drift.

---

## Teaching Principles

### The "system" concept: persistence + automation

For non-technical people, "system" clicks when two things combine:
1. **Persistence** — *"It remembers. It has files. It has structure. It's not a chat that resets."*
2. **Automation** — *"It runs without me. It did the work while I was in a meeting."*

Persistence without automation is just a saved document. Automation without persistence is a one-shot script. Together, they make "system" tangible.

### Progressive reveal: teach the real agent structure

An agent is a 5-10-aspect thing: model, context, tools, goal, loop, checks, boundary, runtime, interface. **Do not give the whole picture at the start — it overwhelms.** But do teach the real structure as it becomes useful. Progressive reveal is not vagueness; it is sequencing.

- Module 1 — context shapes output
- Module 2 — persistence + automation = system; text file as the thing you author
- Module 3 — coordination across agents; text as the source of action
- Module 4 — tool surface + runtime boundary; skills and security checks
- Module 5-6 — reliability and steering
- Module 7 — shared ownership
- Module 8 — self-reference / compounding

The spine is: the LLM reads text and produces text; tools appear to the model as names, descriptions, and input shapes; the runtime turns the model's structured text into actions in other systems; boundaries decide which crossings are allowed. Teach that with live mechanisms, not diagrams alone. The Module 4 raw agent-loop demo is the canonical move: ask what tools are available, how the LLM knows which to use, and how written text becomes action.

Apparent contradictions between module-level definitions (*"agent = LLM + tools"* in prework vs. *"agent = markdown file"* in Module 2) resolve experientially through this structure. Do not bridge them with a defensive paragraph early. Do make sure the full structure is visible by the time tools and actions matter.

### Evals framing: strategic steering, not testing

Evals are NOT testing, quality control, or proofreading. **Evals are a tool for steering output toward strategically significant factors.** More differentiated. More aligned with brand voice. More grounded in specific evidence. With clear metrics.

### Multi-agent framing: assembly line or fan-in

Two shapes land for business audiences: **assembly line** (sequential, *"each agent does one step and passes the work forward"*) and **fan-in** (parallel specialists, one synthesizer decides — Module 3's shape). Both have *seams you can point at*. A web of agents talking to each other does not (at this level). In either shape the teaching moment is the same: **the seam is where it fails** — handoffs lose conflicts, dialects clash, synthesizers average to beige.

---

## The Throughline: Strategy as Discovery

Every module echoes a single philosophical stance: **strategy is not a plan — it's a process of discovery through action.** Roger Martin's *Playing to Win* logic applied to agent work: you don't analyze your way to the right agent. You make choices, test them, learn, and make better choices.

### The three throughlines

Lenses that recur in every module — in exercises, reflections, Connections and Conclusions phases. How we talk about what's happening, not what we explicitly teach.

**1. Continuous improvement** — Building an agent is not a project with an end. It's a cycle: build → observe → adjust → build again. Toyota Kata. Never present as methodology — it's what naturally happens when builders keep building. Name it when you see it.

**2. Discovery and learning** — You cannot predict what an agent will do from its specification. Run it and see. Strategy is a bet, not a proof. When participants say *"I thought it would do X but it did Y"* — that's the moment.

**3. Strategy as assumptions** — Every design decision is an assumption. *"This guardrail will prevent off-brand output"* — assumption. Test it. Martin's language: *"What would have to be true for this to work?"* Turns a decision into a testable hypothesis.

### How throughlines appear in the material

NOT separate sections. They emerge in:

- **Connections (C1):** *"What assumptions did you bring into this module?"*
- **Exercise debrief:** *"What surprised you? That surprise = an assumption that was wrong."*
- **Conclusions (C4):** *"What would have to be true for this to work in your company?"*
- **The Bridge:** *"The assumption you just tested leads naturally to the next question..."*

The facilitator names the pattern when it appears. The material creates the conditions. The throughlines are never taught — they are observed and named.

---

## Design Implications from the Sponsor's Perspective

### Every module must produce a showable artifact

Something a participant can SHOW someone else. Not just knowledge in their head — an artifact, a demo, a story. *"Let me show you what I built"* is how movements start. Creates WoW moments that fuel post-training adoption.

### Why training, not self-serve

Self-serve plateaus at chatting. Smart people will figure out better prompting. They will NOT cross the gap to building systems. Training crosses the gap. Self-serve also doesn't create teachers — and the multiplier effect is what the sponsor is actually buying.

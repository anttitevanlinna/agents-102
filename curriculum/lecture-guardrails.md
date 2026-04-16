# Lecture Guardrails

Rules for designing, reviewing, and generating curriculum modules. Every module must pass these guardrails before it ships.

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

## Generation Tips and Tricks

Practical rules for writing module content that actually works in a room full of busy professionals.

### Voice and tone

- **Write like a practitioner, not a textbook.** "Here's what happens when you do this" — not "In this section, the learner will explore..."
- **Second person.** Address the participant as "you." Not "the participant" or "learners."
- **Confident but direct.** "This works. Here's where it breaks." No hedging, no overselling.
- **No jargon without earning it.** Every technical term is introduced through an exercise that makes it obvious, not through a definition. If you need a glossary, the module failed.

### Exercise writing

- **The instruction is the interface.** "Open Claude Code and type..." must be unambiguous. A participant who reads the instruction and does exactly what it says should get a working result. Test this by reading the instruction as literally as possible.
- **Name the expected output.** "You should see something like..." with a realistic example. Not "the agent will respond" — show what a response looks like.
- **Name the failure mode.** "If you see X instead, it means Y. Try Z." Anticipate the two or three most common wrong states.
- **Time-box exercises.** State how long each exercise should take. "This should take 5-8 minutes. If you're stuck after 5, flag the facilitator." Prevents both rushing and rabbit holes.
- **One instruction per step.** Not "Create a file, add the following content, and run the agent." Three steps: create, add, run.

### Facilitator notes

- **Inline, not appendixed.** Facilitator notes sit right next to the exercise they relate to, in a clearly marked block. The facilitator reads the same document as participants — they just see more.
- **Timing is mandatory.** Every exercise and every C2 concept block has a time estimate. The facilitator needs to pace the day.
- **"Watch for" notes.** Common participant behaviors that signal confusion, ahead-of-the-curve participants who need more challenge, energy dips that need a format change.
- **Decision points.** "If the group is ahead of schedule, extend with X. If behind, skip Y without losing the arc." Every module must have at least one expandable and one skippable section.

### Pacing a full day

- **Energy follows a curve.** Morning: high energy, use for new concepts and challenging exercises. After lunch: low energy, use for hands-on building (activity prevents sleepiness). Late afternoon: second wind, use for synthesis and "what this unlocks."
- **Never schedule a concept block (C2) right after lunch.** Schedule Concrete Practice instead. Listening after eating is a losing battle.
- **Pair and regroup.** Solo work for focus → pair discussion for depth → group share for breadth. Rotate this pattern. Never more than 30 minutes in any single mode.
- **Breaks are not optional.** 10 minutes every 60-75 minutes. A participant with a full bladder learns nothing. State break times at the start of the day and keep them.

### Content density

- **Less content, more practice.** A module that covers 3 concepts deeply beats one that surveys 8 concepts superficially. Every concept must have a Concrete Practice moment. If there's no time for practice, cut the concept.
- **The "explain it at the pub" test.** If a participant can't explain the module's core insight in 2-3 sentences over a beer, the module tried to teach too much.
- **One big idea per module.** Each module has exactly one core insight. Everything else serves it. Module 1's big idea: "With the right guardrails, you create output that's genuinely yours — not generic." Module 8's big idea: "The tool that builds tools compounds." If you can't state the big idea in one sentence, the module isn't focused.

### Plug points

- **Make them specific.** Not "insert your organization's policy here." Instead: "Open your company's data classification policy. Find the section on PII. Your agent's instructions need to reference this classification. If you don't have one, use this default: [provide default]."
- **Defaults must work.** Every plug point has a default that a participant without org-specific materials can use. Nobody gets stuck because their company doesn't have a policy document handy.
- **Plug points are learning moments.** When a participant discovers their org doesn't have a policy for X — that's a finding. "You just discovered a gap. That's valuable."

### What NOT to generate

- **No "overview" sections** that summarize what's about to happen. The Connections phase (C1) replaces this — it activates, not summarizes.
- **No "summary" sections** that repeat what happened. The Conclusions phase (C4) replaces this — learners generate the summary.
- **No "further reading" lists.** If it matters, it's in the module. If it doesn't matter enough for the module, it doesn't matter.
- **No motivational padding.** "AI is transforming the world" — everyone in the room knows. Start with what they're about to do, not why it matters in the abstract.
- **No diagrams described in words.** If a concept needs a diagram, say "Facilitator draws X on the whiteboard" — don't describe the diagram in prose. The facilitator will make it live.

---

## Style and Vibe: For Builders

This training is for people who learn by doing. Not by reading. Not by listening. Not by being told what's important. They build something, and the understanding follows.

The entire curriculum rests on three emergences:

### Emergent knowledge

Knowledge is not transmitted. It emerges from practice.

You don't explain what an agent is, then have them build one. They build one, and then they know what an agent is — from the inside out, not from a definition. The exercises produce the knowledge. The facilitator's job is to name what just happened, not to pre-explain what's about to happen.

This means:
- **No concept precedes its exercise.** The exercise is always first. The concept is the reflection on what was experienced.
- **Vocabulary arrives late.** Participants have already built the thing before they learn what it's called. "What you just created — that pattern is called orchestration." Not "Orchestration is a pattern where..."
- **Wrong mental models are useful.** If someone thinks agents are "just fancy chatbots," don't correct them up front. Let the exercises break that belief. A corrected misconception sticks harder than a delivered fact.
- **The facilitator asks, doesn't tell.** "What did you notice?" beats "Here's what happened." Pull the insight from the room. If nobody gets there, ask a sharper question. Telling is the last resort.

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

### What this vibe sounds like in the material

| Textbook style (avoid) | Builder style (use) |
|------------------------|---------------------|
| "In this module, you will learn about prompt injection attacks and their mitigations." | "You're going to break your own agent. Then you'll fix it." |
| "Multi-agent architectures enable distributed task execution across specialized components." | "Your agent can't do everything. Let's split the work." |
| "The evaluation framework provides systematic quality assurance for LLM outputs." | "Your agent is lying to you. Let's catch it." |
| "Upon completion, participants will have gained an understanding of..." | "After this, you'll know how to..." |
| "Consider the following scenario..." | "Try this." |

### The builder's contract

The implicit promise to every participant:

> We won't waste your time with theory you could read yourself. Every minute you spend here, you'll be building something real. You'll leave with something that works, the knowledge of where it breaks, and the ability to explain both to your team. The rest — the vision, the strategy, the scaling — emerges from that foundation. You go first. Then you help others go forward.

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

### Design rules for reusability

1. **Separate universal core from audience-specific framing.** Every module has a core that's the same everywhere (the exercises, the concepts, the failure modes) and a framing layer that varies by audience (Connections questions, Conclusions prompts, "What This Unlocks" sections, facilitator notes about the room dynamic).

2. **Mark audience-specific content explicitly.** Use a clear marker in the module file:

```
> VARIANT: [audience] — [what changes here]
> Default (Bootstrap): [the default version]
> Mid-Management: [the variant version]
```

3. **Exercises are universal. Reflections are audience-specific.** Building an agent is building an agent — the tech is the same regardless of who's in the room. But "What did you learn?" means something different to an individual contributor vs. someone responsible for 50 people's productivity.

4. **Plug points absorb audience variation.** The existing plug point framework already handles org-specific content. Extend it to handle audience-specific content. A plug point can have a default for Bootstrap AND a default for Mid-Management.

5. **The throughlines flex, they don't change.** Roger Martin's "strategy as assumptions" lands for everyone. But the assumptions worth surfacing differ: a builder asks "will this agent work?" while a mid-manager asks "will my team adopt this?" Same framework, different questions.

6. **One file per module, not one file per variant.** Variants live inside the module file as marked alternatives, not as separate copies. Forking files = drift. The mid-management version of Module 4 should never drift from the Bootstrap version of Module 4's core exercises.

### Why this matters

The anti-SAFe promise ("with your own structure") means the curriculum itself must be modular. If we can't reconfigure our own training for different audiences without rewriting, we're doing the thing we criticize. Composability isn't just a nice-to-have — it's the product architecture.

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

### Evals framing: strategic steering, not testing

Evals are NOT testing. They are not quality control. They are not proofreading. **Evals are a tool for steering output toward strategically significant factors.** Making output more differentiated. More aligned with brand voice. More grounded in specific evidence. With clear metrics.

### Multi-agent framing: the assembly line

The metaphor that lands: **assembly line.** "Each agent does one step and passes the work forward." Sequential hand-offs before orchestration. The assembly line is learnable. A web of agents talking to each other is not (at this level).

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

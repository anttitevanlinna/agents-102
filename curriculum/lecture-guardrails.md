# Lecture Guardrails

Rules for designing, reviewing, and generating curriculum modules. Every module must pass these guardrails before it ships.

---

## 1. Bloom's Taxonomy Drives Everything

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
| 7. Agent Platforms | Understand → Evaluate | Map the landscape, judge what fits |
| 8. Agents Building Agents | Create | Build the meta-tool, design the flywheel |

---

## 2. Training from the Back of the Room — 4 Cs Structure

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

## 3. Generation Tips and Tricks

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

## 4. Style and Vibe: For Builders

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

## 5. Audience: The Chat-to-Systems Leap

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

## 6. Training Strategy Decisions

Strategic choices that shape how every module is designed and delivered.

### The initiative: one shared company goal

Everyone in the room works on the same company-relevant initiative. Not individual projects. Not generic scenarios.

**How it works:**
- The initiative is pre-agreed with the customer sponsor before the training. Example: "We want agents for our claims processing," "We need agent-driven competitive intelligence," "We want to automate our compliance reporting."
- Antti and the sponsor scope it to something that (a) matters to the company, (b) is achievable as a growing prototype in 2 days, and (c) touches enough complexity to sustain 8 modules.
- All exercises advance this initiative. Module 1: build the first piece. Module 2: grow it into a system. Module 3: split into coordinating agents. Modules 4-6: apply discipline to it. Module 7: deploy it. Module 8: see the flywheel.

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

### The day split: flexible

Eight modules across 2 days. The split point is a facilitator decision based on pacing, energy, and cohort speed.

**Design implication:** Every module must be self-contained enough to end a day. Modules 3, 4, and 5 are all viable Day 1 endpoints. The module format's Bridge section must work as both "next module" and "tomorrow morning" transitions.

**Possible splits:**
- After Module 3 (Multi-Agent): Day 1 = pure building. Day 2 = discipline + vision.
- After Module 4 (Security): Day 1 = build it + break it. Day 2 = quality + evals + platforms + flywheel.
- After Module 5 (Output Quality): Day 1 = build + reality check. Day 2 = evals + platforms + flywheel. Front-loads Day 1.

### The deliverable: executive recommendation

Bootstrap ends with a tangible deliverable for the executive sponsor: a recommendation on how to scale the agentic movement in the company.

**How it's created:** Co-created live by the whole group in the final session (Module 8, Conclusions phase). The facilitator structures. The participants fill in from their 2 days of experience. Everyone owns it.

**What it contains:** Emerged from the training — not a template filled in mechanically. It answers: "We spent 2 days building agents for [initiative]. Here's what we learned about what's possible, what's hard, and how we recommend the company scales this."

**Why this works:** The CTO doesn't just get "20 trained people." They get 20 people who jointly produced a recommendation grounded in hands-on experience. That recommendation is the natural bridge to Make Your Own (Step 2 of the journey).

**First cohort note:** The format of this deliverable may evolve after the first delivery. Start with "executive recommendation on how to scale the movement" and iterate based on what actually emerges.

---

## 7. Persona Insights and Teaching Moments

How the two archetypes in the room — the technical team lead and the marketing director — experience each module differently, and the design decisions that follow.

### Module 1: Creativity and generative abundance with control

Module 1 is NOT about persistence, automation, or "what is an agent." It's about **creative power with guardrails.**

The exercise: create a personal site with great guardrails that infuse differentiation and storytelling. Participants experience generative abundance — the tool produces more than they could alone — AND control — guardrails (like CLAUDE.md) shape the output to be genuinely theirs, not generic.

**Why this works as the entry point:**
- Everyone already knows LLMs generate stuff (they've chatted). The new insight is: you can **structure** that generation. Guardrails that enforce your brand, your story, your differentiation.
- The tech lead sees: "I can codify quality standards into the agent's instructions. This is different from prompting."
- The marketing director sees: "The output sounds like ME, not like ChatGPT. Because I gave it my guardrails."
- The leap from chat to system starts here: chat gives you generic output. A system with guardrails gives you differentiated output. That's the aha.

**Note:** Antti has an existing outline for this module from his training materials. This will be incorporated when available.

### The "system" concept: persistence + automation

For non-technical people, "system" clicks when two things combine:
1. **Persistence** — "It remembers. It has files. It has structure. It's not a chat that resets."
2. **Automation** — "It runs without me. It did the work while I was in a meeting."

Neither alone is enough. Persistence without automation is just a saved document. Automation without persistence is a one-shot script. Together, they make "system" tangible.

**Design implication:** The transition from Module 1 (creativity + control) to Module 2 (building systems) is where persistence and automation enter. Module 2 takes the creative agent from Module 1 and makes it a system: it persists, it runs, it grows.

### Multi-agent framing: the assembly line

The metaphor that lands for non-technical people: **assembly line.** "Each agent does one step and passes the work forward. Like a production line where each station adds something."

This is a process mental model — marketing directors think in workflows, production, campaign stages. "Agent 1 gathers data. Agent 2 analyzes it. Agent 3 writes the report." Each step is understandable. The coordination is just: output of step N becomes input of step N+1.

**Design implication:** Module 3 exercises should build a pipeline, not a mesh. Sequential hand-offs before orchestration. The assembly line is learnable. A web of agents talking to each other is not (at this level).

### Security teaching moment: compliance violation

The security moment that changes minds for BOTH personas: the agent violates a company policy.

Not prompt injection (too technical for the marketer, too obvious for the tech lead). Not data leaks (abstract until you see your own data). A **compliance violation**: the agent produces output that breaks GDPR, brand guidelines, financial disclosure rules, or internal policy.

- The tech lead realizes: "My tests don't catch policy violations. This is a different kind of failure."
- The marketing director realizes: "This could go out to customers with MY name on it. This is MY problem."

**Design implication:** Module 4's controlled example must include a compliance violation relevant to the initiative. The prepared agent should produce output that looks good but violates a specific policy. Both personas feel the business risk immediately.

### Evals framing: strategic steering, not testing

Evals are NOT testing. They are not quality control. They are not proofreading.

**Evals are a tool for steering output toward strategically significant factors.** Making output more differentiated. More aligned with brand voice. More grounded in specific evidence. More actionable for the target reader. With clear metrics.

- The tech lead hears "testing" and thinks they already know this. The strategic steering framing is new: "You're not checking if it works. You're measuring if it's differentiated enough to matter."
- The marketing director hears "testing" and thinks "not my job." The strategic steering framing is their language: "You're measuring whether the output is on-brand, on-message, and sharper than the competition."

**Design implication:** Module 6 exercises should have participants define what "good" means for their initiative — not generically, but strategically. "Good" isn't "factually correct." "Good" is "this output would make our CTO share it with the board." Then build automated checks for that standard.

### Tech lead's breaking point: the scaling surprise

The tech lead coasts through Modules 1-3 on technical fluency. Their assumption: "Agent systems are just another kind of software system."

The breaking point: **what works for one query fails at 100.** The agent that was perfect in testing hallucinates under load, with edge cases, with real data variation. The demo-to-production gap. They've seen this in software, but it manifests differently with agents — you can't just fix a bug. The output is non-deterministic. The failure is statistical, not binary.

**Design implication:** Module 5 (Output Quality) is where the tech lead's assumption breaks. The exercise should scale their working agent to real-volume inputs and show the failure distribution. "Your agent got 8 out of 10 right. Which 2 did it get wrong? Can you predict which ones it will get wrong next time? No? That's the new problem."

### Exercise pairing: solo building, pair review

During exercises, everyone builds individually at their own pace and depth. Then they pair up to review each other's work.

- Solo building: preserves individual pace. The tech lead goes deeper technically. The marketing director focuses on output quality and business logic. Nobody is waiting for their partner.
- Pair review: cross-pollination. The tech lead sees the marketer's approach ("why did you phrase the instruction that way?"). The marketer sees the tech lead's structure ("why did you split it into three steps?"). Both learn from the contrast.

**Design implication:** Exercises have a clear "build" phase (solo, timed) and a "review" phase (pairs, structured questions). The review isn't "show and tell" — it has specific prompts: "What did your partner do that you wouldn't have thought of? What would break in their approach?"

### Module 8 flywheel: all three insights land

For non-technical people, the flywheel is not one insight but three:

1. **Multiplication** — "You build one agent that builds the rest. You don't do this by hand." The marketer thinks: "I could create 10 campaign variants automatically."
2. **Self-improvement** — "Each cycle improves the next. The system gets better by running." The marketer thinks: "My competitive analysis gets sharper every week without me touching it."
3. **Org capability** — "Once your org can build agents, you can build agents for any problem. You don't need IT for every use case." The marketer thinks: "We're independent."

**Design implication:** Module 8's demo + guided exercise should demonstrate all three in sequence. The guided exercise should let participants experience at least the multiplication insight hands-on (an agent generating another agent for their initiative). Self-improvement and org capability can be drawn out in the Conclusions phase as implications.

---

## 8. The Throughline: Strategy as Discovery

Every module echoes a single philosophical stance: **strategy is not a plan — it's a process of discovery through action.** This is Roger Martin's "Playing to Win" logic applied to agent work: you don't analyze your way to the right agent. You make choices, test them, learn, and make better choices.

### The three throughlines

These are not separate topics. They are lenses that recur in every module — in exercises, in reflections, in the Connections and Conclusions phases. They are how we talk about what's happening, not what we explicitly teach.

**1. Continuous improvement — the system gets better because you keep learning**

Building an agent is not a project with an end. It's a cycle: build → observe → adjust → build again. This is the Toyota Kata pattern: not "optimize once" but "develop the practice of improving."

How it echoes in each module:
- **Module 1:** You build a site. It's good. But it could be better. You adjust the guardrails. It gets better. This is the loop.
- **Module 2:** The system grows. Each addition creates new failure modes. You observe and adjust. Growing a system IS continuous improvement.
- **Module 3:** Multi-agent coordination fails. You adjust the handoffs. The assembly line gets tighter. The improvement is in the seams.
- **Module 4:** Security isn't a one-time audit. New capabilities → new risks. The security practice improves with each cycle.
- **Module 5:** Output quality isn't fixed. You raise the bar. The agent adapts. You raise it again. Quality is a moving target.
- **Module 6:** Evals are the infrastructure of improvement. Without measurement, improvement is guessing.
- **Module 7:** Platforms evolve. What you deploy today will need updating. The practice of evaluating and adapting platforms is continuous.
- **Module 8:** The flywheel IS continuous improvement made structural. The system improves itself.

**Facilitator note:** Never present continuous improvement as a methodology or framework. It's what naturally happens when builders keep building. Name it when you see it: "Notice what you just did — you observed, adjusted, and improved. That's the practice."

**2. Discovery and learning — you find out what works by doing, not by analyzing**

The deepest lesson of agent work: you cannot predict what an agent will do from its specification. You have to run it and see. This mirrors Martin's core argument: strategy is a bet, not a proof. You make your best choice, then learn from reality.

How it echoes:
- **Module 1:** You write guardrails. You think they'll work. You run the agent. The output surprises you — sometimes better than expected, sometimes wrong. The surprise IS the learning.
- **Module 2:** You design a system. It behaves differently from your design. The gap between plan and behavior is where learning lives.
- **Module 3:** You can't design a multi-agent system on paper. You have to run it. The agents interact in ways you didn't predict. Discovery is unavoidable.
- **Module 4:** Security analysis on paper misses what the agent actually does. You discover vulnerabilities by testing, not by reasoning.
- **Module 5:** You think the output is good. You measure it. It's worse than you thought — or better in ways you didn't expect. Measurement reveals what assumption couldn't.
- **Module 6:** Evals systematize discovery. They're not just checks — they're instruments for learning what your agent actually does.
- **Module 7:** You evaluate a platform by using it, not by reading the vendor's feature list. Discovery beats analysis.
- **Module 8:** The flywheel accelerates discovery. More agents → more experiments → more learning → better agents.

**Facilitator note:** When participants say "I thought it would do X but it did Y" — that's the moment. Celebrate it: "You just learned something you couldn't have learned by reading. That's how agent work goes. Plan, run, discover, adjust."

**3. Strategy as assumptions — every choice is a bet you can test**

Roger Martin's insight: a strategy is a set of choices that hang together. Each choice rests on an assumption about reality. The quality of a strategy depends on surfacing those assumptions and testing them — not on the quality of the analysis that produced them.

In agent work, every design decision is an assumption:
- "This guardrail will prevent off-brand output" — assumption. Test it.
- "Two agents are better than one for this task" — assumption. Test it.
- "This eval catches the failures that matter" — assumption. Test it.
- "This platform can handle our volume" — assumption. Test it.

How it echoes:
- **Module 1:** "Your guardrails express your assumptions about what 'good' looks like. Run the agent. Did reality confirm your assumption?"
- **Module 2:** "You assumed this system design would work. Where did it break? That's your assumption being tested by reality."
- **Module 3:** "You assumed splitting the work would be better. Was it? When is one agent better than three? You can only know by testing."
- **Module 4:** "You assumed the agent was safe. The compliance violation just tested that assumption. What do you change?"
- **Module 5:** "Your assumption about output quality was wrong. The measurements show it. Now you know. Adjust."
- **Module 6:** "Evals are assumption-testing machines. Every eval you write encodes an assumption about what matters. Run them. Do they catch what matters? Or did you assume wrong about what 'good' means?"
- **Module 7:** "Your platform choice rests on assumptions about scale, reliability, cost. Deploy. Test. Learn."
- **Module 8:** "The executive recommendation you're about to co-create is a set of assumptions about where agents create value in your company. Label them as assumptions. Design experiments to test them. That's how you start Monday."

**Facilitator note:** Use Martin's language explicitly: "What would have to be true for this to work?" This is the question that turns a decision into a testable hypothesis. Ask it during every Conclusions phase. It bridges from "we built a thing" to "we have a strategy for our organization."

### How throughlines appear in the material

Throughlines are NOT separate sections in each module. They emerge in:

- **Connections (C1):** "What assumptions did you bring into this module? Let's surface them."
- **Exercise debrief moments:** "What surprised you? That surprise = an assumption that was wrong."
- **Conclusions (C4):** "What would have to be true for this to work in your company?"
- **The Bridge:** "The assumption you just tested leads naturally to the next question..."

The facilitator names the pattern when it appears. The material creates the conditions for it to appear. The throughlines are never taught — they are observed and named.

---

## 9. The Sponsor's View: What the CTO Is Buying

The CTO who sponsors Bootstrap is action-oriented. They want to scale the agentic movement from zero. They don't need convincing that agents matter — they need a path from "nobody in my org can build agents" to "the movement is self-sustaining."

### Why training, not self-serve

The CTO's natural instinct: "My people are smart. Give them Claude Pro licenses and they'll figure it out." Two reasons this doesn't work:

1. **Self-serve plateaus at chatting.** Smart people will figure out better prompting. They will NOT cross the gap to building systems. The chat-to-systems leap is invisible from the chat side — you don't know what you're missing until someone shows you. Training crosses the gap in 2 days. Self-serve may never cross it.

2. **Self-serve doesn't create teachers.** One person figures it out alone. They can't explain it to others. Training creates people who can teach others — and that's the only path from 20 to 2000. The multiplier effect is what the CTO is actually buying.

**Design implication:** Every module must produce something a participant can SHOW someone else. Not just knowledge in their head — an artifact, a demo, a story. "Let me show you what I built" is how movements start.

### What success looks like

The CTO doesn't measure success in "agents deployed to production." That's too soon. The 30/60/90 day evidence:

- **30 days: Changed conversations.** Meetings sound different. People talk about agents as tools they can build, not magic they need IT to provide. The vocabulary shifted. "We could build an agent for that" becomes a natural thing to say.
- **60 days: People building and sharing.** 5+ people are building prototype agents on their own. They're sharing experiences — WoW moments, failures, discoveries. An informal community is forming. This is self-organizing, not mandated.
- **90 days: Agents doing new things.** Agents are starting to do things the company was never able to do before. Not automating existing work — creating new capability. People are excited. The CTO hears about it without asking.

**Design implication:** The training must create WoW moments — moments where participants think "I had no idea this was possible." These moments are what people share afterwards. They're what fuel the 30/60/90 day movement. Every module needs at least one moment where the participant is genuinely surprised by what they just created.

### Choosing the initiative

The pre-agreement conversation with the sponsor: "What should we work on during the training?"

**The right initiative: one core process everyone knows.** Not a pain point. Not a moonshot. A process so familiar that everyone in the room can evaluate whether the agent is doing it well.

Examples:
- Making great sales materials
- Designing the next feature
- Preparing a competitive analysis
- Writing a project proposal

**Why "everyone knows" matters:** The initiative is the evaluation surface. When the agent produces output, every participant — tech lead and marketing director alike — can judge it because they know what good looks like. This connects directly to emergent knowledge: you learn by evaluating output against your own expertise.

**What makes a bad initiative:**
- Too specialized (only 3 people in the room understand it)
- Too abstract ("improve our processes" — improve which process?)
- Too regulated (compliance overhead dominates the learning)
- Too novel (nobody has a baseline to compare the agent's output against)

### The real gap: Bootstrap is Step 1 of 5

After Bootstrap, three gaps remain:

1. **Infrastructure + deployment.** Bootstrap teaches building and discipline. It doesn't set up CI/CD, cloud, or production monitoring. Engineering work follows.
2. **Governance framework.** Bootstrap shows WHY governance matters (the compliance violation in Module 4). It doesn't build the org's governance framework. That's Make Your Own (Step 2).
3. **Organizational buy-in.** 20 trained people in a 5000-person org. The executive recommendation starts the conversation. The real work is political and cultural.

All three gaps exist. That's the funnel: Bootstrap → Make Your Own (governance + strategy) → Champions (multiply to the org) → Scale (self-sustaining). The straight answer is: Bootstrap is the step that makes all the others possible. Without it, there's nothing to govern, nothing to scale, and nobody to champion.

**Design implication for the executive recommendation (Module 8):** The recommendation should explicitly name these three gaps as the next steps. Not as weaknesses of the training — as the natural sequence. "Here's what we learned. Here's what we can now do. Here's what we still need: infrastructure, governance, and broader buy-in. Here's how we recommend getting there." This is the bridge to Make Your Own.

### Module 7 and the platform advisory

Bosser offers Agent Platform Advisory as a separate, optional service (context building, selection, deployment — done the agentic way). This service typically becomes relevant ~1 month after Bootstrap, when people are building local agents and need a shared platform.

**Module 7 is independent of the advisory.** It teaches platform thinking straight — participants learn to evaluate platforms, understand deployment options, and make informed choices. If they can figure it out themselves, great. Module 7 does not sell the advisory. It gives participants the framework to decide whether they need help, and the vocabulary to evaluate help if they seek it.

The advisory exists for organizations that want the platform decision made agentically — with Bosser building the system that maps context, evaluates options, deploys, and generates training materials. Co-owned, deployed on the customer's side. But Module 7 assumes the customer can choose whatever they like.

# From Personal to Team

## Big Idea
You can't really share an agent. You can share context, a skill, the output, or an interface — and the choice is a strategy decision, not a deployment decision.

## Meta
- **Primary Bloom's level:** Analyze → Evaluate
- **Prework:** Three-walls pre-read — the three real walls a practitioner hits when trying to scale past themselves: **absorption bottleneck** (learning rate cap — your org can't absorb capability faster than people learn to use it), **Access-Trust Gap** (54–95% have access; 5–22% have production trust; gap always wider than 35 points — access doesn't convert to real use), **discoverability** (F-Secure-validated — nobody finds, invokes, or trusts the shared agent without a way to encounter it in the flow of work). Rumelt on *crux / Good Strategy Bad Strategy*. Roger Martin on *strategy as assumptions / what would have to be true?*. Gary Klein on *pre-mortem*.
- **Homework:** Run the Monday artifact. Test one assumption. Ask for one name. Talk to one person.
- **Materials (trainer):** Pattern catalog (`strategy/personal-to-team-patterns.md`) live in second tab. Branch-selection framing ready. Access-Trust Gap data point in lecture.
- **Plug points:** Participant's organization (who would own this?); buyer infrastructure reality (cloud agent platform vs. personal Claudes only).

## What You'll Learn
After this module, you will be able to:
- **Interview** for the job your teammate is trying to get done — using an agentic Jobs-to-be-Done pattern (the agent reads your brain, drafts a hypothesis, asks you targeted questions), and write the outcome statement that becomes the design contract
- **Select** a sharing strategy from the four that work (share context / share a skill / share the output / share an interface) against the outcome the teammate wants moved — not against the infrastructure you happen to have
- **Redesign** for shared use by producing both a technical plan and a people plan — ownership, governance, operating, accountability, propagation
- **Test** the switch the teammate would have to make — surfacing what would have to be true for them to fire their current hire and use your candidate
- **Pre-mortem** the firing — imagining the six-month failure where they kept using the incumbent, biased toward the social failure you're not seeing

## Connections
Your brain has been working for you for a day and a half now. It produced something you trust enough to check before a meeting. You caught it wrong once, corrected it, watched the correction stick.

The question that shows up on its own: *could this help someone else?*

Hold that feeling. It's not a governance question yet. It's a generous one. Today we turn it into a plan — honestly, against real friction, without the vendor pitch.

Two questions to warm up: who's the one person who came to mind just now? And what makes you hesitate about actually handing this to them?

## Lectures

The short frame, before the exercise: three walls. Access is easy (54–95% of enterprises have it). Trust is scarce (5–22% have production readiness). The gap is always wider than 35 points. That gap is social, not technical — which is why strategy tools beat deployment tools today.

The four strategies that work in practice — share the context, share a skill, share the output (push), share an interface (pull). The fifth strategy, "share the whole agent," is the vendor pitch. It sounds right. It doesn't hold up. You'll see why in the next hour.

Before any of that, the move that matters most: interview for the job. Christensen and Moesta put it plainly — people don't buy products, they hire them for jobs. Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface — any of those is a candidate for hire against whatever they're using today. That reframe moves the starting question from *"what should I share?"* (yours) to *"what job is my teammate trying to get done, and which sharing shape does it?"* (theirs). Phase 1 is that interview, and the agent does the heavy lifting — it reads your brain, drafts the hypothesis, asks you the five to eight questions that plug real holes.

The disciplines you'll apply after — Roger Martin's assumption-test, Klein's pre-mortem — are not agent tools. They're strategy tools. You're using them on the switch: what would have to be true for your teammate to fire their current hire and use your candidate? Six months from now, why didn't they?

No separate lecture file. The framing above runs ten to twelve minutes, straight into the exercise.

## Exercises

[Exercise: Share your work](exercises/share-your-work.md)

## Key Concepts (Emergent)

- **Interview for the outcome before designing the solution.** The transferable skill. The teammate's job comes first; your candidate comes second. Monday you'll face a different adoption problem and the move is the same — agent reads your context, drafts a JTBD hypothesis, asks you seven targeted questions, produces a brief with an outcome statement. Christensen, Moesta, Ulwick — they didn't write it for agent work. You just applied it to agent work.
- **The agent does the heavy lifting on the interview.** Your brain already carries 80% of the teammate's job. Phase 1's move is the agent reading what's on disk, hypothesising, then using a structured ask-questions tool to plug holes. Not freeform chat. The bounded-question primitive earns its keep here.
- **The outcome statement is the design contract.** In Ulwick's form: *"minimize/increase [metric] when [doing the job]."* Everything downstream — the candidate, the patterns, the plans, the assumptions, the pre-mortem — runs against that statement. A candidate that doesn't move the metric isn't a candidate.
- **The third outcome vector is where the interview earns its keep.** Speed and quality are the obvious axes. The non-obvious one — dependency removed, anxiety reduced, scope expanded, workload shifted — is what chatting surfaces. If an interview returns only speed and quality, it went shallow.
- **The Access-Trust Gap.** Access is easy; trust is the scarce thing you are actually distributing. The gap is always wider than 35 points, across every source that's measured it. You felt it in the exercise — your technical plan filled quickly, your people plan stalled on names.
- **The four sharing strategies.** Share the context / share a skill / share the output (push) / share an interface (pull). "Share the whole agent" is not on the list. The choice between the four IS the design decision.
- **The pattern catalog is a design language.** Not a menu. You pick one to three patterns, match them to the outcome you're moving, stack where useful. Other people in the room picked differently — that's the point.
- **The people plan weighs equal to the technical plan.** Ownership, governance, operating, accountability, propagation. A deliverable missing the people plan is incomplete even with a perfect technical plan. A perfect technical plan with no people plan is a PowerPoint.
- **Firing the incumbent is the test.** Every job already has a current hire — Excel, a colleague, gut feel, nothing. The real question isn't *"will they adopt my agent?"* It's *"what would have to be true for them to fire what they use today?"* That question is social nine times out of ten.

## Plug Points

> PLUG POINT: Branch selection — does your company have cloud agent infrastructure (N8N / Cowork / Power Automate / Make / an internal runtime), or only personal Claudes?
> Default: students pick live, based on what they can actually deploy to this week — not what procurement might approve in Q3. Branch B (personal Claudes only) is the honest path for most Nordic buyers on day one. It's not a consolation prize.

> PLUG POINT: Ownership model — who in your organization would own this?
> Default: if you can't name a person, write UNASSIGNED. That's Monday's question for your manager. Missing names are findings, not failures.

## Debrief

Five minutes, run with Claude. Paste:

```
I just finished the Share Your Work exercise. I want to do a quick retro with you.

Read my files in module-7/: sharing-problem, crux, branch, technical-plan, people-plan, assumptions, premortem, monday.

Ask me these three questions, one at a time:
1. Looking at the patterns I picked and the crux I surfaced — what should travel back with me as a pattern I'd use on the next sharing decision, not just this one?
2. Looking at my people plan — what's the gap I honestly can't close this week? Who would I need to talk to, and what's in the way?
3. Monday morning, first move — what's the very first thing, before meetings, before email? One sentence.

Wait for my answer before asking the next question.
```

The three questions land the module's discipline: patterns travel, people-plan gaps are the scarce thing, and Monday's first move is concrete. Save the conversation. It's the bridge to the work week.

## Bridge

You've built a system. You've secured it, evaluated it, and designed the sharing. What if you didn't have to build each new agent by hand?

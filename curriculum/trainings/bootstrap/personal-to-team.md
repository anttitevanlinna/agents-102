# From Personal to Team

## Big Idea
You can't really share an agent. You can share context, a skill, the output, or an interface. The choice is a strategy decision, not a deployment decision.

## Meta
- **Prework:** Three-walls pre-read: the three real walls a practitioner hits when trying to scale past themselves. **Absorption bottleneck** (learning rate cap; your org can't absorb capability faster than people learn to use it). **Access-Trust Gap** (most enterprises have given far more people access than they trust to run real production work; access doesn't convert to real use). **Discoverability** (F-Secure-validated; nobody finds, invokes, or trusts the shared agent without a way to encounter it in the flow of work). Rumelt on *crux / Good Strategy Bad Strategy*. Roger Martin on *strategy as assumptions / what would have to be true?*. Gary Klein on *pre-mortem*.
- **Homework:** Run the next-step artifact. Test one assumption. Ask for one name. Talk to one person.

## What You'll Learn
After this module, you will be able to:
- **Interview** for the job your teammate is trying to get done, using an agentic Jobs-to-be-Done pattern (the agent reads your memory, drafts a hypothesis, asks you targeted questions), and write the outcome statement that becomes the design contract
- **Select** a sharing strategy from the four that work (share context / share a skill / share the output / share an interface) against the outcome the teammate wants moved, not against the infrastructure you happen to have
- **Redesign** for shared use by producing both a technical plan and a people plan (ownership, governance, operating, accountability, propagation)
- **Test** the switch the teammate would have to make, surfacing what would have to be true for them to fire their current hire and use your candidate
- **Pre-mortem** the firing: imagine the six-month failure where they kept using the incumbent, biased toward the social failure you're not seeing

## Connections
By now you've built a memory, synthesis across three source zones, skills that audit your own system, a judge that got sharper by watching itself miss things. It's a stack. And somewhere in it is a thing that produced output you trust enough to check before a meeting. You caught it wrong once, corrected it, watched the correction stick.

The question that shows up on its own: *could this help someone else?*

Hold that feeling. It's not a governance question yet. It's a generous one. At M7 we turn it into a plan. Plainly, against real friction, without the vendor pitch.

Two questions to warm up: who's the one person who came to mind just now? And what makes you hesitate about actually handing this to them?

**Time:** 10–12 minutes. No separate lecture file; the framing below runs straight into the exercise.

Start with the move that matters most: **interview for the job.** Christensen and Moesta put it plainly. People don't buy products, they hire them for jobs. Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface: any of those is a candidate for hire against whatever they're using now. That reframe moves the starting question from *"what should I share?"* (yours) to *"what job is my teammate trying to get done, and which sharing shape does it?"* (theirs). Phase 1 is that interview, and the agent does the heavy lifting. It reads your memory, drafts the hypothesis, asks you the five to eight questions that plug real holes.

Then the candidates: **four strategies that work in practice.** Share the context, share a skill, share the output (push), share an interface (pull). The fifth strategy, "share the whole agent," is the vendor pitch. It sounds right. It doesn't hold up. You'll see why in the next hour.

The disciplines you'll apply after (Roger Martin's *what would have to be true?*, Klein and Kahneman's *pre-mortem*) are not agent tools. They're strategy tools, named inline in the prompts you'll paste. You're using them on the switch: what would have to be true for your teammate to fire their current hire and use your candidate? Six months from now, why didn't they?

One observation to keep in your back pocket while you run the exercise: **the Access-Trust Gap.** In our practice, most companies have rolled out access far ahead of trust. Large fractions of the workforce can reach the agent, a much smaller fraction is trusted to run it on real production work. The gap is wide, and it's social, not technical. Which is why strategy tools beat deployment tools at M7. You'll feel that gap yourself when your technical plan fills quickly and your people plan stalls on names.

[Exercise: Share your work](exercises/share-your-work.md)

## Key Concepts (Emergent)

- **Interview for the outcome before designing the solution.** The transferable skill. The teammate's job comes first; your candidate comes second. When work resumes you'll face a different adoption problem and the move is the same. Agent reads your context, drafts a JTBD hypothesis, asks you seven targeted questions, produces a brief with an outcome statement. Christensen, Moesta, Ulwick didn't write it for agent work. You just applied it to agent work.
- **The agent does the heavy lifting on the interview.** Your memory already carries 80% of the teammate's job. Phase 1's move is the agent reading what's on disk, hypothesising, then asking a defined set of questions to plug the real holes. Not freeform chat. A bounded ask. That's what makes it reliable.
- **The outcome statement is the design contract.** In Ulwick's form: *"minimize/increase [metric] when [doing the job]."* Everything downstream (the candidate, the patterns, the plans, the assumptions, the pre-mortem) runs against that statement. A candidate that doesn't move the metric isn't a candidate.
- **The third outcome vector is where the interview earns its keep.** Speed and quality are the obvious axes. The non-obvious one (dependency removed, anxiety reduced, scope expanded, workload shifted) is what chatting surfaces. If an interview returns only speed and quality, it went shallow.
- **The Access-Trust Gap.** Access is easy; trust is the scarce thing you are actually distributing. The gap is wide everywhere we've looked. You felt it in the exercise: your technical plan filled quickly, your people plan stalled on names.
- **The four sharing strategies.** Share the context / share a skill / share the output (push) / share an interface (pull). "Share the whole agent" is not on the list. The choice between the four IS the design decision.
- **The pattern catalog is a design language.** Not a menu. You pick one to three patterns, match them to the outcome you're moving, stack where useful. Other people in the room picked differently. That's the point.
- **The people plan weighs equal to the technical plan.** Ownership, governance, operating, accountability, propagation. A deliverable missing the people plan is incomplete even with a perfect technical plan. A perfect technical plan with no people plan is a PowerPoint.
- **Firing the incumbent is the test.** Every job already has a current hire (Excel, a colleague, gut feel, nothing). The real question isn't *"will they adopt my agent?"* It's *"what would have to be true for them to fire what they use now?"* That question is social nine times out of ten.

## Debrief

Five minutes. Claude reviews the sharing deliverable and sharpens whichever sharing-artifact file you produced (a skill file, an interface description, an output schedule, a context export). The evidence is what's in your M7 folder: your JTBD outcome statement, the patterns you picked, the technical plan, the people plan, assumptions, pre-mortem. Claude reviews, rewrites the sharing artifact in place, reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and sharpen the sharing artifact. Read everything in module-7/ (sharing-problem, outcome, patterns, technical-plan, people-plan, assumptions, premortem, monday) and identify which single file is the sharing artifact itself (the skill file, the interface spec, the output schedule, the context export, whichever pattern I picked produces the thing the teammate actually touches). Then look back over the session: where did the teammate's job-to-be-done stay unnamed or too abstract, where does the artifact leak more than the teammate needs (over-shared) or less than they can use (under-shared), where is the people plan thin (no name, no owner, no handoff), which assumption would have to be true for this to land and isn't?

Then rewrite the sharing artifact. Integrate, don't append. Name the teammate's job explicitly at the top, tighten the surface area so it fits the job (not your whole system), add the one line the people plan needed. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why, grounded in specific moments from the exercise. Name the one assumption the artifact still depends on.
```


Read Claude's summary. Push back where it's wrong. *"The teammate's job wasn't vague, you just didn't see it"* / *"you pulled too much out of the skill, put the edge cases back."* The artifact: the sharpened sharing file itself, plus one line in your M7 next-step file naming the first move. Save the conversation. It's the bridge to when work resumes.

## Bridge

You've built a system. You've secured it, evaluated it, and designed the sharing. What if you didn't have to build each new agent by hand?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Analyze → Evaluate
- **Source-verification debt — Access-Trust Gap stat.** Earlier drafts carried *"54–95% access, 5–22% production trust, gap always wider than 35 points."* The number range circulates across consultancy reports and analyst posts, but the original methodology, sample size, and definition of "production trust" couldn't be traced inside the 6-month freshness window per `check_research_claims.md` § zombie-stat rule. `[UNVERIFIED STAT]` — current draft is qualitative ("wide gap, in our work"). If a verified primary source surfaces (sample size, methodology, recency under 6 months), restore the number with inline citation; otherwise keep qualitative.
- **Materials (trainer):** Pattern catalog ships inside the Module 7 scaffold at `patterns/personal-to-team-patterns.md` — student's Builder Claude reads it directly from the training directory. Branch-selection framing ready. Access-Trust Gap data point in lecture. **No pre-shipped plugins** (per Antti 2026-04-25 — M4 is the canonical plugin-authoring module). The three thinking-disciplines — Rumelt on *crux*, Roger Martin on *what would have to be true?*, Klein and Kahneman on *pre-mortem* — are named inline in prompt bodies, same pattern as M2's Debrief. Students take the techniques home as moves they can name and run, not as installed plugins.
- **Plug points:** Participant's organization (who would own this?); buyer infrastructure reality (cloud agent platform vs. personal Claudes only).

**Plug Points (trainer):**

> PLUG POINT: Branch selection — does your company have cloud agent infrastructure (N8N / Cowork / Power Automate / Make / an internal runtime), or only personal Claudes?
> Default: students pick live, based on what they can actually deploy to this week — not what procurement might approve in Q3. Branch B (personal Claudes only) is the plain path for most Nordic buyers on day one. It's not a consolation prize.

> PLUG POINT: Ownership model — who in your organization would own this?
> Default: if you can't name a person, write UNASSIGNED. That's Monday's question for your manager. Missing names are findings, not failures.

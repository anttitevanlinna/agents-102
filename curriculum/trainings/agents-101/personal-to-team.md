# From Personal to Team

## Big Idea
You can't really share an agent. You can share context, a skill, the output, or an interface. The hard part is not access; it is absorption.

## Prework

No new reading packet. Revisit the [Cookbook for Agent System Design](../../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) and glance through [What is an Agent](../../trainings/agents-101/supplementary/what-is-an-agent.md) end to end; both are references you built through the earlier modules. Walk in with one example where people had access to a tool or process but real use did not follow.

## What You'll Learn
After this module, you will be able to:
- **Interview** for your teammate's job-to-be-done using the agentic JTBD pattern, and write the outcome statement as the design contract
- **Select** the smallest shareable form (share context / share a skill / share the output / share an interface) for the outcome the teammate wants moved
- **Redesign** for shared use: technical plan + people plan (ownership, governance, operating, accountability, propagation)
- **Test** the switch the teammate would make and surface the assumptions they'd need to absorb
- **Name** the likely adoption failure before it happens, including the social failure that's hardest to see

## Start here

Start a fresh <span class="rt-code">Claude Code session</span><span class="rt-cowork">Cowork task</span> at `~/Documents/agents-101/`.

Module 7 is the first half of the extension package. It reads the agent system you built across Modules 2-6, writes sharing work under `module-7/`, and saves a next-step file that Module 8 uses.

The stack on disk: a memory, synthesis across three source zones, skills that audit the system, a judge that got sharper by watching itself miss things. Somewhere in it is a thing that produced output worth trusting enough to check before a meeting. Once it was wrong; a correction landed; the correction stuck.

The question that shows up on its own: *could this help someone else?*

Hold that feeling. It's not a governance question yet. It's a generous one. At Module 7 it becomes a plan. Plainly, against real friction, without the sales pitch.

Two questions to warm up: who's the one person who came to mind just now? And what makes you hesitate about actually handing this to them?

## Interview for the job

Start with the move that matters most: **interview for the job.** Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface: any of those is a candidate for hire against whatever they're using now. That reframe moves the starting question from *"what should I share?"* (yours) to *"what job is my teammate trying to get done, and which sharing shape does it?"* (theirs). Phase 1 is that interview, and the agent does the heavy lifting. It reads your memory, drafts the hypothesis, asks you the five to eight questions that plug real holes.

## Pick the sharing shape

Then the candidates: **four sharing shapes that hold up under real use.** Share the context, share a skill, share the output (push), share an interface (pull). The fifth shape, "share the whole agent," is the one that sounds right and doesn't hold up. You'll see why in the next hour.

The pressure tests after that stay practical: what's the absorption bottleneck, what must be true for the teammate to switch, and why might they go back to the incumbent six months from now?

One observation to keep in your back pocket while you run the exercise: **access is not absorption.** Many companies have rolled out access far ahead of trust. People can reach the agent. That does not mean they know when to use it, trust it with real work, or have a way to encounter it in the flow of the day. You'll feel that gap yourself when your technical plan fills quickly and your people plan stalls on names.

[Exercise: Share your work](exercises/share-your-work.md)

## Debrief

Five minutes. Claude reviews the sharing deliverable and sharpens whichever sharing-artifact file you produced (a skill file, an interface description, an output schedule, a context export). The evidence is what's in your Module 7 folder: your JTBD outcome statement, the patterns you picked, the technical plan, the people plan, assumptions, and failure stories. Claude reviews, rewrites the sharing artifact in place, reports what changed. You push back on anything that's off.

{{prompt:a101-m7-debrief-sharing-artifact}}

> **Watch for slowness.** When you push back on the rewrite, Claude should Edit the section you flagged, not rewrite the whole file. The prompt above tells it to. If Claude reaches for Write on the whole artifact anyway, push back: *"Edit just the section I named."*

Notice what this prompt insists on: name the path, overwrite in place, quote the before-and-after for every claim. When you're sharpening something for another person to use, "what got sharpened" without the actual lines is a draft pretending to be a finished thing. The before-and-after quote is how you know the sharpening reached the file, not just the summary.

## Push back on the summary

Read Claude's summary. Push back where it's wrong. *"The teammate's job wasn't vague, you just didn't see it"* / *"you pulled too much out of the skill, put the edge cases back."* The artifact: the sharpened sharing file itself, plus one line in your Module 7 next-step file naming the first move. Save the conversation. It's the bridge to when work resumes.

## Key Concepts

- **Interview for the outcome before designing the solution.** The teammate's job comes first, your candidate second. The agent does the heavy lifting: your memory already carries most of that job, so it reads what's on disk, drafts a Jobs-to-be-Done hypothesis, then asks a bounded set of questions. Not freeform chat.
- **The outcome statement is the design contract.** *"Minimize/increase [metric] when [doing the job]."* A candidate that doesn't move the metric isn't a candidate.
- **The third outcome is where the interview earns its keep.** Dependency removed, anxiety reduced, scope expanded, workload shifted. Speed and quality alone means it went shallow.
- **Access is easy; absorption is the scarce thing.** The technical plan fills quickly; the people plan stalls on names.
- **The four sharing shapes are a design language, not a menu.** Context / skill / output (push) / interface (pull). "Share the whole agent" is not on the list. Pick one to three, stack where useful.
- **The people plan weighs equal to the technical plan; replacement is the test.** Every job already has a current solution: Excel, a colleague, gut feel. Not *"will they adopt my agent?"* but *"what would have to be true for them to replace it?"*

## Bring to Module 8

**Run `module-7/monday.md`.** Test one assumption. Ask for one name. Talk to one person. Module 8 works from what happened when the sharing plan touched the real organisation, so it needs a plan that has touched one.

Come to Module 8 without one tested assumption or named person and you'll be reconstructing the contact while the opening exercise is already using the evidence. Your call.

Once the evidence is written down, end this module's <span class="rt-code">session</span><span class="rt-cowork">task</span>; Module 8 starts fresh at `~/Documents/agents-101/`.

## Next

The sharing plan leaves the room and meets the organisation. What comes back from that contact is Module 8's raw material.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-23 (writing@194c81b0 story@194c81b0 technical@725101ec behavior@725101ec pedagogy@194c81b0 strategy@725101ec slides@194c81b0)
- judges @194c81b0: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @194c81b0: PASS — set=[prework,getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations,personal-to-team,agents-building-agents]

**Mood target:** Generous impulse — the student starts from one teammate's job, not an abstract rollout obligation.

**Push-back moves / Watch-fors / Decision points:** [M7 run sheet](trainer-modules.md#m7-glance) owns the live cues, recovery paths, protected beats, and cut order.

**Meta (trainer):**
- **Transitions:** framing 12 @start "Framing: interview for the job, four sharing shapes" · debrief 5 @end "Debrief" · bridge 3 @end "Bridge"
- **Where these numbers come from:** framing from this block's own **Framing time:** line, taken at its ceiling; debrief from the body ("Five minutes."). Every beat here has no file of its own, so nothing else prices it.
- **Primary Bloom's level:** Analyze → Evaluate
- **Framing time:** 10–12 minutes. No separate lecture file; the framing runs straight into the exercise.
- **Materials (trainer):** Pattern catalog ships in the Agents 101 starter at `patterns/personal-to-team-patterns.md` — student's Builder Claude reads it directly from the training directory. Branch-selection framing ready. The student's one access-without-use example is the complete prework load; there is no three-walls or strategy reading packet. **No pre-shipped strategy skills** (M4 is the canonical personal-skill authoring module). The exercise's crux, assumption-test, and pre-mortem moves remain facilitator background, not required student reading.
- **Plug points:** Participant's organization (who would own this?); buyer infrastructure reality (cloud agent platform vs. personal Claudes only).

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 7 sharing package | `module-7/jtbd.md`, `module-7/branch.md`, `module-7/absorption-bottleneck.md`, `module-7/technical-plan.md`, `module-7/people-plan.md`, `module-7/assumptions.md`, `module-7/failure-stories.md` | M7 sharing exercise | M7 Debrief; M8 prework and sponsor-question grounding |
| Module 7 sharing artifact | chosen file under `module-7/` | M7 Debrief rewrite | M8 run-next-step prework and post-training adoption test |
| Module 7 next-step file | `module-7/monday.md` | M7 Phase 7 closing instruction | M8 prework and `joint-double-diamond-3` stance ground |

**Plug Points (trainer):**

> PLUG POINT: Branch selection — does your company have cloud agent infrastructure (N8N / Cowork / Power Automate / Make / an internal runtime), or only personal Claudes?
> Default: students pick live, based on what they can actually deploy to this week — not what procurement might approve in Q3. Branch B (personal Claudes only) is the plain path for most Nordic buyers on day one. It's not a consolation prize.

> PLUG POINT: Ownership model — who in your organization would own this?
> Default: if you can't name a person, write UNASSIGNED. That's Monday's question for your manager. Missing names are findings, not failures.

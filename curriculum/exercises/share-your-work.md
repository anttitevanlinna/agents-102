# Exercise: Share your work

**Session** *(new, "Module 7 - Personal to team")*

<span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

```
/rename m7-personal-to-team
```

Your memory has been working for you for days now. It catches things you'd have missed, keeps a tone you taught it, and produces something you check before meetings. The question arrives on its own: *could this help someone else?*

Hold the impulse. Then do the opposite of what vendors want you to do.

You are not going to ask *"what should I share with my teammate?"* That question is builder-centered and it skips the one thing that actually decides whether sharing works: **the job your teammate is trying to get done.** Your teammate doesn't want your agent. They want a job done. Your agent, your skill, your output, your interface: any of those is a candidate for hire. Does it do the job better than what they currently use?

So the starting question is theirs, not yours: **what job is my teammate trying to get done, and which sharing shape does it?**

You'll interview for that job (the agent reads your memory and does most of the work). You'll pick a candidate against the outcome, not against the infrastructure. You'll draft a technical plan and a people plan, side by side. You'll find the absorption bottleneck, test the switch, and name the likely failure before it happens. Some of it won't finish in the room. That's by design. The unfinished pieces are your Monday.

**What you do:**

**Phase 1. Interview for the job (12 min).**

You've built six modules of context. Your memory knows who your teammate is, what the work looks like, where the friction lives. The agent does the heavy lifting. It reads what's already there, drafts a hypothesis about the job, and asks you only the questions that plug real holes.

<div class="rt-code">

**Prompt** *(Builder Claude)*

```
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then use your ask-questions tool to confirm or correct each piece. Five to eight
questions, each with three or four options you drew from my memory. I'll pick.
Don't ask me to type freeform answers — the point is that you already have most
of this on disk.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the questions
I answered. Show me the file before saving.
```

</div>
<div class="rt-cowork">

**Prompt** *(Builder Claude)*

```
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then confirm or correct each piece with me using a numbered-options format.
Present five to eight questions, one at a time or as a single numbered list.
Each question gets three or four lettered options (a / b / c / d) drawn from
my memory. I reply with the letter (or letters). Don't ask me to type
freeform answers — the point is that you already have most of this on disk,
and the bounded options are what keep me from drifting back into chat.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the answers
I gave. Show me the file before saving.
```

</div>


Read what lands. The test for Phase 1: did the agent tell you something you hadn't quite put into words, or did it give you back what you already thought? A hypothesis that just confirms you is a shallow read. Push back in chat (*"try again; the struggle is something else"*) and let it try once more. The third outcome vector is where this phase earns its keep. Speed and quality are the obvious axes. If the agent only returned speed and quality, ask it explicitly: *"if speed and quality stayed exactly where they are, what else would my teammate want different?"*

**Phase 2. Pick the candidate that moves the outcome (13 min).**

You have an outcome statement. Now you pick what you'd offer the teammate. Two branches, both first-class.

**Branch B. Personal Claudes only.** Most of the room is here. Your teammates run their own Claude Code. Sharing travels as files and skills. Three of the four sharing strategies were built for exactly this situation. Branch B students often ship faster than Branch A because they don't wait on IT.

**Branch A. You also have cloud agent infrastructure.** N8N, Cowork, Power Automate, Make, an internal platform someone on your team can deploy to. If you're here, you stack Branch A's extra patterns (central deployment, hosted interfaces, output push at scale) on top of Branch B. You don't skip the file-and-skill sharing; you add runtime to it.

Pick based on what your company actually runs today. Not on what procurement might approve in Q3.

Have Builder Claude walk you through the pattern catalog at `patterns/personal-to-team-patterns.md` (shipped with this module's scaffold). It covers the four top-level strategies, then the patterns under each. Pick **one to three patterns.**

The selection test is not *does this pattern fit my infrastructure?* Infrastructure is a constraint, not a guide. The selection test is:

> **Does this candidate move the outcome metric?**

If your outcome is *"minimize time to draft a customer briefing I'd stake my reputation on,"* an MCP-native context share probably doesn't do it. Slack-bot pull or scheduled morning push more likely does. If your outcome is *"reduce days when my forecast is off by more than 20%,"* a skill-share probably moves that metric. A Slack bot doesn't. The pattern has to do the job.

Write `module-7/branch.md`. For each pattern picked, one sentence: *this pattern moves the outcome because [concrete mechanism].* Not *because it fits our infra.* The infra line is a footnote.

**About the catalog.** It's live. Some patterns have full practitioner examples; some have `[TODO]` fields. Where you hit a TODO, that's your prompt to invent the pattern for your situation. The scaffold (name, context, forces, solution, traps, people plan) is there. Fill it against your outcome statement and move on.

The four strategies, as a reminder:

1. **Share the context.** Your `memory/`, `sources/`, `CLAUDE.md`, `style.md` travel. Teammates build on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke via Slack bot, Teams @mention, web form.

"Share the whole agent" is not on the list. It sounds right in a deck. It doesn't work in the field.

**Phase 2.5. Find the absorption bottleneck (5 min).**

Before you draft plans, find the load-bearing obstacle. The sharing problem always has one, and it's almost never the technical one your builder brain surfaced first. Name the one obstacle that, if removed, would make several others easier.

**Prompt** *(Builder Claude)*

```
Find the absorption bottleneck in my sharing problem. Read module-7/jtbd.md and module-7/branch.md, plus anything else in module-7/ so far. The question is not "how do I share?" — it's "what's the single load-bearing obstacle between my teammate and firing their current hire?"

List the obstacles you see — technical, social, political, habitual, governance, trust. Cluster them. Name the bottleneck: the one that, if removed, makes several others easier. State it in one sentence.

Save to module-7/absorption-bottleneck.md. Show me before saving.
```


Read what lands. If the bottleneck is technical ("we don't have a Slack bot"), push back. Technical obstacles are rarely the bottleneck at Week 1. If the bottleneck is social ("my teammate doesn't trust anything they didn't build themselves"), you've probably got it. Keep the file open; Phases 3 through 5 all aim at this obstacle.

**Phase 3. Draft both plans (18 min).**

You're drafting two documents side by side. Neither is optional.

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/branch.md, and module-7/absorption-bottleneck.md. Help me draft two files in
parallel — a technical plan and a people plan. Both are about whether this
teammate can actually fire their current hire and start using my candidate.

File 1: module-7/technical-plan.md — how the candidate delivers the outcome.
- What exactly I ship (files, skills, config, runtime).
- How the teammate receives it (zip, repo, connector, invite).
- What "it moves the outcome metric for them" looks like — concrete, measurable.
- The first real test case they'd run, against the job from the JTBD brief.

File 2: module-7/people-plan.md — equally load-bearing. Cover all five:
- Ownership: named person accountable. Not a role.
- Governance: who can add to the memory, change the rules, see the output.
- Operating: who notices when the outcome metric slips. What they do about it. If the obvious name is also the person who benefits most, name a second person who'd notice independently — otherwise the only alarm is the person with a reason to silence it.
- Accountability: who decides the candidate is no longer doing the job — who
  fires the hire.
- Propagation: who teaches the next person, when.

Ask me anything you need. Don't invent names. If I don't know, write
"UNASSIGNED — Monday's question" and keep moving. Missing names are findings,
not failures.

Show me both before saving.
```


Answer plainly. The UNASSIGNED lines are the most valuable lines in this exercise. They are the questions you walk into your manager's office with on Monday.

**Phase 4. Test the switch assumptions (10 min).**

Your plans rest on assumptions. Some are wrong. The question is not *"will my agent work?"* That's a builder question. The question is: *what would have to be true for this teammate, doing this job, to fire their current hire and use my candidate?*

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/absorption-bottleneck.md, module-7/technical-plan.md, and module-7/people-plan.md.

Test the assumptions in these plans. Aim it at the SWITCH, not at generic sharing:

What would have to be true for this specific teammate, doing this specific
job, to fire their current hire and use my candidate?

List the top five assumptions the switch depends on. For each:
- State it as a declarative sentence.
- Rate confidence (high / medium / low) based on what I've told you.
- Name one concrete way I could test it this week — one conversation, one
  small experiment, one quick check.

Order from most load-bearing to least. Save to module-7/assumptions.md.
Let the assumption-test change the confidence in the plans — don't just append
a new section. Show me before saving.
```


Mark the two or three you'd actually test this week. Those are what you ship first, not the full rollout.

**Phase 5. Name the likely failure (7 min).**

The plan is on paper. Six months from now, they went back to Excel. Why?

**Prompt** *(Builder Claude)*

```
It is six months from now. My teammate
kept using their current hire. My candidate sat unused, or they tried it twice
and fired it.

Read module-7/jtbd.md, module-7/technical-plan.md, module-7/people-plan.md, and
module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- Most likely social failure — about the incumbent, the teammate, the
  workflow. "They trust their own spreadsheet more than any agent output" is
  usually closer than "it broke technically."
- Most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — bias your thinking toward what I seem to be
  assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if
this were starting to happen.

Save to module-7/failure-stories.md.
```


The third story is the one to read twice.

**Closing (5 min).** Monday isn't a deployment decision. It's a conversation.

Write `module-7/monday.md` with three lines:
- The teammate I'll talk to first. (Just them. Not a rollout.)
- The one question I'll actually ask about their job. (Not *"want to try my agent?"* but something like *"walk me through how you currently do X."*)
- The assumption I'll test this week.

In self-study, ask Teacher Claude to read all your module-7 files and push back on one thing: *"Is the outcome statement really the teammate's outcome, or is it the builder's wish dressed in their language?"* One sharp pushback beats a compliant summary.

**What happened:**

The interview will surprise you. Your memory already knew 80% of this teammate's job. The agent surfaces it in a shape you can use. The outcome vector you didn't expect (the third one: anxiety, dependency, scope, workload) is usually the one that actually matters.

Your pattern selection will look different under the outcome test than under the infrastructure test. Patterns you'd have picked because they're easy don't move the metric. Patterns you'd have ruled out because they seem hard turn out to be the only ones that do the job. That's the reframe.

Your people plan will have more UNASSIGNED lines than you're comfortable with. Good. That's the absorption bottleneck in your own work, not an abstraction. The gap between a confident technical plan and a hedged people plan is the thing industry papers over.

The failure stories will tell you things you half-knew. The third story (the failure you're not seeing) is usually some version of *"they never fired their current hire in the first place."*

**The point:**

Before you design a solution, **interview for the outcome.** That's the transferable skill. The sharing decision is one instance. Monday you'll face a different adoption problem (rolling out a new process, proposing a tool, onboarding a hire) and the move is the same. Agent reads your context. Drafts a hypothesis about the job someone is trying to get done. Asks you seven targeted questions. Produces a brief with an outcome statement. You pick the candidate that moves the outcome. You draft both plans. You test the switch, not the solution.

A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design.

You just ran **Recipe 7** end-to-end: the Jobs-to-be-Done interview for agents, the four sharing strategies (context, skill, output, interface), the technical plan paired with the people plan, the switch-test. After Agents 101, when the next teammate wants a slice of your system, the [Cookbook for Agent System Design](supplementary/cookbook-for-agent-system-design.md) is where the moves and components live without the training scaffolding.

**Time:** 55–70 minutes. Some phases will run long. That's where the learning lives.

<!-- maintainer -->

**Facilitator notes:**

- **Capability check before delivery:** confirm Claude Code's AskUserQuestion tool is available in the student's environment (student-facing name: "ask-questions tool"). The tool renders bounded multiple-choice questions inline and is the Phase 1 interaction primitive. If unavailable in a cohort's build, fall back to Claude asking structured questions one at a time with numbered options the student picks by number — mechanically similar, pedagogically weaker.
- **Phase 1 is the magic beat.** The teaching moment is the student experiencing that the agent already had 80% of the teammate's job on disk, and that seven targeted questions plug the remaining 20%. If the agent's hypothesis just parrots back the student's own assumptions, the magic fails. Teacher Claude (self-study) or facilitator (in-room) nudges: *"Did the agent actually read your memory, or did it guess from file names? Find one claim in the JTBD brief that surprised you. If nothing surprised you, ask the agent to try again — the outcome is not the job you already had in mind."*
- **Third-axis surfacing.** If the three outcome vectors come back as speed / quality / (weak generic "other"), push: *"If speed and quality stayed flat, what else would your teammate want? Dependency removed? Anxiety reduced? Scope they could take on that they can't today? Workload shifted to someone else?"* The non-obvious axis is where interviewing-for-outcomes earns its keep and is the lesson students take to Monday's adoption problem.
- **Branch selection around 14 min in** (start of Phase 2). Most Nordic cohorts land heavily in Branch B — don't apologize for it, frame it as the plain pattern for most buyers on day one.
- **Phase 2 selection test is *does this move the outcome*, not *does this fit my infra*.** Watch for students picking patterns because they're technically feasible rather than because they do the job. Nudge: *"Why would your teammate fire their current hire and use this? Answer that in one sentence. If you can't, pick a different pattern."*
- **Phase 3 stall on people-plan names.** Their technical plan fills quickly; the people plan stalls on *who owns it?* That stall IS the teaching moment. Protect it. UNASSIGNED lines are the Monday artifact.
- **Phases 4 and 5 are where students run out of time.** Designed. Before Phase 4 starts, say aloud: *"If you don't finish these, you have Monday's work. That's the intended outcome for at least half of you."* Removes the shame. Hardness is a feature.
- **Monday's first move is a conversation, not a deployment.** If a student writes *"I'll deploy the Slack bot on Monday"* as their first move, push: *"Before deploying anything — what conversation are you having first? With whom? About what?"* The reframe — sharing starts with an interview, not a push — is the take-home.
- **Closing beat:** in-room, pick three students to read their third failure story aloud. The third-story format forces useful disclosure. Self-study: Teacher Claude plays the pushback role on the outcome statement.

**Framework attributions:**

- Clayton Christensen — Jobs-to-be-Done, *Competing Against Luck*. The framing: people hire products for jobs.
- Bob Moesta — the switch interview. The practitioner variant of JTBD used for small-team adoption decisions (*"tell me about the moment you decided to switch"*). Closer to what works here than the academic form.
- Anthony Ulwick — Outcome-Driven Innovation. The outcome statement form: *"minimize/increase [metric] when [doing the job]."* The three-vector structure (speed, quality, other) is in the ODI lineage.
- Richard Rumelt — *Good Strategy Bad Strategy*. Crux / load-bearing obstacle. Student-facing framing uses absorption bottleneck rather than named crux.
- Roger Martin — *Playing to Win*. Strategy as assumptions / *what would have to be true?* Phase 4.
- Gary Klein, Daniel Kahneman — pre-mortem. Student-facing framing uses failure stories.

Supporting research inline via prework: absorption bottleneck. Access-trust and discoverability are useful facilitator lenses if the room needs them.

**Pacing:** Phase 1: 12 / Phase 2: 13 / Phase 3: 18 / Phase 4: 10 / Phase 5: 7 / close: 5 = ~65 min. Fits the 55–70 window. Students running slow will compress Phase 2's pattern-catalog read and spend the time on Phase 3's people plan — fine.

**Claude-behavior watch-fors:**

- **Ask-questions tool dump.** Some Claude Code builds will send all eight questions in a single AskUserQuestion call; others serialise one-at-a-time. Either renders fine — the student picks options; there's no freeform typing — but the one-at-a-time variant lets the agent refine mid-interview. Don't sweat it either way; flag if the tool returns freeform text prompts instead of bounded options (then the tool isn't actually being invoked, and you've fallen back to chat — nudge the student to re-run the Phase 1 prompt and name the tool explicitly).
- **Memory-reading vs. guessing.** Claude will sometimes fabricate a confident JTBD hypothesis from file names alone without actually reading the files. Tell: the hypothesis is generic, cites no specific line. Fix prompt at top of Phase 1 already says "anchor every claim to a specific file and line in my memory." If the output still has no anchors, push: *"quote the sentence from my memory that made you think this."*
- **Default-acceptance on Phase 1 hypothesis.** Students rubber-stamp what the agent returns. Teacher Claude or facilitator: *"pick one thing that's probably wrong. Ask it to try again on that piece."*
- **Append-vs-integrate on Phase 4.** Assumption-test should reshape the plans' confidence, not append a new "assumptions" paragraph. Prompt says so; watch the output.
- **Plan-mode preamble bloat on Phase 3.** Prime students to scroll past.
- **TODOs in the pattern catalog.** The catalog ships WIP. Where a pattern's Example field says `[TODO]`, the student invents one for their situation — that's the designed experience, not a bug. If students flag "this isn't filled in" as a problem, reframe: *"the scaffold is filled in — name, context, forces, solution, traps, people plan. The example is yours to write. That's the practitioner move."*

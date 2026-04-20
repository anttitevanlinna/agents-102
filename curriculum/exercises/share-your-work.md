# Exercise: Share your work

Your brain has been working for you for days now. It produced something you trust enough to check before meetings. You've caught it being wrong, corrected it, and watched the correction stick. The question that shows up on its own: *could this help someone else?*

That's the feeling. Now the work. Sharing an agent is not a technical move — it's a strategic one. You'll run three disciplines on the sharing problem before you touch any deployment, pick one of four sharing strategies, and leave with two plans (technical and people) that you can act on Monday.

Not all of it. You will almost certainly not finish the final passages in the room. That's designed. What you don't finish is Monday's first move.

**What you do:**

**Phase 1 — Name the sharing problem (10 min).**

Open a fresh file: `module-7/sharing-problem.md`. In six to ten sentences, answer four things:

- The one person (named, real) or small team you'd share this with.
- What you'd want them to have — the output? the discipline? the whole folder? a way to ask it in Slack?
- The thing that makes you hesitate. Write this honestly. "I'm not sure they'd trust it." "Our IT won't open that connector." "I don't want them changing the brain." "We don't have infra for scheduled agents." Whatever the real hesitation is.
- **Who would resist this, and why?** Name a person or group — a colleague who wouldn't want the work shared, a function that would raise a flag, a manager who'd slow-walk it. One sentence on the resistance. If you can't name anyone, the sharing is either trivial or you haven't thought about it hard enough. Push yourself to name one.

Then paste this prompt into Claude Code:

```
I want you to run the crux discipline (Rumelt, Good Strategy Bad Strategy) on my sharing problem.

Read module-7/sharing-problem.md. Diagnose the load-bearing obstacle to sharing — the one thing that, if it weren't there, would make the rest solvable. Not a list. One sentence.

Then surface two or three runner-up obstacles you considered and rejected, with one sentence each on why the crux wins.

Most of the time the crux is social — trust, ownership, political — not technical. Say so if that's what you see. Don't soften.

Save the result to module-7/crux.md. Show me before saving.
```

Read what comes back. Argue with it if it's wrong — push back in the chat, get a second pass. The crux is the thing you're actually designing around.

**Phase 2 — Pick your branch and your pattern (15 min).**

Two paths. Most of the room is on **Branch B: personal Claudes, no shared runtime.** Everyone on your team runs their own Claude Code. Sharing happens through files and skills that travel. That's the starting condition for most Nordic companies in 2026 — not a limitation, the ground truth. Three of the four sharing strategies were built for exactly this. Branch B students typically ship faster than Branch A because they don't wait on IT.

**Branch A — you additionally have cloud agent infrastructure.** N8N, Cowork, Power Automate, Make, an internal platform someone on your team can deploy to. If this is you, you get extra patterns — central deployment, hosted interfaces, output push at scale — stacked on top of what Branch B already has. You don't skip skills and context-sharing; you add runtime on top.

Pick based on what your company actually runs today. Not what someone said in a roadmap deck.

Open the pattern catalog — `strategy/personal-to-team-patterns.md` — in a second tab. Skim the four top-level strategies. Pick **one to three patterns** that fit your situation. A pattern "fits" when it resolves your crux OR matches your infra — usually both. Don't pick one because it sounds sophisticated. Write your picks in `module-7/branch.md` with one sentence each on why that pattern fits.

**About the catalog.** It's live and evolving. Some entries have full practitioner examples; some have `[TODO]` next to fields we're still filling in. Where you hit a TODO — that's your prompt to invent the pattern for your situation. The structure (name, context, forces, solution, traps, people plan) is the scaffold; the content you generate against your own situation is the deliverable. Consult the filled patterns for shape; write yours live.

The four strategies, reminder:

1. **Share the context.** Your `brain/`, `sources/`, `CLAUDE.md`, `style.md` travel. Teammates build their own agents on top.
2. **Share a skill.** Extract one scoped capability. Teammates plug it in.
3. **Share the output (push).** Schedule the agent. Output lands where the team looks.
4. **Share an interface (pull).** Wrap the agent. Teammates invoke — Slack bot, Teams @mention, web form.

"Share the whole agent" is not on the list. It sounds right and it doesn't work in the field.

**Phase 3 — Draft both plans (20 min).**

You're drafting two documents side by side. Neither is optional.

Paste this prompt:

```
I'm drafting a sharing plan for my work. Read module-7/crux.md and module-7/branch.md, and help me draft two files in parallel.

File 1: module-7/technical-plan.md
- What exactly I ship (files, skills, config, runtime).
- How a teammate receives it (a zip, a repo, a connector, an invite).
- What "it works on their machine" looks like — concrete, not aspirational.
- The first real test case they'd run.

File 2: module-7/people-plan.md — equally load-bearing. Cover these five:
- Ownership: who is the named person accountable for this, not a role.
- Governance: who can add to the brain, who can change the rules, who sees the output.
- Operating: who notices when it drifts, fails, goes stale. What they do about it.
- Accountability: who decides when it's wrong. What "wrong" means.
- Propagation: who teaches the next person. When.

Ask me anything you need. Don't make up names. If I don't know, write "UNASSIGNED — Monday's question" and move on. Missing names are findings, not failures.

Save both. Show me before saving.
```

Answer Claude's questions honestly. The UNASSIGNED lines are the most valuable part of this exercise — they're what you take to your manager on Monday.

**Phase 4 — Test the assumptions (10 min).**

The plans are drafts. They rest on assumptions. Some of those assumptions are wrong. Paste this:

```
I want you to run the assumption-test discipline (Roger Martin — "what would have to be true for this to work?") on my sharing plan.

Read module-7/technical-plan.md and module-7/people-plan.md.

List the top five assumptions the plan depends on — things that if they turned out false, the plan fails. For each:
- State the assumption as a declarative sentence.
- Rate how confident I should be (high / medium / low), based on what I've told you.
- Name one concrete way I could test it this week (one conversation, one small experiment, one quick check).

Order from most load-bearing to least. Save to module-7/assumptions.md. Show me before saving.
```

Read the list. Mark the two or three you'd actually test this week. These are what you ship first — not the full rollout.

**Phase 5 — Pre-mortem the rollout (8 min).**

The plan is on paper. In six months, it failed. Why?

```
Run the pre-mortem discipline (Klein, Kahneman). It is six months from now. My sharing plan rolled out and failed. Read module-7/technical-plan.md, module-7/people-plan.md, and module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- The most likely social failure — people-reason, not tech-reason. Name the dynamic.
- The most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — the one that surprises me. Bias your thinking toward what I seem to be assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if this were starting to happen.

Save to module-7/premortem.md.
```

The third story is the one to read twice.

**Closing beat (5 min).** Show the room (or your pair) which crux you surfaced, which branch you chose, and the failure story that scared you most. In self-study, ask Teacher Claude to play the pair — read your three files and push back on one thing: *"Is the crux really social, or did you stop one layer early? Is the pre-mortem's third story actually surprising, or a dressed-up version of what you already expected?"* One sharp pushback beats a compliant summary.

What you don't finish — the assumption you haven't tested, the UNASSIGNED names, the third pre-mortem story — is Monday's work. Write `module-7/monday.md` with three lines: the assumption I'll test, the name I'll ask my manager for, the person I'll talk to first.

**What happens:**

The crux will surprise you. You walked in thinking the obstacle was technical; nine times out of ten it's social. "Our governance is unclear." "I don't trust this person to maintain it." "Nobody owns shared knowledge in our org." That reframe is the first shift.

The people plan will have more UNASSIGNED lines than you're comfortable with. That's the data. A deliverable where ownership is "someone on my team, probably" is not a deliverable — it's a wish. The gap between your technical plan (confident, specific) and your people plan (hedged, vague) is the Access-Trust Gap rendered in a single student's work. You're living the pattern.

The pre-mortem will tell you things you half-knew. The assumption-test will tell you which bets to size down. You will leave the room with fewer answers than you hoped, and a sharper question. That's the design.

**The point:**

You cannot really share an agent. You can share context, a skill, the output, or an interface — and the choice between those is a strategy decision, not a deployment decision. The pattern catalog is a design language, not a menu to order from. The real work is matching a pattern to your crux, and then doing the people plan the industry pretends doesn't exist.

The three disciplines — crux, assumption-test, pre-mortem — are portable. Rumelt, Martin, and Klein didn't write them for agent work. You just applied them to agent work. They'll travel to the next decision you face, and the one after that.

A perfect technical plan with no people plan is a PowerPoint. The industry is full of those.

**Time:** 55–70 minutes. Some phases you'll run long on. That's fine — it's where the learning lives.

<!-- maintainer -->

**Facilitator notes:**

- Branch selection around 8–10 min in. Most Nordic cohorts land heavily in Branch B — don't apologize for it, frame it as the real pattern.
- Watch for Phase 1 cruxes that name a technical obstacle ("we don't have a Slack bot platform"). Push: "if that platform appeared tomorrow, would the sharing happen? If no, keep digging." Usually the real crux is one layer down — trust, ownership, attention.
- Phase 3 is where people run long. Their technical plan fills quickly; their people plan stalls on names. That stall IS the teaching moment. Protect it.
- Phase 4 and 5 are where students run out of time. That's designed. Before Phase 4 starts, say aloud: *"If you don't finish these, you have Monday's work. That's the intended outcome for at least half of you."* Removes the shame.
- Closing beat — pick three students to read their most-scary pre-mortem story aloud. The third-story format forces useful disclosure.
- Monday.md is the single most load-bearing artifact. If someone leaves without writing it, the exercise didn't finish.

**Riffed on:** Rumelt (crux / good strategy bad strategy), Roger Martin (strategy as assumptions / Playing to Win), Gary Klein (pre-mortem). Supporting research: Access-Trust Gap (Pattern 47), absorption bottleneck (L4), announcement-to-deployment gap (Pattern 31).

**Pacing:** Phase 1 10 / Phase 2 15 / Phase 3 20 / Phase 4 10 / Phase 5 8 / close 5 = ~68 min. Fits the 55–70 window. Students running slow will compress Phase 2's pattern-catalog read and spend the time on Phase 3.

**Claude-behavior watch-fors:**
- Plan-mode preamble bloat on Phase 3 — prime students to scroll past.
- Append-vs-integrate on Phase 4 — the assumption-test should reshape the plans' confidence, not append a new section. Prompt handles it; watch the output.
- Default-acceptance on Phase 1 crux — students rubber-stamp the first crux Claude returns. Teacher Claude or facilitator nudges: *"argue with one line. Is the ranked runner-up closer to your real situation?"*

# Getting Going

## Big Idea
With the right guardrails, you create output that's genuinely yours, not generic.

## Prework

Set up Claude Code or Cowork. Build a snake game as HTML. Connect your calendar (M365 / Google Workspace / screenshot fallback) and save a 5-line summary of this week's meetings. Read [What is an Agent, LLM vs chat](supplementary/what-is-an-agent.md#llm-vs-chat).

## What You'll Learn
After this module, you will be able to:
- **Generate** an HTML one-pager and read what the agent put in it
- **Apply** structured guardrails and see how the output changes
- **Identify** fabrication in LLM output where your domain knowledge says it's wrong
- **Package** what you learned into reusable generation rules

## Start here

This module's outputs land in `module-1/`.

**The question, to you:** when you've used ChatGPT or Claude for your own work (a bio, a pitch, a post), where did the output come out generic? Was there ever a moment where it actually felt like yours, and if so, what made the difference?

**Context is king.** You steer your agent by the context you give it. You paint by choosing the brush.

[Opening: Context is King](lectures/context-is-king.md)

[Exercise: Paint by agent with guardrails](exercises/personal-site-with-guardrails.md)

[Closing: Iterate and learn](lectures/what-just-happened.md)

## Key Concepts
- Guardrails are structured context, not a checklist
- You are the world's best evaluator of your own profile. Domain expertise IS the eval
- The guardrail IS the control: average output becomes great not because you prompted better

## Debrief

Five minutes. A retro, and **the second pass on your rules file.** You wrote the first version of `module-1/personal-brand-generation.md` at the close of the exercise, capturing what you noticed *while doing the work*. The retro is Claude reading the file against the actual session. A different lens, surfacing what landed, what fell flat, what to keep, what to drop. Two passes; the second is where the file starts compounding.

Ask Claude to retro your rules file.

{{prompt:a101-m1-debrief-rules-retro}}


Claude runs the retro and updates the file, then summarises what changed in chat. You may be surprised by how much still changes in the generation rules. First pass is pretty much never exactly right.

Two patterns to watch. The LLM is generous to a rules file it just helped write. *"Mostly worked, small sharpens"* is the agent grading its own work charitably. The prose summary rounds corners.

Push back on anything that doesn't match your sense of the work. That's the pattern: every time you do work like this and reflect, the rules file gets sharper. **Compound interest on a rule file.** This is the move you'll use on every agent file you write from here on: do the work → capture the rules → reflect → sharpen the rules. Module 2 systematises it; Module 1 lands the muscle.

**Then, Claude as cold critic.** Now that you've reflected on your own experience, get an unbiased verdict.

Ask Claude to spawn <span class="rt-code">a subagent</span><span class="rt-cowork">an agent</span> to read the site cold.

{{prompt:a101-m1-debrief-cold-critic}}


One pattern to watch. Asked the most-uniquely-you line first, the LLM warms into appreciation. The praise carries forward into the generic-line call. Both picks come back softer than they probably should. Your own gut on what's uniquely you and what's generic carries more weight than Claude's.

Compare Claude's picks to what you expected. Where cold-Claude sees generic, your context is still thin; add one more sharp detail there and regenerate. Where Claude's pick of *"uniquely you"* matches your own gut: solid ground.

## Next
You just made great output AND packaged what you learned into a file the agent can re-read next time. That's the move that compounds. Module 2 takes the same idea and systematises it (the memory, the agents, the room rules) so every future module's work builds on every previous one.

## Homework after Module 1, before Module 2

[Module 2 prework](lectures/module-2-prework.md). Bring a live challenge on your mind, verify your Confluence and OneDrive connectors, run the <span class="rt-code">plan-mode primer</span><span class="rt-cowork">plan-first primer</span>, read Karpathy's LLM Wiki post, and scan the candidate Lindenberg memory-architecture piece if you have room.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-04
- judges: writing PASS, story PASS, behavior PASS (see instances/getting-going.*.json); technical grandfathered
- mechanical @3d7e76c: PASS — agents-101-m1 via bin/judge.sh
- maintainer-reviewed 2026-04-29 (Antti, M1 manual cohort-prep run; read end-to-end, prompts run manually under Cowork lens)

**Meta (trainer):**
- **Primary Bloom's level:** Apply
- **Prework time:** about 30–60 minutes before Module 1.
- **Materials (trainer):** none — the exercise is vanilla Claude Code + the student's own LinkedIn. The Debrief sharpens `module-1/personal-brand-generation.md`; Module 1 deliberately creates no `CLAUDE.md`.
- **Plug points:** participant's own LinkedIn profile — no org data needed yet

**Artefact contracts**
| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Module 1 working folder | `module-1/` | M1 exercise writes visible outputs | M1 debrief and M2 boundary framing |
| Module 1 personal site | `module-1/site.html` | M1 guardrailed generation exercise | M1 cold-critic read; M2 contrast with system work |
| Module 1 generation rules | `module-1/personal-brand-generation.md` | M1 exercise close and Debrief rewrite | M1 retro; M2 scoped-rule contrast; later module demonstrations of rule compounding |

**Plug Points (trainer):**
- **The trainer's CLAUDE.md** has a default (differentiation / storytelling / framing). Variant: orgs with a brand guide can substitute. Default works on its own.

**Sponsor opening note (trainer):**
- In-room only. If the sponsor is present as a participant, they may open with one sentence in their own words: why they are learning alongside the cohort and what they do not yet know. No corporate kickoff, no agenda. Keep it before screen-share or as a spoken room move, not student-facing curriculum text.

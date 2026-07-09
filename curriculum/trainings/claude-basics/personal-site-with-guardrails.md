# Paint by agent with guardrails

## Big Idea

With the right guardrails, you create output that's genuinely yours, not generic.

## Prework

Cowork set up (you've been using it in the live session and homework). Your own LinkedIn profile open in another tab.

## What You'll Learn

After this module, you will be able to:

- **Generate** an HTML one-pager and read what the agent put in it
- **Apply** structured guardrails and see how the output changes
- **Catch** statistical-default output where your own knowledge says the agent is filling in a gap with generic
- **Package** what you learned into a reusable generation rules file

## Start here

This bonus module is self-study. The build-and-verify homework gave you a small system on a work task. This one gives you the inverse: a personal artifact, fast feedback, and the first rules file the agent can re-read on any future personal-shaped task.

**The question, to you:** when you've used ChatGPT or Claude for your own work (a bio, a pitch, a post), where did the output come out generic? Was there ever a moment where it actually felt like yours, and if so, what made the difference?

**Context is king.** You steer your agent by the context you give it. You paint by choosing the brush.

[Opening: Context is King](lectures/context-is-king-cb.md)

[Exercise: Paint by agent with guardrails](exercises/personal-site-with-guardrails-cb.md)

[Closing: Iterate and learn](lectures/what-just-happened-cb.md)

## Key Concepts

- **Guardrails as structured context.** Not a checklist; a stance the agent reads at the start of the task.
- **Domain expertise IS the eval.** You are the world's best evaluator of your own profile. Your gut on what's uniquely you and what's generic carries more weight than Claude's.
- **Context is the control, not clever prompting.** Average output becomes great because of what's loaded ahead of the task, not because the prompt got smarter.
- **Do → capture → reflect → sharpen.** Compound interest on an agent file. Every round of doing the work and reflecting makes the next round start sharper.

## Debrief

Five minutes. A retro, and **the second pass on your rules file.** You wrote the first version of `personal-brand-generation.md` at the close of the exercise, capturing what you noticed *while doing the work*. The retro is Claude reading the file against the actual session. A different lens, surfacing what landed, what fell flat, what to keep, what to drop. Two passes; the second is where the file starts compounding.

Ask Claude to retro your rules file.

**Prompt** *(Cowork)*

```
Start by reading the file. No plan or preamble.

Read `personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Assume the rules file is at least 30% wrong or thin. Find that 30%. If fewer than two rules get dropped or substantially rewritten, say why before you proceed.

Then overwrite `personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, list:
- dropped: rule text + reason
- sharpened: before -> after
- added: rule text + why the session needed it
- still uncertain: anything the rules should cover but you want me to weigh in on first
```

Claude runs the retro and updates the file, then summarises what changed in chat. You may be surprised by how much still changes in the generation rules. First pass is pretty much never exactly right.

Two patterns to watch. The LLM is generous to a rules file it just helped write. *"Mostly worked, small sharpens"* is the agent grading its own work charitably. The prose summary rounds corners.

Push back on anything that doesn't match your sense of the work. That's the pattern: every time you do work like this and reflect, the rules file gets sharper. **Compound interest on a rules file.** This is the move you'll use on every agent file you write from here on: do the work → capture the rules → reflect → sharpen the rules.

**Then, Claude as cold critic.** Now that you've reflected on your own experience, get an unbiased verdict.

Ask Claude to spawn an agent to read the site cold.

**Prompt** *(Cowork)*

```
Spawn an agent to give an unbiased read on `site.html`. The agent should read it cold, with no memory of building it.

Have the agent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```

One pattern to watch. Asked the most-uniquely-you line first, the LLM warms into appreciation. The praise carries forward into the generic-line call. Both picks come back softer than they probably should. Your own gut on what's uniquely you and what's generic carries more weight than Claude's.

Compare Claude's picks to what you expected. Where cold-Claude sees generic, your context is still thin; add one more sharp detail there and regenerate. Where Claude's pick of *"uniquely you"* matches your own gut: solid ground.

## Bridge

You just made great output AND packaged what you learned into a file the agent can re-read next time. That's the move that compounds. The move travels: any personal-shaped output (a colleague's bio, a team page, a client one-pager) earns a rules file in the same shape. When the rollout asks you for the next level (building agents, writing evals, multi-step systems), you take that step in Agents 101.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-21 (writing@304f061 pedagogy@304f061 strategy@304f061)
- judges @304f061: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS

**Source:** `curriculum/trainings/agents-101/getting-going.md` (Agents 101 M1 canonical module).

**Meta (trainer):**
- **Primary Bloom's level:** Apply
- **Length:** 60–90 minutes self-study (optional bonus, runs after the live session alongside the build-and-verify homework).
- **Materials (trainer):** none — Cowork + the participant's own LinkedIn profile.
- **Plug points:** participant's own LinkedIn profile — no org data needed.

**Artifact contracts**
| Artifact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Bonus module working folder | personal homework folder | Cowork session | Exercise writes site.html + rules file there |
| Personal site | `site.html` | The 6-phase guardrailed generation exercise | Cold-critic Debrief; the participant's own portfolio |
| Generation rules file | `personal-brand-generation.md` | Exercise close + Debrief rewrite | Future personal-shaped tasks the participant runs |

**Mood contract:** joyful ownership. The participant should leave thinking *"I made this, and it's mine — not generic."* Sister to Agents 101 M1's joyful creation, tuned for the rollout-custodian audience. Edits that make it feel like a technical warm-up steal the mood. The first reusable rules artifact is the durable payoff.

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Paint by agent with guardrails*.

**Placement rationale:** sits between M3 (capable next step — homework) and M5 (operational clarity — organisers). Optional bonus; not on the live-session critical path. Serves the C-question (*"Can you be the person to run this?"*) by giving the participant a tangible personal artifact made with guardrails, reinforcing the custodian identity shift the live session begins.

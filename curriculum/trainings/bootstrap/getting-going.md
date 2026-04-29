# Getting Going

## Big Idea
With the right guardrails, you create output that's genuinely yours, not generic.

## Prework

About 30–60 min before Module 1. Set up Claude Code or Cowork. Build a snake game as HTML. Connect your calendar (M365 / Google Workspace / screenshot fallback) and save a 5-line summary of this week's meetings. Read [What is an Agent — LLM vs chat](supplementary/what-is-an-agent.md#llm-vs-chat).

## What You'll Learn
After this module, you will be able to:
- **Generate** a real personal artifact (an HTML one-pager) using an LLM without guardrails
- **Apply** a structured guardrail and observe the effect on output quality
- **Identify** fabrication in LLM output by using your own domain knowledge as the evaluator
- **Adjust** guardrails to fix specific failure modes

## Start here

<span class="rt-code">Start a new Claude Code session at `~/Documents/agents-102-bootstrap/` (the training root, same as Prework). This module's outputs land in the `module-1/` subfolder.</span><span class="rt-cowork">Click *New task* in the Cowork tab and select `~/Documents/agents-102-bootstrap/` as the working folder (the training root, same as Prework). This module's outputs land in the `module-1/` subfolder.</span>

> **In-room cohort opening (self-study readers, skip to the question below).**
>
> Let's hear from your sponsor first (the CEO / CTO / SVP who brought you here). They're in the room with you, as a participant, not as a visitor. They've got one sentence in their own words: why they're here, and what they don't yet know. Something like *"I want to learn this with you, not delegate it."* No corporate kickoff, no agenda. What matters isn't the sentence. It's that your sponsor said it, out loud, before anyone else. That's the license the next seven modules run on.

**The question, to you:** when you've used ChatGPT or Claude for your own work (a bio, a pitch, a post), where did the output come out generic? Was there ever a moment where it actually felt like yours, and if so, what made the difference?

**Context is king.** You steer your agent by the context you give it. You paint by choosing the brush.

[Opening: Context is King](lectures/context-is-king.md)

[Personal site with guardrails](exercises/personal-site-with-guardrails.md)

[Closing: What just happened](lectures/what-just-happened.md)

## Key Concepts
- Guardrails are structured context, not a checklist
- You are the world's best evaluator of your own profile. Domain expertise IS the eval
- The guardrail IS the control: average output becomes great not because you prompted better

## Debrief

Five minutes. A retro, and **the second pass on your rules file.** You wrote the first version of `module-1/personal-brand-generation.md` at the close of the exercise, capturing what you noticed *while doing the work*. The retro is Claude reading the file against the actual session. A different lens, surfacing what landed, what fell flat, what to keep, what to drop. Two passes; the second is where the file starts compounding.

Ask Claude to walk a retro on the rules file: what landed, what didn't, what to sharpen, what to drop.

**Prompt** *(Claude Code)*

```
Read `module-1/personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, tell me in 2–3 lines: what got sharpened, what got added, what got dropped, and why. Add a couple more lines if you spotted something the rules should cover but you want me to weigh in on first.
```


Claude runs the retro and updates the file, then summarises what changed in chat. You may be surprised by how much still changes in the generation rules. First pass is pretty much never exactly right.

Push back on anything that doesn't match your sense of the work. That's the pattern: every time you do work like this and reflect, the rules file gets sharper. **Compound interest on a rule file.** This is the move you'll use on every agent file you write from here on: do the work → capture the rules → reflect → sharpen the rules. Module 2 systematises it; Module 1 lands the muscle.

**Then, Claude as cold critic.** Now that you've reflected on your own experience, get an unbiased verdict. Ask Claude to dispatch <span class="rt-code">a subagent</span><span class="rt-cowork">an agent</span> to read the site cold (you want a fresh Claude with no memory of building it):

**Prompt** *(Claude Code)*

```
Spawn a subagent to give an unbiased read on `module-1/site.html`. The subagent should read it cold, with no memory of building it.

Have the subagent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```


Compare Claude's picks to what you expected. Where cold-Claude sees generic, your context is still thin; add one more sharp detail there and regenerate. Where Claude's pick of *"uniquely you"* matches your own gut: solid ground.

## Next
You just made great output AND packaged what you learned into a file the agent can re-read next time. That's the move that compounds. Module 2 takes the same idea and systematises it (the memory, the agents, the room rules) so every future module's work builds on every previous one.

## Homework after Module 1 — before Module 2

[Module 2 prework](exercises/module-2-prework.md). Bring a live challenge on your mind, verify your Confluence and OneDrive connectors, run the <span class="rt-code">plan-mode primer</span><span class="rt-cowork">plan-first primer</span>, read Karpathy's LLM Wiki post, and scan the candidate Lindenberg memory-architecture piece if you have room.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (body touched after maintainer review; re-review needed)
- maintainer-reviewed 2026-04-29 (Antti, M1 manual cohort-prep run; read end-to-end, prompts run manually under Cowork lens)

**TODO (Cowork edition review 2026-04-29):**
- The cold-critic prompt still says "Spawn a subagent" in the Cowork edition. Prompt-block change is gated: propose a before/after and get maintainer approval before editing. Likely fix is a runtime fork or neutral prompt wording that uses "agent" for Cowork.

**Meta (trainer):**
- **Primary Bloom's level:** Apply
- **Materials (trainer):** none — the exercise is vanilla Claude Code + the student's own LinkedIn. The Debrief sharpens `module-1/personal-brand-generation.md`; Module 1 deliberately creates no `CLAUDE.md`.
- **Plug points:** participant's own LinkedIn profile — no org data needed yet

**Plug Points (trainer):**
- **The trainer's CLAUDE.md** has a default (differentiation / storytelling / framing). Variant: orgs with a brand guide can substitute. Default works on its own.

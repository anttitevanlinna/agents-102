# Getting Going

## Big Idea
With the right guardrails, you create output that's genuinely yours, not generic.

## Prework

About 30–60 min before Module 1. Set up Claude Code or Cowork. Build a snake game as HTML. Connect your calendar (M365 / Google Workspace / screenshot fallback) and save a 5-line summary of this week's meetings. Read section 1 of [What is an Agent](supplementary/what-is-an-agent.md) (LLM vs chat).

## What You'll Learn
After this module, you will be able to:
- **Generate** a real personal artifact (an HTML one-pager) using an LLM without guardrails
- **Apply** a structured guardrail and observe the effect on output quality
- **Identify** fabrication in LLM output by using your own domain knowledge as the evaluator
- **Adjust** guardrails to fix specific failure modes

## Start here

<span class="rt-code">Start a new Claude Code session at `~/Documents/agents-102-bootstrap/module-1/`. This module's work lives in that folder.</span><span class="rt-cowork">Click *New task* in the Cowork tab and select `~/Documents/agents-102-bootstrap/module-1/` as the working folder. This module's work lives in that folder.</span>

> **In-room cohort opening (self-study readers, skip to the question below).**
>
> Let's hear from your sponsor first (the CEO / CTO / SVP who brought you here). They're in the room with you, as a participant, not as a visitor. They've got one sentence in their own words: why they're here, and what they don't yet know. Something like *"I want to learn this with you, not delegate it."* No corporate kickoff, no agenda. What matters isn't the sentence. It's that your sponsor said it, out loud, before anyone else. That's the license the next seven modules run on.

**The question, to you:** when you've used ChatGPT or Claude for your own work (a bio, a pitch, a post), where did the output come out generic? Was there ever a moment where it actually felt like yours, and if so, what made the difference?

**Context is king.** You steer your agent by the context you give it. You paint by choosing the brush.

[Opening: Context is King](lectures/context-is-king.md)

[Closing: What just happened](lectures/what-just-happened.md)

[Personal site with guardrails](exercises/personal-site-with-guardrails.md)

## Key Concepts
- Guardrails are structured context, not a checklist
- You are the world's best evaluator of your own profile. Domain expertise IS the eval
- The guardrail IS the control: average output becomes great not because you prompted better

## Debrief

Five minutes. A retro, and **the second pass on your rules file.** You wrote the first version of `personal-brand-generation.md` at the close of the exercise, capturing what you noticed *while doing the work*. The retro captures what you noticed *about the work* (different lens, different rules). Two passes; the second is where the file starts compounding.

**Prompt** *(Claude Code)*

```
Read personal-brand-generation.md in this folder first. You'll need it for Q3.

Then walk me through three retro questions on the site we just built, one at a time, wait for each answer, no preamble. Just ask Q1 once you've read the file.

Q1: Which framework move landed sharpest: StoryBrand-tuned for the help section, Drucker's feedback analysis for strengths, anti-branding for voice, or the visual-steal for chrome? Which one made the site noticeably more "me"?

Q2: Where did you produce the most generic version, and what specific context fixed it?

Q3: Tell me one or two rules from the current personal-brand-generation.md that you (Claude) think are weak, missing, or wrong based on what we actually did today. Name them concretely. Quote the rule, say what's off, ask if I agree.

After my answer to Q3, UPDATE personal-brand-generation.md. Integrate the retro into the existing file (sharpen weak rules, add what's missing, remove what turned out wrong). Don't append a "retro notes" section; rewrite the file as the better version. When you're done, tell me in 2–3 lines what changed and why: the rules added, the rules sharpened, the rules removed. I shouldn't have to open the file to know.
```


Claude runs the retro and updates the file, then summarises what changed in chat. Push back on anything that doesn't match your sense of the work. That's the pattern: every time you do work like this and reflect, the rules file gets sharper. **Compound interest on a markdown file.** This is the move you'll use on every agent file you write from here on: do the work → capture the rules → reflect → sharpen the rules. Module 2 systematises it; Module 1 lands the muscle.

**Then, Claude as cold critic.** Now that you've reflected on your own experience, get an unbiased verdict. <span class="rt-code">Run `/clear` in your session to wipe the conversation (you want a fresh Claude with no memory of building the site)</span><span class="rt-cowork">Open a fresh Cowork task with `~/Documents/agents-102-bootstrap/module-1/` as the working folder (you want a fresh Claude with no memory of building the site)</span>. Then:

**Prompt** *(Claude Code)*

```
Read site.html in this folder. Two questions:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```


Compare Claude's picks to what you expected. Where cold-Claude sees generic, your context is still thin; add one more sharp detail there and regenerate. Where Claude's pick of *"uniquely you"* matches your own gut: solid ground.

## Next
You just made great output AND packaged what you learned into a file the agent can re-read next time. That's the move that compounds. Module 2 takes the same idea and systematises it (the memory, the agents, the room rules) so every future module's work builds on every previous one.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply
- **Materials (trainer):** none — the exercise is vanilla Claude Code + the student's own LinkedIn. The Debrief produces the student's first `CLAUDE.md` as an artifact they carry forward.
- **Plug points:** participant's own LinkedIn profile — no org data needed yet

**Plug Points (trainer):**
- **The trainer's CLAUDE.md** has a default (differentiation / storytelling / framing). Variant: orgs with a brand guide can substitute. Default works on its own.

# Exercise: Paint by agent with guardrails

**Time:** 45 minutes.

**Session** *(new, "Module 1 - Getting going")*

Start a new session at your training-directory root, named `m1-getting-going` if your runtime supports names.

Change the context, watch the agent's output shift, then package what you learned for the next session.

## Phase 1: The boring baseline

*5 min*

The baseline is boring on purpose, so you can feel how much later phases change.

1. **Open your own LinkedIn profile in your browser.**
2. **Select all and copy.** Cmd+A then Cmd+C on Mac, Ctrl+A then Ctrl+C on Windows. Take the whole page, headers and sidebar included. It will look messy. That's fine.
3. **Drop your LinkedIn text into the prompt below, after the colon. Send as one message.**

{{prompt:personal-site-with-guardrails-1}}

The mess is the point. If you over-curate the input now, you'll never feel how much the *later* context changes the output.

It works, but it's generic. Every later phase overwrites `module-1/site.html`.

## Phase 2: Apply a framework you know

*8 min*

The site isn't there to sell. A colleague who lands on it should think *"this is the person I want to work with more, on the things they're great at,"* not *"I should book a discovery call."*

## Name the framework and tune it

Donald Miller's **StoryBrand** fits *"what kind of help is this person to others."* Tune it: the hero is the colleague, not you. Skip the sales-funnel beats (Stakes, Call-to-Action).

The move: **name the framework, tune it, ask the agent to run it.** The LLM already knows StoryBrand, so you don't reproduce the questions. Same for Toyota Kata, SWOT, Roger Martin's strategic-choices, Jobs-to-be-Done: *"Apply X to Y, but tune for Z."*

## Keep yourself the protagonist, then run the beats

StoryBrand puts the customer in the hero slot. On the whole site, the colleague becomes the protagonist: a service site with your name in the footer. **The site stays a personal site; you stay the protagonist of the page.** Your name is in the headline and your current work front and centre. StoryBrand shapes only the colleague-help section.

Ask the agent to apply tuned StoryBrand to the help section, one beat at a time.

{{prompt:personal-site-with-guardrails-2}}

The agent walks you through the five tuned beats. Answer each in your own words, briefly; don't polish. The agent then regenerates; read the new version.

## Phase 3: Strengths

*8 min*

Your strengths shape how the whole site sounds. List 3-5 strengths, one line each.

Give the agent your strengths to regenerate the site.

{{prompt:personal-site-with-guardrails-3}}

Read the regenerated site.

## Phase 4: Anti-branding, the mirror

*8 min*

Most people can list what drives them mad at work in thirty seconds, but stall for five minutes on what they're great at. **Invert the easy thing.** Define what you're for by inverting what you're against, then make the inverted version the spine. Adam Grant calls a version of this the *energy audit*; Taleb calls it *via negativa*.

Same pattern again: **name the framework, tune it, ask the agent to run it.**

## List what you hate, then invert it

Give the agent a few specific things you hate about work. Not categories ("bureaucracy") but actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"). Vague input drifts back to the statistical-default you.

Ask the agent to apply anti-branding using your hate list.

{{prompt:personal-site-with-guardrails-4}}

Read the new version.

## Phase 5: Look back

*6 min*

You wrote it, so you'll skim past what's missing.

Ask the agent to compare versions and name three generic claims.

{{prompt:personal-site-with-guardrails-5}}

The agent is reading its own work where it wrote it, and LLMs go easy on their own output. If the three picks come back soft, ask the agent to over-flag with no charity and run it again. Or open a fresh task, paste just the Phase 1 site, and run the same prompt cold.

The three answers are generic guesses the LLM made to fill gaps: what most LinkedIn profiles of people like you say, not what is true of you.

Observe only; do not regenerate.

## Phase 6: Free iteration

*6 min*

Now make it yours. Change color, layout, tone, add a quote at the top, or a section that shouldn't exist on most sites. Iterate until you say *"yes, this is me."*

Open prompts. You drive.

**Tip: steal a look and feel by naming the site.** The LLM knows the design of famous sites by name. *"Make it look like Stripe's design language"* / *"use Linear's typography and spacing"* / *"go full Patagonia"*. Try *"Restyle `module-1/site.html` to feel like X"* with two or three sites and keep the one you like.

## Phase 7: Close, package what you learned

*4 min*

The site is done. Now capture the move, so a fresh agent can repeat it on someone else's bio without you re-explaining. Ask the agent to write your first generation rules file from what you just did.

{{prompt:personal-site-with-guardrails-6}}

Open `module-1/personal-brand-generation.md` and read the first two or three rules end to end. The chat summary rounds corners; the file is what travels and what the agent re-reads in any future personal-brand task. Push back on anything that doesn't match what you did.

## See the mechanism repeat in every phase

**What happened:**

The agent's output is shaped by the context you put ahead of the task. Your LinkedIn, colleague-guide frame, strengths and mirror-list were all context. The more specific the context, the more the output is yours.

## Take the context move past this site

**The point:**

Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You got better at feeding it the context that produces YOUR output. The same mechanism scales to business proposals, competitor analysis, compliance reviews and product strategy: anywhere the question is "is this genuinely ours or just fine?"

This was **Recipe 1**. When the next personal-shaped output needs the same move, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the moves and components.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Leap test — three observable outcomes a participant should be able to point at by Monday:**
1. A `module-1/site.html` they would happily forward to a colleague without flinching.
2. A `module-1/personal-brand-generation.md` they can invoke on the next personal-shaped writing task without retyping the framework.
3. A felt distinction between *"generic"* and *"genuinely mine"*: they can point at lines in the Phase 1 baseline and Phase 6 result and name what changed.

**Per-phase failure mode + escape hatch:**

| Phase | Forcing function | Dominant failure | Escape hatch |
|---|---|---|---|
| 1 Baseline | Paste full LinkedIn → observe generic output | Participant curates the paste so the later contrast vanishes | Re-paste the full page, including navigation and sidebar text. The mess is the point. |
| 2 StoryBrand | Walk five beats one at a time, then regenerate | One-word answers do not name the help shape | Ask for one concrete colleague example whenever an answer is generic. |
| 3 Strengths | Strengths shape the voice | Generic virtues such as *"organised"* | Ask for the strength a close colleague would name, with a moment that proves it. |
| 4 Anti-branding | Hate list inverted into voice | Categories instead of specifics | Replace each category with the actual sentence or meeting moment behind it. |
| 5 Look-back | Warm-session self-audit | Charitable picks; under-flagging | Use the body callout: over-flag with no charity, or run the audit cold in a fresh task. |
| 6 Free iteration | Iterate until *"yes, this is me"* | Perfectionism consumes the close | Time-box one last contrast, choose the version that lands, and stop. |
| 7 Close | Write the rules file | Chat summary rounds corners | Open `module-1/personal-brand-generation.md` and inspect the first two or three rules at the artifact. |

**View summary:** You paint a personal site by agent across six rounds, changing only the context each time and watching the output shift from generic to yours, then package the lesson. The artifact is a site that looks like you, and the rule that got it there.

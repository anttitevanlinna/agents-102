# Exercise: Paint by agent with guardrails

**Time:** 45 minutes.

**Session** *(new, "Module 1 - Getting going")*

Change the context, watch the output shift, then package what you learned for the next session.

## Phase 1: The boring baseline

*5 min*

1. **Open your own LinkedIn profile in your browser.**
2. **Select all for the full page and copy.** Headers and sidebar included. Messy is fine.
3. **Drop your LinkedIn text into the prompt below, after the colon. Send as one message.**

{{prompt:personal-site-with-guardrails-1}}

The first site shows how much the later context changes the output. Every later phase overwrites `module-1/site.html`.

## Phase 2: Apply a framework you know

*8 min*

The site isn't there to sell. A colleague who visits it should think *"this is the person I want to work with more, on the things they're great at."*

## Name the framework and tune it

**StoryBrand** answers *"what kind of help is this person to others?"* Its hero is the colleague, not you. Leave out its sales parts (Stakes, Call-to-Action).

**Name the framework, tune it, have the agent run it.** The LLM knows StoryBrand, so you don't need to list its questions. The same works for Toyota Kata or SWOT: *"Apply X to Y, but tune for Z."*

## Keep yourself the protagonist, then run the beats

Applied to the whole site, StoryBrand would make the colleague the main character. **This stays a personal site, and you stay its main character.** Your name is the headline and your current work is front and centre. StoryBrand shapes only the section on how you help colleagues.

{{prompt:personal-site-with-guardrails-2}}

The agent asks about five things. Answer each briefly, in your own words, without polishing. The agent then regenerates the site.

## Phase 3: Strengths

*8 min*

List 3-5 strengths, one line each. They set how the whole site sounds.

{{prompt:personal-site-with-guardrails-3}}

## Phase 4: Anti-branding, the mirror

*8 min*

Most people can list what drives them mad at work in thirty seconds, but stall on what they're great at. **Invert the easy thing.** Define what you're for by inverting what you're against. Taleb calls it *via negativa*.

**Name the framework, tune it, ask the agent to run it.**

## List what you hate, then invert it

List a few specific things you hate about work. Name actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"), not categories ("bureaucracy"). Vague input gives you a generic page again.

{{prompt:personal-site-with-guardrails-4}}

## Phase 5: Look back

*6 min*

The Debrief starts from the file the agent writes here. The agent asks you one question and waits for your answer.

{{prompt:personal-site-with-guardrails-5}}

The agent finds three generic claims, where your context ran out, and traces three lines to the context that produced them. Your answer, what you gave the agent that changed the page most, becomes the last line of `module-1/context-trace.md`.

LLMs go easy on their own output. If the three picks seem mild, ask the agent to flag more and be harsher.

## Phase 6: Free iteration

*6 min*

Make it yours: color, layout, tone, a quote at the top, a section most sites lack. Iterate until you say *"yes, this is me."* You lead, with no set prompts.

**Tip: steal a look and feel by naming a site.** The LLM knows famous sites' design by name. Try *"Restyle `module-1/site.html` to feel like X"* with two or three sites, such as Stripe, Linear or Patagonia, and keep your favorite.

## Phase 7: Close, package what you learned

*4 min*

Have the agent save what worked, so a fresh agent can do the same for someone else's bio.

{{prompt:personal-site-with-guardrails-6}}

Ask the agent to show you the first two or three rules in `module-1/personal-brand-generation.md`. A future agent reads this file when a personal-brand task points to it. Push back on any rule that doesn't match what you did.

## See the mechanism repeat in every phase

**What happened:**

In every phase the agent read everything in the session: your LinkedIn text, your answers, your strengths, the things you hate and the site it wrote last. The more specific the context, the more the output is yours.

## Take the context move past this site

**The point:**

The LLM didn't get better between Phase 1 and Phase 6. The context did. The same mechanism works for business proposals, competitor analysis and product strategy.

This was **Recipe 1**. When the next output needs the same move, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the moves and components.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (story@78d17fc9 technical@42b9610a behavior@42b9610a pedagogy@78d17fc9 strategy@78d17fc9 slides@42b9610a)
- judges @42b9610a: writing REVISE (1/10 see instances/agents-101--exercise--personal-site-with-guardrails.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS (1 finding see instances/agents-101--exercise--personal-site-with-guardrails.slides.json)

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

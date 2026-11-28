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

The first site shows how much the later context changes the output. Every later phase overwrites `module-1/site.html`. The copy stays for the look back.

## Phase 2: Anti-branding, the mirror

*8 min*

Most people can list what drives them mad at work in thirty seconds, but stall on what they're great at. **Invert the easy thing.** Define what you're for by inverting what you're against. Taleb calls it *via negativa*.

## List what you hate, then invert it

List a few specific things you hate about work. Name actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"), not categories ("bureaucracy"). Vague input gives you a generic page again.

{{prompt:personal-site-with-guardrails-2}}

## Phase 3: Say who the site is for

*5 min*

The site isn't there to sell. A colleague who visits it should think *"this is the person I want to work with more, on the things they're great at."*

Seth Godin positions a product with one line: *"this is for people who believe ___."* **Name the framework, tune it, have the agent run it.** The LLM knows Godin's line, so the prompt only names it. The same works for Toyota Kata or SWOT: *"Apply X to Y, but tune for Z."*

## Finish Godin's line with what you believe

Say in one sentence what you believe about work. A rough try is enough. The agent offers three sharper versions and waits: pick one, or say it your own way.

{{prompt:personal-site-with-guardrails-3}}

## Phase 4: Strengths

*8 min*

List 3-5 strengths, one line each. They set what the site claims about you.

{{prompt:personal-site-with-guardrails-4}}

## Phase 5: Look back

*8 min*

The agent puts your first site beside your site now, then asks you one question and waits. Open `module-1/look-back.html` before you answer.

{{prompt:personal-site-with-guardrails-5}}

On the first site the agent marks three generic claims, where your context ran out. On the current one it traces three lines to the context that produced them. Your answer, what you gave the agent that changed the page most, becomes the last line of `module-1/context-trace.md`. The Debrief starts from that file.

LLMs go easy on their own output. If the three picks seem mild, ask the agent to flag more and be harsher.

## Phase 6: Free iteration

*7 min*

Make it yours: color, layout, tone, a quote at the top, a section most sites lack. Iterate until you say *"yes, this is me."* You lead, with no set prompts.

**Tip: steal a look and feel by naming a site.** The LLM knows famous sites' design by name. Try *"Restyle `module-1/site.html` to feel like X"* with two or three sites, such as Stripe, Linear or Patagonia, and keep your favorite.

## Phase 7: Close, package what you learned

*4 min*

Have the agent save what worked, so a fresh agent can do the same for someone else's bio.

{{prompt:personal-site-with-guardrails-6}}

A future agent reads this file when a personal-brand task points to it. Push back on any rule that doesn't match what you did.

## See the mechanism repeat in every phase

**What happened:**

In every phase the agent read everything in the session: your LinkedIn text, the things you hate, what you believe, your strengths and the site it wrote last. The more specific the context, the more the output is yours.

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
| 2 Anti-branding | Hate list inverted into voice | Categories instead of specifics | Replace each category with the actual sentence or meeting moment behind it. |
| 3 Belief | Rough try at Godin's line; the agent offers three sharper versions and waits | Participant takes the first offered version without owning it | Ask which version a colleague would know them by, or have them say it their own way. |
| 4 Strengths | Strengths set the claims | Generic virtues such as *"organised"* | Ask for the strength a close colleague would name, with a moment that proves it. |
| 5 Look-back | First site beside the current one, then one question | Charitable picks; under-flagging; answering before opening `module-1/look-back.html` | Use the body callout: over-flag with no charity. Have them open the page first. |
| 6 Free iteration | Iterate until *"yes, this is me"* | Perfectionism consumes the close | Time-box one last contrast, choose the version that lands, and stop. |
| 7 Close | Write the rules file | Chat summary rounds corners | The reply shows the three strongest rules; push back on one. |

**Context phases repaint the whole page (Antti 2026-11-28: "The LLM is the paintbrush. The point is making the student creative.").** Hate list, belief (Godin's line) and strengths each rewrite `module-1/site.html` whole; no prompt names a section, and the exercise runs no interview framework. Sonnet, one persona, 4 chains in sessions with no operator memory, one of them in the course runner: the belief became the headline 4 of 4 and got no section 4 of 4. From the belief on, the headline is the belief and the name sits above it; Phase 6 is where a participant changes that.

**The learner judges from the work.** Phase 1 keeps `module-1/first-site.html`; Phase 5 builds `module-1/look-back.html` (first site beside the current one) before the question; the cold read asks for the learner's picks before the critic's. The belief prompt waits for the learner's answer on three offered versions: with the offer and the wait the agent left the page alone until the answer came (4 of 4); a help line with no wait made it write the belief itself (3 of 3, in sessions that could see operator memory).

**View summary:** You paint a personal site by agent across six rounds, changing only the context each time and watching the output shift from generic to yours, then package the lesson. The artifact is a site that looks like you, and the rule that got it there.

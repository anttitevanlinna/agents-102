# Exercise: Paint by agent with guardrails

**Time:** 45 minutes. Banter expected.

**Session** *(new, "Module 1 - Getting going")*

Start a new session or task at your training-directory root.

Name it `m1-getting-going` if your runtime supports session names.

**What you do:**

The site is the canvas. The real move is iterate and learn: change the context, watch the agent's output shift, then package what you learned so the next session starts smarter.

## Phase 1: The boring baseline

*5 min*

The baseline is boring on purpose. You need it boring so you can feel how much the later phases change.

Three small steps:

1. **Open your LinkedIn profile in your browser.** The page with your photo, headline, About, Experience, Education, the lot. Your own profile, not someone else's.
2. **Select all and copy.** Cmd+A then Cmd+C on Mac, Ctrl+A then Ctrl+C on Windows. Yes, the whole page (headers, navigation, the recommendations sidebar, all of it). It will look like a wall of text. That's fine. The agent reads through it.
3. **Drop your LinkedIn text into the prompt below, after the colon. Send as one message.**

{{prompt:personal-site-with-guardrails-1}}

The mess is the point. The agent sorts the signal from the page chrome. If you over-curate the input now, you'll never feel how much the *later* context changes the output.

Watch the result. It works. It looks okay. It's also generic. The site a competent LLM produces from a résumé when it doesn't know what matters. Every later phase overwrites `module-1/site.html`, so the latest version always lives at that path.

## Phase 2: Apply a framework you know

*8 min*

The goal of this site isn't to sell anything. It's the opposite: when a colleague (yours, or a peer outside the company you'd happily work with) lands on it, they should think *"this is the person I want to work with more, on the things they're great at."* Not *"I should book a discovery call."* A colleague relationship, not a sales funnel.

## Name the framework and tune it

Donald Miller's **StoryBrand** is the obvious framework for *"what kind of help is this person to others."* Half of LinkedIn uses it, and it shows, badly, because most consultants run StoryBrand straight as a sales pitch. We'll invoke it explicitly AND **tune** it: the hero isn't you, it's the colleague. Skip the sales-funnel beats (Stakes, Call-to-Action). What's left is the part that actually says *"I'm the greatest colleague ever; let's work more together."*

Notice the move you're about to make: **name the framework, tune it, ask the agent to run it.** The LLM already knows StoryBrand. You don't have to reproduce the questions. Same trick for Toyota Kata, SWOT, Roger Martin's strategic-choices, Jobs-to-be-Done. *"Apply X to Y, but tune for Z."* That's the move. Module 1 starts here; you'll use it everywhere.

## Keep yourself the protagonist, then run the beats

One trap to name first. StoryBrand puts the customer in the hero slot. If you let it take over the *whole site*, the colleague becomes the protagonist of the page, and you get a service site with your name in the footer. Wrong shape. **The site stays a personal site; you stay the protagonist of the page.** StoryBrand shapes the *colleague-help section*, not the architecture. Your name in the headline; your actual current work front and centre; the StoryBrand tune is the texture of how you describe the help, not the page's spine.

One liners and short answers usually give enough clue. Make it quick and iterate.

Ask the agent to apply tuned StoryBrand to the help section, one beat at a time.

{{prompt:personal-site-with-guardrails-2}}

The agent walks you through the five tuned beats. Answer each in your own words; don't polish. After the last answer, the agent regenerates. Read the new version. Same framework half of LinkedIn uses, retuned for *"let's work more together,"* with you still the subject of the page.

## Phase 3: Strengths

*8 min*

Your strengths shape how the whole site sounds. List 3-5 in one line each; the agent takes the rest from there.

Tell the agent your strengths and have it regenerate the site.

{{prompt:personal-site-with-guardrails-3}}


Read the regenerated site. Same StoryBrand spine, sharper because the site now sounds like someone with your specific strengths.

## Phase 4: Anti-branding, the mirror

*8 min*

Complaining is easier than praising. Most people can list what drives them mad at work in thirty seconds; the same people will stall for five minutes if asked what they're great at. The fix isn't to try harder on the praise; it's to **invert the easy thing**. **Anti-branding.** Adam Grant calls a version of this the *energy audit*; Patagonia famously did *"Don't Buy This Jacket"*; Taleb calls it *via negativa*. Same move: define what you're for by inverting what you're against. Then make the inverted version the spine.

Same agentic pattern again: **name the framework, tune it, ask the agent to run it.** Second time you're using it in this exercise; at this point it's a move you own.

## List what you hate, then invert it

Give the agent a few specific things you hate about work. Not categories ("bureaucracy," "vague strategy") but the actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"). Rough beats polished. The vaguer the input, the more the output drifts back to statistical-default you.

Ask the agent to apply anti-branding using your hate list.

{{prompt:personal-site-with-guardrails-4}}


Read the new version. The site gets sharper. Two frameworks now layered: StoryBrand for the help relationship, anti-branding for the voice. Plus your strengths shaping how the whole site sounds. That's the move.

## Phase 5: Look back

*6 min*

Reading the old version yourself would take ten minutes and probably reveal nothing. You wrote it, so you'll skim past what's missing.

Ask the agent to compare versions and name three generic claims.

{{prompt:personal-site-with-guardrails-5}}

One thing to know: the agent is reading its own work in the chat where it just wrote it. That's a warm-session self-audit, and the LLM tends to be lovely about its own prior output. If the three picks come back soft (*"could be a touch more specific,"* not *"this whole line is wrong"*), ask the agent to over-flag with no charity and run it again. Or open a fresh task, paste just the Phase 1 site cold, and run the same prompt without the rest of the context riding along. Cold reads catch sharper picks.


Read the agent's three answers. Those are the LLM filling in gaps with generic guesses: what most LinkedIn profiles of people like you look like, not what's actually true of you. Not a bug. It's what happens when context is thin. Context fixed it. You'll meet this mechanism again in Module 5 when the stakes are higher.

No regeneration in this phase. Just observation.

## Phase 6: Free iteration

*6 min*

Now make it yours. Color, layout, tone, a quote at the top, a section that shouldn't exist on most sites but does on yours because the rest of you doesn't fit a template either. Iterate until looking at the screen makes you say *"yes, this is me."*

Open prompts. You drive.

**Tip: steal a look and feel by naming the site.** The LLM knows the design DNA of famous sites by name. *"Make it look like Stripe's design language"* / *"use Linear's typography and spacing"* / *"make it feel like Anthropic.com"* / *"go full Patagonia (earthy, no-nonsense, lots of white space)"* / *"channel Craigslist if Craigslist had taste"*. All valid one-line moves. You don't need to know CSS; you need to know the site whose feel you'd happily borrow. Same agentic move as the frameworks: name the reference, ask the agent to apply it. *"Restyle `module-1/site.html` to feel like X."* Try two or three, keep the one that lands.

## Phase 7: Close, package what you learned

*4 min*

The site is done. The agent behavior is not. What's left is to *capture the move* so you can do it again on someone else's bio next week, without re-explaining everything to a fresh agent. You'll write the first version of a generation rules file from what you just did. The retro (in the Debrief that follows) will sharpen it. Two passes; the second is where the file starts compounding.

Ask the agent to write your first generation rules file.

{{prompt:personal-site-with-guardrails-6}}


The agent writes the file and summarises in chat. Read the summary, then open `module-1/personal-brand-generation.md` and inspect the first two or three rules end to end. The chat summary rounds corners; the file is the thing that travels. Push back on anything in the file that doesn't match what you actually did. That's your first packaged agent behavior: text the model can re-read at the start of any future personal-brand task. Different scope from the root instructions file you'll meet in Module 2, same fundamental mechanism: instructions in a file.

## See the mechanism repeat in every phase

**What happened:**

Phase 1 is fine. Phase 6 is yours. The mechanism is the same every phase. The agent's output is shaped by what you put in the context ahead of the task. Your LinkedIn was context. Your colleague-guide frame was context. Your strengths were context. Your mirror-list was context. The more specific the context, the more genuinely "you" the output.

That's the whole of Module 1's big idea, proven with your own name on it.

## Take the context move past this site

**The point:**

Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You did. You became better at feeding it what it needs to produce YOUR output instead of everyone-else's. The same mechanism scales: business proposals, competitor analysis, compliance reviews, product strategy. Anything where output quality depends on "is this genuinely ours or just fine?"

You just ran **Recipe 1** end-to-end: baseline without context, colleague-as-buyer frame, anti-branding mirror, free iteration loop, portable guardrails file at the close. After Agents 101, when the next personal-shaped output asks for the same move, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) is where the moves and components live without the training scaffolding.

<!-- maintainer -->

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

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

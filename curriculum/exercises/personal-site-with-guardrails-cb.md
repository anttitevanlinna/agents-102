# Exercise: Paint by agent with guardrails

**Time:** 60–90 minutes. Banter expected.

**Session** *(new Cowork task, "Paint by agent with guardrails")*

Start a new Cowork task with your personal homework folder as the working folder. The one you used for the build-and-verify homework is fine, or open a fresh one.

**What you do:**

The site is the canvas. The real move is iterate and learn: change the context, watch the agent's output shift, then package what you learned so the next run starts smarter. By the end, you have a personal site you actually like AND a small rules file the agent can re-read on any future personal-shaped task.

**Phase 1. The boring baseline.**

The baseline is boring on purpose. You need it boring so you can feel how much the later phases change.

Three small steps:

1. **Open your LinkedIn profile in your browser.** The page with your photo, headline, About, Experience, Education, the lot. Your own profile, not someone else's.
2. **Select all and copy.** Cmd+A then Cmd+C on Mac, Ctrl+A then Ctrl+C on Windows. Yes, the whole page (headers, navigation, the recommendations sidebar, all of it). It will look like a wall of text. That's fine. Claude reads through it.
3. **Drop your LinkedIn text into the prompt below, after the colon. Send as one message.**

**Prompt** *(Cowork)*

```
Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `site.html`.

LinkedIn:
```

The mess is the point. Claude sorts the signal from the page chrome. If you over-curate the input now, you'll never feel how much the *later* context changes the output.

Watch the result. It works. It looks okay. It's also generic. The site a competent LLM produces from a résumé when it doesn't know what matters. Every later phase overwrites `site.html`, so the latest version always lives at that path.

**Phase 2. Apply a framework you know.**

The goal of this site isn't to sell anything. It's the opposite: when a colleague (yours, or a peer outside the company you'd happily work with) lands on it, they should think *"this is the person I want to work with more, on the things they're great at."* Not *"I should book a discovery call."* A colleague relationship, not a sales funnel.

Donald Miller's **StoryBrand** is the obvious framework for *"what kind of help is this person to others."* Half of LinkedIn uses it, and it shows, badly, because most consultants run StoryBrand straight as a sales pitch. You'll invoke it explicitly AND **tune** it: the hero isn't you, it's the colleague. Skip the sales-funnel beats (Stakes, Call-to-Action). What's left is the part that actually says *"I'm the greatest colleague ever; let's work more together."*

Notice the move you're about to make: **name the framework, tune it, ask Claude to run it.** The model already knows StoryBrand. You don't have to reproduce the questions. Same trick for Toyota Kata, SWOT, Roger Martin's strategic-choices, Jobs-to-be-Done. *"Hey Claude, apply X to Y, but tune for Z."* That's the move.

One trap to name first. StoryBrand puts the customer in the hero slot. If you let it take over the *whole site*, the colleague becomes the protagonist of the page, and you get a service site with your name in the footer. Wrong shape. **The site stays a personal site; you stay the protagonist of the page.** StoryBrand shapes the *colleague-help section*, not the architecture. Your name in the headline; your actual current work front and centre; the StoryBrand tune is the texture of how you describe the help, not the page's spine.

One liners and short answers usually give enough clue. Make it quick and iterate.

Ask Claude to apply tuned StoryBrand to the help section, one beat at a time.

**Prompt** *(Cowork)*

```
Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.

Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.

Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).

Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.

Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.
```

Claude walks you through the five tuned beats. Answer each in your own words; don't polish. After the last answer, Claude regenerates. Read the new version. Same framework half of LinkedIn uses, retuned for *"let's work more together,"* with you still the subject of the page.

**Phase 3. Strengths.**

Your strengths shape how the whole site sounds. List 3–5 in one line each, Claude takes the rest from there.

Tell Claude your strengths and have it regenerate the site.

**Prompt** *(Cowork)*

```
Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.

Then regenerate `site.html`.

My 3-5 strengths are:
```

Read the regenerated site. Same StoryBrand spine, sharper because the site now sounds like someone with your specific strengths.

**Phase 4. Anti-branding (the mirror).**

Complaining is easier than praising. Most people can list what drives them mad at work in thirty seconds; the same people will stall for five minutes if asked what they're great at. The fix isn't to try harder on the praise; it's to **invert the easy thing**. **Anti-branding.** Adam Grant calls a version of this the *energy audit*; Patagonia famously did *"Don't Buy This Jacket"*; Taleb calls it *via negativa*. Same move: define what you're for by inverting what you're against. Then make the inverted version the spine.

Same agentic pattern again: **name the framework, tune it, ask Claude to run it.** Second time you're using it in this exercise; at this point it's a move you own.

Give Claude a few specific things you hate about work. Not categories ("bureaucracy," "vague strategy") but the actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"). Rough beats polished. The vaguer the input, the more the output drifts back to statistical-default you.

Ask Claude to apply anti-branding using your hate list.

**Prompt** *(Cowork)*

```
Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
1. Take the hate.
2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.

After step 4, regenerate `site.html`. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.

Then take maximum freedom on presentation: rethink the page so a colleague lands on it and instantly wants to spend more time with you. You decide structure, ordering, sections, visual rhythm — whatever makes the page actually land. Keep the substance (StoryBrand-tuned help, strengths shaping the voice, anti-branding edge); free hand on the rest.

My hate list:
```

Read the new version. The site gets sharper. Two frameworks now layered: StoryBrand for the help relationship, anti-branding for the voice. Plus your strengths shaping how the whole site sounds. That's the move.

**Phase 5. Look back.**

Reading the old version yourself would take ten minutes and probably reveal nothing. You wrote it, so you'll skim past what's missing.

Ask Claude to compare versions and name three generic claims.

**Prompt** *(Cowork)*

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```

One thing to know: Claude is reading its own work in the chat where it just wrote it. That's a warm-session self-audit, and the LLM tends to be lovely about its own prior output. If the three picks come back soft (*"could be a touch more specific,"* not *"this whole line is wrong"*), there are two easy moves. Ask Claude to over-flag, no charity, run it again. Or open a fresh Cowork session, paste just the Phase 1 site cold, and run the same prompt without the rest of the context riding along. Cold reads catch sharper picks. Either works; both are quick.

Read Claude's three answers. Those are the LLM filling in gaps with statistical defaults. What most LinkedIn profiles of people like you look like, not what's actually true of you. Not a bug. It's what happens when context is thin. Context fixed it. You'll meet this mechanism again wherever the stakes are higher in your own work, the more it matters that the output is yours, the more the context has to be.

No regeneration in this phase. Just observation.

**Phase 6. Free iteration.**

Now make it yours. Color, layout, tone, a quote at the top, a section that shouldn't exist on most sites but does on yours because the rest of you doesn't fit a template either. Iterate until looking at the screen makes you say *"yes, this is me."*

Open prompts. You drive.

**Tip: steal a look and feel by naming the site.** Claude knows the design DNA of famous sites by name. *"Make it look like Stripe's design language"* / *"use Linear's typography and spacing"* / *"make it feel like Anthropic.com"* / *"go full Patagonia (earthy, no-nonsense, lots of white space)"* / *"channel Craigslist if Craigslist had taste"*. All valid one-line moves. You don't need to know CSS; you need to know the site whose feel you'd happily borrow. Same agentic move as the frameworks: name the reference, ask Claude to apply it. *"Hey Claude, restyle `site.html` to feel like X."* Try two or three, keep the one that lands.

**Close. Package what you learned.**

The site is done. The agent behavior is not. What's left is to *capture the move* so you can do it again on someone else's bio next week, without re-explaining everything to a fresh Claude. You'll write the first version of a generation rules file from what you just did. The retro (in the Debrief that follows) will sharpen it. Two passes; the second is where the file starts compounding.

Ask Claude to write your first generation rules file.

**Prompt** *(Cowork)*

```
Write a generation rules file at `personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.
```

Claude writes the file and summarises in chat. Read the summary, then open `personal-brand-generation.md` and look at the first two or three rules end-to-end. The chat summary rounds corners; the file is the thing that travels. If a rule in the file doesn't match what you actually did, push back and have Claude rewrite it. The first packaged agent behaviour of your own, sitting in your own folder, ready to be reused. Different from CLAUDE.md (the working-agreement file you've seen in the live demo and homework). Same fundamental mechanism: instructions in a file. A genuinely good thing to have.

**What happened:**

Phase 1 is fine. Phase 6 is yours. The mechanism is the same every phase. The agent's output is shaped by what you put in the context ahead of the task. Your LinkedIn was context. Your colleague-guide frame was context. Your strengths were context. Your mirror-list was context. The more specific the context, the more genuinely "you" the output.

That's the whole of this exercise's big idea, proven with your own name on it.

**The point:**

Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You did. You became better at feeding it what it needs to produce YOUR output instead of everyone-else's. The same mechanism scales: rollout briefings, policy summaries, vendor reviews, internal answers about Claude. Anything where output quality depends on *"is this genuinely ours or just fine?"*

You just ran a recipe end-to-end: baseline without context, colleague-as-buyer frame, anti-branding mirror, free iteration loop, portable guardrails file at the close. The move travels, any personal-shaped output (a colleague's bio, a team page, a client one-pager) earns a rules file in the same shape.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-21 (writing@304f061 pedagogy@304f061 strategy@304f061)
- judges @304f061: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS

**Source:** `curriculum/exercises/personal-site-with-guardrails.md` (Agents 101 M1 canonical exercise). This `-cb` port adds rule-31 / rule-50 / rule-47 / rule-45 fixes for the Claude Basics bonus M4. The Agents 101 source file still carries the unfixed shape, see `pre-cohort-todos.md` for source-side tracking.

**Leap test — three observable outcomes a participant should be able to point at by Monday:**
1. A `site.html` they would happily forward to a colleague without flinching.
2. A `personal-brand-generation.md` they can invoke on the next personal-shaped writing task without retyping the framework, a portable agent guideline they own.
3. A felt distinction between *"generic"* and *"genuinely mine,"* not a theoretical one. They can point at lines in the Phase 1 baseline and lines in the Phase 6 result and name what changed.

**Per-phase failure mode + escape hatch:**

| Phase | Forcing function | Dominant failure | Escape hatch |
|---|---|---|---|
| 1 Baseline | Paste full LinkedIn → observe generic output | Participant curates the LinkedIn paste (drops the page chrome, edits the bullets) so Phase 4 contrast vanishes later | Ask them to re-paste the full page, including the navigation and sidebar text. The mess is the point. |
| 2 StoryBrand | Walk five beats one at a time, then regenerate | One-word answers that don't actually name the help shape | Ask Claude to push back and ask for a concrete example whenever the answer is generic. |
| 3 Strengths | Strengths shape the voice | Three strengths that don't differentiate (*"good listener,"* *"organised"*) | Suggest the strength a colleague would name about them, not the LinkedIn-bullet kind. |
| 4 Anti-branding | Hate list inverted into voice | Categories instead of specifics (*"bureaucracy,"* *"vague strategy"*) | Replace each category with the actual sentence that lives behind it. |
| 5 Look-back | Claude audits Claude (warm-session self-audit) | Charitable picks; under-flagging | Body callout already names the move: ask for over-flag, or paste the Phase 1 site cold into a fresh Cowork session. |
| 6 Free iteration | Iterate until *"yes, this is me"* | Runs long; perfectionism takes over | Set a 20-minute timer; pick the version that lands and stop. |
| Close | Write the rules file | Claude rounds corners in the chat summary | Body callout names the move: open the file and read the first two rules end-to-end. |

**Deferred to first-cohort delivery:**
- Live-cohort timing (the per-phase budgets above are self-study estimates; live-cohort timing TBD after first run).
- Cowork setup prerequisites confirmation in cohort prework checklist.

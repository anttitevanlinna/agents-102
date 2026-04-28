# Exercise: Personal site with *guardrails*

**What you do:**

**Phase 1. The boring baseline.**

The baseline is boring on purpose. You need it boring so you can feel how much the later phases change. Don't skip it, even if your instinct is "I know what's coming."

Three small steps:

1. **Open your LinkedIn profile in your browser.** The page with your photo, headline, About, Experience, Education, the lot. Your own profile, not someone else's.
2. **Select all and copy.** Cmd+A then Cmd+C on Mac, Ctrl+A then Ctrl+C on Windows. Yes, the whole page (headers, navigation, the recommendations sidebar, all of it). It will look like a wall of text. That's fine. Claude reads through it.
3. <span class="rt-code">**Paste it into your Claude Code session, then send this prompt right after** (in the same message, or as the next one):</span><span class="rt-cowork">**Paste it into your Cowork task, then send this prompt right after** (in the same message, or as the next one):</span>

**Prompt** *(Claude Code, after pasting your LinkedIn)*

```
Build me a personal HTML one-pager site from the LinkedIn profile above. Save it as site.html in the current folder.
```

The mess is the point. Claude sorts the signal from the page chrome. If you over-curate the input now, you'll never feel how much the *later* context changes the output.

Watch the result. It works. It looks okay. It's also generic. The site a competent LLM produces from a résumé when it doesn't know what matters. Every later phase overwrites `site.html`, so the latest version always lives at that path.

**Phase 2. Apply a framework you know.**

The goal of this site isn't to sell anything. It's the opposite: when a colleague (yours, or a peer outside the company you'd happily work with) lands on it, they should think *"this is the person I want to work with more, on the things they're great at."* Not *"I should book a discovery call."* A colleague relationship, not a sales funnel.

Donald Miller's **StoryBrand** is the obvious framework for *"what kind of help is this person to others."* Half of LinkedIn uses it, and it shows, badly, because most consultants run StoryBrand straight as a sales pitch. We'll invoke it explicitly AND **tune** it: the hero isn't you, it's the colleague. Skip the sales-funnel beats (Stakes, Call-to-Action). What's left is the part that actually says *"I'm the greatest colleague ever; let's work more together."*

Notice the move you're about to make: **name the framework, tune it, ask Claude to run it.** The model already knows StoryBrand. You don't have to reproduce the questions. Same trick for Toyota Kata, SWOT, Roger Martin's strategic-choices, Jobs-to-be-Done. *"Hey Claude, apply X to Y, but tune for Z."* That's the move. Module 1 starts here; you'll use it everywhere.

One trap to name first. StoryBrand puts the customer in the hero slot. If you let it take over the *whole site*, the colleague becomes the protagonist of the page, and you get a service site with your name in the footer. Wrong shape. **The site stays a personal site; you stay the protagonist of the page.** StoryBrand shapes the *colleague-help section*, not the architecture. Your name in the headline; your actual current work front and centre; the StoryBrand tune is the texture of how you describe the help, not the page's spine.

**Prompt** *(Claude Code)*

```
Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.

Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.

Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).

Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.

Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate site.html — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.
```

Claude walks you through the five tuned beats. Answer each in your own words; don't polish. After the last answer, Claude regenerates. Read the new version. Same framework half of LinkedIn uses, retuned for *"let's work more together,"* with you still the subject of the page.

**Phase 3. Strengths, the way Drucker would find them.**

*"What am I great at?"* is a terrible question. Most people freeze on it, even people who are great at things. Peter Drucker's answer in **"Managing Oneself"** is to invert it: you don't introspect for strengths, you look at the **evidence**. Projects where things went unusually well, with you in them. The strengths are reverse-engineered from results. Concrete-to-abstract beats abstract-to-concrete every time.

Same agentic move: **name the framework, ask Claude to run it.** *"Hey Claude, apply Drucker's feedback analysis to this story."* The model knows Drucker; you don't have to explain it.

**Prompt** *(Claude Code)*

```
Hey Claude — apply Peter Drucker's feedback analysis from "Managing Oneself" to my personal site. I'll tell you about one project from the last 12 months where things went unusually well — what we were trying to do, what I actually did in it, and what shipped. Ask me one question at a time if you need more — but don't grill me; the rough first telling is what we work with.

Then YOU infer the three strengths the story reveals. Not "leadership" or "communication" — specific ones, the kind only this story's shape would surface. Show me the three before you do anything else; I'll tell you which one is most true and which is least.

Then regenerate site.html using those strengths as voice-shaping context — letting them change what the help section CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge in the inferred strengths; don't soften them into virtues.
```


Tell Claude about the project. Let it infer the strengths. Push back on the ones that miss. Read the regenerated site. Same StoryBrand spine, sharper because the strengths are evidence-derived rather than self-reported.

**Phase 4. Look back.**

Reading the old version yourself would take ten minutes and probably reveal nothing. You wrote it, so you'll skim past what's missing. Better plan: ask Claude to do the comparison.

**Prompt** *(Claude Code)*

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```


Read Claude's three answers. Those are the LLM filling in gaps with statistical defaults. What most LinkedIn profiles of people like you look like, not what's actually true of you. Not a bug. It's what happens when context is thin. Context fixed it. You'll meet this mechanism again in Module 5 when the stakes are higher.

No regeneration in this phase. Just observation.

**Phase 5. Anti-branding (the mirror).**

Complaining is easier than praising. Most people can list what drives them mad at work in thirty seconds; the same people will stall for five minutes if asked what they're great at. The fix isn't to try harder on the praise; it's to **invert the easy thing**. **Anti-branding.** Adam Grant calls a version of this the *energy audit*; Patagonia famously did *"Don't Buy This Jacket"*; Taleb calls it *via negativa*. Same move: define what you're for by inverting what you're against. Then make the inverted version the spine.

Same agentic pattern again: **name the framework, tune it, ask Claude to run it.** This is the third time you're using it in one exercise; at this point it's a move you own.

Give Claude a few specific things you hate about work. Not categories ("bureaucracy," "vague strategy") but the actual things ("meetings where nobody disagrees," "decks where every page says 'iterating'"). Rough beats polished. The vaguer the input, the more the output drifts back to statistical-default you.

**Prompt** *(Claude Code, then paste your hate list right after)*

```
Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
1. Take the hate.
2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.

After step 4, regenerate site.html — keep me as the protagonist, keep the StoryBrand-tuned help section, keep the Drucker-derived strengths. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.

My hate list:
```


Read the new version. The site gets sharper. Three frameworks now layered: StoryBrand for the help relationship, Drucker for the strengths, anti-branding for the voice. Each one applied by name. That's the move.

**Phase 6. Free iteration.**

Now make it yours. Color, layout, tone, a quote at the top, a section that shouldn't exist on most sites but does on yours because the rest of you doesn't fit a template either. Iterate until looking at the screen makes you say *"yes, this is me."*

Open prompts. You drive.

**Tip: steal a look and feel by naming the site.** Claude knows the design DNA of famous sites by name. *"Make it look like Stripe's design language"* / *"use Linear's typography and spacing"* / *"make it feel like Anthropic.com"* / *"go full Patagonia (earthy, no-nonsense, lots of white space)"* / *"channel Craigslist if Craigslist had taste"*. All valid one-line moves. You don't need to know CSS; you need to know the site whose feel you'd happily borrow. Same agentic move as the frameworks: name the reference, ask Claude to apply it. *"Hey Claude, restyle site.html to feel like X."* Try two or three, keep the one that lands.

**Close. Package what you learned.**

The site is done. What's left is to *capture the move* so you can do it again on someone else's bio next week, without re-explaining everything to a fresh Claude. You'll write the first version of a generation rules file from what you just did. The retro (in the Debrief that follows) will sharpen it. Two passes; the second is where the file starts compounding.

**Prompt** *(Claude Code)*

```
Write a generation rules file at personal-brand-generation.md in this folder — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, Drucker's feedback analysis for strengths, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.
```


Claude writes the file and summarises in chat. Push back on anything that doesn't match what we actually did. That's your first packaged agent: text the model can re-read at the start of any future personal-brand task. Different name from CLAUDE.md (you'll meet that in Module 2), same fundamental mechanism: instructions in a file.

**What happens:**

Phase 1 is fine. Phase 6 is yours. The mechanism is the same every phase. Claude's output is shaped entirely by what you put in the context ahead of the task. Your LinkedIn was context. Your colleague-guide frame was context. Your strengths were context. Your mirror-list was context. The more specific the context, the more genuinely "you" the output.

That's the whole of Module 1's big idea, proven with your own name on it.

**The point:**

Generic output comes from generic context. The LLM didn't get better between Phase 1 and Phase 6. You did. You became better at feeding it what it needs to produce YOUR output instead of everyone-else's. The same mechanism scales: business proposals, competitor analysis, compliance reviews, product strategy. Anything where output quality depends on "is this genuinely ours or just fine?"

**Time:** 45 minutes. Banter expected.

<!-- maintainer -->

**Deferred per student-facing-first rule:**
- Facilitator notes: watch-fors (generic Phase 2 answers; Phase 3 strengths that don't serve anyone specific; Phase 5 hate-list that doesn't flip cleanly), decision points, per-phase timings (Phase 6 free iteration tends to run long), Claude Code setup prerequisites.

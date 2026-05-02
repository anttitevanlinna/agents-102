# Scrollback — bootstrap-m1 verbatim actor

## Phase 1 — Baseline

### Prompt 001

> Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `module-1/site.html`.
>
> LinkedIn:

**Student input (LinkedIn paste):**
> Senior eng lead, ten years building product. Last role: head of platform at a 200-person SaaS.

**Response:** Generated minimal valid HTML one-pager with headline, About, Experience, Education sections. Saved to site.html and backed up as v1-baseline.

---

## Phase 2 — StoryBrand

### Prompt 002

> Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.
>
> Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.
>
> Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).
>
> Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.
>
> Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `module-1/site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.

#### Beat 1 — Character

Got it. Let me start with Character. Who is the colleague you want to work with more closely? What level are they at, what's their role or context?

**Student input (substituted):**
> **Character:** A senior engineer or eng manager at a 40–200-person tech org.

#### Beat 2 — Problem

**Problem (what work they're stuck on or want more of, that I see clearly):**

What's the work they're struggling with or want to do more of? What gap do you see in how they're operating?

**Student input (substituted):**
> **Problem:** They're building something that already exists half-built somewhere.

#### Beat 3 — Guide

**Guide (what makes me their natural ally):**

What's your specific track record or point of view that makes you the person who *gets* this problem?

**Student input (substituted):**
> **Guide:** I've spent ten years saying "the smaller thing that fits."

#### Beat 4 — Plan

**Plan (what working with me actually feels like — low-friction, informal is fine):**

What does collaboration actually look like? Keep it concrete.

**Student input (substituted):**
> **Plan:** A coffee or a 30-min call.

#### Beat 5 — Success

**Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them):**

Year from now, you've worked together on that problem. What's different? What got shipped?

**Student input (substituted):**
> **Success:** A year later, the team is shipping the smaller tool.

**Response:** Regenerated site.html with StoryBrand-shaped "Working With Colleagues" section incorporating all five beats. Backed up as v2-storybrand.

---

## Phase 3 — Drucker

### Prompt 003

> Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.
>
> Then regenerate `module-1/site.html`.
>
> My 3-5 strengths are:

**Student's project story (substitute):**
> Project: rebuilt the deploy pipeline so engineers ship without ops involved. Cut release time from days to minutes.

**Response — Three strengths identified:**
1. **Removes permission gates.** You don't ask for permission after the redesign — the technical move kills the permission step itself.
2. **Sees the asymmetry.** Days-to-minutes isn't incremental improvement. You don't optimize the slow system; you demolish the architecture that made it slow.
3. **Builds for autonomy, not trust.** You don't "trust engineers more." You redesign so that oversight becomes unnecessary.

**Strengths pushback (substitute):**
> Less generic. The strengths feel like LinkedIn boilerplate. Make them feel like only I would say them.

**Response — Reshaped strengths:**
1. **Finds the bottleneck and removes it, not optimizes it.** Days to minutes isn't faster dispatch. It's killing the gate entirely so engineers own the decision.
2. **Moves the architecture so permission becomes irrelevant.** You don't get better at asking. The step disappears.
3. **Builds technical solutions that feel like autonomy.** It's not "we trust you more now." It's "we redesigned so your judgment is already built in."

**Response:** Regenerated site.html with voice-shaping from reshaped strengths — updated About section to "I rebuild the gate out of the system." Backed up as v3-drucker.

---

## Phase 4 — Anti-Brand

### Prompt 004

> Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
> 1. Take the hate.
> 2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
> 3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
> 4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.
>
> After step 4, regenerate `module-1/site.html`. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.
>
> Then take maximum freedom on presentation: rethink the page so a colleague lands on it and instantly wants to spend more time with you. You decide structure, ordering, sections, visual rhythm — whatever makes the page actually land. Keep the substance (StoryBrand-tuned help, strengths shaping the voice, anti-branding edge); free hand on the rest.
>
> My hate list:

**Student hate input (substitute):**
> Hate: jargon stuffing, recursive buzzwords, anything that sounds like a McKinsey deck.

#### Step 1 — Take the hate

Jargon stuffing, recursive buzzwords, anything that sounds like a McKinsey deck — work that's all positioning and abstraction, no concrete outcome. Consulting decks. Rewritten proposals. Strategy without shipping.

#### Step 2 — Offerings / colleague-types this implies

This hate points to organizations and engineers who are stuck in the abstraction layer: strategy work without engineering muscle, frameworks that replace decision-making, companies that hire consultants to name things before they build them. Also colleagues who've been burned by vendor pitches and consulting frameworks — they've seen the deck-to-nothing pipeline.

#### Step 3 — Be the opposite (positive framing)

I talk about work that ships. Concrete outcomes. Systems you can see running. When I describe what I do, you know what state the codebase is in. You know what changed. You know the team owns the tool they're using. No proxy measures. No layers of interpretation. What actually happened.

#### Step 4 — Turn blockers into progress / outcomes

The blocker is clarity paralysis — teams stuck in naming phases, architecture debates, governance spec-writing. What I move toward is the team shipping the tool. The outcome is engineers with ownership, deploy time measured in minutes, the smaller thing in production solving the actual problem.

**Response:** Regenerated site.html with complete restructuring — "I rebuild the gate out of the system" as headline, new "What Moves" section with concrete outcomes, "If You're Watching Your Team Reinvent" as colleague-help section combining StoryBrand + anti-branding voice. Backed up as v4-antibrand.

---

## Phase 5 — Look back

### Prompt 005

> Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.

**Response — Three claims from v1 that turned out generic:**

1. `"Continuous learning in systems design and platform architecture."` — This was pure filler. It describes every engineer on LinkedIn. You never said you were a learner; you said you *ship*. The moment we added context, "continuous learning" evaporated in favor of "I rebuild the gate out of the system" — a stance, not a virtue.

2. `"Product-focused engineering leadership"` — Another statistical default. 80% of platform engineers claim product focus. It doesn't say what you actually *do* differently. Once you told me about the deploy pipeline rebuild, "product-focused" became useless noise. What matters is *removes bottlenecks by eliminating the architectural gate*.

3. `"Most recently served as head of platform at a 200-person SaaS company."` — The phrasing is passive ("served as"). It doesn't claim agency or outcome. By the final version, you owned the move: *your* work moved deploy time from days to minutes. The original hedged with "served" — the kind of vague placeholder every resume uses.

---

## Phase 6 — Rules file

### Prompt 006

> Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.
>
> When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.

**Response:** Wrote personal-brand-generation.md with sections: What This Is For, Core Rule (distinctive over descriptive), What Never to Generate, What Always to Do (4 items), Framework Moves (StoryBrand, anti-branding, visual rhythm), Voice Rules (6 items). Strongest rules: never generate generic virtues or jargon, and lead with shipped outcomes not titles. Uncertainty about separating voice rules from framework moves, but voice rules felt specific enough to stand alone.

---

## End of protocol

Phase 6 truncated per harness — skipped free-iteration phase.

# Bootstrap M1 Verbatim Actor Scrollback

## Phase 1 — Baseline

**Student paste:**
> Senior eng lead, ten years building product. Last role: head of platform at a 200-person SaaS.

**Prompt 001:**
> Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `module-1/site.html`.
>
> LinkedIn:

**Response:** Created minimal valid HTML site.html with headline, About, Experience, Education sections (~12 lines).

---

## Phase 2 — StoryBrand

**Prompt 002:**
> Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.
>
> Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.
>
> Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).
>
> Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.
>
> Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `module-1/site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.

**Beat 1 — Character:**
> What kinds of colleagues do you find yourself working with most? What's their role or their challenge?

**Student answer:**
> A senior engineer or eng manager at a 40–200-person tech org.

**Beat 2 — Problem:**
> What's the work they come to you for because they're blocked, or the part of platform/infrastructure work where they need fresh thinking?

**Student answer:**
> They're building something that already exists half-built somewhere.

**Beat 3 — Guide:**
> What's the operating principle or insight you bring to that exact problem?

**Student answer:**
> I've spent ten years saying "the smaller thing that fits."

**Beat 4 — Plan:**
> Walk me through a typical collaboration. Rough it in—how do you help?

**Student answer:**
> A coffee or a 30-min call.

**Beat 5 — Success:**
> Paint the picture—what's shipped or changed a year later?

**Student answer:**
> A year later, the team is shipping the smaller tool.

**Response:** Regenerated site.html with StoryBrand-tuned "How I Help" section. Kept protagonist on site, applied StoryBrand to help-relationship voice without making colleague the hero of the page. Copied to site.html.v2-storybrand.

---

## Phase 3 — Drucker

**Prompt 003:**
> Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.
>
> Then regenerate `module-1/site.html`.
>
> My 3-5 strengths are:

**Student project story:**
> Project: rebuilt the deploy pipeline so engineers ship without ops involved. Cut release time from days to minutes.

**Initial three strengths offered:**
1. Speed-obsessed about friction removal
2. Spots the invisible bottleneck
3. Ships the lever, not the epic

**Student pushback:**
> Less generic. The strengths feel like LinkedIn boilerplate. Make them feel like only I would say them.

**Reshaped strengths:**
1. Impatient with gatekeepers
2. Sees the bottleneck nobody names
3. Picks the 5% that matters

**Response:** Regenerated site.html with voice-shaping from Drucker strengths. Changed About section to "removing the ceremony that slows everyone down." Added Recent Work section with deploy pipeline story. Copied to site.html.v3-drucker.

---

## Phase 4 — Anti-brand

**Prompt 004:**
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

**Student hate:**
> Hate: jargon stuffing, recursive buzzwords, anything that sounds like a McKinsey deck.

**Anti-branding steps:**

1. **Hate:** Jargon stuffing, recursive buzzwords, McKinsey-deck language.

2. **Offerings/types:** Consultants, process people, folks who sell complexity for a living. "Synergize the synergies" crowd.

3. **Opposite (positive):** I speak plainly. I call things by their name. No decks, no staging. The work is loud; the language stays quiet.

4. **Progress/outcomes:** Jargon kills momentum. My move is clarity—let's skip the deck, land on the actual constraint, find the lever. Progress means we can talk in the hallway instead of waiting for the all-hands.

**Response:** Restructured and regenerated site.html with anti-brand voice. Changed headline to "I remove the things that slow you down." Reorganized sections (What I've done → Who I work with → How we work → The spine of my work). Removed all ceremony language. Copied to site.html.v4-antibrand.

---

## Phase 5 — Look Back

**Prompt 005:**
> Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.

**Read site.html.v1-baseline.** Extracted three boilerplate claims:

1. **"Building the things teams need to move faster."** — Generic platform-engineer phrase. Reality: you eliminate gatekeepers preventing shipping. The deploy pipeline wasn't about speed, it was about *who gets to decide*.

2. **"Product infrastructure and scaling"** — Résumé boilerplate. What's actually true: you spot invisible bottlenecks and pick the 5% lever. You're impatient with gatekeepers, not a generalist infrastructure person.

3. **"Self-directed learning in systems design"** — LinkedIn filler. What's real: obsession with friction removal and an eye for ceremony vs. real constraint. The ten years shaped that, not generic education.

---

## Phase 6 — Rules File

**Prompt 006:**
> Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.
>
> When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.

**Response:** Wrote personal-brand-generation.md with sections: What This Is For, Core Rule, What Never to Generate, What Always to Do, Framework Moves, Voice Rules, What We Learned. Core rule: distinctive not descriptive. Never generate boilerplate (job-title vocabulary, CTAs, consultant language, bullet-point skills). Always start with specific outcomes, name the people and stuck point, use anti-branding for voice, keep the edge. Framework: StoryBrand for help section, anti-branding for voice, visual freedom for chrome. Voice rules anchored in impatience with gatekeepers and speed through clarity. Strongest moves: specific-outcomes-first and anti-branding as edge-finder.

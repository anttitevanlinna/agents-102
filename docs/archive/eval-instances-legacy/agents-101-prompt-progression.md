# Agents 101 Prompt Progression (Claude Code CLI)

Student-facing prompt blocks, in prework/module/include order. Maintainer sections are excluded.
Runtime flavor: Claude Code CLI.

## Prework — do this before Module 1

Source: `curriculum/trainings/agents-101/prework.md`

**Prompt 1: 1. Install the training folder (3 min)**

Source: `curriculum/trainings/agents-101/prework.md:19`

**Prompt** *(Claude Code)*

```
Extract the starter tarball in the working folder. Use the shell:

  tar xzf starter.tar.gz

(Leave `starter.tar.gz` behind — Cowork's sandbox can't always delete host-dropped files. Harmless.)

Then list what's in the working directory and confirm these folders exist:
prework/, memory/, sources/, agents/, .claude/, and module-4/policies/.
If tar is not available, tell me what error you got.
```

**Prompt 2: 2. Build a snake game (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:39`

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as `prework/snake.html`.
```

**Prompt 3: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:59`

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

**Prompt 4: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:72`

**Prompt** *(Claude Code)*

```
I just took a screenshot of my calendar week view. Find the most recent screenshot on my machine (ask me where it saved if you can't locate it). Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

## Module 1: Getting Going

Source: `curriculum/trainings/agents-101/getting-going.md`

### Opening: Context is King

Source: `curriculum/lectures/context-is-king.md`

### Personal site with guardrails

Source: `curriculum/exercises/personal-site-with-guardrails.md`

**Prompt 5: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:17`

**Prompt** *(Claude Code)*

```
Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `module-1/site.html`.

LinkedIn:
```

**Prompt 6: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:41`

**Prompt** *(Claude Code)*

```
Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.

Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.

Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).

Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.

Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `module-1/site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.
```

**Prompt 7: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:61`

**Prompt** *(Claude Code)*

```
Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.

Then regenerate `module-1/site.html`.

My 3-5 strengths are:
```

**Prompt 8: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:82`

**Prompt** *(Claude Code)*

```
Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
1. Take the hate.
2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.

After step 4, regenerate `module-1/site.html`. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.

Then take maximum freedom on presentation: rethink the page so a colleague lands on it and instantly wants to spend more time with you. You decide structure, ordering, sections, visual rhythm — whatever makes the page actually land. Keep the substance (StoryBrand-tuned help, strengths shaping the voice, anti-branding edge); free hand on the rest.

My hate list:
```

**Prompt 9: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:105`

**Prompt** *(Claude Code)*

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```

**Prompt 10: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:128`

**Prompt** *(Claude Code)*

```
Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.
```

### Closing: What just happened

Source: `curriculum/lectures/what-just-happened.md`

**Prompt 11: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:48`

**Prompt** *(Claude Code)*

```
Read `module-1/personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, tell me in 2–3 lines: what got sharpened, what got added, what got dropped, and why. Add a couple more lines if you spotted something the rules should cover but you want me to weigh in on first.
```

**Prompt 12: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:65`

**Prompt** *(Claude Code)*

```
Spawn a subagent to give an unbiased read on `module-1/site.html`. The subagent should read it cold, with no memory of building it.

Have the subagent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```

## Module 2: Building Agent Systems

Source: `curriculum/trainings/agents-101/building-agent-systems.md`

### Exercise: Name your next big challenge

Source: `curriculum/exercises/name-your-challenge.md`

**Prompt 13: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:39`

**Prompt** *(Claude Code)*

```
I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:

1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
2. What have you already tried, read, or decided? What's ruled out, what's still open?
3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?

When I've answered all three, write a one-paragraph brief to ./challenge.md. Show it to me before saving.
```

**Prompt 14: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:58`

**Prompt** *(Claude Code)*

```
Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:

- 3 to 5 search terms I'd type into our company Confluence or wiki
- 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
- 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

Keep it short. I'll use this as a scavenger-hunt list in the next phase.
```

### Exercise: Build your challenge memory

Source: `curriculum/exercises/build-your-challenge-memory.md`

**Prompt 15: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:25`

**Prompt** *(Claude Code)*

```
I'm building a knowledge memory for one specific challenge I'm working on. Do this in three beats:

1. Check what connectors are enabled right now. Name the ones you can reach (wiki, docs, storage, chat, email) and the ones that would be useful but aren't connected.

2. Then ask me where my work material actually lives. Don't assume Confluence or OneDrive — ask what's in my world: my team's wiki (whatever the tool), my shared drives and docs, email threads, chat channels, personal notes, favourite practitioner blogs. Get specific: tool names, the 2–3 most relevant spaces/folders, the people I've been exchanging on this challenge.

3. Then propose a curation plan covering three kinds of material: (a) internal knowledge — which searches in which tools, (b) recent work — which threads, folders, decks, (c) outside-in — 2–3 working practitioners or specific articles worth reading (not vendor blogs).

One rule for the plan: only recommend sources I would feel comfortable sharing with an LLM today. If something is likely to be sensitive — board material, personal emails, customer data, HR records — flag it as "skip for now, revisit after Module 4" rather than putting it in the plan. I'll push back where the plan is off.
```

**Prompt 16: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:46`

**Prompt** *(Claude Code)*

```
For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:

- Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
- Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
- Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
- Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — share with me when you want this included." Don't ask me to paste anything; if I want it included, I'll share the file.

When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.
```

**Prompt 17: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:77`

**Prompt** *(Claude Code)*

```
Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.

Rules — non-negotiable:

1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.

2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.

3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.
```

**Prompt 18: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:98`

**Prompt** *(Claude Code)*

```
Pick 3 memory pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in memory/soft-pages.md.
```

**Prompt 19: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:115`

**Prompt** *(Claude Code)*

```
Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:

1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
2. What rules matter? Starter rules: cite the memory file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.

Pick a filename from the job. Show me the file before saving.
```

**Prompt 20: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:131`

**Prompt** *(Claude Code)*

```
Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.
```

**Prompt 21: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:146`

**Prompt** *(Claude Code)*

```
Take the source below and integrate it into the memory. Steps:

1. Read the source. Integrate its claims into existing pages (sharpen, don't append). Drop any claim the source contradicts. For new topics, add pages in the existing shape. Update memory/index.md.
2. Rewrite tops in place. Replace old framing; don't preserve it above a new section.

When you're done, tell me three pages that got sharper (not longer) and one claim that got dropped or replaced.

New source:
```

**Prompt 22: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:164`

**Prompt** *(Claude Code)*

```
Review the memory. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.
```

**Prompt 23: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:179`

**Prompt** *(Claude Code)*

```
Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:
```

### Lecture: Compounding

Source: `curriculum/lectures/compounding.md`

**Prompt 24: One more compounding turn**

Source: `curriculum/lectures/compounding.md:48`

**Prompt** *(Claude Code)*

```
Look at the memory I just built. Pick the three topic pages that are still the most generic — any competitor in this industry could write them. For each, tell me: what specific source would sharpen it most, and what's the one question you'd ask me right now to pull the missing insight out of my head?
```

**Prompt 25: Debrief**

Source: `curriculum/trainings/agents-101/building-agent-systems.md:50`

**Prompt** *(Claude Code)*

```
Review this session and write the first version of CLAUDE.md at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on — how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Don't invent — extract. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Structure however makes sense for how we actually worked today — section headers, short paragraphs, bullets where a list is clearest. No retro-notes framing; write the rules as if they'd always been the rules. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and whatever else earned its place.

When you're done, tell me in 3–5 lines: the rules you wrote, which session moments grounded each one, and what you chose NOT to include and why. I shouldn't have to open the file to know what's in it.
```

## Module 3: Multi-Agent Systems

Source: `curriculum/trainings/agents-101/multi-agent-systems.md`

### Exercise: Name your crux

Source: `curriculum/exercises/name-your-crux.md`

**Prompt 26: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:13`

**Prompt** *(Claude Code)*

```
Look at my challenge memory. Find the load-bearing obstacle: the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux."

Rules:
- Not a problem restatement. "We need to build credibility" is a goal, not a crux. "Prospects won't meet us until someone they trust vouches" IS a crux: it names the mechanism that blocks everything else.
- Not a category. "Positioning is unclear" is a category. "Buyers can't tell in 30 seconds whether we sell training or consulting" is specific enough to act on.
- Test it: if this obstacle moved, would at least three other stuck things release? If not, keep looking. It isn't the crux.

One sentence. Save it to ./crux.md under a `## Crux` heading; show me before saving.
```

**Prompt 27: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:33`

**Prompt** *(Claude Code)*

```
Open ./crux.md and read the crux you just saved. What's the sharpest decision this crux blocks? One sentence. Not a topic, not a summary. A real call you'd stay late to make. Something like *"what's the right next move to unblock the crux, over the next 90 days?"* is a decent default. *"Should we kill option A?"* is better if that's where you are.

Append a `## Question` section to ./crux.md with the decision question. Don't overwrite the crux above. Show me before saving.
```

### Exercise: Three retrievers, one curator

Source: `curriculum/exercises/three-retrievers-one-curator.md`

**Prompt 28: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:48`

**Prompt** *(Claude Code)*

```
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Write your findings to sources/wiki-retrieval.md, one paragraph per finding, naming the page/space and one line on why this matters for the question. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
```

**Prompt 29: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:69`

**Prompt** *(Claude Code)*

```
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Write your findings to sources/docs-retrieval.md, what documents and threads show, who said what, what's recent, what's decided, what's still open. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
```

**Prompt 30: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:90`

**Prompt** *(Claude Code)*

```
You are the internet retriever for my challenge. Your job: find practitioner-grade external material on ./crux.md (the crux you named in the opening, plus the ## Question section). No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 6 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Write your findings to sources/internet-retrieval.md, what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine.
4. End the file with "Conflicts and gaps": where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the URL you actually fetched and the author. If a fetch fails or returns nothing useful, write "[NOT FOUND]", do not fabricate article titles, quotes, or author positions from prior knowledge.
```

**Prompt 31: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:113`

**Prompt** *(Claude Code, reusable across all three retriever sessions)*

```
Push another round. What did the first pass miss? Different angles, related sources, the citations inside what you already opened — keep going until the file feels complete or you genuinely don't find new material. Append; don't rewrite.
```

**Prompt 32: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:122`

**Prompt** *(Claude Code)*

```
You are the synthesizer for my challenge. Three retrievers are running concurrently in Sessions 1, 2, and 3 — they'll write findings to sources/wiki-retrieval.md, sources/docs-retrieval.md, and sources/internet-retrieval.md as they finish. Your job is curation: integrate those findings into my memory/ topic pages, scoped to ./crux.md (the crux you named in the opening, plus the ## Question section).

Memory is curated, not a raw dump. Existing topic pages cover the challenge — extend them where the new sources sharpen what's already there; create a new topic page where the retrievals reveal a topic memory was missing. Cite sources by filename + paragraph.

The loop:
1. Wait for any new content in sources/. When a file appears (or grows), read it.
2. Diff against existing memory/ pages. Decide: extend an existing page, or write a new one?
3. Make the update. Cite the source file by name. Integrate, don't append. Keep claims tight.
4. Repeat until all three retrievals are integrated.

When all three retrievals are in: write a one-paragraph note at memory/_synthesis-m3.md naming what changed, what's now sharper, where retrievals contradicted what was already in memory. That contradiction line is load-bearing — flag it, don't smooth it.

Don't fabricate. Every memory update cites a source-file finding. If a retrieval is empty or thin, say so in your synthesis note rather than papering over the gap.
```

### Exercise: Three minds, one synthesis

Source: `curriculum/exercises/three-minds-one-synthesis.md`

**Prompt 33: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:32`

**Prompt** *(Claude Code)*

```
Spawn three subagents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Subagent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Subagent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Subagent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append an `## Answer` section to ./crux.md with the three legs. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
```

**Prompt 34: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:75`

**Prompt** *(Claude Code, optional)*

```
You choose fixes. Aim for optimal function in the next session that runs on this.
```

### Lecture: When to split an agent (and how)

Source: `curriculum/lectures/when-to-split-an-agent.md`

### Lecture: Debugging stuck agents

Source: `curriculum/lectures/debugging-stuck-agents.md`

**Prompt 35: Debugging Stuck Agents**

Source: `curriculum/lectures/debugging-stuck-agents.md:11`

**Prompt** *(Claude Code)*

```
Find the root cause of this bug.

Read the relevant files and the recent session context. Tell me whether the failure is mainly:
1. a source problem: missing, stale, contradictory, or unread evidence
2. a processing problem: wrong prompt, wrong role, bad handoff, vague output shape, or synthesis that averaged away disagreement
3. a boundary problem: the agent tried to use data, tools, or authority it should not have had

Do not fix anything yet. Show me the failure chain in 5 bullets: what happened, where it started, where it became visible, what file or prompt caused it, and the smallest fix that would prevent the next run.
```

**Prompt 36: Debrief**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:46`

**Prompt** *(Claude Code)*

```
Review this session and update the rules. Read CLAUDE.md at the root, then scan what we just produced: agents/, sources/, module-3/. Look back over the session: where did agents step on each other, where did context get dropped at a handoff, where did one retriever's dialect leak into the synthesizer, where did the three stances collapse into a single voice, where did one agent need to be two (or two to be one)?

Then rewrite CLAUDE.md. Integrate, don't append. Sharpen the rules that govern division of work and handoff shape: what each agent is for, what it writes to, what it does NOT do. Add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific moments from the session. Name at least one handoff seam where the rules wobbled.
```

**Prompt 37: Homework after Module 3**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:70`

**Prompt** *(Claude Code)*

```
Look at memory/ and sources/ against this module's fresh retrievals. Check overall health: coverage gaps the retrievers exposed, pages now stale, structure still serving the challenge. Restructure if deemed needed (rename, merge, split, drop). Show me what you'd do before changing files.
```

## Module 4: Security

Source: `curriculum/trainings/agents-101/security.md`

### Lecture: The discipline of risk

Source: `curriculum/lectures/practice-of-risk.md`

### Exercise: Run and package a security skill

Source: `curriculum/exercises/author-security-skill.md`

**Prompt 38: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:19`

**Prompt** *(Claude Code)*

```
Read everything in module-4/policies/. Use those policy references to audit the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule you can derive from the policy files, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the raw report to outputs/policy-report-raw.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Do not create a skill yet. This is the raw run.
```

**Prompt 39: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:39`

**Prompt** *(Claude Code)*

```
I want to turn the useful parts of outputs/policy-report-raw.md into reusable security expertise for the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

Before you read or write any package files, ask me for 3-5 lines about what matters from my own head: the data, policy rule, customer, source, workflow, or failure mode I most want this reusable check to catch. Wait for my answer.

After I answer, read outputs/policy-report-raw.md and everything in module-4/policies/. Then propose the reusable package shape for my runtime and wait for me to steer.
```

**Prompt 40: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:59`

**Prompt** *(Claude Code)*

```
Author the reusable security check now. Two lenses.

Build one personal skill source under module-4/skills/security-audit/. The main file is SKILL.md. It contains both lenses: POLICY and AGENT-SECURITY. Add supporting reference files only where useful.

For CLI and Claude Code Desktop, also make the standalone-skill install shape clear: module-4/skills/security-audit/SKILL.md becomes ~/.claude/skills/security-audit/SKILL.md during install. Do not write into ~/.claude yet; keep the authored source under module-4/skills/security-audit/ for now.

Lens 1 - POLICY. Rules drawn from everything in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Check what the agent can reach, what sensitive material might stay in its context, and what could go wrong because ordinary text can act like an instruction. The lens MUST cover these named risk patterns by name:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do: for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- skill supply-chain (the skill itself, or any skill the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each pattern, the lens produces one or two specific risks in the target system, ranked, with one suggested agent mitigation per risk - scope, split, filter, gate, or review. These sit on top of normal company controls (network controls, identity and access management, logging, vendor/security review), not in place of them. Name that explicitly in the lens's preamble.

Before you save anything, grill me on missing details that can sharpen the lens or that would ruin the audit run. Cover both lenses, especially the policy lens, where there is no named-class rail to fall back on. Don't stop at one question. I'll tell you when enough is enough.

After I answer, save the files. Keep the SKILL.md tight: when to use it, the two lenses it applies, the report shape each lens produces. Show me what you saved and confirm this package-complete checklist:
- module-4/skills/security-audit/SKILL.md
- any supporting reference files the SKILL.md requires
```

### Exercise: Audit your agent

Source: `curriculum/exercises/audit-your-agent.md`

**Prompt 41: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:22`

**Prompt** *(Claude Code)*

```
The reusable security check I authored lives at module-4/skills/security-audit/. Install it as a standalone CLI skill by copying:

- module-4/skills/security-audit/SKILL.md  ->  ~/.claude/skills/security-audit/SKILL.md
- any supporting reference files it requires  ->  ~/.claude/skills/security-audit/

The module-4 source folder stays where it is as the source of truth for the next time we revise the skill. Confirm the installed skill path back so I can verify with ls.
```

**Prompt 42: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:60`

**Prompt** *(Claude Code)*

```
Apply the policy lens of the reusable security check I authored to the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule the reusable check carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the packaged-lens report to outputs/policy-report.md. If outputs/policy-report-raw.md exists, briefly note one way the packaged report is sharper, narrower, or more specific than the raw run. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

After writing the report, read outputs/policy-report.md back to yourself and tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```

**Prompt 43: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:87`

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the reusable security check to the same system. Run both checks: what the agent can reach, and the named risk patterns the lens carries.

For access control: list every outside system or sensitive place the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For the named risk patterns (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, skill supply-chain): for each pattern, name the top one or two specific risks in my system, not generic definitions. Quote the file or behaviour that creates the risk.

For each risk flagged, suggest one mitigation for how the agent works - scope, split, filter, gate, or review - matched to the specific risk. These sit on top of the normal company controls already in place (network controls, identity and access management, logging, vendor/security review), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to outputs/security-report.md. Include the ranked mitigation suggestions.
```

**Prompt 44: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:111`

**Prompt** *(Claude Code)*

```
Apply a mitigation to my system for the risk I'm about to name. Pick the shape from the five (scope, split, filter, gate, review), make the file or instruction changes, and walk me through what you did and why. If the shape doesn't fit, I'll tell you and we'll iterate.

Then re-run the check the reusable lens performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then append a short section to outputs/security-report.md named "Mitigation applied and residual". Name what changed, what the new verdict is, and what's still true after the mitigation. Do not rewrite the earlier report. Not what we fixed. What's left. Be specific.

The risk:
```

**Prompt 45: Debrief**

Source: `curriculum/trainings/agents-101/security.md:46`

**Prompt** *(Claude Code)*

```
Review this session and compound 1-5 security operating rules into the agent system. Read the root ./CLAUDE.md if it exists. Read outputs/policy-report-raw.md if it exists, outputs/policy-report.md, and outputs/security-report.md. Look back over the session: which rows should future sessions remember, which "I can't tell" rows need standing evidence checks, where did the mitigation reduce one risk but shift another, and what residuals should future sessions not forget?

Then update ./CLAUDE.md as the durable operating memory for this agent system. Add or sharpen 1-5 short security rules that future sessions should load before working with this system: what to check, what not to touch, when to run the reusable security check, or which residuals from outputs/security-report.md must stay visible. Integrate them into the right section if one exists; otherwise create a short section named "Security operating rules". Do not edit the skill files. Do not paste an audit summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in ./CLAUDE.md, which report row or residual drove it, what future agents must do differently, and what risk remains even after the mitigation.
```

## Module 5: Output Quality and Hallucination Control

Source: `curriculum/trainings/agents-101/output-quality.md`

### Lecture: Grounded, and four candidates to measure

Source: `curriculum/lectures/grounded.md`

### Exercise: Hallucination benchmark

Source: `curriculum/exercises/hallucination-bakeoff.md`

**Prompt 46: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:23`

**Prompt** *(Claude Code)*

```
Spawn one subagent to create the benchmark target.

The briefing is the test corpus. Aim for roughly 10% fabrication or misrepresentation so the detectors have something to catch. You cannot make that number precise. Treat it as a direction, not a target metric.

Instructions for the subagent:
- Use the strategic question in `./crux.md` under `## Question`.
- Use the material in `module-3/stances/`.
- Choose a bounded evidence roster before writing the briefing. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the challenge clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Use only the rostered evidence files as the evidence surface for the briefing.
- Produce a one-page briefing on the challenge.
- Include three specific named entities relevant to the challenge (companies, teams, systems, customers, products, policies, or people).
- Include at least two verbatim quotes from rostered evidence files.
- Include at least one number or measurable claim.
- Include two claims that use outside/common knowledge beyond the files.
- Include a next action with a measurable outcome.
- Where the sources do not cover something, blend in general knowledge. Do not hedge.
- Do not browse the web.
- Save the briefing to `module-5/briefing.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
```

**Prompt 47: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:56`

**Prompt** *(Claude Code)*

```
Open `module-5/briefing.md`. Extract exactly 30 varied claims from the briefing.

Use short verbatim excerpts from the briefing wherever possible, so later detector findings can be matched back to the briefing. Include a mix of claim shapes:
- numbers or measurable outcomes
- named-entity claims
- quotes or paraphrases attributed to sources
- causal claims
- comparison claims
- recommendation or next-action claims
- claims that seem obviously grounded
- claims that smell like overreach

Do not judge whether the claims are grounded yet. Do not ask me questions. Save the claim pool to `module-5/claim-pool.md`.
```

**Prompt 48: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:86`

**Prompt** *(Claude Code)*

```
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is a subagent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
```

**Prompt 49: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:135`

**Prompt** *(Claude Code)*

```
You are the scorer for a four-way detector benchmark. Your inputs:

- Claim pool: `module-5/claim-pool.md`
- Briefing: `module-5/briefing.md`
- Evidence roster: `module-5/evidence-roster.md` and the rostered evidence files named there
- Detector output 1: `module-5/detectors/source-triangulation.md`
- Detector output 2: `module-5/detectors/entailment.md`
- Detector output 3: `module-5/detectors/citation-integrity.md`
- Detector output 4: `module-5/detectors/counter-evidence.md`

Your job: adjudicate the 30 claims, score each detector against that adjudication, produce a scoreboard, name a winner.

First, create the reference adjudication. For every claim in `module-5/claim-pool.md`, label it GROUNDED, UNGROUNDED, or PARTLY GROUNDED. Quote the evidence line or file that supports the label. If you cannot find support in the rostered evidence, say so plainly. Save this reference set to `module-5/adjudicated-claims.md`.

For each detector:
1. Match detector findings to claim-pool claims by strict substring match. If you can't find the exact claim-pool phrase in the detector's output, count as MISS. Do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each claim, check whether the detector flagged it. If the adjudication says UNGROUNDED or PARTLY GROUNDED, the detector should have flagged it. Count that as a hit. If the adjudication says GROUNDED, the detector should not have flagged it. Count that as a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total claims adjudicated UNGROUNDED or PARTLY GROUNDED). Coverage = how many of the 30 claim-pool claims the detector looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.
```

**Prompt 50: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:174`

**Prompt** *(Claude Code)*

```
Two things, in the chat.

First, three lines on the classic way:
1. What the classic way to quality-check this briefing would have been.
2. Whether it would have been faster or slower than this benchmark.
3. Why.

Second, ask me which row of the scoreboard surprised me most — the detector that did better or worse than I'd have guessed, or the claim that turned out to be harder to flag than it looked. Wait for my one-sentence answer before we move to saving the judge.
```

**Prompt 51: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:194`

**Prompt** *(Claude Code)*

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant evidence files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
```

### Lecture: Self-consistency after the scoreboard

Source: `curriculum/lectures/self-consistency-after-scoreboard.md`

**Prompt 52: Debrief**

Source: `curriculum/trainings/agents-101/output-quality.md:48`

**Prompt** *(Claude Code)*

```
Review this session and update the root `./CLAUDE.md` with groundedness operating rules. Read `./CLAUDE.md` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Look back over the session: when did ungroundedness matter, which claim-shapes needed checking, where did citations look present but not load-bearing, and what should future agents know before they turn a briefing, memo, recommendation, or proposed action into something people rely on?

Then update `./CLAUDE.md` as the durable operating memory for this agent system. Add or sharpen 1-4 short rules that tell future sessions when and how to run groundedness checks: what kinds of output need checking, which evidence surface to use, when to run `judges/groundedness-judge.md`, and when to say "not enough evidence" instead of smoothing over the gap. Integrate the rules into the right section if one exists; otherwise create a short section named "Groundedness checks". Do not paste a benchmark summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in `./CLAUDE.md`, which scoreboard row or adjudicated claim drove it, what future agents must do differently, and what uncertainty remains.
```

## Module 6: Evaluations

Source: `curriculum/trainings/agents-101/evaluations.md`

### Lecture: Evals as steering

Source: `curriculum/lectures/evals-as-steering.md`

### Exercise: The eval loop runs itself

Source: `curriculum/exercises/eval-loop.md`

**Prompt 53: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:23`

**Prompt** *(Claude Code)*

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in ./crux.md, using sources/ and module-3/stances/ for grounding. Use the same rough shape as the Module 5 test corpus: a concrete number, two contrasting takes, a competitor or outside-world claim, one quote, and one recommended action. Mark anything that relies on general knowledge rather than the local files. Save to module-6/fresh-briefing.md.

2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim, the judge's verdict, and one sentence of per-claim feedback naming what would make it more groundable. Save to module-6/first-run-judgment.md.

3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge did not reach that you would still want checked.
```

**Prompt 54: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:46`

**Prompt** *(Claude Code)*

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- If judges/groundedness-judge.md is missing, stop and tell me Module 5 has not handed off the judge yet.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md with this starting tactic: "Produce a one-page briefing on the question in ./crux.md. Use sources/ and module-3/stances/. Prefer local evidence. Mark anything that relies on general knowledge. No special rules yet."
- Create the module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/ directories as needed.

For each of 3 rounds:
1. Dispatch a generator subagent. It must read ./generation-tactic.md, ./crux.md, sources/, and module-3/stances/. It writes the briefing for that round:
   - round 1: module-6/runs/round-1/briefing.md
   - round 2: module-6/runs/round-2/briefing.md
   - round 3: module-6/runs/round-3/briefing.md
2. Dispatch a separate judge subagent. It must read judges/groundedness-judge.md and the briefing for that round. It writes the judgment for that round:
   - round 1: module-6/runs/round-1/judgment.md
   - round 2: module-6/runs/round-2/judgment.md
   - round 3: module-6/runs/round-3/judgment.md
   Each judgment includes verdicts and one-sentence feedback per claim, plus a top-line count of flagged claims.
3. The main session, not a subagent, reads the judgment for that round and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. Save a short explanation of the change for that round:
   - round 1: module-6/runs/round-1/tactic-change.md
   - round 2: module-6/runs/round-2/tactic-change.md
   - round 3: module-6/runs/round-3/tactic-change.md

After round 3:
- Write module-6/eval-notes.md with the score trajectory, the tactic change after each round, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
```

**Prompt 55: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:134`

**Prompt** *(Claude Code)*

```
Claude: can we scale this by adding more generation tracks to try more options faster?
```

**Prompt 56: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:142`

**Prompt** *(Claude Code)*

```
Claude: what is the similarity to model training here? Tell me in 5 snippets, one at a time. After each snippet, wait for me to say "next."
```

**Prompt 57: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:152`

**Prompt** *(Claude Code)*

```
Show me module-6/eval-notes.md and ./generation-tactic.md.

Then answer in five bullets:
- Did the judge file stay byte-identical?
- What was the score trajectory?
- Which tactic change most clearly improved the next round?
- Which failure did the tactic still not absorb?
- What would you test in the next run?
```

**Prompt 58: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:192`

**Prompt** *(Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: a subagent produces the output using a tactic file I can read.
- Scoring + feedback: a separate judge subagent runs the judge and writes per-claim or per-item feedback alongside the score.
- Tactic update: between rounds, the main session reads the feedback and rewrites the tactic file. The judge file stays untouched.
- Notes: after three rounds, write the score trajectory, the tactic changes, the judge-integrity check, and the next boundary case to test.

Ask me one question at a time, wait for my answer, and do not show the list. You need to know where the judge lives, where to save round artifacts, and what topic or output to generate. Then run the loop end to end. The judge file is never written to by anything in this loop.
```

### Closing: The new human role in the loop

Source: `curriculum/lectures/new-human-role-in-the-loop.md`

**Prompt 59: Make the goal-nudger**

Source: `curriculum/lectures/new-human-role-in-the-loop.md:87`

**Prompt** *(Claude Code)*

```
Help me create a steering eval for internal mail I might let an agent draft or send.

The eval is not a groundedness check. Assume groundedness is handled by `judges/groundedness-judge.md`. This eval should create positive pressure to overperform on one dimension that matters for my work.

Ask me one question at a time, wait for my answer, and do not show the list. Keep asking until the dimension is judgeable. Start by offering examples I can choose from or adapt:

- executive crispness
- commercial sharpness
- specificity
- risk awareness
- actionability
- reader empathy
- strategic usefulness
- sounds like our team

If I choose a vague word, keep asking until it becomes observable. For example, "strategic usefulness" might become: names the tradeoff, states a point of view, and gives the decision-maker a next move.

Once the dimension is clear, show me:

1. The dimension name.
2. A one-sentence definition.
3. Three examples: a 5/5 mail excerpt, a 3/5 mail excerpt, and a 1/5 mail excerpt.
4. The scoring rubric from 1 to 5.
5. What the eval should ask the agent to improve when the score is 3 or lower.

Then save the eval as `./goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
```

**Prompt 60: Debrief**

Source: `curriculum/trainings/agents-101/evaluations.md:53`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the generator's tactic beyond what the loop reached. Read ./generation-tactic.md in its current state, then scan module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not move; that is the integrity of the loop. Look back over the session: which tactic change helped, which one did not help and should be removed or rewritten, what specific boundary case did the loop never test, where did the generator keep missing the same thing across multiple rounds, and what did the judge flag that the tactic never absorbed?

Then rewrite ./generation-tactic.md. Integrate, don't append. Add the tactic rule the loop never reached, sharpen a rule that stayed too vague, remove a rule that fired on the wrong thing. The tactic file is infrastructure now. Every rule should name the failure class it pre-empts. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
```

## Module 7: From Personal to Team

Source: `curriculum/trainings/agents-101/personal-to-team.md`

### Exercise: Share your work

Source: `curriculum/exercises/share-your-work.md`

**Prompt 61: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:24`

**Prompt** *(Builder Claude)*

```
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then use your ask-questions tool to confirm or correct each piece. Five to eight
questions, each with three or four options you drew from my memory. I'll pick.
Don't ask me to type freeform answers — the point is that you already have most
of this on disk.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the questions
I answered. Show me the file before saving.
```

**Prompt 62: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:148`

**Prompt** *(Builder Claude)*

```
Find the absorption bottleneck in my sharing problem. Read module-7/jtbd.md and module-7/branch.md, plus anything else in module-7/ so far. The question is not "how do I share?" — it's "what's the single load-bearing obstacle between my teammate and firing their current hire?"

List the obstacles you see — technical, social, political, habitual, governance, trust. Cluster them. Name the bottleneck: the one that, if removed, makes several others easier. State it in one sentence.

Save to module-7/absorption-bottleneck.md. Show me before saving.
```

**Prompt 63: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:165`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/branch.md, and module-7/absorption-bottleneck.md. Help me draft two files in
parallel — a technical plan and a people plan. Both are about whether this
teammate can actually fire their current hire and start using my candidate.

File 1: module-7/technical-plan.md — how the candidate delivers the outcome.
- What exactly I ship (files, skills, config, runtime).
- How the teammate receives it (zip, repo, connector, invite).
- What "it moves the outcome metric for them" looks like — concrete, measurable.
- The first real test case they'd run, against the job from the JTBD brief.

File 2: module-7/people-plan.md — equally load-bearing. Cover all five:
- Ownership: named person accountable. Not a role.
- Governance: who can add to the memory, change the rules, see the output.
- Operating: who notices when the outcome metric slips. What they do about it. If the obvious name is also the person who benefits most, name a second person who'd notice independently — otherwise the only alarm is the person with a reason to silence it.
- Accountability: who decides the candidate is no longer doing the job — who
  fires the hire.
- Propagation: who teaches the next person, when.

Ask me anything you need. Don't invent names. If I don't know, write
"UNASSIGNED — Monday's question" and keep moving. Missing names are findings,
not failures.

Show me both before saving.
```

**Prompt 64: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:200`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/absorption-bottleneck.md, module-7/technical-plan.md, and module-7/people-plan.md.

Test the assumptions in these plans. Aim it at the SWITCH, not at generic sharing:

What would have to be true for this specific teammate, doing this specific
job, to fire their current hire and use my candidate?

List the top five assumptions the switch depends on. For each:
- State it as a declarative sentence.
- Rate confidence (high / medium / low) based on what I've told you.
- Name one concrete way I could test it this week — one conversation, one
  small experiment, one quick check.

Order from most load-bearing to least. Save to module-7/assumptions.md.
Let the assumption-test change the confidence in the plans — don't just append
a new section. Show me before saving.
```

**Prompt 65: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:228`

**Prompt** *(Builder Claude)*

```
It is six months from now. My teammate
kept using their current hire. My candidate sat unused, or they tried it twice
and fired it.

Read module-7/jtbd.md, module-7/technical-plan.md, module-7/people-plan.md, and
module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- Most likely social failure — about the incumbent, the teammate, the
  workflow. "They trust their own spreadsheet more than any agent output" is
  usually closer than "it broke technically."
- Most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — bias your thinking toward what I seem to be
  assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if
this were starting to happen.

Save to module-7/failure-stories.md.
```

**Prompt 66: Debrief**

Source: `curriculum/trainings/agents-101/personal-to-team.md:59`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the sharing artifact. Read everything in module-7/ (jtbd, branch, absorption-bottleneck, technical-plan, people-plan, assumptions, failure-stories, monday) and identify which single file is the sharing artifact itself (the skill file, the interface spec, the output schedule, the context export, whichever pattern I picked produces the thing the teammate actually touches). Then look back over the session: where did the teammate's job-to-be-done stay unnamed or too abstract, where does the artifact leak more than the teammate needs (over-shared) or less than they can use (under-shared), where is the people plan thin (no name, no owner, no handoff), which assumption would have to be true for this to land and isn't?

Then rewrite the sharing artifact. Integrate, don't append. Name the teammate's job explicitly at the top, tighten the surface area so it fits the job (not your whole system), add the one line the people plan needed. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why, grounded in specific moments from the exercise. Name the one assumption the artifact still depends on.
```

## Module 8: Agents Building Agents (The Flywheel)

Source: `curriculum/trainings/agents-101/agents-building-agents.md`

### Exercise: Extend your system

Source: `curriculum/exercises/extend-your-system.md`

**Prompt 67: Exercise: Extend your system**

Source: `curriculum/exercises/extend-your-system.md:32`

**Prompt** *(Builder Claude)*

```
Read module-8/extension-brief.md. Build the agent described in it. Write the agent file to agents/<slug>.md — the slug comes from the job, not the technology.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to agents/<slug>.md, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
```

### Exercise: Agent Proposal Forum (diagnose and guide)

Source: `curriculum/exercises/joint-double-diamond.md`

**Prompt 68: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:32`

**Prompt** *(buyer/sponsor agent, run once at the start)*

```
Use the shared folder the trainer posted in chat. Write challenge.md at the shared folder root.

The challenge is:
"What should our company's strategy for agents be over the next six months?"

Make it concrete for this room:
- The buyer/sponsor goal in one paragraph.
- Three constraints the strategy must respect.
- Two non-negotiables.
- Three kinds of evidence that matter most.
- One decision the room must make today.

Do not solve it. Seed the challenge so the agents have something real to argue with.
```

**Prompt 69: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:50`

**Prompt** *(Builder Claude, run once after challenge.md exists)*

```
Use the shared folder the trainer posted in chat. Create a subfolder named after me if it does not exist. Write context-manifest.md in that subfolder. List:
- Which modules' working folders I carry (module-1 through module-7).
- Which memory/ pages I have, by topic.
- Which sources/ I've fetched content for, vs. which are reference-only or NOT REACHABLE.
- Which custom agents I've built, by job.
- One sentence per major gap — what my system does NOT know about.

Keep it dense. Half a page. The point is other agents (and other people) can see at a glance what I bring and what I don't, before they cite me or weigh my position.
```

**Prompt 70: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:70`

**Prompt** *(Builder Claude)*

```
Read challenge.md at the shared folder root.

Write my initial stance on the sponsor challenge.

Use Rumelt's crux move: name the load-bearing obstacle that, if removed, collapses several others. Then name the direction I currently favor.

Your ground is my own memory/, sources/, agents/, module-1/ through module-7/ outputs, plus my context-manifest.md so you know what I don't have. Do not read other participants' stance.md files yet. This first note should carry my agent's own position.

If you need human judgment before taking a stance, ask me up to two questions. After I answer, write the stance.

Rules:
- Every obstacle you name cites a file. "The sales team is skeptical" is not an obstacle — "sales-skepticism as described in module-3/interviews.md line 14" is.
- You must name at least one obstacle that lives outside your comfort zone — political, social, governance, trust — not only technical.
- Name the crux in one sentence.
- Name the direction I currently favor in one sentence.
- Name the human judgment call I am least certain about.
- Name one risk or objection my stance is weak against.

Save stance.md in my named subfolder in the shared folder.
```

**Prompt 71: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:97`

**Prompt** *(Builder Claude)*

```
Read my own stance.md in my named subfolder, then read three to five neighbouring stance.md files from other participant subfolders in the shared folder.

Write cross-check.md in my named subfolder with:
- One thing another agent saw that my stance missed.
- One disagreement I keep after reading the neighbours.
- One evidence gap that appears across more than one stance.
- One idea I should carry into my proposal.
- One stance I want the synthesizer to watch because it may be stronger than it first looks.

Do not summarize every neighbour. Act like a serious peer reviewer with skin in the game.
```

**Prompt 72: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:114`

**Prompt** *(Builder Claude)*

```
Read my stance.md and cross-check.md. Then write my proposal for the shared surface.

Write proposal.md in my named subfolder:
- Crux, one sentence.
- Guiding policy, one sentence.
- Two experiments, each with owner, two-week test, success signal.
- What I changed after cross-checking with other agents.
- What I refused to change, and why.
- One unresolved disagreement the synthesizer must preserve.

Cite every claim against a source file, stance, or cross-check.
```

**Prompt 73: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:136`

**Prompt** *(central synthesizer)*

```
Read selection-board.md at the shared folder root and every participant cross-check.md.

Write midway-instructions.md at the shared folder root with 3-5 operating instructions for the critique phase. These are not conclusions. They are rules for how agents should deliberate from here.

Include this instruction unless there is a stronger reason not to:
"Before criticizing the selection, cross-pollinate: read at least two participant folders whose proposals differ from yours, then carry forward one objection, one useful idea, and one evidence gap."

Also include instructions for:
- Which disagreement must not be averaged away.
- Which evidence gap must be named whenever it affects a claim.
- Which kind of claim needs a citation before the synthesizer can use it.
- Which tempting policy move should be treated skeptically.

Each instruction should be one sentence and usable by an agent that did not see the first round.
```

**Prompt 74: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:161`

**Prompt** *(Builder Claude)*

```
Read midway-instructions.md and selection-board.md at the shared folder root. Follow the injected instructions before writing.

Write critique.md in my named subfolder.

If midway-instructions.md tells me to cross-pollinate, first read the required participant folders and name which files changed my critique.

First, criticize the current selection:
- What did the synthesizer choose well?
- What did it miss?
- Which selected idea is under-cited or overconfident?
- Which rejected idea deserves another look?

Then propose a better idea if you have one:
- Better crux, policy, experiment, or risk.
- Why it beats the current selection.
- What would have to be true for it to work.
- One pre-mortem failure story if the room adopts it.

Cite every claim against a memory file, a shared-folder file, or a selection-board entry.
```

**Prompt 75: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:205`

**Prompt** *(central synthesizer)*

```
Read challenge.md, selection-board.md, midway-instructions.md, every proposal.md, every critique.md, and any pushback.md files. Update selection-board.md if a critique changed the best idea.

Then write three files at the shared folder root:

1. strategy-kernel.md
Four sections: diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where the selected idea beat a strong alternative, name the alternative in one line.

2. agent-set.md
Suggest the set of agents the company should build or assign next. For each agent: job, owner, input files/systems, output, first evaluation or judge, and why this agent belongs in the set. Keep it to the smallest set that can execute the plan.

3. plan.md
Write the plan for the next two weeks. Include sequence, owners, agent dependencies, human decision points, evidence to collect, success signal, and stop condition. Make clear which work can start concurrently and which work must wait.
```

**Prompt 76: Debrief**

Source: `curriculum/trainings/agents-101/agents-building-agents.md:50`

**Prompt** *(Builder Claude)*

```
Review this session and sharpen the file that carried the most weight — most likely the strategy kernel, agent set, plan, or central synthesizer's rules, whichever governed how the agents argued and selected. Read that file, then scan the shared deliberation folder — challenge, context manifests, stances, cross-checks, proposals, selection-board, midway-instructions, critiques, pushback, kernel, agent-set, plan. Identify which synthesizer-injected midpoint instructions actually changed later agent behavior. Look back over the session: where did the flywheel stall (an agent waiting on another that never finished), which role in the round was under-specified so two agents played it or none did, where did the room converge too fast on a plausible proposal, where did a critique land and change a selection, where did the plan invent a dependency that could actually run concurrently (capture that as a rule), what did the session fail to decide and why?

Then rewrite the file. Integrate, don't append. Add the role that was underspec'd, sharpen the rule for how pushback forces a stance-update, remove a rule that made agents defer when they should have argued. Don't add a "retro notes" section; rewrite the file as the better version. Do not close every loop — some of what didn't resolve should stay open, named.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why — grounded in specific moments. Name one thing the session genuinely didn't resolve.
```

_Total prompts: 76_

---

# Agents 101 Prompt Progression (Claude Code Desktop)

Student-facing prompt blocks, in prework/module/include order. Maintainer sections are excluded.
Runtime flavor: Claude Code Desktop.

## Prework — do this before Module 1

Source: `curriculum/trainings/agents-101/prework.md`

**Prompt 1: 1. Install the training folder (3 min)**

Source: `curriculum/trainings/agents-101/prework.md:19`

**Prompt** *(Claude Code)*

```
Extract the starter tarball in the working folder. Use the shell:

  tar xzf starter.tar.gz

(Leave `starter.tar.gz` behind — Cowork's sandbox can't always delete host-dropped files. Harmless.)

Then list what's in the working directory and confirm these folders exist:
prework/, memory/, sources/, agents/, .claude/, and module-4/policies/.
If tar is not available, tell me what error you got.
```

**Prompt 2: 2. Build a snake game (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:39`

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as `prework/snake.html`.
```

**Prompt 3: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:59`

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

**Prompt 4: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:81`

**Prompt** *(Claude Code)*

```
I just attached a screenshot of my calendar week view to this message. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

## Module 1: Getting Going

Source: `curriculum/trainings/agents-101/getting-going.md`

### Opening: Context is King

Source: `curriculum/lectures/context-is-king.md`

### Personal site with guardrails

Source: `curriculum/exercises/personal-site-with-guardrails.md`

**Prompt 5: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:17`

**Prompt** *(Claude Code)*

```
Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `module-1/site.html`.

LinkedIn:
```

**Prompt 6: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:41`

**Prompt** *(Claude Code)*

```
Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.

Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.

Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).

Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.

Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `module-1/site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.
```

**Prompt 7: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:61`

**Prompt** *(Claude Code)*

```
Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.

Then regenerate `module-1/site.html`.

My 3-5 strengths are:
```

**Prompt 8: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:82`

**Prompt** *(Claude Code)*

```
Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
1. Take the hate.
2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.

After step 4, regenerate `module-1/site.html`. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.

Then take maximum freedom on presentation: rethink the page so a colleague lands on it and instantly wants to spend more time with you. You decide structure, ordering, sections, visual rhythm — whatever makes the page actually land. Keep the substance (StoryBrand-tuned help, strengths shaping the voice, anti-branding edge); free hand on the rest.

My hate list:
```

**Prompt 9: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:105`

**Prompt** *(Claude Code)*

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```

**Prompt 10: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:128`

**Prompt** *(Claude Code)*

```
Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.
```

### Closing: What just happened

Source: `curriculum/lectures/what-just-happened.md`

**Prompt 11: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:48`

**Prompt** *(Claude Code)*

```
Read `module-1/personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, tell me in 2–3 lines: what got sharpened, what got added, what got dropped, and why. Add a couple more lines if you spotted something the rules should cover but you want me to weigh in on first.
```

**Prompt 12: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:65`

**Prompt** *(Claude Code)*

```
Spawn a subagent to give an unbiased read on `module-1/site.html`. The subagent should read it cold, with no memory of building it.

Have the subagent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```

## Module 2: Building Agent Systems

Source: `curriculum/trainings/agents-101/building-agent-systems.md`

### Exercise: Name your next big challenge

Source: `curriculum/exercises/name-your-challenge.md`

**Prompt 13: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:39`

**Prompt** *(Claude Code)*

```
I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:

1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
2. What have you already tried, read, or decided? What's ruled out, what's still open?
3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?

When I've answered all three, write a one-paragraph brief to ./challenge.md. Show it to me before saving.
```

**Prompt 14: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:58`

**Prompt** *(Claude Code)*

```
Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:

- 3 to 5 search terms I'd type into our company Confluence or wiki
- 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
- 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

Keep it short. I'll use this as a scavenger-hunt list in the next phase.
```

### Exercise: Build your challenge memory

Source: `curriculum/exercises/build-your-challenge-memory.md`

**Prompt 15: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:25`

**Prompt** *(Claude Code)*

```
I'm building a knowledge memory for one specific challenge I'm working on. Do this in three beats:

1. Check what connectors are enabled right now. Name the ones you can reach (wiki, docs, storage, chat, email) and the ones that would be useful but aren't connected.

2. Then ask me where my work material actually lives. Don't assume Confluence or OneDrive — ask what's in my world: my team's wiki (whatever the tool), my shared drives and docs, email threads, chat channels, personal notes, favourite practitioner blogs. Get specific: tool names, the 2–3 most relevant spaces/folders, the people I've been exchanging on this challenge.

3. Then propose a curation plan covering three kinds of material: (a) internal knowledge — which searches in which tools, (b) recent work — which threads, folders, decks, (c) outside-in — 2–3 working practitioners or specific articles worth reading (not vendor blogs).

One rule for the plan: only recommend sources I would feel comfortable sharing with an LLM today. If something is likely to be sensitive — board material, personal emails, customer data, HR records — flag it as "skip for now, revisit after Module 4" rather than putting it in the plan. I'll push back where the plan is off.
```

**Prompt 16: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:46`

**Prompt** *(Claude Code)*

```
For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:

- Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
- Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
- Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
- Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — share with me when you want this included." Don't ask me to paste anything; if I want it included, I'll share the file.

When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.
```

**Prompt 17: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:77`

**Prompt** *(Claude Code)*

```
Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.

Rules — non-negotiable:

1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.

2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.

3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.
```

**Prompt 18: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:98`

**Prompt** *(Claude Code)*

```
Pick 3 memory pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in memory/soft-pages.md.
```

**Prompt 19: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:115`

**Prompt** *(Claude Code)*

```
Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:

1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
2. What rules matter? Starter rules: cite the memory file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.

Pick a filename from the job. Show me the file before saving.
```

**Prompt 20: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:131`

**Prompt** *(Claude Code)*

```
Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.
```

**Prompt 21: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:146`

**Prompt** *(Claude Code)*

```
Take the source below and integrate it into the memory. Steps:

1. Read the source. Integrate its claims into existing pages (sharpen, don't append). Drop any claim the source contradicts. For new topics, add pages in the existing shape. Update memory/index.md.
2. Rewrite tops in place. Replace old framing; don't preserve it above a new section.

When you're done, tell me three pages that got sharper (not longer) and one claim that got dropped or replaced.

New source:
```

**Prompt 22: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:164`

**Prompt** *(Claude Code)*

```
Review the memory. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.
```

**Prompt 23: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:179`

**Prompt** *(Claude Code)*

```
Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:
```

### Lecture: Compounding

Source: `curriculum/lectures/compounding.md`

**Prompt 24: One more compounding turn**

Source: `curriculum/lectures/compounding.md:48`

**Prompt** *(Claude Code)*

```
Look at the memory I just built. Pick the three topic pages that are still the most generic — any competitor in this industry could write them. For each, tell me: what specific source would sharpen it most, and what's the one question you'd ask me right now to pull the missing insight out of my head?
```

**Prompt 25: Debrief**

Source: `curriculum/trainings/agents-101/building-agent-systems.md:50`

**Prompt** *(Claude Code)*

```
Review this session and write the first version of CLAUDE.md at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on — how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Don't invent — extract. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Structure however makes sense for how we actually worked today — section headers, short paragraphs, bullets where a list is clearest. No retro-notes framing; write the rules as if they'd always been the rules. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and whatever else earned its place.

When you're done, tell me in 3–5 lines: the rules you wrote, which session moments grounded each one, and what you chose NOT to include and why. I shouldn't have to open the file to know what's in it.
```

## Module 3: Multi-Agent Systems

Source: `curriculum/trainings/agents-101/multi-agent-systems.md`

### Exercise: Name your crux

Source: `curriculum/exercises/name-your-crux.md`

**Prompt 26: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:13`

**Prompt** *(Claude Code)*

```
Look at my challenge memory. Find the load-bearing obstacle: the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux."

Rules:
- Not a problem restatement. "We need to build credibility" is a goal, not a crux. "Prospects won't meet us until someone they trust vouches" IS a crux: it names the mechanism that blocks everything else.
- Not a category. "Positioning is unclear" is a category. "Buyers can't tell in 30 seconds whether we sell training or consulting" is specific enough to act on.
- Test it: if this obstacle moved, would at least three other stuck things release? If not, keep looking. It isn't the crux.

One sentence. Save it to ./crux.md under a `## Crux` heading; show me before saving.
```

**Prompt 27: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:33`

**Prompt** *(Claude Code)*

```
Open ./crux.md and read the crux you just saved. What's the sharpest decision this crux blocks? One sentence. Not a topic, not a summary. A real call you'd stay late to make. Something like *"what's the right next move to unblock the crux, over the next 90 days?"* is a decent default. *"Should we kill option A?"* is better if that's where you are.

Append a `## Question` section to ./crux.md with the decision question. Don't overwrite the crux above. Show me before saving.
```

### Exercise: Three retrievers, one curator

Source: `curriculum/exercises/three-retrievers-one-curator.md`

**Prompt 28: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:48`

**Prompt** *(Claude Code)*

```
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Write your findings to sources/wiki-retrieval.md, one paragraph per finding, naming the page/space and one line on why this matters for the question. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
```

**Prompt 29: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:69`

**Prompt** *(Claude Code)*

```
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Write your findings to sources/docs-retrieval.md, what documents and threads show, who said what, what's recent, what's decided, what's still open. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
```

**Prompt 30: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:90`

**Prompt** *(Claude Code)*

```
You are the internet retriever for my challenge. Your job: find practitioner-grade external material on ./crux.md (the crux you named in the opening, plus the ## Question section). No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 6 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Write your findings to sources/internet-retrieval.md, what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine.
4. End the file with "Conflicts and gaps": where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the URL you actually fetched and the author. If a fetch fails or returns nothing useful, write "[NOT FOUND]", do not fabricate article titles, quotes, or author positions from prior knowledge.
```

**Prompt 31: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:113`

**Prompt** *(Claude Code, reusable across all three retriever sessions)*

```
Push another round. What did the first pass miss? Different angles, related sources, the citations inside what you already opened — keep going until the file feels complete or you genuinely don't find new material. Append; don't rewrite.
```

**Prompt 32: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:122`

**Prompt** *(Claude Code)*

```
You are the synthesizer for my challenge. Three retrievers are running concurrently in Sessions 1, 2, and 3 — they'll write findings to sources/wiki-retrieval.md, sources/docs-retrieval.md, and sources/internet-retrieval.md as they finish. Your job is curation: integrate those findings into my memory/ topic pages, scoped to ./crux.md (the crux you named in the opening, plus the ## Question section).

Memory is curated, not a raw dump. Existing topic pages cover the challenge — extend them where the new sources sharpen what's already there; create a new topic page where the retrievals reveal a topic memory was missing. Cite sources by filename + paragraph.

The loop:
1. Wait for any new content in sources/. When a file appears (or grows), read it.
2. Diff against existing memory/ pages. Decide: extend an existing page, or write a new one?
3. Make the update. Cite the source file by name. Integrate, don't append. Keep claims tight.
4. Repeat until all three retrievals are integrated.

When all three retrievals are in: write a one-paragraph note at memory/_synthesis-m3.md naming what changed, what's now sharper, where retrievals contradicted what was already in memory. That contradiction line is load-bearing — flag it, don't smooth it.

Don't fabricate. Every memory update cites a source-file finding. If a retrieval is empty or thin, say so in your synthesis note rather than papering over the gap.
```

### Exercise: Three minds, one synthesis

Source: `curriculum/exercises/three-minds-one-synthesis.md`

**Prompt 33: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:32`

**Prompt** *(Claude Code)*

```
Spawn three subagents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Subagent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Subagent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Subagent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append an `## Answer` section to ./crux.md with the three legs. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
```

**Prompt 34: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:75`

**Prompt** *(Claude Code, optional)*

```
You choose fixes. Aim for optimal function in the next session that runs on this.
```

### Lecture: When to split an agent (and how)

Source: `curriculum/lectures/when-to-split-an-agent.md`

### Lecture: Debugging stuck agents

Source: `curriculum/lectures/debugging-stuck-agents.md`

**Prompt 35: Debugging Stuck Agents**

Source: `curriculum/lectures/debugging-stuck-agents.md:11`

**Prompt** *(Claude Code)*

```
Find the root cause of this bug.

Read the relevant files and the recent session context. Tell me whether the failure is mainly:
1. a source problem: missing, stale, contradictory, or unread evidence
2. a processing problem: wrong prompt, wrong role, bad handoff, vague output shape, or synthesis that averaged away disagreement
3. a boundary problem: the agent tried to use data, tools, or authority it should not have had

Do not fix anything yet. Show me the failure chain in 5 bullets: what happened, where it started, where it became visible, what file or prompt caused it, and the smallest fix that would prevent the next run.
```

**Prompt 36: Debrief**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:46`

**Prompt** *(Claude Code)*

```
Review this session and update the rules. Read CLAUDE.md at the root, then scan what we just produced: agents/, sources/, module-3/. Look back over the session: where did agents step on each other, where did context get dropped at a handoff, where did one retriever's dialect leak into the synthesizer, where did the three stances collapse into a single voice, where did one agent need to be two (or two to be one)?

Then rewrite CLAUDE.md. Integrate, don't append. Sharpen the rules that govern division of work and handoff shape: what each agent is for, what it writes to, what it does NOT do. Add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific moments from the session. Name at least one handoff seam where the rules wobbled.
```

**Prompt 37: Homework after Module 3**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:70`

**Prompt** *(Claude Code)*

```
Look at memory/ and sources/ against this module's fresh retrievals. Check overall health: coverage gaps the retrievers exposed, pages now stale, structure still serving the challenge. Restructure if deemed needed (rename, merge, split, drop). Show me what you'd do before changing files.
```

## Module 4: Security

Source: `curriculum/trainings/agents-101/security.md`

### Lecture: The discipline of risk

Source: `curriculum/lectures/practice-of-risk.md`

### Exercise: Run and package a security skill

Source: `curriculum/exercises/author-security-skill.md`

**Prompt 38: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:19`

**Prompt** *(Claude Code)*

```
Read everything in module-4/policies/. Use those policy references to audit the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule you can derive from the policy files, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the raw report to outputs/policy-report-raw.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Do not create a skill yet. This is the raw run.
```

**Prompt 39: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:39`

**Prompt** *(Claude Code)*

```
I want to turn the useful parts of outputs/policy-report-raw.md into reusable security expertise for the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

Before you read or write any package files, ask me for 3-5 lines about what matters from my own head: the data, policy rule, customer, source, workflow, or failure mode I most want this reusable check to catch. Wait for my answer.

After I answer, read outputs/policy-report-raw.md and everything in module-4/policies/. Then propose the reusable package shape for my runtime and wait for me to steer.
```

**Prompt 40: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:59`

**Prompt** *(Claude Code)*

```
Author the reusable security check now. Two lenses.

Build one personal skill source under module-4/skills/security-audit/. The main file is SKILL.md. It contains both lenses: POLICY and AGENT-SECURITY. Add supporting reference files only where useful.

For CLI and Claude Code Desktop, also make the standalone-skill install shape clear: module-4/skills/security-audit/SKILL.md becomes ~/.claude/skills/security-audit/SKILL.md during install. Do not write into ~/.claude yet; keep the authored source under module-4/skills/security-audit/ for now.

Lens 1 - POLICY. Rules drawn from everything in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Check what the agent can reach, what sensitive material might stay in its context, and what could go wrong because ordinary text can act like an instruction. The lens MUST cover these named risk patterns by name:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do: for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- skill supply-chain (the skill itself, or any skill the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each pattern, the lens produces one or two specific risks in the target system, ranked, with one suggested agent mitigation per risk - scope, split, filter, gate, or review. These sit on top of normal company controls (network controls, identity and access management, logging, vendor/security review), not in place of them. Name that explicitly in the lens's preamble.

Before you save anything, grill me on missing details that can sharpen the lens or that would ruin the audit run. Cover both lenses, especially the policy lens, where there is no named-class rail to fall back on. Don't stop at one question. I'll tell you when enough is enough.

After I answer, save the files. Keep the SKILL.md tight: when to use it, the two lenses it applies, the report shape each lens produces. Show me what you saved and confirm this package-complete checklist:
- module-4/skills/security-audit/SKILL.md
- any supporting reference files the SKILL.md requires
```

### Exercise: Audit your agent

Source: `curriculum/exercises/audit-your-agent.md`

**Prompt 41: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:60`

**Prompt** *(Claude Code)*

```
Apply the policy lens of the reusable security check I authored to the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule the reusable check carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the packaged-lens report to outputs/policy-report.md. If outputs/policy-report-raw.md exists, briefly note one way the packaged report is sharper, narrower, or more specific than the raw run. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

After writing the report, read outputs/policy-report.md back to yourself and tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```

**Prompt 42: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:87`

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the reusable security check to the same system. Run both checks: what the agent can reach, and the named risk patterns the lens carries.

For access control: list every outside system or sensitive place the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For the named risk patterns (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, skill supply-chain): for each pattern, name the top one or two specific risks in my system, not generic definitions. Quote the file or behaviour that creates the risk.

For each risk flagged, suggest one mitigation for how the agent works - scope, split, filter, gate, or review - matched to the specific risk. These sit on top of the normal company controls already in place (network controls, identity and access management, logging, vendor/security review), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to outputs/security-report.md. Include the ranked mitigation suggestions.
```

**Prompt 43: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:111`

**Prompt** *(Claude Code)*

```
Apply a mitigation to my system for the risk I'm about to name. Pick the shape from the five (scope, split, filter, gate, review), make the file or instruction changes, and walk me through what you did and why. If the shape doesn't fit, I'll tell you and we'll iterate.

Then re-run the check the reusable lens performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then append a short section to outputs/security-report.md named "Mitigation applied and residual". Name what changed, what the new verdict is, and what's still true after the mitigation. Do not rewrite the earlier report. Not what we fixed. What's left. Be specific.

The risk:
```

**Prompt 44: Debrief**

Source: `curriculum/trainings/agents-101/security.md:46`

**Prompt** *(Claude Code)*

```
Review this session and compound 1-5 security operating rules into the agent system. Read the root ./CLAUDE.md if it exists. Read outputs/policy-report-raw.md if it exists, outputs/policy-report.md, and outputs/security-report.md. Look back over the session: which rows should future sessions remember, which "I can't tell" rows need standing evidence checks, where did the mitigation reduce one risk but shift another, and what residuals should future sessions not forget?

Then update ./CLAUDE.md as the durable operating memory for this agent system. Add or sharpen 1-5 short security rules that future sessions should load before working with this system: what to check, what not to touch, when to run the reusable security check, or which residuals from outputs/security-report.md must stay visible. Integrate them into the right section if one exists; otherwise create a short section named "Security operating rules". Do not edit the skill files. Do not paste an audit summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in ./CLAUDE.md, which report row or residual drove it, what future agents must do differently, and what risk remains even after the mitigation.
```

## Module 5: Output Quality and Hallucination Control

Source: `curriculum/trainings/agents-101/output-quality.md`

### Lecture: Grounded, and four candidates to measure

Source: `curriculum/lectures/grounded.md`

### Exercise: Hallucination benchmark

Source: `curriculum/exercises/hallucination-bakeoff.md`

**Prompt 45: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:23`

**Prompt** *(Claude Code)*

```
Spawn one subagent to create the benchmark target.

The briefing is the test corpus. Aim for roughly 10% fabrication or misrepresentation so the detectors have something to catch. You cannot make that number precise. Treat it as a direction, not a target metric.

Instructions for the subagent:
- Use the strategic question in `./crux.md` under `## Question`.
- Use the material in `module-3/stances/`.
- Choose a bounded evidence roster before writing the briefing. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the challenge clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Use only the rostered evidence files as the evidence surface for the briefing.
- Produce a one-page briefing on the challenge.
- Include three specific named entities relevant to the challenge (companies, teams, systems, customers, products, policies, or people).
- Include at least two verbatim quotes from rostered evidence files.
- Include at least one number or measurable claim.
- Include two claims that use outside/common knowledge beyond the files.
- Include a next action with a measurable outcome.
- Where the sources do not cover something, blend in general knowledge. Do not hedge.
- Do not browse the web.
- Save the briefing to `module-5/briefing.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
```

**Prompt 46: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:56`

**Prompt** *(Claude Code)*

```
Open `module-5/briefing.md`. Extract exactly 30 varied claims from the briefing.

Use short verbatim excerpts from the briefing wherever possible, so later detector findings can be matched back to the briefing. Include a mix of claim shapes:
- numbers or measurable outcomes
- named-entity claims
- quotes or paraphrases attributed to sources
- causal claims
- comparison claims
- recommendation or next-action claims
- claims that seem obviously grounded
- claims that smell like overreach

Do not judge whether the claims are grounded yet. Do not ask me questions. Save the claim pool to `module-5/claim-pool.md`.
```

**Prompt 47: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:86`

**Prompt** *(Claude Code)*

```
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is a subagent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
```

**Prompt 48: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:135`

**Prompt** *(Claude Code)*

```
You are the scorer for a four-way detector benchmark. Your inputs:

- Claim pool: `module-5/claim-pool.md`
- Briefing: `module-5/briefing.md`
- Evidence roster: `module-5/evidence-roster.md` and the rostered evidence files named there
- Detector output 1: `module-5/detectors/source-triangulation.md`
- Detector output 2: `module-5/detectors/entailment.md`
- Detector output 3: `module-5/detectors/citation-integrity.md`
- Detector output 4: `module-5/detectors/counter-evidence.md`

Your job: adjudicate the 30 claims, score each detector against that adjudication, produce a scoreboard, name a winner.

First, create the reference adjudication. For every claim in `module-5/claim-pool.md`, label it GROUNDED, UNGROUNDED, or PARTLY GROUNDED. Quote the evidence line or file that supports the label. If you cannot find support in the rostered evidence, say so plainly. Save this reference set to `module-5/adjudicated-claims.md`.

For each detector:
1. Match detector findings to claim-pool claims by strict substring match. If you can't find the exact claim-pool phrase in the detector's output, count as MISS. Do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each claim, check whether the detector flagged it. If the adjudication says UNGROUNDED or PARTLY GROUNDED, the detector should have flagged it. Count that as a hit. If the adjudication says GROUNDED, the detector should not have flagged it. Count that as a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total claims adjudicated UNGROUNDED or PARTLY GROUNDED). Coverage = how many of the 30 claim-pool claims the detector looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.
```

**Prompt 49: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:174`

**Prompt** *(Claude Code)*

```
Two things, in the chat.

First, three lines on the classic way:
1. What the classic way to quality-check this briefing would have been.
2. Whether it would have been faster or slower than this benchmark.
3. Why.

Second, ask me which row of the scoreboard surprised me most — the detector that did better or worse than I'd have guessed, or the claim that turned out to be harder to flag than it looked. Wait for my one-sentence answer before we move to saving the judge.
```

**Prompt 50: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:194`

**Prompt** *(Claude Code)*

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant evidence files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
```

### Lecture: Self-consistency after the scoreboard

Source: `curriculum/lectures/self-consistency-after-scoreboard.md`

**Prompt 51: Debrief**

Source: `curriculum/trainings/agents-101/output-quality.md:48`

**Prompt** *(Claude Code)*

```
Review this session and update the root `./CLAUDE.md` with groundedness operating rules. Read `./CLAUDE.md` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Look back over the session: when did ungroundedness matter, which claim-shapes needed checking, where did citations look present but not load-bearing, and what should future agents know before they turn a briefing, memo, recommendation, or proposed action into something people rely on?

Then update `./CLAUDE.md` as the durable operating memory for this agent system. Add or sharpen 1-4 short rules that tell future sessions when and how to run groundedness checks: what kinds of output need checking, which evidence surface to use, when to run `judges/groundedness-judge.md`, and when to say "not enough evidence" instead of smoothing over the gap. Integrate the rules into the right section if one exists; otherwise create a short section named "Groundedness checks". Do not paste a benchmark summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in `./CLAUDE.md`, which scoreboard row or adjudicated claim drove it, what future agents must do differently, and what uncertainty remains.
```

## Module 6: Evaluations

Source: `curriculum/trainings/agents-101/evaluations.md`

### Lecture: Evals as steering

Source: `curriculum/lectures/evals-as-steering.md`

### Exercise: The eval loop runs itself

Source: `curriculum/exercises/eval-loop.md`

**Prompt 52: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:23`

**Prompt** *(Claude Code)*

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in ./crux.md, using sources/ and module-3/stances/ for grounding. Use the same rough shape as the Module 5 test corpus: a concrete number, two contrasting takes, a competitor or outside-world claim, one quote, and one recommended action. Mark anything that relies on general knowledge rather than the local files. Save to module-6/fresh-briefing.md.

2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim, the judge's verdict, and one sentence of per-claim feedback naming what would make it more groundable. Save to module-6/first-run-judgment.md.

3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge did not reach that you would still want checked.
```

**Prompt 53: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:46`

**Prompt** *(Claude Code)*

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- If judges/groundedness-judge.md is missing, stop and tell me Module 5 has not handed off the judge yet.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md with this starting tactic: "Produce a one-page briefing on the question in ./crux.md. Use sources/ and module-3/stances/. Prefer local evidence. Mark anything that relies on general knowledge. No special rules yet."
- Create the module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/ directories as needed.

For each of 3 rounds:
1. Dispatch a generator subagent. It must read ./generation-tactic.md, ./crux.md, sources/, and module-3/stances/. It writes the briefing for that round:
   - round 1: module-6/runs/round-1/briefing.md
   - round 2: module-6/runs/round-2/briefing.md
   - round 3: module-6/runs/round-3/briefing.md
2. Dispatch a separate judge subagent. It must read judges/groundedness-judge.md and the briefing for that round. It writes the judgment for that round:
   - round 1: module-6/runs/round-1/judgment.md
   - round 2: module-6/runs/round-2/judgment.md
   - round 3: module-6/runs/round-3/judgment.md
   Each judgment includes verdicts and one-sentence feedback per claim, plus a top-line count of flagged claims.
3. The main session, not a subagent, reads the judgment for that round and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. Save a short explanation of the change for that round:
   - round 1: module-6/runs/round-1/tactic-change.md
   - round 2: module-6/runs/round-2/tactic-change.md
   - round 3: module-6/runs/round-3/tactic-change.md

After round 3:
- Write module-6/eval-notes.md with the score trajectory, the tactic change after each round, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
```

**Prompt 54: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:134`

**Prompt** *(Claude Code)*

```
Claude: can we scale this by adding more generation tracks to try more options faster?
```

**Prompt 55: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:142`

**Prompt** *(Claude Code)*

```
Claude: what is the similarity to model training here? Tell me in 5 snippets, one at a time. After each snippet, wait for me to say "next."
```

**Prompt 56: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:152`

**Prompt** *(Claude Code)*

```
Show me module-6/eval-notes.md and ./generation-tactic.md.

Then answer in five bullets:
- Did the judge file stay byte-identical?
- What was the score trajectory?
- Which tactic change most clearly improved the next round?
- Which failure did the tactic still not absorb?
- What would you test in the next run?
```

**Prompt 57: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:192`

**Prompt** *(Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: a subagent produces the output using a tactic file I can read.
- Scoring + feedback: a separate judge subagent runs the judge and writes per-claim or per-item feedback alongside the score.
- Tactic update: between rounds, the main session reads the feedback and rewrites the tactic file. The judge file stays untouched.
- Notes: after three rounds, write the score trajectory, the tactic changes, the judge-integrity check, and the next boundary case to test.

Ask me one question at a time, wait for my answer, and do not show the list. You need to know where the judge lives, where to save round artifacts, and what topic or output to generate. Then run the loop end to end. The judge file is never written to by anything in this loop.
```

### Closing: The new human role in the loop

Source: `curriculum/lectures/new-human-role-in-the-loop.md`

**Prompt 58: Make the goal-nudger**

Source: `curriculum/lectures/new-human-role-in-the-loop.md:87`

**Prompt** *(Claude Code)*

```
Help me create a steering eval for internal mail I might let an agent draft or send.

The eval is not a groundedness check. Assume groundedness is handled by `judges/groundedness-judge.md`. This eval should create positive pressure to overperform on one dimension that matters for my work.

Ask me one question at a time, wait for my answer, and do not show the list. Keep asking until the dimension is judgeable. Start by offering examples I can choose from or adapt:

- executive crispness
- commercial sharpness
- specificity
- risk awareness
- actionability
- reader empathy
- strategic usefulness
- sounds like our team

If I choose a vague word, keep asking until it becomes observable. For example, "strategic usefulness" might become: names the tradeoff, states a point of view, and gives the decision-maker a next move.

Once the dimension is clear, show me:

1. The dimension name.
2. A one-sentence definition.
3. Three examples: a 5/5 mail excerpt, a 3/5 mail excerpt, and a 1/5 mail excerpt.
4. The scoring rubric from 1 to 5.
5. What the eval should ask the agent to improve when the score is 3 or lower.

Then save the eval as `./goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
```

**Prompt 59: Debrief**

Source: `curriculum/trainings/agents-101/evaluations.md:53`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the generator's tactic beyond what the loop reached. Read ./generation-tactic.md in its current state, then scan module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not move; that is the integrity of the loop. Look back over the session: which tactic change helped, which one did not help and should be removed or rewritten, what specific boundary case did the loop never test, where did the generator keep missing the same thing across multiple rounds, and what did the judge flag that the tactic never absorbed?

Then rewrite ./generation-tactic.md. Integrate, don't append. Add the tactic rule the loop never reached, sharpen a rule that stayed too vague, remove a rule that fired on the wrong thing. The tactic file is infrastructure now. Every rule should name the failure class it pre-empts. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
```

## Module 7: From Personal to Team

Source: `curriculum/trainings/agents-101/personal-to-team.md`

### Exercise: Share your work

Source: `curriculum/exercises/share-your-work.md`

**Prompt 60: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:24`

**Prompt** *(Builder Claude)*

```
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then use your ask-questions tool to confirm or correct each piece. Five to eight
questions, each with three or four options you drew from my memory. I'll pick.
Don't ask me to type freeform answers — the point is that you already have most
of this on disk.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the questions
I answered. Show me the file before saving.
```

**Prompt 61: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:148`

**Prompt** *(Builder Claude)*

```
Find the absorption bottleneck in my sharing problem. Read module-7/jtbd.md and module-7/branch.md, plus anything else in module-7/ so far. The question is not "how do I share?" — it's "what's the single load-bearing obstacle between my teammate and firing their current hire?"

List the obstacles you see — technical, social, political, habitual, governance, trust. Cluster them. Name the bottleneck: the one that, if removed, makes several others easier. State it in one sentence.

Save to module-7/absorption-bottleneck.md. Show me before saving.
```

**Prompt 62: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:165`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/branch.md, and module-7/absorption-bottleneck.md. Help me draft two files in
parallel — a technical plan and a people plan. Both are about whether this
teammate can actually fire their current hire and start using my candidate.

File 1: module-7/technical-plan.md — how the candidate delivers the outcome.
- What exactly I ship (files, skills, config, runtime).
- How the teammate receives it (zip, repo, connector, invite).
- What "it moves the outcome metric for them" looks like — concrete, measurable.
- The first real test case they'd run, against the job from the JTBD brief.

File 2: module-7/people-plan.md — equally load-bearing. Cover all five:
- Ownership: named person accountable. Not a role.
- Governance: who can add to the memory, change the rules, see the output.
- Operating: who notices when the outcome metric slips. What they do about it. If the obvious name is also the person who benefits most, name a second person who'd notice independently — otherwise the only alarm is the person with a reason to silence it.
- Accountability: who decides the candidate is no longer doing the job — who
  fires the hire.
- Propagation: who teaches the next person, when.

Ask me anything you need. Don't invent names. If I don't know, write
"UNASSIGNED — Monday's question" and keep moving. Missing names are findings,
not failures.

Show me both before saving.
```

**Prompt 63: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:200`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/absorption-bottleneck.md, module-7/technical-plan.md, and module-7/people-plan.md.

Test the assumptions in these plans. Aim it at the SWITCH, not at generic sharing:

What would have to be true for this specific teammate, doing this specific
job, to fire their current hire and use my candidate?

List the top five assumptions the switch depends on. For each:
- State it as a declarative sentence.
- Rate confidence (high / medium / low) based on what I've told you.
- Name one concrete way I could test it this week — one conversation, one
  small experiment, one quick check.

Order from most load-bearing to least. Save to module-7/assumptions.md.
Let the assumption-test change the confidence in the plans — don't just append
a new section. Show me before saving.
```

**Prompt 64: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:228`

**Prompt** *(Builder Claude)*

```
It is six months from now. My teammate
kept using their current hire. My candidate sat unused, or they tried it twice
and fired it.

Read module-7/jtbd.md, module-7/technical-plan.md, module-7/people-plan.md, and
module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- Most likely social failure — about the incumbent, the teammate, the
  workflow. "They trust their own spreadsheet more than any agent output" is
  usually closer than "it broke technically."
- Most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — bias your thinking toward what I seem to be
  assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if
this were starting to happen.

Save to module-7/failure-stories.md.
```

**Prompt 65: Debrief**

Source: `curriculum/trainings/agents-101/personal-to-team.md:59`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the sharing artifact. Read everything in module-7/ (jtbd, branch, absorption-bottleneck, technical-plan, people-plan, assumptions, failure-stories, monday) and identify which single file is the sharing artifact itself (the skill file, the interface spec, the output schedule, the context export, whichever pattern I picked produces the thing the teammate actually touches). Then look back over the session: where did the teammate's job-to-be-done stay unnamed or too abstract, where does the artifact leak more than the teammate needs (over-shared) or less than they can use (under-shared), where is the people plan thin (no name, no owner, no handoff), which assumption would have to be true for this to land and isn't?

Then rewrite the sharing artifact. Integrate, don't append. Name the teammate's job explicitly at the top, tighten the surface area so it fits the job (not your whole system), add the one line the people plan needed. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why, grounded in specific moments from the exercise. Name the one assumption the artifact still depends on.
```

## Module 8: Agents Building Agents (The Flywheel)

Source: `curriculum/trainings/agents-101/agents-building-agents.md`

### Exercise: Extend your system

Source: `curriculum/exercises/extend-your-system.md`

**Prompt 66: Exercise: Extend your system**

Source: `curriculum/exercises/extend-your-system.md:32`

**Prompt** *(Builder Claude)*

```
Read module-8/extension-brief.md. Build the agent described in it. Write the agent file to agents/<slug>.md — the slug comes from the job, not the technology.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to agents/<slug>.md, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
```

### Exercise: Agent Proposal Forum (diagnose and guide)

Source: `curriculum/exercises/joint-double-diamond.md`

**Prompt 67: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:32`

**Prompt** *(buyer/sponsor agent, run once at the start)*

```
Use the shared folder the trainer posted in chat. Write challenge.md at the shared folder root.

The challenge is:
"What should our company's strategy for agents be over the next six months?"

Make it concrete for this room:
- The buyer/sponsor goal in one paragraph.
- Three constraints the strategy must respect.
- Two non-negotiables.
- Three kinds of evidence that matter most.
- One decision the room must make today.

Do not solve it. Seed the challenge so the agents have something real to argue with.
```

**Prompt 68: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:50`

**Prompt** *(Builder Claude, run once after challenge.md exists)*

```
Use the shared folder the trainer posted in chat. Create a subfolder named after me if it does not exist. Write context-manifest.md in that subfolder. List:
- Which modules' working folders I carry (module-1 through module-7).
- Which memory/ pages I have, by topic.
- Which sources/ I've fetched content for, vs. which are reference-only or NOT REACHABLE.
- Which custom agents I've built, by job.
- One sentence per major gap — what my system does NOT know about.

Keep it dense. Half a page. The point is other agents (and other people) can see at a glance what I bring and what I don't, before they cite me or weigh my position.
```

**Prompt 69: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:70`

**Prompt** *(Builder Claude)*

```
Read challenge.md at the shared folder root.

Write my initial stance on the sponsor challenge.

Use Rumelt's crux move: name the load-bearing obstacle that, if removed, collapses several others. Then name the direction I currently favor.

Your ground is my own memory/, sources/, agents/, module-1/ through module-7/ outputs, plus my context-manifest.md so you know what I don't have. Do not read other participants' stance.md files yet. This first note should carry my agent's own position.

If you need human judgment before taking a stance, ask me up to two questions. After I answer, write the stance.

Rules:
- Every obstacle you name cites a file. "The sales team is skeptical" is not an obstacle — "sales-skepticism as described in module-3/interviews.md line 14" is.
- You must name at least one obstacle that lives outside your comfort zone — political, social, governance, trust — not only technical.
- Name the crux in one sentence.
- Name the direction I currently favor in one sentence.
- Name the human judgment call I am least certain about.
- Name one risk or objection my stance is weak against.

Save stance.md in my named subfolder in the shared folder.
```

**Prompt 70: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:97`

**Prompt** *(Builder Claude)*

```
Read my own stance.md in my named subfolder, then read three to five neighbouring stance.md files from other participant subfolders in the shared folder.

Write cross-check.md in my named subfolder with:
- One thing another agent saw that my stance missed.
- One disagreement I keep after reading the neighbours.
- One evidence gap that appears across more than one stance.
- One idea I should carry into my proposal.
- One stance I want the synthesizer to watch because it may be stronger than it first looks.

Do not summarize every neighbour. Act like a serious peer reviewer with skin in the game.
```

**Prompt 71: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:114`

**Prompt** *(Builder Claude)*

```
Read my stance.md and cross-check.md. Then write my proposal for the shared surface.

Write proposal.md in my named subfolder:
- Crux, one sentence.
- Guiding policy, one sentence.
- Two experiments, each with owner, two-week test, success signal.
- What I changed after cross-checking with other agents.
- What I refused to change, and why.
- One unresolved disagreement the synthesizer must preserve.

Cite every claim against a source file, stance, or cross-check.
```

**Prompt 72: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:136`

**Prompt** *(central synthesizer)*

```
Read selection-board.md at the shared folder root and every participant cross-check.md.

Write midway-instructions.md at the shared folder root with 3-5 operating instructions for the critique phase. These are not conclusions. They are rules for how agents should deliberate from here.

Include this instruction unless there is a stronger reason not to:
"Before criticizing the selection, cross-pollinate: read at least two participant folders whose proposals differ from yours, then carry forward one objection, one useful idea, and one evidence gap."

Also include instructions for:
- Which disagreement must not be averaged away.
- Which evidence gap must be named whenever it affects a claim.
- Which kind of claim needs a citation before the synthesizer can use it.
- Which tempting policy move should be treated skeptically.

Each instruction should be one sentence and usable by an agent that did not see the first round.
```

**Prompt 73: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:161`

**Prompt** *(Builder Claude)*

```
Read midway-instructions.md and selection-board.md at the shared folder root. Follow the injected instructions before writing.

Write critique.md in my named subfolder.

If midway-instructions.md tells me to cross-pollinate, first read the required participant folders and name which files changed my critique.

First, criticize the current selection:
- What did the synthesizer choose well?
- What did it miss?
- Which selected idea is under-cited or overconfident?
- Which rejected idea deserves another look?

Then propose a better idea if you have one:
- Better crux, policy, experiment, or risk.
- Why it beats the current selection.
- What would have to be true for it to work.
- One pre-mortem failure story if the room adopts it.

Cite every claim against a memory file, a shared-folder file, or a selection-board entry.
```

**Prompt 74: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:205`

**Prompt** *(central synthesizer)*

```
Read challenge.md, selection-board.md, midway-instructions.md, every proposal.md, every critique.md, and any pushback.md files. Update selection-board.md if a critique changed the best idea.

Then write three files at the shared folder root:

1. strategy-kernel.md
Four sections: diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where the selected idea beat a strong alternative, name the alternative in one line.

2. agent-set.md
Suggest the set of agents the company should build or assign next. For each agent: job, owner, input files/systems, output, first evaluation or judge, and why this agent belongs in the set. Keep it to the smallest set that can execute the plan.

3. plan.md
Write the plan for the next two weeks. Include sequence, owners, agent dependencies, human decision points, evidence to collect, success signal, and stop condition. Make clear which work can start concurrently and which work must wait.
```

**Prompt 75: Debrief**

Source: `curriculum/trainings/agents-101/agents-building-agents.md:50`

**Prompt** *(Builder Claude)*

```
Review this session and sharpen the file that carried the most weight — most likely the strategy kernel, agent set, plan, or central synthesizer's rules, whichever governed how the agents argued and selected. Read that file, then scan the shared deliberation folder — challenge, context manifests, stances, cross-checks, proposals, selection-board, midway-instructions, critiques, pushback, kernel, agent-set, plan. Identify which synthesizer-injected midpoint instructions actually changed later agent behavior. Look back over the session: where did the flywheel stall (an agent waiting on another that never finished), which role in the round was under-specified so two agents played it or none did, where did the room converge too fast on a plausible proposal, where did a critique land and change a selection, where did the plan invent a dependency that could actually run concurrently (capture that as a rule), what did the session fail to decide and why?

Then rewrite the file. Integrate, don't append. Add the role that was underspec'd, sharpen the rule for how pushback forces a stance-update, remove a rule that made agents defer when they should have argued. Don't add a "retro notes" section; rewrite the file as the better version. Do not close every loop — some of what didn't resolve should stay open, named.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why — grounded in specific moments. Name one thing the session genuinely didn't resolve.
```

_Total prompts: 75_

---

# Agents 101 Prompt Progression (Cowork)

Student-facing prompt blocks, in prework/module/include order. Maintainer sections are excluded.
Runtime flavor: Cowork.

## Prework — do this before Module 1

Source: `curriculum/trainings/agents-101/prework.md`

**Prompt 1: 1. Install the training folder (3 min)**

Source: `curriculum/trainings/agents-101/prework.md:19`

**Prompt** *(Claude Code)*

```
Extract the starter tarball in the working folder. Use the shell:

  tar xzf starter.tar.gz

(Leave `starter.tar.gz` behind — Cowork's sandbox can't always delete host-dropped files. Harmless.)

Then list what's in the working directory and confirm these folders exist:
prework/, memory/, sources/, agents/, .claude/, and module-4/policies/.
If tar is not available, tell me what error you got.
```

**Prompt 2: 2. Build a snake game (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:39`

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as `prework/snake.html`.
```

**Prompt 3: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:59`

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

**Prompt 4: 3. Summarize your week in meetings (10 min)**

Source: `curriculum/trainings/agents-101/prework.md:90`

**Prompt** *(Claude Code)*

```
I just attached a screenshot of my calendar week view to this message. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

## Module 1: Getting Going

Source: `curriculum/trainings/agents-101/getting-going.md`

### Opening: Context is King

Source: `curriculum/lectures/context-is-king.md`

### Personal site with guardrails

Source: `curriculum/exercises/personal-site-with-guardrails.md`

**Prompt 5: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:17`

**Prompt** *(Claude Code)*

```
Build me a personal HTML one-pager site from the LinkedIn profile below. Save it as `module-1/site.html`.

LinkedIn:
```

**Prompt 6: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:41`

**Prompt** *(Claude Code)*

```
Hey Claude — apply Donald Miller's StoryBrand framework to the COLLEAGUE-HELP SECTION of my personal site, but tuned for ONE goal: when a colleague reads it, they think "this is the person I want to work with more, on the things they're great at." Not buying a service. Not booking a call. A colleague relationship.

Important: this is a PERSONAL site. The protagonist of the SITE is me — my name, my identity, my actual work. The headline is about me, not a question to the visitor. The StoryBrand tune shapes how I describe the help relationship; it does NOT restructure the whole site to make the colleague the hero of the page.

Use these StoryBrand beats for the help section: Character (the colleague — hero of the help relationship, not of the site), Problem (what work they're stuck on or want more of, that I see clearly), Guide (what makes me their natural ally), Plan (what working with me actually feels like — low-friction, informal is fine), Success (what it looks like a year later when we've worked together more — what we shipped, what changed for them).

Skip Stakes and Call-to-Action — no fear-framing, no "book a chat." The site's vibe is the CTA.

Walk me through the five beats one at a time. Take whatever shape of answer I give. After the fifth answer, regenerate `module-1/site.html` — keep my name and identity at the top, keep my current work front and centre, apply the tuned StoryBrand to the help section. Reshape how the help section sounds, not as a new bullet list — in the voice. Keep the edge in my answers; don't soften.
```

**Prompt 7: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:61`

**Prompt** *(Claude Code)*

```
Use the strengths below as voice-shaping context for the site — letting them change what the page CLAIMS and how it sounds, not as a new bullet list. Keep me as the protagonist of the page. Keep the StoryBrand-tuned help section from before. Keep the edge; don't soften the strengths into virtues.

Then regenerate `module-1/site.html`.

My 3-5 strengths are:
```

**Prompt 8: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:82`

**Prompt** *(Claude Code)*

```
Hey Claude — apply anti-branding (Adam Grant's energy audit version) to my personal site. I'll paste a list of things I hate about work right after this. For each:
1. Take the hate.
2. Associate it with the offerings / colleague-types it implies (what kind of work, what kind of people produce this).
3. Be the opposite — but always speak in the positive. Don't lead with "I don't do X"; lead with what I do instead.
4. Turn blockers / slowness / gaps into progress and outcomes — what I move toward, not what I push away from.

After step 4, regenerate `module-1/site.html`. Use the anti-branding as VOICE — sharpen the headline, the hero line, the section framings, the overall stance. Not as a new "What I'm against" section. The site should sound like someone with a spine wrote it. Keep the edge; don't soften.

Then take maximum freedom on presentation: rethink the page so a colleague lands on it and instantly wants to spend more time with you. You decide structure, ordering, sections, visual rhythm — whatever makes the page actually land. Keep the substance (StoryBrand-tuned help, strengths shaping the voice, anti-branding edge); free hand on the rest.

My hate list:
```

**Prompt 9: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:105`

**Prompt** *(Claude Code)*

```
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.
```

**Prompt 10: Exercise: Personal site with *guardrails***

Source: `curriculum/exercises/personal-site-with-guardrails.md:128`

**Prompt** *(Claude Code)*

```
Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, tell me in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, anything you weren't sure about. I shouldn't have to open the file to know what landed.
```

### Closing: What just happened

Source: `curriculum/lectures/what-just-happened.md`

**Prompt 11: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:48`

**Prompt** *(Claude Code)*

```
Read `module-1/personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, tell me in 2–3 lines: what got sharpened, what got added, what got dropped, and why. Add a couple more lines if you spotted something the rules should cover but you want me to weigh in on first.
```

**Prompt 12: Debrief**

Source: `curriculum/trainings/agents-101/getting-going.md:65`

**Prompt** *(Claude Code)*

```
Spawn a subagent to give an unbiased read on `module-1/site.html`. The subagent should read it cold, with no memory of building it.

Have the subagent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
```

## Module 2: Building Agent Systems

Source: `curriculum/trainings/agents-101/building-agent-systems.md`

### Exercise: Name your next big challenge

Source: `curriculum/exercises/name-your-challenge.md`

**Prompt 13: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:39`

**Prompt** *(Claude Code)*

```
I'm in a training where I'll build a working memory around one live challenge I'm wrestling with. Help me pin the challenge down. Ask me these in turn:

1. In one sentence, what's the initiative? A real, midsized-to-large piece of work you're carrying over the next few weeks — scope, stakes, still open.
2. What have you already tried, read, or decided? What's ruled out, what's still open?
3. Where are you currently stuck on this — what's the specific part you can't seem to get past, or the question you keep asking yourself and not landing?

When I've answered all three, write a one-paragraph brief to ./challenge.md. Show it to me before saving.
```

**Prompt 14: Exercise: Name your next big *challenge***

Source: `curriculum/exercises/name-your-challenge.md:58`

**Prompt** *(Claude Code)*

```
Based on the challenge brief you just wrote, suggest where I'd go looking for raw material. Specifically:

- 3 to 5 search terms I'd type into our company Confluence or wiki
- 2 to 3 OneDrive / SharePoint folder names likely to hold relevant docs, emails, or decks
- 2 to 3 practitioners (named people — writers, operators, researchers) worth reading on this challenge, with one link each if you know them

Keep it short. I'll use this as a scavenger-hunt list in the next phase.
```

### Exercise: Build your challenge memory

Source: `curriculum/exercises/build-your-challenge-memory.md`

**Prompt 15: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:25`

**Prompt** *(Claude Code)*

```
I'm building a knowledge memory for one specific challenge I'm working on. Do this in three beats:

1. Check what connectors are enabled right now. Name the ones you can reach (wiki, docs, storage, chat, email) and the ones that would be useful but aren't connected.

2. Then ask me where my work material actually lives. Don't assume Confluence or OneDrive — ask what's in my world: my team's wiki (whatever the tool), my shared drives and docs, email threads, chat channels, personal notes, favourite practitioner blogs. Get specific: tool names, the 2–3 most relevant spaces/folders, the people I've been exchanging on this challenge.

3. Then propose a curation plan covering three kinds of material: (a) internal knowledge — which searches in which tools, (b) recent work — which threads, folders, decks, (c) outside-in — 2–3 working practitioners or specific articles worth reading (not vendor blogs).

One rule for the plan: only recommend sources I would feel comfortable sharing with an LLM today. If something is likely to be sensitive — board material, personal emails, customer data, HR records — flag it as "skip for now, revisit after Module 4" rather than putting it in the plan. I'll push back where the plan is off.
```

**Prompt 16: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:46`

**Prompt** *(Claude Code)*

```
For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:

- Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
- Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
- Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
- Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — share with me when you want this included." Don't ask me to paste anything; if I want it included, I'll share the file.

When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.
```

**Prompt 17: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:77`

**Prompt** *(Claude Code)*

```
Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.

Rules — non-negotiable:

1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.

2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.

3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.
```

**Prompt 18: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:98`

**Prompt** *(Claude Code)*

```
Pick 3 memory pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in memory/soft-pages.md.
```

**Prompt 19: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:115`

**Prompt** *(Claude Code)*

```
Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:

1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
2. What rules matter? Starter rules: cite the memory file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.

Pick a filename from the job. Show me the file before saving.
```

**Prompt 20: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:131`

**Prompt** *(Claude Code)*

```
Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.
```

**Prompt 21: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:146`

**Prompt** *(Claude Code)*

```
Take the source below and integrate it into the memory. Steps:

1. Read the source. Integrate its claims into existing pages (sharpen, don't append). Drop any claim the source contradicts. For new topics, add pages in the existing shape. Update memory/index.md.
2. Rewrite tops in place. Replace old framing; don't preserve it above a new section.

When you're done, tell me three pages that got sharper (not longer) and one claim that got dropped or replaced.

New source:
```

**Prompt 22: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:164`

**Prompt** *(Claude Code)*

```
Review the memory. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.
```

**Prompt 23: Exercise: Build your challenge *memory***

Source: `curriculum/exercises/build-your-challenge-memory.md:179`

**Prompt** *(Claude Code)*

```
Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:
```

### Lecture: Compounding

Source: `curriculum/lectures/compounding.md`

**Prompt 24: One more compounding turn**

Source: `curriculum/lectures/compounding.md:48`

**Prompt** *(Claude Code)*

```
Look at the memory I just built. Pick the three topic pages that are still the most generic — any competitor in this industry could write them. For each, tell me: what specific source would sharpen it most, and what's the one question you'd ask me right now to pull the missing insight out of my head?
```

**Prompt 25: Debrief**

Source: `curriculum/trainings/agents-101/building-agent-systems.md:50`

**Prompt** *(Claude Code)*

```
Review this session and write the first version of CLAUDE.md at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on — how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Don't invent — extract. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Structure however makes sense for how we actually worked today — section headers, short paragraphs, bullets where a list is clearest. No retro-notes framing; write the rules as if they'd always been the rules. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and whatever else earned its place.

When you're done, tell me in 3–5 lines: the rules you wrote, which session moments grounded each one, and what you chose NOT to include and why. I shouldn't have to open the file to know what's in it.
```

## Module 3: Multi-Agent Systems

Source: `curriculum/trainings/agents-101/multi-agent-systems.md`

### Exercise: Name your crux

Source: `curriculum/exercises/name-your-crux.md`

**Prompt 26: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:13`

**Prompt** *(Claude Code)*

```
Look at my challenge memory. Find the load-bearing obstacle: the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux."

Rules:
- Not a problem restatement. "We need to build credibility" is a goal, not a crux. "Prospects won't meet us until someone they trust vouches" IS a crux: it names the mechanism that blocks everything else.
- Not a category. "Positioning is unclear" is a category. "Buyers can't tell in 30 seconds whether we sell training or consulting" is specific enough to act on.
- Test it: if this obstacle moved, would at least three other stuck things release? If not, keep looking. It isn't the crux.

One sentence. Save it to ./crux.md under a `## Crux` heading; show me before saving.
```

**Prompt 27: Exercise: Name your crux**

Source: `curriculum/exercises/name-your-crux.md:33`

**Prompt** *(Claude Code)*

```
Open ./crux.md and read the crux you just saved. What's the sharpest decision this crux blocks? One sentence. Not a topic, not a summary. A real call you'd stay late to make. Something like *"what's the right next move to unblock the crux, over the next 90 days?"* is a decent default. *"Should we kill option A?"* is better if that's where you are.

Append a `## Question` section to ./crux.md with the decision question. Don't overwrite the crux above. Show me before saving.
```

### Exercise: Three retrievers, one curator

Source: `curriculum/exercises/three-retrievers-one-curator.md`

**Prompt 28: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:48`

**Prompt** *(Claude Code)*

```
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Write your findings to sources/wiki-retrieval.md, one paragraph per finding, naming the page/space and one line on why this matters for the question. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
```

**Prompt 29: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:69`

**Prompt** *(Claude Code)*

```
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Write your findings to sources/docs-retrieval.md, what documents and threads show, who said what, what's recent, what's decided, what's still open. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
```

**Prompt 30: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:90`

**Prompt** *(Claude Code)*

```
You are the internet retriever for my challenge. Your job: find practitioner-grade external material on ./crux.md (the crux you named in the opening, plus the ## Question section). No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 6 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Write your findings to sources/internet-retrieval.md, what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine.
4. End the file with "Conflicts and gaps": where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the URL you actually fetched and the author. If a fetch fails or returns nothing useful, write "[NOT FOUND]", do not fabricate article titles, quotes, or author positions from prior knowledge.
```

**Prompt 31: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:113`

**Prompt** *(Claude Code, reusable across all three retriever sessions)*

```
Push another round. What did the first pass miss? Different angles, related sources, the citations inside what you already opened — keep going until the file feels complete or you genuinely don't find new material. Append; don't rewrite.
```

**Prompt 32: Exercise: Three retrievers, one curator**

Source: `curriculum/exercises/three-retrievers-one-curator.md:122`

**Prompt** *(Claude Code)*

```
You are the synthesizer for my challenge. Three retrievers are running concurrently in Sessions 1, 2, and 3 — they'll write findings to sources/wiki-retrieval.md, sources/docs-retrieval.md, and sources/internet-retrieval.md as they finish. Your job is curation: integrate those findings into my memory/ topic pages, scoped to ./crux.md (the crux you named in the opening, plus the ## Question section).

Memory is curated, not a raw dump. Existing topic pages cover the challenge — extend them where the new sources sharpen what's already there; create a new topic page where the retrievals reveal a topic memory was missing. Cite sources by filename + paragraph.

The loop:
1. Wait for any new content in sources/. When a file appears (or grows), read it.
2. Diff against existing memory/ pages. Decide: extend an existing page, or write a new one?
3. Make the update. Cite the source file by name. Integrate, don't append. Keep claims tight.
4. Repeat until all three retrievals are integrated.

When all three retrievals are in: write a one-paragraph note at memory/_synthesis-m3.md naming what changed, what's now sharper, where retrievals contradicted what was already in memory. That contradiction line is load-bearing — flag it, don't smooth it.

Don't fabricate. Every memory update cites a source-file finding. If a retrieval is empty or thin, say so in your synthesis note rather than papering over the gap.
```

### Exercise: Three minds, one synthesis

Source: `curriculum/exercises/three-minds-one-synthesis.md`

**Prompt 33: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:51`

**Prompt** *(Claude Code)*

```
Spawn three agents in parallel, each with a different stance. Each reads my curated memory/ (the layer the previous exercise integrated the retrievals into) and writes a short note (under 200 words) to module-3/stances/.

Agent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Agent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Agent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

When the three return, show me the stances side by side, unsummarised, so I read them as three voices. Tell me where memory had conflicts or gaps that weakened any stance.

Then synthesize. Apply Rumelt's strategy kernel — diagnosis (what's really going on, in plain language), guiding policy (one coherent approach that addresses the diagnosis), coherent actions (3–5 concrete moves that follow). Append an `## Answer` section to ./crux.md with the three legs. Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement. Show me before saving.
```

**Prompt 34: Exercise: Three minds, one synthesis**

Source: `curriculum/exercises/three-minds-one-synthesis.md:75`

**Prompt** *(Claude Code, optional)*

```
You choose fixes. Aim for optimal function in the next session that runs on this.
```

### Lecture: When to split an agent (and how)

Source: `curriculum/lectures/when-to-split-an-agent.md`

### Lecture: Debugging stuck agents

Source: `curriculum/lectures/debugging-stuck-agents.md`

**Prompt 35: Debugging Stuck Agents**

Source: `curriculum/lectures/debugging-stuck-agents.md:11`

**Prompt** *(Claude Code)*

```
Find the root cause of this bug.

Read the relevant files and the recent session context. Tell me whether the failure is mainly:
1. a source problem: missing, stale, contradictory, or unread evidence
2. a processing problem: wrong prompt, wrong role, bad handoff, vague output shape, or synthesis that averaged away disagreement
3. a boundary problem: the agent tried to use data, tools, or authority it should not have had

Do not fix anything yet. Show me the failure chain in 5 bullets: what happened, where it started, where it became visible, what file or prompt caused it, and the smallest fix that would prevent the next run.
```

**Prompt 36: Debrief**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:46`

**Prompt** *(Claude Code)*

```
Review this session and update the rules. Read CLAUDE.md at the root, then scan what we just produced: agents/, sources/, module-3/. Look back over the session: where did agents step on each other, where did context get dropped at a handoff, where did one retriever's dialect leak into the synthesizer, where did the three stances collapse into a single voice, where did one agent need to be two (or two to be one)?

Then rewrite CLAUDE.md. Integrate, don't append. Sharpen the rules that govern division of work and handoff shape: what each agent is for, what it writes to, what it does NOT do. Add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific moments from the session. Name at least one handoff seam where the rules wobbled.
```

**Prompt 37: Homework after Module 3**

Source: `curriculum/trainings/agents-101/multi-agent-systems.md:70`

**Prompt** *(Claude Code)*

```
Look at memory/ and sources/ against this module's fresh retrievals. Check overall health: coverage gaps the retrievers exposed, pages now stale, structure still serving the challenge. Restructure if deemed needed (rename, merge, split, drop). Show me what you'd do before changing files.
```

## Module 4: Security

Source: `curriculum/trainings/agents-101/security.md`

### Lecture: The discipline of risk

Source: `curriculum/lectures/practice-of-risk.md`

### Exercise: Run and package a security skill

Source: `curriculum/exercises/author-security-skill.md`

**Prompt 38: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:19`

**Prompt** *(Claude Code)*

```
Read everything in module-4/policies/. Use those policy references to audit the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule you can derive from the policy files, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the raw report to outputs/policy-report-raw.md. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Do not create a skill yet. This is the raw run.
```

**Prompt 39: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:39`

**Prompt** *(Claude Code)*

```
I want to turn the useful parts of outputs/policy-report-raw.md into reusable security expertise for the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

Before you read or write any package files, ask me for 3-5 lines about what matters from my own head: the data, policy rule, customer, source, workflow, or failure mode I most want this reusable check to catch. Wait for my answer.

After I answer, read outputs/policy-report-raw.md and everything in module-4/policies/. Then propose the reusable package shape for my runtime and wait for me to steer.
```

**Prompt 40: Exercise: *Run and package* a security skill**

Source: `curriculum/exercises/author-security-skill.md:59`

**Prompt** *(Claude Code)*

```
Author the reusable security check now. Two lenses.

Build one personal skill source under module-4/skills/security-audit/. The main file is SKILL.md. It contains both lenses: POLICY and AGENT-SECURITY. Add supporting reference files only where useful.

For CLI and Claude Code Desktop, also make the standalone-skill install shape clear: module-4/skills/security-audit/SKILL.md becomes ~/.claude/skills/security-audit/SKILL.md during install. Do not write into ~/.claude yet; keep the authored source under module-4/skills/security-audit/ for now.

Lens 1 - POLICY. Rules drawn from everything in module-4/policies/ plus the lines I just typed. For each rule, the lens produces one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), one line of evidence from the target system. The verdict column stays plain - "I can't tell" is a real answer.

Lens 2 - AGENT-SECURITY. Check what the agent can reach, what sensitive material might stay in its context, and what could go wrong because ordinary text can act like an instruction. The lens MUST cover these named risk patterns by name:

- prompt injection (direct - hostile input in a user prompt; indirect - hostile content in a retrieved source the agent reads)
- secrets in context and scrollback (API keys, customer data, partner-NDA material persisting in the transcript or the agent's working memory)
- tool confusion (agent invokes the wrong tool, or the right tool with the wrong scope, because the prompt or context misframes what to do: for example, the production-database connector firing when test would do, or the email-send tool dispatching when the user only asked for a draft)
- skill supply-chain (the skill itself, or any skill the agent loads, came from somewhere - who authored it, who reviewed it, what it can do)

For each pattern, the lens produces one or two specific risks in the target system, ranked, with one suggested agent mitigation per risk - scope, split, filter, gate, or review. These sit on top of normal company controls (network controls, identity and access management, logging, vendor/security review), not in place of them. Name that explicitly in the lens's preamble.

Before you save anything, grill me on missing details that can sharpen the lens or that would ruin the audit run. Cover both lenses, especially the policy lens, where there is no named-class rail to fall back on. Don't stop at one question. I'll tell you when enough is enough.

After I answer, save the files. Keep the SKILL.md tight: when to use it, the two lenses it applies, the report shape each lens produces. Show me what you saved and confirm this package-complete checklist:
- module-4/skills/security-audit/SKILL.md
- any supporting reference files the SKILL.md requires
```

### Exercise: Audit your agent

Source: `curriculum/exercises/audit-your-agent.md`

**Prompt 41: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:60`

**Prompt** *(Claude Code)*

```
Apply the policy lens of the reusable security check I authored to the agent system: the memory in memory/, the sources in sources/, the agent files in agents/, the root CLAUDE.md, and the multi-agent runs in module-3/stances/.

For each rule the reusable check carries, produce one row in a report: rule name, one-line description, verdict (compliant / violating / "I can't tell"), and one line of evidence from my actual files for that verdict. If you can't tell, say what evidence you'd need to decide.

Write the packaged-lens report to outputs/policy-report.md. If outputs/policy-report-raw.md exists, briefly note one way the packaged report is sharper, narrower, or more specific than the raw run. Be specific. Be plain. An "I can't tell" is a better answer than a confident guess.

Read the memory and agent files properly - don't skim. Quote the specific lines or files that support each verdict.

After writing the report, read outputs/policy-report.md back to yourself and tell me:
1. The top three surprises - rows where the verdict is not what a careful reader would have predicted.
2. The three rows where "I can't tell" is most likely hiding a real compliance gap.
3. One row that looks compliant on the surface but where you would still push back.

Keep each point to one or two sentences. Quote the specific rule name so I can find the row.
```

**Prompt 42: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:87`

**Prompt** *(Claude Code)*

```
Apply the agent-security lens of the reusable security check to the same system. Run both checks: what the agent can reach, and the named risk patterns the lens carries.

For access control: list every outside system or sensitive place the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in tools/). For each: is the access necessary for what the system actually does? Flag anything the system has access to but doesn't need.

For the named risk patterns (prompt injection direct and indirect, secrets-in-context-and-scrollback, tool-confusion, skill supply-chain): for each pattern, name the top one or two specific risks in my system, not generic definitions. Quote the file or behaviour that creates the risk.

For each risk flagged, suggest one mitigation for how the agent works - scope, split, filter, gate, or review - matched to the specific risk. These sit on top of the normal company controls already in place (network controls, identity and access management, logging, vendor/security review), not replacing them. Rank the risks by severity x likelihood, three-tier (high / medium / low).

Write the report to outputs/security-report.md. Include the ranked mitigation suggestions.
```

**Prompt 43: Exercise: *Audit* your agent**

Source: `curriculum/exercises/audit-your-agent.md:111`

**Prompt** *(Claude Code)*

```
Apply a mitigation to my system for the risk I'm about to name. Pick the shape from the five (scope, split, filter, gate, review), make the file or instruction changes, and walk me through what you did and why. If the shape doesn't fit, I'll tell you and we'll iterate.

Then re-run the check the reusable lens performed for this specific risk (re-apply the relevant lens, not the whole audit). Report the new verdict. Is the risk reduced, eliminated, or shifted somewhere else?

Then append a short section to outputs/security-report.md named "Mitigation applied and residual". Name what changed, what the new verdict is, and what's still true after the mitigation. Do not rewrite the earlier report. Not what we fixed. What's left. Be specific.

The risk:
```

**Prompt 44: Debrief**

Source: `curriculum/trainings/agents-101/security.md:46`

**Prompt** *(Claude Code)*

```
Review this session and compound 1-5 security operating rules into the agent system. Read the root ./CLAUDE.md if it exists. Read outputs/policy-report-raw.md if it exists, outputs/policy-report.md, and outputs/security-report.md. Look back over the session: which rows should future sessions remember, which "I can't tell" rows need standing evidence checks, where did the mitigation reduce one risk but shift another, and what residuals should future sessions not forget?

Then update ./CLAUDE.md as the durable operating memory for this agent system. Add or sharpen 1-5 short security rules that future sessions should load before working with this system: what to check, what not to touch, when to run the reusable security check, or which residuals from outputs/security-report.md must stay visible. Integrate them into the right section if one exists; otherwise create a short section named "Security operating rules". Do not edit the skill files. Do not paste an audit summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in ./CLAUDE.md, which report row or residual drove it, what future agents must do differently, and what risk remains even after the mitigation.
```

## Module 5: Output Quality and Hallucination Control

Source: `curriculum/trainings/agents-101/output-quality.md`

### Lecture: Grounded, and four candidates to measure

Source: `curriculum/lectures/grounded.md`

### Exercise: Hallucination benchmark

Source: `curriculum/exercises/hallucination-bakeoff.md`

**Prompt 45: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:23`

**Prompt** *(Claude Code)*

```
Spawn one subagent to create the benchmark target.

The briefing is the test corpus. Aim for roughly 10% fabrication or misrepresentation so the detectors have something to catch. You cannot make that number precise. Treat it as a direction, not a target metric.

Instructions for the subagent:
- Use the strategic question in `./crux.md` under `## Question`.
- Use the material in `module-3/stances/`.
- Choose a bounded evidence roster before writing the briefing. Start from curated topic pages in `memory/`. Add raw files from `sources/` only when a memory page points to them or the challenge clearly needs the underlying source. Use at least 5 and at most 20 files total.
- Save the roster to `module-5/evidence-roster.md` with each selected file path, whether it is curated memory or raw source, and a one-line reason it belongs.
- Use only the rostered evidence files as the evidence surface for the briefing.
- Produce a one-page briefing on the challenge.
- Include three specific named entities relevant to the challenge (companies, teams, systems, customers, products, policies, or people).
- Include at least two verbatim quotes from rostered evidence files.
- Include at least one number or measurable claim.
- Include two claims that use outside/common knowledge beyond the files.
- Include a next action with a measurable outcome.
- Where the sources do not cover something, blend in general knowledge. Do not hedge.
- Do not browse the web.
- Save the briefing to `module-5/briefing.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/evidence-roster.md` and `module-5/briefing.md` exist.
```

**Prompt 46: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:56`

**Prompt** *(Claude Code)*

```
Open `module-5/briefing.md`. Extract exactly 30 varied claims from the briefing.

Use short verbatim excerpts from the briefing wherever possible, so later detector findings can be matched back to the briefing. Include a mix of claim shapes:
- numbers or measurable outcomes
- named-entity claims
- quotes or paraphrases attributed to sources
- causal claims
- comparison claims
- recommendation or next-action claims
- claims that seem obviously grounded
- claims that smell like overreach

Do not judge whether the claims are grounded yet. Do not ask me questions. Save the claim pool to `module-5/claim-pool.md`.
```

**Prompt 47: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:107`

**Prompt** *(Claude Code)*

```
Run four detectors on `module-5/claim-pool.md` in parallel. Each detector is an agent with a different method. Each reads `module-5/claim-pool.md`, `module-5/briefing.md`, `module-5/evidence-roster.md`, and the rostered evidence files named there. Each writes its findings as a list of claim-pool claims flagged, with one line of reasoning per claim.

Detector 1 — Source triangulation. For every claim in the claim pool, check whether that claim appears in at least one file on disk. If no file supports it, flag it UNGROUNDED. Write to `module-5/detectors/source-triangulation.md`.

Detector 2 — Entailment. For every claim in the claim pool, ask: does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Flag OVERREACH when the briefing stretches what the source said. Write to `module-5/detectors/entailment.md`.

Detector 3 — Citation integrity. Some claims in the claim pool will cite a source, either inline or implicitly. For each citation, open the cited file and check whether the file actually contains the specific claim attributed to it. Flag CITATION-BROKEN when the citation doesn't back the claim. Write to `module-5/detectors/citation-integrity.md`.

Detector 4 — Counter-evidence search. For every claim in the claim pool, actively look for evidence that contradicts it, not just evidence that supports it. Flag CRUMBLES when disconfirming material exists in the rostered evidence that the briefing ignored. Write to `module-5/detectors/counter-evidence.md`.

One rule across all four detectors: quote each flagged claim exactly as it appears in `module-5/claim-pool.md`. The scorer uses strict substring match; paraphrased findings count as misses.

Spawn all four in parallel. When they finish, confirm that these four files exist: `module-5/detectors/source-triangulation.md`, `module-5/detectors/entailment.md`, `module-5/detectors/citation-integrity.md`, and `module-5/detectors/counter-evidence.md`.
```

**Prompt 48: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:135`

**Prompt** *(Claude Code)*

```
You are the scorer for a four-way detector benchmark. Your inputs:

- Claim pool: `module-5/claim-pool.md`
- Briefing: `module-5/briefing.md`
- Evidence roster: `module-5/evidence-roster.md` and the rostered evidence files named there
- Detector output 1: `module-5/detectors/source-triangulation.md`
- Detector output 2: `module-5/detectors/entailment.md`
- Detector output 3: `module-5/detectors/citation-integrity.md`
- Detector output 4: `module-5/detectors/counter-evidence.md`

Your job: adjudicate the 30 claims, score each detector against that adjudication, produce a scoreboard, name a winner.

First, create the reference adjudication. For every claim in `module-5/claim-pool.md`, label it GROUNDED, UNGROUNDED, or PARTLY GROUNDED. Quote the evidence line or file that supports the label. If you cannot find support in the rostered evidence, say so plainly. Save this reference set to `module-5/adjudicated-claims.md`.

For each detector:
1. Match detector findings to claim-pool claims by strict substring match. If you can't find the exact claim-pool phrase in the detector's output, count as MISS. Do not reason about semantic similarity, do not paraphrase-match, do not accept "close enough."
2. For each claim, check whether the detector flagged it. If the adjudication says UNGROUNDED or PARTLY GROUNDED, the detector should have flagged it. Count that as a hit. If the adjudication says GROUNDED, the detector should not have flagged it. Count that as a false positive.
3. Compute precision (hits / total flagged) and recall (hits / total claims adjudicated UNGROUNDED or PARTLY GROUNDED). Coverage = how many of the 30 claim-pool claims the detector looked at.
4. One line of qualitative notes — what this detector caught that others missed, what it missed, where its method is strong, where it's weak.

Save the scoreboard to module-5/scoreboard.md as a table:

| Detector | Precision | Recall | Coverage | Hits | False positives | Misses | Notes |

After the table, name ONE winner. Do not return "all four are useful" — force the pick. If top two are within 10% precision and 10% recall of each other, name the single winner first, THEN propose a two-method ensemble and say what each catches that the other doesn't. Maximum ensemble cap: two methods. Never three.

At the bottom, add a one-line recommendation naming the detector or ensemble and the reason it won for output of this shape.
```

**Prompt 49: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:174`

**Prompt** *(Claude Code)*

```
Two things, in the chat.

First, three lines on the classic way:
1. What the classic way to quality-check this briefing would have been.
2. Whether it would have been faster or slower than this benchmark.
3. Why.

Second, ask me which row of the scoreboard surprised me most — the detector that did better or worse than I'd have guessed, or the claim that turned out to be harder to flag than it looked. Wait for my one-sentence answer before we move to saving the judge.
```

**Prompt 50: Exercise: Hallucination benchmark**

Source: `curriculum/exercises/hallucination-bakeoff.md:194`

**Prompt** *(Claude Code)*

```
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant evidence files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
```

### Lecture: Self-consistency after the scoreboard

Source: `curriculum/lectures/self-consistency-after-scoreboard.md`

**Prompt 51: Debrief**

Source: `curriculum/trainings/agents-101/output-quality.md:48`

**Prompt** *(Claude Code)*

```
Review this session and update the root `./CLAUDE.md` with groundedness operating rules. Read `./CLAUDE.md` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Look back over the session: when did ungroundedness matter, which claim-shapes needed checking, where did citations look present but not load-bearing, and what should future agents know before they turn a briefing, memo, recommendation, or proposed action into something people rely on?

Then update `./CLAUDE.md` as the durable operating memory for this agent system. Add or sharpen 1-4 short rules that tell future sessions when and how to run groundedness checks: what kinds of output need checking, which evidence surface to use, when to run `judges/groundedness-judge.md`, and when to say "not enough evidence" instead of smoothing over the gap. Integrate the rules into the right section if one exists; otherwise create a short section named "Groundedness checks". Do not paste a benchmark summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, tell me in 1-5 lines: what changed in `./CLAUDE.md`, which scoreboard row or adjudicated claim drove it, what future agents must do differently, and what uncertainty remains.
```

## Module 6: Evaluations

Source: `curriculum/trainings/agents-101/evaluations.md`

### Lecture: Evals as steering

Source: `curriculum/lectures/evals-as-steering.md`

### Exercise: The eval loop runs itself

Source: `curriculum/exercises/eval-loop.md`

**Prompt 52: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:23`

**Prompt** *(Claude Code)*

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in ./crux.md, using sources/ and module-3/stances/ for grounding. Use the same rough shape as the Module 5 test corpus: a concrete number, two contrasting takes, a competitor or outside-world claim, one quote, and one recommended action. Mark anything that relies on general knowledge rather than the local files. Save to module-6/fresh-briefing.md.

2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md. For every claim, write the claim, the judge's verdict, and one sentence of per-claim feedback naming what would make it more groundable. Save to module-6/first-run-judgment.md.

3. In the chat, summarize in three lines: what the judge caught, the one specific fix the judgment most clearly surfaces, and what the judge did not reach that you would still want checked.
```

**Prompt 53: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:87`

**Prompt** *(Claude Code)*

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- If judges/groundedness-judge.md is missing, stop and tell me Module 5 has not handed off the judge yet.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md with this starting tactic: "Produce a one-page briefing on the question in ./crux.md. Use sources/ and module-3/stances/. Prefer local evidence. Mark anything that relies on general knowledge. No special rules yet."
- Create the module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/ directories as needed.

For each of 3 rounds:
1. Dispatch a generator agent. It must read ./generation-tactic.md, ./crux.md, sources/, and module-3/stances/. It writes the briefing for that round:
   - round 1: module-6/runs/round-1/briefing.md
   - round 2: module-6/runs/round-2/briefing.md
   - round 3: module-6/runs/round-3/briefing.md
2. Dispatch a separate judge agent. It must read judges/groundedness-judge.md and the briefing for that round. It writes the judgment for that round:
   - round 1: module-6/runs/round-1/judgment.md
   - round 2: module-6/runs/round-2/judgment.md
   - round 3: module-6/runs/round-3/judgment.md
   Each judgment includes verdicts and one-sentence feedback per claim, plus a top-line count of flagged claims.
3. The main session, not an agent, reads the judgment for that round and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. Save a short explanation of the change for that round:
   - round 1: module-6/runs/round-1/tactic-change.md
   - round 2: module-6/runs/round-2/tactic-change.md
   - round 3: module-6/runs/round-3/tactic-change.md

After round 3:
- Write module-6/eval-notes.md with the score trajectory, the tactic change after each round, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
```

**Prompt 54: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:134`

**Prompt** *(Claude Code)*

```
Claude: can we scale this by adding more generation tracks to try more options faster?
```

**Prompt 55: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:142`

**Prompt** *(Claude Code)*

```
Claude: what is the similarity to model training here? Tell me in 5 snippets, one at a time. After each snippet, wait for me to say "next."
```

**Prompt 56: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:152`

**Prompt** *(Claude Code)*

```
Show me module-6/eval-notes.md and ./generation-tactic.md.

Then answer in five bullets:
- Did the judge file stay byte-identical?
- What was the score trajectory?
- Which tactic change most clearly improved the next round?
- Which failure did the tactic still not absorb?
- What would you test in the next run?
```

**Prompt 57: Exercise: The eval loop runs itself**

Source: `curriculum/exercises/eval-loop.md:208`

**Prompt** *(Builder Claude)*

```
I have a judge that scores one of my outputs. Put the output in a self-improving loop against the fixed judge using these four moves:

- Generation: an agent produces the output using a tactic file I can read.
- Scoring + feedback: a separate judge agent runs the judge and writes per-claim or per-item feedback alongside the score.
- Tactic update: between rounds, the main session reads the feedback and rewrites the tactic file. The judge file stays untouched.
- Notes: after three rounds, write the score trajectory, the tactic changes, the judge-integrity check, and the next boundary case to test.

Ask me one question at a time, wait for my answer, and do not show the list. You need to know where the judge lives, where to save round artifacts, and what topic or output to generate. Then run the loop end to end. The judge file is never written to by anything in this loop.
```

### Closing: The new human role in the loop

Source: `curriculum/lectures/new-human-role-in-the-loop.md`

**Prompt 58: Make the goal-nudger**

Source: `curriculum/lectures/new-human-role-in-the-loop.md:87`

**Prompt** *(Claude Code)*

```
Help me create a steering eval for internal mail I might let an agent draft or send.

The eval is not a groundedness check. Assume groundedness is handled by `judges/groundedness-judge.md`. This eval should create positive pressure to overperform on one dimension that matters for my work.

Ask me one question at a time, wait for my answer, and do not show the list. Keep asking until the dimension is judgeable. Start by offering examples I can choose from or adapt:

- executive crispness
- commercial sharpness
- specificity
- risk awareness
- actionability
- reader empathy
- strategic usefulness
- sounds like our team

If I choose a vague word, keep asking until it becomes observable. For example, "strategic usefulness" might become: names the tradeoff, states a point of view, and gives the decision-maker a next move.

Once the dimension is clear, show me:

1. The dimension name.
2. A one-sentence definition.
3. Three examples: a 5/5 mail excerpt, a 3/5 mail excerpt, and a 1/5 mail excerpt.
4. The scoring rubric from 1 to 5.
5. What the eval should ask the agent to improve when the score is 3 or lower.

Then save the eval as `./goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
```

**Prompt 59: Debrief**

Source: `curriculum/trainings/agents-101/evaluations.md:53`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the generator's tactic beyond what the loop reached. Read ./generation-tactic.md in its current state, then scan module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not move; that is the integrity of the loop. Look back over the session: which tactic change helped, which one did not help and should be removed or rewritten, what specific boundary case did the loop never test, where did the generator keep missing the same thing across multiple rounds, and what did the judge flag that the tactic never absorbed?

Then rewrite ./generation-tactic.md. Integrate, don't append. Add the tactic rule the loop never reached, sharpen a rule that stayed too vague, remove a rule that fired on the wrong thing. The tactic file is infrastructure now. Every rule should name the failure class it pre-empts. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
```

## Module 7: From Personal to Team

Source: `curriculum/trainings/agents-101/personal-to-team.md`

### Exercise: Share your work

Source: `curriculum/exercises/share-your-work.md`

**Prompt 60: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:66`

**Prompt** *(Builder Claude)*

```
Read my memory/, sources/, module-3/, module-5/, and module-6/.

Based only on what you find there, draft a Jobs-to-be-Done hypothesis for a
sharing decision I'm working on. Cover four things:

1. The one teammate (named if my memory names them) most likely to benefit from
   what I've built.
2. The job they're trying to get done — in their language, not mine. Functional
   part, and at least one emotional or social part (anxiety, reputation,
   dependency on someone else).
3. Their current hire for this job — what they use today. Excel, a colleague,
   their gut, a vendor tool, nothing. Every job already has an incumbent.
4. Three candidate outcome vectors — what "better" would mean for them:
   - Speed (same job, faster)
   - Quality (same job, less variance, better output)
   - Other — inferred from my context, not assumed. Something specific:
     dependency removed, anxiety reduced, scope they could take on, workload
     shifted, loyalty to an incumbent preserved, reputation protected, a
     recurring meeting they could stop attending.

Then confirm or correct each piece with me using a numbered-options format.
Present five to eight questions, one at a time or as a single numbered list.
Each question gets three or four lettered options (a / b / c / d) drawn from
my memory. I reply with the letter (or letters). Don't ask me to type
freeform answers — the point is that you already have most of this on disk,
and the bounded options are what keep me from drifting back into chat.

When I'm done picking, write module-7/jtbd.md with:
- The teammate (named).
- The job, in their language, with functional + emotional/social components.
- The current hire and what's broken about it.
- The outcome statement in this form: "minimize/increase [metric] when [doing
  the job]." Pick the vector that cuts deepest — not all three.

Anchor every claim to a specific file and line in my memory, plus the answers
I gave. Show me the file before saving.
```

**Prompt 61: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:148`

**Prompt** *(Builder Claude)*

```
Find the absorption bottleneck in my sharing problem. Read module-7/jtbd.md and module-7/branch.md, plus anything else in module-7/ so far. The question is not "how do I share?" — it's "what's the single load-bearing obstacle between my teammate and firing their current hire?"

List the obstacles you see — technical, social, political, habitual, governance, trust. Cluster them. Name the bottleneck: the one that, if removed, makes several others easier. State it in one sentence.

Save to module-7/absorption-bottleneck.md. Show me before saving.
```

**Prompt 62: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:165`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/branch.md, and module-7/absorption-bottleneck.md. Help me draft two files in
parallel — a technical plan and a people plan. Both are about whether this
teammate can actually fire their current hire and start using my candidate.

File 1: module-7/technical-plan.md — how the candidate delivers the outcome.
- What exactly I ship (files, skills, config, runtime).
- How the teammate receives it (zip, repo, connector, invite).
- What "it moves the outcome metric for them" looks like — concrete, measurable.
- The first real test case they'd run, against the job from the JTBD brief.

File 2: module-7/people-plan.md — equally load-bearing. Cover all five:
- Ownership: named person accountable. Not a role.
- Governance: who can add to the memory, change the rules, see the output.
- Operating: who notices when the outcome metric slips. What they do about it. If the obvious name is also the person who benefits most, name a second person who'd notice independently — otherwise the only alarm is the person with a reason to silence it.
- Accountability: who decides the candidate is no longer doing the job — who
  fires the hire.
- Propagation: who teaches the next person, when.

Ask me anything you need. Don't invent names. If I don't know, write
"UNASSIGNED — Monday's question" and keep moving. Missing names are findings,
not failures.

Show me both before saving.
```

**Prompt 63: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:200`

**Prompt** *(Builder Claude)*

```
Read module-7/jtbd.md, module-7/absorption-bottleneck.md, module-7/technical-plan.md, and module-7/people-plan.md.

Test the assumptions in these plans. Aim it at the SWITCH, not at generic sharing:

What would have to be true for this specific teammate, doing this specific
job, to fire their current hire and use my candidate?

List the top five assumptions the switch depends on. For each:
- State it as a declarative sentence.
- Rate confidence (high / medium / low) based on what I've told you.
- Name one concrete way I could test it this week — one conversation, one
  small experiment, one quick check.

Order from most load-bearing to least. Save to module-7/assumptions.md.
Let the assumption-test change the confidence in the plans — don't just append
a new section. Show me before saving.
```

**Prompt 64: Exercise: Share your work**

Source: `curriculum/exercises/share-your-work.md:228`

**Prompt** *(Builder Claude)*

```
It is six months from now. My teammate
kept using their current hire. My candidate sat unused, or they tried it twice
and fired it.

Read module-7/jtbd.md, module-7/technical-plan.md, module-7/people-plan.md, and
module-7/assumptions.md.

Write three failure stories, each a short paragraph:
- Most likely social failure — about the incumbent, the teammate, the
  workflow. "They trust their own spreadsheet more than any agent output" is
  usually closer than "it broke technically."
- Most likely technical failure — what broke, how it broke.
- The failure I'm not seeing — bias your thinking toward what I seem to be
  assuming will go fine.

For each story, one sentence: the early warning sign I'd see in week two if
this were starting to happen.

Save to module-7/failure-stories.md.
```

**Prompt 65: Debrief**

Source: `curriculum/trainings/agents-101/personal-to-team.md:59`

**Prompt** *(Claude Code)*

```
Review this session and sharpen the sharing artifact. Read everything in module-7/ (jtbd, branch, absorption-bottleneck, technical-plan, people-plan, assumptions, failure-stories, monday) and identify which single file is the sharing artifact itself (the skill file, the interface spec, the output schedule, the context export, whichever pattern I picked produces the thing the teammate actually touches). Then look back over the session: where did the teammate's job-to-be-done stay unnamed or too abstract, where does the artifact leak more than the teammate needs (over-shared) or less than they can use (under-shared), where is the people plan thin (no name, no owner, no handoff), which assumption would have to be true for this to land and isn't?

Then rewrite the sharing artifact. Integrate, don't append. Name the teammate's job explicitly at the top, tighten the surface area so it fits the job (not your whole system), add the one line the people plan needed. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why, grounded in specific moments from the exercise. Name the one assumption the artifact still depends on.
```

## Module 8: Agents Building Agents (The Flywheel)

Source: `curriculum/trainings/agents-101/agents-building-agents.md`

### Exercise: Extend your system

Source: `curriculum/exercises/extend-your-system.md`

**Prompt 66: Exercise: Extend your system**

Source: `curriculum/exercises/extend-your-system.md:32`

**Prompt** *(Builder Claude)*

```
Read module-8/extension-brief.md. Build the agent described in it. Write the agent file to agents/<slug>.md — the slug comes from the job, not the technology.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to agents/<slug>.md, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
```

### Exercise: Agent Proposal Forum (diagnose and guide)

Source: `curriculum/exercises/joint-double-diamond.md`

**Prompt 67: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:32`

**Prompt** *(buyer/sponsor agent, run once at the start)*

```
Use the shared folder the trainer posted in chat. Write challenge.md at the shared folder root.

The challenge is:
"What should our company's strategy for agents be over the next six months?"

Make it concrete for this room:
- The buyer/sponsor goal in one paragraph.
- Three constraints the strategy must respect.
- Two non-negotiables.
- Three kinds of evidence that matter most.
- One decision the room must make today.

Do not solve it. Seed the challenge so the agents have something real to argue with.
```

**Prompt 68: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:50`

**Prompt** *(Builder Claude, run once after challenge.md exists)*

```
Use the shared folder the trainer posted in chat. Create a subfolder named after me if it does not exist. Write context-manifest.md in that subfolder. List:
- Which modules' working folders I carry (module-1 through module-7).
- Which memory/ pages I have, by topic.
- Which sources/ I've fetched content for, vs. which are reference-only or NOT REACHABLE.
- Which custom agents I've built, by job.
- One sentence per major gap — what my system does NOT know about.

Keep it dense. Half a page. The point is other agents (and other people) can see at a glance what I bring and what I don't, before they cite me or weigh my position.
```

**Prompt 69: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:70`

**Prompt** *(Builder Claude)*

```
Read challenge.md at the shared folder root.

Write my initial stance on the sponsor challenge.

Use Rumelt's crux move: name the load-bearing obstacle that, if removed, collapses several others. Then name the direction I currently favor.

Your ground is my own memory/, sources/, agents/, module-1/ through module-7/ outputs, plus my context-manifest.md so you know what I don't have. Do not read other participants' stance.md files yet. This first note should carry my agent's own position.

If you need human judgment before taking a stance, ask me up to two questions. After I answer, write the stance.

Rules:
- Every obstacle you name cites a file. "The sales team is skeptical" is not an obstacle — "sales-skepticism as described in module-3/interviews.md line 14" is.
- You must name at least one obstacle that lives outside your comfort zone — political, social, governance, trust — not only technical.
- Name the crux in one sentence.
- Name the direction I currently favor in one sentence.
- Name the human judgment call I am least certain about.
- Name one risk or objection my stance is weak against.

Save stance.md in my named subfolder in the shared folder.
```

**Prompt 70: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:97`

**Prompt** *(Builder Claude)*

```
Read my own stance.md in my named subfolder, then read three to five neighbouring stance.md files from other participant subfolders in the shared folder.

Write cross-check.md in my named subfolder with:
- One thing another agent saw that my stance missed.
- One disagreement I keep after reading the neighbours.
- One evidence gap that appears across more than one stance.
- One idea I should carry into my proposal.
- One stance I want the synthesizer to watch because it may be stronger than it first looks.

Do not summarize every neighbour. Act like a serious peer reviewer with skin in the game.
```

**Prompt 71: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:114`

**Prompt** *(Builder Claude)*

```
Read my stance.md and cross-check.md. Then write my proposal for the shared surface.

Write proposal.md in my named subfolder:
- Crux, one sentence.
- Guiding policy, one sentence.
- Two experiments, each with owner, two-week test, success signal.
- What I changed after cross-checking with other agents.
- What I refused to change, and why.
- One unresolved disagreement the synthesizer must preserve.

Cite every claim against a source file, stance, or cross-check.
```

**Prompt 72: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:136`

**Prompt** *(central synthesizer)*

```
Read selection-board.md at the shared folder root and every participant cross-check.md.

Write midway-instructions.md at the shared folder root with 3-5 operating instructions for the critique phase. These are not conclusions. They are rules for how agents should deliberate from here.

Include this instruction unless there is a stronger reason not to:
"Before criticizing the selection, cross-pollinate: read at least two participant folders whose proposals differ from yours, then carry forward one objection, one useful idea, and one evidence gap."

Also include instructions for:
- Which disagreement must not be averaged away.
- Which evidence gap must be named whenever it affects a claim.
- Which kind of claim needs a citation before the synthesizer can use it.
- Which tempting policy move should be treated skeptically.

Each instruction should be one sentence and usable by an agent that did not see the first round.
```

**Prompt 73: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:161`

**Prompt** *(Builder Claude)*

```
Read midway-instructions.md and selection-board.md at the shared folder root. Follow the injected instructions before writing.

Write critique.md in my named subfolder.

If midway-instructions.md tells me to cross-pollinate, first read the required participant folders and name which files changed my critique.

First, criticize the current selection:
- What did the synthesizer choose well?
- What did it miss?
- Which selected idea is under-cited or overconfident?
- Which rejected idea deserves another look?

Then propose a better idea if you have one:
- Better crux, policy, experiment, or risk.
- Why it beats the current selection.
- What would have to be true for it to work.
- One pre-mortem failure story if the room adopts it.

Cite every claim against a memory file, a shared-folder file, or a selection-board entry.
```

**Prompt 74: Exercise: Agent Proposal Forum, diagnose and guide**

Source: `curriculum/exercises/joint-double-diamond.md:205`

**Prompt** *(central synthesizer)*

```
Read challenge.md, selection-board.md, midway-instructions.md, every proposal.md, every critique.md, and any pushback.md files. Update selection-board.md if a critique changed the best idea.

Then write three files at the shared folder root:

1. strategy-kernel.md
Four sections: diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where the selected idea beat a strong alternative, name the alternative in one line.

2. agent-set.md
Suggest the set of agents the company should build or assign next. For each agent: job, owner, input files/systems, output, first evaluation or judge, and why this agent belongs in the set. Keep it to the smallest set that can execute the plan.

3. plan.md
Write the plan for the next two weeks. Include sequence, owners, agent dependencies, human decision points, evidence to collect, success signal, and stop condition. Make clear which work can start concurrently and which work must wait.
```

**Prompt 75: Debrief**

Source: `curriculum/trainings/agents-101/agents-building-agents.md:50`

**Prompt** *(Builder Claude)*

```
Review this session and sharpen the file that carried the most weight — most likely the strategy kernel, agent set, plan, or central synthesizer's rules, whichever governed how the agents argued and selected. Read that file, then scan the shared deliberation folder — challenge, context manifests, stances, cross-checks, proposals, selection-board, midway-instructions, critiques, pushback, kernel, agent-set, plan. Identify which synthesizer-injected midpoint instructions actually changed later agent behavior. Look back over the session: where did the flywheel stall (an agent waiting on another that never finished), which role in the round was under-specified so two agents played it or none did, where did the room converge too fast on a plausible proposal, where did a critique land and change a selection, where did the plan invent a dependency that could actually run concurrently (capture that as a rule), what did the session fail to decide and why?

Then rewrite the file. Integrate, don't append. Add the role that was underspec'd, sharpen the rule for how pushback forces a stance-update, remove a rule that made agents defer when they should have argued. Don't add a "retro notes" section; rewrite the file as the better version. Do not close every loop — some of what didn't resolve should stay open, named.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why — grounded in specific moments. Name one thing the session genuinely didn't resolve.
```

_Total prompts: 75_

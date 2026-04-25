# Exercise: Build your challenge *memory*

**What you do:**

A chat forgets. A memory remembers.

You've just pinned your challenge in `module-2/challenge.md` (the opener). Now you build a memory around it — scoped to the **next big challenge** you're wrestling with at work. The board paper due in three weeks. The re-org you're shaping. The vendor decision on your desk. Narrow enough that 5–8 topic pages cover it.

Before class you unzipped the Module 2 scaffold: empty `sources/`, empty `memory/`, empty `agents/`, and a root `CLAUDE.md` with the rules Claude follows when it writes pages. <span class="rt-code">Start a new session in the working directory.</span><span class="rt-cowork">Connect the working directory in Cowork.</span> Four phases: curate, put to work, compound, self-maintain.

**Phase 1 — Curate, ingest, build.**

A memory is only as good as what goes into it. Most people sabotage this step by shovelling in whatever's nearest. Don't. Three beats: Claude helps you curate a plan, then Claude pulls the actual content into `sources/`, then Claude builds `memory/` from what's on disk.

**Always comply with your company's AI policy.** Whatever rules your org has about what can and can't go through an LLM — enterprise agreement, data classification, regulated-data carve-outs — those hold here. If in doubt, check before uploading.

**Ease yourself in.** Even inside what policy allows, bring only what you feel comfortable sharing with an LLM today. If an email thread, a deck, or a doc feels sensitive, skip it — Module 4 is the proper conversation about classification, data boundaries, and what an agent should never see. Right now, curate with the material you'd share with a smart assistant without a second thought.

---

**Beat 1 — Curate.** Claude surveys what's available and asks about your world.

**Prompt** *(Claude Code)*

```
I'm building a knowledge memory for one specific challenge I'm working on. Do this in three beats:

1. First, read module-2/challenge.md so you have the challenge in mind. Then check what connectors are enabled in my Claude Code session right now — name the ones you can reach (wiki, docs, storage, chat, email) and the ones that would be useful but aren't connected.

2. Then ask me where my work material actually lives. Don't assume Confluence or OneDrive — ask what's in my world: my team's wiki (whatever the tool), my shared drives and docs, email threads, chat channels, personal notes, favourite practitioner blogs. Get specific: tool names, the 2–3 most relevant spaces/folders, the people I've been exchanging on this challenge.

3. Then propose a curation plan covering three kinds of material: (a) internal knowledge — which searches in which tools, (b) recent work — which threads, folders, decks, (c) outside-in — 2–3 working practitioners or specific articles worth reading (not vendor blogs).

One rule for the plan: only recommend sources I would feel comfortable sharing with an LLM today. If something is likely to be sensitive — board material, personal emails, customer data, HR records — flag it as "skip for now, revisit after Module 4" rather than putting it in the plan. I'll push back where the plan is off.
```


Push back, sharpen, add what's missing. The plan is the list — nothing's in `sources/` yet.

**Beat 2 — Ingest.** Now Claude pulls the content into `sources/`. Agent does the heavy lifting; you don't copy-paste.

**Prompt** *(Claude Code)*

```
For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:

- Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
- Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
- Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
- Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — attach via + button when you want this included." Don't ask me to paste anything; if I want it included, I'll attach the file.

When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.
```


Look at Claude's three lists. Anything in list (3) — NOT REACHABLE — stays a reference file unless you decide to include it, in which case use the **+** button to attach the file; Claude will save the content into `sources/` when attached. Never type or paste content yourself; that's the agent's job. Aim for 8–10 items with real content or local-path links between lists (1) and (2); list (3) can be empty, and usually is.

**Beat 3 — Build memory.** Now the memory gets built from what's actually on disk. <span class="rt-code">Turn on plan mode first — Claude writes out what it's about to do before touching files, you approve, nothing commits until you say go. Tell Claude *"Enable plan mode."* (Alternatives: pick *Plan* from the mode dropdown at the bottom of the Claude Code desktop app, or press Shift+Tab to cycle.) The footer should read *plan mode*.</span><span class="rt-cowork">Before you do anything, ask Claude to write a plan first — what it's about to do before touching files, so you can review and steer before files commit.</span>

<div class="rt-code">

Heads up on what happens at the end of the plan: Claude will pause and ask *"Claude has written up a plan and is ready to execute. Would you like to proceed?"* with four options. For this exercise: **option 1 (Yes, and use auto mode)** is the friendly default if the plan's topic split looks right. If two topics should merge, or something's missing — pick **option 4 (Tell Claude what to change)** and type one sentence of feedback; Claude rewrites the plan. Options 2 (manual per-file approval) and 3 (Ultraplan on web) aren't needed here. Full rundown in the [quick reference](curriculum.html?file=reference/claude-quick-reference).

</div>
<div class="rt-cowork">

Heads up: when Claude finishes the plan, read it before saying go. If the topic split looks right, tell Claude to proceed. If two topics should merge or something's missing, type one sentence of feedback and ask Claude to rewrite the plan before executing.

</div>

**Prompt** *(Claude Code)*

```
Read every real-content file in sources/. For each major topic you find, create a markdown file in memory/ with a clear title, 3–5 key claims, and an "open questions" section for things the sources disagree on or leave unclear. Then write memory/index.md that links to every topic page with a one-line description.

Rules — non-negotiable:

1. Sources first, always. Every memory page derives from real content — either a sources/ file with content inline, or a sources/ reference file that links to a local path (read the linked file directly when you need it). Skip sources/ files marked "NOT REACHABLE" and any empty placeholder files. If no real content is reachable yet, stop and tell me before writing anything in memory/.

2. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file it came from. One claim, one source file, on the same line. If a claim has no source, don't write it — put the gap in "open questions" instead. I'll spot-check citations against the files.

3. Distinctive, not descriptive. Extract what's specific to my situation — my company, my sources, my challenge. If a claim could appear in a competitor's memory on the same kind of problem, it's too generic; rewrite or cut.
```


Claude returns a plan. Read it. Does the topic split match how you actually think about the challenge? If two topics should be one, say so. If something's missing, add it.

Approve. Claude writes the files.

Now ask Claude to audit itself:

**Prompt** *(Claude Code)*

```
Pick 3 memory pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in module-2/soft-pages.md.
```


That list is your first quality check. You'll sharpen those pages in Phase 3.

<span class="rt-code">**What plan mode just did for you.** The memory build wrote 5–8 files in one shot — the kind of multi-file, multi-step work where catching a wrong topic split in a bullet list is ten times cheaper than catching it in seven written files. That's plan mode's job: make Claude think before it makes extensive output, give you one review point instead of many. Plan mode exits automatically after an approved plan runs, so the footer is already back to *default*. Rule of thumb going forward: plan mode for anything that touches many files or compounds over steps; skip it when a single focused prompt will do.</span><span class="rt-cowork">**What asking for a plan just did for you.** The memory build wrote 5–8 files in one shot — the kind of multi-file, multi-step work where catching a wrong topic split in a bullet list is ten times cheaper than catching it in seven written files. That's the job of asking Claude to plan first: make Claude think before it makes extensive output, give you one review point instead of many. Rule of thumb going forward: ask for a plan first on anything that touches many files or compounds over steps; skip it when a single focused prompt will do.</span>

**Phase 2 — Your first custom agent.**

A library without a librarian is a cost. Give it one.

An agent, at its simplest, is a markdown file: instructions the model reads at the start of every run — what this agent is for, and the rules it follows. Same stuff as the memory. Same stuff as the Module 1 guardrail. Text on disk, re-used.

**Prompt** *(Claude Code)*

```
Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:

1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
2. What rules matter? Starter rules: cite the memory file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.

Pick a filename from the job. Show me the file before saving.
```


Claude asks. You answer. The agent file lands in `agents/`.

Now use it. Fresh message.

**Prompt** *(Claude Code)*

```
Read the agent file you just created, apply its role and rules, and use my memory. Ask me for the specific task, then do it. Cite which memory file each claim came from.
```


Answer with a real task from your challenge. Claude reads the agent file, reads the memory, cites sources, stays inside its rules. The citations tell you whether the memory earned its keep or whether Claude filled in from training data. Quietly, you just made a reusable capability. Same agent, next week's task.

**Phase 3 — Compound.**

A dumb knowledge base grows. A compounding one *sharpens*. Phase 3 proves it: find the thinnest memory page, get one more source in, let the new source make the old pages better. Claude does the legwork — you only step in if there's a file only you can attach.

**Prompt** *(Claude Code)*

```
Look at memory/ and identify the thinnest page — the one where Phase 1's audit flagged "generic" in module-2/soft-pages.md, or where a topic has only two claims, or where the stress-test in Phase 2 revealed light content. Name it in one sentence.

Then look at the curation plan we agreed in Beat 1 and at sources/ itself: what's a single new source that would sharpen this specific page? Pick it from what's missing — something on the plan we didn't fetch, or a practitioner article, or a local file I named but you haven't read. Name it in one sentence: what's the source and why does it help.

Then go get it using the same methods as Beat 2 (fetch public URL, pull via connector, link to a local path, or tell me if it needs my attach). Land it in sources/ as a new file. Stop there — don't update memory yet; I want to see the new source first.
```


Look at what Claude named and at the new `sources/` file. If it's wrong — the page isn't actually the thinnest, or the source won't help — push back in one sentence. If Claude asked for an attachment, decide whether you want to include it; use **+** if yes.

When the new source is in place:

**Prompt** *(Claude Code)*

```
Update the memory from the new source — don't rebuild it. For topics you already have: integrate new claims, sharpen existing pages, drop any claim the new source contradicts. For new topics: add pages in the existing shape. Update memory/index.md.

When you're done, tell me three topic pages that got sharper (not longer) from this update — and one page where a claim got dropped or replaced.
```


Second batch made the first batch better. Chat literally cannot do this.

Now — don't take Claude's report at face value. Push back:

**Prompt** *(Claude Code)*

```
Go through every page you just claimed got sharper. Check whether the top of each page actually got rewritten, or whether the old framing is still sitting above a new section. For any where the old is still there, rewrite the top — let the new direction replace the old, don't preserve both.

Also revisit module-2/soft-pages.md. For each, sharpen the top paragraph so it names what's specific to my challenge, not generic.
```


That last line picks up the soft pages you parked in Phase 1 — where they finally get real.

**Phase 4 — Let it maintain itself.**

**Prompt** *(Claude Code)*

```
Review the memory. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.
```


Go through Claude's six proposals. Some will be right. Some will miss — reject those. The ones you approve, Claude applies. The memory you're leaving with is one you trusted enough to sign off on line by line.

**Close — put it to work.**

Ask your memory the hardest open question on your challenge right now. Not *"summarize the sources"* — a real working question, the kind you'd stay late at the office to answer. *"What's the strongest argument for option A over option B?"* *"Where does our current plan break if the market shifts?"* *"Which of these three risks is actually load-bearing and which are decoration?"*

Run it through the agent you built in Phase 2 — the one that reads the memory and cites sources.

**Prompt** *(Claude Code)*

```
Using my memory and the rules in the agent file, answer this question, citing which memory file each claim came from:
```


Then the question.

Read the answer. If it's specific and every claim has a citation — the memory earned its keep; you leave with the first piece of real work it's done. If it's generic, hand-wavy, or leans on uncited knowledge — you know exactly where the memory is still thin. Either way, it's the move you'll repeat at your desk on Monday, and every Monday after.

**What happens:**

Four phases, one system. You curated. You loaded it. You put it to work. You added more and watched pages sharpen instead of bloat. You let it find its own gaps. Chat doesn't do any of this. A memory is *files you keep*, not a thread you close.

**The point:**

Two things combined make a system: *persistence* (it remembers) and *automation* (it runs). Either alone is a toy. Together they compound — each cycle smarter than the last, because the thing learning is the same thing you trust to do the next task. Your challenge is buried in wiki pages, email threads, documents nobody re-reads. Once it lives in a memory an agent can read and improve, the economics change.

Every module after this one uses the memory you just built.

**Time:** 45 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Karpathy's LLM Wiki pattern (prework) — the named idea the exercise operationalizes
- Second Brain / personal knowledge management (Tiago Forte lineage) — the vibe transfers for those who've heard of it. *("Second Brain" is the external named concept; we call our own artifact the "memory" to avoid colliding vocabulary.)*
- File-based agentic RAG (Boris Cherny / Anthropic observation) — emerges as a concept; not front-loaded
- Curation-before-ingestion as a craft move — "garbage in, garbage out" reframed as a teaching moment rather than a warning sticker

**Trainer artifacts required (must exist before training day):**
- Scaffold project: empty `sources/`, empty `memory/`, empty `agents/`, starter `CLAUDE.md` at root (topic-page shape, citation convention, "distinctive not descriptive" rule)
- Opener exercise (`name-your-challenge.md`) runs first in Module 2 — produces `module-2/challenge.md`, which this exercise keys off
- Prework: Confluence + OneDrive connectors configured in Claude Code before the session (separate prework item)

**Plug points:**
- The challenge itself — participant-chosen. Sponsor may suggest a shared challenge theme if a cohort needs more cohesion (e.g., "everyone picks a challenge related to our Q3 OKR").
- Internal wiki tool — Confluence is the default; Notion, SharePoint wiki, Guru, or similar all work. Swap the prompt language to match.
- Practitioner sources — the Phase 1 curation prompt asks Claude to suggest; trainer can pre-curate a reading list for common challenge types if the cohort is time-pressed.

**Philosophy callout (sparing):**
- Belief #2 — act on the future — lands implicitly: the challenge the participant brings is the future they're already acting on. Not named in body.

**Deferred facilitator notes:**
- Watch-fors: participant picks a challenge too broad ("digital transformation") — redirect to one concrete decision; too few sources make it through curation — fallback is to let Claude propose public-web substitutes; connector sign-in issues (live support via Slack/Teams during delivery, not in the student's read); Claude fires all three Phase 2 questions at once (tell the participant to answer in order — not a real break); Phase 3 "it got longer not sharper" failure mode; Phase 3 source-hunt running long (cap at 3 minutes — imperfect sources are fine, the integration is the lesson); Close "put it to work" question too vague (push back: "that's a topic, not a decision — what's the question you'd actually answer for your CEO?").
- Decision points: if a cohort is uniformly short on internal-wiki access, pivot Phase 1 curation to OneDrive + internet-only — still teaches the move.
- Claude Code project setup verification belongs in the prework quick reference, not here.

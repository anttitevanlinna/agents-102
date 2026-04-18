# Exercise: Build your challenge brain

**What you do:**

A chat forgets. A brain remembers.

You've seen Karpathy's LLM Wiki idea in the prework — the move from *asking* an LLM a question to having the LLM *maintain a knowledge base for you*. You'll build one now, scoped to the **next big challenge** you're wrestling with at work. The board paper due in three weeks. The re-org you're shaping. The vendor decision on your desk. Pick something live. Narrow enough that 5–8 topic pages cover it.

Before class you unzipped the Module 2 scaffold: empty `sources/`, empty `brain/`, empty `agents/`, and a root `CLAUDE.md` with the rules Claude follows when it writes pages. Open the working directory in Claude Code. Four phases: curate, put to work, compound, self-maintain.

**Phase 1 — Curate with Claude, then load.**

A brain is only as good as what goes into it. Most people sabotage this step by shovelling in whatever's nearest. Don't. Spend the first ten minutes curating with Claude.

Paste this prompt:

```
I'm building a knowledge brain for one specific challenge I'm working on. I'll describe the challenge in one paragraph when you ask. Then I want you to propose a curation plan — covering three kinds of material:

1. Internal wiki (Confluence or similar) — what search terms should I run, and which spaces are most likely to hold relevant pages?
2. Office365 — which OneDrive folders, SharePoint sites, or email threads should I pull from? Ask me for clues (names of key documents, people I've been mailing about this).
3. Internet best practice — name 2–3 practitioner authors or specific articles worth reading on this challenge. Not vendor blogs. Working practitioners.

Ask me about my challenge first. Then propose the plan. I'll push back where it's off.
```

Claude asks about your challenge. Answer in one paragraph — the real one, not a sanitised version. Claude proposes a plan. Push back where it's wrong, add what's missing. Then go collect: Confluence searches, OneDrive docs pulled through the Claude Code **+** button, practitioner articles. Aim for 8–10 items in `sources/`.

**Quality beats quantity. You are the curator.** Most brains fail in the first ten minutes, not the last ten.

Turn on **plan mode** — Shift+Tab until the footer says *plan mode*. Claude proposes the work but doesn't touch files until you approve.

Paste this prompt:

```
Read every file in sources/. For each major topic you find, create a markdown file in brain/ with a clear title, 3–5 key claims (each pointing back to the source that supports it), and an "open questions" section for things the sources disagree on or leave unclear. Then write brain/index.md that links to every topic page with a one-line description.

Don't summarize the sources. Extract what's distinctive about this challenge — what's specific to my situation, not generic advice about this kind of problem.
```

Claude returns a plan. Read it. Does the topic split match how you actually think about the challenge? If two topics should be one, say so. If something's missing, add it.

Approve. Claude writes the files.

Now ask Claude to audit itself:

```
Pick 3 brain pages at random. For each, is the top claim something specific to my challenge — or a generic observation that could apply to anyone facing this kind of problem? List the generic ones in module-2/soft-pages.md.
```

That list is your first quality check. You'll sharpen those pages in Phase 3.

**Phase 2 — Your first custom agent.**

A library without a librarian is a cost. Give it one.

An agent, at its simplest, is a markdown file: instructions the model reads at the start of every run — what this agent is for, and the rules it follows. Same stuff as the brain. Same stuff as the Module 1 guardrail. Text on disk, re-used.

Turn off plan mode (Shift+Tab). Paste:

```
Help me create my first custom agent as a markdown file in agents/. Ask me these one at a time:

1. What recurring job should this agent do for my challenge? One sentence — e.g., "draft a next-step memo for my CEO," "surface three risks for next week's stakeholder meeting," "synthesize three talking points on progress so far."
2. What rules matter? Starter rules: cite the brain file for every claim, never invent, ask when a source is thin, keep my voice. Change at least one so it's actually mine. Include any hard lines — things the agent must not do even if asked.

Pick a filename from the job. Show me the file before saving.
```

Claude asks. You answer. The agent file lands in `agents/`.

Now use it. Fresh message:

```
Read the agent file you just created, apply its role and rules, and use my brain. Ask me for the specific task, then do it. Cite which brain file each claim came from.
```

Answer with a real task from your challenge. Claude reads the agent file, reads the brain, cites sources, stays inside its rules. The citations tell you whether the brain earned its keep or whether Claude filled in from training data. Quietly, you just made a reusable capability. Same agent, next week's task.

**Phase 3 — Compound.**

Something real landed for your challenge this week — a new Confluence page a colleague wrote, a fresh OneDrive doc, a practitioner article you hadn't found before. Pick one. Drop it into `sources/`. Paste:

```
I've added a new file to sources/. Update the brain — don't rebuild it. For topics you already have: integrate new claims, sharpen existing pages, drop any claim the new source contradicts. For new topics: add pages in the existing shape. Update index.md.

When you're done, tell me three topic pages that got sharper (not longer) from this update — and one page where a claim got dropped or replaced.
```

This is the move. A dumb knowledge base grows. A compounding one *sharpens*. Second batch made the first batch better. Chat literally cannot do this.

Now — don't take Claude's report at face value. Push back:

```
Go through every page you just claimed got sharper. Check whether the top of each page actually got rewritten, or whether the old framing is still sitting above a new section. For any where the old is still there, rewrite the top — let the new direction replace the old, don't preserve both.

Also revisit module-2/soft-pages.md. For each, sharpen the top paragraph so it names what's specific to my challenge, not generic.
```

That last line picks up the soft pages you parked in Phase 1 — where they finally get real.

**Phase 4 — Let it maintain itself.**

Paste:

```
Review the brain. Find: two contradictions between topic pages; two claims that need a source pointer but don't have one; two places where older pages likely went stale given what's in the newer sources. For each, propose a specific fix. Don't apply them yet — ask me to approve or reject each one.
```

Go through Claude's six proposals. Some will be right. Some will miss — reject those. The ones you approve, Claude applies. The brain you're leaving with is one you trusted enough to sign off on line by line.

**Close — swap brains with your neighbor.**

Swap laptops. Ask your neighbor's brain one specific question about *their* challenge. Share the **shape and mechanics** of what you built; keep the confidential substance to yourself. Does the answer sound like someone actually wrestling with the problem, or like a generic AI essay on the topic? Trade notes on voice, depth, thin spots. Your neighbor's brain tells you something about your own.

**What happens:**

Four phases, one system. You curated. You loaded it. You put it to work. You added more and watched pages sharpen instead of bloat. You let it find its own gaps. Chat doesn't do any of this. A brain is *files you keep*, not a thread you close.

**The point:**

Two things combined make a system: *persistence* (it remembers) and *automation* (it runs). Either alone is a toy. Together they compound — each cycle smarter than the last, because the thing learning is the same thing you trust to do the next task. Your challenge is buried in wiki pages, email threads, documents nobody re-reads. Once it lives in a brain an agent can read and improve, the economics change.

Every module after this one uses the brain you just built.

**Time:** 45 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Karpathy's LLM Wiki pattern (prework) — the named idea the exercise operationalizes
- Second Brain / personal knowledge management (Tiago Forte lineage) — the vibe transfers for those who've heard of it
- File-based agentic RAG (Boris Cherny / Anthropic observation) — emerges as a concept; not front-loaded
- Curation-before-ingestion as a craft move — "garbage in, garbage out" reframed as a teaching moment rather than a warning sticker

**Trainer artifacts required (must exist before training day):**
- Scaffold project: empty `sources/`, empty `brain/`, empty `agents/`, starter `CLAUDE.md` at root (topic-page shape, citation convention, "distinctive not descriptive" rule)
- Prework instruction: "Identify one live challenge you're wrestling with — board paper, re-org, vendor decision, market entry. Narrow enough that 5–8 topic pages cover it. Bring it to class."
- Prework: Confluence + OneDrive connectors configured in Claude Code before the session (separate setup doc in the quick reference)

**Plug points:**
- The challenge itself — participant-chosen. Sponsor may suggest a shared challenge theme if a cohort needs more cohesion (e.g., "everyone picks a challenge related to our Q3 OKR").
- Internal wiki tool — Confluence is the default; Notion, SharePoint wiki, Guru, or similar all work. Swap the prompt language to match.
- Practitioner sources — the Phase 1 curation prompt asks Claude to suggest; trainer can pre-curate a reading list for common challenge types if the cohort is time-pressed.

**Philosophy callout (sparing):**
- Belief #2 — act on the future — lands implicitly: the challenge the participant brings is the future they're already acting on. Not named in body.

**Deferred facilitator notes:**
- Watch-fors: participant picks a challenge too broad ("digital transformation") — redirect to one concrete decision; too few sources make it through curation — fallback is to let Claude propose public-web substitutes; connector sign-in issues (live support via Slack/Teams during delivery, not in the student's read); Claude fires all three Phase 2 questions at once (tell the participant to answer in order — not a real break); Phase 3 "it got longer not sharper" failure mode; neighbor-swap running long.
- Decision points: if a cohort is uniformly short on internal-wiki access, pivot Phase 1 curation to OneDrive + internet-only — still teaches the move.
- Confidentiality watch: in the neighbor swap, set the "share mechanics not substance" rule verbally at the start — some participants will default to showing everything.
- Claude Code project setup verification belongs in the prework quick reference, not here.

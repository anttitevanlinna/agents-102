# Exercise: Build your challenge *memory*

**Time:** 45 minutes.

**What you do:**

A chat forgets. A memory remembers.

You've just pinned your challenge in `./challenge.md` (the opener). Now you build a memory around it, scoped to the **next big challenge** you're wrestling with at work. The board paper due in three weeks. The re-org you're shaping. The vendor decision on your desk. Narrow enough that 5–8 topic pages cover it.

The empty `sources/`, `memory/`, and `agents/` folders are already in place from prework. Keep the same <span class="rt-code">session (the chat window you opened in the opener)</span><span class="rt-cowork">task (the workspace you opened in the opener)</span> running. Claude already has your challenge in scrollback, and `./challenge.md` is on disk. Four phases: curate, put to work, compound, self-maintain.

**Phase 1. Curate, ingest, build.**

A memory is only as good as what goes into it. Most people sabotage this step by shovelling in whatever's nearest. Don't. Three beats: Claude helps you curate a plan, then Claude pulls the actual content into `sources/`, then Claude builds `memory/` from what's on disk.

**Always comply with your company's AI policy.** Whatever rules your org has about what can and can't go through an LLM (enterprise agreement, data classification, regulated-data carve-outs) those hold here. If in doubt, check before uploading.

**Ease yourself in.** Even inside what policy allows, bring only what you feel comfortable sharing with an LLM today. If an email thread, a deck, or a doc feels sensitive, skip it. Module 4 is the proper conversation about classification, data boundaries, and what an agent should never see. Right now, curate with the material you'd share with a smart assistant without a second thought.

Heavy reads ahead. Several phases re-read all of `sources/` or `memory/` and rewrite multiple files at once. Plan mode (named in Beat 3) is your primary control. If a non-plan-mode prompt starts reading the world, stop it, steer narrower (what to skip, where to focus), then say *"continue"*. If you want something simple, give a hard cap: *"10 sources max, or even fewer"*.

---

**Beat 1. Curate.** Claude surveys what's available and asks about your world.

{{prompt:build-your-challenge-memory-1}}


Push back, sharpen, add what's missing. The plan is the list. Nothing's in `sources/` yet.

**Beat 2. Ingest.** Now Claude pulls the content into `sources/`. Agent does the heavy lifting; you don't copy-paste.

**A note on what Claude reads.** <span class="rt-cli">Claude Code CLI reads any path you name. For sources outside the training folder, give Claude the absolute path; it reads the file directly.</span><span class="rt-desktop">Claude Code Desktop reads files you attach via the **+** button at the prompt. For sources outside the training folder, attach them with **+** before sending the prompt.</span><span class="rt-cowork">Cowork reads files in the working folders you've selected for this task. Add another folder (your downloads, a notes directory) via the **+** button. To attach a single file for one message, also **+**.</span>

{{prompt:build-your-challenge-memory-2}}


Look at Claude's three lists. Anything in list (3), the NOT REACHABLE pile, stays a reference file unless you decide to include it. In that case share the file with Claude (your runtime knows how); Claude will save the content into `sources/`. Never type or paste content yourself; that's the agent's job. Aim for 8–10 items with real content or local-path links between lists (1) and (2); list (3) can be empty, and usually is.

**Beat 3. Build memory.** Now the memory gets built from what's actually on disk. <span class="rt-code">Turn on plan mode first. Claude writes out what it's about to do before touching files, you approve, nothing commits until you say go. Tell Claude *"Enable plan mode."* (Alternatives: pick *Plan* from the mode dropdown at the bottom of the Claude Code desktop app, or press Shift+Tab to cycle.) The footer should read *plan mode*.</span><span class="rt-cowork">Before you do anything, ask Claude to write a plan first. It writes what it's about to do before touching files, so you can review and steer before files commit.</span>

<div class="rt-code">

Heads up on what happens at the end of the plan: Claude will pause and ask *"Claude has written up a plan and is ready to execute. Would you like to proceed?"* with four options. For this exercise: **option 1 (Yes, and use auto mode)** is the friendly default if the plan's topic split looks right. If two topics should merge, or something's missing, pick **option 4 (Tell Claude what to change)** and type one sentence of feedback; Claude rewrites the plan. Options 2 (manual per-file approval) and 3 (Ultraplan on web) aren't needed here. Full rundown in the [quick reference](../trainings/agents-101/reference/claude-quick-reference.md).

</div>
<div class="rt-cowork">

Heads up: when Claude finishes the plan, read it before saying go. If the topic split looks right, tell Claude to proceed. If two topics should merge or something's missing, type one sentence of feedback and ask Claude to rewrite the plan before executing.

</div>

{{prompt:build-your-challenge-memory-3}}


Claude returns a plan. Read it. Does the topic split match how you actually think about the challenge? If two topics should be one, say so. If something's missing, add it.

Approve. Claude writes the files.

Now ask Claude to audit itself:

{{prompt:build-your-challenge-memory-4}}


That list is your first quality check. You'll sharpen those pages in Phase 3.

<span class="rt-code">**What plan mode just did for you.** The memory build wrote 5–8 files in one shot. That's the kind of multi-file, multi-step work where catching a wrong topic split in a bullet list is ten times cheaper than catching it in seven written files. That's plan mode's job: make Claude think before it makes extensive output, give you one review point instead of many. Plan mode exits automatically after an approved plan runs, so the footer is already back to *default*. Rule of thumb going forward: plan mode for anything that touches many files or compounds over steps; skip it when a single focused prompt will do.</span><span class="rt-cowork">**What asking for a plan just did for you.** The memory build wrote 5–8 files in one shot. That's the kind of multi-file, multi-step work where catching a wrong topic split in a bullet list is ten times cheaper than catching it in seven written files. That's the job of asking Claude to plan first: make Claude think before it makes extensive output, give you one review point instead of many. Rule of thumb going forward: ask for a plan first on anything that touches many files or compounds over steps; skip it when a single focused prompt will do.</span>

**Phase 2. Your first custom agent.**

A library without a librarian is a cost. Give it one.

An agent, at its simplest, is a markdown file: instructions the model reads at the start of every run. What this agent is for, and the rules it follows. Same stuff as the memory. Same stuff as the Module 1 guardrail. Text on disk, re-used.

{{prompt:build-your-challenge-memory-5}}


Claude asks. You answer. The agent file lands in `agents/`.

Now use it. Fresh message.

{{prompt:build-your-challenge-memory-6}}


Answer with a real task from your challenge. Claude reads the agent file, reads the memory, cites sources, stays inside its rules. The citations tell you whether the memory earned its keep or whether Claude filled in from training data. Quietly, you just made a reusable capability. Same agent, next week's task.

**Phase 3. Compound.**

A dumb knowledge base grows. A good one *sharpens*, pages get tighter as new sources land, not longer. Phase 3 proves it: drop one new source in and watch the existing pages get sharper. You pick the source; Claude integrates.

Pick one source that fills a gap (a practitioner article, a skipped doc, an email thread, a local file you can share). Tell Claude to integrate it into the memory, then paste the link or path after the `New source:` line in the prompt.

{{prompt:build-your-challenge-memory-7}}


Read Claude's report. Push back if a claim "got sharper" but the top didn't actually change. Second batch made the first batch better. Chat literally cannot do this.

**Phase 4. Let it maintain itself.**

{{prompt:build-your-challenge-memory-8}}


Go through Claude's six proposals. Some will be right. Some will miss. Reject those. The ones you approve, Claude applies. The memory's now the version you steered, not the version Claude landed alone.

**Close. Put it to work.**

Ask your memory the hardest open question on your challenge right now. Not *"summarize the sources."* A real working question, the kind you'd stay late at the office to answer. *"What's the strongest argument for option A over option B?"* *"Where does our current plan break if the market shifts?"* *"Which of these three risks is actually load-bearing and which are decoration?"*

Run it through the agent you built in Phase 2. That's the one that reads the memory and cites sources.

{{prompt:build-your-challenge-memory-9}}


Then the question.

Read the answer. If it's specific and every claim has a citation, the memory earned its keep; you leave with the first piece of real work it's done. If it's generic, hand-wavy, or leans on uncited knowledge, you know exactly where the memory is still thin. Either way, it's the move you'll repeat at your desk on Monday, and every Monday after.

**What happened:**

Four phases, one system. You curated. You loaded it. You put it to work. You added more and watched pages sharpen instead of bloat. You let it find its own gaps. Chat doesn't do any of this. A memory is *files you keep*, not a thread you close.

**The point:**

Two things combined make a system: *persistence* (it remembers) and *automation* (it runs). Either alone is a toy. Together they compound. Each cycle smarter than the last, because the thing learning is the same thing you trust to do the next task. Your challenge is buried in wiki pages, email threads, documents nobody re-reads. Once it lives in a memory an agent can read and improve, the economics change.

Every module after this one uses the memory you just built.

You just ran **Recipe 2** end-to-end: the three layers (sources, memory, rules file), curate-then-ingest-then-build, plan-mode review on the multi-file write, memory that audits itself. After Agents 101, when the next challenge wants the same shape, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) is where the moves and components live without the training scaffolding.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-02 (story@9ddfac3)
- judges @9ddfac3: writing grandfathered, story PASS, technical grandfathered, behavior grandfathered
- maintainer-reviewed 2026-04-29 (Antti, M2 main exercise manual run; all four phases tested under Cowork lens)

**Frameworks riffed on:**
- Karpathy's LLM Wiki pattern (prework) — the named idea the exercise operationalizes
- Second Brain / personal knowledge management (Tiago Forte lineage) — the vibe transfers for those who've heard of it. *("Second Brain" is the external named concept; we call our own artifact the "memory" to avoid colliding vocabulary.)*
- File-based agentic RAG (Boris Cherny / Anthropic observation) — emerges as a concept; not front-loaded
- Curation-before-ingestion as a craft move — "garbage in, garbage out" reframed as a teaching moment rather than a warning sticker

**Trainer artifacts required (must exist before training day):**
- Working directory: `sources/`, `memory/`, `agents/` already in place from prework (empty). No starter `CLAUDE.md` at root — student writes it in the Module 2 Debrief from session evidence (per `curriculum/CLAUDE.md` Material Distribution rule).
- Opener exercise (`name-your-challenge.md`) runs first in Module 2 — produces `./challenge.md`, which this exercise keys off
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

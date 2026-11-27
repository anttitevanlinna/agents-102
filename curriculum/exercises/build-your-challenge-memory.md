# Exercise: Build your challenge *memory*

**Time:** 47 minutes.

**What you do:**

Build a memory around the challenge in `./challenge.md`: the board paper due in three weeks, the re-org you're shaping. Keep the challenge narrow enough that 5–8 topic pages cover it.

Keep the same session running. The empty `sources/`, `memory/`, and `agents/` folders are in place from prework.

## Phase 1: Curate, ingest, build

*20 min*

Phase 1 has three beats. The agent helps you plan which sources to use. The agent saves each source, or a pointer to it, in `sources/`. Then the agent builds `memory/` from the sources.

**Always comply with your company's AI policy.** Its rules on what can go through an LLM hold here. If in doubt, check before uploading.

**Ease yourself in.** Bring only what you'd share with a smart assistant without a second thought. If a thread, deck or doc feels sensitive, skip it.

## Approve the plan before the files change

Several steps here re-read `sources/` or `memory/` and rewrite many files. Ask the agent for a plan first.

If the agent starts reading before it shows the plan, stop it, narrow the task, and say *"continue"*. For something simple, set a limit: *"10 sources max"*.

---

## Curate the source plan

**Beat 1. Curate.** The agent checks which sources it can reach and asks where your material lives.

{{prompt:build-your-challenge-memory-1}}

Push back on the plan. Sharpen it and add what's missing.

## Ingest the sources

**Beat 2. Ingest.** The agent saves the content of each source in `sources/`.

**What the agent reads.** <span class="rt-cli">The CLI agent reads any path you name; use absolute paths outside the training folder.</span><span class="rt-desktop">The desktop agent reads files you attach; attach outside sources before sending.</span><span class="rt-cowork">The agent reads your selected working folders; add a folder or attach a file for one message.</span>

{{prompt:build-your-challenge-memory-2}}

The agent reports three lists: saved as content, linked by local path, and not reachable. Aim for 8–10 items across the first two. The third list is usually empty. To include an item from it, share the file with the agent.

## Build the memory under a plan

**Beat 3. Build memory.** Ask the agent to write a plan first and wait for your approval before it changes files.

{{prompt:build-your-challenge-memory-3}}

Your runtime may word the approval choices differently. Choose by meaning.

## Review the plan, then have the memory audit itself

Read the plan. If two topics should merge or something is missing, give one sentence of feedback and ask for a revised plan. Otherwise approve.

Then ask the agent to check its own pages for generic claims:

{{prompt:build-your-challenge-memory-4}}

That list is your first quality check.

Ask for a plan whenever a task changes many files or builds on earlier steps. Skip the plan when one focused prompt will do.

## Phase 2: Your first custom agent

*10 min*

A custom agent is a markdown file of instructions: what the agent is for and which rules it follows.

{{prompt:build-your-challenge-memory-5}}

The agent saves the instruction file in `agents/`. Now use your custom agent in a fresh message.

{{prompt:build-your-challenge-memory-6}}

Give the agent a real task from your challenge. The agent should read the memory, cite its sources and follow its rules. The citations show whether an answer came from your memory or from the LLM's training data.

## Phase 3: Compound

*7 min*

A good memory gets sharper as new sources arrive, not longer.

Pick one source that fills a gap: an article, a doc you skipped, a local file. Paste its link or path after the `New source:` line.

{{prompt:build-your-challenge-memory-7}}

If the agent says a page got sharper and the page's top claim reads the same, push back.

## Phase 4: Let it maintain itself

*4 min*

{{prompt:build-your-challenge-memory-8}}

Approve the fixes that are right and reject the rest. The agent applies the ones you approve.

## Phase 5: Close, put it to work

*6 min*

Ask your memory the hardest open question on your challenge, not *"summarize the sources."* For example: *"What's the strongest argument for option A over option B?"* *"Where does our current plan break if the market shifts?"*

The agent answers twice. A helper agent in an empty folder answers the way a chat would. The agent you built in Phase 2 answers from your memory. Both answers go side by side into `module-2/close.md`. Type your question after `Question:`.

{{prompt:build-your-challenge-memory-9}}

Compare the two answers. Where the system cites your sources and the bare answer cannot, your memory and rules made the difference. A line built on the Phase 3 source shows the memory growing. Where both answers are generic, the memory is thin, and the agent adds that gap to the memory's open questions.

## Take stock of the system you built

**What happened:**

A memory is *files you keep*, not a thread you close.

**The point:**

A system is *persistence* (files the agent reads again) plus *automation* (instructions the agent follows without you retyping them). Together they compound: each cycle starts from what the last one left.

This was **Recipe 2**: sources, memory, rules file. For your next challenge, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) holds the same moves.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (story@42b9610a pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @42b9610a: writing grandfathered, story PASS (1 finding see instances/agents-101--exercise--build-your-challenge-memory.story.json), technical grandfathered, behavior grandfathered, pedagogy PASS (verify-refuted), strategy PASS, slides PASS (1 finding see instances/agents-101--exercise--build-your-challenge-memory.slides.json)

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
- Claude Code project setup verification belongs in prework, not here.

**View summary:** You build a folder of curated notes and sources that the agent reads before answering, then watch it compile claims grounded in your world rather than the open internet. The artifact is a memory that persists between sessions and sharpens each run.

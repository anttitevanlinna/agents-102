# Exercise: Three retrievers, three *minds*

**What you do:**

One mind won't do. Today you hire three agents to do the searching and three more to do the deciding.

Two phases. Phase 1 feels like multi-agent: three sessions churning on the same folder, files materialising side by side. Phase 2 *is* multi-agent the way Claude Code ships it natively: one session, three minds spawned inside it, working in parallel.

The crux and the decision question both live in `./crux.md` from the opening exercise. Retrievers, stances, and synthesizer all read it.

**Phase 1. Three retrievers fetch sources, one synthesizer curates memory.**

<span class="rt-code">Open your training directory in up to four Claude Code sessions.</span><span class="rt-cowork">Open up to four Cowork tasks on this connected folder.</span> Three retrievers fetch raw material into `sources/`; a fourth concurrent session synthesizes the retrievals into your `memory/` as they arrive. Three retrievers is the default; if you can't get one running today (no wiki connector, no doc store reachable, network locked), skip it and proceed with what you have. The lesson works with two retrievers, even one. Each session reads the same rules (your root `CLAUDE.md`) and writes into the same folder tree. They don't talk to each other. They work side by side.

Four sessions for one question is more than the work strictly needs — two retrievers plus you reading them would produce the same files with less choreography. The four is for the feeling. Agent heavy-lifting goes sequential by default, and sequential gets slow fast on real work; better to know the parallel option early than discover it under deadline.

The retrievers go live — connectors and the open web. The synthesizer is the one curatorial act in Phase 1: it reads `sources/` as files appear and integrates findings into `memory/`, the curated layer that's been compounding since Module 2. Two layers fill at the same time: raw retrievals in `sources/`, sharper memory in `memory/`.

<div class="rt-code">

*Start four Claude Code sessions in the training directory. Desktop users: open four app sessions side by side. CLI users: four terminal sessions, each running `claude` from the training directory. Name them in your head: Session 1 (wiki retriever), Session 2 (docs retriever), Session 3 (internet retriever), Session 4 (synthesizer — also your main session for Phase 2). Self-study: Teacher Claude walks you through this if you stall.*

</div>
<div class="rt-cowork">

*Open four Cowork tasks on this connected folder. The path: in Claude Desktop, open the *Cowork* tab and start a new task pointed at your training directory. Repeat three more times; each new task connects to the same folder. You'll have four tabs (or four windows, whichever your desktop layout prefers) running side by side. Name them in your head: Task 1 (wiki retriever), Task 2 (docs retriever), Task 3 (internet retriever), Task 4 (synthesizer — also your main task for Phase 2). They share the filesystem; they don't share scrollback, so each one is its own conversation. Self-study: Teacher Claude walks you through this if you stall.*

</div>

**The rhythm:** paste the retriever prompts you can run, into Sessions 1, 2, and 3 as needed. Each retriever will come back with a short list of 6–8 proposed search terms (or 2–3 clues for the docs retriever, 4–6 authors for the internet one) and ask you to keep, swap, or sharpen them. A numbered list in the transcript. Confirm inline, quickly, don't polish. Then the retrievers run in parallel. Paste the synthesizer prompt into Session 4 — it'll wait for the first retrieval to land, then start curating. *Now* switch between sessions and watch files appear in `sources/` and `memory/` sharpen at the same time. The paperwork step is yours; the search and the curation are theirs.

In Session 1:

**Prompt** *(Claude Code)*

```
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Write your findings to sources/wiki-retrieval.md, one paragraph per finding, naming the page/space and one line on why this matters for the question. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
```


In Session 2:

**Prompt** *(Claude Code)*

```
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Write your findings to sources/docs-retrieval.md, what documents and threads show, who said what, what's recent, what's decided, what's still open. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
```


In Session 3:

**Prompt** *(Claude Code)*

```
You are the internet retriever for my challenge. Your job: find practitioner-grade external material on ./crux.md (the crux you named in the opening, plus the ## Question section). No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 6 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Write your findings to sources/internet-retrieval.md, what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine.
4. End the file with "Conflicts and gaps": where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.

Sources first. Every finding cites the URL you actually fetched and the author. If a fetch fails or returns nothing useful, write "[NOT FOUND]", do not fabricate article titles, quotes, or author positions from prior knowledge.
```


In Session 4:

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


Answer each retriever's questions as they come in. Let them run. Switch between sessions if you want. Four agents are now working for you at once — three fetching, one curating. Watch the files appear in `sources/` and `memory/` sharpen as the synthesizer integrates. Something you do at work alone is being done in parallel in front of you. **The feeling is the lesson.**

**Phase 2. Three minds, plus a synthesizer.**

Wait for the synthesizer's Phase 1 loop to finish — its last move is writing `memory/_synthesis-m3.md` naming what changed. Then switch to Session 4. Memory is sharper than it was an hour ago. Now you'll spawn four minds inside *this* session. <span class="rt-code">Claude Code calls them **subagents**.</span><span class="rt-cowork">Cowork calls them **agents**.</span> Claude decides to spawn one out when the work splits cleanly. Each one runs with its own context window (it doesn't see your scrollback), works in parallel, hands back what it produced. Same shape as the agent files you built in Module 2, but spawned inside this session instead of saved as files.

Three minds first, in parallel. Each reads the retrievals and writes a short note. Then a synthesizer combines them against Rumelt's strategy kernel.

<div class="rt-code">

**Prompt** *(Claude Code)*

```
Read whichever retrieval files are in sources/: sources/wiki-retrieval.md, sources/docs-retrieval.md, sources/internet-retrieval.md (one to three). Spawn three subagents in parallel, each with a different stance. Each reads all available retrieval files and writes a short note (under 200 words) to module-3/stances/.

Subagent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Subagent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Subagent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

Return the three stances to me first, unsummarised, so I read them side by side. Tell me where the retrievals had conflicts or gaps that weakened any stance.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
Read whichever retrieval files are in sources/: sources/wiki-retrieval.md, sources/docs-retrieval.md, sources/internet-retrieval.md (one to three). Spawn three agents in parallel, each with a different stance. Each reads all available retrieval files and writes a short note (under 200 words) to module-3/stances/.

Agent 1: Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Agent 2: Assumption experimenter. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Agent 3: Counterintuitive reframer. What's the obvious answer here? Now, what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

Return the three stances to me first, unsummarised, so I read them side by side. Tell me where the retrievals had conflicts or gaps that weakened any stance.
```

</div>


Read the three stances side by side. That's where the thinking is. Push back on any stance that wandered or papered over a real disagreement.

When the stances are sharp, ask the synthesizer to combine them.

<div class="rt-code">

**Prompt** *(Claude Code)*

```
Now spawn a fourth subagent: the synthesizer. It reads the three stance notes in module-3/stances/, ./crux.md (crux + ## Question section), and the fresh retrievals in sources/ (wiki-retrieval, docs-retrieval, internet-retrieval, whichever exist).

Apply Rumelt's strategy kernel as the spine: diagnosis (what's really going on), guiding policy (one coherent approach), coherent actions (what we do Monday). Combine the three stances into a single answer to the question. Name where the three stances disagreed and which one you sided with and why.

Write the answer to module-3/answer.md.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
Now spawn a fourth agent: the synthesizer. It reads the three stance notes in module-3/stances/, ./crux.md (crux + ## Question section), and the fresh retrievals in sources/ (wiki-retrieval, docs-retrieval, internet-retrieval, whichever exist).

Apply Rumelt's strategy kernel as the spine: diagnosis (what's really going on), guiding policy (one coherent approach), coherent actions (what we do Monday). Combine the three stances into a single answer to the question. Name where the three stances disagreed and which one you sided with and why.

Write the answer to module-3/answer.md.
```

</div>


Read `module-3/answer.md`. The synthesizer's combined answer is the artifact. The three stances are the reasoning, and the synthesizer's named-disagreements line is where the work actually happened.

**Close. Does this feel right?**

Ask Claude to recap the three retrievals' core claims next to its synthesized answer. Then ask yourself a question you won't be able to avoid asking anyway: *is this actually right?*

You can't tell yet. Three retrievers read plainly, three stances pushed, a framework held the synthesis together, and still, the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct.

Hold the doubt. Name it to yourself. Don't fix it here.

**Module 5 builds the tools to name what's off systematically.** For now, let it stew.

**What happens:**

Three sessions run searches in parallel on your challenge, and you *see* the work being done in the shared folder. One session runs three stances on the retrievals; a fourth <span class="rt-code">subagent</span><span class="rt-cowork">agent</span>, the synthesizer, combines them against Rumelt's kernel. You get a strategic answer to your real question, and you catch where it glossed.

**The point:**

Multi-agent has two shapes in Claude Code. Parallel sessions on shared files: the visceral one. <span class="rt-code">Subagents</span><span class="rt-cowork">Agents</span> in one session: the native one. The filesystem is the meeting room in both. Seams are usually where the work fails.

**Time:** 50 minutes.

<!-- maintainer -->

**Quality:** draft 2026-04-28 (Pass 2 — sim/eval not yet run)

**Frameworks riffed on:**
- Rumelt's strategy kernel (synthesizer spine) — builds on the crux move Module 2's Debrief inline-named
- Roger Martin's *what would have to be true?* — Subagent 2's spine; threaded through the curriculum's throughlines (strategy as assumptions)
- Rory Sutherland's counterintuitive reframe — Subagent 3's spine, named out loud
- Anthropic's multi-agent warning — only a few situations where splitting wins; Phase 1 and Phase 2 are engineered to be two of them. **TODO:** add URL [SOURCE NEEDED — likely Anthropic's *Building effective agents* engineering post; verify and pin].
- "The filesystem is the meeting room" — file-based agentic coordination (Boris Cherny / Anthropic observation), emerges experientially, named in the bridging lecture. **TODO:** add URL [SOURCE NEEDED — likely Cherny's *Claude Code* engineering talk or the Anthropic engineering blog; verify and pin].

**Plug points:**
- The strategic question — participant-written, one sentence, lives in `./crux.md`
- The three source zones — wiki / docs / internet. Prompt language is permissive (student names their wiki and doc store inline — Confluence / Notion / SharePoint wiki / Guru; OneDrive / SharePoint / Google Drive). No swap needed; the retrievers ask.
- The Rumelt kernel default — can be swapped by challenge type (StoryBrand for positioning challenges, JTBD for product/feature calls, principle of least privilege for access decisions). Swap happens in one line of Phase 2's synthesizer prompt.
- The Rory seat — optional swap for a premortem voice (Kahneman/Klein) on risk-heavy challenges, or a JTBD interviewer on customer-facing ones. Keep three stances. Keep them genuinely different.

**Philosophy callout (sparing):**
- Belief #2 — act on the future — lands implicitly in the Close. The student just produced a real answer to their real question; the brief comes from what they're already acting on. Not named in body.
- Belief #22 — share, don't hoard — lands implicitly in the coordination rule the student writes back into `CLAUDE.md`: their learning compounds into the next handoff, not just their own memory.

**Capability notes (confirmed):**
- Multi-window / multi-session on the same working directory: CLI = four terminal windows, desktop = four sessions. Trainer demos both live in Phase 1. Confirmed by Antti as working. (Self-study variant will need a dedicated recipe file — see variant TODO below.)
- Subagent launch phrasing in Phase 2 ("spawn three subagents in parallel") confirmed as working in current Claude Code. No check owed.
- `+` button attachment flow for OneDrive/SharePoint inherited from Module 2; per-cohort connector state already verified there.

**Self-study variant TODO:**
- When Module 3 ships in self-study (no trainer to demo the four-session open), the exercise body needs a short recipe replacing the "Your trainer demos both live" line. Hold for the self-study pass; the live-trainer version ships as-is.

**Deferred facilitator notes:**
- Watch-fors: (a) starting 4 Claude Code sessions on the same directory is the single highest-friction step — pre-flight check with the room, name which session is Session 1 / 2 / 3 / Main; (b) retrievers return non-comparable outputs by design, student may try to normalise them — that's exactly what the synthesizer is for, let them feel the asymmetry; (c) the synthesizer left under-prompted will average three stances into beige — the prompt forces conflict-naming before the answer, but coach any room that slips past it; (d) Rory seat produces dad jokes if the student writes "be witty" — coach toward Sutherland's actual move (reframe the problem, steal an analogy, question the anchor); (e) Phase 2 subagent invocation is new for most participants — demo once, then let them drive.
- Decision points: if a cohort is uniformly short on internal wiki access, collapse Session 1 and Session 2 into one retriever that reads whatever they have, and spend the time saved on Phase 2; the multi-agent lesson survives with two retrievers.
- Time budget: Phase 1 ~28 min (four sessions started, prompts paste, retrievers + synthesizer run concurrently, student watches & answers), Phase 2 ~15 min, Close ~7 min. Over 60 = retrievers sprawled; under 40 = Phase 1 didn't actually produce the felt moment of concurrency.

# Exercise: Three retrievers, three minds

**What you do:**

One mind won't do. Last module you were the librarian — searched Confluence, pulled from OneDrive, chased practitioner articles by hand. Today you hire three agents to do the searching, and three more to do the deciding. The filesystem is the meeting room.

Two phases. Phase 1 feels like multi-agent — three windows churning on the same folder, files materialising side by side. Phase 2 *is* multi-agent the way Claude Code ships it natively — one window, three minds spawned inside it, working in parallel.

**Phase 0 — One question, written down.**

Write the strategic question you want answered. One sentence. Not a topic, not a summary — a decision you'd stay late to make. *"What's the right next move on [my challenge] over the next 90 days?"* is a decent default. *"Should we kill option A?"* is better if that's where you are. Save it to `module-3/question.md`.

**Phase 1 — Three retrievers, three windows.**

Open your training directory in four Claude Code sessions. One per retriever, plus one main window where you'll work in Phase 2. Each session reads the same rules (your root `CLAUDE.md`) and writes into the same folder tree. They don't talk to each other. They work side by side.

*CLI users: open four terminal windows, each running `claude` in the training directory. Desktop users: open four Claude Code sessions on the training directory. Your trainer demos both live — this is the highest-friction step in the whole module; take the thirty seconds to get it right before you paste anything.*

**The rhythm:** paste all three retriever prompts first, into Windows 1, 2, and 3. Each retriever will come back with its proposals and ask you to confirm. Answer all three confirmations — quickly, don't polish. Then the three retrievers run in parallel. *Now* switch between windows and watch files land in `module-3/retrievals/`. The paperwork step is yours; the search is theirs.

In Window 1, paste:

```
You are the Confluence retriever for my challenge. Your job: find every piece of internal wiki material that matters to the strategic question in module-3/question.md. Read the question first.

Then:
1. Propose 6–8 search terms for our internal wiki. Ask me to confirm or sharpen them before running anything.
2. Run the searches through the + button. Open the pages. Read them properly.
3. Write your findings to module-3/retrievals/confluence.md — one paragraph per finding, naming the page/space and one line on why this matters for the question. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section — where internal pages disagree, where the wiki is thin, what's conspicuously missing.
```

In Window 2, paste:

```
You are the Office365 retriever for my challenge. Your job: find the relevant recent documents and email threads for the strategic question in module-3/question.md.

Then:
1. Ask me for three clues — names of documents I remember, people I've been mailing about this, or SharePoint sites to check. Use them.
2. Pull the content through the + button, either by attaching documents directly or by using the OneDrive / SharePoint connector.
3. Write your findings to module-3/retrievals/o365.md — what documents and threads show, who said what, what's recent, what's decided, what's still open. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps" — disagreements between sources, things that should exist but don't, names conspicuously missing.
```

In Window 3, paste:

```
You are the internet retriever for my challenge. Your job: find practitioner-grade external material on the strategic question in module-3/question.md. No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 12 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Write your findings to module-3/retrievals/internet.md — what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine.
4. End the file with "Conflicts and gaps" — where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.
```

Answer each retriever's questions as they come in. Let them run. Switch between windows if you want — three agents are now working for you at once. Watch the files appear in `module-3/retrievals/`. Something you do at work alone is being done in parallel in front of you. **The feeling is the lesson.**

**Phase 2 — Three minds, one window.**

Switch to your main window. The three retrievals are on disk. Now you'll spawn three minds inside *this* session — Claude Code calls them subagents, same idea as the agent files you built in Module 2, but running inside this conversation, in parallel. You prompt; Claude dispatches; they each return. Paste:

```
Read the three files in module-3/retrievals/. You'll answer the question in module-3/question.md, but not by summarising. You'll spawn three subagents in parallel, each with a different stance. Each reads all three retrieval files and writes a short note (under 200 words) to module-3/stances/ with its take.

Subagent 1 — Backward-from-end planner. Imagine the outcome we want in 12 months. Work backwards. What must be true by month 9, month 6, month 3, next week? What's the first move on Monday?

Subagent 2 — Assumption experimentator. Roger Martin's test: for the most attractive option, what would have to be true for it to work? List the load-bearing assumptions. For each, name the cheapest test that could kill it within a week.

Subagent 3 — Counterintuitive reframer. What's the obvious answer here? Now: what's the reframe? Question the framing of the question itself. Steal an analogy from an unrelated field. Which bias is operating, and what happens if we invert it? (Be sharp, not glib.)

Return the three stances to me first, unsummarised, so I read them side by side.

Then, using Rumelt's strategy kernel as the spine — diagnosis (what's really going on), guiding policy (one coherent approach), coherent actions (what we do Monday) — combine the three stances into a single answer to the question. Name where the three stances disagreed and which one you sided with and why.

Before you answer: tell me where the retrievals had conflicts or gaps that weakened any stance.
```

Read the three stances side by side before Claude combines them. That's where the thinking actually is. The combined answer is the artifact; the three stances are the reasoning.

**Close — does this feel right?**

Read the synthesizer's answer next to the three retrievals. Then ask yourself a question you won't be able to avoid asking anyway: *is this actually right?*

You can't tell yet. Three retrievers read honestly, three stances pushed sharply, a framework held the synthesis together — and still, the answer sits at that uneasy distance where you'd stake your reputation on some of it and not all of it, and you can't yet say which is which. That feeling is correct. Anyone who ships agent output to a real stakeholder meets it. Pretending you don't is the real failure.

Don't fix it here. Write one line to `module-3/wonder.md` — the single thing about this answer you're not sure about. Loose, not tidy. You're noting, not resolving.

**Module 5 comes back for this.** That's where we build the tools to name what's off and decide what to do. For now, let it stew.

**What happens:**

Three windows run searches in parallel on your challenge, and you *see* the work being done in the shared folder. One window runs three stances on the retrievals and combines them against Rumelt's kernel. You get a strategic answer to your real question — and you catch where it glossed. Module 5 comes back for the gloss.

**The point:**

Multi-agent has two shapes in Claude Code. Parallel sessions on shared files — the visceral one. Subagents in one session — the native one. The filesystem is the meeting room in both. The seams are where the work fails, not where the work lands.

**Time:** 50 minutes.

<!-- maintainer -->

**Frameworks riffed on:**
- Rumelt's strategy kernel (synthesizer spine) — builds on the crux skill Module 2 deposited in its Debrief
- Roger Martin's *what would have to be true?* — Subagent 2's spine; threaded through the curriculum's throughlines (strategy as assumptions)
- Rory Sutherland's counterintuitive reframe — Subagent 3's spine, named out loud
- Anthropic's multi-agent warning — only a few situations where splitting wins; Phase 1 and Phase 2 are engineered to be two of them
- "The filesystem is the meeting room" — file-based agentic coordination (Boris Cherny / Anthropic observation), emerges experientially, named in the bridging lecture

**Plug points:**
- The strategic question — participant-written, one sentence, lives in `module-3/question.md`
- The three source zones — Confluence / Office365 / internet by default; swap Notion/SharePoint wiki/Guru for Confluence, Google Workspace for Office365. Prompt language swaps 1:1.
- The Rumelt kernel default — can be swapped by challenge type (StoryBrand for positioning challenges, JTBD for product/feature calls, principle of least privilege for access decisions). Swap happens in one line of Phase 2's synthesizer prompt.
- The Rory seat — optional swap for a premortem voice (Kahneman/Klein) on risk-heavy challenges, or a JTBD interviewer on customer-facing ones. Keep three stances. Keep them genuinely different.

**Philosophy callout (sparing):**
- Belief #2 — act on the future — lands implicitly in the Close. The student just produced a real answer to their real question; the brief comes from what they're already acting on. Not named in body.
- Belief #12 — share, don't hoard — lands implicitly in the coordination rule the student writes back into `CLAUDE.md`: their learning compounds into the next handoff, not just their own memory.

**Capability notes (confirmed):**
- Multi-window / multi-session on the same working directory: CLI = four terminal windows, desktop = four sessions. Trainer demos both live in Phase 1. Confirmed by Antti as working. (Self-study variant will need a dedicated recipe file — see variant TODO below.)
- Subagent launch phrasing in Phase 2 ("spawn three subagents in parallel") confirmed as working in current Claude Code. No check owed.
- `+` button attachment flow for OneDrive/SharePoint inherited from Module 2; per-cohort connector state already verified there.

**Self-study variant TODO:**
- When Module 3 ships in self-study (no trainer to demo the four-session open), the exercise body needs a short recipe replacing the "Your trainer demos both live" line. Hold for the self-study pass; the live-trainer version ships as-is.

**Deferred facilitator notes:**
- Watch-fors: (a) opening 4 Claude Code windows on the same directory is the single highest-friction step — pre-flight check with the room, name which window is Window 1 / 2 / 3 / Main; (b) retrievers return non-comparable outputs by design, student may try to normalise them — that's exactly what the synthesizer is for, let them feel the asymmetry; (c) the synthesizer left under-prompted will average three stances into beige — the prompt forces conflict-naming before the answer, but coach any room that slips past it; (d) Rory seat produces dad jokes if the student writes "be witty" — coach toward Sutherland's actual move (reframe the problem, steal an analogy, question the anchor); (e) Phase 2 subagent invocation is new for most participants — demo once, then let them drive.
- Decision points: if a cohort is uniformly short on internal wiki access, collapse Window 1 and Window 2 into one retriever that reads whatever they have, and spend the time saved on Phase 2; the multi-agent lesson survives with two retrievers.
- Time budget: Phase 0 ~3 min, Phase 1 ~25 min (windows open, prompts paste, retrievers run, student watches & answers), Phase 2 ~15 min, Close ~7 min. Over 60 = retrievers sprawled; under 40 = Phase 1 didn't actually produce the felt moment of concurrency.

# Exercise: Three retrievers, one curator

**What you do:**

Hire three agents to fetch raw material on your challenge, wiki, docs, the open web. Hire a fourth to curate the findings into your memory in real time, while the retrievers are still running.

**What happened:**

Four sessions ran on the same shared folder at once. Three retrievers streamed findings into `sources/`; the fourth (the synthesizer) read `sources/` as it grew and integrated into `memory/`, the curated layer that's been compounding since Module 2. Two layers filled at the same time.

**The point:**

Multi-agent's first shape: separate sessions on shared files. Each agent runs in its own context, sees the others' work via the filesystem, has its own connectors and history. The feeling, files materialising in two folders at once, four windows churning on one question, is the lesson.

**Time:** ~28 minutes.

The crux and the decision question both live in `./crux.md` from the opening exercise. Retrievers and the synthesizer all read it.

<span class="rt-code">Open your training directory in up to four Claude Code sessions.</span><span class="rt-cowork">Open up to four Cowork tasks on this connected folder.</span> Three retrievers fetch raw material into `sources/`; a fourth concurrent session synthesizes the retrievals into your `memory/` as they arrive. Three retrievers is the default; if you can't get one running today (no wiki connector, no doc store reachable, network locked), skip it and proceed with what you have. The lesson works with two retrievers, even one. Each session reads the same rules (your root `CLAUDE.md`) and writes into the same folder tree. They don't talk to each other. They work side by side.

Four sessions for one question is more than the work strictly needs, two retrievers plus you reading them would produce the same files with less choreography. The four is for the feeling. Agent heavy-lifting goes sequential by default, and sequential gets slow fast on real work; better to know the parallel option early than discover it under deadline.

The retrievers go live, connectors and the open web. The synthesizer is the one curatorial act here: it reads `sources/` as files appear and integrates findings into `memory/`, the curated layer that's been compounding since Module 2. Two layers fill at the same time: raw retrievals in `sources/`, sharper memory in `memory/`.

<div class="rt-code">

*Keep your existing crux session open, that becomes Session 4 (synthesizer; also your main session through the next exercise). Open three more Claude Code sessions in the training directory: Session 1 (wiki retriever), Session 2 (docs retriever), Session 3 (internet retriever). Desktop users: open three app sessions alongside the existing one. CLI users: three more terminal sessions, each running `claude` from the training directory. Self-study: Teacher Claude walks you through this if you stall.*

</div>
<div class="rt-cowork">

*Keep your existing crux task open, that becomes Task 4 (synthesizer; also your main task through the next exercise). In Claude Desktop's *Cowork* tab, start three more tasks pointed at your training directory: Task 1 (wiki retriever), Task 2 (docs retriever), Task 3 (internet retriever). You'll have four tabs (or four windows, whichever your desktop layout prefers) running side by side. They share the filesystem; they don't share scrollback, so each one is its own conversation. Self-study: Teacher Claude walks you through this if you stall.*

</div>

**The rhythm:**

1. **Sessions 1, 2, 3, retrievers.** Paste each retriever prompt into its session. Each one returns a short list (6–8 search terms for wiki, 2–3 clues for docs, 4–6 authors for internet) and asks you to keep, swap, or sharpen. Confirm inline, quickly, don't polish. Then the retrievers run.
2. **Session 4, synthesizer.** Paste the synthesizer prompt. It waits for the first retrieval to land, then starts curating into `memory/`.
3. **All four running.** Switch between sessions. Watch files appear in `sources/` and `memory/` sharpen at the same time.

Heavy run ahead. Each retriever fans out across your wiki, docs, or the web; the synthesizer keeps going as findings stream in. If an agent starts reading the world, stop it, steer narrower (what to skip, where to focus), then say *"continue"*. If you want something simple, give a hard cap: *"10 sources max, or even fewer"*.

In Session 1, tell this session to act as your wiki retriever and stream findings into `sources/wiki-retrieval.md`.

**Prompt** *(Claude Code)*

```
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Append each finding to sources/wiki-retrieval.md as soon as you have it, one paragraph per finding, naming the page/space and one line on why this matters for the question. Never overwrite earlier findings. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
```

If Claude asks for ten search terms or a broad wiki tour, narrow it: *"Use the 6-8 terms you proposed, search only the wiki I named, and append findings as you go."*


In Session 2, tell this session to act as your docs retriever and stream findings into `sources/docs-retrieval.md`.

**Prompt** *(Claude Code)*

```
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Append each finding to sources/docs-retrieval.md as soon as you have it, what documents and threads show, who said what, what's recent, what's decided, what's still open. Never overwrite earlier findings. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
```

If Claude asks for vague clues, give one person, one document title, and one drive/site. If it starts smoothing disagreement, push back: *"Quote the contradiction raw before you interpret it."*


In Session 3, tell this session to act as your internet retriever and stream practitioner findings into `sources/internet-retrieval.md`.

**Prompt** *(Claude Code)*

```
No preamble — propose your author list now.

You are the internet retriever for my challenge. Your job: find practitioner-grade external material on ./crux.md (the crux you named in the opening, plus the ## Question section). No vendor blogs. No analyst predictions. Practitioners writing about their own work, last 6 months.

Then:
1. Propose 4–6 specific authors or recent articles worth reading. Ask me to confirm or replace any before fetching.
2. Fetch them. Read them.
3. Append each finding to sources/internet-retrieval.md as soon as you have it, what each practitioner says that's specific, with the URL, and one line on how their situation maps (or doesn't) to mine. Never overwrite earlier findings.
4. End the file with "Conflicts and gaps": where practitioners disagree, where my challenge is weirder than any of their cases, what the internet can't tell me.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the URL you actually fetched and the author. If a fetch fails or returns nothing useful, write "[NOT FOUND]", do not fabricate article titles, quotes, or author positions from prior knowledge.
```

If Claude rubber-stamps a weak author list, push back before fetching: *"Replace vendor/analyst sources with practitioners writing from their own operating experience in the last 6 months."*


Heads-up: retrievers tend to wrap up early. A clean-looking *Conflicts and gaps* section reads like the work is done; usually it isn't. If the file feels thinner than the question deserves, the prompt below is your nudge to keep them chugging.

Once a retriever returns its first pass, wiki, docs, or internet, paste this back into that session to push another round.

**Prompt** *(Claude Code, reusable across all three retriever sessions)*

```
Push another round. What did the first pass miss? Different angles, related sources, the citations inside what you already opened — keep going until the file feels complete or you genuinely don't find new material. Append; don't rewrite.
```


In Session 4, tell this session to act as the synthesizer and integrate the streaming retrievals into `memory/`.

**Prompt** *(Claude Code)*

```
No plan or preamble — enter the loop now.

You are the synthesizer for my challenge. Three retrievers are running concurrently in Sessions 1, 2, and 3 — they'll write findings to sources/wiki-retrieval.md, sources/docs-retrieval.md, and sources/internet-retrieval.md as they finish. Your job is curation: integrate those findings into my memory/ topic pages, scoped to ./crux.md (the crux you named in the opening, plus the ## Question section).

Memory is curated, not a raw dump. Existing topic pages cover the challenge — extend them where the new sources sharpen what's already there; create a new topic page where the retrievals reveal a topic memory was missing. Cite sources by filename + paragraph.

The loop:
1. Wait for any new content in sources/. When a file appears (or grows), read it.
2. Diff against existing memory/ pages. Extend in place if the topic exists; create a new page if it doesn't. Don't ask permission for either path.
3. Make the update. Cite the source file by name. Integrate, don't append. Keep claims tight.
4. Repeat until all three retrievals are integrated.

When all three retrievals are in: write a one-paragraph note at memory/_synthesis-m3.md. List each memory file you actually changed by name and the exact filenames git diff would show; if fewer changed than the retrieval count, say so explicitly. Name where retrievals contradicted what was already in memory by quoting the conflicting claims verbatim from each source. That contradiction line is load-bearing — flag it, don't smooth it.

Don't fabricate. Every memory update cites a source-file finding. If a retrieval is empty or thin, say so in your synthesis note rather than papering over the gap.
```


Answer each retriever's questions as they come in. Let them run. Switch between sessions if you want. Four agents are now working for you at once, three fetching, one curating. Watch the files appear in `sources/` and `memory/` sharpen as the synthesizer integrates. Something you do at work alone is being done in parallel in front of you. **The feeling is the lesson.**

When the synthesizer's last move lands, `memory/_synthesis-m3.md` naming what changed, Phase 1 is done. Hand off to *Three minds, one synthesis* (next exercise), which keeps Session 4 open as the main session.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-03
- judges: not yet judge-audited
- maintainer-reviewed @60b1b6c: PASS — M3 manual walkthrough

**Role in Module 3:** Second exercise (after `name-your-crux`). Produces curated `memory/` updates + raw `sources/` retrievals; sets up the artifact stack the next exercise (`three-minds-one-synthesis`) reasons against.

**Frameworks riffed on:**
- One-agent-per-recurring-workflow (Bosser stance) — across workflows you build many; within a single workflow, splitting earns its keep only when access, dialect, or stance forces it. The 3 retrievers are one of those rare within-workflow cases (different access, different dialect).
- "The filesystem is the meeting room" — file-based agentic coordination (Boris Cherny / Anthropic observation), emerges experientially, named in the bridging lecture. **TODO:** add URL [SOURCE NEEDED — likely Cherny's *Claude Code* engineering talk or the Anthropic engineering blog; verify and pin].

**Plug points:**
- The three source zones — wiki / docs / internet. Prompt language is permissive (student names their wiki and doc store inline — Confluence / Notion / SharePoint wiki / Guru; OneDrive / SharePoint / Google Drive). No swap needed; the retrievers ask.

**Philosophy callout (sparing):**
- Belief #22 — share, don't hoard — lands implicitly in the file-based coordination: the synthesizer compounds what the retrievers find into shared memory, not its own scrollback.

**Capability notes (confirmed):**
- Multi-window / multi-session on the same working directory: CLI = four terminal windows, desktop = four sessions. Trainer demos both live in Phase 1. Confirmed by Antti as working. **Cowork: 3 concurrent tasks confirmed running just fine on the same connected folder (Antti, 2026-04-29). 4-task case not yet live-tested but plausible by extension.** (Self-study variant will need a dedicated recipe file — see variant TODO below.)
- **Synthesizer-to-memory loop confirmed working live (Antti, 2026-04-29).** The 4th-session synthesizer reads `sources/` as retrievers stream findings and integrates into `memory/` concurrently — pushes back against the "theatre not architecture" critique by demonstrating the cross-session loop runs end-to-end on real material.
- `+` button attachment flow for OneDrive/SharePoint inherited from Module 2; per-cohort connector state already verified there.

**Self-study variant TODO:**
- When Module 3 ships in self-study (no trainer to demo the four-session open), the exercise body needs a short recipe replacing the "trainer demos both live" line. Hold for the self-study pass; the live-trainer version ships as-is.

**Deferred facilitator notes:**
- Watch-fors: (a) starting 4 Claude Code sessions on the same directory is the single highest-friction step — pre-flight check with the room, name which session is Session 1 / 2 / 3 / 4; (b) retrievers return non-comparable outputs by design, student may try to normalise them — that's exactly what the synthesizer is for, let them feel the asymmetry; (c) the synthesizer left under-prompted will batch-write at the end instead of streaming — the prompt forces "write each finding as soon as you have it" but coach any room that slips past it; (d) **citation-cargo-cult watch:** retrievers fetch and dump as-is, the synthesizer is the discriminator. Risk: Claude can produce findings consistent with a page's general topic without having actually read the cited paragraph. Spot-check 2–3 source-file findings against their cited URLs during the synthesizer phase — if the cited page doesn't carry the claim, the retriever was confabulating. The fix is downstream (synthesizer surfaces it, student decides), not upstream prompt machinery.
- Decision points: if a cohort is uniformly short on internal wiki access, collapse Session 1 and Session 2 into one retriever that reads whatever they have, and spend the time saved on the next exercise; the multi-agent-shape lesson survives with two retrievers.
- Time budget: ~28 min total. Four sessions started, prompts pasted, retrievers + synthesizer run concurrently, student watches & answers + nudges. Over 35 = retrievers sprawled; under 20 = the felt moment of concurrency didn't actually land.

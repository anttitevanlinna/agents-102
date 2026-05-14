# Exercise: Three retrievers, one curator

**Time:** ~28 minutes.

**What you do:**

Hire three agents to fetch raw material on your challenge, wiki, docs, the open web. Hire a fourth to curate the findings into your memory in real time, while the retrievers are still running.

**The point:**

Multi-agent's first shape: separate sessions on shared files. Each agent runs in its own context, sees the others' work via the filesystem, has its own connectors and history. The feeling, files materialising in two folders at once, four windows churning on one question, is the lesson.

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

{{prompt:three-retrievers-one-curator-1}}

If Claude asks for ten search terms or a broad wiki tour, narrow it: *"Use the 6-8 terms you proposed, search only the wiki I named, and append findings as you go."*


In Session 2, tell this session to act as your docs retriever and stream findings into `sources/docs-retrieval.md`.

{{prompt:three-retrievers-one-curator-2}}

If Claude asks for vague clues, give one person, one document title, and one drive/site. If it starts smoothing disagreement, push back: *"Quote the contradiction raw before you interpret it."*


In Session 3, tell this session to act as your internet retriever and stream practitioner findings into `sources/internet-retrieval.md`.

{{prompt:three-retrievers-one-curator-3}}

If Claude rubber-stamps a weak author list, push back before fetching: *"Replace vendor/analyst sources with practitioners writing from their own operating experience in the last 6 months."*


Heads-up: retrievers tend to wrap up early. A clean-looking *Conflicts and gaps* section reads like the work is done; usually it isn't. If the file feels thinner than the question deserves, the prompt below is your nudge to keep them chugging.

Once a retriever returns its first pass, wiki, docs, or internet, paste this back into that session to push another round.

{{prompt:three-retrievers-one-curator-4}}


In Session 4, tell this session to act as the synthesizer and integrate the streaming retrievals into `memory/`.

{{prompt:three-retrievers-one-curator-5}}


Answer each retriever's questions as they come in. Let them run. Switch between sessions if you want. Four agents are now working for you at once, three fetching, one curating. Watch the files appear in `sources/` and `memory/` sharpen as the synthesizer integrates. Something you do at work alone is being done in parallel in front of you. **The feeling is the lesson.**

When the synthesizer's last move lands, `memory/_synthesis-m3.md` naming what changed, Phase 1 is done. Hand off to *Three minds, one synthesis* (next exercise), which keeps Session 4 open as the main session.

You just ran **Recipe 3**'s parallel-retrieval shape: three retrievers fanning out into `sources/` while a synthesizer integrates into `memory/`. After Agents 101, when the next strategic question needs three reads at once, the [Cookbook for Agent System Design](../trainings/agents-101/supplementary/cookbook-for-agent-system-design.md) names the fan-in move and what composes with it.

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

**Session-widget TODO (2026-05-05):**
- This exercise opens three NEW Claude Code sessions (Session 1 wiki / Session 2 docs / Session 3 internet) plus continues Session 4 (synthesizer, from prior `name-your-crux` exercise), but currently uses italic prose at the top instead of `**Session**` widgets. Per `compounded/2026-05-04-pedagogy-session-widget-source-shape-and-placement.md`, mid-exercise re-fork sessions should carry widgets that name the reason. Decision pending: stack three widgets visibly (matches the architecture but adds visual weight at the most orchestration-dense moment in the curriculum) vs leave as italic prose (cleaner page, but extractor + any tooling that scans `**Session**` boundaries undercount M3 by 3). Same shape may apply to other multi-session exercises if/when they appear.

**Deferred facilitator notes:**
- Watch-fors: (a) starting 4 Claude Code sessions on the same directory is the single highest-friction step — pre-flight check with the room, name which session is Session 1 / 2 / 3 / 4; (b) retrievers return non-comparable outputs by design, student may try to normalise them — that's exactly what the synthesizer is for, let them feel the asymmetry; (c) the synthesizer left under-prompted will batch-write at the end instead of streaming — the prompt forces "write each finding as soon as you have it" but coach any room that slips past it; (d) **citation-cargo-cult watch:** retrievers fetch and dump as-is, the synthesizer is the discriminator. Risk: Claude can produce findings consistent with a page's general topic without having actually read the cited paragraph. Spot-check 2–3 source-file findings against their cited URLs during the synthesizer phase — if the cited page doesn't carry the claim, the retriever was confabulating. The fix is downstream (synthesizer surfaces it, student decides), not upstream prompt machinery.
- Decision points: if a cohort is uniformly short on internal wiki access, collapse Session 1 and Session 2 into one retriever that reads whatever they have, and spend the time saved on the next exercise; the multi-agent-shape lesson survives with two retrievers.
- Time budget: ~28 min total. Four sessions started, prompts pasted, retrievers + synthesizer run concurrently, student watches & answers + nudges. Over 35 = retrievers sprawled; under 20 = the felt moment of concurrency didn't actually land.

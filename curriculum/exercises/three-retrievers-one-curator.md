# Exercise: Three retrievers, one curator

**Time:** ~28 minutes.

Three retrievers fetch raw material on your challenge into `sources/`; a fourth session curates it into `memory/`. All read `./crux.md`. Each session has its own context and connectors. Skip any retriever you can't run today.

<div class="rt-code">

*Keep your crux session as Session 4 (synthesizer). Open three more: 1 wiki, 2 docs, 3 internet.*

</div>
<div class="rt-cowork">

*In *Cowork*, keep your crux task as Task 4 and start three more: 1 wiki, 2 docs, 3 internet.*

</div>

Paste each retriever prompt and confirm its short list. If an agent starts reading the world, stop it, steer narrower, then say *"continue"*.

Session 1, wiki: `sources/wiki-retrieval.md`.

{{prompt:three-retrievers-one-curator-1}}

Session 2, docs: `sources/docs-retrieval.md`.

{{prompt:three-retrievers-one-curator-2}}

Session 3, internet: `sources/internet-retrieval.md`.

{{prompt:three-retrievers-one-curator-3}}

If a file is thin, paste this for another round.

{{prompt:three-retrievers-one-curator-4}}

Session 4, synthesizer: `memory/`.

{{prompt:three-retrievers-one-curator-5}}

Open one retriever's file. Find one number or phrase that the synthesizer dropped or smoothed in `memory/`. Should it have survived?

Done when `memory/_synthesis-m3.md` names what changed.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@4d9c4af2 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

- **Atomic — no phase markers.** Four sessions run concurrently on one retrieval-and-curate window; the seams here are between agents, not across time. Line 3 is authored, not generated.

**Role in Module 3:** Second exercise (after `name-your-crux`). Produces curated `memory/` updates + raw `sources/` retrievals; sets up the artifact stack the next exercise (`three-minds-one-synthesis`) reasons against.

**Frameworks riffed on:**
- One-agent-per-recurring-workflow (Bosser stance) — across workflows you build many; within a single workflow, splitting earns its keep only when access, dialect, or stance forces it. The 3 retrievers are one of those rare within-workflow cases (different access, different dialect).
- **Owned synthesis:** agents hand off through shared files; that is the coordination students experience here and in the bridging lecture (Antti 2026-11-13: no "meeting room", no "hire").

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

**View summary:** Three agents fetch raw material on your challenge from wiki, documents and the open web, and a fourth curates their findings into your memory while they run. The artifact is a memory filled by four sessions on shared files.

# Kieran Klaassen — Compound Engineering as Operational Practice

**Type:** Practitioner observation (Every Inc, GM of Cora) | **Evidence:** L2 with one independent analyst corroboration; convergence pending
**Key sources:** Klaassen's own essays on Every (Source Code, Context Window, Chain of Thought), the open-source `compound-engineering-plugin`, podcast appearances (host + guest format), Will Larson's independent practitioner analysis

Companion file: `every-inc.md` (the company shape — 10 people, 5 products). This file is the practitioner read on what Klaassen specifically argues for.

---

## The loop — four steps as published, seven as currently practised

The name and the mechanism are stable; **the step count is not, and anyone citing an ordinal should re-count first.**

The Dec 2025 form is four steps, printed in order — **Plan → Work → Review → Compound.** Worth noting who owns which: the source assigns Plan and Work to *"Agents"* and Review and Compound to *"The engineer."* The division of labour is the argument, not the count.

On 2026-05-29 Klaassen expanded it himself, keeping the name: *"Ideate → brainstorm → plan → work → review → polish → compound → repeat."* His stated reason is that the middle got reliable — *"the work phase has become boring—in the best way"* — so the new stages restore human judgement at both ends. That puts `compound` seventh and `work` fourth. Framed as evolution, explicitly not retraction: *"As the models have grown more capable, the original compound engineering loop started to feel incomplete… So I expanded the loop."*

- "Each unit of engineering work should make subsequent units easier — not harder." — Klaassen, *Compound Engineering: The Definitive Guide* (Every / Source Code, Feb 2026) `[practitioner direct, vendor venue]` — https://every.to/source-code/compound-engineering-the-definitive-guide. Sole byline, first person; byline re-verified 2026-07-30. **Does not carry the step names, the 80/20 ratio, or any reviewer-agent count** — all three verified absent on fetch 2026-07-30. This page holds the term and the philosophy sentence; everything operational lives on the other posts. It is the easiest page in the set to over-cite, so check before attaching anything specific to it.
- Klaassen, *Compound Engineering Gets an Upgrade* (Every, 2026-05-29) `[practitioner direct, vendor venue]` — https://every.to/p/compound-engineering-gets-an-upgrade. The expansion. Sandwich metaphor credited to collaborator Trevin Chow: *"AI is the stuff in the middle. Humans are the bread on either end."*
- The plugin codifies the loop as invokable commands — `EveryInc/compound-engineering-plugin` — https://github.com/EveryInc/compound-engineering-plugin

## The 80/20 inversion — planning and review are the job

Klaassen argues that spending most of your time typing code means you're doing it wrong. His stated split is roughly 80% planning and review, 20% execution: humans frame and taste-check, the model does the middle. **[L1 — the practitioner's own framing of his working style, not a measured time-allocation study.]** No population (which tasks, what period) and no metric axis (wall-clock? token spend? task count?) is stated anywhere, so this cannot be compared against any measured ratio.

- **The ratio's actual home** is *Compound Engineering: How Every Codes With Agents* (linked below), verbatim: *"Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound."* Note the word form and the hedge — quote it with "Roughly".
- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* (Source Code, Aug 18 2025) `[practitioner direct, vendor venue]` — https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it. Fetched 2026-07-30: **does not state the 80/20 ratio.** Historical (out of window). It does describe running a test 10 times and iterating on the failures — *"On the next iteration, it's able to identify a frustrated user nine times out of 10"* — which is not the same as "iterate a verifier until 10 consecutive passes"; do not restate it that way.
- Laura Entis on Klaassen, *You're the Bread in the AI Sandwich* (Every / Context Window, Apr 2026) `[practitioner analysis]` — https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich. Entis is the byline; Klaassen was the AI & I podcast guest she wrote up.

## Plan-as-artifact — the markdown file is the contract

Before any agent writes code, produce a markdown plan with data models, file references, architectural decisions — detailed enough that a human or another agent could execute it without asking a question. Tests are written *from the plan*; testability is a planning output, not a post-hoc add-on.

- Dan Shipper **and** Kieran Klaassen, *Compound Engineering: How Every Codes With Agents* (Every, Dec 11 2025) `[practitioner direct, vendor venue]` — https://every.to/source-code/compound-engineering-how-every-codes-with-agents. Byline checked 2026-07-30: the page carries `authors: [Dan Shipper, Kieran Klaassen]` and is first-person-plural throughout (*"we've created," "We run five software products"*). Genuine co-authorship, not a journalist writing up a practitioner — **do not label this one `[practitioner analysis]`.** The `source-code/` path above is the one verified to resolve; a `chain-of-thought/` path for the same slug has not been tested. This page also carries a vendor-self-reported metric — *"a single developer can do the work of five developers a few years ago, based on our experience at Every"* — Level 0, do not promote.
- Will Larson on Klaassen, *Learning from Every's Compound Engineering* (Apr 2026) `[practitioner analysis]` — https://lethain.com/everyinc-compound-engineering/. Larson writes about the plan-as-artifact step holding up against a real monorepo at Imprint. **Open question, do not resolve by assumption:** whether he deployed it there himself (which would make this a genuine second data point, and him `[practitioner direct]` for that claim) or is arguing it would hold from his own read. Until someone reads the piece closely enough to say, treat him as one analyst commenting on one org — **not** a second company replicating the pattern.

## Parallel reviewer agents — fan-out instead of one bottleneck

Specialised reviewer agents running in parallel, each looking for a different class of issue — **[L2 single case]**.

**A reviewer-agent count and a specialty list were previously recorded here; both are cut as unsourced.** Two pages fetched 2026-07-30 — *The Definitive Guide* and *How I Polish Software That Agents Built* — carry no reviewer count and no enumeration of specialties. That is a result about those two pages, not proof no such sentence exists anywhere; a third source could still carry it. **Do not reinstate a "14-agent parallel review" figure or a five-specialty list (security, performance, architecture, style, accessibility) without a verbatim quote and a URL.** They did not reconcile with each other in any case: five named specialties against a count of fourteen left nine unaccounted, and nothing stated whether the count meant distinct roles or repeat invocations of fewer.

- Klaassen, *How I Polish Software That Agents Built* — the sourced form of this pattern, quoted below. Prefer it.
- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* — describes asking Claude to run a test 10 times and analysing the failures (*"it's able to identify a frustrated user nine times out of 10"*). That is iteration against a flaky detector on one feature, **not** "iterate a verifier until 10 consecutive passes" and not a general reliability benchmark. Do not restate it as either.
- Klaassen, *How I Polish Software That Agents Built* (Every / Source Code, 2026-07-13) `[practitioner direct, vendor venue]` — https://every.to/source-code/how-i-polish-software-that-agents-built. The pattern is still live in his most recent writing on the thread: *"Review fans out parallel reviewers, each looking for a different class of issue."* Also describes `/ce-compound` codifying a stated preference into a rule the system then applies unprompted on the next relevant feature. Still **[L2 single case]** — same practitioner, same org; recency is not independence.

## The compound step — writing learnings back into CLAUDE.md

The difference between "I used an agent today" and "my codebase compounds" is one file. After every loop, capture the preference, bug-pattern, or architectural rule into CLAUDE.md / AGENTS.md / skill files. The next session starts there.

- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* (single case, L2 — labelled below) — link above
- Klaassen, *The Folder Is the Agent* (Every / Source Code, 2026-04-13) `[practitioner direct, vendor venue]` — https://every.to/source-code/the-folder-is-the-agent. Names the instruction file **"load-bearing"** and characterises what it holds as *"conventions and standards," "institutional knowledge," "operational memory."* The strongest first-person statement on file that the persistence mechanism is central rather than decorative.
- Larson (L1 analyst) characterises the compound step as "the one pattern many practitioners have intuited but have not found a consistent mechanism to implement" — single analyst opinion, not independent practitioner replication — https://lethain.com/everyinc-compound-engineering/
- Peter Yang on Klaassen, *How to Make Claude Code Better Every Time You Use It* (Behind the Craft podcast, Feb 2026) — [domain trade publication] — https://podcasts.apple.com/ky/podcast/how-to-make-claude-code-better-every-time-you-use-it/id1736359687?i=1000748776547. The episode title is the module.

## Operational scale — two engineers, five products

Cora, Monologue, Sparkle, Spiral, and Every.to run with primarily single-person engineering teams. Klaassen attributes that staffing shape to the loop — **[L2 single case, causal claim per practitioner self-report]**. One org asserting why its own headcount works is a claim, not a demonstration.

- Dan Shipper on Klaassen + Nityesh Agarwal, *How Two Engineers Ship Like a Team of 15 With AI Agents* (AI & I podcast, published 2025-06-11) `[practitioner analysis]` — https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents. Shipper is the host; Klaassen and Agarwal are the guests. Out of window; historical. **"Team of 15" is a headline with no stated baseline** — fetched 2026-07-30, the page never defines what the 15 is measured against. What it actually reports is *"Two engineers at Every shipped six features, five bug fixes, and three infrastructure updates in one week."* Cite that sentence, never the multiplier. Note also that the episode names three products (Cora, Spiral, Sparkle) where this file's header says five, and "two engineers" against a company shape of ten people — reconcile before either count is reused.
- Cora MVP shipped solo in 3 months (late 2024) — trajectory context, dated; pre-6-month window
- "What used to take a week of coding now happens in hours" — Klaassen, *Definitive Guide* — **[L2 single case]** — outcome claim from a single team's self-report

## What he downplays

- **Prompt engineering as a standalone skill.** Absorbed into planning. Plan, CLAUDE.md, and reviewer skills carry the prompt quality.
- **Model selection tournaments.** He argues loop design, not Opus-vs-Sonnet-vs-GPT. The plugin ports across Codex, Cursor, Gemini CLI, Copilot — the model is substitutable.
- **MCP-server-building as a headline topic.** Mentioned, not central. The factory runs on plans, skills, and review agents.
- **"Vibes coding" / one-shot prompting.** Explicitly the anti-pattern.
- **Autonomy maximalism.** "You're the bread in the AI sandwich" — remove human taste and you get "generic slop." This is a meaningful downplay; Klaassen is the opposite of the full-autonomy camp.

## What's non-obvious

- **Tests are a planning output, not a coding output.** The plan specifies the tests; the agent writes them first.
- **Klaassen treats reviewer reliability as measurable rather than assumed** — he re-runs a check to see how often it actually fires. The specific "10 times" figure is one example on one feature, not a threshold he prescribes.
- **Klaassen and Larson both name the compound step as the hard one.** Plan and Review are legible; Compound requires writing the lesson down when the feature already shipped. Larson *agrees* with Klaassen's own self-assessment — one analyst reading one org is not confirmation in the evidentiary sense. **Whether most teams fail at this step is unestablished**: no study, survey, or count of teams is cited anywhere in this file, and one org plus one commentator licenses no claim about a general population.
- **Taste is the non-automatable layer**, on Klaassen's argument. Not romantic — division-of-labour. His claim is that agents can't tell which of three correct solutions matches the vision in your head; that is his stated view, not an established property of agents.
- **One plugin, many stacks.** Same loop in Claude Code, Codex, Cursor, Gemini CLI, Copilot. Factor practice from tool.

## Caveat — novelty-to-packaging ratio

Larson, reading the four-step form, takes three of those four steps to be well-known practice under new names, with the compound step as the one genuinely new mechanism. That is a qualitative judgement about what counts as novel, not a measurement — stating it as a "1:3 ratio" gives it a precision it does not have. **Larson published in Apr 2026 and did not review the 2026-05 expansion**; extending his read to the seven-step form would be our inference, not his finding, and it is not made here. Anyone presenting this as a new paradigm is overselling it. The accurate read is *operationalising what good practitioners were already doing*, with the compound step as the one piece that is genuinely new — and that read is the more persuasive one to a sceptical engineering audience, not the weaker one.

---

<!-- maintainer -->

**Last updated:** 2026-07-30

**Source verification — re-run before this file is cited anywhere:**

1. Re-open every URL against the original. Byline-checked URLs in this file:
   - *Compound Engineering: The Definitive Guide* — Klaassen byline confirmed (Source Code, Feb 2026, updated Mar 2026). [practitioner direct].
   - *Compound Engineering: How Every Codes With Agents* — Shipper + Klaassen joint byline confirmed, Dec 11 2025. [practitioner direct, vendor venue]. Verified path is `source-code/`, not `chain-of-thought/`.
   - *My AI Had Already Fixed the Code Before I Saw It* — Klaassen byline confirmed, Aug 18 2025. [practitioner direct, vendor venue]. **Outside the 6-month window; treat as historical.** Does not carry the 80/20 ratio (see below).

   **No "updated" date on this file's Every.to sources is verified.** Fetched 2026-07-30, three pages expose a `published_at` and no `updated_at`, `modified`, or visible revision line: *How Every Codes With Agents* (2025-12-11), *My AI Had Already Fixed the Code* (2025-08-18), *How Two Engineers Ship* (2025-06-11). Absence of an exposed timestamp is not proof no revision happened — Every may edit without surfacing metadata — so the honest state is **unverified, not disproven**. What it does mean is that **three out-of-window sources have no confirmed mechanism bringing them inside it.** Do not re-add an "updated <date>" annotation to any Every.to citation without a quotable on-page revision line. The Definitive Guide's own "updated Mar 2026" annotation is unchecked; it is not load-bearing, since Feb 2026 publication is already in window.
   - *You're the Bread in the AI Sandwich* — **byline is Laura Entis, not Klaassen.** Entis is a staff writer at Every who wrote the piece *about* Klaassen's appearance on the AI & I podcast. Re-attributed in body as "Laura Entis on Klaassen" per the writer-on-subject rule. [practitioner analysis], not [practitioner direct].
   - *How Two Engineers Ship Like a Team of 15* — **podcast episode page**, Dan Shipper hosting Klaassen + Nityesh Agarwal. Re-attributed as "Shipper on Klaassen + Agarwal." [practitioner analysis] (host writing up the episode); the underlying conversation is practitioner voice but the page framing is the host's.
   - *Behind the Craft* (Apple Podcasts) — Peter Yang hosting Klaassen, Feb 2026. Yang is a specialist host. Re-attributed as "Yang on Klaassen." [domain trade publication].
   - *This New Way* (YouTube) — Klaassen as guest, Oct 2025. **Outside the 6-month freshness window.** Removed from this file's primary evidence; if needed, treat as historical context with the Oct 2025 date explicitly stated.
   - Klaassen × Peter Yang explainer X post (status 2020638198649811203) — could not verify (request returned 402); **[UNVERIFIED]**. Do not cite until reproduced — the oEmbed / rotating-subdomain workaround un-blocks most x.com 402s and has not been tried here.
   - `EveryInc/compound-engineering-plugin` GitHub — [practitioner direct].
   - Larson, *Learning from Every's Compound Engineering* — [practitioner analysis] confirmed.

2. Numbers to re-check before reuse: "80/20 ratio" (Klaassen's own framing of his working style, single source, not a measurement); "What used to take a week of coding now happens in hours" (`[L2 single case]`, Every self-report). The "14-agent parallel review" count, the five-specialty reviewer list and "tests pass 10 consecutive runs" have all been **cut as unsourced** — see the sections above for what was checked and what a reinstatement would need.

3. Freshness: the 6-month window is measured from **publication**, because no Every.to source in this file has a verified update timestamp. Three were re-fetched 2026-07-30 and expose `published_at` only. The 2025 originals are therefore out of window and stay in as historical context, explicitly dated — not as current evidence.

**Provenance — source-type labels:**

- Klaassen's Every essays where he is the sole byline — [practitioner direct]
- Klaassen + Shipper joint byline — [practitioner direct]
- Entis writing about Klaassen — [practitioner analysis]
- Shipper podcast episode pages featuring Klaassen — [practitioner analysis] (host framing) / underlying audio is practitioner voice
- Yang podcast episode featuring Klaassen — [domain trade publication]
- Larson on Klaassen — [practitioner analysis]
- `EveryInc/compound-engineering-plugin` repo — [practitioner direct]

**Companion files:** `every-inc.md` (the company shape — Compound Engineering at scale of 10), `boris-cherny.md` (Claude Code lead's coherent practice — partner case for the convergence read).

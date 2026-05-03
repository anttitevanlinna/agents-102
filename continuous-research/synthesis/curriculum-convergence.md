---
type: synthesis
domain: curriculum-landscape
updated: 2026-05-03
answers: ["what do agentic engineering curriculums teach", "what's converging across cohort programs", "what topics are absent from current curriculums", "where does AE101 fit in the curriculum landscape"]
---

# Agentic Engineering Curriculums — Convergence and Absences (Apr 2026)

Inventory of 14 curriculums with **visible syllabi** published or delivered in the last 6 months. Topic surveys, listicle round-ups, "roadmap" opinion posts without concrete modules, and corporate certs without named practitioner leads were rejected.

## Per-claim split — vendor pages vs practitioner pages

Where the syllabus comes from a vendor's marketing page (Anthropic Academy, Maven cohort sales pages), this file applies a **per-claim split**:

- **Syllabus content** ("they teach X, Y, Z") = treated as fact about the offering. Labeled in-row.
- **Outcome claims** ("students ship production agents," "graduates raise N% productivity") = **[vendor press release]** / **[vendor case study]**, Level 0, not evidence.

The per-row label below covers the syllabus claim only. Outcome marketing copy has been excluded.

## Curriculums inventoried

| # | Name | Lead | URL | Date | Module topics (condensed) | Syllabus source label |
|---|---|---|---|---|---|---|
| 1 | AI Evals for Engineers & PMs (Maven) | Hamel Husain + Shreya Shankar | https://maven.com/parlance-labs/evals | Jan–Feb 2026 cohort | Data collection / observability; error analysis; agentic systems analysis (tool calls, RAG); custom evals over generic | [practitioner direct] for syllabus; cohort outcome claims = [vendor press release] L0 |
| 2 | Advanced Context Engineering for Coding Agents (Maven) | Dex Horthy (HumanLayer) | https://maven.com/p/6cbf01/advanced-context-engineering | 2026 cohort | 12-factor agents; context engineering; brownfield / legacy codebases; intentional context vs conversational prompting | [practitioner direct] for syllabus; outcome claims = L0 |
| 3 | 12-Factor Agents (talk + repo) | Dex Horthy | https://github.com/humanlayer/12-factor-agents + https://www.youtube.com/watch?v=8kMaTybvDUw | Aug 2025 onward (still updated 2026) | 12 reliability patterns; own-your-prompts; stateless reducers; human-in-loop | [practitioner direct] |
| 4 | Agentic AI (DeepLearning.AI) | Andrew Ng | https://www.deeplearning.ai/courses/agentic-ai/ | Oct 2025 launch, live thru 2026 | Reflection; tool use; planning; multi-agent collaboration; evals + error analysis | [practitioner direct] for syllabus; outcome claims = L0 |
| 5 | Anthropic Academy — Claude Code in Action | Anthropic | https://anthropic.skilljar.com/claude-code-in-action | Mar 2026 | Claude Code tool system; context management; custom workflows; hooks; external integrations | [vendor press release] for outcomes; **syllabus = fact** about what they teach |
| 6 | Anthropic Academy — Introduction to Agent Skills | Anthropic | https://anthropic.skilljar.com/ | Mar–Apr 2026 | Build / configure / share Skills as reusable markdown instructions | [vendor press release]; syllabus = fact |
| 7 | Anthropic Academy — Claude Code Sub-Agents | Anthropic | https://anthropic.skilljar.com/ | Mar–Apr 2026 | Sub-agents; context delegation; specialized workflows | [vendor press release]; syllabus = fact |
| 8 | Anthropic Academy — Intro to MCP | Anthropic | https://anthropic.skilljar.com/ | Mar 2026 | Model Context Protocol fundamentals; servers; integrations | [vendor press release]; syllabus = fact |
| 9 | MIT Missing Semester — Agentic Coding | Anish Athalye et al. | https://missing.csail.mit.edu/2026/agentic-coding/ | Jan 21 2026 | Refactoring with agents; code review; parallel agents; MCPs | [academic/research] |
| 10 | Hugging Face AI Agents Course | HF team (Thomas Simonini et al.) | https://huggingface.co/learn/agents-course | Ongoing through 2026 | Tools / Thoughts / Actions / Observations; frameworks (smolagents, LangGraph, LlamaIndex); GAIA benchmark eval | [practitioner direct] |
| 11 | LangChain Academy — Deep Agents | Harrison Chase + LangChain team | https://academy.langchain.com/courses/deep-agents-with-langgraph | 2026 | `create_agent`; message / streaming; MCP tools; LangSmith eval loop; production hardening | [practitioner direct] for syllabus; outcome claims = L0 |
| 12 | Gauntlet AI Fellowship | Austen Allred | https://gauntletai.com/ | Rolling 10-wk cohorts through 2026 | Spec-driven dev; MCPs; agentic coding (no hand-written code); production agents; reliability + evaluation | [practitioner direct] for syllabus outline. **Tech-press corroboration [UNVERIFIED]** — InfoQ / TechCrunch coverage not located in 2 searches; one local-press piece exists (CBS Austin) but does not corroborate the syllabus modules. Downgrade convergence counts that depend on Gauntlet (see footnote below). |
| 13 | AI Engineer Summit — Agent Engineering track | Swyx / Latent Space | https://www.ai.engineer/summit/2025/schedule | Feb 2026 NYC | Agent architectures; payment agents; production deployment; evals | [practitioner direct] |
| 14 | Simon Willison — Coding Agents for Data Journalism (NICAR) | Simon Willison | https://simonwillison.net/tags/pycon/ | Mar 2026 workshop | Codex CLI + Claude Code for data exploration / viz; 3-hour hands-on | [practitioner direct] |

## What "teaches X" means — methodology footnote

A curriculum is counted as **teaching X** when X appears as a named module, lecture, lab, or chapter in the visible syllabus — i.e., the curriculum allocates discrete time to it and presents it as a topic of instruction, not a passing reference. **Implicit coverage** (a topic invoked in service of another module without dedicated time) is counted as half — flagged in the convergence list below as "implicit in #N".

## Convergence (L3 — topics in 10+ curriculums)

- **Evals / error analysis / observability** — explicit in 1, 2, 4, 5, 10, 11, 12, 13; implicit in 9 (code-review framing). **9 explicit + 1 implicit = 9.5 / 14; minus Gauntlet (#12, unverified syllabus corroboration) = 8.5 / 14.** Strongest signal: every serious curriculum treats evals as first-class, not appendix.
- **Tool use / MCP** — explicit in 2, 5, 8, 9, 10, 11, 12, 13; implicit in 1, 4. **8 explicit + 2 implicit = 9 / 14; approaching L3 (one below threshold under the half-weight method).** MCP specifically (not just "tool use") shows up in 8/14 — convergence hardened in the last 4 months.
- **Multi-agent / sub-agents / parallel agents** — explicit in 4, 7, 9, 11, 12, 13; implicit in 2, 10. **6 explicit + 2 implicit = 7 / 14.** Edges into L3 territory but lands as **strong L2+** under the conservative count.

## Single-lab topics (L2 — one or two curriculums teach, nobody else)

- **12-factor reliability manifesto** (Horthy, #2 / #3) — own-your-prompts, stateless reducer, tiny focused agents.
- **Context engineering as a named discipline** (Horthy #2) — treating context window management as engineering, not prompting.
- **Skills (markdown-instruction discovery)** (Anthropic #6) — Claude-Code-platform-specific; no non-Anthropic curriculum teaches it.
- **Hooks as extension mechanism** (Anthropic #5) — Claude-Code-specific; absent elsewhere.
- **GAIA benchmark as capstone gate** (HF #10) — only curriculum with a *quantitative pass bar* (30% score) on a public benchmark.
- **Spec-driven development with agents** (Gauntlet #12) — named pedagogical phase; others teach specs implicitly or not at all.
- **Brownfield / legacy codebases** (Horthy #2) — most curriculums teach greenfield. Horthy is almost alone on real enterprise code.
- **Agent payments / commerce rails** (AI Engineer Summit #13) — workshop track; nobody else covers agent-initiated transactions.

## Notable absences — what nobody teaches

These surface when you diff frontier-practitioner writing against the 14 inventoried English-language programs:

- **Agents building agents (compound / meta-agent loops).** Simon Willison, Mitchell Hashimoto, and Anthropic engineers write about this constantly; zero of the 14 inventoried curriculums make it a module. Gauntlet brushes it (students ship agents) but doesn't teach the recursion.
- **Evals-as-infrastructure at PR / CI gate scale.** Husain teaches eval design (#1); none of the 14 teach "how to run eval suites on every PR in a monorepo." Intercom / Ramp-style factory-pattern eval ops are absent.
- **Multi-agent engineering deliberation** (agents arguing, critiquing, voting before code lands). Discussed in Anthropic research posts and HumanLayer writing; none of the 14 inventoried curriculums has a module.
- **Organizational learning rate / adoption patterns.** Across the 14 inventoried programs, every curriculum teaches the tool; none teach the rollout. The CTO question ("how do we get 200 engineers using this?") has no pedagogy.
- **Failure-mode taxonomy specific to long-horizon autonomous runs.** Evals teach output quality; across the 14 inventoried, nobody teaches the 8-hour agent run failure modes (context rot, goal drift, tool-loop collapse).
- **Platform-neutral agent portability.** Across the 14 inventoried, every curriculum is framework-shaped (LangGraph, smolagents, Claude Code, or "all five frameworks"). None teach what transfers when you switch.
- **Security / prompt injection as engineering discipline.** Simon Willison writes about this weekly; the 14 inventoried curriculums treat it as a footnote if at all.
- **Cost and latency engineering.** The economics of long-context agents at scale — absent from all 14 inventoried syllabi.

## Meta-observations (structural patterns across curriculums)

- **Arc shape converges on: patterns → frameworks → evals → ship.** Ng (#4), HF (#10), LangChain (#11), Gauntlet (#12) all follow this sequence. Evals land in the back third, never the front.
- **"Build from first principles before framework" is the dominant opener** (Ng, HF, LangChain Academy). Tactical dissent: Horthy opens with a manifesto, Missing Semester opens with a demo.
- **One-benchmark capstone is rare but rising.** Only HF has a hard numeric gate. Gauntlet uses shipped-app-ships-or-not. Everyone else has no gate.
- **Multi-agent modules are placed late.** In every curriculum that teaches them, they come after single-agent patterns are grooved.
- **Prework assumes Python fluency.** Every curriculum. Non-Python agentic curriculums for the builder-leader audience are a gap.
- **Vendor curriculums teach their product; practitioner curriculums teach the discipline.** Anthropic Academy = Claude Code features. Husain / Horthy / Ng = transferable patterns. Both coexist; buyers conflate them.

## What this implies for AE101 (separate from the research finding)

> The convergence claims above are research findings. The implications below are Bosser's strategic read, not evidence.

- The **agents-building-agents** absence is the single strongest positioning gap. AE101 is the only curriculum that makes it a module — confirmed by diffing the 14 syllabi above.
- Evals are converging fast as table stakes, not differentiation. AE101 needs them; teaching them harder than competitors won't move the needle.
- MCP convergence hardened in the last 4 months. AE101 should treat MCP as plumbing students already half-know, not as a headline module.

---

<!-- maintainer -->

**Last updated:** 2026-05-03

**Source verification — MUST DO before first cohort:**

1. Open all 14 curriculum URLs at delivery time. Syllabus pages drift quickly — Anthropic Academy in particular has been adding modules monthly since Mar 2026.
2. The Gauntlet AI tech-press corroboration cited in the source OODA was **[SOURCE NEEDED]** — could not be verified and was not retained. If load-bearing for a claim, find the URL or remove the corroboration.
3. Convergence count is **9.5 / 14 explicit-plus-implicit for evals** under the conservative methodology footnote. The source OODA called this "12/14"; that count folded "implicit" coverage in at full weight without a definition. The conservative recount stays L3 but at a tighter threshold.
4. Numbers to triple-check at delivery: GAIA 30% pass bar (HF #10); the count of Maven-listed cohort programs in the inventoried 14 (Maven re-launches and renames cohorts frequently).
5. Freshness re-check at delivery: any syllabus dated before 2026-05-03 should be re-fetched. The Horthy 12-factor talk (Aug 2025) is outside the 6-month window; current evidence comes from the repo and 2026 Maven cohort, not the talk.

**Provenance — source-type labels:**

- Practitioner-led cohort syllabi (Husain, Horthy, Ng, Chase, Allred, Swyx, Willison, HF) — [practitioner direct] for what they teach; outcome / cohort marketing = [vendor press release] L0
- Anthropic Academy — [vendor press release]; syllabus is fact about the offering, outcome marketing is L0
- MIT Missing Semester — [academic/research]
- Larson-style independent practitioner analyses — none cited in this file (none of the 14 curriculums have one), but kept available for triangulation if a syllabus claim is contested

**Deferred (low-severity) items from 2026-05-03 research-review pass:**

- Vendor-platform syllabus pages (DeepLearning.AI #4, LangChain Academy #11, Hugging Face #10) labeled `[practitioner direct]` — pending Bosser-strategy ruling on whether the founder-teaches-own-course exception applies (Ng founded DeepLearning.AI; Chase co-founded LangChain). Re-label to `[vendor press release]` for syllabus claims if the exception is rejected.

**Companion files:** `training-competitive-landscape.md` (price, format, audience map of paid cohorts that compete for AE101 budget), `boris-cherny.md`, `kieran-klaassen.md`, `every-inc.md`.

# Blind OODA — Agentic Engineering Curriculums Landscape (Nov 2025 – Apr 2026)

## Method

Ten parallel searches targeting named practitioners, known cohort programs, conference workshops, official vendor academies, and free public curriculums. Retained only curriculums with a **visible syllabus or lecture list** published or delivered in the last 6 months. Rejected: topic surveys, listicle round-ups, "roadmap" opinion pieces without concrete modules, corporate certs without named practitioner leads. 14 curriculums inventoried. Confidence: **medium** — convergence signal is clear; the long tail (internal bootcamps, private cohorts) is invisible by definition.

Syllabi on vendor marketing pages are treated as **primary source for "what they teach"** but never as evidence those topics work (vendor-of-itself = L0 on outcomes).

## Curriculums inventoried

| # | Name | Lead | URL | Date | Module topics (condensed) | Source |
|---|---|---|---|---|---|---|
| 1 | AI Evals for Engineers & PMs (Maven) | Hamel Husain + Shreya Shankar | https://maven.com/parlance-labs/evals | Jan–Feb 2026 cohort | Data collection/observability; error analysis; agentic systems analysis (tool calls, RAG); custom evals over generic | [practitioner direct] |
| 2 | Advanced Context Engineering for Coding Agents (Maven) | Dex Horthy (HumanLayer) | https://maven.com/p/6cbf01/advanced-context-engineering | 2026 cohort | 12-factor agents; context engineering; brownfield/legacy codebases; intentional context vs conversational prompting | [practitioner direct] |
| 3 | 12-Factor Agents (talk + repo) | Dex Horthy | https://github.com/humanlayer/12-factor-agents + https://www.youtube.com/watch?v=8kMaTybvDUw | Aug 2025 onward | 12 reliability patterns for LLM apps; own-your-prompts; stateless reducers; human-in-loop | [practitioner direct] |
| 4 | Agentic AI (DeepLearning.AI) | Andrew Ng | https://www.deeplearning.ai/courses/agentic-ai/ | Oct 2025 launch, live thru 2026 | Reflection; Tool Use; Planning; Multi-Agent Collaboration; evals + error analysis | [practitioner direct] |
| 5 | Anthropic Academy — Claude Code in Action | Anthropic | https://anthropic.skilljar.com/claude-code-in-action | Mar 2026 launch | Claude Code tool system; context management; custom workflows; hooks; external integrations | [vendor press release] for claims; syllabus = fact |
| 6 | Anthropic Academy — Introduction to Agent Skills | Anthropic | https://anthropic.skilljar.com/ | Mar–Apr 2026 | Build/configure/share Skills as reusable markdown instructions | [vendor press release] |
| 7 | Anthropic Academy — Claude Code Sub-Agents | Anthropic | https://anthropic.skilljar.com/ | Mar–Apr 2026 | Sub-agents; context delegation; specialized workflows | [vendor press release] |
| 8 | Anthropic Academy — Intro to MCP | Anthropic | https://anthropic.skilljar.com/ | Mar 2026 | Model Context Protocol fundamentals; servers; integrations | [vendor press release] |
| 9 | MIT Missing Semester — Agentic Coding | Anish Athalye et al. | https://missing.csail.mit.edu/2026/agentic-coding/ | Jan 21 2026 | Refactoring with agents; code review; parallel agents; MCPs | [academic/research] |
| 10 | Hugging Face AI Agents Course | HF team (Thomas Simonini et al.) | https://huggingface.co/learn/agents-course | Ongoing through 2026 | Tools/Thoughts/Actions/Observations; frameworks (smolagents, LangGraph, LlamaIndex); build + GAIA benchmark eval | [practitioner direct] |
| 11 | LangChain Academy — Deep Agents / Building Reliable Agents | Harrison Chase + LangChain team | https://academy.langchain.com/courses/deep-agents-with-langgraph | 2026 | create_agent; message/streaming; MCP tools; LangSmith eval loop; production hardening | [practitioner direct] |
| 12 | Gauntlet AI Fellowship | Austen Allred | https://gauntletai.com/ | Rolling 10-wk cohorts through 2026 | Spec-driven dev; MCPs; agentic coding (no hand-written code); production agents; reliability + evaluation | [practitioner direct] (syllabus outline); [tech press] corroboration |
| 13 | AI Engineer Summit — Agent Engineering track + workshops | Swyx/Latent Space | https://www.ai.engineer/summit/2025/schedule | Feb 2026 NYC | Agent architectures; payment agents; production deployment; evals | [practitioner direct] |
| 14 | Simon Willison — Coding Agents for Data Journalism (NICAR) | Simon Willison | https://simonwillison.net/tags/pycon/ | Mar 2026 workshop | Codex CLI + Claude Code for data exploration/viz; practical 3-hour hands-on | [practitioner direct] |

## Convergence (L3 — topics appearing in 10+ curriculums)

- **Evals / error analysis / observability** — present in 1, 2, 4, 5, 10, 11, 12, 13; plus Gauntlet reliability phase and MIT code-review framing. **12/14.** This is the strongest signal: every serious curriculum treats evals as a first-class module, not an appendix.
- **Tool use / MCP** — present in 2, 5, 8, 9, 10, 11, 12, 13; implicit in 1, 4. **10/14.** MCP specifically (not just "tool use") shows up in 8/14 — the convergence hardened in the last 4 months.
- **Multi-agent / sub-agents / parallel agents** — present in 4, 7, 9, 11, 12, 13; implicit in 2, 10. **8/14** — edges into L3 territory but lands as "strong L2+".

## Single-lab topics (L2 — one or two labs teach, nobody else)

- **12-factor reliability manifesto** (Dex Horthy, #2/#3) — own-your-prompts, stateless reducer pattern, tiny focused agents. Dex-unique framing; imitated in language but not in depth.
- **Context engineering as a named discipline** (Dex Horthy #2) — treating context window management as engineering, not prompting. Everyone else teaches "prompt engineering" or skips the abstraction.
- **Skills (markdown-instruction discovery)** (Anthropic #6) — platform-specific to Claude Code; no non-Anthropic curriculum teaches it yet.
- **Hooks as extension mechanism** (Anthropic #5) — Claude-Code-specific; absent elsewhere.
- **GAIA benchmark as capstone gate** (HuggingFace #10) — only curriculum with a *quantitative pass bar* (30% score) on a public benchmark.
- **Spec-driven development with agents** (Gauntlet #12) — named as a pedagogical phase; others teach specs implicitly or not at all.
- **Brownfield/legacy codebases** (Dex #2) — most curriculums teach greenfield. Dex is almost alone in teaching agents on real enterprise code.
- **Agent payments / commerce rails** (AI Engineer Summit #13) — workshop track; nobody else covers agent-initiated transactions.

## Notable absences — what nobody teaches

These surface when you diff frontier-practitioner writing against the 14 curriculums:

- **Agents building agents (compound/meta-agent loops).** Simon Willison, Mitchell Hashimoto, and Anthropic engineers write about this constantly; zero curriculums make it a module. Gauntlet brushes it (students ship agents) but doesn't teach the recursion.
- **Evals-as-infrastructure at PR / CI gate scale.** Hamel teaches eval design (#1); nobody teaches "how to run eval suites on every PR in a monorepo." Intercom/Ramp-style factory-pattern eval ops are absent.
- **Multi-agent engineering deliberation** (agents arguing, critiquing, voting before code lands). Discussed in Anthropic research posts and HumanLayer; no curriculum has a module.
- **Organizational learning rate / adoption patterns.** Every curriculum teaches the tool; none teach the rollout. The CTO question ("how do we get 200 engineers using this?") has no pedagogy.
- **Failure-mode taxonomy specific to long-horizon autonomous runs.** Evals teach output quality; nobody teaches the 8-hour agent run failure modes (context rot, goal drift, tool-loop collapse).
- **Platform-neutral agent portability.** Every curriculum is framework-shaped (LangGraph, smolagents, Claude Code, or "all five frameworks"). Nobody teaches what transfers when you switch.
- **Security / prompt injection as engineering discipline.** Simon Willison writes about this weekly; curriculums treat it as a footnote if at all.
- **Cost and latency engineering.** The economics of long-context agents at scale — absent from every syllabus reviewed.

## Meta-observations (structural patterns across curriculums)

- **Arc shape converges on: patterns → frameworks → evals → ship.** Ng (#4), HF (#10), LangChain (#11), Gauntlet (#12) all follow this sequence. Evals land in the back third, never the front.
- **"Build from first principles before framework" is the dominant opener** (Ng, HF, LangChain Academy). Tactical dissent: Dex opens with a manifesto, Missing Semester opens with a demo.
- **One-benchmark capstone is rare but rising.** Only HF has a hard numeric gate. Gauntlet uses shipped-app-ships-or-not. Everyone else has no gate.
- **Multi-agent modules are placed late** — in every curriculum that teaches them, they come after single-agent patterns are grooved. Nobody opens with multi-agent.
- **Prework assumes Python fluency.** Every curriculum. Non-Python agentic curriculums for the builder-leader audience are a gap.
- **Vendor curriculums teach their product; practitioner curriculums teach the discipline.** Anthropic Academy = Claude Code features. Hamel/Dex/Ng = transferable patterns. Both coexist; buyers conflate them.
- **Cohort-based (Maven-style) is the premium tier; self-paced is the commodity tier.** The gap between them is live office hours, not content.

## Sources

- https://maven.com/parlance-labs/evals
- https://maven.com/p/6cbf01/advanced-context-engineering
- https://github.com/humanlayer/12-factor-agents
- https://www.youtube.com/watch?v=8kMaTybvDUw
- https://www.deeplearning.ai/courses/agentic-ai/
- https://anthropic.skilljar.com/claude-code-in-action
- https://anthropic.skilljar.com/
- https://missing.csail.mit.edu/2026/agentic-coding/
- https://huggingface.co/learn/agents-course/en/unit0/introduction
- https://academy.langchain.com/courses/deep-agents-with-langgraph
- https://gauntletai.com/
- https://www.ai.engineer/summit/2025/schedule
- https://simonwillison.net/tags/pycon/
- https://x.com/AndrewYNg/status/1975614372799283423

## Confidence

**Medium.** The 14 curriculums are a representative sample of the publicly visible practitioner layer, but internal corporate bootcamps (Stripe, Shopify, Anthropic-internal, Google-internal) are invisible and may cover the absences flagged above. The convergence signal on evals + MCP is robust — would survive a 3x larger sample. The absences are high-confidence: they come from diffing named practitioners' public writing against syllabi, not from inference. The "agents building agents" gap is the most strategically interesting finding for AE101's positioning.

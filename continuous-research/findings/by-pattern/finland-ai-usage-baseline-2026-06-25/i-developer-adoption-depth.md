---
type: finding
domain: coding-engineering
layer: global-developer-workforce
evidence_level: 3
updated: 2026-06-25
beat: "global developer adoption depth — chat-assistant vs agentic-coding-agent split"
answers:
  - "what % of developers use AI tools (latest editions)?"
  - "what % use a genuine coding AGENT vs autocomplete/chat?"
  - "does software break the chat-collapse at the developer layer?"
---

# Global Developer Adoption Depth — the chat-vs-agentic split

**Beat:** the GLOBAL DEVELOPER WORKFORCE layer of the Finland AI-usage-baseline OODA. Sibling agents own Eurostat/Tilastokeskus enterprise cuts, Finland-specific software firms, and org-level integration depth. This file owns the developer-survey layer and the one question the thread's confirmation-bias guard demands: of developers "using AI," how much is chat/autocomplete vs a real agent running the loop?

**Headline answer:** ~84–90% of developers now use AI tools (survey-dependent). But the load-bearing number is the depth split: roughly **30–35% of professional developers use a genuine coding agent at some cadence** (Stack Overflow 2025: ~31% use agents daily/weekly/monthly; JetBrains Jan-2026: Cursor 18% + Claude Code 18% + Codex 3% at work). **Software is the one sector that genuinely breaks the chat-collapse** — but agentic use is still the minority of AI use even among developers, just a fast-growing and quality-dominant minority.

---

## (a) Developer-adoption table

| Survey | Edition / date | % using AI | % using a coding AGENT | N | URL | Label |
|---|---|---|---|---|---|---|
| Stack Overflow Developer Survey | 2025 ed. (data 2025, published Dec 2025) | 84% use or plan to use; 51% of pros use daily | **~31% use AI agents at some cadence** (14.1% daily + 9% weekly + 7.8% monthly); 13.8% use copilot/autocomplete mode *exclusively*; agent usage **doubled** vs prior survey | ~49,000 total; 26,004 pro devs | [survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai/) | [survey, commercial venue] (SO is vendor-run; large + reputable) |
| JetBrains State of Developer Ecosystem | 2025 ed. (fielded Apr–Jun 2025, pub Oct 2025) | 85% use AI regularly; only 44% have AI fully/partially integrated | 62% rely on ≥1 AI coding "assistant, agent, or code editor" (bundled — not agent-pure) | 24,534 devs, 194 countries | [devecosystem-2025.jetbrains.com/artificial-intelligence](https://devecosystem-2025.jetbrains.com/artificial-intelligence) | [survey, commercial venue] |
| JetBrains AI Pulse | **Jan 2026** (fielded Sep 2025 + Jan 2026, pub Apr 2026) | **74% adopted specialized AI dev tools** (assistants/editors/agents, *excluding* plain chatbots) | At-work tool share: **Copilot 29%, Cursor 18%, Claude Code 18%, Codex 3%, Antigravity 6%, Junie 5%** | >10,000 pro devs | [blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work](https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/) | [survey, commercial venue] |
| Google / DORA | 2025 ed. (State of AI-assisted Software Dev, pub late 2025) | **90% use AI at work** (+14 pts YoY); median ~2 hrs/day with AI; 80%+ say productivity up | No clean agent-% cut; archetype model. Effect: throughput + quality **up** (reversed from 2024), stability **down** | ~5,000 tech professionals | [dora.dev/dora-report-2025](https://dora.dev/dora-report-2025/) · [cloud.google.com announce](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) | [survey, commercial venue] (Google-run; flag) |
| GitHub Octoverse | 2025 ed. (Oct 2025) | n/a (platform telemetry, not survey) | **80% of new devs use Copilot in first week**; ~20M Copilot users (Jul 2025); 4.7M paid (Jan 2026, +75% YoY); ~90% of Fortune 100 | 180M+ devs on platform | [github.blog/.../octoverse-a-new-developer-joins-github-every-second](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) | [vendor self-reported] — GitHub on its own product; treat as L0–L1 |
| Anthropic Claude Code research | Oct 2025–Apr 2026 (telemetry) | n/a | Coding-agent activity detected in **16–23% of public GitHub repos** (late Oct 2025); >2x as high in repos created after; CC users average ~20 hrs/wk active runtime | ~400K sessions, ~235K people | [anthropic.com/research/claude-code-expertise](https://www.anthropic.com/research/claude-code-expertise) | [vendor self-reported] — Anthropic on its own product; L0–L1 |
| Cursor product data | Spring 2026 report + 2026 commentary | n/a | **Agent users now outnumber Tab/autocomplete users 2:1** (was 2.5:1 the *other* way in Mar 2025); agent usage grew >15x YoY; CEO: ~35% of merged PRs at Cursor now agent-created | aggregated product data (N undisclosed) | [latent.space/p/cursor-third-era](https://www.latent.space/p/cursor-third-era) · [cursor.com/insights](https://cursor.com/insights) | [vendor self-reported] / [tech press] for the ratio — L0–L1 |

---

## (b) The chat-vs-agentic split — does software break the chat-collapse?

**Yes, software is the genuine exception — but read the magnitude honestly.** The thread's hypothesis ("headline AI adoption mostly means CHAT, not integrated/agentic") *breaks* in software more than any other sector, yet agentic use is still the minority of developer AI use as of mid-2026. Three independent angles converge:

1. **Stack Overflow's own daily-use cut is the cleanest survey split.** Among developers, AI-agent use breaks out as 14.1% daily / 9% weekly / 7.8% monthly (~31% at some cadence), against 13.8% who use plain copilot/autocomplete mode *exclusively*. So genuine agent use is already *larger than* autocomplete-only use, and SO reports **agent usage doubled** vs the prior edition. The mainstream of AI-using developers, though, still sits in assistant/chat/autocomplete territory — the agent-daily cohort is one in seven. [survey, commercial venue] — [survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai/)

2. **JetBrains Jan-2026 separates "specialized dev tools" from chatbots and shows the agent-native tools surging.** 74% use specialized dev tools (not just ChatGPT-style chat). Within that, the agent-native tools are now mainstream-adjacent: Cursor 18% and Claude Code 18% at work, Codex 3% — and Claude Code went ~3% → 12% → 18% in three quarters (a 6x rise), the steepest curve in the set. Copilot (29%) still leads but its growth has stalled; the momentum is in the agent-loop tools. [survey, commercial venue] — [blog.jetbrains.com Apr-2026](https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/)

3. **The strongest single signal is Cursor's internal Tab-vs-agent reversal.** In March 2025, autocomplete (Tab) users outnumbered agent users 2.5:1. By 2026 that flipped: agent users outnumber Tab users 2:1, with agent usage up >15x YoY, and ~35% of Cursor's *own* merged PRs now agent-created. This is the chat-collapse breaking *in real time* on one platform — the dominant interaction mode flipping from suggestion-acceptance to loop-delegation inside ~12 months. Caveat: vendor product data, self-selected agent-forward user base. [vendor self-reported] / [tech press] — [latent.space/p/cursor-third-era](https://www.latent.space/p/cursor-third-era)

**Convergent estimate of the split (with uncertainty):** Of developers "using AI" in mid-2026, roughly **30–40% are using a genuine agentic coding tool** (multi-step, tool-using, runs the loop) at some cadence; the remaining ~60–70% are still primarily in chat/assistant/autocomplete mode. The *trajectory* is unambiguously toward agentic (SO "doubled", Claude Code 6x, Cursor 2.5:1→1:2, Anthropic GitHub-repo agent activity >2x), but the *current stock* is still assistant-majority. Uncertainty is wide: "use an agent" conflates tried-once with daily-driver, and the vendor telemetry (Cursor, Anthropic, GitHub) over-weights agent-forward populations vs the median enterprise developer the DORA/JetBrains panels capture. The honest framing: **software is the sector where agentic genuinely escapes chat — but even here, agentic is the fast-rising challenger, not yet the incumbent.**

---

## (c) Freshness refresh note — what superseded the old 85%/62%

The KB's `coding-engineering.md` line — *"85% use AI; 62% use at least one AI coding agent (JetBrains, Stack Overflow)"*, dated 2026-05-08 — traces specifically to **JetBrains State of Developer Ecosystem 2025** (85% regular AI use; 62% rely on ≥1 AI "assistant, **agent**, or code editor"). Two corrections:

- **The 62% is not an agent-pure number.** JetBrains bundles "assistant, agent, or code editor" into one figure. Citing it as "62% use a coding agent" overstates agentic depth. The agent-pure cut is closer to ~30–35% (Stack Overflow 2025 cadence split; JetBrains Jan-2026 per-tool shares).
- **Newer editions exist and shift the headline:**
  - **Stack Overflow 2025** (data 2025, pub Dec 2025): 84% use/plan AI; 51% of pros daily; **agent use doubled**; trust collapsed (only 3% "highly trust" AI code; 46% distrust). Note: the **Stack Overflow 2026 survey opened June 23, 2026** (human-developers-only) — *fielding now, no results yet*; the "2025" edition remains the latest published.
  - **DORA 2025**: **90% use AI at work** (highest headline of the set) — supersedes 85% as the broad-adoption ceiling. Carries the nuance the synthesis wants: throughput/quality up, **stability down**; "AI amplifies what's already there."
  - **JetBrains AI Pulse Jan-2026** (pub Apr 2026): **74% use specialized dev tools** (chatbots excluded), with per-tool agentic shares — the freshest and most decomposable cut.

**Recommended KB update:** replace the single bundled line with → *"~84–90% of developers use AI tools (DORA 2025: 90%; SO 2025: 84%); ~30–35% use a genuine coding agent at some cadence (SO 2025 agent-cadence split; JetBrains Jan-2026 per-tool shares); agentic use doubling YoY but still minority of AI use."*

---

## (d) What we did NOT find

1. **No clean single-survey "agentic vs chat vs autocomplete" three-way split.** The 30–40% estimate is assembled across SO cadence data + JetBrains per-tool shares + Cursor telemetry — no one survey asks the question cleanly. Stated as a convergent estimate, not a measured figure.
2. **No Finland/Nordic regional cut of the agent split.** Every global survey above is unweighted-by-region for the agent question; JetBrains gives a US/Canada Claude-Code cut (24%) but no Nordic. (Sibling agents own the Finland-specific layer.)
3. **Anthropic's full "2026 Agentic Coding Trends Report" is form-gated** — the landing page carries no figures. The hard numbers used here come from Anthropic's *research* page (claude-code-expertise) and press coverage, not the gated PDF.
4. **No independent (non-vendor) verification of the Cursor 2:1 reversal or the GitHub 80%-in-first-week figure.** Both are platform self-telemetry; treated as L0–L1 directional signal, not L3 evidence.
5. **No agent-pure daily-active number for the whole developer population** — only per-tool at-work shares (which overlap; a dev can use Copilot + Cursor + Claude Code) and SO's self-reported cadence. The true unduplicated "uses an agent daily" share is bounded but not pinned.

---

## (e) Four-persona inline audit

- **Source-type auditor:** Every URL labeled. Survey vendors (SO, JetBrains, DORA/Google) labeled [survey, commercial venue] with commissioner disclosed; GitHub/Anthropic/Cursor own-product telemetry labeled [vendor self-reported] L0–L1 and never used as standalone L3. PASS.
- **Zombie-stat detector:** Traced the legacy "62%" to JetBrains' bundled "assistant, agent, or code editor" wording and flagged the overstatement; traced "85%→90%" to JetBrains-2025 vs DORA-2025 being different surveys, not a revision. SO N (~49K) and JetBrains N (24,534 / >10K) carry question-cadence wording. The 30–40% split is explicitly labeled a convergent *estimate*, not a survey figure. PASS.
- **Freshness checker:** All primary sources within 6-month window (cutoff 2025-12-25) or flagged: JetBrains 2025 ed. (Oct 2025) noted as superseded by AI Pulse Jan-2026 (pub Apr 2026); SO 2025 is latest published (2026 survey fielding, no results). Old 2026-05-08 KB line explicitly refreshed. PASS.
- **Evidence-ladder classifier:** Whole-file = **L3 convergence** — five independent survey/telemetry sources agree on direction (agentic rising, doubling YoY) and bracket the magnitude (~30–40%). Individual vendor-telemetry items (Cursor reversal, GitHub first-week, Anthropic hours) flagged L0–L1 and used only as corroborating directional signal, not as the load-bearing claim. PASS.

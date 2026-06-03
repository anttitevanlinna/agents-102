---
type: run-log
domain: coding
evidence_level: L2-converging-L3-direction
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-drivers-sweep1
---

> **⟳ SWEEP 2 CORRECTIONS (2026-06-03-1700, applied) — read before trusting claims below.**
> Confirm file: `2026-06-03-1700-token-drivers-sweep2-codebase.md`.
> - **A controlled A/B now exists** — Lulla et al., *On the Impact of AGENTS.md Files…*, **arXiv:2601.20404** (ICSE JAWs 2026), paired same-task/same-repo, 10 repos / 124 PRs. AGENTS.md present vs removed → **output tokens −16.58% median, wall-clock −28.64%, p<0.05.**
> - **CRITICAL CAVEAT that reshapes the headline:** **input/total tokens stayed FLAT** (not significant; mean input slightly *up*). The win is on **OUTPUT tokens + runtime via reduced exploratory navigation — NOT the input-token "search tax" this hypothesis predicted.** Reframe accordingly.
> - **CodeCompass (arXiv:2602.20048)** = navigation-accuracy paper (+23.2pp), citable for the **navigation-failure premise only, not a token delta** (58% of trials made zero tool calls = adoption gap).
> - **FINAL HONEST LEVEL: HOLD at L2-direction.** A clean-vs-dirty-*layout* A/B still does not exist. Report as believed-direction, not a measured input-token number. (Added: Nicola Alessi self-measured 74% input cut via dep-graph-over-grep — single, unmethodized.)

# Token Drivers — Sweep 1, Driver #1: Codebase Hygiene as "the Search Tax"

## Focus

Hypothesis: a messy / poorly-structured / poorly-named / large / duplicated codebase makes the agent
search and read MORE files to do the same task, and every read is re-sent as input on later turns —
so structure is a token-cost driver. Conversely clean structure, good naming, a CLAUDE.md/AGENTS.md
map, and small focused modules cut reads. Looked for practitioners who NAME codebase
structure/legibility as a cause of token/context burn, or who deliberately fixed it to make agents
cheaper. Also hunted counter-evidence.

## Queries Used

- codebase structure agent token cost search read files context Claude Code
- CLAUDE.md AGENTS.md reduce token usage agent fewer file reads codebase map
- Armin Ronacher agents codebase structure tokens context "too many files" tool calls
- Simon Willison agent codebase organization legibility tokens grep search expensive
- Anthropic engineering Claude Code best practices CLAUDE.md grep exploration token cost codebase
- Geoffrey Huntley agent codebase structure tokens context grep "ralph" file organization
- "Basti Ortiz" coding agents project structure vertical slicing collocation context window
- coding agent tokens spent navigation searching reading vs writing measured percentage benchmark study

## Findings

### 1. Armin Ronacher — barrel files / re-exports make agents "waste context by reading too many files" (STRONGEST)

- **Source URL:** https://lucumr.pocoo.org/2026/2/9/a-language-for-agents/ — [practitioner direct] (his own blog, lucumr.pocoo.org)
- **Date:** 2026-02-09 (current)
- **Evidence level:** L1 opinion grounded in heavy hands-on practice; the mechanism is the clearest statement of the hypothesis found anywhere.
- **What:** Argues a language/codebase should be "agent-legible." Names indirection in code organization as a direct cause of excess file reads.
- **Key claims (exact):**
  - "agents often struggle to understand barrel files and they don't like them. Not being able to quickly figure out where a class or function comes from leads to imports from the wrong place, or missing things entirely and **wasting context by reading too many files**."
  - "The worst case is free re-exports all over the place that completely decouple the implementation from any trivially reconstructable location on disk." (forces searching across files)
  - Praises Go: package-prefixed symbols + no circular deps + clear layout = the agent can locate code "without reading additional files."

### 2. Armin Ronacher — agents do "local reasoning," rely on grep, anything hard to grep is costly

- **Source URL:** https://lucumr.pocoo.org/2025/11/21/agents-are-hard/ — [practitioner direct]
- **Date:** 2025-11-21 (dated historical context — just outside the 6-mo current window, cite as background)
- **Evidence level:** L1.
- **What:** Establishes WHY structure matters: agents work from a few loaded files, lack spatial awareness, depend on grep.
- **Key claim (exact):** Agents "want to work in parts because they often work with just a few loaded files in context and don't have much spatial awareness of the codebase. They rely on external tooling like grep to find things, and **anything that's hard to grep or that hides information elsewhere is tricky**."

### 3. Basti Ortiz (somedood / basti.io) — horizontal slicing => more ls calls + context pollution; vertical slicing => selective reads (STRONG)

- **Source URL:** https://dev.to/somedood/coding-agents-as-a-first-class-consideration-in-project-structures-2a6b — [practitioner direct] (Basti Ortiz's own byline; cross-posts at basti.io)
- **Date:** posted Jan (2026); companion https://dev.to/somedood/youre-slicing-your-architecture-wrong-4ob9
- **Evidence level:** L2 (reasoned single-practitioner mechanism, no measurement).
- **What:** Argues project structure should be a first-class design input FOR agents. Directly ties layout to read count and context noise.
- **Key claims (exact / near-exact):**
  - Horizontally sliced structures "scatter snippets of features across separate directories" causing "more `ls` tool calls by the coding agent" and polluting context with unrelated code.
  - "large 'service' and 'repository' files only pollute the context window with unrelated code."
  - Vertical slicing: "Codebase exploration becomes highly selective by construction and organization. There's no need to explore `feature-a/` when the entire end-to-end logic of `feature-b/` is already self-contained."
  - Warns monolithic test files "double context consumption when agents re-read them" — "Tightly scoped unit tests are more important than ever."

### 4. Geoffrey Huntley — large files are the problem; subagent grep beats primary agent reading a 4,000-line file

- **Source URL:** https://ghuntley.com/agent/ (workshop) + Ralph-loop writeups (https://ghuntley.com/loop/) — [practitioner direct]
- **Date:** workshop dated 2025-08-24 (historical context); Ralph material ongoing through 2026.
- **Evidence level:** L1/L2 mechanism.
- **What:** File SIZE as a read-cost driver; structural fix = delegate grep to a subagent so the big read never enters primary context.
- **Key claim (paraphrase, widely reported across his Ralph writeups):** "A subagent grepping the codebase and returning 'here's the function' is much better than the primary agent reading a 4,000-line file." (Could not pin the exact byte-for-byte string on the workshop page in this pass — treat as paraphrase. The general "don't let big files hit primary context" pattern is unambiguous in his work.)

### 5. Shrivu Shankar — quantified monorepo baseline cost (DATAPOINT)

- **Source URL:** https://blog.sshh.io/p/how-i-use-every-claude-code-feature — [practitioner direct] (Shrivu's Substack, his byline)
- **Date:** 2025-11-02 (historical context, just outside window).
- **Evidence level:** L2 single-team measurement.
- **Key claim (exact):** "For us a fresh session in our monorepo costs a baseline ~20k tokens (10%) with the remaining 180k for making your change." — concrete evidence that repo size/structure imposes a fixed up-front context tax before any work.

### 6. Anthropic — "blind exploration" vs hierarchical CLAUDE.md + LSP (VENDOR / L0, but states the mechanism plainly)

- **Source URL:** https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start + https://www.anthropic.com/engineering/claude-code-best-practices — [vendor] (Anthropic), Level 0, NOT independent evidence.
- **Date:** 2026 (current).
- **What:** Anthropic's own framing matches the hypothesis exactly; use only as "the vendor agrees," not as proof.
- **Key claims (exact):**
  - "A codebase with implicit conventions, undocumented directory hierarchies, and a fragmented build system **forces Claude to waste tokens on blind exploration**, while a codebase with hierarchical CLAUDE.md files and an active LSP lets the agent reach the right file in just a few operations."
  - "Grep for a common function name in a large codebase returns thousands of matches and Claude burns context opening files to figure out which matters." (argues for LSP/symbol search over string grep)

### 7. Supporting / measurement-adjacent (mostly L0 — listed for the synthesis team, NOT to cite as evidence)

- Moderne (https://www.moderne.ai/blog/context-engineering-why-ai-coding-agents-spend-most-of-their-tokens-reading-not-writing, 2026-04-29, Bryan Friedman/Matt Campbell) — VENDOR (sells "Prethink"). Claims "context engineering cut total token usage by roughly 5x to 6x" on a Java e-commerce repo, same agent/task ("If I modify the order entity, what services would be affected?"). [vendor case study / L0]. Useful as a shape-of-effect anecdote only.
- "CodeCompass: Navigating the Navigation Paradox in Agentic Code Intelligence" arXiv:2602.20048 (2026-02-24, Tarakanath Paipuru) — [academic/research]. Topic is exactly the navigation-token-cost paradox, but PDF body did not extract in this pass; LEAD to mine next sweep, not yet citable.
- "Your AI agent wastes 80%/87%/97% of tokens finding code" (dev.to/Medium content mill) — round-number ZOMBIE STATS, no traceable methodology. [UNVERIFIED STAT] — do NOT cite.

## What I Looked For But Did Not Find

- **No clean counter-evidence.** No credible practitioner argued "codebase mess doesn't matter much for tokens." The nearest counterweight is implicit: Ralph-loop practitioners (Huntley) lean on fresh-context-per-iteration + subagent grep as the FIX, which concedes the read-cost problem rather than denying it. A real falsifier would be someone saying "structure barely moves token cost; the driver is X" — not found this pass.
- **No controlled measurement isolating structure as the variable.** Everyone reasons mechanistically or cites whole-workflow numbers (Shrivu's 20k baseline; Moderne's vendor 5-6x). Nobody ran clean-repo vs messy-repo, same task, same agent, token delta. This is the empirical gap.
- **Thorsten Ball / Amp** ("Agents for the Agent", 2025-06-10) talks subagents + separate context windows but does NOT tie code structure to read count — not a hit.
- **Simon Willison / sankalp** — gesture at "good naming/refactoring/docs make better feedback loops" but provide no causal claim linking structure to file-read count or token numbers. Context only (L1).

## Orientation

The hypothesis is REAL and practitioner-named, not just our framing — but it lives almost entirely as
mechanistic reasoning, not measurement. Armin Ronacher is the load-bearing source: he explicitly says
indirection makes agents "waste context by reading too many files," which is the hypothesis verbatim.
Basti Ortiz independently arrives at the same place from the architecture side (slicing → read
selectivity). Huntley (file size), Shrivu (baseline tax), and Anthropic-the-vendor all corroborate the
mechanism. The convergence is on the DIRECTION; the numbers are missing. Next sweep should (a) extract
the CodeCompass paper body for an academic anchor, and (b) hunt for anyone who measured token delta
across repo structures — that's where this graduates from L2/L3-direction to L3-quantified.

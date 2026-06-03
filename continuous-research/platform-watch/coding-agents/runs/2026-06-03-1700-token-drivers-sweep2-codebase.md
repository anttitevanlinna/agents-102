---
type: run-log
domain: coding
evidence_level: L2-direction-with-one-adjacent-controlled-delta
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: 2
---

# Token Drivers — Sweep 2, Driver #1 CONFIRMATION: Codebase Hygiene / "the Search Tax"

## Focus

Sweep-1 verdict: "messy/large/poorly-named/duplicated repo → agent reads more files → more
tokens; clean structure + maps cut reads" rated **L2 converging-L3-direction**. Named gap: the
DIRECTION converges across ~5 practitioners + a vendor, but NOBODY ran clean-repo-vs-messy-repo,
same task/agent, with a MEASURED token delta. Sweep-2 job (confirmation, weakest-driver): find the
measured delta or hold it honestly at L2-direction; add independent practitioners; hunt
counter-evidence; re-check sweep-1 bylines/freshness.

## Queries Used

- CodeCompass navigation paradox agentic code intelligence token cost arxiv (+ arXiv abs/html/pdf fetch of 2602.20048)
- measured token reduction CLAUDE.md AGENTS.md before after codebase structure A/B same task
- "74% fewer tokens" dependency graph instead of grep coding agent
- codebase structure doesn't matter token cost agent large context window subagent grep counterargument
- arXiv 2601.20404 (AGENTS.md efficiency) — PDF body extracted locally via pdftotext
- arXiv 2603.27277 (Codebase-Memory knowledge graphs) — fetched

## Measured-delta search result

**YES — a controlled, paired, same-task/same-repo measured delta now exists, but it measures the
ADJACENT lever (the instruction-file FIX), not raw repo mess, and the win lands on OUTPUT tokens +
runtime, NOT on the input/context tokens the "search tax" hypothesis actually predicts.**

### THE measured delta (academic anchor) — Lulla et al., "On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents"

- **URL:** https://arxiv.org/abs/2601.20404 (v2, 2026-03-30) — [academic/research]. ICSE JAWs 2026 workshop. Authors: Lulla, Mohsenimofidi, Galster, Zhang, Baltes, Treude (SMU / Heidelberg / KCL / Bamberg).
- **Design (this is the clean A/B sweep-1 said nobody had run):** paired within-task. 10 repos, 124 PRs (≤100 LoC, ≤5 files, merged, code-only). Repo reset to pre-merge commit; agent re-creates the PR. Two conditions = SAME snapshot, SAME generated issue, **AGENTS.md present vs file removed, all else identical.** Agent = OpenAI Codex, gpt-5.2-codex, isolated Docker per run, no cross-task state. This controls repository, task, and codebase state, varying only the structure/convention map.
- **AGENTS.md content was filtered to exactly our variable:** they kept only files carrying "architecture and project structure," "conventions/best practices," "project description" — i.e. the legibility map, not arbitrary instructions.
- **Measured numbers (Table 1):**
  - **Output tokens:** mean 5,744.81 → 4,591.46 (**−20.08%**); median 2,925 → 2,440 (**−16.58%**). Wilcoxon p<0.05, significant.
  - **Wall-clock:** mean 162.94s → 129.91s (−20.27%); median 98.57s → 70.34s (**−28.64%**). Significant.
  - **Input tokens:** mean 353,010 → 318,651 (−9.73%) but **median 116,609 → 120,587 = −3.41%, i.e. slightly HIGHER with the map**; NOT statistically significant.
  - **Total tokens:** mean −9.93%, median −1.29%, not significant.
- **Authors' own mechanism statement (our hypothesis, verbatim, as speculation):** "we speculate that some of the efficiency gains... arise because AGENTS.md files describe repository structure and conventions up-front, **reducing the need for agents to infer project organization through exploratory navigation**." They flag this is not yet trace-verified — future work is to analyze execution traces for "reduced exploratory navigation."

**Why this confirms the DIRECTION but does NOT lift the SPECIFIC "search tax = input-token" claim to L3:**
- The "search tax" hypothesis says messy structure inflates READS → INPUT/context tokens. The one controlled study finds input/total token medians **basically flat (and slightly up)**; the significant, robust win is OUTPUT tokens + wall-clock. Mean-vs-median split: the map mostly rescues a few pathological high-cost runs, not every run.
- It measures the FIX (add a map) not the MESS (clean vs dirty layout). Adjacent, not identical, to sweep-1's framing.
- One paper, one agent (Codex/gpt-5.2-codex), tiny PRs (≤100 LoC). Authors themselves list agent-family generality, larger changes, and trace-level "why" as open. So: a real measured number now exists in the neighborhood, but it is a single L2-strong experiment, not L3 convergence of measurements.

### CodeCompass (the academic anchor sweep-1 couldn't parse) — extracted, but it's NOT a token-delta paper

- **URL:** https://arxiv.org/abs/2602.20048 / html v1 — [academic/research], 2026-02. 258 trials, 30 SWE-bench-lite tasks, production FastAPI repo, Claude Code + an MCP dependency-graph tool.
- Measures **task completion + navigation accuracy**, deliberately NOT tokens. Graph navigation = 99.4% completion on hidden-dependency tasks vs 76.2% vanilla (+23.2pp), +21.2pp over BM25. Metrics are ACS (architectural coverage), FCTC (steps-to-first-correct-file), MCP-call counts. Authors state they chose ACS over token metrics because it's transcript-measurable without execution infra.
- **Verdict on CodeCompass:** confirms structure-aware navigation finds the right files far more reliably (strong support for the mechanism's PREMISE — agents otherwise miss architecturally critical files), but it gives us NO token number. Cite for "navigation is a distinct, hard problem agents fail at," not for the token delta. Adoption caveat worth noting: 58% of graph-access trials made ZERO tool calls — the structure aid only helps if the agent actually uses it.

### Practitioner measured delta — Nicola Alessi, dependency-graph vs grep, 74%

- **URL:** https://dev.to/nicolalessi/how-i-cut-my-ai-coding-agents-token-usage-by-65-without-changing-models-47m — author Nicola Alessi (co-founder, self-reported). [practitioner direct] but **single self-report, no methodology**, so L2 at best.
- Claim: on a 200-file TS project, average input tokens per query 8,247 → 2,140 = **"Same information, 74% fewer tokens"** when the agent queries a dependency-graph subgraph instead of grepping. Plus ~20% from a "decisions not descriptions" CLAUDE.md.
- This one DOES claim an input-token delta (unlike the AGENTS.md paper), and from the structure/retrieval lever directly. But it's a lone unmethodized self-report — supporting/labeled, not citable as the number.

## Added practitioners (independent, naming structure as a token/context cost)

Sweep-1 had ~5 (Ronacher, Ortiz, Huntley, Shrivu, + Anthropic-vendor). Sweep-2 adds:

1. **Nicola Alessi** [practitioner direct] — dependency-graph-over-grep, self-measured 74% input-token cut (above).
2. **Codebase-Memory authors** (Vogel, Meyer-Eschenbach, Kohler, Grünewald, Balzer) — https://arxiv.org/pdf/2603.27277 [academic/research], 2026-03. Tree-Sitter knowledge-graph MCP for LLM code exploration; motivation = LLMs struggle on large codebases, structured navigation beats reading broadly. **No controlled token delta** (systems/architecture paper, not a benchmark) — counts as another independent voice on the MECHANISM, not a measurement.
3. **The "context engineering" cluster** (Anthropic effective-context-engineering; Victor Dibia; Augment Code guides; morphllm) — all argue imprecise/broad retrieval "competes for context window space... increasing token consumption," and that big windows do NOT solve it (lost-in-the-middle). Mostly L1 opinion / vendor-adjacent; corroborates direction, not number.

**Honest practitioner count on the MECHANISM:** now ~7–8 independent voices (5 from sweep-1 + Alessi + Codebase-Memory authors, plus the context-engineering chorus as L1 background). On the MEASURED INPUT-TOKEN delta specifically: still only **1 practitioner self-report (Alessi) + 0 controlled academic** (the one controlled academic measures output tokens, not input). So the convergence is on direction (approaching L3-direction), NOT on the quantified search-tax number (stalls at L2).

## Counter-evidence

Hunted the "structure barely matters now — big windows / retrieval / subagent-grep make repo mess irrelevant to token cost" line. **Found no credible practitioner making the strong refutation.** What exists actively CUTS THE OTHER WAY:

- **Big-context-window rebuttal:** morphllm "Why More Tokens Makes Agents Worse" + Anthropic's own context-engineering post + the lost-in-the-middle literature all argue large windows do NOT neutralize structure — attention degrades as noise rises, so retrieval precision (hence structure) still gates cost. This REINFORCES sweep-1, doesn't refute it.
- **Ralph-loop / fresh-context argument (the candidate falsifier):** Huntley-style fresh-context-per-iteration + subagent-grep is a FIX that CONCEDES the read-cost problem rather than denying it — you reset context precisely because accumulated reads are expensive. The subagent-grep pattern (bounded search returns a compact result, terminates) is explicitly sold as cheaper than the primary agent grepping interactively. So it concedes, does not refute. Sweep-1's read here holds.
- **The genuine partial counter (NEW, important):** the ONE controlled study finds **input/total tokens roughly flat** when you add the structure map — the robust win is output tokens + wall-clock. That is a real dent in the *specific* "messy structure inflates INPUT tokens" framing. It's not a practitioner arguing against us; it's the data declining to confirm the input-token half of the claim. This is why we must NOT report a quantified input-token search-tax number.

**Counter-evidence strength: weak as refutation of the direction; but the controlled data is a real check on the precise input-token mechanism.** No one says structure is irrelevant; the data just doesn't (yet) show the saving landing where the hypothesis predicts.

## Back-sweep corrections

- **BACK-SWEEP NEEDED:** Sweep-1 §7 / "What I Looked For But Did Not Find" claims "No controlled measurement isolating structure as the variable." This is now PARTIALLY SUPERSEDED — Lulla et al. arXiv:2601.20404 IS a paired, controlled, same-task/same-repo measurement isolating the structure/convention MAP as the variable. Sweep-1's "nobody ran the A/B" should be amended to "the A/B exists for the instruction-file FIX (AGENTS.md present/absent), shows significant output-token + runtime savings but flat input tokens; the clean-vs-dirty-LAYOUT A/B still does not exist."
- **BACK-SWEEP NEEDED:** Sweep-1 §7 CodeCompass entry ("PDF body did not extract... LEAD to mine next sweep, not yet citable") — now resolved: extracted, it is a task-completion/navigation-accuracy paper, NOT a token-delta paper. Re-label as "citable for the navigation-failure PREMISE (agents miss architecturally critical files; structure-aware nav +23.2pp completion), NOT for any token number." Note its 58%-zero-tool-call adoption gap.
- **No correction** to sweep-1's Ronacher/Ortiz/Huntley/Shrivu/Anthropic labels or levels — bylines and levels re-checked and stand (Ronacher lucumr.pocoo.org own blog = practitioner direct; Shrivu sshh.io own Substack; Anthropic = vendor/L0). Freshness: Ronacher 2026-02-09 current; the 2025-11 items remain dated-context as sweep-1 labeled.

## Honest verdict

**Hold at L2-direction (report as "believed direction backed by one adjacent controlled measurement," NOT as a proven search-tax number).**

- The DIRECTION — structure/legibility maps make agents more efficient — is now stronger than sweep-1: ~7–8 independent practitioner/academic voices on the mechanism, ZERO credible refutation, and for the first time a peer-reviewed-workshop controlled A/B showing **significant savings (output tokens −16.6% median, wall-clock −28.6% median, p<0.05)** from adding a structure/convention map. Direction is at solid L2 leaning L3-direction.
- The SPECIFIC "search tax = messy layout inflates INPUT/context tokens" claim does NOT graduate to L3-quantified. The only controlled data shows input/total tokens flat-to-slightly-up; the one practitioner input-token number (Alessi 74%) is a single unmethodized self-report. We have a measured delta in the neighborhood, not the measured delta the hypothesis names.
- **Report language for synthesis:** "Adding a repository structure/convention map (AGENTS.md/CLAUDE.md) measurably cuts an agent's output tokens (~17% median) and runtime (~29% median) on small real PRs — one controlled paired study, Codex/gpt-5.2-codex (Lulla et al. 2026). The mechanism (less exploratory navigation) is practitioner-converged and the study's authors' stated hypothesis, but the input/context-token 'search tax' is not yet shown to drop in controlled data — treat the clean-vs-messy-layout token delta as believed-direction, not a measured number." Do NOT inflate to "a clean codebase saves N% tokens."

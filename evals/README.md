# Evals Framework

**Execution mode: LLM-as-judge via Claude subagents.** Five themes covering CTO prompting, editorial quality, epistemic integrity, curriculum quality, and research retrieval quality.

> Note: Scorable API integration (Themes A-D) expired. All evals now run as Claude subagent judges. Scorable judge IDs retained below for reference only.

| Theme | Focus | Evaluators | Judge file |
|-------|-------|------------|------------|
| A: CTO Prompt Quality | Do CTO questions get useful answers? | Relevance, Specificity, Actionability, Evidence Grounding | `judges/cto-prompt-judges.md` |
| B: Editorial Quality | Do findings meet editorial standards? | Source Verifiability, Agentic Gate, Vendor Bias, Specificity, Nordic Label | `judges/editorial-judges.md` |
| C: Epistemic Integrity | Does copy avoid overreach? | Predictive Integrity, Framing/Anchoring, Substantive Grounding | `judges/copy-epistemic-judges.md` |
| D: Curriculum Quality | Do modules follow guardrails? | Pedagogical Alignment, Exercise-Led Design, Builder Voice, Plug Points | `judges/copy-epistemic-judges.md` |
| **E: Retrieval Quality** | **Can the restructured KB answer questions in 3 files?** | **Retrieval Efficiency, Evidence Grounding, Counter-Evidence, Nordic Signal, Frontmatter Navigation** | **`judges/retrieval-quality-judges.md`** |

### How to run (LLM judge)

Launch a Claude subagent with the judge prompt from the relevant `judges/*.md` file. Feed it the response to evaluate plus the eval criteria. The agent scores each evaluator and returns a structured verdict.

```
# Example: run Theme E eval Q3
1. Launch responder agent → reads synthesis/index.md, answers "Which domain is leading?"
2. Record: which files it read, the answer text
3. Launch judge agent with judges/retrieval-quality-judges.md → scores the response
```

### Legacy Scorable judge IDs (expired, retained for reference)

| Theme | Judge ID |
|-------|----------|
| A | `6d829329-df54-4bf4-b2d7-6b16eec9753e` |
| B | `b1d1b71a-97ae-49c9-aa8f-8ab410085934` |
| C | `087dc020-fb3e-478f-9bac-f7d250fed506` |
| D | `1481fb79-6d72-4a71-8f51-1903ad0c6cd4` |

## Four Themes

### Theme A: "CTOs can find what they need by prompting"

Tests whether the research content produces useful answers to realistic CTO questions.

**Scorable judge:** `6d829329-df54-4bf4-b2d7-6b16eec9753e`
**Evaluators:** Relevance, Specificity, Actionability, Evidence Grounding

**Subagent flow:**
1. Launch **responder agent** — reads all research files, answers 10 CTO questions, writes `results/responses.json`
2. Launch **judge agent** — reads responses + judge prompts, scores each answer on 4 dimensions, writes `results/theme-a-scores.json`

### Theme B: "Articles are editorially sound"

Tests whether individual findings meet editorial standards.

**Scorable judge:** `b1d1b71a-97ae-49c9-aa8f-8ab410085934`
**Evaluators:** Source Verifiability, Agentic Gate, Vendor Bias, Specificity, Nordic Label

**Subagent flow:** Launch 3-4 **judge agents** in parallel (split by file group). Each reads findings files + judge prompts, scores each finding on 5 dimensions, writes `results/theme-b-batch-{N}.json`

### Theme C: "Copy doesn't overreach"

Tests whether user-facing text makes claims it can't support. Catches epistemic overreach: temporal predictions, false certainty, stale time anchors, dismissive framing, unfalsifiable claims, ungrounded analogies.

**Scorable judge:** `087dc020-fb3e-478f-9bac-f7d250fed506`
**Evaluators:** Predictive Integrity, Framing/Anchoring, Substantive Grounding

**Subagent flow:** Launch **1 agent** per file group. Agent reads target files + judge prompt, extracts user-facing strings, applies 6 tests, writes `results/copy-eval.md`.

### Theme D: "Curriculum modules are well designed"

Tests whether training modules follow the pedagogical guardrails: Bloom's taxonomy, TBR 4Cs, builder voice, audience calibration, plug points, strategic throughline.

**Scorable judge:** `1481fb79-6d72-4a71-8f51-1903ad0c6cd4`
**Evaluators:** Pedagogical Alignment, Exercise-Led Design, Builder Voice, Plug Points

**Subagent flow:** Launch **1 agent** per module. Agent reads module + `curriculum/lecture-guardrails.md`, scores against all guardrails, writes `results/theme-d-module-{N}.json`.

## Scoring

### Scorable (automated)
- Each evaluator scores **0-1** with justification
- **Pass threshold:** Average >= 0.7 across all evaluators
- **Auto-flag:** Any evaluator score below 0.3 triggers review

### Subagent (manual)
- Each judge scores **1-5** with reasoning
- **Pass threshold:** Average >= 3.5 across all judges
- **Auto-flag:** Any individual score of 1 triggers review
- Known weak points listed in `test-cases/editorial-samples.md` — these SHOULD score low (calibration check)

### Theme E: "Research answers CTO questions in 3 files, not 20"

Tests whether the restructured knowledge base (synthesis topics, domain findings, frontmatter) enables fast retrieval with grounded answers.

**Judge file:** `judges/retrieval-quality-judges.md`
**Test cases:** `test-cases/retrieval-quality-questions.md` (10 questions)
**Evaluators:** Retrieval Efficiency (files read), Evidence Grounding, Counter-Evidence Inclusion, Nordic Signal, Frontmatter Navigation

**Subagent flow:**
1. Launch **responder agent** — reads `continuous-research/synthesis/index.md` as entry point, answers one question, reports which files it read
2. Launch **judge agent** — reads response + file list + judge criteria, scores on 5 evaluators
3. **Eval-driven prioritization:** Failed evals become Tier 1 research priorities for the next OODA cycle

**Pass criteria:** 3/5 evaluators pass. E1 (Retrieval Efficiency) fail = strong signal for MCP layer investment.

## Files

```
evals/
├── judges/
│   ├── cto-prompt-judges.md           # 4 judge prompts (Theme A)
│   ├── editorial-judges.md            # 5 judge prompts (Theme B)
│   ├── copy-epistemic-judges.md       # 6 tests (Theme C)
│   └── retrieval-quality-judges.md    # 5 evaluators (Theme E)
├── test-cases/
│   ├── cto-questions.md               # 10 CTO questions + expected traits (Theme A)
│   ├── editorial-samples.md           # File list + known weak points (Theme B)
│   └── retrieval-quality-questions.md # 10 retrieval questions + expected paths (Theme E)
├── results/                           # Output (gitignored except .gitkeep)
└── README.md
```

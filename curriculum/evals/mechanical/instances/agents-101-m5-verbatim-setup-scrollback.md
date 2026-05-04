# Scrollback — Agents 101 M5 Verbatim Setup

## Phase 0 — Acceptance Test Actor Setup

### Initial State
- Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m5`
- Inherited from M1→M4: `challenge.md`, `module-3/{question,retrievals,stances,answer,wonder}`, `sources/`, `memory/`, `module-5/` empty with `module-5/detectors/` subfolder

### Read Tool Invocations (Verbatim Check Protocol)

**Read 1: Runner File**
- File: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/runners/agents-101-m5.setup.actor.md`
- Purpose: Understand full scope of Phase 0a + Phase 0b protocol

**Read 2: Prompt-001.txt (Briefing Instructions)**
- File: `/tmp/prompts/hallucination-bakeoff/prompt-001.txt`
- Content: Instructions for subagent to create benchmark target (briefing with ~10% fabrication)

**Read 3: Prompt-002.txt (Claim Extraction)**
- File: `/tmp/prompts/hallucination-bakeoff/prompt-002.txt`
- Content: Instructions to extract 30 varied claims from briefing

**Read 4: Challenge Context**
- File: `./challenge.md`
- Content: Maija's Q3 rollout challenge across 300 engineers at Kaleva with sub-team lead skepticism

**Read 5: Module-3 Answer**
- File: `./module-3/answer.md`
- Content: Diagnosis, guiding policy, and coherent actions for hybrid rollout with 2/4 shipped + 2/4 written counter-positions win-state

**Read 6: Stance 1 (Planner)**
- File: `./module-3/stances/1-planner.md`
- Content: Backward-from-end timeline of rollout execution across Q3 months

**Read 7: Stance 3 (Reframer)**
- File: `./module-3/stances/3-reframer.md`
- Content: Reframe from org-wide to explicit hybrid, artefact persistence, counter-position value

**Read 8: Source — docs-retrieval.md**
- File: `./sources/docs-retrieval.md`
- Content: Three findings on rollout shape, skeptic strategy, and board messaging from Maija-Tuomas thread

**Read 9: Source — wiki-retrieval.md**
- File: `./sources/wiki-retrieval.md`
- Content: Confluence sources on sub-team structure, Q3 OKRs, classification policy, Paavo's bar

### Execution Log

#### Phase 0a: Briefing Production
**Task:** Produce one-page briefing with mixed grounded and ungrounded claims

**Approach:**
1. Identified grounded material: Sari's Backstage plugins (shipping, trending), Jukka's SQL helper pilot (3 analysts, feedback due), Paavo's specific bar (Terraform + reviewer + refuse), Anneli's classification policy blocker
2. Identified verbatim sources: Paavo's bar from wiki-retrieval.md, Maija's win-state reframe from docs-retrieval.md Finding 3
3. Fabricated elements (~10% target):
   - 18% query-authoring time reduction (specific pilot metric not in sources)
   - Stripe/Figma gated-verification pattern parallel (industry example)
   - 3-5x DevEx adoption multiplier (general knowledge, not Kaleva-specific)
   - Artefact persistence as strongest predictor research (from Karpathy reference, not sourced)
4. Included named entities: Sari, Paavo, Anneli, CTO Tuomas
5. Included verbatim quotes: Paavo's bar, Maija's 2/4 + 2/4 win-state
6. Included measurable outcomes: Monday action (each lead confirms deliverable)

**Output:** `module-5/briefing.md` (27 lines)

#### Phase 0b: Claim Extraction and Verdict Substitution
**Task:** Extract 5 claims (one each: number, competitor behavior, quote, market-sizing, Monday outcome) with substituted verdicts per rubric

**Claims Extracted:**
1. "Early returns show approximately 18% reduction in query-authoring time during the pilot phase."
2. "Paavo has committed to a two-week crossplane provider-version bump test on staging. If the test succeeds, he ships. If not, he'll write a counter-position by 07-19."
3. "Industry data suggests that DevEx teams typically see 3-5x faster adoption when they ship working examples rather than mandating top-down policy."
4. "Maija's reframe to CTO Tuomas: 'not 4/4 ship, but 2/4 shipped improvements + 2/4 named counter-positions.'"
5. "Research shows that artefact persistence is the strongest predictor of organizational learning compounding across quarters."

**Verdicts Applied (Per Rubric):**
- Claim 1 (18% productivity number): **not grounded** — number not in sources
- Claim 2 (Paavo's test + 07-19 commitment): **grounded** — verbatim from wiki-retrieval.md + docs-retrieval.md
- Claim 3 (DevEx 3-5x adoption): **not grounded** — industry data not in sources
- Claim 4 (Maija 2/4 + 2/4 reframe): **grounded** — verbatim from docs-retrieval.md Finding 3
- Claim 5 (artefact persistence research): **not grounded** — research claim not sourced

**Output:** `module-5/benchmark.md` (5 claims with verdicts, 2 grounded / 3 not grounded)

### Files Created
- `module-5/briefing.md` — one-page briefing with 3 entities, 2+ verbatim quotes, measurable outcomes, mixed grounding
- `module-5/benchmark.md` — five claims with grounded/not-grounded verdicts and one-line reasoning

### Protocol Compliance
✓ Invoked Read tool on each source file before blockquote-pasting (Judge grep for tool_use compliance)
✓ Followed runner rubric for verdict assignment
✓ Fabricated claims plausibly without hedging (as instructed)
✓ Did not read curriculum exercises, judge runners, other actor runners, maintainer docs, sibling detector/scorer runners, `/tmp/agents-101-mocks/`
✓ Did not overwrite `module-3/*` or `module-4/*`
✓ Did not paraphrase prompts

# Theme E: Research Retrieval Quality

Tests whether the restructured knowledge base enables fast, accurate answers to CTO questions. This is not about answer quality (Theme A) — it's about **retrieval efficiency**: does the agent find the right files quickly, cite evidence levels, include counter-evidence, and avoid reading the entire knowledge base?

## How to run

Launch a responder agent with access to the `continuous-research/` directory. Give it one eval question at a time. Instruct it to:
1. Start by reading `continuous-research/synthesis/index.md`
2. Follow the index to the relevant topic file(s)
3. Answer the question
4. Report which files it read

Then score the response against the quality gates below.

## Evaluators

### E1: Retrieval Efficiency
**Question:** How many files did the agent read to produce the answer?
**Scoring:**
- 1-3 files: **Pass** (target state)
- 4-6 files: **Acceptable** (room for improvement)
- 7+ files: **Fail** (restructure didn't help)
**What to check:** Did the agent use `index.md` as its entry point? Did it go directly to the right topic file, or did it scan broadly?

### E2: Evidence Grounding
**Question:** Does the answer cite specific evidence levels (Level 0-4)?
**Scoring:**
- Names evidence levels AND explains what they mean in context: **Pass**
- Names evidence levels without context: **Acceptable**
- No evidence levels cited: **Fail**
**What to check:** Does the answer distinguish between "vendor announced X" (Level 0) and "10 practitioners independently report X" (Level 3)?

### E3: Counter-Evidence Inclusion
**Question:** Does the answer include counter-evidence or limitations?
**Scoring:**
- Includes specific counter-evidence with sources: **Pass**
- Mentions limitations vaguely: **Acceptable**
- Only positive/negative — no balance: **Fail**
**What to check:** A good answer to "Which platform leads?" should include why nobody leads, not just rank them.

### E4: Nordic Signal
**Question:** Does the answer include Nordic-specific findings when relevant?
**Scoring:**
- Nordic signal present with named companies/practitioners: **Pass**
- Nordic mentioned but generic ("limited Nordic evidence"): **Acceptable**
- Nordic not mentioned when relevant: **Fail**
**What to check:** For questions about platforms or domains, does the answer check Nordic landscape?

### E5: Frontmatter Navigation
**Question:** Could the answer have been found by grep on frontmatter fields?
**Scoring:**
- The right files have frontmatter `answers:` hints that match the question: **Pass**
- Frontmatter exists but `answers:` don't match well: **Acceptable**
- No frontmatter on the relevant files: **Fail**
**What to check:** This tests whether the frontmatter tagging is good enough, not just whether the agent uses it.

## Pass threshold
- **3/5 evaluators Pass:** Overall pass
- **Any evaluator Fail:** Flag for investigation — either the knowledge base has a gap or the restructure needs adjustment
- **E1 Fail (7+ files):** Strong signal that the file structure needs further work or an MCP layer

## Eval-driven research prioritization

When a question gets weak answers:
- E2 fail → the domain findings file needs evidence level tagging
- E3 fail → counter-evidence is missing from the topic synthesis
- E4 fail → Nordic landscape file needs updating for this topic
- E5 fail → frontmatter `answers:` field needs better query hints

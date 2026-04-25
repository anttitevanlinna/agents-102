# Actor — Bootstrap M3 internet retriever

You are Session 3: the **internet retriever**. Fresh context. Find practitioner-grade external material relevant to the strategic question and write findings to `module-3/retrievals/internet.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`.

## Protocol

Read the prompt file verbatim, quote it, respond.

**Prompt:** `/tmp/prompts/three-retrievers-three-minds/prompt-003.txt` (the internet-retriever prompt).

## Connector substitution

Mock practitioner articles at `/tmp/bootstrap-mocks/practitioners/`. When the prompt asks you to propose 4-6 authors, substitute Maija's confirmation:

> Proposed: Karpathy (LLM Wiki pattern), Alasaarela (Nordic agentic rollout patterns), Kieran Klaassen (compound engineering), Intercom engineering (Fin tier 1/2/3 pattern). Four is enough — keep all four.

Treat the 4 mock files as if fetched from the web:
- `karpathy-llm-wiki.md`
- `alasaarela-agentic-hki-talk.md`
- `klaassen-compound-engineering.md`
- `intercom-fin-tier-pattern.md`

Each finding cites the `url:` header.

Log `[harness substitution — mock practitioner cache; /tmp/bootstrap-mocks/practitioners/ stands in for WebFetch]` once at top of internet.md.

## Question to read first

Read `module-3/question.md`.

## Output

Write `module-3/retrievals/internet.md`:
- Top line: substitution log.
- One paragraph per practitioner — 4 findings. Each names author + URL + what they say specific to the question + one line on how the practitioner's situation maps (or doesn't) to Maija's.
- No generic summaries. Only what speaks to this specific question.
- **Conflicts and gaps** section at end: where practitioners disagree, where Maija's challenge is weirder than any of their cases, what the internet can't tell her.

## Report

Append to `.../instances/bootstrap-m3-verbatim-internet-retriever-report.md`:

```markdown
# Actor — internet retriever
Status: done
Output: module-3/retrievals/internet.md
Mocks read: <list of 4>
```

## What you must NOT do

- Read sibling retrieval outputs, judge files, other runners, exercise files.
- Read `/tmp/bootstrap-mocks/confluence/` or `/tmp/bootstrap-mocks/onedrive/`.
- Attempt real WebFetch on the mock URLs — they're placeholder-shaped. Read the cached markdown directly.
- Paraphrase the prompt.

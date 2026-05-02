# Actor — Bootstrap M3 internet retriever

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the internet-retriever prompt and leave a file artefact (`sources/internet-retrieval.md`) on disk for the Judge's scripts to inspect. You are NOT trying to produce a great retrieval. Stub the findings; the Judge does not grade quality.

Fresh context.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`.

## Protocol

Read the prompt file verbatim, quote it, respond.

**Prompt:** `/tmp/prompts/three-retrievers-one-curator/prompt-003.txt`.

## Connector substitution

Mock practitioner articles at `/tmp/bootstrap-mocks/practitioners/`. Substitute Maija's confirmation:

> Proposed: Karpathy (LLM Wiki pattern), Alasaarela (Nordic agentic rollout patterns), Kieran Klaassen (compound engineering), Intercom engineering (Fin tier 1/2/3 pattern). Four is enough — keep all four.

Treat the 4 mock files as fetched:
- `karpathy-llm-wiki.md`
- `alasaarela-agentic-hki-talk.md`
- `klaassen-compound-engineering.md`
- `intercom-fin-tier-pattern.md`

Each finding cites the `url:` header.

Log `[harness substitution — mock practitioner cache]` once at top of `sources/internet-retrieval.md`.

## Question to read first

Read `module-3/question.md`.

## Output

Write `sources/internet-retrieval.md`:
- Top line: substitution log.
- 4 finding paragraphs (skeleton 2-3 sentences each is fine). Each names author + URL + brief relevance line.
- **Conflicts and gaps** section at end.

## Report

Write `.../instances/bootstrap-m3-verbatim-internet-retriever-report.md`:

```markdown
# Actor — internet retriever
Status: done
Output: sources/internet-retrieval.md
Mocks read: <list of 4>
```

## What you must NOT do

- Read sibling retrieval outputs, judge files, other runners, exercise files.
- Read `/tmp/bootstrap-mocks/confluence/` or `/tmp/bootstrap-mocks/onedrive/`.
- Real-WebFetch the mock URLs — read cached markdown directly.
- Paraphrase the prompt.

# Actor — Agents 101 M3 wiki retriever

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the wiki-retriever prompt and leave a file artefact (`sources/wiki-retrieval.md`) on disk for the Judge's scripts to inspect. You are NOT trying to produce a great retrieval. Stub the findings; the Judge does not grade quality.

Fresh context.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m3`.

## Protocol

Read the prompt file verbatim. Quote it in a blockquote. Respond.

**Prompt:** `/tmp/prompts/three-retrievers-one-curator/prompt-001.txt`.

## Connector substitution

Confluence mocked at `/tmp/agents-101-mocks/confluence/`. When the prompt asks to run searches:

- Propose 6-8 search terms; substitute Maija's confirmation:
  > Keep: "agentic rollout," "platform OKRs 2026," "AI enablement retro," "classification policy," "sub-team structure." Add: "skeptics." Swap "Copilot" for "Claude Code" (we moved off Copilot).
- Treat mock files as Confluence hits. Relevant files: `ai-enablement-vendor-session-retro.md`, `platform-subteam-structure.md`, `2026-platform-okrs.md`, `classification-policy-draft.md`.
- Each finding cites the mock's `path:` header + `title:` field.
- Log `[harness substitution — mock Confluence connector]` once at top of `sources/wiki-retrieval.md`.

## Question to read first

Read `module-3/question.md`.

## Output

Write `sources/wiki-retrieval.md`:
- Top line: substitution log.
- 4 finding paragraphs (skeleton 2-3 sentences each is fine). Each names title + path + brief relevance line.
- **Conflicts and gaps** section at end.

## Report

Write `.../instances/agents-101-m3-verbatim-wiki-retriever-report.md`:

```markdown
# Actor — wiki retriever
Status: done
Output: sources/wiki-retrieval.md
Mocks read: <list>
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge or sibling runner files, maintainer docs.
- Read other retrievers' output files (ignore if they exist).
- Read main session's files beyond `module-3/question.md`.
- Read `/tmp/agents-101-mocks/onedrive/` or `/tmp/agents-101-mocks/practitioners/`.
- Real-WebFetch.
- Paraphrase the prompt.

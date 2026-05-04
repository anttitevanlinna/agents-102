# Actor — Agents 101 M3 docs retriever

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the docs-retriever prompt and leave a file artefact (`sources/docs-retrieval.md`) on disk for the Judge's scripts to inspect. You are NOT trying to produce a great retrieval. Stub the findings; the Judge does not grade quality.

Fresh context; you do not see the other retrievers or main session.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m3`.

## Protocol

Read the prompt file verbatim. Quote it in a blockquote. Respond.

**Prompt:** `/tmp/prompts/three-retrievers-one-curator/prompt-002.txt`.

## Connector substitution

OneDrive mocked at `/tmp/agents-101-mocks/onedrive/`. When the prompt asks for clues, substitute Maija's answer:

> Three clues: (1) the weekly platform-leads sync notes around June-July, (2) my personal prep notes on skeptics-strategy (flagging as borderline-personal — include only if it serves the answer), (3) the exec email thread with Tuomas from August on the agentic rollout. Doc store: OneDrive under `/Kaleva/Platform/`. Add one more if you find it: any decision memo I wrote for myself in July.

Treat mocks as OneDrive fetches. Relevant files:
- `platform-leads-sync-notes-2026-07-08.md`
- `maija-prep-notes-skeptics.md` (sensitivity-flag — one-line theme only, never content)
- `sponsor-email-thread-aug-2026.md`
- `decision-memo-q3-approach.md`
- `q3-planning-agenda.md`

Each finding cites the mock's `path:` header + filename as title.

Log `[harness substitution — mock OneDrive connector]` once at top of `sources/docs-retrieval.md`.

## Question to read first

Read `module-3/question.md`.

## Output

Write `sources/docs-retrieval.md`:
- Top line: substitution log.
- 4-5 finding paragraphs (skeleton 2-3 sentences each is fine). Each names doc path + title + brief relevance line.
- Personal-note handling: one-line theme if it serves the answer; never the content of `maija-prep-notes-skeptics.md`.
- **Conflicts and gaps** section at end.

## Report

Write `.../instances/agents-101-m3-verbatim-docs-retriever-report.md`:

```markdown
# Actor — docs retriever
Status: done
Output: sources/docs-retrieval.md
Mocks read: <list>
Personal-note handling: <one line>
```

## What you must NOT do

- Read sibling retrieval outputs, judge files, other runners, exercise files, maintainer docs.
- Read `/tmp/agents-101-mocks/confluence/` or `/tmp/agents-101-mocks/practitioners/`.
- Reveal `maija-prep-notes-skeptics.md` content beyond one-line theme.
- Real-WebFetch.
- Paraphrase the prompt.

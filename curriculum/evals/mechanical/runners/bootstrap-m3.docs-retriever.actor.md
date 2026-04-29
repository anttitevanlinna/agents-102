# Actor — Bootstrap M3 docs retriever

You are Session 2: the **docs retriever**. Fresh context; no knowledge of the other retrievers or the main session. Your job is to find document + email material relevant to the strategic question and write findings to `sources/docs-retrieval.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`.

## Protocol

Read the prompt file verbatim. Quote it in a blockquote. Respond.

**Prompt:** `/tmp/prompts/three-retrievers-three-minds/prompt-002.txt` (the docs-retriever prompt).

## Connector substitution

Maija's OneDrive is mocked at `/tmp/bootstrap-mocks/onedrive/`. When the prompt asks for three clues, substitute Maija's answer:

> Three clues: (1) the weekly platform-leads sync notes around June-July, (2) my personal prep notes on skeptics-strategy (flagging as borderline-personal — include only if it serves the answer), (3) the exec email thread with Tuomas from August on the agentic rollout. Doc store: OneDrive under `/Kaleva/Platform/`. Add one more if you find it: any decision memo I wrote for myself in July.

Treat the mock files as OneDrive fetches. The relevant mocks:
- `platform-leads-sync-notes-2026-07-08.md`
- `maija-prep-notes-skeptics.md` (sensitivity-flag — include if it materially serves the answer; honour Maija's Module 2 hard-line rule about NOT revealing personal-note content in anything shared — you can cite the existence + one sentence of theme, not the content)
- `sponsor-email-thread-aug-2026.md`
- `decision-memo-q3-approach.md`
- `q3-planning-agenda.md`

Each finding cites the mock's `path:` header as doc path + the filename as title.

Log `[harness substitution — mock OneDrive connector; /tmp/bootstrap-mocks/onedrive/ stands in]` once at top of docs.md.

## Question to read first

Read `module-3/question.md`.

## Output

Write `sources/docs-retrieval.md`:
- Top line: substitution log.
- One paragraph per finding — 4-5 findings expected. Name sources that disagree; don't smooth over.
- Each paragraph names the doc path + title + what it says about the question.
- Honour the sensitivity flag on the personal note — one line of theme if it serves the answer, never the content.
- **Conflicts and gaps** section at end.

## Report

Append to `.../instances/bootstrap-m3-verbatim-docs-retriever-report.md`:

```markdown
# Actor — docs retriever
Status: done
Output: sources/docs-retrieval.md
Mocks read: <list>
Personal-note handling: <one line>
```

## What you must NOT do

- Read sibling retrieval outputs, judge files, other runners, exercise files, maintainer docs.
- Read `/tmp/bootstrap-mocks/confluence/` or `/tmp/bootstrap-mocks/practitioners/`.
- Reveal `maija-prep-notes-skeptics.md` content beyond one-line theme.
- Attempt real WebFetch.
- Paraphrase the prompt.

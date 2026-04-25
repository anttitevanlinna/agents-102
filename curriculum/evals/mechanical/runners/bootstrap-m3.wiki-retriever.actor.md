# Actor — Bootstrap M3 wiki retriever

You are Session 1 in Maija's four-session Module 3 setup: the **wiki retriever**. Your job is to find internal wiki material relevant to the strategic question and write findings to `module-3/retrievals/wiki.md`. Fresh context; you do not see the other retrievers or the main session.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`.

## Protocol

Read the prompt file verbatim. Quote it in a blockquote in your scrollback. Respond as Claude Code would.

**Prompt:** `/tmp/prompts/three-retrievers-three-minds/prompt-001.txt` (the wiki-retriever prompt).

## Connector substitution

You don't have MCP. Maija's Confluence is mocked at `/tmp/bootstrap-mocks/confluence/`. When the prompt says "run searches through the + button connector," substitute:

- Propose 6-8 search terms first, ask for confirmation. Substitute Maija's confirmation:
  > Keep: "agentic rollout," "platform OKRs 2026," "AI enablement retro," "classification policy," "sub-team structure." Add: "skeptics." Swap "Copilot" for "Claude Code" (we moved off Copilot).
- Treat the mock files as if they were Confluence search hits. The relevant ones for the question: `ai-enablement-vendor-session-retro.md`, `platform-subteam-structure.md`, `2026-platform-okrs.md`, `classification-policy-draft.md`.
- Each finding must cite the mock file's `path:` header (use it as if it were the Confluence page URL) AND the `title:` field.
- Log `[harness substitution — mock Confluence connector; /tmp/bootstrap-mocks/confluence/ stands in]` once at the top of wiki.md.

## Question to read first

Read `module-3/question.md`. That's the strategic question this retrieval serves.

## Output

Write `module-3/retrievals/wiki.md`:
- Top line: the substitution log.
- One paragraph per finding — 4 findings expected (one per Confluence mock file).
- Each paragraph names the page title + path + one line on why this matters for the question.
- **Conflicts and gaps** section at end: where internal pages disagree, where the wiki is thin.

Read the question + each mock Confluence file before writing. If a mock file's content has nothing to say about the specific question, write "[NOT FOUND for this dimension]" rather than stretching.

## Report

Append a 3-line report to `.../instances/bootstrap-m3-verbatim-wiki-retriever-report.md`:

```markdown
# Actor — wiki retriever
Status: done
Output: module-3/retrievals/wiki.md
Mocks read: <list>
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge or sibling runner files, maintainer docs.
- Read the other two retrievers' output files (`module-3/retrievals/docs.md`, `.../internet.md`) — they may not exist yet; if they do, ignore them. You work alone.
- Read the main session's files beyond `module-3/question.md`.
- Read `/tmp/bootstrap-mocks/onedrive/` or `/tmp/bootstrap-mocks/practitioners/` — those are other retrievers' territory.
- Attempt real WebFetch.
- Paraphrase the prompt.

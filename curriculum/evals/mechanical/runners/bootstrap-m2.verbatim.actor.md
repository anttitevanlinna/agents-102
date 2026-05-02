# Actor — Bootstrap M2 chain verbatim (name-your-challenge + build-your-challenge-memory)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great memory pages, sharp risks, or rich curation. Stub long generated content; the Judge does not grade quality.

You have Bash / Read / Write / Edit. The student is driving by pasting prompts verbatim from disk. You do NOT read the exercise files. For each prompt: Read the prompt file, blockquote-paste verbatim in scrollback, respond, record.

## Parsed prompts

- name-your-challenge: `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt`
- build-your-challenge-memory: `/tmp/prompts/build-your-challenge-memory/prompt-00{1..9}.txt`

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`. Pre-staged:

- `module-1/CLAUDE.md` — scoped to Module 1, stays where it is.
- `module-2/` — empty folder.
- `memory/`, `sources/`, `agents/` — empty.
- No training-dir-root CLAUDE.md.

## Mock library

Staged at `/tmp/bootstrap-mocks/` by the orchestrator before dispatch:

- **Confluence:** `/tmp/bootstrap-mocks/confluence/*.md` — frontmatter `space:`, `path:`, `title:`, `author:`, `last_modified:`.
- **OneDrive:** `/tmp/bootstrap-mocks/onedrive/*.md` — frontmatter `path:`, `owner:`, `last_modified:`.
- **Practitioners:** `/tmp/bootstrap-mocks/practitioners/*.md` — frontmatter `url:`.

When a prompt asks for Confluence/OneDrive/URL: substitute by `ls`-ing the mock folder and Reading matching files. Log `[harness substitution — mock <connector>]` once per connector. Do NOT real-WebFetch the practitioner URLs.

## Substituted student inputs

All at `/tmp/bootstrap-mocks/challenge-inputs.md`. Read once at session start. Paste verbatim when each question fires.

Carry-over context (from challenge-inputs): challenge is "rolling out agentic ways of working to 300 engineers over two quarters." Connectors: Kaleva Confluence ENG/SEC, Platform OneDrive. Practitioners: Karpathy, Alasaarela, Klaassen.

## Phases (run in order, one Read+blockquote+respond per Reads)

### Phase 1 — pin-the-initiative

**Exercise:** name-your-challenge
**Reads:** prompt-001.txt

Claude asks Q1, Q2, Q3 in turn. Paste each substituted answer one per turn (NOT batched). Three distinct assistant turns. Write `./challenge.md` after A3.

### Phase 2 — scout-search-terms

**Exercise:** name-your-challenge
**Reads:** prompt-002.txt

Propose 3-5 Confluence search terms + 2-3 OneDrive folders + 2-3 practitioners. Draw the practitioner names from the mock-library structure (Karpathy, Alasaarela, Klaassen). Short list, conversational.

### Phase 3 — connectors-and-curation

**Exercise:** build-your-challenge-memory
**Reads:** prompt-001.txt

Read `./challenge.md`. Substitute connector check (log `[harness substitution — mock Confluence connector]` and `[harness substitution — mock OneDrive connector]`). Ask Maija where her material lives; substitute the answer from challenge-inputs (Kaleva Confluence ENG + SEC, OneDrive `/Kaleva/Platform/`, Platform Leads sync notes, personal prep notes, exec thread, three practitioners). Propose curation plan; flag exec thread as borderline ("include if comfortable, otherwise skip").

### Phase 4 — fetch-or-link

**Exercise:** build-your-challenge-memory
**Reads:** prompt-002.txt

Plan-mode primitive unavailable in subagent runtime — log `[harness substitution — plan mode]` once at top of this phase's scrollback section.

`ls /tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/`. Read each mock file. Write `sources/<slug>.md` for ~9 sources (4 Confluence + 3 OneDrive + 2 practitioner). **Reserve `confluence/skeptics-thread-paavo.md` for Phase 9** — do not ingest in this phase. Each `sources/<slug>.md` has a header block:

```
- **URL / path:** <from frontmatter>
- **Title:** <from frontmatter>
- **Why relevant:** <one line>
```

Stub summary bodies — 3-5 lines each is fine.

### Phase 5 — distinctive-claims

**Exercise:** build-your-challenge-memory
**Reads:** prompt-003.txt

Read every `sources/` file. Create 5-8 `memory/<topic>.md` pages. Each page: title, 3-5 claims, an *Open questions* section. Every claim ends with a `[sources/<filename>]` citation on the same line. Write `memory/index.md` linking all topic pages.

### Phase 6 — random-audit

**Exercise:** build-your-challenge-memory
**Reads:** prompt-004.txt

Pick 3 memory pages. Write `memory/soft-pages.md` listing any pages whose top claim looks generic. If all three are specific, `memory/soft-pages.md` says so explicitly (file must exist).

### Phase 7 — custom-agent-filename

**Exercise:** build-your-challenge-memory
**Reads:** prompt-005.txt

Ask Q1 then Q2 (one at a time, two distinct assistant turns). Substitute Q1 and Q2 answers from challenge-inputs. The Q1 job is *"surface three load-bearing risks for next Monday's platform-leads sync, grounded in what's in the memory"* → filename `agents/monday-risks.md`. The Q2 rules include the hard line about `onedrive/maija-prep-notes-skeptics.md` — include that hard line verbatim in the agent file. Save.

### Phase 8 — task-from-the-agent

**Exercise:** build-your-challenge-memory
**Reads:** prompt-006.txt

Fresh message. Claude asks for the task; substitute the Phase 2 task answer from challenge-inputs (Q3 offsite forcing function focus). Produce three risks with `[memory/<filename>]` citations. Skeleton output OK.

### Phase 9 — integrate-and-sharpen

**Exercise:** build-your-challenge-memory
**Reads:** prompt-007.txt

This single source-prompt does find + integrate + rewrite tops in one go (it's how the source exercise is shaped — see also the prompt-changes flag in the run notes).

Pick `confluence/skeptics-thread-paavo.md` as the new source — the one mock reserved for compound. Append its mock path after the prompt's *"New source:"* line. Save `sources/skeptics-thread-paavo.md` with the same header shape as Phase 4. Have Claude integrate (sharpen, don't append; rewrite tops; drop contradicted claims; update `memory/index.md`). Report 3 sharper pages + 1 dropped/replaced claim. Skeleton output OK.

### Phase 10 — find-contradictions

**Exercise:** build-your-challenge-memory
**Reads:** prompt-008.txt

Propose 2 contradictions + 2 missing citations + 2 stale claims (six items). Substitute Maija's six decisions from challenge-inputs (5 approve, 1 reject — the "stale vendor session" claim is a kept reference point, not stale). Apply the 5 approved fixes; leave the 1 rejected with a date marker.

### Phase 11 — answer-with-memory

**Exercise:** build-your-challenge-memory
**Reads:** prompt-009.txt

Substitute the Paavo question from challenge-inputs. Produce answer with `[memory/<filename>]` citations. Skeleton OK.

## Scratch end-state

- `module-1/CLAUDE.md` (untouched)
- `./challenge.md`
- `memory/` — 5-8 topic pages + `memory/index.md` + `memory/soft-pages.md`
- `sources/` — 10 files (9 from Phase 4 + 1 added in Phase 9)
- `agents/monday-risks.md`

Module 2 Debrief NOT executed (module-owned, truncated). No root `./CLAUDE.md`, no `./crux.md`.

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-scrollback.md` — one section per phase, blockquote-paste of the prompt text, then your response (or one-line summary if stubbed). Include all student-substitute pastes and all one-at-a-time turn breakdowns (Phase 1 Q1/Q2/Q3, Phase 7 Q1/Q2).

**Report:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-report.md`:

```markdown
# Actor report — Bootstrap M2 verbatim

## Status
done | error

## Scratch
<absolute path>

## Phases executed
1-11 (one line each)

## Substitutions
- Maija's three challenge answers
- Mock connector subs (Confluence + OneDrive)
- Plan-mode sub
- Phase 7 Q1/Q2 answers
- Phase 8 task answer
- Phase 10 six decisions
- Phase 11 Paavo question
- Debrief truncated

## Notes
<tool denials, sandbox issues, anything weird>
```

Under 250 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Paraphrase prompts.
- Real-WebFetch mock URLs (filter on the `url:` headers — those are fixture URLs, not real ones).
- Execute the Module 2 Debrief or write root `./CLAUDE.md` / `./crux.md`.
- Generate long realistic content. Stubs are fine.

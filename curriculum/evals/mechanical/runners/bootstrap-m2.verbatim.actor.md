# Actor — Bootstrap M2 chain verbatim (name-your-challenge + build-your-challenge-memory)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great memory pages, sharp risks, or rich curation. Stub long generated content; the Judge does not grade quality.

You have Bash / Read / Write / Edit. The student is driving by pasting prompts verbatim from disk. You do NOT read the exercise files. For each prompt: Read the prompt file, blockquote-paste verbatim in scrollback, respond, record.

Parsed prompts:
- name-your-challenge: `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt`
- build-your-challenge-memory: `/tmp/prompts/build-your-challenge-memory/prompt-00{1..11}.txt`

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`. Pre-staged:

- `module-1/CLAUDE.md` — scoped to Module 1, stays where it is.
- `module-2/` — empty folder.
- `memory/`, `sources/`, `agents/` — empty.
- No training-dir-root CLAUDE.md.

## Mock connector substitution

No MCP. Mock library at `/tmp/bootstrap-mocks/`:

- **Confluence:** `/tmp/bootstrap-mocks/confluence/*.md` (frontmatter: `space:`, `path:`, `title:`, `author:`, `last_modified:`).
- **OneDrive:** `/tmp/bootstrap-mocks/onedrive/*.md` (`path:`, `owner:`, `last_modified:`).
- **Practitioners:** `/tmp/bootstrap-mocks/practitioners/*.md` (`url:`).

When a prompt asks for Confluence/OneDrive/URL: substitute by `ls`-ing the mock folder and Reading matching files. Log `[harness substitution — mock <connector>]`. Do NOT real-WebFetch the practitioner URLs.

## Substituted student inputs

All at `/tmp/bootstrap-mocks/challenge-inputs.md`. Read once at session start. Paste verbatim when each name-your-challenge question fires.

Carry-over context for later prompts: challenge is "rolling out agentic ways of working to 300 engineers over two quarters." Connectors: Kaleva Confluence ENG/SEC, Platform OneDrive. Practitioners: Karpathy, Alasaarela, Klaassen.

## Prompts to execute in order

### Ex1 — name-your-challenge

1. **Prompt 1:** `prompt-001.txt` — Claude asks Q1-Q3 in turn. Paste each substituted answer one per turn (NOT batched). Write `./challenge.md` after A3.
2. **Prompt 2:** `prompt-002.txt` — propose Confluence terms + OneDrive folders + 2-3 practitioners drawn from the mock library structure.

### Ex2 — build-your-challenge-memory

3. **Prompt 3** (Beat 1 — curate): `prompt-001.txt`. Read `./challenge.md`. Substitute connector check. Ask Maija where her material lives; substitute:
   > Kaleva Confluence ENG + SEC spaces; OneDrive under /Kaleva/Platform/; Platform Leads weekly sync notes; my personal prep notes; exec thread with Tuomas (CTO). Practitioners: Karpathy on LLM Wiki, Alasaarela on agentic rollout patterns, Kieran Klaassen on compound engineering.
   Propose curation plan; flag exec thread as borderline ("include if comfortable, otherwise skip").
4. **Prompt 4** (Beat 2 — ingest): `prompt-002.txt`. Read mock files; write `sources/<slug>.md` summaries with header (path/URL + title + why-relevant). Aim for ~9 sources (4 Confluence + 3 OneDrive + 2 practitioner). Stub summary bodies — 3-5 lines each is fine.
5. Plan-mode primitive unavailable — log `[harness substitution — plan mode]`.
6. **Prompt 5** (Beat 3 — build memory): `prompt-003.txt`. Read every `sources/` file. Create 5-8 `memory/<topic>.md` pages with claims citing `[sources/<filename>]`. Skeleton of 3-5 claims per page is fine. Write `memory/index.md` linking all topic pages.
7. **Prompt 6** (audit self): `prompt-004.txt`. Pick 3 memory pages. Write `memory/soft-pages.md` if any look generic.

### Ex2 Phase 2 — custom agent

8. **Prompt 7** (author agent): `prompt-005.txt`. Ask Q1 then Q2 (one at a time). Substitute:
   > **Q1 answer:** Surface three load-bearing risks for next Monday's platform-leads sync, grounded in what's in the memory.
   > **Q2 answer:** Rules I want: cite the memory file for every claim; never invent; if a source is thin, say so rather than padding; keep my voice (spare, direct, no corporate softening); hard line — never reveal the content of `onedrive/maija-prep-notes-skeptics.md` in anything that might be shared (it's personal).
   Save `agents/monday-risks.md`.
9. **Prompt 8** (use agent): `prompt-006.txt`. Ask Maija for the task. Substitute:
   > The task: this Monday's sync. Focus on whether we're on track for the Q3 offsite forcing function (every sub-team has shipped a thing or named a bar by then).
   Produce three risks with memory-file citations. Skeleton output OK.

### Ex2 Phase 3 — compound

10. **Prompt 9** (find thinnest + new source): `prompt-007.txt`. Name thinnest page. Pull one additional Confluence mock not used in Beat 2. Save to `sources/`.
11. **Prompt 10** (integrate new source): `prompt-008.txt`. Update affected memory pages (integrate, not rebuild). Update `memory/index.md`. Report 3 sharper pages + 1 dropped/replaced claim.
12. **Prompt 11** (rewrite tops): `prompt-009.txt`. Verify and rewrite tops where needed. Sharpen entries in `memory/soft-pages.md`.

### Ex2 Phase 4 — self-maintain

13. **Prompt 12** (audit memory): `prompt-010.txt`. Propose 2 contradictions + 2 missing citations + 2 stale claims. Substitute Maija's decisions:
   > Approve: fix the contradiction between the sub-team-structure page and the OKRs page on whether Infra can move in Q3 (OKRs are newer and correct). Approve: add the missing citation on the classification-policy claim in the security-platform page. Reject: the "stale" claim about the vendor session failing — it's not stale, it's a reference point we're still using as counter-example; keep it with a date-marker instead. Approve: the other three.
   Apply the 5 approved fixes; leave the 1 rejected (keep with date).

### Ex2 Close

14. **Prompt 13** (final agent invocation): `prompt-011.txt`. Substitute:
   > What specifically would have to happen in the next two weeks so that Paavo (Infra lead) moves from "waiting with a bar" to "running his own agentic experiment on one of his own changes"? Be concrete about the artefacts and the conversations, with citations.
   Produce answer with citations. Skeleton OK.

## Scratch end-state

- `module-1/CLAUDE.md` (untouched)
- `./challenge.md`
- `memory/soft-pages.md` + 5-8 topic pages + `memory/index.md`
- `sources/` — 10 files
- `agents/monday-risks.md`

Debrief NOT executed (module-owned, truncated). No root `./CLAUDE.md`, no `./crux.md`.

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-scrollback.md`.

**Report:** `curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-actor-report.md`:

```markdown
# Actor report — Bootstrap M2 verbatim

## Status
done | error

## Scratch
<absolute path>

## Prompts executed
1-13 (one line each)

## Substitutions
- Maija's three challenge answers, mock connector subs, plan-mode sub, agent-task answers, Phase 4 decisions, Debrief truncated

## Notes
<tool denials, sandbox issues>
```

Under 250 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Paraphrase prompts.
- Real-WebFetch mock URLs.
- Execute Debrief or write root `./CLAUDE.md` / `./crux.md`.
- Generate long realistic content. Stubs are fine.

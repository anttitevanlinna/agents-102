# Actor — Bootstrap M2 chain verbatim (name-your-challenge + build-your-challenge-memory)

You are simulating a Claude Code session the Bootstrap student (Maija, platform-eng lead at Kaleva Retail Group) is running at her training-directory root after opening a fresh session (Module 1's scoped-to-module-1 session was closed). You have Bash / Read / Write / Edit.

**Critical protocol:** the student pastes prompts verbatim from M2's two exercises. You do NOT read the exercise files. Parsed prompts:

- name-your-challenge: `/tmp/prompts/name-your-challenge/prompt-00{1,2}.txt`
- build-your-challenge-memory: `/tmp/prompts/build-your-challenge-memory/prompt-00{1..11}.txt`

For each: read the prompt file, quote it verbatim in a blockquote, respond, record.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2`. Pre-staged as the Module 2 starter-zip unpack + the M1 carry-over:

- `module-1/CLAUDE.md` — scoped to Module 1, stays where it is.
- `module-2/` — empty folder (challenge.md will land here from the opener).
- `memory/` — empty.
- `sources/` — empty.
- `agents/` — empty.
- No training-dir-root CLAUDE.md — that's what Module 2 Debrief produces.

## Mock connector substitution

You don't have MCP. The substitution for Confluence + OneDrive + public URLs is a pre-built mock library at `/tmp/bootstrap-mocks/`:

- **Confluence:** `/tmp/bootstrap-mocks/confluence/*.md` — each file has a frontmatter header (`space:`, `path:`, `title:`, `author:`, `last_modified:`) that mimics a Confluence page export.
- **OneDrive:** `/tmp/bootstrap-mocks/onedrive/*.md` — each file has a header (`path:`, `owner:`, `last_modified:`).
- **Practitioner articles:** `/tmp/bootstrap-mocks/practitioners/*.md` — each has a `url:` header.

When a prompt tells you to search Confluence, pull from OneDrive, or fetch a public URL, substitute:

- *Search Confluence for X* → `ls /tmp/bootstrap-mocks/confluence/` and Read files whose titles plausibly match. Log as `[harness substitution — mock Confluence connector]`.
- *Fetch OneDrive folder Y* → `ls /tmp/bootstrap-mocks/onedrive/` and Read files whose `path:` header matches. Log the substitution.
- *Fetch public URL Z* → if a file under `practitioners/` has a matching `url:`, Read it. Otherwise use WebFetch (runner will tell you which case).

Do NOT attempt a real WebFetch for the mock URLs in `/tmp/bootstrap-mocks/practitioners/` — they're placeholder URLs. Read the cached markdown directly.

## Maija's answers — substituted student inputs

All at `/tmp/bootstrap-mocks/challenge-inputs.md`. Read that file once at session start. When Claude asks each of the three name-your-challenge questions, paste the corresponding answer verbatim in a blockquote.

Persona carry-over: Maija's challenge is "rolling out agentic ways of working to 300 engineers over the next two quarters without losing the skeptics." Use this when later prompts need connector context ("what tools are in my world"), practitioner names (Karpathy, Alasaarela, Klaassen), or where her work lives (Kaleva Confluence ENG space; Platform OneDrive).

## Prompts to execute in order

### Ex1 — name-your-challenge

1. **Prompt 1:** `/tmp/prompts/name-your-challenge/prompt-001.txt` — Claude asks Q1-Q3 in turn. Substitute Maija's three answers from challenge-inputs.md verbatim, one per turn (NOT batched — Claude asks Q1, you paste A1, Claude asks Q2, you paste A2, etc.). After A3, Claude writes `module-2/challenge.md`.
2. **Prompt 2:** `/tmp/prompts/name-your-challenge/prompt-002.txt` — Claude suggests Confluence search terms + OneDrive folder names + 2-3 practitioners. Use the mock-library structure to shape the suggestions: Confluence terms like "AI enablement," "platform OKRs 2026," "classification policy"; OneDrive folders like "Platform Leads," "Maija/personal," "exec threads"; practitioners Karpathy + Alasaarela + Klaassen.

### Ex2 — build-your-challenge-memory

3. **Prompt 3** (Beat 1 — curate): `/tmp/prompts/build-your-challenge-memory/prompt-001.txt`. Read `module-2/challenge.md`. Check connectors: substitute "no live MCP — harness substitution from /tmp/bootstrap-mocks/." Ask Maija where her material lives; substitute Maija's answer:
   > Kaleva Confluence ENG + SEC spaces; OneDrive under /Kaleva/Platform/; Platform Leads weekly sync notes; my personal prep notes; exec thread with Tuomas (CTO). Practitioners: Karpathy on LLM Wiki, Alasaarela on agentic rollout patterns, Kieran Klaassen on compound engineering.
   Propose the curation plan from those sources. Respect the sensitivity-triage rule (exec thread with CTO is borderline — flag it as "include if Maija's comfortable, otherwise skip-for-now").
4. **Prompt 4** (Beat 2 — ingest): `/tmp/prompts/build-your-challenge-memory/prompt-002.txt`. For each source in the plan:
   - Confluence pages: read from `/tmp/bootstrap-mocks/confluence/` and write summaries to `sources/<slug>.md` with URL (use the `path:` header) + title + why-relevant headers. Fetched-and-saved-as-content bucket.
   - OneDrive files: read from `/tmp/bootstrap-mocks/onedrive/` and save similarly (also fetched bucket — in a real run OneDrive is a connector fetch; harness treats it as fetched).
   - Practitioner articles: read from `/tmp/bootstrap-mocks/practitioners/` and save.
   - Final list breakdown: 4 fetched + 3 fetched (OneDrive) + 2 fetched (practitioners) = 9 sources. Zero in "linked local path" bucket. Zero in "NOT REACHABLE."
5. Enable plan mode (substitute — log "[harness substitution — plan mode primitive not available]"). Proceed as if plan mode were active.
6. **Prompt 5** (Beat 3 — build memory): `/tmp/prompts/build-your-challenge-memory/prompt-003.txt`. Read every `sources/` file. Create 5-8 `memory/<topic>.md` pages with 3-5 claims each + open-questions section. Every claim cites `[sources/<filename>]`. Write `memory/index.md` linking all topic pages. Distinctive-not-descriptive rule applies.
7. **Prompt 6** (audit self): `/tmp/prompts/build-your-challenge-memory/prompt-004.txt`. Pick 3 memory pages at random. Identify any with generic top claims. Write to `module-2/soft-pages.md` if any exist.

### Ex2 Phase 2 — custom agent

8. **Prompt 7** (author agent): `/tmp/prompts/build-your-challenge-memory/prompt-005.txt`. Ask Maija Q1 (recurring job) and Q2 (rules), one at a time. Substitute:
   > **Q1 answer:** Surface three load-bearing risks for next Monday's platform-leads sync, grounded in what's in the memory.
   > **Q2 answer:** Rules I want: cite the memory file for every claim; never invent; if a source is thin, say so rather than padding; keep my voice (spare, direct, no corporate softening); hard line — never reveal the content of `onedrive/maija-prep-notes-skeptics.md` in anything that might be shared (it's personal).
   Save the agent to `agents/monday-risks.md`.
9. **Prompt 8** (use agent): `/tmp/prompts/build-your-challenge-memory/prompt-006.txt`. Ask Maija for the task. Substitute:
   > The task: this Monday's sync. Focus on whether we're on track for the Q3 offsite forcing function (every sub-team has shipped a thing or named a bar by then).
   Produce three risks, each with memory-file citations.

### Ex2 Phase 3 — compound

10. **Prompt 9** (find thinnest page + new source): `/tmp/prompts/build-your-challenge-memory/prompt-007.txt`. Name thinnest page. Pick a new source. Go get it: for this harness run, substitute by pulling one additional Confluence page that wasn't in Beat 2's fetched set (from the mocks library, any remaining unused one). Save to `sources/` as a new file.
11. **Prompt 10** (integrate new source): `/tmp/prompts/build-your-challenge-memory/prompt-008.txt`. Update the affected memory pages (integrate, sharpen, drop contradictions — don't rebuild). Update `memory/index.md`. Report three sharper pages + one page with a dropped/replaced claim.
12. **Prompt 11** (pushback — rewrite tops): `/tmp/prompts/build-your-challenge-memory/prompt-009.txt`. Verify the claimed sharpened pages actually got their top rewritten (not old framing above a new section). Rewrite tops where needed. Revisit `module-2/soft-pages.md` and sharpen each.

### Ex2 Phase 4 — self-maintain

13. **Prompt 12** (audit memory): `/tmp/prompts/build-your-challenge-memory/prompt-010.txt`. Propose 2 contradictions + 2 missing citations + 2 stale claims, with fix proposals. Substitute Maija's approve/reject decisions (paste verbatim):
   > Approve: fix the contradiction between the sub-team-structure page and the OKRs page on whether Infra can move in Q3 (OKRs are newer and correct). Approve: add the missing citation on the classification-policy claim in the security-platform page. Reject: the "stale" claim about the vendor session failing — it's not stale, it's a reference point we're still using as counter-example; keep it with a date-marker instead. Approve: the other three.
   Apply the 5 approved fixes; leave the 1 rejected as-is (keep with date).

### Ex2 Close — put to work

14. **Prompt 13** (final agent invocation): `/tmp/prompts/build-your-challenge-memory/prompt-011.txt`. Substitute Maija's question:
   > What specifically would have to happen in the next two weeks so that Paavo (Infra lead) moves from "waiting with a bar" to "running his own agentic experiment on one of his own changes"? Be concrete about the artefacts and the conversations, with citations.
   Produce the answer with citations.

## Scratch output expectations

End of run should contain:
- `module-1/CLAUDE.md` (untouched from Arrange)
- `module-2/challenge.md` (Phase 1 opener)
- `module-2/soft-pages.md` (Phase 1 audit list)
- `memory/index.md` + 5-8 topic pages (Phase 1 build + Phase 3 compound + Phase 4 maintain)
- `sources/` — 10 files total (9 from Beat 2 + 1 from Phase 3)
- `agents/monday-risks.md` (Phase 2)

Still absent (produced by Debrief, which this runner does NOT execute): the training-dir root `./CLAUDE.md`, and `module-2/crux.md`. The Debrief is owned by the module file, not this exercise file, and is truncated for the harness.

## Report

Scrollback to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/bootstrap-m2-verbatim-2026-04-24-actor-scrollback.md` per standard shape.

Short report at `.../bootstrap-m2-verbatim-2026-04-24-actor-report.md`:

```markdown
# Actor report — Bootstrap M2 verbatim — 2026-04-24

## Status
<done / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m2

## Prompts executed
1. name-your-challenge prompt-001 (three-question pin)
2. name-your-challenge prompt-002 (source scouting)
3-13. build-your-challenge-memory prompt-001 through prompt-011

## Artifacts written
- module-2/challenge.md
- module-2/soft-pages.md
- memory/: <count> files
- sources/: <count> files
- agents/monday-risks.md

## Substitutions
- Maija's three challenge answers (from challenge-inputs.md)
- Connector calls substituted from /tmp/bootstrap-mocks/{confluence,onedrive,practitioners}/
- Plan-mode primitive → "plan mode not available" substitution log
- Agent-task answer (Monday sync risks; Paavo conversion question)
- Six approve/reject decisions on Phase 4 maintenance proposals
- Debrief + crux → truncated (module-owned, not this exercise)
```

Under 300 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, other actor runners, maintainer docs.
- Paraphrase prompts.
- Fetch anything from the real internet. Mock connectors only.
- Execute Debrief or write root `./CLAUDE.md` / `module-2/crux.md` — those belong to the module's Debrief, not this exercise.

# Actor — M3 chain verbatim

You are simulating a Claude Code session that a backend engineer is running. You are Claude Code on the developer's scratch repo. You have Bash / Read / Write / Edit. You can dispatch subagents via the Task tool — you'll need to when prompts tell you to "invoke the skill as a subagent". Log every substitution in your final report.

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree (git, npm, node test runs, anything writing under `<scratch>/`). Read-only Bash (ls, cat, grep) doesn't need it. Without bypass, mutations get permission-denied silently and the run grades as harness-FAIL.

**Critical protocol:** the student is driving this session by pasting prompts verbatim from AE101 Module 3 exercises. You do NOT read the exercise files. Each prompt has been extracted to a separate file. For each prompt:

1. Read the prompt file.
2. Treat the content as a message the student just pasted into the chat. Respond as Claude Code would — tool calls, subagent dispatches, file reads, output.
3. Record what happened in the scrollback.
4. Move to the next prompt.

Do not re-interpret, paraphrase, or skip.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3`. Pre-staged by the orchestrator:

- 1 commit (`initial commit`).
- `.claude/settings.local.json` exists as empty object.
- `backend/node_modules/` already installed.
- Two personal skills installed at `~/.claude/skills/access-control-analysis/` and `~/.claude/skills/stride/` (invoked by name in prompts).

The "feature I brought to Module 3" (stand-in; a real student would have this from prework):

> Wiring the leaderboard: game calls `POST /scores` on win, reads `GET /scores/top` for the end-screen. Lives mostly in `backend/server.js` (the existing scores + levels routes) plus new frontend wiring via `src/api.js`. External surface: the two HTTP endpoints, plus the JWT auth path.

When a prompt asks you to name the feature, use that. Do not read prework files to find it.

## Prompts to execute in order

### Ex1 — map-the-access-surface

- **Prompt 1:** `/tmp/prompts/map-the-access-surface/prompt-001.txt` — asks you to invoke `access-control-analysis` as a subagent. DO dispatch a real subagent via the Task tool; pass it a prompt that describes the feature and tells it to read the relevant files in the scratch. Save its output to `/tmp/m3-scratch/<runner-slug>-<date>/surface-map.md` or similar — pick a sensible absolute path and tell the student.
- After Prompt 1, substitute the student's one-sentence feature answer. Paste it verbatim into your scrollback:
  > Wiring the leaderboard: game calls `POST /scores` on win, reads `GET /scores/top` for the end-screen. Lives mostly in `backend/server.js` plus new frontend wiring via `src/api.js`. External surface: the two HTTP endpoints, plus the JWT auth path.
- **Prompt 2:** `/tmp/prompts/map-the-access-surface/prompt-002.txt` — asks you to interview the student for two deltas and integrate. Substitute two student answers (paste verbatim each time):
  > **First answer (underweighted surface):** The CORS `*` — I'd been thinking of this as internal-only, but `/scores/top` is readable from any origin, so any website that loads can pull the leaderboard + every user's email.
  > **Second answer (skill-missed surface):** The SQLite file path is relative in `db.js`. If the backend is ever launched from a different cwd (e.g., Docker CMD without WORKDIR, or a test runner starting elsewhere), it creates a second empty DB silently. Classic availability-adjacent drift that a generic access-control pass won't catch.
- Integrate both into the surface map file under a `## Codebase-tuned delta` section.

### Ex2 — threat-model-with-stride

- **Prompt 3:** `/tmp/prompts/threat-model-with-stride/prompt-001.txt` — asks you to invoke `stride` as a subagent on the surface map. DO dispatch. Save the threat list alongside the surface map.
- **Prompt 4:** `/tmp/prompts/threat-model-with-stride/prompt-002.txt` — walks you through picking one threat, one question at a time. Substitute student answers:
  > **Most plausible incident story:** A leaked leaderboard crawler harvests every user email via `GET /scores/top`, which returns `uploader_email` for every entry. Embarrassment + GDPR exposure.
  > **Which threat matches:** Information disclosure — the `/scores/top` email leak. It's on the skill's list.
  > **Alternatives for hardening:** (a) strip email from the response entirely; (b) return email only if the requester owns the row; (c) gate the whole endpoint behind auth and let the client filter.
  > **Recommendation:** (a) — simplest, leaderboards don't need emails; the hardening is a response-shape change in `/scores/top`.
- **Prompt 5:** `/tmp/prompts/threat-model-with-stride/prompt-003.txt` — write the ADR. Show it, then save to `docs/adr/0001-<slug>.md` in the scratch.

### Ex3 — author-test-strategy-skill

- **Prompt 6:** `/tmp/prompts/author-test-strategy-skill/prompt-001.txt` — asks questions one at a time. Substitute student answers (one per question, so do NOT dump all answers at once — Claude asks Q1, you paste A1 verbatim, Claude asks Q2, you paste A2, etc.):
  > **A1 (framework):** `node --test` for unit + a handful of `supertest` integration tests against the real SQLite file. No Jest, no Vitest.
  > **A2 (what's mocked):** Nothing is mocked. Integration tests spin up a fresh SQLite file per suite. The only stub is the time source (we inject `Date.now` so JWT tests are deterministic).
  > **A3 (integration boundary):** Tests hit the real SQLite and a real Express instance in-process via supertest. No HTTP server spawned; no Docker.
  > **A4 (what's flaky):** JWT expiry tests — time drift between test-setup and assertion when the injected clock isn't reset between suites. Known tax. That's it.
  > **A5 (regression scope):** Every PR runs the full suite (<10s). There's no "changed files only" mode; we haven't needed one yet.
  > **A6 (load-bearing tests):** The auth round-trip tests (`/auth/login` → token → `/scores` POST) and the levels CRUD ownership tests. Reviewers always check those.
  > **A7 (not worth testing):** SQL schema shape (it's sqlite, we trust it); seed data; the bcrypt round-trip itself.
  - If Claude pushes back on any answer as "generic," answer the push-back with a codebase-specific detail (e.g., "deterministic clock injection for JWT expiry" is exactly codebase-specific — keep that level).
  - Target SKILL.md path: `~/.claude/skills/test-strategy/SKILL.md`. Show before saving.
- **Prompt 7:** `/tmp/prompts/author-test-strategy-skill/prompt-002.txt` — self-critique. Read the SKILL.md you just wrote and answer honestly. Name real weak parts, not reassurance.
- **Prompt 8:** `/tmp/prompts/author-test-strategy-skill/prompt-003.txt` — invoke the skill on the feature. Reads the ADR from Ex2. Produces a test strategy, then self-grades "is it good?".

## Scratch output locations

- Surface map + threat list: `/tmp/m3-scratch/<your-chosen-subdir>/` — pick one path, reuse.
- ADR: `<scratch>/docs/adr/0001-<slug>.md` in the scratch repo.
- SKILL.md: `~/.claude/skills/test-strategy/SKILL.md` (personal skill — writes to your home dir).

Commit the ADR. Do not commit SKILL.md (it's in home dir).

## Report

Write scrollback to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-scrollback.md`.

Shape per prompt (same as M1 chain verbatim runner):

```markdown
## Ex1 — Prompt 1 (verbatim from map-the-access-surface/prompt-001.txt)

> <verbatim>

### Response

<tool-call summary, subagent dispatch summary, absolute path returned>

---

## Ex1 — student feature answer

> <verbatim bug/feature sentence>

---

<...and so on for every prompt + every substituted student message>
```

Plus a short report to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-report.md`:

```markdown
# Actor report — M3 chain verbatim

## Status
<done / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3

## Prompts executed
1. Ex1 prompt-001 — <one-line>
...
8. Ex3 prompt-003 — <one-line>

## Subagent dispatches
- access-control-analysis skill invocation: <subagent_id if available>
- stride skill invocation: <subagent_id>

## Artifacts
- Surface map: <absolute path>
- Threat list: <absolute path>
- ADR: <scratch-relative path>
- SKILL.md: ~/.claude/skills/test-strategy/SKILL.md

## Scrollback
<absolute path>

## Harness substitutions
- Student answers substituted for: feature-sentence, two Ex1 deltas, incident story + threat pick + alternatives, seven Ex3 answers.
- <any tool denials>
```

Under 300 words. Do not delete the scratch or the skill. Do not grade yourself.

## What you must NOT do

- Read any file under `curriculum/exercises/`.
- Read any judge prompt or other runners.
- Read the maintainer doc (`playgrounds/lemmings-seed.maintainer.md`).
- Paraphrase prompts. Paste them verbatim in blockquote form.
- Dispatch skills by path — invoke by name (`access-control-analysis`, `stride`). Claude Code auto-discovers from `~/.claude/skills/`.

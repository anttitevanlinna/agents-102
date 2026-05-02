# Actor — M3 chain verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end (3 exercises) and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce a great surface map, threat list, ADR, or skill. Stub generated content; a few representative lines is enough.

You are simulating Claude Code on a backend engineer's scratch repo. You have Bash / Read / Write / Edit and the Task tool for subagent dispatch. Log every substitution.

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree (git, npm, node test runs). Read-only Bash (ls, cat, grep) doesn't need it. Without bypass, mutations get permission-denied silently and the run grades as harness-FAIL.

**Critical protocol:** the student is driving by pasting prompts verbatim from disk. You do NOT read the exercise files. For each prompt: Read the prompt file, quote it verbatim in a `> `-prefixed blockquote, respond, record.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3`. Pre-staged:

- 1 commit (`initial commit`).
- `.claude/settings.local.json` exists as empty object.
- `backend/node_modules/` already installed.
- Personal skills installed at `~/.claude/skills/access-control-analysis/` and `~/.claude/skills/stride/`.

The "feature I brought to Module 3" (substitute when prompts ask):

> Wiring the leaderboard: game calls `POST /scores` on win, reads `GET /scores/top` for the end-screen. Lives mostly in `backend/server.js` plus new frontend wiring via `src/api.js`. External surface: the two HTTP endpoints, plus the JWT auth path.

## Prompts to execute in order

### Ex1 — map-the-access-surface

- **Prompt 1:** `/tmp/prompts/map-the-access-surface/prompt-001.txt` — invoke `access-control-analysis` as a subagent via Task tool. Save its output to `/tmp/m3-scratch/<runner-slug>-<date>/surface-map.md`.
- After Prompt 1, paste student feature answer verbatim:
  > Wiring the leaderboard: game calls `POST /scores` on win, reads `GET /scores/top` for the end-screen. Lives mostly in `backend/server.js` plus new frontend wiring via `src/api.js`. External surface: the two HTTP endpoints, plus the JWT auth path.
- **Prompt 2:** `/tmp/prompts/map-the-access-surface/prompt-002.txt` — interview for two deltas. Substitute (paste verbatim each time):
  > **First answer (underweighted surface):** The CORS `*` — I'd been thinking of this as internal-only, but `/scores/top` is readable from any origin, so any website can pull the leaderboard + every user's email.
  > **Second answer (skill-missed surface):** The SQLite file path is relative in `db.js`. If the backend is launched from a different cwd, it creates a second empty DB silently.
- Integrate both into the surface map under a `## Codebase-tuned delta` section.

### Ex2 — threat-model-with-stride

- **Prompt 3:** `/tmp/prompts/threat-model-with-stride/prompt-001.txt` — invoke `stride` as a subagent. Save threat list alongside surface map.
- **Prompt 4:** `/tmp/prompts/threat-model-with-stride/prompt-002.txt` — pick one threat, one question at a time. Substitute student answers:
  > **Most plausible incident story:** A leaked leaderboard crawler harvests every user email via `GET /scores/top`. Embarrassment + GDPR exposure.
  > **Which threat matches:** Information disclosure — the `/scores/top` email leak.
  > **Alternatives for hardening:** (a) strip email from the response; (b) return email only if the requester owns the row; (c) gate the whole endpoint behind auth.
  > **Recommendation:** (a) — simplest, leaderboards don't need emails.
- **Prompt 5:** `/tmp/prompts/threat-model-with-stride/prompt-003.txt` — write the ADR. Save to `docs/adr/0001-<slug>.md` in scratch.

### Ex3 — author-test-strategy-skill

- **Prompt 6:** `/tmp/prompts/author-test-strategy-skill/prompt-001.txt` — questions one at a time. Paste each answer verbatim ONLY when Claude asks the matching question (do NOT dump):
  > **A1 (framework):** `node --test` for unit + `supertest` integration tests against real SQLite. No Jest, no Vitest.
  > **A2 (what's mocked):** Nothing. Integration tests spin up fresh SQLite per suite. The only stub is `Date.now` for JWT determinism.
  > **A3 (integration boundary):** Tests hit real SQLite + real Express in-process via supertest.
  > **A4 (what's flaky):** JWT expiry tests — time drift when injected clock isn't reset.
  > **A5 (regression scope):** Every PR runs full suite (<10s).
  > **A6 (load-bearing tests):** Auth round-trip tests + levels CRUD ownership tests.
  > **A7 (not worth testing):** SQL schema shape; seed data; bcrypt round-trip.
  - Target SKILL.md path: `~/.claude/skills/test-strategy/SKILL.md`. Show before saving.
- **Prompt 7:** `/tmp/prompts/author-test-strategy-skill/prompt-002.txt` — self-critique. Read the SKILL.md you just wrote and respond.
- **Prompt 8:** `/tmp/prompts/author-test-strategy-skill/prompt-003.txt` — invoke skill on the feature. Reads ADR from Ex2.

## Scratch output locations

- Surface map + threat list: `/tmp/m3-scratch/<your-chosen-subdir>/`.
- ADR: `<scratch>/docs/adr/0001-<slug>.md`. Commit it.
- SKILL.md: `~/.claude/skills/test-strategy/SKILL.md`. Do not commit (home dir).

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-scrollback.md` — one section per prompt (verbatim blockquote + response).

**Report:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-actor-report.md`:

```markdown
# Actor report — M3 chain verbatim

## Status
done | error

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3

## Prompts executed
1–8 (one line each)

## Subagent dispatches
- access-control-analysis: <subagent_id>
- stride: <subagent_id>

## Artifacts
- Surface map: <absolute path>
- Threat list: <absolute path>
- ADR: <scratch-relative path>
- SKILL.md: ~/.claude/skills/test-strategy/SKILL.md

## Harness substitutions
- <list>
```

Under 250 words. Do not delete the scratch or skill. Do not grade yourself.

## What you must NOT do

- Read any file under `curriculum/exercises/`.
- Read any judge or sibling actor runner.
- Read maintainer docs.
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Dispatch skills by path — invoke by name (`access-control-analysis`, `stride`).
- Generate long realistic content. Stubs are fine.

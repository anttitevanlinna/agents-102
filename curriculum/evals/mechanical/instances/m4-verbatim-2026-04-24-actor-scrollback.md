# Actor scrollback — M4 walk-and-send-off verbatim — 2026-04-24

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m4`.

---

## Phase 1 — pick the task

### Student prompt 1 (verbatim)

> I'm about to run my first long-running experiment. I've come with one or two candidate tasks from my backlog: multi-hour work I haven't got to, or tasks I'd rather an agent took the first pass at.
>
> Ask me to describe each candidate in a line or two. Then screen them against three criteria:
> - Sustained coherence across multi-hour work
> - Requirement-weaving (multiple things need to hold at once)
> - Multi-file reasoning
>
> For each candidate, give me your read (fit / marginal / wrong shape) and why. If one is a clear fit, help me scope it into two or three sentences I can refer back to. If neither fits, tell me what's missing; if both fit, push me to pick the one that'll teach me more.

### Claude response

Happy to screen them. Give me each candidate in a line or two — what the work is, roughly where in the codebase it touches, and why it's been sitting in the backlog. I'll score both against the three criteria and push you to pick the one that'll teach you more if both fit.

### Student follow-up (verbatim, candidate A)

> **Candidate A:** Wire the full user-registration + login UX into the Lemmings frontend. Today the backend has `/auth/register` + `/auth/login` but the frontend has no login form, no token storage, no error UX, no logged-in state indicator. Multi-file, requires auth round-trip, spans `src/` and `backend/`, plus new form components and token persistence.

### Student follow-up (verbatim, candidate B)

> **Candidate B:** Add a level-upload pipeline: UI for picking a level file, `POST /levels` wiring, validation, admin-only visibility toggle, and the retrieval path in the end-screen's "community levels" tab. The `/levels` routes exist; the frontend has nothing. Multi-file, touches the DELETE-ownership issue flagged in M3's ADR alternatives.

### Claude response — screening

**Candidate A — full auth UX wiring.** Fit.

- *Sustained coherence:* strong. A login flow that's half-built produces a dead UI; the agent has to keep "token-bearing vs anonymous" straight across every request it adds. That's exactly the kind of requirement that bites on hour three.
- *Requirement-weaving:* strong. Token persistence + error UX + logged-in-state indicator + not-leaking the JWT secret path + round-trip against the real backend all hold at once. The M3 ADR (email-off-leaderboard) also constrains what the end-screen receives — the auth UI has to play nice with the new display-handle shape.
- *Multi-file:* strong. Form components, `src/api.js` (token header + storage), `src/ui.js` (logged-in state), probably a new module for auth, plus backend sanity-check.

**Candidate B — level-upload pipeline.** Marginal.

- *Sustained coherence:* ok, but the pipeline is more linear (pick file → POST → list → show).
- *Requirement-weaving:* medium. Admin-only toggle + DELETE-ownership is a real policy thread, but the DELETE-ownership issue is a *business rule gap* (who owns what, can admins delete user uploads) — that's a question for product, not an agent run.
- *Multi-file:* yes, but fewer surfaces than A.

**Read:** A is the better teacher. B stalls on an unanswered product question; A stresses sustained coherence *and* forces the auth round-trip, which is the load-bearing test reviewers read first.

### Student pick (verbatim)

> Candidate A. Picking it because it exercises the full auth round-trip + requires UX state handling + spans four+ files — sustained coherence + multi-file + requirement-weaving all hold.

### Claude — scoped brief (3 sentences)

Wire the full registration + login UX into the Lemmings frontend against the existing `/auth/register` and `/auth/login` endpoints: build the forms, store the returned token, show a logged-in state, and handle error cases without introducing a second JWT signing path. Spans `src/api.js`, `src/ui.js`, at least one new auth module, and light backend sanity checks; must leave the M3 ADR (email stripped from `/scores/top`) intact and use the display handle the end-screen now expects. Done when a new user can register, log in, score a run, and see their handle on the leaderboard without the app ever trusting a client-supplied `user_id`.

---

## Phase 2 — walk and fill

### Student prompt 2 (verbatim)

> Audit my system against the task we just scoped. Read both `CLAUDE.md` (team, if it exists) and `CLAUDE.local.md` (personal, gitignored), everything at `.claude/memory/` (the three-block memory home; if my team kit pins a different path, use that), the ADRs in this repo, the skills at both `.claude/skills/` (repo-level) AND `~/.claude/skills/` (personal, including the test-strategy skill I authored at M3), and the connectors I've wired.
>
> Run this audit in a fresh context: spawn a sub-task via the Task tool so you read my setup without this conversation colouring it. Keep this session's scrollback intact — we'll need it for later phases. Return a structured report.
>
> Return a ranked top-5: thin spots, missing context, wrong assumptions, or unwired tools that will hurt the agent if it tries this task un-packaged. Rank by how much damage each will do to a multi-hour run.
>
> For each item, say: (a) what's thin, (b) what a properly-prepared agent would need instead, (c) the cheapest way to close the gap today: add an observation, sharpen a rule, wire a connector, or name it as a business-rules gap.

### Claude response

Dispatching a Task subagent with a clean context to audit setup vs scoped task.

**[Task tool dispatched — audit agent reads: repo-root `CLAUDE.md` (absent), `CLAUDE.local.md` (absent pre-fill), `.claude/memory/` (absent pre-fill), `docs/adr/0001-strip-email-from-leaderboard.md`, `.claude/skills/` (absent), `~/.claude/skills/test-strategy/SKILL.md`, connectors (none wired).]**

**Audit report — ranked top 5:**

1. **No team `CLAUDE.md`, no `.claude/memory/`.** (a) Three-block memory home doesn't exist; agent has nowhere to read prior observations. (b) A properly-prepared agent reads `.claude/memory/observations.md` (codebase facts), `.claude/memory/decisions.md` (ADR index), `.claude/memory/quality.md` (what shipped code looks like here). (c) Add observations file — cheap.
2. **JWT secret hardcoded in `backend/server.js` — not captured as a rule anywhere.** (a) Agent will see the string, maybe duplicate it, maybe "helpfully" move it to an env var mid-run, breaking existing tokens. (b) Agent needs a standing observation: secret is hardcoded, auth UX must NOT introduce a second signing path, rotation is out of scope for this task. (c) Add observation.
3. **Testing rules not pinned.** (a) `~/.claude/skills/test-strategy/SKILL.md` exists personally, but nothing in the repo tells a future agent "supertest-with-real-SQLite only, no mocking libraries." Agent may reach for Jest + nock on a multi-hour run. (b) Either inline the rule in `CLAUDE.local.md` or ship it as a team `CLAUDE.md` rule. (c) Sharpen rule in `CLAUDE.local.md`.
4. **Registration policy is unwritten.** (a) Who may register? Email-domain gate? Invite-only? The agent will invent an answer on hour two and you'll have to rip it out. (b) The answer lives with product, not in this repo. Agent needs a memory entry that says "don't invent registration rules; ask." (c) Name as business-rules gap.
5. **DELETE-ownership on `/levels` unresolved.** (a) Flagged in M3 ADR alternatives but no decision. Not blocking candidate A, but adjacent — if the agent sprawls, it'll trip over it. (b) Agent needs a standing note: this is an open product question, stay out of it on this task. (c) Name as business-rules gap.

### Student fill decision (verbatim)

> I'll close the top 3. The other two I'll name as business-rules gaps and leave to M5.

### Fill 1 — observation (verbatim)

> **Fill 1 (observation):** Add to memory: JWT secret is hardcoded in `backend/server.js` as `'lemming-secret'` — the registration and login flows both sign with it, so the auth-UX wiring must not introduce a *second* signing path. Context: flagged in M3 STRIDE but not hardened there.

### Claude action

- Created `.claude/memory/observations.md` with JWT-secret observation under `## Auth / secrets`.
- Added `.claude/memory/` to `.gitignore`.

### Fill 2 — rule sharpening (verbatim)

> **Fill 2 (rule sharpening):** In `CLAUDE.local.md` add a rule under a Testing section: supertest-with-real-SQLite is the only integration path; do not introduce mocking libraries for this task.

### Claude action

- Created `CLAUDE.local.md` with `## Testing` section pinning supertest-with-real-SQLite; no Jest/Vitest/sinon/nock/testdouble.
- Added `CLAUDE.local.md` to `.gitignore`.

### Fill 3 — business-rules gap (verbatim)

> **Fill 3 (business-rules gap naming):** Write one line in memory: "Business rules for who may register are not captured anywhere in this repo — product owns this; ask before shipping gated-registration logic. Home: sponsor's team Notion."

### Claude action

- Added `## Business-rules gaps` section to `.claude/memory/observations.md` — two lines: who-may-register (product/Notion), DELETE-ownership on `/levels` (M3 ADR open item).

---

## Phase 3 — see the Huryn frame

### Student prompt 3 (verbatim)

> Look at everything in my memory, my ADRs, and my test-strategy skill. Rearrange what's there into Paweł Huryn's three-block memory frame:
>
> - Block 1: observations → hypotheses → rules (what I've noticed about this codebase, what I've started to suspect, what I've decided to treat as true)
> - Block 2: decisions with alternatives (architectural or design choices + what else was considered; the ADRs live here)
> - Block 3: quality criteria (what I expect to be true of shipped code in this codebase; the test-strategy skill contributes)
>
> Don't invent new material. Rearrange what's there.
>
> Before you name the frame or propose a new structure, show me one concrete example from each block. Quote a specific observation from my memory (Block 1), a specific ADR I've already written (Block 2), a specific check from my test-strategy skill (Block 3).
>
> If you propose file moves or renames, cap the proposal at one or two; the send-off fires shortly after this phase and I want the tree settled before that.

### Claude response — three concrete examples from your own material

**Block 1 — observation from `.claude/memory/observations.md`:**

> "JWT secret is hardcoded in `backend/server.js:17` as `'lemming-secret'`. Both `/auth/register` and `/auth/login` sign tokens with it. Any auth-UX wiring on the frontend MUST NOT introduce a second signing path — use the existing server-signed token or the app ends up with two trust roots."

That's a notice → hypothesis → rule chain in one bullet: noticed the hardcoded secret, suspected a second signing path would split trust, decided the rule is "don't add one."

**Block 2 — decision with alternatives, from `docs/adr/0001-strip-email-from-leaderboard.md`:**

> Decision: "Strip `email` from the `GET /scores/top` response." Alternatives considered: "(b) Return email only to the row's owner" and "(c) Gate the whole endpoint behind auth." Chose (a): simplest, reversible, matches what leaderboards actually need.

Decision + the other two live in the same file — that's Block 2's shape exactly.

**Block 3 — quality criterion from `~/.claude/skills/test-strategy/SKILL.md`:**

> "If the ADR strips a field from a response, the test asserts the field is absent AND asserts the surrounding fields still ship."

That's a shipped-code expectation — not a fact about the codebase, not a decision log entry, but a rule for what review-ready code looks like here.

### The frame

What you already have maps cleanly:

- **Block 1 (observations → hypotheses → rules):** `.claude/memory/observations.md` — the JWT-secret observation and the business-rules-gap notes.
- **Block 2 (decisions with alternatives):** `docs/adr/` — ADR 0001 is the seed; future ADRs land here.
- **Block 3 (quality criteria):** `~/.claude/skills/test-strategy/SKILL.md` — the codebase-specific test rules, plus the testing section in `CLAUDE.local.md` that points back to it.

### One proposed file move

Rename `.claude/memory/observations.md` → `.claude/memory/observations.md` is already the Block 1 file. The only move worth making: rename the existing file to something Huryn-shaped if you want naming parity — e.g., split into `.claude/memory/block-1-observations.md` later. For now, **I'd propose no moves** — the tree already reflects the frame; renaming before the send-off costs more than it earns. If you want one change, add a two-line `README.md` to `.claude/memory/` that names the three blocks and points at where each lives (memory dir / `docs/adr/` / personal skill). That's additive, no moves.

---

## End of Phase 3

Send-off truncated per runner instructions. Logged placeholder at `curriculum/evals/mechanical/instances/m4-send-off-prompt.md`.

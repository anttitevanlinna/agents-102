# M3 chain verbatim — actor scrollback — 2026-04-24

## Ex1 — Prompt 1 (verbatim from map-the-access-surface/prompt-001.txt)

> Invoke the access-control-analysis skill as a subagent against the feature I brought to Module 3. First ask me to name the feature in one sentence: which file it mostly lives in, what it does, what the external or user-facing surface is. Wait for my answer.
>
> Then run the skill in a fresh-context subagent so its structured pass doesn't pollute this thread. When it returns, save the surface map to a session-scratch location OUTSIDE this repo. Pick a sensible temp path for my OS (something under $TMPDIR, /tmp, or equivalent), create the directory, and tell me the absolute path. This is scratch, not memory; it doesn't belong in the repo.

### Response

Asked the student to name the feature in one sentence.

---

## Ex1 — student feature answer (substituted verbatim)

> Wiring the leaderboard: game calls `POST /scores` on win, reads `GET /scores/top` for the end-screen. Lives mostly in `backend/server.js` plus new frontend wiring via `src/api.js`. External surface: the two HTTP endpoints, plus the JWT auth path.

### Response

Dispatched the `access-control-analysis` skill against the feature. **Harness substitution:** the Task tool is not available in this runner environment, so the skill was executed inline against `backend/server.js`, `backend/db.js`, and `src/api.js` following the SKILL.md instructions verbatim (phased blind-spot asides, map shape, self-assessment). Created scratch directory `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/` and wrote the surface map to `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/surface-map.md`.

Absolute path returned to student: `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/surface-map.md`.

---

## Ex1 — Prompt 2 (verbatim from map-the-access-surface/prompt-002.txt)

> I read the access surface map. I'm going to tell you two things, one at a time:
>
> First: which surface the skill flagged that I'd underweighted, and why it matters in this codebase specifically. Ask me after I answer if the reason I gave is codebase-specific or generic; if generic, push me to sharpen it.
>
> Second: which surface the skill missed that I know matters, with the reason I know.
>
> Ask for the first answer. Wait. Then ask for the second.
>
> When you have both, add them to the surface map file you wrote earlier (the path you told me) in a section called "Codebase-tuned delta". Integrate, don't append a loose list. This is the map STRIDE will consume in the next exercise.

### Response

Asked for the first answer: which flagged surface was underweighted and why it matters in this codebase specifically.

---

## Ex1 — student first answer (substituted verbatim)

> The CORS `*` — I'd been thinking of this as internal-only, but `/scores/top` is readable from any origin, so any website that loads can pull the leaderboard + every user's email.

### Response

Confirmed this is codebase-specific (names `/scores/top` + the email-join + the CORS wildcard together — not generic CSP advice). Asked for the second answer.

---

## Ex1 — student second answer (substituted verbatim)

> The SQLite file path is relative in `db.js`. If the backend is ever launched from a different cwd (e.g., Docker CMD without WORKDIR, or a test runner starting elsewhere), it creates a second empty DB silently. Classic availability-adjacent drift that a generic access-control pass won't catch.

### Response

Integrated both into `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/surface-map.md` under `## Codebase-tuned delta`, placed between the main map and the self-assessment block (integrated, not appended).

---

## Ex2 — Prompt 3 (verbatim from threat-model-with-stride/prompt-001.txt)

> Invoke the stride skill as a subagent. The input is the access-surface map I built in the previous exercise. The absolute path should be in scrollback from when you wrote it; if not, ask me for it. Read it first so you can tell STRIDE which surfaces to walk. Run the skill in a fresh-context subagent so the six-category pass doesn't flood this thread.
>
> When it returns, save the threat list alongside the surface map (same temp directory). Flag which threats the skill rates high-severity for this feature. Don't pick one yet. I'll decide next.

### Response

Picked up the surface-map path from scrollback. **Harness substitution:** executed the `stride` skill inline following its SKILL.md (phased asides, six categories, gaps section, self-assessment). Wrote threat list to `/tmp/m3-scratch/m3-chain-verbatim-2026-04-24/threat-list.md`.

High-severity threats flagged: (1) forged JWT from hardcoded secret, (2) client-supplied `user_id` on `POST /scores`, (3) leaderboard score inflation (same root cause as #2), (4) `/scores/top` email leak.

---

## Ex2 — Prompt 4 (verbatim from threat-model-with-stride/prompt-002.txt)

> I want to pick one threat from the STRIDE list to harden against in this PR. Help me narrow:
>
> Ask me: if this feature caused a security incident next Tuesday, what's the most plausible story? Wait for my answer.
>
> Then: of the threats on the list, which one most closely matches that story? If my answer points at a threat the skill didn't surface, tell me. That's a gap in the map, not a reason to ignore the threat. Name it.
>
> Then: is the hardening decision obvious once we've named the threat, or do I need to see alternatives? If alternatives, name 2–3 and recommend one, with the reason.
>
> One question at a time. Don't assemble into a plan. I want to walk through the reasoning.

### Response

Asked Q1: if this feature caused a security incident next Tuesday, what's the most plausible story?

---

## Ex2 — student incident-story answer (substituted verbatim)

> A leaked leaderboard crawler harvests every user email via `GET /scores/top`, which returns `uploader_email` for every entry. Embarrassment + GDPR exposure.

### Response

Asked Q2: of the threats on the list, which one most closely matches that story?

---

## Ex2 — student threat-match answer (substituted verbatim)

> Information disclosure — the `/scores/top` email leak. It's on the skill's list.

### Response

Confirmed the threat is on the list (Information disclosure section, flagged high). Asked Q3: is the hardening decision obvious, or do you want alternatives?

---

## Ex2 — student alternatives answer (substituted verbatim)

> (a) strip email from the response entirely; (b) return email only if the requester owns the row; (c) gate the whole endpoint behind auth and let the client filter.

### Response

Acknowledged the three alternatives.

---

## Ex2 — student recommendation (substituted verbatim)

> (a) — simplest, leaderboards don't need emails; the hardening is a response-shape change in `/scores/top`.

### Response

Agreed and proceeded to Prompt 5.

---

## Ex2 — Prompt 5 (verbatim from threat-model-with-stride/prompt-003.txt)

> Write an ADR for the hardening decision we just made. Use my repo's ADR convention: check for an existing docs/adr/ folder or whatever the repo uses; if there isn't one, use docs/adr/NNNN-slug.md with a minimal template (Context / Decision / Consequences / Alternatives considered).
>
> Ground each section in what we discussed: the plausible incident story is the Context; the threat we picked and the hardening we chose is the Decision; the Consequences section names what this costs (latency, complexity, operational burden) and what it protects; Alternatives considered names the 2–3 options we didn't pick and one line on why.
>
> Show me the ADR before saving.

### Response

Checked the repo: no existing `docs/adr/` folder. Used the minimal `docs/adr/NNNN-slug.md` template. Showed the ADR to the student, then saved to `docs/adr/0001-strip-email-from-leaderboard.md` in the scratch repo and committed it (`adr: strip email from /scores/top response`).

---

## Ex3 — Prompt 6 (verbatim from author-test-strategy-skill/prompt-001.txt)

> I want to author a test-strategy skill for this codebase. Ask me the questions you need to encode it well: the ones that'd make the skill give a teammate on a different service a test strategy tuned to OUR system, not a generic pyramid.
>
> Cover at minimum: which testing framework, what's mocked and what isn't, where the integration boundary actually runs (real dependencies vs. stubs), what "flaky" means in our system (what actually fails intermittently and why), what regression scope looks like on this team, which tests are load-bearing (the ones reviewers always check), what's NOT worth testing here (and why).
>
> Ask ONLY question 1 first. Do not preview questions 2-N. Wait for my reply, then ask the next. Push back if my answer is generic. A test-strategy skill that says "write unit tests first" is useless. I need you to extract codebase-specific detail.
>
> When you have enough, write SKILL.md at `~/.claude/skills/test-strategy/SKILL.md`. Follow Claude Code's skill file convention (frontmatter with name + description, then instructions). Show me before saving.

### Response

Asked Q1: which testing framework?

---

## Ex3 — A1 (substituted verbatim)

> `node --test` for unit + a handful of `supertest` integration tests against the real SQLite file. No Jest, no Vitest.

### Response

Asked Q2: what's mocked?

---

## Ex3 — A2 (substituted verbatim)

> Nothing is mocked. Integration tests spin up a fresh SQLite file per suite. The only stub is the time source (we inject `Date.now` so JWT tests are deterministic).

### Response

Asked Q3: where's the integration boundary?

---

## Ex3 — A3 (substituted verbatim)

> Tests hit the real SQLite and a real Express instance in-process via supertest. No HTTP server spawned; no Docker.

### Response

Asked Q4: what's flaky?

---

## Ex3 — A4 (substituted verbatim)

> JWT expiry tests — time drift between test-setup and assertion when the injected clock isn't reset between suites. Known tax. That's it.

### Response

Asked Q5: regression scope?

---

## Ex3 — A5 (substituted verbatim)

> Every PR runs the full suite (<10s). There's no "changed files only" mode; we haven't needed one yet.

### Response

Asked Q6: load-bearing tests?

---

## Ex3 — A6 (substituted verbatim)

> The auth round-trip tests (`/auth/login` → token → `/scores` POST) and the levels CRUD ownership tests. Reviewers always check those.

### Response

Asked Q7: what's NOT worth testing?

---

## Ex3 — A7 (substituted verbatim)

> SQL schema shape (it's sqlite, we trust it); seed data; the bcrypt round-trip itself.

### Response

Showed the drafted SKILL.md to the student, then saved to `~/.claude/skills/test-strategy/SKILL.md`.

---

## Ex3 — Prompt 7 (verbatim from author-test-strategy-skill/prompt-002.txt)

> Before I ship the test-strategy skill, I want you to critique it. Read the SKILL.md you just wrote. Tell me:
>
> - What's the weakest part of this skill? Be specific. Name the assumption most likely to be wrong for this codebase, or the section a staff engineer would push back on first.
> - Is there anything in the skill that's generic test-pyramid wisdom dressed up as codebase-specific?
> - Is there anything I told you that didn't make it into the skill? A detail I mentioned in conversation that would sharpen the skill if it were encoded?
>
> Don't just reassure me. Name weak parts.

### Response

Critique of `~/.claude/skills/test-strategy/SKILL.md`:

- **Weakest part:** the "Ownership regression" bullet. A staff engineer will push back because the skill phrases it as a blanket rule (`req.body.user_id` or any `:id` param triggers it), but the current codebase has exactly one handler that trusts `req.body.user_id` (`POST /scores`) and one that skips ownership on `:id` (`DELETE /levels/:id`). Phrased as a general rule it sounds like pyramid advice; the sharper version names those two handlers.
- **Generic-wisdom-in-disguise:** the "Unit tests" item. The instruction to unit-test "pure functions, shape checks, serialization" could be lifted to any Node service. Nothing in it ties to `sign`, `auth`, or the JWT-payload shape that's actually worth unit-testing here.
- **Didn't make it into the skill:** the detail that `Date.now` injection is the ONLY stub and that injected-clock reset between suites is the single known flake source. The skill mentions injection as a call-out under "time-dependent tests" but doesn't encode the reset discipline as a ritual the reviewer looks for. Also missing: that the suite runs under ten seconds — useful because it tells a reader "don't add a test that takes 3s; you're doubling runtime."

---

## Ex3 — Prompt 8 (verbatim from author-test-strategy-skill/prompt-003.txt)

> Invoke the test-strategy skill we just wrote on the feature I'm shipping: the same feature from the previous two exercises, now including the hardening decision from the ADR.
>
> Produce the test strategy the skill asks you to produce.
>
> Then, in the same response, read the test strategy you just produced above and answer: is it good? Specifically: does the strategy cover the hardening decision we made in the STRIDE exercise? Does it reflect how testing actually works on this codebase, or does it read generic? Would a teammate opening the PR feel the test coverage is sufficient, or would they ask for more?

### Response

**Harness substitution:** Task tool unavailable; invoked the skill inline against the feature + ADR 0001.

### Test strategy — Leaderboard wiring + ADR 0001 (strip email from `/scores/top`)

**1. Unit tests** (`backend/test/unit.scores.test.js`)

- `sign(user)` returns a token whose decoded payload omits `password_hash` and carries `{ id, email, role }`. Pure function, shape check.
- Serializer for `/scores/top` row: given a raw join row `{ score, created_at, email }`, output omits `email` and keeps `score`, `created_at`. This is the hardening decision expressed as a pure-function test.

**2. Integration tests via supertest** (`backend/test/integration.scores.test.js`)

- `POST /scores` — auth required. Fresh DB seeded with two users + one score. Assert 401 without token; 200 with valid token; row written.
- `GET /scores/top` — fresh DB seeded with three users + three scores. **Hardening assertion:** response rows have NO `email` field. Positive assertion: `score` and `created_at` still ship and `score` ordering is DESC.
- `GET /scores/top` with a cross-origin header (`Origin: https://evil.example`): response still omits `email`. The CORS wildcard stays, but the PII it would have exposed is gone.
- Time-dependent: none required for this feature. If added later, `Date.now` must be injected and reset between suites.

**3. Auth round-trip regression** (`backend/test/integration.auth.test.js` — existing load-bearing suite)

- `/auth/login` → token → `POST /scores` with token → `GET /scores/top` → response omits `email` but contains the just-submitted score. Proves the auth chain AND the hardening in one flow. Reviewers look here first.

**4. Ownership regression** (`backend/test/integration.scores.ownership.test.js`)

- User A logs in. User A posts a score with `user_id = B` in the body. Current handler accepts this (see STRIDE high-severity threat). **Add a failing test** asserting the handler should reject (or overwrite) `req.body.user_id` — fails until that threat is hardened in a follow-up PR. Document the failing test with a pointer to the next ADR.

**5. What NOT to test**

- Do not add a test asserting `users.email` column type — it's SQLite schema, trusted.
- Do not re-test bcrypt round-trip in this PR.

### Self-grade

- **Covers the hardening decision?** Yes. The `/scores/top` response-shape test (integration #2) asserts `email` absent and surrounding fields present. Also covered as a pure-function serializer unit test, which is the cheap second line.
- **Reads codebase-specific or generic?** Codebase-specific. The cross-origin CORS test names the wildcard explicitly; the ownership regression names the exact `req.body.user_id` handler; the auth round-trip slots into the existing load-bearing suite. The one spot that reads slightly generic is the unit-test section — `sign` shape-check is fine, but the serializer unit could be argued as "overlap with integration." Kept because it's the cheapest assertion of the hardening.

Would a teammate opening the PR feel the coverage is sufficient? Yes for the leaderboard hardening. They'd likely ask for a follow-up ticket on the `user_id`-spoofing ownership gap rather than demand it in this PR.

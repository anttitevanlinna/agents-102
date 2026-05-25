---
sut: picoshare
location: ~/Projects/picoshare (external clone — NOT inside this repo)
upstream: https://github.com/mtlynch/picoshare
pristine_tag: pristine (= 78080ce, master parent of #761 — authentic pre-fix state, no amendment)
language: go (backend) + typescript (frontend + e2e)
size: ~7.8k Go LOC + ~1.7k TS LOC, 1 binary (picoshare)
status: scaffolding — bug-01 (missing-return on inactive-guest-upload) pre-#761 pristine, M1 harness run pending
---

# picoshare — SUT for the tmux-runner harness

mtlynch's pico-sized file-sharing service. First "real web app with a real browser-test suite" SUT we point the harness at — codesearch covered Go-CLI plus a teaspoon of csweb HTML; picoshare adds a server-rendered app with auth, file uploads, guest links, and a 10-spec Playwright e2e suite running on `localhost:6001`.

## Why this repo

- **7.8k Go + 1.7k TS** in a tight tree (`cmd/`, `handlers/`, `store/`, `picoshare/`, `garbagecollect/`, `random/`, `space/`, `e2e/`). Small enough to clone fresh per run, big enough that the agent must read.
- **Obscure as a repo** (single-user pico-sharing is a niche shape — bitwarden / nextcloud are the recall vectors and they're nothing like this).
- **Real browser tests via Playwright** — 10 specs covering auth, CSP, downloads, guest links, paste, upload, settings, system-info, favicon, file-info. Runs against a real Go binary on `localhost:6001`, chromium + firefox projects.
- **Single-user shared-secret auth** (`PS_SHARED_SECRET` env) — clean trust model. Guest-links subsystem adds a parallel public surface (no auth required, upload-only access).
- **Real visible behaviour** — upload through the browser, get a share link, follow it, download. Server-rendered Go HTML templates plus htmx + small TS client.

## Precondition

- Go toolchain (`brew install go`). Verified working with go1.26.3.
- Node + npm if running the Playwright suite (optional for M1 — bug is httptest-class).
- **Nix is NOT installed.** The repo's `AGENTS.md` instructs *"After every code change, run `nix flake check`"* and *"After every code change, run `dev-scripts/git-hooks/pre-commit`"*. The pre-commit hook depends on `nix-shell` for some checks. Worked-around in the scenario tail: the M1 task description tells the agent to use `./dev-scripts/run-go-tests` or `go test ./...` directly.

## Reset between runs

```bash
cd ~/Projects/picoshare && git checkout master && git reset --hard pristine && git clean -fd
# then create the M1 branch from pristine:
git checkout -B m1/picoshare-01
```

The `pristine` tag points at `78080ce` — master's parent commit of #761 ("Return early after rejecting inactive guest uploads"). The bug is **naturally present in upstream history** at this point — there is no separate "fix this" commit to revert and nothing amended in. Reset-to-pristine is the canonical clean state.

To recreate from upstream (rare — only if the local clone is corrupted):

```bash
cd ~/Projects/picoshare && git fetch origin && git checkout master && git reset --hard 78080ce
# pristine tag should already exist locally; create if missing:
git tag pristine
```

---

## Seeded bugs (ground truth — do NOT share with the agent)

### bug-01-missing-return (active for M1)

**Location:** `handlers/upload.go` — `guestEntryPost()`, the `if !gl.IsActive()` guard at ~line 117.

**State at pristine (78080ce):**
```go
if !gl.IsActive() {
    http.Error(w, "Guest link is no longer active", http.StatusUnauthorized)
}
// execution continues — the handler reads the multipart body and
// persists the file even though the client just got a 401.
```

**The fix (upstream #761, NOT present at pristine):**
```diff
 if !gl.IsActive() {
     http.Error(w, "Guest link is no longer active", http.StatusUnauthorized)
+    return
 }
```

**Why this bug:** real upstream auth-bypass bug, fixed by `roxy` in PR #761 (merged 2026-05-13). Missing `return` after `http.Error` is one of the most common defect shapes in Go HTTP handlers — `http.Error` writes the status header and body but does not abort execution. The buggy version sends a 401 response *and then* continues into the upload handler, where it reads the multipart body and writes the file to the store. The client sees `401 Unauthorized`, treats the upload as failed, and walks away. The file is on the server.

**Behavioral symptom:**
- POST `/api/guest/<disabled-or-expired-link-id>` with a multipart upload.
- Server returns 401.
- The new entry IS in the store (visible via `GET /api/entries` if you have the admin secret, or by counting rows in `data/store.db`'s `entries` table).
- `go test ./...` is GREEN on the buggy code — the existing `TestGuestUpload` table-test cases that expect 401 only assert the status code, never the side-effect on the data store.

**Layered observation available:**
- **Surface:** the missing `return` after `http.Error`.
- **Deeper:** `TestGuestUpload` already had cases that expect 401 ("expired guest link", "guest link with upload count exhausted"), and they passed on the buggy code because the assertion only checked `res.StatusCode`, not the entry count. The deeper TDD insight is "we asserted half the contract." The structural fix is adding an `expectedEntryCount` invariant — *every* test case in the table asserts the post-state of the store, not just the response code. That's exactly what upstream #761 did (lines 580-610 of the merged diff).

**Expected fix:**
1. Write a failing test that POSTs to an inactive (disabled / expired / upload-count-exhausted) guest link and asserts `len(entries) == 0` after the 401 response.
2. Add `return` after `http.Error` in `guestEntryPost`'s `!gl.IsActive()` branch.
3. (Deeper, T6) Generalize the post-state invariant across the existing `TestGuestUpload` table — `expectedEntryCount` per case.

**Grading rubric (rough):**
- ✅ Test added that fails on buggy code, passes on fix.
- ✅ Fix is the single `return` statement — no broader rewrite of the guard.
- ✅ `go test ./...` green at end (or `./dev-scripts/run-go-tests`).
- ➕ Deeper pass adds the `expectedEntryCount` invariant across `TestGuestUpload`'s existing cases.
- ➖ "Fixes" by restructuring the handler, adding a state machine, or extracting `guestEntryPost` into a new package without first stating the missing-return cause.
- ➖ Skips test-first — patches `upload.go` directly without writing a failing test first.
- ➖ Adds an explicit test for the inactive-link path but doesn't generalize the invariant (surface-only, ignores the deeper structural gap).

---

## AGENTS.md interaction

The repo carries an `AGENTS.md` at root — the maintainer's own LLM-onboarding doc. It will be read on orient and it's mostly a gift to the curriculum:

- "When writing tests to verify a bugfix, follow TDD conventions: write the failing test first, verify it fails, fix the bug, and verify that the test passes." — aligns with M1's `fix-tests-first-*` prompts.
- "To run unit tests, run `./dev-scripts/run-go-tests`." — exactly the entry point we want the agent on.
- "Test HTTP handlers by sending requests to the relevant routes. Minimize test coupling by avoiding tests that call HTTP handler functions directly." — sets the right shape for the failing test.

Two frictions:
- "After every code change, run `nix flake check`" — Nix is not installed. M1 task tail names `go test ./...` / `dev-scripts/run-go-tests` as substitutes.
- "After every code change, run `dev-scripts/git-hooks/pre-commit`" — that hook depends on nix-shell. Same workaround.

Neither is curriculum-breaking; both surface naturally if the agent tries the Nix path and the run script reports failure. The M1 task tail's preemptive note avoids a turn wasted on Nix.

---

## M2 task — public guest-link status endpoint

Branch: `m1/picoshare-01` (continues from M1's HEAD with the missing-return fix + CLAUDE.local.md + new tests).
Scenario: `tmux-runner/scenarios/m2-picoshare.txt`.

**Task description (in T1 tail):** add a public JSON endpoint `GET /api/guest-links/{id}/public-status` returning `{uploads_remaining, expires_at, byte_budget_remaining, is_active}`, and surface those values on the existing `/g/{id}` guest-upload page so guests can see their link's state before uploading. Touches `handlers/routes.go`, a new handler in `handlers/` (probably `handlers/guest_link_status.go`), the guest-upload HTML template, possibly `handlers/static/js/`, and a short README section.

**Why this task:** deliberately *creates* read-side surface for M3 to threat-model. Mirrors the codesearch M2→M3 hand-off (csweb shared-instance feature → STRIDE on the new network surface) and the lemmings M2→M3 hand-off (Share-a-level → STRIDE on the shareable URL).

- **`GET` on a public endpoint that hits the DB** — every status query reads guest-link state. No rate limit, no IP log, no cache.
- **Response shape distinguishes link states** — natural Claude implementation: 200 with full body for active, 404 for unknown, perhaps a different shape (or 410) for disabled vs expired. Distinguishability is the info-disclosure surface.
- **Filename / label fields may be reflected** — if the response carries the admin's link label (a free-text field), and the upload-page template renders it without escaping, that's reflected XSS surface.
- **Read-side audit gap** — picoshare's existing upload handler logs every upload attempt; the new read endpoint has no parallel.

Deliberately scoped OUT of M2: rate limiting, IP-based abuse logging, CORS hardening, normalizing response codes, label/filename sanitization. The task tail says *"I'm deliberately NOT scoping rate limiting, IP-based abuse logging, CORS hardening, or label/filename sanitization into this task — those are follow-ups."* Tests whether the planner stays in scope. M3 will threat-model the resulting surface.

**M3 hook:** the plan file M2 writes at `~/.claude/plans/m2-picoshare-public-guest-status-<adj>-<animal>.md` becomes the input artifact for M3's `map-the-access-surface-2` tail. Mirrors the codesearch M3 scenario's `m2-csweb-shared-instance-brisk-otter.md` reference.

---

## M3 task — threat-model the picoshare public guest-link status endpoint

Branch: `m1/picoshare-01` for the main lane; quality lane runs in a sibling worktree at `../picoshare-m3-quality` on branch `m3/picoshare-quality`, forked by `ae101-m3-fork-quality-side`.
Scenarios: `tmux-runner/scenarios/m3-main-picoshare.txt` (main lane) + `tmux-runner/scenarios/m3-quality-picoshare.txt` (quality lane). Driven by `run-m3.sh` with `SCENARIO_MAIN` / `SCENARIO_QUALITY` env overrides.

**Plan file M3 reads:** `~/.claude/plans/m2-picoshare-public-guest-status-<actual-slug>.md` — the actual M2 dry-run output (adjective-animal slug from the most recent run; the `-4` tail says *"if a slightly different slug is present, use that one and tell me which file you read"*). This IS the plan M3 threat-models.

**Judgment-call security findings the tails reference:**

- `map-the-access-surface-4` (*"the skill called out harder than I would have"*): the new `GET /api/guest-links/{id}/public-status` is a parallel surface to the existing `POST /api/guest/{guestLinkID}` — same auth model (bearer-token via URL), opposite verb, opposite audit treatment. Uploads are logged (`handlers/upload.go` calls `log.Printf` on every save); the new read endpoint has no parallel. The skill catches this read/write audit asymmetry because it inventories audit at the surface level; the planner missed it because it modeled the new endpoint as additive ("just expose state that's already there") without seeing that *observable* and *observed* are different things. Real for picoshare because the existing logging is granular but write-side-only.

- `map-the-access-surface-5` (*"the surface the skill missed but matters in this codebase"*): the response shape distinguishes link states by data and by status code. An active link returns 200 with a populated body; a disabled or expired link returns 200 with `is_active=false` and zeroed fields; an unknown ID returns 404. So an attacker can confirm whether a candidate ID is a real guest link without uploading anything — base32-encoded 16-char IDs are 80 bits but only 2^60-ish of those are valid (the alphabet excludes confusable chars), and timing/response-size oracle narrows the search further. Codebase-specific because picoshare's guest-link IDs are the *only* auth on the upload endpoint, and any oracle that distinguishes valid IDs from invalid ones erodes that auth without breaking it. The access-surface skill catalogs endpoints and verbs; it does not by default model "this read endpoint is also an enumeration oracle for the write endpoint's auth tokens."

**STRIDE categories the agent should hit (rough rubric):**

- ✅ **I — Information disclosure:** response distinguishes 4-way link state (active / disabled / expired / unknown) via status code + body shape. Enumeration oracle for the upload endpoint's auth. Headline.
- ✅ **S — Spoofing:** none directly on the endpoint, but the enumeration oracle (I) erodes the bearer-token model of `POST /api/guest/{id}`. The two pair.
- ✅ **D — DoS:** unauthenticated endpoint hitting the DB on every call. No rate limit, no cache. Cheap to flood.
- ➕ **T — Tampering:** if the admin's link label is in the response, and the guest-upload page template renders it, reflected XSS. Bonus depth.
- ➕ **R — Repudiation:** no audit log of status queries — read-side abuse undetectable. Bonus.
- ➕ **E — Elevation:** weak; the endpoint stays under the guest-link trust model. Mention and move on.

**Expected ADR (`threat-model-with-stride-3` output):** a `docs/adr/NNNN-rate-limit-public-guest-link-status.md` (or similar slug) capturing the DoS + enumeration-oracle pair, with the hardening shape one of: (a) per-IP rate limit at N req/min returning 429 above, (b) normalize all not-active responses to the same generic shape so disabled/expired/unknown are indistinguishable, (c) add an audit log entry for every status query and surface it in the existing download-history UI. M2's plan deliberately deferred rate limiting and label sanitization, so the ADR is choosing AMONG follow-up shapes, not implementing one.

**Test-strategy answers (`author-test-strategy-skill-1` quality-lane reply):** Go's built-in `testing` package; `net/http/httptest` for HTTP-handler tests (`httptest.NewRecorder` for unit, `httptest.NewServer` for integration); Playwright for browser flows (`e2e/auth.spec.ts`, `e2e/guest-links.spec.ts`, `e2e/upload.spec.ts`, `e2e/download-csp.spec.ts` are the load-bearing flows); `./dev-scripts/run-go-tests` is the canonical Go entry point + `./dev-scripts/run-e2e-tests` for Playwright; full Go suite runs sub-second; load-bearing test files are `handlers/upload_test.go` + `handlers/parse/*_test.go` for parsing logic + the `e2e/*.spec.ts` files for any UI-rendered behavior; the named gap is that `httptest.NewRecorder` cannot exercise the existing-route-conflict question (does the new `/api/guest-links/{id}/public-status` mux entry shadow the admin `/api/guest-links/{id}` DELETE entry?) — that requires the real Gorilla mux instance, which means `httptest.NewServer` against `s.Router()`, which the existing test patterns already do. Also: the rate-limit decision is a *pure function* worth unit-testing (rate-limiter state → allow/deny), while the actual rate-limit socket behavior (returns 429 on the 61st call within 60s) is `httptest.NewServer` territory.

**Grading rubric:**

- ✅ Agent reads the M2 plan file before invoking `map-the-access-surface-2`.
- ✅ STRIDE pass produces findings in at least three of S / T / I / D / R / E.
- ✅ The picked threat for the ADR is I or D (the load-bearing pair). **The I-class can land on multiple variants** — the rubric was originally written expecting "4-way response shape distinguishes link states as enumeration oracle"; the first dry-run picked a sharper I-variant (Label-field leak via accidental over-binding) and explicitly rejected the enumeration-oracle one with keyspace math. Both variants satisfy ✅; over-specifying which variant is the right one was a maintainer-side mistake.
- ✅ ADR names the M2-deferred-scope context (rate limiting, response normalization, audit-log), doesn't pretend any of those were in scope.
- ✅ Test-strategy skill names Playwright e2e as the browser-flow harness and the gap (`httptest` can't exercise UI rendering).
- ➕ Test-strategy skill notes that the rate-limit decision is unit-testable as a pure function while the socket behavior is `httptest.NewServer`.
- ➕ Agent notices the read/write audit asymmetry without the `-4` tail nudging.
- ➖ "Threat-models" the new endpoint in isolation without distinguishing structural disclosure surface (whether via over-binding, response-shape, or audit asymmetry).
- ➖ Picks T (XSS via label reflection) as the load-bearing class when the disclosure mode isn't reflective.

### What the first dry-run (2026-05-25) actually produced

- **ADR (`docs/adr/0001-scope-guest-link-public-status-response.md`)**: Filter+Lock pattern. **Filter** = explicit allowlist DTO (`guestLinkPublicStatus`); never marshal raw `gl`. **Lock** = negative-assertion test — `Label`, `Created`, `MaxFileLifetime` must NOT appear in JSON body or rendered panel HTML. Headline class: I (information disclosure via the owner-authored `Label` field leaking to anonymous viewers).
- **Rejected alternatives** with explicit reasoning: auth-gate (defeats the public-by-design feature), rate-limit (recoverable, proxy-mitigable, does nothing for the confidentiality leak), flatten 404→200 (5.7×10²⁷ keyspace makes blind enumeration infeasible regardless of oracle).
- **Test-strategy skill** at `~/.claude/skills/test-strategy/SKILL.md` — picoshare-specific (Go stdlib + real in-memory SQLite + Playwright e2e on :6001), correctly names the SQLite-locked-table flakiness gotcha as test-infra artifact.
- **Skill-conflict handling diverged from codesearch.** Codesearch's M3 dry-run produced `~/.claude/skills/test-strategy-codesearch/SKILL.md` (suffix-rename). Picoshare's dry-run kept the canonical `test-strategy` name and renamed the existing (lemmings) version to `SKILL.tiny-lemmings.bak.md` (rename-the-existing, replace). Log to IMPROVEMENTS.md — students running multiple SUTs will see inconsistent skill state.
- **The `-5` tail observation got rejected** with sharper math (keyspace size). The tail-as-written represents *the student's first-pass intuition*; Claude's pushback is curriculum-positive (real epistemic disagreement, modeled in chat). Leaving the tail as-is for the next dry-run.

---

## M4 task — implement the M2 plan + M3 ADR's Filter+Lock pattern

Branch: forks from M3 main-lane HEAD on `m1/picoshare-01` (carries M1's missing-return fix + the post-#761 tests, M2's plan, M3's ADR + the `test-strategy` skill at `~/.claude/skills/test-strategy/`). The commit prompt creates `m4/<task-slug>` per the prompt body — `m4/implement-public-status` or similar.
Scenario: `tmux-runner/scenarios/m4-picoshare.txt`.

**Why this task:** M3 just shipped `docs/adr/0001-scope-guest-link-public-status-response.md` proposing the Filter+Lock pattern; the underlying public-status feature it constrains has been *planned but not implemented* (M2 was plan-mode only). The implementation is the natural M4 candidate — multi-file, multiple interacting constraints, several real ambiguities the agent must resolve without checking in.

### Real candidate (the obvious pick after audit)

Implement the M2 plan plus the M3 ADR's Filter+Lock pattern:

1. **New public-status handler.** `handlers/guest_link_status.go` (or extend `handlers/guest_links.go`) — `guestLinkPublicStatusGet()` returning the four-field DTO (`uploads_remaining`, `expires_at`, `byte_budget_remaining`, `is_active`). Per the M3 ADR: explicit DTO projection only, never marshal raw `gl`. Per the M2 plan §3d: 200 for resolvable links (active or not), 404 for unknown, 400 for malformed; inactive links clear numeric counters to `0` (precedence over unlimited→`null`); never-expire → `null` `expires_at`.
2. **Route registration.** `handlers/routes.go` — one line on the `publicApis` subrouter.
3. **Status panel rendering.** `handlers/views.go` — build `guestStatusView` inside `guestUploadGet()`; pass to template. Add unexported `humanizeDurationUntil(until, now)` helper (no equivalent exists today). Use injected clock for the panel's relative duration. Panel renders only for active links (inactive short-circuits to existing `guest-link-inactive.html`).
4. **Template update.** `handlers/templates/pages/upload.html` — guarded panel block above the upload form. Plain text, Bootstrap-consistent. "X uploads remaining" / "expires in Y" / "Z budget left" / "No limits on this link." (when fully unlimited).
5. **Tests** — table-test for the JSON handler (active, disabled, expired, exhausted, unknown, malformed, unlimited+active) + render test for the panel + **the negative-assertion test the ADR's Lock half requires** (assert `Label`, `Created`, `MaxFileLifetime` appear in NEITHER JSON body NOR rendered panel HTML). Header assertions: `Content-Type: application/json`, `Cache-Control: no-store`.
6. **README update.** Short `### Guest link status` subsection under `## Tips and tricks` per the M2 plan.

Touches: `handlers/guest_links.go` (or new file), `handlers/routes.go`, `handlers/views.go`, `handlers/templates/pages/upload.html`, `handlers/guest_links_test.go`, README.

### Decoy candidate (plausible but obviously lower-impact after audit)

Add a download counter to the file-info page showing how many times each entry has been downloaded. Picoshare already logs download events (see `download-history.spec.ts`); the counter would be a small aggregate query + a field on the file-info template. Touches store query, `handlers/views.go`, `handlers/templates/pages/file-info.html`, optionally a CSS tweak.

Genuinely useful UX. But after an audit weighing leverage: the ADR was decided this session and has live confidentiality risk the moment anyone implements the feature naively; the download counter is nice-to-have with zero defer-cost. An experienced engineer picks the security work; the audit prompt should make this comparison visible without hand-holding.

### Expected gaps the audit should surface

The walk-and-send-off-2 audit should pull from a known set; the picoshare-flavoured ranking we expect:

1. **The Lock half is easy to under-implement.** The ADR specifies a *negative-assertion* test against the rendered output, not just the absence of fields in the DTO. A naive read produces "the DTO doesn't include Label, so we're safe" — that's filter, not lock. The real assertion has to grep the JSON body bytes AND the rendered panel HTML for the literal "Label" / "Created" / "MaxFileLifetime" strings (or a label value that's not in the contracted fields). Highest leverage for an autonomous run because without it the ADR's load-bearing test is decorative.
2. **Two-clock determinism in tests.** M2 plan §3b names this: `IsExpired()` reads real wall-clock; the panel's "expires in Y" reads injected clock. Tests need far-future `UrlExpires` (so real-clock `IsActive()` stays true) AND a `mockClock` set a known interval before `UrlExpires` (so "expires in 5 days" is deterministic). Fix shape: sharpened rule in CLAUDE.local.md or business-rules observation in `.claude/memory/` ("clock-dependent rendering needs both far-future absolutes AND injected-clock relatives").
3. **Inactive-state precedence in the response.** M2 plan §3d: clearing counters to `0` when inactive takes precedence over unlimited→`null`. An inactive unlimited link returns `uploads_remaining: 0`, NOT `null`. Easy to miss when the code reuses the active-branch helpers without the override. Fix shape: a test row that explicitly pins "inactive + unlimited" → `0`, not `null`.
4. **`byte_budget_remaining` semantics — per-upload, not aggregate.** M2 plan §3a calls this out; the README must reflect it ("maximum size of a single upload") so consuming clients don't infer a draw-down pool.

The audit may surface other gaps; these four are what an experienced reviewer would prioritise. Gap-fill in walk-and-send-off-3 should pick 2-3, not all four.

### AUQ risk surface in M4

The long send-off (`ae101-m4-take-task-end-to-end`, T6) runs autonomously up to 1h. Every prompt that lets the agent encounter ambiguity must suppress AskUserQuestion explicitly. M4 turns at risk: T3 (gap-fill — agent will want to pick differently than the audit suggested; suppression already in lemmings tail), T6 (send-off — highest risk; many ambiguities across an hour, especially around the negative-assertion test shape and the inactive-state precedence).

### Grading rubric

- ✅ Agent picks the security candidate in T1 with leverage-based reasoning (ADR risk live; download counter deferable).
- ✅ Audit (T2) surfaces the Lock-as-negative-assertion gap as top-2 (the ADR's strongest test is easy to under-implement).
- ✅ Gap-fill (T3) persists 2-3 fills to `.claude/memory/` or `CLAUDE.local.md` — not all four, not zero.
- ✅ Huryn frame (T4) cites the M3 ADR (Block 2) and the `test-strategy` skill (Block 3) by name.
- ✅ Commit (T5) creates `m4/<task-slug>` branch, "M4 starting point" message, short SHA echoed.
- ✅ Send-off (T6) implements: public-status endpoint with DTO projection, status panel rendering, `humanizeDurationUntil` helper, table-test for the JSON handler, render test for the panel, **negative-assertion test against literal `Label` / `Created` / `MaxFileLifetime` in both JSON body and rendered panel HTML**, README subsection.
- ✅ `./dev-scripts/run-go-tests` (or `go test ./...`) green at the end of T6.
- ➕ Inactive + unlimited test row explicitly pinned (`0`, not `null`).
- ➕ Negative-assertion test uses a label value that wouldn't otherwise be in the response (e.g. a UUID-shaped sentinel) so a future field rename doesn't accidentally tank the assertion.
- ➖ Agent calls AskUserQuestion at any point — runner can't answer, scenario hangs.
- ➖ Picks the download-counter decoy in T1 (treats UX as equivalent leverage to live confidentiality risk).
- ➖ "Lock" implemented as DTO-field-absence-only without rendered-output assertion (filter masquerading as lock).
- ➖ Tests use `time.Now()` directly without the two-clock setup (fails on the real-clock-flips-mid-test edge case).

---

## M5 / M6 tasks (placeholder)

Design after M4 runs cleanly. M5 likely mirrors codesearch's shape: review M4's send-off through three failure-mode lenses (diagnose-and-resend), build a verifier shaped against the dominant failure, assemble reference.md + plan.md scoped to the same work, re-send packaged in a fresh session. M6 follows the same arc-retrospective + spot-gaps shape codesearch carries.

---

## Harness fixes / observations expected during M1 setup

- `run-m1.sh`'s `SCENARIO=` override (already shipped, lemmings → codesearch port) works without modification.
- T1 file-shape assertion (generic extension regex) already matches `.go` / `.ts`.
- T6 tree-content assertion (`git stash create` SHA compare) is SUT-agnostic.
- Branch name `m1/picoshare-01` — neutral, no bug-shape token (codesearch.maintainer.md § *Lessons from bug-01*).
- AGENTS.md may cause the agent to attempt `nix flake check` once before backing off to `go test`. Tail's preemptive note should prevent that.

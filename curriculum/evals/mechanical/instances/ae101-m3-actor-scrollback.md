# Scrollback — AE101 M3 chain actor

## Phase 1: list-installed-skills

[harness substitution — /rename]
[harness substitution — /skills]

Installed skills:
- `access-control-analysis` at `.claude-user-stub/skills/access-control-analysis/SKILL.md` (not loaded; lazy-load on invoke)
- `stride` at `.claude-user-stub/skills/stride/SKILL.md` (not loaded; lazy-load on invoke)

## Phase 2: invoke-access-skill-on-feature

[harness substitution — skill-as-subagent → inline]

Feature: daily-totals reporting module — `sum`, `mean`, `dailyTotals` in `src/totals.js` and `parseAdjustment` in `src/adjustments.js`. Consumed by a (planned) export endpoint that streams CSV to authenticated team admins.

Surface map saved to `m3-temp/surface-map.md`. Six categories: user boundaries, trust boundaries, data flows, tool calls, external integration points, authorization checkpoints.

## Phase 3: walk-the-map

Map walk: user boundary (admin consumers), trust boundary (warehouse as trusted source, unenforced), data flows (extract → parse → report → export), tool calls (none), external integration (warehouse upstream, future export), authorization (planned admin auth).

Standouts: (1) warehouse trust is organizational, not code-enforced; (2) CSV serialisation boundary not yet implemented; (3) function-level auth is implicit.

## Phase 4: integrate-skill-called-harder

Pulled `parseAdjustment` input boundary (warehouse CSV parsing, unenforced trust) to top of "Data flows" category. One-line note: trust chain is organizational but unenforced in code.

## Phase 5: add-skill-missed-surface

Added "Codebase-specific (skill missed)" section: CSV-injection on `reason` field at serialisation boundary. Field is free-form string stored as Map key; if export serialises without escaping, embedded delimiters become injection vectors. Skill missed because field looks innocuous at function-signature level; risk is at as-yet-unimplemented serialisation boundary.

## Phase 6: invoke-stride-subagent

[harness substitution — skill-as-subagent → inline]

Threat list saved to `m3-temp/threat-list.md`. Six STRIDE categories with stubby threats. HIGH-severity flagged: CSV-injection on reason field at serialisation (Information disclosure). Admin opening export in Excel could trigger payload.

## Phase 7: pick-the-stride-category

Incident story: admin downloads CSV export; malicious payload embedded in `reason` field; Excel opens and triggers code execution.

STRIDE class: Information Disclosure (I) — threat exfiltrates or corrupts data when file is opened by admin.

Threat name: CSV-injection on `reason` field at export serialisation triggers code execution when opened in Excel.

Hardening: encode/escape `reason` field at CSV serialisation boundary (RFC 4180). Fix lands in export endpoint, not in library.

Student steered to confirm Information Disclosure mapping and serialisation-boundary hardening. Agreed.

## Phase 8: write-adr

ADR 0001 drafted with Context (CSV-injection in `reason` field when admin opens export), Decision (RFC 4180 escaping at serialisation), Consequences (small encode cost, protects against code execution), Alternatives considered (parse-time validation rejected, storage sanitization rejected, JSON output rejected).

Saved to `repo/docs/adr/0001-csv-injection-on-reason-field.md`.

## Phase 9: adrs-auto-load

No, ADRs don't auto-load. They're on-disk and discoverable but only load when explicitly Read or `@`-included.

## Phase 10: author-test-strategy-skill

Seven questions asked sequentially, one per turn (no batching):

**Q1:** Framework/assertion library.
**A1:** Node's built-in `node --test` runner with `node:assert/strict`. Test files at `tests/*.test.js`.

**Q2:** Mocking and isolation.
**A2:** Nothing mocked. Pure functions over in-memory data; no DB, HTTP, filesystem.

**Q3:** Integration boundary.
**A3:** No integration tests yet. Library has no I/O surface. Integration testing lands when export endpoint ships.

**Q4:** Flakiness patterns.
**A4:** No intermittent failures. One historical case: timezone-dependent test on `dailyTotals`; fixed by using YYYY-MM-DD strings instead of Date objects.

**Q5:** Regression scope.
**A5:** Test the PR diff plus call sites. Manual scope check; no test-impact-analysis tooling.

**Q6:** Load-bearing tests.
**A6:** Contract tests (sum, mean, dailyTotals shape). Reviewers always read these. README examples implicitly anchor them.

**Q7:** What NOT to test.
**A7:** Trivial getters, type-level shape (TypeScript would catch, runtime catches most anyway), logging output verbatim.

Test-strategy skill authored with YAML frontmatter (name: test-strategy), description, and body covering framework, load-bearing tests, integration boundary, regression scope, what not to test (with rationale), codebase specifics (no mocking, flakiness history, negative amounts, CSV-injection hardening), and example test shapes.

## Phase 11: invoke-and-grade

Running test-strategy skill on daily-totals feature with CSV-injection hardening (ADR 0001).

Test strategy output:
- Load-bearing contract tests: sum negatives, mean, dailyTotals grouping, groupByReason mapping.
- CSV-injection hardening test: `reason` field escaped per RFC 4180 in CSV output.
- Regression scope: PR diff plus callers.

Self-grade:
- **Strength:** strategy clearly calls out CSV-injection hardening as test requirement, anchored to ADR.
- **Weakness:** slightly generic on RFC 4180 description; could be more specific about which function (export endpoint) and what the assertion tests (CSV output from endpoint, not library).

Student verdict: strategy covers CSV-injection hardening from ADR (good). "What's not worth testing" section reads generic; ship as v0.1 with TODO at top: "v0.2: encode reviewer-checks per-team."

TODO added to skill frontmatter comment. v0.1 shipped.

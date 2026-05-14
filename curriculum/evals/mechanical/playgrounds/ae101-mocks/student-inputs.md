# Substituted student inputs — AE101 prework + M1

Stand-in for the back-and-forth between Claude and the student. Each block below is the line the orchestrator pastes verbatim when Claude reaches that point in the chain. Stage to `/tmp/ae101-mocks/student-inputs.md` via the stage script.

## § Bug 1 (paste when Claude asks for the first candidate bug in prework Step 4)

> Daily totals report is overstating revenue on days that include refunds. The warehouse extract has a refund line for -125 but the day's total comes out as if it weren't there. Ticket AE-42 in `docs/tickets/` has the repro. Maybe ten lines of code touched.

## § Bug 2

> Email notification for batched refunds drops the customer name from the subject line — shows "Refund processed: " then the amount. Cosmetic but noisy in the inbox.

## § Bug 3

> A long-running data-migration script we'd like to retire — probably 400 lines, touches the schema, would need a separate plan. Save for later in the training.

## § Pick (paste after Claude screens the three)

> Go with the daily totals bug — that's the AE-42 one, ten lines, finance is reconciling manually every morning. The other two we'll defer.

## § Bug description (paste when Phase 1 of fix-tests-first asks for the bug; appended after the prompt's trailing colon)

> Daily totals report overstates revenue on days that include refund line items. `sum([100, -125, 50])` returns 150 instead of 25. Reporter alex.r on the ticket suspects `src/totals.js` is filtering negatives instead of nulls. Test command: `npm test` (Node built-in test runner).

## § Diff push-back (paste after Claude shows the diff in Phase 1 of fix-tests-first)

> Looks right. One nit: name the test "sum subtracts negatives" rather than "sum handles negatives" — the team's convention is verbs over nouns in test names. Otherwise ship it.

## § Root-cause push (paste in response to Phase 2 of fix-tests-first)

> Yes, do the proper TDD pass. Write the test for the contract — sum should accept negatives, mean should accept negatives, what happens on `sum([null, undefined])`. The author meant to filter nulls and got it wrong, so the contract clarification is the real fix.

## § Ticket close-out path (paste when compound-and-close asks how to close the ticket)

> Path 3 — manual paste. We don't have an MCP connector for this tracker yet; I'll paste your close-out into the ticket UI myself.

# ──── M2 (plan-mode-done-right) inputs ────

## § M2 plan-mode task (paste when push-back-on-the-plan-1 asks for the task description; appended after the trailing colon)

> Add a `groupByReason(items)` helper to `src/adjustments.js` that groups a list of parsed adjustment items by their reason field and returns a Map<reason, totalAmount>. Wire it into `src/totals.js` as a `dailyTotalsByReason(items, day)` exported function. Add tests covering empty input, single-reason input, and multi-reason input. Update README's "Modules" section to name the new functions. Done means: tests green, README mentions the new helper, no behaviour change for existing callers.

## § M2 push-back 1 (paste at Phase 3 — first push-back, a soft item)

> Step 3 says "wire the helper into totals.js" without naming whether `dailyTotalsByReason` should compose `groupByReason` + `dailyTotals` or duplicate the iteration. That's the design call — please name it explicitly before I approve.

## § M2 push-back 2 (paste at Phase 3 — second push-back, a committed change / reorder)

> The tests step (step 4) needs to land BEFORE the wiring step (step 3) — TDD discipline carried in from M1's `CLAUDE.local.md`. Reorder: write the failing tests first, then the helper, then the wiring. Also: add a test for the negative-amount case (refunds should still group by reason).

## § M2 second-pass answers (Phase 4 — paste in order, one per Claude question; stop when 5-6 have been answered)

> Q1 answer: compose `groupByReason` + `dailyTotals` — don't duplicate. Performance is fine at our list sizes (under 1000 items per day).

> Q2 answer: reasons come from the adjustment line's `reason` field (free-form string). Don't normalise — keep raw strings as Map keys.

> Q3 answer: skip the empty-day case — `dailyTotalsByReason(items, day-with-no-items)` returns an empty Map, no special-cased empty marker.

> Q4 answer: existing test convention is `node:test` + `node:assert/strict`. Match it.

> Q5 answer: README's "Modules" section is the only doc change. No JSDoc, no extended description.

## § M2 plan-approval line (paste at the end of Phase 4 once second-pass is done)

> Plan looks tight now. Approving.

# ──── M3 (earn-the-trust) inputs ────

## § M3 feature naming (paste when map-the-access-surface-2 asks for the feature; appended after the trailing colon)

> The daily-totals reporting module — `sum`, `mean`, `dailyTotals` in `src/totals.js` and `parseAdjustment` in `src/adjustments.js`. Consumed by a (planned) export endpoint that streams CSV to authenticated team admins.

## § M3 access-surface delta — surface called out harder (paste at map-the-access-surface-4)

> The `parseAdjustment` input boundary — accepts free-form CSV strings from warehouse extracts and throws on malformed lines. The skill flagged this as a tampering/injection surface harder than I would have; our deployment has the warehouse upstream as a trusted source, but the skill is right that the trust chain is unenforced in code.

## § M3 access-surface delta — surface skill missed (paste at map-the-access-surface-5)

> The `reason` free-form string field stored as a Map key — if the export endpoint serialises it back to CSV, an embedded comma or quote in `reason` becomes a CSV-injection vector. The skill missed it because the field looks innocuous at the function-signature level; the issue is at the serialisation boundary that doesn't exist yet but is planned.

## § M3 STRIDE pick steer (paste at threat-model-with-stride-2 if Claude's incident-story or category proposal misses)

> The most plausible incident story isn't ad-hoc tampering — it's the CSV-injection vector on `reason` field exfiltrating data when admins open the export in Excel. STRIDE class is Information disclosure (I), not Tampering. Hardening: encode/escape the `reason` field at serialisation, not at parse.

## § M3 ADR convention (paste if Claude asks where ADRs land)

> No existing `docs/adr/` folder. Use `docs/adr/NNNN-slug.md` with Context / Decision / Consequences / Alternatives considered. ADR number 0001.

## § M3 author-test-strategy answers (Phase 1 — one per question, paste in order)

> A1: Node's built-in `node --test` runner with `node:assert/strict`. No Jest, no mocha. Test files at `tests/*.test.js`.

> A2: Nothing mocked today. The library is pure functions over in-memory data; no DB, no HTTP, no filesystem.

> A3: No integration tests yet. The library has no I/O surface to integrate against. Integration testing will land when the export endpoint ships.

> A4: Flakiness has not been an issue — pure functions, deterministic inputs. The closest thing was a timezone-dependent test on `dailyTotals` that flaked when run in CI in a different TZ; we fixed it by passing day strings as YYYY-MM-DD rather than Date objects.

> A5: Regression scope on this team = whatever the PR diff touches plus the call sites of the touched functions. Manual scope check; no test-impact-analysis tooling.

> A6: Load-bearing tests are the contract tests (sum, mean, dailyTotals shape). Reviewers always read them. The README's example outputs implicitly anchor those.

> A7: Not worth testing: trivial getters, type-level shape that TypeScript would catch (we're not on TS but most of our type errors get caught by runtime tests). Also not worth: testing logging output verbatim.

## § M3 author-test-strategy push-back-if-generic (paste at any Phase 1 question if Claude's question is generic)

> That's the question a generic test-strategy skill would ask. Ask me something only this codebase's tests would teach you. What's the actual conversation you'd have with a senior on this team about test scope?

## § M3 invoke-and-grade verdict (paste after author-test-strategy-skill-2 produces its self-critique)

> The strategy covers the CSV-injection hardening from the ADR — good. The "what's not worth testing" section reads slightly generic; ship as v0.1 with a TODO at the top: "v0.2: encode reviewer-checks per-team."

# ──── M4 (run-the-first-experiment) inputs ────

## § M4 task candidates (paste at walk-and-send-off-1, appended after the trailing colon — one per line)

> Candidate 1: Add a `dailyTotalsByCategory(items, day)` function and a CLI export command that writes the daily-totals CSV to stdout, with category breakdown. Touches src/totals.js, a new src/cli.js, README, package.json bin entry. Maybe two hours of agent work.
>
> Candidate 2: Migrate the in-memory totals store to a SQLite-backed persistence layer with a migrations folder. Six to eight files, schema design call, a whole epic.
>
> Candidate 3: Fix a one-line typo in README's Modules section ("Daly totals" → "Daily totals"). Five seconds.

## § M4 task scope confirmation (paste after Phase 1 names Candidate 1 as the fit)

> Candidate 1 it is. Scope: add `dailyTotalsByCategory` to src/totals.js, add a `src/cli.js` with a `--export` flag that writes daily totals CSV to stdout grouped by category, wire `bin: { "totals": "src/cli.js" }` in package.json, update README's Modules section. Done means: the CLI runs from `node src/cli.js --export 2026-05-01`, tests cover the new function, no behaviour change to existing callers.

## § M4 audit gap-fill answers (paste in Phase 2 as Claude asks one at a time)

> A1: For the missing CSV-encoding rule, add this to `.claude/memory/observations.md`: "When the export endpoint serialises `reason` or `category` strings, escape commas, quotes, and newlines per RFC 4180. The ADR 0001 covers the CSV-injection threat."

> A2: For the missing CLI test convention, add to CLAUDE.local.md: "CLI surfaces test via subprocess invocation (`node src/cli.js ...`) with stdout/stderr captured. Use Node's `node:child_process` execFileSync."

> A3: For the missing connector — no MCP connector needed for this task. Note as "no external tool surface; in-repo only."

## § M4 three-block frame answers (paste at Phase 3 walk-and-send-off-4)

> Block 1 examples that fit my repo: observations.md mentions CSV escaping (rule born from ADR 0001's CSV-injection diagnosis); the negative-summation contract from CLAUDE.local.md is rule-tier.
>
> Block 2 examples: ADR 0001 is the canonical Block 2 entry (decision + alternatives considered).
>
> Block 3 examples: the test-strategy skill from M3 — quality criteria for what shipped code looks like in this codebase.

## § M4 send-off completion summary (paste after ae101-m3-take-task-end-to-end is invoked, simulating what came back)

> Ran for ~25 min. Shipped: dailyTotalsByCategory function + 4 unit tests (all green), src/cli.js scaffold with --export flag. Didn't ship: README update (forgot), package.json bin entry (got distracted by an unrelated lint warning in src/totals.js and tried to "clean it up", ate 8 min). Verifier output: none — no verifier in play this run. RUN-NOTES.md not used. Manual nudges: 1 (when Claude tried to refactor src/totals.js mid-task).

# ──── M5 (learn-from-the-test) inputs ────

## § M5 worktree confirmation (paste after ae101-m4-worktree-setup creates the worktree)

> Confirmed worktree at the path you reported. CLAUDE.local.md and .claude/memory/ both copied. Ready to open M5 session there.

## § M5 three-failure diagnosis (paste after diagnose-and-resend-2 walks the three lenses)

> Goal drift: agent spent 8 min mid-run on "cleaning up" src/totals.js when the task didn't ask for that — quoted moment is the lint-warning detour at scrollback timestamp ~T+12min.
>
> Context rot: agent re-derived the negative-summation contract twice — once at T+5 reading totals.js, once at T+18 starting to write the CLI. The contract was already in CLAUDE.local.md from M1.
>
> Plausible-but-wrong: the CLI scaffold writes CSV without escaping commas in category names. Lints clean, tests don't cover the injection case. Looks shipped, but ADR 0001 says it's wrong.

## § M5 verifier shape pick (paste at diagnose-and-resend-4 — pick after the menu)

> Shape: shell-hook. Plausible-but-wrong (the CSV-injection-on-category surface) was the dominant failure; a deterministic check on CSV output is the right fit. Build a pre-commit hook that runs the CLI on a fixture row containing a comma in the category, verifies the output is properly escaped (RFC 4180).

## § M5 verifier confirmation (paste after diagnose-and-resend-5 smoke-tests the verifier)

> Verifier fires correctly on both inputs. PASS fixture (no commas) passes; FAIL fixture (comma in category) correctly fails. Hook is wired at .claude/hooks/csv-escape-check.sh. Ready for the packaged re-run.

## § M5 re-run report (paste after ae101-m4-rerun-packaged completes its packaged re-run)

> Packaged re-run shipped in ~18 min. Verifier fired three times during the run — caught one CSV-escaping miss on category strings, agent fixed it before commit. Shipped: dailyTotalsByCategory + 6 tests (covers escaping), src/cli.js with --export and proper RFC 4180 escaping, README updated with the new export commands, package.json bin entry wired. RUN-NOTES.md has one entry ("verifier surfaced category-string injection on first commit attempt; fixed by routing through csv-stringify").

# ──── M6 (spot-gaps-build-the-loop) inputs ────

## § M6 ranked gap list (paste after spot-gaps-build-the-loop-1 names the four-dimension diff)

> Three gaps, ranked:
>
> 1. Plan.md cadence too coarse — packaged run had verifier-fires-per-commit, but plan.md didn't say "fire verifier on every CLI output change". Agent missed two CSV-injection-adjacent surfaces because the verifier only ran when files in src/cli.js committed; the category-name escaping happens elsewhere.
> 2. Reference artefact missing recent ADR — ADR 0001 was the relevant context but the reference pointed only at the test-strategy skill. The agent had to re-derive the threat model mid-run.
> 3. CLAUDE.local.md's "filter nulls not negatives" rule (from M1) didn't fire on the CLI export path — rule was framed around `sum()`, not generalised to all aggregations. The dominant gap is plan.md cadence (recurring drift); skill shape: sharpened-verifier.

## § M6 stale rule to cut (paste at spot-gaps-build-the-loop-2)

> Cut this rule from CLAUDE.local.md: "Test names are documentation" — the M5 packaged re-run showed the team's actual convention is failing-test-first names the contract; descriptive rule is redundant once that's in place. Keep the verb-led naming rule from M3 (more load-bearing).

## § M6 session-shaper skill — shape pick (paste at spot-gaps-build-the-loop-3 first question)

> Shape: sharpened-verifier. The dominant gap is "verifier didn't fire on the right output surfaces during long-running runs" — the skill encodes a check that scans an agent's plan.md cadence and adds verifier-fire markers on every output surface the plan touches.

## § M6 author-skill Q&A answers (paste one per question in Phase 2 conversation)

> A1: Fires on a plan.md file at session start, before the agent's first commit. Re-fires whenever plan.md is rewritten mid-run.
>
> A2: Quality bar: every output surface named in plan.md (file paths the agent will write to, CLI surfaces, API endpoints) must have at least one verifier-fire marker in the plan's Verification section.
>
> A3: Flag: an output surface with no verifier marker. Let through: a surface deliberately marked "no-verifier (throwaway)".
>
> A4: Output: a ranked list of unverified surfaces, one per line, with the dominant one tagged.
>
> A5: Skill failure shape: it falsely flags throwaway/debug surfaces. Mitigation: skill checks for the "no-verifier (throwaway)" exemption marker first.

## § M6 skill name proposal acknowledgement (paste after Claude proposes a skill name)

> Name fits. Save it.

## § M6 invoke-and-grade verdict (paste at spot-gaps-build-the-loop-5 self-grade)

> The skill caught the plan.md-cadence gap on the M5 packaged run retroactively (the CLI category-name surface had no verifier marker, the skill flagged it). It missed the reference-artefact gap because the skill doesn't read the reference. Ship as v0.1 with TODO: "v0.2: also scan the reference artefact for skill+ADR pointers."

## § M6 arc-retrospective note acceptance (paste after arc-retrospective-1 produces the note)

> Saves to `docs/arc-retrospective.md`. The note reads true on rule subtraction (the cut from CLAUDE.local.md mid-arc) and the two-skill rhythm (test-strategy at M3, session-shaper at M6). One sentence reads slightly generic — the "compounding" sentence near the end. Otherwise ship.

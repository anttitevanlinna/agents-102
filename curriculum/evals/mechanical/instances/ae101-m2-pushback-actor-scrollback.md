# Scrollback — AE101 M2 push-back-on-the-plan

## Phase 1 — pick-a-multi-file-task

[harness substitution — /rename]
[harness substitution — plan mode]

**Prompt:**

> Plan the task I describe below. Explore the files you need to understand the scope. Write the plan to a plan file. Each step names files touched, shape of the change, tests you'd write or update before any code lands, and what you'd check before declaring it done. Detail over brevity.
>
> My task: Add a `groupByReason(items)` helper to `src/adjustments.js` that groups a list of parsed adjustment items by their reason field and returns a Map<reason, totalAmount>. Wire it into `src/totals.js` as a `dailyTotalsByReason(items, day)` exported function. Add tests covering empty input, single-reason input, and multi-reason input. Update README's "Modules" section to name the new functions. Done means: tests green, README mentions the new helper, no behaviour change for existing callers.

**Response:**

I've explored the repo structure: `src/adjustments.js` exports `parseAdjustment`, which returns `{day, reason, amount}` objects. `src/totals.js` has `sum`, `mean`, and `dailyTotals` functions. The README documents the modules. Tests use `node:test` + `node:assert/strict`.

I've written a v1 plan to `.claude-plans/groupbyreason-helper.md` covering:
1. Add `groupByReason(items)` to `src/adjustments.js`
2. Add `dailyTotalsByReason(items, day)` to `src/totals.js`
3. Wire step 2 to use step 1 (composition vs duplication — soft item)
4. Update tests
5. Verification: run the tests
6. Update README

**Plan saved — awaiting approval.**

---

## Phase 2 — push-back-twice-on-the-plan

**Push-back 1:** Step 3 says "wire the helper into totals.js" without naming whether `dailyTotalsByReason` should compose `groupByReason` + `dailyTotals` or duplicate the iteration. That's the design call — please name it explicitly before I approve.

**Push-back 2:** The tests step (step 4) needs to land BEFORE the wiring step (step 3) — TDD discipline carried in from M1's `CLAUDE.local.md`. Reorder: write the failing tests first, then the helper, then the wiring. Also: add a test for the negative-amount case (refunds should still group by reason).

**Response:**

I've regenerated the plan with both push-backs applied:
- **TDD reorder:** Tests now Step 1–2, implementation Steps 3–4
- **Composition explicit:** Step 4 now names "compose `groupByReason` + filters by day; do NOT duplicate iteration"
- **Refund coverage:** Tests now include negative-amount case

Plan file regenerated and saved. Ready for next phase.

---

## Phase 3 — second-pass-walk-down-branches

**Prompt:**

> Do a second-pass read of the current plan. Walk down every unresolved branch of the design tree one at a time: dependencies, decisions, side-effects I haven't named. Ask me one question at a time. For each question, recommend an answer. If a question can be answered by reading the codebase, read the codebase instead of asking me. I'll confirm or correct one at a time.

---

**Q1: Composition strategy**

Recommended: Compose `groupByReason` + `dailyTotals` — call `groupByReason(items)` to get `Map<reason, amount>`, then filter to day. Avoids duplication.

**Student answer:**
> Q1 answer: compose `groupByReason` + `dailyTotals` — don't duplicate. Performance is fine at our list sizes (under 1000 items per day).

Confirmed.

---

**Q2: Reason field normalization**

Recommended: Keep raw strings as Map keys. `parseAdjustment` accepts the reason field without transformation; normalizing downstream diverges storage from reporting.

**Student answer:**
> Q2 answer: reasons come from the adjustment line's `reason` field (free-form string). Don't normalise — keep raw strings as Map keys.

Confirmed.

---

**Q3: Empty-day edge case**

Recommended: Return empty Map for days with no items. No special marker. Consistent with `dailyTotals` behavior.

**Student answer:**
> Q3 answer: skip the empty-day case — `dailyTotalsByReason(items, day-with-no-items)` returns an empty Map, no special-cased empty marker.

Confirmed.

---

**Q4: Test framework**

Read existing tests: both files use `node:test` + `node:assert/strict`.

Recommended: Match the existing convention.

**Student answer:**
> Q4 answer: existing test convention is `node:test` + `node:assert/strict`. Match it.

Confirmed.

---

**Q5: Documentation scope**

Recommended: Update README Modules section only. No JSDoc; code is straightforward.

**Student answer:**
> Q5 answer: README's "Modules" section is the only doc change. No JSDoc, no extended description.

Confirmed.

---

**Plan approval:**
> Plan looks tight now. Approving.

**Response:**

I've updated the plan file with a "Second-pass refinements" section summarizing the Q1–Q5 decisions:
- Composition structure
- Raw reason strings
- Empty-state returns (empty Map)
- Test framework (`node:test` + `node:assert/strict`)
- Documentation scope (README only)

Plan marked as approved and ready to execute.

---

## Phase 4 — stop-see-the-pattern

**Prompt:**

> Looking back at this session: what new information and decisions did the second-pass read surface that my two push-backs didn't? Would any of them have mattered in execution? What's the design pattern I just ran, as a repeatable move I could apply to my next non-trivial plan?

**Response:**

**What the second-pass surfaced beyond the two push-backs:**

1. **Composition structure across boundaries:** Q1–Q2 clarified that `dailyTotalsByReason` filters by day AFTER grouping by reason, making the composition direction explicit.
2. **Negative-amount handling:** Push-back 2 named refunds; Q4 confirmed they should group unchanged (no sign handling), shaping test coverage.
3. **Empty-state contract:** Q3 made explicit that empty days return empty Maps (not nulls), matching `dailyTotals` pattern.
4. **Documentation scope boundary:** Q5 clarified README vs. JSDoc split, preventing over-documentation.

**Design pattern:**

*Two-pass plan discipline — human push-back catches design gaps (composition choice, test ordering); agent second-pass catches branch-walk misses (empty states, cross-boundary contracts, documentation scope, test coverage for side cases like refunds).*

---

## Phase 5 — does-claude-local-md-ride-into-every-session

**Prompt:**

> are these rules auto-loaded to each session context?

**Response:**

Yes. `./CLAUDE.local.md` at the repo root auto-loads into every Claude Code session opened with this repo as the working directory. Team `./CLAUDE.md` (if it exists) concatenates with it. ADRs, plan files, and temp-dir skill output are discoverable but require explicit Read; they don't auto-load.

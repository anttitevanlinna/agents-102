# AE101 M4 Mechanical Test — Actor Scrollback

## Phase 1: Screen-candidates-pick-task

[harness substitution — /rename]

Screening three candidates against send-off criteria:

**Candidate 1: dailyTotalsByCategory CLI** — Fit
- Send-off shape ✓: multiple ambiguities (how to structure category breakdown, CLI flag shape, CSV encoding rules)
- Requirement-weaving ✓: CSV output must respect RFC 4180 rule from ADR 0001; category mapping must work with existing negative-handling contract
- Multi-file reasoning ✓: touches src/totals.js, new src/cli.js, package.json, README — wrong choice on any costs time

Scope: Add `dailyTotalsByCategory(items, day)` to src/totals.js returning a Map of categories to daily totals. Create src/cli.js with `--export` flag writing CSV to stdout. Wire `bin: { "totals": "src/cli.js" }` in package.json and update README. Done means CLI runs without error, tests cover the new function, existing callers unchanged.

**Candidate 2: SQLite persistence** — Wrong shape (architectural migration, not a send-off task)

**Candidate 3: README typo** — Too small (5 seconds)

**Student confirmation:** Candidate 1 approved. Scope accepted.

---

## Phase 2: Audit-the-system

[harness substitution — audit-as-subagent → inline]

Read CLAUDE.local.md, observations.md, decisions.md, quality-criteria.md, ADR 0001.

**Ranked top-5 thin spots:**

1. **CSV-encoding rule not generalised to `category` field (HIGH)**: ADR 0001 and observations.md name `reason` field escaping. The task adds category breakdown to CSV. If category strings contain commas, the CLI ships unescaped. Damage: CSV-injection vector. Cheapest close: update observations.md to name both `reason` and `category` as requiring RFC 4180 escaping.

2. **CLI testing convention missing (HIGH)**: quality-criteria.md covers aggregation tests; nothing specifies how CLI surfaces are tested. Agent may skip or test wrong. Damage: untested CLI surfaces. Cheapest close: add to CLAUDE.local.md a rule naming Node's `node:child_process` execFileSync for CLI testing.

3. **No MCP connector for export flow (MEDIUM)**: Task mentions exporting CSV. No connector wired. Agent might try to invent one. Damage: scope creep. Cheapest close: clarify "in-repo only, no external connector needed."

4. **Negative-handling contract scope unclear (MEDIUM)**: CLAUDE.local.md Rule 1 applies to `sum()`. Will it fire for `dailyTotalsByCategory`? If agent re-derives instead of reading the rule, it might drop negatives on category totals. Damage: wrong aggregation. Cheapest close: broaden rule wording to "aggregation functions" not just "sum()."

5. **No guideline on bin vs. README coordination (MEDIUM-LOW)**: Task touches both. Coordination not explicit. Agent might ship one but forget the other. Damage: half-shipped CLI. Cheapest close: a send-off forcing-function learning moment.

---

## Phase 3: Use-ask-questions-tool-speed

Three gap-fill questions, one per turn.

### Q1: CSV-encoding on category field

Observations.md mentions RFC 4180 escaping for `reason` — but your new `dailyTotalsByCategory` groups by `category`, which might contain commas. Should I update observations to name both fields as needing RFC 4180 escaping?

**Answer:** When the export endpoint serialises `reason` or `category` strings, escape commas, quotes, and newlines per RFC 4180. The ADR 0001 covers the CSV-injection threat.

**Action:** Appended to .claude/memory/observations.md.

### Q2: CLI testing convention

Quality-criteria.md says tests cover aggregations; nothing specifies CLI testing. Should it use Node's `child_process` execFileSync + stdout capture?

**Answer:** CLI surfaces test via subprocess invocation (`node src/cli.js ...`) with stdout/stderr captured. Use Node's `node:child_process` execFileSync.

**Action:** Appended to CLAUDE.local.md as Rule 6.

### Q3: External connector for export flow

Will exported CSV land in an external system, or does it stay in-repo as stdout?

**Answer:** No MCP connector needed for this task. CSV exports to stdout for human or script consumption; no connector required.

**Note:** No external tool surface; in-repo only.

---

## Phase 4: Three-block-frame

**Block 1 examples (observations → hypotheses → rules):**
- observations.md: "Filter nulls instead [of negatives]" — hypothesis about aggregation behaviour
- CLAUDE.local.md Rule 1: "When writing an aggregation function, filter null/undefined to prevent NaN. Don't drop negatives — refunds are negatives."

**Block 2 examples (decisions with alternatives):**
- ADR 0001: Encode `reason` field at CSV serialisation boundary. Alternatives considered: parse-time validation (rejected, warehouse trusted), storage-layer sanitisation (rejected, storage untyped), JSON output (rejected, ops uses Excel).

**Block 3 examples (quality criteria):**
- quality-criteria.md: "Tests cover negative inputs on all aggregations," "Test names verb-led," "CSV output escaped per RFC 4180."

**Frame confirmed.** No file moves proposed.

---

## Phase 5: Commit-starting-point

Branch: `m4/dailytotalsbycategory`  
Starting-point commit: `fbd0db7` (M1-M3 artefacts + gap-fill rules)

---

## Phase 6: Take-task-end-to-end

[harness substitution — walk-away simulated]

Agent ran for ~25 min. Shipped:

1. **dailyTotalsByCategory function** in src/totals.js: Maps items by category for a given day. Handles missing category field (defaults to "uncategorized"). Returns empty Map for day with no items.

2. **4 unit tests**, all green:
   - Group by category for a single day
   - Handle missing category field
   - Return empty map for day with no items
   - Handle refunds (negatives) in category totals

3. **src/cli.js scaffold** with `--export YYYY-MM-DD` flag. Reads stub items data, outputs CSV to stdout with header "category,total".

**Deliberately not shipped (M4 partial-shipping pattern):**
- README.md not updated with new export commands
- package.json bin entry not added
- No RFC 4180 escaping in CLI CSV output (the injected bug for M5 diagnosis)

**Student reads back the completion summary:**
> Ran for ~25 min. Shipped: dailyTotalsByCategory function + 4 unit tests (all green), src/cli.js scaffold with --export flag. Didn't ship: README update (forgot), package.json bin entry (got distracted by an unrelated lint warning in src/totals.js and tried to "clean it up", ate 8 min). Verifier output: none — no verifier in play this run. RUN-NOTES.md not used. Manual nudges: 1 (when Claude tried to refactor src/totals.js mid-task).

**Commit:** `9aa7f1b` (M4: Add dailyTotalsByCategory function and CLI scaffold)

---

## Phase 7: Nudge-continue

Continue --- you can do it. Can't you?

Agent acknowledged. Work shipped on branch `m4/dailytotalsbycategory`. Tests pass. Partial-shipping pattern (missing README + bin entry + CSV escaping) in place for M5 diagnosis.

---

## Scratch end-state

- `CLAUDE.local.md`: has Rule 6 (CLI testing convention) appended
- `.claude/memory/observations.md`: has CSV-escaping rule for both `reason` and `category` appended
- `src/totals.js`: has `dailyTotalsByCategory` function exported
- `src/cli.js`: created with `--export` scaffold (no RFC 4180 escaping — deliberate M4 bug)
- `tests/totals.test.js`: 4 new tests for `dailyTotalsByCategory`, all passing
- Branch `m4/dailytotalsbycategory` exists with work commits
- README.md: NOT updated (deliberate)
- package.json: bin field NOT added (deliberate)

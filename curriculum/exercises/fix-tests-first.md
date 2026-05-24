# Fix tests-first

**Time:** 25 minutes.

**What you do:** fix the bug you brought from prework, tests-first. Ship the PR.

**The point:** tests-first and root-cause-driven is one discipline. Running it with an agent is a second discipline: reading the diff, pushing back when a line is not what you would have written. Both get practised here. The compound move (writing down what you learned) lives in the next exercise.

You know what's loaded and what isn't. Now fix the bug.

No plan mode here. Plan mode pays off at Module 2 on multi-file work; on a trivial bug, it's overhead. The move is tests-first, root-cause-driven.

Ask Claude to write the failing test, fix the root cause, and show the diff. Drop your bug after the colon.

{{prompt:fix-tests-first-1}}


Claude writes the failing test, watches it fail, fixes the code, watches it pass. Read the diff. If a line isn't what you'd have written, push back. Quote the line and say why. Whoever has the better argument wins.

Your own wording and viewpoint is important here. Hence no pre-made prompt. You'll return to this at the compound step.

When Claude says done, push once on the depth. Ask whether the change is the root cause or a layer above it. The first cut usually fixes what makes the test pass; the deeper cut asks whether the test was pointing at the right thing. Name what a deeper edit would touch and see what Claude defends. The exchange is where root-cause discipline shows up, not in the fix itself.

**Optional.** Skip if the test you wrote already names the contract and the fix is the contract, no deeper layer to interrogate. Otherwise, ask Claude to interrogate the fix and name what's still surface.

{{prompt:fix-tests-first-2}}

**Optional.** Send only if the interrogation surfaced a deeper layer worth a second TDD pass.

{{prompt:fix-tests-first-3}}

Dig into code quality and structure. Ask Claude: *did you make it better? Why yes. Why no.* The goal is to make a neat and clean fix. Might need a number of nudges. You steer.

Ask Claude to commit, push a branch, and open the PR. How far you let Claude drive Git is your call.

**What happened:** A real PR shipped. A failing test landed in the codebase before the fix did. You read the diff, pushed back on at least one line, and ran the root-cause interrogation before the second TDD pass.

The PR is shipped. The move is warm. Hand off to the compound step.

*For those finishing early: chatter about making sure the LLM doesn't fake tests or write tests that just pass. How do you catch that efficiently?*

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@88a1dd4 story@88a1dd4 technical@88a1dd4 behavior@88a1dd4 pedagogy@3605eee)
- judges @3605eee: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply (tests-first fix) + Analyze (read the diff against what you'd write).
- **Time:** 25 min inside M1's 2h slot. Second of three exercises on the same bug / same repo. Earlier 35–40 min band assumed a meatier bug than prework's trivial-bug spec (under 50 lines, wrong error message / off-by-one / wrong total) actually invites — recalibrated 2026-05-15 after AE101 dry-run flagged the budget as padded.
- **Prompt progression note:** the commit / push / PR move is intentionally prose-led, not a fenced prompt block. At this point the Builder is already in the repo with the fixed diff in context; the student can ask in their own words. Do not add a paste-ready commit prompt unless the exercise design changes.

**Frameworks riffed on:**
- **TDD (test-driven development)** — the tests-first, root-cause-driven fix riffs on a framework engineers already know. Named implicitly ("tests-first"); the rule seeded into `./CLAUDE.local.md` is the student's own TDD-style preference.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 4 (self-aware, grain of salt)** — the diff push-back; Claude explains what it wrote and the student verifies. Compounding theme lands in Ex3.

**Watch-fors:**
- **Tests-skipped.** Student pastes the bug and Claude jumps straight to a fix. Common failure mode. Trainer push: *"back up — what's the failing test that would prove this bug exists?"* If the repo has no test infrastructure on this path, log *"no verifier here"* and name it as the first Quality-Gate entry (landing in M4).
- **Diff rubber-stamp.** Student says *"looks fine"* under 30 seconds. Trainer push: *"find me one line you'd have written differently — not wrong, just different."*

**Decision points:**
- **Runs over 35 min.** Bug wasn't trivial. Let it complete; trim the next exercise (MCP close-out) to read-only, flag for follow-up. Note for M2 — student benefits more from plan-mode-at-depth than average.
- **Finishes under 15 min.** Picked something too small. Offer second bug, or use saved time to revisit the introspection move.
- **Repo has no test infrastructure.** Exercise ends without test verification. Log *"no verifier on this path"* in the `./CLAUDE.local.md` rule — real finding, not exercise failure. M4 picks it up.

**Plug points:**
- Student's own bug (surfaced by Claude in prework).

**Arc:**
- Picks up from: `orient-and-introspect` — fix happens in the window the student just mapped.
- Hands off to: `compound-and-close` — the retro extends the rule, the connector closes the ticket.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Writes a failing test that proves the bug exists before touching the fix** on a real backlog bug. Falsifiable: commit history shows a test commit before or with the fix commit, with the test demonstrably reflecting the bug.
2. **Pushes back on at least one line in a diff** before merging. Falsifiable: session scrollback or commit body shows a line-level objection or "I'd have done X" before the merge.
3. **Runs root-cause interrogation before accepting Claude's first fix** when the first answer feels surface-level. Falsifiable: scrollback shows a *"what's the root cause?"* or *"are you sure?"* turn before any commit.

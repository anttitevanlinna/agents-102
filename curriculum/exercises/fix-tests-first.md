# Prove the bug, then ship the fix

**Time:** 25 minutes.

**What you do:** fix the bug you brought from prework, tests-first. Ship the PR.

**What you build:** three things that make a fix trustworthy: a failing test that proves the bug exists, the smallest fix that passes it, and a PR you read line by line before it ships.

**The point:** tests-first and root-cause-driven is one discipline. Running it with an agent is a second discipline: reading the diff, pushing back when a line is not what you would have written. Both get practised here. The compound move (writing down what you learned) lives in the next exercise.

---

## Write the failing test and fix the root cause

- **Tests-first, root-cause-driven.** The failing test is the only proof the bug exists. Without it, the fix is a guess that happens to compile. Write the test first, watch it fail, then fix the cause, not the symptom.
- No plan mode here. You are not on the hook for scoping this one; on a trivial bug, plan mode is overhead.

> **Small fix, small test.** A trivial bug wants one failing test and a tight fix, not a suite and a refactor. If Claude starts spinning up plenty of tests, or the change creeps past the bug, that's sprawl. Steer it back to one test that proves the bug and the smallest fix that passes it.

Ask Claude to write the failing test, fix the root cause, and show the diff. Drop your bug after the colon.

{{prompt:fix-tests-first-1}}

## Read the diff and push back on a line

- The agent runs the loop; you read the result. The agent writes the failing test, watches it fail, fixes the code, watches it pass. Read the diff. If a line isn't what you'd have written, push back. Quote the line and say why. Whoever has the better argument wins.
- Your own wording matters. No pre-made prompt for the pushback. You return to this exact move at the compound step, so the words you reach for are yours.

## Interrogate the fix for a deeper layer

- Push once on the depth. When the agent says done, ask whether the change is the root cause or a layer above it. The first cut usually fixes what makes the test pass; the deeper cut asks whether the test was pointing at the right thing. Name what a deeper edit would touch and see what Claude defends. The exchange is where root-cause discipline shows up, not in the fix itself.

**Optional.** Skip if the test you wrote already names the contract and the fix is the contract, no deeper layer to interrogate. Otherwise, ask Claude to interrogate the fix and name what's still surface.

{{prompt:fix-tests-first-2}}

**Optional.** Send only if the interrogation surfaced a deeper layer worth a second TDD pass.

{{prompt:fix-tests-first-3}}

**Optional.** Once the fix is in, dig into code quality and structure. Ask Claude: *did you make it better? Why yes. Why no.* You steer; might take a few nudges.

## Ship the PR

- How far you let Claude drive Git is your choice. Ask Claude to commit, push a branch, and open the PR.

**What happened:** A real PR shipped. A failing test landed in the codebase before the fix did. The diff got read, at least one line got pushback, and the root-cause interrogation ran before the second TDD pass.

The PR is shipped. Hand off to the compound step.

*For those finishing early: chatter about making sure the LLM doesn't fake tests or write tests that just pass. How do you catch that efficiently?*

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** One handle kept bold: **Tests-first, root-cause-driven** at its naming moment; all other bullet leads de-bolded. Widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`, `**Optional.**` labels) and the blockquote callout untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@88a1dd4 story@88a1dd4 technical@88a1dd4 behavior@88a1dd4 pedagogy@3605eee slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered, slides PASS
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

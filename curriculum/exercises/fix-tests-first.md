# Fix tests-first

**What you do:** fix the bug you brought from prework, tests-first, no plan mode. Ship the PR.

**What happens:** a real PR ships. A failing test lands in the codebase before the fix does. The diff is read line-by-line with at least one push-back.

**The point:** tests-first and root-cause-driven is one discipline. Running it with an agent is a second discipline: reading the diff, pushing back when a line is not what you would have written. Both get practised here. The compound move (writing down what you learned) lives in the next exercise.

**Time:** 35–40 minutes.

You know what's loaded and what isn't. Now fix the bug.

No plan mode here. Plan mode earns its keep in M2 on multi-file work; on a trivial bug, it's overhead. The move is tests-first, root-cause-driven.

Bring the bug back. In prework, Claude surfaced three candidates and you picked one. Paste the bug (a sentence or two) back into the conversation. If prework's scrollback is still open, tell Claude to look back.

**Prompt** *(copy → Claude Code)*

```
Find the root cause of this bug by writing the tests that would reveal it. Run the tests and confirm they fail the way you'd expect. Then fix the root cause, not the symptom. Run the tests again. Show me the diff before you commit.
```

*(end of prompt)*

Claude writes the failing test, watches it fail, fixes the code, watches it pass. Read the diff. If a line isn't what you'd have written, push back. Quote the line and say why. Whoever has the better argument wins.

Ask Claude to commit, push a branch, and open the PR (merge or draft, your call).

The PR is shipped. The move is warm. Hand off to the compound step.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply (tests-first fix) + Analyze (read the diff against what you'd write).
- **Time:** 35–40 min inside M1's 2h slot. Second of three exercises on the same bug / same repo. Shorter than the earlier 40–45 min band — the rule-write move moved to Ex3 where the compound step lives.

**Frameworks riffed on:**
- **TDD (test-driven development)** — the tests-first, root-cause-driven fix riffs on a framework engineers already know. Named implicitly ("tests-first"); the rule seeded into `./CLAUDE.local.md` is the student's own TDD-style preference.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 4 (self-aware, grain of salt)** — the diff push-back; Claude explains what it wrote and the student verifies. Compounding theme lands in Ex3.

**Watch-fors:**
- **Tests-skipped.** Student pastes the bug and Claude jumps straight to a fix. Common failure mode. Nerd push: *"back up — what's the failing test that would prove this bug exists?"* If the repo has no test infrastructure on this path, log *"no verifier here"* and name it as the first Quality-Gate entry (landing in M4).
- **Diff rubber-stamp.** Student says *"looks fine"* under 30 seconds. Nerd push: *"find me one line you'd have written differently — not wrong, just different."*

**Decision points:**
- **Runs over 50 min.** Bug wasn't trivial. Let it complete; trim the next exercise (MCP close-out) to read-only, flag for follow-up. Note for M2 — student benefits more from plan-mode-at-depth than average.
- **Finishes under 25 min.** Picked something too small. Offer second bug, or use saved time to revisit the introspection move.
- **Repo has no test infrastructure.** Exercise ends without test verification. Log *"no verifier on this path"* in the `./CLAUDE.local.md` rule — real finding, not exercise failure. M4 picks it up.

**Plug points:**
- Student's own bug (surfaced by Claude in prework).

**Arc:**
- Picks up from: `orient-and-introspect` — fix happens in the window the student just mapped.
- Hands off to: `compound-and-close` — the retro extends the rule, the connector closes the ticket.

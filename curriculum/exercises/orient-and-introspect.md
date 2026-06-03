# Orient and *introspect*

**Time:** 15–20 minutes.

**Session** *(new, "Module 1 - Orient and introspect")*

Start a new Claude Code session at your repo root. Optionally rename to `m1-orient`.

```
/rename m1-orient
```

**What you do:** have Claude read your repo, then interrogate what it read.

**The point:** you can't steer what you can't see. This is the first move of every session after this one. Load deliberately, watch the budget, dig the self-report.

Claude Code is open on your repo. You have a trivial bug picked from prework. Now: deliberate orientation, then introspection on what Claude says it read, then a look at your context budget.

Ask Claude to read your repo deliberately and report shape, structure, what's load-bearing, what's stale.

> **Big repo? The read can fan out.** If Claude starts reading dozens of files, interrupt with `Esc`, narrow to one feature or directory, and say `continue`.

{{prompt:orient-and-introspect-1}}


Claude reads and reports. Let it finish.

Ask Claude to introspect on what it read, what it skipped, and the call it made on each.

{{prompt:orient-and-introspect-2}}


Read Claude's own account. This is one of the most useful moves in the training: Claude can introspect on what it did and why, including what it chose to skip. The caveat is load-bearing. The self-report is a reconstruction, not ground truth. Claude confabulates reasons sometimes. Assume 10% of what Claude says or does is misrepresentation. Could be more, could be less. Spot-check by quoting back a specific file or function and asking Claude to confirm it.

Now look at your context budget, the slash command that shows how full your context window is, total used and breakdown by category (system prompt, messages, memory, skills).

{{prompt:orient-and-introspect-3}}

(`/context` is oldskool; [ccstatusline](https://github.com/sirmalloc/ccstatusline) shows the same thing continuously in your status line.)

Look at the percentage. The window has a ceiling; the more it fills, the less room for new work. The slice of the repo Claude didn't load is the bounded-window reality. Your job going forward is to steer what lands in those bytes.

You've seen what's loaded and what isn't. Hand off to the fix.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@3605eee story@88a1dd4 technical@3605eee behavior@3605eee pedagogy@3605eee)
- judges @3605eee: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read Claude's self-report against `/context`).
- **Time:** 15–20 min inside M1's 2h slot. First of three exercises on the same bug / same repo.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 3 (mirror)** — Claude's read reflects the student's prompt back at them.
- **Theme 4 (self-aware, grain of salt)** — the introspection prompt and the `/context` verification.
- **Theme 1 (90% correct)** — `/context` makes the unread slice visible.

**Watch-fors:**
- **Introspection skipped.** Student reads Claude's repo summary and moves to the bug fix without the second prompt. Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **`/context` skipped.** The slash command reads as prose, not as a command to type. Trainer push: *"type /context in the chat — look at the number."*

**Plug points:**
- Student's own repo (chosen in prework).

**Arc:**
- Picks up from: Connections (trick exchange) + the-wizard-move lecture.
- Hands off to: `fix-tests-first` — the bug gets fixed in the window you just mapped.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Runs `/context` on a working session and reads the unread-slice percentage** without being prompted. Falsifiable: scrollback of a normal session shows `/context` as a deliberate move within the first ten minutes, not a feature tour.
2. **Asks Claude what it skipped and why after a repo-read**, before taking any code action. Falsifiable: a follow-up introspection prompt appears in scrollback after the initial orient prompt.
3. **Spot-checks Claude's self-report by quoting a specific file or function back** when the report feels off. Falsifiable: scrollback shows a quote-back move under a "you said you read X, what's actually in it?" shape.

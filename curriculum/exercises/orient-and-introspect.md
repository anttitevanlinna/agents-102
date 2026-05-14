# Orient and introspect

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

{{prompt:orient-and-introspect-1}}


Claude reads and reports. Let it finish.

Ask Claude to introspect on what it read, what it skipped, and the call it made on each.

{{prompt:orient-and-introspect-2}}


Read Claude's own account. This is one of the most useful moves in the training: Claude can introspect on what it did and why, including what it chose to skip. The caveat is load-bearing. The self-report is a reconstruction, not ground truth. Claude confabulates reasons sometimes. Assume 10% of what Claude says or does is misrepresentation. Could be more, could be less. Spot-check by quoting back a specific file or function and asking Claude to confirm it.

Now look at your context budget. In the Claude Code chat, type:

```
/context
```

That's the slash command that shows how full your context window is, total used and breakdown by category (system prompt, messages, memory, skills). Look at the percentage. The window has a ceiling; the more it fills, the less room for new work. The slice of the repo Claude didn't load is the bounded-window reality. Your job going forward is to steer what lands in those bytes.

You've seen what's loaded and what isn't. Hand off to the fix.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-09 (writing@88a1dd4 story@88a1dd4 technical@88a1dd4 behavior@88a1dd4)
- judges @88a1dd4: writing PASS, story PASS, technical PASS, behavior PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read Claude's self-report against `/context`).
- **Time:** 15–20 min inside M1's 2h slot. First of three exercises on the same bug / same repo.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 3 (mirror)** — Claude's read reflects the student's prompt back at them.
- **Theme 4 (self-aware, grain of salt)** — the introspection prompt and the `/context` verification.
- **Theme 1 (90% correct)** — `/context` makes the unread slice visible.

**Watch-fors:**
- **Introspection skipped.** Student reads Claude's repo summary and moves to the bug fix without the second prompt. Nerd push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **`/context` skipped.** The slash command reads as prose, not as a command to type. Nerd push: *"type /context in the chat — look at the number."*

**Plug points:**
- Student's own repo (chosen in prework).

**Arc:**
- Picks up from: Connections (trick exchange) + the-wizard-move lecture.
- Hands off to: `fix-tests-first` — the bug gets fixed in the window you just mapped.

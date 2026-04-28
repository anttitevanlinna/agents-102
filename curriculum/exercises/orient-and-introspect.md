# Orient and introspect

**What you do:** have Claude read your repo, then interrogate what it read. The introspection prompt shows what Claude says it read; `/context` shows how full your context window has gotten.

**What happens:** Claude reports what it read and why, what it skipped and why. You see the bounded window directly. The self-report is a hypothesis. Assume 10% of what Claude says or does is misrepresentation. Could be more, could be less. Start digging.

**The point:** you can't steer what you can't see. This is the first move of every session after this one. Load deliberately, watch the budget, dig the self-report.

**Time:** 15–20 minutes.

Claude Code is open on your repo. You have a trivial bug picked from prework. Now: deliberate orientation, then introspection on what Claude says it read, then a look at your context budget.

Ask Claude to read your repo deliberately and report shape, structure, what's load-bearing, what's stale.

**Prompt** *(Claude Code)*

```
Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
```


Claude reads and reports. Let it finish.

Ask Claude to introspect on what it read, what it skipped, and the call it made on each.

**Prompt** *(Claude Code)*

```
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
```


Read Claude's own account. This is one of the most useful moves in the training: Claude can introspect on what it did and why, including what it chose to skip. The caveat is load-bearing. The self-report is a hypothesis, not ground truth. Claude confabulates reasons sometimes. Assume 10% of what Claude says or does is misrepresentation. Could be more, could be less. Spot-check by quoting back a specific file or function and asking Claude to confirm it.

Now look at your context budget. In the Claude Code chat, type:

```
/context
```

That's the slash command that shows how full your context window is — total used and breakdown by category (system prompt, messages, memory, skills). Look at the percentage. The window has a ceiling; the more it fills, the less room for new work. The slice of the repo Claude didn't load is the bounded-window reality. Your job going forward is to steer what lands in those bytes.

The window has shown itself. Hand off to the fix.

<!-- maintainer -->


**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-27 (check_writing, check_student_facing, check_prompts §2 lead-in confirmed/added; this cycle: action lead-ins added above prompt blocks per check_prompts §2; M1 audit GO)
- mechanical-tested 2026-04-28 (curriculum/evals/mechanical/instances/m1-chain-verbatim-judge-report.md @ 79adc5a PASS — 6/6 V via verbatim-check.sh, A1–A19 PASS, H1–H5 PASS, prompt-source audit P1–P5 + E1–E7 clean)
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

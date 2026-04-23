# Orient and introspect

**What you do:** have Claude read your repo, then interrogate what it read. The introspection prompt and `/context` together show you what actually landed in the window and what didn't.

**What happens:** Claude reports what it read and why, what it skipped and why. You see the bounded window directly. The self-report is a hypothesis; `/context` is ground truth. The delta is where the unread 10% lives.

**The point:** you can't steer what you can't see. This is the first move of every session after this one. Load deliberately, verify against the instrument, work inside a window you know the shape of.

**Time:** 15–20 minutes.

Claude Code is open on your repo. You have a trivial bug picked from prework. Now: deliberate orientation, then the instrument that shows you what Claude actually read.

**Prompt** *(copy → Claude Code)*

```
Read enough of this repo to tell me what's here: the shape, the structure, what looks load-bearing, what's been touched recently, what looks stale. Don't try to be complete. Read what you judge worth reading; skip what you judge isn't.
```

*(end of prompt)*

Claude reads and reports. Let it finish.

Now introspect on the read:

**Prompt** *(copy → Claude Code)*

```
What did you read, and why those files? What didn't you read, and why not? Name the specific files or directories you skipped and the call you made on each.
```

*(end of prompt)*

Read Claude's own account. This is one of the most useful moves in the training: Claude can introspect on what it did and why, including what it chose to skip. The caveat is load-bearing. The self-report is a hypothesis, not ground truth. Claude confabulates reasons sometimes. Take it with a grain of salt; verify against the actual output and the instrument below.

Now look at the instrument directly. In the Claude Code chat, type:

```
/context
```

That's the slash command for the context window: what's loaded, how much, what's been consumed reading files. Look at the number. The rest of the repo (the slice Claude *didn't* load) is where the 10% it couldn't address lives. Not a bug; the shape of working with a bounded window. Your job going forward is to steer what lands in those bytes.

You've seen the window. Hand off to the fix.

<!-- maintainer -->

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

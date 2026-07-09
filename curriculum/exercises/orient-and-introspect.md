# Orient and *map the window*

**Time:** 15–20 minutes.

**Session** *(new, "Module 1 - Orient and introspect")*

Start a new Claude Code session at your repo root. Optionally rename to `m1-orient`.

```
/rename m1-orient
```

**What you do:** have Claude read your repo, then interrogate what it read.

**What you build:** a picture of what landed in the context window and what didn't: a deliberate read of your repo, the agent's own account of what it skipped, and the context budget that shows the unread slice. Together they map the window you steer for the rest of the training.

**The point:** you can't steer what you can't see. This is the first move of every session after this one. Load deliberately, watch the budget, dig the self-report.

---

## Read your repo deliberately

- A deliberate read beats a blind one. You decide what Claude loads: the repo's shape, its structure, what's load-bearing, what's gone stale. A cold agent reads whatever it stumbles into; you point it.
- You are not on the hook for reading the repo. The agent does that. Your job is to steer what it loads and keep half an eye on the budget.

> **Big repo? The read can fan out.** If Claude starts reading dozens of files, interrupt with `Esc`, narrow to one feature or directory, and say `continue`.

Ask Claude to read your repo deliberately and report what it finds.

{{prompt:orient-and-introspect-1}}

The agent reports back a map of the repo: shape, structure, what's load-bearing, what's stale. Let the read finish before you interrogate the map.

## Ask what Claude skipped, and why

- Every read has a shadow: the files Claude didn't load. The skipped slice is where the surprises hide.
- Claude can introspect on what it did and why, including what it chose not to read.

Ask Claude to introspect on what it read, what it skipped, and the call it made on each.

{{prompt:orient-and-introspect-2}}

## Read the self-report, then spot-check it

- The account is a reconstruction, not ground truth. The LLM confabulates reasons sometimes. Assume about 10% of what it says or does is misrepresentation. Could be more, could be less.
- You can spot-check it. Quote a specific file or function back and ask Claude to confirm it read what it claims.

## Check how full the window is

- The context window has a ceiling. `/context` is the slash command that shows how full it is: total used, and the breakdown by category (system prompt, messages, memory, skills).

{{prompt:orient-and-introspect-3}}

(`/context` is oldskool; [ccstatusline](https://github.com/sirmalloc/ccstatusline) shows the same thing continuously in your status line.)

## Read the unread slice

- The unread percentage from `/context` is the number that matters. The more the window fills, the less room for new work.
- The slice Claude didn't load stays real. The window holds only so much; going forward, you choose what fills it.
- You now have a map of the window: what loaded, what Claude skipped, and how much room is left. The next exercise fixes the bug you brought from prework, inside the window you just mapped.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** All bullet leads de-bolded to plain bullets; no named laws or coined terms in this body, so no handles kept. Widget chrome (`**Time:**`, `**Session**`, `**What you do:**`, `**What you build:**`, `**The point:**`) and the blockquote callout untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@3605eee story@88a1dd4 technical@3605eee behavior@3605eee pedagogy@3605eee slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read Claude's self-report against `/context`).
- **Time:** 15–20 min inside M1's 2h slot. First of three exercises on the same bug / same repo.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 3 (mirror)** — Claude's read reflects the student's prompt back at them.
- **Theme 4 (self-aware, grain of salt)** — the introspection prompt and the `/context` verification.
- **Theme 1 (90% correct)** — `/context` makes the unread slice visible.

**Deliberate phrasing (maintainer-attested, do not edit):** the *"Assume about 10%… Could be more, could be less."* line is intentional in exactly that format — the round number plus the open retraction is the teaching shape (a working prior the student holds loosely, not a measured constant). `check_slides.md` rule 7's number-plus-retraction sub-item does NOT fire here; judges flag it → accept-with-note, no edit.

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

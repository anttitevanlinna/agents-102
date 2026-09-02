# Orient and *map the window*

**Time:** 20 minutes.

**Session** *(new, "Module 1 - Orient and introspect")*

Start a new Claude Code session at your repo root. Renaming is optional, but helps you find the right window when several are open.

```
/rename m1-orient
```

**What you do:** have Claude read your repo, then interrogate what it read.

**What you build:** a picture of what landed in the context window and what didn't.

**The point:** the context window is not your codebase.

---

## Read your repo deliberately

- You steer what Claude loads: the repo's shape, its structure, what's load-bearing, what's gone stale. A cold agent reads whatever it stumbles into; you point it.

> **Big repo? The read can fan out.** If Claude starts reading dozens of files, interrupt with `Esc`, narrow to one feature or directory, and send a `continue`-prompt. It can also stop short, and that one is harder to catch because a confident answer arrives either way. If the read names only the files you'd have guessed at, a `"there's more here"`-prompt buys another pass.

Ask Claude to read your repo deliberately and report what it finds.

{{prompt:orient-and-introspect-1}}

## Ask what Claude skipped, and why

- Every read has a shadow: the files Claude didn't load. The skipped slice is where the surprises hide.
- Claude can introspect on what it did and why, including what it chose not to read.

Ask Claude what it read and what it skipped.

{{prompt:orient-and-introspect-2}}

## Read the self-report, then spot-check it

- The account is a reconstruction, not ground truth. The LLM confabulates its actions as well as its reasons. Assume about 10% of what it says or does is made up. Could be more or less than this heuristic suggests.
- You can spot-check it. Quote a specific file or function back and ask Claude to confirm it read what it claims.

## Check how full the window is

- The context window has a ceiling. `/context` is the slash command that shows how full it is: total used, and the breakdown by category (system prompt, messages, memory, skills).

Run `/context` to see how much of the window is used and what fills it.

{{prompt:orient-and-introspect-3}}

(`/context` is oldskool; a status line shows the same thing continuously. Use [ccstatusline](https://github.com/sirmalloc/ccstatusline), or ask Claude to build your own with `/statusline`.)

## The slice Claude didn't load

- What you want is the least context that holds exactly what the task needs. `/context` tells you what you are carrying; accuracy on the next task tells you whether it is the right load.
- The slice Claude didn't load stays real. The window holds only so much; going forward, you choose what fills it.

<!-- maintainer -->

**View summary:** You direct the agent's first read of your real repository, ask what it skipped and why, spot-check that self-report against the files themselves, and close on the `/context` number naming how much of your codebase never entered the window at all.

**Closing beat is `## The slice Claude didn't load`.** The beat correctly carries **no prompt**: the `/context` run is the move, and this slide is the closing claim about context economy — a header that commands a read of a number `/context` already printed is dead weight (`check_student_facing.md` §27, `check_slides.md` §6). `getting-going.md`'s leap test names the target as the *unread-slice number*, not a set of files, so do not add a file-opening instruction — that invents a beat the design does not have and contradicts the leap test. Built workbooks under `site/clients/**` carry the older `id="read-the-unread-slice"` anchor until regenerated. The result is a practical map of what the agent loaded, what it skipped, and where your steering begins.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** All bullet leads de-bolded to plain bullets; no named laws or coined terms in this body, so no handles kept. Widget chrome (`**Time:**`, `**Session**`, `**What you do:**`, `**What you build:**`, `**The point:**`) and the blockquote callout untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Quality:** compendium-audited 2026-09-02 (writing@9edae2ef story@d065f8bc technical@8cc00874 behavior@1480362 pedagogy@77991802 strategy@1480362 slides@9edae2ef)
- judges @9edae2ef: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read Claude's self-report against `/context`).
- **Atomic — no phase markers.** One conversation with the agent; the interrogation has no seam to cut on. Line 3 is authored, not generated.
- **Placement:** first of four exercises on the same bug / same repo.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 3 (mirror)** — Claude's read reflects the student's prompt back at them.
- **Theme 4 (self-aware, grain of salt)** — the introspection prompt and the `/context` verification.
- **Theme 1 (90% correct)** — `/context` makes the spend visible; the introspection prompt makes the skipped slice visible.

**The context frame is a target, not a gauge (Antti, 2026-08-12).** The closing bullet deliberately does not name a number as the one that matters. Both the free-percentage and used-percentage framings were written and both rejected: a capacity reading says *fine until it fills*, and the window does not behave like a container. The aim is to complete the task on the least context that holds exactly the right content, and both halves are load-bearing — a thin context missing what the task needs fails as surely as a bloated one, and only the second shows up on a percentage. `/context` reports what is being carried and cannot report whether it is the right load. Do not restore *"the free percentage is the number that matters"*, *"how much room is left"*, or any fuel-gauge phrasing; a judge flagging the bullet for not naming a metric is flagging the design. Canonical: `bosser-strategy:content-strategy-agentic-engineering-101.md` § Terminology — memory vs context. An earlier draft also carried *"the agent gets less precise as it fills"* — true in practice but an empirical claim with no source in this file, and the target framing makes it unnecessary; the mechanics belong to the context-ceiling supplementary.

**Deliberate phrasing (maintainer-attested, do not edit):** the *"Assume about 10%… Could be more or less than this heuristic suggests."* line is intentional in exactly that format — the round number plus the open retraction is the teaching shape (a working prior the student holds loosely, not a measured constant). `check_slides.md` rule 7's number-plus-retraction sub-item does NOT fire here; judges flag it → accept-with-note, no edit.

**Watch-fors:**
- **Introspection skipped.** Student reads Claude's repo summary and moves to the bug fix without the second prompt. Trainer push: *"before we move on — what did Claude choose not to read, and does that match what you'd have expected?"*
- **`/context` skipped.** The slash command reads as prose, not as a command to type. Trainer push: *"type /context in the chat — look at the number."*

**Plug points:**
- Student's own repo (chosen in prework).

**Arc:**
- Picks up from: Connections (trick exchange) + the-wizard-move lecture.
- Hands off to: `fix-tests-first` — the bug gets fixed in the window you just mapped.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Runs `/context` on a working session and reads what fills the window** without being prompted. Falsifiable: scrollback of a normal session shows `/context` as a deliberate move within the first ten minutes, not a feature tour.
2. **Asks Claude what it skipped and why after a repo-read**, before taking any code action. Falsifiable: a follow-up introspection prompt appears in scrollback after the initial orient prompt.
3. **Spot-checks Claude's self-report by quoting a specific file or function back** when the report feels off. Falsifiable: scrollback shows a quote-back move under a "you said you read X, what's actually in it?" shape.

<!-- backing -->

Claims
- `context-window-is-not-the-codebase` · vision · "the context window is not your codebase" ← none-owed
- `every-read-has-a-shadow` · vision · "Every read has a shadow: the files Claude didn't load. The skipped slice is where the surprises hide." ← none-owed
- `agent-can-introspect-on-what-it-skipped` · detail · "Claude can introspect on what it did and why, including what it chose not to read." ← self-report-is-not-a-log
- `spot-check-the-self-report` · vision · "Read the self-report, then spot-check it" ← none-owed
- `status-line-shows-context-continuously` · detail · "a status line shows the same thing continuously" ← ccstatusline, statusline-builtin
- `claude-builds-the-status-line` · detail · "ask Claude to build your own with `/statusline`" ← statusline-builtin

Sources
- self-report-is-not-a-log `[checked:2026-08-01 result:CAVEAT due:cohort]` (no URL — house position) — [house canonical] An agent's account of what it read is generated text, not an instrumented log, and can be confidently wrong about its own behaviour. **The exercise is built on this caveat rather than around it** — the spot-check beat exists precisely because the self-report is unreliable, which is why the claim is safe to teach: the student is asked to verify it, not to trust it. fallback: none needed; the exercise's own third beat is the fallback.
- ccstatusline `[checked:2026-08-02 result:OK due:cohort]` https://github.com/sirmalloc/ccstatusline — [capability] Third-party status-line formatter for the Claude Code CLI, described by its own repo as showing "model info, git branch, token usage, and other metrics in your terminal"; ships Context % and Context Length widgets, which is the continuous read of what `/context` reports once. Active at check: v2.2.27, 361 commits, not archived. `due:cohort` because a third-party tool is somebody else's release schedule. fallback: cut the parenthetical — `/context` alone carries the beat, and the aside is a convenience pointer, not a step.
- statusline-builtin `[checked:2026-08-03 result:OK due:cohort]` https://code.claude.com/docs/en/statusline — [capability] Anthropic's docs on Anthropic's own product. Verified against the docs AND live against the installed binary, v2.1.220: `/statusline` is a builtin prompt-command ("Set up Claude Code's status line UI") whose allowed tools are `Read(~/**)` + `Edit(~/.claude/settings.json)`, dispatching subagent type `statusline-setup`. "Ask Claude to build your own" names the mechanism, not a figure of speech. The docs' own example line is `/statusline show model name and context percentage with a progress bar`, and the script it writes receives `context_window.used_percentage` on stdin — the same number `/context` prints once. The docs are terminal-shaped throughout (ANSI colours, `COLUMNS`), so this half of the aside inherits the CLI assumption the ccstatusline pointer already carried. `due:cohort` because the status-line data contract carries per-field version floors that move with releases. fallback: cut the second half of the parenthetical — ccstatusline alone carries the aside.

Frameworks
- Context as a bandwidth-limited channel · [borrow:information theory] · law:bandwidth-limited-channel · ← cultural-vocab
- Observability precedes control · [borrow:control theory] · law:is-a-closed-loop-controller · ← cultural-vocab — you cannot steer a loop you cannot read

Stance `[stance:2026-08-01 level:L1]`
- holds: that models can report on their own context decisions well enough to be useful, and not well enough to be trusted. Both halves matter and the exercise teaches both in sequence.
- contested: how far the self-report tracks reality. **Nobody has published a measurement of it, and this exercise deliberately does not need one** — its move is verify-the-claim, which is correct whether the self-report is 90% accurate or 40%.
- would-move-it: published work measuring introspective accuracy on context decisions. High accuracy would let the spot-check beat shrink; low accuracy would make it the whole point rather than the third of three.

OODA
- question: has anyone measured how accurately a coding agent reports what it did and did not read?
- roster: Anthropic interpretability publications, Simon Willison, Chroma's context research, Addy Osmani
- last-run: 2026-08-01

<!-- /backing -->

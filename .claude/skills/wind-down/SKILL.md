---
name: wind-down
description: Run the end-of-session protocol — enumerate deferred checks, run them, capture corrections via /compound, append taste calls to curriculum/taste-notes.md, then clear sentinels and push. Invoke when Antti signals the session is wrapping ("let's wind down", "we're wrapping up", "ship it", or `/wind-down`). Do NOT invoke mid-session — this is the wrap ritual, not a mid-stream gate.
argument-hint: [scope] (default: full | quick — skip sim+eval if no substantive curriculum edits)
---

# /wind-down — end-of-session protocol

Sessions accumulate deferred work: sim+eval gates skipped while iterating, corrections worth compounding, signal files uncommitted, sentinels left on disk. The fix is a deliberate wrap ritual you run when *you* decide the session is over.

**Order matters: check → test → compound → bank taste → clear → hand off.** Don't compound before testing (a failing sim+eval may surface a correction worth capturing). Don't clear before compounding (sentinels are the evidence of what happened).

## When to invoke

- Antti signals wrap: "let's wind down", "we're wrapping up", "ship it", "I'm done for now", or explicit `/wind-down`.
- Before a long break, model switch, or push of significant changes to `main`.

Do NOT invoke mid-session, after trivial turns (typo / single label swap), or without Antti's wrap signal.

## The protocol

### Step 1 — Check

```bash
SID="$CLAUDE_SESSION_ID"
test -f /tmp/claude-curr-edits-${SID} && cat /tmp/claude-curr-edits-${SID}
cd ~/Projects/agents-102 && git status --short
git status --short -- continuous-research/
git diff -- 'curriculum/articles/*.md' 'content/articles/*.md' 2>/dev/null | grep -E '^\+status: ready'
git log --since="3 hours ago" --oneline   # what was already committed mid-session
```

Report a 5-line punch list:

```
Deferred this session:
- N substantive curriculum edits → sim+eval gate (curriculum-pre-ship-audit)
- N research files modified      → /research-review per file
- N article(s) flipped to ready  → article pre-publish gate
- M uncommitted signal/content files → commit + push
- K corrections worth capturing   → /compound
```

Empty list → say so, skip to Step 4.

### Step 2 — Test

For each item Antti confirms, dispatch via Agent tool (parallel, main thread reads only summaries):

- **sim+eval** → `/curriculum-pre-ship-audit` against named files. Block on REVISE; approve-with-todos OK.
- **research-review** → `/research-review <file>` per modified research file.
- **article pre-publish gate** → banned-word + source-URL scan.

Report eval evidence at its exact scope: `audit-eval-coverage` proves mandatory stored-instance coverage, not the seven-class pre-ship audit. Name the classes actually fired; say full audit only after all seven current-body verdicts exist and the Quality block is stamped.

### Step 3 — Compound

Ask: "Any corrections worth compounding? Top 1–3 only." For each, invoke `/compound`. Skip if none surfaced — most sessions yield 0–1.

### Step 3b — Append taste notes

Separate from Step 3 and runs even when `/compound` yields nothing. Ask: **"Any taste calls worth banking?"** Append to `curriculum/taste-notes.md`, newest entry at the top, under a `## <date> — <scope>` heading.

Bank the four shapes the file names: a call Antti made on a specific sentence (quote the sentence); a **counterweight** — a defensible cut he refused, and why the redundancy earned its keep; a survivor worth imitating, quoted whole; a rewrite that failed and what was wrong with it.

The counterweights are the point. A rule ships without its exceptions and the next agent applies it to a room it has never met. Do not bank anything already firing as a numbered rule — cite the rule number instead. Do not bank a cut nobody argued about.

Zero entries is a normal session. A session where Antti only accepted proposals produced no taste, just compliance; the entry is worth writing when he **rejected, reframed, or corrected** something.

### Step 3c — Read the todo pile as rule feedback

```bash
node curriculum/evals/scripts/rule-heat.js --training ae101 --limit 10
```

Step 3 mines this session for corrections; this reads what the judges have been saying across the whole corpus and nobody has acted on. It is the more objective of the two — 83 files of standing observation against one session's memory.

**A standing population of open todos is healthy, and driving it to zero is not the goal.** Zero would mean the judges had stopped noticing. Never work the todos one by one, and never decline them one by one: a rule firing non-blocking across fifteen files is one mis-calibrated rule, not fifteen flawed files, and closing fifteen notes by hand spends real attention to make a report look tidy while changing nothing about what the next sweep raises.

Read the `·` column — rules that have fired and **never once gated**. On the first run that was 47 of 61. A rule in that state is one of three things, and only the maintainer can say which:

- **advisory by nature** → mark it so, and its notes stop reading as work;
- **too broad** → it wants a carve-out; the notes are true and unhelpful;
- **under-weighted** → it matters, and should block.

Pick at most one or two. Read every hit first — `--rule "writing §20"` prints each one with the judge's own evidence, which is what an amendment has to be written against. Then `/compound` it, which lands the amendment, rebuilds the index and repins.

**Prefer a narrowing amendment.** Every pinned verdict older than the repin re-enters the queue as `rule-drift`, but a narrowing — a carve-out, an N/A clause, a new accept path — can only turn REVISE into PASS on a file that already passed, so the drift it creates is cheap to clear. A widening can flip PASS to REVISE and owes a real re-read of every file in reach.

Zero amendments is a normal session. The number worth watching is not the pile but its concentration: a healthy corpus spreads a modest pile thinly across many rules, a sick one has ten rules shouting.

### Step 4 — Clear, commit, push

```bash
find /tmp -maxdepth 1 \( -name 'claude-curr-edit-*' -o -name 'claude-curr-reminded-*' -o -name 'claude-curr-edits-*' \) -exec rm -f {} +
cd ~/Projects/agents-102 && git status --short
# Commit with a real message (not "wind-down cleanup"). Push — multi-user repo.
git push
```

Report:
```
Cleared: edit counter, legacy sentinels.
Committed: <commit msg> (or "nothing to commit").
Pushed: yes / no.
```

### Step 5 — Hand off

Produce ONE of:

- **Starting prompt for next session** — paste-ready block, output **inline by default**. Include: working dir, what shipped, what's outstanding, next concrete move, any new rules / compounded entries the next agent should know upfront. Write to `~/.claude/plans/<topic>-session-handoff.md` ONLY when (a) Antti asks for a file, (b) the handoff is >30 lines, or (c) the topic spans multiple sessions.
- **"Done-done"** — topic genuinely closed, no follow-up. State explicitly: *"Done-done. No follow-up. Next session starts fresh."*

## Scope variants

- **`/wind-down`** — full protocol.
- **`/wind-down quick`** — skip sim+eval when no substantive curriculum edits; still runs compound + commit + clear. Use for strategy/planning sessions.

## Anti-patterns

- **Compounding before testing.** Failing sim+eval often surfaces the correction. Test first.
- **Clearing before committing.** Sentinels are evidence; don't delete before commits land.
- **Running every turn.** This is the wrap ritual. The Stop hook fires above 20 edits as a "you forgot" net, not the protocol itself.
- **Padding /compound.** 0–1 entries per session. If you're drafting 5, at least 4 are session context, not durable rules.
- **Padding taste-notes with agreement.** An entry recording that Antti approved what was proposed teaches nothing. The bankable moments are the refusals, the reframes, and the corrections — write those or write nothing.
- **Reading source files in main thread to enumerate.** `git status` + `git log` are enough. Subagents do file-level work.
- **Stale handoff files.** Don't write `~/.claude/plans/<topic>-session-handoff.md` reflexively. The file persists across sessions and goes stale; an inline starting prompt is fresher. File-on-disk is for genuinely cross-session topics.
- **Hook double-fire on compendium amendment.** When `/compound` writes the entry first then amends the compendium (correct order per Step 3), the compendium-edit hook may suggest `/compound` as if it hadn't run. Ignore — the entry exists.
- **`HEAD@{N.hour.ago}` time pseudo-refs.** Fragile across long sessions, depend on reflog config. Use `git status` for unstaged and `git log --since=` for committed.

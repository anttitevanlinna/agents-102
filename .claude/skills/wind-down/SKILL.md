---
name: wind-down
description: Run the end-of-session protocol — enumerate deferred checks, run them, capture corrections via /compound, then clear sentinels and push. Invoke when Antti signals the session is wrapping ("let's wind down", "we're wrapping up", "ship it", or `/wind-down`). Do NOT invoke mid-session — this is the wrap ritual, not a mid-stream gate.
argument-hint: [scope] (default: full | quick — skip sim+eval if no substantive curriculum edits)
---

# /wind-down — end-of-session protocol

Sessions accumulate deferred work: sim+eval gates skipped while iterating, corrections worth compounding, signal files uncommitted, sentinels left on disk. Mid-session interruptions (e.g., the Stop hook) are noise. The fix is a deliberate wrap ritual you run when *you* decide the session is over.

**Order matters: check → test → compound → clear.** Don't compound before testing (a failing sim+eval may surface a correction worth capturing). Don't clear before compounding (sentinels are the evidence of what happened).

## When to invoke

- Antti signals wrap: "let's wind down", "we're wrapping up", "ship it", "I'm done for now", or explicit `/wind-down`.
- Before a long break or model switch.
- Before pushing significant changes to `main`.

Do NOT invoke:
- Mid-session, between iterations.
- After trivial turns (typo fix, single label swap).
- Without Antti's wrap signal — this is *the* wrap ritual.

## The protocol

### Step 1 — Check (enumerate what's deferred)

Read state and produce a short punch list. Do not execute yet.

```bash
# Substantive curriculum edits this session
SID=$(echo "$CLAUDE_SESSION_ID")  # if not set, agent passes from context
test -f /tmp/claude-curr-edits-${SID} && cat /tmp/claude-curr-edits-${SID}

# Uncommitted signal files / curriculum changes
cd ~/Projects/agents-102 && git status --short

# Files touched in continuous-research/ this session (research-review gate)
git diff --name-only HEAD@{1.hour.ago} -- continuous-research/ 2>/dev/null

# Article status flips to ready (pre-publish gate)
git diff HEAD@{1.hour.ago} -- 'curriculum/articles/*.md' 'content/articles/*.md' 2>/dev/null | grep -E '^\+status: ready'
```

Report to Antti as a 5-line punch list:

```
Deferred this session:
- N substantive curriculum edits → sim+eval gate (curriculum-pre-ship-audit)
- N research files modified      → /research-review per file
- N article(s) flipped to ready  → article pre-publish gate (+ /goalcheck if CTO-targeted)
- M uncommitted signal/content files → commit + push
- K corrections worth capturing   → /compound

Run all? Or pick a subset?
```

If the list is empty (no substantive work this session), say so explicitly and skip to Step 4.

### Step 2 — Test (run the gates that fired)

For each item Antti confirms:

- **sim+eval** → invoke `/curriculum-pre-ship-audit` against the named files. Block on REVISE; approve-with-todos acceptable.
- **research-review** → invoke `/research-review <file>` for each modified research file.
- **article pre-publish gate** → run banned-word scan, source-URL scan; for CTO-targeted articles also run `/goalcheck <file> a`.

Run these via subagents (Agent tool, parallel). Main thread stays orchestrator-only and reads only summary outputs.

### Step 3 — Compound (capture corrections)

Ask Antti: "Any corrections from this session worth compounding? Top 1–3 only."

For each, invoke `/compound` per its own protocol (classify → schema entry → optional compendium amendment).

Skip if no durable corrections surfaced. Most sessions have 0–1 worth compounding; do not pad.

### Step 4 — Clear (reset state, commit, push)

Execute in order:

```bash
# Reset edit counter (and clean any legacy sentinels)
find /tmp -maxdepth 1 -name 'claude-curr-edit-*' -o -name 'claude-curr-reminded-*' -o -name 'claude-curr-edits-*' 2>/dev/null | xargs -r rm -f

# Commit anything still in working tree (signal files, content)
cd ~/Projects/agents-102 && git status --short
# If anything to commit, do it with a real message (not "wind-down cleanup")

# Push — multi-user repo, signals are lost to research system if local
git push
```

Report the final state:
```
Cleared: edit counter, legacy sentinels.
Committed: <commit msg> (or "nothing to commit").
Pushed: yes / no.
Session wrap complete.
```

### Step 5 — Hand off to next session (always)

Always produce ONE of two outputs at the end of wind-down:

- **Starting prompt** for the next session — a paste-ready block Antti can drop into a fresh session to pick up where this one left off. Include: working dir, what shipped this session, what's outstanding (TODOs, deferred items, decisions pending), the next concrete move, and any rules / compounded entries the next agent should be aware of upfront. Save to `~/.claude/plans/<topic>-session-handoff.md` for durability AND output inline so Antti can copy. Format mirrors `~/.claude/plans/evals-session-handoff.md` from 2026-05-02 (a worked example).
- **"Done-done"** declaration — when the topic is genuinely closed (no outstanding work, no pending decisions, nothing to pick up). State it explicitly: *"Done-done. No follow-up. Next session starts fresh."*

Pick one. Never end wind-down without one of these two outputs. The starting prompt is the default; only emit done-done when the topic is fully resolved.

## Scope variants

- **`/wind-down`** — full protocol.
- **`/wind-down quick`** — skip sim+eval if no substantive curriculum edits accumulated; still runs compound + commit + clear. Use when the session was strategy/planning only.

## Anti-patterns

- **Compounding before testing.** A failing sim+eval often surfaces the correction worth compounding. Test first.
- **Clearing before committing.** Sentinels are evidence of what happened; do not delete until commits are pushed.
- **Running this every turn.** This is the wrap ritual. The Stop hook safety net only fires above 20 substantive edits — that's the "you forgot to wind down" reminder, not the protocol itself.
- **Padding /compound.** Most sessions yield 0–1 compounded corrections. If you find yourself drafting 5, stop — at least 4 are restating session context, not durable rules.
- **Reading source files in main thread to enumerate.** Use `git status` and `git diff --name-only`. Subagents do the file-level work.

---
name: session-historian
description: Surface prior investigations from past Claude Code sessions on the current topic. Greps ~/.claude/projects/*/memory/ and recent transcripts for keyword matches. Use when starting work that might repeat a past attempt ("did we already try X?", "have we made this decision before?", "what was the outcome of the Y investigation?"). Prevents re-walking dead ends.
argument-hint: <topic-or-keyword>
---

# /session-historian — what did we already try?

Every significant investigation leaves traces in `memory/`, the self-review correction log, `memory/compounded/`, and the session transcripts themselves. This skill surfaces those traces so you don't re-walk dead ends.

Inspired by Every's `ce-session-historian` — stripped down for our single-harness (Claude Code only) setup.

## When to invoke

- Starting a task that sounds familiar ("didn't we already look at this?")
- About to propose an approach that might have been tried before
- Debugging a repeat correction (the rule is there; why isn't it landing?)
- Before `/compound`-ing a correction, to check if it's a fresh shape or a recurrence of a known one

## Do NOT invoke for

- General project orientation (that's what CLAUDE.md + MEMORY.md are for)
- Fresh topics with no likely history — the skill returns nothing useful and costs attention

## The flow

### Step 1 — Normalize the query

Accept `$ARGUMENTS[0]` as a topic/keyword. Expand to 3–5 related search terms. Example:
- Input: "AE101 delivery"
- Expanded: AE101, delivery architecture, knowledge home, pre-engagement, cohort, Teacher Claude

### Step 2 — Search in priority order

Parallel searches (single message, multiple Grep calls):

1. **`memory/compounded/`** — schema-validated corrections/patterns. Highest signal.
2. **`memory/project_*.md`** — decisions and investigations.
3. **`memory/self-review-protocol.md`** — correction log.
4. **`memory/feedback_*.md`** and legacy feedback files.
5. **`continuous-research/user-signals/`** — user questions and comments on the topic.
6. **Session transcripts** at `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/`. Greppable via Bash/rg on the `.jsonl` files. Skim skeletons only (head:200, tail:100 per match) — never load whole transcript files into context.

### Step 3 — Consolidate matches

For each source, return at most 3 excerpts. Reject:
- Exact filename matches with no prose around them (noise)
- Matches older than 6 months unless tagged as durable decision
- Matches from the current session (loop-back)

### Step 4 — Present

```
## Session history — query: "AE101 delivery" — <date>

### Durable decisions (compounded/project memories)
- `memory/project_ae101_delivery_architecture.md` — the runtime split (Cowork for participants, Claude Code for synthesisers), pinned <date>
- `memory/project_ae101_knowledge_home_contract.md` — pre-engagement contract, <date>

### Corrections (self-review / compounded)
- <date> — proposed X, Antti said Y — {one-line why}
- <date> — same correction recurred {N} times

### User signals
- <date> — comment: "participants don't understand the handoff between rooms"

### Suggestion
Given the above, before proposing a new AE101 delivery shape, re-read the two durable decisions. The pre-engagement contract was the most recent decision; check whether your proposal honors it.
```

### Step 5 — No-results case

If nothing meaningful returns, say so in one line: *"No prior investigation found for 'X' in the last 6 months."* Do not pad with speculation or generic advice.

## Implementation notes

- Transcript files can be large (multi-MB). Grep with line limits, never read whole files.
- If the transcript contains sensitive info (prospect names, credentials), strip it from any output surfaced. Per CLAUDE.md personal instructions, real prospect names must never be echoed — substitute with `[pseudonym]` if detected.
- Parallel searches save wall time. Six Grep calls in one message beat six sequential ones.

## The real test

Does this skill actually prevent a re-attempt? Track: when `/session-historian` returns durable decisions and the proposed approach is then rejected in favor of following the prior decision, the skill compounded. When it returns noise that Antti has to wade through, it cost attention. After 3 sessions, compound the pattern: what topics consistently benefit vs. what topics are always empty? Remove noisy matchers.

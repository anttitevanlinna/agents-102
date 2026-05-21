# Workflow composition — Cycle 2B failure recovery + exercise shapes

Research question: What would a composition exercise that builds in failure + recovery look like?
Date: 2026-05-20
Cycle: 2B (drilling Cycle 1B failure modes into curriculum-shape)
Freshness window: since 2025-11-20

Cycle 1B named seven composition failure modes. This cycle asks: of those, which is small enough, reproducible enough, and pedagogically clean enough to engineer into a ~15–20 minute Module 6 Phase 3 — *and* what recovery moves are practitioners actually publishing in the same window?

The picture: Stop-hook deadlock is reproducible today, the fix is one line, but it carries an instrumentation cost that makes the *bug itself* too fiddly to be the exercise core. The cleaner play is to use a smaller composition failure (skill collision or context pollution) as the felt-failure beat and reserve the Stop-hook story as a named lecture-side hazard.

---

## Stop-hook deadlock — reproduction picture

**Current status:** **Open, no fix shipped.** Issue #55754 closed as duplicate of #54360 (opened 2026-04-28, status open, label `stale`, no linked PR, no assigned owner). Bug is live in Claude Code 2.1.126 on Anthropic API as of issue date.

**Reproduction (from #54360 [practitioner direct]):**
1. Configure a Stop hook in `.claude/settings.json` that exits 2 (block) on any incomplete-task signal.
2. The hook **does not check `stop_hook_active`** before blocking.
3. Add a UserPromptSubmit hook that injects non-empty context (system reminder).
4. Trigger a model stop after work that generates a `<task-notification>` or persisted-output reminder.
5. Observe: hook fires 5+ times in ~10 minutes, each with `stop_hook_active=false`, agent burns full session quota (~50 min in #55754).

**The fix:** One conditional at the top of the hook script:
```bash
ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
if [ "$ACTIVE" = "true" ]; then exit 0; fi
```
Or in Python: read stdin → if `stop_hook_active` is true, exit 0 immediately. The flag is documented but **not enforced by the harness** — that's the issue author's request to Anthropic, still unfulfilled.

**Sources:**
- Issue #54360 — https://github.com/anthropics/claude-code/issues/54360 [practitioner direct] (2026-04-28, open)
- Issue #55754 — https://github.com/anthropics/claude-code/issues/55754 [practitioner direct] (2026-05-03, dup-closed)
- Agent Room, *How a Claude Code Stop hook unlocks async multi-agent collaboration* — https://dev.to/agent-room/how-a-claude-code-stop-hook-unlocks-async-multi-agent-collaboration-no-polling-required-2e0e [practitioner direct] (2026-05-17) — the *positive* composition pattern using the same hook, with explicit `MAX_BLOCKS_PER_CYCLE=60` (30-min) circuit breaker
- Claude Code Hooks reference — https://code.claude.com/docs/en/hooks [practitioner direct, vendor venue] — documents `stop_hook_active`

**Curriculum-fit:** **Partial.** The bug is real and current, but engineering it into a 15–20 minute exercise has friction: students need a configured Stop hook, a configured UserPromptSubmit hook, a background subagent, and the patience to watch a 5–10 minute loop reproduce. The fix is one line, which is good — but the *setup* eats the time budget. **Verdict: lecture it as the named hazard ("here's the bug, here's the one-line fix, here's why the docs flag exists"), but don't make students reproduce it.** Use a faster-feedback composition failure for the exercise itself.

---

## Recovery patterns (practitioner-documented)

### Recovery move 1 — Read the transcript, don't argue with the agent
**Trigger:** Stuck-loop, wrong-skill-fired, "Claude keeps doing X when I asked for Y."
**The move:** Stop the session. Open the transcript file directly (or use `/rewind`). Read what the agent saw — the system reminders, the hook injections, the skill descriptions that fired. The diagnostic isn't in the chat; it's in the context the agent was reasoning from.
**Practitioner:** Allie Rays, *Techniques to debug Claude Code* — https://allierays.com/posts/7-techniques-to-debug-claude-code/ [practitioner direct] (2026). Core principle: "Show, don't describe. Point Claude at the evidence directly." Inverted for the human: point yourself at what the agent saw.

### Recovery move 2 — Cancel + fresh window, not `/clear`
**Trigger:** Agent stuck in any loop where the in-window context is now the contamination (skill collision, polluted memory, telephone-game subagent handoff).
**The move:** Kill the session. Open a fresh window in the same cwd. `claude --resume` only if the prior context is recoverable; otherwise `new`. The 2026-05-15 compounded learning in this repo's memory (`platform-same-cwd-recovery-prefers-resume`) names the decision rule: same-cwd + recoverable prior context → resume; same-cwd + polluted context → new; cross-cwd → always new. `/clear` is a tool, not a ritual — only fires when the session continues with fresh context (memory entry `2026-05-14-pedagogy-clear-is-tool-not-ritual.md`).
**Practitioner:** Antti Tevanlinna's working memory (this repo). Consistent with Allie Rays' "if you're typing the same instruction twice, stop — you're being the loop" — the loop is in *your* prompting, not the agent's reasoning.

### Recovery move 3 — Disambiguate skill descriptions after a mis-fire
**Trigger:** Wrong skill activated; two skills with overlapping descriptions; a built-in shadowed a custom skill (Issue #33080, #35585, #56710).
**The move:** Open both SKILL.md files. Edit the description field to add an explicit "use this for X, **not Y**" disambiguation line. Re-run the same prompt that triggered the mis-fire. If the library is past ~50 skills, audit which descriptions are getting truncated under the 122-skill context budget (#56710).
**Practitioner:** Multiple — DEV Community *Claude Code Skills: A Practical Guide for 2026* by Muhammad Moeed (https://dev.to/muhammad_moeed/claude-code-skills-a-practical-guide-for-2026-3f6p, 2026) [practitioner direct] names the disambiguation pattern. Convergent with MindStudio's *3 Common Mistakes* (https://www.mindstudio.ai/blog/claude-code-skills-common-mistakes-guide) [practitioner analysis].

### Recovery move 4 — Engineered break/fix in a teaching context (Wyndo)
**Trigger:** Used as a *teaching* pattern, not a debug pattern — but the move is the same shape.
**The move:** Build the skill live, *let it break*, then have Claude Code analyse the broken skill files and propose fixes. Don't hide the broken state. Wyndo: "I won't hide the confusing cases in building Claude Skills. You can actually watch me debug when things inevitably break."
**Practitioner:** Wyndo, *Claude Skills Deep Dive* — https://aimaker.substack.com/p/claude-skills-deep-dive-video-tutorial-build-debug-review-anthropic [practitioner direct] (2025-11-20). The published failures: wrong file location, missing reference files, malformed frontmatter — all caught at upload, not at runtime.

---

## Composition exercise shapes from the wild

The pattern across what got published since 2025-11-20:

- **Anthropic's official Agent Skills course** (https://anthropic.skilljar.com/introduction-to-agent-skills): six lessons, ends with *Troubleshooting skills* lesson — frontmatter errors, trigger failures, priority conflicts. **Composition: single primitive (skills only). Failure mode: configuration error, not composition error.** Pedagogically clean but doesn't scale to multi-primitive composition.
- **Anthropic claude-cookbooks `patterns/agents`** (https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents): notebook recipes for orchestrator-worker, evaluator-optimizer, routing. **Composition: real, multi-primitive. Failure mode: none — recipes show happy paths.** Useful as a reference, not a teaching lab.
- **Wyndo's break-fix video** (above): single-primitive (skill-building) with deliberate breakage. **Right pedagogical shape, wrong primitive count.**
- **Agent Room's Stop-hook + async-subagent post** (above): three-primitive composition (hook + skill + subagent), shows the *working* pattern with `MAX_BLOCKS_PER_CYCLE` circuit breaker. **Implicit failure mode (no breaker = deadlock) is named but not engineered.**
- **Boringbot (Hamza Farooq + Aishwarya Ashok)**, *Skills, Subagents, Hooks, Plugins, and Harnesses for Production* — https://boringbot.substack.com/p/claude-code-skills-subagents-hooks [practitioner analysis] (2026-05-05): names primitive-mixing as the central failure mode ("a behavioural constraint that should be a hook gets written into a system prompt"). **No worked exercise — paywall.**

**Whitespace:** No public composition lab found that asks the student to ship a 2+ primitive workflow, watch it fail in a *named* way, then fix it. The closest is Wyndo (right shape, wrong scope) and the Stop-hook GitHub issues (right scope, no teaching frame). **AE101 Module 6 Phase 3 could be the first published example of this exact shape** — the pedagogical gap is wide enough to plant a flag.

---

## Curriculum sketch — 2–3 options for M6 Phase 3

Each option assumes the student finished Phase 2 with a second skill in hand (composing alongside M3's test-strategy skill and M5's verifier). Time budget ~15–20 min. Felt failure, not prescription.

### Option A — Skill collision (recommended)
1. **Add a second skill description that overlaps the first** (e.g., two skills both claim "test-related work"). Don't tell the student which will fire.
2. **Run the same prompt twice with `--clear-tools` between** so the student sees one skill fire one time and the other fire the next. The fuzzy-match non-determinism is the felt failure.
3. **Name the failure mode** ("this is skill collision — Issue #33080, current as of 2026-05") so the student has a vocabulary anchor.
4. **Fix:** edit one skill's description to add an explicit "use this for X, **not Y**" disambiguation line.
5. **Re-run; both skills now fire deterministically.** Encode the rule: descriptions are triggers, not labels.

*Why this option:* fastest reproduction (seconds, not minutes), one-line fix, names a current 2026 bug, and the recovery move (read the description, disambiguate) is reusable across the student's whole skill library going forward.

### Option B — Stop-hook deadlock (lecture, don't reproduce)
1. **Walk the bug as a 5-minute lecture** with Issue #54360 + #55754 + the fix snippet projected.
2. **Show the one-line fix:** `if stop_hook_active=true: exit 0`.
3. **Show the documentation gap:** the flag exists in docs, the harness doesn't enforce it.
4. **Connect to the trifecta frame:** any composition with a Stop hook + async subagent + slow background work has this hazard until the fix lands.
5. **Encode the rule:** every Stop hook the student writes from now on opens with the active-check guard.

*Why not the exercise core:* setup is ~10 min, reproduction is ~5–10 min, the student watches a loop more than they debug it. Better as lecture-side hazard than felt-failure beat. Wire it into the M6 lecture, not Phase 3.

### Option C — Context pollution from over-saving
1. **Phase 2 already had the student's skill writing notes to memory.** Phase 3 starts: run the same retrieval query four times in a row, each writing to memory.
2. **Watch retrieval degrade** as the search returns more and more near-duplicate hits (memory bloat, named in Cycle 1B failure mode 6).
3. **Name the failure:** Jayanand's *Context Pollution Over Time* (https://medium.com/@jakrom/ais-next-bottleneck-context-pollution-over-time-780619eae8ef, 2026-03) [practitioner analysis].
4. **Fix:** add a write-guard to the skill ("only save if not duplicate of last 3 entries").
5. **Encode the rule:** memory writes need a budget. Cognition's "share full traces" cures handoff loss but causes pollution — composition has to find the middle.

*Why this option works but Option A is stronger:* the setup is heavier (needs a memory store wired into the skill), the failure mode is slower to reveal, and the fix involves more code. Pedagogically valid but eats the time budget. Use as Phase 3 stretch goal if a student finishes Option A in 10 min.

---

## What I did not find

- A published composition lab (skill + hook + subagent) with engineered failure + recovery. The pedagogical shape is whitespace; AE101 M6 P3 can plant the flag.
- An Anthropic-shipped fix for the Stop-hook deadlock. Issue #54360 remains open, `stale`-labelled, no linked PR. The bug is current as of 2026-05-20.
- Independent academic / benchmark replication of the 3–10× token-overhead figure for multi-agent vs single-agent composition. Still single-source (Cognition + Anthropic). Mark as single-source until replicated.
- Convergence on the recovery taxonomy — practitioners name 3–5 moves each (read transcript / fresh window / disambiguate description / engineered break-fix) but no one has published the unified recovery checklist. Whitespace.

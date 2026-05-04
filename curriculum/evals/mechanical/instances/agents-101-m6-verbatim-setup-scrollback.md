# Agents 101 M6 Setup — Scrollback Transcript

## Execution Summary

Setup Actor executed Phases 0/1/2a as specified in `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/runners/agents-101-m6.setup.actor.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m6`

---

## Phase 0: Manual Judge Run

### Prompt Read (prompt-001.txt)

```
Three things, in sequence:

1. Produce a fresh one-page briefing on the question in ./crux.md, using sources/ and module-3/stances/ for grounding...
2. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md...
3. In the chat, summarize in three lines...
```

### Briefing (fresh-briefing.md)

Produced a one-page briefing covering:
- **Market condition:** Four sub-teams, three with stances, one blocked on policy review (late July)
- **Planner take:** Staged waves (DX→DP→ Infra/Sec conditional)
- **Reframer take:** Q3 offsite as forcing function for unified decision (2/4 shipped + 2/4 written = win)
- **External reference:** Enterprise platform transformation patterns (marked as general knowledge)
- **Quote:** Paavo's Terraform safety bar from stances/1-planner.md
- **Action:** Sync decision at Q3 offsite, choose one rollout shape informed by six weeks of DX evidence

### Judge Application (first-run-judgment.md)

Applied judges/groundedness-judge.md line-by-line:

| Claim | Verdict | Feedback |
|-------|---------|----------|
| Four sub-teams, divergent readiness | GROUNDED | subteam-structure.md direct match |
| Three with stances, one on policy gate | GROUNDED | classification-policy.md (late-July) |
| Sari actively using Claude Code | GROUNDED | subteam-structure.md |
| Data Platform cautiously pro + Maija path | GROUNDED | Cross-ref: subteam-structure + stances/1-planner |
| Paavo "safe Terraform at 3am" | GROUNDED | stances/1-planner.md: crossplane proof test |
| Enterprise platform transformation patterns | **UNGROUNDED** | No local source (external knowledge) |
| Paavo quote | GROUNDED | Paraphrased from subteam-structure + stances |
| DX continue forward, DP validation | GROUNDED | Stances 1 & 3 outline this shape |
| Q3 offsite week 6 forcing function | GROUNDED | subteam-structure.md + stances/1-planner.md |
| Anneli timeline + Paavo conditions | GROUNDED | classification-policy.md + stances |

**Summary:** 9/10 grounded; 1 ungrounded (external enterprise patterns).

### Three-Line Scrollback

1. Judge caught: 1 ungrounded claim (external enterprise transformation patterns, marked as general knowledge in briefing).
2. Clear fix: Source or remove the enterprise Terraform adoption reference; replace with local example or conditional framing ("absent local evidence...").
3. Not reached: Judge assumes evidence roster is complete; cannot detect redacted or missing sources; cannot assess nuance of "Paavo's proof test" vs. "Paavo's blocker" distinction.

---

## Phase 1: Orchestrator Build (prompt-002.txt)

### Prompt Read

```
Run a three-round eval loop using my fixed judge.

Fixed judge:
- Read judges/groundedness-judge.md.
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA...
- After round 3, compute the ending SHA and report whether the judge stayed byte-identical.

Starting tactic:
- Create ./generation-tactic.md...
...
```

### Pseudo-Code Outline (Delivered First)

```
Round 1:
  1. Dispatch generator subagent → module-6/runs/round-1/briefing.md
  2. Dispatch judge subagent → module-6/runs/round-1/judgment.md
  3. Main session reads judgment, rewrites generation-tactic.md → round-1/tactic-change.md
  4. Append round-1 heartbeat
  5. Pause 60 seconds

[... rounds 2, 3 follow same shape ...]

Final:
  Write module-6/dashboard.md
  - Score trajectory
  - Tactic changes
  - Judge SHA integrity (byte-identical check)
  - One thing judge cannot detect
  - One human decision pending
```

### Orchestrator.md (210 lines)

Built full orchestrator with:
- **Invariant assertion (line 1):** "The judge at judges/groundedness-judge.md is read-only across all three rounds... never writes to, modifies, or overwrites it."
- **Repeated enforcement:** Phase A (generator input), Phase B (judge input marked `[read-only]`), Phase D (explicit "never edited" in heartbeat), Final Assertions section
- **Complete three-round loop specification**
- **Phase A/B/C/D/E detailed dispatch logic** (generator input/output, judge input/output, tactic rewrite, heartbeat, pause)
- **Final phase logic** (SHA verification, dashboard population, terminal output)
- **Substitution note** (Phase 0 inline judge run, not nested Task)

The orchestrator contains the required language: "judge...never written to", "judge...read-only", "never writes to, modifies, or overwrites"

---

## Phase 2a: Run Folder + Generator Seed (prompt-003.txt)

### Prompt Read

Same as prompt-002 (three-round eval loop).

### Actions Taken

1. **Created run directories:**
   - `/module-6/runs/round-1/`
   - `/module-6/runs/round-2/`
   - `/module-6/runs/round-3/`

2. **Created dashboard.md placeholder:**
   ```
   # Module 6 — Evaluation Dashboard
   (Placeholder — will be populated after Round 3 completes)
   ```

3. **Seeded generator.md:**
   ```
   # Module 6 — Generator Strategy (Seeded for Round 1)
   
   ## Generation Tactic (Iteration 0)
   
   Produce a one-page briefing on the question in ./crux.md.
   Use sources/ and module-3/stances/. Prefer local evidence.
   Mark anything that relies on general knowledge. No special rules yet.
   ```

---

## Final Integrity Checks

- **judges/groundedness-judge.md** status: Untracked in git (inherited from M5), byte-count unchanged throughout execution ✓
- **Orchestrator contains forced assertion:** "read-only", "never written", "never edits" in line 1 and repeated throughout ✓
- **Module-3/4/5 artifacts:** Untouched ✓
- **Phase 0/1/2a all complete:** Yes ✓

---

## Workspace State (End of Setup)

```
module-6/
  ├── fresh-briefing.md           (Phase 0, 1018 words)
  ├── first-run-judgment.md       (Phase 0, 10-claim eval)
  ├── orchestrator.md             (Phase 1, 210 lines, judge assertions)
  ├── generator.md                (Phase 2a seeded)
  ├── dashboard.md                (Phase 2a placeholder)
  └── runs/
      ├── round-1/
      ├── round-2/
      └── round-3/
```

Setup Actor complete. Ready for Phase 2b (run-Actor) to execute three-round loop.

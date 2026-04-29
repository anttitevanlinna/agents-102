# Judge — Claude Basics M2 the-it-directors-prompt verbatim

You are evaluating an Actor run of the Module 2 exercise. The Actor executed Phases 2-5 (Phase 1's live IT-Director composition is substituted by a synthetic prompt). Your job: assert against (a) the scratch file state and (b) the Actor's transcript scrollback.

You do NOT read the exercise file, the module file, or any other curriculum artifact.

## Inputs

- **Actor scrollback:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-scrollback.md`
- **Actor report:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-report.md`
- **Scratch state:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m2/`
- **Parsed prompts:** `/tmp/prompts/the-it-directors-prompt/prompt-00{1,2,3,4}.txt`
- **Substitutes:** `/tmp/claude-basics-m2-substitutes/`

## Assertions

### A. File-state

**A1. Final artifacts exist.** `CLAUDE.md`, `CLAUDE.md.v6-rule-added`, `verification.md`, `verification.md.v1`, `verification-table.md` all present.

**A2. CLAUDE.md grew by exactly 1 rule.** Final `CLAUDE.md` line count strictly greater than scratch's starting `CLAUDE.md` (5 rules). Final has 6 distinct rules (count by sentences ending with periods or numbered/bulleted items). The OneDrive runtime line is still rule 1, verbatim.

**A3. Phase 5 added rule about Teams recording storage.** Final `CLAUDE.md` contains a rule mentioning *"Teams meeting recordings"* OR *"recording-storage"* OR *"Stream"* — reflecting the Phase 5 wrong-claim about Stream-by-default. Quote the rule.

**A4. verification-table.md has 6 rows with all Verdict cells filled.** Three columns (`Claim`, `Where I'd check`, `Verdict`). Final table has 6 distinct claim rows. Verdict column distribution: 2 `checked-true`, 2 `checked-wrong`, 2 `I can't tell` (or `I-can't-tell`). Quote the Verdict column.

**A5. verification.md contained the Stream-by-default claim.** Either `verification.md` or `verification.md.v1` contains the phrase *"Stream"* in a context that asserts Teams meeting recordings are stored there by default. Quote the line. (This is the seeded wrong claim Phase 5 catches.)

**A6. No placeholder leaks.** Grep saved files for `[BRACKETS]`, `<my-`, `<group-`, `[your task]`. Zero hits.

### B. Transcript

**B1. All four prompts pasted verbatim.** Use `bash bin/verbatim-check.sh` for each:

```
for n in 001 002 003 004; do
  bash /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/bin/verbatim-check.sh \
    /tmp/prompts/the-it-directors-prompt/prompt-${n}.txt \
    /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-scrollback.md
  echo "  prompt-${n}: exit $?"
done
```

Each must return exit 0.

**B2. Phase 2 IT-Director-composed prompt landed.** The text from `/tmp/claude-basics-m2-substitutes/it-director-prompt.txt` appears in the scrollback within ~10 lines after `prompt-001.txt`'s open-hook colon ends.

**B3. Phase 3 propose-then-save order.** In the Phase 3 segment, Claude shows the table in chat (NOT yet saved) BEFORE the participant push-back. Then the push-back appears (the *"Row 4's source..."* substitution). Then Claude saves. Quote the three turns in order.

**B4. Phase 4 chat-walk row-by-row.** In Phase 4 segment, the scrollback shows row-by-row dialog: Claude prints a row → participant verdict → Claude updates table. This pattern repeats 6 times. Verdict pattern matches `phase-4-verdicts.txt` order (true, can't-tell, wrong, true, can't-tell, wrong). Quote any 2 row turns as evidence.

**B5. Phase 5 open-hook substitution lands.** The text from `/tmp/claude-basics-m2-substitutes/phase-5-wrong-row.txt` appears in scrollback within ~10 lines after `prompt-004.txt`'s open-hook colon ends.

### C. Banned-shape (curriculum-prompt-leak detector only — NOT general writing register)

**C1. No room-share / contemplative-pause shapes in saved artifacts.** Grep saved scratch files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits.

(Per `curriculum/evals/mechanical/README.md` § *Judge-spec banned-shape scope*: do NOT grade against em-dashes, *practice* noun, *honest*, etc. in saved artifacts — those are Claude's natural register, not curriculum violations.)

## Verdict format

Write to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-judge-report.md`.

```markdown
# Judge report — Claude Basics M2 verbatim

## Verdict
<PASS / FAIL / PASS-WITH-FLAGS>

## Per-assertion results
### A. File-state
- A1: ... A6: ...

### B. Transcript
- B1: ... B5: ...

### C. Banned-shape
- C1: ...

## Top issues to fix
1. ... 2. ... 3. ...

## One-sentence overall
```

Under 600 words. Quote evidence.

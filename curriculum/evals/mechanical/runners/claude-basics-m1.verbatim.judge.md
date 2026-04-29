# Judge — Claude Basics M1 build-your-system verbatim

You are evaluating an Actor run of the Claude Basics M1 exercise. The Actor executed the exercise's prompt chain on a scratch SharePoint-stand-in folder. Your job: assert against (a) the scratch file state and (b) the Actor's transcript scrollback. Both are ground truth; the Actor's report is not.

You do NOT read the exercise file, the module file, or any other curriculum artifact. The assertions below are sufficient.

## Inputs

- **Actor scrollback:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-scrollback.md`
- **Actor report:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-report.md`
- **Scratch state:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m1/`
- **Parsed prompts** (for verbatim round-trip checks): `/tmp/prompts/build-your-system/prompt-00{1,2,3,4,5}.txt`
- **Substitutes:** `/tmp/claude-basics-m1-substitutes/`

## Assertions

For each, return PASS / FAIL with quoted evidence (file content or transcript line).

### A. File-state assertions (scratch directory)

**A1. Final artifacts exist.** All seven files present:
- `response.md`
- `response.md.v1-baseline`, `response.md.v2-claude-md`, `response.md.v3-rule-added`, `response.md.v4-final`
- `CLAUDE.md`
- `CLAUDE.md.v1-initial`, `CLAUDE.md.v2-rule-added`

**A2. CLAUDE.md opens with OneDrive runtime line verbatim.** Final `CLAUDE.md` AND `CLAUDE.md.v1-initial` AND `CLAUDE.md.v2-rule-added` all contain the exact line:

> `You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads.`

The line must be a top-of-file rule (within the first 5 non-empty lines). Per `compounded/2026-04-27-platform-folder-claude-md-names-runtime.md`.

**A3. CLAUDE.md grew across phases.** Line counts: `CLAUDE.md.v2-rule-added` strictly greater than `CLAUDE.md.v1-initial`. Final `CLAUDE.md` has at least 4 distinct rules (count by counting sentences ending with periods or distinct numbered/bulleted items, excluding any maintainer-style headings).

**A4. response.md evolved across phases.** Diff `response.md.v1-baseline` vs `response.md.v4-final` using `diff -u`. Sum of changed lines (additions + deletions) should be at least 20 lines — the threshold is on diff lines, not on % of file size, since baseline and final may have similar line counts but fully turned-over content. Quote: line count of v1, line count of v4, total diff lines. v4 should NOT contain the literal strings *"Microsoft Forms"* or *"data protection officer"* (these were the wrong-claim shape Phase 4 caught).

**A5. response.md final contains team-specific specifics.** Final `response.md.v4-final` contains at least three of: *"Jira Service Management"* (or *"Jira"*), references to the specific team's tone, named procedures, or other concrete specifics that distinguish it from generic LLM IT-FAQ output. Quote the three specifics found.

**A6. No placeholder leaks.** Grep all scratch files for `[BRACKETS]`, `<my-`, `<group-`, `<your-`, `[your task]`, `[paste here]`. Zero hits expected (placeholders inside fenced prompts are exempt; placeholders inside saved artifact content are leaks).

### B. Transcript assertions (Actor scrollback)

**B1. All five exercise prompts pasted verbatim.** Each of `prompt-001.txt` through `prompt-005.txt` appears as a `> `-prefixed blockquote in the Actor scrollback. Use `bin/verbatim-check.sh` for each pair:

```
for n in 001 002 003 004 005; do
  bash /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/bin/verbatim-check.sh \
    /tmp/prompts/build-your-system/prompt-${n}.txt \
    /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-scrollback.md
  echo "  prompt-${n}: exit $?"
done
```

Each must return exit 0.

**B2. Phase 1 open-hook substitution lands.** The IT-Director question text from `/tmp/claude-basics-m1-substitutes/it-director-question.txt` appears in the scrollback within ~10 lines after `prompt-001.txt`'s open-hook colon ends.

**B3. Phase 4 open-hook substitution lands.** The wrong-claim text from `/tmp/claude-basics-m1-substitutes/wrong-claim.txt` appears in the scrollback within ~10 lines after `prompt-004.txt`'s open-hook colon ends.

**B4. Phase 2 propose-first-then-save behavior.** In the Phase 2 segment of the scrollback, the order of events should be:
1. Claude proposes 3-5 rules in chat (NOT yet saved)
2. Participant push-back appears as a participant turn (the *"Rule 2 is too generic..."* text or equivalent)
3. Claude saves CLAUDE.md AFTER the push-back

If the order is propose→save→push-back-then-rewrite, that's a violation of the in-chat-first principle (`check_student_facing.md` rule 12). Quote the three turns in order.

**B5. Phase 3 diff-summary in chat before save.** In Phase 3, the scrollback shows Claude printing 3 lines naming what's changing and why BEFORE writing the new `response.md`. Quote the three diff lines.

**B6. Phase 5 names three specifics in chat.** In the Phase 5 segment, after the iteration, Claude prints three named specifics from the final `response.md` (a tool name, a phrase the team writes, a tone choice). Quote the three named specifics. Then quote the participant push-back accepting them.

### C. Banned-shape assertions (cross-cut)

**Scope note:** the `check_writing.md` banned-word list (e.g., *practice* noun, em-dashes, *honest*, *substrate*) applies to **curriculum prose we author** — not to content Claude generates inside an exercise in response to a participant's task. A saved `response.md` or `CLAUDE.md` produced by Claude during the exercise IS the participant's session output, not curriculum content. Em-dashes and "practice" in those files are not violations.

The C-block therefore only checks for shapes that would be a problem regardless of who authored them: room-share commands and contemplative-pause theatre that Claude would only produce if the exercise prompt itself smuggled them in.

**C1. No banned phrases in saved files.** Grep all scratch files for: `tell the person`, `sitting next to you`, `share with your neighbor`, `tell the room`, `sit with`, `take a moment`, `let it land`. Zero hits in any saved artifact. These shapes wouldn't appear in `response.md` or `CLAUDE.md` unless an exercise prompt suggested them — so this assertion is a leak-detector for the exercise prompts, not a style check on Claude's output.

## Verdict format

Write the judge report to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-judge-report.md`.

```markdown
# Judge report — Claude Basics M1 verbatim

## Verdict

<PASS / FAIL / PASS-WITH-FLAGS>

## Per-assertion results

### A. File-state
- A1: <PASS/FAIL> — <evidence>
- A2: <PASS/FAIL> — <evidence>
- A3: <PASS/FAIL> — <evidence>
- A4: <PASS/FAIL> — <evidence>
- A5: <PASS/FAIL> — <evidence>
- A6: <PASS/FAIL> — <evidence>

### B. Transcript
- B1: <PASS/FAIL> — <verbatim-check exit codes>
- B2: <PASS/FAIL> — <evidence>
- B3: <PASS/FAIL> — <evidence>
- B4: <PASS/FAIL> — <evidence>
- B5: <PASS/FAIL> — <evidence>
- B6: <PASS/FAIL> — <evidence>

### C. Banned-shape
- C1: <PASS/FAIL> — <evidence>

## Top issues to fix

1.
2.
3.

## One-sentence overall

<...>
```

Under 600 words. Quote evidence. Do not infer when you can read directly from disk or transcript.

## What you must NOT do

- Read the exercise file or module file.
- Read the Actor runner spec.
- Trust the Actor's own report when it conflicts with the scrollback or scratch state.
- Mark PASS without a quoted line of evidence.
- Skip the verbatim-check round-trip for B1 — that's the load-bearing prompt-fidelity assertion.

# Actor — Claude Basics M3 find-the-crux verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great divergence prose, a great crux, or a great rollout strategy. Stub freely; quality is not graded here.

You have Bash / Read / Write / Edit. Drive by pasting prompts verbatim from disk. You do NOT read the exercise file. The mechanical test runs ONE participant through all three phases (Phase 1 alone, Phase 2 as group synthesizer, Phase 3 as IT Director).

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m3`. Pre-staged with:

- `group-1/divergence-marja.md`, `divergence-juhani.md`, `divergence-petra.md` — three teammate divergence files for Phase 2 to read across
- `group-2/group-crux-2.md`, `group-3/group-crux-3.md`, `group-4/group-crux-4.md` — three other-group cruxes for Phase 3 cross-group synthesis to read across

You are the fourth participant in group-1. Phase 1 saves your own divergence file there.

## Substitutes (Read when prompts ask for participant input)

All at `/tmp/claude-basics-m3-substitutes/`:

- `divergence-interview-answers.txt` — Phase 1 answers + push-back replies (one per question)
- `group-synthesis-pushback.txt` — Phase 2 push-back on the candidate crux
- `cross-group-pushback.txt` — Phase 3 IT-Director push-back on the first-draft strategy

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/find-the-crux/prompt-00{1,2,3}.txt`.

### Phase 1 — Divergence

1. Read `prompt-001.txt`, blockquote-paste verbatim. Open-hook colon at end (*"The group folder:"*). Paste `group-1/` immediately after.
2. Conduct the interview one question at a time. After each Claude question, paste the matching answer from `divergence-interview-answers.txt` as the participant's turn. **One assistant turn per question.** Three questions, each with a push-back.
3. After all three difficulty + push-back exchanges, Write `group-1/divergence-antti.md` (3–5 representative lines per difficulty is enough — stub fine).

### Phase 2 — Group synthesis

4. Read `prompt-002.txt`, blockquote-paste verbatim. Read all four divergence files in `group-1/` (your `divergence-antti.md` plus the three teammates).
5. **In chat (no save yet):** propose a 2-sentence crux candidate. Stub fine.
6. **Substituted push-back** (paste verbatim): contents of `group-synthesis-pushback.txt`.
7. After push-back, Write `group-1/group-crux-1.md`. Include one short quote attributed to each of the four divergence files (4 quotes total — stub-quote each).

### Phase 3 — Cross-group synthesis

8. Read `prompt-003.txt`, blockquote-paste verbatim. Read all four `group-N/group-crux-N.md` files (group-1's just-saved + the three pre-staged).
9. **In chat (no save yet):** propose a strategy with three sections (priorities 2–3, deferrals 2–3, single named question).
10. **Substituted push-back** (paste verbatim): contents of `cross-group-pushback.txt`.
11. After push-back, Write `rollout-strategy.md` at scratch root. Reflect the push-back voice: training-material refresh moved from deferral to priority, IT-Director ownership named on a priority, single question reframed.

## Scratch end-state

- `group-1/divergence-antti.md` — Phase 1 output
- `group-1/group-crux-1.md` — Phase 2 output
- `rollout-strategy.md` (scratch root) — Phase 3 output
- All pre-staged files (3 teammate divergence + 3 other-group cruxes) untouched

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-scrollback.md` — per-prompt verbatim+response shape. Include all substitute pastes and Phase 1's three interview cycles.

**Report:** `curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-report.md`:

```markdown
# Actor report — Claude Basics M3 verbatim

## Status
done | error

## Scratch
<absolute path>

## Prompts executed
1–3 (one line each)

## Substitutions
- Phase 1 interview answers + push-backs, Phase 2 group push-back, Phase 3 IT-Director push-back

## Notes
<any tool denials, sandbox issues; do not grade>
```

Under 200 words. Do not grade yourself.

## What you must NOT do

- Read the exercise file or module file or prompt files (`curriculum/trainings/claude-basics/...`).
- Read any judge or sibling actor runner.
- Read any maintainer doc.
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Touch the pre-staged teammate divergence files or other-group crux files. Read-only.
- Use angle-bracket templates like `<my-first-name>`. Resolve to in-character first name "antti".
- Generate long realistic content. Stubs are fine.

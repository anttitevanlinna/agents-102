# Actor — Claude Basics M3 find-the-crux verbatim

You are simulating a Cowork session that a Claude Basics participant runs across three phases of Module 3's group exercise. The mechanical test runs ONE participant through all three phases (Phase 1 alone, Phase 2 as the group synthesizer, Phase 3 as the IT Director). In a real cohort these would be different people; the test is whether the prompt chain produces correct artifacts.

You have Bash / Read / Write / Edit. You do NOT read the exercise file or the module file or the prompt files (they're in `prompts/` — don't touch).

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m3`. Pre-staged with:

- `group-1/` — empty (this is YOUR group; Phase 1 will save your divergence file here, Phase 2 will synthesize)
- `group-1/divergence-marja.md`, `divergence-juhani.md`, `divergence-petra.md` — three pre-staged "teammate" divergence files for Phase 2 to read across
- `group-2/group-crux-2.md`, `group-3/group-crux-3.md`, `group-4/group-crux-4.md` — three pre-staged "other group" cruxes for Phase 3 cross-group synthesis to read across

You are the fourth participant in group-1. The other three (Marja, Juhani, Petra) have already completed Phase 1 and saved their divergence files. You're the synthesizer for Phase 2 and the IT Director for Phase 3.

## Substituted participant inputs

All at `/tmp/claude-basics-m3-substitutes/`:

- `divergence-interview-answers.txt` — your answers to Claude's three interview questions in Phase 1 + push-back replies
- `group-synthesis-pushback.txt` — your push-back when Claude proposes the group-1 crux candidate in Phase 2
- `cross-group-pushback.txt` — your live push-back as IT Director on the cross-group synthesizer's first draft in Phase 3

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/find-the-crux/prompt-00{1,2,3}.txt`:
- `prompt-001.txt` → Phase 1 divergence interview (open-hook for group folder name)
- `prompt-002.txt` → Phase 2 group synthesis
- `prompt-003.txt` → Phase 3 cross-group synthesis

### Phase 1 — Divergence

1. **Prompt 1:** read `/tmp/prompts/find-the-crux/prompt-001.txt`. Quote verbatim. Open-hook colon at end (*"The group folder:"*). Paste `group-1/` after.
2. Conduct the interview one question at a time. After each question, paste the matching answer from `/tmp/claude-basics-m3-substitutes/divergence-interview-answers.txt` as the participant's turn. Push-back happens once per question per the substitute file's structure.
3. After all three difficulties + push-backs, save the conversation as a divergence file named after the participant — use first name "antti", lowercase, no spaces — in `group-1/`. Final file: `group-1/divergence-antti.md`. Content per the prompt: three difficulties + push-back answers in participant voice; do not summarize into Claude's register.

### Phase 2 — Group synthesis

4. **Prompt 2:** read `/tmp/prompts/find-the-crux/prompt-002.txt`. Quote verbatim. Run in a fresh "Cowork session" pointed at `group-1/` — read all four divergence files (your `divergence-antti.md` plus the three teammates).
5. Show candidate crux in chat (NOT yet saved) — propose a 2-sentence crux candidate based on across-the-files reading.
6. Substituted participant push-back: paste contents of `/tmp/claude-basics-m3-substitutes/group-synthesis-pushback.txt` verbatim.
7. After push-back, save final crux as `group-1/group-crux-1.md`. Content: named crux (one paragraph) + one quote from each divergence file (4 quotes total).

### Phase 3 — Cross-group synthesis

8. **Prompt 3:** read `/tmp/prompts/find-the-crux/prompt-003.txt`. Quote verbatim. Run in a fresh "Cowork session" with read access to all four group folders.
9. Read all four `group-crux-N.md` files (group-1's just-saved + the three pre-staged). Show proposed strategy in chat first (NOT yet saved). Three sections per the prompt: priorities (2-3), deferrals (2-3), single named question.
10. Substituted IT-Director push-back: paste contents of `/tmp/claude-basics-m3-substitutes/cross-group-pushback.txt` verbatim.
11. After push-back, save final strategy as `rollout-strategy.md` at scratch root (the IT Director's "personal folder" in this test). The save is the IT-Director-rewriting-with-push-back-as-voice version, not a literal patch of the first draft.

## Scratch output expectations

End state:
- `group-1/divergence-antti.md` — Phase 1 output
- `group-1/group-crux-1.md` — Phase 2 output
- `rollout-strategy.md` (at scratch root) — Phase 3 output
- All pre-staged files (3 teammate divergence + 3 other-group cruxes) untouched

## Report

Scrollback: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-scrollback.md`. Per-prompt verbatim+response shape.

Short report: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-actor-report.md`, under 250 words. Status, scratch path, three phases executed, artifacts written, substitutions list.

## What you must NOT do

- Read the exercise file or module file or prompt files (`curriculum/trainings/claude-basics/...`).
- Read any judge or sibling actor runner.
- Paraphrase prompts. Paste verbatim.
- Touch the pre-staged teammate divergence files or other-group crux files. Read-only.
- Use angle-bracket templates like `<my-first-name>`. The prompt says "save as a divergence file named after me (use my first name, lowercase, no spaces)" — you resolve this from your in-character first name "antti".

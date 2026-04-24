# Judge — M6 chain verbatim

Grading an Actor that ran M6's spot-gaps-build-the-loop + arc-retrospective end-to-end on a scratch inherited from M3 → M4 → M5, with two branches representing the un-packaged (M4) and packaged (M5) runs. Inputs: final scratch state, Actor's `.jsonl` transcript, scrollback, 5 prompt files, 2 substitute transcripts, and the authored second skill at `~/.claude/skills/<name>/SKILL.md`.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-2026-04-24-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-2026-04-24-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-00{1,2,3,4}.txt`, `/tmp/prompts/arc-retrospective/prompt-001.txt`
- **Substitute transcripts:** `/tmp/m5-substitute-transcript.md`, `/tmp/m6-m5-rerun-transcript.md`
- **Authored skill:** newly-created `~/.claude/skills/<name>/SKILL.md` (Actor reports the name + path)
- **Arc note:** `<scratch>/.claude/memory/arc-note.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.
- `jq` / `grep -o` on the transcript.

## Assertions

### Verbatim round-trip

- **V1–V5.** Each of 5 prompt files passes `verbatim-check.sh` against the scrollback.

### Ex1 Phase 1 — diff

- **A1.** Actor diffed across all four dimensions (caught / missed / introduced / where-fix-belongs). Quote one claim from each dimension.
- **A2.** Each claim includes quoted evidence from BOTH runs where applicable (the un-packaged M4 state + the packaged M5 state). Quote the pair for one "caught" item.
- **A3.** Actor read both substitute transcripts. Transcript Read-calls for `/tmp/m5-substitute-transcript.md` and `/tmp/m6-m5-rerun-transcript.md`.
- **A4.** Ranked gap list at end of Phase 1 (3–5 items). Quote the ranking.
- **A5.** Dominant gap named with justification. Quote.

### Ex1 Phase 2 — author

- **A6.** Actor asked shape-first (not author-first). Scrollback evidence.
- **A7.** Shape chosen matches the dominant gap's nature (LLM-judge if qualitative-fit drift; sharpened-verifier if presence/absence drift; gap-finder if pre-run context issue).
- **A8.** One question at a time — Q1 → A1 → Q2 → A2 pattern, not a question-dump.
- **A9.** SKILL.md exists at `~/.claude/skills/<name>/SKILL.md`. Quote the path.
- **A10.** Frontmatter valid (name + description fields).
- **A11.** Body cites specific moments from the two runs' diff (quote one), not generic judge/verifier advice.
- **A12.** No `[BRACKET]` placeholders.

### Ex1 Phase 3 — self-critique

- **A13.** Self-critique names at least one real weakness of the skill. Quote. FAIL if critique reassures without naming a concrete weak point.

### Ex1 Phase 4 — invoke + self-grade

- **A14.** Actor invoked the skill on the M5 packaged re-run (reads the `send-off/auth-ux-packaged` branch state and the reference/plan). Transcript Read-call evidence.
- **A15.** Invocation produced ranked findings in the shape the skill declared (quote the top finding).
- **A16.** Self-grade answers the three prompt questions: catches the dominant gap? misses things a staff engineer would catch? would the M4 un-packaged run have been better with this skill? Quote the answer on "catches dominant gap."

### Ex2 — arc-retrospective

- **A17.** Actor read across the full arc — at minimum: CLAUDE.local.md, `.claude/memory/observations.md`, the ADR, both authored skills (test-strategy + done-means-judge), both run branches.
- **A18.** Arc note quotes from the student's OWN files — not generic reflection. Quote two quotes from the note.
- **A19.** Note names a recurring pattern across modules (or explicitly says arc was uneven). Quote.
- **A20.** Note was saved to `.claude/memory/arc-note.md` per the substituted student approval.
- **A21.** Arc note is one page (roughly — not three pages). Word count + quote the closing line.

### Prompt-chain integrity

- **A22.** Ex1 → Ex2 flowed: Actor didn't collapse the two exercises into one response. Separate headers, separate responses.

### Harness leakage

- **H1.** No Read of maintainer docs or planted-state docs.
- **H2.** No Read of judge or sibling actor runners (own `m6-chain.verbatim.actor.md` allowed).
- **H3.** No Read of `curriculum/exercises/` files.
- **H4.** Commit messages neutral; no "planted" / "harness" leaks.
- **H5.** No harness-internal files inside `<scratch>` that Actor re-read.
- **H6.** Actor did NOT attempt to walk `~/.claude/projects/` — used the two substitutes.

### Substitutions (informational)

- **A23.** List every substitution with trigger.

## Report

Write `curriculum/evals/mechanical/instances/m6-chain-verbatim-2026-04-24-judge-report.md`. Same shape as M3/M4/M5 judge reports. Under 800 words. Short quotes. Leave artifacts in place.

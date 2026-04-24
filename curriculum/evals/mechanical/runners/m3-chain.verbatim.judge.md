# Judge — M3 chain verbatim

You are grading an Actor subagent that executed AE101 Module 3 end-to-end (3 exercises: access surface → STRIDE → test-strategy skill authoring + invocation) on a scratch repo by pasting each prompt verbatim from disk and substituting named student answers. Inputs: final scratch state, temp scratch dir (for surface map + threat list), the Actor's `.jsonl` transcript, the Actor's scrollback file, the authored SKILL.md in `~/.claude/skills/test-strategy/`, and eight extracted prompt files.

## Inputs

- **Scratch path:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m3`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` (dispatcher substitutes).
- **Actor report:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-2026-04-24-actor-report.md`
- **Actor scrollback:** `curriculum/evals/mechanical/instances/m3-chain-verbatim-2026-04-24-actor-scrollback.md`
- **Authored skill:** `~/.claude/skills/test-strategy/SKILL.md`
- **Prompt files:** `/tmp/prompts/map-the-access-surface/prompt-00{1,2}.txt`, `/tmp/prompts/threat-model-with-stride/prompt-00{1,2,3}.txt`, `/tmp/prompts/author-test-strategy-skill/prompt-00{1,2,3}.txt`.

## How to read the transcript

```
jq -c 'select(.type=="assistant") | .message.content[] | select(.type=="tool_use") | {name: .name, input: .input}' <path>
grep -o '"file_path":"[^"]*"' <path> | sort -u
```

Transcript evidence outranks self-reports.

## Assertions

### Verbatim round-trip

- **V1–V8.** Each of the 8 prompt files appears verbatim in the Actor scrollback. For multi-paragraph prompts, strip `^> ?` blockquote prefix before comparing. Quote 40-char prefix as evidence.

### Ex1 — access surface

- **A1.** Actor dispatched a subagent via the Task tool whose prompt invoked/referenced the `access-control-analysis` skill. Transcript evidence: `tool_use.name == "Task"` with skill name in the prompt.
- **A2.** Skill output landed at an absolute path outside the scratch repo (under `/tmp/` or `$TMPDIR`). Quote the path. FAIL if the output was written inside `<scratch>`.
- **A3.** The surface map file contains a `Codebase-tuned delta` section (or equivalent integrated heading) with both CORS `*` and relative-SQLite-path deltas. Quote from the file.

### Ex2 — STRIDE + ADR

- **A4.** Actor dispatched a subagent for the `stride` skill invocation. Transcript evidence.
- **A5.** Threat list exists in the temp scratch dir.
- **A6.** ADR file exists at `<scratch>/docs/adr/0001-*.md`. Contains four sections: Context, Decision, Consequences, Alternatives considered.
- **A7.** ADR Decision names the Information disclosure threat and response-shape hardening (strip email from `/scores/top`). Not a compliance-voice read — quote one sentence and flag if it sounds like a checklist.
- **A8.** ADR Alternatives considered names at least two options beyond the chosen one. Quote them.
- **A9.** ADR committed to the scratch repo. `git log --oneline` shows a commit message that names the ADR. FAIL if the file exists but is uncommitted.

### Ex3 — skill authoring

- **A10.** SKILL.md exists at `~/.claude/skills/test-strategy/SKILL.md`.
- **A11.** Has valid YAML frontmatter with at least `name` and `description` fields.
- **A12.** Body references codebase-specific detail (quote at least two): the `node --test` runner, supertest-with-real-SQLite, injected `Date.now` for JWT determinism, the auth round-trip as load-bearing, OR "every PR runs the full suite (<10s)". FAIL if the body reads as generic test-pyramid advice.
- **A13.** No `[BRACKET]` placeholders: `grep -n '\[[A-Z]' ~/.claude/skills/test-strategy/SKILL.md`.
- **A14.** Phase 1 ran as one-question-at-a-time. Check Actor scrollback: each `Q1/Q2/.../Q7` received an independent assistant response before the next question, NOT a single question-dump followed by seven answers. FAIL if the Actor fired multiple questions at once.
- **A15.** Phase 2 self-critique names at least one real weakness of the skill (not reassurance). Quote the weakness. FAIL if the critique is "this is a strong skill, minor polish only" without naming a concrete weak point.
- **A16.** Phase 3 test-strategy output covers the hardening decision from the ADR (response-shape change on `/scores/top`). Quote the relevant section from the test-strategy output.
- **A17.** Phase 3 "is it good?" self-grade is substantive — names a specific gap OR a specific strength with codebase grounding. Not "looks comprehensive." Quote.

### Prompt-chain integrity

- **A18.** Ex2 execution referenced Ex1's surface map (Actor Read the surface-map file before dispatching STRIDE). Transcript evidence.
- **A19.** Ex3 Phase 3 invocation of the test-strategy skill referenced the ADR from Ex2 (Actor Read the ADR file). Transcript evidence.
- **A20.** No prompt stalled on a value that wasn't in the substitution script.

### Harness leakage

- **H1.** Actor did NOT read `lemmings-seed.maintainer.md` or any planted-state doc.
- **H2.** Actor did NOT read any judge runner or sibling actor runner. Reading its own `m3-chain.verbatim.actor.md` is allowed.
- **H3.** Actor did NOT read any `curriculum/exercises/` file. All prompt content came from `/tmp/prompts/`.
- **H4.** Arrange commit messages are neutral. `git log` in scratch — no planted-state leaks.
- **H5.** No harness-internal files inside `<scratch>` that Actor then read.

### Substitutions (informational)

- **A21.** List every substitution used with trigger line. Not graded.

## Report

Write `curriculum/evals/mechanical/instances/m3-chain-verbatim-2026-04-24-judge-report.md`. Shape mirrors M1 verbatim judge (Summary / transcript path / scratch path / V1-V8 / A1-A21 / H1-H5 / findings-for-exercises / findings-for-harness). Under 700 words. Short quotes. Leave artifacts in place.

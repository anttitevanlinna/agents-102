# Prompt-source audit — shared dimension

Companion dimension every AE101 mechanical Judge runs alongside Actor-behavior assertions. The existing A/H/V assertions grade what the Actor *did*; the P/E assertions below grade whether the *prompts the Actor was given* contain defects a real student would hit cold.

The Judge points here for the dimension definition. Each Judge file names its own module-specific source paths (the exercise `.md` file and the `/tmp/prompts/<slug>/prompt-NNN.txt` files) at the call site.

## Severity

- **Sev-1** = breaks a cold student run (placeholder in fence, broken path, missing artefact identifier, vocab the student cannot resolve, working directory unspecified at session-open)
- **Sev-2** = degrades quality without breaking the run (markdown shout, value-prop / vendor leak, mild pacing-theatre, banned word, gratuitous open-hook)
- **FLAG** = human judgment required (open-hook justification, tease-the-payoff headers, cross-module contract producing-side verification)

Verdict ladder: BLOCK on any Sev-1; READY-WITH-FLAGS on Sev-2 or FLAG; READY otherwise.

## Inputs (Judge supplies the paths)

- **Fenced-prompt files (P-checks):** every `prompt-NNN.txt` in `/tmp/prompts/<exercise-slug>/`. These are what the Actor pasted; the Judge reads the same files.
- **Exercise body file (E-checks):** `curriculum/exercises/<slug>.md`. EXCLUDE everything after `<!-- maintainer -->` — that's trainer-facing.

Helper one-liners (mac `grep -E`, no `grep -P`):
- Extract fenced content: `awk '/^\`\`\`/{c=!c;next} c' <file>`
- Clip body before maintainer: `awk '/<!-- maintainer -->/{exit} 1' <file>`
- Both: `awk '/<!-- maintainer -->/{exit} 1' <file> | awk '/^\`\`\`/{c=!c;next} !c'` for body-ex-fences-ex-maintainer

## P-checks — fenced-prompt content

- **P1. Bracketed placeholders inside fenced blocks** (check_prompts §1(a)). Grep `\[[A-Za-z][^]]{2,}\]` in extracted fenced content. FAIL Sev-1 on any hit. Carve-outs: literal markdown link syntax `[text](url)` if the URL is real; otherwise FAIL. Quote.

- **P2. Skill path-leak** (check_prompts §4). Grep `~/\.claude/skills/`, `\.claude/skills/`, `content/skills/` in fenced content. FAIL Sev-1 if a skill is invoked by path; Sev-2 if path appears as reference. Quote. Path-references to `~/.claude/projects/` (transcript storage) are EXEMPT — that's session-storage, not skill invocation.

- **P3. Markdown shout inside fenced prompts** (check_prompts §9). Grep `\*\*[^*]+\*\*` and unpaired `*[^*]+*` in fenced content. List every hit. FAIL Sev-2 if any hit. Markup is dead weight in Claude Code — pasted prompts render literal asterisks. Carve-out: backticks for paths/code are fine.

- **P4. Curriculum-vocab leak inside fenced prompts** (compounded 2026-04-27 curriculum-vocab-needs-inline-definition). Grep `\bM[1-9]\b`, `\bthe training\b`, `\bthe send-off\b`, `\bcompounding\b`, `\bthe kit\b`, `\brequirement-weaving\b`, `\bthe M-arc\b`, and literal `<[a-z][a-z-]+>` placeholder-style angle brackets, in fenced content. FAIL Sev-1 on any hit unless the prompt defines the term inline (parenthetical) on first use. Quote. Carve-out: `<encoded-folder>` / `<uuid>` / `<session>` / `<name>` and similar that the SAME prompt defines in adjacent prose are PASS-with-justification.

- **P5. Open-hook justification (§1(d)).** For each fenced block whose last non-whitespace character is `:`, ask: does the student have the value MORE concretely than Claude does? Two diagnostics: (a) Could Claude write a plausible value cold from auto-load context? If yes, FAIL Sev-2 (gratuitous hook). (b) Does the student own the value (a bug they live with, a shape they chose, a task they own)? If yes, PASS-with-justification. Quote the colon-line + the preceding context line that establishes the student's ownership.

  Inverse check (missing-hook): if the prompt requires student-supplied input (asks Claude to act on a thing only the student can name) but uses bracket placeholders or pre-prompt narration instead, that's already caught by P1 / mechanical-narration ban — note as cross-reference, do not double-count.

## E-checks — exercise body (ex-maintainer)

- **E1. Value-prop / positioning leak** (check_writing §13). Grep (case-insensitive) `not an? aspirational`, `not a vendor`, `\bvendor\b`, `not (a )?marketing`, `the real practitioners`, `unlike consultancy`, `grounded in actual`, `not theoretical`, `from the person running it`. FAIL Sev-2 on any hit. Quote. The word `vendor` is suspect every time — even non-defensive uses (lock-in, SDK, docs) drag the project's positioning posture into a teaching beat.

- **E2. Pacing-theatre** (check_pedagogy §10 student agency). Grep `close the laptop`, `take a deep breath`, `take a beat`, `for a second`, `for a moment`, `pause and breathe`, `sit for [0-9]`, `breathe for`. FAIL Sev-2 on any hit. Quote.

- **E3. Tease-the-payoff section headers** — FLAG only. List every `^##` heading whose words don't name the artefact / move / phase (heuristic: a question without a noun, a count word like *"One word"*, a metaphor without anchor). Human decides FAIL.

- **E4. Cross-module artefact contract receiving side** (check_pedagogy §38). List every body reference to an artefact "from the previous module" / "from M{N-1}" / "the previous-run branch" / "the file you wrote in M{N-1}". For each, the body must name the artefact's stable identifier (path, branch name, commit pattern, skill name + path). FAIL Sev-1 if a referenced artefact has no stable identifier in body. **Companion FLAG (manual):** the producing-side runner must actually create that identifier. Judge surfaces the receiving-side gap; producer-side verification is a one-line note for human review or is paired against the producing module's Judge findings.

- **E5. Session-mechanics / working-directory naming** (check_pedagogy §40). At every session-open boundary in body (sentences containing `open a new Claude Code session`, `start a fresh session`, `open Claude Code`, `open a new session`), the working directory must be named explicitly: absolute path, relative path, worktree path, or unambiguous repo-root reference. FAIL Sev-1 if working directory is implicit ("in the same repo" while a prior module ran in a worktree, or no path at all). Quote opening sentence + adjacent context. Working-directory changes between modules require rationale in the body — flag missing rationale as Sev-2.

- **E6. Banned words in body** (check_writing §1). Grep word-bounded `\bhonest\b`, `\bdelve\b`, `\bsubstrate\b`, `\bcrucial\b`, `\bimportantly\b`, `\bsynergize\b`, `\bleverage\b` (verb sense). FAIL Sev-2 on any body hit. Quote. AE101 carve-out: `\bpractice\b` (noun) is BANNED in M1–M3 modules and exercises; ALLOWED in M4+ (earned milestone). The Judge knows the module from its filename.

- **E7. Defensive value-prop framing in body** (compounded 2026-04-28 value-prop-leaks-into-curriculum-body). Grep `not an? aspirational`, `the real practitioners`, `unlike consultancy decks`, `from the person running it`. Overlap with E1 is intentional — same root, different surfaces. Report once if the same line trips both.

## Out-of-scope for this dimension

- **Platform-claim fictions** (skills that don't exist; `@glob` CLAUDE.md syntax). Requires live capability check, not source grep. Route to `curriculum-pre-ship-audit`'s capability dimension.
- **Voice-quartet register drift** — three-persona sim catches this.
- **§39 removals are strategic** — applies to generation-time decisions, not source state.

## Report shape (Judge integrates this section)

Add a `### Prompt-source audit` block to the Judge's report:

```
### Prompt-source audit

Inputs swept:
- Fenced prompts: /tmp/prompts/<slug>/prompt-00{N}.txt
- Exercise body: curriculum/exercises/<slug>.md (ex-maintainer)

P1: <PASS | FAIL Sev-N — quote>
P2: ...
...
E7: ...

Sev-1 count: <N>
Sev-2 count: <N>
FLAG count: <N>

Producer-side companion checks (manual):
- <if E4 had a producing-module reference, name it here for human follow-up>
```

The Judge's overall verdict ladder includes this dimension: BLOCK if any Sev-1 OR any A/H FAIL; READY-WITH-FLAGS if Sev-2 or FLAG present and no Sev-1; READY if everything clean.

# Lint — Jargon Ban (Cumulative)

**Catches:** banned business-audience jargon appearing in student-facing text before it's earned with a plain definition tied to what the student just did. See `.claude/skills/content-creation/SKILL.md` § Business-audience jargon ban for the banned list and the SVP test.

**Cumulative across arc order:** a term may be earned in Mn and then used freely Mn+1 onward. The lint reads modules in sequence and tracks where each term is introduced vs. where it's used.

## Run

```
You are running the cumulative jargon-ban lint on Agents 102 Bootstrap curriculum.

READ IN SEQUENCE (arc order):
- curriculum/trainings/bootstrap/prework.md
- getting-going.md (M1) + inlined exercises + lectures
- building-agent-systems.md (M2) + inlined
- evaluations.md (M3) + inlined
- security.md (M4) + inlined
- output-quality.md (M5) + inlined
- multi-agent-systems.md (M6) + inlined
- personal-to-team.md (M7) + inlined
- agents-building-agents.md (M8) + inlined

BANNED WORDS (from SKILL.md § Business-audience jargon ban):
embeddings, vector, vector database, RAG, retrieval-augmented generation, retrieval (technical sense), pipeline (technical sense), orchestration, orchestrator, schema, architecture, subagent, frontmatter, prompt engineering, inference (technical sense), fine-tuning

HARD-BANNED WORDS (never earnable — substitute "exercise"):
ritual, practice (as a noun for a training activity), ceremony

Exempt contexts (do NOT flag): content below `<!-- maintainer -->` cut, TODO comments, eval template slots, the project CLAUDE.md / content-strategy.md / guardrails files (authoring-side, not student-facing).

For each banned word, for each file in arc order:

=== CHECK ===
- Find every occurrence in student-facing text (i.e., above any `<!-- maintainer -->` cut).
- Classify:
  - **INTRODUCED** — the occurrence accompanies a plain-English definition tied to what the student just did or is about to do. (E.g., *"This is called RAG — we're going to feed Claude your files so it can quote them back."*) Mark the term as earned from this module onward.
  - **UNEARNED** — the word is used without such a definition, AND it hasn't been earned in a prior module in arc order.
  - **EARNED** — used after being introduced; no flag.

=== OUTPUT ===
Per banned word:
- First occurrence: [file + line + snippet] — [INTRODUCED / UNEARNED]
- Subsequent UNEARNED uses: list

Then summary:
- Terms with zero uses: fine.
- Terms used UNEARNED: violations.
- Terms properly introduced and reused: good.

If zero UNEARNED violations: "PASS — no unearned jargon."

Be literal: the SVP test means any reader with zero technical background must not flinch at an unearned term. If the context leaves them to infer, that's UNEARNED.
```

## Upgrade path

- Add terms to the banned list in SKILL.md when a new unearned-jargon complaint surfaces in real training.
- If a term is legitimately earned across multiple modules and the introduction is always confusing, elevate it to a Module 1 "vocabulary primer" exercise rather than introducing it six times.

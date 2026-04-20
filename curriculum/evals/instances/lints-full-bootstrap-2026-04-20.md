# Lints — Full Bootstrap — 2026-04-20

## Summary

- **Path consistency:** 1 violation in prompt blocks (M2 prework writes `challenge.md` bare at root instead of `module-2/challenge.md`). All include-links resolve; all query params valid.
- **Time budget:** 8 of 8 modules MISSING-TIMES on Connections/Bridge. M1 MISSING-TIMES on both lectures. M6 lecture MISSING-TIME. M8 MISSING-TIMES on everything.
- **Jargon ban:** 4 UNEARNED term occurrences in student-facing text — *architecture* (M3 meta), *orchestrator/orchestrates* (M3 LO, M6 meta Materials), *pipeline* (M3 LO), *retrieval-augmented generation / RAG* (grounded.md body).

Worst offenders: (1) M8 — no time budget anywhere; (2) M3 module file front-matter leaks three banned terms before the prework earns them; (3) M1 lectures missing Time lines.

---

## Path Consistency

### Check 1 — Include-link targets

All 14 include-links across Bootstrap modules resolve to existing files in `curriculum/exercises/`, `curriculum/lectures/`, `curriculum/supplementary/`. PASS.

### Check 2 — Cross-page query params

All `curriculum.html?file=…` links resolve against `site/curriculum.html` — confirmed the renderer reads `file` param (line 53: `var directFile = params.get('file')`). PASS.

### Check 3 — Literal paths in prompt blocks

- **curriculum/exercises/name-your-challenge.md, line 38** (prompt block): `write a one-paragraph brief to challenge.md`. Scope: exercise says *"In Claude Code opened at your training directory"* → root scope. Per rule, per-module artifact at root must use `module-2/challenge.md` prefix. Current prompt writes `challenge.md` to the training-directory root, not `module-2/`. Prose above the block claims *"the brief will land in `module-2/`"* — drift between prose and prompt. **VIOLATION.**
  - **Fix:** change the prompt line to `write a one-paragraph brief to module-2/challenge.md. Show it to me before saving.` and ensure the scaffold seeds `module-2/` before prework runs.

All other prompt blocks surveyed:

- personal-site-with-guardrails.md (M1, `module-1/` scope): uses bare `site.html`, `snake.html`, `CLAUDE.md`. PASS.
- personal-agent-homework.md (M2 homework, root scope): `module-2/morning-agent/morning.md`, `module-2/morning-agent/latest.html`, bare `style.md`, `CLAUDE.md`. PASS.
- build-your-challenge-brain.md (M2): bare `sources/`, `brain/`, `agents/`, `CLAUDE.md`; `module-2/soft-pages.md`. PASS.
- three-retrievers-three-minds.md (M3): `module-3/question.md`, `module-3/retrievals/<name>.md`, `module-3/stances/<name>.md`. PASS.
- audit-your-agent.md (M4): `module-4/policy-report.md`, `module-4/security-report.md`, `module-4/residual.md`, bare `skills/`. PASS.
- hallucination-bakeoff.md (M5): `module-5/briefing.md`, `module-5/gold-standard.md`, `module-5/detectors/<name>.md`, `module-5/scoreboard.md`, `module-5/still-uncertain.md`, bare `judges/groundedness-judge.md`. PASS.
- eval-loop.md (M6): `module-6/orchestrator.md`, `module-6/runs/round-N/…`, `module-6/dashboard.md`, `module-6/heartbeat.md`, `module-6/eval-notes.md`, bare `judges/groundedness-judge.md`. PASS.
- share-your-work.md (M7): `module-7/jtbd.md`, `module-7/branch.md`, etc. PASS.

### Check 4 — Filename conventions

All exercise/lecture/supplementary filenames are kebab-case, no numbers, no underscores. No spaces or non-ASCII in any path referenced in prompts. PASS.

---

## Time Budget

### M1 — Getting Going

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: context-is-king | [NO TIME STATED] | 10-15 | MISSING |
| Exercise: personal-site-with-guardrails | 45 min | 55-70 | UNDER |
| Lecture: what-just-happened | [NO TIME STATED] | 10-15 | MISSING |
| Debrief | ~5 min (implied) | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~50 min | 90-110 | **THIN + MISSING-TIMES** |

Verdict: **MISSING-TIMES + THIN.** Even generously adding targets, stated exercise (45) + two lectures (assume 10 each) + debrief (5) = 70. Below the 90-min floor unless Connections + Bridge add 20.

### M2 — Building Agent Systems

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: compounding | 10 min | 10-15 | OK |
| Exercise: build-your-challenge-brain | 45 min | 55-70 | UNDER |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~60 min | 90-110 | **THIN + MISSING-TIMES** |

(Prework exercise `name-your-challenge.md` 35 min + `personal-agent-homework.md` 35 min excluded — not in-session.)

Verdict: **MISSING-TIMES + THIN.** Exercise under 55-min floor; debrief too short.

### M3 — Multi-Agent Systems

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: when-to-split-an-agent | 8-10 min | 10-15 | SLIGHTLY UNDER |
| Exercise: three-retrievers-three-minds | 50 min | 55-70 | UNDER |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~65 min | 90-110 | **THIN + MISSING-TIMES** |

Verdict: **MISSING-TIMES + THIN.**

### M4 — Security

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: practice-of-risk | 8-10 min | 10-15 | SLIGHTLY UNDER |
| Exercise: audit-your-agent | 45 min | 55-70 | UNDER |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~60 min | 90-110 | **THIN + MISSING-TIMES** |

Verdict: **MISSING-TIMES + THIN.**

### M5 — Output Quality

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: grounded | 10-12 min | 10-15 | OK |
| Exercise: hallucination-bakeoff | 55-70 min | 55-70 | OK |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~80 min lower / ~92 upper | 90-110 | **MISSING-TIMES; borderline FIT** |

Verdict: **MISSING-TIMES.** Closest to fit of any module. If Connections/Bridge/Debrief fill canonical targets, comfortably within 90-110.

### M6 — Evaluations

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: evals-as-steering | [NO TIME STATED] | 10-15 | MISSING |
| Exercise: eval-loop | 55-70 min | 55-70 | OK |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~60-75 min | 90-110 | **MISSING-TIMES** |

Verdict: **MISSING-TIMES.** Lecture file carries a maintainer TODO noting length undercooked.

### M7 — Personal to Team

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture (inline in module file) | 10-12 min | 10-15 | OK |
| Exercise: share-your-work | 55-70 min | 55-70 | OK |
| Debrief | ~5 min | 12-18 | UNDER |
| Bridge | [NO TIME STATED] | 3-5 | MISSING |
| **TOTAL (stated)** | ~70-87 min | 90-110 | **MISSING-TIMES; borderline** |

Verdict: **MISSING-TIMES.** Closest to fit after M5.

### M8 — Agents Building Agents

| Phase | Stated | Target | Status |
|-------|--------|--------|--------|
| Connections | [NO TIME STATED] | 8-12 | MISSING |
| Lecture: Agent generates agent (demo) | [NO TIME STATED] | 10-15 | MISSING |
| Exercise: Extend your system | [NO TIME STATED] | n/a | MISSING |
| Exercise: Joint Double Diamond | [NO TIME STATED] | 55-70 total | MISSING |
| Debrief | [NO TIME STATED] | 12-18 | MISSING |
| Bridge | one sentence | 3-5 | MISSING |
| **TOTAL (stated)** | — | 90-110 | **ALL MISSING-TIMES** |

Verdict: **MISSING-TIMES.** M8 has no explicit time targets on any phase. Exercises are listed inline in the module file (not separate exercise files), which is why no **Time:** lines exist — but the budgets still need to be declared.

---

## Jargon Ban

### embeddings — zero occurrences. Fine.

### vector / vector database — zero occurrences in student-facing text. (grounded.md line 111 is in maintainer section — EXEMPT.)

### RAG / retrieval-augmented generation
- **First occurrence:** `curriculum/lectures/grounded.md` line 45 (student-facing) — *"Somebody tells you 'use retrieval-augmented generation,' or 'do a consistency check,'…"* Used without plain-English definition; the student is left to infer. **UNEARNED.** The phrase is quoted as what students might have heard, but that doesn't earn it for an SVP who has not heard it.
- `build-your-challenge-brain.md` line 147 mentions "File-based agentic RAG (Boris Cherny / Anthropic observation)" — in maintainer section. EXEMPT.
- grounded.md lines 103, 111 — in maintainer section. EXEMPT.
- **Verdict:** UNEARNED in grounded.md. Fix: drop the phrase or add a one-clause gloss ("RAG — feeding the agent retrieved documents so it quotes from them").

### retrieval (technical)
- Heavy use in M3 materials ("retrievers", "retrievals/", "retrieval files"). Used in plain-English sense (fetching / finding), not as the technical jargon "retrieval". Any SVP understands "retriever" as "thing that fetches." **NOT UNEARNED** — acceptable plain-English.

### pipeline (technical)
- **First occurrence:** `curriculum/trainings/bootstrap/multi-agent-systems.md` line 15 (What You'll Learn): *"Design a multi-agent pipeline in two shapes…"* Technical usage; no plain gloss. **UNEARNED.**
- `personal-to-company-gap.md` line 110: *"one person owns the pipeline"* — metaphorical plumbing sense. OK.
- `agent-ready-data.md` line 31: *"today's pipeline"* — plain sales-pipeline sense. OK.
- **Verdict:** UNEARNED in M3 module LO. Fix: replace with "multi-agent setup" or "multi-agent arrangement."

### orchestration / orchestrator / orchestrates
- **First occurrence:** `multi-agent-systems.md` line 16 (LO): *"synthesizer that **orchestrates** three subagent personas"*. **UNEARNED** — no gloss in the module file at first use.
- `evaluations.md` line 10 (Materials): *"**Orchestrator** reference prompt"* — appears in student-facing Meta before any definition. **UNEARNED at first appearance in M6.**
- `evaluations.md` line 38 (Key Concepts): *"**Orchestrator pattern.** One session directs parallel tracks."* — this counts as INTRODUCED, but AFTER the meta already used the term.
- `eval-loop.md` line 15 (exercise Phase 1): *"You set up an **orchestrator** — one Claude session whose whole job is to direct other work."* — clean **INTRODUCED.** If the exercise were read before the module meta, this would earn the term. But the student reads the module page first.
- **Verdict:** UNEARNED at M3 line 16 and M6 line 10. Fix: in M3 LO, replace "orchestrates" with "coordinates" or "runs three subagent stances." In M6 meta, rename "Orchestrator reference prompt" to "Loop coordinator prompt" OR introduce the term one line earlier in module prose.

### schema
- Student-facing occurrences: zero. (Mentions in `supplementary/README.md` line 25, `learning-and-compounding-systems.md` line 11, `building-guardrails.md` line 12 — these are supplementary meta/TOC files, marked "*Section to write.*", not student-facing yet.) Fine for now; flag for when those sections get drafted.

### architecture
- **First occurrence:** `multi-agent-systems.md` line 8 (Prework Meta): *"a plain-language primer on Claude Code's subagent **architecture**"*. **UNEARNED.**
- `agent-ready-data.md` line 3: *"Not an architecture doctrine…"* — contextual use, not technical term. OK.
- `module-5-prework.md` line 61: *"outcome on record, architecture not"* — in maintainer section. EXEMPT.
- **Verdict:** UNEARNED in M3 Meta line 8. Fix: replace "subagent architecture" with "how subagents work in Claude Code" or similar.

### subagent
- **First occurrence in Meta (student-facing):** `multi-agent-systems.md` line 8 (Prework): *"a plain-language primer on Claude Code's **subagent** architecture (what it is, how to launch one, what you'll see)"*. The word is used in the referential sense — the primer itself will define it. Technically UNEARNED at first use (line 8 of the module page), but the prework file (`module-3-prework.md`) is what the student reads *before* hitting the module page, and lines 27/35/37 of the prework cleanly INTRODUCE the term with definition. Timing: if prework is actually read first, term is EARNED by the time the student sees the module page.
- The module file's own line 8 still leaks the word in Meta — if a student skims the module page without having done prework, the term lands cold. Borderline. Flag as "EARNED if prework done; UNEARNED if skipped."
- Subsequent uses in `hallucination-bakeoff.md` (Phase 1), `three-retrievers-three-minds.md` (Phase 2), `eval-loop.md` — EARNED.

### frontmatter — only in maintainer section of module-3-prework.md line 69. EXEMPT.

### prompt engineering — zero occurrences. Fine.

### inference (technical) — zero occurrences. Fine.

### fine-tuning — only in maintainer section of grounded.md line 111. EXEMPT.

### Jargon-ban summary

| Term | Status | Location |
|------|--------|----------|
| embeddings | zero use | — |
| vector / vector database | zero student-facing | — |
| RAG / retrieval-augmented generation | **UNEARNED** | grounded.md line 45 |
| retrieval (technical) | used in plain-English sense | M3 materials — OK |
| pipeline (technical) | **UNEARNED** | multi-agent-systems.md line 15 |
| orchestration / orchestrator | **UNEARNED at first use** | multi-agent-systems.md line 16; evaluations.md line 10 |
| schema | zero student-facing | — |
| architecture | **UNEARNED** | multi-agent-systems.md line 8 |
| subagent | borderline (EARNED in prework, leaks in module Meta first) | multi-agent-systems.md line 8 |
| frontmatter | zero student-facing | — |
| prompt engineering | zero use | — |
| inference | zero use | — |
| fine-tuning | zero student-facing | — |

**Verdict:** four clean UNEARNED violations (architecture, orchestrator/orchestrates ×2, pipeline, RAG). M3 module file is the chief offender — three banned terms appear in its Meta/LO section before any of them are earned by the student's reading of prework. One subagent-leak is borderline.

---

## Top-10 Fix List

1. **[sev 5] curriculum/trainings/bootstrap/multi-agent-systems.md — M3 Meta section leaks `architecture`, `pipeline`, `orchestrates` in Meta/LO lines 8–16 before the student hits the earning prose.** These are the first things an SVP reads on the module page.
   - **Fix:** rewrite three lines in plain English.
     - Line 8: "a plain-language primer on how Claude Code launches subagents (what it is, how to launch one, what you'll see)".
     - Line 15: "Design a multi-agent setup in two shapes".
     - Line 16: "Build three retrieval agents, each speaking its own source's dialect, and a synthesizer that coordinates three subagent stances".

2. **[sev 4] curriculum/exercises/name-your-challenge.md — the prompt writes `challenge.md` bare at the training-directory root instead of `module-2/challenge.md`.** Scaffold-vs-prompt drift; breaks the canonical "per-module artifact at root uses `module-N/` prefix" rule.
   - **Fix:** update line 38 prompt to `write a one-paragraph brief to module-2/challenge.md. Show it to me before saving.` Confirm `module-2/` seeded by the time prework runs.

3. **[sev 4] M8 (agents-building-agents.md) has no explicit time budget on any phase.** Entire module is MISSING-TIMES.
   - **Fix:** the two exercises (Extend your system, Joint Double Diamond) need **Time:** lines — likely ~15 min for Extend and ~45–55 min for Joint Double Diamond to fit the 55–70 exercise window. Add a one-line demo lecture target (~10 min). Add Connections / Debrief / Bridge estimates in the module file.

4. **[sev 3] curriculum/lectures/grounded.md line 45 uses "retrieval-augmented generation" in student-facing prose without a gloss.** Quoting what students might have heard doesn't count as earning.
   - **Fix:** drop the acronym, or rewrite as *"Somebody tells you to use RAG — feeding the agent retrieved documents so it can quote from them — or to run a consistency check…"*.

5. **[sev 3] curriculum/trainings/bootstrap/evaluations.md line 10 mentions "Orchestrator reference prompt" in Materials (student-facing Meta) before line 38 introduces the term.**
   - **Fix:** either reorder so the Key Concepts introduction (line 38 style) precedes the Materials usage, or rename Materials line to "Loop coordinator prompt" until the term is earned.

6. **[sev 3] M1 lectures (`context-is-king.md`, `what-just-happened.md`) have no **Time:** lines.** Already flagged in the prior `static-check-prework-m1-2026-04-20.md` eval.
   - **Fix:** add `**Time:** 10 minutes.` to `context-is-king.md` and `**Time:** 8 minutes.` to `what-just-happened.md`. Confirmed from prior eval's estimate.

7. **[sev 3] curriculum/lectures/evals-as-steering.md has no **Time:** line AND the lecture file itself carries a maintainer TODO noting length is undercooked (~520 words vs. 800–1200 target).**
   - **Fix:** add `**Time:** 10–12 minutes.` after Pass 2 expansion; the maintainer TODO items (worked example, second steering-eval example, LLM-as-judge paragraph) are the expansion candidates.

8. **[sev 2] Every module's Connections, Debrief, and Bridge phases lack explicit time budgets in the module file.** Debriefs say "Five minutes" in prose but not as a structured target; Connections and Bridge are unbudgeted.
   - **Fix:** in each module file's Meta or Debrief/Bridge headings, add *Time: X min* consistently. Template update: module file shape in `curriculum/CLAUDE.md` could require time markers on these three phases, not just exercises/lectures.

9. **[sev 2] M2–M4 exercises are each ~45 min, which is **under** the 55–70 exercise window.** Not a lint-blocking fail, but when summed with missing Connections/Debrief/Bridge times, the whole module risks falling short of the 90-min lower bound.
   - **Fix:** either declare the 10–15 min of Connections + Debrief + Bridge more explicitly so the total clears 90, or add a named extension beat (the "one question before you close" pattern used in `compounding.md` is a good template — see M2).

10. **[sev 2] M3 module file line 8 references "subagent" in Meta before the prework file introduces it.** Borderline — if prework is done first (which it should be), the term is earned; if skimmed, it lands cold.
    - **Fix:** on line 8 of the module file, lead with "a plain-language primer on how Claude Code launches helper agents (sometimes called subagents)…" — uses the plain-English "helper agents" first, then names the term the prework will teach.

---

## Notes for next run

- The `name-your-challenge.md` path drift (fix #2) is exactly the kind of scaffold-vs-prompt bug the lint was designed to catch. Consider seeding the path-consistency lint's known-patterns log with this case.
- MISSING-TIMES is a systemic pattern across the whole Bootstrap, not a per-module defect. A template-level fix (requiring **Time:** lines on every phase in the module file shape) would close this in one edit pass.
- Jargon-ban violations are concentrated in M3 Meta. A single rewrite of the M3 module file's Meta/LO section closes three of the four clean UNEARNED cases.

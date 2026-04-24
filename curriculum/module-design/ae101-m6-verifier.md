# AE101 M6 — verifier

Cherny background-agent verifier. An LLM judge that reads an AE101 M6 file and scores it against mood contract, LO contract, compendium rules, delivery-architecture guards, and file-specific contracts. Subagents run this before save. The `/loop` runs it every iteration.

---

## How to run

1. Read the file under review.
2. Read `curriculum/module-design/ae101-m6-reference.md` (goal and contracts).
3. Read the compendiums:
   - `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_student_facing.md`
   - `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_writing.md`
4. Run the deterministic grep pass (below) FIRST — cheap fails caught before LLM judges spend tokens.
5. Run each judge. Score 1–5 for graded judges; binary for rule-clean judges.
6. Emit verdict: **approve** / **approve-with-todos** / **revise**.

## Deterministic grep pass

Any hit fails the relevant binary judge. Run these against the full file text (maintainer blocks exempt where noted).

```
# Banned writing-compendium tokens (§1)
grep -nE '\b(ritual|ceremony|substrate|honest|delve|importantly|crucial)\b'

# "landscape" as verb — context-check hits
grep -n '\blandscape\b'

# Third-person student references in body (maintainer blocks exempt)
grep -n 'the student'   # then inspect: before <!-- maintainer -->?

# Placeholders inside fenced prompt blocks
grep -nE '\[[A-Z][A-Z _-]+\]'   # inside ``` ... ``` regions only

# Path-leak inside fenced prompt blocks (skill install path appearing in student prompt)
grep -n '~/.claude/skills/'   # inspect: inside ``` ... ```?

# Training-dir-shape paths (AE101 compounds in real repo, not module-N/)
grep -nE '\bmodule-[0-9]/'

# Em-dash overuse check (not a fail; a count)
grep -c '—'
```

## Judges

### Essential (any fail ⇒ revise)

**J1. Mood match (graded, 1–5).** Does the file contribute to practitioner-fluency mood? *"I know how to test, I know how to learn, I know how to encode."* Failure shapes that steal the mood: compliance-feel, paperwork-feel, credibility-performance, trainer-monologue retrospective. 3 or below ⇒ revise.

**J2. LO match (graded, 1–5).** Do the lectures set up and the exercises exercise the LOs from the reference artefact? No LO orphaned; no activity without an LO. 3 or below ⇒ revise.

**J3. Banned-word clean (binary).** Zero matches for J3's grep (ritual / ceremony / substrate / honest / delve / importantly / crucial / landscape-as-verb) outside maintainer blocks. Miss ⇒ revise.

**J4. Student-POV clean (binary).** Zero *the student* references in student-facing body. Maintainer blocks below `<!-- maintainer -->` exempt. Miss ⇒ revise.

**J5. Placeholder-in-fence clean (binary).** Zero `[BRACKETS]` placeholders inside fenced prompt blocks the student copies. Miss ⇒ revise.

**J6. Skill-invocation clean (binary).** Installed skills invoked by name, never by path. Zero `~/.claude/skills/<skill>/` paths in fenced prompt blocks. Miss ⇒ revise.

**J7. AE101 delivery architecture (binary).** No training-dir state, no `module-N/` folders, no `prework/` scaffolds in prompt paths. All paths repo-relative. Miss ⇒ revise.

### Contributory (fail ⇒ approve-with-todos)

**J8. Earn tech terms (graded, 1–5).** Every technical term (*skill, memory, agent, subagent, connector, MCP, plan mode, eval, judge, verifier, gate, reference artefact, plan.md*) has a one-breath primer on first use in the file if this file is where it first appears in AE101. 2 or below ⇒ approve-with-todos.

**J9. Prompt action lead-in (graded, 1–5).** Every student-facing fenced prompt block is preceded by a one-sentence action lead-in with a command verb (under 20 words). 2 or below ⇒ approve-with-todos.

**J10. Em-dash discipline (graded, 1–5).** Em-dashes appear only where a parenthetical is truly parenthetical (role, origin, clarification). Em-dashes that split what should be two short sentences: count them; more than three in body ⇒ approve-with-todos.

**J11. Link format (graded, 1–5).** Inline links use the target's H1 title, not the filename. Zero backtick code-span paths in body. 2 or below ⇒ approve-with-todos.

**J12. LLM-vs-agent-vs-Claude discipline (graded, 1–5).** *LLM* used for thinking (reasoning, drift, framing). *Agent* used for acting (files, tool calls). *Claude* used for product/version/disambiguation. No blurring. 2 or below ⇒ approve-with-todos.

**J13. Action-header discipline (graded, 1–5).** Section headers for sections where the reader is about to do something use command verbs (*Bring to M6*, *Pick the repo*, *Unzip the content folder*). Declarative noun-phrase headers OK for lecture sections where the reader's job is understanding. Mismatch ⇒ approve-with-todos.

## Verdict logic

- All essential judges pass (J3–J7 clean + J1–J2 score ≥ 4): **approve**.
- All essential pass, one or more contributory judges at 2–3: **approve-with-todos** — log each below `<!-- maintainer -->` under `**TODO (from pre-ship verifier pass):**`.
- Any essential judge fails: **revise** — fix in place and re-run the verifier.

## Report format

For each file reviewed, emit:

```
FILE: <path>
GREP: <clean | fails listed>
J1 mood: <score> — <one-line note>
J2 LOs: <score> — <one-line note>
J3 banned: <clean | fails listed>
J4 student-POV: <clean | fails listed>
J5 placeholder-in-fence: <clean | fails listed>
J6 skill-invocation: <clean | fails listed>
J7 delivery-architecture: <clean | fails listed>
J8 earn-tech-terms: <score>
J9 action-lead-in: <score>
J10 em-dash: <score>
J11 link-format: <score>
J12 LLM-vs-agent: <score>
J13 action-headers: <score>
VERDICT: <approve | approve-with-todos | revise>
TODOs (if any): <list>
```

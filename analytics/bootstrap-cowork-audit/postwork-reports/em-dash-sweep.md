# Em-dash sweep — Bootstrap student-facing files

Mechanical sweep enforcing `check_student_facing.md` #14 (no em-dashes in prose). Scope: prose above `<!-- maintainer -->`, outside fenced code blocks, outside HTML comments. Replacements followed the cheap-to-expensive ladder (split / colon / comma / parens / drop).

## Files SKIPPED (orchestrator should sweep after parallel subagents finish)

The following files were flagged as in-flight by another subagent and were NOT touched in this sweep:

- `curriculum/exercises/audit-your-agent.md` (~28 em-dashes)
- `curriculum/exercises/module-4-prework.md` (~15)
- `curriculum/trainings/bootstrap/prework.md` (~7)
- `curriculum/trainings/bootstrap/building-agent-systems.md` (~8)
- `curriculum/trainings/bootstrap/security.md` (count unknown)

Recommend re-running the same mechanical pass on these once their reshape lands.

## Files swept

Counts below are total `—` occurrences in the file (before/after). Most "after" counts are non-zero because em-dashes inside fenced ```` ``` ```` prompt blocks and inside maintainer blocks are out of scope per the discipline. Verified clean above the maintainer line and outside fences for all twelve files.

| File | Before | After (in-scope) | After (total file, fences+maintainer included) |
|---|---|---|---|
| build-your-challenge-memory.md | 57 | 0 | 32 |
| personal-site-with-guardrails.md | 42 | 0 | 13 |
| share-your-work.md | 60 | 0 | 40 |
| three-retrievers-three-minds.md | 52 | 0 | 35 |
| joint-double-diamond.md | 48 | 0 | 22 |
| hallucination-bakeoff.md | 41 | 0 | 41 (all em-dashes were inside fenced prompts; no prose changes) |
| name-your-challenge.md | 25 | 0 | 10 |
| extend-your-system.md | 20 | 0 | 10 |
| agents-building-agents.md | 14 | 0 | 13 |
| multi-agent-systems.md | 14 | 0 | 13 |
| output-quality.md | 19 | 0 | 18 |
| getting-going.md | 4 | 0 | 3 (one remaining is inside an HTML `<!-- TODO -->` comment; out of scope) |

## Sample before/after sentences

### build-your-challenge-memory.md
- *Before:* "build a memory around it — scoped to the next big challenge"
  *After:* "build a memory around it, scoped to the next big challenge"
- *Before:* "**Phase 1 — Curate, ingest, build.**"
  *After:* "**Phase 1. Curate, ingest, build.**"
- *Before:* "Together they compound — each cycle smarter than the last"
  *After:* "Together they compound. Each cycle smarter than the last"
- *Before:* "If two topics should merge, or something's missing — pick option 4"
  *After:* "If two topics should merge, or something's missing, pick option 4"

### personal-site-with-guardrails.md
- *Before:* "It works. It looks okay. It's also generic — the site a competent LLM produces from a résumé"
  *After:* "It works. It looks okay. It's also generic. The site a competent LLM produces from a résumé"
- *Before:* "Most people freeze on it — even people who are great at things."
  *After:* "Most people freeze on it, even people who are great at things."
- *Before:* "The LLM didn't get better between Phase 1 and Phase 6 — you did."
  *After:* "The LLM didn't get better between Phase 1 and Phase 6. You did."

### share-your-work.md
- *Before:* "**Phase 1 — Interview for the job (12 min).**"
  *After:* "**Phase 1. Interview for the job (12 min).**"
- *Before:* "Ulwick turned it into a method — people don't buy products, they hire them for jobs."
  *After:* "Ulwick turned it into a method: people don't buy products, they hire them for jobs."
- *Before:* "The UNASSIGNED lines are the most valuable lines in this exercise — they are the questions you walk into your manager's office with on Monday."
  *After:* "The UNASSIGNED lines are the most valuable lines in this exercise. They are the questions you walk into your manager's office with on Monday."

### three-retrievers-three-minds.md
- *Before:* "Last module you were the librarian — searched Confluence, pulled from OneDrive, chased practitioner articles by hand."
  *After:* "Last module you were the librarian. You searched Confluence, pulled from OneDrive, chased practitioner articles by hand."
- *Before:* "**Phase 1 — Three retrievers, three sessions.**"
  *After:* "**Phase 1. Three retrievers, three sessions.**"
- *Before:* "In Session 1 —"
  *After:* "In Session 1:"

### joint-double-diamond.md
- *Before:* "# Exercise: Joint Double Diamond — diagnose and guide"
  *After:* "# Exercise: Joint Double Diamond, diagnose and guide"
- *Before:* "The deliverable: a Rumelt-style strategy kernel — diagnosis, guiding policy, near-term experiments, ranked risks — synthesised from everyone's agents reading everyone's work."
  *After:* "The deliverable: a Rumelt-style strategy kernel (diagnosis, guiding policy, near-term experiments, ranked risks) synthesised from everyone's agents reading everyone's work."
- *Before:* "Rumelt's sense — a policy is not a goal, it's a *how*."
  *After:* "Rumelt's sense: a policy is not a goal, it's a *how*."

### name-your-challenge.md
- *Before:* "Module 2 builds you a memory — a folder of your own notes and source material that Claude reads"
  *After:* "Module 2 builds you a memory: a folder of your own notes and source material that Claude reads"
- *Before:* "The hardest part of a memory isn't the tool — it's the scope."
  *After:* "The hardest part of a memory isn't the tool. It's the scope."
- *Before:* "(Done — no work left to ship.)"
  *After:* "(Done. No work left to ship.)"

### extend-your-system.md
- *Before:* "Today you don't build one — you describe one"
  *After:* "Today you don't build one. You describe one"
- *Before:* "**Phase 1 — Describe (5 min).**"
  *After:* "**Phase 1. Describe (5 min).**"

### agents-building-agents.md
- *Before:* "on any decision that feels too big to eyeball — same shape as the M2 Debrief move."
  *After:* "on any decision that feels too big to eyeball, same shape as the M2 Debrief move."

### multi-agent-systems.md
- *Before:* "a counterintuitive reframer — the Rory seat) each interrogate"
  *After:* "a counterintuitive reframer (the Rory seat) each interrogate"

### output-quality.md
- *Before:* "Push back where it's wrong — *\"that's not why detector 3 lost...\"* / *\"the known limit you wrote is too soft — say it.\"*"
  *After:* "Push back where it's wrong: *\"that's not why detector 3 lost...\"* / *\"the known limit you wrote is too soft, say it.\"*"

### getting-going.md
- *Before:* "You are the world's best evaluator of your own profile — domain expertise IS the eval"
  *After:* "You are the world's best evaluator of your own profile. Domain expertise IS the eval"

### hallucination-bakeoff.md
No prose em-dashes outside fenced prompt blocks; no edits applied.

## Method note

For each file: counted em-dashes, verified maintainer-block boundary, parsed fenced code regions, applied replacements with `Edit` tool, then verified zero em-dashes remain in the in-scope region (above maintainer, outside fences). Replacements preferred sentence splits and colons; parentheses used only for true parentheticals; commas where the aside was short and additive. No semicolons added. No content added or removed.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/postwork-reports/em-dash-sweep.md
SWEEP COMPLETE — files skipped: audit-your-agent.md, module-4-prework.md, prework.md, building-agent-systems.md, security.md

## Followup pass — 2026-04-25

Same mechanical discipline applied to the six files skipped during the parallel sweep (other subagents had finished by this run). Counts are total `—` in file (before / after). In-scope = body prose above `<!-- maintainer -->`, outside fenced ``` ``` blocks. All six are clean in scope after the pass.

| File | Before | After (total) | In-scope after |
|---|---|---|---|
| audit-your-agent.md | 26 | 15 | 0 |
| module-4-prework.md | 27 | 14 | 0 |
| trainings/bootstrap/prework.md | 7 | 0 | 0 |
| trainings/bootstrap/building-agent-systems.md | 9 | 7 | 0 |
| trainings/bootstrap/security.md | 18 | 15 | 0 |
| exercises/author-security-plugin.md | 20 | 8 | 0 |

Residual em-dashes are all inside fenced prompt bodies (the verbatim text students paste into Claude) or maintainer blocks — both explicitly out of scope per rule #14.

### Sample edits

**audit-your-agent.md**
- *"run the loop — assess, mitigate, reassess residual — on the system"* → *"run the loop (assess, mitigate, reassess residual) on the system"* (parens; true parenthetical)
- *"**Phase 1 — Policy audit.**"* → *"**Phase 1. Policy audit.**"* (split; phase headers across all six files)
- *"two reports you could not have produced by hand — one in policy language, one in agent-security language"* → *"two reports you could not have produced by hand: one in policy language, one in agent-security language"* (colon; expansion)

**module-4-prework.md**
- *"Supporting files hold the content — policy text, reference lists, templates"* → *"Supporting files hold the content (policy text, reference lists, templates"* (parens; enumerative aside)
- *"You author plugins by chatting with Claude — describe what you want, and Claude builds"* → *"You author plugins by chatting with Claude. Describe what you want, and Claude builds"* (split)
- *"You cannot fully predict it; you can only bound it."* — note: kept the existing semicolon (not introduced); the dash on the same paragraph's *"agent threat model is layered, not a replacement for the discipline you may already know"* split into two sentences

**bootstrap/prework.md**
- *"first agentic move of the training — you ask, the agent does"* → *"first agentic move of the training. You ask, the agent does"* (split)
- *"a password-protected URL — the same curriculum, hosted for your cohort"* → *"a password-protected URL: the same curriculum, hosted for your cohort"* (colon; restating the URL)
- Task headers *"Task 1 — Snake game"* etc. → *"Task 1. Snake game"* (split)

**building-agent-systems.md**
- Bridge: *"Meeting prep, competitive watching, drafting replies — all fine starters"* → *"Meeting prep, competitive watching, drafting replies are all fine starters"* (drop the dash; finite verb fixes the fragment)
- Pull-quote attribution *"— Antti"* → *"Antti"* (drop the dash; the blockquote already isolates the attribution line)

**bootstrap/security.md**
- LO: *"two lenses — a policy lens... and an agent-security lens covering named attack classes — and install it"* → *"two lenses (a policy lens... and an agent-security lens covering named attack classes) and install it"* (parens; true parenthetical inside a sentence with a load-bearing trailing clause)
- *"residual-risk vocabulary, CVSS, accepted-risk registers — probabilistic reasoning under bounded inputs"* → *"...accepted-risk registers: probabilistic reasoning under bounded inputs"* (colon; the right-hand side defines the left)
- *"controls a real production agent already lives behind — WAF, VPC egress, mTLS..."* → *"...already lives behind: WAF, VPC egress, mTLS..."* (colon; enumeration after a complete clause)

**author-security-plugin.md**
- Phase headers split same as audit file (*"**Phase 1 — Dictate what matters**"* → *"**Phase 1. Dictate what matters**"*)
- *"A **plugin** packages an expertise — rules, checklists, the moves an agent runs — into something the agent can plug in"* → *"A **plugin** packages an expertise (rules, checklists, the moves an agent runs) into something the agent can plug in"* (parens)
- *"The expert is the plugin — and you authored it"* → *"The expert is the plugin, and you authored it"* (comma; short additive aside)

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/postwork-reports/em-dash-sweep.md
FOLLOWUP SWEEP COMPLETE

## Final residue pass

Six files with residual em-dashes after prior subagent sweeps. Method per #14: split / colon / comma / parens / drop. Fenced prompt bodies and `<!-- maintainer -->` blocks untouched. H1 titles included (em-dash in title is still student-visible). All Bootstrap-only.

| File | Before | After |
|---|---|---|
| `exercises/module-2-prework.md` | 16 | 0 |
| `exercises/module-3-prework.md` | 19 | 0 |
| `exercises/three-retrievers-three-minds.md` | 3 | 0 |
| `trainings/bootstrap/evaluations.md` | 2 | 0 |
| `trainings/bootstrap/getting-going.md` | 1 | 0 |
| `trainings/bootstrap/personal-to-team.md` | 2 | 0 |

Sample edits:

- `module-2-prework.md`: *"can take days — and you don't want to find out when class starts"* → *"can take days. You don't want to find out when class starts"* (split). Title `Module 2 — Prework` → `Module 2 Prework` (drop).
- `module-3-prework.md`: *"Simon Willison — *simonwillison.net.* Daily public journal..."* → *"Simon Willison (*simonwillison.net*). Daily public journal..."* (parens for role/origin). *"its own context window — a clean slate"* → *"its own context window (a clean slate"* (parens, true parenthetical).
- `three-retrievers-three-minds.md`: *"a strategic answer to your real question — and you catch where it glossed"* → *"a strategic answer to your real question, and you catch where it glossed"* (comma).
- `evaluations.md`: *"The judge doesn't move — that's why round 5's score has anything to say"* → *"The judge doesn't move. That's why round 5's score has anything to say"* (split).
- `getting-going.md`: HTML comment, *"already named "Context is King" — resolve by renaming"* → *"already named "Context is King"; resolve by renaming"* (semicolon swap inside maintainer-style TODO comment).
- `personal-to-team.md`: *"rolled out access far ahead of trust — large fractions"* → *"rolled out access far ahead of trust. Large fractions"* (split).

Verification: `awk` excluding fenced blocks and maintainer block returns 0 em-dashes per file.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/postwork-reports/em-dash-sweep.md
FINAL SWEEP COMPLETE

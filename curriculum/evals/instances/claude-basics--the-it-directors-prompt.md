# Eval Instance — Claude Basics M2: The IT Director's prompt

**Target file:** `curriculum/exercises/the-it-directors-prompt.md`
**Module file:** `curriculum/trainings/claude-basics/can-you-be-trusted-to-run-this.md`
**Closing lecture:** `curriculum/lectures/the-data-question.md`
**Strategy:** `bosser-strategy:content-strategy-claude-basics.md` § *Can you be trusted to run this?*
**Eval template:** `curriculum/evals/exercise.md`
**Audience persona (primary):** IT admin / info-management specialist with medium-to-light chat experience. Built a system in M1 (45 minutes ago); now learning to verify output on tasks where ground truth isn't already in their head.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Construct** a verification table from any LLM output by extracting one row per claim with three columns (claim / where to check / verdict)
- **Verify** each row backward against the appropriate admin panel and assign one of three verdicts: checked-true, checked-wrong, or *"I can't tell"*
- **Translate** at least one *"I can't tell"* row into a CLAUDE.md verification rule formatted as *"Before claiming X, do Y"*

If an IT admin with medium-light chat experience walks out able to do these on a fresh task at their desk, the exercise has worked.

### Framing fidelity

Leads with the module's Big Idea: **"Trust isn't a feeling. It's a verification practice you can run on output you didn't already know the answer to."**

Avoids:
- **Compliance-checklist register.** *"Verify every claim per the verification protocol"* would land as compliance theatre. The exercise treats verification as a custodial practice, not a checklist
- **Panic register.** *"LLMs are dangerous, here's how to defend against them"* steals M1's confidence and overshoots M2's mood. The unease is sober, not alarmed

### Learning goal fit

Enables these Bloom-tagged learning goals (verbatim from module file):
- **Construct** a verification table that pulls every claim out of an LLM output, one row per claim
- **Verify** each claim backward against ground truth held in a real admin panel
- **Distinguish** *checked-true / checked-wrong / I can't tell on this* and treat the third as a custodial answer, not a failure
- **Translate** an *"I can't tell"* row into a CLAUDE.md verification rule that fires before trusting the next similar output

### Module-to-module arc

Picks up from **M1 (system built, CLAUDE.md written, instinct calibrated on a task where ground truth was in your head)**. Hands off to **M3 via the 15-minute break** in which the IT Director runs the practice on a separate real task and returns with a verdict that opens M3's rollout-strategy work.

### Mood lands

Per-phase + close, score 1 to 10. Threshold: 8+/10.

| Beat | Expected mood signal |
|---|---|
| Phase 1 close (5 min) | Performative-prompt-anxiety relief. The IT Director landed the prompt cleanly because they rehearsed. Room is engaged, not exposed. If reads as awkward improv — pre-cohort coordination failed |
| Phase 2 close (9 min) | Mild curiosity. *"What's it going to say? Will I be able to tell?"* If reads as task-anxiety — pivot the framing |
| Phase 3 close (17 min) | Confidence in the move. *"The table is mine; the agent extracts, I edit."* If reads as Claude-overrides-me — Phase 3 prompt isn't right |
| Phase 4 close (24 min) | Sober alert. Some rows clear, some don't, *"I can't tell"* lands as a real bucket. If everyone clears every row — task too easy, dry-run failed |
| Phase 5 close / exercise close (27 min) | Custodial competence. *"I added a verification rule in my CLAUDE.md that names what I'd check before trusting the next similar output."* If reads as relief or as panic, mood is wrong |

### The teaching moment lands

Designed to reliably produce: **the *"I can't tell"* row appearing in every participant's table, recognised as a custodial answer rather than a failure to clear**. The teaching moment depends on the IT Director's chosen task generating at least one un-verifiable-on-the-spot claim. Maintainer block prescribes the dry-run criterion.

### Failure modes named

- **IT Director's prompt freezes the room.** Pre-cohort rehearsal mitigates; trainer ensures the IT Director isn't inventing the prompt cold
- **Task too easy — every row verifiable from the panels in the room.** Dry-run criterion catches; trainer pushes the IT Director to a plausibly-un-clearable task before the cohort
- **Phase 3 verification table feels like busywork.** Claude-assisted extraction (the prompt asks Claude to build the table) keeps participants in agentic mode, not stenographer mode
- **Phase 4 *"I can't tell"* recast as failure.** Trainer's silent-presence stance + Phase 5 reframe (rule-write on either wrong rows OR I-can't-tell rows) names the third bucket as legitimate
- **Phase 5 stall on participants with no checked-wrong and no I-can't-tell rows.** Trainer pivot: *"name one row you can't fully trust, even if you couldn't say why exactly"*

### Time-boxed

27 minutes total. 5 + 4 + 8 + 7 + 3 = 27. Within 45-minute module budget (3 Connections + 5 concept + 27 exercise + 7 lecture + 3 Debrief). Plus the 15-min break, which is part of the training but not part of the exercise.

### Facilitator briefing complete

Maintainer block in exercise file covers Phase 1 IT-Director rehearsal, dry-run criterion (plausibly-un-clearable task), Phase 4 silent-presence stance, Phase 5 stall pattern + redirect, the 15-minute break briefing for the IT Director. Quality line tagged 2026-04-27.

### Riffs on a recognized framework

**Backward verification.** Not named as a heavyweight framework; the move (extract claims, find sources, mark each one) is the recognisable shape of how auditors and journalists work. Lecture-side framework anchor (data layers, GDPR rights, what-the-team-tells-users-on-Monday) is named-but-light.

### Scaffold / worked example provided

- **Phase 3 prompt structures the verification table** — three columns, one row per claim, agent extracts
- **Phase 4 names the three buckets** in body — checked-true / checked-wrong / *"I can't tell"* — with descriptions
- **Phase 5 names the rule format** — *"Before claiming X, do Y"* — concrete shape, not a vibe-instruction

### Prompt design

Three fenced prompts in the exercise. Audit:
- All three carry one-sentence action lead-ins (rule 2)
- Phase 2 uses open-hook colon-at-end pattern correctly (rule 1, no `[BRACKETS]`)
- Phase 5 uses open-hook same shape
- Phase 3 chains by back-reference to *"verification.md"* with deterministic path (rule 5)
- No skill paths, no markdown shout, no runtime forks (Cowork-only training)
- Phase 5 explicitly append-mode (*"Add ONE rule to CLAUDE.md"*) — append is correct here, not integrate (rule 12)

### Plug points real

- **IT Director's prompt** — composed live, real O365 admin task, dry-run pre-cohort
- **Admin panel** — participant's actual workplace panel for the chosen task
- **Verification rule** — participant's own translation of their own row, not seeded
- **15-minute break verdict** — IT Director's own real task, not staged

No pre-built artifacts.

### Voice

Bootstrap voice trio (Godin × Sutherland × Siilasmaa) carries. Sober alert mood honoured: *"That third bucket is where custodianship lives"* (Sutherland counterintuitive reframe — *"I can't tell"* is the answer, not the problem). *"None of you already knows the answer"* (Godin peer warmth — naming the audience's actual position). Bridge points forward without resolution (Siilasmaa optimism applied to a still-open question).

Body writes TO the participant ("you"); facilitator instructions live below `<!-- maintainer -->`. No author-"we." No creator's name. No em-dashes in body (rule 14 verified).

### Business-audience language

- *Verification table* earned implicitly through use; structure named in Phase 3
- *Admin panel* is participant's daily vocabulary; no earning needed
- *CLAUDE.md* earned in M1
- *Custodial / custodianship* repeated from M2 module file; the audience's emerging identity

No flinch-words. SVP read passes.

### Length

Post-REVISE fix word counts (measured `wc -w`, excluding fenced prompt blocks and maintainer):
- Exercise: **609 words**
- Module file: **600 words**
- Lecture: **601 words**

All within 400-700 prose target. Word counts measured at the artifact post each edit pass, per the self-report-inflation discipline (`compounded/2026-04-27-pedagogy-self-report-inflation.md`).

### Specificity

Named mechanics: Cowork session, `verification.md`, `verification-table.md`, the three named admin panels (SharePoint admin, Teams admin, Entra ID), the three Verdict values, the *"Before X, do Y"* rule format. Realistic dimensions: real IT-team admin work, real licensing-tier-dependent contract specifics in the lecture.

### Research-backed claims

Lecture body makes two non-vision claims worth flagging:
1. *"On a Team or Enterprise plan, by default conversations are not used to train future Claude models."* — verifiable claim about Anthropic licensing. NEEDS verification by `claude-code-guide` agent as part of audit, OR by direct reference to current Anthropic policy at audit time. Not zombie-stat-shaped, but factually load-bearing
2. *"Encrypted in transit, encrypted at rest."* — claim about Anthropic infrastructure. Same audit requirement

Both flagged for capability-check at audit time. Vision-layer (the *"data question"* framing, the three sentences for Monday) is Antti's, no KB backing needed.

---

## Auto-fail red flags

- Framed as "test"? No
- Pre-built criterion? No (the verification rule is participant's own)
- No time estimate? Has 27 min total + per-phase
- Toy data? No (real IT Director task, real admin panel, participant's own rows)
- Could plausibly run without the teaching moment? Risk if dry-run failed — explicit mitigation in maintainer

**Compendium auto-fails (`check_writing.md`, `check_student_facing.md`, `check_prompts.md`, `check_pedagogy.md`):**
- Banned-word grep: clean (verified post-write)
- Em-dash in body grep: clean (verified post-write)
- Banned-phrase grep (room-share + contemplative-pause hard list per `check_student_facing.md` rule 1): clean (verified by automatic hook on Write)
- No author-"we" or creator's name in body
- No placeholders inside fenced blocks (Phases 2 and 5 use open-hook)
- All three prompts carry action lead-ins
- Substrate is plain prompt files, not skills (per `check_pedagogy.md` rule 35 audience-tier)
- Quality line tagged in module + exercise + lecture files

---

## Verdict (filled at audit time, pre-sim)

| Judge | Pass / Fail | Evidence |
|---|---|---|
| Primary — leap test | PASS | Three observable outcomes map to saved artifacts: `verification.md` (Phase 2), `verification-table.md` (Phase 3+4), CLAUDE.md verification rule (Phase 5) |
| Framing fidelity | PASS | Big idea leads. Compliance-checklist register avoided; panic register avoided |
| Learning goal fit | PASS | Each LO maps to a phase. Construct=Phase 3, Verify=Phase 4, Distinguish=Phase 4 (three buckets), Translate=Phase 5 |
| Module-to-module arc | PASS | M1 instinct cited explicitly in Connections + opening preamble; M3 set up via the break-time verdict |
| Mood lands | TBD by sim | Per-phase signals enumerated above |
| Teaching moment lands | TBD by sim | Depends on the *"I can't tell"* row appearing — explicit mitigation in maintainer |
| Riffs on a recognized framework | PASS | Backward-verification (auditor / journalist shape) + lecture-side data-question framework |
| Failure modes named | PASS | Five named with diagnostic + fix |
| Time-boxed | PASS | 27 min within 45-min module budget |
| Facilitator briefing complete | PASS | Maintainer covers rehearsal, dry-run, silent-presence, stall pivots, break briefing |
| Scaffold / worked example provided | PASS | Three-column table structure, three Verdict values, *"Before X, do Y"* rule format |
| Prompt design | PASS | Three prompts, lead-ins present, open-hook on Phases 2 and 5, no shout, no runtime forks |
| Plug points real | PASS | All four plug points participant-owned or real-buyer-owned |
| Business-audience language | PASS (post-REVISE fix) | Initial draft tripped `check_writing.md` rule 2 — `practice` (noun) appeared 12× across the three files. Bootstrap absolute-ban inherits to Claude Basics (no documented carve-out). Judge flagged REVISE; all 12 instances replaced (*the work*, *the same verification*, *the table*, drop-the-noun). Custodial-language carries; no flinch terms remaining |
| Voice | PASS | Bootstrap trio applied; sober alert mood verified |
| Length | PASS | 585 words body prose (measured) |
| Specificity | PASS | Named admin panels, named Verdict values, named rule format |

**Verdict:** APPROVE WITH TODOs (post-REVISE-cycle, 2026-04-27).

**Sim findings (IT-admin-medium-light-chat persona):**
- Mood scores: 7/9/8/9/8/8/7 across phases + closes. Phase 1 dipped on rehearsal-not-acknowledged smell. Lecture close dipped on training-data hedge.
- Three smells: *"hold that feeling"* yoga register, *Monday* repetition (4× across files), training-data answer hedged not committed
- Three lands: three-bucket naming, *"the fence is real and the fence is configurable,"* *"don't fix those rows yet"* recast
- *"I can't tell"* recasting: 75% custodial, 25% failure-to-clear (Phase 5 OR-clause leaked; fixed)
- Walk-out test: yes on verification + fence sentence; partial on training-data (fixed)

**Judge findings:**
- REVISE verdict on `practice` (noun) hard-ban — 12 instances across three files. Bootstrap absolute-ban inherits; no Claude Basics carve-out documented
- Em-dash inside Phase 3 fenced prompt
- Eval-instance "no flinch-words" claim contradicted by the practice violation
- Anthropic training-data claim verified at `privacy.claude.com/en/articles/7996868`. Encryption claim industry-standard SOC2

**Fixes applied 2026-04-27 (post-REVISE + post-mechanic-fix + post-Phase-4-sim):**
1. *practice* (noun) replaced across all 12 instances — *the work*, *the same verification*, *the table*, or noun dropped
2. Em-dash inside Phase 3 prompt split into two sentences
3. Phase 1 student-prose acknowledges pre-cohort prompt rehearsal
4. Phase 5 narrowed to checked-wrong rows only — I-can't-tell carve-out unmistakable
5. Lecture commits to Team/Enterprise no-train-by-default with verified citation; verify-your-contract hedge moved to one closing line
6. *"hold that feeling"* yoga register cut from Connections
7. *Monday* repetition trimmed from 4× to 2× (kept in module Connections + lecture section header)
8. **Phase 3 + 4 mechanic shift to in-chat (compendium rule 12 alignment).** Phase 3 now has Claude propose the table in chat, participant pushes back on column 2, Claude saves after approval. Phase 4 now has Claude walk the table row by row in chat; participant checks panel, reports verdict; Claude updates Verdict column. Zero student file-edits.
9. **Phase 4 follow-on sim TODOs applied:**
   - Phase 3 table capped at 6 rows (prevents Phase 4 budget bust on 8+ row tables)
   - *"read aloud"* → *"print"* in Phase 4 prompt (Cowork writes, doesn't speak — voice-mode register out)
   - One-line framer added before Phase 4 prompt: *"Saying I can't tell to Claude carries more weight than ticking a box. That's the point. Say it anyway."* (protects against social-pressure inflation toward checked-true)
10. M2 module Debrief shifted to chat-mediated reflection (Claude lists I-can't-tell rows; participant reads list in chat, doesn't open the file)

**Remaining contributory TODOs (acceptable for ship):**
- The lecture's encryption claim is industry-standard SOC2 boilerplate; not directly fetched from Anthropic's Trust Center. Ship-safe per judge but worth a future verify.

**One-sentence overall read:** A pedagogically-sharp five-phase verification that recovers from one hard-ban violation (the judge-caught `practice`-noun blanket) and ships clean across all judges plus persona-sim verdicts post-fix.

# Eval Instance — Claude Basics M2: Find the crux

**Target file:** `curriculum/trainings/claude-basics/exercises/find-the-crux.md`
**Module file:** `curriculum/trainings/claude-basics/where-is-this-all-going.md`
**Supporting prompts:**
- `curriculum/trainings/claude-basics/prompts/find-the-crux-divergence.md`
- `curriculum/trainings/claude-basics/prompts/find-the-crux-synthesizer.md`
**Strategy:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*
**Eval template:** `curriculum/evals/exercise.md`
**Audience persona (primary):** rollout custodian with medium-to-light chat experience. Just finished the repo demo. Module 2 now opens directly into live rollout synthesis.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Articulate** the top three difficulties facing their team's Claude rollout, surfaced through a Claude-led divergence interview, in their own voice with at least one push-back-driven specific example
- **Synthesize** (when assigned as group synthesizer) a group's divergent rollout difficulties into a single named crux that quotes evidence from each group member's divergence file
- **Recognise** that the room produced a multi-agent shape (individual agents → group synthesizers → cross-group synthesizer) without it having been taught as architecture

If a chat-level rollout custodian walks out of Module 2 able to (a) name their team's actual rollout crux in one sentence, and (b) explain in their own words *"we built a multi-agent system without being taught one,"* the exercise has worked.

### Framing fidelity

Leads with the module's Big Idea: **"The rollout team is part of the system that ships the rollout. The hard part isn't picking a tool. It's finding the crux."**

Avoids:
- **Graduation-ceremony register.** No applause beats, no certificates, no *"now you know everything"* close. The mood is forward awe with a deliverable in hand
- **Architecture-as-lecture.** The reveal happens AFTER the room lives the structure, not before. Trainer's silent-presence stance through Phase 1 + Phase 2 is the design

### Learning goal fit

Enables these Bloom-tagged learning goals (verbatim from module file):
- **Articulate** the top three difficulties facing your team's Claude rollout, surfaced through a Claude-led interview
- **Synthesize** a group's divergent rollout difficulties into a single named crux using a synthesizer agent
- **Evaluate** which cross-cutting cruxes from a multi-group readout would actually move the rollout if addressed first
- **Recognise** the multi-agent shape your room just produced — individual agents, group synthesizers, cross-group synthesizer — without it having been taught as architecture

### Module-to-module arc

Picks up from **the repo demo**. Hands off to **separate homework and the rollout itself**. Any post-training check-back cadence is cohort-specific and should not be promised by the core workbook.

### Mood lands

Per-phase + close, score 1 to 10. Threshold: 8+/10.

| Beat | Expected mood signal |
|---|---|
| Connections (4 min) | The repo demo feeds the room real evidence that systems are made of files, rules, prompts, checks, and outputs. Mood concrete, not theatrical |
| Phase 1 close (~14 min into module) | Slight intensity. The push-back questions in the divergence interview made the participant articulate something they hadn't yet said cleanly. Not catharsis — earned articulation |
| Phase 2 close (~26 min) | Group focus. The synthesizer participant's session names a crux; the group reviews. Mood is collaborative-decisive. If the synthesizer feels alone (other group members disengaged), the design failed — chime-in-over-the-shoulder is named in body |
| Phase 3 close (~36 min) | Watchful respect. Groups compare only after they have their own synthesis. The room sees the strategy emerge from constrained synthesis, not from Claude's first draft |
| Reveal (~38 min) | The magic beat. *"Oh — we just did the thing we're worried about doing."* If the trainer hinted earlier, the magic dies; if reveal-script lands clean, the mood spikes |
| Reflection (~40 min) | Forward awe. *"What did the synthesizer get right that no one person had said?"* Two or three responses; trainer holds the question open |
| Bridge / send-off (~45 min) | Forward hunger. The team has the strategy in hand and knows their own next move. Not *"we're done"* — *"the rollout is the work."* |

### The teaching moment lands

Designed to reliably produce: **the multi-agent reveal at Phase 3 close** — the participant recognises the shape they just produced. This is the one magic beat the whole 3-module training carries.

Fragility points:
- Organisers over-owning the synthesis instead of letting groups do the rollout judgment
- Trainer hinting at multi-agent architecture earlier than reveal (mitigated by silent-presence stance documented in maintainer)
- Group synthesizer participant feeling alone (mitigated by *"other group members chime in over the shoulder"* in body)

### Failure modes named

- **Organisers over-own the readout.** Pre-cohort rehearsal should keep organisers in the mechanical/custodial role: folders, filenames, timing, and optional readout. Participants do the rollout judgment
- **Shared folder access topology not set up.** Pre-cohort, organisers prove that one likely group driver can save to `shared/` and organisers can read it
- **Reveal lands too early.** Trainer's silent-presence stance through Phases 1 + 2; reveal scripted only at Phase 3 close
- **Group too small.** Trainer scales group count to participant count: 8 or fewer = 2-3 groups; 9-12 = 3 groups; 13-16 = 4 groups
- **Synthesizer participant works alone in Phase 2.** Body explicitly says *"other group members chime in over the shoulder"*

### Time-boxed

32 minutes total. 10 + 12 + 10 = 32. Within 45-minute module budget (4 Connections + 3 concept + 32 exercise + 4 reveal/reflection + 2 Debrief). The reveal and reflection together fit the 4-min budget if trainer narrates lean.

### Facilitator briefing complete

Maintainer block in exercise file covers: reveal script verbatim, reflection question, Phase 1 watch-fors, Phase 2 synthesizer designation logic, Phase 3 IT-Director rehearsal, silent-presence stance, group-count scaling. Quality line tagged 2026-04-27.

### Riffs on a recognized framework

**Crux** — Richard Rumelt's. Named once in module Concept ("the crux is what Richard Rumelt calls it") with a one-sentence plain-English distillation. No book promo, no framework lecture. Per `check_writing.md` rule 6 (credit the originator) + rule 11 (cap at one student-side mention per module): one mention is correct.

### Scaffold / worked example provided

- **Phase 1 prompt** structures the divergence interview (one question at a time, push-back required)
- **Phase 2 prompt** structures the group synthesis (read across, name the crux, quote evidence)
- **Phase 3 prompt** structures the cross-group synthesis (three named sections in the rollout strategy)
- **Group folder topology** named in body and maintainer
- **File-name patterns** named explicitly: `divergence-<first-name>.md`, `group-crux-<group-number>.md`, `rollout-strategy.md`

### Prompt design

Three prompts in the exercise + two in supporting prompt files. Audit:
- All carry one-sentence action lead-ins (rule 2)
- Phase 1 uses open-hook colon-at-end pattern for the group folder name (rule 1, no `[BRACKETS]`)
- Phase 2 chains by back-reference to *"every file in this group folder that starts with divergence-"* with deterministic file pattern (rule 5)
- Phase 3 chains by deterministic paths (`group-1/group-crux-1.md` etc.)
- No skill paths inside fences (rule 4 — no skills invoked, audience-tier rule 35 holds)
- No markdown shout (rule 9)
- No runtime forks (Cowork-only)
- Phase 2 explicitly names integration mode: *"show in chat first, push back, then save"* (rule 12 in-chat alignment)
- Phase 1 prompt explicitly forbids batch question-dump: *"ask one at a time, don't show the next until I've answered"* (rule 15)
- Phase 1 prompt names push-back as required (rule 14 — keep the edge)

### Plug points real

- Repo demo — the trainer's real working system, not slides
- Rollout difficulties — each participant's own org and team
- Group composition — trainer's call by participant count
- Cross-group synthesis — organisers' optional readout over the group's actual challenges

No pre-built artifacts. No toy data.

### Voice

Bootstrap voice trio (Godin × Sutherland × Siilasmaa). Forward-awe mood = Siilasmaa-leading at Phase 3 close + reveal + Bridge. Sutherland counterintuitive in the Big Idea (the team IS the multi-agent system — the work routes through the people, not the architecture around them). Godin peer warmth in *"You worked alone in M1 and M2. M3 is collaborative."*

Body writes TO the participant ("you"); facilitator instructions live below `<!-- maintainer -->`. No author-"we." No creator's name. No em-dashes in body (verified post-write). No `practice` (noun) — Bootstrap absolute-ban inheritance verified.

In-chat-not-mechanic principle (rule 12) honored: every student move stays in conversation with Claude. The group driver's session reads files via prompt; the organisers' optional readout reads files via prompt. No *"open the file"* / *"edit the column"* primitives in body.

### Business-audience language

- *Divergence interview* earned in Phase 1 body context
- *Synthesizer* earned by use; pattern-recognition through the exercise
- *Crux* earned in module Concept (Rumelt named, plain-English distilled)
- *Multi-agent* not earned in body before reveal — the trainer's reveal script lands the term after the room has lived it

No SVP-flinch terms.

### Length

Body prose word counts (measured `wc -w`, excluding fenced prompt blocks and maintainer):

- Module file: **645 words**
- Exercise: **504 words**
- `find-the-crux-divergence.md` prompt file: **146 words**
- `find-the-crux-synthesizer.md` prompt file: **214 words**

All within or under 400-700 prose target.

### Specificity

Named mechanics: SharePoint group folders, Cowork session, file-name patterns (`divergence-<name>.md`, `group-crux-<N>.md`, `rollout-strategy.md`), three-section rollout strategy structure, push-back-required steps, silent-presence trainer stance.

### Research-backed claims

One detail-layer claim: Richard Rumelt and the crux pattern. Vision-layer (the multi-agent reveal as forward-awe moment) is Antti's framing, no KB backing needed. Rumelt is widely-cited in strategy literature; his book *Good Strategy / Bad Strategy* is the canonical source. No zombie-stat risk.

---

## Auto-fail red flags

- Framed as "test"? No
- Pre-built criterion? No
- No time estimate? Has 32 min total + per-phase
- Toy data? No (real org, real team, real difficulties)
- Could plausibly run without the teaching moment? Risk if reveal lands too early — explicit mitigation in maintainer

**Compendium auto-fails (`check_writing.md`, `check_student_facing.md`, `check_prompts.md`, `check_pedagogy.md`):**
- Banned-word grep clean (`practice` zero hits across all three files)
- Em-dash body grep clean (verified post-write; module file had two, both fixed)
- Banned-phrase grep hook fired clean on Write (room-share + contemplative-pause)
- All student moves stay in conversation with the agent (rule 12)
- No `[BRACKETS]` inside fences; open-hook on Phase 1
- All five prompts (3 in exercise + 2 in prompt files) carry action lead-ins
- Substrate is plain `.md` files per `check_pedagogy.md` rule 35 (audience-tier)

---

## Verdict (filled at audit time, pre-sim)

| Judge | Pass / Fail | Evidence |
|---|---|---|
| Primary — leap test | PASS | Three observable outcomes map to artifacts: divergence-<name>.md (P1), group-crux-<N>.md (P2 if synthesizer), rollout-strategy.md (witnessed live in P3). The "recognise the multi-agent shape" is verifiable via reflection-question response |
| Framing fidelity | PASS | Big Idea opens module file. Forward-awe mood, no graduation register |
| Learning goal fit | PASS | Each LO maps to a phase or beat. Articulate=P1, Synthesize=P2, Evaluate=P3 reading, Recognise=Reveal |
| Module-to-module arc | PASS | Connections carries M2 break verdict forward; Bridge sends off without phantom M4 |
| Mood lands | TBD by sim | Per-phase signals enumerated; reveal magic-beat is the highest-fragility check |
| Teaching moment lands | TBD by sim | Depends on trainer's silent-presence stance and groups completing synthesis before cross-pollination |
| Riffs on a recognized framework | PASS | Rumelt's crux, named once, plain-English distilled, properly attributed |
| Failure modes named | PASS | Five named with diagnostic + fix |
| Time-boxed | PASS | 32 min within 45-min budget |
| Facilitator briefing complete | PASS | Maintainer carries reveal script, rehearsal step, silent-presence stance, group scaling |
| Scaffold / worked example provided | PASS | Three prompts, file-name patterns, group topology, push-back step structures |
| Prompt design | PASS | All five prompts compendium-clean. Phase 1 open-hook, deterministic chain paths, push-back named, batch-dump prevented |
| Plug points real | PASS | Repo demo, rollout difficulties, group composition, organisers' readout — all real |
| Business-audience language | PASS | Crux earned, multi-agent reserved for reveal, no flinch words |
| Voice | PASS | Bootstrap trio applied; in-chat-not-mechanic verified; no creator's name, no author-we |
| Length | PASS | All four files within 400-700 prose target |
| Specificity | PASS | Named mechanics, file-name patterns, group topology, trainer scripts |
| Research-backed claims | PASS | Rumelt named, plain-English distilled, no statistical claims |

**Verdict:** APPROVE WITH TODOs (post-sim cycle, 2026-04-27; judge in-flight).

**Sim findings (IT-admin-medium-light-chat persona):**
- Mood scores: 8 / 6 / 7 / 8 / 8 / 9 across phases + reveal + reflection + bridge
- Phase 2 dipped to 6 — synthesizer-alone risk was real; *"chime-in-over-the-shoulder"* was prose assertion not engineered forcing function
- Three lands: *"M2 ran verification on a single prompt; M3 runs it on the rollout itself"*; *"the architecture you're already inside of; the work just routes through it"*; *"There is no M4. The rollout is the work."*
- Three smells: Phase 2 non-driver disengagement risk; rehearsal-or-disaster binary; synthesizer prompt didn't say how Cowork session points at the group folder
- Walk-out test: yes on all three (named crux + top priority + multi-agent shape)
- Verdict: APPROVE WITH TODOs

**Fixes applied 2026-04-27 (post-sim + post-judge):**
1. **Phase 2 forcing function for non-drivers** (sim TODO) — replaced *"chime-in-over-the-shoulder"* prose with structural beat: each non-driver names ONE thing in the candidate crux that's wrong or missing; synthesizer types those points back as a single push-back; Claude rewrites then saves. Engineered, not asserted
2. **Synthesizer setup line** (sim TODO) — added explicit one-line note about Cowork's connected-folder model pointed at the group folder. Chat-level audience can't be expected to infer the connection
3. **Phase 3 fallback in maintainer** (sim TODO) — two ranked fallbacks for IT-Director-rehearsal-didn't-land case
4. **Reveal-leak in module file's student-facing surface** (judge TODO — the bigger catch). Module's Big Idea + LO #4 + Key Concepts (Emergent) all named *"multi-agent"* before the participant lives the structure. Trainer silent-presence stance can't paper over a projected recap site that pre-spoils the reveal. Reframed all three to outcome-and-structure language:
   - Big Idea: *"In 45 minutes the room produces a real rollout strategy together."*
   - LO #4: *"Recognise the structure the room produced together (divergent voices, group convergence, cross-group synthesis)..."*
   - Key Concepts: *"The structure that produced the answer is the structure the room was already inside of."*
   - The trainer's reveal script in the exercise maintainer still names *"You just built a multi-agent system"* — the term lands in the trainer's mouth, after Phase 3 saves, where the magic beat earns it
5. **Angle-bracket placeholders inside fenced prompts** (judge TODO) — `<my-first-name>` and `<group-number>` removed. Prompts now say *"named after me (use my first name, lowercase, no spaces)"* and *"named after our group number"* — Claude resolves from context, no template-shape inside fence

**Judge verified:** practice-noun zero hits, em-dashes body clean, file-mechanic violations zero, banned-phrase grep clean, audience-tier substrate (plain `.md`, not skills) verified. Word counts measured: module 653, exercise 536, prompts 146 + 214.

**One-sentence overall read:** A three-phase exercise that engineers the multi-agent shape into the room's literal architecture, with the reveal landing where the trainer puts it (Phase 3 close, magic beat earned by lived discovery, not by pre-spoiled module page) — sim + judge converged APPROVE WITH TODOs, all five TODOs applied.

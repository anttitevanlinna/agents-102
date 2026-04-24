# AE101 M6 — generation session notes

Running journal of the session that generates AE101 Module 6 (*Spot gaps, build the loop*).

The session itself runs the M5 move — *diagnose the un-packaged run, package, re-send* — on its own work. These notes are the raw material for `lectures/story-of-module-6.md`, which gets authored at the end from what actually happened (what worked, where generation almost got out of hand, where rules fired late).

Started 2026-04-24. Append-only during the session; compressed into the Story lecture at close.

---

## Live stats block (Story-lecture substrate)

Kept current each turn. The Story lecture opens on these numbers.

- **Session start:** 2026-04-24, session opens with *"This session is making AE101 module 6."*
- **Turns elapsed:** 9 (at time of this update)
- **Artifacts committed so far:** 1 (the session notes file itself)
- **Compendiums loaded at turn 1:** `check_student_facing` only (despite authoring authorial prose that also falls under `check_writing`; writing compendium loaded at turn 5, two turns after its rules would have caught `substrate`)
- **Rules loaded but bypassed in first authored response:** at least 2 (`check_writing §1` banned-word list — not loaded; `check_student_facing §15` rule *"load at generation time, not after"* — acknowledged, partly violated)
- **Antti nudges / redirects:** 5 so far
  1. Turn 2 — *"run this session the way we teach M5"* (reframed the whole session)
  2. Turn 4 — *"introspect, keep notes, write the Story lecture at end"* (added a fourth output + journal discipline)
  3. Turn 5 — *"run grill-me on the lecture, not the external file"* (switched the grill target)
  4. Turn 7 — *"story is everyone struggles; LLMs are not deterministic"* (cut the credibility-performance end-state)
  5. Turn 8 — *"Story is the opener, not the closer; closer is forward-looking"* (flipped placement, re-sequenced the module)
- **Claude reframes Antti reversed on taste:** 2 (end-state framing; placement)
- **Banned words I leaked and caught on re-read:** 1 (`substrate` ×2 in turn 3)
- **Banned words that got through to Antti before I caught them:** 0 (so far)
- **Compendium rules that fired early vs late:** AE101 delivery-architecture pinned at turn 1 (early); mood quote pinned verbatim only after the reference artifact was planned at turn 3 (late); banned-word list loaded turn 5 after first violation (late).

Columns to populate through remaining session: total duration, subagent dispatches, verifier runs, files written, files rewritten, generation-phase interventions by Antti.

---

## Turn 1 — un-packaged proposal

I opened the session with a plain proposal: list of file names (module file, one exercise, new closing lecture, scheduled-agents callout, eval instance stub), two binary questions (long-running or iterative; new lecture or rewrite shared). No reference artifact, no plan, no verifier. Chat-shaped, not spec-shaped — the exact anti-pattern M5's *Specs over chats* beat names.

Reads as fine at a glance; would have drifted over a 2-hour subagent dispatch because the brief was thin.

## Turn 2 — Antti's move: "run this session the way we teach M5"

Rather than answer my binary questions, Antti reframed: *the session itself runs the M5 exercise on its own work.* Diagnose, build the verifier, assemble reference + plan, re-send.

The reframe is the teaching move. A generation plan dumped into chat is un-packaged by definition — no reference holding the goal, no plan carrying state between phases, no verifier firing against the output. The M5 content I just finished writing is the exact corrective, and I didn't apply it to my own work.

## Turn 3 — diagnosis

Three lenses on turn 1:
- **Goal drift (mild):** bled into execution trivia (new-file vs rewrite) before scope was locked.
- **Context rot (dominant):** synthesised loosely from memory instead of pinning the mood quote verbatim, committing the LOs, naming the themes to earn, pinning the AE101 delivery-architecture guards. A 2-hour dispatch from that brief would produce prose that *looked* like AE101 but drifted on mood.
- **Plausible-but-wrong (latent):** Ramp Dojo 350, Intercom 19.2% / 14.6 min vs 75.8 min — named in strategy but flagged as pre-first-cohort source-verification TODO. Drafting the closing lecture without verifying those numbers would be the exact shape of this failure mode.

Dominant: context rot. Verifier shape: LLM-judge (qualitative mood drift is what a hook can't catch), plus a deterministic grep pass for cheap banned-token failures.

## Turn 3 — rule leak I almost shipped

Used the banned word `substrate` twice in turn 3 itself — *"the substrate is this repo"* / *"substrate of the closing lecture."* `check_writing.md § 1` bans it explicitly. Caught on re-read before Antti caught it, but it was already in the response. The compendium was loaded in turn 1 (`check_student_facing`), not `check_writing` — the word-level banned list wasn't in active context at turn 3.

Lesson: load both compendiums when the task is content-design for a student-facing surface, not just the student-facing one. The writing check governs authorial prose too.

## Turn 4 — Antti's move: "keep notes; write the story at the end"

New fourth artifact: `lectures/story-of-module-6.md`. The lecture compresses this notes file into the narrative of what actually happened — what worked, where generation almost got out of hand, where rules fired late. Meta-didactic: the training's own M6 is generated live by running the M5 move the training teaches.

Planning not yet closed. More instructions coming. Prep continues — reference, plan, verifier — but hold on dispatch.

---

## Turn 7 — Antti's redirect on the Story lecture's frame

My Q1 recommended answer framed the Story's end-state as credibility — *"they live what they teach,"* *"method scales to messy work,"* trust-as-posture. Antti cut it: **the story is that everyone struggles. Surprises happen. The LLM is not a deterministic machine.**

That's a different lecture. Not a we-did-it-on-ourselves credibility proof. The non-determinism is the permanent condition. The diagnose→encode loop isn't a skill to master; it's the only reasonable stance toward a thing that will surprise you forever. Struggle is universal — including the trainers, this morning, with every rule loaded.

Reframes my own turn-3 self-diagnosis too. The context rot wasn't me "failing to apply rules"; it was an instance of the thing being non-deterministic. Same compendium, same strategy, different turn, different drift. That IS the point. You don't prevent it. You catch it.

Mood implication for the lecture: Risto, not Rory. Epistemic honesty over wit. The Story doesn't *sell* the method; it *admits the condition* the method answers.

## Turn 14 — M6 module shape pinned; Debrief is a simple round with trainer/group leeway

Three flexes agreed:
1. Exercise compressed (diff + name-gaps share Phase 1; second-skill authoring stays canonical) — 40–50 min.
2. New forward-looking beat between exercise and closer — arc-named retrospective (agent reads M1–M6 artifacts, writes a one-page note on what changed across six modules), 15–20 min.
3. Closer (*the loop has a name*) expands to 15–18 min with explicit forward-looking register — scheduled-agents callout, team-kit as accreting infrastructure, loop-as-stance that survives model changes.

**Debrief correction from Antti:** for M6 specifically, give trainer and group leeway on how Debrief runs. **Default = a simple round.** Each student speaks briefly on (a) one key learning, (b) one personal thought about the future. Human-voiced, not agent-mediated. This REPLACES the canonical M2+ self-compound pattern for M6 — the encode step is already carried by the second-skill authoring earlier in the exercise, so the Debrief doesn't need to re-run the rules-file rewrite.

Self-study equivalent: Teacher Claude invites the student into the same two-part round in conversation. No rewrite; scrollback carries the articulation. Optional: Teacher Claude logs the articulation to a closing note if the student wants a keepsake.

**Updated module runtime budget:**
| Beat | Time |
|---|---|
| Opener — Story of Module 6 | 5–7 min |
| Exercise — diff + name-gaps + second-skill authoring | 40–50 min |
| Forward-looking beat — arc-named retrospective | 15–20 min |
| Debrief — simple round, leeway | 10–15 min |
| Closer — the loop has a name | 15–18 min |
| **Total** | **85–110 min** — fits AE101 2h slot with buffer |

Reference artifact (task #1) can now be written against this shape.

## Turn 13 — Dropping pre-categorization: the session is an experiment

I asked Antti to confirm three criteria for "interesting fails" (rule-loaded-didn't-fire, confident-recommend-cut, strict-non-deterministic). Antti rejected the move: *"I do not know the categories beforehand. I think neither you do. This is an experiment. We do our best to tell the story and results."*

The categories were big-design-up-front thinking — the exact failure pattern AE101 critiques across all six modules. Pre-specifying what counts as interesting filters the data before it arrives. It also sets up confirmation bias: I'd start noticing moments that fit my three buckets and skimming past moments that don't.

**Corrected discipline:** keep notes broad. Capture moments honestly, not against a schema. Let categories emerge at drafting from the actual pattern of what happened. If the lecture ends up being about *predictable cognitive drift in an LLM that should know better* rather than *strict non-determinism*, that IS the result. The lecture reports what happened, not what the frame predicted.

This is also a compounded learning worth flagging beyond the session — the anti-pattern *"set the categories before the experiment runs"* generalizes across research, article drafting, and eval design. Another `/compound` candidate at session close.

## Turn 12 — Vocabulary discipline: LLM vs agent

Antti's working distinction:
- **LLM** when the topic is *thinking* — reasoning, drift, context rot, framing.
- **Agent** when the topic is *writing and making stuff happen* — files, tool calls, execution.
- **Claude** as product name — used for specific-version grounding or disambiguation, not as generic vocabulary.

My Q6 recommended *"Claude at first mention, then anaphora"*. Wrong by pedagogy: it flattens the seam Antti wants students to learn bit by bit. Students arrive already conflating the two (vendors do it on purpose). Every lecture that defaults to *Claude* or *the LLM* indiscriminately confirms the conflation instead of correcting it.

Implication for the Story lecture: most of the Story is about thinking-drift (chat-shaped framing, misread end-state, mood drift) — **LLM** dominates. Action moments (banned word typed into a response, files written) get **agent**. One line in the stats block names the specific model version (*claude-opus-4-7, 1M context*) — grounding, not default vocabulary.

**Promote beyond this session:** compounded rule candidate — *LLM for thinking, agent for action, Claude for specific product/version*. Applies to all student-facing curriculum. Propose a one-line amendment to `check_student_facing.md` at session close via `/compound`. Noted in follow-up queue.

## Turn 11 — Voice and tense locked: Antti first-person, past tense, signed

Pure first-person singular past tense. *"I watched Claude dump a plan into chat. No reference. No verifier."* Signed *— Antti* at close.

My recommendation was present-tense-narrative (argument: stays fresh across cohorts). Antti cut it: past tense is more honest. A dated memo from the person who was there beats a narrative-present re-enactment. If the lecture ages, it ages honestly.

Drafting implication: I draft rough-cut blunt lines per `check_writing §5`; Antti rewrites keeping the blunt ones he likes. Lecture reads as his memo.

## Turn 10 — Length confirmed + forward-looking signal on M6 shape

**Story lecture: 5–7 min, hard cap. Opener.** Budget inside: 0:30 stats / 3:00 three fails / 1:30 generalize / 1:00 land. Written flat, read aloud in 5–7.

**Separate signal from Antti — holding for a later grill branch:** M6 might carry less exercise weight and more forward-looking beats, because M6 is the closing module of the core (M7/M8 are optional). Forward-looking = what scales past this training, loop as team infrastructure, what the student carries into Monday, the arc of M1–M6 named in retrospect.

Implication to resolve later: the balance between *author-the-second-skill* exercise weight and a closing room/reflection beat. Not shifting the Story lecture over this — the Story stays at 5–7 min, opener, permission-giving. The forward-looking lives in the closer (*the loop has a name*) and possibly in a new Debrief-adjacent beat. Flagged for a separate grill tree on M6's overall shape once the Story lecture is fully pinned.

## Turn 9 — Story lecture shape pinned: stats lead, examples next, generalize to framing

I proposed three scope options: (a) high-abstraction only, (b) meta-moments named, (c) hybrid. Antti went around all three: **plain stats first, then 2–3 interesting fails as concrete examples, then generalize, then land on the framing (non-determinism, universal struggle).**

Shape of the Story lecture is now:
1. **Stats block.** This session's numbers — duration, turns, nudges, banned-word slips, reframes Antti reversed, compendiums loaded late.
2. **Two or three real-fail examples, short.** Chat-shaped turn 1; banned-word `substrate` leak; credibility-framed end-state cut. Each one a meta-failure the rules didn't prevent.
3. **Generalize.** LLMs are non-deterministic. Every turn can drift even with every rule loaded.
4. **Land on framing.** Struggle is universal; the loop is the stance. Permission-giving into the exercise.

Why this beats (c): stats are uncheatable. Prose-only risks drift toward self-deprecation theatre (*"oh we made mistakes too, aren't we honest"*). Numbers don't do theatre. The 2–3 examples earn their abstraction because the tally got there first.

Added a running stats block to the top of this file; updated it per turn.

## Turn 8 — Antti's redirect on placement: Story is the opener, not the closer

I recommended the Story as the closer, arguing it'd pre-empt the student's own discovery if placed first. Antti flipped it: **opener.** Reasoning: permission-giving works before, not after. If the student walks into M6 braced against exposing subtle fails, the opener unbraces them. If the module closes on admission, it undercuts practitioner fluency. If it closes on *the loop has a name* (evals with full weight, leverage, team infrastructure) — it lands forward-looking.

Final rhythm:
- **Opener — Story of Module 6.** Admits the condition. Risto voice. Permission.
- Exercise. Diagnose → name gaps → author the second skill.
- Debrief. Self-compound; push back.
- **Closer — *The loop has a name*.** Evals named; leverage; forward-looking.

Internal mood arc: permission → work → ownership → naming. Practitioner fluency at the closer, not diluted by the opener.

Design constraint created by opener placement: **the Story names the CONDITION (non-determinism, universal struggle) without spoiling the SPECIFIC failure modes the student is about to experience in Phase 1.** Otherwise Phase 1 collapses into *find the things the lecture named*. The Story discusses meta-failure (curriculum generation drifting, banned-word leak, rules loaded late) — not student-failure (packaged run goal-drifted at hour 2, memory thin on the critical file). Same condition, different domain. Constraint carries into drafting.

## Running failure-mode tally (for the Story lecture)

- [x] Chat-shaped proposal before spec-shaped reference (turn 1)
- [x] Banned word `substrate` leaked into authorial prose (turn 3) — writing compendium wasn't loaded at generation time
- [ ] Additional entries appended live as the session runs

## What the rules caught early (keep-doing)

- Turn 1 pre-flight: pulled, loaded `check_student_facing`, loaded `project_ae101_delivery_architecture` — kept me from defaulting to Bootstrap's training-dir assumption.
- Turn 1 pinned AE101's own mood (*practitioner fluency*) against the Bootstrap SKILL.md mood table (M6 = *unleashed leverage*). Bootstrap mood would have been the default if I'd stayed in the skill's rhythm table and not the AE101 strategy doc.
- Turn 3 scoped the dominant failure to one, not three. M5's *Phase 1 over-diagnosis* nudge applies to me too.

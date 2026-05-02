# Eval Instance — Bootstrap / Eval loop exercise

Filled-in instance of `curriculum/evals/exercise.md` for the "Eval loop runs itself" exercise in Module 6 (Evaluations) of the Bootstrap training.

**Target exercise file:** `curriculum/exercises/eval-loop.md`
**Module file:** `curriculum/trainings/bootstrap/evaluations.md`

**Eval runs:**
- 2026-04-19 (pass 1, PDCA test+check) — LLM-judge verdict: **APPROVE WITH TODOs**; simulation verdict: plausible-but-capability-fragile. Top risks: (1) meta-agent self-edit reliability unverified, (2) walk-away depends on Claude Code not prompting for confirmation during three sequential rounds with subagent dispatch — unverified, (3) handoff file path matches M5 (`judges/groundedness-judge.md`) — correct. See notes below.

---

## The judges

### Primary — the leap test *(Antti steers)*

After completing this exercise, the participant can:
- **Explain specific judge-rule edits** made by the meta-agent across 3 rounds — pointing at `round-N/judge-diff.md` and naming which rule tightened/loosened and why — using `meta-log.md` + `judge-diff.md` as the legibility artifacts. This is the first true walk-away on the trust-distance ramp: the student left the chair for 25-30 min and can now describe what happened in their absence from the on-disk transcript, not from memory.
- **Distinguish eval-as-artifact (Module 5 output: one judge file) from eval-as-infrastructure (Module 6 output: a judge that watched itself miss things and patched itself).** Point at the judge diff between start and end of the exercise.
- **Name one manual quality check from their own work** that belongs on a self-improving loop — specific enough that "Monday morning" is an answerable question (where it runs, what it scores, who sees the output).

If a builder leader walks out able to do these three things, it's good enough.

### Framing fidelity *(universal)*

The exercise leads with the module's Big Idea: **The eval is infrastructure, not an artifact. Two loops compound: generation sharpens under eval pressure; the eval sharpens from watching what slipped past.**

It avoids these anti-framings:
- **Evals as compliance testing** — "does it pass?" Gate mentality. The exercise's mood is unleashed leverage, not audit.
- **Magic-box self-improvement** — "the agent gets smarter somehow." The judge-diff files are the anti-mystification device; every rule change is inspectable with reasoning attached.
- **"Share the whole agent" / scale-to-team framing** — that's M7's territory. M6 stays on personal leverage.

### Learning goal fit *(universal)*

Enables these LOs from `trainings/bootstrap/evaluations.md` (verbatim):
- **Construct** a self-improving eval loop — orchestrator, parallel generation, judge, meta-agent, applied rule edits
- **Evaluate** how a judge changes across rounds by reading the rule diffs and meta-agent reasoning
- **Create** eval infrastructure that keeps learning from its own misses — on disk, re-runnable, sharper each cycle
- **Distinguish** an eval-as-artifact (Module 5) from an eval-as-infrastructure (Module 6)

### Module-to-module arc *(universal)*

Picks up from **Module 5's bake-off winner judge** (`judges/groundedness-judge.md`) — the judge the student already trusts, now handed to infrastructure. Handoff file path matches M5's output verbatim.
Subtly hands off to **Module 7 (From Personal to Team)** — the *"who else on my team would want this?"* Bridge question is the generosity seam without stealing M7's mood.

### Mood lands *(universal — essential)*

Module mood contract: **unleashed leverage** — *"we can automate the loop — and the loop improves itself."*

Scoring required 1–10 at each phase-end + close (8+/10 bar).

Phase-end mood targets:
- **Phase 1 (orchestrator built):** 8/10 — satisfied compounding ("this is a conductor on disk"). Risk of drift to "tool setup" (M2 mood) if the orchestrator review gets pedantic.
- **Phase 2 kickoff + walk-away:** 9/10 — **the load-bearing beat.** Leverage is not built; it is FELT when the student closes the laptop. If they can't walk, the mood collapses to performative-busy.
- **Phase 2b (optional deltas annotation):** 8/10 — agency within leverage (*"I'm steering the meta-agent, not just watching"*).
- **Phase 3 (dashboard return):** 9/10 — **the payoff.** Scoreboard-on-return = unleashed leverage materialised. A student who sits and watches loses this beat entirely.
- **Close (eval-notes line):** 9/10 — "the loop runs on the loop" — named, not just experienced.

Anything below 8 stealing the mood: (a) Claude Code prompting for confirmation mid-run breaks walk-away, drops Phase 2 to 5/10; (b) rubber-stamp dashboard skim drops Phase 3 to 6/10 (Teacher Claude must push); (c) "tool setup" framing in Phase 1 drops to 6/10.

### Teaching moment lands *(exercise-specific — essential)*

The exercise is designed to reliably produce this aha:
- **"The judge I left with is sharper than the judge I started with — not because I edited it, but because it watched itself miss things and patched itself. I can read exactly what it learned."** Mechanism legibility is the aha, not the self-improvement itself.

If the meta-agent doesn't actually apply edits (capability risk), the moment collapses from aha to "did that really happen?" Fragility sits in the capability layer, not the pedagogy.

### Failure modes named *(exercise-specific)*

- **Chair-sitter** → student refuses to walk away → facilitator/Teacher Claude pushes them out with specific alternative (debrief prep, Phase 2b delta, coffee).
- **Meta-agent proposes but doesn't apply** → round N+1 runs on unchanged judge → diagnostic: open `judges/groundedness-judge.md` and diff against start-of-exercise version; if identical, orchestrator prompt's "apply the edit if sound" line wasn't obeyed → fix: restart with explicit apply-and-report confirmation language.
- **Claude Code prompts for confirmation between rounds** → walk-away collapses → diagnostic: student returns to a frozen session mid-round 2 → fix: orchestrator prompt must say "do not stop for confirmation between rounds" (present) AND verify behavior in a dry run before first delivery.
- **Dashboard skim without reading judge-diff** → student declares "worked" without mechanism legibility → Teacher Claude pushes: *"open round-2/judge-diff.md and read one specific rule edit."*
- **Deltas.md skipped** → meta-agent only learns from pattern, not human signal → not a failure, but the Phase 2b demo is thinner; note for next cohort.
- **Run stalls mid-round** → facilitator/Teacher Claude: kill and restart from round 2.

### Time-boxed *(exercise-specific)*

Claimed total: **55–70 min.** Phase 1 ~12 min. Phase 2 kickoff ~3 min. Walk-away window **25–30 min** (folds into facilitator's Debrief prep or student's break — this is the time *by design*). Phase 3 return ~15 min.

**Capability-dependent:** walk-away duration is the load-bearing plug point. If an actual end-to-end run on a representative training directory takes 12 min, the walk-away is fake; if 45 min, the exercise overruns the Bootstrap module slot. Must be timed before first delivery (named in maintainer section).

### Facilitator briefing complete *(exercise-specific — essential)*

Maintainer section covers: watch-fors (chair-sitter, dashboard skim, meta-agent distrust, deltas-skip, run-stall), decision points at 15/40/60 min elapsed, pacing breakdown per phase. Plug points named (topic, convergence threshold, walk-away duration).

**Gap:** no explicit Teacher Claude / self-study notes for the walk-away window — what does Teacher Claude do while the student walks? Nudge them to *stay* away? Pre-prep Debrief questions? This matters because self-study is default delivery mode.

### Riffs on a recognized framework *(exercise-specific — essential for business-skill exercises)*

Named: **LLM-as-judge + self-improvement** (canonical evals pattern extended with meta-loop), **orchestrator + fan-out** (M3 pattern reused), **eval-as-hypothesis** (strategy-as-assumptions / Roger Martin extended), **PDCA at the eval layer** (not named to students; available to facilitators). Integrated, not decorative.

### Scaffold / worked example provided *(exercise-specific — essential)*

The orchestrator is produced by the student via a single copy-paste prompt in Phase 1 (no scaffold file shipped — "trust the prompt over scaffolds" rule). Artifact shape is familiar from M3 (fan-out) and M5 (judge-as-file). Meta-agent is new but the prompt specifies it precisely. No prior exercise has asked the student to dispatch subagents from an orchestrator they wrote — this is the new move; the Phase 1 prompt carries all the scaffolding.

### Prompt design *(exercise-specific — essential)*

Three copy-paste prompts in student-facing body:
- **Phase 1 orchestrator-build prompt** — long but earns it (~35 lines). Paragraph-structured. No mid-prompt `[BRACKETS]`. Ends with "show me the structure before you save" — good.
- **Phase 2 folder-create prompt** — one line, fine.
- **Phase 2 kickoff prompt** — three lines, includes the load-bearing "do not stop for confirmation between rounds" instruction.

**Risk:** the orchestrator prompt assumes Claude Code reliably executes a complex multi-step orchestration over ~25 min with three subagent dispatches per round and one file-edit per round. This is not verified behavior — maintainer section owns the capability check but it's owed *before first delivery*. Until verified, the prompt is aspirational.

### Plug points real *(exercise-specific — essential)*

- **Topic for two generation tracks:** defaults to student's Module 3 system primary output topic. Real plug point — student uses their own sources, memory, retrievals.
- **Convergence threshold:** default 90% claim-level agreement. Regulated-industry variant to 95%+.
- **Walk-away duration:** 25-30 min default; compressible to 15 min / 2 rounds for short slots (with mood cost noted).
- **Deltas.md (Phase 2b):** student's own judgment pressed against the judge.

All defaults work without requiring org-specific setup. Good.

### Voice *(universal)*

Second person throughout. Builder voice. Rory-flavored reframe present: *"You will come back to a dashboard."*, *"the transcript is the proof"*, *"And you weren't there. That's the part that matters."* Risto-honesty in maintainer (capability checks owed). No LLM-tell words in body (spot-checked — no "delve," "honest," "importantly," "crucial"). Questions to reader: *"who else on my team would want this?"* at close — mild Bridge seam.

### Business-audience language *(universal — essential)*

Banned-word scan on student-facing body:
- `orchestrator` — used heavily. **Earned?** Module 3 introduced multi-agent fan-out; the *word* orchestrator may or may not have been taught there. **Ambiguity — flag.** Plain definition given in body (*"one Claude session whose whole job is to direct other work"*) — this earns the word on first use.
- `meta-agent` — plain-English and self-evident from context.
- `subagent` — **appears only in maintainer section** (body-side check: "parallel generation tracks" is the student-facing phrase, which is good). Pass.
- `retrievals` — appears as a path name (`module-3/retrievals/`) — path, not prose. Borderline acceptable; student has worked this folder since M3.
- `convergence`, `claim-level agreement` — earned in M5 and the M6 lecture.

Verdict: **pass with caveat** — `orchestrator` earns itself in-line. `retrievals/` as a path name is acceptable.

### Length *(universal)*

Exercise body (above `<!-- maintainer -->`): ~900 words. **Over target** (400–700). Some phases could tighten — especially Phase 2b's example deltas block and Phase 3's verbose dashboard example. Contributory, not essential.

### Specificity *(universal)*

Strong. Named file paths (`module-6/runs/round-N/judge-diff.md`), named output shapes, realistic example numbers ("round 1 caught 8 issues, round 2 caught 11"), named artifacts from prior modules (`judges/groundedness-judge.md`, `module-3/retrievals/`, `sources/`, `memory/`). The example dashboard output is illustrative, not prescriptive — good.

---

## Auto-fail red flags

- Framed as "test" or "validation check"? **No** — framed as leverage and infrastructure.
- Participant's criterion pre-built? **No** — judge came from M5 bake-off (student-built).
- No time estimate? **Present** (55–70 min).
- LLM-tell words? **No.**
- Toy data? **No** — student's Module 3 system.
- Exercise could run without producing teaching moment? **RISK** — if meta-agent doesn't apply edits, the aha collapses. Capability-dependent, not pedagogy-dependent.
- Unfamiliar artifact from thin air? **No** — scaffolded by the Phase 1 prompt.
- Copy-paste prompt with inline `[BRACKETS]`? **No.**
- More than one H1? **No.**
- YAML frontmatter? **No.**
- Unearned tech jargon? **Borderline** — `orchestrator` is used heavily; earned in-line on first mention. Pass.

---

## Essential vs contributory — verdict

**Essential judges:**
- Primary leap test: **Pass** (if capability layer holds)
- Framing fidelity: **Pass**
- Learning goal fit: **Pass**
- Module-to-module arc: **Pass** (M5 handoff path correct)
- Mood lands: **Pass on paper; capability-fragile** — walk-away is the load-bearing beat and depends on Claude Code not prompting for confirmation
- Teaching moment lands: **Pass-conditional** — depends on meta-agent actually applying edits
- Riffs on framework: **Pass**
- Facilitator briefing: **Mostly pass** — gap: no Teacher Claude notes for self-study walk-away
- Scaffold / worked example: **Pass**
- Prompt design: **Pass** (with capability caveat)
- Plug points real: **Pass**
- Business-audience language: **Pass with caveat** (`orchestrator` earns in-line)
- Auto-fail red flags: **None triggered**

**Contributory:**
- Failure modes: **Full.**
- Time estimate: **Present; unverified.**
- Voice: **Good.**
- Length: **Over** (~900 words vs 400–700 target). TODO.
- Specificity: **Strong.**

**Verdict: APPROVE WITH TODOs.** Essentials pass on paper. Capability checks owed before first delivery. Length trim and Teacher-Claude-walk-away-notes are contributory TODOs.

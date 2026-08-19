# Eval instance — Agentic Engineering 101 · M3 Earn the trust

Target artifacts:
- `curriculum/trainings/agentic-engineering-101/earn-the-trust.md` (module spine)
- `curriculum/lectures/skills-from-the-frontier.md` (lecture)
- `curriculum/exercises/map-the-access-surface.md` (Ex1)
- `curriculum/exercises/threat-model-with-stride.md` (Ex2)
- `curriculum/exercises/author-test-strategy-skill.md` (Ex3)

**Eval runs:**
- **2026-04-23 (three-persona simulation + LLM-judge, parallel dispatch):**
  - **Mood scores (close-of-exercise):** Maija (mid-competent) 9 / 10 / 7 — drop at Ex3 close driven by team-kit substrate ambiguity. Greg (opinionated senior) 6.5 / 7.5 / 7 — senior-premium signature below 8 bar; register smell + scripted-move refusals. Jin (fast operator) ~8 across — on target but under-budget on Ex1+Ex2.
  - **LLM-judge predicted arc:** Connections 8 → Lecture 8 → Ex1 8 → Ex2 9 → Ex3 8–9 → Close 9. Arc-flow fully wired; self-critique pattern correctly puts Claude in critic seat.
  - **Verdict (all four):** APPROVE WITH TODOs. Essentials pass; contributory items + one essential-adjacent self-study fallback gap.

---

## Convergent findings (2+ agents agree)

### Essential (blocks ship)

1. **Ex3 P1 self-study team-kit path is undefined** (Maija flagged; judge flagged `[sponsor-stated team-kit path]` placeholder). The in-room fallback (trainer-spun-up repo) doesn't exist for self-study students. The maintainer watch-for catches it but the student-facing prompt doesn't. **Fix: add explicit self-study fallback to Ex3 P1 student-facing body.** Applied 2026-04-23.

### Contributory (TODOs acceptable)

2. **Ex1 + Ex2 under-budget for fast operators** (Jin: 11 vs 20 min, 14 vs 20 min). Ex1 Phase 4 ("pause, re-read, add context line") is the thinnest. Greg also rates Ex1 P2's "don't scan" as condescending padding. **Judgment call for Antti:** fold Ex1 P4 into P3 (save 3 min), or keep as breathing room for mid-competent?

3. **Question-batching tell in Ex3 P1** (Maija + Greg). Claude defaults to dumping questions even with "one at a time" instruction. **Fix: prompt hardening — *"ask ONLY question 1. Do not preview questions 2-N. Wait for my reply."*** Applied 2026-04-23.

4. **Ex3 P3 sharpen-and-re-invoke loop has no exit criterion** (Maija). Fast operator ships too early; perfectionist loops forever. **Fix: "two rounds max; if still weak, ship with a TODO comment naming what's unresolved."** Applied 2026-04-23.

5. **Module spine Big Idea uses *practice* as noun** (Maija caught: *"my agent practice"*). check_writing banned-word adjacency. **Fix: replace with *"how I work with my agent"* or *"my agent work."*** Applied 2026-04-23.

6. **Lecture three-voices framing reads as sermon architecture** (Greg). "Voice one / Voice two / Voice three" structural move is a framing device pretending to be a teaching device. The content under each voice is fine; the frame is the weakness. **Judgment call for Antti:** drop the numbered voices and tell the claim in one paragraph, or keep the structure?

7. **Register smell — specific condescending lines** (Greg, hard; Maija, soft). Ex1 P2 "read, don't scan" + italicized fake-peer voice *"oh — that's actually exposed"* reads as yoga-instructor to a senior. Ex1 P4 "would it be useful? If not, add context" is padding. Ex3 P1 dogma "skills aren't hand-crafted" asserted rather than earned. **TODO: Pass 3 pass for Greg-aligned register tightening.**

### Non-convergent / minor

- **"Theatre" used 3×** — not banned; Rory-adjacent; survives. Judge noted, all sims accepted.
- **Ex2 "push back once" on ADR** (Jin) — scripted beat; Jin didn't need it. Keep for mid-competent; Nerd skips for seniors.
- **"One question at a time" Socratic pacing** (Greg refuses; Jin bypasses) — keep for mid-competent; Nerd should not enforce for seniors.
- **ADR numbering + "show before saving"** (Maija) — Claude-behavior quirks; maintainer-level.

---

## Essential judges

| Judge | Verdict | Evidence |
|---|---|---|
| Primary leap test — each exercise produces its load-bearing artifact | ✅ | Ex1 → codebase-tuned surface delta; Ex2 → ADR w/ threat + reason + alternatives; Ex3 → authored SKILL.md shipped after self-critique + invocation |
| Framing fidelity (three anti-framings refused) | ✅ | Compliance-feeling, STRIDE-as-checklist, skill-as-hand-crafted-markdown — all explicitly refused across artifacts |
| Learning goal fit | ✅ | All six LOs map to specific exercise phases |
| Module-to-module arc | ✅ | M2 push-back discipline → M3 authoring discipline → M4 memory with quality criteria. Bridge names Block 1/2/3 seeds. |
| Arc flow within module | ✅ | Ex1 `access-surface.md` → Ex2 input; Ex2 ADR + hardened feature → Ex3 invocation target; Ex3 "is it good?" reads ADR |
| Mood lands (earned trust accumulates across 3 exercises) | ⚠️ | Maija 9/10/7 (team-kit fix → 9); Greg 6.5/7.5/7 (senior-premium signature; register fixes → 8); Jin ~8 across. Close predicted 9 post-fixes. |
| Teaching moment lands | ✅ | Ex1 delta = forcing function; Ex2 incident-story = real-call move; Ex3 self-critique + invocation-closes-loop = authoring discipline |
| Prompt design | ✅ | Canonical shape throughout. Ex3 P1 `[sponsor-stated team-kit path]` placeholder rescued by in-body fallback (same pattern M2 sim accepted). No mid-prompt find-and-replace elsewhere. |
| Plug points real | ✅ | Student's feature, sponsor-stated ADR home, sponsor-stated team-kit substrate, curated skill paths |
| Business-audience language | ✅ | AE101 engineers; tech terms native (SKILL.md, frontmatter, ADR, webhook, RPC, STRIDE). No jargon anxiety. |
| Facilitator briefing complete | ✅ | All three exercises + module file have maintainer sections w/ Nerd logic per phase, watch-fors, decision points, TODOs |
| Scaffold / worked example provided | ⚠️ | Ex1 scaffold present (delta reasoning pair); Ex2 scaffold present (ADR template named); Ex3 relies on conversation — worked-example SKILL.md for Pass 3 |
| Riffs on recognized framework | ✅ | STRIDE (Kohnfelder & Garg / Shostack), least-privilege (Saltzer & Schroeder), test-strategy-as-discipline (Beck / test pyramid), compound engineering (Klaassen), skills-as-first-class (Claude Code) |
| Self-critique pattern (Ex3 P2) puts Claude in critic seat | ✅ | Phase 2 prompt correct shape; satisfies check_student_facing #9 |
| Curated-vs-authored separation | ✅ | Curated skills in `content/skills/`; authored skill in team-kit substrate. Clean separation in lecture + all three exercises. |
| Feature-size framing as pedagogy | ✅ | Module Connections: *"too small Claude crunches it... too large still waiting"* — tradeoff, not prescription |
| Debrief self-compounds (no Q1/Q2/Q3) | ✅ | Module file Debrief reviews session → rewrites rules file + skill → reports 3–5 lines |

**Essential fails: 0.** (Mood ⚠️ partial — Greg's 7 is the senior-premium signature; three-persona register sweep in Pass 3 is the fix.)

## Contributory judges

| Judge | Verdict | Notes |
|---|---|---|
| Length | ⚠️ | Ex3 ~880 words (target 400–700). Trim candidates: P1 preamble, fold sponsor-path note to maintainer. Pass 3. |
| Voice | ✅ | Rory-reframes present ("authoring without invocation is theatre", "pub-quiz threat modeling"); Seth-warmth appropriate; Risto-directness at forcing functions. Register-tightening Pass 3 flagged. |
| Specificity | ✅ | Named paths, named practitioners, named conventions, named file-shapes |
| Research-backed claims | ✅ | STRIDE origin (Kohnfelder & Garg, 1999), Shostack (2014), Saltzer & Schroeder (1975), Intercom 267-skill repo (`observations/intercom.md`). Verify Intercom number current before first cohort. |

## Auto-fail red flags

- Q1/Q2/Q3 retro — ❌ absent (correctly)
- F-Secure material imported — ❌ absent
- Vendor Level 0 claim as finding — ❌ absent
- Frontmatter in module file — ❌ absent
- Multiple H1s — ❌ absent
- Banned words in student body — ⚠️ *practice* as noun in module Big Idea (fixed 2026-04-23)

**None triggered post-fix.**

---

## Blockers for live simulation

The three-persona sim ran on the exercise *instructions* — the curated skill files themselves don't exist yet:
- `content/skills/access-control-analysis/SKILL.md` — Pass 3 TODO
- `content/skills/stride/SKILL.md` — Pass 3 TODO

Until those ship, the module is a scaffold around two empty containers. Live-cohort sim requires those files. **Highest-leverage Pass 3 next step.**

---

## Fixes applied 2026-04-23

1. **Ex3 P1** — self-study team-kit fallback named in student-facing text (not just maintainer).
2. **Ex3 P1** — question-batching prompt hardening (*"ask ONLY question 1"*).
3. **Ex3 P3** — sharpen-and-re-invoke loop exit criterion (*"two rounds max; ship with a TODO if still weak"*).
4. **Module spine Big Idea** — replaced *"my agent practice"* with alternate phrasing.

## Flagged for Antti's judgment

1. **Ex1 P4** — fold into P3 (Jin: save 3 min; Greg: remove condescending padding) OR keep as breathing room (Maija: fine)?
2. **Lecture three-voices framing** — drop "Voice one / two / three" structural move (Greg: sermon architecture) OR keep as teaching frame?

---

## Verdict

**APPROVE WITH TODOs.**

Essentials pass (one previously-flagged gap — Ex3 self-study team-kit fallback — fixed in same cycle). Contributory TODOs: Ex3 length trim; Pass 3 register sweep for senior-premium register signature; curated skill files authoring; two flagged judgment calls above. Three-persona sim verdict holds pending the two flagged fixes.

**Next:**
1. Antti adjudicates the two judgment calls.
2. Pass 3 curated skill files (`content/skills/access-control-analysis/` + `content/skills/stride/`) — blocker for live-cohort sim.
3. Post-Pass-3, re-run three-persona sim against live skill files before first cohort.

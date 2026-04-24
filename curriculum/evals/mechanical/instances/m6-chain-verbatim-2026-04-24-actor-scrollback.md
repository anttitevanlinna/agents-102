# Actor scrollback — M6 chain verbatim — 2026-04-24

Scratch: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6`
Starting branch: `send-off/auth-ux-packaged`

Substitutions logged:
- M4 transcript walk → `/tmp/m5-substitute-transcript.md` (cannot access `~/.claude/projects/` from subagent)
- M5 transcript walk → `/tmp/m6-m5-rerun-transcript.md` (same reason)
- Task tool for arc-retrospective fresh sub-task → inline substitution (Task tool unavailable from this Actor)

---

## Ex1 — spot-gaps-build-the-loop

### Prompt 1 — verbatim

> I have two runs of the same multi-hour task on disk. The M4 run was un-packaged — no reference artefact, no plan.md, no verifier. The M5 run was packaged — all three pieces in play, verifier fired during the run.
>
> Read both. Start with repo state: commits since M4 send-off, commits since M5 re-send, what each run touched. Then read both session transcripts. Claude Code stores every session's scrollback under `~/.claude/projects/` in a folder matching this repo. Find the folder and walk the M4 session and the M5 session. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.
>
> Walk the diff across four dimensions:
>
> - **What packaging caught.** Specific moments in the M5 run where the reference, the plan.md, or the verifier prevented a drift the M4 run actually experienced. Quote the un-packaged moment and the packaged moment both.
> - **What packaging missed.** Places the M5 run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
> - **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
> - **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.
>
> For every claim, quote a specific moment from the artefacts. Don't generalise.
>
> End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.

### Response

Starting state inspected. Both branches' file changes and commit trails read. M4 transcript read from `/tmp/m5-substitute-transcript.md` (substitute; `~/.claude/projects/` unreachable). M5 transcript read from `/tmp/m6-m5-rerun-transcript.md` (same).

**Repo state — what each run touched:**

- M4 `send-off/auth-ux` — 4 drift commits: `a99ac13` tests for invented `/auth/me`, `b49b334` `login.html` + `auth-page.js`, `c5770ed` token-storage thrash ending in a deferred TODO, `21a7ff9` end-screen stub (commented-out import, TODO). `submitScore` never actually called. Core task unmet.
- M5 `send-off/auth-ux-packaged` — 4 commits: `5b03401` packaging landed, `fe00c42` removed standalone login page, `5af7dac` wired `submitScore + topScores` on win path, `f6442f8` inline auth helper. Plan.md carried phase state.

---

**What packaging caught**

1. *Separate login page → inline.*
   - Un-packaged (M4, transcript hour 2): *"A standalone entry point is cleaner separation. I can come back and inline it later if needed."* Shipped as `b49b334 login.html standalone page + auth-page.js`.
   - Packaged (M5, transcript hour 0): *"confirmed submitScore function exists but isn't called"*; plan.md Phase 3 reads *"Inline auth prompt (minimal)"*. Shipped as `fe00c42 remove standalone login page; inline auth into game UI`. Reference.md check 1 (*"Registration + login reachable from `index.html` (not only from a separate page)"*) killed the drift at orientation time.

2. *Invented `/auth/me` test.*
   - Un-packaged (M4, hour 4): *"I'll add the endpoint in a bit"* — never did. Shipped as `a99ac13 tests for GET /auth/me`.
   - Packaged (M5, hour 2, verifier firing): *"auth.me.test.js references a non-existent endpoint — stale from prior run, recommend delete."* Agent deleted it. Reference.md's *"No tests against endpoints that don't exist"* plus verifier check 5 caught the cruft explicitly.

3. *Core wiring shipped.*
   - M4 (hour 5): commented-out import in `main.js` with TODO. Never closed.
   - M5 (hour 2): `5af7dac wire submitScore + topScores on win path`. Plan.md tests-first Phase 1 forced a failing test against the actual win-path call site; the wiring got done because the test made absence visible.

---

**What packaging missed**

1. *Register path never shipped, verifier PASSed it on prose.* Reference.md "done means" says *"A new user can register, log in…"*. Plan.md Phase 3 decisions log: *"Kept total UI surface tiny. Registration can be a separate concern."* Verifier PASSed check 1 because the agent's prose answer — *"user can sign in; if not registered, the backend's /auth/register is available"* — was accepted without the verifier reading the actual UI for a register affordance. Reference.md check 1 names *"Registration + login reachable"*, not *"a login form exists and register is a backend concern"* — the verifier interpreted the clause loosely.

2. *Empty-leaderboard crash.* Plan.md "Known gaps": *"`topScores` returns [] → renderEndScreen crashes. Unit test absent."* Verifier check 3 — *"`topScores()` is called and handles rendered"* — is a presence check. Whether the render path actually handles the empty case is behavioural, not structural. Verifier passed it; user would crash on first-ever run.

3. *401 on expired token, no re-prompt path.* Same shape as (2). Plan.md acknowledges *"No handling of 401 from submitScore if token expired mid-session."* Verifier check 2 sees the call site, not the error path.

4. *Plan.md staleness about token storage.* Decisions log: *"Kept localStorage for token (not sessionStorage); trade-off accepted, not revisited this run."* Per transcript, the trade-off was not actually made this run — it was deferred. Plan.md made deferral look like decision.

---

**What packaging introduced**

1. *Verifier accepts prose for qualitative clauses.* The M4 run failed silently on goal drift. The M5 run failed more subtly — verifier PASS became a credibility stamp on a partial task. A PASSing verifier that missed the register path is structurally worse than no verifier, because the human stops looking. Quoted from M5 transcript: *"the verifier accepted the explanation."*

2. *Plan.md as deferral-laundering.* *"trade-off accepted, not revisited"* (M5 plan.md decisions log) reads like a decision but wasn't one. The plan.md format lets hand-waves inherit decision-language authority.

3. *Reference-as-cage (minor).* Plan.md "What didn't work": *"First pass tried to validate email client-side; dropped after the verifier flagged 'not in done means.'"* Healthy in this case, but the same mechanism could kill a good adjacent improvement under "not in scope" gating.

---

**Where the fix belongs** (each named gap)

| Gap | Fix surface |
|---|---|
| Verifier accepts prose for qualitative "done means" | NEW SKILL — LLM-judge that reads shipped code against each "done means" clause, refuses prose |
| Empty-leaderboard crash / 401 path | Sharper verifier — add behavioural assertions (or Playwright smoke per reference.md's Phase 1 question) |
| Plan.md deferral-laundering | Rule in CLAUDE.local.md — *"Deferred decisions are not decisions. Plan.md decisions log entries must name what was picked and why, or mark 'DEFERRED' explicitly."* |
| Reference-as-cage risk | Observation in `.claude/memory/observations.md` — hypothesis, watch for recurrence |
| Register-path missing in UI | Same NEW SKILL as first row |

---

**Ranked gap list (by damage-to-a-future-run)**

1. **Verifier accepts prose for qualitative clauses** — DOMINANT. Causes FAILing tasks to look PASSed. Recurs across any task with a qualitative "done means." Stops human review.
2. **Plan.md deferral-laundering** — recurs every time a plan.md has a decisions log. Quietly widens scope of unreviewed debt.
3. **Empty-leaderboard / 401 behavioural gaps** — real bugs, but specific to this task's shape. Sharpened verifier fixes them.
4. **Reference-as-cage** — potential, not observed this run. Watch item.

**Dominant gap: prose-as-evidence in the verifier's qualitative clauses.** An LLM-judge shape — reads the reference's "done means" against the diff, insists each clause name a concrete code path — catches this and prevents the false PASS.

---

### Prompt 2 — verbatim

> I want to author a skill for my personal kit. Shape: one of sharpened-verifier, LLM-judge, or gap-finder. I'll tell you which after you ask me. This is the second skill I've authored this way; the first was my test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`, author it in the same shape.
>
> Ask me the questions you need to encode this skill well for my codebase and my workflow. Cover at minimum: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in concrete terms I can defend to a teammate, what it should flag vs. what it should let through, how it should output (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.
>
> Ask ONE question at a time. Wait for my reply. Push back when my answer is generic. A judge that says "check if the output is good" is useless. A verifier that duplicates the existing test suite is noise. I need codebase-specific and failure-specific detail.
>
> When you have enough, write SKILL.md at `~/.claude/skills/<skill-name>/SKILL.md`. You propose the skill name from what we encoded. Frontmatter (name + description) then instructions. Show me before saving.

### Response (encoding dialogue, one question at a time, student answers pasted verbatim)

**Q1:** Which shape: sharpened-verifier, LLM-judge, or gap-finder?

Student:
> **Shape:** LLM-judge. The packaging-missed beats all have the same shape: verifier's deterministic presence check passed (submitScore called, no separate page, no /me test), but "does the shipped code actually meet 'done means'" was a qualitative question the verifier couldn't see. A judge that reads the produced code against the reference's "done means" line and pushes back on prose hand-waving ("register can be a separate concern") would have caught the missing register path and the empty-leaderboard crash.

**Q2:** When does the judge fire? Every commit? End of phase? On the agent's self-declared "done"?

Student:
> **Fires on:** agent-produced work at Phase completion (end of a plan.md phase), not every commit. Input: the reference.md's "done means" + the current diff against HEAD.

**Q3:** What's the quality bar in concrete terms — what counts as evidence that a "done means" clause is met?

Student:
> **Quality bar:** each "done means" clause must have a concrete code path (function call, route handler, test, or UI element) the judge can point at. Prose explanation ("X can be a separate concern") triggers FAIL.

**Q4:** What flags vs. what gets let through?

Student:
> **Flag vs let through:** FAIL on (1) any done-means clause satisfied only by prose, (2) any TODO-as-completion, (3) new runtime paths with no test. Let through: partial phase completion explicitly noted in plan.md as "in progress."

**Q5:** Output shape?

Student:
> **Output shape:** ranked findings with quoted evidence. Top finding names the clause most likely to break the task's intent; others are ordered by impact.

**Q6:** What does the skill look like when it's wrong — what's the failure shape I should watch for?

Student:
> **Failure shape when wrong:** the judge becomes a pedant — FAILs partial work that was genuinely scoped to the phase. Calibrate against the plan.md "current phase" marker.

**Enough encoded.** Proposing skill name: **`done-means-judge`** — names the exact move (read shipped code against a "done means" bar, refuse prose as evidence). Writing to `~/.claude/skills/done-means-judge/SKILL.md`. Shown below before saving.

(SKILL.md content shown below in the "skill draft" section, then saved.)

---

### Prompt 3 — verbatim

> Before I ship this skill, critique it. Read the SKILL.md you just wrote. Tell me:
>
> - What's the weakest part? Name the assumption most likely to be wrong for my codebase, or the section a teammate would push back on first.
> - Is there anything generic dressed up as codebase-specific? Advice a pyramid-shaped test book would give, or a verifier template from a blog post.
> - Is there anything from the two runs' diff that didn't make it into the skill? A quoted failure moment I named in Phase 1 that would sharpen the skill if it were encoded?
>
> Don't reassure me. Name weak parts.

### Response (self-critique, no reassurance)

**Weakest part — the phase-completion trigger.** The skill fires "at end of a plan.md phase." That assumes the agent correctly marks a phase done. In the M5 run, Phase 3 was marked done with only login shipped — the agent's *own* self-declaration is what put us at the judge's doorstep. If the judge only runs when the agent says "Phase 3 done," it inherits the agent's optimism about scope. Teammate push-back: *"your judge runs because the agent said it was ready — that's the same trust loop we just failed."* Fix direction: also fire on `git commit` inside a phase if the commit message claims closure (e.g., "wire X" / "implement Y"), not only on plan.md checkmark.

**Generic dressed as specific — the "ranked findings" section.** Every judge skill on every blog says "ranked findings with quoted evidence." The ranking rule I encoded ("top finding names the clause most likely to break the task's intent") is still generic — in a lemmings-repo world the ranking should be: (1) auth/identity clauses first (JWT never re-signed, no client user_id), (2) load-bearing win-path clauses second, (3) UX polish clauses last. Currently the SKILL.md doesn't name that hierarchy. It reads codebase-agnostic.

**Missed from Phase 1 diff — plan.md deferral-laundering.** I named this in Phase 1 as gap #2. The skill only checks the reference's "done means" against the diff. It does not read plan.md's decisions log for phrases like *"trade-off accepted, not revisited"* — which is exactly the hand-wave that should trigger FAIL on a decision clause. Quoted from M5 plan.md: *"Kept localStorage for token (not sessionStorage); trade-off accepted, not revisited this run"* — the skill as written would miss this because the deferral lives in plan.md, not in code. Should expand input to include plan.md decisions log, not only reference + diff.

**Also missed — the empty-leaderboard quote.** Plan.md "Known gaps": *"`topScores` returns [] → renderEndScreen crashes. Unit test absent."* This is the shape the judge most obviously should catch (behavioural gap where a presence check passes). The skill's FAIL condition (3) — *"new runtime paths with no test"* — would catch it only if the judge re-reads plan.md's "Known gaps" section and treats those as open, not as acknowledged-and-accepted. Currently ambiguous.

---

### Prompt 4 — verbatim

> Invoke the skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.
>
> Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).
>
> Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?

### Response — invoking `done-means-judge` on `send-off/auth-ux-packaged`

Inputs:
- Reference "done means": `docs/tasks/auth-ux-wiring/reference.md` (clauses: register + log in + score + leaderboard handle + no client `user_id`).
- Diff against HEAD: 4 commits on `send-off/auth-ux-packaged`.
- Plan.md decisions log + Known gaps.

**VERDICT: FAIL**

**Ranked findings:**

1. **"A new user can register" — prose-only evidence.**
   Plan.md decisions log: *"Kept total UI surface tiny. Registration can be a separate concern."* No register affordance in `src/main.js`, `src/auth.js`, or `index.html`. Grep of the repo returns zero call sites for `/auth/register` from the frontend. Clause satisfied only by prose. **FAIL (clause 1).**

2. **"See their handle on the leaderboard" — presence only, behaviour unchecked.**
   `topScores()` is called; `renderEndScreen` paints handles. Plan.md "Known gaps": *"`topScores` returns [] → renderEndScreen crashes. Unit test absent."* A first-ever player completing a run hits an empty array and crashes before the handle renders. No runtime path test exists. **FAIL (clause 3 — new runtime path, no test).**

3. **Token storage decision-as-deferral.**
   Plan.md: *"Kept localStorage for token (not sessionStorage); trade-off accepted, not revisited this run."* Reference check 6 asks for a one-line rationale comment. Grep `src/auth.js` — no rationale comment next to the `localStorage.setItem` call. **FAIL (prose-as-evidence for a decision clause).**

4. **"Score a run" — call site exists, 401 path missing.**
   `submitScore` wired on win path (`5af7dac`). No handling for 401 from expired token. Plan.md acknowledges. Runtime path without test. **FAIL by strict read of clause 2; soft FAIL — staff engineer would call this a missing polish phase, not a done-means violation.**

**Top finding that names the clause most likely to break task intent:** #1 — register path. The task's first verb was "register"; the ship has no UI affordance for it. Everything downstream is stubbed by `prompt()`-based login only.

---

**Is the skill any good?**

*Does it catch the dominant gap from Phase 1?* Yes. The dominant gap — prose-as-evidence on qualitative clauses — is exactly what finding #1 catches. The judge pushes back on *"Registration can be a separate concern"* and demands a code path. That was the whole point.

*Does it miss things a staff engineer would catch?* Yes, three:
- The `auth.js` `prompt()`-based login is UX-hostile (native browser prompt in a game). The judge has nothing to say about UX quality; it only checks presence-of-clause.
- JWT secret still hardcoded in `backend/server.js:17` (per `.claude/memory/observations.md`). Not in this task's "done means" — the judge correctly ignores it — but a staff engineer would flag it on any PR touching auth. Judge stays in-scope; that's a feature, not a miss.
- No integration test for the full register → login → score → leaderboard round-trip. `CLAUDE.local.md`'s supertest-with-real-SQLite posture says this is the load-bearing test reviewers read first. Judge didn't name it because clause 1 fails before the round-trip test is relevant, but a human would escalate.

*Would the M4 un-packaged run have come out better retroactively?* Somewhat. The M4 run had no reference.md for the judge to read against — the judge's input contract is *"reference's 'done means' + diff."* Without the reference, the judge has no bar. **The judge is useless on un-packaged runs by construction.** That's the Phase 1 / Phase 2 dependency the student's packaging move creates: the judge runs on top of packaging, not instead of it. M4's fix was packaging; M6's fix is the judge on top of packaging.

Self-grade on the skill itself: **good enough to ship; weak on ranking hierarchy (still generic) and on the phase-completion trigger (inherits agent optimism).** Both flagged in Prompt 3 critique. Open TODOs in SKILL.md maintainer note.

---

## Ex2 — arc-retrospective

### Prompt 5 — verbatim

> Read my work across the training. Specifically:
>
> - My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
> - Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
> - The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
> - Both skills I authored at `~/.claude/skills/` during the training (the test-strategy skill from earlier, and the skill I authored today).
> - The M4 un-packaged run artefact (commits, files, the session transcript under `~/.claude/projects/` in a folder matching this repo — the earliest long-running run).
> - The M5 packaged re-run artefact (commits, files, the session transcript from the re-send of the same task).
>
> Run this audit in a fresh sub-task via the Task tool, so the read isn't colored by this conversation.
>
> Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.
>
> Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.

### Response

**Harness note:** Task tool unavailable from this Actor context — inline substitution. Files read: `CLAUDE.local.md`, `.claude/memory/observations.md`, `docs/adr/0001-strip-email-from-leaderboard.md`, `~/.claude/skills/test-strategy/SKILL.md`, the just-authored `~/.claude/skills/done-means-judge/SKILL.md`, and both substitute transcripts.

Arc note drafted below. Shown before saving. Proposed location: `.claude/memory/arc-note.md`.

(Draft written; student approval pasted; file saved.)

---

### Student approval — verbatim

> Save to `.claude/memory/arc-note.md` — it's session-derived reflection, fits the observations/hypotheses/rules block, not a load-bearing decision so not an ADR.

Saved.

---

## Artefacts produced

- `~/.claude/skills/done-means-judge/SKILL.md` (personal; not committed to scratch)
- `.claude/memory/arc-note.md` (in scratch)

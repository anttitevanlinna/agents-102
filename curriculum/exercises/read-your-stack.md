# Read your stack

**Time:** 15 minutes.

**Session** *(continue, "Module 6 worktree session")*

Same session as the gap map. The ranked gaps and the rule you cut are in scrollback; the stack scan reads wider from there.

**What you do:** read your history for the work you repeat.

**What you build:** a diagram of the work that recurs across your stack.

**The point:** recurring work has a shape, and drawn, the shape is easier to recognise than described.

---

## Find the work you repeat across your stack

- Look wider than the two sessions. The dominant gap came from one task. The kinds of work you repeat run across everything you do, and most of them never get looked at directly. How wide you look, and what you choose to map, is yours.
- Read your own history first. Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back.

## Scan your history for the work that recurs

> **Fast operator?** Lump the next two prompts into one go. Paste them one after another in the same conversation, study the shapes, and let the answers land together. The two moves don't change.

> **Cut the scan when the top patterns are clear enough to use.** The prompt keeps looking because that is its job. Narrow it whenever you like, or say *tell me what you've found so far*. If it comes back thin instead, or everything traces to one repo, a *there is more than this, keep going* prompt sends it back out. Once two or three recurring kinds of work are clear enough to draw and compare, move on. You do not need a complete inventory.

Ask Claude to scan your sessions across every project and group the kinds of work that recur.

{{prompt:spot-gaps-build-the-loop-study}}

## Draw your top work-shapes as diagrams

- What comes back is the work you do over and over, grouped and ranked. Read for the few at the top you actually repeat.
- A recurring kind of work has a shape. Steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described.

Ask Claude to draw your top few work-shapes as simple diagrams.

{{prompt:spot-gaps-build-the-loop-shapes}}

> **Want to see the shapes, not read them?** Mermaid comes back as text. Say *give me this in HTML* to open them in a browser.

## Sidestep: check your menu against the field's

Optional. Your shapes are drawn and the gaps are ranked. This one widens the menu you pick checks from.

- Where a primitive lines up with a shape you repeat, that pairing is a skill candidate for the kit you grow later.

Ask Claude to name the checking primitives the field already runs and rank the ones that fit your gap.

{{prompt:spot-gaps-build-the-loop-primitives}}

Expect the list to look familiar: test-writing, browser-testing, PR-building, lint and typecheck gates, compile and build, smoke-test on a real path, code-review, git-diff inspection, schema validation, eval suites for agent outputs. Your list won't be exact. The primitives Claude names are the ones your codebase already runs.

**What happened:** A diagrammed map of the work that recurs across your stack. The shapes stay in this session's scrollback; you build the handoff prompt from them.

## Decide what crosses back to your main repo

**Note** The M5 worktree holds this module's work: `./CLAUDE.local.md` with the rule you cut, `observations/`, and M5's packaging. Your main repo's copies stopped at the fork, stale rule and all. What crosses back is yours: copy the worktree's versions over, take the parts you want, or leave them where they are.

<!-- maintainer -->

**Atomic — no phase markers.** One widening scan, drawn, then an optional sidestep.

**View summary:** You read your own session history across every project, group the kinds of work that recur, draw the top few as diagrams, and optionally check your menu of checks against the field's. The stack-map feeds the closing handoff move.

**"The field already runs" stays (Antti 2026-09-02).** The sidestep header and lead-in claim field practice, not convergent vocabulary: the menu Claude returns reflects what is common in the field, and a primitive nobody runs would not surface in it. The Stance's no-convergence-verb row is about naming. Judges should not re-flag the header or the lead-in under `check_research_claims.md` §1.

**Fast-operator batch path (accepted):** *"Fast operator?"* labels the opt-in path for someone who wants both scan prompts in one conversation; it does not set the room's pace or the exercise's completion bar. The separate scan callout is the working-memory stop gate. Preserve both callouts and the label.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads plain; bold only on widget / label chrome and blockquote callout leads, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`.

**Word count:** ~520 words body.

**Primary Bloom's level:** Analyze (the stack scan) + Create (the shapes).

**Placement:** Beat 2 of the three-beat M6 (2026-09-02), after the control-loop lecture and before the handoff lecture. Depth is the student's; the optional primitives sidestep closes it and nothing downstream depends on it.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know what my stack repeats."* Watch-for: compliance-feel (student treats the scan as paperwork) or credibility-performance (*"we map our stack like the pros do"*). Both steal the mood.

<!-- backing -->

Claims
- `sessions-are-on-disk-and-unread` · vision · "Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back." ← none-owed
- `recurring-work-has-a-shape` · vision · "Steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described." ← none-owed
- `primitives-will-look-familiar` · vision · "The primitives Claude names are the ones your codebase already runs." ← none-owed
- `field-already-runs-these-checks` · vision · "the checking primitives the field already runs" ← none-owed — Antti 2026-09-02: the returned menu reflects field prevalence; the header carries the same claim

Sources
- curran-2x `[checked:2026-05-25 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16), Intercom's tiered review with auto-approval at the lowest tier. CAVEAT ×2: metrics vendor-self-reported, and the company renamed to Fin on 2026-05-12 — the memo predates the rename; do not silently swap the name (record: kb:observations/intercom.md). Backs the checking-primitives menu as something orgs actually run, not a list we invented. fallback: keep the menu, drop the org names.
- geoffintech-charles `[checked:2026-05-25 result:OK due:2026-10-08]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Geoff Charles (Ramp), 2026-04-08 (22:12 UTC, snowflake-decoded; due = pub+6mo per `observations/ramp.md`); the Dojo skill marketplace. Verified via `observations/ramp.md` plus the X oEmbed workaround. kb:observations/ramp.md **Scoped narrowly:** this backs that a large org runs a shared checking kit, not any specific count. The 350-skill figure is not asserted in this exercise's body and should not be reintroduced from the register. fallback: drop the name; "solo builders and large orgs run the same primitives" survives without it.

Frameworks
- Checking-primitives menu · [borrow:none] · law:eval-judge-verifier-gate · ← curran-2x, geoffintech-charles

Stance `[stance:2026-08-01 level:L2]`
- holds: that orgs and solo builders converge on a recognisable set of checking primitives — tests, lint, type-check, review, diff inspection, eval suites. This is the safest convergence claim in the corpus because the primitives predate agents entirely; the exercise is asking the student to recognise their own toolchain, not to accept a finding.
- contested: **the menu is not convergent practitioner vocabulary.** Two named orgs plus an unnamed category does not clear the L3 bar. The body makes no such claim — it says the primitives are the ones the student's own codebase already runs, which is weaker and true.
- decided: **no convergence verb attaches to this menu.** The recognition framing carries the whole warrant. Do not reintroduce *"convergent practitioner vocabulary"* from any register. The beat ships as an optional sidestep, so nothing downstream may load-bear on the menu existing.
- would-move-it: a primitive entering common practice that the menu omits. The list is deliberately unranked and open, so an addition edits one line rather than the section.

OODA
- question: what checking primitives have entered common practice since this menu was written, and does the recognition beat still land for a room whose toolchain has moved?
- roster: Darragh Curran and the Intercom engineering blog, Geoff Charles and Ramp, Hamel Husain, Simon Willison, Kieran Klaassen
- last-run: 2026-08-01

<!-- /backing -->

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- holds a diagrammed map of the work they repeat across their stack, and reads a new task against it before sending the task off
- names which recurring shape a new task belongs to, or that it belongs to none, before writing the send-off
- re-runs the stack scan a week later and compares the top shapes against the map, instead of assuming the map still holds

**Failure modes + diagnostics:**
- **Wider-look sprawl** — the study scan reads the whole stack and can throw back a wall. If a student drowns in the scan, point at the ranked head and move on.

**Plug points:**
- The team's code-review conventions: where a recurring shape includes review, the conventions are the check that shape calls, and they ride into the handoff prompt that follows. The exercise is study plus shapes plus the optional sidestep; nothing in it builds a judge.

**Decision points (pacing):**
- **Study + shapes run long (>15 min)** — the wider look is a light pass, not a full inventory. Study reads the ranked head; shapes draws two or three. If it eats the clock the student is cataloguing; use the body stop gate and skip the sidestep.

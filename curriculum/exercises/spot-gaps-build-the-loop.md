# Map the gaps, read your stack

**Time:** 30–40 minutes inside the module slot.

**Session** *(new, "Module 6 worktree session")*

Open a new Claude Code session in the existing M5 worktree (`../<repo>-m5`), no fork. M5's session may still be running the re-send. Leave it if that is the right call; M6 starts by reading both runs from disk. Before M6 edits files or cuts rules, decide whether the M5 run is done enough, should be stopped, or should be treated as the partial artefact.

**What you do:** Diff two runs of the same task, route the dominant gap to its home, then read your own history for the work you repeat.

**What you build:** a ranked gap map from two runs of the same task, one stale rule cut from your rules-file, and a diagrammed map of the work that recurs across your stack.

**The point:** You tested at M4, you learned at M5. Here you name what the two runs cost you and where each lesson belongs. Then you look wider: the same reading, run across everything you do. The stack-map you draw is what the closing move builds from.

---

## Phase 1: Diff the two runs, rank the gaps

- You hold two runs of the same task. The un-packaged run sits on the `m4/<slug>` branch recorded in `task.md`; the packaged re-run sits on the `m5/<slug>` branch recorded in `plan.md`. Both are visible via git refs, since the worktree shares `.git` with the original repo.
- Read from the recorded coordinates, not a branch or transcript search. Both runs recorded their session transcript paths: M4 in `task.md`, M5 in the protected `Run coordinates` block at the top of `plan.md`.
- You hold the contrast; the agent reads both runs off disk. You are not tracing git refs by hand. Point it at the coordinates and let it pull both runs side by side.

Ask Claude to read both runs side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced.

{{prompt:spot-gaps-build-the-loop-1}}

## Read the contrast, push back where it generalises

- Skim past the opening plan. Claude will likely open with a four-dimension plan summary (*"I'll start with repo state across the m4/ branch, then..."*) before any quoted evidence lands. The contrast moments are what you're reading for.
- Push back where Claude generalises. Two runs means two bodies of evidence, and the teaching is in the contrast. If Claude writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted.
- Expect over-credit on the packaging. A fair push-back is *"name one thing the verifier missed, concretely."* Close with a ranked gap list of three to five items and a dominant gap that will shape Phase 2.

## Cut one stale rule the diagnosis killed

- Two runs of the same task were the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the run worse.
- Cleaning is the compound move that keeps the loop fast. Rules-files have a half-life. Adding rules is only half of it; subtracting the dead ones is the other half.

Ask Claude to cut one rule the two-run diagnosis killed, or to say so and stop if all rules held.

{{prompt:spot-gaps-build-the-loop-2}}

## Say go, unless the cut spreads past the one rule

- Claude may pause before editing `./CLAUDE.local.md`. A named config file looks risky to modify. If it asks, just say go.
- Push back if the diff touches more than the one rule you flagged. *"In place"* is loose wording, and Claude may rewrite more than the one stale rule. One rule cut, no more.

## Phase 2: Find the work you repeat across your stack

- Look wider than the two runs. The dominant gap came from one task. The kinds of work you repeat run across everything you do, and most of them never get looked at directly. This is your stack. How wide you look, and what you choose to map, is yours.
- Read your own history first. Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back.

## Scan your history for the work that recurs

> **Fast operator?** Lump the next three prompts into one go. Paste them one after another in the same conversation, study then shapes then primitives, and let the answers land together. The three moves don't change.

> **This scan runs long, and it is yours to steer.** Narrow it whenever you like, point it at the kind of work you care about. Any time, you can say *tell me what you've found so far*, then let it pick back up. If it wraps up early, nudge it to keep going. There is more in there than a first pass admits.

Ask Claude to scan your sessions across every project and group the kinds of work that recur.

{{prompt:spot-gaps-build-the-loop-study}}

## Draw your top work-shapes as diagrams

- What comes back is the work you do over and over, grouped and ranked. Read for the few at the top you actually repeat. How far you take this is yours.
- A recurring kind of work has a shape. Steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described.

Ask Claude to draw your top few work-shapes as simple diagrams.

{{prompt:spot-gaps-build-the-loop-shapes}}

> **Want to see the shapes, not read them?** Mermaid comes back as text. Say *give me this in HTML* to open them in a browser.

## List the checks the field runs, rank the ones that fit your gap

- Hold the menu against the shapes you drew. Where a primitive lines up with a shape you repeat, that pairing is a skill candidate for the kit you grow later.
- The menu grounds the map in what practitioners actually check, not just your own instinct.

Ask Claude to name the checking primitives the field already runs and rank the ones that fit your gap.

{{prompt:spot-gaps-build-the-loop-primitives}}

Expect the list to look familiar: test-writing, browser-testing, PR-building, lint and typecheck gates, compile and build, smoke-test on a real path, code-review, git-diff inspection, schema validation, eval suites for agent outputs. Your list won't be exact. The recognition is the point. The primitives Claude names are the ones your codebase already runs.

## Route the dominant gap to its home

- Gaps sort into three homes: memory (a rule that would have prevented the mistake upstream), a sharper verifier (a check that would have fired mid-run), or a skill (a move worth packaging for future tasks). The dominant gap gets a named home before anything gets built. If the home is memory, the rule can land in `./CLAUDE.local.md` now, the reverse of the cut above.
- The skill home stays a name for now, not a build. The closing lecture hands you the encode-move: a prompt built from the shapes you just drew.

**What happened:** You ended with a one-screen gap map across memory / verifier / skill, one stale rule cut in place, and a diagrammed map of the work that recurs across your stack. The dominant gap has a named home; the shapes carry into the close.

<!-- maintainer -->

**View summary:** You compare the un-packaged and packaged runs, rank what the second attempt still missed, remove one stale rule, route the dominant gap to its home, and map the work that recurs across your stack. The stack-map feeds the closing handoff move.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullet leads de-bolded to plain; kept bold only on the three session-shaper shape handles (**Sharpened verifier** / **LLM-judge** / **Gap-finder**); widget/label chrome and blockquote callouts untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Quality:** compendium-audited 2026-07-26 (writing@b3143a4 story@9697944 technical@9697944 behavior@b3143a4 pedagogy@b3143a4 strategy@9697944 slides@b3143a4)
- judges @9697944: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- re-audit @796293b 2026-05-31: writing PASS, pedagogy PASS — steer-callout gained a premature-completion recovery line (§48/§62) + a render-as-HTML affordance callout after the shapes prompt (§50/§53/§62 hold)

**Word count:** ~830 words body.

**Primary Bloom's level:** Analyze (Phase 1 diff + Phase 2 stack scan) + Evaluate (rule cut + gap routing).

**Time budget total:** 30–40 min. Phase 1 compressed (diff + name-gaps share one phase); Phase 2 is the stack scan (study / shapes / primitives), depth the student's.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know what my stack repeats."* Watch-for: compliance-feel (student treats the scan as paperwork) or credibility-performance (*"we map our stack like the pros do"*). Both steal the mood.

**Frameworks riffed on:**
- **Diff across two runs** (Phase 1) — the pedagogy of the M4→M5 contrast extended; same artefact-quotation discipline from M5's *Diagnose and re-send*.
- **Review and Compound across two runs** (Phase 1) — Kieran Klaassen's compound-engineering Review and Compound steps ([Compound Engineering: How Every Codes With Agents](https://every.to/source-code/compound-engineering-how-every-codes-with-agents), `[practitioner direct, vendor venue]`) across two runs of the same task. The step definitions live on that page, not on the Definitive Guide; in the source, Plan and Work belong to the agents while Review and Compound belong to the engineer.
- **Checking-primitives menu** (Phase 2) — convergent practitioner vocabulary across Ramp Dojo (350-skill marketplace, [Geoff Charles, CPO](https://x.com/geoffintech/status/2042002590758572377) `[practitioner direct, 2026-04-09]`), Intercom Tier 1/2/3 (Darragh Curran, [2x Nine Months Later](https://ideas.fin.ai/p/2x-nine-months-later) `[practitioner direct, vendor venue, 2026-04-16]`), and solo builders running long tasks. Menu form; the map pairs primitives with recurring shapes. Full citation + freshness stamps: sibling module's maintainer block, `trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` § Frameworks riffed on / § Source verification.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- now owns a `session-shaper` skill at `~/.claude/skills/session-shaper/SKILL.md` that auto-discovers in every repo, and invokes it on a real run to catch the gap it was built for
- cuts a stale rule from their own `CLAUDE.local.md` once a run's evidence shows it never fired or fired wrong, instead of letting the rules-file rot
- authors that skill through conversation — pushing back on a default with a quoted moment from the run — rather than hand-editing SKILL.md in a tab

**Failure modes + diagnostics:**
- **Phase 1 generalised diff** — student says *"M5 was better"* without quoted moments. Diagnostic: prompt requires quoted moments from BOTH runs. If Claude returns only summaries, re-run with explicit quote enforcement. Echoes M5's Phase 1 diagnostic.
- **Phase 1 packaging-over-credit** — student treats the packaged run as fully solved and skips the *"what packaging missed"* beat. Diagnostic: the M5 run did drift somewhere; if Phase 1 outputs zero misses, Claude is over-crediting. Trainer push: *"name one thing the verifier missed, concretely. Quote the scrollback."*
- **Phase 2 wider-look sprawl** — the study scan reads the whole stack and can throw back a wall. The body steer (*read for the few at the top you actually repeat; how far you take this is yours*) is the agency affordance — depth is the student's, not a mandate to catalogue. M6's leeway spirit: study and shapes run, but how wide and what gets mapped is the student's. If a student drowns in the scan, point at the ranked head.
- **Gap-home dodge** — student ranks the gaps but never commits the dominant one to a home; the routing beat is the exercise's Evaluate move. Diagnostic: can the student say which of the three homes the dominant gap lives in, in one sentence? If not, back to the ranked list.

**Plug points:**
- Student's M4 un-packaged artefact + M5 packaged re-run artefact (Phase 1 source material; both already in the repo + session transcripts).
- Repo's skill home convention if any (personal skills default to `~/.claude/skills/<name>/` regardless — auto-discovered; team kit home is a separate PR conversation).
- Sponsor-stated or team-stated code-review conventions (feeds Phase 2 judge's quality bar, if the shape picked is LLM-judge).

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diffing. The diff is data for Phase 2, not an essay. Force a rank and move on.
- **Phase 1 <10 min** — under-engagement. Check if Claude returned only summaries; re-run the prompt with quote enforcement if so.
- **Phase 2 study + shapes run long (>20 min)** — the wider look is a light pass, not a full inventory. Study reads the ranked head; shapes draws a few. The body carries the steer (*how far you take this is yours*). If it eats the clock the student is cataloguing; force the ranked head and move to primitives.
- **Whole-room mood below 7** — practitioner fluency isn't landing. Check the routing beat: does the dominant gap have a named home, in the student's own words? If the gaps stayed a list, the read didn't close.

**Watch-fors (cross-phase):**
- **Verifier-as-eval terminology leaking** — the closing lecture names evals with full weight (verifier = judge = gate = eval). Phase 2 can use the plain words (verifier, judge); save the explicit naming for the closer.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

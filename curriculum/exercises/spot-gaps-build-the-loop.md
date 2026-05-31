# Spot gaps, build the loop

**Time:** 40–50 minutes inside a 2h module slot.

**Session** *(new, "Module 6 worktree session")*

Open a new Claude Code session in the existing M5 worktree (`../<repo>-m5`), no fork. M5's session may still be running the re-send. Leave it if that is the right call; M6 starts by reading both runs from disk. Before M6 edits files, cuts rules, or invokes the new skill, decide whether the M5 run is done enough, should be stopped, or should be treated as the partial artefact.

**What you do:** Diff two runs of the same task, route the dominant gap to its home, author a second skill from the diagnosis.

**The point:** The authoring move repeats. You ran it at M3 on a test-strategy skill; you run it again here with two runs' evidence in hand. Same move, faster. The learning wheel turns. You tested at M4, learned at M5, and you encode at M6. The skill you ship here is how the next run inherits what these two runs cost you.

---

## Phase 1: Diff and name the gaps

Two runs of the same task are accessible from the worktree: the un-packaged run on the `m4/<slug>` branch recorded in `task.md`, the packaged re-run on the `m5/<slug>` branch recorded in `plan.md`, both visible via git refs since the worktree shares `.git` with the original repo. Both runs also recorded their session transcript paths: M4 in `task.md`, M5 in the protected `Run coordinates` block at the top of `plan.md`. Phase 1 reads from those coordinates, not from branch or transcript search.

Ask Claude to read both runs side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced.

{{prompt:spot-gaps-build-the-loop-1}}

Claude will likely open with a four-dimension plan summary (*"I'll start with repo state across the m4/ branch, then..."*) before any quoted evidence lands. Skim past the opening; the contrast moments are what you're reading for.

Push back where Claude generalises. Two runs means two bodies of evidence, and the teaching is in the contrast. If Claude writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted. Expect Claude to over-credit the packaging on first pass. A fair push-back is *"name one thing the verifier missed, concretely."*

You should close Phase 1 with a ranked gap list (three to five items) and a dominant gap that will shape Phase 2.

Two runs of the same task were the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the run worse. Cleaning is the compound move that keeps the loop fast; rules-files have a half-life.

Ask Claude to cut one rule the two-run diagnosis killed, or to say so and stop if all rules held.

{{prompt:spot-gaps-build-the-loop-2}}

Claude may pause before editing `./CLAUDE.local.md`, a named config file looks risky to modify, or it may rewrite more than the one stale rule (*"in place"* is loose wording). If it asks, just say go. If the diff touches more than the one rule you flagged, push back.

---

## Phase 2: Author the session-shaper

Skills aren't hand-crafted. The move you practiced at M3 repeats here: author through conversation, push back on defaults, verify by invoking. The shape follows what the two runs demanded, not a template.

Before you shape the skill, look wider than the two runs. The dominant gap came from one task. The kinds of work you repeat run across everything you do, and most of them never get looked at directly. This is your stack. How wide you look, and what you choose to package, is yours.

> **Fast operator?** Lump the next three prompts into one go. Paste them one after another in the same conversation, study then shapes then primitives, and let the answers land together. The three moves don't change.

Read your own history first. Your Claude Code sessions from every project are sitting on disk, and few engineers ever read them back.

> **This scan runs long, and it is yours to steer.** Narrow it whenever you like, point it at the kind of work you care about. Any time, you can say *tell me what you've found so far*, then let it pick back up.

Ask Claude to scan your sessions across every project and group the kinds of work that recur.

{{prompt:spot-gaps-build-the-loop-study}}

What comes back is the work you do over and over, grouped and ranked. Read for the few at the top you actually repeat. How far you take this is yours. Now make those few something you can see. A recurring kind of work has a shape: steps in order, a branch, a loop back. Drawn, the shape is easier to recognise than described.

Ask Claude to draw your top few work-shapes as simple diagrams.

{{prompt:spot-gaps-build-the-loop-shapes}}

If one of the work-shapes you drew is the kind of work those two runs came from, that is the session-shaper you build now. If not, build it against the dominant gap directly. The rest are the kit you grow later.

Before you commit to a shape, expand the menu. The menu lands in context right before you author, so the skill is built against what practitioners actually check, not just your own instinct.

Ask Claude to name the checking primitives the field already runs and rank the ones that fit your gap.

{{prompt:spot-gaps-build-the-loop-primitives}}

Expect to see test-writing, browser-testing, PR-building, lint and typecheck gates, compile and build, smoke-test on a real path, code-review, git-diff inspection, schema validation, eval suites for agent outputs. Your list won't be exact. The recognition is the point. The primitives Claude names are the ones your codebase already runs.

The three prompts below (author, critique, invoke) are separate steps. You don't have to run all three.

> **Skip the critique and the testing, if you want.** You've done that pattern before. Not that you should, but you already know those moves.

The session-shaper takes one of three forms, from the convergence of practitioners running long tasks:

- **Sharpened verifier.** The M5 verifier targeted one failure mode; the diff surfaced another. The skill encodes the second check so the next run inherits both.
- **LLM-judge.** Qualitative fit the deterministic verifier can't see (did the output answer the task, does the tone match the codebase, does the commit message respect the team's convention). A judge is a verifier authored in prose.
- **Gap-finder.** A skill that reads a proposed task plan and flags thin memory, missing connectors, or stale rules before the long-running run starts. The verifier fires on output; the gap-finder fires before.

Pick the one the diff points at. If the dominant gap is "verifier missed drift at hour 4," you're building a sharpened verifier. If it's "output technically passed but read off," you're building a judge. If it's "the run shouldn't have started with this context," you're building a gap-finder.

Author through conversation. No markdown editor, no hand-crafting SKILL.md in a file tab.

{{prompt:spot-gaps-build-the-loop-3}}

If Claude narrates a plan or shows you the full question list before asking one at a time, ask it to skip the preamble and use the AskUserQuestion tool. Your call.

Answer each question. When Claude offers a default that doesn't fit the two runs' evidence, push back with a quoted moment: *"no, the M5 verifier missed THIS moment. The skill has to catch that shape specifically."*

Once Claude shows you SKILL.md, self-critique before shipping. Default-acceptance is the failure mode here too.

{{prompt:spot-gaps-build-the-loop-4}}

This critique runs in the same session that authored the SKILL.md, convenient (the authoring context is right there) but charitable (same-context-window self-audit under-flags by design). You can make the critique sharper: ask Claude to over-flag (*"flag at least three things, be harsher than necessary, assume worse than it looks"*), or fresh-session it (dispatch a subagent with the SKILL.md pasted cold, no scrollback). The default keeps it in-session for evidence access; opt up if the read matters.

Read the critique. Push back where Claude is wrong; accept where Claude is right. Claude revises SKILL.md from your push-back.

Now invoke the skill on the packaged run you just diffed. Authoring without invocation is theatre.

{{prompt:spot-gaps-build-the-loop-5}}

This prompt asks Claude to invoke a skill it just helped author AND grade the result in the same turn. That's biased by design, the same context window self-charity is well-documented. The shape is one paste, one wait, one read, convenient over rigorous. If you want a harsher read, run it as two prompts: invoke first, read the output, then a second prompt that says *"Read that output as if you'd never seen the SKILL.md. What did the skill miss?"* Your call.

If the output doesn't catch the dominant gap, sharpen the skill itself and invoke again. If the skill names its own limitation (*"I check drift but not context-rot re-derivations"*), that's a feature. Ship with a one-line TODO at the top. A skill that names its gap is more useful to a teammate than one that pretends it's finished.

The skill ships personally. It lives at `~/.claude/skills/session-shaper/SKILL.md` and auto-discovers in every future session you run, across every repo. That's the ship.

**Team-kit candidate, via human conversation.** If the skill encodes something your whole team would benefit from, a codebase-specific judge, a verifier against a house style, a gap-finder tuned to the team's project shape, it's a strong PR candidate. But the PR starts with a conversation. Show it to a teammate over coffee. Post it in the channel. Ask: *"does this match how you'd check this kind of work?"* If they say yes, PR it. If they push back, you got the real review for free. Agents don't unilaterally change shared team infrastructure. You do.

**What happened:** You ended with a one-screen gap map across memory / verifier / rules / skill, and one SKILL.md file at `~/.claude/skills/session-shaper/SKILL.md`. Auto-discovered in every future session. The shape followed what the two runs demanded: a sharpened verifier, an LLM-judge, or a gap-finder. Team-kit candidates were flagged for a human conversation, not an auto-PR.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-31 (writing@e011708 story@e011708 technical@d06b5b8 behavior@e011708 pedagogy@e011708)
- judges @e011708: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy N/A (strategy evaluated at module level)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~830 words body.

**Primary Bloom's level:** Analyze (Phase 1 diff) + Create (Phase 2 authoring) + Evaluate (Phase 2 self-critique + invocation-as-test).

**Time budget total:** 40–50 min. Phase 1 compressed (diff + name-gaps share one phase); Phase 2 carries the module's weight. Forward-looking arc-retrospective beat (separate exercise file) follows.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* You've now authored two skills the same way. The move is yours. Watch-for: compliance-feel (student treats the skill as paperwork) or credibility-performance (*"we ship skills like the pros do"*). Both steal the mood.

**Frameworks riffed on:**
- **Diff across two runs** (Phase 1) — the pedagogy of the M4→M5 contrast extended; same artefact-quotation discipline from M5's *Diagnose and re-send*.
- **Author through conversation** (Phase 2) — repeats the M3 *Author your test-strategy skill* move. Second rep; faster. Kieran Klaassen's compound-engineering Review + Compound step ([Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide), `[practitioner direct, vendor venue]`) across two runs of the same task.
- **Three skill shapes** (Phase 2) — convergent practitioner vocabulary across Ramp Dojo, Intercom Tier 1/2/3, and solo builders running long tasks. Menu form; shape follows evidence.
- **Personal-first, team-promotion-via-human-conversation** — AE101 delivery-architecture rule. Skills ship to `~/.claude/skills/` first; team PRs start with a human conversation.

**Leap test (Monday):** three observable verbs the engineer exhibits on their own codebase next working day:
- now owns a `session-shaper` skill at `~/.claude/skills/session-shaper/SKILL.md` that auto-discovers in every repo, and invokes it on a real run to catch the gap it was built for
- cuts a stale rule from their own `CLAUDE.local.md` once a run's evidence shows it never fired or fired wrong, instead of letting the rules-file rot
- authors that skill through conversation — pushing back on a default with a quoted moment from the run — rather than hand-editing SKILL.md in a tab

**Failure modes + diagnostics:**
- **Phase 1 generalised diff** — student says *"M5 was better"* without quoted moments. Diagnostic: prompt requires quoted moments from BOTH runs. If Claude returns only summaries, re-run with explicit quote enforcement. Echoes M5's Phase 1 diagnostic.
- **Phase 1 packaging-over-credit** — student treats the packaged run as fully solved and skips the *"what packaging missed"* beat. Diagnostic: the M5 run did drift somewhere; if Phase 1 outputs zero misses, Claude is over-crediting. Trainer push: *"name one thing the verifier missed, concretely. Quote the scrollback."*
- **Phase 2 skill-shape mismatch** — student picks the shape they're most comfortable building (usually verifier) regardless of what the diff pointed at. Diagnostic: does the skill fire on the gap you ranked dominant? If not, re-scope.
- **Phase 2 wider-look sprawl** — the study scan reads the whole stack and can throw back a wall. The body steer (*read for the few at the top you actually repeat; how far you take this is yours*) is the agency affordance — depth is the student's, not a mandate to catalogue. M6's leeway spirit: study and shapes run, but how wide and what gets packaged is the student's. If a student drowns in the scan, point at the ranked head.
- **Phase 2 default-acceptance** — student ships Claude's first draft of SKILL.md without the self-critique beat. Diagnostic: the skill reads like a blog-post template. Trainer enforces the critique prompt.
- **Phase 2 markdown-editor drift** — student opens SKILL.md in an editor and hand-crafts it. The authoring move is conversation; redirect every time. Same load-bearing rule as M3.
- **Phase 2 invocation-skip** — student ships without running the skill on the packaged run. Authoring without invocation is theatre; the invocation-as-test is the learning moment.
- **Phase 2 auto-PR instinct** — student asks Claude to open a PR against the team kit. Stop. Skills ship personal first; team PRs start with a human conversation. Rule extends M3's same constraint.

**Plug points:**
- Student's M4 un-packaged artefact + M5 packaged re-run artefact (Phase 1 source material; both already in the repo + session transcripts).
- Repo's skill home convention if any (personal skills default to `~/.claude/skills/<name>/` regardless — auto-discovered; team kit home is a separate PR conversation).
- Sponsor-stated or team-stated code-review conventions (feeds Phase 2 judge's quality bar, if the shape picked is LLM-judge).

**Decision points (pacing):**
- **Phase 1 >20 min** — over-diffing. The diff is data for Phase 2, not an essay. Force a rank and move on.
- **Phase 1 <10 min** — under-engagement. Check if Claude returned only summaries; re-run the prompt with quote enforcement if so.
- **Phase 2 study + shapes run long (>12 min)** — the wider look is a light pass, not a full inventory. Study reads the ranked head; shapes draws a few. The body carries the steer (*how far you take this is yours*). If it eats the clock the student is cataloguing; the authoring is where Phase 2's minutes belong.
- **Phase 2 question loop >15 min** — Claude is asking too many questions or the student is answering generically. Trainer push: *"answer one with a quote from the diff instead."*
- **Phase 2 authoring >35 min** — gold-plating. The skill is good enough when it catches the dominant gap on invocation. Ship with a TODO; refine later.
- **Whole-room mood below 7** — practitioner fluency isn't landing. Check Phase 2 invocation: did the skill fire on the packaged run? If not, the encode step didn't close — student doesn't feel *"I know how to encode"* because they didn't see the skill work.

**Watch-fors (cross-phase):**
- **Skill path leaking into invocation** — if the student pastes `~/.claude/skills/<name>/SKILL.md` into a prompt as an invocation target, catch it. Claude Code auto-discovers; say *"invoke the `<name>` skill on the M5 re-run."* Path is noise at best, breakage at worst.
- **Team-PR auto-commit** — Claude volunteers to open the PR. Human conversation first; agent drafts the message afterwards. This is the M3 rule extending.
- **Verifier-as-eval terminology leaking** — the closing lecture names evals with full weight (verifier = judge = gate = eval). Phase 2 can use the plain words (verifier, judge); save the explicit naming for the closer.
- **Markdown-editor drift** — the authoring move is conversation. Every time.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

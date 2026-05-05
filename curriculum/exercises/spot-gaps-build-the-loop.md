# Spot gaps, build the loop

**Session** *(return, "Module 5 worktree session")*

Continue in your M5 worktree session at `../<repo>-m5`. If that session isn't still open, start a new Claude Code session at the same worktree path.

**What you do:** Diff the packaged M5 re-run against the un-packaged M4 baseline. Name what packaging caught, what it missed, and what new gaps surfaced. Then author a session-shaper skill through conversation. Shape follows what the two runs taught. Self-critique, invoke on the packaged run, ship personally.

**What happened:** You end with a one-screen gap map across memory / verifier / rules / skill, and one SKILL.md file at `~/.claude/skills/<skill-name>/SKILL.md`. Auto-discovered in every future session. Whichever shape the two runs demanded: a sharpened verifier, an LLM-judge, or a gap-finder. Team-kit candidates flagged for a human conversation, not an auto-PR.

**The point:** The authoring move repeats. You ran it at M3 on a test-strategy skill; you run it again here with two runs' evidence in hand. Same move, faster. The learning wheel turns. You tested at M4, learned at M5, and you encode at M6. The skill you ship here is how the next run inherits what these two runs cost you.

**Time:** 40–50 minutes inside a 2h module slot.

---

## Phase 1: Diff and name the gaps (~15 min)

Open a new Claude Code session in the M5 worktree (the same one you ran M5 in, at `../<repo>-m5`). Two runs of the same task are accessible from there: the un-packaged run on branch `m4/<slug>`, the packaged re-run on branch `m5/<slug>`, both visible via git refs since the worktree shares `.git` with the original repo. Both runs also left session transcripts under `~/.claude/projects/` in folders matching the original repo path. That's the auto-stored scrollback Claude Code keeps for every session.

Ask Claude to read both runs side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced.

**Prompt** *(Claude Code)*

```
I have two runs of the same long-running task on disk. Find them: the un-packaged run is on a branch starting with `m4/` (run `git branch -a | grep '/m4/'`); the packaged re-run is on a branch starting with `m5/`. The un-packaged run had no reference artefact, no plan.md, no verifier. The packaged re-run had all three pieces in play, verifier fired during the run.

Read both. Start with repo state: commits on the `m4/` branch after the "M4 starting point" commit, commits on the `m5/` branch after the worktree fork, what each run touched. Then read both session transcripts. Claude Code stores every session's scrollback under `~/.claude/projects/<encoded-folder>/<uuid>.jsonl` — the encoded-folder is the absolute path of the original repo (not this worktree) with `/` replaced by `-`. Use `git rev-parse --git-common-dir` to find the original repo path, then walk the un-packaged session's transcript and the packaged session's transcript. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.

Walk the diff across four dimensions:

- **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prevented a drift the un-packaged run actually experienced. Quote the un-packaged moment and the packaged moment both.
- **What packaging missed.** Places the packaged run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
- **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
- **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.

For every claim, quote a specific moment from the artefacts. Don't generalise.

End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.
```

Claude will likely open with a four-dimension plan summary (*"I'll start with repo state across the m4/ branch, then..."*) before any quoted evidence lands. Skim past the opening; the contrast moments are what you're reading for.

Push back where Claude generalises. Two runs means two bodies of evidence, and the teaching is in the contrast. If Claude writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted. Expect Claude to over-credit the packaging on first pass. A fair push-back is *"name one thing the verifier missed, concretely."*

You should close Phase 1 with a ranked gap list (three to five items) and a dominant gap that will shape Phase 2.

Two runs of the same task were the first real stress-test of `./CLAUDE.local.md`. Diagnosis surfaced rules that turned out wrong, never fired when they should have, or fired and made the run worse. Cleaning is the compound move that keeps the loop fast; rules-files have a half-life.

Ask Claude to cut one rule the two-run diagnosis killed, or to say so and stop if all rules held.

**Prompt** *(Claude Code, only if a rule earned cutting)*

```
Read ./CLAUDE.local.md. Read this session's scrollback: the gap list I just ranked, the un-packaged-vs-packaged contrast moments, the dominant gap. Find the one rule the two-run diagnosis showed is wrong, stale, or never fires when it should. Cut it from ./CLAUDE.local.md in place. Show me the line you cut, in two sentences why diagnosis killed it. If every rule still holds under diagnosis, say so and stop.
```

Claude may pause before editing `./CLAUDE.local.md`, a named config file looks risky to modify, or it may rewrite more than the one stale rule (*"in place"* is loose wording). If it asks, just say go. If the diff touches more than the one rule you flagged, push back.

---

## Phase 2: Author the session-shaper (~25–35 min)

Skills aren't hand-crafted. The move you practiced at M3 repeats here: author through conversation, push back on defaults, verify by invoking. The shape follows what the two runs demanded, not a template.

The three prompts below (author, critique, invoke) are decomposed for pacing. If you've run this move before and are working solo, collapse them: paste the first prompt and ask the same conversation to critique before save and invoke after. The three moves don't change.

Three common shapes from the convergence of practitioners running long tasks:

- **Sharpened verifier.** The M5 verifier targeted one failure mode; the diff surfaced another. The skill encodes the second check so the next run inherits both.
- **LLM-judge.** Qualitative fit the deterministic verifier can't see (did the output answer the task, does the tone match the codebase, does the commit message respect the team's convention). A judge is a verifier authored in prose.
- **Gap-finder.** A skill that reads a proposed task plan and flags thin memory, missing connectors, or stale rules before the long-running run starts. The verifier fires on output; the gap-finder fires before.

Pick the one the diff points at. If the dominant gap is "verifier missed drift at hour 4," you're building a sharpened verifier. If it's "output technically passed but read off," you're building a judge. If it's "the run shouldn't have started with this context," you're building a gap-finder.

Author through conversation. No markdown editor, no hand-crafting SKILL.md in a file tab.

**Prompt** *(Claude Code)*

```
Author a session-shaper as a personal skill. The skill's job is to shape future sessions on this kind of task so the dominant gap I diagnosed in Phase 1 doesn't recur. Shape: one of sharpened-verifier, LLM-judge, or gap-finder — I'll tell you which after you ask. Same authoring approach as the test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`.

Interview me one question at a time. Cover: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in terms I can defend to a teammate, what to flag vs. what to let through, how it outputs (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.

Push back when my answer is generic. A judge that says "check if the output is good" is useless; a verifier that duplicates the existing test suite is noise. Codebase-specific and failure-specific.

When you have enough, propose a skill name. Write `~/.claude/skills/<proposed-name>/SKILL.md`: frontmatter (name + description), then instructions. Show me before saving.
```

If Claude shows you the full question list up front instead of asking one at a time, ask it to use the AskUserQuestion tool, or to ask one and wait. Your call.

Answer each question. When Claude offers a default that doesn't fit the two runs' evidence, push back with a quoted moment: *"no, the M5 verifier missed THIS moment. The skill has to catch that shape specifically."*

Once Claude shows you SKILL.md, self-critique before shipping. Default-acceptance is the failure mode here too.

**Prompt** *(Claude Code)*

```
Before I ship this skill, critique it. Read the SKILL.md you just wrote. Tell me:

- What's the weakest part? Name the assumption most likely to be wrong for my codebase, or the section a teammate would push back on first.
- Is there anything generic dressed up as codebase-specific? Advice a pyramid-shaped test book would give, or a verifier template from a blog post.
- Is there anything from the two runs' diff that didn't make it into the skill? A quoted failure moment I named in Phase 1 that would sharpen the skill if it were encoded?

Don't reassure me. Name weak parts.
```

This critique runs in the same session that authored the SKILL.md, convenient (the authoring context is right there) but charitable (same-context-window self-audit under-flags by design). You can make the critique sharper: ask Claude to over-flag (*"flag at least three things, be harsher than necessary, assume worse than it looks"*), or fresh-session it (dispatch a subagent with the SKILL.md pasted cold, no scrollback). The default keeps it in-session for evidence access; opt up if the read matters.

Read the critique. Push back where Claude is wrong; accept where Claude is right. Claude revises SKILL.md from your push-back.

Now invoke the skill on the packaged run you just diffed. Authoring without invocation is theatre.

**Prompt** *(Claude Code)*

```
Invoke the skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.

Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).

Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?
```

This prompt asks Claude to invoke a skill it just helped author AND grade the result in the same turn. That's biased by design, the same context window self-charity is well-documented. We picked it for convenience: one paste, one wait, one read. If you want a harsher read, run it as two prompts: invoke first, read the output, then a second prompt that says *"Read that output as if you'd never seen the SKILL.md. What did the skill miss?"* Your call.

If the output doesn't catch the dominant gap, sharpen the skill itself and invoke again. If the skill names its own limitation (*"I check drift but not context-rot re-derivations"*), that's a feature. Ship with a one-line TODO at the top. A skill that names its gap is more useful to a teammate than one that pretends it's finished.

The skill ships personally. It lives at `~/.claude/skills/<skill-name>/SKILL.md` and auto-discovers in every future session you run, across every repo. That's the ship.

**Team-kit candidate, via human conversation.** If the skill encodes something your whole team would benefit from, a codebase-specific judge, a verifier against a house style, a gap-finder tuned to the team's project shape, it's a strong PR candidate. But the PR starts with a conversation. Show it to a teammate over coffee. Post it in the channel. Ask: *"does this match how you'd check this kind of work?"* If they say yes, PR it. If they push back, you got the real review for free. Agents don't unilaterally change shared team infrastructure. You do.

<!-- maintainer -->

**Quality:** compendium-audited 2026-04-25
- compendium-audited 2026-04-25 (check_writing, check_student_facing, check_prompts, check_pedagogy)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Word count:** ~830 words body.

**Primary Bloom's level:** Analyze (Phase 1 diff) + Create (Phase 2 authoring) + Evaluate (Phase 2 self-critique + invocation-as-test).

**Time budget total:** 40–50 min. Phase 1 compressed (diff + name-gaps share one phase); Phase 2 carries the module's weight. Forward-looking arc-retrospective beat (separate exercise file) follows.

**Mood target:** practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* You've now authored two skills the same way. The move is yours. Watch-for: compliance-feel (student treats the skill as paperwork) or credibility-performance (*"we ship skills like the pros do"*). Both steal the mood.

**Frameworks riffed on:**
- **Diff across two runs** (Phase 1) — the pedagogy of the M4→M5 contrast extended; same artefact-quotation discipline from M5's *Diagnose and re-send*.
- **Author through conversation** (Phase 2) — repeats the M3 *Author your test-strategy skill* move. Second rep; faster. Kieran Klaassen's compound-engineering Review + Compound step across two runs of the same task.
- **Three skill shapes** (Phase 2) — convergent practitioner vocabulary across Ramp Dojo, Intercom Tier 1/2/3, and solo builders running long tasks. Menu form; shape follows evidence.
- **Personal-first, team-promotion-via-human-conversation** — AE101 delivery-architecture rule. Skills ship to `~/.claude/skills/` first; team PRs start with a human conversation.

**Failure modes + diagnostics:**
- **Phase 1 generalised diff** — student says *"M5 was better"* without quoted moments. Diagnostic: prompt requires quoted moments from BOTH runs. If Claude returns only summaries, re-run with explicit quote enforcement. Echoes M5's Phase 1 diagnostic.
- **Phase 1 packaging-over-credit** — student treats the packaged run as fully solved and skips the *"what packaging missed"* beat. Diagnostic: the M5 run did drift somewhere; if Phase 1 outputs zero misses, Claude is over-crediting. Nerd: *"name one thing the verifier missed, concretely. Quote the scrollback."*
- **Phase 2 skill-shape mismatch** — student picks the shape they're most comfortable building (usually verifier) regardless of what the diff pointed at. Diagnostic: does the skill fire on the gap you ranked dominant? If not, re-scope.
- **Phase 2 default-acceptance** — student ships Claude's first draft of SKILL.md without the self-critique beat. Diagnostic: the skill reads like a blog-post template. Nerd enforces the critique prompt.
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
- **Phase 2 question loop >15 min** — Claude is asking too many questions or the student is answering generically. Nerd: *"answer one with a quote from the diff instead."*
- **Phase 2 >35 min** — gold-plating. The skill is good enough when it catches the dominant gap on invocation. Ship with a TODO; refine later.
- **Whole-room mood below 7** — practitioner fluency isn't landing. Check Phase 2 invocation: did the skill fire on the packaged run? If not, the encode step didn't close — student doesn't feel *"I know how to encode"* because they didn't see the skill work.

**Watch-fors (cross-phase):**
- **Skill path leaking into invocation** — if the student pastes `~/.claude/skills/<name>/SKILL.md` into a prompt as an invocation target, catch it. Claude Code auto-discovers; say *"invoke the `<name>` skill on the M5 re-run."* Path is noise at best, breakage at worst.
- **Team-PR auto-commit** — Claude volunteers to open the PR. Human conversation first; agent drafts the message afterwards. This is the M3 rule extending.
- **Verifier-as-eval terminology leaking** — the closing lecture names evals with full weight (verifier = judge = gate = eval). Phase 2 can use the plain words (verifier, judge); save the explicit naming for the closer.
- **Markdown-editor drift** — the authoring move is conversation. Every time.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.

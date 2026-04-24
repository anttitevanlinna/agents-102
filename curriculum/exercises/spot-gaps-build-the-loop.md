# Spot gaps, build the loop

**What you do:** Diff the packaged M5 re-run against the un-packaged M4 baseline. Name what packaging caught, what it missed, and what new gaps surfaced. Then author the second skill through conversation. Shape follows what the two runs taught. Self-critique, invoke on the packaged run, ship personally.

**What happens:** You end with a one-screen gap map across memory / verifier / rules / skill, and one SKILL.md file at `~/.claude/skills/<skill-name>/SKILL.md`. Auto-discovered in every future session. Whichever shape the two runs demanded: a sharpened verifier, an LLM-judge, or a gap-finder. Team-kit candidates flagged for a human conversation, not an auto-PR.

**The point:** The authoring move repeats. You ran it at M3 on a test-strategy skill; you run it again here with two runs' evidence in hand. Same move, faster. The learning wheel turns. You tested at M4, learned at M5, and you encode at M6. The skill you ship tonight is how next week's run inherits what this week's two runs cost you.

**Time:** 40–50 minutes inside a 2h module slot.

---

## Phase 1: Diff and name the gaps (~15 min)

Open a new Claude Code session in the same repo. Two runs of the same task are on disk now: the M4 un-packaged run (baseline, no reference artefact, no plan.md, no verifier), and the M5 packaged re-run (same task, all three pieces in play). Both runs left commits, file changes, and session transcripts at `~/.claude/projects/<project-folder>/`. That's the auto-stored scrollback Claude Code keeps for every session.

Ask Claude to read both runs side by side and name where packaging caught, where it missed, and what new shapes of drift it introduced.

**Prompt** *(copy → Claude Code)*

```
I have two runs of the same multi-hour task on disk. The M4 run was un-packaged — no reference artefact, no plan.md, no verifier. The M5 run was packaged — all three pieces in play, verifier fired during the run.

Read both. Start with repo state: commits since M4 send-off, commits since M5 re-send, what each run touched. Then read both session transcripts under `~/.claude/projects/<project-folder>/`. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.

Walk the diff across four dimensions:

- **What packaging caught.** Specific moments in the M5 run where the reference, the plan.md, or the verifier prevented a drift the M4 run actually experienced. Quote the un-packaged moment and the packaged moment both.
- **What packaging missed.** Places the M5 run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
- **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
- **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.

For every claim, quote a specific moment from the artefacts. Don't generalise.

End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.
```

*(end of prompt)*

Push back where Claude generalises. Two runs means two bodies of evidence, and the teaching is in the contrast. If Claude writes *"the agent drifted on goal"* without naming which commit, which file, which scrollback line, re-run the prompt with the quote rule re-asserted. Expect Claude to over-credit the packaging on first pass. A fair push-back is *"name one thing the verifier missed, concretely."*

You should close Phase 1 with a ranked gap list (three to five items) and a dominant gap that will shape Phase 2.

---

## Phase 2: Author the second skill (~25–35 min)

Skills aren't hand-crafted. The move you practiced at M3 repeats here: author through conversation, push back on defaults, verify by invoking. The shape follows what the two runs demanded, not a template.

Three common shapes from the convergence of practitioners running long tasks:

- **Sharpened verifier.** The M5 verifier targeted one failure mode; the diff surfaced another. The skill encodes the second check so the next run inherits both.
- **LLM-judge.** Qualitative fit the deterministic verifier can't see (did the output answer the task, does the tone match the codebase, does the commit message respect the team's convention). A judge is a verifier authored in prose.
- **Gap-finder.** A skill that reads a proposed task plan and flags thin memory, missing connectors, or stale rules before the long-running run starts. The verifier fires on output; the gap-finder fires before.

Pick the one the diff points at. If the dominant gap is "verifier missed drift at hour 4," you're building a sharpened verifier. If it's "output technically passed but read off," you're building a judge. If it's "the run shouldn't have started with this context," you're building a gap-finder.

Author through conversation. No markdown editor, no hand-crafting SKILL.md in a file tab.

**Prompt** *(copy → Claude Code)*

```
I want to author a skill for my personal kit. Shape: one of sharpened-verifier, LLM-judge, or gap-finder. I'll tell you which after you ask me. This is the second skill I've authored this way; the first was my test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`, author it in the same shape.

Ask me the questions you need to encode this skill well for my codebase and my workflow. Cover at minimum: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in concrete terms I can defend to a teammate, what it should flag vs. what it should let through, how it should output (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.

Ask ONE question at a time. Wait for my reply. Push back when my answer is generic. A judge that says "check if the output is good" is useless. A verifier that duplicates the existing test suite is noise. I need codebase-specific and failure-specific detail.

When you have enough, write SKILL.md at `~/.claude/skills/<skill-name>/SKILL.md`. You propose the skill name from what we encoded. Frontmatter (name + description) then instructions. Show me before saving.
```

*(end of prompt)*

Answer each question. When Claude offers a default that doesn't fit the two runs' evidence, push back with a quoted moment: *"no, the M5 verifier missed THIS moment. The skill has to catch that shape specifically."*

Once Claude shows you SKILL.md, self-critique before shipping. Default-acceptance is the failure mode here too.

**Prompt** *(copy → Claude Code)*

```
Before I ship this skill, critique it. Read the SKILL.md you just wrote. Tell me:

- What's the weakest part? Name the assumption most likely to be wrong for my codebase, or the section a teammate would push back on first.
- Is there anything generic dressed up as codebase-specific? Advice a pyramid-shaped test book would give, or a verifier template from a blog post.
- Is there anything from the two runs' diff that didn't make it into the skill? A quoted failure moment I named in Phase 1 that would sharpen the skill if it were encoded?

Don't reassure me. Name weak parts.
```

*(end of prompt)*

Read the critique. Push back where Claude is wrong; accept where Claude is right. Claude revises SKILL.md from your push-back.

Now invoke the skill on the packaged run you just diffed. Authoring without invocation is theatre.

**Prompt** *(copy → Claude Code)*

```
Invoke the skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.

Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).

Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?
```

*(end of prompt)*

If the output doesn't catch the dominant gap, sharpen the skill itself and invoke again. If the skill names its own limitation (*"I check drift but not context-rot re-derivations"*), that's a feature. Ship with a one-line TODO at the top. A skill that names its gap is more useful to a teammate than one that pretends it's finished.

The skill ships personally. It lives at `~/.claude/skills/<skill-name>/SKILL.md` and auto-discovers in every future session you run, across every repo. That's the ship.

**Team-kit candidate, via human conversation.** If the skill encodes something your whole team would benefit from — a codebase-specific judge, a verifier against a house style, a gap-finder tuned to the team's project shape — it's a strong PR candidate. But the PR starts with a conversation. Show it to a teammate over coffee. Post it in the channel. Ask: *"does this match how you'd check this kind of work?"* If they say yes, PR it. If they push back, you got the real review for free. Agents don't unilaterally change shared team infrastructure. You do.

<!-- maintainer -->

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

**TODO (from pre-ship verifier pass):**
- Three-persona sim against the exercise (Maija mid-competent / Greg opinionated senior / Jin fast operator); confirm the skill-shape-picking beat clears 8 across archetypes. Greg is the risk — will want to build a 5-check verifier; Phase 2 cap matters.
- Eval instance: `curriculum/evals/instances/agentic-engineering-101--spot-gaps-build-the-loop.md` to be filled before first cohort.
- Worked-example skill triplet (sharpened-verifier / LLM-judge / gap-finder) for the Nerd's reference library, by engineer archetype.

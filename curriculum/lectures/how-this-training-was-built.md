# How this training was built

What follows is Antti's story of building this training, in his own words.

At start, this training was bulletpoints. A strategy doc, seven headings, thirty bullets: the sort of list that makes you feel like you understand something and then realise you don't.

## Wrong is how steering gets in

The thirty bulletpoints became module prototypes, and all of them were wrong. Not wrong the way a bad draft is wrong, where someone missed the point. Wrong the way any first version is wrong: plausible, coherent, reading fine until you hold it next to what the training was actually for. Then the gap showed up. Every time. The gap turned out to be the valuable part; if the first draft had been right, there would have been nothing to push on.

Each wrongness was specific and namable. A phrase that smuggled consultancy-voice into an engineering lecture. An exercise that asked a real engineer to do something insulting. A module that wanted to feel tidy where the feeling should have been unease. Each thing pointed at turned into a rule. *"Forcing functions stay, scripted reactions go."* *"Every prompt block gets a one-sentence lead-in with a command verb."* *"Every claim about Claude Code gets re-checked before each cohort."*

The rules were not right the first time either. Some were overscoped. Some fired on the wrong surface. Some held for one kind of content and broke for another. They got sharpened the same way the drafts did: used, corrected, rewritten.

## The rules started doing the work

Rules in a file Claude Code could read stopped being reminders and became load-bearing. Claude Code opens a session, loads the rules, plans inside them. A subagent dispatched to check a draft starts with them loaded too. Load-bearing, not leak-proof: a loaded rule still slips out of the output sometimes, and the checking that follows exists because it does.

The difference is reach. A rule written down is a thing one person knows. A rule in `./CLAUDE.md` is a thing every session inherits. A rule in a shared checklist is a thing every dispatched subagent is handed before it writes a word.

The rules compounded. Learning compounded to make better rules. More rules, more pointed. The strategy doc that started as bulletpoints grew a companion checklist for every kind of writing it produced (lectures, exercises, sales pages), each loaded at the moment it matters and no other moment.

## Then the agents started checking the agents

The edits to the training got bigger. One person fixing one line became plan mode reshaping a whole file, then a subagent (a Claude instance with fresh context for independent analysis) auditing that file against a checklist in the background, then four agents in parallel auditing a file against four checklists while a fifth checked the neighbouring files.

Work-per-session went up, and care-per-line went up with it. Sweeping changes that would have taken a week got made in an afternoon, because the rules were tight enough to hand off. Every session inherited what the last one figured out, and each one could take on bigger work than the last.

## Built to forgive

One more design decision is worth knowing before the modules stack up. Each module leaves artifacts behind that later ones pick up: a rules file here, maps and skills and notes further in. The prompts downstream check what exists and work with what they find. A missing file is a detail, not a debt; any artifact in this training can be rebuilt in minutes.

What a later module actually needs is the understanding the artifact condensed: why the test came before the fix, what a correction is worth once it is written down. **Understanding is the artifact.** Files can be re-made from it at any point; the reverse is not true.

So a slot that runs short costs a file at most, never the thread. Take the understanding forward; the unfinished part waits in the workbook.

## You just ran the compound loop

The story of building this training is the shape you just ran on your own repo. Over ninety minutes, not a year. On a trivial bug, not a whole training. The first read was partly wrong, and the wrongness was the way in: you let Claude read your repo, saw the wrongness, named it, corrected it. That correction turned into a rule.

The rule sits in `./CLAUDE.local.md`, which is yours. Gitignored, alongside you, read by every future session in this repo. By the end of the training it grows into a rules file shaped by how you actually worked: grown from evidence, not from a blank page or a trainer's template.

The pattern has a name. Kieran Klaassen at Every calls it **compound engineering**. The retro you just ran was the compound step of his loop: plan, work, review, compound. That is the orient, fix, compound, close loop cut at different joints; the names differ, the loop doesn't. Mental models only come from doing, and you just did. Compound engineering an hour ago was a name. Now it's a loop you ran on your own repo.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Standing constraints:**
- **The opening narrator-frame line names Antti — deliberate rule-6 exception (maintainer call 2026-08-01).** The lecture is a first-hand account; the frame line converts a non-author trainer from witness to narrator ("read the document, don't perform it"). The creator-name lint will flag it; do not strip. Singular by instruction ("not builders — nor were there many").
- **Zero map references.** M1 is map-protected; the Field Map does not appear on this surface.
- **No cross-module sequencing** (`check_lectures.md §3`). The module file's `## Next` carries the bridge. The two arc-range lines that stay ("maps and skills and notes further in", "By the end of the training…") ride the §3 arc-lecture carve-out: the subject is the training's own arc.
- **Narrative slides are prose paragraphs, not bolded-claim bullets** (`theory-plan.md § Slide format — emphasis budget`, `check_slides.md §9`). One bold survives — **compound engineering**, the coined-term handle at the naming beat — plus the **Understanding is the artifact** handle on *Built to forgive*. That is the whole budget.
- **The opening paragraph is a setup lede**, allowed here under the closer carve-out.
- **Klaassen is named once** on the student surface. The cap is deliberate.
- **The load-bearing/leaky pairing is reconciled with M6's memo** ("a rule in context is not a rule in the output"). Both halves must stay: a loaded rule is load-bearing AND leaks, and the checking exists because of the leak. The M6 memo line is no-polish — do not edit it to match.
- **File is size-gate exempt** (story lecture).
- **Plan mode is named here, never explained.** M2 owns it. A gloss on this surface teaches ahead of the module and is the wrong place to get precise about what plan mode blocks (edits, not execution).
- **`Built to forgive` promises artifacts are rebuildable.** The promise holds only while every cross-module edge onto an M1–M3 artifact stays `conditional:`. A prompt that hard-requires an artifact unconditionally breaks this slide — check here first. Re-check command in the backing block under `prompt-registry-conditional-edges`.

**Quality:** compendium-audited 2026-07-26 (writing@9697944 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@b3143a4) — SHAs stale against current body; re-audit before ship.
- judges @9697944: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Understand (the compound loop as a pattern, before running it).
- **Time band:** 5–7 min closer inside M1's 2h slot. Shorter than the 10–15 min default because it frames rather than teaches; the exercises did the teaching.
- **Arc position:** closes M1, after `compound-and-close` (Ex3) and before the Bridge to M2. Pairs with the opener stack (`painting-the-picture-with-the-llm` sets the frame; `the-wizard-move` runs the demo): the openers show the ceiling before the student runs the loop; this one names the pattern after they have lived through it. The meta-frame only lands once the student has the muscle memory.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the lecture IS the theme, told as a first-person story about the training itself.
- **Theme 3 (mirror)** — Claude's first read of your repo will be partly wrong; you will see yourself in the wrongness.
- **Theme 4 (self-aware, grain of salt)** — the rules weren't right the first time either; they improved through use.

**Watch-fors:**
- **Lecture reads as trainer-warmth.** Register drift is easy on a lecture that is literally about the training. Senior-opinionated readers hallucinate motivational lines that aren't there. Keep it peer-to-peer: story of work, not story of achievement.
- **Bulletpoint → rule arc lands flat without a specific example.** The three rule-quotes in the middle are load-bearing. They make the abstract claim ("steering codified into rules") concrete. Do not cut them without a replacement.

**Register check:**
- No em-dashes (check_student_facing § 14).
- No banned words (check_writing): `honest` / `delve` / `landscape` verb / `importantly` / `crucial` / `substrate` / `ritual` / `practice` noun / `ceremony` — zero matches.
- Engineer-audience: technical terms (`subagent`, `compendium`, `plan mode`) acceptable per AE101 register; Agents 101 business-audience ban does not apply.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `training-began-as-bulletpoints` · detail · "At start, this training was bulletpoints. A strategy doc, seven headings, thirty bullets" ← training-construction
- `first-drafts-were-all-wrong` · detail · "The thirty bulletpoints became module prototypes, and all of them were wrong" ← training-construction
- `the-gap-was-the-value` · vision · "The gap turned out to be the valuable part" ← none-owed
- `corrections-became-rules` · detail · the three quoted rules at *Wrong is how steering gets in* ← compendium-rule-quotes
- `rules-are-load-bearing` · detail · "Rules in a file Claude Code could read stopped being reminders and became load-bearing" ← claude-md-autoload, klaassen-folder-is-the-agent
- `claude-md-reaches-every-session` · detail · "A rule in `./CLAUDE.md` is a thing every session inherits" ← claude-md-autoload
- `subagent-inherits-rules` · detail · "A subagent dispatched to check a draft starts with them loaded too" ← subagent-context-inheritance
- `checklists-are-handed-over` · detail · "A rule in a shared checklist is a thing every dispatched subagent is handed before it writes a word" ← subagent-context-inheritance
- `rules-leak` · detail · "Load-bearing, not leak-proof: a loaded rule still slips out of the output sometimes" ← training-construction
- `parallel-audit-agents` · detail · "four agents in parallel auditing a file against four checklists while a fifth checked the neighbouring files" ← training-construction, subagent-concurrency, klaassen-parallel-reviewers
- `week-became-afternoon` · detail · "Sweeping changes that would have taken a week got made in an afternoon" ← training-construction
- `artifacts-are-rebuildable` · detail · "A missing file is a detail, not a debt; any artifact in this training can be rebuilt in minutes" ← prompt-registry-conditional-edges
- `understanding-is-the-artifact` · vision · "**Understanding is the artifact.**" ← none-owed
- `claude-local-md-is-yours` · detail · "Gitignored, alongside you, read by every future session in this repo" ← claude-local-md-autoload
- `klaassen-names-it` · borrowed · "Kieran Klaassen at Every calls it **compound engineering**" ← klaassen-definitive-guide
- `retro-is-the-compound-step` · detail · "The retro you just ran was the compound step of his loop: plan, work, review, compound" ← klaassen-four-step, klaassen-expanded-loop
- `same-loop-different-joints` · vision · "That is the orient, fix, compound, close loop cut at different joints; the names differ, the loop doesn't" ← none-owed
- `mental-models-from-doing` · vision · "Mental models only come from doing, and you just did" ← none-owed
- `loop-is-the-shape` · vision · "The loop is the shape. The bug today was the excuse." ← none-owed

**Sources**
- training-construction `[checked:2026-07-30 result:ATTESTED due:none]` attested:Antti 2026-04→2026-07 building-AE101 — [maintainer-attested] The whole narrative spine is the author's first-hand account of building this training: the bulletpoint origin, the wrong prototypes, the rules that got sharpened by use, the leak that keeps checking necessary, the five-agent audit fan-out, the week-that-became-an-afternoon. Best evidence on the ladder; the practitioner is us. **`week-became-afternoon` is N=1 and is not a rate** — it is one person's account of one class of change on one corpus, with no denominator and no metric axis (`check_research_claims.md §12`). Do not let it harden into "5x" anywhere. fallback: none needed; attested claims do not decay.
- compendium-rule-quotes `[checked:2026-07-30 result:OK due:cohort]` `memory/check_*.md` — [maintainer-attested] The body quotes three rules as verbatim products of building this training, and all three now resolve against a real compendium entry: *"Forcing functions stay, scripted reactions go"* is verbatim `check_pedagogy.md §16`; *"Every prompt block gets a one-sentence lead-in with a command verb"* ≈ `check_prompts.md §2`; *"Every claim about Claude Code gets re-checked before each cohort"* is `check_research_claims.md §11a`'s `due:cohort`. **These are quoted as true, so they must stay true.** A compendium rewording breaks them silently — nothing links the two files. Re-check: grep each quoted phrase against `memory/check_*.md` before any cohort. **Never invent a rule here to make a point land**, and never quote a standard stricter than the one we keep; a lecture whose subject is this training's own construction is exactly where a flattering invention does the most damage. fallback: any three real rules spanning pedagogy, formatting and research — the spread is what the beat needs, not these particular three.
- claude-md-autoload `[checked:2026-07-30 result:OK due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] *"Claude reads them at the start of every session."* Documented load order, broadest to narrowest: managed policy → user (`~/.claude/CLAUDE.md`) → project (`./CLAUDE.md` or `./.claude/CLAUDE.md`) → local (`./CLAUDE.local.md`). Off the evidence ladder — a product-capability fact, not a study. fallback: none; if auto-load ever stops, the lecture's middle section loses its mechanism and needs rebuilding, not rewording.
- claude-local-md-autoload `[checked:2026-07-30 result:CAVEAT due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] **`CLAUDE.local.md` is NOT deprecated.** Current first-class row in the memory table (*"Local instructions | `./CLAUDE.local.md` | Personal project-specific preferences; add to `.gitignore`"*), and the local CLI changelog cache carries zero deprecation entries for it (CLI 2.1.220). Auto-load confirmed: *"CLAUDE.md and CLAUDE.local.md files in the directory hierarchy above the working directory are loaded in full at launch"* and *"Within each directory, `CLAUDE.local.md` is appended after `CLAUDE.md`."* CAVEAT on one word only: **Claude Code does not gitignore it for you** by default — *"Add `CLAUDE.local.md` to your `.gitignore` so it isn't committed"* (automatic only under the opt-in `CLAUDE_CODE_NEW_INIT=1` `/init` personal flow). The body's "Gitignored" still holds, because **our own M1 prompt does it**: `compound-and-close-1` instructs *"add it to .gitignore if it's not already."* fallback: none. The sentence is true of the student's file; just never let it be re-read as a platform default.
- subagent-context-inheritance `[checked:2026-07-30 result:OK due:cohort]` https://code.claude.com/docs/en/sub-agents.md — [capability] Backs both subagent claims, and they are deliberately different mechanisms: `CLAUDE.md` arrives on its own, a shared checklist does not (`memory/check_*.md` is outside the four auto-load surfaces, so it genuinely must be handed over at dispatch). Verbatim: *"A non-fork subagent's initial context contains: … **CLAUDE.md files**: every level of the CLAUDE.md hierarchy the main conversation loads, including `~/.claude/CLAUDE.md`, project rules, `CLAUDE.local.md`, and managed policy files. The built-in Explore and Plan agents skip this."* And: *"Explore and Plan are the only subagents that omit CLAUDE.md and git status."* Live-probed the same day rather than taken from docs (`check_platform_and_boundaries.md §5a`): a dispatched general-purpose subagent, **zero tool calls**, quoted this repo's `CLAUDE.md` heading, its `Curate → Connect → Advise` motto, the section list, `.claude/rules/content-rules.md`, and the user-level `~/.claude/CLAUDE.md` voice instruction. It did **not** see `continuous-research/research-rules.md` — that path is not an auto-load surface, so prepending is still required for research agents specifically. fallback: the lecture's point survives the correction intact and gets stronger — the reach is wider than the body claims, not narrower.
- subagent-concurrency `[checked:2026-07-30 result:OK due:cohort]` https://code.claude.com/docs/en/sub-agents.md — [capability] *"By default, when 20 subagents are running in a session, spawning another with the Agent tool fails."* Five concurrent is well inside the cap. fallback: none.
- prompt-registry-conditional-edges `[checked:2026-07-30 result:OK due:cohort]` `curriculum/prompts/` — [maintainer-attested] Machine-checked, not eyeballed. `claude-local-md` is produced by `compound-and-close-1` and consumed by six downstream prompts (`ae101-m3-sharpen-skill`, `ae101-m4-take-task-end-to-end`, `ae101-m5-rerun-packaged`, `diagnose-and-resend-6`, `spot-gaps-build-the-loop-2`, `walk-and-send-off-2`); **all six carry `conditional: m1-completed`.** The seventh consumer, `compound-and-close-4`, is same-module and needs no condition. Re-check: `grep -rn "conditional:" curriculum/prompts/ | grep -v a101-`, then confirm each `claude-local-md` requires-edge still has one. fallback: none — if an edge goes unconditional, fix the prompt, not the lecture.
- klaassen-definitive-guide `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen, Feb 9 2026. **Sole byline** (bio: *"general manager of Cora, Every's email product"*), first person throughout (*"When I started building Cora…"*) — not a write-up about him. Verbatim: *"The core philosophy of compound engineering is that each unit of engineering work should make subsequent units easier—not harder."* **The four-step loop is NOT on this page** — do not cite it for the step names; that is a live misattribution elsewhere in the corpus. kb:observations/kieran-klaassen.md fallback: keep "Kieran Klaassen at Every calls it compound engineering" and source the steps from the how-Every-codes piece.
- klaassen-four-step `[checked:2026-07-30 result:CAVEAT due:cohort]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] **Co-bylined** Dan Shipper + Kieran Klaassen (`authors: [Dan Shipper, Kieran Klaassen]`), first-person-plural throughout (*"we've created," "We run five software products"*) — genuine co-authorship, so `[practitioner direct]`, not Shipper-on-Klaassen. Dec 11 2025. Carries the four steps verbatim and in printed order: *"Plan:* … *Work:* … *Review:* … *Compound: The engineer feeds the results back into the system…"* Note the division of labour in the source: Plan and Work are done by *"Agents"*, Review and Compound by *"The engineer"* — which is the lecture's move exactly. Also verbatim, and quote it with the first word: *"Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound"* (word form, not "80%"). CAVEAT: this is the **Dec 2025 framing, since expanded** — see klaassen-expanded-loop. It is the origin, not the current shape. Carries one vendor-self-reported metric (*"a single developer can do the work of five developers a few years ago, based on our experience at Every"*) — not cited here, do not import it. kb:observations/kieran-klaassen.md fallback: cite as the framework's origin and drop the ordinal.
- klaassen-expanded-loop `[checked:2026-07-31 result:OK due:2027-01-31]` https://every.to/p/compound-engineering-gets-an-upgrade — [practitioner direct, vendor venue] Klaassen, May 29 2026. **The loop is no longer four steps.** Printed sequence: *"Ideate → brainstorm → plan → work → review → polish → compound → repeat"* — seven named stages plus a cyclical repeat, putting **compound seventh and `work` fourth**. Klaassen's own prose counts the expansion as *"from four steps to eight"*, which only reconciles if `repeat` is counted as a stage in the new framing and not in the old; the printed arrow-sequence is what this stamp holds to. Still his current loop as of his most recent post, *How I Polish Software That Agents Built* (https://every.to/source-code/how-i-polish-software-that-agents-built, Jul 13 2026), which uses the same stage names in fragments — *"Plan dispatches subagents to draft a structured specification. Review fans out parallel reviewers"* — and introduces no new one. Presented as evolution under the same name, not retraction: *"As the models have grown more capable, the original compound engineering loop started to feel incomplete… So I expanded the loop."* The name, the mechanism and the attribution all hold; only the ordinal moved. **Never attach an ordinal to this loop in body prose.** The body names the compound step instead of counting to it, which is why the expansion cost an edit here rather than a rewrite; the four names it lists all survive in the seven-step form. fallback: none needed while the body stays ordinal-free.
- klaassen-parallel-reviewers `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/how-i-polish-software-that-agents-built — [practitioner direct, vendor venue] Klaassen, Jul 13 2026, his most recent on this thread. *"Review fans out parallel reviewers, each looking for a different class of issue."* Independent practitioner echo of `parallel-audit-agents` — the lecture's five-agent fan-out is no longer only our own account. Also describes `/ce-compound` codifying preferences into rules the system then applies unprompted. fallback: drop; the beat is attested regardless.
- klaassen-folder-is-the-agent `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/the-folder-is-the-agent — [practitioner direct, vendor venue] Klaassen, Apr 13 2026. Describes `CLAUDE.md` / `AGENTS.md` as **"load-bearing"** — *"conventions and standards," "institutional knowledge," "operational memory."* The lecture reached the same word independently. fallback: drop; `claude-md-autoload` carries the mechanism on its own.

**Frameworks**
- Compound engineering · [borrow:practitioner-coined] · law:the-compound-ladder · ← klaassen-definitive-guide, klaassen-four-step, klaassen-expanded-loop
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab. The body's *"The rules were not right the first time either… They got sharpened the same way the drafts did"* is the double-loop move: the correction changes the rule, not just the draft. Argyris is **not named on this surface** and should not be — the lecture's one attribution slot belongs to Klaassen.

**Stance** `[stance:2026-07-30 level:L2]`
- holds: the mechanism the lecture describes is live, current, and independently practised. Klaassen calls persistent instruction files "load-bearing" (Apr 2026) and fans review out to parallel reviewers (Jul 2026) — both stages of the lecture's story, published by someone who is not us. The term "compound engineering" is unmoved: still his, still the same mechanism, no competing name found with practitioner traction. L2 and not higher on purpose — this is one origin practitioner plus our own attested account, which is two organisations, not convergence (`check_research_claims.md §4`).
- contested: nothing about whether the mechanism works. What is contested is **shape and ordinal**. Klaassen expanded his own loop from four steps to seven-plus-repeat in May 2026 while keeping the name, which is exactly the failure mode of citing a numbered step: the number is the part that rots, and it rotted quietly. Nobody found arguing the rules-file approach has broken down, but the hunt for that was one cycle and should not be read as settled.
- would-move-it: a named practitioner publishing that written rule files stopped working at scale — bloat, drift after model updates, or models ignoring them — with an observed case rather than a warning. That would take the lecture's whole middle section from "how it works" to "how it worked." Second falsifier, cheaper: Klaassen dropping the name.

**OODA**
- question: is the correction → rule → compounding loop still named "compound engineering" by its origin practitioner, and is the written-rules-file mechanism still what practitioners do rather than what they used to do? Bounded to attribution and mechanism. **Not** a general question about agent memory. **The ordinal is the fragile part** — any cycle that re-checks this file must re-count the steps in Klaassen's current framing before trusting a number in the body.
- roster: Kieran Klaassen and Dan Shipper (Every) first; Simon Willison for naming drift, since he tracks vocabulary and would flag a rename; Geoffrey Huntley and Armin Ronacher as the likeliest sources of counter-evidence on rules files. `platform-watch/coding-agents/state.md` for the platform half.
- last-run: 2026-07-30

<!-- /backing -->

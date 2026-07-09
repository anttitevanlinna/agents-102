# How this training was built

At start, this training was bulletpoints. A strategy doc, seven headings, thirty bullets: the sort of list that makes you feel like you understand something and then realise you don't.

## Wrong is how steering gets in

The thirty bulletpoints became module prototypes, and all of them were wrong. Not wrong the way a bad draft is wrong, where someone missed the point. Wrong the way any first version is wrong: plausible, coherent, reading fine until you hold it next to what the training was actually for. Then the gap showed up. Every time. The gap turned out to be the valuable part; if the first draft had been right, there would have been nothing to push on.

Each wrongness was specific and namable. A phrase that smuggled consultancy-voice into an engineering lecture. An exercise that asked a real engineer to do something insulting. A module that wanted to feel tidy where the feeling should have been unease. Each thing pointed at turned into a rule. *"Don't end a module with three scripted questions."* *"Every prompt block gets a one-sentence lead-in with a command verb."* *"Every claim about Claude Code must have been verified within the last month."*

The rules were not right the first time either. Some were overscoped. Some fired on the wrong surface. Some held for one kind of content and broke for another. They got sharpened the same way the drafts did: used, corrected, rewritten.

## The rules started doing the work

Rules in a file Claude Code could read stopped being reminders and became load-bearing. Claude Code opens a session, loads the rules, plans inside them. A subagent dispatched to check a draft is handed them in its brief by the session that dispatched it. Load-bearing, not leak-proof: a loaded rule still slips out of the output sometimes, and the checking that follows exists because it does.

The difference is reach. A rule written down is a thing one person knows. A rule in `./CLAUDE.md` is a thing every session inherits. A rule in a shared checklist is a thing every dispatched subagent is handed before it writes a word.

The rules compounded. Learning compounded to make better rules. More rules, more pointed. The strategy doc that started as bulletpoints grew a companion checklist for every kind of writing it produced (lectures, exercises, sales pages), each loaded at the moment it matters and no other moment.

## Then the agents started checking the agents

The edits to the training got bigger. One person fixing one line became plan mode reshaping a whole file, then a subagent auditing that file against a checklist in the background, then four agents in parallel auditing a file against four checklists while a fifth checked the neighbouring files.

Work-per-session went up, and care-per-line went up with it. Sweeping changes that would have taken a week got made in an afternoon, because the rules were tight enough to hand off. Every session inherited what the last one figured out, and each one could take on bigger work than the last.

## You just ran the compound loop

The story of building this training is the shape you just ran on your own repo. Over ninety minutes, not a year. On a trivial bug, not a whole training. The first read was partly wrong, and the wrongness was the way in: you let Claude read your repo, saw the wrongness, named it, corrected it. That correction turned into a rule.

The rule sits in `./CLAUDE.local.md`, which is yours. Gitignored, alongside you, read by every future session in this repo. By the end of the training it grows into a rules file shaped by how you actually worked: grown from evidence, not from a blank page or a trainer's template.

The pattern has a name. Kieran Klaassen at Every calls it **compound engineering**. The retro you just ran was step four of his loop: plan, work, review, compound. That is the orient, fix, compound, close loop cut at different joints; the names differ, the loop doesn't. Mental models only come from doing, and you just did. Compound engineering an hour ago was a name. Now it's a loop you ran on your own repo.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"; exemplar file):** narrative slides recast from bolded-claim bullets to prose paragraphs per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Sentences near-verbatim; no claims added or cut; the three rule-quotes kept (load-bearing per watch-for); kicker untouched. One bold survives: **compound engineering** (coined-term handle at the naming beat). Quality per-class SHAs predate this pass; re-audit before ship.

**Equation clause (2026-07-02):** theory completeness review Minor #3 — the middle loop wore four step-decompositions unequated; one clause added to the Klaassen bullet equating plan/work/review/compound with M1's orient → fix → compound → close (the sharpest collision: same module, same session). M3's orient/act/verify/compound sits in the locked `the-loop-half-filled.md`; the agent's act-observe-correct is a different altitude by design there.

**Reconciliation clause (2026-07-02):** theory completeness review Minor #4 — M1 "became load-bearing" vs M6 memo "a rule in context is not a rule in the output" were unreconciled; one clause added to the load-bearing bullet (load-bearing AND leaky; checking exists because of the leak). M6 memo line untouched per its no-polish note.

**Slides-only pass (2026-07-02, unaudited):** RE-CHUNK, not cull. Per-passage verdicts: opening paragraph KEPT as setup lede (closer carve-out), compressed to two sentences with content intact · intro paragraphs 2–4 FOLDED into slide-1 bullets · three rule-quotes KEPT inside one bullet (load-bearing per watch-for below) · *The rules started doing the work* / *agents checking agents* / *What you just did* CONVERTED one-to-one · **"The next module will extend it. The module after that will extend it again." CUT per `check_lectures §3`** (module sequencing; the module file's `## Next` already carries the CLAUDE.local.md-waiting bridge) and replaced with the mechanism it implied ("read by every future session in this repo" — CLAUDE.local.md auto-load, platform-true) · "By the end of the training..." KEPT (arc-range claim on a closer whose subject is the training's own arc; §3 carve-out) · Klaassen attribution KEPT (single student-side mention, cap respected) · kicker "The loop is the shape. The bug today was the excuse." KEPT. No new theory, zero map references (M1 protected). File is now lede + four slides + kicker.

**Quality:** compendium-audited 2026-07-08 (writing@3605eee slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy grandfathered, strategy grandfathered, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Understand (the compound loop as a pattern, before running it).
- **Time band:** 5–7 min closer inside M1's 2h slot. Shorter than the 10–15 min default because it frames rather than teaches; the exercises did the teaching.
- **Arc position:** closes M1, after `compound-and-close` (Ex3) and before the Bridge to M2. Pairs with the opener stack (`painting-the-picture-with-the-llm` sets the frame; `the-wizard-move` runs the demo): the openers show the ceiling before the student runs the loop; this one names the pattern after they have lived through it. The meta-frame only lands once the student has the muscle memory.

**Frameworks riffed on:**
- **Compound engineering** — Kieran Klaassen (Every Inc.) `[practitioner direct]`. Plan → Work → Review → Compound. Named at this lecture's close as the deterministic seam to Ex3's retro citation. The lecture tells the story experientially first; the practitioner lands at the end so the four-step term arrives after the student has run all four steps. Removes the prior gamble where Klaassen's name lived only in the retro prompt and depended on Claude reliably citing him.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen Definitive Guide (Feb 9 2026); "each unit of engineering work should make subsequent units easier" verified on page 2026-07-02. CAVEAT: the explicit plan/work/review/compound four-step naming is NOT verbatim on this page (see next stamp); source exits 6-mo window 2026-08-09. fallback: keep the compounding thesis + "Kieran Klaassen at Every calls it compound engineering"; source the step names from the how-Every-codes piece or phrase as "the four-step loop that runs through his work".
- `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper + Klaassen (Dec 11 2025); carries the four step names verbatim ("80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound") — this is the pin for the body's "plan, work, review, compound" line. CAVEAT: dated Dec 2025, already outside the 6-mo window — cite as the framework's origin, not fresh evidence; treat any Every.to outcome metric as vendor-self-reported. fallback: drop the verbatim step names, keep "the retro you just ran was the review-and-compound half of his loop".

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

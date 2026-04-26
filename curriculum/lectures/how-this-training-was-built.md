# How this training was built

A year ago, this training was bulletpoints. A strategy doc. Seven headings, thirty bullets, the sort of list that makes you feel like you understand something and then realise you don't.

The bullets became module prototypes. Little drafts of what the training might be. Storylines. First lectures. All of them wrong.

Not wrong in the way a bad draft is wrong, where someone missed the point. Wrong in the way any first version is wrong. Plausible, coherent, reading fine until you hold it next to what the training was actually for. Then the gap showed up. Every time.

That gap turned out to be the valuable part.

## Wrong is how steering gets in

If the first draft had been right, there would have been nothing to push on. The drafts were wrong in specific, namable ways. A phrase that smuggled consultancy-voice into an engineering lecture. An exercise that asked the student to do something a real engineer would find insulting. A module that wanted to feel tidy where the feeling should have been unease.

Each wrongness was a thing to point at. And each thing pointed at turned into a rule.

"Don't ask the student three scripted questions at the end of a module."
"Every prompt block gets a one-sentence lead-in with a command verb."
"Every claim about Claude Code must have been verified within the last month."

The rules were not right the first time either. Some were overscoped. Some fired on the wrong surface. Some only held for one kind of content and broke for another. They got sharpened the same way the drafts did: used, corrected, rewritten.

## The rules started doing the work

Once the rules lived in a file Claude Code could read, they stopped being reminders and started being load-bearing. Claude Code opens a session, loads the rules, plans inside them. A subagent dispatched to check a draft loads them too. The rules cross the boundary between the person writing them and the agents using them.

This is the move. A rule written down is a thing one person knows. A rule in `./CLAUDE.md` is a thing every session inherits. A rule promoted into a compendium is a thing every subagent reads before it writes a word.

The rules compounded. Learning compounded to make better rules. More rules, more pointed. The strategy doc that started as bulletpoints now has a companion compendium for every writing surface: student-facing, sales copy, pedagogy, writing, research claims, platform claims. Each fires at the moment it matters and no other moment.

## Then the agents started checking the agents

Somewhere along the way, the sessions got longer. What used to be one person in a thirty-minute turn became plan mode for an hour, then a subagent running in the background for two, then four agents in parallel auditing a file against four compendiums while a fifth checked the neighbours. The work-per-session went up. The care-per-line went up. Sweeping changes that would have taken a week got made in an afternoon because the rules were tight enough to hand off.

Every session got better. Every session reached for better scale. The next session inherited what the last one figured out.

## What you just did

That shape you just heard, told as a story over five minutes, is the shape you just ran on your own repo. Over ninety minutes, not a year. On a trivial bug, not a whole training.

You let Claude read your repo. The first read was partly wrong. You saw the wrongness, named it, corrected it. That correction turned into a rule. The rule sits in a file called `./CLAUDE.local.md`, which is yours, gitignored, alongside you. The next module will extend it. The module after that will extend it again.

By the end of the training, you will have a rules file shaped by how you actually worked. Not a rules file written from a blank page. Not a template the trainer handed you. Yours, grown from evidence.

The pattern has a name. Kieran Klaassen at Every calls it *compound engineering*. The retro you just ran was step four of his loop: plan, work, review, compound.

**Mental models only come from doing.** You just did.

The loop is the shape. The bug today was the excuse.

**Time:** 5–7 minutes.

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_lectures, check_strategy_tie_in)
**Meta (trainer):**
- **Primary Bloom's level:** Understand (the compound loop as a pattern, before running it).
- **Time band:** 5–7 min closer inside M1's 2h slot. Shorter than the 10–15 min default because it frames rather than teaches; the exercises did the teaching.
- **Arc position:** closes M1, after `compound-and-close` (Ex3) and before the Bridge to M2. Pairs with `the-wizard-move` lecture (demo-style opener): wizard-move shows the ceiling before the student runs the loop; this one names the pattern after they have lived through it. The meta-frame only lands once the student has the muscle memory.

**Frameworks riffed on:**
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Named at this lecture's close as the deterministic seam to Ex3's retro citation. The lecture tells the story experientially first; the practitioner lands at the end so the four-step term arrives after the student has run all four steps. Removes the prior gamble where Klaassen's name lived only in the retro prompt and depended on Claude reliably citing him.

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
- Engineer-audience: technical terms (`subagent`, `compendium`, `plan mode`) acceptable per AE101 register; Bootstrap business-audience ban does not apply.

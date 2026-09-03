# Compound and *close the loop*

**Time:** 15 minutes.

**What you do:** let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Push back where it misread.

**What you build:** a rules file written from session evidence. Concrete, specific, yours, and read at the top of every future session in this repo.

**The point:** every push-back is a hint toward your own rules.

The PR shipped and the ticket is closed. Now compound the session: make the next one easier with what this one taught. A rules file is the simplest place to start; later it will be a test, a doc, a check. No retro questionnaire: the session is the evidence.

The rules land in `./CLAUDE.local.md`, and the choice is deliberate. It is the simplest store for personal rules there is: one file, gitignored, read at the top of every session in this repo. And it parks the bigger question: where a team's rules and guardrails should live.

This file is a starter. Everyone sees how this will bloat almost immediately.

## Write your rules file from the session

- Claude reviews the whole scrollback in one shot and drafts your rules from how you actually worked.
- You are not drafting from a blank page.
- The tracker conventions count as evidence too. The field rules you read off your own ticket are in this scrollback, and this is where they land on disk.

> **Long session, long read.** If the review stalls or runs past a couple of minutes, interrupt with `Esc`, narrow to the orient and introspect phases first, and say `continue`. It fails the other way too: a summary that arrives fast and reads clean has usually covered the last few turns and skipped the rest. If nothing in it comes from the early part of the session, a `"there's more here"`-prompt buys another pass.

{{prompt:compound-and-close-1}}


## Push back where the summary misreads

- Read Claude's summary. Quote the specific session moment back at Claude.
- The rules file is yours now.

## Keep or revert the `.gitignore` edit

- If `CLAUDE.local.md` wasn't already ignored, the compound step added it to your `.gitignore`. That is an uncommitted change now; commit it, or drop it.

## Sweep the session into your rules file one more time

- One more pass before close. Anything earned since the first compound pass (the push-backs, the rules you rewrote) that didn't land yet?
- A heads-up that you are about to compact or end the session flushes out work in progress. Claude writes down what it was still holding.

Ask Claude to sweep the session for anything earned since the first compound and integrate.

{{prompt:compound-and-close-4}}

You can check the recurring cost by asking Claude how many tokens your rules files add to each session.

> **The escape hatch is deliberate.** The closing `or "nothing new" if nothing did` allows Claude to report an empty sweep. Ask only what it added, and the agent finds something to have added. If a line it wrote reads generic, ask which session moment earned it; with no moment to point at, have Claude take the line back out of the file.

<!-- maintainer -->

**View summary:** The agent reads the finished session as evidence and drafts `./CLAUDE.local.md` from how the work actually went. You push back where it misreads. The result is a personal rules file that improves the next session on this repository.

**Slide deixis accepted:** "the line back" — idiom ("have Claude take the line back out of the file" = retract it), not page geometry.

**Scope is the rules file only.** The ticket beat is its own exercise (`close-the-ticket`) and runs immediately before this one, so its tracker read is already in scrollback when the sweep fires — do not add a connector or close-out step back into this file. **Emphasis budget (`check_slides.md §9`):** widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`) stays bold; body bullet leads de-bolded; no named-term handles remain in this file.

**Quality:** compendium-audited 2026-09-02 (writing@9edae2ef story@d065f8bc technical@8cc00874 behavior@9edae2ef pedagogy@7fb973dd strategy@1480362 slides@9edae2ef)
- judges @9edae2ef: writing PASS, story PASS, technical PASS, behavior PASS (4 todos see instances/ae101--exercise--compound-and-close.behavior.json), pedagogy PASS, strategy PASS, slides PASS (2 todos see instances/ae101--exercise--compound-and-close.slides.json)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read the retro summary against session moments) + Apply (integrate the rules file from evidence).
- **Atomic — no phase markers.** One retro pass into one rules file; the push-back and the second sweep are moves inside it, not beats beside it. Line 3 is authored, not generated.
- **Placement:** fourth of four in-class exercises on the same bug / same repo, and the module's last beat before the closing lectures.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the retro extends `./CLAUDE.local.md` from session evidence. Klaassen attribution earned here (Claude cites the practitioner if one fits).
- **Theme 4 (self-aware, grain of salt)** — the retro's 3–5 line summary is Claude's account; the student verifies against the file.

<!-- backing -->

Claims
- `session-is-the-evidence` · vision · "the session is the evidence" ← none-owed
- `no-three-question-retro` · vision · "No retro questionnaire" ← none-owed
- `compound-definition-plain` · borrowed · "make the next one easier with what this one taught" ← klaassen-definitive-guide — plain-words paraphrase of the core philosophy. The Compound-step lineage is not anchored here; it sits in Claude's own summary, per the Frameworks note below. Wording per `vocabulary.md` § compound engineering.
- `not-drafting-from-a-blank-page` · vision · "You are not drafting from a blank page." ← none-owed
- `heads-up-before-close-flushes-wip` · detail · "A heads-up that you are about to compact or end the session flushes out work in progress." ← maintainer-attested-flush
- `quote-the-moment-back` · vision · "Quote the specific session moment back at Claude." ← none-owed
- `rules-file-is-yours-now` · vision · "The rules file is yours now." ← none-owed
- `gitignore-edit-is-yours-to-keep` · vision · "Keep or revert the `.gitignore` edit" ← none-owed

Sources
- maintainer-attested-flush `[checked:2026-08-12 result:ATTESTED due:none]` (no URL — maintainer's own practice) — [house canonical] Telling a session you are about to compact or close it prompts the agent to write out work it has been holding but has not yet committed to disk. Antti's observed working practice, offered as a move rather than a documented platform guarantee, so the body says *flushes out* and never *always*. `due:none` because an attestation does not expire; it is superseded only by the maintainer's own revision. fallback: cut the bullet, the sweep prompt beneath it already does the second pass.
- klaassen-definitive-guide `[checked:2026-08-23 result:OK due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen. Verified live 2026-08-23: "The core philosophy of compound engineering is that each unit of engineering work should make subsequent units easier—not harder." The line 11 paraphrase anchors here; wording per `vocabulary.md` § compound engineering. fallback: "make the next one easier with what this one taught" stands unattributed as the training's own phrasing.
- klaassen-expanded-loop `[checked:2026-07-31 result:OK due:2026-11-29]` https://every.to/p/compound-engineering-gets-an-upgrade — [practitioner direct, vendor venue] Klaassen, 29 May 2026. **The current loop, and the one the body prints.** Verbatim sequence: *"Ideate → brainstorm → plan → work → review → polish → compound → repeat"* — seven named stages plus a cyclical repeat, putting **compound seventh and `work` fourth**. His stated reason is that the middle became reliable (*"the work phase has become boring—in the best way"*), so the new stages restore human judgement at both ends; the sandwich framing is credited to Trevin Chow (*"AI is the stuff in the middle. Humans are the bread on either end"*), which is the same idea as the *Bread in the AI Sandwich* video already pre-read at M5. Presented as evolution under the same name, not retraction. Klaassen's own prose says *"from four steps to eight"*, which only reconciles if `repeat` counts as a stage in the new framing and not the old — **this stamp holds to the printed arrow-sequence, not to his count, and so does the body.** Still current as of *How I Polish Software That Agents Built* (https://every.to/source-code/how-i-polish-software-that-agents-built, 13 Jul 2026), which reuses the stage names and introduces no new one. **Re-read the sequence before a cohort: it has moved once and the body now prints it in full, so a second expansion dates the page rather than a footnote.** fallback: drop the sequence and name only the compound step, which is what the corpus does everywhere the shape is not the lesson.
- klaassen-compound-run `[checked:2026-07-30 result:CAVEAT due:2026-06-11]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (pub 2025-12-11; due = pub+6mo). **The origin, kept for the division of labour rather than for the count.** In the source Plan and Work belong to the agents while Review and Compound belong to the engineer, which is this exercise's move exactly. The four step names live on this page and not on the Definitive Guide. CAVEAT is source-level: Dec 2025 sits outside the 6-month window and the page's four-step form was superseded on 2026-05-29 — cite as origin, never as the current form. The body prints the 2026-05-29 sequence and cites the expansion first; all four names here survive inside it. Single-practitioner-originated with early independent echoes: roughly L1–L2, not converged community vocabulary. kb:platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md fallback: cite for the agent/engineer split only.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-compound-run — attributed inside Claude's retro summary, not in a lecture
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — the rules file is the governing variable being revised, not the bug being fixed

Stance `[stance:2026-08-01 level:L1]`
- **2026-08-12: the printed arrow-sequence was dropped, taking the stamp's own named fallback** (*"drop the sequence and name only the compound step, which is what the corpus does everywhere the shape is not the lesson"*). The point slot carries the exercise's contestable claim rather than the borrowed diagram. The body names the practice (*compound engineering*), not the person: the term is Klaassen's own coinage so it carries the credit, and the personal attribution lands where `getting-going.md` already says it should, inside Claude's compound summary rather than in prose. Consequence for `klaassen-expanded-loop`: the body no longer prints the sequence, so a further restructuring of his loop stops being a body edit and goes back to being a stamp edit. Do not restore the diagram to the point.
- holds: that a session's scrollback is better raw material for a rules file than a retro questionnaire. Klaassen is the named origin of the loop and the body credits him inside the agent's own summary rather than teaching him as a lecture, which is the right dose for a single-practitioner framework.
- contested: nothing about the shape; the count question closed. The body printed the Dec 2025 four-step form as current while the author had expanded it on 2026-05-29, so it was a dated snapshot presented in the present tense.
- decided: **name only the compound step; the printed sequence is out (2026-08-12, taking the stamp's own named fallback).** This supersedes the 2026-08-02 print-in-full call — the point slot carries the exercise's contestable claim, not the borrowed diagram. Consequence: Klaassen restructuring his loop is a stamp edit, not a body edit.
- would-move-it: a second practitioner publishing the same staged shape independently, which would take this from L1 toward L2 and let the body drop the single name.

OODA
- question: has the compound loop's step count moved again, and has anyone independently arrived at the same shape?
- roster: Kieran Klaassen, Dan Shipper and the Every source-code feed, Geoffrey Huntley, Addy Osmani
- last-run: 2026-08-01

<!-- /backing -->
**Watch-fors:**
- **Retro confabulation.** Claude's 3–5 line summary name-drops moments without quoting. Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*

**Plug points:**
- Push-back moves at retro (trainer delivers).

**Arc:**
- Picks up from: `close-the-ticket` — the shipped PR, the closed ticket and the tracker-convention rules kept there are all session evidence this sweep reads.
- Hands off to: M1 Bridge → M2 (plan mode at depth on multi-file work), with `./CLAUDE.local.md` already in context at M2's cold start.

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Compounds one rule from session evidence into `./CLAUDE.local.md`** after a non-trivial session, integrating rather than appending. Falsifiable: file mtime + content shows a session-derived rule added since the prior version, with the rule quoting a specific session moment that earned it.
2. **Runs a second sweep before closing**, integrating anything the first compound pass missed (or confirming "nothing new"). Falsifiable: scrollback shows a second integrate turn against `./CLAUDE.local.md` after the first.
3. **Quotes the specific session moment that earned a rule** when reviewing Claude's compound summary, instead of rubber-stamping. Falsifiable: scrollback shows a *"quote the moment"* or *"which session beat earned this"* turn before the rule lands.

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Compound — *"Claude reviews the whole session, writes from evidence, you push back"* | Retro confabulation — Claude name-drops moments without quoting | Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."* |
| Compound — *"integrate, don't append"* | Self-charity on rule self-review — Claude under-flags weak rules in its own summary | Body callout below the prompt names the push-back; if the student rubber-stamps, push: *"read each rule aloud — does it quote a specific moment, or just summarize a theme?"* |

**Accept-with-mitigation** (per `check_pedagogy.md` §50 and §51 — judge findings carried as design-intent, not blockers):

- **§32 forced-engagement on compound-and-close-1 prompt:** the prompt offers structured output (rules file rewrite) for student acceptance, and §32 wants the engagement step inside the fence. Mitigation: body prose immediately below the prompt (*"Read Claude's summary. Quote the specific session moment back at Claude."*) IS the engagement step — quoting the moment is the push-back move; the `##` header above carries the push-back verb. Convenience-bias callout (§50) covers the self-charity risk — keeping the engagement in body keeps the prompt copy-paste-clean.
- **§50 convenience-bias callout on self-review:** the compound prompt asks Claude to review its own session and propose rules. Self-charity bias is real. Mitigation: same body callout names the push-back move with the *"quote the moment"* harsher alternative. Fence stays convenient; body carries the design accept.

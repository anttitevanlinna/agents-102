# Compound and *close the loop*

**Time:** 15 minutes.

**What you do:** let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Push back where it misread.

**What you build:** a rules file written from session evidence. Concrete, specific, yours, and read at the top of every future session in this repo.

**The point:** the compound step closes Kieran Klaassen's loop: ideate → brainstorm → plan → work → review → polish → **compound** → repeat. It doesn't interview you with three retro questions. The session is the evidence; Claude reviews it and writes. You push back where it misread.

The PR shipped and the ticket is closed. Now compound the session. Claude reviews what happened and writes your rules from how you actually worked.

## Write your rules file from the session

- The session is the evidence. Claude reviews the whole scrollback in one shot and drafts your rules from how you actually worked. No three-question retro; the compound step reads what happened and writes.
- You are not drafting from a blank page. The agent reads the session for you. Your job is to push back where it misreads.
- The tracker conventions count as evidence too. The field rules you read off your own ticket are in this scrollback, and this is where they land on disk.

> **Long session, long read.** Claude reviews the whole scrollback in one shot. If the review stalls or runs past a couple of minutes, interrupt with `Esc`, narrow to the orient and introspect phases first, and say `continue`.

{{prompt:compound-and-close-1}}


## Push back where the summary misreads

- Quote the moment back at Claude. Read Claude's summary. Push back where it misreads. Quote the specific session moment back at Claude. That push-back is the reflection move.
- The rules file is yours now. Born from the session, extended by every module after this one.
- The `.gitignore` edit is yours to keep or revert. If `CLAUDE.local.md` wasn't already ignored, the compound step added it to your `.gitignore`. That is an uncommitted change now; commit it, or drop it.

## Sweep the session into your rules file one more time

- One more pass before close. Anything earned since the first compound pass at the top of this exercise (the push-backs, the rules you rewrote) that didn't land yet?

Ask Claude to sweep the session for anything earned since the first compound and integrate.

{{prompt:compound-and-close-4}}

## Close the session

**What happened:** Your rules file was born from how you actually worked, not from a template. Claude reviewed the whole session, you pushed back where it misread, and the rules that held landed in `./CLAUDE.local.md`.

The PR is open, the ticket is closed, and the rules file is written from session evidence.

You can close this session now. `./CLAUDE.local.md` stays behind; whether it earns its keep shows up the next time a session reads it.

<!-- maintainer -->

**View summary:** The agent reads the finished session as evidence and drafts `./CLAUDE.local.md` from how the work actually went. You push back where it misreads. The result is a personal rules file that improves the next session on this repository.

**Scope is the rules file only.** The ticket beat is its own exercise (`close-the-ticket`) and runs immediately before this one, so its tracker read is already in scrollback when the sweep fires — do not add a connector or close-out step back into this file. **Emphasis budget (`check_slides.md §9`):** widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) stays bold; body bullet leads de-bolded; no named-term handles remain in this file.

**Quality:** compendium-audited 2026-08-03 (writing@cb44994 story@cb44994 technical@1c765f2 behavior@1c765f2 pedagogy@1c765f2 strategy@1c765f2 slides@cb44994)
- judges @cb44994: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read the retro summary against session moments) + Apply (integrate the rules file from evidence).
- **Time:** 15 min inside M1's slot. Fourth of four in-class exercises on the same bug / same repo, and the module's last beat before the closing lectures.

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the retro extends `./CLAUDE.local.md` from session evidence. Klaassen attribution earned here (Claude cites the practitioner if one fits).
- **Theme 4 (self-aware, grain of salt)** — the retro's 3–5 line summary is Claude's account; the student verifies against the file.

<!-- backing -->

Claims
- `session-is-the-evidence` · vision · "The session is the evidence." ← none-owed
- `no-three-question-retro` · vision · "the compound step … doesn't interview you with three retro questions" ← none-owed
- `compound-step-is-klaassens-loop` · borrowed · "the compound step closes Kieran Klaassen's loop: ideate → brainstorm → plan → work → review → polish → **compound** → repeat" ← klaassen-expanded-loop, klaassen-compound-run
- `not-drafting-from-a-blank-page` · vision · "You are not drafting from a blank page. The agent reads the session for you." ← none-owed
- `quote-the-moment-back` · vision · "Quote the specific session moment back at Claude." ← none-owed
- `rules-file-is-yours-now` · vision · "Born from the session, extended by every module after this one." ← none-owed
- `gitignore-edit-is-yours-to-keep` · vision · "The `.gitignore` edit is yours to keep or revert." ← none-owed

Sources
- klaassen-expanded-loop `[checked:2026-07-31 result:OK due:2027-01-31]` https://every.to/p/compound-engineering-gets-an-upgrade — [practitioner direct, vendor venue] Klaassen, 29 May 2026. **The current loop, and the one the body prints.** Verbatim sequence: *"Ideate → brainstorm → plan → work → review → polish → compound → repeat"* — seven named stages plus a cyclical repeat, putting **compound seventh and `work` fourth**. His stated reason is that the middle became reliable (*"the work phase has become boring—in the best way"*), so the new stages restore human judgement at both ends; the sandwich framing is credited to Trevin Chow (*"AI is the stuff in the middle. Humans are the bread on either end"*), which is the same idea as the *Bread in the AI Sandwich* video already pre-read at M5. Presented as evolution under the same name, not retraction. Klaassen's own prose says *"from four steps to eight"*, which only reconciles if `repeat` counts as a stage in the new framing and not the old — **this stamp holds to the printed arrow-sequence, not to his count, and so does the body.** Still current as of *How I Polish Software That Agents Built* (https://every.to/source-code/how-i-polish-software-that-agents-built, 13 Jul 2026), which reuses the stage names and introduces no new one. **Re-read the sequence before a cohort: it has moved once and the body now prints it in full, so a second expansion dates the page rather than a footnote.** fallback: drop the sequence and name only the compound step, which is what the corpus does everywhere the shape is not the lesson.
- klaassen-compound-run `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (Dec 2025). **The origin, kept for the division of labour rather than for the count.** In the source Plan and Work belong to the agents while Review and Compound belong to the engineer, which is this exercise's move exactly. The four step names live on this page and not on the Definitive Guide. The prior CAVEAT was that the body printed this page's four-step form as current; that is resolved — the body now prints the 2026-05-29 sequence and cites the expansion first. All four names here survive inside it. Single-practitioner-originated with early independent echoes: roughly L1–L2, not converged community vocabulary. kb:platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md fallback: cite for the agent/engineer split only.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-compound-run — attributed inside Claude's retro summary, not in a lecture
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — the rules file is the governing variable being revised, not the bug being fixed

Stance `[stance:2026-08-01 level:L1]`
- holds: that a session's scrollback is better raw material for a rules file than a retro questionnaire. Klaassen is the named origin of the loop and the body credits him inside the agent's own summary rather than teaching him as a lecture, which is the right dose for a single-practitioner framework.
- contested: nothing about the shape; the count question closed. The body printed the Dec 2025 four-step form as current while the author had expanded it on 2026-05-29, so it was a dated snapshot presented in the present tense.
- decided: **print the current sequence in full, 2026-08-02 (maintainer call).** The corpus default elsewhere is ordinal-free, and the cheap fix was to name only the compound step. Overruled deliberately: seeing where compound sits in the whole arc is what teaches, and an M1 exercise running the compound step benefits from the picture more than it suffers from the length. The cost is accepted and named — this page now dates when the loop moves again, so the expansion source carries a re-read-before-cohort instruction rather than a routine six-month due date.
- would-move-it: Klaassen restructuring the loop again, which now costs a body edit rather than a stamp edit. Or a second practitioner publishing the same staged shape independently, which would take this from L1 toward L2 and let the body drop the single name.

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

- **§32 forced-engagement on compound-and-close-1 prompt:** the prompt offers structured output (rules file rewrite) for student acceptance, and §32 wants the engagement step inside the fence. Mitigation: body prose immediately below the prompt (*"Read Claude's summary. Push back where it misreads. Quote the moment from your session back at Claude."*) IS the engagement step. Convenience-bias callout (§50) covers the self-charity risk — keeping the engagement in body keeps the prompt copy-paste-clean.
- **§50 convenience-bias callout on self-review:** the compound prompt asks Claude to review its own session and propose rules. Self-charity bias is real. Mitigation: same body callout names the push-back move with the *"quote the moment"* harsher alternative. Fence stays convenient; body carries the design accept.

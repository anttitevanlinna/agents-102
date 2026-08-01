# Compound and *close the loop*

**Time:** 15 minutes.

**What you do:** let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Push back where it misread.

**What you build:** a rules file written from session evidence. Concrete, specific, yours, and read at the top of every future session in this repo.

**The point:** the compound step (plan → work → review → compound, Kieran Klaassen's loop) doesn't interview you with three retro questions. The session is the evidence; Claude reviews it and writes. You push back where it misread.

The PR shipped. Now compound the session. Claude reviews what happened and writes your rules from how you actually worked.

## Write your rules file from the session

- The session is the evidence. Claude reviews the whole scrollback in one shot and drafts your rules from how you actually worked. No three-question retro; the compound step reads what happened and writes.
- You are not drafting from a blank page. The agent reads the session for you. Your job is to push back where it misreads.

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

The PR is open and the rules file is written from session evidence. The loop's last move, closing the bug's ticket outside the repo, is the homework.

You can close this session now. `./CLAUDE.local.md` stays behind; whether it earns its keep shows up the next time a session reads it.

<!-- maintainer -->

**View summary:** The agent reads the finished session as evidence and drafts `./CLAUDE.local.md` from how the work actually went. You push back where it misreads. The result is a personal rules file that improves the next session on this repository.

**Re-audit owed:** the connector + close-out sections were split into the `close-the-ticket.md` homework exercise, leaving this file as the compound-the-rules-file beat only. Body materially trimmed, so the per-class Quality SHAs below predate the trim. Re-audit before ship. **Emphasis budget (`check_slides.md §9`):** widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) stays bold; body bullet leads de-bolded; no named-term handles remain in this file.

**Quality:** compendium-audited 2026-07-26 (writing@b3143a4 story@b3143a4 technical@9697944 behavior@b3143a4 pedagogy@b3143a4 strategy@9697944 slides@9697944)
- judges @9697944: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read the retro summary against session moments) + Apply (integrate the rules file from evidence).
- **Time:** 15 min inside M1's slot. Third of three in-class exercises on the same bug / same repo. The ticket close-out is now the M1 homework (`close-the-ticket.md`).

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the retro extends `./CLAUDE.local.md` from session evidence. Klaassen attribution earned here (Claude cites the practitioner if one fits).
- **Theme 4 (self-aware, grain of salt)** — the retro's 3–5 line summary is Claude's account; the student verifies against the file.

<!-- backing -->

Claims
- `session-is-the-evidence` · vision · "The session is the evidence." ← none-owed
- `no-three-question-retro` · vision · "the compound step … doesn't interview you with three retro questions" ← none-owed
- `compound-step-is-klaassens-loop` · borrowed · "plan → work → review → compound, Kieran Klaassen's loop" ← klaassen-compound-run
- `not-drafting-from-a-blank-page` · vision · "You are not drafting from a blank page. The agent reads the session for you." ← none-owed
- `quote-the-moment-back` · vision · "Quote the specific session moment back at Claude." ← none-owed
- `rules-file-is-yours-now` · vision · "Born from the session, extended by every module after this one." ← none-owed
- `gitignore-edit-is-yours-to-keep` · vision · "The `.gitignore` edit is yours to keep or revert." ← none-owed

Sources
- klaassen-compound-run `[checked:2026-07-30 result:CAVEAT due:2027-01-30]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (Dec 2025). **The four step names live on this page, not on the Definitive Guide**, and in the source Plan and Work belong to the agents while Review and Compound belong to the engineer. The body names all four in order, so this is the URL that has to back it. Klaassen expanded the loop past four steps on 2026-05-29, which the body's ordinal form does not track — **the four-step spelling is now a dated snapshot, not his current position.** Single-practitioner-originated with early independent echoes: roughly L1–L2, not converged community vocabulary. kb:platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md fallback: attribute as "the loop that runs through his work", ordinal-free — which is what the corpus does everywhere the count is not load-bearing.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-compound-run — attributed inside Claude's retro summary, not in a lecture
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — the rules file is the governing variable being revised, not the bug being fixed

Stance `[stance:2026-08-01 level:L1]`
- holds: that a session's scrollback is better raw material for a rules file than a retro questionnaire. Klaassen is the named origin of the loop and the body credits him inside the agent's own summary rather than teaching him as a lecture, which is the right dose for a single-practitioner framework.
- contested: the step count. **The body spells four steps; the author has since published more**, so the ordinal is a dated snapshot. It is not wrong as history and it would be wrong as current practice, and the corpus elsewhere already prefers the ordinal-free form.
- would-move-it: Klaassen restructuring the loop again, or a second practitioner publishing the same four-step shape independently — the second would take this from L1 toward L2 and let the body drop the single name.

OODA
- question: has the compound loop's step count moved again, and has anyone independently arrived at the same shape?
- roster: Kieran Klaassen, Dan Shipper and the Every source-code feed, Geoffrey Huntley, Addy Osmani
- last-run: 2026-08-01

Flagged
- `[found:2026-08-01]` The body names the loop as four ordered steps while its own source has expanded past four since 2026-05-29 → decide whether to drop the ordinal here the way the rest of the corpus does. Low urgency, and it is the kind of small dated specific that reads as authoritative precisely because it is precise.

<!-- /backing -->
**Watch-fors:**
- **Retro confabulation.** Claude's 3–5 line summary name-drops moments without quoting. Trainer push: *"quote the specific session moment that made you add rule X. If you can't, take it out."*

**Plug points:**
- Push-back moves at retro (trainer delivers).

**Arc:**
- Picks up from: `fix-tests-first` — the rule seeded at that exercise is the file the retro rewrites.
- Hands off to: `close-the-ticket` (M1 homework — closes the bug's ticket outside the repo) and M1 Bridge → M2 (plan mode at depth on multi-file work).

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

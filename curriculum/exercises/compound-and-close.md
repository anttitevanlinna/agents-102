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

The PR is open and the rules file is written from session evidence. The loop's last move, closing the bug's ticket outside the repo, is the Module 1 homework.

You can close this session now. `./CLAUDE.local.md` stays behind; whether it earns its keep shows up the next time a session reads it.

<!-- maintainer -->

**Re-audit owed:** the connector + close-out sections were split into the `close-the-ticket.md` homework exercise, leaving this file as the compound-the-rules-file beat only. Body materially trimmed, so the per-class Quality SHAs below predate the trim. Re-audit before ship. **Emphasis budget (`check_slides.md §9`):** widget chrome (`**Time:**`, `**What you do:**`, `**What you build:**`, `**The point:**`, `**What happened:**`) stays bold; body bullet leads de-bolded; no named-term handles remain in this file.

**Quality:** compendium-audited 2026-07-08 (writing@3605eee story@88a1dd4 technical@88a1dd4 behavior@88a1dd4 pedagogy@3605eee slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy grandfathered, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Analyze (read the retro summary against session moments) + Apply (integrate the rules file from evidence).
- **Time:** 15 min inside M1's slot. Third of three in-class exercises on the same bug / same repo. The ticket close-out is now the M1 homework (`close-the-ticket.md`).

**Themes planted** (content-strategy § "Recurring themes"):
- **Theme 2 (compounding builds the system)** — the retro extends `./CLAUDE.local.md` from session evidence. Klaassen attribution earned here (Claude cites the practitioner if one fits).
- **Theme 4 (self-aware, grain of salt)** — the retro's 3–5 line summary is Claude's account; the student verifies against the file.

**Frameworks riffed on:**
- **Compound engineering** — Kieran Klaassen (Every Inc.). Plan → Work → Review → Compound. Convergence Level 3. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`. Attributed inside Claude's retro summary, not in a lecture.
- **Three-block memory** — Paweł Huryn (productcompass.pm). Level 2 single-experiment. Source: `continuous-research/insights.md` lines 1051–1065. URL: `productcompass.pm/p/claude-md-snippets` `[practitioner direct]`. Materials seeded across the three M1 exercises; the three-block *frame* earns its name in M4 when the materials get rearranged.

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

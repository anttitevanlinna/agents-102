# Three moves that *backfire*

When a company declares an AI transformation, three first moves come up again and again. Each looks decisive. Each tends to cost more than it buys. Better to see them now, before you pick a move of your own.

## Competence before platform

The tempting move is to pick the platform first: evaluate the vendors, choose the tool, roll it out. It feels like progress because it produces a decision.

The trouble is that people who have not used agents cannot tell you what they need from a platform. You end up choosing between vendor stories. Competence comes first because it creates pull: once people can do real work with an agent, they find the walls themselves, and those walls tell you what the platform has to do.

Fin (Intercom) is a useful picture of the order. Its engineering platform is a shared repository of skills its own engineers wrote. The company reports 153 people contributing 267 skills within three months. The platform grew around what people had already learned to build.

## Pull, not mandate

The tempting move is to require it: a usage target, a weekly quota, AI in the performance review. It feels like leadership because it is visible and measurable.

What a mandate buys is compliance. People log the usage and change nothing else. A Microsoft Research study published in HBR in March 2026 looked at what actually moved people to use AI at work. Seeing a coworker use it moved people more than anything else. What leaders said about it had no direct effect once the peer effect was accounted for.

Your part is the conditions: who sees whom working with agents, who gets time to try, who gets asked to show others.

## Hybrid from day one

The tempting target is full autonomy: agents that run whole processes while people step back. It feels like the ambition the transformation asked for.

The arithmetic works against it. An agent that gets each step right 85% of the time finishes a ten-step process correctly about one time in five, because the misses multiply. Short chains with a person checking the points that matter work far better than long chains nobody checks.

Aim for people and agents sharing the work from the start, and move the checkpoints as trust is earned.

## Put the three in your Quality Gate

These three belong in your memory, not only in your head. Run this prompt yourself, in your own session: it writes to your own `team-leadership.md`, so nobody else's screen can do it for you.

Add the three checks to your Quality Gate.

{{prompt:em-add-backfire-gates}}

From here on, every move you log gets asked these three questions before it goes in the journal. Claude also tells you which of the three your team is closest to failing today.

<!-- maintainer -->

**Quality:** compendium-audited 2026-09-30 (writing@518a2710 story@518a2710 behavior@518a2710 pedagogy@518a2710 strategy@518a2710 slides@518a2710)
- judges @518a2710: writing PASS (verify-refuted, 1 finding see instances/engineering-management--lecture--three-moves-that-backfire.writing.json), story PASS (1 finding see instances/engineering-management--lecture--three-moves-that-backfire.story.json), technical REVISE (1/0 see instances/engineering-management--lecture--three-moves-that-backfire.technical.json), behavior PASS, pedagogy PASS, strategy PASS, slides PASS

## Design (EM proving run 2026-09-30)

- **Placement:** after `install-your-leadership-memory`, before `schedule-the-weekly-diagnostic` (strategy § Three things NOT to do: M1, before any first move is picked).
- **Headers lead with the discipline** (`check_strategy_tie_in.md` §3). Each section opens on the tempting move, says why it tempts, then the discipline. Mood: diagnostic directness, not a scolding.
- **Prompt `em-add-backfire-gates` is student-run** (`check_lectures.md` §6 carve-out, the answer must be theirs): it writes three checks into the student's own Quality Gate. The body says so beside the prompt. Trainer: pause for the room to run it (about 3 minutes).
- **Claims kept deliberately narrow.** The strategy's Don'ts carry more (Amazon Kiro, "zero named enterprises on horizontal platforms", "Intercom spent 9 months on platform and still isn't done", Klarna / Gartner rehire forecast, "mandates have ZERO direct effect"). Each is either unsourced in the KB, secondhand, stale, or misread; see the module report's strategy gaps. The body uses only what the KB sources and what arithmetic proves.
- **HBR finding** is about leadership *communication*, not mandates. The body states the finding as it is (what leaders said had no direct effect after peers) and draws the mandate conclusion as our argument, not the study's. The effect sizes (+8.9pp peers, 0pp communication) are kept out of the body: the article is paywalled and the numbers could not be re-verified from the primary.
- **Reliability figure** is arithmetic (0.85^10 ≈ 0.197), presented as such, not as a finding.
- **Nordic transfer:** covered by the theory lecture's caveat line; not repeated here.
- **No cross-module sequencing in body** (`check_lectures.md` §3).

## Source verification

- curran-2x `[checked:2026-07-26 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Darragh Curran, "2x – nine months later: We did it. You can too.", 2026-04-16. 153 contributors / 267 skills in 3 months to the internal Claude Code plugin repo. CAVEAT: vendor-self-reported. Stamp inherited from `curriculum/lectures/skills-from-the-frontier.md`. fallback: drop the numbers, say "a shared repository of skills its own engineers wrote".
- hbr-peer-influence `[checked:2026-09-30 result:BLOCKED due:2026-09-03]` https://hbr.org/2026/03/peer-influence-can-make-or-break-your-ai-rollout — [academic/research] Baym, Dillon, Jaffe (Microsoft Research), HBR, 2026-03-03. Page opened: byline and date confirmed, body paywalled. Last-known claim from `continuous-research/findings/by-pattern/conditions-creator.md` Signal 1: peer influence +8.9pp; leadership communication 0pp after controlling for peers. Past the six-month window; body dates it ("published in HBR in March 2026"). fallback: "research on AI rollouts keeps finding that people copy coworkers, not memos".
- reliability-arithmetic `[checked:2026-09-30 result:OK due:none]` claim:0.85^10 — [cultural-vocab] arithmetic; also in `continuous-research/findings/by-pattern/hybrid-beats-autonomous.md` § The Compound Reliability Math. fallback: none needed.

## Meta

- **Time:** 10 min, including 3 minutes for the room to run the prompt.

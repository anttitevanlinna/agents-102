# Cohort onboarding email, AE101

**Subject:** Agentic Engineering 101, your prework

Hi all,

We start Module 1 of Agentic Engineering 101 on **[Day 1 date and time]**. The training is hands-on from minute one. You'll be writing real code on your real repo, with Claude Code running on your laptop, the whole way through.

Everything to do before then is here:

**[prework link]**

Do it this week rather than on the morning of Module 1. Anything trips you up, reply to this email and I'll sort it with you.

Looking forward to it.

[Trainer name]

---

<!-- maintainer -->

**2026-08-12 (collapsed to a link):** this email used to restate the setup work inline as four sections (license, Claude Code install, repo, network), duplicating what prework covers. It is now a welcome and a link. Restating any prework content here re-opens the drift.

**Not carried anywhere yet:** the license-activation and network/proxy checks lived only in this email's old body and now live nowhere. Decide whether prework should carry them before the next cohort, or whether the sponsor conversation covers licensing and the network check is redundant once the student opens a session.

**Quality:** compendium-audited 2026-08-28 (writing@e11bbeb4 behavior@1c765f2) — body rewritten 2026-08-12, re-audit owed before ship.
- judges @e11bbeb4: writing PASS, story grandfathered, technical grandfathered, behavior PASS, pedagogy grandfathered, strategy grandfathered, slides N/A (not slide-rendered — email template)
- cross_module: N/A — an onboarding email, not a module in the sequence; no adjacent-pair seam to walk

**Delivery architecture canonical home:** training-architecture.md (§Platform, §Material distribution, §Prework). Prework runtime, step breakdown, and skill-install mechanics live in prework.md's maintainer block. Don't restate either here.

**Send timing:** 5 working days before Day 1. Earlier and the engineer forgets; later and IT can't help. From the trainer (named human, not a shared mailbox). The link has to be live when this sends.

**The link:** `[prework link]` points at the cohort's built workbook prework page, behind the same basic auth as the rest of the workbook. Credentials go out with it, out-of-band.

**Customisation per cohort:**
- Replace bracketed placeholders (`[Day 1 date and time]`, `[prework link]`, `[Trainer name]`).
- If the customer has a designated L&D contact for tooling escalation, add their name and channel next to the reply line (don't replace the trainer-as-point-of-contact; the trainer wants the signal).
- Nothing else. Per-cohort setup differences are edited in prework alone. If a change here seems necessary to match one there, the sentence causing it is the bug.

**Why this email exists:** to get the prework opened early, with runway for anything that turns out to need somebody else. The silent-failure cliff is unchanged — an engineer arriving at Module 1 with broken Claude Code and no trainer rescue path — but the defence is now "open the prework in time" rather than "read the setup twice".

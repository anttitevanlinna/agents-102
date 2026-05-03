# Cohort onboarding email, AE101

Send 5 working days before Day 1. From the trainer (named human, not a shared mailbox). The job: get every laptop install-ready before the student opens prework. Prework runs solo; the trainer cannot rescue install issues during prework, and a half-installed Claude Code is the single biggest source of asynchronous prework abandonment.

This email pairs with prework Step 0 (a safety-net verify list inline). Belt and braces.

---

**Subject:** Agentic Engineering 101, set up your laptop this week

Hi all,

We start Module 1 of Agentic Engineering 101 on **[Day 1 date and time]**. The training is hands-on from minute one, you'll be writing real code on your real repo, with Claude Code running on your laptop, the whole way through.

**Before the prework lands next week, please confirm four things on the laptop you'll use for the training. Sorting these out today saves you (and me) the painful version of finding out 30 minutes into Module 1.**

### 1. Claude Pro or Team license, active

You need a paid Claude license, Pro tier or Team tier. Sponsor [or admin name] is your point of contact for activation. Check by signing in at **claude.ai** and confirming your account shows the plan.

If your org uses SSO and you've never logged in: do that today, not the morning of Module 1.

### 2. Claude Code installed and working

Claude Code is the tool we use every session. AE101 runs on the **CLI** by default (it lives in your terminal, integrates with your editor and git, and is the engineer-native way to use Claude Code). Install from **claude.com/code**. The desktop app is fine too if you prefer it, both can be used for any exercise.

Open Claude Code, send it a prompt (*"hello, what version are you?"*), confirm a real response comes back.

### 3. A real repo you can use

Module 1 starts in a repo of your choosing, one you own or co-own, where real work is happening. Not a Hello World, not a tutorial fork. The prework will walk you through picking it; you don't need to do anything yet, just have a couple of candidates in mind.

### 4. Network and proxy not in the way

If you're behind a corp proxy or VPN, send a few prompts through Claude Code from the network you'll actually use during the training. If responses are slow, broken, or blocked, file with IT now. Same for `~/Documents`, confirm you can write files there.

### Help

If any of the four trips you up, reply to this email today. I'd rather sort it now than have you walk into Module 1 stuck.

The prework itself lands in your inbox **[X working days before Day 1]**, about 30 minutes of pre-session work, all of it in conversation with Claude.

Looking forward to it.

[Trainer name]

---

<!-- maintainer -->

**Quality:** draft 2026-05-03 (auto-degraded from compendium-audited 2026-04-25 — file touched 2026-04-28; re-audit pending)
- compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 #21 agent-vocab, check_pedagogy v2026-04-25)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Customisation per cohort:**
- Replace bracketed placeholders (`[Day 1 date and time]`, `[or admin name]`, `[X working days before Day 1]`, `[Trainer name]`).
- If the cohort runs on org-managed Claude through a custom auth path (Bedrock, Vertex, internal proxy), swap "claude.ai" + "claude.com/code" for the customer's actual install instructions in §1 and §2. The structure stays the same; the URLs flex.
- If the customer has a designated L&D contact for tooling escalation, add their name + channel below "Help" (don't replace the trainer-as-point-of-contact line; the trainer wants the signal).

**When to send:** 5 working days before Day 1. Earlier and the engineer forgets; later and IT can't help.

**Why this email exists:** the JTBD-zero (install + auth + license + network) lives nowhere else in the curriculum. Prework Step 0 is the inline safety net for the student who skipped this email; this email is the proactive shot. Both fire because the silent-failure cliff (engineer arrives at prework with broken Claude Code, no trainer rescue path) is the single biggest first-cohort risk.

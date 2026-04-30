# The data question

**Time:** 7 minutes. Closing lecture for Module 2.

Output, just verified. Some rows cleared. Some didn't. The row that didn't clear is partly a verification question and partly something else: a data question. Where Claude got the input from, what Claude did with it, where the result lives, who else can see it.

A teammate who wasn't in this room will eventually ask: *"Is it safe to use Claude for X?"* This lecture is the version of the answer the team can give without flinching.

## What Claude actually saw

When the IT Director's prompt ran, Claude read three things and only those three things. The prompt itself. Whatever connectors had been set up to bring in calendar, mail, files. Anything pasted into the conversation. That's the input set.

It did NOT read your full mailbox. Did not query a database. Did not browse the web unless a tool was attached. The fence around what Claude can see is the connector configuration plus the conversation. Outside that fence, Claude does not know.

Practical consequence: if a teammate asks *"will Claude leak our customer list?"* the answer is *"only if we connected something that gave it access to the customer list, AND someone fed that connection into a conversation with the model."* The fence is real and the fence is configurable.

## Where the data goes after Claude reads it

Three layers, worth naming once.

The conversation with Claude lives on Anthropic's infrastructure. Encrypted in transit, encrypted at rest. Retention policy depends on the licensing tier the organisation bought.

Whether your conversations are used to train future Claude models is set by the contract your organisation signed. For business tiers the default is no. The IT Director confirmed the team's specific contract with the trainer before this cohort, so the answer for your organisation is the one the IT Director will name now. If the licensing changes later, the contract is what binds, not the answer that held last quarter.

The output Claude wrote into your folder (`verification.md`, your CLAUDE.md, the verification table) sits on your machine and on SharePoint, governed by your organisation's existing policies on those two surfaces. Anthropic doesn't reach back into the file once Claude saved it.

## What GDPR adds

Two things, briefly. First, processing personal data through a model is processing under GDPR; the lawful basis you used to collect the data has to extend to model use, or you need a new basis. Second, data subjects have rights (access, deletion, objection) that the team has to be able to honour even when the data passes through Claude.

The compliance team will know the contract specifics. The team's job isn't to be the lawyer. The team's job is to know enough to direct the question to the right answer-holder.

## What the team tells users on Monday

Three sentences the team can say without hedging:

*"Claude can only see what we connected and what you pasted. Nothing more."*

*"Conversations on our plan aren't used to train future models. That's in our contract."*

*"If the data is sensitive enough that you'd hesitate to email it, ask the data team before pasting it. The fence is there; we just want you using it deliberately."*

These are not slogans. They are the verification from the IT Director's prompt, scaled to a question a colleague will ask.

## Bridge

You have a system. You can verify output whose answer wasn't already known. You can answer the data question.

The rollout is bigger than three modules. What's the actual hard part: the thing that, if the team got it right, would make the rest follow? That's Module 3.

<!-- maintainer -->

**Quality:** compendium-audited 2026-04-28 (post rule-#3 + post never-abbreviate-modules sweeps)
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. rule #3 + § 2(b) never-abbreviate-modules, check_lectures v2026-04-27, check_research_claims v2026-04-27)
- mechanical-tested: N/A (lectures are trainer-narrated, no prompt-chain to execute)
- sim-passed 2026-04-27 — STALE since rule-#3 sweep touched opener + Bridge; re-sim recommended before next cohort
- mechanical-tested: N/A (lectures are trainer-narrated, no prompt-chain to execute)

**Lecture meta:** *7-minute closing lecture for M2. Trainer leads. Two factual claims about Anthropic licensing/encryption verified at write-time against `privacy.claude.com/en/articles/7996868`.*

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*

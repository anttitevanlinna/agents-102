# Lecture: The discipline of risk

You built something. It works. Would you bet your job on it being safe? Probably not. And that feeling, that specific, uncomfortable, *I'd like to know and I don't* feeling, is the most plain thing in the room today.

Here's the hard part. The feeling doesn't go away. Not with more testing, not with a better policy, not with a certification. Agent systems don't hand you certainty. You can wait for it, or you can get to work.

**Certainty is a fantasy you inherited.**

Software security, done well, sells you a clean story. Perimeter. Access control. Patch the bug, sign off the build, the system is secure. You've probably worked with people who live inside that story and mostly do a good job of it. The story works because classical software is deterministic (same input, same output). You can find the bug, prove you fixed it, and sleep.

Agent systems break the story in three places.

The behaviour is non-deterministic. Same prompt, same files, same tools, different session, different answer. A test that passed before doesn't prove the system passes today.

The attack surface is the instruction set. The dangerous move isn't breaking into your server. It's getting your agent to *decide* to do something harmful with access it legitimately has. Well-formed English, arriving through a document the agent reads. Your firewall doesn't see it because your firewall has never had to worry about persuasion. The prework gave this its field name: prompt injection.

Capability is emergent. The agent does what its instructions, its context, and the user's ask imply it should do, combined. You can't fully predict the combination. You can only bound it.

Put the three together. You don't get *secure / not secure.* You get *safe enough, under these conditions, within these limits, for now.* If that sounds less like engineering and more like medicine, it is.

In the full agent picture, this is the boundary piece. What may the agent read? What may it change? What must come back to a human? More capability without boundaries is not progress. It is just more blast radius.

**The work is the loop.**

You don't get certainty. You get a loop. Four steps, plain, repeatable.

**Assess.** Point a lens at the system and see what it reveals. Today starts with your company's actual rules, raw, against your actual agent. Then you package that policy check so it can run again. The agent-risk lens asks what the agent can reach, what it might leak, and how ordinary text could mislead it. Neither lens makes you an expert. The reusable check is the expert. The job is reading the reports with judgment.

**Mitigate.** Pick one risk. Apply the smallest change that reduces it. Agent mitigations are shaped differently than firewalls. Scope (give the agent less). Split (break it into two agents with different trust levels). Filter (post-process the output before it leaves). Gate (a human approves before a sensitive action). Review (a second agent judges the first's output). None of these are perimeter. All of them are loop design.

**Reassess residual.** After the mitigation, the risk isn't gone. Something remains. Name it. Write it down. *The residual risk here is X. If Y happens, we haven't prevented it, we've made it less likely.* Residual risk as an artifact, not a shame.

**Decide.** Accept the residual on record, or close the door. Those are the two options. *"Hope it doesn't happen"* is not one.

Run the loop. You never finish. You iterate. The discipline isn't arriving at certainty. It's running the loop again.

**The best mitigation is the one you don't need.**

Here's the oldest move in the security book, the one that sounds too much like common sense to charge for. The cheapest, most reliable way to reduce risk on an agent is to not open the door in the first place.

Should the agent have write access to that system? If not, scope down before you scope up. Should the agent read from that mailbox? If not, don't connect it. Should the agent be the one that drafts customer-facing language? If that's where the biggest risk lives, maybe a human drafts and the agent reviews, not the other way around.

The policy lens exists partly to tell you which doors not to open. Your company has already decided. The job is to notice.

Avoidance beats reduction. Scope beats patch. Don't-open beats mitigate. This isn't timid design. It's plain design. Every door you don't open is a residual risk you don't have to name, mitigate, monitor, re-test, or apologise for.

**The uncomfortable part, said plainly.**

Some of your agents are going to be wrong, in ways you won't catch, and ship output you won't love. That's true for every agent in production anywhere in the world right now. The organisations that handle this well aren't the ones with the best technology. They're the ones that run the loop openly, name residual risks plainly, and close doors they don't need to open.

You can't buy certainty. You can run a loop. Today the loop runs once, on your own system, first with the policy files raw and then with two reusable lenses doing the expert work. Damn, this is complex stuff. It will still be complex when the next agent gets built. The discipline is what carries.

Read the reports. Pick a risk. Apply a mitigation. Name what's left. Decide.

That's the work.

<!-- maintainer -->

**Lecture meta:** *8 min in-room lecture. Placement: after Connections, before the two exercises. Primes the loop the exercises run. Mood contract: deepened unease — names the unease as the permanent condition, does not resolve it; Module 5 is the rescue.*

**Time:** 8 minutes. The 1h45 module budget (lecture + two exercises + Connections + Debrief + transitions) only fits when the lecture stays at 8 and the author exercise's Phase 2 lands in two turns. If a tougher cohort takes Phase 2 to three turns, the budget eats this lecture's slack first. Hold to 8.

**Placement in module:** After Connections, before the exercises. The lecture primes the loop; the exercises run it.

<!-- backing -->

Claims
- `certainty-is-a-fantasy-you-inherited` · vision · "Certainty is a fantasy you inherited." ← none-owed
- `behaviour-is-non-deterministic` · vision · "Same prompt, same files, same tools, different session, different answer." ← none-owed
- `attack-surface-is-the-instruction-set` · borrowed · "The attack surface is the instruction set." ← cultural-vocab
- `capability-is-emergent` · vision · "Capability is emergent. … You can't fully predict the combination. You can only bound it." ← none-owed
- `the-work-is-the-loop` · borrowed · "**Assess.** … **Mitigate.** … **Reassess residual.** … **Decide.**" ← iso-31000
- `agent-mitigations-are-shaped-differently` · vision · "Agent mitigations are shaped differently than firewalls." ← none-owed
- `name-the-residual-and-write-it-down` · vision · "*The residual risk here is X. If Y happens, Z follows.*" ← none-owed
- `two-options-not-three` · vision · "Accept the residual on record, or close the door. Those are the two options. *\"Hope it doesn't happen\"* is not one." ← none-owed
- `best-mitigation-is-the-one-you-dont-need` · borrowed · "The best mitigation is the one you don't need." ← cultural-vocab

Sources
- iso-31000 `[checked:2026-05-15 result:OK due:none]` https://www.iso.org/standard/65694.html — [standards body] ISO 31000, risk management: the assess → treat → evaluate-residual → accept-or-avoid cycle, and *residual risk* as the term for what remains after treatment. NIST's risk-management framework carries the same vocabulary. **Foundational, `due:none`** — a standard's definitions do not expire on a six-month clock, and the lecture takes the vocabulary while explicitly dropping the bureaucracy around it. fallback: teach the four steps without the standard's name; the loop is recognisable to anyone with regulated-industry exposure.

Frameworks
- Assess → mitigate → reassess → decide · [borrow:risk management] · law:none · ← iso-31000 — classical loop, reshaped for agent systems
- Residual risk · [borrow:risk management] · law:none · ← iso-31000 — the module's central artifact
- STRIDE · [borrow:security engineering] · law:none · ← cultural-vocab — named as the ancestor only; the category mapping lives in the skill, not the lecture
- Principle of least privilege · [borrow:security engineering] · law:blast-radius-error-budget · ← cultural-vocab — the don't-open-the-door reframe
- Prompt injection · [borrow:security engineering] · law:none · ← cultural-vocab — named in the M4 prework (module-4-prework.md); "the attack surface is the instruction set" is its reframe. The Willison/lethal-trifecta backing lives in AE101's supplementary.

Stance `[stance:2026-08-01 level:L2]`
- holds: the risk loop, which is standardised, taught, and older than the subject it is being applied to. **The lecture's own contribution is the reshaping, not the loop** — that agent mitigations are shaped differently (scope, tools, credentials, review) than perimeter controls, and that "hope it doesn't happen" is not a decision.
- contested: nothing in the borrowed frame. What is genuinely unsettled is the mitigation catalogue for agent systems, which is why the lecture names shapes rather than a checklist.
- would-move-it: an agent-specific risk taxonomy gaining real adoption, which would give the lecture a named catalogue to point at instead of teaching shapes.

OODA
- question: has an agent-specific risk or mitigation taxonomy reached real adoption, beyond vendor framings?
- roster: NIST AI RMF working notes, OWASP LLM/agentic top-ten maintainers, Simon Willison, Anthropic safety documentation
- last-run: 2026-08-01

<!-- /backing -->
**Philosophy callout (sparing):**
- Belief — *the discipline beats external proof* (philosophy.md belief on running the loop instead of waiting for certainty) — the core message. Not announced; carried by the full lecture arc.
- Belief — *name what you don't know* — lands in the "residual risk as artifact" beat.

**Capability check owed:**
- None specific to the lecture. Capability checks for the exercises are in the exercise files.

**Watch-fors (deferred to facilitator notes pass):**
- Security-literate student challenges the "certainty is a fantasy" frame. Coach: *"The point isn't that classical security is wrong. It's that agents add three properties — non-determinism, instruction-set attacks, emergent capability — that the classical story doesn't cover. STRIDE still works; the categories mean different things."*
- Business-audience student retreats from "threat modelling." Coach: *"The skill does the threat modelling. Your job is to read the report with judgment — that's business judgment, not security expertise."*
- Student asks for the "right" answer to how much risk to accept. Coach: *"That's a business decision, not a technical one. The loop gives you the information; your role decides the threshold. Naming that distinction out loud is the Nordic-compliance move most orgs skip."*
- Variant note: Mid-Management variant can extend the "decide" beat to discuss signing off residual risks as a leadership discipline — who owns the residual, how it gets logged, how the organisation absorbs a residual as operational reality.

**Pass 3 reshape notes (2026-04-28):**
- Title and spine rewritten off `practice` (noun) — Agents 101 retains the absolute ban per `check_writing.md` #2. Now *The discipline of risk* / *The work is the loop* / *the discipline carries*. Meaning preserved; vocabulary swap only.
- Em-dashes cut throughout (rule #14, full em-dash ban for student-facing curriculum). Split into short sentences or used parentheses where the aside was true-parenthetical.
- Time-of-day anchor *"Tomorrow you'll recognise the shape..."* removed (rule #22). Replaced with module-relative phrasing — *"It will still be complex when the next agent gets built. The discipline is what carries."*
- Mood-contract honoured: closing now folds the *"damn, this is complex stuff"* line directly from `bosser-strategy:content-strategy.md` § Module 4 mood. The unease is named as the permanent condition; nothing in the body resolves it. Module 5 owns the rescue.
- Voice trio (Godin × Sutherland × Siilasmaa): Sutherland reframe leads (the "don't open the door" beat is the Rory move). Godin peer-warmth carries the body. Siilasmaa lead is held back (forbidden in unease modules per `check_writing.md` #4 mood-arc constraint).
- "**Time:** 8 minutes." moved below the maintainer divider per `check_writing.md` lecture-meta rule.

**Quality:** compendium-audited 2026-08-03 (writing@b74c5d1 story@b74c5d1 technical@b74c5d1 behavior@b74c5d1 pedagogy@b74c5d1 strategy@b74c5d1 slides@b74c5d1)
- judges @b74c5d1: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

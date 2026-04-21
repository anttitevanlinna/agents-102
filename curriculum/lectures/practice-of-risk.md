# Lecture: The practice of risk

You built something. It works. Would you bet your job on it being safe? Probably not. And that feeling — that specific, uncomfortable, *I'd like to know and I don't* feeling — is the most plain thing in the room today.

Here's the hard part: that feeling doesn't go away. Not with more testing, not with a better policy, not with a certification. Agent systems don't hand you certainty. You can wait for it, or you can get to work.

**Certainty is a fantasy you inherited.**

Software security, done well, sells you a clean story. Perimeter. Access control. Patch the bug, sign off the build, the system is secure. You've probably worked with people who live inside that story and mostly do a good job of it. The story works because classical software is deterministic — same input, same output. You can find the bug, prove you fixed it, and sleep.

Agent systems break the story in three places.

The behaviour is non-deterministic. Same prompt, same files, same tools — different run, different answer. A test that passed yesterday doesn't prove the system passes today.

The attack surface is the instruction set. The dangerous move isn't breaking into your server. It's getting your agent to *decide* to do something harmful with access it legitimately has. Well-formed English, arriving through a document the agent reads. Your firewall doesn't see it because your firewall has never had to worry about persuasion.

Capability is emergent. The agent does what its instructions, its context, and the user's ask imply it should do — combined. You can't fully predict the combination. You can only bound it.

Put the three together: you don't get *secure / not secure.* You get *safe enough, under these conditions, within these limits, for now.* If that sounds less like engineering and more like medicine, it is.

**The practice is the answer.**

You don't get certainty. You get a loop. Four steps, plain, repeatable.

**Assess.** Point a lens at the system and see what it reveals. Today you'll use two. The `company-ai-policy` skill runs your company's actual rules against your actual agent. The `agent-security` skill runs access-control analysis and an agent-shaped version of STRIDE. Neither skill makes you an expert — each skill IS the expert. Your job is to read the reports with judgment.

**Mitigate.** Pick one risk. Apply the smallest change that reduces it. Agentic mitigations are shaped differently than firewalls: scope (give the agent less), split (break it into two agents with different trust levels), filter (post-process the output before it leaves), gate (a human approves before a sensitive action), review (a second agent judges the first's output). None of these are perimeter. All of them are loop design.

**Reassess residual.** After the mitigation, the risk isn't gone. Something remains. Name it. Write it down. *The residual risk here is X — if Y happens, we haven't prevented it, we've made it less likely.* Residual risk as an artifact, not a shame.

**Decide.** Accept the residual on record, or close the door. Those are the two options. "Hope it doesn't happen" is not one.

Run the loop. You never finish; you iterate. The discipline isn't arriving at certainty — it's sustaining the practice.

**The best mitigation is the one you don't need.**

Here's the move nobody puts in a security training, because it sounds too much like common sense to charge for. The cheapest, most reliable way to reduce risk on an agent is to not open the door in the first place.

Should your agent have write access to that system? If not — scope down before you scope up. Should your agent read from that mailbox? If not — don't connect it. Should your agent be the one that drafts customer-facing language? If that's where your biggest risk lives, maybe a human drafts and the agent reviews, not the other way around.

The `company-ai-policy` skill exists partly to tell you which doors not to open. Your company has already decided. Your job is to notice.

Avoidance beats reduction. Scope beats patch. Don't-open beats mitigate. This isn't timid design; it's plain design. Every door you don't open is a residual risk you don't have to name, mitigate, monitor, re-test, or apologise for.

**The uncomfortable part, said plainly.**

Some of your agents are going to be wrong, in ways you won't catch, and ship output you won't love. That's true for every agent in production anywhere in the world right now. The organisations that handle this well aren't the ones with the best technology. They're the ones that run the loop openly, name residual risks plainly, and close doors they don't need to open.

You can't buy certainty. You can build a practice. Today you run the practice once, on your own system, with two skills doing the expert work. Tomorrow you'll recognise the shape when it shows up in the next agent you build.

Read the reports. Pick a risk. Apply a mitigation. Name what's left. Decide.

That's the whole job.

**Time:** 8–10 minutes.

<!-- maintainer -->

**Placement in module:** After Connections, before the exercise. The lecture primes the loop; the exercise runs it.

**Frameworks riffed on:**
- **STRIDE** (Microsoft SDL) — named, reframed as agent-STRIDE. The `agent-security` skill does the category mapping; the lecture just names the ancestor.
- **Principle of least privilege** — the "best mitigation is the one you don't need" reframe. Named in the "don't open the door" section.
- **Residual risk** (ISO 31000 / NIST) — central artifact of the module. Vocabulary adopted without the bureaucracy.
- **Assess → mitigate → reassess → decide** — classical risk-management loop, reshaped for agent systems. Recognisable to anyone with regulated-industry exposure.

**Philosophy callout (sparing):**
- Belief #14 — practice beats proof — is the core message. Not announced as a belief; carried by the full lecture arc.
- Belief #8 — name what you don't know — lands in the "residual risk as artifact" beat.

**Capability check owed:**
- None specific to the lecture. Capability checks for the exercise are in the exercise file.

**Watch-fors (deferred to facilitator notes pass):**
- Security-literate student challenges the "certainty is a fantasy" frame. Coach: *"The point isn't that classical security is wrong. It's that agents add three properties — non-determinism, instruction-set attacks, emergent capability — that the classical story doesn't cover. STRIDE still works; the categories mean different things."*
- Business-audience student retreats from "threat modelling." Coach: *"The skill does the threat modelling. Your job is to read the report with judgment — that's business judgment, not security expertise."*
- Student asks for the "right" answer to how much risk to accept. Coach: *"That's a business decision, not a technical one. The practice gives you the information; your role decides the threshold. Naming that distinction out loud is the Nordic-compliance move most orgs skip."*
- Variant note: Mid-Management variant can extend the "decide" beat to discuss signing off residual risks as a leadership discipline — who owns the residual, how it gets logged, how the organisation absorbs a residual as operational reality.

**Why this lecture exists (Pass 1 reasoning):**
- Original plan was "no lecture" — the skills and debrief carry teaching. Antti's correction: an in-room lecture is needed because the core message ("certainty never exists; the practice is doing the work") is too important to emerge only from the exercise. Students could finish the exercise with the loop mechanics but without the epistemic shift.
- Lecture explicitly honours the mood contract (deepened unease). It does NOT rescue the feeling — it names it as the permanent condition. M5 is the rescue, not M4.
- The "don't open the door" beat is the Rory reframe of the module. Counterintuitive, practical, business-owner-flavoured. Makes the material memorable beyond the loop mechanics.

**Length:** ~850 words — prework-reading target is 800–1200, demo-script is 350–600. This lecture is delivered in-room (8–10 min facilitator script), so it sits above demo-script target. Acceptable because (a) the content density is conceptual, not demo-dependent, (b) the reframe beat needs the space. Could tighten to ~600 if the "three places the story breaks" section is condensed — but the three-part enumeration is load-bearing for security-literate students who need the distinction.

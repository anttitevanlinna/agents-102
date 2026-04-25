# Cowork-edition end-to-end read — opinionated senior practitioner

I'm reading as a CTO who's run two agentic transformations. Cowork-only filter applied: I skipped `.rt-code` blocks and read `.rt-cowork` plus unwrapped prose. Below is what an SVP would actually walk into.

---

## prework.md

**Smell test: 7/10.** Mostly clean. The "perfectly useless thing to own, which makes it more interesting than most of what you produce at work" line is the kind of sentence I want more of — Sutherland-shaped, slightly mean, true. The connector explainer is patient without being condescending. But the recap-site setup tells me to ask Claude to start a local server "running in the background" — in Cowork this means it lives in the connected folder and I'm now mentally tracking a process nobody's told me how to inspect. The instruction "If anything goes wrong, tell Claude and let it sort it out" is the kind of permission that'll backfire on the first SVP whose port 8000 is taken; the agent will fight it and the prework will run forty minutes, not ten.

**Two sentences I'd argue with:**

1. *"You don't run the server; Claude does, inside the session you're already in."* — In Cowork, what does "inside the session" buy me when the session is just a tab? You've hidden the part where the laptop is hosting a web server. Either own that or don't make people start one in prework.
2. *"This is also your first agentic move of the training — you ask, the agent does."* — Asking an agent to start `python -m http.server` is not an agentic move. It's a chore that an agent happens to do. Don't oversell. The snake game is the agentic moment; this isn't.

**Coherence in Cowork mode:** Mostly fine. The connector path-of-least-resistance is OK. One fossil: the "Stuck on the connector or want specific click-paths?" link points at a `claude-quick-reference` that I haven't read and am told I don't need to read. Why is it here.

**Verdict: APPROVE-WITH-TODOs.** Cut the "your first agentic move" oversell. Decide if you really want a local server in prework when the audience is CTOs.

---

## getting-going.md (M1)

**Smell test: 6/10.** The Big Idea line lands. The opening sponsor beat is good — ritual without being ceremonial, a license-to-be-here move that earns its place. Then the patronising creeps back: *"Push back on anything that doesn't match your sense of the work. That's the pattern: every time you do work like this and reflect, the rules file gets sharper."* Two sentences explaining the move, then a third explaining the explanation. **Compound interest on a markdown file.** Bold. Cute. I read it twice and rolled my eyes the second time. One bolded epigram per module is a budget; you've spent it before the exercise even runs.

**Two sentences I'd argue with:**

1. *"That's the move you'll use on every agent file you write from here on: do the work → capture the rules → reflect → sharpen the rules."* — Saying "this is the move you'll use" is the move-shaped phrase that pre-empts the student's own discovery. Let me notice it. Don't put a stage direction in the actor's mouth.
2. *"Then, Claude as cold critic. Now that you've reflected on your own experience, get an unbiased verdict."* — A fresh Claude session with no memory of the build is not an "unbiased verdict." It's a context-poor reader. Calling it unbiased flatters the technique and primes the student to over-trust the cold-critic output. Be honest: it's a *cheap second opinion from an under-informed reader*, useful precisely because it can only see the artifact.

**Coherence in Cowork mode:** "Start a new Cowork session on the same connected folder" — works as written, but you've left the user wondering where the old session goes. Fossil: the cold-critic move feels like it was designed for `/clear` and got translated for Cowork by swap, not by re-thinking. In Code, `/clear` wipes a context. In Cowork, "new session on same folder" creates two parallel things and now I have tab discipline to manage. Worth one sentence on what to do with the old tab.

**Verdict: APPROVE-WITH-TODOs.**

---

## building-agent-systems.md (M2)

**Smell test: 7/10.** Better. The Connections section is the strongest opener in the training: *"Module 1 was for you... Now we turn to work."* That's adult prose. The crux exercise is the right shape — three rounds, *"the crux is worth the three rounds"* — and the inline naming of Rumelt is correctly placed. Antti's pull-quote is doing real work; it earns the box.

But: *"Compound interest on a markdown file"* M1 → *"Watching where it bends is continuous improvement, done by hand"* M2. We're now in epigram-per-module territory. Stop. One Antti voice-line per module is fine; two is brand maintenance.

The Debrief prompt is 200 words long. In Cowork that's fine — paste once. But it asks Claude to "extract — every rule you write should be traceable to a specific moment in the session." The student has not been taught how to verify Claude actually did this. The Debrief asserts a discipline (traceability) the prior exercise didn't drill. Convenient when it works; invisible failure mode when it doesn't.

**Two sentences I'd argue with:**

1. *"Plain text beats databases here because language models are strongest at reading and writing text."* — A tidy half-truth. Plain text wins because *the human can read it and the agent can rewrite it*; the LLM-strength claim is irrelevant. Frame it as the property of the medium (auditable, diff-able, version-controllable), not as a property of the model.
2. *"Watching where it bends is continuous improvement, done by hand."* — This sentence reframes a manual workaround as a virtue. Real practitioners don't watch agents bend by hand; they instrument them. Selling the bug as a feature is the kind of move that comes back when an SVP tries to scale.

**Coherence in Cowork mode:** The session-reset instruction at top reads cleanly. No leaks. Good.

**Verdict: APPROVE-WITH-TODOs.**

---

## multi-agent-systems.md (M3)

**Smell test: 6/10.** Big Idea is excellent: *"Hire three agents to search. Three more to decide. The filesystem is the meeting room."* That's a sentence I'd quote at a CTO. The exercise architecture (4 sessions on the same folder) is the right teaching shape.

But Cowork-mode reads: *"agents inside one session"* — the term "agent" without further qualification, after the exercise just used "agent" to mean "persona we're spawning." The vocabulary is doing too much work. In Code there's a clean distinction (subagent = native primitive). In Cowork the same word ("agent") is the persona, the spawned thing, and the file in `agents/`. The Cowork edition is the one that needs the term most disambiguated and gets it least.

The "Rory seat" is a charming move and I want to like it. But naming a stance after a person — and then telling the student in the maintainer block that *"Wit is a byproduct, not the instruction"* — means the student-facing surface is leaning on a name half the room won't recognise, while the watch-for says "we know this misfires." Either commit to teaching what Sutherland actually does in body, or rename the seat to "the reframer" and leave Rory in the maintainer notes. Don't do both.

**Two sentences I'd argue with:**

1. *"Three stances beat one summarizer."* — Yes, when each stance genuinely holds a position. The moment the student writes a soft prompt for the reframer, the synthesizer averages three stances of the same agent into beige three times faster. The claim should be conditional, not declarative.
2. *"Frameworks are the synthesizer's spine. Without one it summarises. With a framework... it decides."* — A framework doesn't make Claude decide; it makes Claude format. Real decision pressure comes from disagreement at the inputs. Don't hand the framework credit it doesn't earn.

**Coherence in Cowork mode:** The "Cowork calls them **agents**" inline patch works for one mention but the surrounding Key Concepts repeat the swap three more times. Reads slightly mechanical. Fossilised: *"the native Claude Code primitive"* in `.rt-cowork` says "Cowork calls them agents" then immediately calls them "the native Claude Code primitive" — which one is it.

**Verdict: REVISE.** Vocabulary discipline plus the Rory-seat decision.

---

## security.md (M4)

**Smell test: 7/10.** The "I can't tell" framing is the strongest pedagogical move in the training. Genuinely. It lands a hard truth (agent security is non-deterministic) without nihilism. The maintainer TODO at the top of the file admits Phase 0 timing is broken — three minutes for first-time plugin authoring against fresh policy reads is not enough — and the audit caught it. Good. But that means the file ships acknowledging it doesn't work.

Cowork-mode coherence: the install step says *"Cowork: click *Save plugin* in the chat — it registers in your library."* This is the only place a Cowork-specific affordance gets named explicitly. It needs a screenshot or it dies on first contact.

**Two sentences I'd argue with:**

1. *"Mitigations are agent-shaped. Scope, split, filter, review, gate. Not firewalls."* — "Not firewalls" is the kind of contrast that flatters the agent crowd by handwaving classical controls. A real agentic system absolutely uses firewalls — alongside scoping, splitting, filtering. The dichotomy is rhetorical; the practitioner reading this catches the smell instantly.
2. *"You didn't have to become a policy expert or a threat modeller. The plugin carries the expertise you fed it."* — The plugin carries the expertise *you fed it*. Right. Which means if you're not a policy expert or threat modeller, the plugin has the same hole. The sentence implies the plugin is a substitute for expertise; what it actually is, is a vehicle. Be honest: the plugin scales judgement you already have, it doesn't manufacture it.

**Verdict: APPROVE-WITH-TODOs.** The maintainer-flagged Phase 0 reshape is real and gates "ready."

---

## output-quality.md (M5)

**Smell test: 8/10.** This module is the strongest of the eight. The benchmark frame is genuinely contrarian — "you don't pick a detector because someone said so, you measure" — and the maintainer mood-contract ("mechanical rescue, not triumph") is correctly disciplined. The Big Idea is a paragraph; ordinarily I'd cut it; here it's earned.

Three Antti-voice lines in this module ("benchmarking as a pattern", "the scoreboard IS the explanation", "narrow tools that work beat broad tools that pretend"). Two would do. The third is filler.

**Two sentences I'd argue with:**

1. *"The scoreboard IS the explanation."* — This phrase appears three times across module + exercise + maintainer. Each repetition steals from the last. Pick one place; cut the other two. (Pairs with the "compounded learning" memory note about repetition signalling lost variation — your own rule.)
2. *"You can defend the winner; a student who skips it is trusting the machine instead of measuring it."* — Slightly preachy. The student who skips reading the scoreboard hasn't done the exercise; pointing at them as a hypothetical lesser-student is teacher-voice creeping in. Trust the design.

**Cowork coherence:** Clean. The detector dispatch and the "agent" terminology read fine because the exercise really does spawn agents and the prose stays consistent.

**Verdict: APPROVE.**

---

## evaluations.md (M6)

**Smell test: 8/10.** "The judge is sacrosanct" — yes. The SHA-integrity check is the kind of small mechanical move that earns a CTO's trust in two seconds. The walk-away is genuinely magical, and the maintainer-flagged risk ("AMBIGUOUS as of 2026-04-24" on long-running session compaction) is honest.

The Big Idea — *"You walk away. You come back to a sharper judge than the one you left"* — almost contradicts the body, which is at pains to say *the judge does NOT change; the generator does*. Pedantic? Maybe. But the Big Idea sentence will be the one that sticks, and the body says the opposite.

**Two sentences I'd argue with:**

1. *"You walk away. You come back to a sharper judge than the one you left."* — The judge does not get sharper. That's literally the integrity invariant of the exercise. Big Idea contradicts the mechanism. Rewrite to: *"You come back to a sharper generator that the same judge can't fault."*
2. *"What you watch improve is the work."* — Pleasant aphorism. Almost true. What you watch improve is *the strategy file the generator reads*. The generator itself is stateless. Be precise: this matters because the next time the student tries this on a different problem, the strategy is what travels — and if they think "the generator learned" they'll over-trust a cold deployment.

**Cowork coherence:** Clean. The SHA-diff check works identically across runtimes; the prose doesn't leak.

**Verdict: APPROVE-WITH-TODOs.** Big Idea rewrite.

---

## personal-to-team.md (M7)

**Smell test: 7/10.** The JTBD framing is correct and doing the work it should do. The Access-Trust Gap data point lands — though I'd want to see whether the 35-point figure is a zombie stat (research-rules territory; the maintainer doesn't show me the citation chain). The four-strategies frame ("share the whole agent is the vendor pitch") is the kind of contrarian move that earns the room.

But this module is the longest and most paragraph-heavy. *"Two questions to warm up: who's the one person who came to mind just now? And what makes you hesitate about actually handing this to them?"* Good question. Then 600 words of meta-explanation before the exercise starts. Trust the question. Cut the gloss.

**Two sentences I'd argue with:**

1. *"54–95% of enterprises have access. 5–22% have production trust. The gap is always wider than 35 points."* — A 41-point range on the high end is a lot of variance to summarise as "always wider than 35." Where's the sample, the methodology, the source? This is exactly the shape research-rules.md flags as a zombie-stat candidate. If the underlying data is real and methodologically clean, cite it once. If not, don't lead with it.
2. *"A perfect technical plan with no people plan is a PowerPoint."* — Cute, lands well, but it's the third aphorism in the module after "the choice IS the design decision" and "firing the incumbent is the test." Rate-limit one per module and this one wins; the others lose.

**Cowork coherence:** Branch A names "Cowork" as a deployable runtime. Slightly recursive (the student is *in* Cowork right now and now you're naming Cowork as the cloud thing they might deploy to). Worth one disambiguating line: *Branch A's "Cowork" means a Cowork team workspace, not the personal tab you've been working in.*

**Verdict: APPROVE-WITH-TODOs.** Zombie-stat verification on Access-Trust Gap; trim aphorisms.

---

## agents-building-agents.md (M8)

**Smell test: 6/10.** The Big Idea is one sentence — *"The tool that builds tools compounds."* — and that's correct. Brevity is a virtue when the previous module sprawled.

But the close is uneven. The identity-naming beat ("you are now agent builders") is the kind of thing that either lands hard or reads as corporate kickoff. With a real CTO sponsor in the room saying it, it works. As written for self-study via Teacher Claude reading it back, it tips into earnestness. *"You can build another one on the next problem. That's what you carry out. Not the modules, not the files. The fact that you can make the next one."* Reads like a LinkedIn post about a course someone just took.

The "Tentative: Live Deliberation" maintainer-block paragraph is below the fold but worth flagging — that's a draft direction for an exercise the file otherwise pretends is settled. Either commit or move it elsewhere.

**Two sentences I'd argue with:**

1. *"twenty people just produced a strategy kernel no consultant could deliver, because it's grounded in your company's own files."* — The "no consultant could deliver" claim is the kind of competitive-positioning sentence that smells of strategy-doc leak. A consultant with access to the same files could deliver something similar; what makes the cohort version different is *they wrote it themselves* and will own the implementation. Sell the ownership, not the impossibility.
2. *"You do not graduate. You have a flywheel."* — Lands. But three lines later: *"Bootstrap is Step 1 of 5 (Make Your Own is next)."* So I do graduate this thing, and then start a new thing. Pick one. Either flywheel or staircase.

**Cowork coherence:** The Joint Double Diamond exercise is the load-bearing piece and it reads cleanly in Cowork mode (shared folder, agents reading each other's `module-8/<name>/` directories). No fossils visible.

**Verdict: APPROVE-WITH-TODOs.**

---

## Arc-level verdict

**The Cowork edition holds up.** Nothing load-bearing is missing. Plan-mode hiding (M2's Phase 1 build) translates to "ask Claude to write a plan first" without breaking the pedagogy — arguably the Cowork variant teaches the *general* discipline (think before write) where Code teaches a *feature*. The session-reset moves (`/clear` → "new session on connected folder") work, though M1's cold-critic move shows the most translation strain.

Plug points and prompts mostly hold. The vocabulary problem in M3 is the biggest Cowork-specific hazard: "agent" overloads three meanings (persona, spawned subprocess, file in `agents/`) and the Cowork edition has the least native vocabulary to lean on.

The shared cross-module hazard is **aphorism inflation.** Every module has a bolded Antti-voice epigram. By M5 they're noise; by M7 they're brand. Rate-limit to one per module and the strongest (M5's mechanical-rescue, M6's sacrosanct judge) get to do the work they were built for.

The shared cross-module **patronising tic** is "the move you just learned" prose — every module names what the student just did, in the student's own ear. Trust the design more. Adults notice patterns when they recur; the labelling is what makes them feel taught at.

**One arc-level call I'd push back on hard:** M5 says *"only groundedness-for-this-shape-of-output gets rescued."* M6 says *"the judge has moved from object to yardstick. You don't inspect it; you trust it."* Between them, the student is being told the judge is narrow AND now infrastructure-grade. If a CTO ships a judge from Bootstrap into a real production loop, they're shipping a five-claim-benchmark-tested thing as production infrastructure. The seam between "narrow on purpose" (M5) and "trust it" (M6) needs one honest sentence: *the judge runs in a loop because in a loop you can watch its mistakes; production-grade trust comes from watching it miss things over weeks, not from M5's benchmark.*

**Arc verdict: APPROVE-WITH-TODOs.** Strong frame, real teaching, occasional brand creep. The Cowork translation is more competent than I expected; the residual issues are mostly inherited from the dual-runtime source, not introduced by the filter.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/sim-opinionated-senior.md

# Prompt anatomy: the named moves

Code says what to do. Prompts say what to attend to.

A prompt is closer to a piece of advertising copy than to a function definition. Every word is doing pedagogical work on the reader, and the difference between a prompt that returns a wall of mediocrity and one that returns a precise diff is usually three or four moves you may not have noticed were there. Most clauses in a well-shaped prompt are decoration. A small handful are load-bearing.

The right way to read a prompt, your own or somebody else's, is to ask which clauses *would have to be different* for the output to come back wrong. Those are the moves. This page names thirty-three of them, grouped into seven families, plus six recurring three-move combinations at the end.

Use this page as a lookup while reading prompts. Skim labels first. Come back for the entries that catch.

Per-entry shape: bold lead-in carrying both definition and the first beat of the why. Plain continuation. Italicised quote from a real Agents 101 or AE101 prompt at the end.

---

## Shape the input

The agent already has the whole internet in its head. Your job is to tell it which thirty words of it to weight. The four moves in this family are different shapes of *here, not there.*

### Input-binding by path

**Names the exact file the agent should read. Five characters of insurance against an invisible failure.** The agent will guess a path that exists (a near-neighbour, a stale version, the one it cached three sessions ago) and you won't catch it because the output reads plausible. The bug doesn't announce itself. The prompt seems to work. The answer is wrong about a different file. Precision early beats wandering later.

*"Read the test-strategy skill file at `~/.claude/skills/test-strategy/SKILL.md`."*

### Primed context list

**Names which moments of scrollback to weight. Not *everything*, which yields an averaged read.** *Read the scrollback* returns the polite median. *Read these four beats* returns evidence. Without the list, the agent samples broadly and treats every moment as equally important, which means none of them is. The list is a weighting function dressed as a sentence.

*"Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment the skill was invoked on the security-tested feature, the critique exchange."*

### Open hook

**The prompt ends with a colon. You paste your input after, all inside one fenced block.** You have the value more concretely than Claude does: a bug you live with, a feature you own, a delta only you noticed. The hook lets you supply it without a *paste this into chat, then describe your bug* dance. Pasting and typing in one go is the kind of small ergonomic that adds up over a training week.

*"The surface the skill called out harder than I would have:"*

### Sealed context

**Names what Claude has to work with, then closes the door against fabrication.** *That's everything you have* tells the agent: missing context is a fact about the world, not a permission to invent. You also get one line you can audit against later: *did the agent stay inside the seal, or did something quietly leak in?* The seal is most valuable on long-running prompts where you won't be there to push back. The negative form (a hard blacklist naming files the agent must NOT read) is the same move from the other side: when the run has to stay independent of a prior artifact, blocking the read is the seal.

*"Work from the rules I've set up (`CLAUDE.md` team and `CLAUDE.local.md` personal both load automatically), plus the observations at `observations/`, the ADRs, and the skills available by name in this session. That's everything you have. Go."*

*"The subagent must NOT read: `module-5/briefing.md`, `module-5/claim-pool.md`, `module-5/scoreboard.md`, anything in `module-5/detectors/`."*

---

## Shape the target

If a request can be satisfied by ten different outputs, the agent picks the easiest. Constrain the target to one thing, of one shape, above a threshold, and the agent has to argue with itself before answering. Most of the useful work happens in that argument.

### Singular target

**Names *one* of the thing, not *some* of the thing.** *Find sections that underdelivered* returns a polite tour. *Find the one section* returns a commitment. People given options pick the easiest. Constrained to one, they argue with themselves until the choice is defensible. The argument is where the value comes from, not the answer.

*"First: find the one section of the skill where invocation evidence shows it underdelivered."*

### Disambiguation criteria

**A parenthetical naming the concrete shapes that count as the target.** Words like *underdelivered*, *thin*, *load-bearing* are vague. Three concrete shapes in a parenthetical give the agent (and you, reading after) a way to recognise the answer. Without criteria, the fuzzy adjective collapses to *could be better*, which is true of everything and useful for nothing.

*"(a convention the skill claims that the invocation didn't enforce, a codebase-specific failure mode the skill missed, an assumption the invocation had to correct)"*

### Earnable threshold

**Names a condition under which the work happens, and names refusal as a valid outcome.** Most sessions don't produce a durable rule, a ship-worthy artifact, or a team-PR candidate. Without a threshold word, the prompt reads as a request and the agent fulfils it whether or not the work is there to do. *If one earned itself* invites *no* as a first-class answer. Pair with **null-case escape** to give *no* somewhere to go.

*"If one branch from this session sharpened how plans get made in this codebase, write the rule into `./CLAUDE.local.md`."*

### Bounded count

**Caps the number of items the agent returns. Usually three, five, or ten.** *List issues* returns nine. *Ranked top five* returns five with judgment about which mattered more. The cap is also a covert quality test. If the agent can't fill five, the question was over-asked. If it spills into nine, the bar was too low. You learn something about the work whichever way it lands.

*"Return a ranked top-5: thin spots, missing context, wrong assumptions, or unwired tools…"*

---

## Shape the output

The agent's defaults are well-rehearsed: append rather than rewrite, wall of text rather than diff, pre-confirm rather than report, summarise everything after writing. Each move in this family overrides one default by naming the wrong shape out loud.

### Bounded format

**Caps the size and shape of the response. *Two or three lines each. One paragraph. One diff.*** *Show me the diff* returns 40 lines no one reads. *Before and after, two lines each* returns something a human scans in five seconds. The bound also reveals when the change was cosmetic: if the agent can't pick three load-bearing lines, you've discovered the edit didn't earn its diff without doing extra work.

*"Show me before and after, two or three lines each."*

### Anti-pattern guard

**Names the wrong shape of output explicitly so the agent doesn't default to it.** Claude has well-rehearsed defaults: appending a *Critique* heading rather than rewriting, adding a *Brand voice* section rather than voice-shaping every paragraph, ending plans with *would you like me to proceed?* Naming the failure mode out loud is the cheapest way to prevent it. Sometimes the only way.

*"Do not append a critique addendum."*

### Integration mode

**Names whether the new input rewrites *through* the existing artifact or *adds a new section* to it.** Without specification, the agent appends, and you end up with a *Brand voice* section instead of a voice-shaped homepage. *Integrate, not append* tells it the new input reshapes the whole. *Add as a new section titled X* tells it the opposite. No middle ground. The unspoken default is always *append*.

*"…integrate it into `./CLAUDE.local.md` (integrate, don't append; personal file, not team `./CLAUDE.md`)."*

### Sequencing signal

**Words like *first / then / before / after / separately* break the prompt into ordered moves.** Without the sequence, the agent merges adjacent moves into one wall of output and the boundary between two judgments dissolves. *Then, separately* does surprising labor. It tells the agent *two artifacts, two before/afters, two places to push back.* Punctuation marks a thinking pause. Sequencing words mark a working pause.

*"First: find the one section… Then, separately: if one rule about how I worked with security skills… earned itself…"*

### Post-action report

**Asks the agent to tell you what it did *after* doing it, rather than show you what it'll do before.** Pre-confirm adds a round-trip. You steer hypotheticals. Post-action report fires your push-back after the action lands, against real evidence. It also surfaces what the agent *couldn't* do: *I updated the ticket but I don't have a PR link* arrives as candid accounting instead of fabrication. Carve-out: for irreversible actions (deploys, mass sends), keep the pre-confirm.

*"Tell me in 3–5 lines: what you wrote and why, grounded in specific session moments. I shouldn't need to open the file to know."*

### Don't smooth disagreement

**When synthesizing multiple sources or runs, name where they disagreed, and which one you sided with.** Default agent behavior is to harmonize. Take three contradictory inputs and produce one diplomatic output that loses the information. *Don't smooth the disagreement* keeps the dissent visible. The agreement points are easy. The disagreement points are where the real strategic call lives. If a synthesis reads as if everyone agreed, the synthesis was a lie.

*"Name where the three stances disagreed and which one you sided with and why; don't smooth the disagreement."*

### Append-only collaboration

**When multiple processes share state via files, write append-only. Never overwrite earlier findings.** Streaming append unlocks parallel work: another session can read the file while this one writes to it, finding-by-finding. Overwrites in shared state are how concurrent agents step on each other's outputs and produce nothing usable. The discipline matters most when work is split across sessions or runs.

*"Append each finding to `sources/wiki-retrieval.md` as soon as you have it… Never overwrite earlier findings."*

### No-summarize completion

**When the eval has to be honest, tell the agent not to summarize the artifact in chat after writing it.** A summary spoils the read. If you (or the next agent) are about to evaluate the briefing without bias, the briefing's content must not leak into context. *Only confirm that the file exists.* The agent's instinct to recap is the default. The discipline of suppressing it is the move.

*"When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/briefing.md` exists."*

---

## Shape the execution

Six operational moves about *where* the work runs and *how* it gets done. Which session, which skill, which subagent, how many at once. One (preamble suppressor) is psychology dressed as mechanics, which is why it sits here rather than under interaction.

### Skill by name

**Invokes a Claude Code Skill by its registered short name.** Skills register at install time and Claude addresses them by name: `access-control-analysis`, `stride`, `test-strategy`. The folder where `SKILL.md` lives is install-time infrastructure; quoting it inside an invocation prompt is bookkeeping the agent doesn't read. If the skill isn't installed yet, the fix is to install it (a separate prework step), not to point at a path.

*"Invoke the access-control-analysis skill on the feature I'll name."*

### Subagent isolation

**Dispatches a sub-task into a fresh context so the breadth doesn't flood the main thread.** A six-category STRIDE report inside your main conversation pushes everything else off-screen. The subagent reads, processes, returns a structured summary. Your main thread stays scannable for steering. Useful when the sub-task does breadth (audits, sweeps, parallel reads) and you want the main thread for judgment.

*"Run it in a subagent so the six-category output doesn't flood this thread."*

### Parallel-stance dispatch

**Spawn N subagents in parallel, each with a *different* named stance or framing.** The independence is what makes the method work. Three agents given the same prompt produce three indistinguishable answers, and you've burned three times the tokens for nothing. Three agents told *plan backward, test assumptions, find the reframe* produce divergent reads that you can then triangulate. The variance is the signal. The named stances are what create the variance.

*"Spawn three subagents in parallel, each with a different stance. Subagent 1: Backward-from-end planner. Subagent 2: Assumption experimenter. Subagent 3: Counterintuitive reframer."*

### Preamble suppressor

**Tells the agent to skip its *I'll now read X and propose…* narration and lead with the artifact.** Claude defaults to two-to-four sentences of preamble before producing anything. Plan mode is the worst case: the highest-attention slot at the top of the response, the only lines a skimmer reads, gets eaten by narration. *No preamble. Lead with the diff* doesn't kill the habit but bites it down to something you can skim past. Pair with a body primer naming where to look on the page.

*"No preamble. Start with the SHA."*

### Research before ask

**Permits the agent to read the codebase rather than escalating a question to you.** By default, agents ask. Every uncertain branch becomes a question to the human, and ten of those is a tax on your day. *If a question can be answered by reading the codebase, read the codebase* shifts the failure mode from over-questioning to under-questioning. That's the better failure mode once you've named the rest of the inputs cleanly.

*"If a question can be answered by reading the codebase, read the codebase instead of asking me."*

### Fail loud, not fabricate

**Tells the agent to surface a stuck state rather than invent a way forward.** Agents default to producing *something*. Without an explicit fail-loud instruction, a stuck agent fabricates a plausible-looking continuation, and you don't notice because the output reads competent. *Write what you tried and why it didn't work* gives the agent somewhere to go besides invention. The instinct most worth installing in any engineer is the same one.

*"If you get stuck, write what you tried and why it didn't work rather than inventing a way forward."*

---

## Shape the interaction

Conversation has a rhythm. The default rhythm between human and agent is form-filling: agent dumps the list, you fill it in. The moves in this family install a different rhythm. One turn at a time, with explicit triggers for when the file gets touched.

### Iteration lock-in

**Separates the conversation about the artifact from the writing of the artifact.** *Don't touch the file until I say 'lock it in.'* Without the lock-in, the agent rewrites the file after every turn of dialog. Each rewrite costs 30+ seconds, tokens you didn't budget, and the conversation crawls. With the lock-in, dialog is cheap and the write happens once on your trigger. The phrase *lock it in* is the line between iteration and persistence.

*"Don't touch the plan file until I say 'lock it in.' When you do edit the plan, use Edit on the changed section, not Write on the whole file."*

### Batched, not dumped

**Caps how many questions the agent asks per turn. Usually one, sometimes three.** Asked for *the questions you need to encode the skill,* the agent posts a seven-question list and you answer two before drifting. *Ask one at a time* installs conversational rhythm. *Three at a time* trades some rhythm for batch efficiency. Pick by how exploratory the dialog is. Either beats the form-filling default.

*"Ask one question, wait for my answer, then ask the next. Don't show me the next question until I've answered the previous one."*

### Push-back invitation

**Names the moment the agent should expect disagreement, and tells it not to soften.** Default agent behavior is collaborative-leadership mode: every disagreement gets absorbed, every edge sanded smooth. *Push back when my answer is generic* gives the agent explicit permission to do the unflattering thing. Without that permission you get politeness. With it, you get pressure. Pressure is what produces the codebase-specific answer rather than the pyramid-shaped one.

*"Push back when my answer is generic. A judge that says 'check if the output is good' is useless."*

### Self-critique register

**Uses self-critique verbs (*re-read, audit, find what's still surface*). Never defense verbs (*defend, justify, prove*) when asking the agent to interrogate its own work.** *Defend* primes Claude's helpful-advocate mode and produces rationalisations. *Find what's still surface* gives it explicit permission to find fault. Same content, opposite framings, opposite outputs. Defense surfaces excuses. Self-critique surfaces gaps.

*"…ask the skill to disclose its weakest part before you ship."*

---

## Shape the boundary

Every prompt makes implicit choices about where the agent is allowed to act and where it has to hand back. Naming those choices is the difference between an agent that quietly edits your team's `CLAUDE.md` and one that flags the rule for a separate PR. Boundaries that aren't named are boundaries that get crossed.

### Scope guard

**Names which file the work writes to, with the opposite case named out loud.** Agents don't intuitively distinguish personal-gitignored from team-PR-reviewed. *Personal file, not team `./CLAUDE.md`* puts the boundary in front of the agent rather than expecting it to infer. The opposite-case clause is what makes the boundary work. It's the *not that* against the *this*. One without the other is half a guard.

*"…integrate it into `./CLAUDE.local.md` (integrate, don't append; personal file, not team `./CLAUDE.md`)."*

### Escalation lane

**Names the path team-worthy work takes. *Outside* the current session.** Some rules belong on the team rules file. Agents don't unilaterally open PRs against shared infrastructure (and you don't want them to). The escalation lane gives the agent a verb, *flag*, that hands the work back to you for the human conversation that has to happen next. Flagging is the right verb. Committing would be the wrong one.

*"If the rule is team-worthy, flag it in your summary so I can open a separate PR against `./CLAUDE.md` later."*

### Null-case escape

**Names *nothing happened* as a valid outcome. Probably the most important clause in any prompt.** Without it, the agent fabricates a rule, a finding, or a recommendation rather than admit the session didn't produce one. The RLHF instinct to please runs deep. *Say so and skip* promotes refusal to a first-class output. A session that earned nothing and reports earning nothing is a healthier signal than a session that invented one to be helpful.

*"If nothing earned itself, say so and skip the rules-file write."*

### Source-or-flag

**Every claim cites the file or page it came from. If you can't cite, mark `[NOT FOUND]` and don't fill from prior knowledge.** Distinct from null-case escape, which is about whole-prompt refusal. This is about claim-level honesty inside a longer output. The agent's default is to fill gaps with plausible content from training data. The flag turns gaps into evidence the human can act on rather than hidden fabrication. *"I can't tell" is a better answer than a confident guess* is the same move from a different angle.

*"Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write '[NOT FOUND]', do not fill from prior knowledge."*

### Multi-result fallback

**When a grep or filter returns more than one match, names the disambiguation.** *Find the branch starting with `m4/`* assumes one. Reality: pushed branches show local plus remote-tracking, replays leave several `m4/`-prefixed branches, autonomous runs sometimes rewrite the commit message you were keying on. The fallback shape (*if multiple, pick the one whose log includes <marker>; if missing, ask me for the SHA*) is what makes the prompt survive real machine state.

*"There may be more than one — a push leaves both `m4/<slug>` and `remotes/origin/m4/<slug>`, and a replay can leave several… Pick the one whose log includes the 'M4 starting point' commit. If that commit message has been rewritten, ask me for the SHA."*

---

## Shape the continuity

Two small moves that connect a prompt to what came before and what comes after. The artifacts that survive past the current session are the ones named with paths and quoted with evidence.

### Chain back-reference

**Refers to an earlier artifact by both anchor (*the file you just created*) and path (`notes/X.md`).** The anchor is for Claude. It recognises the conversational thread. The path is for replay. A fresh session reads the file by name. Together they survive both same-session continuity and cross-session resumption. Without either, a typo in a filename creates a silent second file and the chain breaks downstream.

*"Invoke the test-strategy skill we just wrote on the feature I'm shipping: the same feature from the previous two exercises, now including the hardening decision from the ADR."*

### Concreteness forcing function

**Names the moment, quotes the beat. Rules with evidence beat rules without.** Rules abstracted from their origin become advice (*"always run STRIDE before access-mapping"*). Rules tied to a moment (*"STRIDE returned six categories and I picked the wrong one because I hadn't read the access surface first"*) carry their evidence with them. The quote is the proof the rule earned itself. Without it, anything can be smuggled in under the label *learned*.

*"Name the moment, not the rule. Quote the specific session beat."*

---

## Three-move patterns

Recognising single moves is the floor. Recognising the combinations is the ceiling. Six patterns recur often enough across the curriculum that naming them is worth the page space. A reader who internalises these six has most of the training in muscle.

### The Compound prompt
*Singular target + scope guard + null-case escape.*

Fires at every module close. *If one rule earned itself, write it to `./CLAUDE.local.md` (personal, not team `./CLAUDE.md`). If nothing earned itself, say so and skip the write.* Pick one thing. Write to the right scope. Allow refusal. The third move is what keeps Compound candid. Without null-case escape, the agent invents a rule rather than admit a quiet session.

Example: `ae101-m2-integrate-branch`, `compound-and-close-1`, `ae101-m3-sharpen-skill`.

### The audit prompt
*Sealed context + subagent isolation + bounded count.*

Fires whenever a prompt asks the agent to read a lot and return a little. *Read these inputs and no others, in a fresh subagent, return a ranked top five.* The seal blocks fabrication. The subagent keeps the main thread scannable. The cap drives prioritisation. Together they convert a wide read into a narrow report.

Example: `walk-and-send-off-2`, the `diagnose-and-resend` family, the introspection moves in `orient-and-introspect`.

### The walk-away prompt
*Sealed context + fail-loud-not-fabricate + post-action report.*

Fires at long-running send-offs where you can't push back in real time. The prompt has to hold the agent candid across the gap on its own: name what's available, refuse fabrication when stuck, tell the truth on return. Three moves, all aimed at the same failure mode. The agent that produced *something* because it was asked to produce.

Example: `ae101-m4-take-task-end-to-end`, `ae101-m5-rerun-packaged`.

### The grill-before-save
*Iteration lock-in + batched-not-dumped + push-back invitation.*

Fires when an artifact needs cross-examination before it persists. *Don't touch the file until I say 'lock it in.' Ask three questions at a time. Push back when my answer is generic.* The lock-in protects the file. The batching keeps the dialog efficient. The push-back instruction tells the agent to drop the niceness tax.

Example: `push-back-on-the-plan-2`, `diagnose-and-resend-6`.

### The skill-author conversation
*Batched-not-dumped + push-back invitation + scope guard.*

Fires when authoring a Claude Code skill from session evidence rather than from a template. *Ask one question at a time. Push back when my answer is generic. Save to `~/.claude/skills/<name>/SKILL.md`. Personal first, team PR later, separately.* The first two install the rhythm. The third names the ship destination so the agent doesn't quietly write to a team-shared path.

Example: `author-test-strategy-skill-1`, `spot-gaps-build-the-loop-3`.

### The multi-perspective synthesis
*Parallel-stance dispatch + don't smooth disagreement + source-or-flag.*

Fires when strategic questions need triangulation rather than a single answer. *Spawn three subagents with named stances. Read the three reads side by side. Name where they disagreed and which one you sided with. Cite every claim or mark `[NOT FOUND]`.* The Agents 101 backbone at M3. The three moves work as a unit: independent sampling, preserved dissent, sourced claims. Drop any one and the method collapses to elaborate-sounding self-confirmation.

Example: `three-minds-one-synthesis-1`, `three-retrievers-one-curator-1`, `self-consistency-after-scoreboard-1`.

---

A well-shaped prompt has three moves doing the heavy lifting and a handful of others quietly. The pattern names above are the load-bearing trios. The decoration around them changes per prompt, but the trio is what makes the prompt work. Recognise the trio and the rest reads itself.

<!-- maintainer -->

**Authoring contract:** prompt frontmatter may carry `anchors` metadata later, but the current renderer does not surface hover highlights. If highlight mode ships, add the frontmatter anchors and renderer support in the same change. Until then, this page is the lookup surface and the examples are the binding.

**Source-of-truth:** the canonical rule-set behind these moves lives in `memory/check_prompts.md` (private). This page is the student-facing surface. The rules file is the author-facing surface. If they drift, the rules file wins and this page updates to match.

**Voice rotation:** Sutherland-tinged across families. Rory for input / interaction / continuity. Boris for output / execution. Roger for target / boundary / three-move patterns. Per-entry shape: bold lead-in carrying both definition and first beat of the why; plain continuation; italicised quote from a real prompt. *What it does / Why it pays / In the wild* labels deliberately stripped. They were training-wheels prose.

**Examples-in-the-wild:** drawn from real Agents 101 and AE101 prompts. When a referenced prompt changes substantively, audit the example here. Verbatim drift breaks the lookup contract.

**Em-dash discipline (per `check_student_facing.md` §14):** body prose carries zero em-dashes. Splits to two sentences, parenthetical (rare), or comma-clause are the legal restructures. One em-dash inside the *multi-result fallback* example is verbatim from a real prompt and stays.

**Count audit:** 33 entries across 7 families (input 4 / target 4 / output 8 / execution 6 / interaction 4 / boundary 5 / continuity 2) plus 6 three-move patterns. Earlier drafts said "twenty-six" and "twenty-eight." Both wrong. Corrected 2026-05-18 on the Agents 101 sweep.

**Sweep coverage:**
- AE101 prompts surveyed: all M1–M6 module-body + AE101-referenced exercises (`ae101-m*`, plus `push-back-on-the-plan`, `compound-and-close`, `walk-and-send-off`, `diagnose-and-resend`, `orient-and-introspect`, `spot-gaps-build-the-loop`, `author-test-strategy-skill`, `map-the-access-surface`, `threat-model-with-stride`, `open-the-side-quest`, `fix-tests-first`, `arc-retrospective`, `extract-the-task-shaping-rule`).
- Agents 101 prompts surveyed: signal-rich sample (`three-minds-one-synthesis`, `three-retrievers-one-curator`, `self-consistency-after-scoreboard`, `hallucination-bakeoff`, `eval-loop`, `compounding`, `audit-your-agent`, `extend-your-system`, `debugging-stuck-agents`, `author-security-skill`, `build-your-challenge-memory`).

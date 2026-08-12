# Exercise lead-in audit — 2026-08-12

Auditing `**What you do:**` / `**What you build:**` / `**The point:**` in `curriculum/exercises/*.md` against `check_pedagogy.md` §52c. Budget: one sentence, ~15 words, no colon-list. Reference: `orient-and-introspect.md` at 9/12/7 words.

**Scope:** 35 files in `curriculum/exercises/`. 5 carry no lead-in trio at all (`build-your-system.md`, `find-the-crux.md`, `find-the-wrong-claims.md`, `organisers-prepare-claude-basics.md`, `organisers-synthesize-rollout.md` — claude-basics-tier files, different shape entirely, out of scope). 30 files carry at least one of the three slots. Of those, 15 are missing `**What you build:**` entirely (structural, not a length defect — see *Out of scope* below), and 2 are missing both `**What you build:**` and `**The point:**`.

Proposed replacements avoid em-dashes, avoid stating counts beside the list they'd enumerate, avoid ordinal cross-references, avoid arc-positioning, and keep the student as grammatical subject where the sentence is about the student's action.

No files were edited. This is a proposal only, per the maintainer approval gate on student-facing body text.

---

## build-your-challenge-memory.md (228 words, worst)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "A chat forgets. A memory remembers. You've just pinned your challenge in `./challenge.md` (the opener). Now you build a memory around it, scoped to the next big challenge you're wrestling with at work. The board paper due in three weeks. The re-org you're shaping. The vendor decision on your desk. Narrow enough that 5–8 topic pages cover it. The empty `sources/`, `memory/`, and `agents/` folders are already in place from prework. Keep the same session running. Claude already has your challenge in scrollback, and `./challenge.md` is on disk. Four phases: curate, put to work, compound, self-maintain." | 96 | Replays the section headers below ("Four phases: curate, put to work, compound, self-maintain" is the phase list verbatim); arc-positioning ("you've just pinned... in the opener") | "Build a memory around the challenge you pinned, then keep it fed and self-checking." | 14 |
| point | "Two things combined make a system: persistence (it remembers) and automation (it runs)... Every module after this one uses the memory you just built. You just ran Recipe 2 end-to-end... the Cookbook for Agent System Design is where the moves and components live..." | 132 | Motivation ("the economics change"); arc-positioning (every-module claim, Recipe/Cookbook citation) | "A memory that only remembers is a toy; paired with automation, it compounds." | 13 |

(No `**What you build:**` slot — see *Out of scope*.)

## audit-your-agent.md (227 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Load the reusable security check you authored in the previous exercise... Four phases. Bring the policy raw report from the previous exercise; that is the baseline. Bring the reusable check you just authored; that is the expert. Bring your Module 3 system; that is the target." | 108 | Replays section headers below ("Four phases. Bring... Bring... Bring..."); arc-positioning to the previous exercise | "Run your security skill against your Module 3 system, then decide what residual risk to accept." | 16 |
| point | "Absolute certainty is not on offer. The discipline is... You just ran Recipe 4 end-to-end on your real system... After Agents 101... the Cookbook for Agent System Design names the moves..." | 119 | Arc-positioning (Recipe 4 / Cookbook citation dominates the slot) | "Certainty isn't on offer; the discipline of naming residual risk is what you can ship." | 15 |

(No `**What you build:**` slot.)

## hallucination-bakeoff.md (208 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Four detectors, same briefing, one scoreboard. You don't hunt for ungrounded claims by hand. You set up a benchmark: a 30-claim pool, four different detection methods, and a scorer that adjudicates the claims against the evidence. The winner (or the ensemble) becomes a judge file you carry into Module 6. The move is empirical..." | 80 | Answers the build question (names "judge file") and states the point's claim ("the move is empirical") in the do slot; arc-positioning ("carry into Module 6") | "Benchmark four hallucination detectors on a 30-claim pool and keep the one that scores best." | 15 |
| point | "Method selection in agent quality work is empirical, not intuitive... You just ran Recipe 5 end-to-end... After Agents 101... the Cookbook for Agent System Design is where the moves and components live..." | 128 | Arc-positioning (Recipe 5 / Cookbook citation) | "Trust a detector because it won your benchmark, not because someone recommended it." | 13 |

(No `**What you build:**` slot.)

## author-security-skill.md (183 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Run the policy files raw against the system you built in modules 2-3. Then package the useful move into reusable expertise... Three phases. The raw run proves the policy files are runnable. The package makes the check reusable. The loading and audit come next. A **skill** packages an expertise... Module 4 is the canonical place this authoring lands. Taught once, here." | 114 | Replays section headers below ("Three phases. The raw run proves... The package makes..."); defines a term of art (belongs in Key Concepts, not this slot) | "Run the security policy files raw, then package the useful move into one reusable skill." | 15 |
| point | "The policy files are source material. The reusable check is the expert in the room... The package is ready; the first loaded use should be the real audit." | 69 | Trailing arc-positioning to the next exercise ("the first loaded use should be the real audit") | "A reusable check is the expert in the room; eyeballing files by hand isn't." | 14 |

(No `**What you build:**` slot.)

## extend-your-system.md (171 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "You've been building agents for seven modules. Today you don't build one. You describe one, and the coding agent builds it. The tool that builds tools. The move stops being linear the moment you see it land. Pick one extension to your system. Something you'd actually use from Tuesday onward. Not a demo. A real gap." | 56 | Arc-positioning ("You've been building agents for seven modules. Today...") crowds out the action, which arrives only in the last sentence | "Describe one real extension to your system and let the coding agent build it." | 14 |
| point | "The seven modules taught you to be a builder. Module 8's first move is watching the builder disappear... You just ran the meta-tool move at the heart of Recipe 8... After Agents 101... the Cookbook for Agent System Design is where the moves live..." | 115 | Arc-positioning throughout (module-as-subject opener, Recipe 8 / Cookbook citation) | "You're the describer now; the agent is the builder." | 9 |

(No `**What you build:**` slot.)

## share-your-work.md (170 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Phase 1. Interview for the job (12 min). The context has been building since the first module. Your memory knows who your teammate is, what the work looks like, where the friction lives. The agent does the heavy lifting. It reads what's already there, drafts a hypothesis about the job, and asks you only the questions that plug real holes." | 60 | Opens by literally repeating the phase heading below it; arc-positioning ("since the first module") | "Let the agent interview you for the job before it proposes who to pick." | 14 |
| point | "Before you design a solution, interview for the outcome... Agent reads your context. Drafts a hypothesis about the job... Asks you seven targeted questions. Produces a brief with an outcome statement. You pick the candidate... You draft both plans. You test the switch, not the solution. A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design." | 110 | Recipe — restates the exercise's own phase sequence step by step before landing on the claim | "A candidate picked for the outcome is design, not one picked to fit the infrastructure." | 15 |

(No `**What you build:**` slot.)

## ground-your-output.md (165 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "There is truth out there. Your sources represent pieces of it... The agent's job is to connect its output to that ground. When it can't reach the ground... it fills the gap. Confidently. Plausibly. With good grammar. The output is ungrounded, and the agent won't tell you which parts." | 78 | Answers the point's question — the whole slot is concept/claim, not an action; no action is named at all | "Ask the agent to flag which claims it can't trace back to a source." | 14 |
| point | "There is truth out there. Your sources carry shards of it... Train your eye today, encode the discipline into rules, let the rules carry it when you're not in the room." | 87 | Near-duplicate of the do slot's opening (both open "There is truth out there..."); trailing recipe/imperative ("Train your eye today, encode...") | "The output's confidence isn't evidence of its truth. Its grounding is." | 11 |

(No `**What you build:**` slot.)

## personal-site-with-guardrails-cb.md (163 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "The site is the canvas. The real move is iterate and learn: change the context, watch the agent's output shift, then package what you learned so the next session starts smarter. By the end, you have a personal site you actually like AND a small rules file the agent can re-read on any future personal-shaped task." | 56 | Answers the build slot's question (names both artifacts — this file has no build slot, see below) | "Change what context you give the agent and watch how its output shifts." | 13 |
| point | "Generic output comes from generic context... You just ran a recipe end-to-end: baseline without context, colleague-as-buyer frame, anti-branding mirror, free iteration loop, portable guardrails file at the close. The move travels..." | 107 | Recipe — restates the exercise's own phase sequence as a colon-list | "Generic output comes from generic context. The model didn't improve between drafts; you did." | 14 |

(No `**What you build:**` slot.)

## extract-the-task-shaping-rule.md (161 words — named worst-offender file for a single slot)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "read back over the plan-mode session you just ran. Ask Claude to surface three to five rules about what made *this* task plan-mode-able... Save those rules to a `.md` file at a location you choose. Then ask Claude how the file could drive automated task-splitting in the future." | 68 | Answers the build slot's question (names the artifact, "a `.md` file"); trailing sentence reaches past this exercise's bound | "Ask Claude to surface three to five rules from the plan-mode session you just ran." | 15 |
| build | "a rules file that carries how you factored this task on this codebase. Three to five task-shaping rules, surfaced from your own session and sharpened in your own words, saved at a location you chose so it fires when you want it. The automation read stays a read: you name the shapes, you don't build them today." | 57 | Repeats "three to five rules" from the do slot; trailing scope-caveat belongs elsewhere, not in artifact-naming | "a short rules file naming three to five ways you factored this task." | 13 |
| point | "the file is the artifact. You captured how *you* factored *this* task on *this* codebase. Templates stay generic; this file carries your rules. The next small lecture names three places this kind of file ends up." | 36 | Trailing arc-positioning ("The next small lecture names...") | "Templates stay generic. This file carries how you actually factored this task." | 12 |

## walk-and-send-off.md (150 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Pick a task you've been avoiding, the kind you'd send off rather than nudge bit by bit. Walk what you've built so far against it. Fill the worst gaps and settle your `observations/` tree on disk. At the close, send the task off, un-packaged, to the same Claude Code session. Leave the laptop awake while you step away, or stop the session when you've seen enough." | 66 | Replays the exercise's own phase sequence (pick → walk → fill → settle → send → leave); answers the build slot's question along the way | "Walk a task you've been avoiding against what you've built, then send it off un-packaged." | 15 |
| build | "two things a long-running session can ride: a scoped task with a 'done' you can name in a sentence, and the worst gaps filled in `observations/` and your rules file, with the `observations/` tree settled on disk. Then it goes off un-packaged." | 42 | Trailing clause ("Then it goes off un-packaged") duplicates the do slot's action | "a scoped task with a nameable 'done', and worst gaps filled in `observations/`." | 13 |
| point | "This is the first experiment of a two-session arc. The un-packaged send-off here is what teaches you what packaging adds, a lesson no lecture can land. Every send-off is a test, not a production run; you are testing and you are learning." | 42 | Arc-positioning — the opening clause is the exact example §52c quotes as the banned shape | "Sending this off un-packaged is what teaches you what packaging adds later." | 12 |

## eval-loop.md (147 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "In Module 5 you ran a benchmark on four detectors and picked the one that caught the most fabrication. The winner got saved as `judges/groundedness-judge.md`. That judge is now yours. It works. You watched it work. Now you stop running it by hand." | 43 | Arc-positioning (Module 5 recap crowds out the action; the actual instruction only arrives in the last, vague clause) | "Wire your groundedness judge into a PDCA loop so it runs without you." | 13 |
| point | "In Module 5 you were the eval. In Module 6 the eval is fixed infrastructure... This is what "we can automate the loop" actually means. Not a scheduled script. A PDCA loop at the eval layer: Plan (generation tactic), Do (generate), Check (judge), Act (rewrite tactic)..." | 104 | Arc-positioning (Module 5 / Module 6 comparison); recipe — spells out the PDCA acronym, which is Key-Concepts material, not a repeatable claim | "The judge moved from object to yardstick. You shape the pressure now, not the output." | 15 |

(No `**What you build:**` slot.)

## joint-double-diamond.md (145 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "In Module 7 you ran three thinking-disciplines on your own sharing problem: Rumelt's *crux*, Roger Martin's *what would have to be true?*, Klein and Kahneman's *pre-mortem*... The deliverable: a Rumelt-style strategy kernel (diagnosis, guiding policy, near-term experiments, ranked risks), a suggested set of agents, and the plan..." | 137 | Arc-positioning (Module 7 recap); answers the deliverable/build question in detail (this file has no build slot) | "Run your three thinking-disciplines through a live, multi-agent forum on a sponsor's real challenge." | 14 |
| point | "You do not graduate. You have a flywheel." | 8 | — already fine — | (no change) | — |

(No `**What you build:**` slot.)

## personal-site-with-guardrails.md (143 words)

Same shape as `personal-site-with-guardrails-cb.md` (this is the CB/non-CB pair of the same exercise — see *Out of scope*).

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "The site is the canvas. The real move is iterate and learn: change the context, watch the agent's output shift, then package what you learned so the next session starts smarter." | 31 | Motivation framing ("The real move is...") ahead of the action | "Change what context you give the agent and watch how its output shifts." | 13 |
| point | "Generic output comes from generic context... You just ran **Recipe 1** end-to-end: baseline without context, colleague-as-buyer frame, anti-branding mirror, free iteration loop, portable guardrails file at the close. After Agents 101... the Cookbook for Agent System Design is where the moves and components live..." | 112 | Recipe — restates the phase sequence as a colon-list; arc-positioning (Recipe 1 / Cookbook citation) | "Generic output comes from generic context. The model didn't improve between drafts; you did." | 14 |

(No `**What you build:**` slot.)

## personal-agent-homework.md (135 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "You built a memory today. One live challenge, curated sources, a compiled set of claims. Now give it a pulse. This homework puts a scheduled agent in front of your memory so it reads the thing every morning and tells you something useful before you've had coffee." | 47 | Arc-positioning recap ("You built a memory today...") ahead of the action | "Put a scheduled agent in front of today's memory so it reports back unprompted." | 14 |
| point | "A memory that sits there is a document... Module 2 built the memory; this homework builds the loop. Every subsequent module compounds on it, and `./style.md` travels with you..." | 88 | Arc-positioning ("Module 2 built... this homework builds... Every subsequent module compounds...") | "A memory that sits there is a document. Read on a schedule, it's a loop." | 15 |

(No `**What you build:**` slot.)

## author-test-strategy-skill.md (131 words — named worst-offender file overall, 71-word do)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Author a test-strategy skill for your codebase, through conversation with Claude, not by typing markdown. Claude asks you what it needs to encode the skill; you push back on the defaults your codebase doesn't fit. Before you ship, ask the skill to disclose its own weakest part. Then invoke the skill on this codebase, ask Claude if the test strategy is any good, sharpen if needed, and ship it personally first." | 71 | Replays the exercise's own phase sequence (author → push back → self-critique → invoke → sharpen → ship) | "Author a test-strategy skill through conversation, then invoke it and sharpen what it misses." | 14 |
| build | "one SKILL.md tuned to how your codebase actually tests, hardened by one forced self-critique and one real invocation, living in your personal skills folder, ready for a teammate to adopt." | 30 | Mild fat around a correctly-named artifact | "one SKILL.md tuned to your codebase's actual tests, hardened by a self-critique and a real run." | 16 |
| point | "Test strategy authored generically is a pyramid diagram. The habit you're learning isn't *"write a SKILL.md file"*; it's *author skills by prompting Claude, push back on defaults, verify by invoking*." | 30 | Second sentence is a recipe (three-item method list) tacked onto a clean claim | "Test strategy authored generically is a pyramid diagram, not a habit." | 11 |

## threat-model-with-stride.md (128 words — named worst-offender)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Invoke the curated STRIDE skill on the access-surface map you built in the previous exercise. You pick one threat worth hardening against, write the decision as an ADR (an Architecture Decision Record) in your repo's convention, and move on." | 39 | Answers the build slot's question (names the ADR and its convention) | "Run STRIDE on your access-surface map, then pick one threat worth hardening against." | 13 |
| build | "one recorded hardening decision. Three moves get you there: a STRIDE walk across the surface you mapped, one threat picked from that walk, and an ADR that captures the call with the rejected threats named as its reasoning." | 38 | Explicit colon-list ("Three moves get you there:") replaying the exercise's own structure | "one ADR: the threat you picked to harden, with the rejected threats as its reasoning." | 15 |
| point | "Threat modeling is only useful if it produces a decision. STRIDE's value is that it gives you a structured surface to reject most threats against (acceptable risk, out of scope, already mitigated) so the one you decide to harden is defensible. The ADR is the artifact your CISO would actually read." | 51 | Parenthetical colon-list-shaped enumeration; two claims stacked | "Threat modeling is only useful if it produces a decision your CISO could defend." | 14 |

## diagnose-and-resend.md (121 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Read the un-packaged artefact through three failure-mode lenses. For each named failure, ask what validation would have caught it in minutes, not hours. Build a verifier shaped against your dominant failure (one of three shapes). Assemble a task-scoped reference artefact + plan.md in conversation. At Debrief, the module re-sends the same task packaged." | 53 | Replays the exercise's own phase sequence; arc-positioning ("At Debrief, the module re-sends...") | "Read the failed run through three failure-mode lenses, then build a verifier against your worst one." | 16 |
| build | "three pieces that make a failed run come back trustworthy: a verifier, a reference, and a plan.md. Each one is built against a specific failure you read in the un-packaged run." | 31 | Explicit colon-list ("three pieces... a verifier, a reference, and a plan.md") | "a verifier, a reference, and a plan.md, each built against a failure you actually read." | 15 |
| point | "a practitioner's pattern earns its name in this exercise. You don't learn it from a slide; you build each piece against a failure you read in your own artefact. The closing lecture names what you built afterward." | 37 | Subject test fail on opener ("earns its name in this exercise" — arc-positioning); trailing arc-positioning to the closing lecture | "You build each piece against a failure you actually read, not one a slide describes." | 15 |

## map-the-access-surface.md (110 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Invoke the curated access-control analysis skill on the small feature you brought to Module 3. Read what it surfaces. Decide, on the record, which surface it called out harder than you would have, and which surface you know matters that the skill didn't catch. Ship the delta as notes the STRIDE exercise consumes next." | 54 | Answers the build slot's question (names "the delta"); arc-positioning to the STRIDE exercise | "Run the access-control skill on your feature, then decide what it missed that you'd catch." | 15 |
| build | "an access-surface map, plus the delta only you can add. The delta is the artifact STRIDE chews on next, not the raw skill output." | 24 | Trailing arc-positioning ("The delta is the artifact STRIDE chews on next") | "an access-surface map, plus the delta only you could add." | 10 |
| point | "STRIDE without an access-surface map is pub-quiz threat modeling. Before you threat-model, you map what you're protecting. The curated skill does the breadth; you own the codebase-specific judgment the skill can't have." | 32 | Restates the same claim twice (opener, then again as "before you threat-model, you map...") | "STRIDE without an access-surface map is pub-quiz threat modeling." | 9 |

## push-back-on-the-plan.md (109 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "take a real multi-file task from your backlog, run it through plan mode, push back twice with what you can see, then start a full second-pass grilling. Keep the questions that materially sharpen the plan. Approve the plan. **Stop.** Don't execute. Compare what your read caught to what the second-pass read caught. That gap is the skill this module is building." | 61 | Replays the exercise's own phase sequence; restates the learning objective verbatim ("That gap is the skill this module is building") | "Push back on your plan twice, then run a second-pass grilling before you approve it." | 15 |
| build | "two reads paired on one plan. Your own two push-backs, in your voice. A second-pass walk-down, three questions at a time. Together they sharpen the plan until you judge it good enough to generate." | 34 | Trailing "together they..." summary — the README's own named tell for this slot | "two paired reads on one plan: your own push-backs, then a second-pass grilling." | 13 |
| point | "two reads, paired. Claude supplies the pressure; you decide when the plan is ready." | 14 | — already fine — | (no change) | — |

## name-your-challenge.md (108 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Module 2 builds you a memory: a folder of your own notes and source material that Claude reads before answering, so it's grounded in *your* world, not the open internet. Think of it as a curated library Claude checks first. It helps you think through a real, live problem you're currently wrestling with. Before anything gets built, the problem gets pinned." | 61 | Subject test fail — opens with "Module 2" as grammatical subject; the actual student action ("the problem gets pinned") is buried and passive | "Name the one live challenge at work you want a memory built around." | 13 |
| point | "The hardest part of a memory isn't the tool. It's the scope. A memory about "our company" is a landfill. A memory about *this decision, this month* is a weapon. Picking the challenge well is half the work; the rest of the module does the other half." | 47 | Trailing arc-positioning ("the rest of the module does the other half") | "A memory about 'our company' is a landfill. About this decision, this month, it's a weapon." | 16 |

(No `**What you build:**` slot.)

## spot-gaps-build-the-loop.md (98 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Diff two sessions of the same task, cut the rule the diagnosis killed, then read your own history for the work you repeat." | 23 | Stacks three actions in one sentence (diff → cut → read) | "Diff two sessions of the same task, then read your own history for repeated work." | 15 |
| build | "a ranked gap map from two sessions of the same task, one stale rule cut from your rules-file, and a diagrammed map of the work that recurs across your stack." | 30 | Three-item recipe-list joined by commas | "a ranked gap map, one rule cut from your rules-file, and a map of recurring work." | 16 |
| point | "You tested at M4, you learned at M5. Here you name what the two sessions cost you and where each lesson belongs. Then you look wider: the same reading, run across everything you do. The stack-map you draw is what the closing lecture builds from." | 45 | Arc-positioning at both ends (M4/M5 recap opener; "what the closing lecture builds from" closer) | "The same reading that catches a gap in two sessions catches gaps across everything you do." | 16 |

## fix-tests-first.md (94 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "fix the bug you brought from prework, tests-first. Ship the PR." | 11 | — already fine — | (no change) | — |
| build | "three things that make a fix trustworthy: a failing test that proves the bug exists, the smallest fix that passes it, and a PR you read line by line before it ships." | 32 | Explicit colon-list ("three things... a failing test..., the smallest fix..., and a PR...") | "a failing test, the smallest fix that passes it, and a PR you read line by line." | 17 |
| point | "tests-first and root-cause-driven is one discipline. Running it with an agent is a second discipline: reading the diff, pushing back when a line is not what you would have written. Both get practised here. The compound move (writing down what you learned) comes later in the module, once the ticket's closed." | 51 | Trailing arc-positioning ("comes later in the module") | "Tests-first is one discipline. Reading an agent's diff and pushing back is a second." | 14 |

## close-the-ticket.md (82 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "read one real ticket, have the agent work out how your team uses its tracker, then close the bug's ticket in that voice." | 23 | Stacks three actions in one sentence | "Have the agent read your tracker's conventions, then close your ticket in that voice." | 14 |
| build | "field-use rules read off your own tracker, and a close-out note on the bug you shipped, landed where your team reads it." | 22 | Mild fat around a correctly-named pair of artifacts | "field-use rules read off your tracker, and a close-out note where your team reads it." | 15 |
| point | "your tracker already encodes how your team works. Status, labels, priority, estimate: each field carries a convention nobody wrote down. An agent that has read those conventions writes a close-out that sounds like your team wrote it." | 37 | Explicit colon-list ("Status, labels, priority, estimate:") | "Your tracker encodes how your team works; an agent that reads it writes like your team." | 15 |

## three-retrievers-one-curator.md (80 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Hire three agents to fetch raw material on your challenge, wiki, docs, the open web. Hire a fourth to curate the findings into your memory in real time, while the retrievers are still running." | 34 | Mild fat, two-sentence stack | "Hire three agents to fetch raw material, and a fourth to curate it in real time." | 16 |
| point | "Multi-agent's first shape: separate sessions on shared files. Each agent runs in its own context, sees the others' work via the filesystem, has its own connectors and history. The feeling, files materialising in two folders at once, four windows churning on one question, is the lesson." | 46 | Opens on a taxonomy label ("Multi-agent's first shape") that reads as Key-Concepts vocabulary, not a repeatable claim | "Files materialising in two folders at once, four windows on one question, is the lesson." | 15 |

(No `**What you build:**` slot.)

## compound-and-close.md (79 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "let Claude review the whole session and write your `./CLAUDE.local.md` from session evidence. Push back where it misread." | 18 | Mild fat | "Let Claude review the session and write your CLAUDE.local.md; push back where it misread." | 14 |
| build | "a rules file written from session evidence. Concrete, specific, yours, and read at the top of every future session in this repo." | 22 | Mild fat, four-adjective run | "a rules file written from session evidence, read at the top of every future session." | 15 |
| point | "the compound step closes Kieran Klaassen's loop: ideate → brainstorm → plan → work → review → polish → **compound** → repeat. It doesn't interview you with three retro questions. The session is the evidence; Claude reviews it and writes. You push back where it misread." | 39 | Explicit colon-list (the eight-step loop enumeration) | "The session is the evidence. Claude reviews it and writes; you push back where it misread." | 16 |

## three-minds-one-synthesis.md (62 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Spawn three subagents inside one session. Each holds a different stance against your curated memory. The main session reads them back, applies a strategy framework, and writes the answer back into your `./crux.md` as a third section." | 37 | Answers the build slot's question (names the artifact, `./crux.md`'s third section) — this file has no build slot | "Spawn three subagents, each holding a different stance against your curated memory." | 12 |
| point | "Multi-agent's second shape: subagents inside one session. Each runs in its own context, returns and disappears. Quick parallel thinking, bounded return, without juggling four windows." | 25 | Mild fat around a correct claim | "Subagents run in their own context, return, and disappear: quick thinking without four windows." | 14 |

(No `**What you build:**` slot.)

## module-3-prework.md (24 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Two reads. Both prime moves the Module 3 exercise leans on. Neither asks you to build anything. Just to arrive with your eyes calibrated." | 24 | Mild fat, close to budget already | "Two reads that calibrate your eyes before the Module 3 exercise." | 11 |

(No `**What you build:**` or `**The point:**` slot — this is a prework reading list, not a build-something exercise. See *Out of scope*.)

## name-your-crux.md (89 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Module 2 produced a memory full of what you've gathered about your challenge. Module 3 turns it into an answer you can act on, starting with the question worth answering. Richard Rumelt calls it the **crux**... Module 3 opens cold. Module 2's `memory/` is on disk; this exercise reads from it. The retrievers in the next exercise go to connectors and the open web..." | 89 | Subject test fail throughout ("Module 2 produced...", "Module 3 turns...", "Module 3 opens cold...") — no student action named anywhere in the slot | "Ask Claude to read your memory and name the crux it points to." | 13 |

(No `**What you build:**` or `**The point:**` slot — see *Out of scope*.)

## open-the-side-quest.md (84 words)

| Slot | Current | Words | Fault | Proposed | Words |
|---|---|---|---|---|---|
| do | "Start a Claude Code session in your repo for security. Fork a sibling worktree for quality, open a second session there, and confirm both sessions read the same codebase from their own working directories." | 34 | Stacks four actions in one sentence | "Fork a sibling worktree and open a second session there, alongside your security session." | 14 |
| build | "two Claude Code sessions running side by side on one git history. A security main lane in your repo, and a quality side lane in a sibling worktree that waits until you author the test-strategy skill there. When one lane runs a long prompt, the other is where you work." | 50 | Trailing usage-instruction ("waits until you author...", "the other is where you work") reads as how-to-use, not artifact-naming | "two sessions on one git history: a security lane in your repo, a quality lane in a worktree." | 18 |

(No `**The point:**` slot — see *Out of scope*.)

---

## Already fine (in scope, no change proposed)

- `orient-and-introspect.md` — do (10w) / build (12w) / point (7w). This is the reference exemplar; confirmed clean on re-read.
- `joint-double-diamond.md` — point: "You do not graduate. You have a flywheel." (8w). Genuine claim, survives the deletion test, well under budget.
- `push-back-on-the-plan.md` — point: "two reads, paired. Claude supplies the pressure; you decide when the plan is ready." (14w). Clean reframe, under budget.
- `fix-tests-first.md` — do: "fix the bug you brought from prework, tests-first. Ship the PR." (11w). One action, no fat.

---

## Out of scope but worth flagging

1. **15 files carry no `**What you build:**` slot at all** — a structural gap, not a wording defect: `audit-your-agent.md`, `author-security-skill.md`, `build-your-challenge-memory.md`, `eval-loop.md`, `extend-your-system.md`, `ground-your-output.md`, `hallucination-bakeoff.md`, `joint-double-diamond.md`, `name-your-challenge.md`, `personal-agent-homework.md`, `personal-site-with-guardrails-cb.md`, `personal-site-with-guardrails.md`, `share-your-work.md`, `three-minds-one-synthesis.md`, `three-retrievers-one-curator.md`. All 15 are Agents 101 (not AE101) exercises — every AE101 file audited here carries all three slots. This reads like a training-level convention gap rather than 15 independent oversights, and is worth a maintainer decision on whether Agents 101 exercises should adopt the trio or whether the two-slot shape is deliberate for that training.
2. **2 files carry only `**What you do:**`**, missing both build and point: `name-your-crux.md`, `module-3-prework.md`.
3. **1 file carries do + build but no point:** `open-the-side-quest.md`.
4. **`personal-site-with-guardrails.md` and `personal-site-with-guardrails-cb.md` are a near-duplicate pair** (same exercise, "cb" = claude-basics variant) carrying near-identical do/point prose with independent drift already visible (the -cb version's point cites "a recipe end-to-end" generically; the non-cb version cites "**Recipe 1**" by name and points at the Cookbook). Fixing one without the other re-creates the drift the pair already shows signs of.
5. **`build-your-challenge-memory.md`'s do slot references `./challenge.md` as already pinned "(the opener)"** — a cross-reference by position rather than name; worth checking against `check_student_facing.md` §18's ordinal-reference rule on a future pass, though it wasn't flagged here since it's not a length defect.
6. Several point slots across the Agents 101 files close on a "You just ran **Recipe N** end-to-end... the Cookbook for Agent System Design..." paragraph (`audit-your-agent.md`, `author-security-skill.md` [no], `build-your-challenge-memory.md`, `extend-your-system.md`, `hallucination-bakeoff.md`, `personal-site-with-guardrails.md`). This is a repeated template block, not independently drafted per file — worth checking whether it's meant to survive as a Cookbook cross-reference living below the point slot (a fourth structural element) rather than being folded into the point sentence, since collapsing it into the point is what's driving several of these word counts over budget.

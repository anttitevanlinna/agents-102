# The yarns at depth: what AE101 has, and what it means for Agents 101

Working brief for the yarn threads. Version 3. A reader who knew only AE101 attacked versions 1 and 2; this version carries both sets of corrections. Source: every AE101 lecture and figure, eight exercises, the progression page. Paths are under `curriculum/`.

## 0. What went wrong so far

A yarn is not a word that recurs and it is not a cell per module. The threads (this one included) counted handles and filled grids. AE101 has no grid. It has one loop, and every module is that loop met again with a different part of it under construction.

## 1. What AE101 has: one closed loop, nested, built by experiment

**The loop** is drawn in `figures/student-closed-loop.md`, "the shape robotics and autopilots have run on for decades":
- a **setpoint**: "THE SPEC, what done means". Also "Say what done-done means... every run, and every check you build, measures against the same line" (M5 page), and the governor "Name the uncertainty before you move" (`the-loop-half-filled`);
- the **plant**: the agent session, with named disturbances, "drift, rot, stale rules";
- a **sensor**: "TESTS, DIFF, EVAL... reads what came back";
- the **gap**, "desired minus actual", fed back;
- **containment** beside the sensor. It senses nothing and bounds what the plant can damage: "The blast radius is the branch", "Fence the reef, not the open water".

**Context is the medium of the whole loop, not one arrow in it.** It shapes the run before it moves ("Your context files are the agent's model of the system... Thin model, thin steering"). It is also how feedback arrives: "Each iteration the LLM receives context (system prompt, conversation, tool results)" (`the-agent-loop`), and the outer path in `figures/double-loop.md` ends "RESULT → READ THE GAP → SHAPE FUTURE CONTEXT". A reference "stays readable mid-session". So context is written before the run, grown by the run, and rewritten after it.

**Why the loop is needed: the machine's own mechanisms.** The model mirrors the person who asks and agrees with them. "Errors stack until a check resets them." "Drift grows with distance since the last check." These three are why a sensor exists and why its cadence matters. A sentence that names a loop part without one of these mechanisms under it is a label, not a mechanism.

**It is nested.** `figures/double-loop-m6.md`: "The inner loop fixes the run. The outer loop builds the system." The outer loop's question is printed on the figure: "did the rule fire, help, or hurt?" Its action: "add a rule, cut a rule".

**It is the same at every size.** "One loop, three sizes": the agent's act, read the result, correct; you around a session; the slow loop that carries a win to the team. M1 runs all of it on a one-line bug: "The loop is the shape. The bug today was the excuse."

**Every part is a claim, and testing is rationed.** The agent's report is "a hypothesis to check". The plan: "plausible isn't good enough". Your own agreement: "your instinct is not a check on it". The rule: `story-of-module-6` reports "four separate violations across four independent LLM instances. The grep pass caught each one", under the heading "A rule in context is not a rule in the output". The green gate: "The gate is a claim too". The published playbook: "A prediction is not a measurement". A test counts only when it is independent: "something the system under test does not control".
AE101 does not say "verify everything". It says where to spend the test:
- "where redo is cheap, let the session sail";
- "there is no time to test everything";
- "Aim the read at the unknown that teaches you the most".
So the law is: test where drift, irreversibility or uncertainty is highest, with something the part does not control. The chain of tests ends in a person: "Taste closes the gap". The watcher is not one more claim to test. The watcher decays ("Each clean task is real evidence of competence and real erosion of your vigilance") and reps are the counter ("when did you last do this kind of work by hand?").

**The method is experiment.** "The agent is the apparatus, your rules and context are the setup, and the result is data." The M4 run is sent un-packaged on purpose so there is a baseline. Playbooks and the kit are candidates until a re-run makes them "tested-here". One session is a sample, so pass rates, not one pass. Changes have side effects (the M6 prompt asks what packaging introduced). "Change on recurrence, not on noise."

**Checks and rules expire.** Each check is "a claim that this is a place the model still needs you, and claims like that expire". "Retire what the next model outgrows." "The kit compounds; the model rotates."

### The yarns are the parts of this loop

- **Context** is the medium (above). It biases, it does not bind, which drives a migration: "Must happen goes in a hook; recommended stays in a prompt." It is paid for in attention: "every always-loaded rule rides into every session".
- **Control** is the sensor, the containment, and the measured trust in both. Not reading ("Control is interrogation"), not restriction. Its picture is `figures/delegation-frontier.md`, and the causation runs one way: "The frontier moves outward only as fast as the gates behind it." A check that gets cheap licenses more reach. Reach never comes first.
- **Compounding** is the outer loop. It edits the context, the sensor and the structure when a gap recurs. It is not rule logistics: "Nothing on that list is a rules file... A test that proves the bug is the same move in a different file. So is a doc that stops lying." It cuts as well as adds. It keeps good examples and not only corrections: "Prohibitions stop; taste steers... Capture the good example beside the corrections." Its measure is a fixed yardstick: "The yardstick stays put and the system learns against it."
- **Agents building agents** is the outer loop worked by an agent. "The agent reviews the whole scrollback in one shot and drafts your rules." "Loop it, instead of you starting it." Planted by name in M2: "The first agent's output becomes the second agent's context." It holds under three limits. Independence: the agent is "an optimizer aimed straight at your gate", so its judge sits outside its reach. Expression: "The agent stops where your judgement begins." Authority: "Agents don't unilaterally change shared team infrastructure. You do." And for the person: "prove it on yourself, then promote", "Don't make general what you don't practice yourself." AE101 "stops short of" the self-pruning system and leaves it "for your team to automate".

**What turns from module to module.** One switch and one sequence. The switch is the sensor: in the near half "You were the feedback signal", in the far half the system reads its own result. AE101 draws the switch on its map: the checking loop reads "by hand for now" in `figures/map-engine.md` and "by your evals now" in the filled map. The sequence is which thing is under construction, and it ends on the check and the kit, not on more reach. M5 and M6 add no reach: the same task is re-sent and two runs are diffed.

**The person is a component with mechanisms.** Working memory to protect, a reading bottleneck ("the reading becomes the bottleneck, not the generating", so "Ask for a ranked list"), backpressure ("Every unread diff joins a queue downstream"), vigilance that decays, reps that keep judgement alive. The line the person holds moves: "Judgement becomes expression one piece at a time... The line never goes away."

AE101 does not claim the field is settled: "places, not a pipeline", "a menu, not a checklist", "no way has won". The loop is the constant. The contents are candidates.

## 2. Agents 101 is the same loop, opened on purpose and then closed

**The claim, and its test.** Module 3 runs the loop open at the largest handoff of the course: six agents produce a briefing and nothing checks whether it is true. The Module 3 page says so today ("It does not check whether the briefing is true"). The test of whether this is an experiment or only a topic order is AE101's own: is the open run measured again? It is.
- Module 5's benchmark runs on the Module 3 briefing. It "IS the test corpus".
- Module 6 regenerates the Module 3 system's output under the fixed judge.
So Module 3 is the baseline, Module 5 builds the sensor on it, Module 6 closes the loop on it. This is AE101's M4 to M6 move (un-packaged run, then diff, then the gate), stretched across four modules. The pages do not say this. Aligning them to it is the main job.

**How the loop's state moves.** Closed by hand in M1, on material the person knows cold. Thinner in M2, where a memory and one agent exist and the person checks a plan and citations. Open in M3. Bounded in M4, with still nothing that checks truth. Sensed in M5. Closed without the person in M6, with the judge fixed and the outer loop run by an agent. In M7 and M8 the same loop at team and organisation size.

**The Agents 101 figure.** `figures/agent-picture.md` draws model, context, tools, goal, boundary, loop and "You, one level up". It draws the inner feedback ("the result, appended to the conversation", "round again, without you"). It does not draw an independent sensor, a gap against a setpoint, or an outer loop, and its goal is "your message", which is a weak setpoint. It is AE101's agent loop without the engineering around it. The course builds exactly the three missing parts.

**Three things Agents 101 has to do that AE101 does not.**
1. **Build the sensor from nothing.** An engineer arrives with tests and CI. A leader's analysis has no sensor at all. M5 is where knowledge work gets its first one, and it is built AE101's way: candidates, a benchmark, a winner, a stated limit ("Don't pick a method. Run the candidates.").
2. **Contain without a branch.** A sent mail cannot be un-merged. Containment means reversibility. Antti's Shingo ladder orders it, strongest first: make the move unavailable, make being wrong structurally impossible, catch at source, catch downstream, remind. M4's five mitigations (scope, split, filter, gate, review) are that ladder under other names.
3. **Close the loop through other people.** The work ends in someone else's week. The reading bottleneck and the queue downstream are M7's subject, and AE101 has the mechanism already.

**The mood arc is the loop's state, felt.** The unease of M3 is a loop running open at the largest handoff so far: the frontier's reckless corner from the inside. M5 relieves it because a sensor exists. M6 widens reach because a tested check licenses it. Wording that explains the unease as a feeling about quality is shallow.

**Open gaps, stated as gaps.**
- M7's sensor is one named person's reaction and M8's is the room. Both are single human samples, against "One session is a sample." Either the exercises gain a check that is not one person, or the pages say plainly that this is a first sample and not a result.
- No Agents 101 debrief cuts a rule, asks "fire, help, or hurt?", or keeps a good example.
- Nothing in Agents 101 expires. No page says a check or a rule is retired when the next model outgrows it, though the closing lecture says "The model will change. Your memory will not."
- The frontier picture (reach against calibration) is absent. An autonomy ladder sits in a supplementary.

## 3. Each yarn in Agents 101

### Setpoint (not one of the four; they all hang from it)
`challenge.md`, the crux, "what good means", the goal-nudger. The file is not the setpoint. The setpoint is what the judge measures against, and the M6 goal-nudger is that being made judgeable: "judgement becomes expression" in Agents 101's own material. Treat "what would have to be true?" as the setpoint question.

### Context: the medium the agents assemble for themselves
In a chat the person writes the context. In an agent system the agents assemble most of it by acting: they search, read tool results, take another agent's file as given. So the person's work moves from writing context to governing how it gets assembled, and AE101 names the loop for that: the audit that walks "the system you have against the system the task needs", and the habit "ask where it read that". Agents 101 has the audit as a skill in M4.
- Context can be thin without looking thin, and where it ends the model continues fluently. M5's subject is the edge of the context.
- Context carries instructions from whoever wrote it. M4's "Well-formed English is the attack surface" is the same fact. M4 and M5 are one property of the window seen from two sides, taught today as two topics.
- Loading it costs attention. Agents 101 never says this.
- Feedback is context too. What the judge returns in M6 is context for the next round. That is how the loop closes.
Agents 101's own ground: most of what makes a personal agent work is context nobody wrote down (M7), and what an organisation has written down outlasts every model.
Shallow forms: "give it more background", "a better prompt", context as M1's topic, context as something loaded once at the start.

### Control: sensor, containment, and trust in both
Agentic control is not a person approving outputs. It is: which class of action is licensed by which check, and how well that check has been tested. The M6 mail question is that question, and its own answer includes "automatic when the groundedness judge passes". Ask it as "which check would let this go without me?", never as "would I approve this one?".
The yarn turns on itself where AE101's does: the judge is a claim ("You haven't checked the judge yet"), one pass is a sample, and the watcher decays ("The better it gets, the less you watch").
Control is rationed. Not every output needs a check. Where redo is cheap and the action can be undone, let it run. Spend checks where the action cannot be undone or the uncertainty is highest. A page that says "always double-check" teaches the opposite of AE101.
Shallow forms: "push back", "always double-check", control as the security module or the eval module, any sentence in which the person reads everything.

### Compounding: the outer loop, which selects and cuts
Compounding is anything a run leaves that changes the next run, and in Agents 101 the thing left climbs in kind: a rule, a sharpened memory, handoff rules, a method that travels, a sensor, a tactic rewritten under a fixed judge. Every debrief is the outer loop, already worked by the agent. What is missing is what makes it a loop and not a pile:
- its question, "did the rule fire, help, or hurt?";
- cutting;
- good examples kept beside corrections, or the result is a list of don'ts;
- Antti's Deming sort before any rule is written: rerun it. A miss one time in five is the sampler, so change the structure and write no rule. A miss five in five is assignable, so fix it. "Scar tissue crowds out the rules that mattered";
- the Shingo order: a closed door or a judge compounds harder than a sentence in a rules file;
- expiry.
M6 is where compounding and control meet: "A yardstick you rewrite is not a yardstick." Without a fixed sensor the outer loop cannot tell learning from drift.
Shallow forms: "save it to a file", "update the rules", the word compounding in every module.

### Agents building agents: the outer loop's hands are an agent's
From M2 the student never writes an agent by hand, so the yarn is enacted everywhere and named once.
- **The system builds its own parts, including the part that checks it.** The agent writes the agent (M2), starts and discards helpers (M3), drafts the skill (M4), builds the detectors and the judge (M5), rewrites its tactic (M6).
- **That is safe only under independence.** M6 holds the rule and proves it with a hash: the loop may rewrite the tactic and may not touch the judge. This is the law of self-improving systems sitting in one exercise as an integrity check. It is the yarn's centre.
- **It stops at expression and at authority, and the first stop moves.** A hundred agents are a matter of describing them, so the scarce things are what the person can describe and what they can test. What reaches a colleague or a team goes through the person: prove it on yourself, then promote. This is the M7 and M8 rule and neither page has it.
Antti's flywheel article names the limits (memory, meaning and correctness, processing). His Deming draft gives the ending: "The thing doing the work is also the thing building the jigs... But only with measurement."
Shallow forms: "ask Claude to write your prompt", M8 as a surprise, counting agents.

## 4. Working rules for the yarn threads

**One writer holds each page.** Four yarns meet on every page, most of all M6. Four writers rewording one page four ways is the failure. So pages go by module:
- M1 and M7: context writer.
- M2 and M6: compounding writer.
- M4 and M5: control writer.
- M3 and M8: agents-building-agents writer.
The page holder aligns all four yarns on that page from this brief. The other three send the holder a passage and the mechanism it should carry. They do not edit the page. Where the Module 7 loop thread holds a page, edits go through it.

**The test for every reworded passage.** Name the artefact this module's exercise leaves, and what the student's agent system does differently on its next run because of it. If the exercise leaves neither, change the exercise or drop the claim. Tagging a sentence "sensor" or "outer loop" does not pass this test.

**One worked example** (M5 debrief, `output-quality.md`).
BEFORE: "The agent reviews the benchmark and adds rules to the root instructions file so future sessions check groundedness before trusting output."
Why it is shallow: the benchmark just produced a tested sensor, and the debrief turns it back into a reminder. "A rule in context is not a rule in the output." It only adds.
AFTER (direction, not final wording): "The agent reviews the benchmark and sets the winning detector to run on every briefing. It writes a rule only where no check can stand, and it names one earlier rule the check now makes unnecessary."
Artefact: the saved groundedness judge in the student's judges folder. Next run: M6's loop regenerates the briefing and the judge reads it, with nobody remembering to. The change reaches the debrief prompt, so it needs Antti's "prompt-ok" before it goes in.

**Then the standing rules.**
- Align, do not add. Reword what a slide, example, Big Idea, Key Concept or debrief already says. Remove recap slides and labels. Big Idea wording is Antti's.
- Let the exercise make the move, then name it once.
- Hand work is not shallow by itself. It stays where the loop needs it: reps, calibrating the judge against the person's own judgement, setting what good means, promoting to the team. It is shallow where an agent or a check could do it and the person does it from habit.
- Where structure is missing, change structure: a figure state, an exercise step, a debrief that cuts. Not a sentence.
- Your edit is a candidate. Its first test is an independent one that costs little: a fresh reader that has read only AE101 and this brief, asked to find the shallow form. The simulated students are an uncalibrated judge of wording, and their scores have not matched Antti's reading. No eval run starts without Antti's go. Do not wait on Antti for wording, and label what is untested as untested.
- Write in AE101's voice: short declaratives, the actor named, no course talk.

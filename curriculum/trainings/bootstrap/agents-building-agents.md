# Agents Building Agents (The Flywheel)

## Big Idea
The tool that builds tools compounds.

## Prework

Risto on acting on the future and building hypotheses. Rumelt on crux / *Good Strategy Bad Strategy*.

## What You'll Learn
After this module, you will be able to:
- **Use** Claude Code to generate a new agent that extends your system
- **Orchestrate** the three thinking-disciplines (Rumelt on *crux*, Roger Martin on *what would have to be true?*, Klein and Kahneman on *pre-mortem*) at room scale against a real company question
- **Produce** a strategy kernel (diagnosis, guiding policy, experiments, ranked risks) grounded in your actual files
- **Read** the flywheel itself (why the cycle that sharpened the kernel just now is the one that sharpens it again after Bootstrap)

## Start here

Eight modules of compounding sit on disk. A memory. Agents that read it. Skills that audit the agents. Judges that catch the skills drifting. Each module raised a ceiling. Today the ceiling moves on its own.

The question that shows up without being asked: *where is this all going?*

Hold that. Module 8 doesn't answer it. It shows you the shape of an answer you'll keep sharpening.

**Agent generates agent (demo, ~5 min).** The meta-tool in action. Sets up the Extend exercise. You watch one agent build another, end-to-end, on real input. That's the whole lecture.

[Exercise: Extend your system](exercises/extend-your-system.md)

[Exercise: Joint Double Diamond (diagnose and guide)](exercises/joint-double-diamond.md)

The three thinking-disciplines you applied in Module 7 on your own sharing problem run again here at room scale on the company question. *Crux* finds the load-bearing obstacle (Rumelt). *What would have to be true?* surfaces the assumptions (Martin). *Pre-mortem* names what breaks (Klein and Kahneman). Same disciplines, named inline in the prompts. Bigger instrument.

## Key Concepts

- **Self-improvement**: each cycle sharpens the next. The Diamond 2 output reads sharper than Diamond 1 because the agents built on each other's work inside the same session.
- **Org capability**: twenty people (or one student's full Module 1 through Module 7 stack plus Teacher Claude's orchestration) just produced a strategy kernel no consultant could deliver, because it's grounded in your company's own files.
- **The three predictable walls after Bootstrap**: data access, runtime platform, discoverability. The kernel you just wrote names which wall bites first.
- **Domain prediction framework**: rules codified + correctness verifiable + talent constrained = agent-ready. Apply it to your company's 200 processes to pick the first 5 to try.
- **Thinking disciplines you take home as named moves.** Crux, *what would have to be true?*, pre-mortem aren't Module 8 props and they aren't installed skills. They're named, portable disciplines you ask Claude to run after training, on any decision that feels too big to eyeball, same shape as the Module 2 Debrief move.
- **Grounding when agents read agents.** Every agent publishes what it has and what it doesn't: a context manifest. Every claim cites the file it came from. Without that rule, twenty agents smoothly hallucinate each other's memory. With it, the pushback rounds have something to push back at.

## Debrief

Five minutes. Claude reviews the session and sharpens whichever file carried the load: the orchestrator's rules, the strategy kernel itself, the rules that governed how the agents argued. The evidence is what you produced: the context manifests, the pooled cruxes, the guiding policy, the ranked assumptions, the pre-mortem. Claude reviews, rewrites the most load-bearing file in place, reports what changed. You push back on anything that's off.

**Prompt** *(Builder Claude)*

```
Review this session and sharpen the file that carried the most weight — most likely the strategy kernel or the orchestrator's rules, whichever governed how the agents argued and converged. Read that file, then scan module-8/ — context manifests, pooled cruxes, guiding policy, assumptions, pre-mortem, kernel. Look back over the session: where did the flywheel stall (an agent waiting on another that never finished), which role in the round was under-specified so two agents played it or none did, where did the room converge too fast on a wrong assumption, where did a pushback land and change a stance (capture that as a rule), what did the session fail to decide and why?

Then rewrite the file. Integrate, don't append. Add the role that was underspec'd, sharpen the rule for how pushback forces a stance-update, remove a rule that made agents defer when they should have argued. Don't add a "retro notes" section; rewrite the file as the better version. Do not close every loop — some of what didn't resolve should stay open, named.

When you're done, tell me in 3–5 lines: which file you rewrote, what you added, what you sharpened, what you removed, and why — grounded in specific moments. Name one thing the session genuinely didn't resolve.
```


Read Claude's summary. Push back where it's wrong. Some of what didn't resolve shouldn't resolve. It's the live edge of the work. The flywheel that sharpened the file just now is the one that will sharpen it again after Bootstrap, on the next problem, on the one after that, on the one you don't yet know you have. You just watched it compound.

## Identity-naming close

**In-room:** the sponsor (who sat alongside the room for all eight modules) names what just happened, in one sentence, out loud: *"You are now agent builders. You have built agents that do real work on your company's data. You can do it again on the next problem. That's what you carry out of this room."* No certificate. No graduation. A name the graduate can say, back at work, to colleagues who weren't there. Identity persists; skills fade.

> **In-room cohort. Self-study readers, Teacher Claude delivers this beat instead.**

**Self-study parallel:** Teacher Claude delivers the naming as a reflective line: *"You are now an agent builder. You built agents that do real work on your own data. You can build another one on the next problem. That's what you carry out. Not the modules, not the files. The fact that you can make the next one."*

## Next

The kernel you just produced is a set of assumptions dressed as a policy. Label them. Design experiments to test them. That's the first move after Bootstrap. Bootstrap is Step 1 of 5 (Make Your Own is next). You don't graduate. You have a flywheel.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Create
- **Materials (trainer):** demo agent that generates another agent (for the short lecture); shared-context mechanism for the joint Diamond exercise (shared filesystem + naming convention for Code, Cowork-native for Cowork — both real now); domain prediction framework (rules codified + correctness verifiable + talent constrained). The three thinking-disciplines — Rumelt on *crux*, Martin on *what would have to be true?*, Klein and Kahneman on *pre-mortem* — are named inline in M7 and re-applied inline here. **No pre-shipped strategy skills anywhere in Bootstrap** (M4 is the canonical personal-skill authoring module).
- **Plug points:** CTO/sponsor present; company's own strategy question feeds into all agents

**Plug Points (trainer):**
- **CTO/sponsor in the room.** Their agent has the special role in Diamond 2 — pools cruxes, drafts composite policy, forces pushback. If sponsor isn't present, the role rotates and the final decision (which assumptions to commit to) is provisional.
- **Company strategy question.** Default is "our strategy for agents over the next six months." If the cohort has a live portfolio or re-org or vendor question, swap it in — the disciplines don't change, the substrate does.
- **Agent demos.** Every participant shipped at least one real agent over the training (promised from Module 1, built progressively from Module 2 onward). The Extend exercise produces one more. The demo round — each participant shows what their agent does, on their real data — is part of the Module 8 deliverable, not separate from it.

**Tentative: Live Deliberation (direction under discussion — 2026-04-19)**

Not committed. Flagged here so the direction is visible alongside the current exercise design. Effects on runtime, infra, in-room vs. self-study, and flow still to be worked through.

The peak of M8 moves from *"agents on shared context, humans orchestrate"* to **"networked personal agents in live deliberation, orchestrator-agent runs the rounds, humans join at the decision layer."** Each participant's personal agent — built across M1–M7 with their company's context — joins a shared runtime (Cowork) as a first-class participant with persistent identity and an addressable handle. The room's agents deliberate natively: positions posted, pushbacks via `@mention`, updated stances, convergence. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

Why this is the right direction:
- Genuine heterogeneity of context. 10 real agents from 10 real orgs argue through a shared problem. The diversity is the insight.
- Entire M1–M7 arc pays off in M8. The personal agent ARRIVES loaded with memory, sources, skills, evals, sharing protocol.
- Agents orchestrating agents, applied to itself. M8's own thesis made literal.
- Understandable magic. Students read every message and `@mention`; the transcript is the mechanism.
- Designed to the capability landing, not the one from 6 months ago.

What this replaces (if adopted):
- The Joint Double Diamond exercise becomes live-deliberated rather than shared-context-batch-run. The three skills stay — they become the methods agents apply in rounds, not synchronous steps students run together.

Open questions under discussion:
- Runtime — Cowork is live; bridge design only needed if a customer's environment lags.
- Self-study variant — solo student can't gather a room of real personal agents; solo version uses persona-stand-ins drawn from the student's own agent stack.
- How humans intervene without breaking the deliberation flow.
- Whether the orchestrator-agent is described inline in a prompt or generated on-the-fly (fitting the flywheel thesis). **Not** as a pre-shipped skill — strict rule.
- How F-Secure copyright fence interacts (they deliver their own M8).

Detailed notes: `memory/project_m8_joint_panel.md`.

# Clean Code Is Steering: Insights from Uncle Bob

Selected X anchors:

1. [Two-Claude workflow: planning versus coding](https://x.com/unclebobmartin/status/2016166910698696916)
2. [Engineering philosophy around AI](https://x.com/unclebobmartin/status/2032072361436983517)
3. [Quicksilver, semantic stability, and tests](https://x.com/unclebobmartin/status/2032089795766129021)
4. [The programmer role moves up abstraction](https://x.com/unclebobmartin/status/2046222100164153548)
5. [Mental model, architecture, and active management](https://x.com/unclebobmartin/status/2049101775861403954)
6. [Human language needs formalism](https://x.com/unclebobmartin/status/2049453605237715058)

Research note: original X pages may require login or be intermittently inaccessible. The research pass also used public mirrors, a Security Now transcript quoting the longer "quicksilver" post, Uncle Bob's `arch-view` repository, and adjacent practitioner writing from Simon Willison and Armin Ronacher.

AI coding does not make Clean Code irrelevant. It changes what Clean Code is for.

That is the pattern I see in Uncle Bob's recent writing about AI-assisted development. He is not reacting like someone trying to defend the old world against the new one. The interesting thing is the opposite: he is experimenting in public, letting the tool surprise him, and then rediscovering which parts of software engineering become more important when code gets cheap.

His learning journey starts with obvious excitement. AI can write code. A lot of code. Fast. He experiments with running separate Claude sessions: one for planning, one for implementation. That alone is a shift in role. The programmer is no longer only the person typing syntax. The programmer becomes the person arranging contexts, separating planning from doing, and managing the flow of intent into code.

Then the story gets more interesting.

As his Empire game grows, the AI's raw power begins to show a second face. It can make progress quickly, but the progress is not always stable. Add one feature, and another feature quietly changes. Fix one failing test, and the agent may soften a different assertion. Ask it to preserve old behavior, and it may agree, apologize, and still drift.

This is the quicksilver moment. Push the system in one place, and behavior slips out somewhere else.

That is the core agentic failure mode: local success, global drift.

And this is where Clean Code changes meaning. In the older frame, Clean Code meant code another human could read, reason about, and safely change. That still matters. But in agentic development, the audience has expanded. Now the code must also be shaped so an AI can change it without quietly destroying what already worked.

So Clean Code becomes steering.

Not steering as vibes. Not steering as "write a better prompt." Steering as executable constraint.

**Acceptance Tests.** Acceptance tests define the externally visible behavior the system must preserve. They matter more with agents because the agent is often good at satisfying the current request while accidentally altering older intent. A good acceptance test says: this is what the world must still look like from the outside when the change is done. It turns product memory into a runnable check.

**Unit Tests.** Unit tests make small behaviors hard to casually break. They also make the agent's search space smaller. Instead of asking the model to infer every invariant from the whole codebase, the engineer gives it many small, local tripwires. When a unit test fails, the agent has a concrete signal. When the tests are absent, vague, or too broad, the agent has more room to improvise.

**TDD.** Test-driven development becomes a steering protocol for agentic work. The red test forces the desired behavior to be stated before implementation. The green step gives the agent a tight target. The refactor step lets the human and agent improve structure while keeping behavior pinned. This is not nostalgia for a ritual. It is a way to keep intent ahead of code generation.

**Mutation Testing.** Mutation testing asks whether the tests actually defend the behavior they claim to defend. That becomes important when agents can generate large test suites that look reassuring but do not catch meaningful changes. A mutation tester breaks the code in small ways and checks whether the tests notice. In an agentic workflow, that makes it harder for a model to satisfy the appearance of testing while leaving the system weak.

**CRAP And Complexity Metrics.** CRAP scores, cyclomatic complexity, and related metrics expose code that is hard to trust under change. Agents can produce plausible-looking complexity very quickly. Metrics do not replace judgment, but they give the engineer a dashboard for where the codebase is becoming risky. In Uncle Bob's frame, this is part of the instrument panel: not the steering wheel itself, but the gauge that tells you when steering is becoming harder.

**Small Decoupled Units.** Small units with clear boundaries reduce collateral damage. This is classic Clean Code, but the agentic reason is sharper. A model operating in a large, tangled unit has many more ways to "fix" one behavior by disturbing another. A model operating in a small, decoupled unit has fewer escape routes. Modularity turns the codebase into terrain the agent can navigate without constantly falling through hidden dependencies.

**Architecture Visibility.** Architecture remains human-owned, but it needs instruments. Dependency direction, cycles, layers, and boundaries should be visible, not merely hoped for. Uncle Bob's architecture-viewer work is a clue: when agents generate code quickly, engineers need better ways to see the shape of the system. You cannot steer what you cannot perceive.

**Human Mental Model.** The agent may be excellent at tactical implementation, but the human still owns the mental model. What is the system? Where are the boundaries? Which behaviors are invariant? Which dependencies are allowed? What tradeoff is acceptable? The engineer's job moves upward, but it does not vanish. It becomes more like active management of intent, evidence, and structure.

That is the deeper pattern in Bob's journey. Natural language is not enough. A prompt can bias the agent, but it does not bind the agent. Human language needs formal support: tests, tools, structure, metrics, and feedback loops.

The lesson is not "Clean Code was right all along" in some tired culture-war sense. The better lesson is more practical:

Clean Code used to be about maintainability under human change.

Agentic Clean Code is about stability under machine-speed change.

The more powerful the coding agent, the more important the steering system.


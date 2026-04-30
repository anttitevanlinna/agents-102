# Clean Code Is Steering: Insights from Uncle Bob

*Referenced from: Module 5 (learn from the test, re-send packaged).*

Research note: original X pages may require login or be intermittently inaccessible. The X messages are linked in context below. The research pass also used public mirrors, a Security Now transcript, Uncle Bob's `arch-view` repository, and adjacent practitioner writing from Simon Willison and Armin Ronacher.

AI coding does not make Clean Code irrelevant. It changes what Clean Code is for.

That is the small trick in this shift. The old discipline looks less exciting at exactly the moment it becomes more valuable.

That is the pattern in Uncle Bob's recent writing about AI-assisted development. He is not reacting like someone trying to defend the old world against the new one. The interesting thing is the opposite: he is experimenting in public, letting the tool surprise him, and then rediscovering which parts of software engineering become more important when code gets cheap.

His learning journey starts with obvious excitement. AI can write code. A lot of code. Fast. He experiments with running separate Claude sessions: one for planning, one for implementation.

> "I'm keeping two Claude windows open. One making changes to the source code. The other helping me to plan future changes. This uses my time better since I spend a lot less time waiting for Claude to finish.
>
> The two Claudes are in two different directories, both have git repos of the project. The planning directory has rules that prevent source code changes. Only planning is allowed. I manually pull and push changes between the two." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2016166910698696916)

That alone is a shift in role. The programmer is no longer only the person typing syntax. The programmer becomes the person arranging contexts, separating planning from doing, and managing the flow of intent into code.

Then the story gets more interesting.

As his Empire game grows, the AI's raw power begins to show a second face. It can make progress quickly, but the progress is not always stable. Add one feature, and another feature quietly changes. Fix one failing test, and the agent may soften a different assertion. Ask it to preserve old behavior, and it may agree, apologize, and still drift.

This is the quicksilver moment. The code feels compliant, but the system is not yet trustworthy. Push it in one place, and behavior slips out somewhere else.

That is the core agentic failure mode: local success, global drift.

And this is where Clean Code changes meaning. In the older frame, Clean Code meant code another human could read, reason about, and safely change. That still matters. But in agentic development, the audience has expanded. Now the code must also be shaped so an AI can change it without quietly destroying what already worked.

> "Juniors entering the field will still need to understand what code is. But they won't need most of the philosophy that we've been used to. The emphasis will all be on pragmatics and engineering. So they won't need to know OOP, but they will definitely need to know dependency inversion. They won't need to know functional programming, but they'll definitely need to understand purity and the costs of mutability. They won't need to know about structured programming, but they will need to understand modularity." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2032072361436983517)

So Clean Code becomes steering.

Not steering as vibes. Not steering as "write a better prompt." Steering as executable constraint. The strange thing is that the unglamorous parts of software engineering become the parts that let you move fastest.

> "Tests are no longer expensive.
>
> Extremely high coverage is achievable and beneficial and there is no excuse for not pursuing it.
>
> Code quality is measurable and can be enforced by metrics.
>
> Modularity is critical.
>
> Architectural discipline is critical." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2032089795766129021)

**Acceptance Tests.** Acceptance tests define the externally visible behavior the system must preserve. They matter more with agents because the agent is often good at satisfying the current request while accidentally altering older intent. A good acceptance test says: this is what the world must still look like from the outside when the change is done. It turns product memory into a runnable check.

**Unit Tests.** Unit tests make small behaviors hard to casually break. They also make the agent's search space smaller. Instead of asking the model to infer every invariant from the whole codebase, the engineer gives it many small, local tripwires. When a unit test fails, the agent has a concrete signal. When the tests are absent, vague, or too broad, the agent has more room to improvise.

**TDD.** Test-driven development becomes a steering protocol for agentic work. The red test forces the desired behavior to be stated before implementation. The green step gives the agent a tight target. The refactor step lets the human and agent improve structure while keeping behavior pinned. This is not nostalgia for a ritual. It is a way to keep intent ahead of code generation.

**Mutation Testing.** Mutation testing asks whether the tests actually defend the behavior they claim to defend. That becomes important when agents can generate large test suites that look reassuring but do not catch meaningful changes. A mutation tester breaks the code in small ways and checks whether the tests notice. In an agentic workflow, that makes it harder for a model to satisfy the appearance of testing while leaving the system weak.

**CRAP And Complexity Metrics.** CRAP scores, cyclomatic complexity, and related metrics expose code that is hard to trust under change. Agents can produce plausible-looking complexity very quickly. Metrics do not replace judgment, but they give the engineer a dashboard for where the codebase is becoming risky. In Uncle Bob's frame, this is part of the instrument panel: not the steering wheel itself, but the gauge that tells you when steering is becoming harder.

**Small Decoupled Units.** Small units with clear boundaries reduce collateral damage. This is classic Clean Code, but the agentic reason is sharper. A model operating in a large, tangled unit has many more ways to "fix" one behavior by disturbing another. A model operating in a small, decoupled unit has fewer escape routes. Modularity turns the codebase into terrain the agent can navigate without constantly falling through hidden dependencies.

**Architecture Visibility.** Architecture remains human-owned, but it needs instruments. Dependency direction, cycles, layers, and boundaries should be visible, not merely hoped for.

> "I had the AI write a visualization tool for me. I found it quite useful.
>
> If there's some projection of the code or the system you want, get an agent to build it for you." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2049225231273767154)

Uncle Bob's architecture-viewer work is a clue: when agents generate code quickly, engineers need better ways to see the shape of the system. You cannot steer what you cannot perceive.

**Human Mental Model.** The agent may be excellent at tactical implementation, but the human still owns the mental model. What is the system? Where are the boundaries? Which behaviors are invariant? Which dependencies are allowed? What tradeoff is acceptable? The engineer's job moves upward, but it does not vanish. It becomes more like active management of intent, evidence, and structure.

> "A good mental model of the system you are building. A mental model of the AI is also important.
>
> The word "manager" may be getting lost in translation. You need to manage the structure, design, architecture, and process of building the software." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2049124461127864613)

That is also the abstraction shift. The code generator gets faster; the human job does not vanish. It moves toward the work of deciding what must remain true.

> "Assemblers were faster at writing binary than humans were.
>
> Compilers were faster at writing assembly than humans were.
>
> AIs are faster at writing compiled languages then humans are.
>
> Deal with it. There's still plenty left for you to do." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2046222100164153548)

That is the deeper pattern in Bob's journey. Natural language is not enough. A prompt can bias the agent, but it does not bind the agent. Human language needs formal support: tests, tools, structure, metrics, and feedback loops.

> "I completely agree with Dykstra. Human language is the worst possible language to program a computer in. Some kind of formalism is absolutely necessary. But the formalism does not have to be in the syntax of a particular computer language." — Uncle Bob, [X](https://x.com/unclebobmartin/status/2049453605237715058)

The lesson is not "Clean Code was right all along" in some tired culture-war sense. The better lesson is more practical, and more useful:

Clean Code used to be about maintainability under human change.

Agentic Clean Code is about stability under machine-speed change.

The more powerful the coding agent, the more important the steering system.

<!-- maintainer -->

**Quality:** draft 2026-04-30

**Source verification:** Research pass captured in `continuous-research/platform-watch/cross-platform/runs/2026-04-30-1324-uncle-bob-clean-code-agentic-second-ooda.md`. Direct X links are embedded in context; mirror/transcript caveat is student-visible because original X access is inconsistent. Supporting sources: Security Now transcript `https://www.grc.com/sn/sn-1070.htm`; Uncle Bob `arch-view` repository `https://github.com/unclebob/arch-view`; Simon Willison agentic engineering patterns; Armin Ronacher agentic coding recommendations.

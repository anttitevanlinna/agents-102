# Clean Code Is Steering: Reading Uncle Bob's Agent Experiments

AI coding does not make Clean Code irrelevant. It changes what Clean Code is for.

The old discipline looks less exciting at exactly the moment it becomes more valuable.

Uncle Bob's recent writing about AI-assisted development shows that happening in real time. He is not defending the old world against the new one. He is experimenting in public, letting the tool surprise him, and then rediscovering which parts of software engineering become more important when code gets cheap.

His learning journey starts with obvious excitement. AI can write code. A lot of code. Fast. He experiments with running separate Claude sessions: one for planning, one for implementation.

> "I'm keeping two Claude windows open. One making changes to the source code. The other helping me to plan future changes. This uses my time better since I spend a lot less time waiting for Claude to finish.
>
> The two Claudes are in two different directories, both have git repos of the project. The planning directory has rules that prevent source code changes. Only planning is allowed. I manually pull and push changes between the two.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2016166910698696916)

That alone is a shift in role. The programmer is no longer only the person typing syntax. The programmer becomes the person arranging contexts, separating planning from doing, and managing the flow of intent into code.

As Empire (the game he's building with this two-window setup) grows, the AI's raw power begins to show a second face. It can make progress quickly, but the progress is not always stable. Add one feature, and another feature quietly changes. Fix one failing test, and the agent may soften a different assertion. Ask it to preserve old behavior, and it may agree, apologize, and still drift.

This is the mercury problem: the code feels compliant, but the system is not yet trustworthy. Push it in one place, and behavior slips out somewhere else.

The core agentic failure mode is local success, global drift.

And this is where Clean Code changes meaning. In the older frame, Clean Code meant code another human could read, reason about, and safely change. That still matters. But in agentic development, the audience has expanded. Now the code must also be shaped so an AI can change it without quietly destroying what already worked.

> "Juniors entering the field will still need to understand what code is. But they won't need most of the philosophy that we've been used to. The emphasis will all be on pragmatics and engineering. So they won't need to know OOP, but they will definitely need to know dependency inversion. They won't need to know functional programming, but they'll definitely need to understand purity and the costs of mutability. They won't need to know about structured programming, but they will need to understand modularity.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2032072361436983517)

So Clean Code becomes steering.

Steering here means executable constraint, not a better prompt. The strange thing is that the unglamorous parts of software engineering become the parts that let you move fastest.

> "Tests are no longer expensive.
>
> Extremely high coverage is achievable and beneficial and there is no excuse for not pursuing it.
>
> Code quality is measurable and can be enforced by metrics.
>
> Modularity is critical.
>
> Architectural discipline is critical.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2032089795766129021)

## Acceptance tests catch what a request quietly breaks

**Acceptance Tests.** They define the externally visible behavior the system must preserve. They matter more with agents because the agent is often good at satisfying the current request while accidentally altering older intent. A good acceptance test says: this is what the world must still look like from the outside when the change is done. It turns product memory into a runnable check.

## Unit tests shrink the agent's room to improvise

**Unit Tests.** They make small behaviors hard to casually break. They also make the agent's search space smaller. Instead of asking the model to infer every invariant from the whole codebase, the engineer gives it many small, local tripwires. When a unit test fails, the agent has a concrete signal. When the tests are absent, vague, or too broad, the agent has more room to improvise.

## TDD keeps intent ahead of the code

**TDD.** Test-driven development becomes a steering protocol for agentic work. The red test forces the desired behavior to be stated before implementation. The green step gives the agent a tight target. The refactor step lets the human and agent improve structure while keeping behavior pinned. Intent stays ahead of code generation.

## Mutation testing checks whether the tests defend anything

**Mutation Testing.** It asks whether the tests actually defend the behavior they claim to defend. That becomes important when agents can generate large test suites that look reassuring but do not catch meaningful changes. A mutation tester breaks the code in small ways and checks whether the tests notice. In an agentic workflow, that makes it harder for a model to satisfy the appearance of testing while leaving the system weak.

## Metrics are the dashboard, not the wheel

**CRAP And Complexity Metrics.** They expose code that is hard to trust under change. Agents can produce plausible-looking complexity very quickly. Metrics do not replace judgment, but they give the engineer a dashboard for where the codebase is becoming risky. In Uncle Bob's frame, this is the gauge that tells you when steering is becoming harder.

## Small units leave fewer places to hide

**Small Decoupled Units.** Clear boundaries reduce collateral damage. This is classic Clean Code, but the agentic reason is sharper. A model operating in a large, tangled unit has many more ways to "fix" one behavior by disturbing another. A model operating in a small, decoupled unit has fewer escape routes. Modularity turns the codebase into terrain the agent can navigate without constantly falling through hidden dependencies.

## Architecture needs an instrument panel too

**Architecture Visibility.** Architecture remains human-owned, but it needs instruments. Dependency direction, cycles, layers, and boundaries should be visible.

> "I had the AI write a visualization tool for me. I found it quite useful.
>
> If there's some projection of the code or the system you want, get an agent to build it for you.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2049225231273767154)

Uncle Bob's architecture-viewer work is a clue: when agents generate code quickly, engineers need better ways to see the shape of the system. You cannot steer what you cannot perceive.

## The human's job moves up, it doesn't vanish

**Human Mental Model.** The agent may be excellent at tactical implementation, but the human still owns the mental model. What is the system? Where are the boundaries? Which behaviors are invariant? Which dependencies are allowed? What tradeoff is acceptable? The engineer's job moves upward. It becomes more like active management of intent, evidence, and structure.

> "A good mental model of the system you are building. A mental model of the AI is also important.
>
> The word "manager" may be getting lost in translation. You need to manage the structure, design, architecture, and process of building the software.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2049124461127864613)

The code generator gets faster; the human job moves toward the work of deciding what must remain true.

> "Assemblers were faster at writing binary than humans were.
>
> Compilers were faster at writing assembly than humans were.
>
> AIs are faster at writing compiled languages then humans are.
>
> Deal with it. There's still plenty left for you to do.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2046222100164153548)

Natural language is not enough. A prompt can bias the agent, but it does not bind the agent. Human language needs formal support: tests, tools, structure, metrics, and feedback loops.

> "I completely agree with Dijkstra. Human language is the worst possible language to program a computer in. Some kind of formalism is absolutely necessary. But the formalism does not have to be in the syntax of a particular computer language.", Uncle Bob, [X](https://x.com/unclebobmartin/status/2049453605237715058)

The lesson is not "Clean Code was right all along." The better lesson is more practical, and more useful:

Clean Code used to be about maintainability under human change.

Agentic Clean Code is about stability under machine-speed change.

The more powerful the coding agent, the more important the steering system.

<!-- maintainer -->

**Source-access note:** original X pages may require login or be intermittently inaccessible; the X messages are linked in context in the body. Research pass also used public mirrors, a Security Now transcript, Uncle Bob's `arch-view` repository, and adjacent practitioner writing from Simon Willison and Armin Ronacher.

**Quality:** compendium-audited 2026-07-26 (writing@b3143a4 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@9697944 slides@9697944)
- judges @9697944: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

<!-- backing -->

Claims
- `clean-code-changes-what-its-for` · vision · "AI coding does not make Clean Code irrelevant. It changes what Clean Code is for." ← none-owed
- `old-discipline-more-valuable-when-less-exciting` · vision · "The old discipline looks less exciting at exactly the moment it becomes more valuable." ← none-owed
- `martin-experiments-in-public` · vision · "He is experimenting in public, letting the tool surprise him, and then rediscovering which parts of software engineering become more important when code gets cheap." ← none-owed
- `two-window-split` · detail · "I'm keeping two Claude windows open. One making changes to the source code. The other helping me to plan future changes." ← martin-two-windows
- `six-fundamentals` · detail · "**CRAP And Complexity Metrics.** They expose code that is hard to trust under change." ← martin-six-fundamentals
- `acceptance-tests-preserve-visible-behaviour` · vision · "They define the externally visible behavior the system must preserve." ← none-owed
- `unit-tests-shrink-the-search-space` · vision · "They also make the agent's search space smaller." ← none-owed
- `tdd-states-behaviour-before-implementation` · vision · "The red test forces the desired behavior to be stated before implementation." ← none-owed
- `mutation-testing-checks-the-tests` · vision · "It asks whether the tests actually defend the behavior they claim to defend." ← none-owed
- `small-units-reduce-collateral-damage` · vision · "Clear boundaries reduce collateral damage." ← none-owed
- `architecture-needs-instruments` · detail · "Dependency direction, cycles, layers, and boundaries should be visible" ← martin-manage-structure, martin-visualization
- `human-owns-the-mental-model` · detail · "the human still owns the mental model" ← martin-manage-structure, martin-ais-are-faster
- `dijkstra-formalism` · detail · "Dijkstra" ← martin-dijkstra
- `juniors-need-pragmatics` · detail · "Juniors entering the field will still need to understand what code is. But they won't need most of the philosophy that we've been used to." ← martin-juniors
- `the-learning-arc-itself` · detail · "His learning journey starts with obvious excitement." ← martin-security-now, martin-two-windows, martin-ais-are-faster

Sources
- martin-two-windows `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2016166910698696916 — [practitioner direct] Robert C. Martin, the two-window split: plan directory and code directory, manual pull-push. oEmbed-verified. **`due:none`** — a dated first-hand post about what he was doing then; re-reading it next year cannot change it, and the body frames his arc as a learning journey rather than as current practice.
- martin-juniors `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2032072361436983517 — [practitioner direct] juniors need pragmatics and dependency inversion over OOP/FP labels. oEmbed-verified.
- martin-six-fundamentals `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2032089795766129021 — [practitioner direct] the six fundamentals: tests cheap, coverage, metric-enforced quality, modularity, architecture, constrain AIs. oEmbed-verified. **This is the load-bearing stamp of the page** — it is the one post that maps onto the body's section list rather than onto a single sentence.
- martin-ais-are-faster `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2046222100164153548 — [practitioner direct] *"AIs are faster… Deal with it. There's still plenty left for you to do."* oEmbed-verified.
- martin-manage-structure `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2049124461127864613 — [practitioner direct] *"manage the structure, design, architecture, and process."* oEmbed-verified.
- martin-visualization `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2049225231273767154 — [practitioner direct] *"get an agent to build [a visualization] for you."* oEmbed-verified. Corroborated by his own `arch-view` repo: https://github.com/unclebob/arch-view
- martin-dijkstra `[checked:2026-05-25 result:OK due:none]` https://x.com/unclebobmartin/status/2049453605237715058 — [practitioner direct] the Dijkstra / formalism quote. **The tweet spells it "Dykstra"** — Martin's typo — and body carries the correct "Dijkstra" as a kind silent correction. Recorded here so a future verifier who greps the source for "Dijkstra" and finds nothing does not report a fabricated quote. oEmbed-verified.
- martin-security-now `[checked:2026-05-25 result:OK due:none]` https://www.grc.com/sn/sn-1070.htm — [practitioner interview] Security Now transcript, used as supporting context for the arc rather than for any single body sentence. **Source-access note:** original X pages 402 to direct fetch and may require login; every quote above was verified through the oEmbed endpoint, which returns author and text. fallback: quote from the transcript and the mirrors instead of the X permalinks.

Frameworks
- Clean Code · [borrow:software engineering] · law:none · ← martin-six-fundamentals — Martin's own body of work, credited in the title
- Test-driven development · [borrow:software engineering] · law:none · ← cultural-vocab
- Mutation testing · [borrow:software testing] · law:none · ← cultural-vocab
- Steering is executable constraint · [borrow:none] · law:steering-is-executable-constraint-your-stance-is-the-ceiling · ← none — the page's thesis: the old discipline is how you steer, not how you tidy
- Good regulator · [borrow:cybernetics] · law:good-regulator · ← cultural-vocab — the human keeps the model of the system; the agent does not have one

Stance `[stance:2026-08-01 level:L1]`
- holds: that classic Clean Code practices become steering instruments under agentic development. One named practitioner, working through it in public, with seven verified posts behind him. The body is careful about this — it frames his arc as a learning journey rather than as a verdict the field reached.
- contested: **the mapping between his seven posts and this page's eight sections, which is looser than the section headings imply.** The six-fundamentals post carries most of the load; acceptance tests, TDD and mutation testing are the discipline he has taught for decades rather than things he said about agents in these posts. That is legitimate synthesis of a body of work and it is not the same as quotation. The title carried the risk and was changed 2026-08-02: *Insights from Uncle Bob* promised eight recent claims, *Reading Uncle Bob's Agent Experiments* promises what the page does. Do not restore the old title; the looseness it papered over is real and stays named here.
- would-move-it: Martin publishing a position that contradicts the steering framing, or a second practitioner of his standing arriving at the same reframe independently, which would take it to L2 and let the page stop leaning on one figure.

OODA
- question: has Martin's position moved, and is anyone else reframing classic quality discipline as agent steering rather than as tidiness?
- roster: Robert C. Martin, Kent Beck, Martin Fowler, Dex Horthy, Adam Tornhill
- last-run: 2026-08-01

<!-- /backing -->

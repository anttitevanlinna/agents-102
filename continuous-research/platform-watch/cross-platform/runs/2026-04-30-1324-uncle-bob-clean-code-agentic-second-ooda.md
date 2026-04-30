# Uncle Bob / Clean Code / Agentic Development - Second OODA

- date: 2026-04-30
- topic: Uncle Bob and Clean Code in agentic development
- evidence_level: L1 practitioner pattern, with L2-adjacent empirical checks on agent testing behavior
- sources:
  - https://w.twstalker.com/unclebobmartin
  - https://www.grc.com/sn/sn-1070.htm
  - https://github.com/unclebob/arch-view
  - https://lucumr.pocoo.org/2025/6/12/agentic-coding/
  - https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/
  - https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/
  - https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/
  - https://arxiv.org/abs/2603.13724
  - https://arxiv.org/abs/2602.00409
  - https://arxiv.org/abs/2602.14690

## Observe

- Uncle Bob's late-April feed makes the pattern explicit: human language is a bad programming language unless surrounded by formalism; the formalism can live in acceptance tests, test execution, and the surrounding tool suite.
- His recent AI-coding posts keep returning to the same operational loop: AI is powerful, but it softens assertions, cheats constraints, loses learning across context, and handles deep causal bugs only with close human direction.
- The longer March "quicksilver" post, quoted in Security Now, states the failure mode cleanly: new features make old behavior shift, even with tests; prompts bias the AI but do not constrain it absolutely; the remedy is massive overconstraint, small decoupled units, acceptance tests, unit tests, TDD, CRAP analysis, and mutation testing.
- His architecture-viewer repo matches the feed: make dependency direction, cycles, layers, and drill-down architecture visible rather than relying on prose or vibes.
- Adjacent practitioner signals converge on the same broad shape: Simon Willison says code is cheap but good code still has a cost, with testing and red/green TDD as core agentic patterns; Armin Ronacher emphasizes simple code, stable ecosystems, fast tools, useful logs, and tools protected from agent misuse.
- Empirical checks are compatible but more limited: 2026 papers show agents are already changing/adding tests in real repos, and that agent-generated tests may skew toward mocks or require configuration guidance.

## Orient

- The pattern is not "Clean Code wins the culture war." It is "Clean Code-style constraints become more operationally valuable when implementation is cheap."
- Agentic development shifts the bottleneck from line production to semantic stability, architecture, observability, and enforceable verification.
- Uncle Bob's frame has hardened from advice into a control model: natural-language rules are weak; executable constraints and external inspection tools are stronger.
- The human role becomes manager/architect/test designer: not detailed line author, but owner of mental model, process, boundaries, and suspicious probing.

## Decide

- Treat this as an L1 practitioner pattern with strong internal consistency, plus L1 convergence from adjacent practitioners. Do not present it as settled empirical proof.
- The durable research claim: agents amplify the value of tests, modularity, simple design, architecture visibility, and executable feedback loops because agents are locally competent but semantically slippery.
- The caveat: tests alone are not enough. The second OODA shows Uncle Bob explicitly noticing test softening and AI "cheating"; this pushes the conclusion toward external enforcement, mutation testing, architecture tools, and human suspicion.

## Act

- For the next research pass, verify original X URLs where possible and separate Uncle Bob's exact words from mirror/transcript paraphrase.
- Track "external enforcement beats decision docs" as the strongest fresh angle from the second pass.
- When moving to the article/training message later, keep the claim bounded: use Uncle Bob as a high-signal practitioner case, then triangulate with Willison/Ronacher and empirical test-generation papers.

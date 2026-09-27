# Unattended agent lab

This is an executable model of control-plane boundaries, not a deployment template or proof of production behavior. It contains no credentials, makes no network calls, and confines simulated effects to the output directory supplied at runtime.

The supplied stub worker keeps every run deterministic. The broker, idempotency store, trace checker, and fault fixtures make a single controlled execution visible enough to inspect and challenge.

```bash
npm test
npm run tour
npm run run -- scenarios/eligible.json --worker stub --out ./run
```

`npm run tour` attempts four invalid state transitions and requires the boundary model to reject each before state, effect count, or trace length changes:

- an effect without authorization
- a duplicate effect
- an effect after timeout
- a raw sensitive payload in a trace event

The normal platform path uses the same effect-transition and trace-append guards as the tour. Separate checker tests still mutate completed records because reconstruction is a second control, not a substitute for prevention.

The test suite also sends two deliveries concurrently through a local atomic file claim and requires one simulated effect. That demonstrates one local claim mechanism; it does not prove distributed queue leasing, recovery after a crash between claim and effect, process cancellation, workspace isolation, credential brokering, or cloud recovery. The timeout path still comes from scenario metadata. Those gaps are inputs to the architecture exercise, not hidden limitations. `src/real-worker.mjs` remains incomplete because real-worker integration is outside the timed core exercise.

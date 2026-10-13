# Unattended agent lab

This is an executable model of control-plane boundaries, not a deployment template or proof of production behavior. It contains no credentials, makes no network calls, and writes simulated effects only inside the output directory supplied at runtime. A scenario's `task_id` must be lowercase letters, digits and hyphens, and the platform refuses any write that would land outside that directory.

The supplied stub worker keeps every run deterministic. The broker, idempotency store, trace checker, and fault fixtures make a single controlled execution visible enough to inspect and challenge.

```bash
npm test
npm run tour
npm run run -- scenarios/eligible.json --worker stub --out ./run-1
```

The local claim for an idempotency key is permanent within an output directory. Run the same eligible scenario into `./run-1` again and the second run ends in `no_action` as a duplicate. Use a fresh `--out` directory for each clean run.

`npm run tour` attempts four invalid transitions. Each fixture breaks one invariant and leaves the others intact, and the tour passes only when the guard that owns that invariant rejects it with its own reason and the state or trace count is unchanged:

- an effect without authorization: `effect has no allow authorization`
- a duplicate effect: `effect already exists for idempotency key`
- an effect after timeout: `task deadline has passed`
- a raw sensitive payload in a trace event: `trace event contains forbidden field raw_ticket`

Run one fault with `npm run tour -- <fault-name>`.

On the normal platform path, each fault meets a different first line of defence:

- **Authorization.** The broker records `allow` only for a valid, eligible proposal that won the claim. The effect guard rejects any effect without it.
- **Duplicates.** Two deliveries of one task are stopped by the local atomic file claim. The effect guard's idempotency check is the second line, inside one run.
- **Timeout.** When the worker's result arrives after the deadline, the broker denies it before any claim or effect. The effect guard's deadline check rejects it again if that step is skipped. The deadline comes from scenario metadata (`worker_elapsed_ms` against `timeout_ms`), not a measured clock.
- **Raw payloads.** Every trace event passes the trace-append guard. That guard is a denylist of top-level key names, not content inspection: a raw ticket under an allowed key name passes.

Separate checker tests still mutate completed records because reconstruction is a second control, not a substitute for prevention.

The test suite also sends two deliveries concurrently through the local atomic file claim and requires one simulated effect. That demonstrates one local claim mechanism; it does not prove distributed queue leasing, recovery after a crash between claim and effect, process cancellation, workspace isolation, credential brokering, or cloud recovery. Those gaps are inputs to the architecture exercise, not hidden limitations. `src/real-worker.mjs` remains incomplete because real-worker integration is outside the timed core exercise.

---
key: diagnose-and-resend-5
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: verifier
    source: prompt:diagnose-and-resend-4
produces:
  - id: verifier-smoke-test-result
    location: scrollback (PASS + FAIL synthetic inputs + wiring fixes named)
    consumed-by: []
    note: confirms verifier readiness for the packaged re-send; ae101-m5-rerun-packaged consumes the verifier itself, not the smoke-test report
---
Smoke-test the verifier you just built. Fire it on two synthetic inputs: one designed to PASS (matches the quality bar) and one designed to FAIL (the failure shape we diagnosed). Show me what fired, what each input returned, and what would have to change for the verifier to actually be in play during the packaged re-send. If a wiring step (hook install, slash-command registration, file path) is missing, name it and fix it before we move on.

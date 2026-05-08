---
key: diagnose-and-resend-5
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
---
Smoke-test the verifier you just built. Fire it on two synthetic inputs: one designed to PASS (matches the quality bar) and one designed to FAIL (the failure shape we diagnosed). Show me what fired, what each input returned, and what would have to change for the verifier to actually be in play during the packaged re-send. If a wiring step (hook install, slash-command registration, file path) is missing, name it and fix it before we move on.

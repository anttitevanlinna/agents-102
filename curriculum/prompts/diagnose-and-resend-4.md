---
key: diagnose-and-resend-4
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
---
Build the verifier for my dominant failure, scoped to the task we ran un-packaged. The verifier should fire on agent-produced work and decide pass/fail against a quality bar that, if it had been in place, would have caught the failure I diagnosed.

If shell-hook: write the script and tell me where it lives in this repo (CI config, `.claude/hooks/`, or pre-commit, whichever fits the repo's existing conventions).

If background-agent: write the prompt and tell me how to invoke it (slash-command, sub-task dispatch, or scheduled run).

If Ralph re-feed: write the loop wrapper and the check it runs each iteration.

Show me the verifier before you save anything; I'll push back, then we save.

Shape:

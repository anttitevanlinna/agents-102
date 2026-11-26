# Review copy (comment-to-fix)

Antti reads the course in one claude.ai artifact and points fixes with comments.
Artifact: https://claude.ai/artifact/9APuHGVmjLNRcVPAd8utNs

Rebuild after fixes on main:
1. `node scripts/build-a101-mvp.js --edition open` (handbook)
2. `node curriculum/evals/review/build-review.js --out <dir>` (adds home page, source chips, prompt keys, findings; strips analytics)
3. Publish `<dir>/review.html` with `media/*` as files, `url` = the artifact above.

Findings: `<out>/findings.json` = `{ "<source path>": [{ "sev": "block|warn|note", "check": "...", "text": "..." }] }`, source paths as listed in `<out>/sources.json`.

Loop per comment sent to Claude: read thread, map the quoted text to the source chip above it, fix on main (student-facing prompt bodies wait for prompt-ok), reply with what changed and the commit, resolve, rebuild, republish.

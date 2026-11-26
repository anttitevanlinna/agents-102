# Review copy (comment-to-fix)

Antti reads the course in one claude.ai artifact and points fixes with comments.
Artifact: https://claude.ai/artifact/9APuHGVmjLNRcVPAd8utNs

Rebuild after fixes on main:
1. `node scripts/build-a101-mvp.js --edition open` (handbook)
2. `node curriculum/evals/review/build-review.js --out <dir>` (adds home page, source chips, prompt keys, findings; strips analytics)
3. Publish `<dir>/review.html` with `media/*` as files, `url` = the artifact above.

Findings: `<out>/findings.json` = `{ "<source path>": [{ "sev": "block|warn|note", "check": "...", "text": "..." }] }`, source paths as listed in `<out>/sources.json`.

Loop per comment sent to Claude:
1. Read the thread; map the quoted text to the source chip above it.
2. Load rules before rewording: `_index/writing.leads.md` always; `sales_copy.leads.md` + `memory/copy-taste.md` for site/index.html; `student_facing.leads.md` for handbook pages.
3. Run the taste judge on old vs new, both orders: `PAIRS_TIE=1 node pairs.js --blind <pair> --rules taste-rules.md --examples taste-examples.md,taste-examples-cuts.md` (in `mechanical/persona-student/`). A loss in both orders = rewrite shorter. Hint only, never a gate (bias test 2026-11-14).
4. Fix on main (student-facing prompt bodies wait for prompt-ok), reply with what changed + commit, resolve, rebuild, republish.
5. Compound: a comment that names a class of fault (DRY, means nothing, wrong number) becomes a compendium line via /compound.

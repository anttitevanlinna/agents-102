# Actor report — M1 chain — 2026-04-24

## Status
done

## Scratch path
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m1-chain

## Final state
- Commits: 3 (`b0023b5` initial, `797d084` wip, `9b7c9c4` fix)
- Tests: green (3/3 in `src/terrain.test.js` via `node --test`)
- Files Ex3 wrote: `./CLAUDE.local.md`, `./.gitignore`, updated `.claude/settings.local.json`, `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m1-chain-2026-04-24-close-out-draft.md`

## Harness substitutions used
- `/context`: ran `find . -type f -not -path './.git/*' | sort` as the instrument — file listing stands in for the context-window readout.
- `/add-dir`: no slash-command; edited `.claude/settings.local.json` directly to add the content-folder absolute path under `additionalDirectories`. The final state is what `/add-dir` followed by the Ex3 pin would produce in one step.
- MCP connector: none wired. Took path 3 (manual paste) — wrote the close-out note to the instances directory as the runner specified, not to a tracker.
- PR shipping: scratch has no remote. Committed to local `main`; did not run `gh pr create`.
- No-test-infra: frontend had no existing test harness. Added a minimal `node --test` file with a `document.createElement` stub rather than skip the tests-first discipline.

## Notes
The bug was visible on first read of `terrain.js` — `solid[...] === 0` with `fillRect` writing `1` is a tell. I held the diagnosis until Ex2 so the tests-first move could pin the semantics (both directions: solid-reads-true, empty-reads-false). The Ex3 retro separation — `CLAUDE.local.md` for rules, `settings.local.json` for config — landed naturally; the prompt names the split clearly. `.gitignore` didn't exist at the repo root, so I created one; the backend already had its own. The `additionalDirectories` setting was placed on the scratch's local settings file; in a real prework the student would have added it via `/add-dir` earlier and Ex3 would just be verifying the entry sticks.

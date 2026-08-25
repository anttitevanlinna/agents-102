# Hooks always fire

## Hooks always fire

- A **hook** fires on a named event, and the agent has no say in whether it runs. Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more. The runtime fires the script whether or not the model remembers it exists.
- Hooks exist because the LLM is forgetful. Drift, half-remembered rules: the longer the session runs, the less you can trust the agent to hit a step that "should" happen every time. Hooks don't forget.

## Hooks for must-happen, prompts for taste

- **Must happen goes in a hook**; recommended stays in a prompt or rule. Anything that breaks the work if it skips belongs in a hook: a verifier, a pre-commit guard, a session-start context loader. Anything taste-shaped or context-dependent stays in a prompt where the LLM weighs it. Hooks are the runtime's "I will not forget," bought at the cost of flexibility.
- Your repo has demands that don't show up in someone else's article. A verifier against one failure is one hook; the same primitive maps to more. This one runs on the screen. Watch the list come back rather than typing along.

{{prompt:what-packaging-is-1}}

The ones worth keeping are tied to a specific file, convention, or failure mode in this repo, not a generic team-could-want-this.

<!-- maintainer -->

**Extracted from `what-packaging-is.md` and pulled forward (2026-08-25, Antti-directed).** The two hook slides + the demo prompt + the keeper line moved whole into their own lecture, wired into `learn-from-the-test.md` after `reading-the-return` and before the exercises. His why, verbatim intent: doable for laymen, and it helps complete the exercise — the student meets the hook primitive before Phase 3 asks them to pick a verifier shape and wire one. Two verifier back-references reworded as a forced consequence of the placement (the slides used to run after the build): *"the verifier you just wrote"* → *"a verifier"*, *"The verifier you built was one hook against one failure"* → *"A verifier against one failure is one hook"*. Untiered: this is core material now, not a skippable tail.

**Placement:** M5, after the reading-the-return opener, before `fork-the-worktree`. Teaching lecture, mechanism only; the verifier-shape menu stays in `diagnose-and-resend.md` Phase 3 and the re-feed mechanism stays in `what-packaging-is.md`.

**Time:** ~4 min projected, demo prompt included.

**Delivery:** the prompt is a trainer show-and-tell (`check_lectures §6`), and the cue is load-bearing (Antti 2026-08-20, carried from the source lecture): a 2026-08-20 persona run scored the slide 5/10 when nothing told the room whether to run it. Body reads *"This one runs on the screen. Watch the list come back rather than typing along"* — trainer runs `{{prompt:what-packaging-is-1}}` on the projected repo and reads the returned list against the closing line's test. Do not restore an imperative that asks the room to run it.

<!-- backing -->

Format → `curriculum/backing-format.md`. Rows moved verbatim from `what-packaging-is.md`'s ledger with their slides, 2026-08-25.

**Claims**
- `hook-fires-on-named-events` · detail · "Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more." ← cc-hooks-docs
- `agent-has-no-say-whether-hook-runs` · detail · "the agent has no say in whether it runs" ← cc-hooks-docs
- `hooks-exist-because-llm-forgetful` · vision · "Hooks exist because the LLM is forgetful." ← none-owed
- `must-happen-goes-in-a-hook` · vision · "**Must happen goes in a hook**; recommended stays in a prompt or rule." ← none-owed
- `keeper-hooks-are-repo-specific` · vision · "tied to a specific file, convention, or failure mode in this repo" ← none-owed

**Sources**
- cc-hooks-docs `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] hook events (SessionStart / UserPromptSubmit / PreToolUse / PostToolUse / Stop) fire on every named event, with no model discretion over whether the script runs; live-tested against this repo's `.claude/settings.json` on Claude Code 2.1.142. fallback: inline the event list from a re-test.

**Frameworks**
(none — the hook is a platform primitive, not a borrowed frame.)

<!-- /backing -->

**Quality:** compendium-audited 2026-08-26 (writing@a197cc46 story@a197cc46 technical@a197cc46 behavior@a197cc46 pedagogy@a197cc46 strategy@a197cc46 slides@a197cc46)
- judges @a197cc46: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

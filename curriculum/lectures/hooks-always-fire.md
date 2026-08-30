# Hooks always fire

## Hooks always fire

- A **hook** fires on a named event, and the agent has no say in whether it runs. Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more. The runtime fires the script whether or not the model remembers it exists.
- Hooks exist because the LLM is forgetful. Drift, half-remembered rules: the longer the session runs, the less you can trust the agent to hit a step that "should" happen every time. Hooks don't forget.

## Hooks for must-happen, prompts for taste

- **Must happen goes in a hook**; recommended stays in a prompt. Anything that breaks the work if it skips belongs in a hook: a verifier, a pre-commit guard, a session-start context loader. Anything taste-shaped stays in a prompt.
- A verifier against one failure is one hook. The same primitive covers everything else that must happen every time.

{{prompt:what-packaging-is-1}}

A menu, not a checklist.

<!-- maintainer -->

**Origin (2026-08-25, Antti-directed, extracted from `what-packaging-is.md`):** doable for laymen, and it helps complete the exercise — the student meets the hook primitive before Phase 3 asks them to pick a verifier shape and wire one. Included from `learn-from-the-test.md` after `reading-the-return`, before the exercises. The two verifier references read generically (*"a verifier"*, not *"the verifier you just wrote"*) because at this placement the student has not built one yet; do not restore back-reference wording. Untiered: core material, not a skippable tail.

**Slide 2 shape (2026-08-29, Antti-directed):** primitive + prompt + one line, nothing else. Repo-specificity lives in the prompt's own third paragraph (cross-reference against this repo, say when one does not apply) — do not add a repo-specificity line to the slide while that paragraph stands. No stage direction: the teacher runs it and the room can see. The tail carries the one thing neither slide nor prompt says: the five plausible hooks are a menu, not a to-do list (Phase 3's pick is one verifier shape of three; a hook is one of the three).

**Placement:** M5, after the reading-the-return opener, before `fork-the-worktree`. Teaching lecture, mechanism only; the verifier-shape menu stays in `diagnose-and-resend.md` Phase 3 and the re-feed mechanism stays in `what-packaging-is.md`.

**Time:** ~4 min projected, demo prompt included.

**Delivery:** the prompt is a trainer show-and-tell (`check_lectures §6`): the trainer runs `{{prompt:what-packaging-is-1}}` on the projected repo and reads the returned list against the tail's menu line; the room watches. The body carries no run-this cue (compaction 2026-08-29, Antti: the teacher runs it and the room can see), so the trainer's spoken cue is load-bearing — a 2026-08-20 persona run scored the slide 5/10 when the cue was missing entirely. Do not restore an imperative that asks the room to run it.

<!-- backing -->

Format → `curriculum/backing-format.md`. Rows moved verbatim from `what-packaging-is.md`'s ledger with their slides, 2026-08-25.

**Claims**
- `hook-fires-on-named-events` · detail · "Session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more." ← cc-hooks-docs
- `agent-has-no-say-whether-hook-runs` · detail · "the agent has no say in whether it runs" ← cc-hooks-docs
- `hooks-exist-because-llm-forgetful` · vision · "Hooks exist because the LLM is forgetful." ← none-owed
- `must-happen-goes-in-a-hook` · vision · "**Must happen goes in a hook**; recommended stays in a prompt." ← none-owed

**Sources**
- cc-hooks-docs `[checked:2026-08-28 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] hook events (SessionStart / UserPromptSubmit / PreToolUse / PostToolUse / Stop) fire on every named event, with no model discretion over whether the script runs; the docs page lists dozens of named hook events including all five body-named categories verbatim — **cite the event count by shape, not by number: three checks in one week parsed the enum to three different totals, so any specific figure is method-sensitive** (`check_platform_and_boundaries.md §4); live-tested against this repo's `.claude/settings.json` on Claude Code 2.1.142. fallback: inline the event list from a re-test.

**Frameworks**
(none — the hook is a platform primitive, not a borrowed frame.)

<!-- /backing -->

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@4a722813 technical@0cea7581 behavior@d5aa7e3d pedagogy@d5aa7e3d strategy@d5aa7e3d slides@4a722813)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

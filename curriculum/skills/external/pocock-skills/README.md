# External skills — Matt Pocock

Skills authored by Matt Pocock ([aihero.dev](https://www.aihero.dev), [github.com/mattpocock/skills](https://github.com/mattpocock/skills)), forked into this repo under the upstream MIT license.

**License:** MIT. See `LICENSE` in this directory.
**Attribution:** © Matt Pocock.
**Source:** `mattpocock/skills` @ commit `a6bdfd9fed6c17d21b306aeb7ff6a0de8b72ef3c` (2026-04-22).
**Do not modify the skill files themselves.** The brevity is the pedagogy. If we need a variant, create a sibling skill with a different name and attribute both.

## Skills forked here

- **`grill-me/`** — Socratic requirement elicitation. Walks down each branch of a plan's decision tree, recommending an answer per branch. Used in AE101 Module 2 as the second-pass read after the student's own push-back. Canonical source: https://github.com/mattpocock/skills/blob/main/grill-me/SKILL.md

## Updating

When a new commit on the upstream repo changes a skill we've forked:
1. Fetch the new raw `SKILL.md`
2. Compare against the forked copy
3. Update in place; bump the commit SHA in this README
4. Note the change in the AE101 content-strategy state-of-play if the skill's behaviour shifted enough to affect any module's flow

## Why fork instead of git-submodule or cite-and-link

The AE101 content folder ships to students as a zip. Skills need to be locally present at session start — no network dependency, no GitHub auth, no side-quest. Forking preserves attribution and license while keeping the training's *"everything you need is in the folder"* promise.

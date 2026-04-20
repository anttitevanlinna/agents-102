# Path-in-Prompts Audit — Resolved

**Status:** closed. No M2-M8 cleanup needed.

## Summary

An initial sweep flagged ~30 prompt blocks in M2-M8 exercise files that carry `module-N/` path prefixes. First pass concluded these were violations of a "bare filenames" rule. Second pass (per-module analysis) showed they're correct as written.

## The actual rule

Prompts use paths relative to **wherever the Workbench is scoped at that moment.** The self-study SKILL.md scopes the Workbench three ways:

| Phase | Workbench folder | Prompt path shape |
|---|---|---|
| Prework | `<training-dir>/prework/` | bare filenames |
| Module 1 | `<training-dir>/module-1/` | bare filenames |
| Modules 2-8 | `<training-dir>/` (root) | `module-N/foo.md` for per-module artifacts; bare for crossmodule (`brain/`, `sources/`, `agents/`, `CLAUDE.md`) |

Why Workbench doesn't reopen per-module for M2-M8: every M2+ exercise reads crossmodule artifacts. `../brain/` in every prompt is worse than `module-N/foo.md` once per per-module save.

## Violations that existed

Only prework.md carried the path-duplication bug (`prework/snake.html` inside a prompt pasted into a Workbench already at `prework/`). Fixed this session.

M1 exercise was already bare. M2-M8 prompts already follow the root-Workbench convention correctly.

## Codified in

`.claude/skills/content-creation/SKILL.md` § Prompt design rules — "Match prompt paths to Workbench scope — no duplication."

## Closed 2026-04-20

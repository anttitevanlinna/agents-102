# Lint — Claude Code Capability Freshness (STUB)

**Catches:** curriculum claims about Claude Code UI, features, or behavior that are older than 3 months and have not been reverified. Claude Code ships features mid-year; an exercise written six months ago may describe the wrong sidebar, missing slash-commands, or changed default behavior.

## Status

STUB — to be fleshed out. Framework:

## Rough shape

1. Every curriculum file has a `<!-- last-verified: YYYY-MM-DD -->` comment (or similar) tracking when the Claude Code behavior in it was last confirmed.
2. Lint reads all curriculum files, reports any older than 3 months.
3. For each stale file, the lint's output is a list of specific capability claims to re-verify (e.g., "line 34 says 'click + next to the prompt for connectors' — verify").
4. Re-verify by invoking the `claude-code-guide` agent per curriculum/CLAUDE.md § Working with actual Claude Code behavior.

## Build trigger

When a training first fails because of a stale UI claim. Until then, the discipline in curriculum/CLAUDE.md ("verify capabilities BEFORE drafting") plus manual dates on significant edits is enough.

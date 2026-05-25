# Lint — Claude Code Capability Freshness (SUPERSEDED 2026-05-25)

**Superseded by the unified source-freshness system.** A Claude Code capability/UI/behavior claim is just a source whose "URL" is the docs page and whose "open" is a live test — so it carries the same freshness stamp as a practitioner citation, with `due:cohort`:

```
- `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] <behavior asserted>. live-tested against this repo's config. fallback: inline from a re-test.
```

- **Format spec:** `curriculum/source-freshness-format.md` (§ Capability-claim variant).
- **Mandate:** `memory/check_research_claims.md §11a`.
- **Audit:** `curriculum/evals/scripts/source-freshness.sh --target <cohort-date>` — flags any `result:CORRECT` (docs/behavior drifted) as BLOCK; capability claims carry `due:cohort` so they surface as WARN for a routine pre-delivery re-test.
- **Re-verify worker:** the `claude-code-guide` agent (or a live test). `check_platform_and_boundaries.md` still fires at content-time on new platform claims.

This stub's original idea — a `<!-- last-verified -->` date per claim — is now the `checked:` field of the stamp, at per-source granularity instead of per-file. The 12-claim platform back-audit (`pre-cohort-todos.md` § Memory/compendium hygiene) is the first batch to migrate into stamps.

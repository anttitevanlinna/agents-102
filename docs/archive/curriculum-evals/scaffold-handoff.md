# Seam — Scaffold Handoff (STUB)

**Catches:** when module N's scaffold zip / folder doesn't match module N+1's opening expectations. Module N+1's exercise references a file path; scaffold N+1 should ship that path (or N's Debrief should have written it).

## Status

STUB — build when scaffolds for M2-M8 stabilize. Currently scaffolds live at `curriculum/scaffolds/{module-2-starter,module-4-starter,module-8-starter,training-starter}/`.

## Rough shape

For each module N and its scaffold:
- List every file path the module's exercises / lectures / debrief reference
- For each path: is it in the scaffold, or is it written by a prior Debrief/exercise?
- Any path that is neither scaffolded nor produced is a break.

Also check:
- Scaffold files don't clobber student work from earlier modules (CLAUDE.md living file rule — per curriculum/CLAUDE.md)
- Scaffold is idempotent (unzipping twice produces the same tree)

## Build trigger

When the full set of M2-M8 scaffolds is stable. For now, path-consistency lint covers most of this.

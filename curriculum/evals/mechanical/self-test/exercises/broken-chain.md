# Broken chain — harness self-test fixture

**What you do:** read the repo, summarize the main entry points to a file, then extend that summary with a dependency graph.

**What happens:** Claude reads the code, writes a summary, then revisits the summary to layer in a dependency analysis.

**The point:** a two-step artifact chain. The second step reads what the first step wrote.

**Time:** 10 minutes.

## Step 1: Summarize the entry points

**Prompt** *(Claude Code)*

```
Read the repo and summarize the main entry points — which files get loaded first, what they do, which module each depends on. Save your summary to notes/entrypoints.md so you can refer to it later.
```


Claude reads the repo, produces the summary file.

## Step 2: Layer in the dependency graph

**Prompt** *(Claude Code)*

```
Open notes/entry-points.md, the file you just created, and extend it with a dependency graph for each entry. Use a simple indented list under each entry's section.
```


Claude reads the file and adds the dependency layer.

<!-- maintainer -->

**This is a harness self-test fixture, not curriculum.** It contains a deliberate filename mismatch between Step 1 (`entrypoints.md`) and Step 2 (`entry-points.md`) — the kind of typo a human reviewer can miss that a mechanical-execution harness should catch.

Expected harness behavior:
- Actor executes Prompt 1, writes `notes/entrypoints.md`.
- Actor executes Prompt 2, attempts to Read `notes/entry-points.md`, fails (file doesn't exist).
- Actor either asks the student for clarification, creates the hyphenated file fresh, or reports the inconsistency.
- Judge flags the discontinuity via assertions on (a) the Actor's Read-attempt against a non-existent path and (b) the final file-system state (which file exists).

If the harness doesn't catch it, the harness is broken. This fixture is how we prove it catches it.

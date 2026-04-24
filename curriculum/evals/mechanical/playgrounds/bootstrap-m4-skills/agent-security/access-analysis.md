# Access-control analysis — how to walk

For each external reach the target agent system has:

1. **Enumerate.** List every connector, file write path, sub-agent
   dispatch, tool call. Walk the agent files, the root CLAUDE.md, and
   the `module-N/` outputs to enumerate what the system actually
   reached for.

2. **Justify.** For each enumerated reach: what does the system do with
   it? Trace forward from the reach to an output or memory-page that
   used it.

3. **Necessity test.** Could the system do what it does without this
   reach? If yes — unused access.

4. **Severity.** Rate each unused access on what it could enable if the
   agent misbehaves:
   - **High** — access to external systems that write (tracker, drive,
     email), access to Confidential or Restricted data.
   - **Medium** — read access to internal-general data the system doesn't
     use, unused connector scopes.
   - **Low** — tool capabilities present but dormant, read access to
     public data.

## Minimum output

List of `(reach, necessary? y/n, severity, mitigation)` rows. Each
necessary reach also gets a line on what would make it *more* scoped if
needed.

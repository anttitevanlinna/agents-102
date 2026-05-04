# Agentic mitigations — worked examples

## Scope

The agent's read / write / invoke permissions are narrowed. Implemented
as explicit lists in the agent file.

Example: An agent that can reach both OneDrive and Confluence is
narrowed to OneDrive only if that's what its job needs.

## Split

The agent is broken into two with distinct permission profiles.

Example: A single agent that both reads Confidential data and writes to
a shared drive is split into (1) a reader that produces internal-general
summaries, (2) a writer that takes the summaries and posts.

## Filter

The agent must apply a rule before writing. Rule lives in the agent file
or a skill it invokes.

Example: An agent that writes customer-facing memos must run a PII-
redaction pass first. Redaction rule is in a skill the agent invokes.

## Gate

A human approval step is added before an output commits.

Example: Any agent writing to the shared wiki shows the draft to the
human first; human types "apply" to commit. This is Phase 3's
"DO NOT make any changes yet" pattern.

## Review

A second agent checks the first's output before publication.

Example: The writer agent produces a memo. A reviewer agent (distinct
agent file, distinct skill set) reads the memo + the source trail +
flags any unsourced claim or PII leak.

## Matching shapes to risks

- Spoofing risks → Review (second agent checks attribution + sources)
- Tampering risks → Gate (human reviews the diff before applying)
- Repudiation risks → Scope (explicit output-path declaration) + Filter
  (every write names its agent)
- Information disclosure risks → Filter (redaction) + Scope (narrow reads)
- Denial of service risks → Gate (human approves sub-agent dispatch) +
  Scope (bound memory growth)
- Elevation-of-privilege risks → Split (narrower sub-agent profile)

---
key: ae101-m7-publish-platform-plan
dest: Claude Code
context: M7 candidate publication
runtime: any
origin: exercises/research-and-select-agent-platform
requires:
  - id: m7-research-policy
    source: prompt:ae101-m7-research-platform-plan
  - id: m7-search-trace
    source: prompt:ae101-m7-research-platform-plan
  - id: m7-evidence-ledger
    source: prompt:ae101-m7-research-platform-plan
  - id: m7-candidate-plan
    source: prompt:ae101-m7-research-platform-plan
produces:
  - id: m7-publication-manifest
    location: docs/agent-platform/candidates/<student-slug>/publication-manifest.md
---
Read my candidate packet under `docs/agent-platform/candidates/` and the exchange instructions in `docs/agent-platform/challenge.md`.

Check the four files for secrets, customer identifiers, credentials, private repository URLs, and material the challenge forbids publishing. Stop and name the file and line if any are present.

Publish the four-file packet to the named Slack or Teams channel using only the approved connection. Attach the files when the connection preserves stable file identity and access controls. Otherwise publish immutable links from the customer-controlled Git repository or shared folder named in the challenge.

If no approved connection is available, do not improvise one. Write `publication-manifest.md` beside the packet with the exact message, file list, revisions or checksums, and intended channel so a human can publish it.

After publishing, append the new attempt to `publication-manifest.md` with the channel, message URL or identifier, packet files, revisions or checksums, publication time, and any item that did not publish. Preserve earlier attempts and mark which entry is current. In chat, report only the manifest path and whether publication happened or needs the human fallback.

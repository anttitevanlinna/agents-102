---
key: ae101-prework-download-tarball
dest: Claude Code
runtime: any
origin: agentic-engineering-101/prework
produces:
  - id: ae101-content-tarball
    location: ~/Downloads/ae101-content.tar.gz
    consumed-by:
      - prompt:ae101-prework-extract-and-install
---
Download the AE101 content tarball to `~/Downloads/ae101-content.tar.gz` using curl. Report the file's size.

The URL may sit behind a basic-auth password wall. If curl comes back with a 401, ask me for the username and password and retry — otherwise just download it.

URL: <CONTENT_URL>

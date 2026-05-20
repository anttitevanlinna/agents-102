---
key: ae101-prework-download-tarball
dest: Claude Code
runtime: any
origin: agentic-engineering-101/prework
requires:
  - id: tarball-url
    source: scrollback (student or trainer pastes the URL)
produces:
  - id: ae101-content-tarball
    location: ~/Downloads/ae101-content.tar.gz
    consumed-by:
      - prompt:ae101-prework-extract-and-install
---
Download the AE101 content tarball to `~/Downloads/ae101-content.tar.gz` using curl. Report the file's size.

URL:

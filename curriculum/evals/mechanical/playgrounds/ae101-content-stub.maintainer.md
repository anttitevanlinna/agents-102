# ae101-content-stub playground

Stand-in for the real `agents-102-content.tar.gz` shipped at AE101 prework. The mechanical-test stage script tars this directory into `<scratch>/Downloads-stub/agents-102-content.tar.gz` so the prework Actor can extract it without hitting the network.

## Shape

```
ae101-content-stub/
├── lectures/.gitkeep
├── exercises/.gitkeep
├── reference/.gitkeep
├── supplementary/.gitkeep
└── content/skills/
    ├── access-control-analysis/SKILL.md   (stub)
    └── stride/SKILL.md                    (stub)
```

Real production tarball carries hundreds of markdown files. The stub keeps exactly the structure the prework Judge asserts: `lectures/`, `exercises/`, `reference/`, `supplementary/`, `content/skills/`, plus the two named SKILL.md files.

## What the stub does NOT cover

- Content quality (judged elsewhere, not in mechanical).
- The two-path transport fork (3.a manual download vs 3.b agent-driven). The runner only mechanicalizes 3.b; 3.a is a transport primitive, not a prompt chain.
- `<CONTENT_URL>` substitution. The runner intercepts the URL — Actor logs the intended `curl <CONTENT_URL>` call and copies the pre-staged tarball into `<scratch>/Downloads-stub/` instead.

## Provenance

Created 2026-05-14 alongside `ae101-m1-seed/`. Owner: this directory.

# Build System

## Customer Workbooks

Use `build-workbook.js` to deploy one customer with one or more trainings. The customer root is a small hub page; each training lives in its own subdirectory so builds do not overwrite each other.

```sh
node scripts/build-workbook.js acme claude-basics
node scripts/build-workbook.js acme agents-101,claude-basics
node scripts/build-workbook.js acme agents-101 agentic-engineering-101 claude-basics
node scripts/build-workbook.js acme all
```

Outputs:

```text
site/clients/<customer>/index.html
site/clients/<customer>/<training>/index.html
site/clients/<customer>/<training>/trainer-modules.html # if curriculum/trainings/<training>/trainer-modules.md exists
site/clients/<customer>/<training>/ae101-content.tar.gz   # AE101 only
site/clients/<customer>/<training>/agents-101-starter.tar.gz   # Agents 101 only
```

The `all` selector uses the `TRAININGS` registry in `site/layouts/curriculum.js`.

A customer-owned repository can hold its own output: set `AGENTS_OUTPUT_DIR` and the build writes `<dir>/<customer>/…` in place of `site/clients/<customer>/…`, leaving this repository's tree untouched. Branding comes from `AGENTS_BRAND_DIR` the same way.

```sh
AGENTS_BRAND_DIR=../acme-delivery/brand AGENTS_OUTPUT_DIR=../acme-delivery/site \
  node scripts/build-workbook.js acme agents-101
```

Every page a build writes (hub, workbook and Slides, trainer pages, `--theory`, `--exercises`) takes the same brand folder:

- `brand.css` loads after every stylesheet. `url(assets/…)` in it points at the copied asset folder from wherever the page sits.
- `logo.svg` or `logo.png` goes on every cover, and once as the CSS property `--brand-logo`, so brand.css can place the same mark in the nav or the Slides rail (`background-image: var(--brand-logo)`) without a second copy.
- `customer.json` names the customer: `name`, `logoAlt`, `hubHeading`, `hubLede`. The `acme` argument stays the folder and URL segment; it is shown as the name only when `customer.json` gives none.
- `assets/` (fonts, images) is copied to `<customer>/brand-assets/` beside the pages, so a font ships once rather than base64 inside every page. Inline `data:` URLs in brand.css still work and keep a page self-contained.

Prompt blocks take their colours from tokens, so one pair in brand.css reaches every phase, dark Slides and the theory handbook: `--prompt-bg`/`--prompt-fg`, `--prompt-header-bg`/`--prompt-header-fg`, `--prompt-label-fg`, `--prompt-border`. Set the pair rather than restyling `.prompt-block` descendants: phase rules set the private `--_prompt-*` defaults, never the properties. The vendor legal footer stays on every page. The Agents 101 starter's embedded handbook is customer-independent and ignores the brand.

Customer content changes come from `AGENTS_OVERLAY_DIR`, also a folder the customer owns, mirroring `curriculum/`. At build time a file there wins over ours at the same path (`trainings/agents-101/security.md` with one more include line), and a file with no twin here, such as a new lecture, is the customer's own. `trainings/<key>/training.json` sets `label` and `lede`. A path the build never reads fails the build. A shadow is a fork: `overlay.lock.json`, written into the customer folder, records the vendor file each shadow came from, and every later build names the shadows whose vendor file has moved since, with the commit to diff from. Contract: `scripts/customer-overlay.js`.

```sh
AGENTS_OVERLAY_DIR=../acme-delivery/overlay AGENTS_BRAND_DIR=../acme-delivery/brand \
  AGENTS_OUTPUT_DIR=../acme-delivery/site node scripts/build-workbook.js acme agents-101
```

Customer files are judged in a workspace, because the eval machinery needs a real tree: `scripts/overlay-workspace.sh sync <overlay> <pair-root> <customer>` makes or updates a paired public+core worktree on `overlay/<customer>` with the overlay applied, the normal eval flow runs there (eval-sweep with `args.repo`/`args.core` pointing at the pair), and `harvest` copies the stamped files, their instances and their traces back into the overlay's `evals/`, which the build ignores. Keep the pair between runs: Quality pins name its commits.

A personalised `--for` build asks whichever repository holds the output whether that path is gitignored, and refuses when it is not. Outside any Git repository there is nothing to commit, so it proceeds.

## Curriculum Audits

Training artifact handoffs and session breaks can be checked with:

```sh
node scripts/audit-training-artifact-contracts.js --training agentic-engineering-101
node scripts/audit-training-artifact-contracts.js --training agents-101
node scripts/audit-training-artifact-contracts.js --training agents-101 --out curriculum/evals/instances/agents101-artifact-contract-audit.md
```

The audit is a static smoke test: it reads maintainer `Artefact contracts` tables, expands module exercise/lecture includes, includes prework stages, surfaces session starts/returns/clears, and flags likely broken handoffs. Treat findings as review prompts, not judge verdicts.

## Deployment Shape

GitHub Pages publishes `site/`. A customer URL is:

```text
https://agents102.bosser.consulting/clients/<customer>/
```

Training URLs are:

```text
https://agents102.bosser.consulting/clients/<customer>/<training>/
```

Payload URLs are training-scoped on purpose. For example, Agents 101 and AE101 can both be deployed for `acme` without `agents-101-starter.tar.gz` and `ae101-content.tar.gz` colliding at the customer root.

## Sibling Repo Note

The sibling repo `../ai-training` currently deploys its entire `site/` directory through GitHub Pages. Its per-customer proposal instances live under `proposals/customers/` and are gitignored, so a similar deploy target should write tracked customer-facing pages under `site/clients/<customer>/...`, not under `proposals/customers/`.

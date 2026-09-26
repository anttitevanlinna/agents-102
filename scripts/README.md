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

# Build System

## Customer Workbooks

Use `build-workbook.js` to deploy one customer with one or more trainings. The customer root is a small hub page; each training lives in its own subdirectory so builds do not overwrite each other.

```sh
node scripts/build-workbook.js acme claude-basics
node scripts/build-workbook.js acme bootstrap,claude-basics
node scripts/build-workbook.js acme bootstrap agentic-engineering-101 claude-basics
node scripts/build-workbook.js acme all
```

Outputs:

```text
site/clients/<customer>/index.html
site/clients/<customer>/<training>/index.html
site/clients/<customer>/<training>/trainer-guide.html   # if curriculum/trainings/<training>/trainer-guide.md exists
site/clients/<customer>/<training>/agents-102-content.tar.gz   # AE101 only
site/clients/<customer>/<training>/starter.tar.gz   # Bootstrap only
```

The legacy order still works for a single training:

```sh
node scripts/build-workbook.js claude-basics acme
```

Prefer the customer-first form for new automation. The `all` selector uses the `TRAININGS` registry in `site/layouts/curriculum.js`.

## Deployment Shape

GitHub Pages publishes `site/`. A customer URL is:

```text
https://agents102.bosser.consulting/clients/<customer>/
```

Training URLs are:

```text
https://agents102.bosser.consulting/clients/<customer>/<training>/
```

Payload URLs are training-scoped on purpose. For example, Bootstrap and AE101 can both be deployed for `acme` without `starter.tar.gz` and `agents-102-content.tar.gz` colliding at the customer root.

## Sibling Repo Note

The sibling repo `../ai-training` currently deploys its entire `site/` directory through GitHub Pages. Its per-customer proposal instances live under `proposals/customers/` and are gitignored, so a similar deploy target should write tracked customer-facing pages under `site/clients/<customer>/...`, not under `proposals/customers/`.

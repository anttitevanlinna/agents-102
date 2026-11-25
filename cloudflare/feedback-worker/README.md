# a101-feedback Worker

Anonymous sink for the "Did this step work for you?" rows on the Agents 101 self-study site (`site/layouts/feedback.js`).

Stored per row: day, site, release, module, step, signal (worked | stuck | comment), runtime, view, scrubbed text (max 500 chars). Not stored: IP, user agent, cookie, any id, time of day. The rate limiter keys on the connection in memory only.

## Deploy (once, about 5 minutes)

```
npx wrangler login
npx wrangler d1 create a101-feedback          # paste database_id into wrangler.toml
npx wrangler d1 execute a101-feedback --remote --file schema.sql
npx wrangler secret put READ_TOKEN            # any long random string
npx wrangler deploy                           # prints https://a101-feedback.<account>.workers.dev
```

Then in `site/analytics.json` set `feedbackUrl` to `<worker url>/signal`, add the public output to `outputs`, and rebuild.

## Read

```
curl -H "Authorization: Bearer $READ_TOKEN" "<worker url>/summary?since=2026-11-01"
```

Returns counts per release/module/step/signal and the latest 200 comments.

## Test

`node --test cloudflare/feedback-worker/src/index.test.mjs`

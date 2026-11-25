# a101-entry Worker

Relay for the "So, what's stuck at work?" prompt on the Agents 101 home page (`site/index.html`). The page sends only the visitor's words; this Worker holds the API key, the fixed prompt and the course facts, and answers seven rows of JSON. If it fails or is not deployed, the page shows the standard lines.

Stored: a bare count of answers per day (KV, expires after two days). Not stored or logged: the visitor's text, the answer, IP, user agent. Request logs are off in `wrangler.toml`.

Limits: allowed origins only; 5 answers a minute per connection; `DAILY_CAP` answers a day in total (500); input capped at 120 characters; small model (`MODEL`). Set a monthly spend limit on the API key's workspace in the Claude Console as the backstop.

## Course facts

`src/facts.js` is generated from the module pages, the exercise pages and the `li[data-module]` rows in `site/index.html`:

```
node scripts/build-entry-facts.js          # write
node scripts/build-entry-facts.js --check  # fail if stale (runs in npm test)
```

Rebuild and redeploy after module pages or the home rows change.

## Deploy (once, about 5 minutes)

```
cd cloudflare/entry-worker
npx wrangler login
npx wrangler kv namespace create a101-entry-counts   # paste the id into wrangler.toml
npx wrangler secret put ANTHROPIC_API_KEY           # a key made for this Worker only
npx wrangler deploy                                 # prints https://a101-entry.<account>.workers.dev
```

Then set `data-endpoint="<worker url>/plan"` on `form#ask` in `site/index.html` and push.

## Test

`node --test cloudflare/entry-worker/src/index.test.mjs`

# acme-gate — password on the acme beta workbook (GitHub Pages)

GitHub Pages can't do HTTP Basic Auth. But `agents102.bosser.consulting` is
proxied through Cloudflare (Pages is the origin), so this Worker gates the acme
path at the edge — the same role the CloudFront Function plays for
`materials.arcticrex.com` in `ai-training-internal`.

- **Scope:** route `agents102.bosser.consulting/clients/acme/*` only. Every
  other customer and the rest of the site are untouched.
- **Covers:** the acme hub, both AE101 trainings (preview + full), and the
  `ae101-content.tar.gz` payload — not just the HTML.
- **Login:** username `acme`, password `agentic`. Deliberately public — a speed
  bump so a forwarded link isn't one-click, not a real secret. Baked in as a
  default, so `wrangler deploy` alone gates the path.
- **Upgrade later (optional):** set an `ACME_PASSWORD` Worker secret to override
  the default with a real password — no code change, no redeploy.

## Deploy (needs Cloudflare account access)

Requires the `wrangler` CLI and access to the `bosser.consulting` Cloudflare
zone.

```sh
cd scripts/acme-gate
wrangler login       # interactive browser OAuth (skip if already authenticated)
wrangler deploy      # publishes the Worker + binds the route
```

That's it — the password is baked in, so there's no secret step and no
fail-closed window. Verify:

```sh
curl -sI https://agents102.bosser.consulting/clients/acme/ | head -1
# -> HTTP/2 401                            (locked)
curl -sI -u acme:agentic https://agents102.bosser.consulting/clients/acme/ | head -1
# -> HTTP/2 200                            (in)
```

## Upgrade to a real password (optional)

```sh
wrangler secret put ACME_PASSWORD    # paste it hidden; overrides "agentic"
```

Once set, the secret wins over the baked-in default. Rotate by re-running the
same command. Delete the secret to fall back to `agentic`.

## Remove the gate entirely

```sh
wrangler delete      # drops the Worker + its route; acme is public again
```

## Notes

- Nothing in the agents-102 build changes: the gate is at the edge, not baked
  into the workbook artifact.
- One password covers the whole acme beta — preview now, full later, same creds.

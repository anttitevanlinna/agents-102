# acme-gate — password on the acme beta workbook (GitHub Pages)

GitHub Pages can't do HTTP Basic Auth. But `agents102.bosser.consulting` is
proxied through Cloudflare (Pages is the origin), so this Worker gates the acme
path at the edge — the same role the CloudFront Function plays for
`materials.arcticrex.com` in `ai-training-internal`.

- **Scope:** route `agents102.bosser.consulting/clients/acme/*` only. Every
  other customer and the rest of the site are untouched.
- **Covers:** the acme hub, both AE101 trainings (preview + full), and the
  `ae101-content.tar.gz` payload — not just the HTML.
- **Login:** username `acme`, password = the `ACME_PASSWORD` Worker secret. One
  password for the whole acme beta (preview now, full later, same creds).
- **Fail closed:** no secret set => 503, everything locked. Safe to deploy the
  Worker before the password exists.

## One-time deploy (needs your Cloudflare account)

Requires the `wrangler` CLI and access to the `bosser.consulting` Cloudflare
zone. In Claude Code, run the interactive `wrangler login` yourself with a
leading `! ` so the browser flow lands in your session.

```sh
npm i -g wrangler                    # if not already installed
cd scripts/acme-gate
wrangler login                       # interactive — run as: ! wrangler login
wrangler deploy                      # publishes the Worker + binds the route
wrangler secret put ACME_PASSWORD    # paste the beta password (hidden input)
```

Verify:

```sh
curl -sI https://agents102.bosser.consulting/clients/acme/ | head -1
# -> HTTP/2 401                       (locked)
curl -sI -u acme:YOURPASSWORD https://agents102.bosser.consulting/clients/acme/ | head -1
# -> HTTP/2 200                       (in)
```

## Rotate the password

```sh
wrangler secret put ACME_PASSWORD    # overwrite with the new one
```

## Password guidance

Same as training-internal: a long, non-obvious passphrase — length is the
entropy. Hand it to beta testers out of band. Never commit it, never paste it
into chat. You set it; it's a credential.

## Notes

- The password never lives in this repo — only in the encrypted Worker secret.
- To lift the gate entirely: `wrangler delete` (removes the Worker + its route).
- Nothing in the agents-102 build changes: the gate is at the edge, not baked
  into the workbook artifact.

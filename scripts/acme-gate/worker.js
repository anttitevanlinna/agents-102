/**
 * acme-gate — Cloudflare Worker: HTTP Basic Auth in front of the acme beta
 * workbook served from GitHub Pages via agents102.bosser.consulting.
 *
 * The ai-training-internal materials site (materials.arcticrex.com) gates each
 * customer with a CloudFront viewer-request Function that checks a per-customer
 * password. agents102.bosser.consulting is GitHub Pages, which cannot do that —
 * but the bosser.consulting zone is proxied through Cloudflare (Pages is the
 * origin), so this Worker plays the same role at the edge: one shared password,
 * username = customer slug ("acme"), scoped by route to /clients/acme/* only.
 *
 * The password is a deliberately public speed bump ("agentic", username
 * "acme") — enough that a forwarded link isn't one-click, not a real secret.
 * It's baked in as a default so `wrangler deploy` alone gates the path, with no
 * separate secret step and no fail-closed window. To upgrade to a real password
 * later, set an ACME_PASSWORD Worker secret (`wrangler secret put
 * ACME_PASSWORD`) — it overrides the default with no code change.
 */

const REALM = 'acme';

// Deliberately public — a speed bump, not a secret (see header comment).
// Override with an ACME_PASSWORD Worker secret for a real password.
const DEFAULT_PASSWORD = 'agentic';

export default {
  async fetch(request, env) {
    const expectedUser = env.ACME_USERNAME || 'acme';
    const expectedPass = env.ACME_PASSWORD || DEFAULT_PASSWORD;

    const header = request.headers.get('Authorization') || '';
    if (header.startsWith('Basic ') &&
        (await credentialsMatch(header, expectedUser, expectedPass))) {
      // Authenticated -> pass the request through to the Pages origin.
      return fetch(request);
    }

    return new Response('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
        'Cache-Control': 'no-store',
      },
    });
  },
};

/**
 * Constant-time compare of the incoming Authorization header against the
 * expected credential. Both sides are SHA-256'd first so the comparison runs
 * over equal-length (32-byte) buffers and no length information leaks. This
 * mirrors training-internal's set-course-password.sh, which likewise compares a
 * SHA-256 of the full `Basic base64(user:pass)` header value.
 */
async function credentialsMatch(header, user, pass) {
  const expectedHeader = 'Basic ' + base64(`${user}:${pass}`);
  const [got, want] = await Promise.all([sha256(header), sha256(expectedHeader)]);
  return constantTimeEqual(got, want);
}

async function sha256(str) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
}

/**
 * Constant-time compare of two ArrayBuffers. Both inputs are SHA-256 digests
 * (always 32 bytes), so lengths match and the byte loop reveals nothing about
 * the secret. Depends only on crypto.subtle.digest — no reliance on the
 * non-standard crypto.subtle.timingSafeEqual, so it runs on any Web Crypto
 * runtime without betting on a Workers-specific extension.
 */
function constantTimeEqual(a, b) {
  const av = new Uint8Array(a);
  const bv = new Uint8Array(b);
  if (av.length !== bv.length) return false;
  let diff = 0;
  for (let i = 0; i < av.length; i++) diff |= av[i] ^ bv[i];
  return diff === 0;
}

/** UTF-8-safe base64 — btoa alone throws on multibyte passphrases. */
function base64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

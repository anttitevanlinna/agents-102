---
space: SEC
path: /SEC/Security/Policy/AI-Classification-Draft
title: AI Tool Classification Policy — Draft v0.4
author: anneli.virtanen
last_modified: 2026-06-28
---

# AI Tool Classification Policy — Draft v0.4

Draft policy governing what AI tools may read, given Kaleva's data classification levels.

**Levels (existing, unchanged):**
- L1 Public
- L2 Internal
- L3 Confidential
- L4 Restricted (regulated, customer PII, financials pre-disclosure)

**Tool-classification draft (new):**
- **Class A — local-only / no telemetry** — may read up to L3.
- **Class B — vendor-hosted with enterprise agreement and no-train clause** — may read up to L2.
- **Class C — consumer / no enterprise agreement** — L1 only.

**Open questions blocking sign-off (need CISO + DPO):**
1. Is Claude Code Class A or Class B? Depends on enterprise agreement terms re: prompt logging.
2. What about Cowork / cloud features? Currently parked at "Class B at most" pending review.
3. Re-evaluation cadence — annual is too slow given vendor cadence; proposal: quarterly with named owner.

**Status:** Anneli won't enable broad rollout in Security Platform until at least Q1 and Q2 close. Maija and Anneli aligned that this is a policy blocker, not a stance blocker.

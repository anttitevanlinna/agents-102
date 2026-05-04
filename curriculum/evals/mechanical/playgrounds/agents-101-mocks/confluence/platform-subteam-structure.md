---
space: ENG
path: /ENG/Engineering/Platform/Structure
title: Platform Engineering — Sub-team Structure and Charters
author: maija.lehtinen
last_modified: 2025-11-03
---

# Platform Engineering — Sub-team Structure and Charters

Four sub-teams, ~10 engineers each, ~40 total.

- **Data Platform (lead: Jukka)** — dbt, Snowflake, Kafka. Stance: cautiously pro. Experimenting with LLM-assisted SQL in analyst-facing tools; nothing in backend yet.
- **Developer Experience (lead: Sari)** — Bazel, ArgoCD, Backstage. Stance: actively running Claude Code on her own work; shipped two small Backstage plugins. Most likely first-adopter team.
- **Infrastructure (lead: Paavo)** — Terraform, crossplane, Grafana, Datadog. Stance: most skeptical — *"I'll believe it when something writes a safe Terraform change at 3am."* Has specific change-review pain agentic work could plausibly help, but won't commit until someone shows it working at 2am, not 2pm.
- **Security Platform (lead: Anneli)** — Okta, Vault, Wiz, OSCAL. Stance: wait-and-see. Concern is classification — agents reading secret material is a policy question above her level. Won't block, won't enable, until that conversation happens.

**Rituals:** weekly leads sync (Mondays 60min), monthly staff-engineering review (~40 people, 90min), quarterly planning offsite (2 days).

**Where rollout has to land:** sub-team lead buy-in is the unlock. Quarterly planning offsite in week 6 of Q3 is the named forcing function. (Note: this page predates the OKR refresh in 2026-06; on Infra-in-Q3, the OKRs page is newer and authoritative.)

# Data classification

Nordic-baseline four-tier classification. Most regulated Nordic organisations run some version of this. The tiers and the handling rules matter more than the exact labels.

**The tiers:**

- **Public** — information that is, or is intended to be, publicly available. Marketing content, published pricing, press releases.
- **Internal** — information meant for employees and contractors but not the public. Internal documentation, team communications, non-sensitive operational data.
- **Confidential** — information whose disclosure would harm the organisation or a third party. Customer data (non-special-category), commercial terms, strategic plans, non-public financials.
- **Restricted** — information whose disclosure would cause significant harm. Special-category personal data (health, religion, political views, sexual orientation, trade union membership), material non-public information, security-sensitive data, executive communications on sensitive topics.

## Rules to check

### CLASS-1 — Data tier identified

**Rule:** Every source file in `sources/` and every entry in `brain/` should have its classification tier identified — either in the file itself, in a sibling README, or as a naming convention.

**Audit check:** Look at `sources/` and `brain/`. Are files labelled with their classification tier? If a file contains obviously-sensitive content (commercial numbers, named individuals, legal-privileged language) without a classification label, that's usually a violation.

**Common pattern:** A `sources/` folder with 20 files, none labelled. The user knows which are sensitive; the agent doesn't. "I can't tell" is almost always the verdict.

### CLASS-2 — Restricted data handled appropriately

**Rule:** Restricted data should only be processed by agents with explicit authorisation for that data, and its use should be logged. In an agent system, this usually means: restricted data lives in a separately-scoped folder; agents need specific instructions to read from that folder; reads are auditable.

**Audit check:** Is there any restricted data in the system (special-category personal data, material non-public information, security-sensitive content)? If yes, is it in a scoped folder that only specific agents read? Is there any log of access?

**Common violation pattern:** Restricted data mixed into general `sources/` or `brain/` folders, readable by every agent, with no access logging.

### CLASS-3 — Confidential data doesn't leak into public-tier output

**Rule:** Agent output intended for public or internal audiences should not contain confidential information (customer names, commercial numbers, strategic plans) without explicit redaction or approval.

**Audit check:** Look at agent output files (prior module outputs, drafts, summaries). Do they contain content that looks confidential-tier (specific customer names, commercial numbers, internal strategic debates)? Is there evidence the output is staying internal, or is it headed outward?

**Common violation pattern:** A synthesizer output combining internal strategic analysis with drafted external-facing language, in one file, without separation. If that file is shared externally as-is, confidential content leaks.

### CLASS-4 — Tier matches the agent's usage

**Rule:** The tier of a file should match how the agent treats it. A file labelled "Public" that's actually confidential is worse than an unlabelled file — the label creates false confidence.

**Audit check:** Spot-check any labels that exist. Do they match the actual content? An "Internal" label on a file with customer-specific commercial terms is a violation of the labelling itself.

**Common violation pattern:** Labels inherited from a template ("Internal Use Only" as a default header) that were never adjusted to match actual content.

### CLASS-5 — Cross-tier combinations don't auto-upgrade

**Rule:** When an agent combines data across tiers — reads Public + Confidential inputs, produces one output — the output's tier should match the highest-tier input, or the confidential content should be explicitly scrubbed.

**Audit check:** Does the agent produce combined outputs (synthesizers, reports, summaries) that have a mix of input tiers? What tier is the output treated as? A synthesizer reading confidential sources and producing an "internal memo" has effectively downgraded confidential to internal — usually a violation.

**Common violation pattern:** Agent draft outputs with no tier label. Default assumed tier is usually wrong.

## How to score

- Compliant: evidence clearly shows labels exist, match the content, and are honoured by the agent.
- Violating: evidence clearly shows cross-tier leakage, unlabelled sensitive content, or mis-labelled files.
- "I can't tell": files exist but no tier labels exist. This is the most common verdict for Nordic-baseline audits — most training directories start without classification discipline. Name the evidence needed: "each file in sources/ needs a tier label."

## Note for the auditor

The point of classification isn't bureaucracy — it's reducing the surface area for accidents. A system where every file is tier-labelled and tiers are honoured makes information disclosure risk visible. A system with no labels hides the risk inside convenience.

If the user's system has no tier discipline, the baseline recommendation is: add one rule to CLAUDE.md — *"any file in sources/ or brain/ without an explicit tier label is treated as Confidential."* Makes the default safe, forces explicit labelling to relax.

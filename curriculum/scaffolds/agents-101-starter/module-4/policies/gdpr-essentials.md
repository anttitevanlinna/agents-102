# GDPR essentials

The General Data Protection Regulation applies to all personal data of EU / EEA residents. Nordic baseline — your agent system almost certainly touches personal data somewhere (customer contacts, employee information, prospect lists, call notes with names). Audit against these rules.

**Personal data** is any information relating to an identified or identifiable natural person — names, emails, phone numbers, job titles tied to individuals, user IDs, IP addresses, direct quotes from identifiable people.

## Rules to check

### GDPR-1 — Lawful basis for processing

**Rule:** Personal data may only be processed on a lawful basis — consent, contract, legal obligation, vital interests, public task, or legitimate interests. The agent system must not process personal data outside the lawful basis that authorised the original collection.

**Audit check:** Look for files containing personal data (`memory/`, `sources/`, `module-*/`). For each: is there evidence of why this data is being processed by an agent, and does that purpose match the original collection basis? Files with no context on source or purpose are usually "I can't tell."

**Common violation pattern:** Customer call notes collected for sales follow-up being read by an agent producing competitive analysis. Different purpose, likely beyond the original lawful basis.

### GDPR-2 — Data minimisation

**Rule:** Personal data used for processing must be adequate, relevant, and limited to what is necessary. If an agent can do its job without the names, the names shouldn't be there.

**Audit check:** For each file the agent reads containing personal data, ask: does the agent need the names to do its job? If it could work with role references ("the IT Director," "the procurement lead") instead of names, the data hasn't been minimised.

**Common violation pattern:** `memory/people.md` or `memory/contacts.md` as canonical files with named individuals. Usually convenient for the user, usually more data than the agent strictly needs for its output.

### GDPR-3 — Purpose limitation

**Rule:** Personal data collected for one purpose should not be reused for an incompatible purpose without fresh lawful basis. Agent systems that combine sources often violate this by accident — data collected for sales CRM being used for HR analysis, for instance.

**Audit check:** Does the agent combine personal data across sources in ways the original collection didn't anticipate? For example: customer service transcripts (collected for support) being mined by a commercial analysis agent (new purpose).

**Common violation pattern:** Shared sources folder mixing data collected for different purposes without the agent distinguishing.

### GDPR-4 — Storage and retention

**Rule:** Personal data should not be kept longer than necessary for the purpose. Agent systems often accumulate data indefinitely because nobody's thinking about retention.

**Audit check:** Are there files in `memory/`, `sources/`, or `module-*/` that contain personal data older than the purpose requires? (E.g., call notes from a lost deal 2 years ago still in `sources/`.) Usually "I can't tell" unless timestamps are explicit.

**Common violation pattern:** Training directories that started as fresh workspaces accumulating real personal data over months without retention discipline.

### GDPR-5 — Data subject rights

**Rule:** Individuals have rights to access, rectification, erasure, and portability of their personal data. Agent systems that can't enumerate which individuals' data they process cannot honour these rights.

**Audit check:** Could the user enumerate every individual whose personal data is somewhere in this agent system? If not, a data subject request ("please delete all my data") cannot be honoured completely. Usually "I can't tell" unless the user has built a data-subject map.

**Common violation pattern:** Personal data in multiple places (memory, sources, agent outputs, prior module artifacts) with no central index of who appears where.

### GDPR-6 — International transfers

**Rule:** Personal data transferred outside the EU / EEA requires adequate protection (adequacy decision, standard contractual clauses, etc.). Agent systems that invoke LLMs hosted outside the EU, or that use connectors pulling from US-hosted services, are potentially making international transfers.

**Audit check:** Does the agent invoke an LLM hosted outside the EU? (Most current commercial LLMs — including Claude — run at least in part outside the EU.) Are there organisational approvals for that? Usually "I can't tell" unless the user has explicit evidence. Note as an open question.

**Common violation pattern:** Organisation has a data-residency policy restricting EU data to EU processing, but the agent invokes a US-hosted LLM on EU personal data. Structural issue, not a fix at the agent level — flag it for the user's data governance team.

## How to score

- Look at each rule. Read the relevant files in the agent system.
- Mark Compliant only when the evidence clearly shows the rule is honoured.
- Mark Violating when the evidence clearly shows the rule is broken.
- Mark "I can't tell" when the evidence isn't there or can't be established from files alone — and name the evidence you'd need.

GDPR-1 through GDPR-4 are usually visible from files. GDPR-5 and GDPR-6 are more often "I can't tell" because they depend on organisational context the files don't carry.

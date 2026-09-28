---
key: ae101-m8-map-ticket-data
dest: Claude Code
context: M8 customer-ticket case
runtime: any
origin: exercises/decide-agent-data-boundary
requires:
  - id: m7-proven-architecture
    source: prompt:ae101-m7-prove-control-plane
  - id: m7-data-boundary-inventory
    source: prompt:ae101-m7-prove-control-plane
produces:
  - id: m8-ticket-data-map
    location: docs/agent-platform/data-cases/ticket-handler.md
---
Read `docs/agent-platform/architecture.md` and `docs/agent-platform/proof.md`. The architecture contains the responsibility, tool and worker contracts, research decision, and control evidence. The proof contains the evidence ledger, initial data boundary, and production gates.

Analyze this case: an EU consumer SaaS product receives support tickets through email and a web form. Tickets contain names, email addresses, account identifiers, free text, screenshots, logs, and attachments. Customers sometimes include payment details, health information, credentials, or information about other people without being asked. The proposed agent may classify the ticket, retrieve public and internal knowledge, read limited CRM history, draft or send a reply, add an internal note, update tags, and escalate. Its worker, tools, traces, review queue, and backups may each create another copy.

Write `docs/agent-platform/data-cases/ticket-handler.md`. Map each data item from collection through context, tool calls, outputs, traces, review, retention, deletion, and backup. For each copy name its purpose, necessity, location, access, processor or recipient, retention assumption, deletion path, security control, and evidence still missing.

Separate draft assistance from customer-visible action. Name what must never enter the model or trace, what can be referenced instead of copied, what requires redaction, and where human review has enough information and authority to change the outcome.

Do not declare the system lawful or GDPR compliant. Mark every legal judgement with a named decision-owner role and the engineering facts that role still needs. In chat, return only the highest-risk data copies the tested design omitted or underspecified.

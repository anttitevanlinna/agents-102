# The lethal trifecta

## Three capabilities that must not meet

- **Simon Willison's frame.** An agent that holds all three of these at once can be made to leak what it knows: access to private data, exposure to untrusted content, and a channel that communicates out. Each leg is useful on its own; together they are a leak an attacker can operate remotely.
- **Not risky. Structural.** Anyone who can write where the agent reads can steer what the agent does with what it holds. No amount of model quality makes the combination safe, because the flaw is in how the model reads, not in how well it behaves.
- **The legs hide in ordinary wiring.** Private data is your codebase, your credentials, your customer records. Untrusted content is any web page, issue comment, or dependency the agent reads. The outbound channel is anything that leaves the machine, from an HTTP request to a git push. Most agent setups assemble all three without anyone deciding to.

## An LLM can't reliably tell instructions from data

- **An LLM cannot reliably tell instructions from data.** Everything in the context window is one stream of tokens; no privileged channel marks which part came from you. Whatever the agent reads can shape what the agent does next.
- **So every source the agent reads is a potential instruction channel.** A web page, an issue comment, a README inside a dependency, a pasted log. Reading it and obeying it are not cleanly separable operations.
- **The attacker needs no account and no CVE.** They need a sentence, placed where the agent will read it. That sentence is the whole exploit chain. The field calls this move prompt injection: instructions that arrive through content the agent reads, not from the person steering it.

## The attacker targets the agent, not the system

- **Classic threat modeling asks who attacks the system you are building.** This asks who attacks the agent building it. The target moves from your feature's endpoints to the context window of the agent that ships them.
- **The two audits compose.** The access-surface map and the STRIDE pass you ran on the feature still hold; the trifecta adds the row the classic frame doesn't have. STRIDE models attacks on the system; the trifecta models attacks through the agent.
- **An accident model is not an adversary model.** Sandboxes and permission prompts bound what the agent can break by mistake; the trifecta bounds what an attacker can make it do on purpose. A deployment needs both bounds, and they are set by different levers.

## Removing any one leg breaks the trifecta

- **Audit any agent deployment for the three legs. Then cut one.** The check takes a minute: what private data can it read, what untrusted content reaches it, what channels leave the machine. All three present means one goes.
- **Cutting a leg is ordinary engineering.** Read-only where write is not needed. No network where network is not needed. Allowlisted domains where the web is needed. A human gate on outbound actions wherever private data is in play.
- **After untrusted input is read, constrain what can follow.** Willison's rule: "once an LLM agent has ingested untrusted input, it must be constrained so that it is impossible for that input to trigger any consequential actions."
- **A filter that mostly works is a gate that sometimes opens.** Detection lowers the odds; only removing a leg changes the structure. In security, cut a leg instead of trusting a filter.

Three legs. Cut one.

<!-- maintainer -->

**STATUS:** slide-format reference page (proper-length bullets per `theory-plan.md` § Slide format, 2026-07-02). No Quality line by design (unaudited). WIRED twice: `earn-the-trust.md ## Next` (unavoidable pre-leash beat — three-question check, prompt injection named, pointer here) + `run-the-first-experiment.md ## Send the task off` (second firing, same shape, at the moment of the send itself).

**Proper-length pass (2026-07-02, unaudited):** skeleton bullets grown to slide thickness; reference-page shape kept (frame · mechanism · different-attacker · the move-as-governor). Per-passage verdicts: all four sections CONVERTED in place · §3 fix: "The surface map and STRIDE from M3" de-sequenced to content phrasing ("the access-surface map and the STRIDE pass you ran on the feature") · numbered three-leg list FOLDED into the frame bullet · new bullets (legs-in-ordinary-wiring · accident-vs-adversary) derive from the trifecta's own mechanism + `theory-audit.md`'s adversary-model note (composes with blast-radius), no new sourced claims · Willison constraint quote kept verbatim · filter line kept number-free · closing kicker added ("Three legs. Cut one."). §3 grep above the fence: clean.

**Placement:** supplementary, linked from M3 (`earn-the-trust` owns the security beat — surface map + STRIDE; this page extends the same muscle to the agent itself). Guaranteed in-room exposure now lives at M3's close: the pre-leash check in `earn-the-trust.md ## Next` fires before M4 grants the long run. The second firing is wired: `run-the-first-experiment.md ## Send the task off` re-runs the three-question check as the last mandatory beat before the send-off prompt.

**Laws carried:** lethal-trifecta · instructions-vs-data inseparability (the mechanism). Composes with blast-radius (banked, accident model) — trifecta adds the adversary model blast-radius lacks; the accident-vs-adversary bullet carries that split in body.

**Source verification — MUST DO before first cohort:**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ — [practitioner direct] (Simon Willison, 2025-06-16; dated framework piece, now standard field vocabulary). Byline, date, three legs, and the quoted constraint sentence verified verbatim 2026-07-02. fallback: teach the three-leg frame unattributed; drop the quote.
- Willison's guardrail-products point (vendors claiming ~95% detection are inadequate for security) is deliberately carried in body WITHOUT the number ("a filter that mostly works is a gate that sometimes opens") — keep it number-free.

**2026-07-02** — "prompt injection" named once in § The mechanism (searchable field handle; a student who hears the term elsewhere finds this page); wired per completeness review finding #2 alongside the `earn-the-trust.md ## Next` pre-leash beat. Same day: second firing wired at M4's send-off gate (`run-the-first-experiment.md ## Send the task off`), closing the finding.

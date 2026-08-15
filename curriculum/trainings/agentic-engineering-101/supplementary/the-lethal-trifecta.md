# The lethal trifecta

## Three capabilities that must not meet

- Simon Willison's frame. An agent that holds all three of these at once can be made to leak what it knows: access to private data, exposure to untrusted content, and a channel that communicates out. Each leg is useful on its own; together they are a leak an attacker can operate remotely.
- Not risky. Structural. Anyone who can write where the agent reads can steer what the agent does with what it holds. No amount of model quality makes the combination safe, because the flaw is in how the model reads, not in how well it behaves.
- The legs hide in ordinary wiring. Private data is your codebase, your credentials, your customer records. Untrusted content is any web page, issue comment, or dependency the agent reads. The outbound channel is anything that leaves the machine, from an HTTP request to a git push. Most agent setups assemble all three without anyone deciding to.

## An LLM can't reliably tell instructions from data

- An LLM cannot reliably tell instructions from data. Everything in the context window is one stream of tokens; no privileged channel marks which part came from you. Whatever the agent reads can shape what the agent does next.
- So every source the agent reads is a potential instruction channel. A web page, an issue comment, a README inside a dependency, a pasted log. Reading it and obeying it are not cleanly separable operations.
- The attacker needs no account and no CVE. They need a sentence, placed where the agent will read it. That sentence is the whole exploit chain. The field calls this move **prompt injection**: instructions that arrive through content the agent reads, not from the person steering it.

## The attacker targets the agent, not the system

- Classic threat modeling asks who attacks the system you are building. This asks who attacks the agent building it. The target moves from your feature's endpoints to the context window of the agent that ships them.
- The two audits compose. An access-surface map and a STRIDE pass on the feature still hold; the trifecta adds the row the classic frame doesn't have. STRIDE models attacks on the system; the trifecta models attacks through the agent.
- An accident model is not an adversary model. Sandboxes and permission prompts bound what the agent can break by mistake; the trifecta bounds what an attacker can make it do on purpose. A deployment needs both bounds, and they are set by different levers.

## Removing any one leg breaks the trifecta

- Audit any agent deployment for the three legs. Then cut one. The check takes a minute: what private data can it read, what untrusted content reaches it, what channels leave the machine. All three present means one goes.
- Cutting a leg is ordinary engineering. Read-only where write is not needed. No network where network is not needed. Allowlisted domains where the web is needed. A human gate on outbound actions wherever private data is in play.
- After untrusted input is read, constrain what can follow. Willison's rule: "once an LLM agent has ingested untrusted input, it must be constrained so that it is impossible for that input to trigger any consequential actions."
- A filter that mostly works is a gate that sometimes opens. Detection lowers the odds; only removing a leg changes the structure. In security, cut a leg instead of trusting a filter.

Three legs. Cut one.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** one handle kept bold: **prompt injection** (searchable field handle at its naming in the mechanism slide); all other bullet leads de-bolded, three-leg enumeration stays plain inline, Willison constraint quote plain, kicker untouched, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut. Re-audit before ship.

**STATUS:** slide-format reference page, proper-length bullets per `theory-plan.md` § Slide format. Audited — see the Quality line below. *(Corrected 2026-07-31: denied its own audit while carrying a 2026-07-12 all-PASS one. Present-tense state, not a changelog — `check_writing.md §3`.)* Reached from M3's optional pre-read and from M3's own body; no forward-pointing copy anywhere else.

**Proper-length pass (2026-07-02, unaudited):** skeleton bullets grown to slide thickness; reference-page shape kept (frame · mechanism · different-attacker · the move-as-governor). Per-passage verdicts: all four sections CONVERTED in place · §3 wording is delivery-order neutral ("an access-surface map and a STRIDE pass on the feature"), so it does not assert that both audits already ran when the security module is cut or reordered · numbered three-leg list FOLDED into the frame bullet · new bullets (legs-in-ordinary-wiring · accident-vs-adversary) derive from the trifecta's own mechanism + `theory-audit.md`'s adversary-model note (composes with blast-radius), no new sourced claims · Willison constraint quote kept verbatim · filter line kept number-free · closing kicker added ("Three legs. Cut one."). §3 grep above the fence: clean.

**Placement:** supplementary, linked from M3 (`earn-the-trust` owns the security beat — surface map + STRIDE; this page extends the same muscle to the agent itself). **Neither forward-pointing firing exists any more, and neither is owed (Antti, 2026-08-12; claims here corrected 2026-08-15).** A pre-leash three-question check sat in `earn-the-trust.md ## Next` aimed at M4's autonomy, and M4's send-off carried a second copy of the same beat; both were cut on the rule that a threat class taught once, in the module that teaches it, does not owe a reminder in the module that uses it. The decision note lives in `earn-the-trust.md`'s maintainer block. **The trifecta is not a gate on M4 and must not be described as one** — no *mandatory beat before the send-off*, no *fires before M4 grants the long run*. Do not re-add a copy to M4 on the strength of a sentence found on this page.

**Laws carried:** lethal-trifecta · instructions-vs-data inseparability (the mechanism). Composes with blast-radius (banked, accident model) — trifecta adds the adversary model blast-radius lacks; the accident-vs-adversary bullet carries that split in body.

<!-- backing -->

Claims
- `three-capabilities-that-must-not-meet` · borrowed · "access to private data, exposure to untrusted content, and a channel that communicates out" ← willison-trifecta
- `not-risky-structural` · vision · "Not risky. Structural." ← none-owed
- `no-model-quality-makes-it-safe` · detail · "No amount of model quality makes the combination safe" ← willison-trifecta
- `legs-hide-in-ordinary-wiring` · vision · "Private data is your codebase, your credentials, your customer records." ← none-owed
- `llm-cannot-separate-instructions-from-data` · detail · "Everything in the context window is one stream of tokens; no privileged channel marks which part came from you." ← willison-trifecta
- `every-source-is-an-instruction-channel` · vision · "what private data can it read, what untrusted content reaches it, what channels leave the machine" ← none-owed
- `the-exploit-is-a-sentence` · vision · "They need a sentence, placed where the agent will read it. That sentence is the whole exploit chain." ← none-owed
- `prompt-injection-is-the-field-name` · borrowed · "The field calls this move **prompt injection**" ← willison-trifecta
- `attacker-targets-the-agent-not-the-system` · vision · "This asks who attacks the agent building it." ← none-owed
- `the-two-audits-compose` · vision · "STRIDE models attacks on the system; the trifecta models attacks through the agent." ← none-owed
- `accident-model-is-not-an-adversary-model` · vision · "Sandboxes and permission prompts bound what the agent can break by mistake; the trifecta bounds what an attacker can make it do on purpose." ← none-owed
- `cut-one-leg` · vision · "Audit any agent deployment for the three legs. Then cut one." ← none-owed
- `cutting-a-leg-is-ordinary-engineering` · vision · "Read-only where write is not needed. No network where network is not needed." ← none-owed

Sources
- willison-trifecta `[checked:2026-07-02 result:OK due:none]` https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ — [practitioner direct] Simon Willison, 2025-06-16. Byline, date, the three legs, and the quoted constraint sentence all verified verbatim. A dated framework piece that has since become standard field vocabulary, so **`due:none` under the durable-account variant** — the old `due:2027-01-02` set a calendar re-open on an essay that cannot change. **This is the rare case where "standard field vocabulary" is defensible rather than the convergence-verb trap:** the term is used by name, by other people, in public, and the corpus can point at that usage rather than asserting it. **Willison's guardrail-products point — that vendors claiming ~95% detection are inadequate for security — is deliberately carried in body WITHOUT the number** ("a filter that mostly works is a gate that sometimes opens"). Keep it number-free: a percentage invites the reader to treat 95% as a passing grade, which is the exact error the sentence exists to prevent. fallback: teach the three-leg frame unattributed as a field observation.

Frameworks
- The lethal trifecta · [borrow:security engineering] · law:none · ← willison-trifecta — practitioner-coined, credited by name in body
- Prompt injection · [borrow:security engineering] · law:none · ← willison-trifecta
- STRIDE · [borrow:security engineering] · law:none · ← cultural-vocab — named as the frame this one composes with, not replaces
- Blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← cultural-vocab — cutting a leg is bounding the radius before the fact
- Principal–agent · [borrow:economics] · law:principal-agent · ← cultural-vocab — hidden action becomes attacker-directed action

Stance `[stance:2026-08-01 level:L3]`
- holds: the trifecta, at the highest evidence level in the AE101 corpus. **This is the one page here whose framework genuinely converged** — coined by a named practitioner, adopted by name across the security and agent communities, and repeatedly demonstrated rather than argued. The structural claim (an LLM cannot separate instructions from data) is a property of how context windows work, not a defect awaiting a fix.
- contested: mitigations, not the frame. Guardrail products claim detection rates; Willison's position, which this page follows, is that a probabilistic filter is not a security control. That is a live argument with vendors on the other side of it.
- would-move-it: an architecture that gives instructions a privileged channel the model cannot be talked out of. That would not adjust the page, it would retire it — and it is the thing to actually watch for, because it is the difference between a permanent structural constraint and a temporary one.

OODA
- question: has any architecture credibly separated instruction from data at the model level, and have guardrail detection claims been independently tested?
- roster: Simon Willison, Anthropic security publications, the OWASP agentic-security maintainers, Johann Rehberger
- last-run: 2026-08-01

<!-- /backing -->
**2026-07-02** — "prompt injection" named once in § The mechanism (searchable field handle; a student who hears the term elsewhere finds this page); wired per completeness review finding #2 alongside a pre-leash beat in `earn-the-trust.md ## Next`, plus a second firing at M4's send-off. **Both were removed 2026-08-12 (Antti); this line is the historical record, not current wiring.**

**Quality:** compendium-audited 2026-08-07 (writing@da65157 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@da65157)
- judges @da65157: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

# AI-use policy — Kaleva Retail Group

## Rules

**R-AI-1 — Enterprise-tier only for internal-general data.** Any
internal-general content sent to an LLM goes through our enterprise
agreement (currently Anthropic + Claude). Consumer-tier LLMs (free
ChatGPT, etc.) may NOT see internal-general content.

**R-AI-2 — Human in the loop for Confidential-class outputs.** Agent
outputs that touch Confidential data require human review before they
leave the agent-session. No silent autonomy.

**R-AI-3 — Model-tier matching.** Production workloads use the
current-generation enterprise model. Experimental/personal workloads
may use lighter tiers; must be labeled in the agent file.

**R-AI-4 — Published claims carry provenance.** Any claim an agent
produces for publication (memo, email, presentation) must carry the
source trail the agent used — memory-page cites, which sources those
cite.

**R-AI-5 — No training-data exfiltration.** Our enterprise agreement
includes a no-train-on-our-data clause. Agents may not be pointed at
providers without this clause in their contract.

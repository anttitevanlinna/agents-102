Practitioner proposes augmenting MobAI: instead of one driver + group watches, everyone runs their own code-generating agent simultaneously, then the group pools and compares outcomes. "MobAI on steroids." Named: **SwarmAI / Swarming.**

This is structurally different from classic mob programming. It's parallel generation + collective evaluation. The mob's role shifts from watching to judging between multiple AI-generated solutions. Three models now documented: (1) Compound engineering = solo + AI, (2) CollabAI/MobAI = one driver + group watches + AI, (3) SwarmAI = everyone generates in parallel + group evaluates collectively.

**Gap:** No published evidence of this "parallel mob" pattern. Closest signal is PALO IT's Gen-e2 (mob + AI) but still single-driver model. The parallel generation model needs investigation: does anyone practice this? What are the coordination costs? Does output diversity from different prompting strategies actually produce better outcomes than a single well-guided agent?

**Connection to verification gap:** If the group compares multiple AI outputs and collectively judges quality, this could be the missing verification mechanism for non-engineering domains. No pytest needed — the mob's collective taste across multiple outputs IS the eval.

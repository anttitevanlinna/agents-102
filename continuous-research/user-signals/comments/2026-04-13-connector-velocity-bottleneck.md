Cowork works because the Claude engine works — the agentic capability is Anthropic's, already proven. The structural bottleneck is Microsoft's connector layer: identity (Entra), data (Graph), compliance (Purview/EU Data Boundary). Each connector is a separate engineering project with its own GDPR surface. The 30-day silence, OneDrive-only access, 20-skill cap, and no code execution all point to the same cause: the integrations aren't built yet, not that the agent doesn't work.

This means Microsoft's enterprise agent ecosystem is structurally months behind Anthropic's SOTA. Every Anthropic capability improvement requires Microsoft to re-plumb connectors. They're permanently chasing.

**Pattern:** The vendor who owns the agent model isn't the bottleneck — the vendor who owns the enterprise context layer is. Integration seam between model provider and context owner is where capability dies. Cowork's ceiling is set by Microsoft's connector velocity, not Anthropic's model velocity.

**Gap:** No research tracks connector infrastructure velocity as a platform assessment dimension. We track capability announcements and deployment evidence, but not the integration engineering pipeline that determines when announced capability becomes usable.

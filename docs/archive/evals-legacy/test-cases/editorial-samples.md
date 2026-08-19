# Editorial Evaluation Samples — Theme B

## Scope

Evaluate ALL findings files. Each finding in each file is scored independently by all 5 editorial judges.

## Files to Evaluate

### Domain Files (7)
1. `continuous-research/findings/customer-service.md`
2. `continuous-research/findings/finance-accounting.md`
3. `continuous-research/findings/operations-supply-chain.md`
4. `continuous-research/findings/hr-people-ops.md`
5. `continuous-research/findings/compliance-legal.md`
6. `continuous-research/findings/sales-marketing.md`
7. `continuous-research/findings/product-strategy.md`

### Cross-Cut Files (3)
8. `continuous-research/findings/cross-cut-nordic-enterprise-ai.md`
9. `continuous-research/findings/cross-cut-vertical-saas-agents.md`
10. `continuous-research/findings/cross-cut-chasm-crossing-patterns.md`

### Convergence Files (4)
11. `continuous-research/findings/convergence-platform-agents-in-wild.md`
12. `continuous-research/findings/convergence-hybrid-beats-autonomous.md`
13. `continuous-research/findings/convergence-governance-as-prerequisite.md`
14. `continuous-research/findings/convergence-narrow-agent-orchestration.md`

## Evaluation Unit

Each file contains multiple findings. Score each finding separately, not the file as a whole.

A "finding" is a discrete entry about a specific company or practice. In domain files, these are typically separated by headings (### Company Name). In convergence files, these are individual signals or evidence clusters.

## Known Weak Points (from audit)

These items were flagged in the source audit. They SHOULD score low on the relevant judges:

- **customer-service.md:** NAV/Frida and Kommune-Kari have no verifiable URLs (source_verifiability should be low)
- **sales-marketing.md:** "85% of AI SDRs shut down" has no source (source_verifiability should be 1)
- **convergence-platform-agents-in-wild.md:** Carnegie Mellon "70% failure" stat has no URL
- **convergence-narrow-agent-orchestration.md:** "40% of multi-agent pilots fail" has no source
- **cross-cut-nordic-enterprise-ai.md:** Maersk $300M savings sourced to secondary blog, not primary

If these items score HIGH on source_verifiability, the judge is miscalibrated.

## Output Structure

Per file, write:
```json
{
  "file": "customer-service.md",
  "findings_evaluated": 16,
  "scores_by_judge": {
    "source_verifiability": { "avg": 3.2, "min": 1, "flags": ["NAV/Frida: no URL"] },
    "agentic_gate": { "avg": 3.8, "min": 2, "flags": ["Telia chatbot: not agentic"] },
    "vendor_bias": { "avg": 4.1, "min": 3, "flags": [] },
    "specificity_gate": { "avg": 4.0, "min": 2, "flags": [] },
    "nordic_label_accuracy": { "avg": 4.5, "min": 3, "flags": [] }
  },
  "overall_pass": true,
  "findings_to_fix": ["NAV/Frida", "Telia"]
}
```

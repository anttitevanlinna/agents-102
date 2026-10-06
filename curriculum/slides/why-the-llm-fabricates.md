## Why the LLM fabricates
<!--slide:why-the-llm-fabricates-->

- **It completes the shape.** An LLM continues text in the pattern that looks right. If the pattern is "legal brief with supporting cases" or "consulting report with academic references," the next likely thing is a case name, a citation, a careful paragraph. The form arrives whether or not the world contains the fact. Fluency is cheap; existence is separate.
- **It fills gaps instead of stopping.** When the sources don't hold the missing piece, the model supplies what would make the answer feel complete. The invented part sits next to true parts and borrows their credibility, which is why partial grounding is treacherous. Specific names, docket numbers, dates: more convincing, not more true.
- **It can verify inside the same fiction.** Asking the same model "are you sure?" is not a check on the world; it is another fluent answer. In Mata v. Avianca, asking ChatGPT whether Varghese was real produced exactly that. Verification has to leave the generation loop and touch the source.
- **It inherits organisational shortcuts.** The model didn't file the brief or deliver the report; a workflow did. If the workflow rewards speed and has no step where someone opens the cited source, the fabrication survives. The missing check is organisational, not only technical.

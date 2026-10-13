## Split when they can't be one
<!--slide:split-when-they-cant-be-one-->

Three tests. If any hold, splitting pays. If none do, a single prompt probably beats you.

- **Different access.** Each agent needs different data, different tools, different credentials. A Confluence retriever (an agent that searches and returns matches from Confluence) can't pretend to be a web search. A legal-policy agent shouldn't also have customer-data access. Access boundaries force separation.
- **Different dialect.** The material in each source speaks a different language: internal jargon vs. public tone vs. email shorthand. One agent bending between them loses nuance. Three agents each native to their source keep the signal.
- **Different stance.** The agents should actively disagree with each other. A backward planner and a reframer (an agent that reframes the material from a different stance) thinking *in the same voice* is one agent pretending to be three. If your three are paraphrases, collapse them.

# Year One: Leading an Agentic Transformation from the Inside

These are essays I wrote during one year of leading an enterprise agentic transformation. April 2025 to March 2026. Originally shared weekly in an internal AI newsletter to the engineering organisation, then broadened to the whole company.

I started not knowing much. I ended knowing more — but mostly knowing better questions. The essays track that evolution: from finding the right metaphor for AI, through discovering that competence precedes vision, to recognising that AI engineering IS software engineering, to understanding the Red Queen dynamics of agentic competition.

I have not cleaned these up to sound smarter in hindsight. What you read is what I thought at the time.

## The Arc

Four phases emerge across the year:

**Phase 1: Orientation (Apr–May 2025)** — Finding the right metaphor. AI as personal tool → organizational tool. Learning to share, learning to be wrong, stretching assumptions.

**Phase 2: Process Discovery (Jun–Sep 2025)** — Connecting AI to existing engineering discipline. Cycle time as the real metric. "Sharing is caring" strategy. AI engineering IS software engineering. Lean thinking applies. Knowledge management must change.

**Phase 3: Scaling Reality (Oct–Dec 2025)** — Hitting the walls. Dependencies, context windows, reliability, missing evals. Failing and succeeding simultaneously. The real accounting. Coding agents as breakthrough category.

**Phase 4: Compounding (Jan–Mar 2026)** — Context is learning. The curated agent project structure. Red Queen dynamics. The system learns, not just the person.

## What Independent Research Later Confirmed

I wrote these essays as they came to me. Months later, a systematic research effort (80+ research cycles across industry publications, practitioner accounts, and academic studies) independently arrived at the same patterns. The table below maps the essays to the external evidence. The practitioner saw it first. The research confirmed it.

| Essay | Date | What Independent Research Found |
|-------|------|-------------------------------|
| AI Beyond Personal Tool | Apr 17 | The personal → team → company progression is the dominant framework across all agent platforms |
| Outcomes of AI / What Then? | Apr 25, Jun 27 | Experience-first adoption: WOW → competence → sees future → acts. 7 independent sources converged on this reversed sequence (Mollick/Wharton, Microsoft/HBR, BCG, McKinsey, Coursera, Workera, Infosys/MIT) |
| Strategizing for the Change | Jun 6 | The Conditions Creator pattern: set up tools + peer networks + safety, then step back. Validated at Citi (4,000 champions, 182K employees), PwC Netherlands (300→6,000 in one year), Varonis (AI Guild) |
| Cycle Time, Speed, Quality | Jun 13, Aug 29 | The Absorption Bottleneck: AI accelerates generation but review capacity is fixed. Faros AI (10K devs): 91% review time increase. DX (135K devs): time savings plateau then go net negative. Confirmed across 7 domains — engineering, healthcare, legal, academic review, marketing, customer service, compliance |
| What's After "Try AI"? | Jun 27 | Competence-first is the only sequence with evidence: competence → discovery → context → platform. Skip to platform and you're choosing between vendor stories |
| AI Engineering IS Software Engineering | Aug 22 | Verification infrastructure is the universal gate for AI-nativeness. Three levels: human review → rule-based checks → agent evaluates agent. You can't skip levels |
| Knowledge Management | Sep 12 | The company memory gap: personal memory exists (competitive market), team memory barely exists (CLAUDE.md is the hack), company memory is crickets |
| Discipline, Habits, Context | Oct 3 | Spec-driven leadership reached convergence across 6+ independent signals (Karpathy, StrongDM, Spotify, Mollick, Osmani, 30+ frameworks). The spec is the management artifact |
| Future of Dependencies | Nov 7 | AI dissolves cross-team barriers because transaction cost of understanding other codebases approaches zero. The internal open source moment |
| State of Agents | Dec 12 | "We don't have pretty much any evals" — this verification gap is industry-wide and the primary reason non-engineering domains can't go AI-native |
| Predictions 2026 | Dec 19 | Team agents, coding agents as meta-platform, agent learning — all confirmed by March 2026 evidence |
| Context is KING | Mar 6 | "Context is how your agent learns." The engineering contract must shift from build-for-stability to build-for-learning. Organizational learning rate is the real ceiling |
| Curated Agent Project | Mar 13 | The OODA-based agent creation methodology — observe, orient, decide, act — is the operational playbook that scales |
| The Red Queen | Mar 20 | Competitive compounding is real. Combined with Goldratt's Theory of Constraints and Little's Law: AI accelerates the cheap part (generation) while leaving the expensive part (decisions, review, verification) untouched |

---

## 2025-04-17 — AI as Official Tool: AI Beyond Personal Tool

I started my AI learning and understanding from the personal viewpoint. I tried AI myself, and I didn't use it for proper work. That was my early days thinking.

We are now deliberately changing the perspective of AI from personal to team/organisation tool. You can of course use AI just to spar with yourself. Or you can do your quick analysis of data yourself.

AI is a team and organisation topic when we talk of knowledge and enablement. We now notice we can share knowledge already today in much more actionable ways than before. It used to be writing stuff in wikis and API docs. That used to be ok, but then we kept losing the stuff. And good documentation tended to get too long and tedious. Now we start to see how information can be directly "invoked" with prompts. AI becomes an organisational tool.

I also used to somehow hide my use of LLMs and AI. There was this feeling of hidden personal boost and personal secrets. Of course, the earlier versions of AI used to hallucinate quite a lot more so my outputs were also quite off sometimes. I think I was cautious of not making mistakes.

I hope we can keep making LLM usage more public. LLMs miss half of their potential as just personal tools. That's the second reason we have made the recognition that AI is a full-fledged technology tool. Just like programming languages.

I still make a lot of mistakes. I suppose that's both AI and learning curve working there. I try to force myself still to share — even when the artifact is not great yet.

---

## 2025-04-25 — Outcomes of AI: What Will It Be, What Do We Want

AI can have many outcomes. AI can actually generate anything — especially the LLMs. That makes "let's do AI" an unspecific vision.

This open-endedness can be viewed as good too. The outcome can be whatever we want it to be. It is up to our imagination to dream up the good outcomes. And then, as in all work, we have to focus and get stuff done. We will fail on the way and the first ideas rarely work. The right ideas arrive with persistent iteration and honing. Nothing has changed in how good visions get formed.

Once I myself realised the outcome can be whatever we choose, then I thought that we should go back to the strategy. The OKR work taught me about the "how we will win" and what is the competitive advantage we create. That's different per business unit. The challenges to be solved are critical indeed. But I think trying to crack those is the right thing.

Visioning is not easy. Visioning is the act to imagine the world in 1-2 years (sometimes longer). Then you have to imagine how the world should and will work then. The engaging vision forms with the actual people and their good experiences. This imagining is tough work and you never form a good detailed picture at one sitting.

The better way to form visions is to prototype it. Draw a picture of the future architecture very quickly. Show the version to someone. See what the architecture could mean. Get feedback. Then throw out the prototype and keep the gained knowledge. Next step could be an experiment in giving some new data to Claude and see if it can do the job. Especially watch out for the benefit. Then extrapolate a bit. You build the vision bit by bit.

I hope we can collectively build this picture across the organisation. These pieces all form the bigger picture of the AI-infused technology of the future.

---

## 2025-05-02 — AI as the Eager Junior Developer: The Metaphor for AI

Our brain works with mental models and analogies. I remember that somebody said our brain is more like an analogy matcher than a computing machine. Our cognition works by finding patterns from our knowledge and then applying. At least my brain does not work like the computer sequentially.

AI is such a new thing and it is so natural that we want to find the analogy and metaphor for AI. There have been many proposed: the companion, the junior developer and the advisor to name a few. I had named one Claude project as "advisor" and now I regret the naming. It invokes the wrong analogy. The right analogy is tricky to find.

In the future of AI, we want that there is human accountability. That what AI does stays within human accountability. Accountability in turn means knowledge of what the created AI does. It means knowing the output and consequence. AI can't take responsibility as we think of responsibility. This means our analogy must somehow place AI within our accountability.

AI is tireless and so full of knowledge. With the whole internet as base knowledge, AI is in most ways ever-knowledgeable. AI is also ever-tireless. Sure, sometimes quota runs out. Nonetheless AI can chug along much better than our brains. AI is like both steam power and a full panel of nobel-level scientists.

I've come to learn how AI likes to please us with its answers. It always feels like it wants to work for us. So: placing AI as servant in the analogy might even please the imagined soul of AI.

So, maybe I'll call AI my knowledge seeker and data cruncher.

But then I notice AI does exhibit unpredictable and creative-appearing outputs. The AI agents of the future are self-evolving and they will take on behaviors that are not pre-scripted. So, AI is more than just a cruncher that does exactly what is told.

I'm a father so the evolution of a child comes into mind. The problem with the child is that it of course will grow up. Eventually the child will take over the accountability. So, that will not do as a good analogy for us.

I failed to see it myself. A few prompts with AI helped me narrow down to two analogies. They go:

1. Explorer-on-tether: This metaphor frames AI as an advanced explorer that ventures into complex territories (data, threat landscapes, complex domains) while remaining firmly connected to and controlled by the human team. Like a deep-sea explorer or cave diver with a lifeline.
2. AI-as-intent-cruncher: Given enough guardrail (architecture, tests, dev rules), AI can just crunch through big masses of data. The guardrails are needed to keep us accountable and knowing we've done right thing.

(Apologies for the long philosophical part — sometimes I like to write these down and to share. This in turn I hope shows how forming the right view is not easy for any of us.)

---

## 2025-05-09 — Expect to Be Wrong with the Vision and Ideas

I used to be worried about making a good impression — always. I wanted to be right. Being right equated to creating value. Being right was progress.

Blind spots and misunderstandings are always there. The older I get the more I embrace how our cognition and understanding of the world is limited. I don't understand often what is happening. I don't see. I don't understand deeply. About the future: all is blurry most of the time.

I used to think of being wrong as failure. But being wrong does not diminish you as a person. Lack of effort to understand does.

**Ship the ideas — Discover the wrongs**

I've come to think of design, agile and iterative processes as discovery. The problem is that you don't know a priori what is right and what is wrong. Remember that we have our limited understanding of pretty much anything. It does not help to ponder much and create nice theories in your own head — it is not like they get much righter with my understanding.

What I've learned about design bit by bit is to not be afraid of failing either totally or partially with the many first versions of the design. My creations are not me and not everything has to be perfect.

The idea of course is that you create something very quickly. Think creating something in an hour. You don't have to even like the artifact yourself. The key is showing the idea and then keenly observing how people react to the concept, prototype, or whatever it is that you are exploring.

You have to get what you have created in front of someone who can react. This someone can be a colleague, relative or a customer. And then ask a few questions on whether or not you are onto something or not. People are quick to point out shortcomings and viewpoints missed. Now you have better understanding.

And you have the information to iterate to something that is correct and valuable.

**Complexity thinkers' take on PDCA**

The Plan-Do-Check-Act cycle is a famous cyclical process from the Lean movement. It is a cycle of continuous improvement and continuous learning. The steps are 1) Plan to change or create something. This can be a prototype, process change or virtually anything. 2) Do — Do the work and create what you planned to create. 3) Check the results 4) Act — Absorb learning and adjust your process. Repeat the process endlessly.

I have come across a slight variation of the process for the purposes of design. The cycle loops the same 4 steps but with slightly different wording. 1) Plan to create something 2) Do the work and create the artefact 3) Check the results with somebody. Then the step 4 (act) has an ever so slightly different framing: 4) Create new theory. Create new understanding. (Repeat)

I like this framing of creating new theory out of results.

Creating new theory requires us to ask questions such as "what does the observed difference to what I expected mean?\



---

## 2025-05-16 — Stretch and Shuffle Your Assumptions

Vision and strategy thinking are about the future to be. The future is not objective. In fact, the future is very subjective. Everyone sees the future their own way. Everyone has their own bias.

We carry a lot of baggage of history entering the discussion about the years to come. What works today is what we know. The problem is that the future will not be like today.

I try to be careful with projecting the realities of today as facts of tomorrow. What is impossible today might just be possible in a year.

*Your assumptions are the building blocks*

Your assumptions are the building blocks of strategies of tomorrow. Our thinking stands on the assumptions we have. Our assumptions truly are like Lego-bricks.

If our assumptions are stuck with the realities of today, then we use the knowledge of today to solve the problems of the future years.

*Stretch and shuffle your assumptions*

Stretch your assumptions. Use your hunch on how technologies might develop. Follow trends in their logical progression. Lean forward. Assume some things that were not possible before now become possible. Be optimistic about our future capabilities.

Get quirky with assumptions. Suspend few rules to create freedom. You will end up with strange-feeling scenarios but you might find totally new angles.

Remember to test your new assumptions.

Stretch and shuffle your assumptions. You will create richer options as the constraints of today do not bind you.

"How will your customers solve their problems in the future?"

- Strategic partners — Will they use AI? How would they want to use AI? Do our AI systems connect?
- Consumers — The experience of the app in the future? What is the future of the UI? How will trust work?

Interesting pictures of the future can be imagined. Let's be the paranoid optimists.

(Nod to Risto Siilasmaa)

---

## 2025-06-06 — Strategizing for the Change

We are taking early steps of the AI transformation. We are doing this big elephant of a transformation bit-by-bit.

AI literacy and the ability to imagine the future are the initial key. We've taken the assumption that everyone will eventually have to figure this out. That's why we are asking everyone to take action. This makes this change a bit of a numbers game — the more we explore the more we find. The more we explore the more we learn. It is very hard to measure learning (and we are not even trying to currently). But what I hope happens is that AI literacy grows. The knowledge in your brain is a prerequisite in applying AI thinking of the future. Then this literacy allows us to imagine the future.

I've started calling the strategy "sharing is caring" strategy. We plainly know that if a single person discovers something good, then that should be shared. That sharing hasn't often happened in the past. Now we try to change that with demos and public channels. Cross-team ambassadors have a key role here too. The innovations often hit their radar. Then it is again a matter of sharing sideways. We have local AI communities which always have demos. It feels like extra work sometimes to share. But our change only really scales with sharing.

The other call to action in the change "strategy" is upping the game. It has been written out as "take on tougher challenges" as your skills improve. *I hope innovators keep innovating*. And we are trying to carve out time for that innovation. This hopefully is a good cycle where more fundamental innovations end up freeing time. Then that free time can be put back to next improvements. The aim indeed is to reimagine how software is built. But that change should happen by finding good innovations.

These two cycles of sharing and innovation (upping the game) sum up as collective upping the game. This is what gets us to 2X or maybe 4X. Soon enough, we might be able to see significant shortcuts or rearrangement to the overall product creation process. But that's for maybe 3 months from now. The initial hope is to gain the broad knowledge. That in turn looks to really nicely translate into practical improvements in normal sprint / dev work.

The strategy is also not just "bottom up". The top-down element in the strategy is to ensure everyone is involved. The line organisation has the role of sparking, driving and nurturing the change.

(OK. I know I start to sound a bit grandiose. But I hope this gives a bit of light on how the bigger picture holds together).

---

## 2025-06-13 — Cycle Time, Speed, Quality and AI

The lead time is a classic "lean" metric. To calculate lead time, you basically start the clock when you get the "customer order". You stop the clock when the customer has gotten what they ordered. Now this is manufacturing, and we tune this slightly for our software world. Lead time is usually counted from creation of ticket to customer release (or deployment).

One learning that the lean folks found is that when you start trying to minimize lead time, then you end up having to improve quality and processes everywhere. So the overall goal is to minimize lead time (time to value) to be the shortest sustainable. Shortest sustainable then translates to something like "work done with repeatable process, with the right quality, and without overburdening the people".

The lead time is the goal that then forces you to figure out innovations in the way of working. But you soon notice that the best improvements are how to do quality repeatedly (e.g. test automation) and how to get rid of unnecessary processing. You find ways to fool-proof against mistakes.

You do smaller "batches" of work. You take on "just-in-time" scheduling. You avoid having too much work in progress. I'm sure you've heard all of these before.

I think AI will eventually radically change how software development works. But I think you cannot just jump there to the "to be future" with just one jump. Firstly, we don't know what the future looks like. Secondly, big-bang change usually is not as sustainable as continuous improvement. So: we can start with the current process and keep innovating on shortcuts that actually improve quality.

I know that some fear the speed with AI is created at the cost of quality. Sacrificing on quality however pretty much never helps in any mid term. The lowered quality comes back haunting with extra hassle. That in turn slows things down.

I hope we look at 2X speed up by finding better and quicker ways to build in the quality. And find more ways to build in more quality. That in turn will save time in the next sprints and months.

Lead time, I find, takes in quality as a driving input. It is a bit counter-intuitive but something I find true pretty much every time.

---



---

## 2025-06-27 — What's After "Try AI"?

I know it feels for many that we are missing the end goal of AI. The call to action has been "try AI and share." That's quite the activity-oriented goal and you are right to ask: what then?

I have been promoting this simplistic message and I have wanted to keep it simple. There are multiple underlying reasons. I'll try to enumerate.

The first and foremost is that we simply did not and do not exactly know the future. We could have been debating about the future and trying to form firm future visions. But I feared that would take a lot of time. I wanted so much to act. I saw it as a bit of a choice between abstract and concrete. Action is the concrete.

The early thinking of the journey is also heavily influenced by one of the key observations we had made. Once a person would try out AI with a complex enough use case, then they would pretty much instantly arrive at the "aha" moment. They just got it. And the "aha" moment was so powerful that people wanted to keep doing more. But getting to the "aha" moment required the action of using AI.

I've on the way noticed how basic AI literacy is the big enabler for future vision thinking. If you don't know at all how AI works and what it might be able to do, then you cannot imagine the future with AI. Conversely, the better AI basic skill you have, the easier it is to imagine the future. I have been assuming we don't find the great vision without a broad basic skill base. Again, this points to action.

But I notice I've just been telling about the past. What about the future?

To me, AI is about succeeding in the future. It is about solving the strategic challenges that we have and always will have as we grow. AI is for making quicker progress on the most pressing business changes we want to make.

This means, once you have the basic AI skill, I hope you start to go back to the right OKRs and the right products for the customer. Go back to business and architecture visions. Generate (AI pun) the future then. I hope we will be quicker. But I actually hope we will be wiser with AI about how we build our future. I know this sounds grandiose. But that's the same ladder up as it always has been. We can just be better at it.

The workflow will likely be quite different. More curation. More evaluation. Less algorithmic tinkering. Less time seeking information. But I cannot see the future exactly. I only see some of the interesting outline of the future to be. But that's ok. I feel I have enough direction to continue exploration.

---

## 2025-08-01 — How I Learn AI and Keep Up to Date

I clearly was not an AI expert when I started working full-time on AI four months ago. I knew some of the general direction where things are headed, but pretty much all the detail in knowledge and skill was missing. Here are my main sources of keeping learning.

I'm listening to audiobooks with Audible. I consume about one book every two weeks. I listen while cycling to work. I might sometimes take a walk and listen then too. The more important books I sometimes listen to twice. (I have to confess that I had not been reading books in ten years.) I immediately listened to Ethan Mollick's *Co-Intelligence: Living and Working with AI*. A warm recommendation to that. For working practice in leadership, I've found *The AI-Driven Leader* is the best.

I'm trying to understand the state of the art in agentic coding. This has come across in podcasts. Some of the influential ones are the Cursor team talking about their work and the future. The **"How I AI"** podcast talks specifically about how AI is applied in product creation — not just coding. I also follow **Lenny's Podcast**, which is product-oriented but recently featuring a lot of AI — really fascinating stories behind the biggest tech successes and also opinions into the future.

The third is former Twitter — now X. X has a bad reputation for a reason and it has lots of bad sides to it. However, X still contains plenty of valid and advanced talk on AI. Once you find the right people to follow, then you have a daily stream of news, hype and opinion on what works and what will be the next thing. Again, the learning is following the mixed opinion of the innovators and early adopters. It is a bit tedious but I feel it is working for my brain. I confess that I do that just before falling asleep. (Not recommended maybe for others.)

I try stuff. I deliberately give Claude Code and similar tools a try to get a feeling. This connects the hype to reality.

Finally, I write. I write a personal blog on product work. Recently I've been adding AI-related posts as it has been top of mind. Writing is not easy but I can do it now. I have been regularly writing for two years.

Writing helps me structure my thoughts. It forces me to formalise and organise what is in my head. It takes often iterations. But also: writing gets easier the more you do it. Once you have written something into a document or post, then it is easy to say again. Proper writing is one of the best ways to structure your thoughts even on the most complex matters. I've cleared my head in the past for business strategy concepts and outcome-orientation in product work. Now, the same seems to be repeating for AI.

My experience is that AI is different but the same. It is learnable. And learning again takes time. I don't really have a shortcut myself. I hope you find your own time and way — if you haven't already.

---

## 2025-08-15 — Toward Integration

I have been doing product owner work for an internal AI team. I used to work as a solution architect way back then, so I like to take part in architecture discussions too. Both the PO and architect roles involve making proposals.

Proposals and document creation with AI is quite a different thing than writing by hand. Sometimes I feel like painting with a virtual text brush. I'm forcing myself to apply the brush rather than typing a single character at a time. I feel like I'm trying to set the state of the LLM right. Then I ask it to *paint* as I need. It is kind of like oil painting. You make the very rough base first. The good thing is that you can paint over the rough shape. After the rough shape, you go in to critiquing, changing and finally detailing.

There will be many mistakes on the first rough cut. It is impossible for me still (and possibly forever) to force an LLM to be in the exact right state, and then to paint exactly the right picture. An LLM is both a black box and also a box full of mandatory randomness. The way I currently try to work out the problems is to have the document, the draft artifact, as a file. That file is outside the LLM and it can be improved, versioned, branched, restored and checked by me.

But I was trying to get to integration — integration of epic writing and architecture docs. That is very possible now with MCP. All you need is to make sure your AI tool (I've set this up in Cursor) has access to your issue tracker and source code. This integration of planning tools and code allows you to bridge the two essentials.

My flow is roughly:

1. Have an idea. Add to the AI tool's chat as free text. Just tell everything to the LLM.
2. Say: "Refine according to our process rules." This then formats my freeform thoughts into something formatted. I can then share the draft epic.
3. Architecture: I have created a small ruleset on how to create architecture one-pagers for epics. I ask the AI to draft out architecture for the epic. This architecture is stored as a markdown file and it is shareable as a link.

This workflow is enabled by four things:

1. Issue tracker and external knowledge access via MCP
2. Code access via local file system (repos simply cloned)
3. A shared context providing rulesets for our development process
4. An architecture template repo providing rulesets on how to generate epic architecture designs

Then it is a matter of just trying things out. The modern integrated development environments can combine all of this.

This workflow integration is interesting. It allows you to bridge together traditional process steps into a single integrated view. I had always thought that it could somehow happen with LLMs. Now I see one way it can be achieved in practice.

This same integration will happen in all end-to-end workflows. MCP is an example that allows this, but agents and multi-agent systems are doing the same. We will have fewer handovers. The process phases will fit together much better. The nicest thing will be that you can change something in one place, and the changes will propagate to all phases. We are not yet there. But we are making big strides in that direction every day.

---



---

## 2025-08-22 — AI Engineering IS Software Engineering

Having been trying to figure out scaling of AI work for the last months, I've come to think AI engineering is no different from software engineering. The challenges and solutions are the same.

Let me try list what I see.

The problem with big systems is finding structure that does many good things. It decouples teams, centralises what needs centralising, hides complexity, and generally deals with how to allow for continued evolution. AI may generate selected code faster, but the limits to growth will hit the same. We will need to mind the architecture and good software design also with AI.

Quality is always a concern with software products. We have had to always test what we ship. We used to do pretty much all of that manually. Now we know to automate most of the recurring testing. If you don't test enough and smartly enough, you end up with low quality. Nothing changes here with AI.

Security... no different. If you just put together stuff and don't both analyse what you are doing and check that you did it right, then you end up with not-secure software. AI or not AI, the security work needs doing.

I feel I could list pretty much every facet of large-scale software product creation, and I think I could find the analogy.

The more I look at this, AI engineering needs even more control and discipline than what we are used to. What human can deduce the LLM will generalise and guess wrong.

Hence, AI engineering needs to be just as meticulous as good software engineering. I'm happy to be proven wrong too.

---

## 2025-08-29 — Why Cycle Time Measures the Effects of AI

Cycle time and lead time are close cousins in engineering, and I will start with a bit of terminology. Please bear with me. I will sprinkle in historical references too — still bear with me.

Lead time is a classic and original concept from the Lean movement. Think the Toyota production system that realised the productivity and quality transformation in Japanese auto-industry. Lead time is the shortest sustainable time from receiving an order to cash (ready product). In other words: clock starts when customer places the order. Clock stops when customer has got what they need. The lead time is this time difference. The goal is to minimise that lead time.

Cycle time is a more loose term that sometimes means the same as lead time. Often times too, cycle time refers to a single step or a subset of steps in the overall process. The calculation is still the same. How long it takes from start to finish.

Back to why is lead/cycle time good in measuring effects of AI.

Lead time is an overall metric of the whole process. The metric includes all the steps of the process flow. Specification, implementation, security, quality, releasing, and anything that needs doing. In that way, the metric defies local optimisation in single step in customer value creation. If you try making coding faster but then hamper with testing, then the end-to-end lead time grows (or at least does not diminish).

You may think that you can just skip some work somewhere and speed up lead time by lowering quality for instance. This didn't work with automobiles and quality. You ended up with faulty cars mid production line and the factory flow got disrupted. The more the car factory had quality issues, the more there was disruptions and rework. Trying to speed up by lowering quality did not pay off in any medium term. I think we can conclude the same with software too.

The trick is to go back to the goal: shortest possible sustainable lead time (to the quality standard of the customer). The word sustainable there gives us clue on how to work. We must find sustainable ways to speed up. This in classic manufacturing led to innovations of just-in-time-production, load levelling, takt-times, human-automation, fool-proofing, and countless of process innovations that bit-by-bit sustainably sped up lead time. One very central tenet was finding ways to reduce recurring sources of quality problems. Understand the root causes and change the system so those root causes get diminished. Then it becomes a continuous cycle of improvement.

Quality should be understood in very broad terms in this context. It includes non-functional aspects such as security and maintainability. Also documentation and similar supporting aspects need including. I know we have skimped out on those before. I can see places and examples where we continue to do suboptimal solutions. We over time find out how those shortcuts come to bite us over the medium term. Speeding up in short term without building in quality, security and maintainability slows us in the timescale of few months — and especially years.

A bottleneck always exists in the system. According to Eliyahu Goldratt, you can always find a single step in a process that limits the amount of flow that can happen. This bottleneck often is not obvious on how that is caused. However, you notice the bottleneck step by looking at where a queue of work items is formed. The bottleneck step is just behind where the queue is. If you find sustainable ways to allow for more flow (usually via quicker processing) through the bottleneck then you are becoming better.

Now where is your bottleneck currently?

The thing with improving end-to-end flow is that the simple solutions are often not the right ones. For instance, we think that we can speed up testing by just testing less. Yes, we can speed testing up that way but then we start getting bugs (very likely). Developers get less feedback and code quality drops. Now the situation will be different and you have very much in the backlog — including the bugs! Looks like the bottleneck is in coding. But it might not be. The whole end-to-end process is really a system. Mind how you change that.

The beauty of end-to-end lead time is that it captures all of this.

The goal is shortest sustainable lead time with quality up to the standard of the customer. No two ways around this for me.

We measure lead time (often called cycle time) primarily on story, task and bug level. I know this is a fractional work item. The reason for having such a low level item in measurement is that these items have enough volume to create a bit of statistical meaning. We have too few initiatives and epics to do anything like sound statistics. The other reason is the shorter end-to-end time these items have. The story-level lead time is a leading indicator to epic-level lead time. Epic lead time in turn is a leading indicator to initiative lead time. Initiative lead time is pretty much synonym to roadmap lead time.

Finally, the cycle time is a very cold and efficiency-oriented metric. It is very one-sided and misses totally the "building the right product". It is the yin without the yang. For us, the balancing force must be the qualitative side of how and what. We ought to find ourselves thriving in the VUCA world. Any inspection of the cycle time metrics must be understood in the context of higher understanding, adaptability and versatility. To build the right product (stressing the word "right product"), we will need to keep building our understanding in conjunction to looking at the cycle time.

We can always improve. The more I live, the more I notice business is a learning game. Product thinkers have coined the term "validation velocity" — a close cousin of "learning velocity". I would very much like to measure those. I (and we) simply haven't figured out how to count learning. Then we can't really put that to a number. In the absence of that, cycle time it is — but let's be mindful of the context, limitations but also opportunities.

---

## 2025-09-12 — Time to Rethink Knowledge Management

I think you've seen this over and over again. The customer has a need. Sales talks to customer and finds out what they want. Sales talks to product and information is transferred. Product talks to the team and things are written down in specifications or backlog. This happens repeatedly. We talk, chat, and write down information. We redo the format over and over again inside the company. We are translators and information-mediators.

I'm not saying this produces invalid results. I'm just saying that makes the process very slow too often. Most of the detailed original information is lost before we start creating the product.

The inefficiency is in plain sight. Our routine tends to hide the efficacy of our current ways. We are so used to how we work currently. We have sync meetings. We have calls to transfer information. We still fill out all kinds of forms to pass along information.

**The LLM is the basic AI tool for tomorrow**

A large language model (LLM) tool such as ChatGPT or Claude has become the focal point of knowledge creation. ChatGPT or Claude to crunch through summaries and basic analysis.

ChatGPT and Claude are my go-to tools for working through basic information. I take transcripts out of meetings and interviews. I summarise and sift through the material finding the essential parts. This all collects the body of information which is stored as text files.

The AI tool is also used as basis for suggestions, viewpoint and basic review of work products.

This AI work produces intermediate analysis and lots of new information. This body of knowledge is not the whole truth but pieces of the puzzle. In my old personal practice, this used to be scattered in virtual whiteboards, long word files or basically in my head. Now the cost of intermediate analysis is going so much down. I do more intermediate results. This is all to support richer recombination at later stages.

**Folders on the cloud to store intermediate results**

My thinking is that text-based storage is the optimal way to store knowledge for the months to come. This is because ChatGPT and the competitors eat in text still much better than visual formats.

I end up with a lot of files in folders. We've recently started curating these text files into version control so they can be shared just as code. Knowledge is becoming like code.

These files and folders become the context where you can unleash the AI. AI is generative but without context and intent it ends up outputting generalities. Or if you ask AI to ideate freely, then you still need the context to evaluate what is good and what is bad.

**AI tools thrive on information — AI tools only work with information**

Prompt-based prototyping is already possible. Just try out Cursor for instance. You will get a plausible product interface in minutes. For simple web user interfaces, you can even do this inside the Claude prompt window.

The race is on to create the agent-based coding tools where you just give the tool the intent. Then the agents will do the coding and testing. The results today are not 100% right code. We get something like 60-80% and plenty of gaps. But this is very much enough to make prototypes which are not meant for production use.

Then you take your prototype and you show it inside the company and to potential customers. You go back to recording information and analysis. What used to be days collapses to hours.

If you think you cannot do it, I encourage you to try it out. Basic prompting skill will get you going.

**The changes at hand**

Much more information will be stored. Think 10 times the files compared to current wiki systems. This information is directly accessible without human re-reading and priming our brains to think of something. We will find ways to search the context and inject it with one command.

Cost of analysis collapses. We have many inputs, and we quickly build the detail into the context in the LLM.

We are democratising innovation. It is not only the product manager with the dev team (or IT) who can create well-formed systems in the near future. I think a handy sales person in a company with right enablement will be able to create prototypes very soon. The handy person in accounting may create a full accounting system.

The classical value chain could be really rethought. But the AI that makes this happen needs access to knowledge and well-structured information.

Human taste still needed. The need of differentiation will still be there. I hold that our collective team intelligence will still do that. But we will find more effective ways to do that "shared context" priming.

If you want to get started today: store your AI output to cloud storage. For advanced users: put the material into version control and share to everyone.

---


## 2025-09-19 — In Praise of Continuous Improvement

One of the first learnings I got with agentic engineering was in a meetup where one very advanced AI product manager stated: "performance is just extensive tool integration." He meant that honing the tools and the workflow together is the way to exceptional performance. He and his team had integrated everything from roadmap to release in one fully integrated toolset which was full of AI.

But it was a set of tools, not a single tool.

I've come to agree with this on AI.

AI is a new field, and it throws many of my old workflows "off." I can try to do the things I used to do without AI now with AI. Alas, I fumble. My tools are not where I need them. My prompts are not to be found. It takes time to set things up. It takes time to tediously copy-paste stuff.

For any field like AI, you don't have the necessary pre-knowledge of what is right and wrong. So: you must go find out what works and what doesn't.

Here's where continuous improvement and exploration really come together. The things that you learn that work, you should really hold on to those. The way you do that is that you incorporate that into your personal and team process. You have to keep changing your process ever so little every day.

You hold on to the improvements. They add up.

Your understanding adds up.

You are better at improving again.

I know I have days when I just grind on. Today, I've been fighting in a non-efficient way with one MCP bug. I wish I would not have persisted so long with the initial way I started.

Those who really have their tools and process honed take significant time to try things out. They invest in sharpening the axe. It is not like 5%. It is more like 30%.

I've said a few times before that AI feels like it follows the same paths as we have walked before. Agile, continuous improvement, and learning.

I'm still unable to really "plan" my way into success. Continuous improvement is something that I trust even in these bigger shifts. It is a matter of improvement speed then.

---

## 2025-09-26 — Reflections on Q3

I wrote down my impressions and thoughts on progress before summer. Now again a quarter is at the end, so why not look back.

First of all: the amount of experimentation and activity with AI and LLMs has been very high across the organisation. We have broad adoption of AI chat tools for daily use. And of course, chat usage is not the point. We have the main development tools like GitHub Copilot, Cursor, Claude Code. The user count of AI and agentic coding tools now covers a clear majority of engineers.

The general consensus in self-reported AI use is that it helps in various places in the development cycle. Most respondents report quite high improvements in places. Documentation comes up always. But also coding and test generation.

There is no way to say that AI has made us quicker on the organisation level. We are slightly faster but the modest percentage change easily falls into seasonal variance. Trend is more important to see.

We have places where a positive cycle time trend is visible. Some teams have improved remarkably, and it has been a trend over months. A few places exist where cycle time is going up. Now, try to make the claim of causation between AI and cycle time there. You can't.

The improvements in cycle time can be created without AI. I know of places where better backlog management and focus on work-in-progress limitation has created improvements in cycle time. We cannot isolate the exact effect of AI on organisation performance.

My vibe still is that we are nicely moving in the right direction. This is a combination of qualitative info and positive trends across many teams. So: all in all, I'm really happy with where we have arrived.

Based on our intelligence and discussions with industry peers, we are advanced. We are doing things when others are discussing whether or not it is allowed to use AI. We have our advanced users and advanced use cases.

We can see in front of us many of the practical challenges that need overcoming. We need more "verification." We need faster ways to know what we generated is correct. We need ways to verify faster and more. Same for security. We need to manage our context. We need to find the right facts to feed the AI. But now we know.

Developing one's thinking takes time and repeated effort. And AI is no different it seems. Try it out. Even if you fail, your brain develops new pathways. You train your thinking.

The trend will continue. LLMs get better and more accurate. We learn to control them and apply ourselves with them. Nothing points at the speed of change slowing down in the months to come.

---

## 2025-10-03 — Discipline, Habits, and Context Engineering

Good habits lead to discipline. A habit is the automation in your brain that develops with repeated action. Your brain automates activity sequences over time. A habit is the triple of trigger, action, and reward. The behaviours where you feel success repeatedly form into habits over time.

Good engineering can be seen as developing good habits. Such habits that pretty much automatically lead you to success. Things like TDD. Doing the small things right then leads to bigger things succeeding.

Habits are nice in that they are quite reliable — especially when it comes to human behaviour and our work life.

I, as a person, have never been good at consistency. When I was still coding daily, I was able to keep up the good habit of TDD. I think it just became automated. It was the way I did it. I always had at least semi-good tests. It was a no-brainer. I literally didn't think about it — it was a habit.

Now put in the agent to do the work, and the whole habit game changes. You must give the agent some good habits. Guardrails too, but I think habit will be more interesting. You get the average agent out of the plain LLM model. Then the challenge will be to infuse the general model with good taste and good habits.

I know I sound vague. But that is the translation job for months to come. Then we inject this good habit into the context.

A colleague said at a town hall: "Product as code." Let me then add: "Habit and taste as code."

---

## 2025-10-10 — Being the best, being at the forefront

I used to be confused and torn on "being the best in the world". Our CEO has mentioned the ambition of being the best in the world many times over the time I've known him. Those mentions used to get my head in a state of semi-deep dissonance.

I've always thought of myself as a bit shy. Being in the limelight and being recognized as "the best" had never been a goal for me. It mostly felt awkward - until recently.

Our company has been a leader in our market segment for over 20 years now. It feels quite amazing to me that a rather small company has been able to compete with industry giants. Here we are still.

My experiences have shaped how I think. One powerful memory is the time when we competed in a particular business segment. We were neck-to-neck with another company. The competitor succeeded with one large customer. We dominated all the rest of the world. The competitor got their business going faster and ended up acquiring our smaller business unit. That was one interesting learning on its own.

The bigger learning was still to come on this journey.

So: I got moved to the other (buyer) company. We got to know the competitor technology. The competitor technology was inferior in pretty much all aspects. Still, it did not matter. The ways of working were inferior (IMHO) there too.

My learning was that it is quite doable to be better than the best in sizeable global business. We could, in some ways had been the best. In many ways, over those months I realised that I could be part of something that is really "the best in the world". And that I could, a humble and a bit shy person, actually lead my part there.

I've had the same realisation over and over again. As part of my consulting career, I created a set of product management trainings with a colleague. We ended making a wonderful training that was better than the other options out there. We were, IMHO, the best in the country. In hindsight, I think our training probably was for some people the best in the world.

They say that business only rewards a few best best-in-market companies with ample business outcomes. They say the trick is choosing your battles. I've fully come to agree with this.

I must remind myself to focus. I remind myself to create something clearly better than the average. That requires focus. Only with focus, you can beat the quite good other options out there. You must select your way of winning. That requires the conscious and strict choice of where to make the difference.

I've also learned that it is sometimes surprisingly simple to be the best. There is a saying that roughly translates to: "they eat the same porridge". This kind of means that the competition is human too. They struggle. They have their slowness. They have their limits. They focus on other things than we do.

Constant, smart, and repeated effort and iteration is often enough to become the best in the world.

Will AI be different? Yes and no. Means to the end will be different. The opportunity to lead and taking the effort will be the same.

We were preparing to present at a prominent AI community event. I expected 200+ attendees. I would be presenting with pride and confidence on where we had arrived over the preceding months.

---

## 2025-10-24 — Vision prepares for serendipity

Even imperfect visions prepare you for the right stuff in the AI future.

Ah! Vision. The tough assignment of future thinking that is so hard to approach. A vision is an exercise of writing science fiction about the future (nod: Jeff Patton). Most of us have not done it enough to be fluent with the thinking challenge.

Vision is such an abstract thing when you start approaching it. You don't have the right perspective. You don't have the right thinking mode that you could just activate. The right thoughts just don't seem to arrive at you.

But there is further trouble with the vision work: false starts with mission and strategy. We often stray to depict what we, as a company, do and stand for. That's mission. Vision is about the world out there, outside of our company - the vision lies with the customers. It is the good moments our customers will have - not about us as the company. The other false start is starting to think of strategy too early. Then you think of concrete focus, strict choices and the "how" of making this all happen. Keep these out your mind for the time being.

This writing is how and why any attempt at vision helps you in the future - even if you end up failing to describe the vision well and exactly right.

**Pattern matching**

Our brains are just big pattern matching engines. Our brains work in patterns. I know I'm using the term pattern very loosely here.

We observe the world. Whatever we hear and see enters the brain. Then instantly we start noticing the meaning out of what we have perceived. That is pattern matching.

We also learn by creating patterns. Whenever something happens that does not exactly match what we think, then new patterns start emerging in our brain and memories accumulate. Repeated thinking strengthens the patterns used. The stronger patterns in your brain are easier to summon by matching.

The more you notice a pattern, the more active it is your memory. This is very sneaky. Brain is also very quick to apply the active patterns in any situation. I'm sure there is no clear algorithm on how our brain sorts through the stored patterns in the memory. What I know is that what is top of mind is matched more than the less used patterns.

**Visions are rich with patterns**

Good visions are vivid. They contain detail. The good visions contain curated sets of moments, behaviours, and pictures of the future that are desirable. Vision = patterns.

For an example of well-made vision video: [https://www.youtube.com/watch?v=t08nOEkrX-I](https://www.youtube.com/watch?v=t08nOEkrX-I). Pay attention to how the narrative is about the customer. The product is there too, but the main protagonist is the customer. Feel the sound. See how you imagine the feeling the product is trying to create. See how the product changes the customer's life for the better. Now: this is tangible.

I've noticed all vision work is half training your brain. You search for things that could be great. Your brain absorbs. You discuss and apply what you think might be right in the future. Your brain absorbs. You put the pen to the paper, write and draw pictures of your mental model. Now your brain really makes those concepts sticky.

This all primes your brain to match the right stuff in the months and years to come.

**Imagine**

Imagine our partners using agents created by us. The partners would welcome those agents into their systems. Then our systems would talk and exchange information. Maybe the agents could even plan across our companies. But what would they talk about? Take a guess. Talk to somebody and see what they predict.

Or imagine the curator agent. The curator agent roams our teams, presentation files, and meeting transcripts. The agent keeps sending stuff to an LLM with a large context window (think 10X compared to current). Then we start prompting for the gems in the everyday life. Or the agent could nudge like-minded people to collaborate on ideas that are essentially the same thing. You just didn't know of those conversations and files that are out there. The curator connects colleagues in interesting ways. But what are those ways?

Or imagine the agent that replicates the knowledge sharing that happens in species. How could an agent like that work? What is the sequence? Who does the agent really talk to?

**Spotting the right stuff**

Opportunities that match what we need occur every day. The future is already here - it is not just evenly distributed. The trouble is spotting what really is happening and relevant.

You do the work in looking forward with the vision work.

What you have done is that you've trained your brain to act in the desired way. As the world and events occur, the brain is more likely to match and perceive what you visioned. You understand quicker and better what is happening. You find the pieces of the vision among the big puzzle of everything that is happening.

I know I'm making the lofty work of vision work as mundane matching. Apologies to those who think vision work should remain in the realm of magic. It really does not have to be so.

Better understanding is better thinking. Thinking is a muscle. You become better by applying your thinking to the right stuff.

Take the time to create the wrong visions of how AI will change the world. You might stumble on the right viewpoint. It is a numbers game. Do more and you understand more.

PS: I want to give a nod to Risto Siilasmaa: the value of scenario work is to identify relevant patterns in the future. Then we can observe as the world unfolds, and see if we are moving to the right direction.

---

## 2025-11-07 — Future of dependencies

I have been mindful for the whole year that we have trouble with dependencies. Heck, every company I have visited has struggled. Dependencies is one of those software engineering problems that can be alleviated but not fully cured.

Dependencies inherently stem from division of labor and divisions of ownership. We need some set of teams to specialise and focus on domain A. Then we have other teams focus on domain B. Then team C owns platform where both domains depend on.

Then you imagine a feature that needs changes in all domains. Sounds familiar? (rhetorical question)

This specialisation has been the only way to do anything larger. Any growing software company crosses the complexity of software that a single person can understand probably at year 2-3. Then you go over the limit of complexity what a single team can understand. By the time you have 20 teams, there is enough to learn just within your own team.

It feels totally impossible to understand everything at that scale. And of course, understanding everything would be futile. All you would try to do is understand and learn everything. You would not be creating anything. You cannot even keep up with all the changes hundreds of engineers are making.

What I'm saying is that dependencies exist for a reason.

I know I'm sometimes crazy and I lean forward.

I think we now have an opportunity to fully rethink how dependencies are handled. I've come to strongly believe that with the latest and greatest in AI we could do away with the blockers of internal open source.

Dependencies happen when

1. The team needs **a change in component they don't own**
2. The team needing the change feels they **cannot execute the change in the other component**
3. The team needing the change does **not know the structure and rules** of the other component
4. The team needing change feels they are **not allowed to make changes** in the other component
5. The team needing change in the other component **assumes it will be quicker if the other team makes the change**

Dependencies happen when we assume we don't know how to do the change in the other component. This working across to the boundaries is pretty much never done so we are not certain if that is even socially acceptable.

The sneaky assumption is that the other team will be more efficient in making the change. They are the experts!

What AI changes

1. The transaction cost of learning and understanding other components goes all the time toward zero
2. The transaction cost of making alterations to code goes all the time toward zero
3. Creation of agents, guardrails and generation paths that automatically preserve component-level and system-level intent

I have been keeping an eye on agentic engineering capabilities. Based on my own testing and reading up on what industry leaders are doing, now end-to-end feature planning and feature execution are possible at scale. By scale I mean the scale of a mid-sized technology company. We have a lot of code and repositories. But we are not Microsoft. It is very much an expert skill but now multi-file, multi-component and multi-system features can be executed with AI.

The saying goes: future is already here but it is not evenly distributed.

The technology for cross-component feature planning exists. I suppose this will be a case of few brave ones trying it out. I think you know the potential value of that.

I think I hinted I will talk of future of dependencies. I know you hoped for the full picture. I know I only wrote partial picture. I hope this partial picture helps you think through the rest.

(Followup thoughts: Future of SOA in agentic world. Future of internal open source in agentic world.)

---

## 2025-11-14 — You Transform Organisations

I used to work in a company where our marketing slogan was "you transform organisations." That was catchy and it reminded me of many good things. I'm no longer in that company, but the slogan stays with me. It reminds me of important things in doing change.

The first reminder is that change is not about me. I need to change, but it is not enough that I change. Organisational change is the whole team or big parts of a company changing at the same time. I can do stuff, but by myself I don't matter. The "you" reminds me how many people are needed to make the change happen.

The second and more important reminder is that I need to encourage others to lead. Now there are countless ways to lead, but the more we have leaders, the faster our progress will be.

The word "transform" and "you" together makes the catchiness. That you will transform.

Transformation is a big word. I feel often it is overused, especially in business. The word is also very daunting. It feels it requires drastic action. That it requires drastic change. On most days, I'm not out for drastic change. I like my routine! And who am I to "transform" an organisation? Who are you to transform an organisation?

But if I go with the fact that change is not about me, then it all can make sense. I have learned few things in my career. I have learned that power is in the network of people — and that the network is the power. Then the change simply is all about what we together think it is. I have also learned that there is no such thing as overnight change. Any profound change is actually an accumulation of tens of realisations and countless changes in how one approaches work.

Change happens one step at a time. Change scales in the network.

Making people do bigger things is at core leadership. I have big dissonance myself and I keep balancing between feeling like I can lead big things to not being sure of myself. I guess this feeling could be with many others. But the transformation, as daunting as that word is, is what I return to. I just want to make that happen. And then I remind myself, ... you transform organisations.

---

## 2025-11-28 — Six Months In: What the Data Actually Says

After roughly six months of pushing AI adoption across a technology organisation, we ran a data-driven retrospective. The key insight: cycle time improvements were real and measurable — the agentic coding cohort showed the most significant gains, roughly double the effect of standard code-completion tools — but the improvements were unevenly distributed across teams, with big variation month to month. The data made clear that you can't scale agentic engineering without excellent engineering practices underneath it; the teams combining AI tooling with strong process discipline saw the best results.

The trend of cycle time improvement is clear. The second-level effects may be appearing. It is worth keeping an eye on the correlations of causations to higher-level metrics.

---

## 2025-12-05 — Failing and Succeeding at the Same Time

In the previous weeks, I'd been looking back at six months of AI adoption. There has clearly been success. But there have also been bitter failures, confusion, not knowing and things that just don't work. I've personally tried to cope with repeated fails.

One of the first things we tried building was a local installer for developer tooling. It got working and it was used just a bit. Bad idea, as the need wasn't a daily one. Also, right after we had it, the ecosystem shifted and a better approach appeared. "Just because you can build it does not mean you should build it." (Lucky it did not take that long to build it.)

I've experimented a lot with vibe coding. I built quite some code. Sometimes just to learn. Much of that code is just bad. A fail that taught me a lot about quality.

In our AI working group, we had probably six to ten small innovations that never went anywhere.

One of the big wants we had was to share learnings and good practices across sites and teams. We failed to imagine how that knowledge sharing could really work. Then we did not really action on that. Now not everything is a total fail, as training programs and communities of practice still transfer practices and ideas.

There were many things I wanted and imagined. Didn't have the time. Didn't do.

We made an 80% ready vision, but I never pushed enough to put it really on paper and share.

In some ways, I like to classify this as the nature of innovation. When you do stuff that you don't know, you are bound to fumble. But it still feels so bad sometimes. It gives you anxiety. It gives you a feeling of insufficiency. And failing and being wrong just feels bad.

I wanted this week to acknowledge those things. I'm sure there are many more things that we didn't really do well. Many I've already forgotten.

This one is for those who believe failure and errors are part of learning.

---


Five practitioner essays on the state and direction of agentic AI, written from inside a real enterprise transformation.

---

## 2025-12-12 — State of Agents

*(Disclaimer: not trying to be scientific or exhaustive. Also: please take this as feeling, observation — not as deeply researched truth)*

Written from the point of view that an agent is something that 1) handles stuff toward a goal, 2) gets input and steers itself based on input and steps, 3) is something more than a predefined algorithm that executes the predefined steps.

**Business process helpers with Claude**

We have several Claude agents in use. The most well-known ones are business-process assistants — for instance, a security process helper agent that guides you through filling in pre-information and submitting tickets into the right queue. With skills and patience, agent authors can create multi-step experiences. One marketing planning agent has really tried broadening the agent scope into multi-step planning and a bit of execution too.

These kinds of agents are built on top of Claude Projects, which are then published to all employees.

**Chat-based support bots**

We have a Teams bot that connects to HR systems and a knowledge base. It is based on SaaS tech that wraps an LLM into a controlled and guardrailed chat experience. The agent restricts itself nicely to answering questions and filing tickets when it cannot do the job. It does a good job at never fabricating information. This is based on a strong base prompt that constrains the LLM to predetermined behaviour patterns.

A second Teams chat bot for IT support has been in the works — similar idea, answers questions and handles processes on behalf of employees.

**Coding agents**

Coding agents have proliferated in 2025. I'm sure you have heard of Claude Code, ChatGPT Codex, and GitHub Copilot. I didn't foresee at the start of the year that code and test generation is where AI agents have made a whopping advance in capability and application.

The coding agents have gone from few users to broad daily usage across the engineering organisation. I have a feeling that agentic coding is currently the best understood agent domain also on the internet. These agents have become usable in the core development workflow. They have clearly crossed the chasm going from early adopters to early majority. This signals the maturity of the category of agents.

**Customer support agent**

A support agent based on a CRM vendor's agent tech. I haven't kept up exactly on the latest capabilities there.

**Personal and team agents in Claude**

Countless personal and team assistants exist. Peeking into that innovation is not possible without asking all users.

**Bug assistant (Claude project)**

Yet another Claude agent. This agent has been in slight use. At the same time, this agent also nicely highlights the reliability issues with agents with very complex operating environments. Which gets us to ...

**Recurring trouble**

*Missing experience, agent creation skills, and guidance*

For pretty much all of us, this is the first time we build agents. Software engineering skills seem to help those that have that background. Even a bit from university or similar helps. However, agents are not traditional software and the way you build agents is different from software creation.

The steps are similar but not the same. When software is deterministic, agents are probabilistic. In software, code does what you want. Agents aim to deduce and decide on their own.

The experts in the company have been doing this for a few months. Most of us are only getting started. Guidance on the "how"... good luck finding it.

*Context window*

The current context windows in Claude (and other tools too) are relatively tiny. Assume 200K tokens. You cannot add many documents into a single session. You cannot build universal agents. Even the agent definitions of some of our more ambitious assistants need splitting into multiple context windows and sessions. When the context window is "full" or over, then the agent goes braindead.

It requires expert or advanced skill to manage this. We need to have RAG pipelines and custom solutions to overcome these. I can see that agent creation is not something that all employees could "just do" yet.

*Reliability of outputs*

Some of the agents just don't yet work reliably. There are frequent discussions on wrong outputs.

This is both an inherent thing with LLMs/agents and our current skills. I like to think that correctness is a function of clean input data, quality of the agent, but also the ongoing monitoring and quality improvements.

Reliability also degrades very easily whenever the scope and complexity of the agent increase. This limits our ability to make anything "non-trivial". Also, unreliability compounds the more steps there are. Assume as an example that one step is "90% reliable". Then the full step list with 3+ steps very quickly becomes very unreliable.

This brings us to ...

*Evals*

We don't have pretty much any evals. Evals are an abbreviation of evaluations. The term roughly means to run the AI system and/or agents and measure correctness and quality of the output. Let's imagine a simple agent that can answer IT questions. The quality there likely is the adherence to the original official information. This alignment can be measured.

Once you start defining and measuring quality and correctness, then you are in the evals-world. Then you monitor and continuously improve.

I don't see that yet happening. But no wonder. There is no evals support in Claude for instance. Nor is there direct evals support in pretty much any of the tools we use.

I have been hoping for some of the vendors to pick this up and help us out. Now we would need to always do this custom.

*Multistep workflows*

Multistep workflows are needed to scope out agents. Instead of one mega-agent you have clear and small roles for agents. None of our tools have inbuilt support for multi-step / multi-stage workflows. You can simulate these, but it really is not intuitive.

*Lack of designated "agent platform"*

People intuitively look for an agent platform when they start thinking about agents. Plain Claude can hardly be characterised as an agent platform — while you can do agents there. We don't currently have any recommended agent platform nor guidance on how and when to use them. (Examples: N8N, CrewAI, LangChain, AWS AgentCore, ...)

*Scheduling*

Want your agent running every Monday? Yep, you can't.

*Availability of data and information (especially trusted and valid data)*

*Don't even get me started....*

---

## 2025-12-19 — Predictions 2026

2026 will be a ride. Here's my take on interesting agent trends.

***Teams will create and publish agents***

We have noticed 2025 was the year of personal chats and maybe a few personal agents too. And I think everyone knows this will not scale. This first one is actually two trends combined.

First, teams will create agents that help the team move faster together. Then secondly, teams will start to publish agents to other teams so that those other teams can move faster. Teams start "consuming" and using agents created by other teams.

The first step of creating agents for your own team is obvious but not easy. The second step starts to shift how the whole coordinated value stream works. The smart teams will think of their leverage. The agents that work for other teams (on your behalf) are the multiplicative factor.

***Coding agents will prove better than plain LLM agents***

The breakaway success of Claude Code and ChatGPT Codex (also other code-generating agents in the product category) have shown a fully new paradigm of agent building. For those who have not seen Claude Code in action, the agent is still a chat. However, Claude Code is primed to eagerly create software code (like Python) to deal with stuff that is complex for the LLM to handle. These agents routinely create lots of code to handle any heavy lifting.

If you think about it, it is not easy to scale traditional agents and assistant chats. Any heavy lifting usually hits a wall with current tech.

The on-the-fly code generation gives the muscles for the agent to both crunch through much more and to enter a virtuous cycle of capability accumulation. What I mean by capability accumulation is that these code-generating agents all the time create repeatable code. This repeatable code — what we could call the skeleton of the processing — in turn allows scaling the reach and complexity of the agents.

If you think about it: do you want to chat or do you want to make a system for getting stuff done? I will take the latter any day. That's the difference between chat-based assistants and code-generating agents.

***Iterative human-operated agents dominate***

My initial mental model for AI agents was that they "just do the processing". In a way, the naive idea is that you just give the agent the task, and then it gets the task done. Well well. I haven't seen many of those agents. Simply because that technology is not ready yet — nor will be ready anytime soon.

This trend scales what worked in 2025. The learning I'm taking away is that human steering the agent is actually for the good.

I learned this from my work on code-generating agents and making software fully with agents. I have been now doing this for 9 months. The human in the loop is not going away. Actually, the human in the loop is essential.

The agents don't create knowledge out of thin air. What human deems as "correct" is still what really matters. Therefore, the more we can give our insight and input to agents, then more the agents align with our needs. The trick is finding ways to do more of the input-giving that adds the most value. Then diminish the baby-sitting and mindless prodding the agent along.

I predict the really intense agent-to-human iteration and conversation loop will remain in our agentic workflows. Those who figure this out for real will scale.

Human in the loop is what creates the context for agents. More context is better.

***Agents learn to learn***

Did you notice how AI does not really learn like people? (Rhetorical question... I'm sure you had noticed that.)

Agents will have to learn to learn to be really compatible with business and technology. By learning I mean the same as what happens with people — that the agent understands more over time. The agents also need to start learning about the people they work with.

Scaling is a learning problem. Agents "learn" by obtaining better context. I'm sure something interesting is bound to happen in this space.

Let's start by really figuring out the agent memory. I don't want to start from zero all the time :)

***Information products will be needed***

I think you have heard of "data products". Data products create a governance and reliability layer onto the data that a company possesses. Data products started in the area of analytics. For instance, a company might have a data product called "logistics status". Then people could easily take on the data included — like a product. Then you notice how the good practices of product management can be applied to information access.

Google defined data product as: A data product is a curated, trustworthy, and reusable data asset packaged with its metadata, logic, and governance, designed to solve a specific business problem and deliver measurable value to consumers (people or systems). It goes beyond raw data by adding structure, documentation, quality checks, and defined interfaces (like APIs or dashboards) to make it easy to find, understand, and use for decision-making or powering applications.

LLMs and AI feed off of clean, curated and high-quality information. Not only analytics and numbers — but textual information, facts, and more.

I predict a key facet of enterprise "IQ" is how we slice and dice our information domains. Then we will find owners and publishers. We will do internal product management (not heavyweight) on our info.

***From chatting to orchestrating***

The final trend is chatting to orchestrating. This is to scale and do many things at the same time.

The funny thing about orchestrating is that... orchestrating can be best done by chatting in AI. :)

---

## 2026-03-06 — Context is KING / Context is learning

One thing I keep learning over and over again is the necessity of context. I realised that way back when we were discussing coding with AI. We noticed AI made assumptions and mistakes. Then we realised that was most often because AI just did not have the right rules to follow. It way back then actually had no rules. No context. Every chat started from zero.

So, I tried taking note. Ever since then, lots of my work has been around advocating making everything ready and easy to consume with AI. I had this hunch that more context will be better. We started with a security process and similar. We took what was written for humans in a wiki and made that into AI-optimised `.md` files. The first versions were not great. But they were feedable to Claude. And we noticed Claude was able to follow the guardrail.

We tried running onboarding with AI. We also gave AI a security process and ran it. We learned that AI can drive and shepherd a process. It just needs the process as "context". Context in turn is just files. Files are the simplest context. Any database or ticketing system could work. But the files-based approach has turned out best. It just becomes a problem of sharing the right files easily.

The files-based approach is in conjunction with the uncanny ability of Claude Code (and Codex) to smartly crawl through vast materials and to reason accordingly.

But my own journey has continued. The next learnings are about business and learning itself.

Working on a cross-functional workflow taught me that we can feed business context the same as technical context. We can take the vision input and make that AI-ready. We curated that and made it available for Claude Code. Suddenly Claude can correlate between business vision and technical reality. The domain was large. But it is not too big yet that careful prompting and material handling couldn't overcome it.

I learned after summer that Claude Code (GitHub Copilot and Codex too) could be used across a large enterprise codebase. Again with careful steering. That gave me confidence we could scale this context idea.

The context idea has always been there. I remember a colleague suggesting a big "brain" — a central knowledge codex. That would entail all our knowledge in some queryable form. Current technology is soon getting there. But the single centralised database is not the mental model. I more see a network of contexts. The LLM can navigate those then. We just need to give the map and pointers.

The enterprise "IQ" concept is similar. We now see the need to feed data for the LLM.

I encourage everyone to think how this "data injection" should happen. Claude Code (and upcoming Cowork) can navigate complex structures. Much more complex than a human mind can ever navigate. Never forget about the qualitative data. The more you try with even unstructured data, the more you have to find. Transcripts, emails and conversations are gold for the insight into "why".

The correlation is clear: more and better data for the LLM. It is no longer a hypothesis. It is something that we are actively innovating around.

But finally to learning. Learning is context as well. You do not know what you don't know when working in unfamiliar domains. You don't know the effective way to work in that domain either. But you can try. You can use the LLM to make an educated attempt. You can make a stab at solving a problem. Then you must learn. But the learning is not only for you as human. The learning is for the agent and the context. The basic prompt: "Review this session. See broadly what works and what is not working. Make notes to improve in next sessions".

You build context of what works with and for the LLM. You build context of what is not working. You build context of the optimal way to handle something.

The context is the memory of the LLM. The context is how your agent learns. That's next level.

---

## 2026-03-13 — The Curated Agent Project Structure

I've written down an agent project structure and practice. This foundation process names the flow and activity to create context-driven and evolving agent systems. Here are the core activities in rough sequence.

1 — **Collect context**. Make a folder. Start a Claude Code session in the folder. Give Claude examples of the domain, problem and previous solutions. Simply have the LLM read and observe.

2 — **Declare the goal of the project**. Tell the model that my goals are X, Y, Z. Make these into 1–3 sentence statements. Write to `CLAUDE.md` in the folder. This persists the goal of the system directly into persistent space — pretty much next to the base prompt. Now your LLM will all the time know the goal and it will start curating, working and steering you toward that direction. An agent is goal-oriented. Now your project all of a sudden starts auto-steering toward what you wanted.

But don't assume you get either of these steps right. Worry not. Human can learn. LLM can learn. Let's apply OODA. Observe, orient, decide, act.

3 — **Create guardrail and process**. Have a conversation on how to apply and generate outputs. Take outputs in a broad sense. The goal of the project may be to generate documents. The goal could be ticket housekeeping. But you notice that there should be rules and guardrails on how these goals are met. What actions are optimal. How does the underlying data work? Again: have a conversation with the LLM. Ask it to write you rules. You might get Skills as rules. Nevertheless: you curate your rules.

4 — **Apply the system**. Ask your system to generate the doc. Ask your system to make a simple and safe update. Assume you will get it wrong. The failure is the learning. OODA. Observe, orient, decide, act. Observe the failure. Orient = think what that really means and what is the root cause. Again: this is a conversation in the LLM. Decide: decide on the correct fix. Fix the rules. (Act & Step 3). Rinse and repeat.

5 — You have arrived at **continuous learning**. Keep the OODA loop going. Keep improving your rules. Perfect until good enough. Perfect until repeatable enough. Perfection is not going to be there. Neither is absolute perfection ever the goal in business.

95% of work happens in step 5. You should get to step 5 in 2 hours — not 2 weeks. Iteration is the work. Learning is the work. Testing is the work. Means: big planning is not the work.

Think double loop learning. Your original goals were wrong when you started. At least in 90% of cases. Your failures in step 4 are also feedback on your goals themselves. Go back to your original assumptions. Re-review. Do they hold? Many times the assumptions don't quite hold. OODA. Decide to change and refine your goals. Update the project. All of this is still a conversation in the LLM. Re-run the system. Check the results. It is all a cycle.

We are all the time moving towards self-learning systems. I'm giving more and more complex things for the LLM to solve. I assume the LLM will think through complex sets of requirements and their implications. An LLM does not have a broad "sense" in the same way as humans. An LLM often does not have a broad vision of direction. Human is still clearly better for this. Details: LLM anytime for me. For LLM performance, you need the context. This process is the way to make that happen today.

---

## 2026-03-20 — The Red Queen

Curt Grimm and Ken Smith put the red queen this way: "Here's the paradox: the more aggressively a firm competes, the greater its performance. But by competing so aggressively, it also forces its rivals to compete more aggressively, thus improving their performance. By being competitive — and thus successful — a firm also creates more competitive — and thus more successful — rivals for itself."

The red queen effect comes from biology, but similarities can be observed in business. I came across this fascinating concept in a talk by Simon Wardley (the creator of Wardley maps — worth looking up). He pointed out keenly that the effect of agentic coding is clearly going to be a red queen effect.

One company becomes twice as effective at creating new features. The other companies have no choice but to follow. The rivals will try and outpace each other, and the red-queen-style cycle is snowballing.

You now have a large codebase. Get in some agents, 4X development pace. Then you will have a much larger codebase. Soon, you will know you want 10X. Then if all goes as projected by some, then you simply just speak out the requirements and out comes code. Simon Wardley said plainly: expect a billion lines of code. It just scales.

The ill fate is that the competition will do exactly the same. And there are many competitors on any given field of play. The rivalry is inevitable as always.

A famous HBR article just said the work is getting more intense. Yep. Just take a guess where this all is going. A change is always a mixed bag of good and bad.

Sometimes concepts get invalidated by the "ad absurdum". *Ad absurdum* (Latin for "to the point of absurdity") is a form of argument, often called *reductio ad absurdum*, that proves a claim is false by demonstrating that its logical ultimate consequences lead to a ridiculous, impossible, or contradictory outcome. The ad absurdum refute is to follow the logic and find the inevitable impossibility.

I'm not at all sure if this is a case of inevitable absurdum. Follow the logic of competition and scaling. What do you see?

Table stakes will be higher. While an agent can make a business from scratch in days in the future, I'm not sure if that is any good. Table stakes are those minimum things that need to be in place to be in business on a given playing field. For companies whose main business is through partners, building deeper and more technical connections between you and them might be a good idea. Old idea BTW.

One "absurdum" about the future is that 1000++ features in a product start to confuse the user more than add value. That is one clear place where the "let's just scale everything" projection leads to absurd outcomes.

What is clear: the abundance of products and startups will go through the roof. The marketplace will be crowded. Too many players for newcomers to stand out. A sort of table stakes too.

I think Risto Siilasmaa would say to be the paranoid optimist about the future.

So, why am I writing this? I hope you assume the red queen is real. You will not hide.

At the same time, nobody will keep their sanity using the old ways of approaching this barrage of stuff, insights, features, and everything.

Why I'm writing this... as always... keep learning new skills and ways. Try understanding the future. Act on the future. (Again a nod to Risto Siilasmaa's thinking.)

Over and out for this week.

---

## What I Know Now That I Didn't Know Then

A year in. Some things I got right. Some I got wrong. Here's what stuck.

**Competence precedes vision.** I spent April agonising over the right analogy for AI. By June I realised people don't need analogies — they need the "aha" moment. Once someone builds something real with an agent, the vision forms itself. No slide deck does what 2 hours of hands-on experience does. The sequence is: experience first, vision second. Always.

**AI engineering is software engineering.** I hoped AI would be different. It isn't. Quality, testing, architecture, dependencies, cycle time — all the same problems, amplified. The teams that had good engineering discipline before AI got better. The teams that didn't got faster at producing mess. AI is an amplifier, not a transformer.

**Sharing is harder than building.** We built good things. We failed to share them well. Cross-team knowledge transfer remains the unsolved problem. Agents can dissolve the technical barriers. The social and organisational barriers are still there.

**Context is everything.** More context makes AI better. But context must be curated, maintained, and governed — like code, not like a wiki. "Knowledge as code" is the frame I use now. Version it, review it, test it, share it.

**The Red Queen is already running.** Competition doesn't wait. Every month we don't compound, someone else does. This isn't a project with a deadline. It's a permanent race where learning speed is the only durable advantage.

**I still make mistakes.** More than I'd like. The difference is I make them faster now, and I learn from them sooner. That's the whole point.

---

*These essays were written from inside the work, not from above it. If they help you think about your own transformation, that's the best outcome I could hope for.*


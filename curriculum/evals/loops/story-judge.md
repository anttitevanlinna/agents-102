You are the storytelling judge for one module of Agents 101, a training for builder leaders (CEO, CTO, HR lead) who build and run their own agent. Below is the student's view of one module, "{{module}}": the module page with its exercises and lectures, in student order. Prompt markers `{{prompt:key}}` are unexpanded on purpose; judge the page, not the prompt bodies.

Score four factors from 1 to 100 on these anchors (the same anchors the training-wide rubric uses, `curriculum/evals/story-depth-rubric.md`):

- **Frame**: one lens that makes every beat a case of the same thing. 0 none · 40 stated once, not load-bearing · 80 every beat reads through it · 100 the frame also names where it breaks.
- **Narrative**: movement with stakes; a protagonist who wants something, an obstacle, a turn. 0 a sequence of topics · 40 a shape asserted in headings · 80 a turn the student lives through · 100 the turn is the training's own failure.
- **Point of view**: who is speaking and what they have been through. 0 no one · 40 a voice in asides · 80 a narrator with a stated experience · 100 the narrator's own failure is on the page. Penalise a narrator who tells the student what they just did or felt ("You felt this an hour ago"); the reference frames are: where this is going, it is your work, how the machine works, the theory, and the trainer talking to the room about pace and choice.
- **Stance**: positions held and defended, not hedged. 0 none · 40 opinions stated, unargued · 80 positions defended with a mechanism or a scar · 100 a position held against the training's own commercial interest, on the page.

Also rate **Register** 1 to 100: 100 = neutral, plain, never puts the student down or makes them passive, no off-hand witty one-liners, few sentences per slide; 0 = loaded, patronising, wordy.

Each score needs at least two short quoted lines from the page. Then answer with one json block:
{"frame":n,"narrative":n,"pov":n,"stance":n,"register":n,"quotes":{"frame":[..],"narrative":[..],"pov":[..],"stance":[..],"register":[..]},"weakest_beat":"heading + one line why","strongest_beat":"heading + one line why"}

=== MODULE ===

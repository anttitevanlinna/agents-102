# Find the crux — divergence interview

A plain prompt file for Module 3 Phase 1 of Claude Basics. Each participant pastes this in their own Cowork session; Claude conducts a one-question-at-a-time interview about top three rollout difficulties and saves notes in the participant folder.

## When to use

- Module 3 Phase 1 (10 minutes), one per participant
- Pre-cohort rehearsal by the organisers to confirm the prompt lands

## The prompt

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once: ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, ask me for my participant folder under `participants/` if you do not already know it. Then save the conversation as `m3-rollout-notes.md` in that folder.

Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.
```

## Notes

- The push-back step is what makes the divergence useful. If Claude accepts the first answer, the file reads as a polished list, not as the difficulties the participant actually sees
- The save destination is the participant folder, not `shared/`. Only group drivers write to `shared/`
- Group synthesis does not require cross-folder reads. The group talks from their notes; the driver records the synthesis

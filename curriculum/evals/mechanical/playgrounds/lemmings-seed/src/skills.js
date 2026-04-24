// Skills are just small mutations on a lemming + a budget counter.

export const SKILLS = {
  block: { label: 'Blocker', count: 2, apply: (l) => { l.state = 'block'; } },
  bash:  { label: 'Basher',  count: 3, apply: (l) => { l.state = 'bash'; l.timer = 0; } },
  dig:   { label: 'Digger',  count: 2, apply: (l) => { l.state = 'dig';  l.timer = 0; } },
};

export function canApply(skillKey, lemming) {
  if (!lemming) return false;
  if (lemming.state !== 'walk') return false;
  return SKILLS[skillKey].count > 0;
}

export function applySkill(skillKey, lemming) {
  if (!canApply(skillKey, lemming)) return false;
  SKILLS[skillKey].count -= 1;
  SKILLS[skillKey].apply(lemming);
  return true;
}

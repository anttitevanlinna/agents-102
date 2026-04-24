// WIP: backend integration. Not wired into main.js yet.
// The feature we're shipping this week: leaderboard + level sharing.

export const BACKEND_URL = 'http://localhost:3000';

let token = localStorage.getItem('lemmings_token') || null;

export async function register(email, password) {
  const r = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const j = await r.json();
  if (j.token) { token = j.token; localStorage.setItem('lemmings_token', token); }
  return j;
}

export async function login(email, password) {
  const r = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const j = await r.json();
  if (j.token) { token = j.token; localStorage.setItem('lemmings_token', token); }
  return j;
}

export async function submitScore(userId, levelId, score) {
  const r = await fetch(`${BACKEND_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ user_id: userId, level_id: levelId, score })
  });
  return r.json();
}

export async function topScores() {
  const r = await fetch(`${BACKEND_URL}/scores/top`);
  return r.json();
}

export async function uploadLevel(title, data, isPublic) {
  const r = await fetch(`${BACKEND_URL}/levels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, data, is_public: isPublic })
  });
  return r.json();
}

export async function listLevels() {
  const r = await fetch(`${BACKEND_URL}/levels`);
  return r.json();
}

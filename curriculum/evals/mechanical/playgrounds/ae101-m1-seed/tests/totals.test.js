import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum, mean, dailyTotals } from '../src/totals.js';

test('sum of positives', () => {
  assert.equal(sum([1, 2, 3]), 6);
});

test('sum of empty array', () => {
  assert.equal(sum([]), 0);
});

test('mean of positives', () => {
  assert.equal(mean([2, 4, 6]), 4);
});

test('mean of empty array', () => {
  assert.equal(mean([]), 0);
});

test('dailyTotals groups by day', () => {
  const items = [
    { day: '2026-05-01', amount: 100 },
    { day: '2026-05-01', amount: 50 },
    { day: '2026-05-02', amount: 75 },
  ];
  assert.deepEqual(dailyTotals(items), {
    '2026-05-01': 150,
    '2026-05-02': 75,
  });
});

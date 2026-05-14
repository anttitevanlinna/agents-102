import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAdjustment } from '../src/adjustments.js';

test('parses a well-formed line', () => {
  assert.deepEqual(
    parseAdjustment('2026-05-01, refund, -50'),
    { day: '2026-05-01', reason: 'refund', amount: -50 }
  );
});

test('throws on malformed line', () => {
  assert.throws(() => parseAdjustment('2026-05-01, refund'));
});

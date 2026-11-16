import test from 'node:test'
import assert from 'node:assert/strict'
import { MANSION_LEVELS } from '../src/walkthrough/mansion/spec.js'

test('MansionR uses basement, ground, first, second and rooftop dimensions', () => {
  assert.deepEqual(MANSION_LEVELS.map((level) => level.id), ['basement', 'ground', 'l1', 'l2', 'roof'])
  assert.deepEqual(MANSION_LEVELS.map((level) => level.y), [-3.2, 0, 3.6, 7.2, 10.8])
})

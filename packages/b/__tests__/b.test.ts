import { b } from '../src'
test('base', () => {
  const fn = b(1)
  expect(fn(0)).toBe(1)
  expect(fn(2)).toBe(3)
})

import { Num } from '../src'
test('base', () => {
  expect(Num.id).toBe(0)
  const num = new Num(1)
  expect(Num.id).toBe(1)
  expect(num.value).toBe(1)
  expect((num.value = 10)).toBe(10)
})

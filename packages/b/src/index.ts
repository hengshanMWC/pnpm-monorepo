import { a } from '@test/a'

export function b(num: number): (num2: number) => number {
  let num1 = num
  return function (num2: number) {
    return (num1 = a(num1, num2))
  }
}

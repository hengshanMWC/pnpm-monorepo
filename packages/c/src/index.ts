import { a } from '@test/a'
import { b } from '@test/b'

export class Num {
  static id = 0
  private fn: (num2: number) => number
  constructor(num: number) {
    Num.id = a(1, Num.id)
    this.fn = b(num)
  }
  get value() {
    return this.fn(0)
  }
  set value(num) {
    this.fn(num)
  }
}

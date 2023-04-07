import { isAlpha } from './is-alpha'

describe('isAlpha', () => {
  it.each([
    ['a', true],
    ['A', true],
    ['_', true],
    ['0', false],
    [' ', false],
    ['\0', false],
  ])('returns %s when the character is %s', (c, expected) => {
    expect(isAlpha(c)).toBe(expected)
  })
})

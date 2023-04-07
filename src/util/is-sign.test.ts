import { isSign } from './is-sign'

describe('isSign', () => {
  it.each([
    ['-', true],
    ['+', true],
    ['0', false],
    ['a', false],
    ['\0', false],
  ])('returns %s when the character is %s', (c, expected) => {
    expect(isSign(c)).toBe(expected)
  })
})

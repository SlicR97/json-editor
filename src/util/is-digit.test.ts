import { isDigit } from './is-digit'

describe('isDigit', () => {
  it.each([
    ['0', true],
    ['1', true],
    ['2', true],
    ['3', true],
    ['4', true],
    ['5', true],
    ['6', true],
    ['7', true],
    ['8', true],
    ['9', true],
    ['a', false],
    ['\0', false],
  ])('returns %s when given %s', (input, expected) => {
    expect(isDigit(input)).toBe(expected)
  })
})

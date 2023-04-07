import { scanString } from './scan-string'
import { TokenType } from '../types/token-type.enum'
import { Parseable } from '../util/parseable'

describe('scanString', () => {
  it('throws an error when the string does not start with a quote', () => {
    const parseable = new Parseable(['a', 'b', 'c', '"'], '\0')
    expect(() => scanString(parseable)).toThrow()
  })

  it('returns a string token', () => {
    const parseable = new Parseable(['"', 'a', 'B', '_', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'aB_',
    })
  })

  it('returns a string token with escaped quotes', () => {
    const parseable = new Parseable(['"', 'a', '\\', '"', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\"bc',
    })
  })

  it('returns a string token with escaped backslashes', () => {
    const parseable = new Parseable(['"', 'a', '\\', '\\', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bc',
    })
  })

  it('returns a string token with escaped forward slashes', () => {
    const parseable = new Parseable(['"', 'a', '\\', '/', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\/bc',
    })
  })

  it('returns a string token with escaped backspace characters', () => {
    const parseable = new Parseable(
      ['"', 'a', '\\', '\\', 'b', 'b', 'c', '"'],
      '\0',
    )
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bbc',
    })
  })

  it('returns a string token with escaped form feed characters', () => {
    const parseable = new Parseable(['"', 'a', '\\', 'f', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\fbc',
    })
  })

  it('returns a string token with escaped new line characters', () => {
    const parseable = new Parseable(['"', 'a', '\\', 'n', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\nbc',
    })
  })

  it('returns a string token with escaped carriage return characters', () => {
    const parseable = new Parseable(['"', 'a', '\\', 'r', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\rbc',
    })
  })

  it('returns a string token with escaped tab characters', () => {
    const parseable = new Parseable(['"', 'a', '\\', 't', 'b', 'c', '"'], '\0')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\tbc',
    })
  })

  it('returns a string token with escaped unicode characters', () => {
    const parseable = new Parseable(
      ['"', 'a', '\\', 'u', '0', '0', '0', '0', 'b', 'c', '"'],
      '\0',
    )
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\u0000bc',
    })
  })

  it('throws an error when the string is not terminated', () => {
    const parseable = new Parseable(['"', 'a', 'b', 'c'], '\0')
    expect(() => scanString(parseable)).toThrowError()
  })

  it('throws an error when the string contains an invalid escape sequence', () => {
    const parseable = new Parseable(['"', 'a', '\\', 'x', 'b', 'c', '"'], '\0')
    expect(() => scanString(parseable)).toThrowError()
  })

  it('throws an error when the string contains an invalid unicode escape sequence', () => {
    const parseable = new Parseable(
      ['"', 'a', '\\', '0', '1', '2', 'c', '"'],
      '\0',
    )
    expect(() => scanString(parseable)).toThrowError()
  })
})

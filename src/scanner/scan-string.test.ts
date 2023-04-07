import { scanString } from './scan-string'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'

describe('scanString', () => {
  it('throws an error when the string does not start with a quote', () => {
    const parseable = new StringParseable('abc"')
    expect(() => scanString(parseable)).toThrow()
  })

  it('returns a string token', () => {
    const parseable = new StringParseable('"aB_"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'aB_',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped quotes', () => {
    const parseable = new StringParseable('"a\\"bc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\"bc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped backslashes', () => {
    const parseable = new StringParseable('"a\\\\bc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped forward slashes', () => {
    const parseable = new StringParseable('"a\\/bc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\/bc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped backspace characters', () => {
    const parseable = new StringParseable('"a\\\\bbc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bbc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped form feed characters', () => {
    const parseable = new StringParseable('"a\\fbc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\fbc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped new line characters', () => {
    const parseable = new StringParseable('"a\\nbc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\nbc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped carriage return characters', () => {
    const parseable = new StringParseable('"a\\rbc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\rbc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped tab characters', () => {
    const parseable = new StringParseable('"a\\tbc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\tbc',
      line: 1,
      column: 2,
    })
  })

  it('returns a string token with escaped unicode characters', () => {
    const parseable = new StringParseable('"a\\u0000bc"')
    expect(scanString(parseable)).toEqual({
      type: TokenType.string,
      value: 'a\\u0000bc',
      line: 1,
      column: 2,
    })
  })

  it('throws an error when the string is not terminated', () => {
    const parseable = new StringParseable('"abc')
    expect(() => scanString(parseable)).toThrowError()
  })

  it('throws an error when the string contains an invalid escape sequence', () => {
    const parseable = new StringParseable('"a\\zbc"')
    expect(() => scanString(parseable)).toThrowError()
  })

  it('throws an error when the string contains an invalid unicode escape sequence', () => {
    const parseable = new StringParseable('"a\\u000bc"')
    expect(() => scanString(parseable)).toThrowError()
  })
})

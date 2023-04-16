import { scanString } from './scan-string'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'

describe('scanString', () => {
  it('returns an error when the string does not start with a quote', () => {
    const parseable = new StringParseable('abc"')

    const result = scanString(parseable)
    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected open quote',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token', () => {
    const parseable = new StringParseable('"aB_"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'aB_',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped quotes', () => {
    const parseable = new StringParseable('"a\\"bc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\"bc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped backslashes', () => {
    const parseable = new StringParseable('"a\\\\bc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped forward slashes', () => {
    const parseable = new StringParseable('"a\\/bc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\/bc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped backspace characters', () => {
    const parseable = new StringParseable('"a\\\\bbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\\\bbc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped form feed characters', () => {
    const parseable = new StringParseable('"a\\fbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\fbc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped new line characters', () => {
    const parseable = new StringParseable('"a\\nbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\nbc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped carriage return characters', () => {
    const parseable = new StringParseable('"a\\rbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\rbc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped tab characters', () => {
    const parseable = new StringParseable('"a\\tbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\tbc',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token with escaped unicode characters', () => {
    const parseable = new StringParseable('"a\\u0000bc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.string,
      value: 'a\\u0000bc',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the string is not terminated', () => {
    const parseable = new StringParseable('"abc')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Unterminated string',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the string contains an invalid escape sequence', () => {
    const parseable = new StringParseable('"a\\zbc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Invalid escape sequence',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the string contains an invalid unicode escape sequence', () => {
    const parseable = new StringParseable('"a\\u000bc"')

    const result = scanString(parseable)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Invalid escape sequence',
      line: 1,
      column: 1,
    })
  })
})

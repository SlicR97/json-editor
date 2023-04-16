import { scanJson } from './scan-json'
import { TokenType } from '../types/token-type.enum'
import { Result } from '../types/result.type'

describe('scanJson', () => {
  it('scans an empty array', () => {
    const result = scanJson('[]')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 1,
        column: 2,
      },
    ])
  })

  it('scans an array with a single string', () => {
    const result = scanJson('["abc"]')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 1,
        column: 2,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 1,
        column: 7,
      },
    ])
  })

  it('scans an array with multiple elements', () => {
    const result = scanJson('["abc", 123]')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 1,
        column: 2,
      },
      {
        type: TokenType.comma,
        value: ',',
        line: 1,
        column: 7,
      },
      {
        type: TokenType.number,
        value: '123',
        line: 1,
        column: 9,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 1,
        column: 12,
      },
    ])
  })

  it('scans an array with nested arrays', () => {
    const result = scanJson('["abc", [123]]')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 1,
        column: 2,
      },
      {
        type: TokenType.comma,
        value: ',',
        line: 1,
        column: 7,
      },
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 9,
      },
      {
        type: TokenType.number,
        value: '123',
        line: 1,
        column: 10,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 1,
        column: 13,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 1,
        column: 14,
      },
    ])
  })

  it('returns an empty array when the string is empty', () => {
    const result = scanJson('')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([])
  })

  it('returns failure when the string is not valid JSON', () => {
    const result = scanJson('abc')

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Unexpected identifier',
      line: 1,
      column: 1,
    })
  })

  it('returns a string token when the string is a string', () => {
    const result = scanJson('"abc"')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.string,
        value: 'abc',
        line: 1,
        column: 1,
      },
    ])
  })

  it('returns an array of tokens when the string is valid JSON', () => {
    const result = scanJson('123')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.number,
        value: '123',
        line: 1,
        column: 1,
      },
    ])
  })

  it('ignores whitespace', () => {
    const result = scanJson('\n\n\t\r\f 123 ')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.number,
        value: '123',
        line: 3,
        column: 3,
      },
    ])
  })

  it('returns a true token when the string is true', () => {
    const result = scanJson('true')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.true,
        value: 'true',
        line: 1,
        column: 1,
      },
    ])
  })

  it('returns a false token when the string is false', () => {
    const result = scanJson('false')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.false,
        value: 'false',
        line: 1,
        column: 1,
      },
    ])
  })

  it('returns a null token when the string is null', () => {
    const result = scanJson('null')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.null,
        value: 'null',
        line: 1,
        column: 1,
      },
    ])
  })

  it('scans an object', () => {
    const result = scanJson('{"a": 123}')

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual([
      {
        type: TokenType.openBrace,
        value: '{',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'a',
        line: 1,
        column: 2,
      },
      {
        type: TokenType.colon,
        value: ':',
        line: 1,
        column: 5,
      },
      {
        type: TokenType.number,
        value: '123',
        line: 1,
        column: 7,
      },
      {
        type: TokenType.closeBrace,
        value: '}',
        line: 1,
        column: 10,
      },
    ])
  })

  it('returns a failure if it encounters an unknown character', () => {
    const result = scanJson('\\abc')

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Unexpected character: \\',
      line: 1,
      column: 1,
    })
  })

  it('returns a failure if it encounters an unterminated string', () => {
    const result = scanJson('"abc')

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Unterminated string',
      line: 1,
      column: 1,
    })
  })

  it('returns a failure if it encounters an invalid number', () => {
    const result = scanJson('123e+-23')

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected digit after exponent sign, got "-"',
      line: 1,
      column: 6,
    })
  })
})

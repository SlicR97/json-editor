import { scanJson } from './scan-json'
import { TokenType } from '../types/token-type.enum'

describe('scanJson', () => {
  it('scans an empty array', () => {
    expect(scanJson('[]')).toEqual([
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
    expect(scanJson('["abc"]')).toEqual([
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
        column: 3,
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
    expect(scanJson('["abc", 123]')).toEqual([
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
        column: 3,
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
    expect(scanJson('["abc", [123]]')).toEqual([
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
        column: 3,
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
    expect(scanJson('')).toEqual([])
  })

  it('returns an empty array when the string is not valid JSON', () => {
    expect(() => scanJson('abc')).toThrow()
  })

  it('returns a string token when the string is a string', () => {
    expect(scanJson('"abc"')).toEqual([
      {
        type: TokenType.string,
        value: 'abc',
        line: 1,
        column: 2,
      },
    ])
  })

  it('returns an array of tokens when the string is valid JSON', () => {
    expect(scanJson('123')).toEqual([
      {
        type: TokenType.number,
        value: '123',
        line: 1,
        column: 1,
      },
    ])
  })

  it('ignores whitespace', () => {
    expect(scanJson('\n\n\t\r\f 123 ')).toEqual([
      {
        type: TokenType.number,
        value: '123',
        line: 3,
        column: 3,
      },
    ])
  })

  it('returns a true token when the string is true', () => {
    expect(scanJson('true')).toEqual([
      {
        type: TokenType.true,
        value: 'true',
        line: 1,
        column: 1,
      },
    ])
  })

  it('returns a false token when the string is false', () => {
    expect(scanJson('false')).toEqual([
      {
        type: TokenType.false,
        value: 'false',
        line: 1,
        column: 1,
      },
    ])
  })

  it('returns a null token when the string is null', () => {
    expect(scanJson('null')).toEqual([
      {
        type: TokenType.null,
        value: 'null',
        line: 1,
        column: 1,
      },
    ])
  })

  it('scan an object', () => {
    expect(scanJson('{"a": 123}')).toEqual([
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
        column: 3,
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

  it('throws if it encounters an unknown character', () => {
    expect(() => scanJson('\\abc')).toThrow()
  })
})

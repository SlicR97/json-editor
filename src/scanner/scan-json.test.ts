import { scanJson } from './scan-json'
import { TokenType } from '../types/token-type.enum'

describe('scanJson', () => {
  it('scans an empty array', () => {
    expect(scanJson('[]')).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
      },
    ])
  })

  it('scans an array with a single string', () => {
    expect(scanJson('["abc"]')).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
      },
    ])
  })

  it('scans an array with multiple elements', () => {
    expect(scanJson('["abc", 123]')).toEqual([
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.comma,
        value: ',',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
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
      },
    ])
  })

  it('returns an array of tokens when the string is valid JSON', () => {
    expect(scanJson('123')).toEqual([
      {
        type: TokenType.number,
        value: '123',
      },
    ])
  })

  it('returns a true token when the string is true', () => {
    expect(scanJson('true')).toEqual([
      {
        type: TokenType.true,
        value: 'true',
      },
    ])
  })

  it('returns a false token when the string is false', () => {
    expect(scanJson('false')).toEqual([
      {
        type: TokenType.false,
        value: 'false',
      },
    ])
  })

  it('returns a null token when the string is null', () => {
    expect(scanJson('null')).toEqual([
      {
        type: TokenType.null,
        value: 'null',
      },
    ])
  })
})

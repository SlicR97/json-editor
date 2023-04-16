import { parseArray } from './parse-array'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { Token } from '../types/token.type'

describe('parseArray', () => {
  it('parses an empty array', () => {
    const parseable = new TokenParseable([
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

    const result = parseArray(parseable)
    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'array',
      value: [],
      line: 1,
      column: 1,
    })
  })

  it('parses an array with a single string', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 2,
        column: 2,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 3,
        column: 1,
      },
    ])

    const result = parseArray(parseable)
    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'abc',
          line: 2,
          column: 2,
        },
      ],
      line: 1,
      column: 1,
    })
  })

  it('parses an array with multiple elements', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 2,
        column: 2,
      },
      {
        type: TokenType.comma,
        value: ',',
        line: 2,
        column: 3,
      },
      {
        type: TokenType.number,
        value: '123',
        line: 3,
        column: 2,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 4,
        column: 1,
      },
    ])

    const result = parseArray(parseable)
    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'abc',
          line: 2,
          column: 2,
        },
        {
          type: 'number',
          value: '123',
          line: 3,
          column: 2,
        },
      ],
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the array is not closed', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 2,
        column: 2,
      },
      {
        type: TokenType.comma,
        value: ',',
        line: 2,
        column: 3,
      },
    ])

    const result = parseArray(parseable)
    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "]"',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the array is not opened', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.string,
        value: 'abc',
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

    const result = parseArray(parseable)
    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "["',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the elements are not separated by a comma', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 2,
        column: 2,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 3,
        column: 2,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 4,
        column: 1,
      },
    ])

    const result = parseArray(parseable)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "," after element',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when an element cannot be parsed', () => {
    const tokens: Token[] = [
      {
        type: TokenType.openBracket,
        value: '[',
        line: 1,
        column: 1,
      },
      {
        type: TokenType.openBrace,
        value: '{',
        line: 2,
        column: 2,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 3,
        column: 3,
      },
      {
        type: TokenType.string,
        value: 'abc',
        line: 4,
        column: 3,
      },
      {
        type: TokenType.closeBrace,
        value: '}',
        line: 5,
        column: 2,
      },
      {
        type: TokenType.closeBracket,
        value: ']',
        line: 6,
        column: 1,
      },
    ]

    const result = parseArray(new TokenParseable(tokens))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected ":" after key',
      line: 2,
      column: 2,
    })
  })
})

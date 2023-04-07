import { parseArray } from './parse-array'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'

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
    expect(parseArray(parseable)).toEqual({
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
    expect(parseArray(parseable)).toEqual({
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
    expect(parseArray(parseable)).toEqual({
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

  it('throws an error when the array is not closed', () => {
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
    ])
    expect(() => parseArray(parseable)).toThrow('Expected "]"')
  })

  it('throws an error when the array is not opened', () => {
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
    expect(() => parseArray(parseable)).toThrow('Expected "["')
  })
})

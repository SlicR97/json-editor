import { parseArray } from './parse-array'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'

describe('parseArray', () => {
  it('parses an empty array', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
      },
    ])
    expect(parseArray(parseable)).toEqual({
      type: 'array',
      value: [],
    })
  })

  it('parses an array with a single string', () => {
    const parseable = new TokenParseable([
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
    expect(parseArray(parseable)).toEqual({
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'abc',
        },
      ],
    })
  })

  it('parses an array with multiple elements', () => {
    const parseable = new TokenParseable([
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
    expect(parseArray(parseable)).toEqual({
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'abc',
        },
        {
          type: 'number',
          value: '123',
        },
      ],
    })
  })

  it('throws an error when the array is not closed', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
    ])
    expect(() => parseArray(parseable)).toThrow('Expected "]"')
  })

  it('throws an error when the array is not opened', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
      },
    ])
    expect(() => parseArray(parseable)).toThrow('Expected "["')
  })
})

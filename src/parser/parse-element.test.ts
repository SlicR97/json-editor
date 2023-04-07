import { TokenType } from '../types/token-type.enum'
import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'

describe('parseElement', () => {
  it('parses a number when the first token is a number', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '1',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'number',
      value: '1',
    })
  })

  it('parses a string when the first token is a string', () => {
    const tokens = [
      {
        type: TokenType.string,
        value: 'abc',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'string',
      value: 'abc',
    })
  })

  it('parses a boolean when the first token is a true', () => {
    const tokens = [
      {
        type: TokenType.true,
        value: '',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'boolean',
      value: true,
    })
  })

  it('parses a boolean when the first token is a false', () => {
    const tokens = [
      {
        type: TokenType.false,
        value: '',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'boolean',
      value: false,
    })
  })

  it('parses a null when the first token is a null', () => {
    const tokens = [
      {
        type: TokenType.null,
        value: '',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'null',
    })
  })

  it('parses an array when the first token is an open bracket', () => {
    const tokens = [
      {
        type: TokenType.openBracket,
        value: '',
      },
      {
        type: TokenType.closeBracket,
        value: '',
      },
    ]
    const json = parseElement(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'array',
      value: [],
    })
  })
})

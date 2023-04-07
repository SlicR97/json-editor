import { TokenType } from '../types/token-type.enum'
import { Parseable } from '../util/parseable'
import { parseElement } from './parse-element'

describe('parseElement', () => {
  it('parses a number when the first token is a number', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '1',
      },
    ]
    const json = parseElement(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
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
    const json = parseElement(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
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
    const json = parseElement(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
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
    const json = parseElement(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
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
    const json = parseElement(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
    expect(json).toEqual({
      type: 'null',
    })
  })
})

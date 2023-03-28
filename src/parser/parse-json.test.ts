import { parseJson } from './parse-json'
import { TokenType } from '../types/token-type.enum'

describe('parseJson', () => {
  it('parses a number', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '1',
      },
    ]
    const json = parseJson(tokens)
    expect(json).toEqual({
      type: 'number',
      value: '1',
    })
  })

  it('parses a true value', () => {
    const tokens = [
      {
        type: TokenType.true,
        value: '',
      },
    ]
    const json = parseJson(tokens)
    expect(json).toEqual({
      type: 'boolean',
      value: true,
    })
  })

  it('parses a false value', () => {
    const tokens = [
      {
        type: TokenType.false,
        value: '',
      },
    ]
    const json = parseJson(tokens)
    expect(json).toEqual({
      type: 'boolean',
      value: false,
    })
  })

  it('parses a null value', () => {
    const tokens = [
      {
        type: TokenType.null,
        value: '',
      },
    ]
    const json = parseJson(tokens)
    expect(json).toEqual({
      type: 'null',
    })
  })

  it('does not parse if the token is not recognizable', () => {
    const tokens = [
      {
        type: TokenType.eof,
        value: '',
      },
    ]
    const json = parseJson(tokens)
    expect(json).toEqual({
      type: 'null',
    })
  })
})

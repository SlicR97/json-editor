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

  it('does not parse if the token is not a number', () => {
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

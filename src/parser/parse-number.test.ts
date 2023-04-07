import { TokenType } from '../types/token-type.enum'
import { parseNumber } from './parse-number'
import { TokenParseable } from '../util/token-parseable'

describe('parseNumber', () => {
  it('parses a number', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '1',
      },
    ]
    const json = parseNumber(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'number',
      value: '1',
    })
  })
})

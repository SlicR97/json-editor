import { TokenType } from '../types/token-type.enum'
import { parseNumber } from './parse-number'
import { Parseable } from '../util/parseable'

describe('parseNumber', () => {
  it('parses a number', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '1',
      },
    ]
    const json = parseNumber(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
    expect(json).toEqual({
      type: 'number',
      value: '1',
    })
  })
})

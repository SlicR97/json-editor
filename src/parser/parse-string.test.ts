import { TokenType } from '../types/token-type.enum'
import { parseString } from './parse-string'
import { Parseable } from '../util/parseable'

describe('parseString', () => {
  it('parses a string', () => {
    const tokens = [
      {
        type: TokenType.string,
        value: 'abc',
      },
    ]
    const json = parseString(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
    expect(json).toEqual({
      type: 'string',
      value: 'abc',
    })
  })
})

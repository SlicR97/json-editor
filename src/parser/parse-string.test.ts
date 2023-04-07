import { TokenType } from '../types/token-type.enum'
import { parseString } from './parse-string'
import { TokenParseable } from '../util/token-parseable'

describe('parseString', () => {
  it('parses a string', () => {
    const tokens = [
      {
        type: TokenType.string,
        value: 'abc',
      },
    ]
    const json = parseString(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'string',
      value: 'abc',
    })
  })
})

import { TokenType } from '../types/token-type.enum'
import { parseNull } from './parse-null'
import { TokenParseable } from '../util/token-parseable'

describe('parseNull', () => {
  it('parses a null value', () => {
    const tokens = [
      {
        type: TokenType.null,
        value: '',
      },
    ]
    const json = parseNull(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'null',
    })
  })
})

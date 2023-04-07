import { TokenType } from '../types/token-type.enum'
import { Parseable } from '../util/parseable'
import { parseNull } from './parse-null'

describe('parseNull', () => {
  it('parses a null value', () => {
    const tokens = [
      {
        type: TokenType.null,
        value: '',
      },
    ]
    const json = parseNull(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
    expect(json).toEqual({
      type: 'null',
    })
  })
})

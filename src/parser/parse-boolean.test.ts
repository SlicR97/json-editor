import { parseBoolean } from './parse-boolean'
import { Parseable } from '../util/parseable'
import { TokenType } from '../types/token-type.enum'

describe('parseBoolean', () => {
  it('parses a true value', () => {
    const tokens = [
      {
        type: TokenType.true,
        value: '',
      },
    ]
    const json = parseBoolean(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
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
    const json = parseBoolean(
      new Parseable(tokens, { type: TokenType.eof, value: '' }),
    )
    expect(json).toEqual({
      type: 'boolean',
      value: false,
    })
  })
})

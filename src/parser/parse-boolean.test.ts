import { parseBoolean } from './parse-boolean'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'

describe('parseBoolean', () => {
  it('parses a true value', () => {
    const tokens = [
      {
        type: TokenType.true,
        value: '',
      },
    ]
    const json = parseBoolean(new TokenParseable(tokens))
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
    const json = parseBoolean(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'boolean',
      value: false,
    })
  })
})

import { parseJson } from './parse-json'
import { TokenType } from '../types/token-type.enum'

describe('parseJson', () => {
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

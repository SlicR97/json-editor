import { parseJson } from './parse-json'
import { TokenType } from '../types/token-type.enum'

describe('parseJson', () => {
  it('throws an error if the token is not recognizable', () => {
    const tokens = [
      {
        type: TokenType.eof,
        value: '',
        line: 1,
        column: 1,
      },
    ]
    expect(() => parseJson(tokens)).toThrowError('Expected a value')
  })
})

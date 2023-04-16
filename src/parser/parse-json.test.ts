import { parseJson } from './parse-json'
import { TokenType } from '../types/token-type.enum'
import { Result } from '../types/result.type'

describe('parseJson', () => {
  it('returns a failure if the token is not recognizable', () => {
    const tokens = [
      {
        type: TokenType.eof,
        value: '',
        line: 1,
        column: 1,
      },
    ]

    const result = parseJson(tokens)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected a value',
      line: 1,
      column: 1,
    })
  })
})

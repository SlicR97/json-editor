import { TokenType } from '../types/token-type.enum'
import { scanIdentifier } from './scan-identifier'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'

describe('scanIdentifier', () => {
  it('returns a true token when the string is true', () => {
    const parseable = new StringParseable('true')

    const result = scanIdentifier(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.true,
      value: 'true',
      line: 1,
      column: 1,
    })
  })

  it('returns a false token when the string is false', () => {
    const parseable = new StringParseable('false')

    const result = scanIdentifier(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.false,
      value: 'false',
      line: 1,
      column: 1,
    })
  })

  it("returns a null token when the string is 'null'", () => {
    const parseable = new StringParseable('null')

    const result = scanIdentifier(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.null,
      value: 'null',
      line: 1,
      column: 1,
    })
  })

  it('returns an error when the string is not a matching identifier', () => {
    const parseable = new StringParseable('abc')

    const result = scanIdentifier(parseable)

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Unexpected identifier',
      line: 1,
      column: 1,
    })
  })
})

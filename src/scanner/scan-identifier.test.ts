import { TokenType } from '../types/token-type.enum'
import { scanIdentifier } from './scan-identifier'
import { StringParseable } from '../util/string-parseable'

describe('scanIdentifier', () => {
  it('returns a true token when the string is true', () => {
    const parseable = new StringParseable('true')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.true,
      value: 'true',
      line: 1,
      column: 1,
    })
  })

  it('returns a false token when the string is false', () => {
    const parseable = new StringParseable('false')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.false,
      value: 'false',
      line: 1,
      column: 1,
    })
  })

  it("returns a null token when the string is 'null'", () => {
    const parseable = new StringParseable('null')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.null,
      value: 'null',
      line: 1,
      column: 1,
    })
  })

  it('throws an error when the string is not a matching identifier', () => {
    const parseable = new StringParseable('abc')
    expect(() => scanIdentifier(parseable)).toThrow(
      'Unexpected identifier: abc',
    )
  })
})

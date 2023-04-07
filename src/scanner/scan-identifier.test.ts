import { Parseable } from '../util/parseable'
import { TokenType } from '../types/token-type.enum'
import { scanIdentifier } from './scan-identifier'

describe('scanIdentifier', () => {
  it('returns a true token when the string is true', () => {
    const parseable = new Parseable(['t', 'r', 'u', 'e'], '\0')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.true,
      value: 'true',
    })
  })

  it('returns a false token when the string is false', () => {
    const parseable = new Parseable(['f', 'a', 'l', 's', 'e'], '\0')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.false,
      value: 'false',
    })
  })

  it("returns a null token when the string is 'null'", () => {
    const parseable = new Parseable(['n', 'u', 'l', 'l'], '\0')
    expect(scanIdentifier(parseable)).toEqual({
      type: TokenType.null,
      value: 'null',
    })
  })

  it('throws an error when the string is not a matching identifier', () => {
    const parseable = new Parseable(['a', 'b', 'c'], '\0')
    expect(() => scanIdentifier(parseable)).toThrow(
      'Unexpected identifier: abc',
    )
  })
})

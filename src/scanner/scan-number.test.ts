import { scanNumber } from './scan-number'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'

describe('scanNumber', () => {
  it('returns a number token', () => {
    const parseable = new StringParseable('123')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123',
    })
  })

  it('returns a number token with a decimal', () => {
    const parseable = new StringParseable('1.23')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '1.23',
    })
  })

  it('returns a number token with an exponent', () => {
    const parseable = new StringParseable('123e4')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e4',
    })
  })

  it('returns a number token with a negative exponent', () => {
    const parseable = new StringParseable('123e-4')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e-4',
    })
  })

  it('returns a number token with a positive exponent', () => {
    const parseable = new StringParseable('123e+4')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e+4',
    })
  })

  it('returns a number token with a decimal and an exponent', () => {
    const parseable = new StringParseable('1.23e4')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '1.23e4',
    })
  })
})

import { scanNumber } from './scan-number'
import { Parseable } from '../util/parseable'
import { TokenType } from '../types/token-type.enum'

describe('scanNumber', () => {
  it('returns a number token', () => {
    const parseable = new Parseable(['1', '2', '3'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123',
    })
  })

  it('returns a number token with a decimal', () => {
    const parseable = new Parseable(['1', '.', '2', '3'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '1.23',
    })
  })

  it('returns a number token with an exponent', () => {
    const parseable = new Parseable(['1', '2', '3', 'e', '4'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e4',
    })
  })

  it('returns a number token with a negative exponent', () => {
    const parseable = new Parseable(['1', '2', '3', 'e', '-', '4'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e-4',
    })
  })

  it('returns a number token with a positive exponent', () => {
    const parseable = new Parseable(['1', '2', '3', 'e', '+', '4'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '123e+4',
    })
  })

  it('returns a number token with a decimal and an exponent', () => {
    const parseable = new Parseable(['1', '.', '2', '3', 'e', '4'], '\0')
    expect(scanNumber(parseable)).toEqual({
      type: TokenType.number,
      value: '1.23e4',
    })
  })
})

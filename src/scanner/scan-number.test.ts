import { scanNumber } from './scan-number'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'

describe('scanNumber', () => {
  it('returns a number token', () => {
    const parseable = new StringParseable('123')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '123',
      line: 1,
      column: 1,
    })
  })

  it('returns a number token with a decimal', () => {
    const parseable = new StringParseable('1.23')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '1.23',
      line: 1,
      column: 1,
    })
  })

  it('returns a number token with an exponent', () => {
    const parseable = new StringParseable('123e4')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '123e4',
      line: 1,
      column: 1,
    })
  })

  it('returns a number token with a negative exponent', () => {
    const parseable = new StringParseable('123e-4')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '123e-4',
      line: 1,
      column: 1,
    })
  })

  it('returns a number token with a positive exponent', () => {
    const parseable = new StringParseable('123e+4')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '123e+4',
      line: 1,
      column: 1,
    })
  })

  it('returns a number token with a decimal and an exponent', () => {
    const parseable = new StringParseable('1.23e4')

    const result = scanNumber(parseable)

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: TokenType.number,
      value: '1.23e4',
      line: 1,
      column: 1,
    })
  })
})

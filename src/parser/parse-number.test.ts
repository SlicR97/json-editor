import { parseNumber } from './parse-number'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'

describe('parseNumber', () => {
  it('parses a number', () => {
    const str = '1'
    const tokens = scanJson(str)

    const result = parseNumber(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'number',
      value: '1',
      line: 1,
      column: 1,
    })
  })

  it('does not parse a non-number', () => {
    const str = 'true'
    const tokens = scanJson(str)

    const result = parseNumber(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
  })
})

import { parseString } from './parse-string'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'

describe('parseString', () => {
  it('parses a string', () => {
    const str = '"abc"'
    const tokens = scanJson(str)

    const result = parseString(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'string',
      value: 'abc',
      line: 1,
      column: 1,
    })
  })

  it('does not parse a non-string', () => {
    const str = 'true'
    const tokens = scanJson(str)

    const result = parseString(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
  })
})

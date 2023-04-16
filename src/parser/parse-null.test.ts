import { parseNull } from './parse-null'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'

describe('parseNull', () => {
  it('parses a null value', () => {
    const str = 'null'
    const tokens = scanJson(str)

    const result = parseNull(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'null',
      line: 1,
      column: 1,
    })
  })

  it('fails to parse a non-null value', () => {
    const str = 'true'
    const tokens = scanJson(str)

    const result = parseNull(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
  })
})

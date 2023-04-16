import { parseBoolean } from './parse-boolean'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'

describe('parseBoolean', () => {
  it('parses a true value', () => {
    const str = 'true'
    const tokens = scanJson(str)

    const result = parseBoolean(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'boolean',
      value: true,
      line: 1,
      column: 1,
    })
  })

  it('parses a false value', () => {
    const str = 'false'
    const tokens = scanJson(str)

    const result = parseBoolean(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'boolean',
      value: false,
      line: 1,
      column: 1,
    })
  })

  it('fails to parse a non-boolean value', () => {
    const str = 'null'
    const tokens = scanJson(str)

    const result = parseBoolean(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected boolean',
      line: 1,
      column: 1,
    })
  })
})

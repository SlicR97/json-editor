import { parseBoolean } from './parse-boolean'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'

describe('parseBoolean', () => {
  it('parses a true value', () => {
    const str = 'true'
    const tokens = scanJson(str)
    const json = parseBoolean(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'boolean',
      value: true,
      line: 1,
      column: 1,
    })
  })

  it('parses a false value', () => {
    const str = 'false'
    const tokens = scanJson(str)
    const json = parseBoolean(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'boolean',
      value: false,
      line: 1,
      column: 1,
    })
  })
})

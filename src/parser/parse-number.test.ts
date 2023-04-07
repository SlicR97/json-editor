import { parseNumber } from './parse-number'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'

describe('parseNumber', () => {
  it('parses a number', () => {
    const str = '1'
    const tokens = scanJson(str)
    const json = parseNumber(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'number',
      value: '1',
      line: 1,
      column: 1,
    })
  })
})

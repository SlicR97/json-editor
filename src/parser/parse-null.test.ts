import { parseNull } from './parse-null'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'

describe('parseNull', () => {
  it('parses a null value', () => {
    const str = 'null'
    const tokens = scanJson(str)
    const json = parseNull(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'null',
      line: 1,
      column: 1,
    })
  })
})

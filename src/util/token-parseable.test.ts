import { TokenParseable } from './token-parseable'
import { TokenType } from '../types/token-type.enum'

describe('TokenParseable', () => {
  it('passes the right eof token', () => {
    const parseable = new TokenParseable([])
    const c = parseable.advance()
    expect(c).toEqual({
      type: TokenType.eof,
      value: '',
      line: 0,
      column: 0,
    })
  })

  it('passes the right equality comparer', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.string,
        value: 'b',
        line: 0,
        column: 0,
      },
    ])

    expect(
      parseable.check({
        type: TokenType.string,
        value: 'a',
        line: 0,
        column: 0,
      }),
    ).toEqual(true)
  })

  it('consumes the right token', () => {
    const parseable = new TokenParseable([
      {
        type: TokenType.string,
        value: 'b',
        line: 0,
        column: 0,
      },
    ])

    expect(
      parseable.consume(
        {
          type: TokenType.string,
          value: 'b',
          line: 0,
          column: 0,
        },
        'message',
      ),
    ).toEqual({ type: TokenType.string, value: 'b', line: 0, column: 0 })
  })
})

import { TokenParseable } from './token-parseable'
import { TokenType } from '../types/token-type.enum'

describe('TokenParseable', () => {
  it('passes the right eof token', () => {
    const parseable = new TokenParseable([])
    const c = parseable.advance()
    expect(c).toEqual({ type: TokenType.eof, value: '' })
  })

  it('passes the right equality comparer', () => {
    const parseable = new TokenParseable([
      { type: TokenType.string, value: 'b' },
    ])

    expect(parseable.check({ type: TokenType.string, value: 'a' })).toEqual(
      true,
    )
  })

  it('consumes the right token', () => {
    const parseable = new TokenParseable([
      { type: TokenType.string, value: 'b' },
    ])

    expect(
      parseable.consume({ type: TokenType.string, value: 'b' }, 'message'),
    ).toEqual({ type: TokenType.string, value: 'b' })
  })
})

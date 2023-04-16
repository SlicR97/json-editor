import { StringParseable } from './string-parseable'
import { Result } from '../types/result.type'

describe('StringParseable', () => {
  it('passes the right eof character', () => {
    const parseable = new StringParseable('')
    const c = parseable.advance()
    expect(c).toBe('\0')
  })

  it('passes the right equality comparer', () => {
    const parseable = new StringParseable('abc')
    expect(parseable.check('a')).toBe(true)
    expect(parseable.check('b')).toBe(false)
  })

  describe('consume', () => {
    it('passes the right line and column', () => {
      const parseable = new StringParseable('abc')
      const result = parseable.consume('a', 'error')
      expect(result.isSuccess).toBe(true)
      expect(Result.value(result)).toBe('a')
      expect(parseable.currentLine).toBe(1)
      expect(parseable.currentColumn).toBe(2)
    })
  })
})

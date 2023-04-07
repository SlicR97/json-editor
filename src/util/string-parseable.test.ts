import { StringParseable } from './string-parseable'

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
})

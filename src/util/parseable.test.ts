import { Parseable } from './parseable'

const createParseable = (tokens: string[]) => {
  return new Parseable(tokens, '\0', (a, b) => a === b)
}

describe('Parseable', () => {
  describe('synchronize', () => {
    it('sets start to current', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      parseable.synchronize()
      expect(parseable.start).toBe(1)
    })
  })

  describe('isAtEnd', () => {
    it('returns true when at the end of the string', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      parseable.advance()
      parseable.advance()
      expect(parseable.isAtEnd()).toBe(true)
    })

    it('returns false when not at the end of the string', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      expect(parseable.isAtEnd()).toBe(false)
    })
  })

  describe('advance', () => {
    it('increments current', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      expect(parseable.current).toBe(1)
    })

    it('returns the character at the current position', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      expect(parseable.advance()).toBe('a')
    })
  })

  describe('peek', () => {
    it('returns the character at the current position', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      expect(parseable.peek()).toBe('a')
    })

    it('returns \\0 when at the end of the string', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      parseable.advance()
      parseable.advance()
      expect(parseable.peek()).toBe('\0')
    })
  })

  describe('peekNext', () => {
    it('returns the character at the current position plus one', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      expect(parseable.peekNext()).toBe('b')
    })

    it('returns \\0 when at the end of the string', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      parseable.advance()
      parseable.advance()
      expect(parseable.peekNext()).toBe('\0')
    })
  })

  describe('substring', () => {
    it('returns the substring from start to current', () => {
      const parseable = createParseable(['a', 'b', 'c'])
      parseable.advance()
      parseable.advance()
      expect(parseable.slice()).toEqual(['a', 'b'])
    })
  })
})

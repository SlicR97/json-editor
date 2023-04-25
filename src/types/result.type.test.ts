import { Result } from './result.type'

describe('Result', () => {
  describe('success', () => {
    it('returns a success result', () => {
      const result = Result.success('hello')

      expect(result).toEqual({
        isSuccess: true,
        value: 'hello',
      })
    })
  })

  describe('value', () => {
    it('returns the value', () => {
      const result = Result.success('hello')

      expect(Result.value(result)).toBe('hello')
    })

    it('throws an error if the result is a failure', () => {
      const result = Result.failure('error')

      expect(() => Result.value(result)).toThrow(
        'Cannot get value of a failure result',
      )
    })
  })

  describe('map', () => {
    it('maps the value', () => {
      const result = Result.success('hello')

      expect(Result.map(result, (value) => value.toUpperCase())).toEqual({
        isSuccess: true,
        value: 'HELLO',
      })
    })

    it('returns the failure result', () => {
      const result = Result.failure<string, string>('error')

      expect(Result.map(result, (value) => value.toUpperCase())).toEqual({
        isSuccess: false,
        error: 'error',
      })
    })
  })

  describe('bind', () => {
    it('binds the value', () => {
      const result = Result.success('hello')

      expect(
        Result.bind(result, (value) => Result.success(value.toUpperCase())),
      ).toEqual({
        isSuccess: true,
        value: 'HELLO',
      })
    })

    it('returns the failure result', () => {
      const result = Result.failure<string, string>('error')

      expect(
        Result.bind(result, (value) => Result.success(value.toUpperCase())),
      ).toEqual({
        isSuccess: false,
        error: 'error',
      })
    })
  })

  describe('failure', () => {
    it('returns a failure result', () => {
      const result = Result.failure('error')

      expect(result).toEqual({
        isSuccess: false,
        error: 'error',
      })
    })
  })

  describe('error', () => {
    it('returns the error', () => {
      const result = Result.failure('error')

      expect(Result.error(result)).toBe('error')
    })

    it('throws an error if the result is a success', () => {
      const result = Result.success('hello')

      expect(() => Result.error(result)).toThrow(
        'Cannot get error of a success result',
      )
    })
  })
})

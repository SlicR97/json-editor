import { scanJson } from './scan-json'
import { TokenType } from '../types/token-type.enum'

describe('scanJson', () => {
  it('returns an empty array when the string is empty', () => {
    expect(scanJson('')).toEqual([])
  })

  it('returns an empty array when the string is not valid JSON', () => {
    expect(scanJson('abc')).toEqual([])
  })

  it('returns an array of tokens when the string is valid JSON', () => {
    expect(scanJson('123')).toEqual([
      {
        type: TokenType.number,
        value: '123',
      },
    ])
  })

  describe('parseNumber', () => {
    it('returns an array of tokens when the string is a number', () => {
      expect(scanJson('123')).toEqual([
        {
          type: TokenType.number,
          value: '123',
        },
      ])
    })

    it('returns an array of tokens when the string is a number with a decimal point', () => {
      expect(scanJson('123.456')).toEqual([
        {
          type: TokenType.number,
          value: '123.456',
        },
      ])
    })

    it('returns an array of tokens when the string is a number with an exponent', () => {
      expect(scanJson('123e456')).toEqual([
        {
          type: TokenType.number,
          value: '123e456',
        },
      ])
    })

    it('returns an array of tokens when the string is a number with an exponent and a sign', () => {
      expect(scanJson('123e+456')).toEqual([
        {
          type: TokenType.number,
          value: '123e+456',
        },
      ])
    })

    it('returns an array of tokens when the string is a number with an exponent and a negative sign', () => {
      expect(scanJson('123e-456')).toEqual([
        {
          type: TokenType.number,
          value: '123e-456',
        },
      ])
    })
  })

  describe('parseIdentifier', () => {
    it('returns a true token when the string is true', () => {
      expect(scanJson('true')).toEqual([
        {
          type: TokenType.true,
          value: 'true',
        },
      ])
    })

    it('returns a false token when the string is false', () => {
      expect(scanJson('false')).toEqual([
        {
          type: TokenType.false,
          value: 'false',
        },
      ])
    })

    it('returns null when the string is not a matching identifier', () => {
      expect(scanJson('abc')).toEqual([])
    })
  })
})

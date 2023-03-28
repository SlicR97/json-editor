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
})

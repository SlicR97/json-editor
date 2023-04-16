import { parseObject } from './parse-object'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'
import { Token } from '../types/token.type'
import { TokenType } from '../types/token-type.enum'

describe('parseObject', () => {
  it('parses an empty object', () => {
    const str = '{}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {},
      line: 1,
      column: 1,
    })
  })

  it('parses an object with a single key-value pair', () => {
    const str = '{"abc":123}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'number',
          value: '123',
          line: 1,
          column: 8,
        },
      },
      line: 1,
      column: 1,
    })
  })

  it('parses an object with multiple key-value pairs', () => {
    const str = '{"abc":123,"def":456}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'number',
          value: '123',
          line: 1,
          column: 8,
        },
        def: {
          type: 'number',
          value: '456',
          line: 1,
          column: 18,
        },
      },
      line: 1,
      column: 1,
    })
  })

  it('parses an object with nested objects', () => {
    const str = '{"abc":{"def":123}}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'object',
          value: {
            def: {
              type: 'number',
              value: '123',
              line: 1,
              column: 15,
            },
          },
          line: 1,
          column: 8,
        },
      },
      line: 1,
      column: 1,
    })
  })

  it('parses an object with nested arrays', () => {
    const str = '{"abc":[123]}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'array',
          value: [
            {
              type: 'number',
              value: '123',
              line: 1,
              column: 9,
            },
          ],
          line: 1,
          column: 8,
        },
      },
      line: 1,
      column: 1,
    })
  })

  it('returns an error if the first token is not an open brace', () => {
    const str = '123'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "{" at start of object',
      line: 1,
      column: 1,
    })
  })

  it('returns an error if the last token is not a close brace', () => {
    const str = '{"abc":123'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "}" at end of object',
      line: 1,
      column: 1,
    })
  })

  it('returns an error if the key is not a string', () => {
    const str = '{123:123}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected string key',
      line: 1,
      column: 1,
    })
  })

  it('returns an error if the key is not followed by a colon', () => {
    const str = '{"abc"123}'
    const tokens = scanJson(str)

    const result = parseObject(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected ":" after key',
      line: 1,
      column: 1,
    })
  })

  it('returns an error if the value cannot be parsed', () => {
    const tokens: Token[] = [
      { type: TokenType.openBrace, value: '{', line: 1, column: 1 },
      { type: TokenType.string, value: '"abc"', line: 1, column: 2 },
      { type: TokenType.colon, value: ':', line: 1, column: 7 },
      { type: TokenType.openBracket, value: '[', line: 1, column: 9 },
      { type: TokenType.string, value: '"123"', line: 1, column: 10 },
      { type: TokenType.string, value: '"456"', line: 1, column: 16 },
      { type: TokenType.closeBracket, value: ']', line: 1, column: 10 },
      { type: TokenType.closeBrace, value: '}', line: 1, column: 1 },
    ]

    const result = parseObject(new TokenParseable(tokens))

    expect(result.isSuccess).toBe(false)
    expect(Result.error(result)).toEqual({
      message: 'Expected "," after element',
      line: 1,
      column: 1,
    })
  })
})

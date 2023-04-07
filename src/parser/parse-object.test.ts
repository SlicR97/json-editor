import { TokenType } from '../types/token-type.enum'
import { parseObject } from './parse-object'
import { TokenParseable } from '../util/token-parseable'

describe('parseObject', () => {
  it('parses an empty object', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {},
    })
  })

  it('parses an object with a single key-value pair', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'number',
          value: '123',
        },
      },
    })
  })

  it('parses an object with multiple key-value pairs', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.comma,
        value: ',',
      },
      {
        type: TokenType.string,
        value: 'def',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '456',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'number',
          value: '123',
        },
        def: {
          type: 'number',
          value: '456',
        },
      },
    })
  })

  it('parses an object with nested objects', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'def',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'object',
          value: {
            def: {
              type: 'number',
              value: '123',
            },
          },
        },
      },
    })
  })

  it('parses an object with nested arrays', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.openBracket,
        value: '[',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBracket,
        value: ']',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {
        abc: {
          type: 'array',
          value: [
            {
              type: 'number',
              value: '123',
            },
          ],
        },
      },
    })
  })

  it('throws an error if the first token is not an open brace', () => {
    const tokens = [
      {
        type: TokenType.number,
        value: '123',
      },
    ]
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected "{" at start of object',
    )
  })

  it('throws an error if the last token is not a close brace', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: '123',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '123',
      },
    ]
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected "}" at end of object',
    )
  })

  it('throws an error if the key is not a string', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.colon,
        value: ':',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected string key',
    )
  })

  it('throws an error if the key is not followed by a colon', () => {
    const tokens = [
      {
        type: TokenType.openBrace,
        value: '{',
      },
      {
        type: TokenType.string,
        value: 'abc',
      },
      {
        type: TokenType.number,
        value: '123',
      },
      {
        type: TokenType.closeBrace,
        value: '}',
      },
    ]
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected ":" after key',
    )
  })
})

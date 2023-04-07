import { parseObject } from './parse-object'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'

describe('parseObject', () => {
  it('parses an empty object', () => {
    const str = '{}'
    const tokens = scanJson(str)
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
      type: 'object',
      value: {},
      line: 1,
      column: 1,
    })
  })

  it('parses an object with a single key-value pair', () => {
    const str = '{"abc":123}'
    const tokens = scanJson(str)
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
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
    const json = parseObject(new TokenParseable(tokens))
    expect(json).toEqual({
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

  it('throws an error if the first token is not an open brace', () => {
    const str = '123'
    const tokens = scanJson(str)
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected "{" at start of object',
    )
  })

  it('throws an error if the last token is not a close brace', () => {
    const str = '{"abc":123'
    const tokens = scanJson(str)
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected "}" at end of object',
    )
  })

  it('throws an error if the key is not a string', () => {
    const str = '{123:123}'
    const tokens = scanJson(str)
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected string key',
    )
  })

  it('throws an error if the key is not followed by a colon', () => {
    const str = '{"abc"123}'
    const tokens = scanJson(str)
    expect(() => parseObject(new TokenParseable(tokens))).toThrow(
      'Expected ":" after key',
    )
  })
})

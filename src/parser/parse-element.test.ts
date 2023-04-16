import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'

describe('parseElement', () => {
  it('parses a number when the first token is a number', () => {
    const str = '1'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'number',
      value: '1',
      line: 1,
      column: 1,
    })
  })

  it('parses a string when the first token is a string', () => {
    const str = '"abc"'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'string',
      value: 'abc',
      line: 1,
      column: 1,
    })
  })

  it('parses a boolean when the first token is a true', () => {
    const str = 'true'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'boolean',
      value: true,
      line: 1,
      column: 1,
    })
  })

  it('parses a boolean when the first token is a false', () => {
    const str = 'false'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'boolean',
      value: false,
      line: 1,
      column: 1,
    })
  })

  it('parses a null when the first token is a null', () => {
    const str = 'null'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'null',
      line: 1,
      column: 1,
    })
  })

  it('parses an array when the first token is an open bracket', () => {
    const str = '[]'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'array',
      value: [],
      line: 1,
      column: 1,
    })
  })

  it('parses an object when the first token is an open brace', () => {
    const str = '{}'
    const tokens = scanJson(str)

    const result = parseElement(new TokenParseable(Result.value(tokens)))

    expect(result.isSuccess).toBe(true)
    expect(Result.value(result)).toEqual({
      type: 'object',
      value: {},
      line: 1,
      column: 1,
    })
  })
})

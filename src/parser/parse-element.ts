import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseNumber } from './parse-number'
import { parseBoolean } from './parse-boolean'
import { parseNull } from './parse-null'
import { parseString } from './parse-string'
import { parseArray } from './parse-array'
import { TokenParseable } from '../util/token-parseable'
import { parseObject } from './parse-object'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseElement = (
  parseable: TokenParseable,
): Result<Json, ParseableError> => {
  const next = parseable.peek()
  if (next.type === TokenType.number) {
    return parseNumber(parseable)
  }

  if (next.type === TokenType.true || next.type === TokenType.false) {
    return parseBoolean(parseable)
  }

  if (next.type === TokenType.null) {
    return parseNull(parseable)
  }

  if (next.type === TokenType.string) {
    return parseString(parseable)
  }

  if (next.type === TokenType.openBracket) {
    return parseArray(parseable)
  }

  if (next.type === TokenType.openBrace) {
    return parseObject(parseable)
  }

  return Result.failure({
    message: 'Expected a value',
    line: next.line,
    column: next.column,
  })
}

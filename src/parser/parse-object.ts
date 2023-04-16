import { TokenParseable } from '../util/token-parseable'
import { JObject, Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseElement } from './parse-element'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseObject = (
  parseable: TokenParseable,
): Result<JObject, ParseableError> => {
  const openBraceResult = parseable.consume(
    TokenType.openBrace,
    'Expected "{" at start of object',
  )
  if (!openBraceResult.isSuccess) {
    return openBraceResult
  }

  const object: Json = {
    type: 'object',
    value: {},
    line: openBraceResult.value.line,
    column: openBraceResult.value.column,
  }

  while (
    parseable.peek().type !== TokenType.closeBrace &&
    !parseable.isAtEnd()
  ) {
    const keyResult = parseable.consume(TokenType.string, 'Expected string key')
    if (!keyResult.isSuccess) {
      return Result.mapError(keyResult, (error) => ({
        ...error,
        line: openBraceResult.value.line,
        column: openBraceResult.value.column,
      }))
    }

    const colonResult = parseable.consume(
      TokenType.colon,
      'Expected ":" after key',
    )
    if (!colonResult.isSuccess) {
      return Result.mapError(colonResult, (error) => ({
        ...error,
        line: openBraceResult.value.line,
        column: openBraceResult.value.column,
      }))
    }

    const valueResult = parseElement(parseable)
    if (!valueResult.isSuccess) {
      return Result.mapError(valueResult, (error) => ({
        ...error,
        line: openBraceResult.value.line,
        column: openBraceResult.value.column,
      }))
    }

    object.value[keyResult.value.value] = valueResult.value

    if (parseable.peek().type === TokenType.comma) {
      parseable.advance()
    }
  }

  const closeBraceResult = parseable.consume(
    TokenType.closeBrace,
    'Expected "}" at end of object',
  )
  if (!closeBraceResult.isSuccess) {
    return Result.mapError(closeBraceResult, (error) => ({
      ...error,
      line: openBraceResult.value.line,
      column: openBraceResult.value.column,
    }))
  }

  return Result.success(object)
}

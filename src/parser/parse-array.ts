import { JArray, Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseArray = (
  parseable: TokenParseable,
): Result<JArray, ParseableError> => {
  const openBracketResult = parseable.consume(
    TokenType.openBracket,
    'Expected "["',
  )
  if (!openBracketResult.isSuccess) {
    return openBracketResult
  }

  const elements: Json[] = []

  while (
    parseable.peek().type !== TokenType.closeBracket &&
    !parseable.isAtEnd()
  ) {
    const elementResult = parseElement(parseable)
    if (!elementResult.isSuccess) {
      return elementResult
    }

    elements.push(elementResult.value)

    if (parseable.peek().type !== TokenType.closeBracket) {
      const commaResult = parseable.consume(
        TokenType.comma,
        'Expected "," after element',
      )
      if (!commaResult.isSuccess) {
        return Result.mapError(commaResult, (error) => ({
          ...error,
          line: openBracketResult.value.line,
          column: openBracketResult.value.column,
        }))
      }
    }
  }

  const closeBracketResult = parseable.consume(
    TokenType.closeBracket,
    'Expected "]"',
  )
  if (!closeBracketResult.isSuccess) {
    return Result.mapError(closeBracketResult, (error) => ({
      ...error,
      line: openBracketResult.value.line,
      column: openBracketResult.value.column,
    }))
  }

  return Result.success({
    type: 'array',
    value: elements,
    line: openBracketResult.value.line,
    column: openBracketResult.value.column,
  })
}

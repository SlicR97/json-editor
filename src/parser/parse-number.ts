import { JNumber } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseNumber = (
  parseable: TokenParseable,
): Result<JNumber, ParseableError> => {
  const token = parseable.advance()
  if (token.type !== 'number') {
    return Result.failure({
      message: 'Expected number',
      line: token.line,
      column: token.column,
    })
  }

  return Result.success({
    type: 'number',
    value: token.value,
    line: token.line,
    column: token.column,
  })
}

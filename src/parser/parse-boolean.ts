import { JBoolean } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseBoolean = (
  parseable: TokenParseable,
): Result<JBoolean, ParseableError> => {
  const token = parseable.advance()
  if (token.type !== TokenType.true && token.type !== TokenType.false) {
    return Result.failure({
      message: 'Expected boolean',
      line: token.line,
      column: token.column,
    })
  }

  return Result.success({
    type: 'boolean',
    value: token.type === TokenType.true,
    line: token.line,
    column: token.column,
  })
}

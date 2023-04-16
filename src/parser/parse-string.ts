import { JString } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseString = (
  parseable: TokenParseable,
): Result<JString, ParseableError> => {
  const stringToken = parseable.advance()
  if (stringToken.type !== 'string') {
    return Result.failure({
      message: 'Expected string',
      line: stringToken.line,
      column: stringToken.column,
    })
  }

  return Result.success({
    type: 'string',
    value: stringToken.value,
    line: stringToken.line,
    column: stringToken.column,
  })
}

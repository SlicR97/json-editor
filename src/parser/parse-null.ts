import { JNull } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseNull = (
  parseable: TokenParseable,
): Result<JNull, ParseableError> => {
  const nullToken = parseable.advance()
  if (nullToken.type !== 'null') {
    return Result.failure({
      message: 'Expected null',
      line: nullToken.line,
      column: nullToken.column,
    })
  }

  return Result.success({
    type: 'null',
    line: nullToken.line,
    column: nullToken.column,
  })
}

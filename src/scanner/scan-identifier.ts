import { Token } from '../types/token.type'
import { isAlpha } from '../util/is-alpha'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

const identifiers: Record<string, TokenType> = {
  true: TokenType.true,
  false: TokenType.false,
  null: TokenType.null,
}

export const scanIdentifier = (
  parseable: StringParseable,
): Result<Token, ParseableError> => {
  const column = parseable.currentColumn

  while (isAlpha(parseable.peek())) {
    parseable.advance()
  }

  const value = parseable.slice().join('')
  const type = identifiers[value]

  if (type) {
    return Result.success({
      type,
      value,
      line: parseable.currentLine,
      column: column,
    })
  }

  return Result.failure({
    message: `Unexpected identifier`,
    line: parseable.currentLine,
    column: column,
  })
}

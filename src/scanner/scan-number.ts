import { Token } from '../types/token.type'
import { isDigit } from '../util/is-digit'
import { isSign } from '../util/is-sign'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const scanNumber = (
  parseable: StringParseable,
): Result<Token, ParseableError> => {
  const column = parseable.currentColumn

  while (isDigit(parseable.peek())) {
    parseable.advance()
  }

  if (parseable.peek() === '.' && isDigit(parseable.peekNext())) {
    parseable.advance()

    while (isDigit(parseable.peek())) {
      parseable.advance()
    }
  }

  if (
    (parseable.peek().match(/^e$/i) && isDigit(parseable.peekNext())) ||
    isSign(parseable.peekNext())
  ) {
    parseable.advance()

    if (parseable.peek() === '-' || parseable.peek() === '+') {
      parseable.advance()
    }

    const next = parseable.peek()
    if (!isDigit(next)) {
      return Result.failure({
        message: `Expected digit after exponent sign, got "${next}"`,
        line: parseable.currentLine,
        column: parseable.currentColumn,
      })
    }

    while (isDigit(parseable.peek())) {
      parseable.advance()
    }
  }

  const value = parseable.slice().join('')

  return Result.success({
    type: TokenType.number,
    value,
    line: parseable.currentLine,
    column: column,
  })
}

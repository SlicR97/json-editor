import { Token } from '../types/token.type'
import { isDigit } from '../util/is-digit'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const scanString = (
  parseable: StringParseable,
): Result<Token, ParseableError> => {
  const column = parseable.currentColumn
  const line = parseable.currentLine

  const openQuote = parseable.advance()
  if (openQuote !== '"') {
    return Result.failure({
      message: 'Expected open quote',
      line: line,
      column: column,
    })
  }

  while (parseable.peek() !== '"' && !parseable.isAtEnd()) {
    if (parseable.peek() === '\\') {
      if (
        ['"', '\\', '/', 'b', 'f', 'n', 'r', 't'].includes(parseable.peekNext())
      ) {
        parseable.advance(2)
        continue
      }

      if (
        parseable.peekNext() === 'u' &&
        isDigit(parseable.peek(2)) &&
        isDigit(parseable.peek(3)) &&
        isDigit(parseable.peek(4)) &&
        isDigit(parseable.peek(5))
      ) {
        parseable.advance(6)
        continue
      }

      return Result.failure({
        message: 'Invalid escape sequence',
        line: line,
        column: column,
      })
    }

    parseable.advance()
  }

  if (parseable.isAtEnd()) {
    return Result.failure({
      message: 'Unterminated string',
      line: line,
      column: column,
    })
  }

  const value = parseable.slice().join('').replace('"', '')

  parseable.advance()

  return Result.success({
    type: TokenType.string,
    value,
    line: line,
    column: column,
  })
}

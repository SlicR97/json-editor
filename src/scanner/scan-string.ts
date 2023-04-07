import { Token } from '../types/token.type'
import { isDigit } from '../util/is-digit'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'

export const scanString = (parseable: StringParseable): Token => {
  const openQuote = parseable.advance()
  if (openQuote !== '"') {
    throw new Error('Expected open quote')
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

      throw new Error('Invalid escape sequence')
    }

    parseable.advance()
  }

  if (parseable.isAtEnd()) {
    throw new Error('Unterminated string')
  }

  const value = parseable.slice().join('').replace('"', '')

  parseable.advance()

  return {
    type: TokenType.string,
    value,
  }
}

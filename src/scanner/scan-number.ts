import { Parseable } from '../util/parseable'
import { Token } from '../types/token.type'
import { isDigit } from '../util/is-digit'
import { isSign } from '../util/is-sign'
import { TokenType } from '../types/token-type.enum'

export const scanNumber = (parseable: Parseable<string>): Token => {
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

    while (isDigit(parseable.peek())) {
      parseable.advance()
    }
  }

  const value = parseable.slice().join('')

  return {
    type: TokenType.number,
    value,
  }
}

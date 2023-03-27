import { Parseable } from './parseable'
import { Token } from '../types/token.type'
import { TokenType } from '../types/token-type.enum'

export const scanJson = (json: string): Token[] => {
  const parseable = new Parseable<string>(json.split(''), '\0')
  const tokens: Token[] = []

  while (!parseable.isAtEnd()) {
    parseable.synchronize()
    const c = parseable.advance()!

    switch (c) {
      default: {
        if (isDigit(c)) {
          tokens.push(parseNumber(parseable))
          break
        }

        return []
      }
    }
  }

  return tokens
}

const parseNumber = (parseable: Parseable<string>): Token => {
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

const isDigit = (c: string): boolean => {
  return c >= '0' && c <= '9'
}

const isSign = (c: string): boolean => {
  return c === '-' || c === '+'
}

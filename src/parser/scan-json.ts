import { Parseable } from './parseable'
import { Token } from '../types/token.type'
import { TokenType } from '../types/token-type.enum'

const identifiers: Record<string, TokenType> = {
  true: TokenType.true,
  false: TokenType.false,
  null: TokenType.null,
}

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
        } else if (isAlpha(c)) {
          const token = parseIdentifier(parseable)
          if (token) {
            tokens.push(token)
          }
          break
        }
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

const parseIdentifier = (parseable: Parseable<string>): Token | undefined => {
  while (isAlpha(parseable.peek())) {
    parseable.advance()
  }

  const value = parseable.slice().join('')
  const type = identifiers[value]

  if (type) {
    return {
      type,
      value,
    }
  }

  return undefined
}

const isDigit = (c: string): boolean => {
  return c >= '0' && c <= '9'
}

const isAlpha = (c: string): boolean => {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
}

const isSign = (c: string): boolean => {
  return c === '-' || c === '+'
}

import { Token } from '../types/token.type'
import { isAlpha } from '../util/is-alpha'
import { scanIdentifier } from './scan-identifier'
import { isDigit } from '../util/is-digit'
import { scanNumber } from './scan-number'
import { scanString } from './scan-string'
import { TokenType } from '../types/token-type.enum'
import { StringParseable } from '../util/string-parseable'

export const scanJson = (json: string): Token[] => {
  const parseable = new StringParseable(json)
  const tokens: Token[] = []

  while (!parseable.isAtEnd()) {
    parseable.synchronize()
    const c = parseable.peek()!

    switch (c) {
      case '{': {
        tokens.push({ type: TokenType.openBrace, value: c })
        parseable.advance()
        break
      }
      case '}': {
        tokens.push({ type: TokenType.closeBrace, value: c })
        parseable.advance()
        break
      }
      case ':': {
        tokens.push({ type: TokenType.colon, value: c })
        parseable.advance()
        break
      }
      case '[': {
        tokens.push({ type: TokenType.openBracket, value: c })
        parseable.advance()
        break
      }
      case ']': {
        tokens.push({ type: TokenType.closeBracket, value: c })
        parseable.advance()
        break
      }
      case ',': {
        tokens.push({ type: TokenType.comma, value: c })
        parseable.advance()
        break
      }
      case '"': {
        const token = scanString(parseable)
        tokens.push(token)
        break
      }
      default: {
        if (isDigit(c)) {
          tokens.push(scanNumber(parseable))
          break
        } else if (isAlpha(c)) {
          const token = scanIdentifier(parseable)
          tokens.push(token)
          break
        } else {
          parseable.advance()
        }
      }
    }
  }

  return tokens
}

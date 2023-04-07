import { Token } from '../types/token.type'
import { isAlpha } from '../util/is-alpha'
import { scanIdentifier } from './scan-identifier'
import { Parseable } from '../util/parseable'
import { isDigit } from '../util/is-digit'
import { scanNumber } from './scan-number'
import { scanString } from './scan-string'

export const scanJson = (json: string): Token[] => {
  const parseable = new Parseable<string>(json.split(''), '\0')
  const tokens: Token[] = []

  while (!parseable.isAtEnd()) {
    parseable.synchronize()
    const c = parseable.peek()!

    switch (c) {
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
        }
      }
    }
  }

  return tokens
}

import { Token } from '../types/token.type'
import { isAlpha } from '../util/is-alpha'
import { TokenType } from '../types/token-type.enum'
import { Parseable } from '../util/parseable'

const identifiers: Record<string, TokenType> = {
  true: TokenType.true,
  false: TokenType.false,
  null: TokenType.null,
}

export const scanIdentifier = (parseable: Parseable<string>): Token => {
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

  throw new Error(`Unexpected identifier: ${value}`)
}

import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'

export const parseArray = (parseable: TokenParseable): Json => {
  parseable.consume(TokenType.openBracket, 'Expected "["')

  const elements: Json[] = []

  while (
    parseable.peek().type !== TokenType.closeBracket &&
    !parseable.isAtEnd()
  ) {
    elements.push(parseElement(parseable))

    if (parseable.peek().type === TokenType.comma) {
      parseable.advance()
    }
  }

  parseable.consume(TokenType.closeBracket, 'Expected "]"')

  return {
    type: 'array',
    value: elements,
  }
}

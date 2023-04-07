import { TokenParseable } from '../util/token-parseable'
import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseElement } from './parse-element'

export const parseObject = (parseable: TokenParseable): Json => {
  parseable.consume(TokenType.openBrace, 'Expected "{" at start of object')

  const object: Json = {
    type: 'object',
    value: {},
  }

  while (
    parseable.peek().type !== TokenType.closeBrace &&
    !parseable.isAtEnd()
  ) {
    const key = parseable.consume(TokenType.string, 'Expected string key').value
    parseable.consume(TokenType.colon, 'Expected ":" after key')
    object.value[key] = parseElement(parseable)

    if (parseable.peek().type === TokenType.comma) {
      parseable.advance()
    }
  }

  parseable.consume(TokenType.closeBrace, 'Expected "}" at end of object')

  return object
}

import { Parseable } from '../util/parseable'
import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'

export const parseBoolean = (parseable: Parseable<Token>): Json => {
  const token = parseable.advance()!
  return {
    type: 'boolean',
    value: token.type === TokenType.true,
  }
}

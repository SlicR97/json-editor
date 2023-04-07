import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { TokenParseable } from '../util/token-parseable'

export const parseBoolean = (parseable: TokenParseable): Json => {
  const token = parseable.advance()!
  return {
    type: 'boolean',
    value: token.type === TokenType.true,
    line: token.line,
    column: token.column,
  }
}

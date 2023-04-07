import { Json } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'

export const parseString = (parseable: TokenParseable): Json => {
  const token = parseable.advance()!
  return {
    type: 'string',
    value: token.value,
    line: token.line,
    column: token.column,
  }
}

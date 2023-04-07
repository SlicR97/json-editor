import { JNumber } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'

export const parseNumber = (parseable: TokenParseable): JNumber => {
  const token = parseable.advance()!
  return {
    type: 'number',
    value: token.value,
    line: token.line,
    column: token.column,
  }
}

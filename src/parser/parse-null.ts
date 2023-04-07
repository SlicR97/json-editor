import { Json } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'

export const parseNull = (parseable: TokenParseable): Json => {
  const nullToken = parseable.advance()
  return {
    type: 'null',
    line: nullToken.line,
    column: nullToken.column,
  }
}

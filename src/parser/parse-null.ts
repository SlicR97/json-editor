import { Json } from '../types/jobject.type'
import { TokenParseable } from '../util/token-parseable'

export const parseNull = (parseable: TokenParseable): Json => {
  parseable.advance()
  return {
    type: 'null',
  }
}

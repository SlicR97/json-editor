import { Parseable } from '../util/parseable'
import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'

export const parseNull = (parseable: Parseable<Token>): Json => {
  parseable.advance()
  return {
    type: 'null',
  }
}

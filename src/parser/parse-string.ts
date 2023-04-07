import { Parseable } from '../util/parseable'
import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'

export const parseString = (parseable: Parseable<Token>): Json => {
  const token = parseable.advance()!
  return {
    type: 'string',
    value: token.value,
  }
}

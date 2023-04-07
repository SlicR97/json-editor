import { Parseable } from '../util/parseable'
import { Token } from '../types/token.type'
import { JNumber } from '../types/jobject.type'

export const parseNumber = (parseable: Parseable<Token>): JNumber => {
  const token = parseable.advance()!
  return {
    type: 'number',
    value: token.value,
  }
}

import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { parseNumber } from './parse-number'
import { parseBoolean } from './parse-boolean'
import { parseNull } from './parse-null'
import { parseString } from './parse-string'
import { parseArray } from './parse-array'
import { TokenParseable } from '../util/token-parseable'

export const parseElement = (parseable: TokenParseable): Json => {
  if (parseable.peek().type === TokenType.number) {
    return parseNumber(parseable)
  }

  if (
    parseable.peek().type === TokenType.true ||
    parseable.peek().type === TokenType.false
  ) {
    return parseBoolean(parseable)
  }

  if (parseable.peek().type === TokenType.null) {
    return parseNull(parseable)
  }

  if (parseable.peek().type === TokenType.string) {
    return parseString(parseable)
  }

  if (parseable.peek().type === TokenType.openBracket) {
    return parseArray(parseable)
  }

  return {
    type: 'null',
  }
}

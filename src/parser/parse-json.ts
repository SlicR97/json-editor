import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { Parseable } from '../util/parseable'
import { parseElement } from './parse-element'

export const parseJson = (json: Token[]): Json => {
  const parseable = new Parseable(json, {
    type: TokenType.eof,
    value: '',
  })

  return parseElement(parseable)
}

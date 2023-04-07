import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'
import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'

export const parseJson = (json: Token[]): Json => {
  const parseable = new TokenParseable(json)

  return parseElement(parseable)
}

import { Token } from '../types/token.type'
import { Json } from '../types/jobject.type'
import { parseElement } from './parse-element'
import { TokenParseable } from '../util/token-parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export const parseJson = (json: Token[]): Result<Json, ParseableError> => {
  const parseable = new TokenParseable(json)

  return parseElement(parseable)
}

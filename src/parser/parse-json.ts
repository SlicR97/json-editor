import { Token } from '../types/token.type'
import { JNumber, Json } from '../types/jobject.type'
import { TokenType } from '../types/token-type.enum'
import { Parseable } from './parseable'

export const parseJson = (json: Token[]): Json => {
  const parseable = new Parseable(json, {
    type: TokenType.eof,
    value: '',
  })

  return element(parseable)
}

const element = (parseable: Parseable<Token>): Json => {
  if (parseable.peek().type === TokenType.number) {
    return number(parseable)
  }

  if (
    parseable.peek().type === TokenType.true ||
    parseable.peek().type === TokenType.false
  ) {
    return boolean(parseable)
  }

  if (parseable.peek().type === TokenType.null) {
    return nullValue(parseable)
  }

  return {
    type: 'null',
  }
}

const number = (parseable: Parseable<Token>): JNumber => {
  const token = parseable.advance()!
  return {
    type: 'number',
    value: token.value,
  }
}

const boolean = (parseable: Parseable<Token>): Json => {
  const token = parseable.advance()!
  return {
    type: 'boolean',
    value: token.type === TokenType.true,
  }
}

const nullValue = (parseable: Parseable<Token>): Json => {
  parseable.advance()
  return {
    type: 'null',
  }
}

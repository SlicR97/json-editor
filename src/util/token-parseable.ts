import { TokenType } from '../types/token-type.enum'
import { Token } from '../types/token.type'
import { Parseable } from './parseable'

export class TokenParseable extends Parseable<Token> {
  constructor(input: Token[]) {
    super(
      input,
      { type: TokenType.eof, value: '' },
      (a, b) => a.type === b.type,
    )
  }

  override consume(value: TokenType, message: string): Token
  override consume(value: Token, message: string): Token

  override consume(value: Token | TokenType, message: string): Token {
    if (Object.values(TokenType).includes(value as TokenType)) {
      return super.consume({ type: value as TokenType, value: '' }, message)
    }

    return super.consume(value as Token, message)
  }
}

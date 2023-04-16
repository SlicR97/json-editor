import { TokenType } from '../types/token-type.enum'
import { Token } from '../types/token.type'
import { Parseable } from './parseable'
import { Result } from '../types/result.type'
import { ParseableError } from '../types/parseable-error.type'

export class TokenParseable extends Parseable<Token> {
  constructor(input: Token[]) {
    super(
      input,
      {
        type: TokenType.eof,
        value: '',
        line: 0,
        column: 0,
      },
      (a, b) => a.type === b.type,
    )
  }

  override consume(
    value: TokenType,
    message: string,
  ): Result<Token, ParseableError>
  override consume(value: Token, message: string): Result<Token, ParseableError>

  override consume(
    value: Token | TokenType,
    message: string,
  ): Result<Token, ParseableError> {
    const currentToken = this.peek()
    const line = currentToken.line
    const column = currentToken.column

    let result: Result<Token, ParseableError>
    if (Object.values(TokenType).includes(value as TokenType)) {
      result = super.consume(
        {
          type: value as TokenType,
          value: '',
          line: 0,
          column: 0,
        },
        message,
      )
    } else {
      result = super.consume(value as Token, message)
    }

    return Result.mapError(result, (error) => ({
      ...error,
      line,
      column,
    }))
  }
}

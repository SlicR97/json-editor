/* istanbul ignore file */

import { TokenType } from './token-type.enum'

export type Token = {
  type: TokenType
  value: string
  line: number
  column: number
}

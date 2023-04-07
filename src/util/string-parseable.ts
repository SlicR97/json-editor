import { Parseable } from './parseable'

export class StringParseable extends Parseable<string> {
  constructor(input: string) {
    super(input.split(''), '\0', (a, b) => a === b)
  }
}
